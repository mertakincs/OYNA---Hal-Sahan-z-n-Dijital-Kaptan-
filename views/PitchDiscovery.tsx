
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Filter, Star, Info, ChevronDown, CheckCircle2, Clock, MapPin, Navigation, Layers, View, RotateCw, Map as MapIcon, X, Compass, ChevronUp, ChevronRight, Loader2, Wifi, Coffee, Car, Shield, Shirt, Camera, Calendar as CalendarIcon, User } from 'lucide-react';
import { PITCHES } from '../constants';
import { Pitch } from '../types';

interface PitchDiscoveryProps {
  onBack: () => void;
  onBook: () => void;
}

// Mock User Location (Center of our virtual map)
const USER_LOCATION = { lat: 50, lng: 50 };

// Calculate Euclidean distance for demo (0-100 scale approx to km)
const calculateDistance = (p1: {lat: number, lng: number}, p2: {lat: number, lng: number}) => {
    const a = p1.lat - p2.lat;
    const b = p1.lng - p2.lng;
    return Math.sqrt(a*a + b*b) * 0.5; // Scaling factor for visual KM
};

const generateNext7Days = () => {
  const days = [];
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
  
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      date: d,
      label: d.toLocaleDateString('tr-TR', { weekday: 'short' }),
      day: d.getDate(),
      full: d.toLocaleDateString('tr-TR', options)
    });
  }
  return days;
};

