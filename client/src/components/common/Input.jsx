import React from 'react';

const Input = ({ label, icon, type = "text", value, onChange, placeholder, required = false }) => {
  return (
    <div className="relative">
      {label && <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input 
          type={type} 
          value={value} 
          onChange={onChange} 
          required={required}
          className={`w-full bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-emerald-500 focus:bg-white focus:ring-0 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400 py-3.5 ${icon ? 'pl-12 pr-4' : 'px-4'}`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default Input;