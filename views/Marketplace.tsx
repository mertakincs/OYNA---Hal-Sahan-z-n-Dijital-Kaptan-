
import React, { useState, useEffect } from 'react';
import { ChevronLeft, X, Search, Star, Award, Shield, Scale, Check, Activity, MapPin, User, SlidersHorizontal, Zap, Hand, Gavel, Handshake, Eye } from 'lucide-react';
import { REFEREES, GOALKEEPERS } from '../constants';
import { Referee, Goalkeeper } from '../types';
import HocaWidget, { HocaContext } from '../HocaWidget';

interface MarketplaceProps {
  type: 'REF' | 'GK';
  onBack: () => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ type: initialType, onBack }) => {
  const [activeTab, setActiveTab] = useState<'GK' | 'REF'>(initialType);
  const [selectedProfile, setSelectedProfile] = useState<Referee | Goalkeeper | null>(null);
  const [modalType, setModalType] = useState<'OFFER' | 'INSPECT'>('INSPECT');
  const [showToast, setShowToast] = useState(false);
  const [hocaContext, setHocaContext] = useState<HocaContext>('IDLE');
  const [hocaMessage, setHocaMessage] = useState<string>('');

  // Hoca Logic on Tab Change
  useEffect(() => {
    if (activeTab === 'GK') {
        // Example logic: if list was empty (simulated)
        // setHocaMessage("Kalede kova istemiyorsan hemen bir ilan aç, panterler pusuda bekliyor!");
        // setHocaContext('HIRE_GK_LOW'); // Or a generic advice context
    } else {
        setHocaMessage("Bu hakem kartını çok kullanır, takımı uyar, sakin kalsınlar!");
        setHocaContext('HIRE_REF_START');
    }
    // Simple reset to re-trigger animation if needed, but HocaWidget handles prop changes
  }, [activeTab]);

  const isReferee = (profile: Referee | Goalkeeper): profile is Referee => {
      return (profile as Referee).level !== undefined;
  };

  const handleAction = (action: 'HIRE' | 'OFFER' | 'INSPECT', profile: Referee | Goalkeeper) => {
      if (action === 'HIRE') {
          // Trigger Haptic Feedback (Vibration)
          if (navigator.vibrate) navigator.vibrate(50);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
      } else if (action === 'OFFER') {
          setSelectedProfile(profile);
          setModalType('OFFER');
      } else {
          setSelectedProfile(profile);
          setModalType('INSPECT');
      }
  };

  const chips = ['Fiyata Göre', 'Reytinge Göre', 'En Yakın', 'Müsaitlik'];

  return (
    <div className="min-h-screen bg-[#0A0E14] relative flex flex-col">
      
      {/* Hoca Integration */}
      <HocaWidget context={hocaContext} customMessage={hocaMessage} />

      {/* 1. Navigation & Header */}
      <header className="px-6 pt-6 pb-2 flex justify-between items-center bg-[#0A0E14] sticky top-0 z-30">
        <button 
            onClick={onBack} 
            className="w-11 h-11 flex items-center justify-center bg-[#161B22] rounded-full border border-white/5 text-white hover:bg-white/10 active:scale-95 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        
        <h1 className="text-xl font-black tracking-wide text-white">Yetenek Merkezi</h1>
        
        <button 
            onClick={onBack}
            className="w-11 h-11 flex items-center justify-center bg-[#161B22] rounded-full border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
        >
          <X size={24} />
        </button>
      </header>

      {/* 2. Segment Control */}
      <div className="px-6 py-4 sticky top-20 z-20 bg-[#0A0E14]/90 backdrop-blur-sm">
          <div className="bg-[#161B22] p-1.5 rounded-full flex relative border border-white/5">
              {/* Sliding Background */}
              <div 
                className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-[#FFFF00] rounded-full shadow-[0_0_15px_rgba(255,255,0,0.3)] transition-all duration-300 ease-out ${activeTab === 'REF' ? 'translate-x-[calc(100%+6px)]' : 'translate-x-0'}`}
              ></div>
              
              <button 
                onClick={() => setActiveTab('GK')}
                className={`flex-1 py-3 text-sm font-black rounded-full relative z-10 transition-colors duration-300 flex items-center justify-center gap-2 ${activeTab === 'GK' ? 'text-black' : 'text-gray-400 hover:text-white'}`}
              >
                 <Shield size={16} /> Kaleciler
              </button>
              <button 
                onClick={() => setActiveTab('REF')}
                className={`flex-1 py-3 text-sm font-black rounded-full relative z-10 transition-colors duration-300 flex items-center justify-center gap-2 ${activeTab === 'REF' ? 'text-black' : 'text-gray-400 hover:text-white'}`}
              >
                 <Scale size={16} /> Hakemler
              </button>
          </div>
      </div>

      {/* Filter Chips */}
      <div className="px-6 pb-4 overflow-x-auto custom-scrollbar flex gap-2">
          <button className="bg-[#161B22] border border-white/10 p-2 rounded-xl text-white">
              <SlidersHorizontal size={16} />
          </button>
          {chips.map((chip, i) => (
              <button key={i} className="px-4 py-2 bg-[#161B22] border border-white/5 rounded-xl text-xs font-bold text-gray-400 whitespace-nowrap hover:bg-white/5 hover:text-white transition-colors">
                  {chip}
              </button>
          ))}
      </div>

      {/* 3. List View */}
      <div className="flex-1 px-6 pb-24 space-y-4 overflow-y-auto custom-scrollbar">
         {activeTab === 'GK' ? (
             // --- GOALKEEPERS LIST ---
             GOALKEEPERS.map(gk => (
                <div key={gk.id} className="bg-[#161B22] border border-gray-800 rounded-[32px] p-5 relative overflow-hidden group hover:border-[#FFFF00]/20 transition-all">
                    <div className="flex gap-4">
                        <div className="relative shrink-0">
                            <img src={gk.avatar} className="w-20 h-24 rounded-2xl object-cover bg-gray-700" alt={gk.name} />
                            <div className="absolute -bottom-2 -right-2 bg-[#FFFF00] text-black font-black text-xs px-2 py-1 rounded-lg shadow-lg flex items-center gap-1">
                                <Star size={10} fill="black" /> {gk.rating}
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                             <div className="flex justify-between items-start">
                                 <h3 className="text-lg font-black text-white truncate">{gk.name}</h3>
                                 <span className="text-xl font-black text-green-400">{gk.fee}₺</span>
                             </div>
                             
                             {/* Badges */}
                             <div className="flex flex-wrap gap-2 mt-2 mb-3">
                                 <span className="text-[10px] bg-green-900/30 text-green-400 px-2 py-1 rounded-lg font-bold border border-green-500/20">
                                     {gk.style}
                                 </span>
                                 <span className="text-[10px] bg-white/5 text-gray-400 px-2 py-1 rounded-lg font-bold">
                                     {gk.height}
                                 </span>
                             </div>

                             {/* Action Buttons */}
                             <div className="flex gap-2">
                                 <button 
                                    onClick={() => handleAction('HIRE', gk)}
                                    className="flex-1 py-2 bg-[#FFFF00] rounded-xl text-xs font-black text-black hover:bg-yellow-300 active:scale-95 transition-transform"
                                 >
                                     Hemen Kirala
                                 </button>
                                 <button 
                                    onClick={() => handleAction('OFFER', gk)}
                                    className="px-3 py-2 bg-white/5 rounded-xl text-white hover:bg-white/10 active:scale-95 transition-transform"
                                 >
                                     <Handshake size={16} />
                                 </button>
                                 <button 
                                    onClick={() => handleAction('INSPECT', gk)}
                                    className="px-3 py-2 bg-white/5 rounded-xl text-white hover:bg-white/10 active:scale-95 transition-transform"
                                 >
                                     <Eye size={16} />
                                 </button>
                             </div>
                        </div>
                    </div>
                </div>
             ))
         ) : (
             // --- REFEREES LIST ---
             REFEREES.map(ref => (
                <div key={ref.id} className="bg-[#161B22] border border-gray-800 rounded-[32px] p-5 relative overflow-hidden group hover:border-blue-500/30 transition-all">
                    {/* Background Badge for Context */}
                    <div className="absolute top-0 right-0 px-3 py-1 bg-blue-500/10 text-blue-400 text-[9px] font-black uppercase rounded-bl-2xl border-b border-l border-blue-500/20">
                        {ref.level}
                    </div>

                    <div className="flex gap-4 mt-2">
                        <div className="relative shrink-0">
                            <img src={ref.avatar} className="w-20 h-24 rounded-2xl object-cover bg-gray-700" alt={ref.name} />
                        </div>
                        <div className="flex-1 min-w-0">
                             <div className="flex justify-between items-start">
                                 <h3 className="text-lg font-black text-white truncate">{ref.name}</h3>
                                 <span className="text-xl font-black text-blue-400">{ref.fee}₺</span>
                             </div>

                             <div className="flex items-center gap-2 mt-2 mb-4">
                                 <div className="flex flex-col">
                                     <span className="text-[9px] text-gray-500 uppercase font-bold">Yönetim</span>
                                     <span className="text-xs font-bold text-white">{ref.style}</span>
                                 </div>
                                 <div className="w-px h-6 bg-white/10 mx-2"></div>
                                 <div className="flex flex-col">
                                     <span className="text-[9px] text-gray-500 uppercase font-bold">Maç</span>
                                     <span className="text-xs font-bold text-white">{ref.matchCount}</span>
                                 </div>
                             </div>

                             {/* Action Buttons */}
                             <div className="flex gap-2">
                                 <button 
                                    onClick={() => handleAction('HIRE', ref)}
                                    className="flex-1 py-2 bg-blue-600 rounded-xl text-xs font-black text-white hover:bg-blue-500 active:scale-95 transition-transform flex items-center justify-center gap-1"
                                 >
                                     <Gavel size={14} /> Düdük Çal
                                 </button>
                                 <button 
                                    onClick={() => handleAction('OFFER', ref)}
                                    className="px-3 py-2 bg-white/5 rounded-xl text-white hover:bg-white/10 active:scale-95 transition-transform"
                                 >
                                     <Handshake size={16} />
                                 </button>
                                 <button 
                                    onClick={() => handleAction('INSPECT', ref)}
                                    className="px-3 py-2 bg-white/5 rounded-xl text-white hover:bg-white/10 active:scale-95 transition-transform flex items-center gap-1 text-[10px] font-bold"
                                 >
                                     <Activity size={14} /> Analiz
                                 </button>
                             </div>
                        </div>
                    </div>
                </div>
             ))
         )}
      </div>

      {/* FEEDBACK TOAST */}
      {showToast && (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-in zoom-in fade-in duration-300">
              <div className="bg-[#FFFF00] text-black px-6 py-4 rounded-2xl shadow-[0_0_40px_rgba(255,255,0,0.5)] flex flex-col items-center">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-2">
                      <Check size={24} className="text-[#FFFF00]" />
                  </div>
                  <h3 className="font-black text-lg">TEKLİF İLETİLDİ ⏳</h3>
                  <p className="text-xs font-bold opacity-70">Onay bekleniyor...</p>
              </div>
          </div>
      )}

      {/* MODAL (Inspect or Offer) */}
      {selectedProfile && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center animate-in fade-in duration-200">
              <div className="bg-[#161B22] w-full max-w-md h-[85vh] sm:h-auto rounded-t-[32px] sm:rounded-[32px] border-t sm:border border-white/10 p-0 shadow-2xl relative animate-in slide-in-from-bottom duration-300 flex flex-col">
                   {/* Modal content can reuse the logic from previous Marketplace but streamlined for the prompt */}
                   <div className={`h-24 w-full rounded-t-[32px] relative flex items-start justify-end p-4 ${isReferee(selectedProfile) ? 'bg-blue-900/50' : 'bg-green-900/50'}`}>
                        <button 
                          onClick={() => setSelectedProfile(null)}
                          className="w-10 h-10 flex items-center justify-center bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 active:scale-95 transition-all"
                        >
                            <X size={20} />
                        </button>
                   </div>
                   
                   <div className="px-6 -mt-12 pb-8 flex-1 overflow-y-auto custom-scrollbar">
                       <div className="flex flex-col items-center mb-6">
                           <img src={selectedProfile.avatar} className="w-24 h-24 rounded-3xl border-4 border-[#161B22] shadow-xl object-cover" />
                           <h2 className="text-2xl font-black text-white mt-3">{selectedProfile.name}</h2>
                           {isReferee(selectedProfile) ? (
                               <span className="text-xs font-bold text-blue-400">{selectedProfile.level}</span>
                           ) : (
                               <span className="text-xs font-bold text-green-400">{selectedProfile.style}</span>
                           )}
                       </div>

                       {modalType === 'INSPECT' ? (
                           <div className="space-y-6">
                               <div className="bg-[#0A0E14] p-4 rounded-2xl border border-white/5">
                                   <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Hakkında</h3>
                                   <p className="text-sm text-gray-300 italic">"{selectedProfile.bio}"</p>
                               </div>
                               
                               <div className="grid grid-cols-3 gap-3">
                                   {/* Mock Stats Display based on type */}
                                   <div className="bg-[#0A0E14] p-3 rounded-xl text-center">
                                       <div className="text-xl font-black text-white">4.8</div>
                                       <div className="text-[9px] text-gray-500 uppercase font-bold">Puan</div>
                                   </div>
                                   <div className="bg-[#0A0E14] p-3 rounded-xl text-center">
                                       <div className="text-xl font-black text-white">{isReferee(selectedProfile) ? selectedProfile.matchCount : '24'}</div>
                                       <div className="text-[9px] text-gray-500 uppercase font-bold">Maç</div>
                                   </div>
                                   <div className="bg-[#0A0E14] p-3 rounded-xl text-center">
                                       <div className="text-xl font-black text-white">%95</div>
                                       <div className="text-[9px] text-gray-500 uppercase font-bold">Güven</div>
                                   </div>
                               </div>

                               <button 
                                 onClick={() => { setModalType('OFFER'); }}
                                 className="w-full py-4 bg-[#FFFF00] text-black font-black text-lg rounded-2xl hover:bg-yellow-300 active:scale-95 transition-all"
                               >
                                   KİRALA ({selectedProfile.fee}₺)
                               </button>
                           </div>
                       ) : (
                           <div className="space-y-6">
                               <div className="bg-[#0A0E14] p-6 rounded-2xl border border-white/5 text-center">
                                   <p className="text-xs font-bold text-gray-500 uppercase mb-2">Mevcut Ücret</p>
                                   <p className="text-4xl font-black text-white mb-6">{selectedProfile.fee}₺</p>
                                   
                                   <p className="text-xs font-bold text-gray-500 uppercase mb-2 text-left">Teklifin</p>
                                   <div className="flex items-center gap-2 border-b border-white/20 pb-2">
                                       <span className="text-2xl font-black text-[#FFFF00]">₺</span>
                                       <input type="number" className="bg-transparent text-2xl font-black text-white w-full outline-none" placeholder={selectedProfile.fee.toString()} />
                                   </div>
                               </div>
                               <button 
                                 onClick={() => { setSelectedProfile(null); handleAction('HIRE', selectedProfile); }}
                                 className="w-full py-4 bg-blue-600 text-white font-black text-lg rounded-2xl hover:bg-blue-500 active:scale-95 transition-all"
                               >
                                   TEKLİFİ GÖNDER
                               </button>
                           </div>
                       )}
                   </div>
              </div>
          </div>
      )}

    </div>
  );
};

export default Marketplace;
