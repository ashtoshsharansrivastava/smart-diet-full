import React from 'react';
import Layout from '../components/layout/Layout';
import { Brain, Database, ShieldCheck, Smartphone, Users, Globe, Cpu, Zap } from 'lucide-react';

const Features = () => {
  return (
    <Layout>
      <div className="bg-slate-950 font-display text-slate-200 min-h-screen">
        
        {/* Hero Area */}
        <div className="relative overflow-hidden py-24 px-4 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <h1 className="relative z-10 text-4xl md:text-6xl font-extrabold mb-6 text-white tracking-tight">
             Engineered with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Neural Intelligence</span>
          </h1>
          <p className="relative z-10 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We combine clinical nutrition guidelines with next-gen AI to compute the perfect biochemical fuel for your body.
          </p>
        </div>

        {/* Main Grid */}
        <div className="max-w-7xl mx-auto py-12 px-4 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Side */}
          <div className="space-y-8">
             <FeatureBlock 
              icon={<Brain className="text-white" />} 
              color="bg-purple-600"
              title="Neural Recommendation Engine"
              desc="Our algorithm analyzes 50+ biomarkers including age, BMI, allergies, and disease history to predict optimal meal compositions."
            />
             <FeatureBlock 
              icon={<Database className="text-white" />} 
              color="bg-emerald-600"
              title="Indian Regional Database"
              desc="Unlike western apps, we deeply understand 'Roti', 'Dal', and 'Sabzi'. Our dataset includes 10,000+ regional dishes."
            />
            <FeatureBlock 
              icon={<ShieldCheck className="text-white" />} 
              color="bg-blue-600"
              title="Medically Verified Protocols"
              desc="Every plan is cross-checked against standard guidelines for Diabetes (ADA), Heart Health (AHA), and Hypertension."
            />
          </div>

          {/* Image Side */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 rounded-3xl transform rotate-3 scale-105 opacity-50 blur-xl group-hover:opacity-70 transition-all duration-700"></div>
            <div className="relative bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-800">
               <img 
                 src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                 alt="AI Technology" 
                 className="w-full h-auto object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
               />
               <div className="p-8 bg-slate-900/90 backdrop-blur-sm border-t border-slate-800">
                 <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2"><Cpu size={20} className="text-emerald-500"/> Supported Modules</h3>
                 <div className="flex flex-wrap gap-2">
                   {['Diabetes Type 2', 'Hypertension', 'PCOD/PCOS', 'Thyroid', 'High Cholesterol', 'Uric Acid', 'Weight Loss', 'Muscle Gain'].map(tag => (
                     <span key={tag} className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs font-bold border border-slate-700 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors cursor-default">
                       {tag}
                     </span>
                   ))}
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="py-20 px-4 text-center border-t border-slate-900 bg-slate-950 relative">
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
           <h2 className="text-3xl font-bold text-white mb-10 relative z-10">System Metrics</h2>
           <div className="flex flex-wrap justify-center gap-12 text-slate-400 relative z-10">
              <StatBlock icon={<Users size={32} />} val="10k+" label="Active Users" />
              <StatBlock icon={<Globe size={32} />} val="12" label="Countries" />
              <StatBlock icon={<Smartphone size={32} />} val="4.8" label="App Rating" />
           </div>
        </div>

      </div>
    </Layout>
  );
};

const FeatureBlock = ({ icon, color, title, desc }) => (
  <div className="flex gap-5 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/60 transition-all">
    <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.2)]`}>
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
    </div>
  </div>
);

const StatBlock = ({ icon, val, label }) => (
    <div className="flex flex-col items-center gap-2 group">
        <div className="text-emerald-500 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">{icon}</div>
        <span className="font-bold text-2xl text-white">{val}</span>
        <span className="text-sm font-medium uppercase tracking-widest">{label}</span>
    </div>
);

export default Features;