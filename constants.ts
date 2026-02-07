
import { Pitch, Referee, Goalkeeper, Team, PlayerStyle, ServiceJob, Transaction, Review, BusinessInsight, JobListing, IncomingBid, WalletTransaction, MatchListing } from './types';

// Helper to generate slots
const generateSlots = () => [
  { time: '19:00', status: Math.random() > 0.6 ? 'booked' : 'available' },
  { time: '20:00', status: Math.random() > 0.5 ? 'booked' : 'available' },
  { time: '21:00', status: Math.random() > 0.4 ? 'booked' : 'available' },
  { time: '22:00', status: Math.random() > 0.3 ? 'booked' : 'available' },
  { time: '23:00', status: 'available' },
] as any;

const amenitiesFull = ['Duş', 'Otopark', 'Kafe', 'WiFi', 'Ekipman', 'Kamera Kaydı', 'Servis', 'Mescit'];
const amenitiesBasic = ['Duş', 'Otopark', 'Kafe'];
const amenitiesPro = ['Duş', 'Otopark', 'Kafe', 'WiFi', 'Ekipman', 'VIP Lounge', 'Sağlık Odası'];

const stockImages = [
    'https://images.unsplash.com/photo-1529900748604-07564a03e7a6',
    'https://images.unsplash.com/photo-1575361204480-aadea25e6e68',
    'https://images.unsplash.com/photo-1518605348406-6992f9f4d7b2',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018',
    'https://images.unsplash.com/photo-1624880357913-a8539238245b',
    'https://images.unsplash.com/photo-1551958219-acbc608c6377'
];

