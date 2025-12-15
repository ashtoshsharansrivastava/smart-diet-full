import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDiet } from '../context/DietContext';
import Layout from '../components/layout/Layout';
import { ChevronRight, ChevronLeft, Check, Activity, Thermometer, User, Utensils } from 'lucide-react';

const IntakeForm = () => {
  const navigate = useNavigate();
  const { userProfile, updateProfile, savePlanToDB } = useDiet();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // --- HELPER HANDLERS ---
  const toggleSelection = (field, item) => {
    const current = userProfile[field] || [];
    const updated = current.includes(item) ? current.filter(i => i !== item) : [...current, item];
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

  const handleSubmit = async () => {
    setLoading(true);
    // Mock Logic - Replace with Real AI later
    const mockPlan = generateMockPlan(userProfile);
    updateProfile('generatedPlan', mockPlan);
    await savePlanToDB(mockPlan);
    setLoading(false);
    navigate('/diet-plan');
  };

  const generateMockPlan = (profile) => {
    const isThyroid = profile.conditions.includes('thyroid');
    const isHealthy = profile.conditions.includes('none') || profile.conditions.length === 0;
    let baseCalories = profile.gender === 'male' ? 2000 : 1800;
    if (profile.activityLevel === 'active') baseCalories += 400;
    if (profile.activityLevel === 'very_active') baseCalories += 700;

    return {
      title: isHealthy ? "Vitality Protocol v1.0" : (isThyroid ? "Metabolic Support Protocol" : "Therapeutic Bio-Plan"),
      calories: baseCalories,
      macros: { calories: baseCalories, protein: "High", carbs: "Moderate", fats: "Low" },
      warnings: profile.exclusions.includes('onion') ? "Sattvic Mode Active" : "Standard Optimization",
    };
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 font-display text-slate-200 relative overflow-hidden">
        
        {/* Background Glows */}
        <div className="absolute top-0 left-0 w-full h-96 bg-emerald-500/10 blur-[120px] pointer-events-none"></div>

        <div className="relative max-w-3xl mx-auto bg-slate-900/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-800 overflow-hidden">
          
          {/* Progress Header */}
          <div className="bg-slate-900/50 px-8 py-6 border-b border-slate-800 flex justify-between items-center">
             <div>
               <h2 className="text-xl font-bold text-white flex items-center gap-2">
                 {step === 1 && <><User className="text-emerald-500"/> Biometrics</>}
                 {step === 2 && <><Thermometer className="text-emerald-500"/> Medical Scan</>}
                 {step === 3 && <><Utensils className="text-emerald-500"/> Nutrition Data</>}
               </h2>
               <p className="text-xs font-mono text-emerald-500/80 mt-1 tracking-wider uppercase">Sequence {step} / 3</p>
             </div>
             <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
               <div className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] transition-all duration-500 ease-out" style={{ width: `${(step / 3) * 100}%` }}></div>
             </div>
          </div>

          <div className="p-8 md:p-10">
            {/* STEP 1: BIO + ACTIVITY */}
            {step === 1 && (
              <div className="animate-fade-in-up space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Age</label>
                    <input type="number" value={userProfile.age} onChange={e => updateProfile('age', e.target.value)} className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white font-bold transition-all" placeholder="Years" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Gender</label>
                    <select value={userProfile.gender} onChange={e => updateProfile('gender', e.target.value)} className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl focus:border-emerald-500 outline-none text-white font-bold">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Height (cm)</label>
                    <input type="number" value={userProfile.height} onChange={e => updateProfile('height', e.target.value)} className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl focus:border-emerald-500 outline-none text-white font-bold" placeholder="170" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Weight (kg)</label>
                    <input type="number" value={userProfile.weight} onChange={e => updateProfile('weight', e.target.value)} className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl focus:border-emerald-500 outline-none text-white font-bold" placeholder="75" />
                  </div>

                  {/* Physical Activity */}
                  <div className="col-span-2 mt-4">
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Activity Level</label>
                    <div className="relative">
                      <Activity className="absolute top-4 left-4 text-emerald-500" size={20} />
                      <select 
                        value={userProfile.activityLevel} 
                        onChange={e => updateProfile('activityLevel', e.target.value)}
                        className="w-full p-4 pl-12 bg-slate-950 border border-slate-800 rounded-xl appearance-none focus:border-emerald-500 outline-none text-white font-bold"
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
                <h2 className="text-xl font-bold text-white mb-2">Medical Profile</h2>
                <p className="text-slate-400 mb-6 text-sm">Select diagnosed conditions for safe filtering.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'none', label: 'None (Healthy)', icon: '💪' },
                    { id: 'diabetes', label: 'Diabetes Type 2', icon: '🩸' },
                    { id: 'hypertension', label: 'Hypertension', icon: '❤️' },
                    { id: 'thyroid', label: 'Thyroid Issue', icon: '🦋' },
                    { id: 'pcod', label: 'PCOD / PCOS', icon: '🌸' },
                    { id: 'cholesterol', label: 'High Cholesterol', icon: '🍔' },
                    { id: 'uric_acid', label: 'High Uric Acid', icon: '🦶' }
                  ].map((condition) => (
                    <div 
                      key={condition.id}
                      onClick={() => toggleCondition(condition.id)}
                      className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all duration-300 ${userProfile.conditions.includes(condition.id) ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'border-slate-800 bg-slate-950/50 hover:border-slate-600'}`}
                    >
                      <span className="font-bold flex items-center gap-3 text-slate-200">
                        <span className="text-xl opacity-80">{condition.icon}</span> {condition.label}
                      </span>
                      {userProfile.conditions.includes(condition.id) && <Check size={20} className="text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]" />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: DIET PREFERENCES */}
            {step === 3 && (
              <div className="animate-fade-in-up">
                <h2 className="text-xl font-bold text-white mb-2">Food Preferences</h2>
                <p className="text-slate-400 mb-6 text-sm">Customizing for Indian household needs.</p>

                {/* Diet Type */}
                <div className="mb-8">
                  <label className="block text-xs font-bold text-slate-400 mb-3 uppercase tracking-wide">Dietary Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['veg', 'eggitarian', 'non-veg', 'vegan'].map((type) => (
                      <button
                        key={type}
                        onClick={() => updateProfile('dietType', type)}
                        className={`py-3 px-2 rounded-xl text-sm font-bold capitalize transition-all border ${userProfile.dietType === type ? 'border-emerald-500 bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-600'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Specifics */}
                {userProfile.dietType === 'non-veg' && (
                  <div className="mb-6 p-5 bg-orange-950/30 rounded-2xl border border-orange-500/30">
                    <label className="block text-xs font-bold text-orange-400 uppercase tracking-wider mb-3">Meat Preferences</label>
                    <div className="flex flex-wrap gap-2">
                      {['Chicken', 'Fish', 'Mutton', 'Beef', 'Pork'].map((meat) => (
                        <button
                          key={meat}
                          onClick={() => toggleSelection('meatPreferences', meat)}
                          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all border ${userProfile.meatPreferences?.includes(meat) ? 'bg-orange-600 border-orange-500 text-white shadow-[0_0_10px_rgba(234,88,12,0.4)]' : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'}`}
                        >
                          {meat}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {(userProfile.dietType === 'veg' || userProfile.dietType === 'vegan') && (
                  <div className="mb-6 p-5 bg-emerald-950/30 rounded-2xl border border-emerald-500/30">
                    <label className="block text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">Exclusions (Sattvic/Jain)</label>
                    <div className="flex flex-wrap gap-2">
                      {[{id: 'onion', label: 'No Onion'}, {id: 'garlic', label: 'No Garlic'}, {id: 'root_veg', label: 'No Root Veg'}].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => toggleSelection('exclusions', item.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all border ${userProfile.exclusions.includes(item.id) ? 'bg-emerald-600 border-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'}`}
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
          <div className="bg-slate-900/80 backdrop-blur p-6 flex justify-between border-t border-slate-800">
            <button 
              onClick={() => setStep(s => Math.max(1, s - 1))}
              disabled={step === 1}
              className={`flex items-center px-6 py-3 rounded-xl font-bold text-slate-400 hover:text-white transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
            >
              <ChevronLeft size={20} className="mr-1" /> Back
            </button>

            {step < 3 ? (
               <button 
               onClick={() => setStep(s => s + 1)}
               className="flex items-center bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-3.5 rounded-xl font-bold shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all hover:scale-105"
             >
               Next Step <ChevronRight size={20} className="ml-2" />
             </button>
            ) : (
              <button 
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center bg-slate-100 hover:bg-white text-slate-900 px-8 py-3.5 rounded-xl font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105"
            >
              {loading ? (
                <><div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin mr-3"></div> Processing...</>
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