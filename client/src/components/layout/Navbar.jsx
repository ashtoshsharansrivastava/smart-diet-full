import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Activity, Menu, X, User, LogOut, LayoutDashboard, Crown, ChevronRight, Zap } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 font-display transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500 blur opacity-40 group-hover:opacity-60 transition-opacity rounded-xl"></div>
                <div className="relative bg-slate-900 border border-slate-700 p-2 rounded-xl group-hover:border-emerald-500/50 transition-colors">
                  <Activity className="h-6 w-6 text-emerald-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-white leading-none tracking-tight group-hover:text-emerald-400 transition-colors">SmartDiet</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] group-hover:text-emerald-500/70">AI Protocol</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Home</Link>
            <Link to="/dietitians" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Find Expert</Link> <Link to="/pricing" className="text-sm font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-1 group">
              Pricing <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[9px] px-1.5 py-0.5 rounded-full group-hover:bg-amber-500/20 transition-colors">PRO</span>
            </Link>
            
            <div className="w-px h-6 bg-slate-800 mx-2"></div>

            {user ? (
              // LOGGED IN VIEW
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 font-bold text-sm transition-colors">
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                
                <div className="relative group">
                  <button className="flex items-center gap-3 pl-4 border-l border-slate-800">
                    <div className="relative">
                       <img src={user.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} alt="User" className="w-9 h-9 rounded-full border-2 border-slate-700 group-hover:border-emerald-500 transition-colors" />
                       <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-950 rounded-full"></div>
                    </div>
                    <div className="text-left hidden lg:block">
                      <p className="text-xs font-bold text-white leading-none">{user.name}</p>
                      <p className="text-[10px] text-emerald-500 font-mono mt-0.5">Free Tier</p>
                    </div>
                  </button>
                  
                  {/* Dropdown for Logout */}
                  <div className="absolute right-0 top-full mt-4 w-48 bg-slate-900 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-slate-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full gap-2 px-4 py-3 text-sm font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                    >
                      <LogOut size={16} /> Terminate Session
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // GUEST VIEW
              <>
                <Link to="/login" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Log In</Link>
                <Link 
                  to="/generate" 
                  className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-xl bg-emerald-500 px-6 font-medium text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all duration-300 hover:bg-emerald-400 hover:scale-105"
                >
                  <span className="mr-2 font-bold text-sm flex items-center gap-1"><Zap size={14} className="fill-slate-950"/> Initialize</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-emerald-400 p-2 transition-colors">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown (Glassmorphism) */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 absolute w-full left-0 shadow-2xl animate-fade-in-down h-screen z-50">
          <div className="p-4 space-y-2">
            <Link to="/" className="block px-4 py-4 font-bold text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl transition-all" onClick={() => setIsOpen(false)}>Home Protocol</Link>
            <Link to="/pricing" className="flex items-center justify-between px-4 py-4 font-bold text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl transition-all" onClick={() => setIsOpen(false)}>
              Pricing <Crown size={16} className="text-amber-400" />
            </Link>
            
            <div className="h-px bg-slate-800 my-4 mx-4"></div>

            {user ? (
               <>
                 <Link to="/dashboard" className="block px-4 py-4 font-bold text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 rounded-xl mb-2" onClick={() => setIsOpen(false)}>Access Dashboard</Link>
                 <button onClick={handleLogout} className="w-full text-left px-4 py-4 font-bold text-red-400 hover:bg-red-950/20 rounded-xl">Terminate Session</button>
               </>
            ) : (
               <>
                 <Link to="/login" className="block w-full text-center px-4 py-4 font-bold text-slate-300 hover:bg-slate-800 rounded-xl" onClick={() => setIsOpen(false)}>Log In</Link>
                 <Link to="/generate" className="block w-full text-center mt-2 bg-emerald-500 text-slate-950 px-4 py-4 rounded-xl font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)]" onClick={() => setIsOpen(false)}>Initialize System</Link>
               </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;