const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc    Get all clients for the dietitian
// @route   GET /api/dietitians/clients
// @access  Private (Dietitian Only)
const getMyClients = asyncHandler(async (req, res) => {
  // For now, fetch all users who are NOT admins or dietitians
  // In the future, you can filter by: { dietitianId: req.user._id }
  const clients = await User.find({ role: 'user' }).select('-password');
  
  if (clients) {
    res.json(clients);
  } else {
    res.status(404);
    throw new Error('No clients found');
  }
});

module.exports = {
  getMyClients
};