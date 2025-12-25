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
        // Ensure this points to your PRODUCTION URL
        const BACKEND_URL = "https://smart-diet-full.onrender.com";
        const { data } = await axios.get(`${BACKEND_URL}/api/dietitians`);
        setDietitians(data);
      } catch (err) {
        console.error("Error fetching dietitians:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDietitians();
  }, []);

  // 🛡️ UPDATED SAFE FILTER LOGIC
  const filteredDietitians = dietitians.filter((d) => {
    // 1. Safety Check: If profile has no user linked, hide it (don't crash)
    if (!d.user) return false;

    // 2. Safe Text Matching
    const name = d.user.name ? d.user.name.toLowerCase() : "";
    const special = d.specialization ? d.specialization.toLowerCase() : "";
    const term = searchTerm.toLowerCase();

    return name.includes(term) || special.includes(term);
  });

  return (
    <Layout>
      <div className="min-h-screen bg-slate-950 py-10 px-4 font-display text-slate-200">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Consult Top <span className="text-emerald-400">Bio-Experts</span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Connect with verified clinical nutritionists to fine-tune your metabolic protocol.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative mt-8">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-12 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all shadow-xl backdrop-blur-sm"
                placeholder="Search by specialty (e.g., Diabetes, PCOS)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                 <Filter className="h-5 w-5 text-slate-600" />
              </div>
            </div>
          </div>

          {/* Content Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[1,2,3].map(i => (
                 <div key={i} className="h-96 bg-slate-900/50 rounded-3xl animate-pulse border border-slate-800"></div>
               ))}
            </div>
          ) : filteredDietitians.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-slate-800 border-dashed max-w-2xl mx-auto">
              <User size={48} className="mx-auto text-slate-600 mb-4" />
              <h3 className="text-xl font-bold text-white">No Experts Found</h3>
              <p className="text-slate-500 mt-2">Try adjusting your search terms.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDietitians.map((profile) => (
                <div key={profile._id} className="group bg-slate-900/40 backdrop-blur-md border border-slate-800 hover:border-emerald-500/50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] flex flex-col">
                  
                  {/* Card Header */}
                  <div className="p-8 pb-0 flex items-start justify-between">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-slate-700 group-hover:border-emerald-500 transition-colors bg-slate-800">
                        {profile.user.avatar ? (
                          <img src={profile.user.avatar} alt={profile.user.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-emerald-500">
                            {profile.user.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 p-1.5 rounded-full border-4 border-slate-900">
                        <ShieldCheck size={14} strokeWidth={3} />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full text-amber-400 text-xs font-bold">
                      <Star size={12} fill="currentColor" />
                      <span>{profile.rating > 0 ? profile.rating.toFixed(1) : "New"}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-8 flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                      {profile.user.name}
                    </h3>
                    <p className="text-emerald-500 text-sm font-bold uppercase tracking-wider mb-4">
                      {profile.specialization}
                    </p>
                    
                    <p className="text-slate-400 text-sm line-clamp-3 mb-6 leading-relaxed">
                      {profile.bio}
                    </p>

                    <div className="flex items-center gap-6 text-sm font-medium text-slate-300">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-slate-500" />
                        <span>{profile.experience} Years Exp.</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <DollarSign size={16} className="text-slate-500" />
                         <span>₹{profile.hourlyRate}/hr</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-4 bg-slate-950/50 border-t border-slate-800">
                    <Link 
                      to={`/dietitians/${profile._id}`} 
                      className="w-full bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      View Protocol 
                      <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
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