export const PITCHES: Pitch[] = [
  {
    id: 'p1',
    name: 'Arena Beşiktaş',
    district: 'Beşiktaş',
    location: 'Çırağan Cd. No:12, Beşiktaş',
    distance: '1.2km',
    rating: 4.9,
    qualityBadge: 'A+',
    googleRating: 4.8,
    googleReviews: 1240,
    pricePerPerson: 220,
    totalPrice: 3080,
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=800',
    images: [stockImages[1], stockImages[2], stockImages[3], stockImages[4], stockImages[5]],
    amenities: amenitiesPro,
    lighting: 98,
    grassQuality: 97,
    goalQuality: 95,
    coordinates: { lat: 45, lng: 48 }, // Beşiktaş (Avrupa Merkezi)
    slots: generateSlots()
  },
  {
    id: 'p2',
    name: 'Kadıköy Park Arena',
    district: 'Kadıköy',
    location: 'Moda Cd. No:5, Kadıköy',
    distance: '5.4km',
    rating: 4.7,
    qualityBadge: 'A',
    googleRating: 4.6,
    googleReviews: 980,
    pricePerPerson: 200,
    totalPrice: 2800,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
    images: [stockImages[0], stockImages[2], stockImages[3], stockImages[4], stockImages[5]],
    amenities: amenitiesFull,
    lighting: 92,
    grassQuality: 90,
    goalQuality: 88,
    coordinates: { lat: 60, lng: 58 }, // Kadıköy (Anadolu Merkezi)
    slots: generateSlots()
  },
  {
    id: 'p3',
    name: 'Florya Elit Sahaları',
    district: 'Bakırköy',
    location: 'Florya Tesisleri Yanı, Bakırköy',
    distance: '12km',
    rating: 4.8,
    qualityBadge: 'A+',
    googleRating: 4.9,
    googleReviews: 2100,
    pricePerPerson: 250,
    totalPrice: 3500,
    image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=800',
    images: [stockImages[5], stockImages[1], stockImages[2], stockImages[3], stockImages[4]],
    amenities: amenitiesPro,
    lighting: 99,
    grassQuality: 98,
    goalQuality: 96,
    coordinates: { lat: 60, lng: 20 }, // Bakırköy (Batı)
    slots: generateSlots()
  },
  {
    id: 'p4',
    name: 'Levent Futbol Merkezi',
    district: 'Şişli',
    location: 'Büyükdere Cd., Levent',
    distance: '3.5km',
    rating: 4.5,
    qualityBadge: 'B+',
    googleRating: 4.4,
    googleReviews: 540,
    pricePerPerson: 210,
    totalPrice: 2940,
    image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&q=80&w=800',
    images: [stockImages[2], stockImages[3], stockImages[4], stockImages[0], stockImages[1]],
    amenities: amenitiesFull,
    lighting: 88,
    grassQuality: 85,
    goalQuality: 87,
    coordinates: { lat: 40, lng: 45 }, // Şişli
    slots: generateSlots()
  },
  {
    id: 'p5',
    name: 'Üsküdar Sahil Arena',
    district: 'Üsküdar',
    location: 'Paşalimanı Cd., Üsküdar',
    distance: '4.1km',
    rating: 4.6,
    qualityBadge: 'B',
    googleRating: 4.5,
    googleReviews: 320,
    pricePerPerson: 190,
    totalPrice: 2660,
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=800',
    images: [stockImages[3], stockImages[4], stockImages[0], stockImages[1], stockImages[2]],
    amenities: amenitiesBasic,
    lighting: 82,
    grassQuality: 84,
    goalQuality: 80,
    coordinates: { lat: 50, lng: 55 }, // Üsküdar
    slots: generateSlots()
  },
  {
    id: 'p6',
    name: 'Maltepe City Field',
    district: 'Maltepe',
    location: 'Bağdat Cd., Maltepe',
    distance: '15km',
    rating: 4.3,
    qualityBadge: 'C+',
    googleRating: 4.2,
    googleReviews: 150,
    pricePerPerson: 170,
    totalPrice: 2380,
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade8f55?auto=format&fit=crop&q=80&w=800',
    images: [stockImages[4], stockImages[0], stockImages[1], stockImages[2], stockImages[3]],
    amenities: ['Duş', 'Otopark'],
    lighting: 75,
    grassQuality: 78,
    goalQuality: 72,
    coordinates: { lat: 70, lng: 70 }, // Maltepe
    slots: generateSlots()
  },
  {
    id: 'p7',
    name: 'Sarıyer Orman Sahası',
    district: 'Sarıyer',
    location: 'Bahçeköy Yolu, Sarıyer',
    distance: '18km',
    rating: 4.9,
    qualityBadge: 'A+',
    googleRating: 4.9,
    googleReviews: 890,
    pricePerPerson: 240,
    totalPrice: 3360,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    images: [stockImages[0], stockImages[2], stockImages[4], stockImages[5], stockImages[1]],
    amenities: ['Duş', 'Otopark', 'Kafe', 'Doğa Manzarası'],
    lighting: 94,
    grassQuality: 98,
    goalQuality: 95,
    coordinates: { lat: 10, lng: 50 }, // Sarıyer (Kuzey)
    slots: generateSlots()
  },
  {
    id: 'p8',
    name: 'Ataşehir Star Arena',
    district: 'Ataşehir',
    location: 'Batı Ataşehir, Ataşehir',
    distance: '10km',
    rating: 4.4,
    qualityBadge: 'B',
    googleRating: 4.3,
    googleReviews: 410,
    pricePerPerson: 205,
    totalPrice: 2870,
    image: 'https://images.unsplash.com/photo-1487466365202-1afdb86c764e?auto=format&fit=crop&q=80&w=800',
    images: [stockImages[1], stockImages[3], stockImages[5], stockImages[0], stockImages[2]],
    amenities: ['Otopark', 'WiFi', 'Kafe'],
    lighting: 85,
    grassQuality: 82,
    goalQuality: 80,
    coordinates: { lat: 50, lng: 75 }, // Ataşehir
    slots: generateSlots()
  },
  {
    id: 'p9',
    name: 'Beykoz Doğal Çim',
    district: 'Beykoz',
    location: 'Riva Yolu, Beykoz',
    distance: '22km',
    rating: 4.9,
    qualityBadge: 'A+',
    googleRating: 5.0,
    googleReviews: 120,
    pricePerPerson: 280,
    totalPrice: 3920,
    image: 'https://images.unsplash.com/photo-1628891890467-b79f2c8ba9dc?auto=format&fit=crop&q=80&w=800',
    images: [stockImages[5], stockImages[0], stockImages[2], stockImages[4], stockImages[1]],
    amenities: amenitiesPro,
    lighting: 90,
    grassQuality: 100,
    goalQuality: 95,
    coordinates: { lat: 15, lng: 65 }, // Beykoz (Kuzey Doğu)
    slots: generateSlots()
  },
  {
    id: 'p10',
    name: 'Zeytinburnu Gençlik',
    district: 'Zeytinburnu',
    location: 'Sahil Yolu, Zeytinburnu',
    distance: '8km',
    rating: 4.1,
    qualityBadge: 'C',
    googleRating: 4.0,
    googleReviews: 600,
    pricePerPerson: 150,
    totalPrice: 2100,
    image: 'https://images.unsplash.com/photo-1570498839593-e565b39455fc?auto=format&fit=crop&q=80&w=800',
    images: [stockImages[2], stockImages[4], stockImages[0], stockImages[1], stockImages[3]],
    amenities: ['Otopark'],
    lighting: 72,
    grassQuality: 70,
    goalQuality: 70,
    coordinates: { lat: 55, lng: 30 }, // Zeytinburnu
    slots: generateSlots()
  },
  {
    id: 'p11',
    name: 'Bahçelievler Spor',
    district: 'Bahçelievler',
    location: 'Yayla, Bahçelievler',
    distance: '9km',
    rating: 4.2,
    qualityBadge: 'C+',
    googleRating: 4.1,
    googleReviews: 300,
    pricePerPerson: 160,
    totalPrice: 2240,
    image: 'https://images.unsplash.com/photo-1510051640316-54084b11492e?auto=format&fit=crop&q=80&w=800',
    images: [stockImages[3], stockImages[5], stockImages[1], stockImages[2], stockImages[4]],
    amenities: ['Duş'],
    lighting: 76,
    grassQuality: 75,
    goalQuality: 78,
    coordinates: { lat: 55, lng: 25 }, // Bahçelievler
    slots: generateSlots()
  },
  {
    id: 'p12',
    name: 'Başakşehir Fatih Arena',
    district: 'Başakşehir',
    location: '4. Etap, Başakşehir',
    distance: '20km',
    rating: 4.5,
    qualityBadge: 'B+',
    googleRating: 4.4,
    googleReviews: 250,
    pricePerPerson: 200,
    totalPrice: 2800,
    image: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?auto=format&fit=crop&q=80&w=800',
    images: [stockImages[4], stockImages[0], stockImages[2], stockImages[3], stockImages[5]],
    amenities: amenitiesFull,
    lighting: 88,
    grassQuality: 86,
    goalQuality: 88,
    coordinates: { lat: 30, lng: 15 }, // Başakşehir
    slots: generateSlots()
  },
  {
    id: 'p13',
    name: 'Kartal Sahil Tesisleri',
    district: 'Kartal',
    location: 'Kordonboyu, Kartal',
    distance: '25km',
    rating: 4.3,
    qualityBadge: 'B',
    googleRating: 4.2,
    googleReviews: 550,
    pricePerPerson: 185,
    totalPrice: 2590,
    image: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&q=80&w=800',
    images: [stockImages[0], stockImages[1], stockImages[3], stockImages[4], stockImages[5]],
    amenities: ['Otopark', 'Kafe'],
    lighting: 84,
    grassQuality: 80,
    goalQuality: 82,
    coordinates: { lat: 75, lng: 80 }, // Kartal
    slots: generateSlots()
  },
  {
    id: 'p14',
    name: 'Pendik Vizyon Arena',
    district: 'Pendik',
    location: 'Güzelyalı, Pendik',
    distance: '28km',
    rating: 4.2,
    qualityBadge: 'B',
    googleRating: 4.1,
    googleReviews: 180,
    pricePerPerson: 175,
    totalPrice: 2450,
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800',
    images: [stockImages[1], stockImages[2], stockImages[4], stockImages[5], stockImages[0]],
    amenities: ['Duş', 'Otopark'],
    lighting: 80,
    grassQuality: 82,
    goalQuality: 80,
    coordinates: { lat: 80, lng: 85 }, // Pendik (En Doğu Güney)
    slots: generateSlots()
  },
  {
    id: 'p15',
    name: 'Esenyurt Meydan Saha',
    district: 'Esenyurt',
    location: 'Meydan, Esenyurt',
    distance: '30km',
    rating: 3.9,
    qualityBadge: 'C',
    googleRating: 3.8,
    googleReviews: 700,
    pricePerPerson: 140,
    totalPrice: 1960,
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&q=80&w=800',
    images: [stockImages[2], stockImages[3], stockImages[5], stockImages[0], stockImages[1]],
    amenities: [],
    lighting: 65,
    grassQuality: 68,
    goalQuality: 65,
    coordinates: { lat: 50, lng: 10 }, // Esenyurt
    slots: generateSlots()
  },
  {
    id: 'p16',
    name: 'Eyüp Sultan Arena',
    district: 'Eyüp',
    location: 'Haliç Kıyısı, Eyüp',
    distance: '6km',
    rating: 4.6,
    qualityBadge: 'B+',
    googleRating: 4.5,
    googleReviews: 440,
    pricePerPerson: 195,
    totalPrice: 2730,
    image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=800',
    images: [stockImages[3], stockImages[4], stockImages[0], stockImages[1], stockImages[2]],
    amenities: ['Otopark', 'Kafe', 'Mescit'],
    lighting: 87,
    grassQuality: 86,
    goalQuality: 88,
    coordinates: { lat: 30, lng: 40 }, // Eyüp
    slots: generateSlots()
  },
  {
    id: 'p17',
    name: 'Fatih Tarihi Saha',
    district: 'Fatih',
    location: 'Balat, Fatih',
    distance: '3km',
    rating: 4.4,
    qualityBadge: 'B',
    googleRating: 4.3,
    googleReviews: 220,
    pricePerPerson: 180,
    totalPrice: 2520,
    image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&q=80&w=800',
    images: [stockImages[4], stockImages[5], stockImages[1], stockImages[2], stockImages[3]],
    amenities: ['Duş'],
    lighting: 80,
    grassQuality: 82,
    goalQuality: 80,
    coordinates: { lat: 50, lng: 40 }, // Fatih
    slots: generateSlots()
  },
  {
    id: 'p18',
    name: 'Ümraniye Tepe Arena',
    district: 'Ümraniye',
    location: 'Ihlamurkuyu, Ümraniye',
    distance: '14km',
    rating: 4.5,
    qualityBadge: 'B+',
    googleRating: 4.4,
    googleReviews: 350,
    pricePerPerson: 190,
    totalPrice: 2660,
    image: 'https://images.unsplash.com/photo-1599474924187-334a4ae513ea?auto=format&fit=crop&q=80&w=800',
    images: [stockImages[5], stockImages[0], stockImages[2], stockImages[3], stockImages[4]],
    amenities: amenitiesFull,
    lighting: 86,
    grassQuality: 88,
    goalQuality: 85,
    coordinates: { lat: 45, lng: 70 }, // Ümraniye
    slots: generateSlots()
  },
  {
    id: 'p19',
    name: 'Kağıthane Merkez',
    district: 'Kağıthane',
    location: 'Cendere Yolu, Kağıthane',
    distance: '5km',
    rating: 4.2,
    qualityBadge: 'C+',
    googleRating: 4.1,
    googleReviews: 190,
    pricePerPerson: 170,
    totalPrice: 2380,
    image: 'https://images.unsplash.com/photo-1626015462861-1c390cb33f4a?auto=format&fit=crop&q=80&w=800',
    images: [stockImages[0], stockImages[1], stockImages[3], stockImages[4], stockImages[5]],
    amenities: ['Duş', 'Otopark'],
    lighting: 75,
    grassQuality: 78,
    goalQuality: 74,
    coordinates: { lat: 35, lng: 42 }, // Kağıthane
    slots: generateSlots()
  },
  {
    id: 'p20',
    name: 'Beylikdüzü Elit Arena',
    district: 'Beylikdüzü',
    location: 'Yaşam Vadisi, Beylikdüzü',
    distance: '35km',
    rating: 4.7,
    qualityBadge: 'A',
    googleRating: 4.6,
    googleReviews: 800,
    pricePerPerson: 210,
    totalPrice: 2940,
    image: 'https://images.unsplash.com/photo-1517137884378-2402964d86f3?auto=format&fit=crop&q=80&w=800',
    images: [stockImages[1], stockImages[2], stockImages[4], stockImages[5], stockImages[0]],
    amenities: amenitiesPro,
    lighting: 92,
    grassQuality: 91,
    goalQuality: 90,
    coordinates: { lat: 60, lng: 5 }, // Beylikdüzü (En Batı)
    slots: generateSlots()
  }
];

