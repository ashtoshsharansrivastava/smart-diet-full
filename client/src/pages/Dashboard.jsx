import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { useDiet } from '../context/DietContext'; // 👈 Import DietContext
import { User, Settings, Clock, Activity, TrendingDown, Calendar, ArrowRight, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  // Get history and delete functions from Context
  const { planHistory, fetchHistory, deletePlan, updateProfile, loadingHistory } = useDiet(); 
  const navigate = useNavigate();

  // Load history from MongoDB when Dashboard opens
  useEffect(() => {
    fetchHistory();
  }, []);

  const handleViewPlan = (plan) => {
    // Set this plan as the "Active" one so DietChart can render it
    updateProfile('generatedPlan', plan.planData);
    navigate('/diet-plan');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 py-8 px-4 font-display">
        <div className="max-w-6xl mx-auto">
          
          <h1 className="text-3xl font-extrabold text-slate-900 mb-8">My Health Dashboard</h1>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: Profile Card */}
            <div className="md:col-span-1 space-y-8">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 sticky top-24">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-2xl">
                    {user?.name?.charAt(0) || <User />}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">{user?.name}</h2>
                    <p className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">Free Member</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Using Real User Data from Database */}
                  <InfoRow label="Email" value={user?.email} />
                  <InfoRow label="Goal" value="Healthy Living" />
                </div>

                <Link to="/generate" className="w-full mt-6 flex items-center justify-center gap-2 border border-slate-200 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <Settings size={18} /> Update Profile
                </Link>
              </div>
            </div>

            {/* RIGHT COLUMN: Stats & History */}
            <div className="md:col-span-2 space-y-8">
              
              {/* Quick Actions Banner */}
              <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
                 <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-2">Generate New Plan</h2>
                    <p className="text-slate-400 text-sm">Update your metrics and get a fresh AI recommendation.</p>
                 </div>
                 <Link to="/generate" className="relative z-10 bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/50">
                    Create Now
                 </Link>
                 {/* Decorative background glow */}
                 <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              </div>

              {/* Recent Plans History */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Clock size={20} className="text-slate-400" /> Plan History
                </h3>
                
                {loadingHistory ? (
                  <div className="text-center py-10 text-slate-400">Loading your history...</div>
                ) : planHistory.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="text-slate-300" />
                    </div>
                    <p className="text-slate-500 font-medium">No plans generated yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {planHistory.map(plan => (
                      <div key={plan._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all group bg-white">
                        <div className="flex items-center gap-4 mb-4 sm:mb-0">
                          <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600 font-bold group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                            {new Date(plan.createdAt).getDate()}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 text-lg">{plan.title}</h4>
                            <p className="text-xs text-slate-400 font-medium">
                              Created: {new Date(plan.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <button 
                             onClick={() => handleViewPlan(plan)}
                             className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 px-4 py-2 rounded-lg font-bold text-sm transition-colors"
                          >
                            View <ArrowRight size={16} />
                          </button>
                          <button 
                            onClick={() => deletePlan(plan._id)}
                            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
  <div className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0">
    <span className="text-slate-500 text-sm font-medium">{label}</span>
    <span className="text-slate-800 font-bold truncate max-w-[150px]">{value || '--'}</span>
  </div>
);

export default Dashboard;