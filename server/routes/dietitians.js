const express = require('express');
const router = express.Router();
const User = require('../models/User');
const DietitianProfile = require('../models/DietitianProfile');
const Review = require('../models/Review');

// ✅ CRITICAL FIX: Use the new 'protect' middleware
const { protect } = require('../middleware/authMiddleware');

// ✅ IMPORT CONTROLLERS (For the new features)
const { 
  onboardDietitian,
  getMyClients 
} = require('../controllers/dietitianController');


// --- 1. NEW FEATURES (Using Controllers) ---

// @route   POST /api/dietitians/onboard
// @desc    Apply to be a Dietitian (Correctly sets status to 'pending')
router.post('/onboard', protect, onboardDietitian); 

// @route   GET /api/dietitians/clients
// @desc    Get my clients (For the Dashboard)
router.get('/clients', protect, getMyClients);


// --- 2. EXISTING FEATURES (Kept Inline) ---

// @route   GET /api/dietitians
// @desc    Get all verified dietitians
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await DietitianProfile.find().populate('user', 'name avatar isVerified');
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
    
    const reviews = await Review.find({ dietitian: req.params.id }).sort({ createdAt: -1 });
    res.json({ profile, reviews });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/dietitians/:id/review
// @desc    Add a review
// @access  Private
router.post('/:id/review', protect, async (req, res) => { // ✅ Updated to use 'protect'
  try {
    const { rating, comment } = req.body;
    const profile = await DietitianProfile.findById(req.params.id);
    const user = await User.findById(req.user._id); // ✅ protect uses _id

    // Create Review
    const newReview = new Review({
      dietitian: req.params.id,
      user: req.user._id,
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
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;