import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Clock, Flame, ChefHat, ArrowLeft, CheckCircle } from 'lucide-react';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // MOCK DATA (Same as before)
  const recipe = {
    name: "Moong Dal Chilla",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1000&auto=format&fit=crop",
    desc: "A savory pancake made with yellow lentils and mild spices. Excellent for diabetics.",
    prepTime: "15 mins",
    cookTime: "10 mins",
    calories: 220,
    servings: 2,
    tags: ["Diabetic Friendly", "Gluten Free", "High Protein"],
    ingredients: ["1 cup Yellow Moong Dal (Soaked)", "1 inch Ginger", "2 Green Chilies", "1/4 tsp Turmeric", "Salt", "1 tsp Oil", "Coriander"],
    steps: ["Drain dal and grind with ginger/chilies.", "Add spices and mix.", "Heat tawa and grease.", "Spread batter like Dosa.", "Cook until golden.", "Serve hot."],
    nutrition: { protein: "12g", carbs: "28g", fat: "4g" }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-950 py-8 px-4 font-display text-slate-200">
        <div className="max-w-4xl mx-auto">
          
          <button onClick={() => navigate(-1)} className="flex items-center text-slate-400 hover:text-emerald-400 mb-6 font-bold transition-colors">
            <ArrowLeft size={20} className="mr-2" /> Back to Protocol
          </button>

          <div className="bg-slate-900/50 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-slate-800">
            {/* Hero Image */}
            <div className="relative h-64 md:h-96 w-full">
               <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
               <div className="absolute bottom-6 left-6 md:left-10">
                 <div className="flex gap-2 mb-3">
                    {recipe.tags.map(tag => (
                      <span key={tag} className="bg-emerald-500/90 text-slate-900 px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-sm shadow-[0_0_10px_rgba(16,185,129,0.4)]">
                        {tag}
                      </span>
                    ))}
                 </div>
                 <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">{recipe.name}</h1>
               </div>
            </div>

            <div className="grid md:grid-cols-3 gap-0">
              {/* Left: Details */}
              <div className="md:col-span-2 p-8 md:p-10">
                <p className="text-slate-400 mb-8 text-lg leading-relaxed">{recipe.desc}</p>
                
                {/* Meta Data Row */}
                <div className="flex justify-between items-center bg-slate-950/50 p-4 rounded-xl border border-slate-800 mb-8">
                  <div className="text-center px-4 border-r border-slate-800">
                    <Clock size={20} className="text-emerald-500 mx-auto mb-1" />
                    <p className="text-xs text-slate-500 font-bold uppercase">Time</p>
                    <p className="font-bold text-white">{parseInt(recipe.prepTime) + parseInt(recipe.cookTime)} min</p>
                  </div>
                  <div className="text-center px-4 border-r border-slate-800">
                    <Flame size={20} className="text-orange-500 mx-auto mb-1" />
                    <p className="text-xs text-slate-500 font-bold uppercase">Calories</p>
                    <p className="font-bold text-white">{recipe.calories}</p>
                  </div>
                  <div className="text-center px-4">
                    <ChefHat size={20} className="text-blue-500 mx-auto mb-1" />
                    <p className="text-xs text-slate-500 font-bold uppercase">Servings</p>
                    <p className="font-bold text-white">{recipe.servings}</p>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-4">Ingredients</h3>
                <ul className="space-y-3 mb-8">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/30 border border-slate-800/50">
                      <div className="mt-1 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.6)]"></div>
                      <span className="text-slate-300 font-medium">{ing}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-bold text-white mb-4">Preparation</h3>
                <div className="space-y-6">
                  {recipe.steps.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 text-emerald-400 font-bold flex items-center justify-center border border-slate-700">
                        {i + 1}
                      </div>
                      <p className="text-slate-400 leading-relaxed pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Nutrition Panel */}
              <div className="bg-slate-950/30 p-8 border-l border-slate-800">
                <h3 className="text-lg font-bold text-white mb-6">Nutrition Facts</h3>
                <div className="space-y-4">
                  <NutritionRow label="Protein" value={recipe.nutrition.protein} color="bg-blue-500" percent="30%" />
                  <NutritionRow label="Carbs" value={recipe.nutrition.carbs} color="bg-orange-500" percent="50%" />
                  <NutritionRow label="Fat" value={recipe.nutrition.fat} color="bg-yellow-500" percent="20%" />
                </div>

                <div className="mt-8 p-4 bg-emerald-900/20 rounded-xl border border-emerald-500/30">
                  <h4 className="flex items-center gap-2 font-bold text-emerald-400 mb-2">
                    <CheckCircle size={18} /> Optimization Tip
                  </h4>
                  <p className="text-sm text-emerald-200/70">
                    Pair with buttermilk (Chaas) to enhance protein absorption and gut microbiome health.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const NutritionRow = ({ label, value, color, percent }) => (
  <div>
    <div className="flex justify-between text-sm font-bold mb-1">
      <span className="text-slate-400">{label}</span>
      <span className="text-white">{value}</span>
    </div>
    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
      <div className={`h-full ${color} shadow-[0_0_8px_rgba(255,255,255,0.3)]`} style={{ width: percent }}></div>
    </div>
  </div>
);

export default RecipeDetails;