export const REFEREES: Referee[] = [
  {
    id: '1',
    name: 'Serkan Yılmaz',
    level: 'TFF Lisanslı',
    matchCount: 142,
    fee: 450,
    avatar: 'https://i.pravatar.cc/150?u=ref1',
    rating: 4.9,
    style: 'Disiplinli & Sert',
    bio: '10 yıllık profesyonel hakemlik tecrübesi. Maçın kontrolünü elde tutar, kurallardan taviz vermem. Adil yönetim benim için her şeyden önce gelir.',
    preferredZones: ['Beşiktaş', 'Şişli', 'Beyoğlu', 'Sarıyer'],
    stats: {
        avgCards: 2.1,
        varCallAccuracy: '98%',
        avgDistance: '9.2km'
    },
    reviews: [
        { id: 'r1', author: 'Kaptan Ahmet', rating: 5, comment: 'Maçı kontrol altında tuttu, kartlarında adildi.', date: '2 gün önce' },
        { id: 'r2', author: 'Veli S.', rating: 4, comment: 'Biraz fazla düdük çaldı ama adaletliydi.', date: '1 hafta önce' }
    ]
  },
  {
    id: '2',
    name: 'Metin Şahin',
    level: 'Bölgesel Hakem',
    matchCount: 89,
    fee: 350,
    avatar: 'https://i.pravatar.cc/150?u=ref2',
    rating: 4.6,
    style: 'Akıcı Oyun',
    bio: 'Oyunu sık sık durdurmayı sevmem, akıcı futboldan yanayım. Genç oyuncularla iletişimim kuvvetlidir.',
    preferredZones: ['Kadıköy', 'Üsküdar', 'Maltepe', 'Ataşehir'],
    stats: {
        avgCards: 0.8,
        varCallAccuracy: '85%',
        avgDistance: '7.8km'
    },
    reviews: [
        { id: 'r3', author: 'Caner K.', rating: 5, comment: 'Oyunu hiç durdurmadı, çok keyifli maç oldu.', date: '3 gün önce' }
    ]
  }
];

