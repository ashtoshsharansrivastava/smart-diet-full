const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all users who have applied to be dietitians
// @route   GET /api/admin/applicants
// @access  Private/Admin
const getDietitianApplicants = asyncHandler(async (req, res) => {
  const applicants = await User.find({ dietitianStatus: 'pending' }).select('-password');
  res.json(applicants);
});

// @desc    Approve or Reject a dietitian application
// @route   PUT /api/admin/applicants/:id
// @access  Private/Admin
const updateDietitianStatus = asyncHandler(async (req, res) => {
  const { status } = req.body; // Expecting 'approved' or 'rejected'
  const user = await User.findById(req.params.id);

  if (user) {
    user.dietitianStatus = status;

    if (status === 'approved') {
      user.role = 'dietitian'; // PROMOTION!
      user.isVerified = true;
    } else {
      user.role = 'user'; // Revert if rejected
      user.isVerified = false;
    }

    const updatedUser = await user.save();
    res.json({ message: `Application ${status}`, user: updatedUser });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  getUsers,
  deleteUser,
  getDietitianApplicants,
  updateDietitianStatus,
};