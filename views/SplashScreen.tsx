
import React, { useEffect, useState } from 'react';
import { ArrowRight, Zap, Terminal } from 'lucide-react';

interface SplashScreenProps {
  onStart?: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  const [bootStep, setBootStep] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Simulate a system boot sequence
    const steps = [
        () => setBootStep(1), // Init
        () => setBootStep(2), // Connecting to Neural Network
        () => setBootStep(3), // Loading Pitch Data
        () => setMounted(true) // Ready
    ];

    let delay = 0;
    steps.forEach((step, index) => {
        delay += index === 0 ? 500 : 800;
        setTimeout(step, delay);
    });
  }, []);

  const getBootText = () => {
      switch(bootStep) {
          case 0: return 'Sistem Başlatılıyor...';
          case 1: return 'Uydu Verileri Taranıyor...';
          case 2: return 'Sahalar Yükleniyor...';
          default: return 'Hazır.';
      }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0A0E14] overflow-hidden z-50">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#0A0E14] to-[#0A0E14]"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      
      {/* Golden Pulse */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFFF00] blur-[150px] rounded-full mix-blend-screen pointer-events-none transition-opacity duration-1000 ${mounted ? 'opacity-10' : 'opacity-0'}`}></div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-md px-6">
        
        {/* Boot Sequence Text (Hidden after mounted) */}
        {!mounted && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-24 flex flex-col items-center gap-2 transition-opacity duration-500">
                <Terminal size={24} className="text-[#FFFF00] animate-pulse" />
                <p className="text-[#FFFF00] font-mono text-xs tracking-widest uppercase animate-pulse">{getBootText()}</p>
                <div className="w-32 h-1 bg-gray-800 rounded-full overflow-hidden mt-2">
                    <div 
                        className="h-full bg-[#FFFF00] transition-all duration-700 ease-out" 
                        style={{ width: `${(bootStep / 3) * 100}%` }}
                    ></div>
                </div>
            </div>
        )}

        {/* Logo Mark */}
        <div className={`relative mb-12 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${mounted ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-10'}`}>
           <div className="w-32 h-32 bg-[#FFFF00] rounded-[32px] rotate-45 flex items-center justify-center shadow-[0_0_80px_rgba(255,255,0,0.5)] relative z-10 group cursor-default">
              <div className="-rotate-45 transition-transform duration-700 group-hover:scale-110">
                 <Zap size={64} className="text-black fill-black" />
              </div>
           </div>
           {/* Decorative Rings */}
           <div className={`absolute inset-0 border-2 border-[#FFFF00]/20 rounded-[32px] rotate-45 scale-125 transition-all duration-[3s] ${mounted ? 'animate-[spin_10s_linear_infinite]' : 'opacity-0'}`}></div>
           <div className={`absolute inset-0 border border-[#FFFF00]/10 rounded-[32px] rotate-45 scale-150 transition-all duration-[3s] ${mounted ? 'animate-[spin_15s_linear_infinite_reverse]' : 'opacity-0'}`}></div>
        </div>
        
        {/* Typography */}
        <div className={`text-center space-y-4 mb-16 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-8xl font-black tracking-tighter text-white drop-shadow-2xl">
              OYNA
            </h1>
            <div className="h-1 w-24 bg-[#FFFF00] mx-auto rounded-full shadow-[0_0_10px_#FFFF00]"></div>
            <p className="text-gray-400 text-sm font-bold tracking-[0.4em] uppercase">Sahanın Dijital Kaptanı</p>
        </div>

        {/* CTA Button */}
        <div className={`w-full transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button 
                onClick={onStart}
                className="group relative w-full bg-white text-black h-16 rounded-2xl font-black text-xl shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,0,0.4)] hover:bg-[#FFFF00] hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-3 overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1s_infinite]"></div>
                <span className="tracking-wide relative z-10">OYUNA BAŞLA</span>
                <div className="bg-black text-white p-1.5 rounded-full group-hover:bg-black/10 group-hover:text-black transition-colors relative z-10">
                    <ArrowRight className="w-5 h-5" />
                </div>
            </button>
        </div>
      </div>

      {/* Footer Text */}
      <div className={`absolute bottom-8 text-[10px] text-gray-600 font-medium tracking-widest uppercase transition-opacity duration-1000 delay-700 ${mounted ? 'opacity-50' : 'opacity-0'}`}>
          İstanbul • v2.4.0 • Gemini Core
      </div>
    </div>
  );
};

export default SplashScreen;