export const GOALKEEPERS: Goalkeeper[] = [
  {
    id: '1',
    name: 'Caner Kale',
    height: '1.88m',
    age: 24,
    rating: 4.9,
    fee: 250,
    avatar: 'https://i.pravatar.cc/150?u=gk1',
    recentAwards: 'Son 5 maçta 4 kez Maçın Adamı',
    style: 'Kedi Refleks',
    bio: 'Profesyonel altyapı eğitimi aldım. Çizgideki reflekslerime ve birebir pozisyonlara güvenirim. Maçı kazandıran kurtarışlar için buradayım.',
    preferredZones: ['Beşiktaş', 'Kağıthane', 'Fatih', 'Zeytinburnu'],
    stats: {
        savePercentage: '%92',
        cleanSheets: 14,
        penaltySaveRate: '4/5'
    },
    reviews: [
        { id: 'g1', author: 'Mehmet Y.', rating: 5, comment: 'İmkansız topları çıkardı, maçı bize kazandırdı.', date: 'Dün' },
        { id: 'g2', author: 'Ali K.', rating: 5, comment: 'Defansı çok iyi yönetiyor.', date: '1 hafta önce' }
    ]
  },
  {
    id: '2',
    name: 'Emre Koru',
    height: '1.92m',
    age: 28,
    rating: 4.7,
    fee: 200,
    avatar: 'https://i.pravatar.cc/150?u=gk2',
    recentAwards: 'Son 3 maç gol yemedi',
    style: 'Libero Kaleci',
    bio: 'Sadece kaleyi korumam, oyun kurarım. Ayaklarıma hakimim, defans arkasına atılan topları süpürürüm. Takımla konuşarak defansı yönetirim.',
    preferredZones: ['Bakırköy', 'Bahçelievler', 'Küçükçekmece', 'Avcılar'],
    stats: {
        savePercentage: '%85',
        cleanSheets: 8,
        penaltySaveRate: '2/6'
    },
    reviews: [
        { id: 'g3', author: 'Burak A.', rating: 4, comment: 'Ayakları çok iyi, oyun kurabiliyor.', date: '2 hafta önce' }
    ]
  }
];

