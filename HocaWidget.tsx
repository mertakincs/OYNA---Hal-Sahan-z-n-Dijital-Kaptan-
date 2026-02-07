
import React, { useState, useEffect } from 'react';
import { X, MessageCircle, AlertCircle, Zap, TrendingUp, Info, Crown } from 'lucide-react';

export type HocaContext = 'ONBOARDING' | 'BOOKING_ADDONS' | 'PAYMENT' | 'TACTICS' | 'IDLE' | 'HIRE_REF_START' | 'HIRE_GK_LOW' | 'HIRE_GK_HIGH' | 'SERVICE_LOCKED' | 'SERVICE_BID_UPSELL' | 'PREMIUM_UPSELL_PAYMENT' | 'PREMIUM_UPSELL_PROFILE' | 'PREMIUM_UPSELL_TV';

interface HocaWidgetProps {
  context: HocaContext;
  onClose?: () => void;
  customMessage?: string; // Optional override
  onAction?: () => void; // Callback for button click
}

const HocaContent = {
  ONBOARDING: {
    message: "Selam evlat! Ben OYNA'nın teknik direktörüyüm. Burası senin stadyumun. Önce bir rol seç, sonra sahada görüşelim!",
    mood: 'HAPPY',
    actionText: null
  },
  BOOKING_ADDONS: {
    message: "Evlat, bu çimde düz tabanla kayarsın. Tesisin kramponları A kalitedir, bir göz at derim!",
    mood: 'SERIOUS',
    actionText: "Kramponlara Bak"
  },
  PAYMENT: {
    message: "Maçın Adamı (MOTM) olup %5 indirim kazanmak varken neden tam ücret ödeyesin? Bugün sahada parlamaya hazır mısın?",
    mood: 'EXCITED',
    actionText: "MOTM Nedir?"
  },
  TACTICS: {
    message: "Dizilişin fena değil ama rakipte 3 'Savaşçı' var. Orta sahada daha fazla pas yapıp 'Büyücü'lerini devreye sokmalısın.",
    mood: 'ANALYTIC',
    actionText: "Taktik Değiştir"
  },
  IDLE: {
    message: "Biliyor muydun? İlk futbol topu domuz mesanesinden yapılmıştı. Şanslısın ki bizde en iyi deri toplar var!",
    mood: 'FUN',
    actionText: null
  },
  HIRE_REF_START: {
    message: "Hakemsiz maç kavgayla biter evlat. Gel şu maça bir profesyonel çağıralım, adalet yerini bulsun!",
    mood: 'SERIOUS',
    actionText: null
  },
  HIRE_GK_LOW: {
    message: "Evlat, bu fiyata ancak kova kaleci bulursun. 50 TL daha artır da kalemiz kilitlensin!",
    mood: 'SERIOUS',
    actionText: "Bütçeyi Artır"
  },
  HIRE_GK_HIGH: {
    message: "İşte bu! Bu paraya 'Panter' lakaplı kaleciler sıraya girer. Arkanı yaslan ve izle.",
    mood: 'EXCITED',
    actionText: null
  },
  SERVICE_LOCKED: {
    message: "Evlat, bu maç Şampiyonlar Ligi ayarında! Önce birkaç kolay maçta puanını yükselt, sonra buraya gel.",
    mood: 'SERIOUS',
    actionText: "Kolay Maç Bul"
  },
  SERVICE_BID_UPSELL: {
    message: "Kabiliyetine güveniyorsan 50 TL daha iste, bu takımın kalesi senin gibi bir pantere muhtaç!",
    mood: 'EXCITED',
    actionText: "Teklifi Yükselt"
  },
  PREMIUM_UPSELL_PAYMENT: {
    message: "Evlat, her maç 30 TL komisyon vereceğine PRO'ya geç, 3 maçta üyeliğin bedavaya gelsin. Akıllı oyuncu parayı cebinde tutar!",
    mood: 'ANALYTIC',
    actionText: "PRO'ya Geç"
  },
  PREMIUM_UPSELL_PROFILE: {
    message: "Sıradan bir oyuncu mu kalacaksın, yoksa bu sahanın efsanesi mi olacaksın? PRO rozetini tak, farkını koy!",
    mood: 'EXCITED',
    actionText: "Efsane Ol"
  },
  PREMIUM_UPSELL_TV: {
    message: "Bu golü telefonuna indirip herkese göstermek istemez misin? PRO ol, klibin cebine insin!",
    mood: 'HAPPY',
    actionText: "Hemen İndir"
  }
};

