import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Sparkles, Activity, ShieldCheck, Zap, ArrowRight, BrainCircuit } from 'lucide-react';

const LandingPage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-500/30">
        
        {/* --- HERO SECTION --- */}
        <section className="relative overflow-hidden pt-12 md:pt-32 pb-20 md:pb-32">
          
          {/* Futuristic Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
            {/* The "Aurora" Glow */}
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
            <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[100px] mix-blend-screen"></div>
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 backdrop-blur-md mb-8 hover:bg-emerald-500/20 transition-all cursor-default">
                <Sparkles size={16} className="animate-pulse" />
                <span>AI-Powered Precision Nutrition</span>
              </div>

              {/* Main Headline */}
              <h1 className="max-w-4xl text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                Bio-Hack Your Diet with <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">
                  Intelligent AI
                </span>
              </h1>

              {/* Subheadline */}
              <p className="max-w-2xl text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
                Forget generic meal plans. We decode your biometrics (BMI, PCOD, Diabetes) to engineer the perfect nutritional path for your body.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link to="/generate" className="group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full bg-emerald-500 px-8 text-base font-bold text-slate-950 transition-all hover:bg-emerald-400 hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <span className="relative z-10 flex items-center gap-2">
                    Generate Plan <Zap size={20} className="fill-slate-950" />
                  </span>
                  {/* Button Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-0"></div>
                </Link>

                <button className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-900/50 px-8 text-base font-bold text-slate-300 backdrop-blur-sm transition-all hover:border-emerald-500/50 hover:text-white hover:bg-slate-800">
                  How it Works
                </button>
              </div>

              {/* Floating UI Elements (Hero Image Replacement) */}
              <div className="mt-16 md:mt-24 relative w-full max-w-5xl">
                 {/* Glass container for the "App Preview" */}
                 <div className="relative rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl p-2 md:p-4 shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1543362906-ac1b16c6756c?q=80&w=1974&auto=format&fit=crop" 
                      alt="AI Analysis Dashboard" 
                      className="w-full rounded-xl opacity-80"
                    />
                    
                    {/* Floating Data Card 1 */}
                    <div className="absolute top-10 left-10 hidden md:flex items-center gap-3 bg-slate-950/80 border border-slate-800 p-4 rounded-xl backdrop-blur-md shadow-xl animate-[float_4s_ease-in-out_infinite]">
                        <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
                            <Activity size={24} />
                        </div>
                        <div>
                            <div className="text-xs text-slate-400">Metabolic Rate</div>
                            <div className="text-sm font-bold text-white">Optimized (+15%)</div>
                        </div>
                    </div>

                    {/* Floating Data Card 2 */}
                    <div className="absolute bottom-10 right-10 hidden md:flex items-center gap-3 bg-slate-950/80 border border-slate-800 p-4 rounded-xl backdrop-blur-md shadow-xl animate-[float_5s_ease-in-out_infinite_reverse]">
                        <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <div className="text-xs text-slate-400">Diet Safety</div>
                            <div className="text-sm font-bold text-white">Diabetes Safe Verified</div>
                        </div>
                    </div>
                 </div>
                 
                 {/* Glow behind the image */}
                 <div className="absolute -inset-4 bg-emerald-500/20 blur-3xl -z-10 rounded-[3rem]"></div>
              </div>

            </div>
          </div>
        </section>

        {/* --- FEATURES GRID --- */}
        <section className="py-20 relative">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8">
                    <FuturisticFeatureCard 
                        icon={<BrainCircuit size={32} />}
                        title="Neural Analysis"
                        desc="Our engine processes your medical history to predict foods that stabilize your specific condition."
                    />
                    <FuturisticFeatureCard 
                        icon={<Activity size={32} />}
                        title="Macro Precision"
                        desc="We don't just count calories. We balance micronutrients to optimize hormonal health."
                    />
                    <FuturisticFeatureCard 
                        icon={<ShieldCheck size={32} />}
                        title="Medical Grade"
                        desc="Built on guidelines for Diabetes, Hypertension, and Thyroid management."
                    />
                </div>
            </div>
        </section>

      </div>
    </Layout>
  );
};

// --- SUB COMPONENT: THE GLASS CARD ---
const FuturisticFeatureCard = ({ icon, title, desc }) => {
    return (
        <div className="group relative p-8 rounded-3xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden">
            {/* Hover Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
                <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300 border border-emerald-500/20">
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-slate-400 leading-relaxed">
                    {desc}
                </p>
            </div>
        </div>
    );
};

export default LandingPage;