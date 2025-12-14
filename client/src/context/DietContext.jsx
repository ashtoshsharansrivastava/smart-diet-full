import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const DietContext = createContext();

export const DietProvider = ({ children }) => {
  // Core State
  const [userProfile, setUserProfile] = useState({
    name: '',
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    activityLevel: 'moderate',
    conditions: [], // e.g. ['diabetes', 'thyroid']
    dietType: 'veg',
    allergies: [],
    exclusions: [],
    generatedPlan: null // Stores the current active plan
  });

  // History State
  const [planHistory, setPlanHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Helper to update profile fields
  const updateProfile = (field, value) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  };

  // --- NEW: API ACTIONS ---

  // 1. Save the current plan to Database
  const savePlanToDB = async (planDetails) => {
    try {
      const token = localStorage.getItem('smartDietToken');
      if (!token) return; // Can't save if not logged in

      const payload = {
        title: planDetails.title,
        planData: planDetails, // In future, this will be the full AI JSON
        macros: {
          calories: planDetails.calories,
          protein: "60g", // Mock data for now
          carbs: "200g",
          fats: "50g"
        }
      };

      const res = await axios.post('/api/diet-plans', payload, {
        headers: { 'x-auth-token': token }
      });
      
      console.log("Plan Saved:", res.data);
      // Optional: Add to local history immediately
      setPlanHistory(prev => [res.data, ...prev]);

    } catch (error) {
      console.error("Error saving plan:", error);
    }
  };

  // 2. Fetch User History
  const fetchHistory = async () => {
    try {
      setLoadingHistory(true);
      const token = localStorage.getItem('smartDietToken');
      if (!token) return;

      const res = await axios.get('/api/diet-plans', {
        headers: { 'x-auth-token': token }
      });
      setPlanHistory(res.data);
      setLoadingHistory(false);
    } catch (error) {
      console.error("Error fetching history:", error);
      setLoadingHistory(false);
    }
  };

  // 3. Delete Plan
  const deletePlan = async (id) => {
    try {
      const token = localStorage.getItem('smartDietToken');
      await axios.delete(`/api/diet-plans/${id}`, {
        headers: { 'x-auth-token': token }
      });
      // Remove from local state
      setPlanHistory(prev => prev.filter(plan => plan._id !== id));
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  return (
    <DietContext.Provider value={{ 
      userProfile, 
      updateProfile, 
      planHistory,
      fetchHistory,
      savePlanToDB,
      deletePlan,
      loadingHistory
    }}>
      {children}
    </DietContext.Provider>
  );
};

export const useDiet = () => useContext(DietContext);