const PitchDiscovery: React.FC<PitchDiscoveryProps> = ({ onBack, onBook }) => {
  // Sort pitches by distance from user initially
  const [pitches, setPitches] = useState<Pitch[]>(() => {
      const sorted = [...PITCHES].map(p => ({
          ...p,
          distanceVal: calculateDistance(USER_LOCATION, p.coordinates)
      })).sort((a, b) => a.distanceVal - b.distanceVal);
      return sorted;
  });

  const [selectedPitch, setSelectedPitch] = useState<Pitch | null>(null);
  const [viewMode, setViewMode] = useState<'MAP' | 'PREVIEW' | 'DETAIL'>('MAP');
  const [showTraffic, setShowTraffic] = useState(false);
  const [isSearchingArea, setIsSearchingArea] = useState(false);
  
  // Detail State
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const days = generateNext7Days();

  // Map Navigation State
  const [pan, setPan] = useState({ x: -200, y: -150 }); // Start roughly center
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  // Focus Map on specific point
  const focusMap = (lat: number, lng: number) => {
      // Map is 200% width/height. 
      // Center of screen is approx (windowWidth/2, windowHeight/2)
      // We want to translate the map so that (lng%, lat%) is at center.
      // Simple approximation for demo:
      setPan({
          x: -(lng * 10 - window.innerWidth / 2),
          y: -(lat * 10 - window.innerHeight / 2)
      });
  };

  useEffect(() => {
     // Initial Focus on User
     focusMap(USER_LOCATION.lat, USER_LOCATION.lng);
  }, []);

  const getAmenityIcon = (name: string) => {
    switch (name) {
      case 'Duş': return <span className="text-xl">🚿</span>;
      case 'Otopark': return <Car size={20} className="text-gray-300" />;
      case 'Kafe': return <Coffee size={20} className="text-orange-400" />;
      case 'WiFi': return <Wifi size={20} className="text-cyan-400" />;
      case 'Ekipman': return <Shirt size={20} className="text-purple-400" />;
      case 'Kamera Kaydı': return <Camera size={20} className="text-red-400" />;
      case 'Mescit': return <span className="text-xl">🕌</span>;
      default: return <CheckCircle2 size={20} className="text-green-400" />;
    }
  };

  const getQualityColor = (badge: string) => {
      if (badge.includes('A')) return '#FFFF00'; // Gold
      if (badge.includes('B')) return '#C0C0C0'; // Silver
      return '#CD7F32'; // Bronze
  };

  const handleSearchArea = () => {
    setIsSearchingArea(true);
    setTimeout(() => {
        setIsSearchingArea(false);
    }, 1000);
  };

  const handleNavigate = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedPitch?.name} ${selectedPitch?.location}`, '_blank');
  };

  const handlePinClick = (pitch: Pitch, e?: React.MouseEvent | React.TouchEvent) => {
      e?.stopPropagation();
      setSelectedPitch(pitch);
      setViewMode('PREVIEW');
      setSelectedSlot(null);
      focusMap(pitch.coordinates.lat, pitch.coordinates.lng);
  };

  // Map Drag Logic
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    dragStart.current = { x: clientX - pan.x, y: clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    setPan({
      x: clientX - dragStart.current.x,
      y: clientY - dragStart.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const QualityBar: React.FC<{ label: string; value: number }> = ({ label, value }) => (
    <div className="mb-4">
      <div className="flex justify-between text-xs mb-1.5 font-bold text-gray-400 uppercase tracking-wide">
         <span>{label}</span>
         <span className="text-white">{value}/100</span>
      </div>
      <div className="h-2.5 bg-[#161B22] border border-white/5 rounded-full overflow-hidden">
        <div 
            className={`h-full rounded-full transition-all duration-1000 ease-out ${value > 90 ? 'bg-gradient-to-r from-[#FFFF00] to-yellow-500' : value > 80 ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-orange-400 to-red-500'}`} 
            style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#0A0E14] relative font-sans">
      
      {/* HEADER OVERLAY */}
      <div className={`absolute top-0 left-0 w-full p-4 flex justify-between items-center z-40 pointer-events-none transition-all duration-500 ${viewMode === 'DETAIL' ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
        <button onClick={onBack} className="pointer-events-auto p-3 bg-[#0A0E14]/80 backdrop-blur-xl rounded-full border border-gray-700 shadow-xl text-white hover:bg-gray-800 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div className="flex gap-2 pointer-events-auto">
             <button 
                onClick={() => setShowTraffic(!showTraffic)}
                className={`p-3 rounded-full border shadow-xl backdrop-blur-xl transition-all ${showTraffic ? 'bg-[#FFFF00] text-black border-[#FFFF00]' : 'bg-[#0A0E14]/80 text-white border-gray-700'}`}
             >
                <Layers size={20} />
             </button>
             <button className="p-3 bg-[#0A0E14]/80 backdrop-blur-xl rounded-full border border-gray-700 shadow-xl text-white flex items-center gap-2">
                <Filter size={20} />
             </button>
        </div>
      </div>

      {/* MAP LAYER */}
      <div 
        className="absolute inset-0 bg-[#0A0E14] cursor-grab active:cursor-grabbing z-0"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        ref={mapRef}
      >
        <div 
            className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left transition-transform duration-75 ease-linear will-change-transform"
            style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }} 
        >
            <svg className="w-full h-full bg-[#050505]" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                <rect width="100%" height="100%" fill="#050505" />
                {/* Dark Map Styling */}
                <path d="M480 0 Q 520 500 480 1000" stroke="#0f172a" strokeWidth="60" fill="none" />
                <path d="M100 200 Q 250 100 400 250 T 600 300 L 500 500 L 200 600 Z" fill="#0D1412" />
                <path d="M700 600 Q 800 500 900 600 T 950 800 L 750 900 Z" fill="#0D1412" />
                <path d="M0 450 L 1000 450" stroke="#1F1F1F" strokeWidth="8" fill="none" />
                
                {/* User Location Pulse Ring */}
                <circle cx={USER_LOCATION.lng * 10} cy={USER_LOCATION.lat * 10} r="30" fill="#3b82f6" fillOpacity="0.1" className="animate-ping" />
                <circle cx={USER_LOCATION.lng * 10} cy={USER_LOCATION.lat * 10} r="10" fill="#3b82f6" stroke="white" strokeWidth="2" />
            </svg>

            {/* Pitch Markers */}
            {pitches.map((item) => {
                const color = getQualityColor(item.qualityBadge);
                const isSelected = selectedPitch?.id === item.id;
                
                return (
                    <button
                        key={item.id}
                        onMouseDown={(e) => handlePinClick(item, e)}
                        onTouchStart={(e) => handlePinClick(item, e)}
                        className="absolute transform -translate-x-1/2 -translate-y-full transition-all duration-300 hover:z-50 focus:outline-none group"
                        style={{ 
                            top: `${item.coordinates.lat * 10}%`, 
                            left: `${item.coordinates.lng * 10}%`,
                            zIndex: isSelected ? 100 : 10
                        }}
                    >
                        {/* Selected Glow */}
                        {isSelected && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse pointer-events-none"></div>
                        )}
                        
                        {/* Price Tag (Always visible for selected, hover for others) */}
                        <div className={`absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#161B22] border border-gray-700 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-xl transition-all duration-300 ${isSelected ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 translate-y-2 scale-90 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100'}`}>
                            {item.pricePerPerson}₺
                        </div>

                        {/* Pin Icon */}
                        <div className={`relative transition-transform duration-300 ${isSelected ? 'scale-125' : 'scale-100 hover:scale-110'}`}>
                            <svg width="36" height="42" viewBox="0 0 36 42" fill="none" className="drop-shadow-2xl">
                                <path d="M18 0C8.05888 0 0 8.05888 0 18C0 27.9411 18 42 18 42C18 42 36 27.9411 36 18C36 8.05888 27.9411 0 18 0Z" fill={isSelected ? color : '#1F2937'} stroke={isSelected ? 'white' : color} strokeWidth="2"/>
                                <circle cx="18" cy="18" r="8" fill="#0A0E14" />
                                <text x="18" y="21" textAnchor="middle" fill={color} fontSize="10" fontWeight="900">{item.qualityBadge.charAt(0)}</text>
                            </svg>
                        </div>
                    </button>
                );
            })}
        </div>

        {/* Search This Area FAB */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
             <button 
                onClick={handleSearchArea}
                disabled={isSearchingArea}
                className="bg-[#161B22]/90 backdrop-blur-md text-white border border-white/10 px-5 py-2.5 rounded-full font-bold shadow-xl flex items-center gap-2 active:scale-95 transition-transform hover:bg-[#161B22]"
             >
                {isSearchingArea ? <Loader2 size={16} className="animate-spin" /> : <MapIcon size={16} />}
                {isSearchingArea ? 'Aranıyor...' : 'Bu Alanda Ara'}
            </button>
        </div>
      </div>

      {/* NEARBY LIST (When no pitch selected) */}
      {!selectedPitch && (
          <div className="absolute bottom-0 left-0 w-full z-40 bg-gradient-to-t from-[#0A0E14] via-[#0A0E14]/90 to-transparent pt-12 pb-6 px-4">
              <div className="flex justify-between items-end mb-4 px-2">
                  <div>
                    <h3 className="text-white font-black text-lg">Yakınındaki Sahalar</h3>
                    <p className="text-xs text-gray-400">Konumuna göre sıralandı</p>
                  </div>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x snap-mandatory">
                  {pitches.slice(0, 5).map(pitch => (
                      <div 
                        key={pitch.id}
                        onClick={(e) => handlePinClick(pitch, e)}
                        className="snap-center shrink-0 w-64 bg-[#161B22] border border-white/10 rounded-3xl p-3 shadow-2xl active:scale-95 transition-transform"
                      >
                          <div className="relative h-32 rounded-2xl overflow-hidden mb-3">
                              <img src={pitch.image} className="w-full h-full object-cover" alt={pitch.name} />
                              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1">
                                  <Star size={10} className="text-[#FFFF00] fill-[#FFFF00]" />
                                  <span className="text-xs font-bold text-white">{pitch.rating}</span>
                              </div>
                              <div className="absolute bottom-2 left-2">
                                  <span className="bg-[#FFFF00] text-black text-[10px] font-black px-1.5 py-0.5 rounded shadow-lg border border-white/20">
                                      {pitch.qualityBadge} Kalite
                                  </span>
                              </div>
                          </div>
                          <h4 className="font-bold text-white truncate">{pitch.name}</h4>
                          <div className="flex justify-between items-center mt-1">
                              <p className="text-xs text-gray-400">{pitch.distance} uzakta</p>
                              <p className="text-[#FFFF00] font-black">{pitch.pricePerPerson}₺</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {/* MINI PREVIEW (When pitch selected) */}
      {selectedPitch && viewMode === 'PREVIEW' && (
        <div className="absolute bottom-6 left-6 right-6 z-50 animate-in slide-in-from-bottom-10 duration-300">
             <div 
                onClick={() => setViewMode('DETAIL')}
                className="bg-[#161B22]/95 backdrop-blur-xl border border-white/10 rounded-[32px] p-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)] cursor-pointer group hover:border-[#FFFF00]/30 transition-colors"
             >
                 <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-4 opacity-50"></div>
                 <div className="flex gap-4">
                     <div className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden bg-gray-800">
                         <img src={selectedPitch.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={selectedPitch.name} />
                         <div className="absolute top-2 right-2 bg-[#FFFF00] text-black text-[10px] font-black px-1.5 py-0.5 rounded shadow-lg">
                             {selectedPitch.qualityBadge}
                         </div>
                     </div>
                     <div className="flex-1 flex flex-col justify-center">
                         <h3 className="font-black text-white text-xl leading-tight">{selectedPitch.name}</h3>
                         <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                             <MapPin size={12} /> {selectedPitch.district} • {selectedPitch.distance}
                         </div>
                         <div className="mt-3 flex items-center justify-between">
                             <div>
                                 <p className="text-[10px] text-gray-500 uppercase">Kişi Başı</p>
                                 <p className="font-black text-[#FFFF00] text-lg">{selectedPitch.pricePerPerson}₺</p>
                             </div>
                             <div className="bg-white/10 p-2 rounded-full text-white group-hover:bg-[#FFFF00] group-hover:text-black transition-colors">
                                 <ChevronUp size={20} />
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
        </div>
      )}

      {/* FULL DETAIL VIEW (MODAL) */}
      {selectedPitch && viewMode === 'DETAIL' && (
         <div className="fixed inset-0 z-[60] bg-[#0A0E14] flex flex-col animate-in slide-in-from-bottom duration-300">
             
             {/* Sticky Close Button */}
             <button 
                onClick={() => setViewMode('PREVIEW')}
                className="absolute top-6 left-6 z-50 p-3 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-black transition-colors border border-white/10"
             >
                 <ChevronDown size={24} />
             </button>

             {/* Content */}
             <div className="flex-1 overflow-y-auto custom-scrollbar pb-32">
                 
                 {/* Gallery */}
                 <div className="relative h-[45vh] w-full bg-[#161B22]">
                    <div className="w-full h-full flex overflow-x-auto snap-x snap-mandatory custom-scrollbar">
                        {[selectedPitch.image, ...selectedPitch.images].map((img, idx) => (
                            <img key={idx} src={img} className="snap-center shrink-0 w-full h-full object-cover" alt={`Slide ${idx}`} />
                        ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E14] via-transparent to-transparent pointer-events-none"></div>
                    
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-2 mb-2">
                             <span className="bg-[#FFFF00] text-black px-2 py-0.5 rounded text-xs font-black">{selectedPitch.qualityBadge} Kalite</span>
                             <span className="bg-white/20 backdrop-blur-md text-white px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                                 <Star size={10} className="fill-yellow-400 text-yellow-400" /> {selectedPitch.rating} ({selectedPitch.googleReviews})
                             </span>
                        </div>
                        <h1 className="text-4xl font-black text-white leading-none mb-1">{selectedPitch.name}</h1>
                        <p className="text-gray-400 text-sm flex items-center gap-1">
                            <MapPin size={14} /> {selectedPitch.location}
                        </p>
                    </div>
                 </div>

                 <div className="px-6 py-6 space-y-8">
                     
                     {/* Amenities */}
                     <section>
                         <h3 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-widest">TESİS ÖZELLİKLERİ</h3>
                         <div className="grid grid-cols-4 gap-3">
                             {selectedPitch.amenities.map((item, idx) => (
                                 <div key={idx} className="flex flex-col items-center gap-2 bg-[#161B22] border border-white/5 p-3 rounded-2xl">
                                     <div className="w-8 h-8 flex items-center justify-center">
                                         {getAmenityIcon(item)}
                                     </div>
                                     <span className="text-[10px] text-gray-400 font-bold text-center">{item}</span>
                                 </div>
                             ))}
                         </div>
                     </section>

                     {/* Quality Metrics */}
                     <section className="bg-[#161B22] border border-white/5 p-6 rounded-[32px]">
                         <h3 className="text-xs font-bold text-gray-500 uppercase mb-6 tracking-widest">SAHA PERFORMANSI</h3>
                         <QualityBar label="Işıklandırma" value={selectedPitch.lighting} />
                         <QualityBar label="Zemin (Çim) Kalitesi" value={selectedPitch.grassQuality} />
                         <QualityBar label="Kaleler ve Fileler" value={selectedPitch.goalQuality} />
                     </section>

                     {/* Booking Calendar */}
                     <section>
                         <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">REZERVASYON</h3>
                            <div className="flex items-center gap-1 text-[10px] text-[#FFFF00] font-bold">
                                <Clock size={12} /> 60 Dakika
                            </div>
                         </div>
                         
                         <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar mb-2">
                             {days.map((day, idx) => (
                                 <button
                                    key={idx}
                                    onClick={() => setSelectedDateIndex(idx)}
                                    className={`shrink-0 w-16 h-20 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${
                                        selectedDateIndex === idx 
                                        ? 'bg-[#FFFF00] text-black shadow-lg scale-105' 
                                        : 'bg-[#161B22] border border-white/5 text-gray-400 hover:bg-gray-800'
                                    }`}
                                 >
                                     <span className="text-[10px] font-bold uppercase opacity-70">{day.label}</span>
                                     <span className="text-xl font-black">{day.day}</span>
                                 </button>
                             ))}
                         </div>

                         <div className="grid grid-cols-4 gap-3">
                             {selectedPitch.slots.map((slot, idx) => {
                                 const isBooked = (idx + selectedDateIndex) % 3 === 0; 
                                 const isSelected = selectedSlot === slot.time;
                                 
                                 return (
                                     <button
                                        key={idx}
                                        disabled={isBooked}
                                        onClick={() => setSelectedSlot(slot.time)}
                                        className={`py-3 rounded-xl text-xs font-bold transition-all relative overflow-hidden ${
                                            isBooked 
                                            ? 'bg-red-900/10 text-red-500 border border-red-500/10 cursor-not-allowed opacity-50'
                                            : isSelected
                                            ? 'bg-[#FFFF00] text-black shadow-[0_0_15px_rgba(255,255,0,0.4)] scale-105 z-10'
                                            : 'bg-[#161B22] text-green-400 border border-green-500/20 hover:bg-green-500/10'
                                        }`}
                                     >
                                         {slot.time}
                                         {isBooked && <div className="absolute inset-0 flex items-center justify-center bg-black/40"><X size={16} /></div>}
                                     </button>
                                 );
                             })}
                         </div>
                     </section>

                     {/* Location */}
                     <section>
                         <h3 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-widest">KONUM</h3>
                         <div className="relative h-48 rounded-[32px] overflow-hidden border border-white/10 group">
                             <div className="absolute inset-0 bg-gray-800">
                                 {/* Mock Map Image */}
                                 <img 
                                    src="https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/29.0,41.0,13,0/600x300?access_token=mock" 
                                    alt="Map Preview" 
                                    className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                                 />
                                 <div className="absolute inset-0 flex items-center justify-center bg-[#161B22] opacity-100 mix-blend-multiply"></div>
                             </div>
                             
                             <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                 <div className="w-4 h-4 bg-[#FFFF00] rounded-full shadow-[0_0_20px_rgba(255,255,0,0.8)] animate-pulse"></div>
                             </div>

                             <button 
                                onClick={handleNavigate}
                                className="absolute bottom-4 right-4 bg-[#1B4332] hover:bg-[#2d6a4f] text-green-400 border border-green-500/30 px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95"
                             >
                                 <Navigation size={14} /> YOL TARİFİ AL
                             </button>
                         </div>
                         <p className="text-xs text-gray-500 mt-3 ml-2">{selectedPitch.location}</p>
                     </section>

                 </div>
             </div>

             {/* Sticky Footer */}
             <div className="absolute bottom-0 left-0 w-full bg-[#0A0E14]/80 backdrop-blur-xl border-t border-white/10 p-5 pb-8 safe-area-inset-bottom">
                 <div className="flex items-center gap-4">
                     <div className="flex flex-col">
                         <span className="text-[10px] text-gray-400 font-bold uppercase">Toplam Tutar</span>
                         <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-white">{selectedPitch.totalPrice}₺</span>
                         </div>
                     </div>
                     <button 
                        disabled={!selectedSlot}
                        onClick={onBook}
                        className={`flex-1 h-14 rounded-2xl font-black text-sm tracking-wide shadow-2xl transition-all flex items-center justify-center gap-2 ${
                            selectedSlot 
                            ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/30 active:scale-95' 
                            : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        }`}
                     >
                         {selectedSlot ? 'HEMEN KİRALA' : 'SAAT SEÇİNİZ'}
                         {selectedSlot && <ArrowRight size={18} />}
                     </button>
                 </div>
             </div>

         </div>
      )}

    </div>
  );
};

export default PitchDiscovery;
