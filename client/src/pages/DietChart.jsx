import React from 'react';
import { useDiet } from '../context/DietContext';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Download, Printer, CheckCircle, ShoppingCart, ArrowRight } from 'lucide-react';

const DietChart = () => {
  const { userProfile } = useDiet();

  if (!userProfile.generatedPlan) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Protocol Not Found</h2>
            <p className="text-slate-500 mb-6">Please initialize your metrics first.</p>
            <Link to="/generate" className="text-emerald-400 font-bold hover:text-emerald-300 underline underline-offset-4">Go to Generator</Link>
          </div>
        </div>
      </Layout>
    );
  }

  const isVeg = userProfile.dietType === 'veg' || userProfile.dietType === 'vegan';
  const hasDiabetes = userProfile.conditions.includes('diabetes');

  return (
    <Layout>
      <div className="min-h-screen bg-slate-950 px-4 py-12 font-display text-slate-200">
        <div className="max-w-7xl mx-auto">
          
          {/* HEADER SECTION */}
          <div className="bg-slate-900/50 backdrop-blur-md rounded-3xl border border-slate-800 p-8 mb-12 relative overflow-hidden shadow-2xl">
            {/* Subtle Gradient */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                   <span className="bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle size={14} /> AI Verified
                   </span>
                   {hasDiabetes && (
                     <span className="bg-blue-950/50 border border-blue-500/30 text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase">
                        Diabetes Friendly
                     </span>
                   )}
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                   Optimization Protocol
                </h1>
                <p className="text-slate-400 text-lg">
                  Designed for <span className="font-bold text-white capitalize">{userProfile.gender}</span>, Age <span className="font-bold text-white">{userProfile.age}</span> • Goal: <span className="text-emerald-400 font-medium">Bio-Optimization</span>
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-wrap gap-3">
                  <Link to="/shopping-list" className="flex items-center gap-2 bg-slate-800 border border-slate-700 hover:border-emerald-500 hover:text-emerald-400 text-slate-300 px-5 py-2.5 rounded-xl font-bold transition-all">
                    <ShoppingCart size={18} /> Shopping List
                  </Link>
                  <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-2.5 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      <Download size={18} /> PDF
                  </button>
              </div>
            </div>
          </div>

          {/* THE MEAL GRID */}
          <div className="grid lg:grid-cols-4 gap-6">
            <MealCard 
                title="Early Morning" time="7:00 AM" icon="🌅"
                food={isVeg ? "Methi Water + Soaked Almonds" : "Methi Water + Boiled Egg White"}
                desc="Metabolic kickstart. Cortisol regulation."
                isThyroid={userProfile.conditions.includes('thyroid')}
            />
            <MealCard 
                title="Breakfast" time="9:00 AM" icon="☕"
                food={userProfile.dietType === 'non-veg' && !userProfile.exclusions.includes('chicken') ? "Chicken Salami Sandwich" : "Moong Dal Chilla & Chutney"}
                desc="High protein, low glycemic index energy source."
                tags={['High Protein', 'Gluten Free']}
                recipeId="101"
            />
            <MealCard 
                title="Lunch" time="1:30 PM" icon="🍛"
                food="2 Roti (Bran) + Palak Paneer + Salad"
                desc={userProfile.conditions.includes('heart') ? "Low oil preparation for heart health." : "Balanced macronutrient profile."}
                tags={['Fiber Rich', 'Iron Boost']}
                recipeId="101"
            />
            <MealCard 
                title="Dinner" time="8:00 PM" icon="🌙"
                food={userProfile.exclusions.includes('lactose') ? "Grilled Tofu + Clear Soup" : "Bottle Gourd (Lauki) Sabzi + 1 Roti"}
                desc="Light digestion for optimized sleep cycles."
                tags={['Light', 'Detox']}
                recipeId="101"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

const MealCard = ({ title, time, food, desc, tags = [], isThyroid, icon, recipeId }) => (
  <div className="bg-slate-900/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900/60 transition-all duration-300 flex flex-col h-full group">
    <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
            <span className="text-2xl bg-slate-800 w-10 h-10 flex items-center justify-center rounded-lg">{icon}</span>
            <div>
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider block">{title}</span>
                <p className="text-xs text-slate-500 font-medium font-mono">{time}</p>
            </div>
        </div>
        {isThyroid && (
            <span className="text-[10px] font-bold bg-purple-900/30 text-purple-400 px-2 py-1 rounded border border-purple-500/30">Thyroid Safe</span>
        )}
    </div>
    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">{food}</h3>
    <p className="text-sm text-slate-400 mb-6 leading-relaxed flex-grow">{desc}</p>
    
    {recipeId ? (
       <Link to={`/recipe/${recipeId}`} className="w-full mb-4 flex items-center justify-center gap-2 bg-slate-800 hover:bg-emerald-500 text-slate-300 hover:text-slate-950 py-3 rounded-xl font-bold transition-all duration-300">
         View Recipe <ArrowRight size={18} />
       </Link>
    ) : <div className="mb-4 h-[48px]"></div>}
    
    <div className="flex flex-wrap gap-2 mt-auto border-t border-slate-800 pt-4">
        {tags.map(t => (
            <span key={t} className="text-[10px] font-semibold bg-slate-950 text-slate-400 px-2.5 py-1 rounded border border-slate-800">
                {t}
            </span>
        ))}
    </div>
  </div>
);

export default DietChart;