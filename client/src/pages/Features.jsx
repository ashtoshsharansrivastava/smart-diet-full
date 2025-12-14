import React from 'react';
import Layout from '../components/layout/Layout';
import { Brain, Database, ShieldCheck, Smartphone, Users, Globe } from 'lucide-react';

const Features = () => {
  return (
    <Layout>
      <div className="bg-white font-display">
        
        {/* Hero Area */}
        <div className="bg-slate-900 py-20 px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Built with <span className="text-emerald-400">Intelligence</span></h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Our platform combines clinical nutrition guidelines with advanced AI to deliver safe, effective, and tasty meal plans.
          </p>
        </div>

        {/* Main Grid */}
        <div className="max-w-7xl mx-auto py-20 px-4 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Side */}
          <div className="space-y-12">
            <FeatureBlock 
              icon={<Brain className="text-white" />} 
              color="bg-purple-500"
              title="AI Recommendation Engine"
              desc="Our algorithm analyzes 50+ data points including your age, BMI, allergies, and disease history to select the perfect meals."
            />
            <FeatureBlock 
              icon={<Database className="text-white" />} 
              color="bg-emerald-500"
              title="Indian Food Database"
              desc="Unlike western apps, we understand 'Roti', 'Dal', and 'Sabzi'. Our database includes 10,000+ Indian regional dishes."
            />
            <FeatureBlock 
              icon={<ShieldCheck className="text-white" />} 
              color="bg-blue-500"
              title="Medically Verified"
              desc="Every plan is cross-checked against standard guidelines for Diabetes (ADA), Heart Health (AHA), and Hypertension."
            />
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-200 to-blue-200 rounded-3xl transform rotate-3 scale-105 opacity-50 blur-lg"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
               <img 
                 src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                 alt="AI Technology" 
                 className="w-full h-auto object-cover"
               />
               <div className="p-8">
                 <h3 className="text-xl font-bold mb-2">Supported Conditions</h3>
                 <div className="flex flex-wrap gap-2">
                   {['Diabetes Type 2', 'Hypertension', 'PCOD/PCOS', 'Thyroid', 'High Cholesterol', 'Uric Acid', 'Weight Loss', 'Muscle Gain'].map(tag => (
                     <span key={tag} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">
                       {tag}
                     </span>
                   ))}
                 </div>
               </div>
            </div>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="bg-emerald-50 py-16 px-4 text-center">
           <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to transform your health?</h2>
           <div className="flex justify-center gap-8 text-slate-600 mb-8">
              <div className="flex flex-col items-center">
                <Users size={32} className="text-emerald-600 mb-2" />
                <span className="font-bold">10k+ Users</span>
              </div>
              <div className="flex flex-col items-center">
                <Globe size={32} className="text-emerald-600 mb-2" />
                <span className="font-bold">12 Countries</span>
              </div>
              <div className="flex flex-col items-center">
                <Smartphone size={32} className="text-emerald-600 mb-2" />
                <span className="font-bold">4.8 App Rating</span>
              </div>
           </div>
        </div>

      </div>
    </Layout>
  );
};

const FeatureBlock = ({ icon, color, title, desc }) => (
  <div className="flex gap-4">
    <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shrink-0 shadow-lg`}>
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default Features;