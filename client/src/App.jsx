import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DietProvider } from './context/DietContext';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import IntakeForm from './pages/IntakeForm'; // The Generator
import DietChart from './pages/DietChart';
import RecipeDetails from './pages/RecipeDetails';
import ShoppingList from './pages/ShoppingList';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Dietitians from './pages/Dietitians';
import DietitianDetails from './pages/DietitianDetails';
import BecomeDietitian from './pages/BecomeDietitian'; // 👈 IMPORT THIS

// Security
import ProtectedRoute from './components/auth/ProtectedRoute'; // 👈 IMPORT THIS

const App = () => {
  return (
    <AuthProvider>
      <DietProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          
          {/* Dietitian Marketplace (Public) */}
          <Route path="/dietitians" element={<Dietitians />} />
          <Route path="/dietitians/:id" element={<DietitianDetails />} />
          
          {/* Protected Routes (Must be Logged In) */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* 🔒 LOCKED: User must login before generating a plan */}
          <Route 
            path="/generate" 
            element={
              <ProtectedRoute>
                <IntakeForm />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/diet-plan" 
            element={
              <ProtectedRoute>
                <DietChart />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/shopping-list" 
            element={
              <ProtectedRoute>
                <ShoppingList />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/recipe/:id" 
            element={
              <ProtectedRoute>
                <RecipeDetails />
              </ProtectedRoute>
            } 
          />

          {/* 🔒 LOCKED: Only logged in users can apply to be dietitians */}
          <Route 
            path="/dietitians/join" 
            element={
              <ProtectedRoute>
                <BecomeDietitian />
              </ProtectedRoute>
            } 
          />

        </Routes>
      </DietProvider>
    </AuthProvider>
  );
};

export default App;