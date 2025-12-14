import React from 'react';

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200 transition-all hover:-translate-y-1 group">
    <div className="mb-6 inline-flex size-14 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
        {/* Render icon if it's a React Node, or use Material Symbols if string */}
        {typeof icon === 'string' ? (
             <span className="material-symbols-outlined text-3xl">{icon}</span>
        ) : (
            <div className="text-3xl">{icon}</div>
        )}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

export default FeatureCard;