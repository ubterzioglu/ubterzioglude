// data.js - Menü verileri
const RESTAURANT_DATA = {
    restaurantName: "Elif Dragoman Bahçe",
    
    // Masa numaraları (1-30 arası)
    tables: Array.from({length: 30}, (_, i) => i + 1),
    
    // Menü kategorileri
    categories: [
        { id: "kahvalti", name: "Kahvaltı", icon: "fas fa-egg" },
        { id: "corbalar", name: "Çorbalar", icon: "fas fa-bowl-hot" },
        { id: "ana-yemekler", name: "Ana Yemekler", icon: "fas fa-utensils" },
        { id: "salatalar", name: "Salatalar", icon: "fas fa-leaf" },
        { id: "icecekler", name: "İçecekler", icon: "fas fa-glass-whiskey" },
        { id: "tatlilar", name: "Tatlılar", icon: "fas fa-ice-cream" }
    ],
    
    // Menü öğeleri
    menuItems: [
        // KAHVALTI
        {
            id: 1,
            name: "Serpme Kahvaltı",
            description: "Zengin içerikli geleneksel kahvaltı tabağı",
            price: 120.00,
            category: "kahvalti",
            image: "/img/kahvalti-1.jpg"
        },
        {
            id: 2,
            name: "Menemen",
            description: "Domates, biber, soğan ile yumurta",
            price: 45.00,
            category: "kahvalti",
            image: "/img/menemen.jpg"
        },
        {
            id: 3,
            name: "Peynir Tabağı",
            description: "5 çeşit peynir, zeytin, reçel",
            price: 65.00,
            category: "kahvalti",
            image: "/img/peynir-tabagi.jpg"
        },
        
        // ÇORBALAR
        {
            id: 4,
            name: "Mercimek Çorbası",
            description: "Geleneksel mercimek çorbası",
            price: 25.00,
            category: "corbalar",
            image: "/img/mercimek.jpg"
        },
        {
            id: 5,
            name: "Ezogelin Çorbası",
            description: "Bulgar, mercimek, domates",
            price: 28.00,
            category: "corbalar",
            image: "/img/ezogelin.jpg"
        },
        
        // ANA YEMEKLER
        {
            id: 6,
            name: "Kuzu Tandır",
            description: "Yavaş pişirilmiş kuzu eti",
            price: 180.00,
            category: "ana-yemekler",
            image: "/img/kuzu-tandir.jpg"
        },
        {
            id: 7,
            name: "Karışık Izgara",
            description: "Köfte, tavuk, pirzola",
            price: 160.00,
            category: "ana-yemekler",
            image: "/img/karisik-izgara.jpg"
        },
        {
            id: 8,
            name: "Mantı",
            description: "Üzeri yoğurt ve tereyağlı",
            price: 75.00,
            category: "ana-yemekler",
            image: "/img/manti.jpg"
        },
        
        // SALATALAR
        {
            id: 9,
            name: "Çoban Salata",
            description: "Domates, salatalık, biber, soğan",
            price: 40.00,
            category: "salatalar",
            image: "/img/coban-salata.jpg"
        },
        {
            id: 10,
            name: "Mevsim Salata",
            description: "Mevsim yeşillikleri",
            price: 35.00,
            category: "salatalar",
            image: "/img/mevsim-salata.jpg"
        },
        
        // İÇECEKLER
        {
            id: 11,
            name: "Ayran",
            description: "500ml soğuk ayran",
            price: 15.00,
            category: "icecekler",
            image: "/img/ayran.jpg"
        },
        {
            id: 12,
            name: "Türk Kahvesi",
            description: "Geleneksel Türk kahvesi",
            price: 20.00,
            category: "icecekler",
            image: "/img/turk-kahvesi.jpg"
        },
        {
            id: 13,
            name: "Çay",
            description: "Taze demlenmiş çay",
            price: 10.00,
            category: "icecekler",
            image: "/img/cay.jpg"
        },
        
        // TATLILAR
        {
            id: 14,
            name: "Baklava",
            description: "Cevizli baklava",
            price: 50.00,
            category: "tatlilar",
            image: "/img/baklava.jpg"
        },
        {
            id: 15,
            name: "Künefe",
            description: "Sıcak künefe",
            price: 60.00,
            category: "tatlilar",
            image: "/img/kunefe.jpg"
        }
    ]
};