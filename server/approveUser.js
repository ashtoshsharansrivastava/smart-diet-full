const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load environment variables
dotenv.config();

const approveDietitian = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB...');

    // Find the user with role 'dietitian'
    const user = await User.findOne({ role: 'dietitian' });

    if (!user) {
      console.log('❌ No dietitian user found!');
      process.exit();
    }

    // FORCE ALL STATUSES TO 'TRUE'
    user.isVerified = true;            
    user.dietitianStatus = 'approved'; 
    
    await user.save();

    console.log(`🎉 SUCCESS! Updated user: ${user.name}`);
    console.log(`   - Verified: ${user.isVerified}`);
    console.log(`   - Status: ${user.dietitianStatus}`);
    
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

approveDietitian();