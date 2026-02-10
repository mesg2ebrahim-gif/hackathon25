
import React from 'react';
import { AppRoute } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeRoute, onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate(AppRoute.HOME)}
          >
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none text-green-700">SAYLANI</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Welfare International Trust</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <button 
              onClick={() => onNavigate(AppRoute.HOME)}
              className={activeRoute === AppRoute.HOME ? "text-green-600" : "text-slate-600 hover:text-green-600 transition-colors"}
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate(AppRoute.REGISTER)}
              className={activeRoute === AppRoute.REGISTER ? "text-green-600" : "text-slate-600 hover:text-green-600 transition-colors"}
            >
              Registration
            </button>
            <button 
              onClick={() => onNavigate(AppRoute.FAQS)}
              className={(activeRoute === AppRoute.FAQS || activeRoute === AppRoute.SUPPORT_CHAT) ? "text-green-600" : "text-slate-600 hover:text-green-600 transition-colors"}
            >
              Support
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigate(AppRoute.REGISTER)}
              className="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-semibold hover:bg-green-700 transition-all shadow-md active:scale-95"
            >
              Apply Now
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold text-green-400 mb-4">Saylani Welfare</h2>
            <p className="text-slate-400 text-sm max-w-md">
              Leading the way in tech education and community support. Empowering thousands of students with free world-class education and digital skills.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="text-sm text-slate-400 space-y-2">
              <li className="hover:text-white cursor-pointer" onClick={() => onNavigate(AppRoute.REGISTER)}>Student Portal</li>
              <li className="hover:text-white cursor-pointer" onClick={() => onNavigate(AppRoute.HOME)}>Programs</li>
              <li className="hover:text-white cursor-pointer" onClick={() => onNavigate(AppRoute.FAQS)}>Help Center</li>
              <li className="hover:text-white cursor-pointer" onClick={() => onNavigate(AppRoute.SUPPORT_CHAT)}>AI Chatbot</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Social Support</h3>
            <div className="flex space-x-4">
              {/* WhatsApp */}
              <a 
                href="https://wa.me/923111729526" 
                target="_blank" 
                rel="noopener noreferrer"
                title="WhatsApp Support"
                className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center hover:bg-green-500 hover:text-white text-green-500 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.237a9.994 9.994 0 004.773 1.217h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.037-5.176-2.922-7.062A9.935 9.935 0 0012.012 2zm3.669 14.734c-.183.512-1.027.934-1.403 1.016-.325.07-.74.126-1.176-.012-.627-.2-1.335-.473-2.103-.923-1.57-.916-2.565-2.5-2.646-2.607-.081-.108-.606-.808-.606-1.541 0-.733.386-1.093.524-1.232.138-.139.307-.174.41-.174h.262c.081 0 .193-.006.285.22.11.27.376.918.409.981.033.063.054.135.011.217-.042.081-.064.134-.128.21-.063.076-.131.127-.189.197-.058.07-.126.147-.054.272.072.125.321.532.688.859.473.422.875.553 1.01.614.135.061.213.047.293-.047.08-.094.34-.394.43-.529.09-.135.18-.113.303-.068.123.045.782.37 1.148.542l.301.153c.123.063.205.09.255.168.05.078.05.452-.133.964z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a 
                href="https://www.facebook.com/saylaniwelfare" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Facebook"
                className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center hover:bg-blue-600 hover:text-white text-blue-600 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3l-.5 3H13v6.8c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="https://www.instagram.com/saylaniwelfare" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Instagram"
                className="w-10 h-10 rounded-full bg-pink-600/10 flex items-center justify-center hover:bg-pink-600 hover:text-white text-pink-600 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.28.072-1.689.072-4.947s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.28-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Saylani Welfare International Trust. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