export const MY_TEAM: Team = {
  id: 'team-1',
  name: 'Kara Kartallar FC',
  logo: '🦅',
  colors: ['#0A0E14', '#FFFF00'],
  wins: 12,
  losses: 4,
  playStyle: 'Hücumcu Büyücüler',
  roster: [
    { id: 'p1', name: 'Burak', avatar: 'https://i.pravatar.cc/150?u=burak', style: PlayerStyle.KING, rating: 9.2, position: 'FV', x: 50, y: 15 },
    { id: 'p2', name: 'Mert', avatar: 'https://i.pravatar.cc/150?u=mert', style: PlayerStyle.LOVER, rating: 8.5, position: 'SĞK', x: 80, y: 50 },
    { id: 'p3', name: 'Kaya', avatar: 'https://i.pravatar.cc/150?u=kaya', style: PlayerStyle.WARRIOR, rating: 8.8, position: 'STP', x: 30, y: 80 },
    { id: 'p4', name: 'Can', avatar: 'https://i.pravatar.cc/150?u=can', style: PlayerStyle.MAGE, rating: 9.0, position: 'OS', x: 50, y: 50 },
    { id: 'p5', name: 'Ali', avatar: 'https://i.pravatar.cc/150?u=ali', style: PlayerStyle.WARRIOR, rating: 8.1, position: 'STP', x: 70, y: 80 },
    { id: 'p6', name: 'Emre', avatar: 'https://i.pravatar.cc/150?u=emre', style: PlayerStyle.LOVER, rating: 8.4, position: 'SOLK', x: 20, y: 50 },
  ]
};

