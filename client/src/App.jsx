import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DietProvider } from './context/DietContext';
import { AuthProvider } from './context/AuthContext'; // 👈 Import this
import Pricing from './pages/Pricing';   // 👈 Import this
import Features from './pages/Features'; // 👈 Import this

// Components
import ProtectedRoute from './components/common/ProtectedRoute'; // 👈 Import this

// Pages
import LandingPage from './pages/LandingPage';
import IntakeForm from './pages/IntakeForm';
import DietChart from './pages/DietChart';
import Login from './pages/Login';
import RecipeDetails from './pages/RecipeDetails';
import ShoppingList from './pages/ShoppingList';
import Dashboard from './pages/Dashboard';
import Signup from './pages/SignUp';
import DietPlan from './pages/DietPlan';

function App() {
  return (
    <AuthProvider> {/* 👈 Wrap everything in AuthProvider first */}
      <DietProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/generate" element={<IntakeForm />} />
            <Route path="/diet-plan" element={<DietChart />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/shopping-list" element={<ShoppingList />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/features" element={<Features />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/diet-plan" element={<DietPlan />} />

            {/* Protected Routes (Only for logged in users) */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </DietProvider>
    </AuthProvider>
  );
}

export default App;