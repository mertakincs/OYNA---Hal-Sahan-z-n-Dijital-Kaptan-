
import React, { useState } from 'react';
import { UserRole, AppView, JobListing } from '../types';
import { ArrowLeft, MapPin, Navigation, Star, DollarSign, Calendar, Shield, Scale, Power, Bell, Wallet, List, User, Check, X, ChevronRight, Clock, Trophy, Search, MessageSquare, Send, ArrowRight } from 'lucide-react';
import { UPCOMING_JOBS, OPEN_JOBS, WALLET_HISTORY } from '../constants';

interface ServiceDashboardProps {
  role: UserRole;
  onBack: () => void;
  onNavigate: (view: AppView) => void;
}

type Tab = 'JOBS' | 'WALLET' | 'PROFILE';

const ServiceDashboard: React.FC<ServiceDashboardProps> = ({ role, onBack, onNavigate }) => {
  const isRef = role === UserRole.REFEREE;
  const [activeTab, setActiveTab] = useState<Tab>('JOBS');
  const [isAvailable, setIsAvailable] = useState(true);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [bidNote, setBidNote] = useState('');
  const [showBidSuccess, setShowBidSuccess] = useState(false);

  // Theme configuration based on role
  const theme = isRef 
    ? { primary: 'text-red-500', bg: 'bg-red-500', border: 'border-red-500', gradient: 'from-red-900 to-[#161B22]', shadow: 'shadow-red-900/20' }
    : { primary: 'text-green-500', bg: 'bg-green-500', border: 'border-green-500', gradient: 'from-green-900 to-[#161B22]', shadow: 'shadow-green-900/20' };

  const handleOpenBid = (job: JobListing) => {
      setSelectedJob(job);
      setBidAmount(job.offeredFee); // Default to captain's offer
      setBidNote('');
  };

  const submitBid = () => {
      // Simulate API call
      setTimeout(() => {
          setShowBidSuccess(true);
          setTimeout(() => {
              setShowBidSuccess(false);
              setSelectedJob(null);
          }, 2000);
      }, 1000);
  };

  // --- SUB-VIEWS ---

  const JobFeedView = () => (
      <div className="space-y-4">
          {/* Availability Toggle */}
          <div className={`bg-[#161B22] p-4 rounded-[24px] border border-white/5 flex items-center justify-between sticky top-0 z-10 transition-colors ${isAvailable ? 'border-green-500/30' : 'opacity-80'}`}>
             <div className="flex items-center gap-3">
                 <div className={`p-2 rounded-full relative transition-colors ${isAvailable ? theme.bg : 'bg-gray-700'} text-white`}>
                     <Power size={20} />
                     {isAvailable && <div className="absolute inset-0 rounded-full animate-ping opacity-50 bg-white"></div>}
                 </div>
                 <div>
                     <p className="font-bold text-white text-sm">{isAvailable ? 'İşlere Açıksın' : 'Çevrimdışı'}</p>
                     <p className="text-[10px] text-gray-500">{isAvailable ? 'Haritada görünüyorsun.' : 'Gizli moddasın.'}</p>
                 </div>
             </div>
             <button 
                onClick={() => setIsAvailable(!isAvailable)}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${isAvailable ? theme.bg : 'bg-gray-700'}`}
             >
                 <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${isAvailable ? 'translate-x-6' : 'translate-x-0'}`}></div>
             </button>
         </div>

         <div className="flex items-center justify-between px-2">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
                YAKINDAKİ MAÇLAR <span className="bg-[#FFFF00] text-black text-[10px] px-1.5 py-0.5 rounded-full">{OPEN_JOBS.length}</span>
            </h3>
            <button className="text-[10px] text-blue-400 font-bold flex items-center gap-1">
                <MapPin size={12} /> Haritada Gör
            </button>
         </div>

         {/* Job Cards */}
         {OPEN_JOBS.map(job => (
             <div key={job.id} className="bg-[#161B22] border border-white/5 rounded-[32px] p-5 relative overflow-hidden active:scale-[0.98] transition-transform">
                 <div className="absolute top-0 right-0 px-3 py-1 bg-white/5 text-gray-400 text-[10px] font-bold rounded-bl-2xl border-b border-l border-white/5">
                     {job.distance}
                 </div>
                 
                 <div className="flex items-start gap-4 mb-4">
                     <div className={`w-12 h-12 rounded-2xl ${isRef ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'} flex items-center justify-center`}>
                         {isRef ? <Scale size={24} /> : <Shield size={24} />}
                     </div>
                     <div>
                         <h4 className="font-black text-white text-lg">{job.pitchName}</h4>
                         <p className="text-gray-400 text-xs">{job.location}</p>
                         <div className="flex items-center gap-2 mt-2">
                             <span className="text-[10px] bg-white/5 text-white px-2 py-0.5 rounded font-bold">{job.date}</span>
                             <span className="text-[10px] bg-white/5 text-white px-2 py-0.5 rounded font-bold">{job.time}</span>
                         </div>
                     </div>
                 </div>

                 <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
                     <div>
                         <p className="text-[10px] text-gray-500 font-bold uppercase">Tahmini Ücret</p>
                         <p className="text-xl font-black text-[#FFFF00]">{job.offeredFee}₺</p>
                     </div>
                     <button 
                        onClick={() => handleOpenBid(job)}
                        className={`px-6 py-3 rounded-xl font-black text-xs text-white shadow-lg transition-colors flex items-center gap-2 ${isRef ? 'bg-blue-600 hover:bg-blue-500' : 'bg-indigo-600 hover:bg-indigo-500'}`}
                     >
                        TEKLİF YAP <ArrowRight size={14} />
                     </button>
                 </div>
             </div>
         ))}
      </div>
  );

  const WalletView = () => (
      <div className="space-y-6">
          {/* Main Card */}
          <div className="bg-gradient-to-br from-gray-800 to-[#161B22] p-6 rounded-[32px] border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5"><Wallet size={120} /></div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Toplam Kazanç</p>
              <h2 className="text-4xl font-black text-white mt-2">4.250₺</h2>
              
              <div className="mt-6 flex gap-4">
                  <div className="flex-1">
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Çekilebilir</p>
                      <p className="text-xl font-bold text-green-400">3.450₺</p>
                  </div>
                  <div className="flex-1 border-l border-white/10 pl-4">
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Bekleyen</p>
                      <p className="text-xl font-bold text-gray-300">800₺</p>
                  </div>
              </div>

              <button className="w-full mt-6 py-3 bg-[#34C759] hover:bg-[#2dbb4f] text-white rounded-2xl font-black text-sm shadow-lg shadow-green-900/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                  <Wallet size={18} /> HEMEN AKTAR
              </button>
          </div>

          {/* History */}
          <section>
              <h3 className="font-bold text-white text-sm px-2 mb-3">İŞLEM GEÇMİŞİ</h3>
              <div className="space-y-3">
                  {WALLET_HISTORY.map((tx) => (
                      <div key={tx.id} className="bg-[#161B22] border border-white/5 p-4 rounded-2xl flex items-center justify-between">
                          <div>
                              <p className="font-bold text-sm text-white">{tx.description}</p>
                              <p className="text-[10px] text-gray-500">{tx.date} • Komisyon: -{tx.commission}₺</p>
                          </div>
                          <div className={`text-right ${tx.amount > 0 ? 'text-white' : 'text-red-400'}`}>
                              <p className="font-black text-sm">{tx.amount > 0 ? '+' : ''}{tx.amount}₺</p>
                              <p className={`text-[9px] font-bold ${tx.status === 'CLEARED' ? 'text-green-500' : 'text-yellow-500'}`}>
                                  {tx.status === 'CLEARED' ? 'Onaylandı' : 'Bekliyor'}
                              </p>
                          </div>
                      </div>
                  ))}
              </div>
          </section>
      </div>
  );

  const ProfileView = () => (
      <div className="space-y-4">
          <button 
              onClick={() => onNavigate('SETTINGS')}
              className="w-full bg-[#161B22] p-4 rounded-2xl border border-white/5 flex justify-between items-center mb-4"
          >
              <span className="font-bold text-white">Global Ayarlar</span>
              <ChevronRight size={20} className="text-gray-500" />
          </button>
          
          <div className="bg-[#161B22] p-6 rounded-[32px] border border-white/5 text-center">
              <div className="w-24 h-24 bg-gray-800 rounded-full mx-auto mb-4 overflow-hidden border-4 border-[#0A0E14]">
                   <img src={isRef ? "https://i.pravatar.cc/150?u=ref1" : "https://i.pravatar.cc/150?u=gk1"} className="w-full h-full object-cover" alt="Profile" />
              </div>
              <h2 className="text-2xl font-black text-white">Ahmet Yılmaz</h2>
              <p className="text-sm text-gray-400 mb-6">{isRef ? 'TFF Lisanslı Hakem' : 'Profesyonel Kaleci'}</p>
              
              <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="bg-[#0A0E14] p-3 rounded-xl">
                      <p className="text-[10px] text-gray-500 uppercase font-bold">{isRef ? 'Lisans' : 'Boy'}</p>
                      <p className="font-bold text-white">{isRef ? 'Bölgesel' : '1.88m'}</p>
                  </div>
                  <div className="bg-[#0A0E14] p-3 rounded-xl">
                      <p className="text-[10px] text-gray-500 uppercase font-bold">{isRef ? 'Dakiklik' : 'Refleks'}</p>
                      <p className="font-bold text-white">{isRef ? '%98' : '9/10'}</p>
                  </div>
              </div>
          </div>
      </div>
  );

  const getTitle = () => {
      switch(activeTab) {
          case 'JOBS': return 'Maç Bul';
          case 'WALLET': return 'Cüzdan';
          case 'PROFILE': return 'Profil';
      }
  };

  return (
    <div className="min-h-screen flex flex-col pb-24 bg-[#0A0E14] relative">
      {/* Header */}
      <header className="p-6 flex justify-between items-center bg-[#0A0E14] sticky top-0 z-20 border-b border-white/5">
         <div className="flex items-center gap-3">
             <button onClick={onBack} className="p-2 bg-[#161B22] rounded-full text-white hover:bg-gray-800 transition-colors border border-white/5">
                 <ArrowLeft size={20} />
             </button>
             <div className={`w-10 h-10 rounded-full ${theme.bg} flex items-center justify-center text-white shadow-lg`}>
                 <img src={isRef ? "https://i.pravatar.cc/150?u=ref1" : "https://i.pravatar.cc/150?u=gk1"} className="w-full h-full rounded-full object-cover opacity-90" alt="Profile" />
             </div>
             <div>
                 <h1 className="font-black text-white text-lg leading-none">{isRef ? 'HAKEM' : 'KALECİ'}</h1>
                 <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-1">{getTitle()}</p>
             </div>
         </div>
         {activeTab !== 'PROFILE' && (
             <div className="flex gap-3">
                 <button className="p-2 bg-[#161B22] rounded-full text-gray-400 border border-white/5 relative">
                     <Bell size={20} />
                     <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-yellow-500 rounded-full animate-pulse"></span>
                 </button>
             </div>
         )}
      </header>

      <main className="p-6 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
         {activeTab === 'JOBS' && <JobFeedView />}
         {activeTab === 'WALLET' && <WalletView />}
         {activeTab === 'PROFILE' && <ProfileView />}
      </main>

      {/* Service Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-[#0A0E14]/90 backdrop-blur-xl border-t border-white/5 pb-6 pt-4 px-6 flex justify-between items-center z-30">
         <button 
            onClick={() => setActiveTab('JOBS')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'JOBS' ? theme.primary : 'text-gray-500'}`}
         >
            <Search size={22} />
            <span className="text-[10px] font-bold">Maç Bul</span>
         </button>

         <div className="relative -top-5">
             <button 
                onClick={() => setActiveTab('JOBS')}
                className={`${theme.bg} text-white p-4 rounded-full ${theme.shadow} hover:scale-105 transition-transform border-[6px] border-[#0A0E14]`}
             >
                 {isRef ? <Scale size={24} /> : <Shield size={24} />}
             </button>
         </div>

         <button 
            onClick={() => setActiveTab('WALLET')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'WALLET' ? 'text-green-500' : 'text-gray-500'}`}
         >
            <Wallet size={22} />
            <span className="text-[10px] font-bold">Cüzdan</span>
         </button>
      </nav>

      {/* BID MODAL */}
      {selectedJob && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center animate-in fade-in duration-200">
              <div className="bg-[#161B22] w-full max-w-md rounded-t-[32px] sm:rounded-[32px] border-t sm:border border-white/10 p-6 shadow-2xl relative animate-in slide-in-from-bottom duration-300">
                   {showBidSuccess ? (
                       <div className="py-12 flex flex-col items-center text-center">
                           <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.4)]">
                               <Check size={40} className="text-white" />
                           </div>
                           <h3 className="text-2xl font-black text-white">TEKLİF GÖNDERİLDİ!</h3>
                           <p className="text-gray-400 mt-2">Kaptan onayladığında bildirim alacaksın.</p>
                       </div>
                   ) : (
                       <>
                           <button 
                            onClick={() => setSelectedJob(null)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white"
                           >
                               <X size={20} />
                           </button>

                           <div className="text-center mb-6">
                               <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">{selectedJob.type === 'REF' ? 'HAKEMLİK' : 'KALECİLİK'} TEKLİFİ</p>
                               <h3 className="text-xl font-black text-white">{selectedJob.pitchName}</h3>
                               <p className="text-gray-400 text-sm mt-1">{selectedJob.date}, {selectedJob.time}</p>
                           </div>

                           <div className="space-y-4">
                               <div className="bg-[#0A0E14] p-4 rounded-2xl border border-white/5">
                                   <label className="text-xs text-gray-500 font-bold uppercase block mb-2">Teklif Ettiğin Ücret</label>
                                   <div className="flex items-center gap-2">
                                       <span className="text-2xl font-black text-[#FFFF00]">₺</span>
                                       <input 
                                        type="number" 
                                        value={bidAmount} 
                                        onChange={(e) => setBidAmount(parseInt(e.target.value) || 0)}
                                        className="bg-transparent text-3xl font-black text-white outline-none w-full" 
                                       />
                                   </div>
                               </div>

                               <div className="bg-[#0A0E14] p-4 rounded-2xl border border-white/5">
                                   <label className="text-xs text-gray-500 font-bold uppercase block mb-2">Kaptana Notun</label>
                                   <textarea 
                                    rows={3}
                                    value={bidNote}
                                    onChange={(e) => setBidNote(e.target.value)}
                                    placeholder="Örn: TFF Lisanslıyım, vaktinde orada olurum."
                                    className="bg-transparent text-sm text-white outline-none w-full resize-none placeholder:text-gray-600" 
                                   />
                               </div>

                               <button 
                                onClick={submitBid}
                                className="w-full py-4 bg-[#FFFF00] text-black font-black text-lg rounded-2xl hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-900/20"
                               >
                                   TEKLİFİ GÖNDER
                               </button>
                           </div>
                       </>
                   )}
              </div>
          </div>
      )}
    </div>
  );
};

export default ServiceDashboard;
