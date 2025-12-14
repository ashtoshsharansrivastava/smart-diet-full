import React, { useRef, useState } from 'react';
import { useDiet } from '../context/DietContext';
import Layout from '../components/layout/Layout';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Share2, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const DietPlan = () => {
  const { userProfile } = useDiet();
  const planRef = useRef(); // 👈 This connects to the HTML we want to print
  const [downloading, setDownloading] = useState(false);

  const plan = userProfile.generatedPlan || {
    title: "Sample Healthy Plan",
    calories: 2000,
    macros: { protein: "60g", carbs: "250g", fats: "70g" },
    warnings: "None"
  };

  // --- PDF DOWNLOAD FUNCTION ---
  const handleDownloadPDF = async () => {
    setDownloading(true);
    const element = planRef.current;
    
    try {
      // 1. Capture the visual Chart as an image
      const canvas = await html2canvas(element, {
        scale: 2, // Higher resolution
        useCORS: true, // Handle images from other domains
        backgroundColor: '#ffffff'
      });

      // 2. Initialize PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // 3. Calculate Dimensions to fit A4
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // 4. Save
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`SmartDiet_Plan_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error("PDF Error:", error);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen py-12 px-4 font-display">
        
        {/* Header Actions */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Your Personalized Plan</h1>
            <p className="text-slate-500">Based on your metabolic profile</p>
          </div>
          <div className="flex gap-3">
             <button 
               onClick={handleDownloadPDF}
               disabled={downloading}
               className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-all disabled:opacity-50"
             >
               {downloading ? 'Generating...' : <><Download size={20} /> Download PDF</>}
             </button>
             <button className="flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all">
               <Share2 size={20} /> Share
             </button>
          </div>
        </div>

        {/* --- THE PRINTABLE AREA STARTS HERE --- */}
        <div ref={planRef} className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
          
          {/* Plan Header */}
          <div className="flex justify-between items-start border-b border-slate-100 pb-8 mb-8">
            <div>
               <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3">
                 <CheckCircle size={14} /> AI Verified
               </div>
               <h2 className="text-4xl font-extrabold text-slate-900 mb-2">{plan.title}</h2>
               <div className="flex gap-6 text-sm font-medium text-slate-500">
                 <span className="flex items-center gap-1"><Calendar size={16}/> 7 Day Cycle</span>
                 <span>•</span>
                 <span>{plan.calories} Calories / Day</span>
               </div>
            </div>
            <div className="text-right hidden sm:block">
               <div className="text-3xl font-black text-emerald-500">{plan.calories}</div>
               <div className="text-xs font-bold text-slate-400 uppercase">Daily Calories</div>
            </div>
          </div>

          {/* Warning / Note */}
          <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex gap-3 mb-10">
            <AlertCircle className="text-amber-600 shrink-0" />
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> This plan excludes {userProfile.exclusions?.join(", ") || "standard allergens"} based on your preferences. {plan.warnings}
            </p>
          </div>

          {/* Weekly Schedule Grid (The "Meat" of the PDF) */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold text-slate-900">Weekly Schedule</h3>
            
            {/* Day 1 (Example) */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
               <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                  <span className="font-bold text-slate-700">Monday</span>
                  <span className="text-xs font-bold bg-white px-2 py-1 rounded border border-slate-200 text-slate-500">High Protein</span>
               </div>
               <div className="p-6 grid gap-6 md:grid-cols-4">
                  <MealCard type="Breakfast" time="8:00 AM" food="Moong Dal Chilla with Paneer Filling" cal="350" />
                  <MealCard type="Lunch" time="1:00 PM" food="2 Multigrain Roti + Palak Paneer + Salad" cal="550" />
                  <MealCard type="Snack" time="5:00 PM" food="Green Tea + Roasted Makhana" cal="150" />
                  <MealCard type="Dinner" time="8:30 PM" food="Quinoa Khichdi with Mixed Veggies" cal="400" />
               </div>
            </div>

            {/* Placeholder for other days to make PDF look full */}
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
               <p className="text-slate-400 italic">... Days 2-7 detailed breakdown would appear here ...</p>
            </div>
          </div>

          {/* Footer of PDF */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center text-slate-400 text-sm">
             <span>Generated by SmartDiet AI</span>
             <span>www.smartdiet.ai</span>
          </div>

        </div>
        {/* --- PRINTABLE AREA ENDS --- */}

      </div>
    </Layout>
  );
};

const MealCard = ({ type, time, food, cal }) => (
  <div>
    <div className="text-xs font-bold text-emerald-600 mb-1 uppercase tracking-wider">{type}</div>
    <div className="font-bold text-slate-800 text-sm mb-1 leading-snug">{food}</div>
    <div className="flex justify-between items-center text-xs text-slate-400 mt-2">
      <span>{time}</span>
      <span className="font-medium bg-slate-100 px-1.5 py-0.5 rounded">{cal} kcal</span>
    </div>
  </div>
);

export default DietPlan;