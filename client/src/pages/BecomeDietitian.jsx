import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Crown, DollarSign, Clock, Calendar, Check, Link as LinkIcon, AlertTriangle } from 'lucide-react';
import axios from 'axios';

const BecomeDietitian = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // To show error messages

  const [formData, setFormData] = useState({
    specialization: 'General Nutrition',
    experience: 0,
    hourlyRate: 500,
    bio: '',
    availableDays: [],
    meetingUrl: ''
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const toggleDay = (day) => {
    setFormData(prev => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter(d => d !== day)
        : [...prev.availableDays, day]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Get the Token from Local Storage
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      
      if (!userInfo || !userInfo.token) {
        throw new Error("You must be logged in to apply.");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`, // 👈 CRITICAL: This fixes the 401 Error
        },
      };

      // 2. Send the Request
      const BACKEND_URL = "https://smart-diet-full.onrender.com";
      await axios.post(`${BACKEND_URL}/api/dietitians/onboard`, formData, config);

      // 3. Success! Redirect to Dashboard
      alert("Application Submitted! Status: Pending Approval.");
      navigate('/dashboard');

    } catch (err) {
      console.error("Application Error:", err);
      // Show readable error message
      setError(err.response?.data?.message || err.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-950 py-10 px-4 font-display text-slate-200">
        <div className="max-w-2xl mx-auto">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-white mb-2">
              Join as an <span className="text-emerald-400">Expert</span>
            </h1>
            <p className="text-slate-400">Set your schedule and start consulting.</p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6 flex items-center gap-3">
              <AlertTriangle size={20} />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-slate-900/50 backdrop-blur-md p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
            
            {/* Specialization & Experience */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Specialization</label>
                <select 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-emerald-500 outline-none"
                  value={formData.specialization}
                  onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                >
                  <option>General Nutrition</option>
                  <option>Sports Dietetics</option>
                  <option>Weight Loss</option>
                  <option>Keto Expert</option>
                  <option>Vegan Nutrition</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Experience (Years)</label>
                <div className="relative">
                  <Crown size={16} className="absolute top-3.5 left-4 text-emerald-500" />
                  <input 
                    type="number" 
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 pl-12 text-white focus:border-emerald-500 outline-none"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: Number(e.target.value)})}
                  />
                </div>
              </div>
            </div>

            {/* Rate & Bio */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Hourly Rate (₹)</label>
                <div className="relative">
                  <DollarSign size={16} className="absolute top-3.5 left-4 text-emerald-500" />
                  <input 
                    type="number" 
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 pl-12 text-white focus:border-emerald-500 outline-none"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({...formData, hourlyRate: Number(e.target.value)})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Short Bio</label>
                <input 
                  type="text" 
                  required
                  placeholder="I specialize in..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-emerald-500 outline-none"
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                />
              </div>
            </div>

            {/* Available Days */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-2">
                <Calendar size={14} /> Select Available Days
              </label>
              <div className="flex flex-wrap gap-2">
                {days.map(day => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all border ${
                      formData.availableDays.includes(day)
                        ? 'bg-emerald-500 text-slate-950 border-emerald-500'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-emerald-500/50'
                    }`}
                  >
                    {formData.availableDays.includes(day) && <Check size={12} className="inline mr-1" />}
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Meeting URL */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Meeting Link (Optional)</label>
              <div className="relative">
                <LinkIcon size={16} className="absolute top-3.5 left-4 text-slate-500" />
                <input 
                  type="url" 
                  placeholder="Zoom / Google Meet / Calendly URL"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 pl-12 text-white focus:border-emerald-500 outline-none"
                  value={formData.meetingUrl}
                  onChange={(e) => setFormData({...formData, meetingUrl: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50"
            >
              {loading ? "Submitting Application..." : "Complete Profile →"}
            </button>

          </form>
        </div>
      </div>
    </Layout>
  );
};

export default BecomeDietitian;