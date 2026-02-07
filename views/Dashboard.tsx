
import React, { useState, useEffect } from 'react';
import { Bell, User, MapPin, Search, Calendar, Users, ChevronRight, Scale, Shield, Trophy, LayoutGrid, Zap, Bot, Clock, X, Check, Star, Award, Play, ArrowLeft, Wallet, TrendingUp } from 'lucide-react';
import { AppView, IncomingBid } from '../types';
import { INCOMING_BIDS } from '../constants';

interface DashboardProps {
  onNavigate: (view: AppView) => void;
  onBack: () => void;
}

// HOCA SKELETON LOADER
const DashboardSkeleton = () => (
  <div className="p-6 space-y-4 min-h-screen bg-[#0A0E14] animate-pulse">
      <div className="flex justify-between items-center mb-8">
          <div className="h-10 w-40 bg-gray-800 rounded-xl"></div>
          <div className="h-10 w-10 bg-gray-800 rounded-full"></div>
      </div>
      <div className="h-48 w-full bg-gray-800 rounded-[32px] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_1.5s_infinite]"></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
          <div className="h-40 bg-gray-800 rounded-[32px]"></div>
          <div className="h-40 bg-gray-800 rounded-[32px]"></div>
      </div>
      <div className="h-24 w-full bg-gray-800 rounded-[32px]"></div>
      <div className="flex justify-center items-center gap-2 mt-10">
          <div className="w-2 h-2 bg-[#FFFF00] rounded-full animate-bounce"></div>
          <p className="text-[#FFFF00] text-xs font-bold uppercase tracking-widest">Hoca Sahayı Hazırlıyor...</p>
      </div>
  </div>
);

const MatchCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 2);
    targetDate.setHours(20, 0, 0, 0);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="h-full bg-[#161B22]/60 backdrop-blur-xl border border-white/5 rounded-[32px] p-5 relative overflow-hidden group cursor-pointer hover:border-[#FFFF00]/30 transition-all duration-500">
       {/* Ambient Glow */}
       <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#FFFF00]/10 blur-[50px] rounded-full pointer-events-none"></div>
       
       <div className="flex justify-between items-start h-full flex-col">
          <div className="flex items-center gap-2 mb-2">
             <div className="bg-[#FFFF00] w-8 h-8 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,255,0,0.3)] animate-pulse">
                <Clock size={16} className="text-black" />
             </div>
             <p className="text-[10px] text-[#FFFF00] font-black uppercase tracking-widest">Sıradaki Maç</p>
          </div>
          
          <div>
            <p className="text-white font-black text-xl leading-tight">Arena Sport Center</p>
            <p className="text-gray-400 text-xs mt-1">Beşiktaş • Halı Saha 1</p>
          </div>

          <div className="w-full bg-[#0A0E14]/50 rounded-2xl p-2 mt-2 border border-white/5 flex justify-between items-center text-white font-mono">
             <div className="text-center">
                <span className="text-lg font-bold">{format(timeLeft.days)}</span>
                <span className="text-[8px] text-gray-500 block">GÜN</span>
             </div>
             <span className="text-gray-600">:</span>
             <div className="text-center">
                <span className="text-lg font-bold">{format(timeLeft.hours)}</span>
                <span className="text-[8px] text-gray-500 block">SA</span>
             </div>
             <span className="text-gray-600">:</span>
             <div className="text-center">
                <span className="text-lg font-bold">{format(timeLeft.minutes)}</span>
                <span className="text-[8px] text-gray-500 block">DK</span>
             </div>
          </div>
       </div>
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, onBack }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [bids, setBids] = useState<IncomingBid[]>(INCOMING_BIDS);

  useEffect(() => {
      // Simulate Hoca Loading
      setTimeout(() => setIsLoading(false), 2000);
  }, []);

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="flex flex-col min-h-screen pb-28 bg-[#0A0E14] text-white font-sans selection:bg-[#FFFF00] selection:text-black">
      
      {/* Header */}
      <header className="px-6 py-6 flex justify-between items-center bg-[#0A0E14]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-11 h-11 flex items-center justify-center bg-[#161B22] border border-white/5 rounded-full text-white hover:bg-white/10 active:scale-95 transition-all">
             <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black tracking-tighter">OYNA</h1>
            <p className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">Ecosystem</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => onNavigate('NOTIFICATIONS')}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-[#161B22] border border-white/5 text-gray-300 relative hover:bg-white/10 transition-all active:scale-95"
          >
            <Bell size={20} />
            <span className="absolute top-2.5 right-3 w-2 h-2 bg-[#FFFF00] rounded-full shadow-[0_0_10px_rgba(255,255,0,0.5)] animate-pulse"></span>
          </button>
          <button className="w-11 h-11 rounded-full bg-[#FFFF00] p-0.5 overflow-hidden shadow-[0_0_20px_rgba(255,255,0,0.2)] active:scale-95 transition-all" onClick={() => onNavigate('PROFILE')}>
            <img src="https://i.pravatar.cc/150?u=kaptan" alt="Profile" className="w-full h-full object-cover rounded-full" />
          </button>
        </div>
      </header>

      {/* BENTO GRID LAYOUT */}
      <main className="px-6 grid grid-cols-2 gap-4 auto-rows-min">
        
        {/* 1. Countdown Box (Large) */}
        <div className="col-span-2 h-48 animate-in slide-in-from-bottom-4 duration-500">
            <MatchCountdown />
        </div>

        {/* 2. Wallet Box (Small) */}
        <div 
            onClick={() => onNavigate('PROFILE')}
            className="col-span-1 h-44 bg-[#161B22]/60 backdrop-blur-xl border border-white/5 rounded-[32px] p-5 flex flex-col justify-between group cursor-pointer hover:bg-[#161B22] transition-colors animate-in slide-in-from-bottom-6 duration-700"
        >
            <div className="w-10 h-10 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                <Wallet size={20} />
            </div>
            <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Cüzdan</p>
                <p className="text-2xl font-black text-white tracking-tight">450₺</p>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-green-400 font-bold">
                    <TrendingUp size={10} /> +50₺ Bonus
                </div>
            </div>
        </div>

        {/* 3. Marketplace Box (Small) - UPDATED TEXT */}
        <div 
            onClick={() => onNavigate('MARKETPLACE_GK')}
            className="col-span-1 h-44 bg-gradient-to-br from-[#161B22] to-blue-900/20 backdrop-blur-xl border border-white/5 rounded-[32px] p-5 flex flex-col justify-between group cursor-pointer relative overflow-hidden animate-in slide-in-from-bottom-6 duration-700 delay-100"
        >
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/20 blur-[40px] rounded-full"></div>
            <div className="w-10 h-10 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 z-10 group-hover:rotate-12 transition-transform">
                <Shield size={20} />
            </div>
            <div className="z-10">
                <p className="text-[10px] text-blue-300 font-bold uppercase tracking-wider">Yetenek Merkezi</p>
                <p className="text-lg font-black text-white leading-tight mt-1">Kaleci veya<br/>Hakem Kirala</p>
            </div>
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                <ChevronRight size={16} className="text-white" />
            </div>
        </div>

        {/* 4. Team Tactics (Large Width) */}
        <div 
            onClick={() => onNavigate('MY_TEAM')}
            className="col-span-2 h-32 bg-[#1B4332] rounded-[32px] relative overflow-hidden group cursor-pointer border border-[#FFFF00]/10 shadow-lg animate-in slide-in-from-bottom-8 duration-700 delay-200"
        >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
            {/* Field Lines */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white/10 rounded-full"></div>
            
            <div className="absolute inset-0 p-6 flex items-center justify-between">
                <div>
                    <div className="bg-[#FFFF00] text-black text-[10px] font-black px-2 py-0.5 rounded w-fit mb-2 flex items-center gap-1">
                        <Bot size={10} /> AI KOÇ
                    </div>
                    <h3 className="text-xl font-black text-white uppercase tracking-wide">Taktik Tahtası</h3>
                    <p className="text-green-200 text-xs font-medium mt-1">Dizilişi ayarla, maçı kazan.</p>
                </div>
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-[#FFFF00] group-hover:text-black transition-colors">
                    <Users size={20} />
                </div>
            </div>
        </div>

        {/* 5. Pitch Booking (Large Width) */}
        <div 
            onClick={() => onNavigate('PITCH_DISCOVERY')}
            className="col-span-2 h-48 rounded-[32px] relative overflow-hidden group cursor-pointer border border-white/10 shadow-2xl animate-in slide-in-from-bottom-10 duration-700 delay-300"
        >
            <img 
              src="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=1000" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 bg-[#FFFF00] rounded-full animate-pulse"></span>
                    <span className="text-[#FFFF00] text-xs font-bold uppercase tracking-widest">Popüler</span>
                </div>
                <h2 className="text-3xl font-black text-white italic uppercase leading-none">Saha<br/>Kirala</h2>
            </div>
            
            <div className="absolute top-6 right-6">
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                    <Search size={20} className="text-white" />
                </div>
            </div>
        </div>

        {/* 6. Voting Card (Medium) */}
        <div 
           onClick={() => onNavigate('VOTING')}
           className="col-span-2 bg-gradient-to-r from-yellow-600 via-[#FFFF00] to-yellow-600 p-0.5 rounded-[32px] cursor-pointer shadow-[0_0_30px_rgba(255,215,0,0.15)] hover:scale-[1.01] transition-transform animate-in slide-in-from-bottom-12 duration-700 delay-400"
        >
            <div className="bg-[#161B22] rounded-[31px] p-5 flex items-center justify-between h-full">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-2xl flex items-center justify-center text-[#FFFF00]">
                        <Award size={28} />
                    </div>
                    <div>
                        <h3 className="font-black text-white text-base">MAÇIN ADAMI</h3>
                        <p className="text-[10px] text-gray-400 font-medium">Oylama başladı, kralını seç.</p>
                    </div>
                </div>
                <div className="bg-[#FFFF00] text-black w-10 h-10 rounded-full flex items-center justify-center">
                    <ChevronRight size={20} />
                </div>
            </div>
        </div>

      </main>

      {/* Floating Bottom Nav (Glassmorphism) */}
      <nav className="fixed bottom-6 left-6 right-6 bg-[#161B22]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-2 flex justify-between items-center shadow-2xl z-40">
        
        <button onClick={() => onNavigate('DASHBOARD')} className="flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl text-[#FFFF00] bg-white/5">
           <LayoutGrid size={20} />
        </button>

        <button onClick={() => onNavigate('PITCH_DISCOVERY')} className="flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl text-gray-500 hover:text-white transition-colors">
           <Search size={20} />
        </button>

        {/* Center Oyna TV Button */}
        <div className="relative -top-8">
          <button 
            onClick={() => onNavigate('OYNA_TV')}
            className="w-16 h-16 bg-[#FFFF00] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,0,0.4)] border-[6px] border-[#0A0E14] hover:scale-110 transition-transform active:scale-95"
          >
            <Play size={24} fill="black" className="ml-1" />
          </button>
        </div>

        <button onClick={() => onNavigate('MY_TEAM')} className="flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl text-gray-500 hover:text-white transition-colors">
           <Users size={20} />
        </button>

        <button onClick={() => onNavigate('PROFILE')} className="flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl text-gray-500 hover:text-white transition-colors">
           <User size={20} />
        </button>
      </nav>

    </div>
  );
};

export default Dashboard;
