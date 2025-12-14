const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2. Hash the password (Security)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create the new user
    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // 4. Create the Token (Wristband)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d', // Token lasts 7 days
    });

    // 5. Send response
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
      message: "User registered successfully!"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/auth/login
// @desc    Login user & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // 2. Check Password (Compare typed password with hashed DB password)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // 3. Create Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // 4. Send response
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
      message: "Login successful!"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
router.put('/update', auth, async (req, res) => {
  try {
    const { name, weight, height, age } = req.body;
    
    // Find user by ID (from token)
    let user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update fields if provided
    if (name) user.name = name;
    if (weight) user.weight = weight;
    if (height) user.height = height;
    if (age) user.age = age;

    await user.save();

    res.json({ user, message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ... existing register and login routes ...

// @route   POST /api/auth/google
// @desc    Login or Register via Google
router.post('/google', async (req, res) => {
  try {
    const { name, email, avatar } = req.body;

    // 1. Check if user exists in DB
    let user = await User.findOne({ email });

    if (user) {
      // User exists -> Log them in
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      
      // Update avatar if it's new (optional)
      if (avatar && !user.avatar) {
        user.avatar = avatar;
        await user.save();
      }

      return res.json({ 
        token, 
        user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar }, 
        message: "Logged in via Google" 
      });
    } 

    // User does NOT exist -> Create new account automatically
    // Generate a random password (since they use Google login)
    const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(randomPassword, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      avatar: avatar
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({ 
      token, 
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
      message: "Registered via Google" 
    });

  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;

module.exports = router;