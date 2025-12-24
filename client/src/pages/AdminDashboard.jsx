import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout/Layout';
import { Users, ShieldCheck, Trash2, Crown, CheckCircle, XCircle } from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [applicants, setApplicants] = useState([]); // Stores pending dietitians
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to get token config
  const getConfig = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return { headers: { Authorization: `Bearer ${userInfo?.token}` } };
  };

  const fetchData = async () => {
    try {
      const config = getConfig();
      const BACKEND_URL = "https://smart-diet-full.onrender.com";

      // 1. Fetch All Users
      const usersRes = await axios.get(`${BACKEND_URL}/api/admin/users`, config);
      setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);

      // 2. Fetch Pending Applicants
      const applicantsRes = await axios.get(`${BACKEND_URL}/api/admin/applicants`, config);
      setApplicants(Array.isArray(applicantsRes.data) ? applicantsRes.data : []);

      setLoading(false);
    } catch (err) {
      console.error("Admin Fetch Error:", err);
      setError("Failed to load admin data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Approve/Reject Logic
  const handleReview = async (id, status) => {
    if (!window.confirm(`Are you sure you want to ${status} this applicant?`)) return;

    try {
      const config = getConfig();
      const BACKEND_URL = "https://smart-diet-full.onrender.com";
      
      // Send PUT request to /api/admin/applicants/:id
      await axios.put(`${BACKEND_URL}/api/admin/applicants/${id}`, { status }, config);
      
      alert(`User ${status} successfully!`);
      fetchData(); // Refresh lists

    } catch (err) {
      alert("Action failed: " + (err.response?.data?.message || err.message));
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const config = getConfig();
        const BACKEND_URL = "https://smart-diet-full.onrender.com";
        await axios.delete(`${BACKEND_URL}/api/admin/users/${id}`, config);
        setUsers(users.filter((user) => user._id !== id));
      } catch (err) {
        alert("Failed to delete user");
      }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-950 py-10 px-4 font-display text-slate-200">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                <ShieldCheck className="text-red-500" size={32} /> 
                Admin Command Center
              </h1>
              <p className="text-slate-400 mt-2">Manage Users & Dietitian Approvals</p>
            </div>
          </div>

          {error && <div className="text-red-400 mb-4 bg-red-500/10 p-4 rounded border border-red-500/20">{error}</div>}

          {/* 🚀 SECTION 1: PENDING APPLICATIONS (Only show if there are applicants) */}
          {applicants.length > 0 && (
            <div className="mb-10 animate-fade-in-up">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Crown className="text-amber-400" /> Pending Expert Applications
              </h3>
              
              <div className="grid gap-4">
                {applicants.map(app => (
                  <div key={app._id} className="bg-slate-900/80 border border-amber-500/30 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                    
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full border-2 border-amber-500 overflow-hidden bg-slate-800 flex items-center justify-center text-amber-500 font-bold text-xl">
                         {app.avatar ? <img src={app.avatar} alt="User" className="w-full h-full object-cover" /> : app.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">{app.name}</h4>
                        <p className="text-slate-400 text-sm">{app.email}</p>
                        <div className="flex gap-2 mt-2">
                            <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300">Exp: {app.experience} Years</span>
                            <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300">Rate: ₹{app.hourlyRate}/hr</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleReview(app._id, 'approved')}
                        className="flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 px-4 py-2 rounded-xl font-bold transition-all border border-emerald-500/50"
                      >
                        <CheckCircle size={18} /> Approve
                      </button>
                      <button 
                        onClick={() => handleReview(app._id, 'rejected')}
                        className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white px-4 py-2 rounded-xl font-bold transition-all border border-red-500/50"
                      >
                        <XCircle size={18} /> Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 2: ALL USERS LIST */}
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
             <div className="p-6 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users size={18} className="text-emerald-400" /> System Users
                </h3>
             </div>
             
             {loading ? (
               <div className="p-10 text-center text-slate-500 animate-pulse">Loading Database...</div>
             ) : (
               <table className="w-full text-left">
                  <thead className="bg-slate-950/50 text-slate-400 text-xs uppercase">
                    <tr>
                      <th className="p-4">User</th>
                      <th className="p-4">Role</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {users.map(user => (
                      <tr key={user._id} className="hover:bg-slate-800/50">
                        <td className="p-4">
                          <div className="font-bold text-white">{user.name}</div>
                          <div className="text-xs text-slate-500">{user.email}</div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                            user.role === 'admin' ? 'text-red-400 bg-red-500/10' :
                            user.role === 'dietitian' ? 'text-amber-400 bg-amber-500/10' :
                            'text-emerald-400 bg-emerald-500/10'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button onClick={() => deleteUser(user._id)} className="text-slate-500 hover:text-red-400"><Trash2 size={18}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
             )}
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;