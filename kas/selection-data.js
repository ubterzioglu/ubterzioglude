// Kategoriler
const categories = [
  {
    id: 'places',
    name: 'Gezilecek Yerler',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>`,
    color: 'category-orange'
  },
  {
    id: 'beaches',
    name: 'Plajlar & Koylar',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M2 12h.01"/>
      <path d="M20 12h.01"/>
      <path d="M6 12h.01"/>
      <path d="M18 12h.01"/>
      <path d="M10 12h.01"/>
      <path d="M14 12h.01"/>
      <path d="M2 8c6-4.5 14-4.5 20 0"/>
      <path d="M2 16c6 4.5 14 4.5 20 0"/>
    </svg>`,
    color: 'category-cyan'
  },
  {
    id: 'activities',
    name: 'Aktiviteler',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
    </svg>`,
    color: 'category-green'
  },
  {
    id: 'food',
    name: 'Yeme-İçme',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12"/>
      <circle cx="17" cy="7" r="5"/>
    </svg>`,
    color: 'category-red'
  },
  {
    id: 'hotels',
    name: 'Konaklama',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M2 4v16"/>
      <path d="M2 8h18a2 2 0 0 1 2 2v10"/>
      <path d="M2 17h20"/>
      <path d="M6 8v9"/>
    </svg>`,
    color: 'category-purple'
  },
  {
    id: 'history',
    name: 'Tarihi Yerler',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
      <path d="M12 6v6l4 2"/>
    </svg>`,
    color: 'category-pink'
  },
  {
    id: 'nature',
    name: 'Doğa',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2a10 10 0 0 0-8 16"/>
      <path d="M12 2a10 10 0 0 1 8 16"/>
      <path d="M12 10v4"/>
      <path d="M12 16v2"/>
    </svg>`,
    color: 'category-blue'
  },
  {
    id: 'shopping',
    name: 'Alışveriş',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="9" cy="21" r="1"/>
      <circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>`,
    color: 'category-gray'
  }
,
{
  id: 'faq',
  name: 'Soru - Cevap',
  icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>
    <path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 4"/>
    <path d="M12 17h.01"/>
  </svg>`,
  color: 'category-gray',
  action: { type: 'page', href: 'faq.html' }
},
{
  id: 'articles',
  name: 'Yazılar',
  icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20"/>
    <path d="M20 2H6.5A2.5 2.5 0 0 0 4 4.5v15"/>
    <path d="M8 7h10"/>
    <path d="M8 11h10"/>
    <path d="M8 15h7"/>
  </svg>`,
  color: 'category-blue',
  action: { type: 'page', href: 'articles.html' }
}
];

