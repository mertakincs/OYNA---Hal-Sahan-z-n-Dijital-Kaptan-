
import React, { useState } from 'react';
import { ArrowLeft, Wallet, TrendingUp, Calendar, AlertCircle, Settings, MessageSquare, Clock, XCircle, Home, PieChart as PieChartIcon, ArrowUpRight, ArrowDownRight, Users, Star, BarChart3, ScanLine, Camera, ToggleLeft, ToggleRight, Check } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, BarChart, Bar, YAxis, CartesianGrid } from 'recharts';
import { OWNER_TRANSACTIONS, OWNER_REVIEWS, OWNER_INSIGHTS, PITCHES } from '../constants';

interface OwnerPanelProps {
  onBack: () => void;
  onNavigate: (view: any) => void;
}

const scheduleData = [
  { time: '18:00 - 19:00', status: 'PAID', team: 'Yıldızlar FC vs Çelikspor' },
  { time: '19:00 - 20:00', status: 'DEPOSIT', team: 'Akıncılar vs Fırtına' },
  { time: '20:00 - 21:00', status: 'EMPTY', team: '-' },
  { time: '21:00 - 22:00', status: 'PAID', team: 'Kartallar vs Şahinler' },
];

const occupancyData = [
  { name: 'Dolu', value: 75, color: '#3b82f6' },
  { name: 'Boş', value: 25, color: '#1f2937' },
];

// Mock Revenue Data
const revenueData = [
  { name: 'Pzt', booking: 2400, addon: 400 },
  { name: 'Sal', booking: 1800, addon: 300 },
  { name: 'Çar', booking: 3200, addon: 600 },
  { name: 'Per', booking: 2800, addon: 500 },
  { name: 'Cum', booking: 4500, addon: 900 },
  { name: 'Cmt', booking: 5200, addon: 1200 },
  { name: 'Paz', booking: 4800, addon: 1000 },
];

type OwnerTab = 'MANAGEMENT' | 'FINANCE' | 'HOME' | 'REVIEWS' | 'PROFILE';

