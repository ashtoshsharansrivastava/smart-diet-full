require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');

const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

// 1. Connect to Database
connectDB();

const app = express();

// 2. Production Middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://apis.google.com", "https://www.googletagmanager.com"],
        imgSrc: ["'self'", "data:", "https:", "blob:", "https://*.googleusercontent.com"], 
        connectSrc: ["'self'", "https://identitytoolkit.googleapis.com", "https://securetoken.googleapis.com"],
        frameSrc: ["'self'", "https://*.firebaseapp.com", "https://accounts.google.com"], 
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" }, 
  })
);

app.use(compression()); 
app.use(express.json());


// 3. CORS Configuration (UPDATED)
app.use(cors({
  origin: [
    "http://localhost:5173",                  // Localhost
    "https://smart-diet-full.vercel.app",     // Main Production Frontend
    "https://smart-diet-full.onrender.com"    // 👈 ADDED: Backend URL (Self - fixes internal redirects)
  ],
  credentials: true
}));

// 👈 ADDED: Handle Preflight requests for all routes (CRITICAL FOR CORS)
app.options('*', cors()); 

// --- API ROUTES ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/diet-plans', require('./routes/dietPlans'));
app.use('/api/recipes', require('./routes/recipes'));
app.use('/api/dietitians', require('./routes/dietitians'));

// Admin & User Routes
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes); // 👈 Cleaned up: Kept only this one (you had it twice)

// Root Route (Helpful for checking if server is awake)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ------------------

const PORT = process.env.PORT || 5000; // Render provides process.env.PORT
app.listen(PORT, '0.0.0.0', () => {    // Add '0.0.0.0' to be safe
  console.log(`Server running on port ${PORT}`);
});