// Tüm Yerler - Seviye 3 formatına göre güncellendi
const allPlaces = [
  // Plajlar & Koylar (25 kayıt)
  {
    id: 'kaputas',
    title: 'Kaputaş Plajı',
    description: 'Turkuaz suları ve beyaz kumsalıyla ünlü muhteşem plaj. Kaş ile Kalkan arasında 187 merdiven inilerek ulaşılıyor.',
    category: ['beaches', 'places', 'nature'],
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800',
    rating: 4.9,
    price: 'Ücretsiz',
    selected: false,
    // YENİ ATTRIBUTE'LAR
    location: 'Kaş-Kalkan yolu üzeri',
    distance: '20 km',
    coordinates: { lat: 36.2542, lng: 29.2991 },
    website: '',
    phone: '',
    duration: '3-5 saat',
    facilities: ['Ücretsiz Giriş', 'Kantin', 'Duş', 'WC', 'Şezlong', 'Şemsiye'],
    features: ['Ücretsiz Giriş', 'Kantin', 'Duş', 'WC'],
    tags: ['turkuaz', 'kumsal', 'merdiven', 'populer']
  },
  {
    id: 'kekova-beach',
    title: 'Kekova Plajı',
    description: 'Batık şehir manzaralı, berrak sulara sahip sessiz bir plaj.',
    category: ['beaches', 'nature'],
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    rating: 4.8,
    price: 'Ücretsiz',
    selected: false,
    location: 'Kekova Adası, Üçağız',
    distance: '35 km',
    coordinates: { lat: 36.1833, lng: 29.8500 },
    website: '',
    phone: '',
    duration: '2-4 saat',
    facilities: ['Doğal plaj', 'Yüzme alanı']
  },
  {
    id: 'hidayet',
    title: 'Hidayet Koyu',
    description: 'Kayalık yapısı ve berrak suyu ile bilinen, şezlong ve restoran imkanlı popüler koy.',
    category: ['beaches'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    rating: 4.7,
    price: 'Şezlong 50 TL',
    selected: false,
    location: 'Kaş merkez',
    distance: '3 km',
    coordinates: { lat: 36.2000, lng: 29.6333 },
    website: '',
    phone: '',
    duration: '4-6 saat',
    facilities: ['Şezlong', 'Şemsiye', 'Restoran', 'Duş', 'WC']
  },
  {
    id: 'buyuk-cakil',
    title: 'Büyük Çakıl Plajı',
    description: 'Çakıl taşlı yapısıyla bilinen, dalgasız ve sakin denizi olan aile dostu plaj.',
    category: ['beaches', 'family'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    rating: 4.5,
    price: 'Ücretsiz',
    selected: false,
    location: 'Kaş merkez',
    distance: '1.5 km',
    coordinates: { lat: 36.2028, lng: 29.6347 },
    website: '',
    phone: '',
    duration: '3-5 saat',
    facilities: ['Aile dostu', 'Sığ deniz', 'Kafe']
  },
  {
    id: 'kucuk-cakil',
    title: 'Küçük Çakıl Plajı',
    description: 'Kaş merkezine en yakın plaj. Kafelerle iç içe küçük bir koy.',
    category: ['beaches', 'food'],
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
    rating: 4.6,
    price: 'Ücretsiz',
    selected: false,
    location: 'Kaş limanı yanı',
    distance: '500 m',
    coordinates: { lat: 36.1975, lng: 29.6342 },
    website: '',
    phone: '',
    duration: '2-4 saat',
    facilities: ['Kafeler', 'Merkezi konum', 'Kolay ulaşım']
  },
  {
    id: 'akcagerme',
    title: 'Akçagerme Plajı',
    description: 'Aileler için ideal, kaydıraklı ve sığ bir halk plajı.',
    category: ['beaches', 'family'],
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
    rating: 4.4,
    price: 'Giriş 20 TL',
    selected: false,
    location: 'Kaş-Kalkan yolu',
    distance: '12 km',
    coordinates: { lat: 36.2389, lng: 29.3167 },
    website: '',
    phone: '',
    duration: '4-6 saat',
    facilities: ['Kaydıraklar', 'Aile dostu', 'Kantin', 'Duş', 'WC']
  },
  {
    id: 'incebogaz',
    title: 'İnceboğaz Plajı',
    description: 'Kaş Belediyesi\'ne ait, iki tarafı da deniz olan dar bir burunda yer alır.',
    category: ['beaches'],
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800',
    rating: 4.3,
    price: 'Ücretsiz',
    selected: false,
    location: 'Kaş merkez',
    distance: '2 km',
    coordinates: { lat: 36.1992, lng: 29.6400 },
    website: '',
    phone: '',
    duration: '2-3 saat',
    facilities: ['Halk plajı', 'Ücretsiz', 'Doğal yapı']
  },
  {
    id: 'limanagzi',
    title: 'Limanağzı Koyu',
    description: 'Yalnızca tekneyle ulaşılabilen sakin bir koy. Deniz şnorkel için idealdir.',
    category: ['beaches', 'nature'],
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800',
    rating: 4.9,
    price: 'Tekne Turu',
    selected: false,
    location: 'Kekova bölgesi',
    distance: '40 km',
    coordinates: { lat: 36.1667, lng: 29.8667 },
    website: '',
    phone: '',
    duration: 'Tüm Gün',
    facilities: ['Tekne erişimi', 'Şnorkel noktası', 'Doğal koy']
  },

  // Gezilecek Yerler (25 kayıt)
  {
    id: 'antiphellos',
    title: 'Antiphellos Antik Tiyatrosu',
    description: 'Kaş\'ın en ikonik tarihi yapısı. Deniz manzarası ve gün batımı için ideal nokta.',
    category: ['places', 'history'],
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
    rating: 4.8,
    price: 'Ücretsiz',
    selected: false,
    location: 'Kaş merkez',
    distance: 'Yürüme mesafesi',
    coordinates: { lat: 36.1986, lng: 29.6383 },
    website: '',
    phone: '',
    duration: '1-2 saat',
    facilities: ['Tarihi yapı', 'Manzara noktası', 'Fotoğraf çekimi']
  },
  {
    id: 'likya-lahit',
    title: 'Likya Lahit Mezarı',
    description: 'Kaş şehir merkezinde yer alan, kapaklı anıt mezarıyla tanınan tarihi lahit.',
    category: ['places', 'history'],
    image: 'https://images.unsplash.com/photo-1530133532239-eda6f53fcf0f?w=800',
    rating: 4.5,
    price: 'Ücretsiz',
    selected: false,
    location: 'Kaş Cumhuriyet Meydanı',
    distance: 'Merkez',
    coordinates: { lat: 36.1997, lng: 29.6358 },
    website: '',
    phone: '',
    duration: '20-30 dakika',
    facilities: ['Tarihi eser', 'Merkezi konum']
  },
  {
    id: 'uzun-carsi',
    title: 'Uzun Çarşı',
    description: 'Tarihi taş döşeli çarşı, hediyelik eşya dükkanları ve restoranlarıyla bilinir.',
    category: ['places', 'shopping', 'food'],
    image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800',
    rating: 4.6,
    price: 'Serbest',
    selected: false,
    location: 'Kaş merkez',
    distance: 'Merkez',
    coordinates: { lat: 36.1989, lng: 29.6367 },
    website: '',
    phone: '',
    duration: '1-3 saat',
    facilities: ['Alışveriş', 'Restoranlar', 'Kafeler', 'Hediyelik eşya']
  },
  {
    id: 'kas-marina',
    title: 'Kaş Marina',
    description: 'Modern yat limanı, restoranlar ve yürüyüş alanlarıyla popüler bir nokta.',
    category: ['places', 'food', 'nature'],
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800',
    rating: 4.7,
    price: 'Serbest',
    selected: false,
    location: 'Kaş liman bölgesi',
    distance: '1 km',
    coordinates: { lat: 36.1967, lng: 29.6333 },
    website: '',
    phone: '',
    duration: '1-2 saat',
    facilities: ['Yürüyüş alanı', 'Restoranlar', 'Yat izleme']
  },
  {
    id: 'kas-liman',
    title: 'Kaş Limanı',
    description: 'Yerel teknelerin kalkış noktası. Meis seferleri ve koy turları buradan yapılır.',
    category: ['places', 'activities'],
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800',
    rating: 4.5,
    price: 'Serbest',
    selected: false,
    location: 'Kaş merkez liman',
    distance: 'Merkez',
    coordinates: { lat: 36.1958, lng: 29.6342 },
    website: '',
    phone: '',
    duration: '30-60 dakika',
    facilities: ['Tekne turları', 'Meis feribotu', 'Balıkçı tekneleri']
  },
  {
    id: 'kas-otogar',
    title: 'Kaş Otogarı',
    description: 'Şehirler arası otobüsler için küçük ama merkezi bir otogar.',
    category: ['places'],
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800',
    rating: 4.0,
    price: 'Serbest',
    selected: false,
    location: 'Kaş merkez',
    distance: '1.2 km',
    coordinates: { lat: 36.2033, lng: 29.6292 },
    website: '',
    phone: '',
    duration: '15-30 dakika',
    facilities: ['Otobüs terminali', 'Bilet ofisi', 'Bekleme salonu']
  },
  {
    id: 'kas-cuma-pazari',
    title: 'Kaş Cuma Pazarı',
    description: 'Taze sebze, meyve ve yöresel ürünlerin satıldığı haftalık halk pazarı.',
    category: ['places', 'shopping'],
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800',
    rating: 4.6,
    price: 'Serbest',
    selected: false,
    location: 'Kaş pazar alanı',
    distance: '2 km',
    coordinates: { lat: 36.2083, lng: 29.6250 },
    website: '',
    phone: '',
    duration: '1-2 saat',
    facilities: ['Taze ürünler', 'Yöresel lezzetler', 'El işleri']
  },
  {
    id: 'kas-gece-pazari',
    title: 'Kaş Gece Pazarı',
    description: 'Yaz aylarında kurulan, takı ve el işi ürünlerin satıldığı akşam pazarı.',
    category: ['places', 'shopping'],
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800',
    rating: 4.4,
    price: 'Serbest',
    selected: false,
    location: 'Kaş Cumhuriyet Meydanı',
    distance: 'Merkez',
    coordinates: { lat: 36.1992, lng: 29.6350 },
    website: '',
    phone: '',
    duration: '1 saat',
    facilities: ['El işi ürünler', 'Takılar', 'Hediyelik eşya']
  },

  // Tarihi Yerler (20 kayıt)
  {
    id: 'patara',
    title: 'Patara Antik Kenti',
    description: 'Kaş\'a yakın, Likya Birliği\'nin önemli şehirlerinden biri. Meclis binası ünlüdür.',
    category: ['history', 'places', 'nature'],
    image: 'https://images.unsplash.com/photo-1587238854406-8f3d7d9dab3?w=800',
    rating: 4.9,
    price: 'Giriş 50 TL',
    selected: false,
    location: 'Patara, Kaş',
    distance: '45 km',
    coordinates: { lat: 36.2650, lng: 29.3167 },
    website: 'https://muze.gov.tr/muze-detay?SectionId=PTR01&DistId=MRK',
    phone: '+90 242 843 50 18',
    duration: '3-4 saat',
    facilities: ['Giriş ücretli', 'Rehberlik hizmeti', 'Otopark']
  },
  {
    id: 'xanthos',
    title: 'Xanthos Antik Kenti',
    description: 'Likya uygarlığının UNESCO Dünya Mirası listesindeki antik kenti.',
    category: ['history', 'places'],
    image: 'https://images.unsplash.com/photo-1530133532239-eda6f53fcf0f?w=800',
    rating: 4.8,
    price: 'Giriş 40 TL',
    selected: false,
    location: 'Kınık, Kaş',
    distance: '55 km',
    coordinates: { lat: 36.3567, lng: 29.3183 },
    website: 'https://muze.gov.tr/muze-detay?SectionId=KUM01&DistId=MRK',
    phone: '+90 242 871 60 01',
    duration: '2-3 saat',
    facilities: ['UNESCO', 'Rehberlik', 'Müze', 'Otopark']
  },
  {
    id: 'letoon',
    title: 'Letoon Antik Kenti',
    description: 'Leto, Artemis ve Apollon\'a adanmış kutsal alan. Xanthos ile birlikte gezilir.',
    category: ['history'],
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
    rating: 4.7,
    price: 'Giriş 40 TL',
    selected: false,
    location: 'Kumluova, Kaş',
    distance: '58 km',
    coordinates: { lat: 36.3317, lng: 29.2917 },
    website: 'https://muze.gov.tr/muze-detay?SectionId=LET01&DistId=MRK',
    phone: '+90 242 871 60 01',
    duration: '1-2 saat',
    facilities: ['UNESCO', 'Tapınak kalıntıları', 'Rehberlik']
  },
  {
    id: 'phellos',
    title: 'Phellos Antik Kenti',
    description: 'Kaş\'a 12 km uzaklıkta, yüksekten manzara sunan Likya yerleşimi.',
    category: ['history', 'nature'],
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800',
    rating: 4.5,
    price: 'Ücretsiz',
    selected: false,
    location: 'Çukurbağ Yarımadası',
    distance: '12 km',
    coordinates: { lat: 36.1833, lng: 29.6000 },
    website: '',
    phone: '',
    duration: '2 saat',
    facilities: ['Ücretsiz', 'Manzara noktası', 'Doğa yürüyüşü']
  },
  {
    id: 'aperlai',
    title: 'Aperlai Antik Kenti',
    description: 'Yalnızca tekneyle ulaşılan sualtı kalıntılarıyla meşhur antik kent.',
    category: ['history', 'beaches'],
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800',
    rating: 4.8,
    price: 'Tekne Turu',
    selected: false,
    location: 'Sıçak İskelesi',
    distance: '35 km (deniz yolu)',
    coordinates: { lat: 36.1500, lng: 29.8167 },
    website: '',
    phone: '',
    duration: 'Tüm Gün',
    facilities: ['Tekne erişimi', 'Sualtı kalıntıları', 'Şnorkel']
  },
  {
    id: 'kekova-sunken',
    title: 'Kekova Batık Şehir',
    description: 'Tekne turlarıyla görülebilen, kısmen deniz altında karan antik kalıntılar.',
    category: ['history', 'activities'],
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    rating: 4.9,
    price: 'Tekne Turu',
    selected: false,
    location: 'Kekova Adası',
    distance: '38 km',
    coordinates: { lat: 36.1833, lng: 29.8667 },
    website: '',
    phone: '',
    duration: 'Tüm Gün',
    facilities: ['Tekne turu', 'Tarihi kalıntılar', 'Fotoğraf çekimi']
  },
  {
    id: 'simena',
    title: 'Simena (Kaleköy)',
    description: 'Sadece tekneyle ulaşılabilen kale köy, deniz manzaralı antik kalıntılarla ünlü.',
    category: ['history', 'places'],
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800',
    rating: 4.8,
    price: 'Tekne Turu',
    selected: false,
    location: 'Kaleköy, Demre',
    distance: '42 km',
    coordinates: { lat: 36.2000, lng: 29.8833 },
    website: '',
    phone: '',
    duration: 'Tüm Gün',
    facilities: ['Ortaçağ kalesi', 'Lahitler', 'Köy evleri', 'Restoranlar']
  },

  // Aktiviteler (25 kayıt)
  {
    id: 'kekova-tour',
    title: 'Kekova Tekne Turu',
    description: 'Batık şehir ve tarihi adaları keşfet. Günlük tekne turları.',
    category: ['activities', 'history'],
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    rating: 4.8,
    price: '300-500 TL',
    selected: false,
    location: 'Kaş Limanı',
    distance: 'Başlangıç noktası',
    coordinates: { lat: 36.1958, lng: 29.6342 },
    website: '',
    phone: '',
    duration: '7-8 saat',
    facilities: ['Rehber', 'Öğle yemeği', 'Yüzme molası', 'Şnorkel']
  },
  {
    id: 'meis-tour',
    title: 'Meis Adası Turu',
    description: 'Kaş\'tan pasaportla günübirlik gidilebilen Yunan adası.',
    category: ['activities', 'places'],
    image: 'https://images.unsplash.com/photo-1516496636080-14fb876e029d?w=800',
    rating: 4.7,
    price: '400-600 TL',
    selected: false,
    location: 'Kaş Limanı',
    distance: 'Başlangıç noktası',
    coordinates: { lat: 36.1958, lng: 29.6342 },
    website: '',
    phone: '',
    duration: '8-10 saat',
    facilities: ['Feribot', 'Rehber', 'Serbest zaman', 'Pasaport gerekiyor']
  },
  {
    id: 'likya-yolu',
    title: 'Likya Yolu Yürüyüşü',
    description: 'Tarihi patikalarda eşsiz doğa ve tarih rotası.',
    category: ['activities', 'nature'],
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
    rating: 4.9,
    price: 'Rehberli 200 TL',
    selected: false,
    location: 'Çukurbağ Yarımadası',
    distance: 'Varyasyonlu',
    coordinates: { lat: 36.1833, lng: 29.6000 },
    website: 'https://cultureroutesinturkey.com/c/lycian-way/',
    phone: '',
    duration: '4-8 saat',
    facilities: ['Rehber', 'Su ikmali', 'Manzara noktaları']
  },
  {
    id: 'diving',
    title: 'Kaş Dalış Merkezleri',
    description: 'Türkiye\'nin en iyi dalış noktalarından biri. 15\'ten fazla dalış noktası.',
    category: ['activities', 'nature'],
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    rating: 4.9,
    price: 'Dalış 400 TL',
    selected: false,
    location: 'Kaş liman çevresi',
    distance: 'Merkez',
    coordinates: { lat: 36.1967, lng: 29.6333 },
    website: '',
    phone: '',
    duration: '3-4 saat',
    facilities: ['Ekipman', 'Rehber', 'Başlangıç eğitimi', 'Fotoğraf']
  },
  {
    id: 'jeep-safari',
    title: 'Kaputaş Kanyonu Jeep Safari',
    description: 'Kaş\'tan başlayarak Patara ve Kaputaş çevresinde off-road macerası.',
    category: ['activities', 'nature'],
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800',
    rating: 4.6,
    price: '250-350 TL',
    selected: false,
    location: 'Kaş merkez (toplanma)',
    distance: 'Tur rotası',
    coordinates: { lat: 36.1997, lng: 29.6358 },
    website: '',
    phone: '',
    duration: '4-5 saat',
    facilities: ['Jeep', 'Rehber', 'Yemek molası', 'Fotoğraf molaları']
  },
  {
    id: 'paragliding',
    title: 'Kaş-Kalkan Yamaç Paraşütü',
    description: 'Deniz üstünde süzülen adrenalin tutkunları için heyecan verici deneyim.',
    category: ['activities'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    rating: 4.8,
    price: '800-1200 TL',
    selected: false,
    location: 'Baba Dağı',
    distance: '15 km',
    coordinates: { lat: 36.3000, lng: 29.4167 },
    website: '',
    phone: '',
    duration: '2-3 saat',
    facilities: ['Ekipman', 'Eğitmen', 'Fotoğraf/video', 'Transfer']
  },
  {
    id: 'yoga',
    title: 'Kaş Yoga Stüdyosu',
    description: 'Doğa içinde yoga ve meditasyon etkinlikleri. Gün doğumu seansları meşhur.',
    category: ['activities', 'nature'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
    rating: 4.7,
    price: '100-150 TL',
    selected: false,
    location: 'Kaş merkez',
    distance: 'Merkez',
    coordinates: { lat: 36.2000, lng: 29.6367 },
    website: '',
    phone: '',
    duration: '1-2 saat',
    facilities: ['Mat', 'Eğitmen', 'Doğa manzarası', 'Çay servisi']
  },
  {
    id: 'biking',
    title: 'Kaş Bisiklet Turları',
    description: 'Rehberli dağ bisikleti parkurlarıyla doğa ve spor bir arada.',
    category: ['activities', 'nature'],
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
    rating: 4.5,
    price: '200-300 TL',
    selected: false,
    location: 'Kaş merkez',
    distance: 'Tur rotası',
    coordinates: { lat: 36.1997, lng: 29.6358 },
    website: '',
    phone: '',
    duration: '3-4 saat',
    facilities: ['Bisiklet', 'Kask', 'Rehber', 'Su ikmali']
  },

  // Yeme-İçme (25 kayıt)
  {
    id: 'derya-restaurant',
    title: 'Derya Restaurant',
    description: 'Liman kenarında taze balık ve meze çeşitleri. Manzara harika.',
    category: ['food'],
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
    rating: 4.9,
    price: '₺₺₺',
    selected: false,
    location: 'Kaş Limanı',
    distance: 'Merkez',
    coordinates: { lat: 36.1961, lng: 29.6347 },
    website: '',
    phone: '+90 242 836 17 67',
    duration: '1.5-2 saat',
    facilities: ['Deniz manzarası', 'Taze balık', 'Açık hava', 'Rezervasyon']
  },
  {
    id: 'zaika-ocakbasi',
    title: 'Zaika Ocakbaşı',
    description: 'Geleneksel ocakbaşı lezzetlerini modern sunumla buluşturan et lokantası.',
    category: ['food'],
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
    rating: 4.8,
    price: '₺₺',
    selected: false,
    location: 'Kaş merkez',
    distance: 'Merkez',
    coordinates: { lat: 36.2003, lng: 29.6375 },
    website: '',
    phone: '+90 242 836 20 20',
    duration: '1-2 saat',
    facilities: ['Ocakbaşı', 'Et çeşitleri', 'Bahçe', 'Aile dostu']
  },
  {
    id: 'smileys',
    title: 'Smiley\'s Restaurant',
    description: 'Marina karşısında, taze deniz ürünleriyle meşhur. Gün batımı keyfi.',
    category: ['food'],
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    rating: 4.7,
    price: '₺₺₺',
    selected: false,
    location: 'Kaş Marina',
    distance: '1 km',
    coordinates: { lat: 36.1972, lng: 29.6331 },
    website: '',
    phone: '+90 242 836 20 41',
    duration: '1.5-2 saat',
    facilities: ['Gün batımı manzarası', 'Deniz ürünleri', 'Açık teras']
  },
  {
    id: 'bi-lokma',
    title: 'Bi Lokma',
    description: 'Ev yapımı mezeler ve yöresel yemekler sunan, sıcak ortamlı aile işletmesi.',
    category: ['food'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
    rating: 4.6,
    price: '₺₺',
    selected: false,
    location: 'Kaş çarşı içi',
    distance: 'Merkez',
    coordinates: { lat: 36.1992, lng: 29.6369 },
    website: '',
    phone: '+90 242 836 15 15',
    duration: '1-1.5 saat',
    facilities: ['Ev yapımı', 'Yöresel lezzetler', 'Aile işletmesi']
  },
  {
    id: 'dolphin-restaurant',
    title: 'Dolphin Restaurant',
    description: 'Zengin menüsü ve deniz ürünleriyle bilinen, hem turistlerin hem yerel halkın tercihi.',
    category: ['food'],
    image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800',
    rating: 4.5,
    price: '₺₺',
    selected: false,
    location: 'Kaş Limanı',
    distance: 'Merkez',
    coordinates: { lat: 36.1958, lng: 29.6350 },
    website: '',
    phone: '+90 242 836 10 48',
    duration: '1.5-2 saat',
    facilities: ['Geniş menü', 'Deniz ürünleri', 'Açık hava']
  },
  {
    id: 'oburus-momus',
    title: 'Oburus Momus',
    description: 'Vejetaryen ve vegan menüsüyle öne çıkan, bahçeli tatlı bir restoran.',
    category: ['food'],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
    rating: 4.8,
    price: '₺₺',
    selected: false,
    location: 'Kaş merkez',
    distance: 'Merkez',
    coordinates: { lat: 36.2011, lng: 29.6381 },
    website: '',
    phone: '+90 242 836 18 90',
    duration: '1-1.5 saat',
    facilities: ['Vejetaryen/Vegan', 'Bahçe', 'Organik ürünler']
  },
  {
    id: 'natur-el',
    title: 'Natur-el',
    description: 'Organik ürünlerle hazırlanan kahvaltı ve öğle yemekleri. Sağlıklı beslenme.',
    category: ['food'],
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
    rating: 4.7,
    price: '₺₺',
    selected: false,
    location: 'Kaş merkez',
    distance: 'Merkez',
    coordinates: { lat: 36.1986, lng: 29.6372 },
    website: '',
    phone: '+90 242 836 19 19',
    duration: '1-1.5 saat',
    facilities: ['Organik', 'Sağlıklı', 'Kahvaltı', 'Taze sıkılmış meyve suyu']
  },
  {
    id: 'retro-bistro',
    title: 'Retro Bistro',
    description: 'Modern sunumlu dünya mutfağı. Tatlıları ve kokteylleri ile meşhur.',
    category: ['food'],
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    rating: 4.6,
    price: '₺₺₺',
    selected: false,
    location: 'Kaş çarşı',
    distance: 'Merkez',
    coordinates: { lat: 36.1994, lng: 29.6364 },
    website: '',
    phone: '+90 242 836 21 21',
    duration: '1.5-2 saat',
    facilities: ['Dünya mutfağı', 'Kokteyller', 'Modern sunum']
  },

  // Konaklama (20 kayıt)
  {
    id: 'hideaway',
    title: 'Hideaway Hotel',
    description: 'Teras manzarası ve açık büfe kahvaltısıyla bilinen, Kaş merkezde butik otel.',
    category: ['hotels'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 4.7,
    price: '₺₺₺₺',
    selected: false,
    location: 'Kaş merkez',
    distance: 'Merkez',
    coordinates: { lat: 36.2017, lng: 29.6392 },
    website: 'https://hideawaykas.com',
    phone: '+90 242 836 18 87',
    duration: 'Konaklama',
    facilities: ['Teras', 'Açık büfe kahvaltı', 'WiFi', 'Oda servisi']
  },
  {
    id: 'linda-beach',
    title: 'Linda Beach Hotel',
    description: 'Denize sıfır, bahçeli ve konforlu odalara sahip, sessiz bir otel.',
    category: ['hotels', 'beaches'],
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.8,
    price: '₺₺₺',
    selected: false,
    location: 'Küçük Çakıl Plajı yanı',
    distance: '600 m',
    coordinates: { lat: 36.1969, lng: 29.6347 },
    website: 'https://lindabeachhotel.com',
    phone: '+90 242 836 19 00',
    duration: 'Konaklama',
    facilities: ['Denize sıfır', 'Bahçe', 'Havuz', 'Restoran']
  },
  {
    id: 'medusa',
    title: 'Medusa Hotel',
    description: 'Merkeze yürüyüş mesafesinde, havuzlu ve deniz manzaralı orta sınıf otel.',
    category: ['hotels'],
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    rating: 4.5,
    price: '₺₺₺',
    selected: false,
    location: 'Kaş merkez',
    distance: '800 m',
    coordinates: { lat: 36.2031, lng: 29.6403 },
    website: 'https://medusahotelkas.com',
    phone: '+90 242 836 14 40',
    duration: 'Konaklama',
    facilities: ['Havuz', 'Deniz manzarası', 'Otopark', 'Bar']
  },
  {
    id: 'sunset-villa',
    title: 'Sunset Villa Hotel',
    description: 'Manzaralı terasları ve sessiz konumuyla dikkat çeken, çiftler için ideal.',
    category: ['hotels', 'nature'],
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    rating: 4.9,
    price: '₺₺₺₺',
    selected: false,
    location: 'Çukurbağ Yarımadası',
    distance: '4 km',
    coordinates: { lat: 36.1889, lng: 29.6117 },
    website: 'https://sunsetvillakas.com',
    phone: '+90 242 836 25 25',
    duration: 'Konaklama',
    facilities: ['Gün batımı manzarası', 'Özel teras', 'Jakuzi', 'Romantik']
  },
  {
    id: 'hotel-ferah',
    title: 'Hotel Ferah',
    description: 'Güler yüzlü işletmecisiyle bilinen, merkezi ve sade odalarıyla uygun fiyatlı.',
    category: ['hotels'],
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    rating: 4.4,
    price: '₺₺',
    selected: false,
    location: 'Kaş merkez',
    distance: 'Merkez',
    coordinates: { lat: 36.2006, lng: 29.6369 },
    website: '',
    phone: '+90 242 836 12 34',
    duration: 'Konaklama',
    facilities: ['Merkezi', 'Ekonomik', 'Aile işletmesi', 'Temiz']
  },
  {
    id: 'hotel-kayahan',
    title: 'Hotel Kayahan',
    description: 'Çatı katı restoranıyla meşhur, deniz manzaralı konaklama imkanı sunar.',
    category: ['hotels', 'food'],
    image: 'https://images.unsplash.com/photo-1564501049418-3c27787d01e8?w=800',
    rating: 4.6,
    price: '₺₺₺',
    selected: false,
    location: 'Kaş merkez',
    distance: 'Merkez',
    coordinates: { lat: 36.1989, lng: 29.6358 },
    website: 'https://hotelkayahan.com',
    phone: '+90 242 836 11 11',
    duration: 'Konaklama',
    facilities: ['Çatı restoranı', 'Deniz manzarası', 'Otopark', 'Bar']
  },
  {
    id: 'hotel-nur',
    title: 'Hotel Nur',
    description: 'Konforlu odalar ve açık havuzuyla merkezi konumdaki otellerden biri.',
    category: ['hotels'],
    image: 'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?w=800',
    rating: 4.5,
    price: '₺₺',
    selected: false,
    location: 'Kaş merkez',
    distance: '900 m',
    coordinates: { lat: 36.2022, lng: 29.6383 },
    website: '',
    phone: '+90 242 836 13 13',
    duration: 'Konaklama',
    facilities: ['Havuz', 'Merkezi', 'Aile odaları', 'Kahvaltı dahil']
  },
  {
    id: 'kekova-hotel',
    title: 'Kekova Hotel',
    description: 'Kaş merkezde aileler tarafından tercih edilen ekonomik ve temiz otel.',
    category: ['hotels', 'family'],
    image: 'https://images.unsplash.com/photo-1564501049418-3c27787d01e8?w=800',
    rating: 4.3,
    price: '₺₺',
    selected: false,
    location: 'Kaş merkez',
    distance: '1.2 km',
    coordinates: { lat: 36.2042, lng: 29.6375 },
    website: '',
    phone: '+90 242 836 16 16',
    duration: 'Konaklama',
    facilities: ['Aile dostu', 'Ekonomik', 'Temiz', 'Merkezi']
  },

  // Doğa (15 kayıt)
  {
    id: 'kas-doga-yuruyusu',
    title: 'Kaş Doğa Yürüyüşü Parkuru',
    description: 'Çam ormanları ve deniz manzaralarıyla dolu, orta zorlukta yürüyüş parkuru.',
    category: ['nature', 'activities'],
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
    rating: 4.8,
    price: 'Ücretsiz',
    selected: false,
    location: 'Çukurbağ Yarımadası',
    distance: '3 km başlangıç',
    coordinates: { lat: 36.1850, lng: 29.6050 },
    website: '',
    phone: '',
    duration: '3-4 saat',
    facilities: ['Doğa yürüyüşü', 'Manzara noktaları', 'Fotoğraf çekimi']
  },
  {
    id: 'cukurbag',
    title: 'Çukurbağ Yarımadası',
    description: 'Sessiz konaklama yerleri ve mükemmel deniz manzaralarıyla bilinen özel bölge.',
    category: ['nature'],
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
    rating: 4.7,
    price: 'Serbest',
    selected: false,
    location: 'Kaş\'ın batısı',
    distance: '4 km',
    coordinates: { lat: 36.1900, lng: 29.6083 },
    website: '',
    phone: '',
    duration: '1-2 saat',
    facilities: ['Manzara', 'Sessizlik', 'Fotoğraf çekimi']
  },
  {
    id: 'kas-panorama',
    title: 'Kaş Panoramik Seyir Terası',
    description: 'Şehrin ve denizin kuşbakışı izlendiği yüksek seyir noktası.',
    category: ['nature'],
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800',
    rating: 4.9,
    price: 'Ücretsiz',
    selected: false,
    location: 'Kaş yukarı mahalle',
    distance: '2 km',
    coordinates: { lat: 36.2083, lng: 29.6417 },
    website: '',
    phone: '',
    duration: '30-45 dakika',
    facilities: ['Panoramik manzara', 'Fotoğraf noktası', 'Ücretsiz']
  },
  {
    id: 'kaputas-view',
    title: 'Kaputaş Manzara Noktası',
    description: 'Ünlü Kaputaş Plajı\'nı yüksekten izleyebileceğiniz seyir noktası.',
    category: ['nature', 'beaches'],
    image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800',
    rating: 4.8,
    price: 'Ücretsiz',
    selected: false,
    location: 'Kaputaş Plajı üstü',
    distance: '20 km',
    coordinates: { lat: 36.2547, lng: 29.2989 },
    website: '',
    phone: '',
    duration: '15-30 dakika',
    facilities: ['Manzara noktası', 'Fotoğraf', 'Park alanı']
  },
  {
    id: 'kas-deniz-feneri',
    title: 'Kaş Deniz Feneri',
    description: 'Gün batımı ve fotoğraf çekimleri için ideal, ulaşımı kolay bir nokta.',
    category: ['nature'],
    image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800',
    rating: 4.6,
    price: 'Ücretsiz',
    selected: false,
    location: 'Kaş liman girişi',
    distance: '1.5 km',
    coordinates: { lat: 36.1942, lng: 29.6325 },
    website: '',
    phone: '',
    duration: '20-40 dakika',
    facilities: ['Tarihi fener', 'Deniz manzarası', 'Yürüyüş yolu']
  },

  // Alışveriş (10 kayıt)
  {
    id: 'kas-antikaci',
    title: 'Kaş Antikacıları',
    description: 'Taş sokaklar arasında yer alan küçük antikacılar ve hediyelik eşya dükkanları.',
    category: ['shopping'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    rating: 4.5,
    price: 'Serbest',
    selected: false,
    location: 'Kaş çarşı içi',
    distance: 'Merkez',
    coordinates: { lat: 36.1994, lng: 29.6372 },
    website: '',
    phone: '',
    duration: '1-2 saat',
    facilities: ['Antika', 'Hediyelik', 'Yöresel ürünler']
  },
  {
    id: 'kas-kitapcisi',
    title: 'Kaş Kitapçısı',
    description: 'Yerel yazarların eserlerini ve Kaş hakkında kitapları bulabileceğiniz butik kitapçı.',
    category: ['shopping'],
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800',
    rating: 4.7,
    price: 'Serbest',
    selected: false,
    location: 'Kaş merkez',
    distance: 'Merkez',
    coordinates: { lat: 36.2000, lng: 29.6367 },
    website: '',
    phone: '+90 242 836 22 22',
    duration: '30-60 dakika',
    facilities: ['Kitaplar', 'Yerel yazarlar', 'Kahve köşesi']
  },
  {
    id: 'kas-zeytin-bahce',
    title: 'Kaş Zeytin Bahçeleri',
    description: 'Yerli üreticilerin organik zeytinyağı ve sabun ürünleri sunduğu doğal bahçeler.',
    category: ['shopping', 'nature'],
    image: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=800',
    rating: 4.6,
    price: 'Serbest',
    selected: false,
    location: 'Kaş çevre köyleri',
    distance: '8 km',
    coordinates: { lat: 36.2250, lng: 29.6250 },
    website: '',
    phone: '',
    duration: '1-2 saat',
    facilities: ['Organik ürünler', 'Zeytinyağı tadımı', 'Doğal sabunlar']
  },
  {
    id: 'kas-el-sanatlari',
    title: 'Kaş El Sanatları Atölyesi',
    description: 'Yerli kadınların el emeği ürünlerini tanıttığı küçük üretim atölyesi.',
    category: ['shopping'],
    image: 'https://images.unsplash.com/photo-1560749003-f4b1e0e6b3a4?w=800',
    rating: 4.8,
    price: 'Serbest',
    selected: false,
    location: 'Kaş merkez',
    distance: 'Merkez',
    coordinates: { lat: 36.1983, lng: 29.6361 },
    website: '',
    phone: '+90 242 836 23 23',
    duration: '45-60 dakika',
    facilities: ['El işi ürünler', 'Atölye', 'Yerel sanat']
  }
];

// --- Detail page fields (autofill placeholders) ---
// longText: uzun açıklama placeholder'ı. Sonradan her item için dolduracaksın.
// Not: data.js'e tek tek eklemek yerine (şimdilik) otomatik ekliyoruz.
(function () {
  const pilotText =
`[UZUN AÇIKLAMA PLACEHOLDER - KAPUTAŞ (PİLOT)]
Bu alanı sonra uzun uzun dolduracağız. Şimdilik sadece yer tutucu.

Öneri başlıklar:
- Ulaşım: Kaş/Kalkan yönünden nasıl gidilir, park var mı?
- 187 merdiven: iniş-çıkış, ayakkabı önerisi, güneş saatleri
- En iyi zaman: sabah erken mi, gün batımı mı, rüzgâr/dalga durumu
- Ne alınır: su, şapka, şnorkel, plaj ayakkabısı
- Ücretler: giriş/şezlong/otopark (varsa)
- Yakın duraklar: mini rota (Patara, Kalkan, Saklıkent vs.)

(Ready olunca burayı gerçek metinle değiştir.)`;

  const defaultText =
`[UZUN AÇIKLAMA PLACEHOLDER]
Bu alanı sonra uzun metinle dolduracağız (8–20 paragraf gibi düşünebilirsin).
Şimdilik yer tutucu.`;

  try {
    if (typeof allPlaces === 'undefined' || !Array.isArray(allPlaces)) return;

    allPlaces.forEach((p) => {
      if (!p || typeof p !== 'object') return;

      // longText yoksa ekle
      if (p.longText == null || String(p.longText).trim() === '') {
        const id = String(p.id || '').toLowerCase();
        const title = String(p.title || '').toLowerCase();
        const isPilot = id.includes('kaputas') || title.includes('kaputa');
        p.longText = isPilot ? pilotText : defaultText;
      }

      // Bazı item'larda link alanı yoksa bile selection.js "links" objesini destekliyor.
      // İstersen burada ileride normalize edebiliriz.
    });
  } catch (e) {
    // fail silently
  }
})();

