import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout/Layout';
import { Users, ShieldCheck, Trash2, AlertTriangle } from 'lucide-react';

const AdminDashboard = () => {
  // 1. Initialize as empty array [] to prevent "map is not a function" crash
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        
        // Safety check: ensure token exists
        if (!userInfo || !userInfo.token) {
          throw new Error("No authentication token found.");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const BACKEND_URL = "https://smart-diet-full.onrender.com";
        const { data } = await axios.get(`${BACKEND_URL}/api/admin/users`, config);

        // 2. Ensure we actually got an array before setting state
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          // If backend returns { message: "..." } instead of array
          setUsers([]);
        }
        setLoading(false);

      } catch (err) {
        console.error("Admin Fetch Error:", err);
        // 3. Set error message instead of crashing
        setError(err.response?.data?.message || err.message || "Failed to load users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const BACKEND_URL = "https://smart-diet-full.onrender.com";
        
        await axios.delete(`${BACKEND_URL}/api/admin/users/${id}`, config);
        // Update UI locally
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
              <p className="text-slate-400 mt-2">System Overview & User Management</p>
            </div>
            <div className="bg-slate-900 px-4 py-2 rounded-lg border border-slate-800">
              <span className="text-sm text-slate-500">Total Users</span>
              <p className="text-2xl font-bold text-white">{users.length}</p>
            </div>
          </div>

          {/* 4. Display Error Safely instead of White Page */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-6 rounded-xl mb-6 flex items-center gap-4">
              <AlertTriangle size={24} />
              <div>
                <h3 className="font-bold">Access Denied or Server Error</h3>
                <p className="text-sm opacity-80">{error}</p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-20 animate-pulse text-slate-500">
              Loading System Data...
            </div>
          ) : (
            /* Data Table */
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users size={18} className="text-emerald-400" /> User Database
                </h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950/50 text-slate-400 text-xs uppercase tracking-wider">
                      <th className="p-4 font-bold">User Identity</th>
                      <th className="p-4 font-bold">Email</th>
                      <th className="p-4 font-bold">Role</th>
                      <th className="p-4 font-bold">Joined</th>
                      <th className="p-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {/* 5. Safe Map: Only runs if users is an array */}
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
                              {user.avatar ? (
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                              ) : (
                                <span className="font-bold text-emerald-500">{user.name?.charAt(0)}</span>
                              )}
                            </div>
                            <span className="font-bold text-white">{user.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-slate-400 text-sm">{user.email}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                            user.role === 'admin' 
                              ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500 text-xs font-mono">
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => deleteUser(user._id)}
                            className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Delete User"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;