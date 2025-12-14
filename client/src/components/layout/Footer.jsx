import React from 'react';
import { Activity, Instagram, Twitter, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8 font-display">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-emerald-50 p-1.5 rounded-lg">
                <Activity className="h-5 w-5 text-emerald-500" />
              </div>
              <span className="font-bold text-xl text-slate-800">SmartDiet AI</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Personalized nutrition planning powered by artificial intelligence, tailored for Indian health needs.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Linkedin size={18} />} />
            </div>
          </div>

          {/* Links Columns */}
          <FooterColumn title="Product" links={["Features", "Pricing", "Testimonials", "API"]} />
          <FooterColumn title="Resources" links={["Blog", "Health Guide", "Diet Charts", "FAQ"]} />
          <FooterColumn title="Legal" links={["Privacy Policy", "Terms of Service", "Cookie Policy", "Contact"]} />
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">© 2025 SmartDiet AI. All rights reserved.</p>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Mail size={16} />
            <span>support@smartdiet.ai</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, links }) => (
  <div>
    <h4 className="font-bold text-slate-900 mb-4">{title}</h4>
    <ul className="space-y-3 text-sm text-slate-500">
      {links.map((link) => (
        <li key={link}>
          <a href="#" className="hover:text-emerald-600 transition-colors">{link}</a>
        </li>
      ))}
    </ul>
  </div>
);

const SocialIcon = ({ icon }) => (
  <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500 transition-all">
    {icon}
  </a>
);

export default Footer;