export const UPCOMING_JOBS: ServiceJob[] = [
  {
    id: 'j1',
    date: '24 Mart',
    time: '20:00 - 21:00',
    location: 'Beşiktaş',
    pitchName: 'Arena Sport Center',
    fee: 450,
    status: 'CONFIRMED'
  },
  {
    id: 'j2',
    date: '25 Mart',
    time: '19:00 - 20:00',
    location: 'Şişli',
    pitchName: 'Yıldız Park Saha',
    fee: 450,
    status: 'CONFIRMED'
  }
];

// MOCK DATA FOR OWNER PANEL
export const OWNER_TRANSACTIONS: Transaction[] = [
  { id: 't1', user: 'Ahmet Y.', date: 'Bugün, 14:30', amount: 220, type: 'BOOKING', status: 'COMPLETED' },
  { id: 't2', user: 'Mehmet K.', date: 'Bugün, 13:15', amount: 50, type: 'ADDON', status: 'COMPLETED' },
  { id: 't3', user: 'Veli S.', date: 'Dün, 22:00', amount: 3080, type: 'BOOKING', status: 'COMPLETED' },
  { id: 't4', user: 'Can B.', date: 'Dün, 21:30', amount: 220, type: 'BOOKING', status: 'PENDING' },
];

export const OWNER_REVIEWS: Review[] = [
  { id: 'r1', user: 'Ali T.', rating: 5, comment: 'Zemin harikaydı, personel çok ilgili.', date: '2 saat önce', metrics: { lighting: 5, grass: 5, goal: 5 } },
  { id: 'r2', user: 'Ayşe M.', rating: 3, comment: 'Işıklandırma yetersiz, kaleci önü çamur.', date: 'Dün', metrics: { lighting: 2, grass: 3, goal: 4 } },
  { id: 'r3', user: 'Burak Ö.', rating: 4, comment: 'Genel olarak iyi ama duşlar soğuktu.', date: '3 gün önce', metrics: { lighting: 4, grass: 4, goal: 4 } },
];

