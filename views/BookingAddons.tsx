
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Shirt, Footprints, Droplets, Info, CheckCircle2 } from 'lucide-react';
import HocaWidget from '../HocaWidget';

interface BookingAddonsProps {
  onBack: () => void;
  onContinue: (total: number) => void;
}

const BookingAddons: React.FC<BookingAddonsProps> = ({ onBack, onContinue }) => {
  const [bootsCount, setBootsCount] = useState(0);
  const [vestsCount, setVestsCount] = useState(0);
  const [waterCount, setWaterCount] = useState(0);

  const prices = {
      boots: 50,
      vests: 10,
      water: 15
  };

  const calculateTotal = () => {
      return (bootsCount * prices.boots) + (vestsCount * prices.vests) + (waterCount * prices.water);
  };

  const AddonCard = ({ title, price, icon, count, setCount, desc }: any) => (
      <div className="bg-[#161B22] border border-white/5 rounded-[24px] p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0A0E14] border border-white/5 flex items-center justify-center text-gray-300">
                  {icon}
              </div>
              <div>
                  <h4 className="font-bold text-white">{title}</h4>
                  <p className="text-[10px] text-gray-500">{desc}</p>
                  <p className="text-[#FFFF00] font-black text-sm mt-0.5">+{price}₺</p>
              </div>
          </div>
          <div className="flex items-center gap-3 bg-[#0A0E14] rounded-xl p-1 border border-white/5">
              <button 
                onClick={() => setCount(Math.max(0, count - 1))}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-bold"
              >
                  -
              </button>
              <span className="text-white font-bold w-4 text-center">{count}</span>
              <button 
                onClick={() => setCount(count + 1)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-bold"
              >
                  +
              </button>
          </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0E14] flex flex-col relative">
       
       {/* Hoca Upsell for Boots */}
       <HocaWidget context="BOOKING_ADDONS" />

       <header className="p-6 flex items-center gap-4 sticky top-0 bg-[#0A0E14]/90 backdrop-blur-xl z-20 border-b border-white/5">
           <button onClick={onBack} className="p-3 bg-[#161B22] rounded-full text-white hover:bg-gray-800 transition-colors">
               <ArrowLeft size={20} />
           </button>
           <h1 className="text-xl font-black text-white">EKİPMAN KİRALA</h1>
       </header>

       <main className="flex-1 p-6 space-y-4 overflow-y-auto custom-scrollbar pb-32">
           <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl flex items-start gap-3">
               <Info className="text-blue-400 shrink-0" size={20} />
               <p className="text-xs text-blue-200 leading-relaxed">
                   Seçtiğiniz ekipmanlar saha görevlisine iletilecek ve maç saatinde hazır edilecektir.
               </p>
           </div>

           <AddonCard 
             title="Profesyonel Krampon"
             desc="Nike/Adidas (No: 40-45)"
             price={prices.boots}
             count={bootsCount}
             setCount={setBootsCount}
             icon={<Footprints size={24} />}
           />

           <AddonCard 
             title="Maç Yeleği"
             desc="Temiz & Yıkanmış"
             price={prices.vests}
             count={vestsCount}
             setCount={setVestsCount}
             icon={<Shirt size={24} />}
           />

           <AddonCard 
             title="Su Paketi"
             desc="1.5L Soğuk Su"
             price={prices.water}
             count={waterCount}
             setCount={setWaterCount}
             icon={<Droplets size={24} />}
           />
       </main>

       <div className="absolute bottom-0 left-0 w-full bg-[#0A0E14] border-t border-white/10 p-6 pb-8">
           <div className="flex justify-between items-center mb-4">
               <span className="text-gray-400 text-sm font-bold">Ekstra Tutar</span>
               <span className="text-2xl font-black text-white">+{calculateTotal()}₺</span>
           </div>
           <button 
            onClick={() => onContinue(calculateTotal())}
            className="w-full h-14 bg-[#FFFF00] text-black font-black text-lg rounded-2xl flex items-center justify-center gap-2 hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-900/20"
           >
               DEVAM ET <ArrowRight size={20} />
           </button>
       </div>
    </div>
  );
};

export default BookingAddons;
