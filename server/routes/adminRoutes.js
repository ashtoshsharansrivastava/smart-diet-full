const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
// 1. Import the new functions from userController
const { getUsers, deleteUser } = require('../controllers/userController');
const User = require('../models/User');

// --- NEW ROUTES FOR ADMIN DASHBOARD ---

// @desc    Get all users
// @route   GET /api/admin/users
router.get('/users', protect, admin, getUsers);

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
router.delete('/users/:id', protect, admin, deleteUser);

// --------------------------------------

// @desc    Get all users who have applied to be dietitians
// @route   GET /api/admin/applicants
router.get('/applicants', protect, admin, async (req, res) => {
  try {
    const applicants = await User.find({ dietitianStatus: 'pending' }).select('-password');
    res.json(applicants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Approve or Reject a dietitian
// @route   PUT /api/admin/update-status/:id
router.put('/update-status/:id', protect, admin, async (req, res) => {
  const { status } = req.body; 
  
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.dietitianStatus = status;
      
      if (status === 'approved') {
        user.role = 'dietitian'; 
      } else {
        user.role = 'user'; 
      }

      const updatedUser = await user.save();
      res.json({ message: `User marked as ${status}`, user: updatedUser });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;