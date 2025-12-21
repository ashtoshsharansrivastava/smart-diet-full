import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { CheckCircle, Upload, DollarSign, Award, ArrowRight } from 'lucide-react';
import api from '../config/api'; 

const BecomeDietitian = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    specialization: 'General Nutrition',
    experience: '',
    hourlyRate: '',
    bio: '',
    calendlyLink: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/api/dietitians/onboard', formData);
      alert("Application Submitted! You are now listed as an Expert.");
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
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-white mb-4">Join the <span className="text-emerald-400">Expert Panel</span></h1>
            <p className="text-slate-400">Monetize your expertise and help millions live healthier.</p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1 */}
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

              {/* Row 2 */}
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
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Calendly Link</label>
                  <input 
                    type="url" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white outline-none focus:border-emerald-500"
                    placeholder="https://calendly.com/your-name"
                    value={formData.calendlyLink}
                    onChange={e => setFormData({...formData, calendlyLink: e.target.value})}
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Professional Bio</label>
                <textarea 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white outline-none focus:border-emerald-500 h-32"
                  placeholder="Tell patients about your approach..."
                  value={formData.bio}
                  onChange={e => setFormData({...formData, bio: e.target.value})}
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2"
              >
                {loading ? 'Processing...' : <>Join Network <ArrowRight size={20} /></>}
              </button>

            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BecomeDietitian;