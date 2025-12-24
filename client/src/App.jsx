import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Added Navigate
import { AuthProvider } from './context/AuthContext';
import { DietProvider } from './context/DietContext';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import IntakeForm from './pages/IntakeForm'; 
import DietChart from './pages/DietChart';
import RecipeDetails from './pages/RecipeDetails';
import ShoppingList from './pages/ShoppingList';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Dietitians from './pages/Dietitians';
import DietitianDetails from './pages/DietitianDetails';
import BecomeDietitian from './pages/BecomeDietitian'; 
import AdminDashboard from './pages/AdminDashboard'; // Ensure this file exists in this folder
import DietitianDashboard from './pages/DietitianDashboard';
import FindDietitians from './pages/FindDietitians';  

// Security
import ProtectedRoute from './components/auth/ProtectedRoute'; 

// --- NEW COMPONENT: Admin Guard ---
// This checks if the user is logged in AND is an admin
const AdminRoute = ({ children }) => {
  // We check localStorage directly to see the role
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  
  if (userInfo && userInfo.role === 'admin') {
    return children;
  } else {
    // If not admin, kick them back to home
    return <Navigate to="/" replace />;
  }
};

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
          <Route 
  path="/dietitian/dashboard" 
  element={
    <ProtectedRoute>
      <DietitianDashboard />
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

          {/* 🛡️ ADMIN ROUTE: Only accessible by Admin role */}
          <Route 
            path="/admin/dashboard" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
          <Route path="/find-expert" element={<FindDietitians />} />

        </Routes>
      </DietProvider>
    </AuthProvider>
  );
};

export default App;