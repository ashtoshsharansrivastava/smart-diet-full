import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDiet } from '../context/DietContext'; // Importing context
import Layout from '../components/layout/Layout';
import { ChevronRight, ChevronLeft, Check, Activity } from 'lucide-react';

const IntakeForm = () => {
  const navigate = useNavigate();
  // Get savePlanToDB from context to save to MongoDB
  const { userProfile, updateProfile, savePlanToDB } = useDiet(); 
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // --- HELPER HANDLERS ---

  const toggleSelection = (field, item) => {
    const current = userProfile[field] || [];
    const updated = current.includes(item)
      ? current.filter(i => i !== item)
      : [...current, item];
    updateProfile(field, updated);
  };

  const toggleCondition = (conditionId) => {
    let current = [...userProfile.conditions];

    if (conditionId === 'none') {
      updateProfile('conditions', ['none']);
    } else {
      if (current.includes('none')) current = [];
      if (current.includes(conditionId)) {
        current = current.filter(c => c !== conditionId);
      } else {
        current.push(conditionId);
      }
      updateProfile('conditions', current);
    }
  };

  // --- FINAL SUBMISSION HANDLER ---
  const handleSubmit = async () => {
    setLoading(true);
    
    // 1. Generate the Plan (Mock Logic - later this comes from Python AI)
    const mockPlan = generateMockPlan(userProfile);
    
    // 2. Update Local State so we can show it immediately
    updateProfile('generatedPlan', mockPlan);

    // 3. Save to Backend Database (MongoDB)
    await savePlanToDB(mockPlan);

    setLoading(false);
    navigate('/diet-plan');
  };

  // --- MOCK AI LOGIC (Matches your backend schema) ---
  const generateMockPlan = (profile) => {
    const isThyroid = profile.conditions.includes('thyroid');
    const isHealthy = profile.conditions.includes('none') || profile.conditions.length === 0;
    
    let baseCalories = profile.gender === 'male' ? 2000 : 1800;
    if (profile.activityLevel === 'active') baseCalories += 400;
    if (profile.activityLevel === 'very_active') baseCalories += 700;

    return {
      title: isHealthy ? "Fitness & Vitality Plan" : (isThyroid ? "Thyroid & Metabolic Support" : "Therapeutic Health Plan"),
      calories: baseCalories,
      // You can expand this structure to match what your Backend expects
      macros: {
        calories: baseCalories,
        protein: "High",
        carbs: "Moderate",
        fats: "Low"
      },
      warnings: profile.exclusions.includes('onion') ? "Sattvic / Jain Friendly" : "Standard",
    };
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 font-display">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          
          {/* Progress Header */}
          <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex justify-between items-center">
             <div>
               <h2 className="text-xl font-bold text-slate-800">
                 {step === 1 && "Personal Details"}
                 {step === 2 && "Health Profile"}
                 {step === 3 && "Diet Preferences"}
               </h2>
               <p className="text-sm text-slate-500">Step {step} of 3</p>
             </div>
             <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
               <div className="h-full bg-emerald-500 transition-all duration-500 ease-out" style={{ width: `${(step / 3) * 100}%` }}></div>
             </div>
          </div>

          <div className="p-8 md:p-10">
            {/* STEP 1: BIO + ACTIVITY */}
            {step === 1 && (
              <div className="animate-fade-in-up space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Age</label>
                    <input type="number" value={userProfile.age} onChange={e => updateProfile('age', e.target.value)} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-emerald-500 focus:bg-white outline-none font-bold" placeholder="Years" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Gender</label>
                    <select value={userProfile.gender} onChange={e => updateProfile('gender', e.target.value)} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-emerald-500 outline-none font-bold">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Height (cm)</label>
                    <input type="number" value={userProfile.height} onChange={e => updateProfile('height', e.target.value)} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-emerald-500 focus:bg-white outline-none font-bold" placeholder="170" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Weight (kg)</label>
                    <input type="number" value={userProfile.weight} onChange={e => updateProfile('weight', e.target.value)} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-emerald-500 focus:bg-white outline-none font-bold" placeholder="75" />
                  </div>

                  {/* Physical Activity */}
                  <div className="col-span-2 mt-4">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Activity Level</label>
                    <div className="relative">
                      <Activity className="absolute top-4 left-4 text-slate-400" size={20} />
                      <select 
                        value={userProfile.activityLevel} 
                        onChange={e => updateProfile('activityLevel', e.target.value)}
                        className="w-full p-4 pl-12 bg-slate-50 border-2 border-slate-100 rounded-xl appearance-none focus:border-emerald-500 outline-none font-bold text-slate-700"
                      >
                        <option value="sedentary">Sedentary (Little/No Exercise)</option>
                        <option value="light">Lightly Active (1-3 days/week)</option>
                        <option value="moderate">Moderately Active (3-5 days/week)</option>
                        <option value="active">Very Active (6-7 days/week)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: HEALTH CONDITIONS */}
            {step === 2 && (
              <div className="animate-fade-in-up">
                <h2 className="text-xl font-bold text-slate-900 mb-2">Medical Profile</h2>
                <p className="text-slate-500 mb-6 text-sm">Select any diagnosed conditions so we can filter safe foods.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'none', label: 'None (I am Healthy)', icon: '💪' },
                    { id: 'diabetes', label: 'Diabetes (Type 2)', icon: '🩸' },
                    { id: 'hypertension', label: 'Hypertension', icon: '❤️' },
                    { id: 'thyroid', label: 'Thyroid Issue', icon: '🦋' },
                    { id: 'pcod', label: 'PCOD / PCOS', icon: '🌸' },
                    { id: 'cholesterol', label: 'High Cholesterol', icon: '🍔' },
                    { id: 'uric_acid', label: 'High Uric Acid', icon: '🦶' }
                  ].map((condition) => (
                    <div 
                      key={condition.id}
                      onClick={() => toggleCondition(condition.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${userProfile.conditions.includes(condition.id) ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500' : 'border-slate-100 hover:border-emerald-200 hover:bg-slate-50'}`}
                    >
                      <span className="font-bold flex items-center gap-3 text-slate-700">
                        <span className="text-xl">{condition.icon}</span> {condition.label}
                      </span>
                      {userProfile.conditions.includes(condition.id) && <Check size={20} className="text-emerald-500" />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: DIET PREFERENCES */}
            {step === 3 && (
              <div className="animate-fade-in-up">
                <h2 className="text-xl font-bold text-slate-900 mb-2">Food Preferences</h2>
                <p className="text-slate-500 mb-6 text-sm">We customize for Indian household needs.</p>

                {/* Diet Type */}
                <div className="mb-8">
                  <label className="block text-sm font-bold text-slate-700 mb-3">Dietary Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['veg', 'eggitarian', 'non-veg', 'vegan'].map((type) => (
                      <button
                        key={type}
                        onClick={() => updateProfile('dietType', type)}
                        className={`py-3 px-2 rounded-xl text-sm font-bold capitalize transition-all border-2 ${userProfile.dietType === type ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 text-slate-600 hover:border-emerald-200'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Specifics */}
                {userProfile.dietType === 'non-veg' && (
                  <div className="mb-6 p-5 bg-orange-50 rounded-2xl border border-orange-100">
                    <label className="block text-xs font-bold text-orange-800 uppercase tracking-wider mb-3">Meat Preferences</label>
                    <div className="flex flex-wrap gap-2">
                      {['Chicken', 'Fish', 'Mutton', 'Beef', 'Pork'].map((meat) => (
                        <button
                          key={meat}
                          onClick={() => toggleSelection('meatPreferences', meat)}
                          className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${userProfile.meatPreferences?.includes(meat) ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-orange-900 border border-orange-200 hover:bg-orange-100'}`}
                        >
                          {meat}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {(userProfile.dietType === 'veg' || userProfile.dietType === 'vegan') && (
                  <div className="mb-6 p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <label className="block text-xs font-bold text-emerald-800 uppercase tracking-wider mb-3">Exclusions (Sattvic/Jain)</label>
                    <div className="flex flex-wrap gap-2">
                      {[{id: 'onion', label: 'No Onion'}, {id: 'garlic', label: 'No Garlic'}, {id: 'root_veg', label: 'No Root Veg'}].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => toggleSelection('exclusions', item.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${userProfile.exclusions.includes(item.id) ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-emerald-900 border border-emerald-200 hover:bg-emerald-100'}`}
                        >
                           {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="bg-slate-50 p-6 flex justify-between border-t border-slate-100">
            <button 
              onClick={() => setStep(s => Math.max(1, s - 1))}
              disabled={step === 1}
              className={`flex items-center px-6 py-3 rounded-xl font-bold text-slate-500 hover:text-slate-800 transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
            >
              <ChevronLeft size={20} className="mr-1" /> Back
            </button>

            {step < 3 ? (
               <button 
               onClick={() => setStep(s => s + 1)}
               className="flex items-center bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-emerald-200 transition-all hover:scale-105"
             >
               Next Step <ChevronRight size={20} className="ml-2" />
             </button>
            ) : (
              <button 
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center bg-slate-900 hover:bg-black text-white px-8 py-3.5 rounded-xl font-bold shadow-xl transition-all hover:scale-105"
            >
              {loading ? (
                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div> Generating...</>
              ) : (
                <>Generate Plan <Activity size={20} className="ml-2" /></>
              )}
            </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IntakeForm;