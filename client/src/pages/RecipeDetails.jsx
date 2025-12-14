import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Clock, Flame, ChefHat, ArrowLeft, CheckCircle } from 'lucide-react';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // MOCK DATABASE (In real app, fetch from backend using ID)
  const recipes = {
    '101': {
      name: "Moong Dal Chilla (High Protein)",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1000&auto=format&fit=crop",
      desc: "A savory pancake made with yellow lentils and mild spices. Excellent for diabetics.",
      prepTime: "15 mins",
      cookTime: "10 mins",
      calories: 220,
      servings: 2,
      tags: ["Diabetic Friendly", "Gluten Free", "High Protein"],
      ingredients: [
        "1 cup Yellow Moong Dal (Soaked for 2 hours)",
        "1 inch Ginger",
        "2 Green Chilies (Optional)",
        "1/4 tsp Turmeric Powder",
        "Salt to taste",
        "1 tsp Oil (Ghee/Olive Oil)",
        "Handful of Coriander leaves"
      ],
      steps: [
        "Drain the soaked dal and grind it with ginger and chilies into a smooth batter.",
        "Add turmeric, salt, and coriander leaves. Mix well to get a pouring consistency.",
        "Heat a non-stick tawa. Grease lightly with oil.",
        "Pour a ladle full of batter and spread it in a circle (like Dosa).",
        "Cook on medium flame until golden brown on both sides.",
        "Serve hot with Mint Chutney."
      ],
      nutrition: { protein: "12g", carbs: "28g", fat: "4g" }
    }
  };

  const recipe = recipes['101']; // Hardcoded for demo, normally use recipes[id]

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          
          <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-emerald-600 mb-6 font-bold transition-colors">
            <ArrowLeft size={20} className="mr-2" /> Back to Plan
          </button>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Hero Image */}
            <div className="relative h-64 md:h-80 w-full">
               <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
               <div className="absolute bottom-6 left-6 md:left-10 text-white">
                 <div className="flex gap-2 mb-3">
                    {recipe.tags.map(tag => (
                      <span key={tag} className="bg-emerald-500/90 px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-sm">
                        {tag}
                      </span>
                    ))}
                 </div>
                 <h1 className="text-3xl md:text-4xl font-extrabold">{recipe.name}</h1>
               </div>
            </div>

            <div className="grid md:grid-cols-3 gap-0">
              
              {/* Left: Details */}
              <div className="md:col-span-2 p-8 md:p-10">
                <p className="text-slate-600 mb-8 text-lg leading-relaxed">{recipe.desc}</p>
                
                {/* Meta Data Row */}
                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100 mb-8">
                  <div className="text-center px-4 border-r border-slate-200 last:border-0">
                    <Clock size={20} className="text-emerald-500 mx-auto mb-1" />
                    <p className="text-xs text-slate-400 font-bold uppercase">Time</p>
                    <p className="font-bold text-slate-800">{parseInt(recipe.prepTime) + parseInt(recipe.cookTime)} min</p>
                  </div>
                  <div className="text-center px-4 border-r border-slate-200 last:border-0">
                    <Flame size={20} className="text-orange-500 mx-auto mb-1" />
                    <p className="text-xs text-slate-400 font-bold uppercase">Calories</p>
                    <p className="font-bold text-slate-800">{recipe.calories}</p>
                  </div>
                  <div className="text-center px-4">
                    <ChefHat size={20} className="text-blue-500 mx-auto mb-1" />
                    <p className="text-xs text-slate-400 font-bold uppercase">Servings</p>
                    <p className="font-bold text-slate-800">{recipe.servings}</p>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-4">Ingredients</h3>
                <ul className="space-y-3 mb-8">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="mt-1 min-w-[20px]">
                        <div className="w-5 h-5 rounded-full border-2 border-emerald-200 flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                        </div>
                      </div>
                      <span className="text-slate-700 font-medium">{ing}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-bold text-slate-900 mb-4">Instructions</h3>
                <div className="space-y-6">
                  {recipe.steps.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">
                        {i + 1}
                      </div>
                      <p className="text-slate-600 leading-relaxed pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Nutrition Panel */}
              <div className="bg-slate-50 p-8 border-l border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Nutrition Facts</h3>
                <div className="space-y-4">
                  <NutritionRow label="Protein" value={recipe.nutrition.protein} color="bg-blue-500" percent="30%" />
                  <NutritionRow label="Carbs" value={recipe.nutrition.carbs} color="bg-orange-500" percent="50%" />
                  <NutritionRow label="Fat" value={recipe.nutrition.fat} color="bg-yellow-500" percent="20%" />
                </div>

                <div className="mt-8 p-4 bg-emerald-100/50 rounded-xl border border-emerald-200">
                  <h4 className="flex items-center gap-2 font-bold text-emerald-800 mb-2">
                    <CheckCircle size={18} /> Healthy Tip
                  </h4>
                  <p className="text-sm text-emerald-700">
                    Pair this with a glass of buttermilk (Chaas) to improve digestion and protein absorption.
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
      <span className="text-slate-600">{label}</span>
      <span className="text-slate-900">{value}</span>
    </div>
    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: percent }}></div>
    </div>
  </div>
);

export default RecipeDetails;