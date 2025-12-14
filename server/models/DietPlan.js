const mongoose = require('mongoose');

const dietPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Links this plan to a specific user
    required: true
  },
  title: { type: String, required: true }, // e.g. "Diabetic Friendly Plan"
  
  // We store the full 7-day plan as a flexible Object because AI output varies
  planData: { type: Object, required: true }, 
  
  macros: {
    calories: Number,
    protein: String,
    carbs: String,
    fats: String
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DietPlan', dietPlanSchema);