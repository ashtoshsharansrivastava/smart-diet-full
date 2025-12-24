const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const DietitianProfile = require('./models/DietitianProfile');

// Load environment variables
dotenv.config();

const resetAndFix = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB...');

    // 1. Find your specific user (The one from your screenshot)
    // We search by role 'dietitian' to find the active one.
    const currentUser = await User.findOne({ role: 'dietitian' });

    if (!currentUser) {
      console.log("❌ No user with role 'dietitian' found. Please register/login first.");
      process.exit();
    }

    console.log(`👤 Found Active Dietitian User: ${currentUser.name}`);
    console.log(`   ID: ${currentUser._id}`);

    // 2. DELETE ALL existing profiles (They are likely linked to wrong/old IDs)
    const deleteResult = await DietitianProfile.deleteMany({});
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} old/broken profiles.`);

    // 3. Create a FRESH Profile linked to the CORRECT User ID
    const newProfile = await DietitianProfile.create({
      user: currentUser._id, // <--- This links it correctly!
      specialization: "Clinical Nutrition",
      experience: 5,
      hourlyRate: 800,
      bio: "Certified nutritionist specializing in metabolic health and AI-driven protocols.",
      availableDays: ["Monday", "Wednesday", "Friday"],
      meetingUrl: "https://zoom.us/my-link",
      rating: 4.8,
      reviewCount: 12
    });

    console.log('-------------------------------------------');
    console.log('✅ SUCCESS! Created new linked profile.');
    console.log(`   Linked User ID: ${newProfile.user}`);
    console.log('-------------------------------------------');
    
    process.exit();

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

resetAndFix();