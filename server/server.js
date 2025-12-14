require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');

const connectDB = require('./config/db');

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
        imgSrc: ["'self'", "data:", "https:", "blob:", "https://*.googleusercontent.com"], // Added googleusercontent for avatars
        connectSrc: ["'self'", "https://identitytoolkit.googleapis.com", "https://securetoken.googleapis.com"],
        frameSrc: ["'self'", "https://*.firebaseapp.com", "https://accounts.google.com"], // Allow Google Login iframe
      },
    },
    crossOriginEmbedderPolicy: false,
    // 👇 THIS IS THE CRITICAL FIX FOR GOOGLE LOGIN POPUP
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" }, 
  })
);

app.use(compression()); // Gzip compression
app.use(express.json());

// 3. CORS Configuration
app.use(cors({
  origin: [
    "http://localhost:5173",                 // Localhost (for testing)
    "https://diet-ai-sigma.vercel.app"   // 👈 YOUR VERCEL FRONTEND URL (Add this later)
  ],
  credentials: true
}));
// --- API ROUTES ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/diet-plans', require('./routes/dietPlans'));
app.use('/api/recipes', require('./routes/recipes'));
// ------------------

// 4. SERVE FRONTEND (The "Production Ready" Magic)
if (process.env.NODE_ENV === 'production') {
  // Set static folder (where Vite builds your app)
  app.use(express.static(path.join(__dirname, '../client/dist')));

  // Any route that is NOT an API route will be redirected to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
  });
} else {
  // Simple message for Dev mode
  app.get('/', (req, res) => {
    res.send('API is running... (Dev Mode)');
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});