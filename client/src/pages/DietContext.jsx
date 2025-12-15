import React, { createContext, useContext, useState } from 'react';
import api from '../config/api'; // Ensure this matches your API config path

const DietContext = createContext();

export const DietProvider = ({ children }) => {
  // --- CORE STATE ---
  const [userProfile, setUserProfile] = useState({
    // Bio
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    activityLevel: 'sedentary',
    
    // Conditions & Preferences
    conditions: [],
    dietType: 'veg', 
    meatPreferences: [], 
    exclusions: [], 
    
    generatedPlan: null 
  });

  const [planHistory, setPlanHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // --- ACTIONS ---

  const updateProfile = (field, value) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  };

  // 1. SAVE PLAN (MongoDB)
  const savePlanToDB = async (planDetails) => {
    try {
      const payload = {
        title: planDetails.title,
        planData: planDetails, 
        macros: planDetails.macros || { calories: 2000, protein: "60g" }
      };

      const res = await api.post('/api/diet-plans', payload);
      setPlanHistory(prev => [res.data, ...prev]);
      console.log("Plan Saved to Cloud");
    } catch (error) {
      console.error("Save Error:", error);
    }
  };

  // 2. FETCH HISTORY
  const fetchHistory = async () => {
    try {
      setLoadingHistory(true);
      const res = await api.get('/api/diet-plans');
      setPlanHistory(res.data);
    } catch (error) {
      console.error("Fetch History Error:", error);
    } finally {
      setLoadingHistory(false);
    }
  };

  // 3. DELETE PLAN
  const deletePlan = async (id) => {
    try {
      await api.delete(`/api/diet-plans/${id}`);
      setPlanHistory(prev => prev.filter(p => p._id !== id));
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  return (
    <DietContext.Provider value={{ 
      userProfile, 
      updateProfile, 
      setUserProfile,
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