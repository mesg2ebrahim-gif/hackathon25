
import React, { useRef } from 'react';
import { UserRegistration } from '../types';
import html2canvas from 'html2canvas';

interface IdCardProps {
  data: UserRegistration;
}

const IdCard: React.FC<IdCardProps> = ({ data }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Encode student data for the QR code
  const qrContent = `ID: ${data.id}\nName: ${data.fullName}\nProgram: ${data.program}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrContent)}`;

  const downloadIdCard = async () => {
    if (!cardRef.current) return;
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3, // Higher scale for better print/download quality
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });
      
      const image = canvas.toDataURL("image/png", 1.0);
      
      const link = document.createElement('a');
      link.download = `Saylani-ID-${data.fullName.replace(/\s+/g, '-')}.png`;
      link.href = image;
      link.click();
    } catch (error) {
      console.error("Error downloading ID card:", error);
      alert("Failed to download the ID card. Please try using the Print button instead.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        ref={cardRef}
        id="id-card-element" 
        className="relative w-[400px] h-[250px] bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200 font-sans text-slate-800"
      >
        {/* Header Ribbon */}
        <div className="absolute top-0 left-0 w-full h-14 bg-gradient-to-r from-green-700 to-green-600 flex items-center px-4 justify-between">
          <div className="flex items-center space-x-2">
             <div className="w-8 h-8 bg-white rounded flex items-center justify-center font-bold text-green-700">S</div>
             <div className="text-white">
                <p className="font-bold text-xs uppercase tracking-widest leading-none">Saylani Welfare</p>
                <p className="text-[8px] opacity-80 uppercase tracking-tighter">Student Identity Card</p>
             </div>
          </div>
          <div className="bg-white/20 px-2 py-1 rounded text-[10px] text-white font-mono">
            ID: {data.id}
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-16 flex px-5 space-x-5">
          {/* Student Photo */}
          <div className="w-24 h-24 bg-slate-100 rounded-lg border-2 border-slate-200 overflow-hidden flex items-center justify-center flex-shrink-0 shadow-sm">
             <img 
               src={data.profileImage || `https://picsum.photos/seed/${data.fullName}/200`} 
               alt="Profile" 
               crossOrigin="anonymous"
               className="w-full h-full object-cover" 
             />
          </div>

          <div className="flex flex-col justify-center space-y-2 py-1 flex-grow">
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">Full Name</p>
              <p className="text-sm font-bold text-slate-800 uppercase line-clamp-1">{data.fullName}</p>
            </div>
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">Program</p>
              <p className="text-xs font-semibold text-green-700 line-clamp-1">{data.program}</p>
            </div>
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">CNIC</p>
              <p className="text-xs font-medium text-slate-600">{data.cnic}</p>
            </div>
          </div>
        </div>

        {/* Footer Area with Real QR Code */}
        <div className="absolute bottom-4 right-5 flex items-end space-x-3">
           <div className="text-right pb-1">
              <p className="text-[8px] text-slate-400 font-bold uppercase">Issued On</p>
              <p className="text-[10px] font-bold text-slate-700">{data.issueDate}</p>
           </div>
           <div className="w-16 h-16 bg-white border border-slate-100 rounded p-1 shadow-sm flex items-center justify-center overflow-hidden">
             <img 
               src={qrCodeUrl} 
               alt="Verification QR" 
               className="w-full h-full object-contain"
               crossOrigin="anonymous"
             />
           </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-green-600"></div>
        <div className="absolute bottom-1 left-0 w-32 h-0.5 bg-yellow-400"></div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4 print:hidden">
        <button 
          onClick={() => window.print()}
          className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition flex items-center space-x-2 shadow-md active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          <span>Print Card</span>
        </button>
        
        <button 
          onClick={downloadIdCard}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2 shadow-md active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          <span>Download Image</span>
        </button>

        <button 
          onClick={() => {
            const msg = encodeURIComponent(`Assalamu Alaikum! My name is ${data.fullName}. I have successfully registered for the ${data.program} program at Saylani. Here is my ID: ${data.id}`);
            window.open(`https://wa.me/923111729526?text=${msg}`, '_blank');
          }}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center space-x-2 shadow-md active:scale-95"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.237a9.994 9.994 0 004.773 1.217h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.037-5.176-2.922-7.062A9.935 9.935 0 0012.012 2z"/></svg>
          <span>Share via WhatsApp</span>
        </button>
      </div>
    </div>
  );
};

export default IdCard;
