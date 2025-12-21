const mongoose = require('mongoose');

const dietitianProfileSchema = new mongoose.Schema({
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, uinique: true },
    specilization: { type: String, required: true },
    experience: { type: Number, required: true }, // in years
    qualifications: { type: String, required: true },
    bio: { type: String },
    consultationFee: { type: Number, required: true },
    availability: [{
        day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
        timeSlots: [{ start: String, end: String }]
    }],
    createdAt: { type: Date, default: Date.now },
    languages: [String ],
    calendlyLink: { type: String },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('DietitianProfile', dietitianProfileSchema);