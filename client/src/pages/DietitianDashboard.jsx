import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { 
  Users, Calendar, Activity, 
  Search, MessageSquare, FileText, Plus 
} from 'lucide-react';

const DietitianDashboard = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalClients: 0, pendingPlans: 0, activePlans: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Safety Check: Ensure User is logged in
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        
        if (!userInfo || !userInfo.token) {
           console.error("No authentication token found.");
           navigate('/login'); // Redirect to login if token is missing
           return;
        }

        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const BACKEND_URL = "https://smart-diet-full.onrender.com"; // Your Render URL

        // 2. Fetch Clients
        const { data } = await axios.get(`${BACKEND_URL}/api/dietitians/clients`, config);
        
        // 3. Update State (Safety check: ensure data is array)
        if (Array.isArray(data)) {
            setClients(data);

            // Mock Stats Calculation (Since 'hasPlan' doesn't exist on users yet)
            setStats({
              totalClients: data.length,
              pendingPlans: data.length, // Assuming everyone needs a plan for now
              activePlans: 0 
            });
        }

      } catch (err) {
        console.error("Dietitian Dashboard Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <Layout>
      <div className="min-h-screen bg-slate-950 py-8 px-4 font-display text-slate-200">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-white">Dietitian Workspace</h1>
              <p className="text-slate-400 mt-1">Manage clients and optimize health protocols.</p>
            </div>
            <Link to="/generate" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <Plus size={18} /> Create New Plan
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatCard 
              icon={<Users className="text-blue-400" />} 
              label="Active Clients" 
              value={stats.totalClients} 
              color="bg-blue-500/10 border-blue-500/20" 
            />
            <StatCard 
              icon={<FileText className="text-amber-400" />} 
              label="Pending Plans" 
              value={stats.pendingPlans} 
              color="bg-amber-500/10 border-amber-500/20" 
            />
            <StatCard 
              icon={<Activity className="text-emerald-400" />} 
              label="Success Rate" 
              value="94%" 
              color="bg-emerald-500/10 border-emerald-500/20" 
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column: Client List */}
            <div className="lg:col-span-2">
              <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Users size={20} className="text-emerald-400" /> My Clients
                  </h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
                    <input type="text" placeholder="Search..." className="bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-emerald-500 outline-none" />
                  </div>
                </div>

                {loading ? (
                  <div className="p-10 text-center animate-pulse text-slate-500">Loading Clients...</div>
                ) : clients.length === 0 ? (
                  <div className="p-10 text-center text-slate-500">
                    No clients assigned yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-950/50 text-slate-400 text-xs uppercase">
                        <tr>
                          <th className="p-4 font-bold">Client Name</th>
                          <th className="p-4 font-bold">Status</th>
                          <th className="p-4 font-bold">Goal</th>
                          <th className="p-4 font-bold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {clients.map(client => (
                          <tr key={client._id} className="hover:bg-slate-800/50 transition-colors">
                            <td className="p-4 flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-emerald-500">
                                {client.name.charAt(0)}
                              </div>
                              <span className="font-bold text-slate-200">{client.name}</span>
                            </td>
                            <td className="p-4">
                              <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase rounded border border-emerald-500/20">Active</span>
                            </td>
                            <td className="p-4 text-sm text-slate-400">Weight Loss</td>
                            <td className="p-4 text-right flex justify-end gap-2">
                              <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white" title="Message"><MessageSquare size={16}/></button>
                              <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-emerald-400" title="View Plan"><FileText size={16}/></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Upcoming Schedule */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Calendar size={20} className="text-amber-400" /> Today's Schedule
                </h3>
                <div className="space-y-4">
                  {/* Mock Appointments */}
                  <Appointment time="10:00 AM" name="Rahul Sharma" type="Consultation" />
                  <Appointment time="02:30 PM" name="Sarah Jenkins" type="Follow-up" />
                  <Appointment time="04:00 PM" name="Amit Patel" type="Plan Review" />
                </div>
                <button className="w-full mt-4 py-3 border border-slate-700 hover:bg-slate-800 rounded-xl text-sm font-bold text-slate-300 transition-colors">
                  View Full Calendar
                </button>
              </div>

              <div className="bg-gradient-to-br from-emerald-900/50 to-slate-900 border border-emerald-500/20 rounded-3xl p-6">
                 <h4 className="font-bold text-white mb-2">Pro Tip</h4>
                 <p className="text-sm text-emerald-100/70">Review client logs every Friday to adjust macros for the weekend.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

// Helper Components
const StatCard = ({ icon, label, value, color }) => (
  <div className={`p-6 rounded-3xl border ${color} bg-slate-900/50 backdrop-blur-md`}>
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-slate-950 rounded-xl">{icon}</div>
      <span className="text-xs font-bold text-slate-500 uppercase">Last 30 Days</span>
    </div>
    <p className="text-3xl font-extrabold text-white">{value}</p>
    <p className="text-sm font-medium text-slate-400">{label}</p>
  </div>
);

const Appointment = ({ time, name, type }) => (
  <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-800 cursor-pointer">
    <div className="bg-slate-950 px-3 py-2 rounded-lg text-xs font-bold text-emerald-400 border border-slate-800">
      {time}
    </div>
    <div>
      <h5 className="font-bold text-slate-200 text-sm">{name}</h5>
      <p className="text-xs text-slate-500">{type}</p>
    </div>
  </div>
);

export default DietitianDashboard;