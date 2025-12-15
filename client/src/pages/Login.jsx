import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(email, password);
    if (res.success) navigate('/dashboard');
    else alert(res.message);
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const res = await googleLogin();
      if (res.success) navigate('/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[85vh] flex items-center justify-center bg-slate-950 px-4 font-display relative overflow-hidden">
        
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative max-w-md w-full bg-slate-900/60 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-800">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-white mb-2">Welcome Back</h1>
            <p className="text-slate-400">Access your bio-optimized protocols</p>
          </div>

          <button 
            type="button" 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 font-bold py-3.5 rounded-xl hover:bg-slate-200 transition-all duration-200 group mb-6 disabled:opacity-50"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span>{loading ? "Connecting..." : "Sign in with Google"}</span>
          </button>

          <div className="relative flex items-center gap-4 mb-6">
            <div className="h-px bg-slate-800 flex-1"></div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Or continue with email</span>
            <div className="h-px bg-slate-800 flex-1"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute top-3.5 left-4 text-slate-500" size={18} />
                <input 
                  type="email" 
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 pl-12 pr-4 outline-none focus:border-emerald-500 transition-all"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute top-3.5 left-4 text-slate-500" size={18} />
                <input 
                  type="password" 
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 pl-12 pr-4 outline-none focus:border-emerald-500 transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex justify-center items-center gap-2" disabled={loading}>
              Sign In <ArrowRight size={20} className="opacity-80" />
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold text-emerald-500 hover:text-emerald-400 underline decoration-2 underline-offset-4">
              Create Free Account
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;