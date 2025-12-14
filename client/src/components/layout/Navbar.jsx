import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Activity, Menu, X, User, LogOut, LayoutDashboard, Crown, ChevronRight } from 'lucide-react';

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
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 font-display">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
              <div className="bg-gradient-to-tr from-emerald-500 to-teal-400 p-2.5 rounded-xl shadow-lg shadow-emerald-200 group-hover:scale-105 transition-transform duration-300">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-slate-900 leading-none">SmartDiet</span>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">AI Nutrition</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors">Home</Link>
            <Link to="/features" className="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors">Features</Link>
            <Link to="/pricing" className="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors flex items-center gap-1">
              Pricing <span className="bg-amber-100 text-amber-700 text-[9px] px-1.5 py-0.5 rounded-full">PRO</span>
            </Link>
            
            <div className="w-px h-6 bg-slate-200 mx-2"></div>

            {user ? (
              // LOGGED IN VIEW
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-bold text-sm">
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                
                <div className="relative group">
                  <button className="flex items-center gap-2 pl-4 border-l border-slate-200">
                    <img src={user.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} alt="User" className="w-9 h-9 rounded-full border-2 border-white shadow-sm" />
                    <div className="text-left hidden lg:block">
                      <p className="text-xs font-bold text-slate-800 leading-none">{user.name}</p>
                      <p className="text-[10px] text-slate-400">Free Plan</p>
                    </div>
                  </button>
                  
                  {/* Dropdown for Logout */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full gap-2 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // GUEST VIEW
              <>
                <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors">Log In</Link>
                <Link 
                  to="/generate" 
                  className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-xl bg-slate-900 px-6 font-medium text-white shadow-lg transition-all duration-300 hover:bg-emerald-600 hover:shadow-emerald-200 hover:-translate-y-0.5"
                >
                  <span className="mr-2 font-bold text-sm">Get Started</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-emerald-600 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full left-0 shadow-2xl animate-fade-in-down">
          <div className="p-4 space-y-2">
            <Link to="/" className="block px-4 py-3 font-bold text-slate-600 hover:bg-slate-50 rounded-xl" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/pricing" className="flex items-center justify-between px-4 py-3 font-bold text-slate-600 hover:bg-slate-50 rounded-xl" onClick={() => setIsOpen(false)}>
              Pricing <Crown size={16} className="text-amber-500" />
            </Link>
            
            <div className="h-px bg-slate-100 my-2"></div>

            {user ? (
               <>
                 <Link to="/dashboard" className="block px-4 py-3 font-bold text-emerald-600 bg-emerald-50 rounded-xl mb-2" onClick={() => setIsOpen(false)}>Go to Dashboard</Link>
                 <button onClick={handleLogout} className="w-full text-left px-4 py-3 font-bold text-red-500 hover:bg-red-50 rounded-xl">Sign Out</button>
               </>
            ) : (
               <>
                 <Link to="/login" className="block w-full text-center px-4 py-3 font-bold text-slate-600 hover:bg-slate-50 rounded-xl" onClick={() => setIsOpen(false)}>Log In</Link>
                 <Link to="/generate" className="block w-full text-center mt-2 bg-slate-900 text-white px-4 py-3.5 rounded-xl font-bold shadow-lg" onClick={() => setIsOpen(false)}>Get Started Free</Link>
               </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;