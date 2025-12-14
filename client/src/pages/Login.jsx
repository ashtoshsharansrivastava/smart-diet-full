import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 👈 This now has googleLogin
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // 1. Get googleLogin from the Context
  const { login, googleLogin } = useAuth(); 
  const navigate = useNavigate();

  // 2. Handle Normal Email Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate delay or real api
    const res = await login(email, password);
    if (res.success) {
        navigate('/dashboard');
    } else {
        alert(res.message);
    }
    setLoading(false);
  };

  // 3. Handle Google Login (The Fix)
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      // This calls the Firebase Popup from AuthContext
      const res = await googleLogin(); 
      
      if (res.success) {
        navigate('/dashboard');
      } else {
        console.error("Login Failed:", res.message);
        alert("Google Login Failed. Check console for details.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 px-4 font-display">
        <div className="max-w-md w-full bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-500">Access your personalized diet plans</p>
          </div>

          {/* GOOGLE LOGIN BUTTON */}
          <button 
            type="button" // Important: type="button" prevents form submission
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 text-slate-700 font-bold py-3.5 rounded-xl hover:bg-slate-50 hover:border-slate-200 transition-all duration-200 group mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img 
              src="https://www.svgrepo.com/show/475656/google-color.svg" 
              alt="Google" 
              className="w-6 h-6 group-hover:scale-110 transition-transform" 
            />
            <span>{loading ? "Connecting..." : "Sign in with Google"}</span>
          </button>

          <div className="relative flex items-center gap-4 mb-6">
            <div className="h-px bg-slate-100 flex-1"></div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Or continue with email</span>
            <div className="h-px bg-slate-100 flex-1"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <Input 
              label="Email Address" 
              type="email" 
              placeholder="name@example.com" 
              icon={<Mail size={18}/>}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <div className="space-y-1">
              <Input 
                label="Password" 
                type="password" 
                placeholder="••••••••" 
                icon={<Lock size={18}/>}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex justify-end pt-1">
                <a href="#" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">Forgot Password?</a>
              </div>
            </div>

            <Button type="submit" className="w-full py-4 text-lg" loading={loading} disabled={loading}>
              Sign In <ArrowRight size={20} className="ml-2 opacity-80" />
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold text-emerald-600 hover:text-emerald-700 underline decoration-2 underline-offset-4">
              Create Free Account
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;