import React, { createContext, useContext, useState } from 'react';
import api from '../config/api'; // 👈 Uses your Render connection

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

  // --- API ACTIONS ---

  // 1. Save the current plan to Database
  const savePlanToDB = async (planDetails) => {
    try {
      // Note: We don't need to manually get the token here anymore.
      // AuthContext attaches it to 'api' automatically.

      const payload = {
        title: planDetails.title,
        planData: planDetails, 
        macros: {
          calories: planDetails.calories,
          protein: "60g", // Mock data for now
          carbs: "200g",
          fats: "50g"
        }
      };

      // 👇 Changed axios.post to api.post
      const res = await api.post('/api/diet-plans', payload);
      
      console.log("Plan Saved:", res.data);
      // Add to local history immediately
      setPlanHistory(prev => [res.data, ...prev]);

    } catch (error) {
      console.error("Error saving plan:", error);
    }
  };

  // 2. Fetch User History
  const fetchHistory = async () => {
    try {
      setLoadingHistory(true);
      
      // 👇 Changed axios.get to api.get
      const res = await api.get('/api/diet-plans');
      
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
      // 👇 Changed axios.delete to api.delete
      await api.delete(`/api/diet-plans/${id}`);
      
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