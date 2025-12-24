const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const DietitianProfile = require('../models/DietitianProfile');
const Review = require('../models/Review');

// @desc    Get all verified dietitians
// @route   GET /api/dietitians
// @access  Public
const getAllDietitians = asyncHandler(async (req, res) => {
  // Find all profiles and populate user data
  const profiles = await DietitianProfile.find().populate('user', 'name avatar isVerified');
  
  // Optional: Filter only verified users if your schema has isVerified
  const verifiedProfiles = profiles.filter(p => p.user && p.user.isVerified);
  
  res.json(verifiedProfiles);
});

// @desc    Get dietitian profile by ID
// @route   GET /api/dietitians/:id
// @access  Public
const getDietitianById = asyncHandler(async (req, res) => {
  const profile = await DietitianProfile.findById(req.params.id).populate('user', 'name avatar');
  
  if (!profile) {
    res.status(404);
    throw new Error('Dietitian not found');
  }
  
  // Get reviews for this dietitian
  const reviews = await Review.find({ dietitian: req.params.id }).sort({ createdAt: -1 });
  
  res.json({ profile, reviews });
});

// @desc    Register a new dietitian (Admin or Direct)
// @route   POST /api/dietitians
// @access  Private
const registerDietitian = asyncHandler(async (req, res) => {
  const { specialization, experience, bio, hourlyRate } = req.body;
  
  // Check if profile exists
  let profile = await DietitianProfile.findOne({ user: req.user._id });
  
  if (profile) {
    res.status(400);
    throw new Error('Dietitian profile already exists');
  }
  
  profile = await DietitianProfile.create({
    user: req.user._id,
    specialization,
    experience,
    bio,
    hourlyRate
  });
  
  res.status(201).json(profile);
});

// @desc    Apply to become a dietitian (User onboarding)
// @route   POST /api/dietitians/onboard
// @access  Private
const onboardDietitian = asyncHandler(async (req, res) => {
    const { specialization, experience, bio, hourlyRate } = req.body;
    
    // 1. Update User Role to 'dietitian' (and verify them for now)
    const user = await User.findByIdAndUpdate(
        req.user._id, 
        { role: 'dietitian', isVerified: true },
        { new: true }
    );

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // 2. Create or Update Dietitian Profile
    let profile = await DietitianProfile.findOne({ user: req.user._id });
    
    if(!profile) {
        profile = new DietitianProfile({
            user: req.user._id,
            specialization,
            experience,
            bio,
            hourlyRate
        });
        await profile.save();
    } else {
        // If profile exists, update it
        profile.specialization = specialization;
        profile.experience = experience;
        profile.bio = bio;
        profile.hourlyRate = hourlyRate;
        await profile.save();
    }

    res.json(profile);
});

// @desc    Get all clients for the dietitian
// @route   GET /api/dietitians/clients
// @access  Private (Dietitian Only)
const getMyClients = asyncHandler(async (req, res) => {
  // Fetch all users who are basic 'users' (Potential clients)
  const clients = await User.find({ role: 'user' }).select('-password');
  
  if (clients) {
    res.json(clients);
  } else {
    res.status(404);
    throw new Error('No clients found');
  }
});

module.exports = {
  getAllDietitians,
  getDietitianById,
  registerDietitian,
  onboardDietitian,
  getMyClients
};