export const OWNER_INSIGHTS: BusinessInsight[] = [
  { id: 'i1', type: 'PRICING', title: 'Fiyatlandırma Taktikleri', description: 'Salı günleri 18:00 - 20:00 arası doluluğun düşük. Bu saatlere %15 indirim tanımlayarak doluluğu %20 artırabilirsin.', impact: 'Yüksek' },
  { id: 'i2', type: 'INVESTMENT', title: 'Yatırım Önerisi', description: "Son 10 yorumda 'Işıklandırma yetersiz' denmiş. Philips LED dönüşümü yaparsan müşteri memnuniyetin A+ seviyesine çıkabilir.", impact: 'Orta' },
  { id: 'i3', type: 'INVENTORY', title: 'Ekipman Fırsatı', description: 'Bölgendeki oyuncuların %40\'ı krampon kiralama arıyor. Stoklarına 42-44 numara krampon eklemelisin.', impact: 'Düşük' },
];

// MOCK DATA FOR SERVICE PROVIDER
export const OPEN_JOBS: JobListing[] = [
  {
    id: 'j1',
    type: 'REF',
    pitchName: 'Arena Sport Center',
    location: 'Beşiktaş, İstanbul',
    distance: '2.4 km',
    date: 'Bu Akşam',
    time: '21:00 - 22:00',
    offeredFee: 450,
    captainName: 'Ahmet Y.',
    teamName: 'Yıldızlar FC',
    minRating: 4.5,
    viewers: 12
  },
  {
    id: 'j2',
    type: 'GK',
    pitchName: 'Vadi Park',
    location: 'Şişli, İstanbul',
    distance: '4.1 km',
    date: 'Yarın',
    time: '20:00 - 21:00',
    offeredFee: 250,
    captainName: 'Mehmet K.',
    teamName: 'Fırtına Spor',
    minRating: 4.0,
    viewers: 5
  },
  {
    id: 'j3',
    type: 'REF',
    pitchName: 'Sahil Arena',
    location: 'Üsküdar, İstanbul',
    distance: '6.5 km',
    date: 'Cuma',
    time: '22:00 - 23:00',
    offeredFee: 500,
    captainName: 'Can B.',
    teamName: 'Atmaca Gücü',
    minRating: 4.8,
    viewers: 8
  }
];

