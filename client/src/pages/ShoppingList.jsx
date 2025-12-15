import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { useDiet } from '../context/DietContext';
import { Check, Copy, ShoppingCart, Leaf, Beef, Coffee, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ShoppingList = () => {
  const navigate = useNavigate();
  const { userProfile } = useDiet();
  const isNonVeg = userProfile.dietType === 'non-veg';
  
  const [items, setItems] = useState({
    produce: [
      { id: 'v1', name: 'Spinach (Palak)', qty: '2 bunches', checked: false },
      { id: 'v2', name: 'Bottle Gourd (Lauki)', qty: '1 kg', checked: false },
      { id: 'v3', name: 'Ginger & Garlic', qty: '200g', checked: false },
      { id: 'v4', name: 'Fresh Coriander', qty: '1 bunch', checked: false },
      { id: 'v5', name: 'Seasonal Fruits', qty: '2 kg', checked: false },
    ],
    pantry: [
      { id: 'g1', name: 'Yellow Moong Dal', qty: '1 kg', checked: false },
      { id: 'g2', name: 'Multigrain Atta', qty: '5 kg', checked: false },
      { id: 'g3', name: 'Roasted Chana', qty: '500g', checked: false },
      { id: 'g4', name: 'Turmeric & Cumin', qty: '1 packet each', checked: false },
      { id: 'g5', name: 'Cold Pressed Oil', qty: '1 liter', checked: false },
    ],
    proteins: [
      { id: 'p1', name: 'Paneer / Tofu', qty: '500g', checked: false },
      { id: 'p2', name: 'Greek Yogurt / Curd', qty: '1 kg', checked: false },
      ...(isNonVeg ? [
        { id: 'p3', name: 'Chicken Breast', qty: '1 kg', checked: false },
        { id: 'p4', name: 'Eggs', qty: '12 pcs', checked: false },
      ] : [
        { id: 'p3', name: 'Soya Chunks', qty: '200g', checked: false },
        { id: 'p4', name: 'Mixed Nuts', qty: '250g', checked: false },
      ])
    ]
  });

  const toggleCheck = (category, id) => {
    setItems(prev => ({
      ...prev,
      [category]: prev[category].map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    }));
  };

  const copyToClipboard = () => {
    let text = "🛒 SmartDiet Shopping List:\n\n";
    Object.entries(items).forEach(([cat, list]) => {
      text += `*${cat.toUpperCase()}*\n`;
      list.forEach(item => { if(!item.checked) text += `- ${item.name} (${item.qty})\n`; });
      text += "\n";
    });
    navigator.clipboard.writeText(text);
    alert("List copied!");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-950 py-8 px-4 font-display text-slate-200">
        <div className="max-w-3xl mx-auto">
          
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => navigate(-1)} className="flex items-center text-slate-400 hover:text-emerald-400 font-bold transition-colors">
              <ArrowLeft size={20} className="mr-2" /> Back
            </button>
            <button onClick={copyToClipboard} className="flex items-center gap-2 bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-xl font-bold hover:bg-emerald-900/50 transition-colors">
              <Copy size={18} /> Copy List
            </button>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-slate-800">
            <div className="bg-emerald-600 p-8 text-white relative overflow-hidden">
               <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <ShoppingCart size={32} className="text-emerald-100" />
                    <h1 className="text-3xl font-extrabold">Weekly Essentials</h1>
                  </div>
                  <p className="text-emerald-100 opacity-90">Everything you need for your 7-day protocol.</p>
               </div>
               {/* Background Pattern */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            </div>

            <div className="p-8 space-y-8">
              <CategorySection title="Produce" icon={<Leaf className="text-green-400" />} items={items.produce} onToggle={(id) => toggleCheck('produce', id)} />
              <CategorySection title="Pantry" icon={<Coffee className="text-orange-400" />} items={items.pantry} onToggle={(id) => toggleCheck('pantry', id)} />
              <CategorySection title="Dairy & Proteins" icon={<Beef className="text-blue-400" />} items={items.proteins} onToggle={(id) => toggleCheck('proteins', id)} />
            </div>
            
            <div className="bg-slate-950/50 p-6 text-center border-t border-slate-800">
              <p className="text-sm text-slate-500">Tip: Buy spices in small quantities for maximum potency.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const CategorySection = ({ title, icon, items, onToggle }) => (
  <div>
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">{icon}</div>
      <h3 className="text-xl font-bold text-slate-200">{title}</h3>
    </div>
    <div className="space-y-3">
      {items.map((item) => (
        <label 
          key={item.id} 
          className={`flex items-center p-4 rounded-xl border transition-all cursor-pointer group ${item.checked ? 'bg-slate-900 border-slate-800 opacity-40' : 'bg-slate-800/40 border-slate-700 hover:border-emerald-500/50 hover:bg-slate-800/80'}`}
        >
          <div className={`w-6 h-6 rounded-md border mr-4 flex items-center justify-center transition-all ${item.checked ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600 bg-slate-900 group-hover:border-emerald-400'}`}>
            {item.checked && <Check size={14} className="text-slate-950" />}
          </div>
          <input type="checkbox" className="hidden" checked={item.checked} onChange={() => onToggle(item.id)} />
          <div className="flex-1">
            <span className={`font-bold block ${item.checked ? 'text-slate-500 line-through' : 'text-slate-200'}`}>{item.name}</span>
          </div>
          <span className={`text-sm font-medium px-3 py-1 rounded-full ${item.checked ? 'bg-slate-800 text-slate-600' : 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'}`}>
            {item.qty}
          </span>
        </label>
      ))}
    </div>
  </div>
);

export default ShoppingList;