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
        name: 'Plajlar',
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
    }
];

// Öne Çıkan Yerler
const highlights = [
    {
        id: 1,
        title: 'Kaputaş Plajı',
        category: 'Plajlar',
        image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800',
        rating: 4.9,
        time: '20 dk',
        badgeColor: 'category-cyan',
        description: 'Turkuaz suları ve beyaz kumsalıyla ünlü muhteşem plaj'
    },
    {
        id: 2,
        title: 'Kekova Tekne Turu',
        category: 'Aktiviteler',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
        rating: 4.8,
        time: 'Tüm Gün',
        badgeColor: 'category-green',
        description: 'Batık şehir ve tarihi adaları keşfet'
    },
    {
        id: 3,
        title: 'Antik Antiphellos',
        category: 'Gezilecek Yerler',
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
        rating: 4.7,
        time: '1-2 saat',
        badgeColor: 'category-orange',
        description: 'MÖ 4. yüzyıldan kalma Likya antik kenti'
    },
    {
        id: 4,
        title: 'Balık Restoranları',
        category: 'Yeme-İçme',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
        rating: 4.9,
        time: 'Akşam',
        badgeColor: 'category-red',
        description: 'Taze deniz ürünleri ve Akdeniz lezzetleri'
    }
];

// Ek veri: Tüm gezilecek yerler (ileride kullanılmak üzere)
const allPlaces = [
    {
        id: 'kaputas',
        name: 'Kaputaş Plajı',
        category: 'beaches',
        rating: 4.9,
        reviewCount: 2341,
        distance: '7 km',
        duration: '20 dk',
        price: 'Ücretsiz',
        coordinates: { lat: 36.2189, lng: 29.5419 },
        images: [
            'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800'
        ],
        description: 'Kaş ile Kalkan arasında yer alan, 187 merdiven inilerek ulaşılan muhteşem plaj. Turkuaz rengi suları ve beyaz kumsalı ile ünlüdür.',
        features: ['Ücretsiz Giriş', 'Kantin', 'Duş', 'WC'],
        bestTime: 'Mayıs-Ekim',
        tips: 'Erken saatlerde gidin, öğleden sonra çok kalabalık oluyor.'
    },
    {
        id: 'kekova',
        name: 'Kekova Tekne Turu',
        category: 'activities',
        rating: 4.8,
        reviewCount: 1892,
        distance: '15 km',
        duration: 'Tüm Gün',
        price: '300-500 TL',
        coordinates: { lat: 36.1833, lng: 29.8500 },
        images: [
            'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'
        ],
        description: 'Batık şehir, Simena Kalesi ve antik limanları içeren unutulmaz bir tekne turu.',
        features: ['Öğle Yemeği Dahil', 'Yüzme Molaları', 'Rehberli Tur', 'Sigorta'],
        bestTime: 'Nisan-Kasım',
        tips: 'Güneş kremi, şapka ve mayo almayı unutmayın.'
    },
    {
        id: 'antiphellos',
        name: 'Antik Antiphellos',
        category: 'places',
        rating: 4.7,
        reviewCount: 876,
        distance: '1 km',
        duration: '1-2 saat',
        price: 'Ücretsiz',
        coordinates: { lat: 36.2015, lng: 29.6402 },
        images: [
            'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800'
        ],
        description: 'MÖ 4. yüzyıldan kalma Likya antik kenti. Antik tiyatro ve Likya lahitleri görülmeye değer.',
        features: ['Ücretsiz Giriş', 'Tarihi Eser', 'Panoramik Manzara'],
        bestTime: 'Yıl Boyu',
        tips: 'Günbatımında gitmek harika fotoğraflar için ideal.'
    }
];

// Restoranlar
const restaurants = [
    {
        id: 'balik-1',
        name: 'Derya Restaurant',
        category: 'food',
        cuisine: 'Deniz Ürünleri',
        rating: 4.9,
        priceRange: '₺₺₺',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
        description: 'Liman kenarında taze balık ve meze çeşitleri'
    },
    {
        id: 'balik-2',
        name: 'Balıkçı Barınağı',
        category: 'food',
        cuisine: 'Akdeniz Mutfağı',
        rating: 4.8,
        priceRange: '₺₺',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
        description: 'Ailece işletilen samimi balık restoranı'
    }
];

// Oteller
const hotels = [
    {
        id: 'hotel-1',
        name: 'Kaş Otel & Spa',
        category: 'hotels',
        rating: 4.7,
        priceRange: '₺₺₺₺',
        stars: 5,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        features: ['Havuz', 'Spa', 'Deniz Manzarası', 'Restoran']
    },
    {
        id: 'hotel-2',
        name: 'Butik Pansiyon',
        category: 'hotels',
        rating: 4.9,
        priceRange: '₺₺',
        stars: 3,
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
        features: ['Kahvaltı', 'Bahçe', 'Aile İşletmesi']
    }
];

// Blog yazıları (ileride kullanılmak üzere)
const blogPosts = [
    {
        id: 'post-1',
        title: 'Kaş\'ta 3 Günde Ne Yapılır?',
        excerpt: 'Kaş\'ı 3 günde en iyi şekilde gezmek için önerilerimiz...',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        date: '2024-01-15',
        readTime: '5 dk',
        author: 'Ayşe Yılmaz'
    },
    {
        id: 'post-2',
        title: 'En İyi Dalış Noktaları',
        excerpt: 'Kaş\'ın eşsiz su altı dünyasını keşfedin...',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
        date: '2024-01-10',
        readTime: '7 dk',
        author: 'Mehmet Demir'
    }
];

