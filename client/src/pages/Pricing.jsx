import React from 'react';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import { Check, X, Crown, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  return (
    <Layout>
      <div className="bg-slate-950 min-h-screen py-20 px-4 font-display text-slate-200">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Invest in your <span className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">Longevity</span>
          </h1>
          <p className="text-lg text-slate-400">
            Select an optimization tier. Cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          
          {/* FREE TIER */}
          <PricingCard 
            title="Basic Protocol" 
            price="Free" 
            desc="For beginners initializing AI planning."
            features={[
              "1 Diet Protocol per month",
              "Basic Macro Tracking",
              "Standard Indian Recipes",
              "Mobile Access"
            ]}
            missing={[
              "Shopping List Generation",
              "Detailed Recipe Instructions",
              "AI Chat Assistant",
              "PDF Downloads"
            ]}
            icon={<Shield size={24} className="text-slate-400" />}
            btnText="Initialize"
            btnLink="/generate"
            variant="outline"
          />

          {/* PRO TIER (Recommended) */}
          <PricingCard 
            title="Pro Health" 
            price="₹499" 
            period="/ month"
            desc="Complete toolkit for bio-hackers."
            isPopular={true}
            features={[
              "Unlimited Diet Protocols",
              "Smart Shopping Lists",
              "Full Recipe Access (Step-by-step)",
              "PDF Downloads & Printing",
              "Priority Support",
              "Ad-free Experience"
            ]}
            missing={["24/7 Dietician Chat"]}
            icon={<Zap size={24} className="text-slate-950" />}
            btnText="Start 7-Day Trial"
            btnLink="/login"
            variant="primary"
          />

          {/* PREMIUM TIER */}
          <PricingCard 
            title="Premium Family" 
            price="₹999" 
            period="/ month"
            desc="Perfect for multi-user management."
            features={[
              "Everything in Pro",
              "Up to 4 User Profiles",
              "24/7 AI Dietician Chat",
              "Disease-Specific Adjustments",
              "Weekly Progress Reports",
              "Direct Doctor Consultation"
            ]}
            missing={[]}
            icon={<Crown size={24} className="text-amber-400" />}
            btnText="Go Premium"
            btnLink="/login"
            variant="secondary"
          />

        </div>

        {/* FAQ Section Placeholder */}
        <div className="mt-20 text-center border-t border-slate-900 pt-10">
          <p className="text-slate-500 font-medium">Questions? <a href="#" className="text-emerald-500 hover:text-emerald-400 underline">Contact Support</a></p>
        </div>

      </div>
    </Layout>
  );
};

const PricingCard = ({ title, price, period, desc, features, missing, isPopular, icon, btnText, btnLink, variant }) => (
  <div className={`relative p-8 rounded-3xl border transition-all duration-300 flex flex-col ${isPopular ? 'bg-slate-900/80 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.15)] scale-105 z-10' : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'}`}>
    
    {isPopular && (
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-slate-950 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.6)]">
        Most Popular
      </div>
    )}

    <div className="mb-6">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${isPopular ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-slate-800'}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-sm text-slate-400 mt-2">{desc}</p>
    </div>

    <div className="mb-8">
      <span className="text-4xl font-extrabold text-white">{price}</span>
      <span className="text-slate-500 font-medium">{period}</span>
    </div>

    <div className="space-y-4 mb-8 flex-grow">
      {features.map((feat, i) => (
        <div key={i} className="flex items-start gap-3 text-sm font-medium text-slate-300">
          <Check size={18} className="text-emerald-500 shrink-0 mt-0.5 drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]" />
          <span>{feat}</span>
        </div>
      ))}
      {missing.map((feat, i) => (
        <div key={i} className="flex items-start gap-3 text-sm font-medium text-slate-600 opacity-75">
          <X size={18} className="shrink-0 mt-0.5" />
          <span>{feat}</span>
        </div>
      ))}
    </div>

    <Link to={btnLink} className="w-full">
        {isPopular ? (
            <button className="w-full py-4 rounded-xl font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                {btnText}
            </button>
        ) : (
            <button className="w-full py-4 rounded-xl font-bold border border-slate-700 text-white hover:bg-slate-800 transition-all">
                {btnText}
            </button>
        )}
    </Link>
  </div>
);

export default Pricing;