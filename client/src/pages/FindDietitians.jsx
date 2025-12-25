// client/src/pages/FindDietitians.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Search, Star, ShieldCheck, Clock, ArrowRight, DollarSign, User, Filter } from 'lucide-react';

const FindDietitians = () => {
  const [dietitians, setDietitians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDietitians = async () => {
      try {
        const BACKEND_URL = "https://smart-diet-full.onrender.com";
        const { data } = await axios.get(`${BACKEND_URL}/api/dietitians`);
        
        // Only show valid profiles
        const validProfiles = data.filter(d => d.user && d.user.name);
        setDietitians(validProfiles);
      } catch (err) {
        console.error("Error fetching dietitians:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDietitians();
  }, []);

  // Filter Logic
  const filteredDietitians = dietitians.filter((d) => {
    const name = d.user?.name?.toLowerCase() || "";
    const special = d.specialization?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();
    return name.includes(term) || special.includes(term);
  });

  return (
    <Layout>
      <div className="min-h-screen bg-slate-950 py-10 px-4 font-display text-slate-200">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
              Consult Top <span className="text-emerald-400">Bio-Experts</span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Connect with verified clinical nutritionists.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative mt-8">
              <Search className="absolute left-5 top-4 h-5 w-5 text-slate-500" />
              <input
                type="text"
                className="block w-full pl-12 pr-12 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="Search experts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Grid */}
          {loading ? (
             <div className="text-center text-slate-500">Loading experts...</div>
          ) : filteredDietitians.length === 0 ? (
             <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-slate-800 border-dashed">
               <h3 className="text-xl font-bold text-white">No Experts Found</h3>
               <p className="text-slate-500">Your database might be empty.</p>
             </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDietitians.map((profile) => (
                <div key={profile._id} className="group bg-slate-900/40 border border-slate-800 hover:border-emerald-500/50 rounded-3xl overflow-hidden flex flex-col transition-all hover:shadow-lg">
                  <div className="p-8 pb-0 flex items-start justify-between">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-slate-700">
                       {/* Avatar Logic */}
                       {profile.user.avatar ? (
                         <img src={profile.user.avatar} className="w-full h-full object-cover" alt={profile.user.name} />
                       ) : (
                         <div className="w-full h-full bg-slate-800 flex items-center justify-center text-2xl font-bold text-emerald-500">
                           {profile.user.name.charAt(0)}
                         </div>
                       )}
                    </div>
                    <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold">
                      ⭐ {profile.rating}
                    </div>
                  </div>
                  
                  <div className="p-8 flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{profile.user.name}</h3>
                    <p className="text-emerald-500 text-sm font-bold uppercase mb-4">{profile.specialization}</p>
                    <p className="text-slate-400 text-sm line-clamp-3 mb-6">{profile.bio}</p>
                    <div className="flex gap-4 text-sm text-slate-300">
                      <span>🕒 {profile.experience} Yrs</span>
                      <span>💰 ₹{profile.hourlyRate}/hr</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950/50 border-t border-slate-800">
                    <Link to={`/dietitians/${profile._id}`} className="block w-full bg-slate-800 hover:bg-emerald-600 hover:text-white text-white text-center font-bold py-3 rounded-xl transition-all">
                      View Profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FindDietitians;