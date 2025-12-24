const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const DietitianProfile = require('./models/DietitianProfile');

// Load environment variables
dotenv.config();

const fixProfiles = async () => {
  try {
    // 1. Connect to Database
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB...');

    // 2. Find ALL users who have the role 'dietitian'
    const dietitians = await User.find({ role: 'dietitian' });
    console.log(`🔍 Found ${dietitians.length} users with role 'dietitian'.`);

    let fixedCount = 0;

    // 3. Loop through each dietitian and check for a profile
    for (const user of dietitians) {
      const profile = await DietitianProfile.findOne({ user: user._id });

      if (!profile) {
        console.log(`⚠️  Missing profile for: ${user.name} (${user.email}). Creating one now...`);

        // Create a default profile so they appear in search
        await DietitianProfile.create({
          user: user._id,
          specialization: "General Nutrition", // Default value
          experience: 1,
          hourlyRate: 500,
          bio: "Professional Dietitian ready to help you achieve your goals.",
          availableDays: ["Monday", "Wednesday", "Friday"],
          meetingUrl: "https://zoom.us/j/placeholder"
        });

        console.log(`✅ Fixed! Created profile for ${user.name}`);
        fixedCount++;
      } else {
        console.log(`👍 Profile exists for: ${user.name}`);
      }
    }

    console.log('-----------------------------------');
    console.log(`🎉 Process Complete. Fixed ${fixedCount} profiles.`);
    process.exit();

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

fixProfiles();