// kas-data.js
const kasData = [
  {
    title: "Kaputaş Plajı",
    description:
      "Kaş ile Kalkan arasında, 187 basamak merdivenle inilen kartpostallık turkuaz rengiyle Türkiye’nin en ünlü plajlarından biridir:contentReference[oaicite:30]{index=30}.",
    category: "Plajlar & Koylar",
    instagram: "",
    googleMaps: "",
    image: "placeholder: golden sand and turquoise sea"
  },
  {
    title: "Antiphellos Antik Tiyatrosu",
    description:
      "Kaş merkezinin batı ucunda, denize nazır konumdaki antik tiyatro MÖ 1. yy’da inşa edilmiştir. Yaklaşık 4.000 kişilik kapasitesiyle gün batımında Meis Adası manzarası sunar:contentReference[oaicite:31]{index=31}.",
    category: "Tarihi Yerler",
    instagram: "",
    googleMaps: "",
    image: "placeholder: ancient amphitheater"
  },
  {
    title: "Keyf-i Dem Restaurant Meyhane",
    description:
      "Merkezde denize sıfır konumdaki meyhane, zengin meze ve deniz mahsullerinden oluşan menüsüyle Kaş’ın popüler lokantalarındandır:contentReference[oaicite:32]{index=32}.",
    category: "Restoranlar & Kafeler",
    instagram: "https://instagram.com/keyfidemkas",
    googleMaps: "",
    image: "placeholder: outdoor seating by water"
  },
  {
    title: "Zaika Ocakbaşı",
    description:
      "Çukurbağ Yarımadası’nda et kebapları ve mezeleriyle ünlü ocakbaşı. Lezzetli yemekleri ve kaliteli hizmeti övülür, Kaş’ta en iyi ocakbaşı deneyimlerinden biridir:contentReference[oaicite:33]{index=33}.",
    category: "Restoranlar & Kafeler",
    instagram: "https://instagram.com/zaikaocakbasi",
    googleMaps: "",
    image: "placeholder: grilled meat skewers"
  },
  {
    title: "Payam Hotel",
    description:
      "Kaş merkezinde plaja ve çarşıya yürüme mesafesinde butik otel. Ferah deniz manzaralı odaları ve havuzlu terasında sunulan zengin kahvaltısı ile övgü alıyor:contentReference[oaicite:34]{index=34}:contentReference[oaicite:35]{index=35}.",
    category: "Oteller & Konaklama",
    instagram: "",
    googleMaps: "",
    image: "placeholder: hotel with pool"
  },
  {
    title: "Santosa Pansiyon",
    description:
      "Kaş merkezde aile işletmesi, samimi bir aile pansiyonu. Temiz, sade odaları ve terastaki ev yapımı kahvaltısıyla bilinir, uzun yıllardır müdavimlere hizmet eder:contentReference[oaicite:36]{index=36}:contentReference[oaicite:37]{index=37}.",
    category: "Oteller & Konaklama",
    instagram: "https://instagram.com/santosa_pansiyon",
    googleMaps: "",
    image: "placeholder: cozy guesthouse"
  },
  {
    title: "Scuba Diving",
    description:
      "Kaş, temiz sularında 30’dan fazla dalış noktasına sahip Türkiye’nin önde gelen dalış merkezlerinden biridir:contentReference[oaicite:38]{index=38}. Yerel dalış okulları sabahları dalış tekneleriyle dalgıçları yakın noktalara götürür:contentReference[oaicite:39]{index=39}.",
    category: "Aktiviteler",
    instagram: "",
    googleMaps: "",
    image: "placeholder: underwater reef"
  },
  {
    title: "Yamaç Paraşütü",
    description:
      "Kaş, Türkiye’nin sayılı yamaç paraşütü noktalarındandır:contentReference[oaicite:40]{index=40}. Genellikle Asas Dağı (~1000 m) veya Kırdavlı Tepesi (~600 m) zirvelerinden uçuş düzenlenir; yaz aylarında gökyüzünde renkli paraşütler görülür:contentReference[oaicite:41]{index=41}.",
    category: "Aktiviteler",
    instagram: "",
    googleMaps: "",
    image: "placeholder: paraglider over sea"
  },
  {
    title: "Saklıkent Kanyonu",
    description:
      "Kaş’a ~60 km uzaklıktaki Saklıkent, Türkiye’nin en uzun kanyonlarından biridir (18 km). Derin ve dar kanyon yazın serinlemek ve yürüyüş için popülerdir; zemini buz gibi akarsu içerir:contentReference[oaicite:42]{index=42}.",
    category: "Aktiviteler",
    instagram: "",
    googleMaps: "",
    image: "placeholder: canyon gorge"
  },
  {
    title: "Para & ATM",
    description:
      "Kaş’ta birçok ATM merkezi noktalardadır (Cumhuriyet Meydanı çevresi). Ancak yazın bazı ATM’lerde nakit bitmesi veya arıza yaşanabilir, bu yüzden bir miktar nakit taşımak tavsiye edilir:contentReference[oaicite:43]{index=43}. Restoran ve mağazaların çoğu kart kabul eder; küçük esnaf için nakit gerekebilir.",
    category: "Pratik Bilgiler & Uyarılar",
    instagram: "",
    googleMaps: "",
    image: "placeholder: ATM machine"
  },
  {
    title: "Güneş ve Su Tüketimi",
    description:
      "Yazın Kaş’ta güneş oldukça yakıcıdır:contentReference[oaicite:44]{index=44}. Güneş kremi kullanın, öğle sıcağında gölgede kalın. Musluk suyu klorludur ve içme suyu olarak önerilmez; 1.5L şişe sular uygun fiyata temin edilebilir:contentReference[oaicite:45]{index=45}.",
    category: "Pratik Bilgiler & Uyarılar",
    instagram: "",
    googleMaps: "",
    image: "placeholder: sun and water bottle"
  }
];
