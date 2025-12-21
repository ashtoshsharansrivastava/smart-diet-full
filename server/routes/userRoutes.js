const express = require('express');
const router = express.Router();

// Import the controllers you just created
const { 
  authUser, 
  registerUser, 
  getUserProfile,
  googleAuth
} = require('../controllers/userController');

// Import the protection middleware
const { protect } = require('../middleware/authMiddleware');

// 1. Registration Route (POST /api/users)
router.post('/', registerUser);

// 2. Login Route (POST /api/users/login)
router.post('/login', authUser);
router.post('/google', googleAuth);

// 3. Profile Route (GET /api/users/profile) - Protected
router.get('/profile', protect, getUserProfile);

module.exports = router;