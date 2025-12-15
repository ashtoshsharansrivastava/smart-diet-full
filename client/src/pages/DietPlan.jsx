import React, { useRef, useState } from 'react';
import { useDiet } from '../context/DietContext';
import Layout from '../components/layout/Layout';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Share2, Calendar, AlertCircle, CheckCircle, Activity, Utensils } from 'lucide-react';

const DietPlan = () => {
  const { userProfile } = useDiet();
  const planRef = useRef(); 
  const [downloading, setDownloading] = useState(false);

  const plan = userProfile.generatedPlan || {
    title: "Bio-Optimization Protocol",
    calories: 2000,
    macros: { protein: "60g", carbs: "250g", fats: "70g" },
    warnings: "None"
  };

  // --- PDF DOWNLOAD FUNCTION ---
  const handleDownloadPDF = async () => {
    setDownloading(true);
    const element = planRef.current;
    
    try {
      const canvas = await html2canvas(element, {
        scale: 2, 
        useCORS: true, 
        backgroundColor: '#020617', // Force dark background (Slate-950)
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`SmartDiet_Protocol_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error("PDF Error:", error);
      alert("Failed to download PDF.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-slate-950 min-h-screen py-12 px-4 font-display text-slate-200">
        
        {/* Header Actions */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Active Protocol</h1>
            <p className="text-slate-400 text-sm">AI-Generated Metabolic Roadmap</p>
          </div>
          <div className="flex gap-3">
             <button 
               onClick={handleDownloadPDF}
               disabled={downloading}
               className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50"
             >
               {downloading ? 'Processing...' : <><Download size={20} /> Export Protocol</>}
             </button>
             <button className="flex items-center gap-2 bg-slate-900 border border-slate-700 text-slate-300 px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all">
               <Share2 size={20} /> Share
             </button>
          </div>
        </div>

        {/* --- THE PRINTABLE AREA STARTS HERE (Glass Panel) --- */}
        <div ref={planRef} className="max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-800 relative overflow-hidden">
          
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>

          {/* Plan Header */}
          <div className="flex justify-between items-start border-b border-slate-800 pb-8 mb-8 relative z-10">
            <div>
               <div className="inline-flex items-center gap-2 bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3">
                 <CheckCircle size={14} /> System Verified
               </div>
               <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">{plan.title}</h2>
               <div className="flex gap-6 text-sm font-medium text-slate-400">
                 <span className="flex items-center gap-2"><Calendar size={16} className="text-emerald-500"/> 7 Day Cycle</span>
                 <span className="opacity-30">|</span>
                 <span className="flex items-center gap-2"><Activity size={16} className="text-emerald-500"/> {plan.calories} kcal/day</span>
               </div>
            </div>
            <div className="text-right hidden sm:block">
               <div className="text-4xl font-black text-white">{plan.calories}</div>
               <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Daily Target</div>
            </div>
          </div>

          {/* Warning / Note */}
          <div className="bg-amber-950/20 border border-amber-500/20 p-4 rounded-xl flex gap-3 mb-10">
            <AlertCircle className="text-amber-500 shrink-0" />
            <p className="text-sm text-amber-200/80">
              <strong className="text-amber-400">Calibration Note:</strong> This protocol excludes {userProfile.exclusions?.join(", ") || "standard allergens"}. {plan.warnings}
            </p>
          </div>

          {/* Weekly Schedule Grid */}
          <div className="space-y-8 relative z-10">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Utensils size={20} className="text-emerald-500" /> Meal Sequence
            </h3>
            
            {/* Day 1 */}
            <div className="border border-slate-700/50 rounded-2xl overflow-hidden bg-slate-950/30">
               <div className="bg-slate-900/50 p-4 border-b border-slate-800 flex justify-between items-center">
                  <span className="font-bold text-emerald-400">Monday</span>
                  <span className="text-[10px] font-bold bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700 uppercase tracking-wider">High Protein Focus</span>
               </div>
               <div className="p-6 grid gap-6 md:grid-cols-4">
                  <MealCard type="Breakfast" time="08:00" food="Moong Dal Chilla + Paneer" cal="350" />
                  <MealCard type="Lunch" time="13:00" food="2 Bran Roti + Palak Paneer" cal="550" />
                  <MealCard type="Snack" time="17:00" food="Green Tea + Makhana" cal="150" />
                  <MealCard type="Dinner" time="20:30" food="Quinoa Khichdi + Veggies" cal="400" />
               </div>
            </div>

            {/* Placeholder */}
            <div className="p-8 text-center bg-slate-900/30 rounded-2xl border border-dashed border-slate-800">
               <p className="text-slate-500 font-mono text-sm">... Decrypting Days 2-7 Data ...</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-slate-800 flex justify-between items-center text-slate-500 text-xs font-mono">
             <span>Generated by SmartDiet AI Engine</span>
             <span>smartdiet.ai</span>
          </div>

        </div>
        {/* --- PRINTABLE AREA ENDS --- */}

      </div>
    </Layout>
  );
};

const MealCard = ({ type, time, food, cal }) => (
  <div>
    <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider flex justify-between">
        <span>{type}</span>
        <span>{time}</span>
    </div>
    <div className="font-bold text-slate-200 text-sm mb-2 leading-snug">{food}</div>
    <div className="inline-block text-[10px] font-bold bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-900">
      {cal} kcal
    </div>
  </div>
);

export default DietPlan;