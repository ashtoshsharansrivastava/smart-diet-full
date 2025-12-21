const mongoose = require('mongoose');

const dietitianProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  
  // Professional Info
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  bio: { type: String },
  
  // Marketplace Data
  hourlyRate: { type: Number, default: 500 },
  languages: [String],
  
  // 👇 NEW: Simple Array of Days (Monday, Tuesday...)
  availability: { type: [String], default: [] }, 
  
  // Kept optional if they still want to provide a link
  calendlyLink: { type: String }, 
  
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DietitianProfile', dietitianProfileSchema);