export const INCOMING_BIDS: IncomingBid[] = [
  {
    id: 'b1',
    providerName: 'Serkan Yılmaz',
    role: 'REFEREE',
    rating: 4.9,
    matchCount: 142,
    bidAmount: 450,
    note: 'TFF Lisanslıyım, 20:30\'da sahada olurum.',
    avatar: 'https://i.pravatar.cc/150?u=ref1'
  },
  {
    id: 'b2',
    providerName: 'Caner Kale',
    role: 'GOALKEEPER',
    rating: 4.8,
    style: 'Kedi Refleks',
    bidAmount: 300,
    note: 'Eldivenlerim yeni, maçı almaya geliyorum.',
    avatar: 'https://i.pravatar.cc/150?u=gk1'
  },
  {
    id: 'b3',
    providerName: 'Ali Vefa',
    role: 'REFEREE',
    rating: 4.5,
    matchCount: 56,
    bidAmount: 400,
    note: 'Bölgesel hakemim, tecrübeliyim.',
    avatar: 'https://i.pravatar.cc/150?u=ref3'
  }
];

export const WALLET_HISTORY: WalletTransaction[] = [
  { id: 'w1', date: '22 Mart', description: 'Maç Geliri (Yıldızlar FC)', amount: 450, commission: 45, status: 'CLEARED' },
  { id: 'w2', date: '21 Mart', description: 'Maç Geliri (Atmaca Spor)', amount: 400, commission: 40, status: 'CLEARED' },
  { id: 'w3', date: '20 Mart', description: 'Para Çekme (IBAN)', amount: -800, commission: 0, status: 'CLEARED' },
  { id: 'w4', date: 'Bugün', description: 'Maç Geliri (Kartallar)', amount: 500, commission: 50, status: 'PENDING' },
];

export const MATCH_LISTINGS: MatchListing[] = [
  {
    id: 'm1',
    title: 'Acil 2 Defans Aranıyor!',
    location: 'Arena Beşiktaş',
    time: '21:00',
    date: 'Bu Akşam',
    price: 180,
    difficulty: 'Amatör',
    minRating: 4.0,
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=800',
    badges: ['Son 2 Yer', 'Yüksek Kalite'],
    missingPositions: [
      { role: 'Defans', count: 2 }
    ],
    slots: [
      { id: 's1', role: 'LB', x: 20, y: 70, status: 'OPEN' },
      { id: 's2', role: 'RB', x: 80, y: 70, status: 'OPEN' },
      { id: 's3', role: 'CM', x: 50, y: 50, status: 'TAKEN' },
      { id: 's4', role: 'GK', x: 50, y: 90, status: 'TAKEN' },
      { id: 's5', role: 'FW', x: 50, y: 20, status: 'TAKEN' }
    ]
  },
  {
    id: 'm2',
    title: 'Yıldızlar Maçı: 7v7',
    location: 'Kadıköy Park',
    time: '20:00',
    date: 'Yarın',
    price: 200,
    difficulty: 'Pro',
    minRating: 4.5,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
    badges: ['Kıran Kırana', 'Kamera Kaydı'],
    missingPositions: [
      { role: 'Orta Saha', count: 1 }
    ],
    slots: [
      { id: 's6', role: 'CM', x: 50, y: 50, status: 'OPEN' },
      { id: 's7', role: 'LB', x: 20, y: 70, status: 'TAKEN' },
      { id: 's8', role: 'RB', x: 80, y: 70, status: 'TAKEN' }
    ]
  },
  {
    id: 'm3',
    title: 'Haftasonu Eğlencesi',
    location: 'Florya Elit',
    time: '19:00',
    date: 'Cuma',
    price: 150,
    difficulty: 'Eğlence',
    minRating: 3.0,
    image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=800',
    badges: ['Keyif Maçı'],
    missingPositions: [
      { role: 'Forvet', count: 1 },
      { role: 'Kaleci', count: 1 }
    ],
    slots: [
      { id: 's9', role: 'GK', x: 50, y: 90, status: 'OPEN' },
      { id: 's10', role: 'FW', x: 50, y: 20, status: 'OPEN' }
    ]
  }
];
