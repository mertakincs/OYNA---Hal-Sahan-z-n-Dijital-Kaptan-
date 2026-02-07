
import React, { useState, useEffect } from 'react';
import { UserRole } from '../types';
import { Trophy, Shield, Scale, Building2, ChevronRight, X, User, MapPin, Hash, CheckCircle2, ArrowLeft, ScanLine, Binary, Fingerprint } from 'lucide-react';
import HocaWidget from '../HocaWidget';

interface RoleSelectionProps {
  onSelect: (role: UserRole) => void;
  onBack: () => void;
}

const RoleCard: React.FC<{ 
  title: string; 
  subtitle: string;
  icon: React.ReactNode; 
  colorClass: string;
  onClick: () => void;
  delay: string;
}> = ({ title, subtitle, icon, colorClass, onClick, delay }) => (
  <button 
    onClick={onClick}
    className={`group relative w-full h-40 bg-[#161B22]/80 backdrop-blur-md border border-white/5 rounded-[24px] p-6 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-opacity-50 hover:bg-[#161B22] ${colorClass.replace('text-', 'hover:border-')} animate-in slide-in-from-bottom-8 ${delay} fill-mode-both`}
  >
    {/* Tech Decorations */}
    <div className="absolute top-0 right-0 p-3 opacity-20">
        <Binary size={16} className={colorClass} />
    </div>
    
    <div className="absolute -left-2 -bottom-2 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-xl group-hover:bg-white/10 transition-colors"></div>

    <div className="flex items-center justify-between relative z-10 h-full">
        <div className="flex items-center gap-5">
            <div className={`w-14 h-14 rounded-2xl bg-[#0A0E14] border border-white/5 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 ${colorClass}`}>
                {icon}
            </div>
            <div className="text-left">
                <h3 className="text-xl font-black text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                    {title}
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-1 group-hover:text-gray-400">{subtitle}</p>
            </div>
        </div>
        
        <div className={`w-10 h-10 rounded-full border border-white/5 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-black ${colorClass}`}>
            <ChevronRight size={20} />
        </div>
    </div>
  </button>
);

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelect, onBack }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleCardClick = (role: UserRole) => {
    setSelectedRole(role);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setSelectedRole(null);
  };

  const handleComplete = () => {
    if (selectedRole) {
       setIsVerifying(true);
       setTimeout(() => {
           onSelect(selectedRole);
       }, 1500);
    }
  };

  const renderFormContent = () => {
    switch (selectedRole) {
      case UserRole.OWNER:
        return (
          <>
            <div className="space-y-4">
              <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-center gap-3 focus-within:border-blue-500 transition-colors group">
                 <Building2 className="text-gray-600 group-focus-within:text-blue-500 transition-colors" size={20} />
                 <input type="text" placeholder="Tesis Adı" className="bg-transparent w-full outline-none text-white font-bold placeholder:font-medium placeholder:text-gray-700" />
              </div>
              <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-center gap-3 focus-within:border-blue-500 transition-colors group">
                 <Hash className="text-gray-600 group-focus-within:text-blue-500 transition-colors" size={20} />
                 <input type="text" placeholder="Vergi No" className="bg-transparent w-full outline-none text-white font-bold placeholder:font-medium placeholder:text-gray-700" />
              </div>
              <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-center gap-3 focus-within:border-blue-500 transition-colors group">
                 <MapPin className="text-gray-600 group-focus-within:text-blue-500 transition-colors" size={20} />
                 <input type="text" placeholder="Tesis Adresi" className="bg-transparent w-full outline-none text-white font-bold placeholder:font-medium placeholder:text-gray-700" />
              </div>
            </div>
          </>
        );
      case UserRole.REFEREE:
        return (
          <>
             <div className="space-y-4">
              <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-center gap-3 focus-within:border-red-500 transition-colors group">
                 <Scale className="text-gray-600 group-focus-within:text-red-500 transition-colors" size={20} />
                 <input type="text" placeholder="Lisans Numarası" className="bg-transparent w-full outline-none text-white font-bold placeholder:font-medium placeholder:text-gray-700" />
              </div>
              <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-center gap-3 focus-within:border-red-500 transition-colors group">
                 <MapPin className="text-gray-600 group-focus-within:text-red-500 transition-colors" size={20} />
                 <select className="bg-transparent w-full outline-none text-white font-bold bg-[#0A0E14] border-none">
                    <option>İstanbul - Avrupa</option>
                    <option>İstanbul - Anadolu</option>
                 </select>
              </div>
            </div>
          </>
        );
      case UserRole.GOALKEEPER:
         return (
          <>
             <div className="space-y-4">
              <div className="flex gap-4">
                <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex-1 focus-within:border-green-500 transition-colors">
                    <input type="text" placeholder="Boy (cm)" className="bg-transparent w-full outline-none text-white font-bold text-center placeholder:text-gray-700" />
                </div>
                <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex-1 focus-within:border-green-500 transition-colors">
                    <input type="text" placeholder="Yaş" className="bg-transparent w-full outline-none text-white font-bold text-center placeholder:text-gray-700" />
                </div>
              </div>
              <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-center gap-3 focus-within:border-green-500 transition-colors group">
                 <Shield className="text-gray-600 group-focus-within:text-green-500 transition-colors" size={20} />
                 <input type="text" placeholder="Mevcut Takım (Opsiyonel)" className="bg-transparent w-full outline-none text-white font-bold placeholder:font-medium placeholder:text-gray-700" />
              </div>
            </div>
          </>
         );
      default: // PLAYER
        return (
          <>
            <div className="space-y-4">
              <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-center gap-3 focus-within:border-yellow-500 transition-colors group">
                 <User className="text-gray-600 group-focus-within:text-yellow-500 transition-colors" size={20} />
                 <input type="text" placeholder="Kullanıcı Adı" className="bg-transparent w-full outline-none text-white font-bold placeholder:font-medium placeholder:text-gray-700" />
              </div>
              <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-center gap-3 focus-within:border-yellow-500 transition-colors group">
                 <Trophy className="text-gray-600 group-focus-within:text-yellow-500 transition-colors" size={20} />
                 <select className="bg-transparent w-full outline-none text-white font-bold bg-[#0A0E14] border-none">
                    <option>Forvet</option>
                    <option>Orta Saha</option>
                    <option>Defans</option>
                 </select>
              </div>
            </div>
          </>
        );
    }
  }

  const getRoleColor = () => {
      switch(selectedRole) {
          case UserRole.OWNER: return 'text-blue-500 border-blue-500 shadow-blue-900/50 bg-blue-600';
          case UserRole.REFEREE: return 'text-red-500 border-red-500 shadow-red-900/50 bg-red-600';
          case UserRole.GOALKEEPER: return 'text-green-500 border-green-500 shadow-green-900/50 bg-green-600';
          default: return 'text-[#FFFF00] border-[#FFFF00] shadow-yellow-900/50 bg-[#FFFF00] text-black';
      }
  };

  const getColorHex = () => {
    switch(selectedRole) {
        case UserRole.OWNER: return '#3b82f6';
        case UserRole.REFEREE: return '#ef4444';
        case UserRole.GOALKEEPER: return '#22c55e';
        default: return '#FFFF00';
    }
  };

  // Step 2: Verification / Form
  if (step === 2) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0A0E14] relative overflow-hidden">
         {/* Background Grid */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

         <div className="w-full max-w-md bg-[#161B22]/90 backdrop-blur-xl rounded-[40px] border border-white/10 p-8 relative animate-in zoom-in duration-300 shadow-2xl z-10">
            
            {/* Header / Back */}
            <div className="flex justify-between items-center mb-8">
                <button onClick={handleBack} className="p-2.5 bg-[#0A0E14] rounded-full text-white border border-white/5 hover:border-white/20 transition-colors">
                   <ArrowLeft size={18} />
                </button>
                <div className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-[#0A0E14] border ${getRoleColor().split(' ')[1]} ${getRoleColor().split(' ')[0]}`}>
                    {selectedRole} ID
                </div>
            </div>
            
            <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto bg-[#0A0E14] rounded-2xl flex items-center justify-center border border-white/5 mb-4 shadow-inner relative overflow-hidden">
                     {isVerifying ? (
                         <div className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center">
                             <Fingerprint size={40} className={`animate-pulse ${getRoleColor().split(' ')[0]}`} />
                             <div className="absolute top-0 w-full h-1 bg-white/50 animate-[scan_1.5s_linear_infinite]"></div>
                         </div>
                     ) : (
                         <User size={32} className="text-gray-400" />
                     )}
                </div>
                <h2 className="text-2xl font-black text-white">Kimlik Doğrulama</h2>
                <p className="text-gray-400 text-xs mt-1">Sisteme giriş için bilgilerinizi tamamlayın.</p>
            </div>

            {renderFormContent()}

            <button 
               onClick={handleComplete}
               disabled={isVerifying}
               className={`w-full h-16 mt-8 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 relative overflow-hidden
               ${isVerifying ? 'bg-gray-800 text-gray-500' : getRoleColor().split(' ').pop() === 'text-black' ? 'bg-[#FFFF00] text-black shadow-yellow-900/30' : getRoleColor().split(' ').pop()}`}
            >
               {isVerifying ? (
                   <>DOĞRULANIYOR...</>
               ) : (
                   <>
                       GİRİŞ YAP <ScanLine size={20} />
                   </>
               )}
            </button>
         </div>
      </div>
    );
  }

  // Step 1: Selection
  return (
    <div className="min-h-screen flex flex-col p-6 bg-[#0A0E14] relative overflow-hidden">
      
      <HocaWidget context="ONBOARDING" />

      {/* Header */}
      <div className="pt-8 pb-6 z-10">
          <button 
            onClick={onBack} 
            className="w-11 h-11 flex items-center justify-center bg-[#161B22] border border-white/5 rounded-full text-white hover:bg-white/10 transition-colors mb-6"
          >
              <ArrowLeft size={20} />
          </button>
          <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
              KİMLİK<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-700">SEÇİMİ</span>
          </h1>
          <p className="text-gray-400 text-sm font-medium">Sistemdeki rolünüzü belirleyin.</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 w-full max-w-lg mx-auto z-10 pb-20">
        <RoleCard 
          title="OYUNCU" 
          subtitle="Takım kur, maç yap, yüksel." 
          icon={<Trophy size={28} />} 
          colorClass="text-[#FFFF00]"
          delay="delay-100"
          onClick={() => handleCardClick(UserRole.PLAYER)}
        />
        <RoleCard 
          title="KALECİ" 
          subtitle="Karanlık kalelerin aydınlık yüzü." 
          icon={<Shield size={28} />} 
          colorClass="text-green-400"
          delay="delay-200"
          onClick={() => handleCardClick(UserRole.GOALKEEPER)}
        />
        <RoleCard 
          title="HAKEM" 
          subtitle="Otorite sensin. Adaleti sağla." 
          icon={<Scale size={28} />} 
          colorClass="text-red-400"
          delay="delay-300"
          onClick={() => handleCardClick(UserRole.REFEREE)}
        />
        <RoleCard 
          title="TESİS YÖNETİMİ" 
          subtitle="İşletmeni dijital çağa taşı." 
          icon={<Building2 size={28} />} 
          colorClass="text-blue-400"
          delay="delay-400"
          onClick={() => handleCardClick(UserRole.OWNER)}
        />
      </div>

      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-blue-900/20 to-transparent rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-[#FFFF00]/10 to-transparent rounded-full blur-[100px] pointer-events-none"></div>

    </div>
  );
};

export default RoleSelection;
