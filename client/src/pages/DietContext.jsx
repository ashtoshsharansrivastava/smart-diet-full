import React, { createContext, useState, useContext } from 'react';

const DietContext = createContext();

export const DietProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({
    // Basic Bio
    age: '',
    gender: 'male',
    height: '', // cm
    weight: '', // kg
    activityLevel: 'sedentary', // NEW: Physical Activity Level
    
    // Health Conditions 
    conditions: [], // Now supports 'none'
    
    // Indian Dietary Nuances
    dietType: 'veg', 
    meatPreferences: [], 
    exclusions: [], 
    
    generatedPlan: null 
  });

  const updateProfile = (field, value) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <DietContext.Provider value={{ userProfile, updateProfile, setUserProfile }}>
      {children}
    </DietContext.Provider>
  );
};

export const useDiet = () => useContext(DietContext);