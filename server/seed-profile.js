// server/seed-profile.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const DietitianProfile = require('./models/DietitianProfile');
const connectDB = require('./config/db');

// 👇 YOUR EMAIL
const TARGET_EMAIL = "csjma22001390176ece@csjmu.ac.in"; 

const seedProfile = async () => {
  await connectDB();

  try {
    const user = await User.findOne({ email: TARGET_EMAIL });
    if (!user) {
      console.log("❌ User not found!");
      process.exit(1);
    }

    // 1. Ensure User Role is Perfect
    user.role = 'dietitian';
    user.dietitianStatus = 'approved';
    user.isVerified = true;
    // Set a Demo Avatar if none exists
    if (!user.avatar || user.avatar.length < 10) {
        user.avatar = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=500";
    }
    await user.save();
    console.log("✅ User Role & Avatar updated.");

    // 2. Find or Create Profile
    let profile = await DietitianProfile.findOne({ user: user._id });
    
    // 👇 DATA TO FORCE UPDATE
    const profileData = {
        user: user._id,
        specialization: "Clinical Nutrition & Metabolism",
        experience: 5,
        bio: "Expert in metabolic health and personalized diet protocols. I help clients achieve their health goals through science-backed nutrition.",
        hourlyRate: 1500,
        rating: 5.0,
        reviewCount: 12,
        availability: ["Monday", "Wednesday", "Friday"]
    };

    if (!profile) {
      profile = new DietitianProfile(profileData);
      console.log("🎉 Created NEW Profile.");
    } else {
      // 👇 FORCE UPDATE EXISTING FIELDS
      profile.specialization = profileData.specialization;
      profile.experience = profileData.experience;
      profile.bio = profileData.bio;
      profile.hourlyRate = profileData.hourlyRate;
      profile.rating = profileData.rating;
      profile.reviewCount = profileData.reviewCount;
      console.log("🔄 Updated EXISTING Profile with Demo Data.");
    }
    
    await profile.save();
    console.log("✅ SUCCESS! Profile is live and verified.");

  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    process.exit();
  }
};

seedProfile();