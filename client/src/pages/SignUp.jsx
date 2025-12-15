import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await register(formData.name, formData.email, formData.password);
    if (res.success) navigate('/dashboard');
    else setError(res.message);
    setLoading(false);
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-950 px-4 font-display relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative max-w-md w-full bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-slate-800">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-white mb-2">Create Account</h1>
            <p className="text-slate-400">Initialize your bio-profile today.</p>
          </div>

          {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-sm font-bold">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 ml-1">Full Name</label>
                <div className="relative">
                    <User className="absolute top-3.5 left-4 text-slate-500" size={18} />
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 pl-12 pr-4 outline-none focus:border-emerald-500 transition-all" required placeholder="John Doe" />
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 ml-1">Email</label>
                <div className="relative">
                    <Mail className="absolute top-3.5 left-4 text-slate-500" size={18} />
                    <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 pl-12 pr-4 outline-none focus:border-emerald-500 transition-all" required placeholder="name@example.com" />
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 ml-1">Password</label>
                <div className="relative">
                    <Lock className="absolute top-3.5 left-4 text-slate-500" size={18} />
                    <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 pl-12 pr-4 outline-none focus:border-emerald-500 transition-all" required placeholder="••••••••" />
                </div>
            </div>

            <button type="submit" className="w-full mt-4 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex justify-center items-center gap-2" loading={loading}>
              Sign Up <ArrowRight size={20} className="opacity-80" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account? <Link to="/login" className="font-bold text-emerald-500 hover:text-emerald-400">Log In</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;