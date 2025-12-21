import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Star, ShieldCheck, Clock, MapPin, Calendar, ArrowLeft, MessageSquare, Award } from 'lucide-react';

const DietitianDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // 1. Add State for Review
const [showReviewForm, setShowReviewForm] = useState(false);
const [newRating, setNewRating] = useState(5);
const [comment, setComment] = useState('');
const handleSubmitReview = async (e) => {
  e.preventDefault();
  try {
    await api.post(`/api/dietitians/${id}/review`, { rating: newRating, comment });
    alert("Review Added!");
    window.location.reload(); // Quick refresh to show new review
  } catch (err) {
    alert("Failed to add review");
  }
};
  // MOCK DATA (Replace with API call)
  const expert = {
    _id: id,
    name: 'Dr. Aditi Sharma',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=500',
    specialization: 'Diabetes & Metabolic Health',
    experience: 8,
    rating: 4.9,
    reviewCount: 124,
    hourlyRate: 800,
    languages: ['English', 'Hindi', 'Punjabi'],
    bio: "I specialize in reversing Type 2 Diabetes through functional nutrition. My approach combines traditional Indian dietary wisdom with modern metabolic science. I have helped over 500+ patients stabilize their blood sugar levels without heavy medication.",
    calendly: "https://calendly.com/" // In real app, this comes from DB
  };

  const handleBook = () => {
    // Open Calendly in new tab or modal
    window.open(expert.calendly, '_blank');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-950 font-display text-slate-200 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          
          <button onClick={() => navigate(-1)} className="flex items-center text-slate-400 hover:text-emerald-400 mb-8 font-bold transition-colors">
            <ArrowLeft size={20} className="mr-2" /> Back to Experts
          </button>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* LEFT: Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sticky top-24">
                <div className="relative mb-6">
                  <div className="w-full aspect-square rounded-2xl overflow-hidden border-4 border-slate-800">
                    <img src={expert.avatar} alt={expert.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute bottom-4 right-4 bg-emerald-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <ShieldCheck size={12} /> Verified Pro
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-white mb-1">{expert.name}</h1>
                <p className="text-emerald-400 font-medium mb-6">{expert.specialization}</p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                   <StatBox icon={<Star size={16} className="text-amber-400"/>} label="Rating" val={expert.rating} />
                   <StatBox icon={<Clock size={16} className="text-blue-400"/>} label="Exp" val={`${expert.experience} Yrs`} />
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={handleBook}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar size={18} /> Book Session (₹{expert.hourlyRate})
                  </button>
                  <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-700">
                    <MessageSquare size={18} /> Chat (₹99)
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: Details Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* About Section */}
              <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Award className="text-emerald-500" /> About Me
                </h3>
                <p className="text-slate-400 leading-relaxed text-lg">
                  {expert.bio}
                </p>
                
                <div className="mt-8 flex flex-wrap gap-3">
                  {expert.languages.map(lang => (
                    <span key={lang} className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-lg text-sm text-slate-300">
                      🗣️ {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reviews Section (Mock) */}
              <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">Patient Reviews ({expert.reviewCount})</h3>
                
                <div className="space-y-6">
                  {/* Review 1 */}
                  <div className="border-b border-slate-800 pb-6 last:border-0">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-slate-200">Rahul Verma</h4>
                      <div className="flex text-amber-400 text-xs">★★★★★</div>
                    </div>
                    <p className="text-slate-400 text-sm">"Dr. Aditi is amazing. She helped me fix my diet without giving up my favorite foods. Highly recommended!"</p>
                  </div>
                  {/* Review 2 */}
                  <div className="border-b border-slate-800 pb-6 last:border-0">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-slate-200">Sneha Gupta</h4>
                      <div className="flex text-amber-400 text-xs">★★★★☆</div>
                    </div>
                    <p className="text-slate-400 text-sm">"Very practical advice. The meal plan was easy to follow."</p>
                  </div>
                  <div className="flex justify-between items-center mb-6">
  <h3 className="text-xl font-bold text-white">Patient Reviews ({expert.reviewCount})</h3>
  <button 
    onClick={() => setShowReviewForm(!showReviewForm)}
    className="text-sm font-bold text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 px-4 py-2 rounded-lg"
  >
    + Write Review
  </button>
</div>

{showReviewForm && (
  <form onSubmit={handleSubmitReview} className="mb-8 bg-slate-950/50 p-6 rounded-2xl border border-slate-800">
     <div className="mb-4">
       <label className="block text-xs font-bold text-slate-400 mb-2">Rating</label>
       <div className="flex gap-2">
         {[1,2,3,4,5].map(star => (
            <button type="button" key={star} onClick={() => setNewRating(star)} className={`text-2xl ${star <= newRating ? 'text-amber-400' : 'text-slate-700'}`}>★</button>
         ))}
       </div>
     </div>
     <div className="mb-4">
       <label className="block text-xs font-bold text-slate-400 mb-2">Comment</label>
       <textarea 
          value={comment} 
          onChange={e => setComment(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white" 
          required
       />
     </div>
     <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold text-sm">Submit Review</button>
  </form>
)}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const StatBox = ({ icon, label, val }) => (
  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
    <div className="p-2 bg-slate-900 rounded-lg">{icon}</div>
    <div>
      <div className="text-xs text-slate-500 uppercase font-bold">{label}</div>
      <div className="font-bold text-white">{val}</div>
    </div>
  </div>
);

export default DietitianDetails;