
import React, { useState, useEffect } from 'react';
import { AppRoute, UserRegistration, FAQ } from './types';
import { INITIAL_FAQS } from './constants';
import Layout from './components/Layout';
import Hero from './components/Hero';
import RegistrationForm from './components/RegistrationForm';
import IdCard from './components/IdCard';
import Chatbot from './components/Chatbot';
import SupportChatPage from './components/SupportChatPage';

const App: React.FC = () => {
  const [route, setRoute] = useState<AppRoute>(AppRoute.HOME);
  const [registrations, setRegistrations] = useState<UserRegistration[]>([]);
  const [currentRegistration, setCurrentRegistration] = useState<UserRegistration | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>(INITIAL_FAQS);

  // Pure Frontend Persistence: Load from Browser LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('saylani_local_db');
    if (saved) {
      try {
        setRegistrations(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse local storage", e);
      }
    }
  }, []);

  const handleRegistration = (data: UserRegistration) => {
    const updated = [data, ...registrations];
    setRegistrations(updated);
    // Save to LocalStorage - No Backend Required
    localStorage.setItem('saylani_local_db', JSON.stringify(updated));
    setCurrentRegistration(data);
    setRoute(AppRoute.ID_CARD);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (route) {
      case AppRoute.HOME:
        return (
          <div className="space-y-24">
            <Hero onRegister={() => setRoute(AppRoute.REGISTER)} />
            
            <section className="bg-white rounded-3xl p-12 shadow-sm border border-slate-100">
               <h2 className="text-3xl font-bold text-center mb-12">Our Featured Programs</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { title: "Web & Mobile", icon: "💻", desc: "Build enterprise applications with React, Node, and Flutter." },
                    { title: "Graphic Design", icon: "🎨", desc: "Master visual communication with Adobe Suite and Figma." },
                    { title: "Artificial Intelligence", icon: "🤖", desc: "Learn Python, TensorFlow and deep learning architectures." }
                  ].map((p, i) => (
                    <div key={i} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-green-300 hover:bg-white hover:shadow-xl transition-all group">
                       <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">{p.icon}</div>
                       <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                       <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
               </div>
            </section>
          </div>
        );
      
      case AppRoute.REGISTER:
        return (
          <div className="py-8">
            <RegistrationForm onSubmit={handleRegistration} />
          </div>
        );
      
      case AppRoute.ID_CARD:
        return (
          <div className="py-12 max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-black mb-2 text-green-700">Congratulations!</h2>
            <p className="text-slate-500 mb-12">Your registration is successful. Your data is saved locally on this device.</p>
            {currentRegistration && <IdCard data={currentRegistration} />}
            <button 
              onClick={() => setRoute(AppRoute.HOME)}
              className="mt-12 text-slate-500 hover:text-green-600 font-semibold"
            >
              ← Back to Home
            </button>
          </div>
        );
      
      case AppRoute.FAQS:
        return (
          <div className="max-w-4xl mx-auto py-12">
            <div className="text-center mb-16">
               <h2 className="text-4xl font-black mb-4">Support Center</h2>
               <p className="text-slate-500">Instant answers powered by Gemini AI. No human operators needed.</p>
            </div>
            <div className="space-y-6">
               {faqs.map((faq, i) => (
                 <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">{faq.category}</span>
                    <h3 className="text-lg font-bold mt-1 mb-2">{faq.question}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                 </div>
               ))}
            </div>
            <div className="mt-16 p-8 bg-green-600 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-8">
               <div>
                  <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
                  <p className="opacity-80">Our AI assistant is ready to help you 24/7.</p>
               </div>
               <button 
                onClick={() => setRoute(AppRoute.SUPPORT_CHAT)}
                className="px-8 py-3 bg-white text-green-600 rounded-xl font-bold shadow-lg hover:scale-105 active:scale-95 transition-all"
               >
                 Open Live Chat
               </button>
            </div>
          </div>
        );

      case AppRoute.SUPPORT_CHAT:
        return (
          <div className="py-8">
            <div className="mb-6 flex items-center">
              <button onClick={() => setRoute(AppRoute.FAQS)} className="text-slate-500 hover:text-green-600 flex items-center text-sm font-semibold">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                Back to FAQs
              </button>
            </div>
            <SupportChatPage />
          </div>
        );

      default:
        return <div>404 - Not Found</div>;
    }
  };

  return (
    <Layout activeRoute={route} onNavigate={setRoute}>
      {renderContent()}
      <Chatbot />
    </Layout>
  );
};

export default App;
