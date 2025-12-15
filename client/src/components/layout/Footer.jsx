import React from 'react';
import { Activity, Instagram, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10 font-display text-slate-400 relative overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-slate-900 border border-slate-800 p-2 rounded-xl">
                <Activity className="h-6 w-6 text-emerald-500" />
              </div>
              <span className="font-bold text-2xl text-white tracking-tight">SmartDiet</span>
            </div>
            <p className="text-sm leading-relaxed mb-8 opacity-80">
              Next-generation bio-optimization engine using neural networks to decode your perfect nutritional path.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Linkedin size={18} />} />
            </div>
          </div>

          {/* Links Columns */}
          <FooterColumn title="System" links={["Features", "Pricing", "Testimonials", "API Docs"]} />
          <FooterColumn title="Knowledge" links={["Bio-Hacking Blog", "Metabolic Guide", "Food Database", "FAQ"]} />
          <FooterColumn title="Compliance" links={["Privacy Protocol", "Terms of Service", "Cookie Policy", "Contact Support"]} />
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-mono text-slate-600">© 2025 SmartDiet AI Systems. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer">
                <Mail size={14} />
                <span>system@smartdiet.ai</span>
             </div>
             <div className="hidden md:block w-1 h-1 bg-slate-800 rounded-full"></div>
             <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <span>Engineered with</span>
                <Heart size={10} className="fill-red-500 text-red-500 animate-pulse" />
                <span>in India</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, links }) => (
  <div>
    <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">{title}</h4>
    <ul className="space-y-4 text-sm font-medium">
      {links.map((link) => (
        <li key={link}>
          <a href="#" className="hover:text-emerald-400 transition-all hover:pl-1 block">{link}</a>
        </li>
      ))}
    </ul>
  </div>
);

const SocialIcon = ({ icon }) => (
  <a href="#" className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-emerald-400 hover:border-emerald-500/30 transition-all shadow-sm">
    {icon}
  </a>
);

export default Footer;