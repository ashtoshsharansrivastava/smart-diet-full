import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout/Layout';
import { Users, ShieldCheck, Trash2, Crown, CheckCircle, XCircle, Eye, X, DollarSign, Link as LinkIcon } from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null); // 👈 Controls the Modal

  // Helper to get token config
  const getConfig = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return { headers: { Authorization: `Bearer ${userInfo?.token}` } };
  };

  const fetchData = async () => {
    try {
      const config = getConfig();
      const BACKEND_URL = "https://smart-diet-full.onrender.com";

      // Fetch Users
      const usersRes = await axios.get(`${BACKEND_URL}/api/admin/users`, config);
      setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);

      // Fetch Applicants
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

  // Handle Approve/Reject
  const handleReview = async (id, status) => {
    if (!window.confirm(`Are you sure you want to ${status} this applicant?`)) return;

    try {
      const config = getConfig();
      const BACKEND_URL = "https://smart-diet-full.onrender.com";
      
      await axios.put(`${BACKEND_URL}/api/admin/applicants/${id}`, { status }, config);
      
      alert(`User ${status} successfully!`);
      setSelectedApplicant(null); // Close modal
      fetchData(); // Refresh list

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
      <div className="min-h-screen bg-slate-950 py-10 px-4 font-display text-slate-200 relative">
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

          {/* 🚀 SECTION 1: PENDING APPLICATIONS */}
          {applicants.length > 0 && (
            <div className="mb-10 animate-fade-in-up">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Crown className="text-amber-400" /> Pending Approvals ({applicants.length})
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
                        <div className="mt-1 flex gap-2">
                            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 border border-slate-700">
                                {app.profile?.specialization || "General"}
                            </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {/* VIEW FORM BUTTON */}
                      <button 
                        onClick={() => setSelectedApplicant(app)}
                        className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl font-bold transition-all border border-slate-700 hover:border-slate-500"
                      >
                        <Eye size={18} /> View Form
                      </button>

                      <button 
                        onClick={() => handleReview(app._id, 'approved')}
                        className="flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 px-4 py-2 rounded-xl font-bold transition-all border border-emerald-500/50"
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button 
                        onClick={() => handleReview(app._id, 'rejected')}
                        className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white px-4 py-2 rounded-xl font-bold transition-all border border-red-500/50"
                      >
                        <XCircle size={18} />
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
                  <Users size={18} className="text-emerald-400" /> Database
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

        {/* 🌟 DETAIL MODAL (POPUP) 🌟 */}
        {selectedApplicant && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
                <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
                    
                    {/* Modal Header */}
                    <div className="bg-slate-950 p-6 flex justify-between items-start border-b border-slate-800">
                        <div className="flex items-center gap-4">
                             <div className="w-16 h-16 rounded-full border-2 border-emerald-500 overflow-hidden bg-slate-800">
                                {selectedApplicant.avatar ? <img src={selectedApplicant.avatar} alt="User" className="w-full h-full object-cover" /> : null}
                             </div>
                             <div>
                                 <h2 className="text-xl font-bold text-white">{selectedApplicant.name}</h2>
                                 <p className="text-emerald-400 text-sm font-bold">Applicant Details</p>
                             </div>
                        </div>
                        <button onClick={() => setSelectedApplicant(null)} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 text-slate-400"><X size={20}/></button>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                                <span className="text-xs text-slate-500 font-bold uppercase block mb-1">Specialization</span>
                                <span className="text-white font-bold">{selectedApplicant.profile?.specialization || "N/A"}</span>
                            </div>
                            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                                <span className="text-xs text-slate-500 font-bold uppercase block mb-1">Experience</span>
                                <span className="text-white font-bold">{selectedApplicant.profile?.experience || "0"} Years</span>
                            </div>
                        </div>

                        <div>
                            <span className="text-xs text-slate-500 font-bold uppercase block mb-2">Applicant Bio</span>
                            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 text-slate-300 text-sm leading-relaxed italic">
                                "{selectedApplicant.profile?.bio || "No bio provided."}"
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                             <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-950/30 p-3 rounded-lg">
                                <DollarSign size={16} className="text-emerald-500" />
                                <span>Requested Rate: <strong className="text-white">₹{selectedApplicant.profile?.hourlyRate}/hr</strong></span>
                             </div>
                             <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-950/30 p-3 rounded-lg">
                                <LinkIcon size={16} className="text-blue-500" />
                                {selectedApplicant.profile?.meetingUrl ? (
                                    <a href={selectedApplicant.profile.meetingUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline truncate w-full">
                                        {selectedApplicant.profile.meetingUrl}
                                    </a>
                                ) : <span className="text-slate-600">No meeting URL provided</span>}
                             </div>
                        </div>

                        {/* Availability */}
                        <div>
                            <span className="text-xs text-slate-500 font-bold uppercase block mb-2">Available Days</span>
                            <div className="flex flex-wrap gap-2">
                                {selectedApplicant.profile?.availableDays?.length > 0 ? (
                                    selectedApplicant.profile.availableDays.map(day => (
                                        <span key={day} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">
                                            {day}
                                        </span>
                                    ))
                                ) : <span className="text-slate-500 text-sm italic">No specific days listed</span>}
                            </div>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="p-6 bg-slate-950 border-t border-slate-800 flex gap-4">
                        <button 
                            onClick={() => handleReview(selectedApplicant._id, 'approved')}
                            className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl transition-all"
                        >
                            Approve
                        </button>
                        <button 
                            onClick={() => handleReview(selectedApplicant._id, 'rejected')}
                            className="flex-1 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white font-bold py-3 rounded-xl transition-all border border-red-500/30"
                        >
                            Reject
                        </button>
                    </div>

                </div>
            </div>
        )}

      </div>
    </Layout>
  );
};

export default AdminDashboard;