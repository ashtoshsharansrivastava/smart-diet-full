const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String }, // 👈 Added this field
  googleId: { type: String },
  
  // Physical Profile
  age: { type: Number },
  gender: { type: String, enum: ['male', 'female'] },
  height: { type: Number },
  weight: { type: Number },
  activityLevel: { type: String },

  // Medical & Diet
  conditions: [{ type: String }],
  dietType: { type: String, default: 'veg' },
  allergies: [{ type: String }],
  
  createdAt: { type: Date, default: Date.now },

 role: { 
    type: String, 
    enum: ['user', 'dietitian', 'admin'], 
    default: 'user' // Everyone starts as a user
  },
  dietitianStatus: {
    type: String,
    enum: ['na', 'pending', 'approved', 'rejected'],
    default: 'na' // 'na' means Not Applicable (they haven't applied)
  },
  specialization: { type: String, default: '' }, // For dietitian applicants
  // --- NEW FIELDS END ---

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);