const HocaWidget: React.FC<HocaWidgetProps> = ({ context, onClose, customMessage, onAction }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  
  // Reset visibility when context changes to re-trigger animation
  useEffect(() => {
      setIsLeaving(false);
      setIsVisible(false);
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
  }, [context]);

  const content = HocaContent[context];
  const displayMessage = customMessage || content.message;

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
    }, 500); // Wait for exit animation
  };

  const handleAction = () => {
      if (onAction) onAction();
      else if (content.actionText === "PRO'ya Geç" || content.actionText === "Efsane Ol" || content.actionText === "Hemen İndir") {
          // This creates a custom event that App.tsx can listen to if needed, 
          // or ideally the parent passes the navigation callback.
          // For now, visual feedback.
      }
  };

  if (!isVisible && !isLeaving) return null;

  return (
    <div className={`fixed bottom-24 right-4 z-[100] flex flex-col items-end pointer-events-none ${isLeaving ? 'animate-out slide-out-to-bottom-10 fade-out' : 'animate-in slide-in-from-bottom-20 fade-in duration-700'}`}>
      
      {/* Speech Bubble */}
      <div className="pointer-events-auto bg-white text-black p-4 rounded-2xl rounded-br-none shadow-[0_10px_40px_rgba(0,0,0,0.3)] max-w-[280px] mb-2 relative transform transition-all hover:scale-105 origin-bottom-right border-2 border-[#FFFF00]">
        
        <button 
            onClick={handleClose}
            className="absolute -top-2 -left-2 bg-gray-200 rounded-full p-1 text-gray-600 hover:bg-red-500 hover:text-white transition-colors"
        >
            <X size={12} />
        </button>

        <div className="flex items-start gap-2">
            <div className="mt-1 shrink-0 text-yellow-600">
                {context.includes('PREMIUM') ? <Crown size={16} /> : 
                 content.mood === 'HAPPY' ? <MessageCircle size={16} /> :
                 content.mood === 'SERIOUS' ? <AlertCircle size={16} /> :
                 content.mood === 'EXCITED' ? <Zap size={16} /> :
                 content.mood === 'ANALYTIC' ? <TrendingUp size={16} /> :
                 <Info size={16} />}
            </div>
            <div>
                <p className="text-xs font-bold leading-relaxed">
                    {displayMessage}
                </p>
                {content.actionText && (
                    <button 
                        onClick={handleAction}
                        className="mt-2 text-[10px] font-black uppercase text-blue-600 hover:underline flex items-center gap-1"
                    >
                        {content.actionText}
                    </button>
                )}
            </div>
        </div>

        {/* Bubble Triangle */}
        <div className="absolute -bottom-2 right-0 w-4 h-4 bg-white border-r-2 border-b-2 border-[#FFFF00] transform rotate-45 translate-x-[-10px] translate-y-[-10px]"></div>
      </div>

      {/* Character Avatar */}
      <div className="pointer-events-auto relative group cursor-pointer" onClick={() => setIsVisible(true)}>
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-[#FFFF00] blur-2xl opacity-20 rounded-full animate-pulse group-hover:opacity-40 transition-opacity"></div>
          
          <div className="w-20 h-20 rounded-full border-4 border-[#FFFF00] overflow-hidden shadow-2xl bg-[#161B22] relative z-10 hover:-translate-y-2 transition-transform duration-300">
              <img 
                src="https://img.freepik.com/free-photo/portrait-senior-man-wearing-jacket_23-2148740058.jpg?w=740&t=st=1709500000~exp=1709500600~hmac=mock" 
                alt="Hoca" 
                className="w-full h-full object-cover transform scale-110 mt-2" // Slightly zoomed to show face
              />
          </div>
          
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black text-[#FFFF00] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#FFFF00] z-20 shadow-lg">
              HOCA
          </div>
      </div>

    </div>
  );
};

export default HocaWidget;
