// server/seed-profile.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const DietitianProfile = require('./models/DietitianProfile');
const connectDB = require('./config/db');

// 👇 YOUR EMAIL (Verify this is correct)
const TARGET_EMAIL = "csjma22001390176ece@csjmu.ac.in"; 

const seedProfile = async () => {
  await connectDB();

  try {
    // 1. Find User
    const user = await User.findOne({ email: TARGET_EMAIL });
    if (!user) {
      console.log("❌ User not found! Check the email.");
      process.exit(1);
    }
    console.log(`✅ Found User: ${user.name}`);

    // 2. Ensure User Role is set correctly
    user.role = 'dietitian';
    user.dietitianStatus = 'approved';
    user.isVerified = true;
    
    // Fix Avatar if missing (Frontend needs this to look good)
    if (!user.avatar || user.avatar.length < 10) {
       user.avatar = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=500";
    }
    await user.save();
    console.log("✅ User Role & Avatar secured.");

    // 3. Find OR Create Profile
    let profile = await DietitianProfile.findOne({ user: user._id });
    
    // Data to inject
    const expertData = {
        user: user._id,
        specialization: "Clinical Nutrition & Metabolism", // 👈 Crucial for search filter
        experience: 5,
        bio: "Certified metabolic specialist helping clients reverse lifestyle diseases through precision nutrition.",
        hourlyRate: 1500,
        rating: 4.9,
        reviewCount: 15,
        availability: ["Mon", "Wed", "Fri"]
    };

    if (!profile) {
      // Create New
      profile = new DietitianProfile(expertData);
      console.log("🎉 Created NEW Profile.");
    } else {
      // FORCE UPDATE (This fixes the 'Wrong Data' issue)
      profile.specialization = expertData.specialization;
      profile.experience = expertData.experience;
      profile.bio = expertData.bio;
      profile.hourlyRate = expertData.hourlyRate;
      profile.rating = expertData.rating;
      
      console.log("🔄 Overwriting OLD profile with NEW data...");
    }
    
    await profile.save();
    console.log("✅ SUCCESS! The backend now has the correct data.");

  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    process.exit();
  }
};

seedProfile();