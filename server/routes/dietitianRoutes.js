const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  registerDietitian, 
  getAllDietitians, 
  getDietitianById,
  onboardDietitian,
  getMyClients // Ensure this exists from previous step
} = require('../controllers/dietitianController');

// 👇 Import the NEW controller
const { getMyClients } = require('../controllers/dietitianController'); 

router.route('/')
  .get(getAllDietitians)
  .post(protect, registerDietitian);

// Route 2: Apply to be a Dietitian (Protected)
// This was likely causing your error if it used the wrong middleware
router.route('/onboard')
  .post(protect, onboardDietitian); 

// Route 3: Get Dietitian's Clients (Protected)
router.get('/clients', protect, getMyClients);

// Route 4: Get Specific Dietitian (Public)
router.route('/:id')
  .get(getDietitianById);

module.exports = router;