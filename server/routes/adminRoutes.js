const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');

// Import all functions from the new controller
const { 
  getUsers, 
  deleteUser,
  getDietitianApplicants, 
  updateDietitianStatus 
} = require('../controllers/adminController');

// --- USER MANAGEMENT ROUTES ---

router.route('/users')
  .get(protect, admin, getUsers);

router.route('/users/:id')
  .delete(protect, admin, deleteUser);


// --- DIETITIAN APPROVAL ROUTES ---

// 1. Get Pending Applicants
router.route('/applicants')
  .get(protect, admin, getDietitianApplicants);

// 2. Approve/Reject Applicant (Using PUT)
// Note: We matched the URL to be cleaner: /applicants/:id
router.route('/applicants/:id')
  .put(protect, admin, updateDietitianStatus);

module.exports = router;