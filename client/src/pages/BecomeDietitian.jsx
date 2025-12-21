import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { ArrowRight, Award, DollarSign, Calendar, Check } from 'lucide-react';
import api from '../config/api'; 

const BecomeDietitian = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    specialization: 'General Nutrition',
    experience: '',
    hourlyRate: '',
    bio: '',
    availability: [], // Stores selected days
    calendlyLink: ''
  });

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Toggle Logic
  const toggleDay = (day) => {
    setFormData(prev => {
      const currentDays = prev.availability;
      if (currentDays.includes(day)) {
        return { ...prev, availability: currentDays.filter(d => d !== day) }; // Remove
      } else {
        return { ...prev, availability: [...currentDays, day] }; // Add
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.availability.length === 0) {
        alert("Please select at least one available day.");
        setLoading(false);
        return;
    }

    try {
      await api.post('/api/dietitians/onboard', formData);
      alert("Application Submitted! You are now listed.");
      navigate('/dietitians');
    } catch (error) {
      console.error(error);
      alert("Failed to join. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-950 font-display text-slate-200 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-white mb-2">Join as an <span className="text-emerald-400">Expert</span></h1>
            <p className="text-slate-400">Set your schedule and start consulting.</p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Row 1: Spec & Exp */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Specialization</label>
                  <select 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white outline-none focus:border-emerald-500"
                    value={formData.specialization}
                    onChange={e => setFormData({...formData, specialization: e.target.value})}
                  >
                    <option>General Nutrition</option>
                    <option>Diabetes & Metabolic</option>
                    <option>PCOS & Hormonal</option>
                    <option>Sports & Performance</option>
                    <option>Gut Health</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Experience (Years)</label>
                  <div className="relative">
                    <Award className="absolute top-4 left-4 text-emerald-500" size={18} />
                    <input 
                      type="number" 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 pl-12 text-white outline-none focus:border-emerald-500"
                      placeholder="e.g. 5"
                      value={formData.experience}
                      onChange={e => setFormData({...formData, experience: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Rate & Bio */}
              <div className="grid md:grid-cols-2 gap-6">
                 <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Hourly Rate (₹)</label>
                  <div className="relative">
                    <DollarSign className="absolute top-4 left-4 text-emerald-500" size={18} />
                    <input 
                      type="number" 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 pl-12 text-white outline-none focus:border-emerald-500"
                      placeholder="e.g. 800"
                      value={formData.hourlyRate}
                      onChange={e => setFormData({...formData, hourlyRate: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div>
                   <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Short Bio</label>
                   <textarea 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white outline-none focus:border-emerald-500 h-[58px] resize-none"
                    placeholder="e.g. Expert in Keto..."
                    value={formData.bio}
                    onChange={e => setFormData({...formData, bio: e.target.value})}
                    required
                  ></textarea>
                </div>
              </div>

              {/* --- NEW: DAY SELECTOR --- */}
              <div>
                <label className="block text-xs font-bold text-emerald-400 mb-4 uppercase flex items-center gap-2">
                   <Calendar size={16}/> Select Available Days
                </label>
                
                <div className="flex flex-wrap gap-3">
                    {daysOfWeek.map((day) => {
                        const isSelected = formData.availability.includes(day);
                        return (
                            <button
                                key={day}
                                type="button"
                                onClick={() => toggleDay(day)}
                                className={`px-5 py-3 rounded-xl text-sm font-bold border transition-all flex items-center gap-2 ${
                                    isSelected
                                    ? 'bg-emerald-500 text-slate-950 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)] scale-105'
                                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-600 hover:text-white'
                                }`}
                            >
                                {isSelected && <Check size={14} strokeWidth={4} />}
                                {day}
                            </button>
                        );
                    })}
                </div>
              </div>

              {/* Optional Link (Just in case) */}
              <div className="pt-6 border-t border-slate-800 opacity-50 hover:opacity-100 transition-opacity">
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Meeting Link (Optional)</label>
                  <input 
                    type="url" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-400 text-sm focus:text-white outline-none focus:border-slate-600"
                    placeholder="Zoom / Google Meet / Calendly URL"
                    value={formData.calendlyLink}
                    onChange={e => setFormData({...formData, calendlyLink: e.target.value})}
                  />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2"
              >
                {loading ? 'Processing...' : <>Complete Profile <ArrowRight size={20} /></>}
              </button>

            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BecomeDietitian;