
import React from 'react';
import { AppRoute } from '../types';

interface HeroProps {
  onRegister: () => void;
}

const Hero: React.FC<HeroProps> = ({ onRegister }) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-12 py-12 md:py-24">
      <div className="flex-1 space-y-6">
        <div className="inline-flex items-center px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold border border-green-200">
           New Admissions Open 2024
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
          Empowering Youth Through <span className="text-green-600">Free Technology</span> Education
        </h1>
        <p className="text-lg text-slate-600 max-w-xl">
          Join thousands of students learning Graphic Design, Web Development, and AI at Saylani. Transform your career with world-class mentorship and industry placement.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button 
            onClick={onRegister}
            className="px-8 py-4 bg-green-600 text-white rounded-xl font-bold shadow-xl hover:bg-green-700 hover:-translate-y-1 transition-all active:scale-95"
          >
            Apply for Admission
          </button>
          <button 
            className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold shadow-md hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            Watch Success Stories
          </button>
        </div>
        <div className="flex items-center gap-6 pt-8 grayscale opacity-60">
           <img src="https://picsum.photos/seed/goog/60/20" alt="Partner" />
           <img src="https://picsum.photos/seed/meta/60/20" alt="Partner" />
           <img src="https://picsum.photos/seed/msft/60/20" alt="Partner" />
        </div>
      </div>
      <div className="flex-1 relative">
         <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="https://picsum.photos/seed/saylani/800/600" 
              alt="Education" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
               <div className="text-white">
                  <p className="text-2xl font-bold">100,000+</p>
                  <p className="text-sm opacity-80 uppercase tracking-widest font-semibold">Students Graduated</p>
               </div>
            </div>
         </div>
         <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
         <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Hero;
