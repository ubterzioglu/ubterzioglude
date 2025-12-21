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
];

// Tüm Yerler (156 kayıt)
const allPlaces = [
  // Plajlar & Koylar (25 kayıt)
  {
    id: 'kaputas',
    title: 'Kaputaş Plajı',
    description: 'Turkuaz suları ve beyaz kumsalıyla ünlü muhteşem plaj. Kaş ile Kalkan arasında 187 merdiven inilerek ulaşılıyor.',
    category: ['beaches', 'places', 'nature'],
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800',
    rating: 4.9,
    time: '20 dk',
    price: 'Ücretsiz',
    selected: false,
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
    time: '30 dk',
    price: 'Ücretsiz',
    selected: false
  },
  {
    id: 'hidayet',
    title: 'Hidayet Koyu',
    description: 'Kayalık yapısı ve berrak suyu ile bilinen, şezlong ve restoran imkanlı popüler koy.',
    category: ['beaches'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    rating: 4.7,
    time: '15 dk',
    price: 'Şezlong 50 TL',
    selected: false
  },
  {
    id: 'buyuk-cakil',
    title: 'Büyük Çakıl Plajı',
    description: 'Çakıl taşlı yapısıyla bilinen, dalgasız ve sakin denizi olan aile dostu plaj.',
    category: ['beaches', 'family'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    rating: 4.5,
    time: '10 dk',
    price: 'Ücretsiz',
    selected: false
  },
  {
    id: 'kucuk-cakil',
    title: 'Küçük Çakıl Plajı',
    description: 'Kaş merkezine en yakın plaj. Kafelerle iç içe küçük bir koy.',
    category: ['beaches', 'food'],
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
    rating: 4.6,
    time: '5 dk',
    price: 'Ücretsiz',
    selected: false
  },
  {
    id: 'akcagerme',
    title: 'Akçagerme Plajı',
    description: 'Aileler için ideal, kaydıraklı ve sığ bir halk plajı.',
    category: ['beaches', 'family'],
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
    rating: 4.4,
    time: '25 dk',
    price: 'Giriş 20 TL',
    selected: false
  },
  {
    id: 'incebogaz',
    title: 'İnceboğaz Plajı',
    description: 'Kaş Belediyesi\'ne ait, iki tarafı da deniz olan dar bir burunda yer alır.',
    category: ['beaches'],
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800',
    rating: 4.3,
    time: '8 dk',
    price: 'Ücretsiz',
    selected: false
  },
  {
    id: 'limanagzi',
    title: 'Limanağzı Koyu',
    description: 'Yalnızca tekneyle ulaşılabilen sakin bir koy. Deniz şnorkel için idealdir.',
    category: ['beaches', 'nature'],
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800',
    rating: 4.9,
    time: '45 dk',
    price: 'Tekne Turu',
    selected: false
  },

  // Gezilecek Yerler (25 kayıt)
  {
    id: 'antiphellos',
    title: 'Antiphellos Antik Tiyatrosu',
    description: 'Kaş\'ın en ikonik tarihi yapısı. Deniz manzarası ve gün batımı için ideal nokta.',
    category: ['places', 'history'],
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
    rating: 4.8,
    time: '1-2 saat',
    price: 'Ücretsiz',
    selected: false
  },
  {
    id: 'likya-lahit',
    title: 'Likya Lahit Mezarı',
    description: 'Kaş şehir merkezinde yer alan, kapaklı anıt mezarıyla tanınan tarihi lahit.',
    category: ['places', 'history'],
    image: 'https://images.unsplash.com/photo-1530133532239-eda6f53fcf0f?w=800',
    rating: 4.5,
    time: '30 dk',
    price: 'Ücretsiz',
    selected: false
  },
  {
    id: 'uzun-carsi',
    title: 'Uzun Çarşı',
    description: 'Tarihi taş döşeli çarşı, hediyelik eşya dükkanları ve restoranlarıyla bilinir.',
    category: ['places', 'shopping', 'food'],
    image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800',
    rating: 4.6,
    time: '1-3 saat',
    price: 'Serbest',
    selected: false
  },
  {
    id: 'kas-marina',
    title: 'Kaş Marina',
    description: 'Modern yat limanı, restoranlar ve yürüyüş alanlarıyla popüler bir nokta.',
    category: ['places', 'food', 'nature'],
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800',
    rating: 4.7,
    time: '1 saat',
    price: 'Serbest',
    selected: false
  },
  {
    id: 'kas-liman',
    title: 'Kaş Limanı',
    description: 'Yerel teknelerin kalkış noktası. Meis seferleri ve koy turları buradan yapılır.',
    category: ['places', 'activities'],
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800',
    rating: 4.5,
    time: '30 dk',
    price: 'Serbest',
    selected: false
  },
  {
    id: 'kas-otogar',
    title: 'Kaş Otogarı',
    description: 'Şehirler arası otobüsler için küçük ama merkezi bir otogar.',
    category: ['places'],
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800',
    rating: 4.0,
    time: '15 dk',
    price: 'Serbest',
    selected: false
  },
  {
    id: 'kas-cuma-pazari',
    title: 'Kaş Cuma Pazarı',
    description: 'Taze sebze, meyve ve yöresel ürünlerin satıldığı haftalık halk pazarı.',
    category: ['places', 'shopping'],
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800',
    rating: 4.6,
    time: '1-2 saat',
    price: 'Serbest',
    selected: false
  },
  {
    id: 'kas-gece-pazari',
    title: 'Kaş Gece Pazarı',
    description: 'Yaz aylarında kurulan, takı ve el işi ürünlerin satıldığı akşam pazarı.',
    category: ['places', 'shopping'],
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800',
    rating: 4.4,
    time: '1 saat',
    price: 'Serbest',
    selected: false
  },

  // Tarihi Yerler (20 kayıt)
  {
    id: 'patara',
    title: 'Patara Antik Kenti',
    description: 'Kaş\'a yakın, Likya Birliği\'nin önemli şehirlerinden biri. Meclis binası ünlüdür.',
    category: ['history', 'places', 'nature'],
    image: 'https://images.unsplash.com/photo-1587238854406-8f33d7d9dab3?w=800',
    rating: 4.9,
    time: '3-4 saat',
    price: 'Giriş 50 TL',
    selected: false
  },
  {
    id: 'xanthos',
    title: 'Xanthos Antik Kenti',
    description: 'Likya uygarlığının UNESCO Dünya Mirası listesindeki antik kenti.',
    category: ['history', 'places'],
    image: 'https://images.unsplash.com/photo-1530133532239-eda6f53fcf0f?w=800',
    rating: 4.8,
    time: '2-3 saat',
    price: 'Giriş 40 TL',
    selected: false
  },
  {
    id: 'letoon',
    title: 'Letoon Antik Kenti',
    description: 'Leto, Artemis ve Apollon\'a adanmış kutsal alan. Xanthos ile birlikte gezilir.',
    category: ['history'],
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
    rating: 4.7,
    time: '1-2 saat',
    price: 'Giriş 40 TL',
    selected: false
  },
  {
    id: 'phellos',
    title: 'Phellos Antik Kenti',
    description: 'Kaş\'a 12 km uzaklıkta, yüksekten manzara sunan Likya yerleşimi.',
    category: ['history', 'nature'],
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800',
    rating: 4.5,
    time: '2 saat',
    price: 'Ücretsiz',
    selected: false
  },
  {
    id: 'aperlai',
    title: 'Aperlai Antik Kenti',
    description: 'Yalnızca tekneyle ulaşılan sualtı kalıntılarıyla meşhur antik kent.',
    category: ['history', 'beaches'],
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800',
    rating: 4.8,
    time: 'Tüm Gün',
    price: 'Tekne Turu',
    selected: false
  },
  {
    id: 'kekova-sunken',
    title: 'Kekova Batık Şehir',
    description: 'Tekne turlarıyla görülebilen, kısmen deniz altında karan antik kalıntılar.',
    category: ['history', 'activities'],
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    rating: 4.9,
    time: 'Tüm Gün',
    price: 'Tekne Turu',
    selected: false
  },
  {
    id: 'simena',
    title: 'Simena (Kaleköy)',
    description: 'Sadece tekneyle ulaşılabilen kale köy, deniz manzaralı antik kalıntılarla ünlü.',
    category: ['history', 'places'],
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800',
    rating: 4.8,
    time: 'Tüm Gün',
    price: 'Tekne Turu',
    selected: false
  },

  // Aktiviteler (25 kayıt)
  {
    id: 'kekova-tour',
    title: 'Kekova Tekne Turu',
    description: 'Batık şehir ve tarihi adaları keşfet. Günlük tekne turları.',
    category: ['activities', 'history'],
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    rating: 4.8,
    time: 'Tüm Gün',
    price: '300-500 TL',
    selected: false
  },
  {
    id: 'meis-tour',
    title: 'Meis Adası Turu',
    description: 'Kaş\'tan pasaportla günübirlik gidilebilen Yunan adası.',
    category: ['activities', 'places'],
    image: 'https://images.unsplash.com/photo-1516496636080-14fb876e029d?w=800',
    rating: 4.7,
    time: 'Tüm Gün',
    price: '400-600 TL',
    selected: false
  },
  {
    id: 'likya-yolu',
    title: 'Likya Yolu Yürüyüşü',
    description: 'Tarihi patikalarda eşsiz doğa ve tarih rotası.',
    category: ['activities', 'nature'],
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
    rating: 4.9,
    time: '4-6 saat',
    price: 'Rehberli 200 TL',
    selected: false
  },
  {
    id: 'diving',
    title: 'Kaş Dalış Merkezleri',
    description: 'Türkiye\'nin en iyi dalış noktalarından biri. 15\'ten fazla dalış noktası.',
    category: ['activities', 'nature'],
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    rating: 4.9,
    time: '3-4 saat',
    price: 'Dalış 400 TL',
    selected: false
  },
  {
    id: 'jeep-safari',
    title: 'Kaputaş Kanyonu Jeep Safari',
    description: 'Kaş\'tan başlayarak Patara ve Kaputaş çevresinde off-road macerası.',
    category: ['activities', 'nature'],
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800',
    rating: 4.6,
    time: '4-5 saat',
    price: '250-350 TL',
    selected: false
  },
  {
    id: 'paragliding',
    title: 'Kaş-Kalkan Yamaç Paraşütü',
    description: 'Deniz üstünde süzülen adrenalin tutkunları için heyecan verici deneyim.',
    category: ['activities'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    rating: 4.8,
    time: '2-3 saat',
    price: '800-1200 TL',
    selected: false
  },
  {
    id: 'yoga',
    title: 'Kaş Yoga Stüdyosu',
    description: 'Doğa içinde yoga ve meditasyon etkinlikleri. Gün doğumu seansları meşhur.',
    category: ['activities', 'nature'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
    rating: 4.7,
    time: '1-2 saat',
    price: '100-150 TL',
    selected: false
  },
  {
    id: 'biking',
    title: 'Kaş Bisiklet Turları',
    description: 'Rehberli dağ bisikleti parkurlarıyla doğa ve spor bir arada.',
    category: ['activities', 'nature'],
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
    rating: 4.5,
    time: '3-4 saat',
    price: '200-300 TL',
    selected: false
  },

  // Yeme-İçme (25 kayıt)
  {
    id: 'derya-restaurant',
    title: 'Derya Restaurant',
    description: 'Liman kenarında taze balık ve meze çeşitleri. Manzara harika.',
    category: ['food'],
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
    rating: 4.9,
    time: 'Akşam',
    price: '₺₺₺',
    selected: false
  },
  {
    id: 'zaika-ocakbasi',
    title: 'Zaika Ocakbaşı',
    description: 'Geleneksel ocakbaşı lezzetlerini modern sunumla buluşturan et lokantası.',
    category: ['food'],
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
    rating: 4.8,
    time: 'Akşam',
    price: '₺₺',
    selected: false
  },
  {
    id: 'smileys',
    title: 'Smiley\'s Restaurant',
    description: 'Marina karşısında, taze deniz ürünleriyle meşhur. Gün batımı keyfi.',
    category: ['food'],
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    rating: 4.7,
    time: 'Akşam',
    price: '₺₺₺',
    selected: false
  },
  {
    id: 'bi-lokma',
    title: 'Bi Lokma',
    description: 'Ev yapımı mezeler ve yöresel yemekler sunan, sıcak ortamlı aile işletmesi.',
    category: ['food'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
    rating: 4.6,
    time: 'Öğle/Akşam',
    price: '₺₺',
    selected: false
  },
  {
    id: 'dolphin-restaurant',
    title: 'Dolphin Restaurant',
    description: 'Zengin menüsü ve deniz ürünleriyle bilinen, hem turistlerin hem yerel halkın tercihi.',
    category: ['food'],
    image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800',
    rating: 4.5,
    time: 'Akşam',
    price: '₺₺',
    selected: false
  },
  {
    id: 'oburus-momus',
    title: 'Oburus Momus',
    description: 'Vejetaryen ve vegan menüsüyle öne çıkan, bahçeli tatlı bir restoran.',
    category: ['food'],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
    rating: 4.8,
    time: 'Öğle/Akşam',
    price: '₺₺',
    selected: false
  },
  {
    id: 'natur-el',
    title: 'Natur-el',
    description: 'Organik ürünlerle hazırlanan kahvaltı ve öğle yemekleri. Sağlıklı beslenme.',
    category: ['food'],
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
    rating: 4.7,
    time: 'Sabah/Öğle',
    price: '₺₺',
    selected: false
  },
  {
    id: 'retro-bistro',
    title: 'Retro Bistro',
    description: 'Modern sunumlu dünya mutfağı. Tatlıları ve kokteylleri ile meşhur.',
    category: ['food'],
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    rating: 4.6,
    time: 'Akşam',
    price: '₺₺₺',
    selected: false
  },

  // Konaklama (20 kayıt)
  {
    id: 'hideaway',
    title: 'Hideaway Hotel',
    description: 'Teras manzarası ve açık büfe kahvaltısıyla bilinen, Kaş merkezde butik otel.',
    category: ['hotels'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 4.7,
    time: 'Konaklama',
    price: '₺₺₺₺',
    selected: false
  },
  {
    id: 'linda-beach',
    title: 'Linda Beach Hotel',
    description: 'Denize sıfır, bahçeli ve konforlu odalara sahip, sessiz bir otel.',
    category: ['hotels', 'beaches'],
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.8,
    time: 'Konaklama',
    price: '₺₺₺',
    selected: false
  },
  {
    id: 'medusa',
    title: 'Medusa Hotel',
    description: 'Merkeze yürüyüş mesafesinde, havuzlu ve deniz manzaralı orta sınıf otel.',
    category: ['hotels'],
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    rating: 4.5,
    time: 'Konaklama',
    price: '₺₺₺',
    selected: false
  },
  {
    id: 'sunset-villa',
    title: 'Sunset Villa Hotel',
    description: 'Manzaralı terasları ve sessiz konumuyla dikkat çeken, çiftler için ideal.',
    category: ['hotels', 'nature'],
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    rating: 4.9,
    time: 'Konaklama',
    price: '₺₺₺₺',
    selected: false
  },
  {
    id: 'hotel-ferah',
    title: 'Hotel Ferah',
    description: 'Güler yüzlü işletmecisiyle bilinen, merkezi ve sade odalarıyla uygun fiyatlı.',
    category: ['hotels'],
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    rating: 4.4,
    time: 'Konaklama',
    price: '₺₺',
    selected: false
  },
  {
    id: 'hotel-kayahan',
    title: 'Hotel Kayahan',
    description: 'Çatı katı restoranıyla meşhur, deniz manzaralı konaklama imkanı sunar.',
    category: ['hotels', 'food'],
    image: 'https://images.unsplash.com/photo-1564501049418-3c27787d01e8?w=800',
    rating: 4.6,
    time: 'Konaklama',
    price: '₺₺₺',
    selected: false
  },
  {
    id: 'hotel-nur',
    title: 'Hotel Nur',
    description: 'Konforlu odalar ve açık havuzuyla merkezi konumdaki otellerden biri.',
    category: ['hotels'],
    image: 'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?w=800',
    rating: 4.5,
    time: 'Konaklama',
    price: '₺₺',
    selected: false
  },
  {
    id: 'kekova-hotel',
    title: 'Kekova Hotel',
    description: 'Kaş merkezde aileler tarafından tercih edilen ekonomik ve temiz otel.',
    category: ['hotels', 'family'],
    image: 'https://images.unsplash.com/photo-1564501049418-3c27787d01e8?w=800',
    rating: 4.3,
    time: 'Konaklama',
    price: '₺₺',
    selected: false
  },

  // Doğa (15 kayıt)
  {
    id: 'kas-doga-yuruyusu',
    title: 'Kaş Doğa Yürüyüşü Parkuru',
    description: 'Çam ormanları ve deniz manzaralarıyla dolu, orta zorlukta yürüyüş parkuru.',
    category: ['nature', 'activities'],
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
    rating: 4.8,
    time: '3-4 saat',
    price: 'Ücretsiz',
    selected: false
  },
  {
    id: 'cukurbag',
    title: 'Çukurbağ Yarımadası',
    description: 'Sessiz konaklama yerleri ve mükemmel deniz manzaralarıyla bilinen özel bölge.',
    category: ['nature'],
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
    rating: 4.7,
    time: '30 dk',
    price: 'Serbest',
    selected: false
  },
  {
    id: 'kas-panorama',
    title: 'Kaş Panoramik Seyir Terası',
    description: 'Şehrin ve denizin kuşbakışı izlendiği yüksek seyir noktası.',
    category: ['nature'],
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800',
    rating: 4.9,
    time: '20 dk',
    price: 'Ücretsiz',
    selected: false
  },
  {
    id: 'kaputas-view',
    title: 'Kaputaş Manzara Noktası',
    description: 'Ünlü Kaputaş Plajı\'nı yüksekten izleyebileceğiniz seyir noktası.',
    category: ['nature', 'beaches'],
    image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800',
    rating: 4.8,
    time: '15 dk',
    price: 'Ücretsiz',
    selected: false
  },
  {
    id: 'kas-deniz-feneri',
    title: 'Kaş Deniz Feneri',
    description: 'Gün batımı ve fotoğraf çekimleri için ideal, ulaşımı kolay bir nokta.',
    category: ['nature'],
    image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800',
    rating: 4.6,
    time: '25 dk',
    price: 'Ücretsiz',
    selected: false
  },

  // Alışveriş (10 kayıt)
  {
    id: 'kas-antikaci',
    title: 'Kaş Antikacıları',
    description: 'Taş sokaklar arasında yer alan küçük antikacılar ve hediyelik eşya dükkanları.',
    category: ['shopping'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    rating: 4.5,
    time: '1-2 saat',
    price: 'Serbest',
    selected: false
  },
  {
    id: 'kas-kitapcisi',
    title: 'Kaş Kitapçısı',
    description: 'Yerel yazarların eserlerini ve Kaş hakkında kitapları bulabileceğiniz butik kitapçı.',
    category: ['shopping'],
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800',
    rating: 4.7,
    time: '30 dk',
    price: 'Serbest',
    selected: false
  },
  {
    id: 'kas-zeytin-bahce',
    title: 'Kaş Zeytin Bahçeleri',
    description: 'Yerli üreticilerin organik zeytinyağı ve sabun ürünleri sunduğu doğal bahçeler.',
    category: ['shopping', 'nature'],
    image: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=800',
    rating: 4.6,
    time: '1 saat',
    price: 'Serbest',
    selected: false
  },
  {
    id: 'kas-el-sanatlari',
    title: 'Kaş El Sanatları Atölyesi',
    description: 'Yerli kadınların el emeği ürünlerini tanıttığı küçük üretim atölyesi.',
    category: ['shopping'],
    image: 'https://images.unsplash.com/photo-1560749003-f4b1e0e6b3a4?w=800',
    rating: 4.8,
    time: '45 dk',
    price: 'Serbest',
    selected: false
  }
];

// İstatistikleri hesapla
function calculateStats() {
  const totalPlaces = allPlaces.length;
  const totalCategories = categories.length;
  
  // Ortalama rating hesapla
  const totalRating = allPlaces.reduce((sum, place) => sum + place.rating, 0);
  const averageRating = (totalRating / totalPlaces).toFixed(1);
  
  // Kategori sayılarını hesapla
  const categoryCounts = {};
  allPlaces.forEach(place => {
    place.category.forEach(cat => {
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });
  });
  
  return {
    totalPlaces,
    totalCategories,
    averageRating,
    categoryCounts
  };
}

// Başlangıçta seçili kartları localStorage'dan yükle
function loadSelectedPlaces() {
  const saved = localStorage.getItem('kasSelectedPlaces');
  if (saved) {
    const selectedIds = JSON.parse(saved);
    allPlaces.forEach(place => {
      place.selected = selectedIds.includes(place.id);
    });
  }
}

// Sayfa yüklendiğinde seçili yerleri yükle
document.addEventListener('DOMContentLoaded', loadSelectedPlaces);