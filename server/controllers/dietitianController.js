const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const DietitianProfile = require('../models/DietitianProfile');
const Review = require('../models/Review');

// @desc    Get all verified dietitians
// @route   GET /api/dietitians
// @access  Public
const getAllDietitians = asyncHandler(async (req, res) => {
  const profiles = await DietitianProfile.find().populate('user', 'name avatar isVerified');
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
  
  const reviews = await Review.find({ dietitian: req.params.id }).sort({ createdAt: -1 });
  res.json({ profile, reviews });
});

// @desc    Register a new dietitian (Admin or Direct)
// @route   POST /api/dietitians
// @access  Private
const registerDietitian = asyncHandler(async (req, res) => {
  const { specialization, experience, bio, hourlyRate } = req.body;
  
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
    const { specialization, experience, bio, hourlyRate, availableDays, meetingUrl } = req.body;
    
    // 1. Find User
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // 2. 👇 CRITICAL FIX: Set status to 'pending' and DO NOT promote role yet
    user.dietitianStatus = 'pending';
    // user.role remains 'user' until Admin approves!
    await user.save();

    // 3. Create or Update Dietitian Profile
    let profile = await DietitianProfile.findOne({ user: req.user._id });
    
    if(!profile) {
        profile = new DietitianProfile({
            user: req.user._id,
            specialization,
            experience,
            bio,
            hourlyRate,
            availableDays,
            meetingUrl
        });
        await profile.save();
    } else {
        profile.specialization = specialization;
        profile.experience = experience;
        profile.bio = bio;
        profile.hourlyRate = hourlyRate;
        profile.availableDays = availableDays;
        profile.meetingUrl = meetingUrl;
        await profile.save();
    }

    res.json({ message: "Application submitted", profile });
});

// @desc    Get all clients for the dietitian
// @route   GET /api/dietitians/clients
// @access  Private (Dietitian Only)
const getMyClients = asyncHandler(async (req, res) => {
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