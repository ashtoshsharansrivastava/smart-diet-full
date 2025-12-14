const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  ingredients: [String],
  instructions: [String],
  calories: Number,
  image: String,
  tags: [String], // e.g. ["High Protein", "Diabetic Friendly"]
});

module.exports = mongoose.model('Recipe', recipeSchema);