const OwnerPanel: React.FC<OwnerPanelProps> = ({ onBack, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<OwnerTab>('HOME');
  const [loyaltyActive, setLoyaltyActive] = useState(true);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  // --- SUB-COMPONENTS ---

  const HomeView = () => (
      <div className="space-y-6">
          {/* Quick Stats */}
          <div className="flex gap-4 h-48">
            <div className="flex-1 bg-[#161B22] border border-white/5 rounded-[32px] p-4 relative flex flex-col items-center justify-center">
                <h3 className="absolute top-4 left-4 text-[10px] font-bold text-gray-400 uppercase">Anlık Doluluk</h3>
                <div className="w-full h-32 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={occupancyData} innerRadius={35} outerRadius={45} paddingAngle={5} dataKey="value" stroke="none">
                                {occupancyData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                         <span className="text-xl font-black text-white">%75</span>
                    </div>
                </div>
            </div>
            <div className="flex-1 bg-gradient-to-br from-blue-900 to-[#161B22] border border-blue-500/20 rounded-[32px] p-5 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Wallet size={64} /></div>
                <div>
                    <h3 className="text-[10px] font-bold text-blue-300 uppercase">Bugünkü Ciro</h3>
                    <p className="text-2xl font-black text-white mt-1">12.450₺</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-green-400 font-bold bg-green-900/20 w-fit px-2 py-1 rounded-lg">
                    <TrendingUp size={12} /> +12% vs Dün
                </div>
            </div>
        </div>

        {/* AI Insights */}
        <section>
             <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                 <Users size={16} className="text-indigo-400" /> İŞLETME ZEKASI (AI)
             </h3>
             <div className="space-y-3">
                 {OWNER_INSIGHTS.map((insight) => (
                     <div key={insight.id} className="bg-[#161B22] border border-white/5 p-5 rounded-[24px] hover:border-indigo-500/30 transition-colors">
                         <div className="flex justify-between items-start mb-2">
                             <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase ${
                                 insight.type === 'PRICING' ? 'bg-green-500/10 text-green-400' :
                                 insight.type === 'INVESTMENT' ? 'bg-blue-500/10 text-blue-400' :
                                 'bg-yellow-500/10 text-yellow-400'
                             }`}>
                                 {insight.type === 'PRICING' ? 'Fiyatlandırma' : insight.type === 'INVESTMENT' ? 'Yatırım' : 'Stok'}
                             </span>
                             <span className="text-[10px] text-gray-500 font-bold">Etki: {insight.impact}</span>
                         </div>
                         <h4 className="font-bold text-white text-sm mb-1">{insight.title}</h4>
                         <p className="text-xs text-gray-400 leading-relaxed">{insight.description}</p>
                     </div>
                 ))}
             </div>
        </section>
      </div>
  );

  const FinanceView = () => (
      <div className="space-y-6">
          {/* Revenue Chart */}
          <div className="bg-[#161B22] p-5 rounded-[32px] border border-white/5">
              <div className="flex justify-between items-center mb-6">
                  <div>
                      <h3 className="text-sm font-bold text-white">Gelir Özeti</h3>
                      <p className="text-[10px] text-gray-500">Son 7 Günlük Ciro</p>
                  </div>
                  <div className="flex gap-2 text-[10px] font-bold">
                      <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div>Rezervasyon</div>
                      <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div>Ekipman</div>
                  </div>
              </div>
              <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueData} barSize={12}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#6b7280'}} />
                          <Tooltip contentStyle={{backgroundColor: '#0A0E14', border: '1px solid #333', borderRadius: '8px', color: '#fff'}} cursor={{fill: '#ffffff10'}} />
                          <Bar dataKey="booking" stackId="a" fill="#22c55e" radius={[0, 0, 4, 4]} />
                          <Bar dataKey="addon" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                  </ResponsiveContainer>
              </div>
          </div>

          {/* Wallet Actions */}
          <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#161B22] p-4 rounded-[24px] border border-white/5">
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Çekilebilir Bakiye</p>
                  <p className="text-2xl font-black text-white mt-1">14.250₺</p>
                  <button className="mt-3 w-full py-2 bg-green-600 hover:bg-green-500 text-white rounded-xl text-xs font-bold transition-colors">
                      Hemen Aktar
                  </button>
              </div>
              <div className="bg-[#161B22] p-4 rounded-[24px] border border-white/5 opacity-80">
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Bekleyen Bakiye</p>
                  <p className="text-2xl font-black text-gray-300 mt-1">3.080₺</p>
                  <p className="text-[9px] text-gray-500 mt-2">Maçlar tamamlanınca aktarılır.</p>
              </div>
          </div>

          {/* Transactions */}
          <section>
              <h3 className="font-bold text-white text-sm mb-3 px-2">İŞLEM GEÇMİŞİ</h3>
              <div className="space-y-2">
                  {OWNER_TRANSACTIONS.map((t) => (
                      <div key={t.id} className="bg-[#161B22] p-3 rounded-2xl flex items-center justify-between border border-white/5">
                          <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-xl ${t.type === 'BOOKING' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                  {t.type === 'BOOKING' ? <Calendar size={16} /> : <ScanLine size={16} />}
                              </div>
                              <div>
                                  <p className="text-xs font-bold text-white">{t.user}</p>
                                  <p className="text-[9px] text-gray-500">{t.date}</p>
                              </div>
                          </div>
                          <span className="font-black text-white text-sm">+{t.amount}₺</span>
                      </div>
                  ))}
              </div>
          </section>
      </div>
  );

  const ReviewsView = () => (
      <div className="space-y-6">
          {/* Scorecards */}
          <div className="grid grid-cols-3 gap-3">
               <div className="bg-[#161B22] p-3 rounded-2xl border border-red-500/30 flex flex-col items-center justify-center relative overflow-hidden">
                   <div className="absolute top-1 right-1"><AlertCircle size={10} className="text-red-500 animate-pulse" /></div>
                   <span className="text-2xl font-black text-white">3.2</span>
                   <span className="text-[9px] text-red-400 uppercase font-bold text-center">Işıklandırma</span>
               </div>
               <div className="bg-[#161B22] p-3 rounded-2xl border border-white/5 flex flex-col items-center justify-center">
                   <span className="text-2xl font-black text-white">4.8</span>
                   <span className="text-[9px] text-green-400 uppercase font-bold text-center">Çim</span>
               </div>
               <div className="bg-[#161B22] p-3 rounded-2xl border border-white/5 flex flex-col items-center justify-center">
                   <span className="text-2xl font-black text-white">4.5</span>
                   <span className="text-[9px] text-blue-400 uppercase font-bold text-center">Kale</span>
               </div>
          </div>

          {/* Review List */}
          <div className="space-y-4">
              {OWNER_REVIEWS.map(r => (
                  <div key={r.id} className="bg-[#161B22] border border-white/5 p-4 rounded-[24px]">
                      <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-[10px] font-bold">{r.user.charAt(0)}</div>
                              <span className="text-xs font-bold text-white">{r.user}</span>
                          </div>
                          <div className="flex items-center gap-1 bg-yellow-500/10 px-1.5 py-0.5 rounded text-yellow-500">
                              <Star size={10} fill="currentColor" /> <span className="text-[10px] font-bold">{r.rating}</span>
                          </div>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed mb-3">"{r.comment}"</p>
                      <div className="bg-[#0A0E14] p-2 rounded-xl border border-white/5 flex items-center gap-2">
                          <input type="text" placeholder="Tesis Yanıtı yaz..." className="bg-transparent w-full text-[10px] text-white outline-none" />
                          <button className="text-[10px] font-bold text-blue-500 uppercase">Gönder</button>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );

  const ManagementView = () => (
      <div className="space-y-4">
          <section>
              <div className="flex justify-between items-center px-2 mb-3">
                  <h3 className="font-bold text-white text-sm">GÜNLÜK AKIŞ</h3>
                  <button className="text-[10px] text-blue-400 font-bold bg-blue-400/10 px-3 py-1 rounded-full">Tümünü Gör</button>
              </div>
              <div className="space-y-2">
                  {scheduleData.map((slot, i) => (
                      <div key={i} className="bg-[#161B22] border border-white/5 p-4 rounded-2xl flex items-center justify-between">
                          <div className="flex items-center gap-4">
                              <div className="bg-gray-800 p-2 rounded-xl text-gray-400 font-bold text-xs text-center w-14">
                                  {slot.time.split(' - ')[0]}
                              </div>
                              <div>
                                  <p className="font-bold text-sm text-white">{slot.team}</p>
                                  <div className={`text-[10px] font-bold mt-0.5 px-2 py-0.5 rounded w-fit ${
                                      slot.status === 'PAID' ? 'bg-green-500/10 text-green-400' : 
                                      slot.status === 'DEPOSIT' ? 'bg-yellow-500/10 text-yellow-400' :
                                      'bg-red-500/10 text-red-400'
                                  }`}>
                                      {slot.status === 'PAID' ? 'Tam Ödendi' : slot.status === 'DEPOSIT' ? 'Kapora Alındı' : 'Boş'}
                                  </div>
                              </div>
                          </div>
                          {slot.status === 'EMPTY' && (
                              <button className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold px-3 py-2 rounded-xl">
                                  Doldur
                              </button>
                          )}
                      </div>
                  ))}
              </div>
          </section>
          <button className="w-full py-4 bg-red-500/10 border border-red-500/30 text-red-500 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-colors">
              <XCircle size={20} /> ACİL SLOT KAPAT
          </button>
      </div>
  );

  const ProfileView = () => (
      <div className="space-y-6">
          {/* Facility Info */}
          <div className="bg-[#161B22] p-4 rounded-[24px] border border-white/5 flex items-center gap-4">
               <img src={PITCHES[0].image} className="w-16 h-16 rounded-2xl object-cover" />
               <div className="flex-1">
                   <h3 className="font-black text-white">Arena Sport Center</h3>
                   <p className="text-xs text-gray-500">Beşiktaş, İstanbul</p>
               </div>
               <button className="p-2 bg-gray-800 rounded-xl text-white"><Settings size={16} /></button>
          </div>

          {/* Loyalty Campaign Manager */}
          <div className="bg-gradient-to-br from-yellow-900/20 to-[#161B22] p-5 rounded-[24px] border border-yellow-500/20">
               <div className="flex justify-between items-center mb-4">
                   <div className="flex items-center gap-2 text-[#FFFF00]">
                       <Star size={20} fill="currentColor" />
                       <h3 className="font-black text-white">Sadakat Programı</h3>
                   </div>
                   <button onClick={() => setLoyaltyActive(!loyaltyActive)}>
                       {loyaltyActive ? <ToggleRight size={32} className="text-[#FFFF00]" /> : <ToggleLeft size={32} className="text-gray-600" />}
                   </button>
               </div>
               <p className="text-xs text-gray-400 mb-4">"10+1 Kampanyası" ile sadık müşterilerinize her 10. maçta bir ücretsiz maç hediye edin.</p>
               
               {loyaltyActive && (
                   <div className="space-y-3">
                       <div className="flex gap-2">
                           <div className="flex-1 bg-black/30 p-3 rounded-xl">
                               <p className="text-[10px] text-gray-500 uppercase">Kazanılan Müşteri</p>
                               <p className="text-xl font-black text-white">124</p>
                           </div>
                           <div className="flex-1 bg-black/30 p-3 rounded-xl">
                               <p className="text-[10px] text-gray-500 uppercase">Verilen Bilet</p>
                               <p className="text-xl font-black text-yellow-400">12</p>
                           </div>
                       </div>
                       
                       {/* QR Scanner Sim */}
                       <button 
                         onClick={() => setIsScannerOpen(!isScannerOpen)}
                         className="w-full py-3 bg-[#FFFF00] text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-300"
                       >
                           {isScannerOpen ? <XCircle size={18} /> : <Camera size={18} />}
                           {isScannerOpen ? 'Kamerayı Kapat' : 'Bilet Tara / Puan Ekle'}
                       </button>

                       {isScannerOpen && (
                           <div className="h-48 bg-black rounded-xl border border-dashed border-gray-600 flex items-center justify-center relative overflow-hidden">
                               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFFF00]/10 to-transparent animate-scan"></div>
                               <p className="text-xs text-gray-400">QR Kodu hizalayın...</p>
                           </div>
                       )}
                   </div>
               )}
          </div>

          {/* Settings List */}
          <div className="space-y-2">
               <button className="w-full bg-[#161B22] p-4 rounded-xl flex justify-between items-center text-sm font-bold text-white hover:bg-white/5">
                   <span>Çalışma Saatleri</span> <ArrowUpRight size={16} className="text-gray-500" />
               </button>
               <button className="w-full bg-[#161B22] p-4 rounded-xl flex justify-between items-center text-sm font-bold text-white hover:bg-white/5">
                   <span>Donanım & Özellikler</span> <ArrowUpRight size={16} className="text-gray-500" />
               </button>
          </div>
      </div>
  );

  const renderContent = () => {
      switch(activeTab) {
          case 'MANAGEMENT': return <ManagementView />;
          case 'FINANCE': return <FinanceView />;
          case 'HOME': return <HomeView />;
          case 'REVIEWS': return <ReviewsView />;
          case 'PROFILE': return <ProfileView />;
          default: return <HomeView />;
      }
  };

  const getTitle = () => {
      switch(activeTab) {
          case 'MANAGEMENT': return 'Saha Yönetimi';
          case 'FINANCE': return 'Finansal Durum';
          case 'HOME': return 'Business Suite';
          case 'REVIEWS': return 'Yorumlar & Kalite';
          case 'PROFILE': return 'Tesis Ayarları';
      }
  };

  return (
    <div className="min-h-screen flex flex-col pb-24 bg-[#0A0E14]">
      {/* Header */}
      <header className="p-6 flex justify-between items-center sticky top-0 bg-[#0A0E14]/90 backdrop-blur-md z-10 border-b border-white/5">
        <button onClick={onBack} className="p-2.5 bg-gray-800/50 rounded-xl hover:bg-gray-700 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div className="text-center">
          <h1 className="text-[10px] font-bold text-blue-400 tracking-widest uppercase">{getTitle()}</h1>
          <p className="font-black text-lg text-white">Arena Sport Center</p>
        </div>
        
        {/* Chat Link */}
        <button onClick={() => onNavigate('CHAT')} className="p-2.5 bg-gray-800/50 rounded-xl hover:bg-gray-700 transition-colors relative">
          <MessageSquare size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full border border-[#0A0E14]"></span>
        </button>
      </header>

      <main className="p-6 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
          {renderContent()}
      </main>

      {/* Owner Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-[#0A0E14]/90 backdrop-blur-xl border-t border-white/5 pb-6 pt-4 px-6 flex justify-between items-center z-30">
         <button 
            onClick={() => setActiveTab('MANAGEMENT')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'MANAGEMENT' ? 'text-blue-500' : 'text-gray-500'}`}
         >
            <Settings size={22} />
            <span className="text-[10px] font-bold">Yönetim</span>
         </button>

         <button 
            onClick={() => setActiveTab('FINANCE')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'FINANCE' ? 'text-green-500' : 'text-gray-500'}`}
         >
            <Wallet size={22} />
            <span className="text-[10px] font-bold">Finans</span>
         </button>

         <div className="relative -top-5">
             <button 
                onClick={() => setActiveTab('HOME')}
                className={`text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform border-[6px] border-[#0A0E14] ${activeTab === 'HOME' ? 'bg-blue-600 shadow-blue-900/50' : 'bg-gray-700'}`}
             >
                 <Home size={24} />
             </button>
         </div>

         <button 
            onClick={() => setActiveTab('REVIEWS')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'REVIEWS' ? 'text-yellow-500' : 'text-gray-500'}`}
         >
            <MessageSquare size={22} />
            <span className="text-[10px] font-bold">Yorumlar</span>
         </button>

         <button 
            onClick={() => setActiveTab('PROFILE')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'PROFILE' ? 'text-purple-500' : 'text-gray-500'}`}
         >
            <PieChartIcon size={22} />
            <span className="text-[10px] font-bold">Profil</span>
         </button>
      </nav>
    </div>
  );
};

export default OwnerPanel;
