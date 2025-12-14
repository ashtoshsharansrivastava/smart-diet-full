import React from 'react';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import { Check, X, Crown, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen py-16 px-4 font-display">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Invest in your <span className="text-emerald-600">Long-term Health</span>
          </h1>
          <p className="text-lg text-slate-600">
            Choose the plan that fits your lifestyle. Cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          
          {/* FREE TIER */}
          <PricingCard 
            title="Basic" 
            price="Free" 
            desc="For beginners wanting to try AI planning."
            features={[
              "1 Diet Plan per month",
              "Basic Calorie Tracking",
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
            btnText="Get Started"
            btnLink="/generate"
            variant="outline"
          />

          {/* PRO TIER (Recommended) */}
          <PricingCard 
            title="Pro Health" 
            price="₹499" 
            period="/ month"
            desc="Complete toolkit for serious health goals."
            isPopular={true}
            features={[
              "Unlimited Diet Plans",
              "Smart Shopping Lists",
              "Full Recipe Access (Step-by-step)",
              "PDF Downloads & Printing",
              "Priority Support",
              "Ad-free Experience"
            ]}
            missing={["24/7 Dietician Chat"]}
            icon={<Zap size={24} className="text-white" />}
            btnText="Start 7-Day Free Trial"
            btnLink="/login"
            variant="primary"
          />

          {/* PREMIUM TIER */}
          <PricingCard 
            title="Premium Family" 
            price="₹999" 
            period="/ month"
            desc="Perfect for families managing multiple diets."
            features={[
              "Everything in Pro",
              "Up to 4 User Profiles",
              "24/7 AI Dietician Chat",
              "Disease-Specific Adjustments",
              "Weekly Progress Reports",
              "Direct Doctor Consultation (Add-on)"
            ]}
            missing={[]}
            icon={<Crown size={24} className="text-amber-500" />}
            btnText="Go Premium"
            btnLink="/login"
            variant="secondary"
          />

        </div>

        {/* FAQ Section Placeholder */}
        <div className="mt-20 text-center">
          <p className="text-slate-500 font-medium">Have questions? <a href="#" className="text-emerald-600 underline">Contact our support team</a></p>
        </div>

      </div>
    </Layout>
  );
};

const PricingCard = ({ title, price, period, desc, features, missing, isPopular, icon, btnText, btnLink, variant }) => (
  <div className={`relative p-8 rounded-3xl border transition-all duration-300 flex flex-col ${isPopular ? 'bg-white border-emerald-500 shadow-2xl scale-105 z-10' : 'bg-white border-slate-100 shadow-lg hover:border-emerald-200'}`}>
    
    {isPopular && (
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-md">
        Most Popular
      </div>
    )}

    <div className="mb-6">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${isPopular ? 'bg-emerald-500 shadow-lg shadow-emerald-200' : 'bg-slate-50'}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500 mt-2">{desc}</p>
    </div>

    <div className="mb-8">
      <span className="text-4xl font-extrabold text-slate-900">{price}</span>
      <span className="text-slate-400 font-medium">{period}</span>
    </div>

    <div className="space-y-4 mb-8 flex-grow">
      {features.map((feat, i) => (
        <div key={i} className="flex items-start gap-3 text-sm font-medium text-slate-700">
          <Check size={18} className="text-emerald-500 shrink-0 mt-0.5" />
          <span>{feat}</span>
        </div>
      ))}
      {missing.map((feat, i) => (
        <div key={i} className="flex items-start gap-3 text-sm font-medium text-slate-400 opacity-75">
          <X size={18} className="shrink-0 mt-0.5" />
          <span>{feat}</span>
        </div>
      ))}
    </div>

    <Link to={btnLink} className="w-full">
      <Button variant={variant} className="w-full py-4">
        {btnText}
      </Button>
    </Link>
  </div>
);

export default Pricing;