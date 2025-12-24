const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const DietitianProfile = require('../models/DietitianProfile');

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

// @desc    Get all users who have applied (WITH FULL DETAILS)
// @route   GET /api/admin/applicants
// @access  Private/Admin
const getDietitianApplicants = asyncHandler(async (req, res) => {
  // 1. Find users who are pending
  const applicants = await User.find({ dietitianStatus: 'pending' }).select('-password').lean();
  
  // 2. Find their detailed profiles using their user IDs
  const applicantIds = applicants.map(a => a._id);
  const profiles = await DietitianProfile.find({ user: { $in: applicantIds } }).lean();

  // 3. Merge them together so frontend gets one complete object
  const completeData = applicants.map(user => {
    // Find the matching profile for this user
    const profile = profiles.find(p => p.user.toString() === user._id.toString());
    return { 
      ...user, 
      profile: profile || {} // Attach profile details (bio, specialization, etc.)
    };
  });

  res.json(completeData);
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
      user.role = 'dietitian'; 
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
  updateDietitianStatus
};