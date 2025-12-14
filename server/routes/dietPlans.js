const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Import the security guard
const DietPlan = require('../models/DietPlan');

// @route   POST /api/diet-plans
// @desc    Save a generated diet plan
// @access  Private (Logged in users only)
router.post('/', auth, async (req, res) => {
  try {
    const { title, planData, macros } = req.body;

    const newPlan = new DietPlan({
      user: req.user.id, // Comes from the auth middleware
      title,
      planData,
      macros
    });

    const plan = await newPlan.save();
    res.json(plan);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/diet-plans
// @desc    Get all plans for the logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Find plans where user matches the logged-in ID, sort by newest first
    const plans = await DietPlan.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(plans);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/diet-plans/:id
// @desc    Delete a specific plan
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let plan = await DietPlan.findById(req.params.id);

    if (!plan) return res.status(404).json({ message: 'Plan not found' });

    // Make sure user owns the plan
    if (plan.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await DietPlan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Plan removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;