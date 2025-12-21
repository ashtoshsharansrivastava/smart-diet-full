const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  registerDietitian, 
  getAllDietitians, 
  getDietitianById,
  onboardDietitian // Ensure this exists from previous step
} = require('../controllers/dietitianController');

// 👇 Import the NEW controller
const { getMyClients } = require('../controllers/dietitianController'); 

// ... existing routes ...
router.route('/').post(protect, registerDietitian).get(getAllDietitians);
router.route('/onboard').post(protect, onboardDietitian);
router.route('/:id').get(getDietitianById);

// 👇 ADD THIS NEW ROUTE
router.get('/clients', protect, getMyClients);

module.exports = router;