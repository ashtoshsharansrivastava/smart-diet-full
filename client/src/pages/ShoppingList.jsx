import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { useDiet } from '../context/DietContext';
import { Check, Copy, ShoppingCart, Leaf, Beef, Coffee, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ShoppingList = () => {
  const navigate = useNavigate();
  const { userProfile } = useDiet();

  // MOCK DATA: In a real app, this would be calculated from the Weekly Diet Plan
  // We customize this slightly based on the user's diet type
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
        { id: 'p4', name: 'Mixed Nuts (Almonds/Walnuts)', qty: '250g', checked: false },
      ])
    ]
  });

  const toggleCheck = (category, id) => {
    setItems(prev => ({
      ...prev,
      [category]: prev[category].map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    }));
  };

  const copyToClipboard = () => {
    // Generate a simple text string for WhatsApp
    let text = "🛒 SmartDiet Shopping List:\n\n";
    Object.entries(items).forEach(([cat, list]) => {
      text += `*${cat.toUpperCase()}*\n`;
      list.forEach(item => {
        if(!item.checked) text += `- ${item.name} (${item.qty})\n`;
      });
      text += "\n";
    });
    navigator.clipboard.writeText(text);
    alert("List copied! You can paste it in WhatsApp.");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 py-8 px-4 font-display">
        <div className="max-w-3xl mx-auto">
          
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-emerald-600 font-bold transition-colors">
              <ArrowLeft size={20} className="mr-2" /> Back
            </button>
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl font-bold hover:bg-emerald-200 transition-colors"
            >
              <Copy size={18} /> Copy List
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
            <div className="bg-emerald-500 p-8 text-white">
              <div className="flex items-center gap-3 mb-2">
                <ShoppingCart size={32} className="text-emerald-100" />
                <h1 className="text-3xl font-extrabold">Weekly Essentials</h1>
              </div>
              <p className="text-emerald-100">Everything you need for your 7-day healthy meal plan.</p>
            </div>

            <div className="p-8 space-y-8">
              <CategorySection 
                title="Sabzi Mandi (Produce)" 
                icon={<Leaf className="text-green-500" />} 
                items={items.produce} 
                onToggle={(id) => toggleCheck('produce', id)} 
              />
              
              <CategorySection 
                title="Kirana Store (Pantry)" 
                icon={<Coffee className="text-orange-500" />} 
                items={items.pantry} 
                onToggle={(id) => toggleCheck('pantry', id)} 
              />

              <CategorySection 
                title="Dairy & Proteins" 
                icon={<Beef className="text-blue-500" />} 
                items={items.proteins} 
                onToggle={(id) => toggleCheck('proteins', id)} 
              />
            </div>
            
            <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
              <p className="text-sm text-slate-500">
                Tip: Buy spices in small quantities to keep them fresh.
              </p>
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
      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-800">{title}</h3>
    </div>
    <div className="space-y-3">
      {items.map((item) => (
        <label 
          key={item.id} 
          className={`flex items-center p-4 rounded-xl border-2 transition-all cursor-pointer group ${
            item.checked 
              ? 'bg-slate-50 border-slate-100 opacity-60' 
              : 'bg-white border-slate-100 hover:border-emerald-200 hover:shadow-sm'
          }`}
        >
          <div className={`w-6 h-6 rounded-md border-2 mr-4 flex items-center justify-center transition-colors ${
            item.checked ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 bg-white group-hover:border-emerald-400'
          }`}>
            {item.checked && <Check size={14} className="text-white" />}
          </div>
          <input 
            type="checkbox" 
            className="hidden" 
            checked={item.checked} 
            onChange={() => onToggle(item.id)} 
          />
          <div className="flex-1">
            <span className={`font-bold block ${item.checked ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
              {item.name}
            </span>
          </div>
          <span className={`text-sm font-medium px-3 py-1 rounded-full ${
            item.checked ? 'bg-slate-100 text-slate-400' : 'bg-emerald-50 text-emerald-700'
          }`}>
            {item.qty}
          </span>
        </label>
      ))}
    </div>
  </div>
);

export default ShoppingList;