import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { Search, Star, MapPin, Clock, ArrowRight, Filter, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
// import api from '../config/api'; // Uncomment when backend is ready

const Dietitians = () => {
  const [dietitians, setDietitians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // MOCK DATA (Replace with API call later)
 // --- REPLACE THE MOCK useEffect WITH THIS ---
  useEffect(() => {
    const fetchDietitians = async () => {
      try {
        setLoading(true);
        // This hits your Server Route
        const res = await api.get('/api/dietitians');
        setDietitians(res.data);
      } catch (err) {
        console.error("Error fetching dietitians:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDietitians();
  }, []);
  return (
    <Layout>
      <div className="min-h-screen bg-slate-950 font-display text-slate-200 py-12 px-4">
        
        {/* --- HEADER SECTION --- */}
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Consult Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Bio-Experts</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
            Connect with verified clinical nutritionists to fine-tune your metabolic protocol.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-2xl blur-xl group-hover:bg-emerald-500/30 transition-all"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-2 flex items-center shadow-2xl">
              <Search className="ml-4 text-slate-400" size={24} />
              <input 
                type="text" 
                placeholder="Search by specialty (e.g., Diabetes, PCOS)..." 
                className="w-full bg-transparent border-none outline-none text-white px-4 py-3 text-lg placeholder:text-slate-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-xl transition-colors border border-slate-600">
                <Filter size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* --- EXPERT GRID --- */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-20 text-slate-500 animate-pulse">Scanning database...</div>
          ) : (
            dietitians.map((expert) => (
              <ExpertCard key={expert._id} data={expert} />
            ))
          )}
        </div>

      </div>
    </Layout>
  );
};

// --- SUB-COMPONENT: EXPERT CARD ---
const ExpertCard = ({ data }) => (
  <div className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 hover:border-emerald-500/50 hover:bg-slate-900/60 transition-all duration-300 hover:-translate-y-2">
    
    {/* Verified Badge */}
    {data.isVerified && (
      <div className="absolute top-4 right-4 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
        <ShieldCheck size={12} /> Verified
      </div>
    )}

    {/* Profile Header */}
    <div className="flex items-center gap-5 mb-6">
      <div className="relative">
        <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-slate-700 group-hover:border-emerald-500 transition-colors">
          <img src={data.user.avatar} alt={data.user.name} className="w-full h-full object-cover" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-slate-950 rounded-lg p-1 border border-slate-800">
          <div className="bg-emerald-500 w-3 h-3 rounded-full animate-pulse"></div>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{data.user.name}</h3>
        <p className="text-sm text-slate-400 font-medium">{data.specialization}</p>
      </div>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-2 gap-3 mb-6">
      <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/50">
        <div className="flex items-center gap-1.5 text-amber-400 mb-1">
          <Star size={14} className="fill-amber-400" />
          <span className="font-bold text-sm">{data.rating}</span>
        </div>
        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">{data.reviewCount} Reviews</p>
      </div>
      <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/50">
        <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
          <Clock size={14} />
          <span className="font-bold text-sm">{data.experience} Yrs</span>
        </div>
        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">Experience</p>
      </div>
    </div>

    {/* Footer / CTA */}
    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
      <div>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Consultation</p>
        <p className="text-lg font-bold text-white">₹{data.hourlyRate}<span className="text-sm text-slate-500 font-normal">/hr</span></p>
      </div>
      <Link to={`/dietitians/${data._id}`} className="bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-105">
        <ArrowRight size={20} />
      </Link>
    </div>
  </div>
);

export default Dietitians;