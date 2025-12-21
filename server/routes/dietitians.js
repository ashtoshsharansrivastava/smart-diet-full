const express = require('express');
const router = express.Router();
const User = require('../models/User');
const DietitianProfile = require('../models/DietitianProfile');
const Review = require('../models/Review');
const auth = require('../middleware/auth'); // Your existing auth middleware

// @route   GET /api/dietitians
// @desc    Get all verified dietitians
// @access  Public
router.get('/', async (req, res) => {
  try {
    // 1. Find all profiles
    const profiles = await DietitianProfile.find().populate('user', 'name avatar isVerified');
    
    // 2. Filter out anyone whose User account isn't verified (Optional)
    const verifiedProfiles = profiles.filter(p => p.user && p.user.isVerified);
    
    res.json(verifiedProfiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/dietitians/:id
// @desc    Get profile by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const profile = await DietitianProfile.findById(req.params.id).populate('user', 'name avatar');
    if (!profile) return res.status(404).json({ msg: 'Dietitian not found' });
    
    // Get reviews too
    const reviews = await Review.find({ dietitian: req.params.id }).sort({ createdAt: -1 });
    
    res.json({ profile, reviews });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/dietitians/:id/review
// @desc    Add a review
// @access  Private
router.post('/:id/review', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const profile = await DietitianProfile.findById(req.params.id);
    const user = await User.findById(req.user.id);

    // Create Review
    const newReview = new Review({
      dietitian: req.params.id,
      user: req.user.id,
      userName: user.name,
      rating,
      comment
    });
    await newReview.save();

    // Update Average Rating
    const reviews = await Review.find({ dietitian: req.params.id });
    profile.reviewCount = reviews.length;
    profile.rating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    await profile.save();

    res.json(newReview);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/dietitians/onboard
// @desc    Turn a normal user into a Dietitian (For testing)
// @access  Private
router.post('/onboard', auth, async (req, res) => {
    try {
        const { specialization, experience, bio, hourlyRate } = req.body;
        
        // Update User Role
        await User.findByIdAndUpdate(req.user.id, { role: 'dietitian', isVerified: true });

        // Create Profile
        let profile = await DietitianProfile.findOne({ user: req.user.id });
        if(!profile) {
            profile = new DietitianProfile({
                user: req.user.id,
                specialization,
                experience,
                bio,
                hourlyRate
            });
            await profile.save();
        }
        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;