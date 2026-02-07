
import React from 'react';
import { UserRole, AppView } from '../types';
import { ArrowLeft, Settings, MapPin, Award, Star, Shield, Scale, Building2, CreditCard, ChevronRight, LogOut, Wallet, Ticket, Timer, Hand, Trophy, Crown, X } from 'lucide-react';
import LoyaltyCard from './LoyaltyCard';
import HocaWidget from '../HocaWidget';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

interface ProfileScreenProps {
  role: UserRole;
  onBack: () => void;
  onNavigate?: (view: AppView) => void;
  isPro?: boolean;
}

const PLAYER_STATS_DATA = [
  { subject: 'Hız', A: 85, fullMark: 100 },
  { subject: 'Şut', A: 90, fullMark: 100 },
  { subject: 'Pas', A: 75, fullMark: 100 },
  { subject: 'Dribling', A: 80, fullMark: 100 },
  { subject: 'Defans', A: 60, fullMark: 100 },
  { subject: 'Fizik', A: 70, fullMark: 100 },
];

const ProfileScreen: React.FC<ProfileScreenProps> = ({ role, onBack, onNavigate, isPro = false }) => {
  
  const renderRoleBadge = () => {
    switch(role) {
      case UserRole.PLAYER: return <div className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-[10px] font-black border border-yellow-500/30 tracking-wider">OYUNCU</div>;
      case UserRole.GOALKEEPER: return <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-[10px] font-black border border-green-500/30 tracking-wider">KALECİ</div>;
      case UserRole.REFEREE: return <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-[10px] font-black border border-red-500/30 tracking-wider">HAKEM</div>;
      case UserRole.OWNER: return <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-[10px] font-black border border-blue-500/30 tracking-wider">SAHA SAHİBİ</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E14] pb-24 font-sans">
       
       {/* Hoca Upsell */}
       {!isPro && <HocaWidget context="PREMIUM_UPSELL_PROFILE" onAction={() => onNavigate && onNavigate('PREMIUM')} />}

       {/* Custom Header (Smart Nav) */}
       <div className="relative h-56 bg-[#161B22] overflow-hidden">
           {/* Abstract Background Art */}
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gray-800 via-[#0A0E14] to-[#0A0E14] opacity-80"></div>
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
           
           <div className="absolute top-6 left-0 right-0 px-6 flex justify-between items-center z-10">
                <button 
                    onClick={onBack} 
                    className="w-11 h-11 flex items-center justify-center bg-black/20 backdrop-blur-md rounded-full text-white border border-white/10 hover:bg-black/40 active:scale-95 transition-all"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-sm font-black text-white tracking-widest uppercase opacity-80">PROFİL</h1>
                <button 
                        onClick={() => onNavigate && onNavigate('SETTINGS')}
                        className="w-11 h-11 flex items-center justify-center bg-black/20 backdrop-blur-md rounded-full text-white border border-white/10 hover:bg-black/40 active:scale-95 transition-all"
                >
                    <Settings size={20} />
                </button>
           </div>
       </div>

       <div className="px-6 -mt-20 relative z-10">
           <div className="flex flex-col items-center">
               
               {/* Avatar Container with 3D Badge */}
               <div className="relative group">
                   <div className={`w-32 h-32 rounded-[32px] border-4 shadow-2xl relative overflow-hidden bg-[#161B22] ${isPro ? 'border-[#FFFF00] shadow-[0_0_30px_rgba(255,255,0,0.3)]' : 'border-[#2D3748]'}`}>
                       <img 
                            src={role === UserRole.REFEREE ? "https://i.pravatar.cc/150?u=ref1" : role === UserRole.GOALKEEPER ? "https://i.pravatar.cc/150?u=gk1" : "https://i.pravatar.cc/150?u=kaptan"} 
                            alt="Profile" 
                            className="w-full h-full object-cover" 
                       />
                   </div>
                   {/* 3D MOTM Badge - Floating & Rotating */}
                   <div className="absolute -bottom-4 -right-4 perspective-[500px] z-20">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#FFD700] to-[#DAA520] rounded-xl flex items-center justify-center shadow-xl border border-white/20 transform rotate-y-12 animate-[float_4s_ease-in-out_infinite]">
                            <Trophy size={20} className="text-black drop-shadow-md" fill="black" />
                        </div>
                   </div>
               </div>
               
               <div className="mt-4 text-center">
                   <h1 className="text-3xl font-black text-white flex items-center justify-center gap-2">
                       {role === UserRole.REFEREE ? 'Serkan Yılmaz' : 'Burak Kaptan'}
                       {isPro && <Crown size={24} className="text-[#FFFF00] fill-[#FFFF00]" />}
                   </h1>
                   <div className="flex items-center justify-center gap-2 mt-1 mb-4">
                       <MapPin size={12} className="text-gray-500" />
                       <span className="text-xs text-gray-400 font-medium">Beşiktaş, İstanbul</span>
                       {renderRoleBadge()}
                   </div>
               </div>

               {/* Upgrade Banner */}
               {!isPro && (
                   <button 
                    onClick={() => onNavigate && onNavigate('PREMIUM')}
                    className="w-full bg-gradient-to-r from-[#161B22] via-[#2D3748] to-[#161B22] p-[1px] rounded-[24px] mb-8 shadow-lg group active:scale-98 transition-transform"
                   >
                       <div className="bg-[#0A0E14] rounded-[23px] p-4 flex items-center justify-between relative overflow-hidden">
                           <div className="absolute inset-0 bg-gradient-to-r from-[#FFFF00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                           <div className="flex items-center gap-4 relative z-10">
                               <div className="bg-[#FFFF00] w-10 h-10 rounded-xl flex items-center justify-center text-black shadow-[0_0_15px_rgba(255,255,0,0.4)]">
                                   <Crown size={20} />
                               </div>
                               <div className="text-left">
                                   <h4 className="font-black text-white text-sm">OYNA PRO'ya Geç</h4>
                                   <p className="text-[10px] text-gray-400 font-medium">Limitleri kaldır, efsane ol.</p>
                               </div>
                           </div>
                           <ChevronRight size={18} className="text-gray-600 group-hover:text-[#FFFF00] transition-colors" />
                       </div>
                   </button>
               )}

               {/* PERFORMANCE RADAR CHART */}
               {role === UserRole.PLAYER && (
                   <div className="w-full bg-[#161B22]/50 border border-white/5 rounded-[32px] p-4 mb-8 relative">
                       <h3 className="text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest text-center">YETENEK HARİTASI</h3>
                       <div className="h-64 w-full">
                           <ResponsiveContainer width="100%" height="100%">
                               <RadarChart cx="50%" cy="50%" outerRadius="70%" data={PLAYER_STATS_DATA}>
                                   <PolarGrid stroke="#333" />
                                   <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 700 }} />
                                   <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                   <Radar
                                       name="Burak"
                                       dataKey="A"
                                       stroke="#FFFF00"
                                       strokeWidth={3}
                                       fill="#FFFF00"
                                       fillOpacity={0.3}
                                   />
                               </RadarChart>
                           </ResponsiveContainer>
                       </div>
                       {/* Rating Circle */}
                       <div className="absolute top-4 right-4 bg-[#FFFF00] text-black w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shadow-lg border-2 border-[#0A0E14]">
                           8.4
                       </div>
                   </div>
               )}

               {/* Stats Grid (Bento Style) */}
               <div className="w-full grid grid-cols-3 gap-3 mb-8">
                    <div className="bg-[#161B22] p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center aspect-square">
                        <Trophy size={20} className="text-yellow-500 mb-1" />
                        <h4 className="text-xl font-black text-white">24</h4>
                        <p className="text-[9px] text-gray-500 uppercase font-bold">Maç</p>
                    </div>
                    <div className="bg-[#161B22] p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center aspect-square">
                        <Award size={20} className="text-purple-500 mb-1" />
                        <h4 className="text-xl font-black text-white">12</h4>
                        <p className="text-[9px] text-gray-500 uppercase font-bold">Gol</p>
                    </div>
                    <div className="bg-[#161B22] p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center aspect-square">
                        <Star size={20} className="text-blue-500 mb-1" />
                        <h4 className="text-xl font-black text-white">5</h4>
                        <p className="text-[9px] text-gray-500 uppercase font-bold">MOTM</p>
                    </div>
               </div>

               {/* Loyalty Card Widget */}
               {role === UserRole.PLAYER && (
                   <div className="w-full mb-8">
                       <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 ml-2">SADAKAT KARTIM</h3>
                       <div className="transform scale-95 origin-center">
                           <LoyaltyCard embedMode={true} />
                       </div>
                   </div>
               )}

               {/* Menu List */}
               <div className="w-full space-y-4">
                   <div className="bg-[#161B22] border border-white/5 rounded-[24px] overflow-hidden">
                       <button className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition-colors border-b border-white/5 group">
                           <div className="flex items-center gap-4">
                               <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                   <Wallet size={20} />
                               </div>
                               <div className="text-left">
                                   <p className="text-sm font-bold text-white">Cüzdan</p>
                                   <p className="text-[10px] text-gray-500 font-medium">Bakiye: 450.00₺</p>
                               </div>
                           </div>
                           <ChevronRight size={18} className="text-gray-600 group-hover:text-white" />
                       </button>
                       <button className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition-colors group">
                           <div className="flex items-center gap-4">
                               <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                                   <CreditCard size={20} />
                               </div>
                               <div className="text-left">
                                   <p className="text-sm font-bold text-white">Ödeme Yöntemleri</p>
                                   <p className="text-[10px] text-gray-500 font-medium">MasterCard •••• 4242</p>
                               </div>
                           </div>
                           <ChevronRight size={18} className="text-gray-600 group-hover:text-white" />
                       </button>
                   </div>

                   <button className="w-full p-4 bg-red-500/10 border border-red-500/20 rounded-[24px] flex items-center justify-center gap-2 text-red-500 font-bold text-sm hover:bg-red-500/20 transition-colors active:scale-95">
                       <LogOut size={18} /> Çıkış Yap
                   </button>
               </div>

           </div>
       </div>
    </div>
  );
};

export default ProfileScreen;
