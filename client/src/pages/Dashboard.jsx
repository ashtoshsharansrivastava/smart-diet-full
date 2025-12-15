import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { useDiet } from '../context/DietContext';
import { User, Settings, Clock, Activity, Calendar, ArrowRight, Trash2, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const { planHistory, fetchHistory, deletePlan, updateProfile, loadingHistory } = useDiet();
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleViewPlan = (plan) => {
    updateProfile('generatedPlan', plan.planData);
    navigate('/diet-plan');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-950 py-8 px-4 font-display text-slate-200">
        <div className="max-w-6xl mx-auto">
          
          <h1 className="text-3xl font-extrabold text-white mb-8 tracking-tight">My Health Command Center</h1>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: Profile Card */}
            <div className="md:col-span-1 space-y-8">
              <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-3xl border border-slate-800 sticky top-24 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-emerald-400 font-bold text-2xl border border-slate-700 shadow-inner">
                    {user?.name?.charAt(0) || <User />}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{user?.name}</h2>
                    <p className="text-xs font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded-full inline-block mt-1">Free Member</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <InfoRow label="Email" value={user?.email} />
                  <InfoRow label="Goal" value="Bio-Optimization" />
                </div>

                <Link to="/generate" className="w-full mt-6 flex items-center justify-center gap-2 border border-slate-700 text-slate-400 font-bold py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all">
                  <Settings size={18} /> Update Metrics
                </Link>
              </div>
            </div>

            {/* RIGHT COLUMN: Stats & History */}
            <div className="md:col-span-2 space-y-8">
              
              {/* Quick Actions Banner */}
              <div className="bg-gradient-to-r from-emerald-900 to-slate-900 rounded-3xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden border border-emerald-500/20 group">
                 <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                       <Zap className="fill-emerald-400 text-emerald-400" /> Generate New Protocol
                    </h2>
                    <p className="text-emerald-100/70 text-sm">Update your biometrics for a fresh AI recommendation.</p>
                 </div>
                 <Link to="/generate" className="relative z-10 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105">
                    Initialize AI
                 </Link>
                 {/* Decorative background glow */}
                 <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/30 transition-all duration-700"></div>
              </div>

              {/* Recent Plans History */}
              <div className="bg-slate-900/50 backdrop-blur-md p-8 rounded-3xl border border-slate-800 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Clock size={20} className="text-slate-500" /> Protocol History
                </h3>
                
                {loadingHistory ? (
                  <div className="text-center py-10 text-slate-500 animate-pulse">Syncing with database...</div>
                ) : planHistory.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600">
                      <Calendar />
                    </div>
                    <p className="text-slate-500 font-medium">No protocols generated yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {planHistory.map(plan => (
                      <div key={plan._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/50 transition-all group bg-slate-950/30">
                        <div className="flex items-center gap-4 mb-4 sm:mb-0">
                          <div className="bg-slate-800 p-3 rounded-xl text-emerald-500 font-bold group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors shadow-inner">
                             {new Date(plan.createdAt).getDate()}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-200 text-lg group-hover:text-white transition-colors">{plan.title}</h4>
                            <p className="text-xs text-slate-500 font-mono">
                              {new Date(plan.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <button 
                             onClick={() => handleViewPlan(plan)}
                             className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-800 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 px-4 py-2 rounded-lg font-bold text-sm transition-all border border-slate-700 hover:border-emerald-500/50"
                          >
                            Access <ArrowRight size={16} />
                          </button>
                          <button 
                            onClick={() => deletePlan(plan._id)}
                            className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Delete Plan"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-3 border-b border-slate-800 last:border-0">
    <span className="text-slate-500 text-sm font-medium">{label}</span>
    <span className="text-slate-300 font-bold truncate max-w-[150px]">{value || '--'}</span>
  </div>
);

export default Dashboard;