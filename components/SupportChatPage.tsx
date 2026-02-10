
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

const SupportChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', parts: [{ text: "Welcome to Saylani Support! I'm your AI assistant. How can I help you with admissions, campus details, or course information today?" }] }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', parts: [{ text: userMsg }] }]);
    setIsTyping(true);

    try {
      const response = await geminiService.sendMessage(userMsg);
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: response }] }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: "I'm having trouble connecting to the network. Please check your internet and try again." }] }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[70vh] flex flex-col bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
      {/* Header */}
      <div className="p-6 bg-green-600 text-white flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center font-bold text-xl">S</div>
          <div>
            <h2 className="text-xl font-bold">Saylani AI Support</h2>
            <p className="text-xs text-green-100 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              24/7 Intelligent Assistant
            </p>
          </div>
        </div>
        <div className="hidden md:block text-right text-xs text-green-100">
          Powered by Gemini AI
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex flex-col max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`px-5 py-3 rounded-2xl shadow-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-green-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
              }`}>
                {msg.parts[0].text}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">
                {msg.role === 'user' ? 'You' : 'Saylani Assistant'}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white px-5 py-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-slate-100">
        <div className="flex items-center space-x-3 bg-slate-100 rounded-2xl p-2 pl-6 focus-within:ring-2 focus-within:ring-green-100 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about registration, courses, or campus locations..."
            className="flex-grow bg-transparent outline-none text-slate-700 text-sm py-2"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all active:scale-95 ${
              !input.trim() || isTyping ? 'bg-slate-300 text-slate-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
            }`}
          >
            <svg className="w-6 h-6 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-[10px] text-slate-400 text-center mt-4">
          The AI can help with most common queries. For complex issues, please visit our Bahadurabad campus.
        </p>
      </div>
    </div>
  );
};

export default SupportChatPage;
