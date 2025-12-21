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
    "https://smart-diet-full.onrender.com"    // 👈 ADDED: Backend URL (Self)
  ],
  credentials: true
}));

// 👈 ADDED: Handle Preflight requests for all routes (Crucial for CORS)
app.options('*', cors()); 

// --- API ROUTES ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/diet-plans', require('./routes/dietPlans'));
app.use('/api/recipes', require('./routes/recipes'));
app.use('/api/dietitians', require('./routes/dietitians'));

// Admin & User Routes
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes); // 👈 Cleaned up: Removed the duplicate line

// Root Route (Helpful for checking if server is awake)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});