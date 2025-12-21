const citiesData = [
    {
        id: 34,
        name: "İstanbul",
        image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80",
        kunye: { nufus: "15.9 Milyon", bolge: "Marmara", plaka: "34" },
        meshur: "Boğaz Hattı, Ayasofya ve Simit",
        bilinmesiGerekenler: [
            "Dünyada iki kıta üzerine kurulu tek şehirdir.",
            "Roma, Bizans ve Osmanlı İmparatorluklarına başkentlik yapmıştır.",
            "Galata Kulesi'nden panoramik şehir manzarasını izleyebilirsiniz.",
            "Vapurla kıtalar arası yolculuk sadece 20 dakika sürer.",
            "Kapalıçarşı, dünyanın en eski alışveriş merkezlerinden biridir.",
            "Yerebatan Sarnıcı'ndaki Medusa başlarını mutlaka görmelisiniz.",
            "İstanbul Boğazı, dünyanın en stratejik su yollarından biridir.",
            "Prens Adaları'nda bisiklet turu yapmak bir klasiktir.",
            "İstiklal Caddesi günde milyonlarca insanı ağırlar.",
            "Pierre Loti tepesinde Haliç manzarasına karşı çay içmek eşsizdir."
        ]
    },
    {
        id: 7,
        name: "Antalya",
        image: "https://images.unsplash.com/photo-15420518418c7-d158f7ee620c?auto=format&fit=crop&w=1200&q=80",
        kunye: { nufus: "2.6 Milyon", bolge: "Akdeniz", plaka: "07" },
        meshur: "Düden Şelalesi ve Turkuaz Plajlar",
        bilinmesiGerekenler: [
            "Dünyanın en çok antik kente sahip illerinden biridir.",
            "Kaleiçi, şehrin tarihi ruhunu yansıtan dar sokaklara sahiptir.",
            "Aspendos Tiyatrosu, dünyada en iyi korunmuş antik tiyatrolardandır.",
            "Lycian Way (Likya Yolu) dünyanın en iyi yürüyüş rotalarından biridir.",
            "Düden ve Kurşunlu Şelaleleri doğal birer mucizedir.",
            "Kaş ve Kalkan bölgeleri dalış tutkunlarının merkezidir.",
            "Antalya Müzesi, dünyanın en önemli heykel koleksiyonlarına sahiptir.",
            "Portakal ve muz üretimiyle Türkiye'nin manavıdır.",
            "Saklıkent'te aynı gün içinde hem kayak yapıp hem denize girebilirsiniz.",
            "Konyaaltı ve Lara plajları mavi bayraklı devasa sahillerdir."
        ]
    },
    {
        id: 50,
        name: "Nevşehir (Kapadokya)",
        image: "https://images.unsplash.com/photo-1519754124976-9602418e952a?auto=format&fit=crop&w=1200&q=80",
        kunye: { nufus: "310 Bin", bolge: "İç Anadolu", plaka: "50" },
        meshur: "Peri Bacaları ve Sıcak Hava Balonları",
        bilinmesiGerekenler: [
            "Milyonlarca yıl önce volkanik küllerin aşınmasıyla oluşmuştur.",
            "Göreme Açık Hava Müzesi UNESCO Dünya Mirası listesindedir.",
            "Yer altı şehirleri (Derinkuyu, Kaymaklı) binlerce kişiyi saklayabilir.",
            "Gün doğumunda havalanan balonlar büyüleyici bir manzara sunar.",
            "Ihlara Vadisi, içinden nehir geçen dev bir kanyondur.",
            "Kaya içine oyulmuş butik otellerde konaklamak çok popülerdir.",
            "Avanos kasabası, Hititlerden beri süregelen çömlekçiliğiyle ünlüdür.",
            "Uçhisar Kalesi bölgenin en yüksek noktasıdır.",
            "Paşabağları, peri bacalarının en yoğun olduğu vadidir.",
            "Şarap üretimi bölgenin binlerce yıllık geleneğidir."
        ]
    },

    // data.js dosyanın sonuna (köşeli parantez içine) ekleyebilirsin
{
    id: 61,
    name: "Trabzon",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800", // Örnek görsel
    kunye: { nufus: "816 Bin", bolge: "Karadeniz", plaka: "61" },
    meshur: "Sümela Manastırı ve Hamsi",
    bilinmesiGerekenler: [
        "Sümela Manastırı, sarp kayalıklar üzerine inşa edilmiş tarihi bir yapıdır.",
        "Uzungöl, kartpostallık manzarasıyla bölgenin en popüler turistik noktasıdır.",
        "Trabzon ekmeği (Vakfıkebir) devasa boyutu ve lezzetiyle ünlüdür.",
        "Boztepe'den şehri ve denizi kuş bakışı izleyebilirsiniz.",
        "Kemeraltı Çarşısı, kentin en eski alışveriş merkezidir.",
        "Atatürk Köşkü, çam ormanları içinde şık bir mimariye sahiptir.",
        "Akçaabat köftesi, tescilli bir lezzet olarak mutlaka denenmelidir.",
        "Ayasofya Camii (Müzesi), bölgenin önemli tarihi duraklarındandır.",
        "Hamsiköy sütlacı, yerel sütlerle hazırlanan efsanevi bir tatlıdır.",
        "Şehir, yayla turizminin Türkiye'deki merkezlerinden biridir."
    ]
},
{
    id: 35,
    name: "İzmir",
    image: "https://images.unsplash.com/photo-1563914436-39840f35368a?w=800",
    kunye: { nufus: "4.4 Milyon", bolge: "Ege", plaka: "35" },
    meshur: "Saat Kulesi ve Boyoz",
    bilinmesiGerekenler: [
        "Efes Antik Kenti, dünyanın en iyi korunmuş açık hava müzelerinden biridir.",
        "Kordon Boyu, gün batımını izlemek için en popüler yürüyüş yoludur.",
        "Konak Saat Kulesi, şehrin ikonik sembolüdür.",
        "Alaçatı ve Çeşme, rüzgar sörfü ve taş evleriyle dünya markasıdır.",
        "Kemeraltı Çarşısı, dünyanın en eski açık hava çarşılarından biridir.",
        "Tarihi Asansör, panoramik şehir manzarası sunan tarihi bir yapıdır.",
        "Şirince köyü, şarapları ve tarihi Rum evleriyle ünlüdür.",
        "İzmir Enternasyonal Fuarı, Türkiye'nin en köklü fuar organizasyonudur.",
        "Boyoz ve kumru, şehrin en sevilen yerel lezzetleridir.",
        "Meryem Ana Evi, Hristiyanlar için kutsal bir hac merkezidir."
    ]
},

    {
        id: 34,
        name: "İstanbul",
        image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800",
        kunye: { nufus: "15.9 Milyon", bolge: "Marmara", plaka: "34" },
        meshur: "Boğaz Hattı, Ayasofya ve Simit",
        bilinmesiGerekenler: [
            "Dünyada iki kıta üzerine kurulu tek şehirdir.",
            "Roma, Bizans ve Osmanlı İmparatorluklarına başkentlik yapmıştır.",
            "Galata Kulesi'nden panoramik şehir manzarasını izleyebilirsiniz.",
            "Vapurla kıtalar arası yolculuk sadece 20 dakika sürer.",
            "Kapalıçarşı, dünyanın en eski alışveriş merkezlerinden biridir.",
            "Yerebatan Sarnıcı'ndaki Medusa başlarını mutlaka görmelisiniz.",
            "İstanbul Boğazı, dünyanın en stratejik su yollarından biridir.",
            "Prens Adaları'nda bisiklet turu yapmak bir klasiktir.",
            "İstiklal Caddesi günde milyonlarca insanı ağırlar.",
            "Pierre Loti tepesinde Haliç manzarasına karşı çay içmek eşsizdir."
        ]
    },
    {
        id: 35,
        name: "İzmir",
        image: "https://images.unsplash.com/photo-1563914436-39840f35368a?w=800",
        kunye: { nufus: "4.4 Milyon", bolge: "Ege", plaka: "35" },
        meshur: "Saat Kulesi ve Boyoz",
        bilinmesiGerekenler: [
            "Efes Antik Kenti, dünyanın en iyi korunmuş açık hava müzelerinden biridir.",
            "Kordon Boyu, gün batımını izlemek için en popüler yürüyüş yoludur.",
            "Konak Saat Kulesi, şehrin ikonik sembolüdür.",
            "Alaçatı ve Çeşme, rüzgar sörfü ve taş evleriyle dünya markasıdır.",
            "Kemeraltı Çarşısı, dünyanın en eski açık hava çarşılarından biridir.",
            "Tarihi Asansör, panoramik şehir manzarası sunan tarihi bir yapıdır.",
            "Şirince köyü, şarapları ve tarihi Rum evleriyle ünlüdür.",
            "İzmir Enternasyonal Fuarı, Türkiye'nin en köklü fuar organizasyonudur.",
            "Boyoz ve kumru, şehrin en sevilen yerel lezzetleridir.",
            "Meryem Ana Evi, Hristiyanlar için kutsal bir hac merkezidir."
        ]
    },
    {
        id: 16,
        name: "Bursa",
        image: "https://images.unsplash.com/photo-1587823521235-9c9447334709?w=800",
        kunye: { nufus: "3.1 Milyon", bolge: "Marmara", plaka: "16" },
        meshur: "İskender Kebap ve Uludağ",
        bilinmesiGerekenler: [
            "Osmanlı İmparatorluğu'nun ilk başkentidir.",
            "Uludağ, kış turizminin Türkiye'deki en önemli merkezidir.",
            "UNESCO Dünya Mirası listesindeki Cumalıkızık köyü buradadır.",
            "İpek dokumacılığı ve tekstil sanayisiyle tanınır.",
            "Yeşil Türbe ve Ulu Camii mimarisiyle büyüleyicidir.",
            "İskender kebabın doğum yeridir.",
            "Kestane şekeri şehrin en meşhur tatlısıdır.",
            "Türkiye'nin otomotiv üretim üssüdür.",
            "Mudanya sahil şeridi sayfiye yeridir.",
            "Uluabat Gölü ve kuş cenneti doğa severler için idealdir."
        ]
    },
    {
        id: 10,
        name: "Balıkesir",
        image: "https://images.unsplash.com/photo-1541433131875-337abc2e0af4?w=800",
        kunye: { nufus: "1.2 Milyon", bolge: "Marmara/Ege", plaka: "10" },
        meshur: "Ayvalık Tostu ve Zeytinyağı",
        bilinmesiGerekenler: [
            "Hem Ege hem de Marmara Denizi'ne kıyısı vardır.",
            "Kaz Dağları (İda), dünyanın oksijen oranı en yüksek yerlerindendir.",
            "Ayvalık ve Cunda Adası tarihi taş evleriyle ünlüdür.",
            "Manyas Kuş Cenneti binlerce kuş türüne ev sahipliği yapar.",
            "Türkiye'nin en lezzetli zeytin ve zeytinyağları burada üretilir.",
            "Susurluk ayranı ve tostu bir yol üstü klasiğidir.",
            "Sarımsaklı plajı Türkiye'nin en uzun kumsallarından biridir.",
            "Höşmerim tatlısı şehrin simge lezzetidir.",
            "Şeytan Sofrası'ndan gün batımı izlemek bir ritüeldir.",
            "Kapıdağ Yarımadası doğa yürüyüşleri için harikadır."
        ]
    },
    {
        id: 9,
        name: "Aydın",
        image: "https://images.unsplash.com/photo-1563914436-39840f35368a?w=800",
        kunye: { nufus: "1.1 Milyon", bolge: "Ege", plaka: "09" },
        meshur: "İncir ve Kuşadası",
        bilinmesiGerekenler: [
            "Türkiye'nin en kaliteli incir üretim merkezidir.",
            "Kuşadası ve Didim uluslararası turizm limanlarıdır.",
            "Efeler şehri olarak bilinir ve zeybek kültürü hakimdir.",
            "Milet, Priene ve Didyma antik kentleri tarih meraklıları içindir.",
            "Menderes Ovası çok bereketli tarım arazilerine sahiptir.",
            "Dilek Yarımadası Milli Parkı bakir koylarıyla ünlüdür.",
            "Arapapıştı Kanyonu tekne turları için idealdir.",
            "Zeytinyağlı yemekleri Ege mutfağının en iyi örnekleridir.",
            "Didim'deki Apollon Tapınağı dünyanın en büyük kehanet merkezlerindendi.",
            "Sıcak iklimi nedeniyle kışın bile gezilebilir."
        ]
    },





{
        id: 27,
        name: "Gaziantep",
        image: "img/27_gaziantep.jpg",
        kunye: { nufus: "2.1 Milyon", bolge: "Güneydoğu Anadolu", plaka: "27" },
        meshur: "Baklava ve Zeugma Mozaik Müzesi",
        bilinmesiGerekenler: [
            "UNESCO tarafından tescillenmiş bir Dünya Gastronomi Şehri'dir.",
            "Dünyanın en büyük mozaik müzelerinden biri olan Zeugma buradadır.",
            "Baklava, kentin dünyaca ünlü ve tescilli en büyük markasıdır.",
            "Antep fıstığı, kentin ekonomisinin ve mutfağının altın değeridir.",
            "Tarihi Antep Kalesi, şehrin merkezinde heybetle yükselir.",
            "Bakırcılar Çarşısı'nda çekiç sesleri arasında geleneksel sanat yaşatılır.",
            "Beyran çorbası, kentin vazgeçilmez sabah kahvaltısı klasiğidir.",
            "Rumkale, Fırat Nehri üzerinde büyüleyici bir manzaraya sahiptir.",
            "Katmer, kentin en sevilen tatlı kahvaltı seçeneklerinden biridir.",
            "Tahmis Kahvesi, 1635 yılından beri hizmet veren tarihi bir mekandır."
        ]
    },
    {
        id: 63,
        name: "Şanlıurfa",
        image: "img/63_sanliurfa.jpg",
        kunye: { nufus: "2.1 Milyon", bolge: "Güneydoğu Anadolu", plaka: "63" },
        meshur: "Göbeklitepe ve Balıklıgöl",
        bilinmesiGerekenler: [
            "Göbeklitepe, insanlık tarihinin bilinen en eski tapınağına ev sahipliği yapar.",
            "Balıklıgöl (Halil-ür Rahman), kentin en kutsal ve turistik merkezidir.",
            "Peygamberler Şehri olarak bilinir ve inanç turizminin kalbidir.",
            "Harran Evleri, konik çatıları ve binlerce yıllık tarihiyle eşsizdir.",
            "Sıra Gecesi kültürü, müziğin ve yemeğin birleştiği büyük bir gelenektir.",
            "Urfa İsotu, kentin mutfağına karakteristik tadını veren özel bir biberdir.",
            "Halfeti (Batık Şehir), su altında kalan cami minaresiyle meşhurdur.",
            "Şanlıurfa Arkeoloji Müzesi, Türkiye'nin en büyük müze komplekslerinden biridir.",
            "Ciğer kebabı kentin günün her saati tüketilen en sevilen yemeğidir.",
            "Dünyanın en eski üniversitesi olarak kabul edilen Harran Üniversitesi kalıntıları buradadır."
        ]
    },
    {
        id: 47,
        name: "Mardin",
        image: "img/47_mardin.jpg",
        kunye: { nufus: "862 Bin", bolge: "Güneydoğu Anadolu", plaka: "47" },
        meshur: "Eski Mardin Evleri ve Gümüş (Telkari)",
        bilinmesiGerekenler: [
            "Tarihi kentsel dokusu tamamen koruma altına alınmış bir 'müze şehir'dir.",
            "Eski Mardin sokakları, birbirinin manzarasını kesmeyen taş evlerden oluşur.",
            "Deyrulzafaran Manastırı, Süryani kültürünün dünyadaki en önemli merkezlerindendir.",
            "Telkari sanatı (gümüş işleme), kentin en zarif el sanatıdır.",
            "Kasımiye Medresesi, taş işçiliği ve mimarisiyle bir sanat şaheseridir.",
            "Mardin Dara Antik Kenti, Mezopotamya'nın en görkemli su kanallarına sahiptir.",
            "Süryani şarabı ve Mardin çöreği (kiliçe) tadılması gereken lezzetlerdir.",
            "Mavi badem şekeri kentin en renkli ve meşhur hediyeliğidir.",
            "Farklı din ve kültürlerin binlerce yıldır huzurla yaşadığı bir hoşgörü kentidir.",
            "Mezopotamya Ovası manzarası kentin balkonlarından deniz gibi izlenir."
        ]
    },
    {
        id: 21,
        name: "Diyarbakır",
        image: "img/21_diyarbakir.jpg",
        kunye: { nufus: "1.8 Milyon", bolge: "Güneydoğu Anadolu", plaka: "21" },
        meshur: "Diyarbakır Surları ve Karpuz",
        bilinmesiGerekenler: [
            "Diyarbakır Surları, dünyanın en uzun ve sağlam kalmış antik yapılarındandır.",
            "Hevsel Bahçeleri, binlerce yıldır tarım yapılan bir dünya mirasıdır.",
            "Ulu Cami, İslam dünyasının 5. Harem-i Şerif'i kabul edilir.",
            "Karpuzu, devasa boyutlarıyla kentin tarımsal simgesidir.",
            "On Gözlü Köprü, Dicle Nehri üzerinde tarihe tanıklık eden bir yapıdır.",
            "Cahit Sıtkı Tarancı Müzesi, geleneksel Diyarbakır ev mimarisini yansıtır.",
            "Diyarbakır ciğer kebabı ve kaburga dolması mutfağın zirvesidir.",
            "Hasan Paşa Hanı, kahvaltı ve kahve molası için en popüler tarihi yerdir.",
            "Ziya Gökalp Müzesi ve Meryem Ana Kilisesi kentin kültürel zenginliğini gösterir.",
            "İçkale bölgesi kentin binlerce yıllık yönetim ve tarih merkezidir."
        ]
    },
    {
        id: 72,
        name: "Batman",
        image: "img/72_batman.jpg",
        kunye: { nufus: "634 Bin", bolge: "Güneydoğu Anadolu", plaka: "72" },
        meshur: "Hasankeyf ve Petrol",
        bilinmesiGerekenler: [
            "Hasankeyf, 12 bin yıllık geçmişiyle medeniyetlerin buluşma noktasıdır.",
            "Türkiye'de petrolün ilk bulunduğu ve çıkarıldığı şehirdir (Raman Dağı).",
            "Zeynel Bey Türbesi, kendine has mimarisi ve çinileriyle çok özeldir.",
            "Batman Çayı üzerindeki Malabadi Köprüsü (sınırda) mimari bir şaheserdir.",
            "Sason çileği ve cevizi kentin en önemli tarımsal markalarıdır.",
            "Kentin modern yerleşimi petrol sanayisiyle birlikte hızla gelişmiştir.",
            "Kozluk İbrahim Bey Camii kentin önemli tarihi yapılarındandır.",
            "Yöresel perde pilavı ve içli köftesi oldukça meşhurdur.",
            "Şehir, Güneydoğu'nun sanayi ve enerji merkezlerinden biridir.",
            "Batman Üniversitesi bölgenin eğitim ve kültür hayatına yön verir."
        ]
    },
    {
        id: 73,
        name: "Şırnak",
        image: "img/73_sirnak.jpg",
        kunye: { nufus: "557 Bin", bolge: "Güneydoğu Anadolu", plaka: "73" },
        meshur: "Cudi Dağı ve Hz. Nuh Türbesi",
        bilinmesiGerekenler: [
            "Nuh'un Gemisi'nin indiği inanılan Cudi Dağı bu il sınırları içindedir.",
            "Hz. Nuh Türbesi kentin en önemli inanç merkezidir.",
            "İsmail Ebul-İz El Cezeri (Sibernetiğin babası) burada yaşamıştır.",
            "Mem u Zin türbesi, destansı bir aşkın tarihsel izlerini barındırır.",
            "Kasrik Boğazı, doğası ve tarihi kalıntılarıyla kentin kapısı gibidir.",
            "Abdaliye Medresesi, kentin köklü eğitim geçmişini temsil eder.",
            "Şırnak şal-şapik kumaşı yöresel kıyafetlerin en değerli parçasıdır.",
            "Kentin yüksek yaylaları hayvancılık ve yayla kültürü için çok uygundur.",
            "Gabar Dağı son yıllarda petrol keşifleriyle gündeme gelmektedir.",
            "Yöresel mutfağında serbidev ve kutlik gibi özgün yemekler bulunur."
        ]
    },
    {
        id: 56,
        name: "Siirt",
        image: "img/56_siirt.jpg",
        kunye: { nufus: "331 Bin", bolge: "Güneydoğu Anadolu", plaka: "56" },
        meshur: "Büryan Kebabı ve Pervari Balı",
        bilinmesiGerekenler: [
            "Büryan (Perive) Kebabı, kuyu tandırda pişen kentin en ünlü lezzetidir.",
            "Pervari Balı, yüksek rakımlı yaylalardan gelen şifalı bir üründür.",
            "Siirt fıstığı, iri taneli yapısıyla Antep fıstığına güçlü bir rakiptir.",
            "Veysel Karani Türbesi, inanç turizminin bölgedeki en önemli noktasıdır.",
            "İbrahim Hakkı Hazretleri'nin 'Işık Hadisesi' düzeneği Tillo'da yer alır.",
            "Siirt battaniyesi, tiftik keçisi kılından yapılan asırlık bir el sanatıdır.",
            "Bıttım sabunu, yabani fıstık yağından yapılan doğal bir temizlik ürünüdür.",
            "Siirt Ulu Camii, kentin en eski ve mimari açıdan özgün yapısıdır.",
            "Kentin yöresel perde pilavı sunumu ve tadıyla özeldir.",
            "Botan Çayı vadisi kentin en etkileyici doğal manzaralarını sunar."
        ]
    },
    {
        id: 79,
        name: "Kilis",
        image: "img/79_kilis.jpg",
        kunye: { nufus: "145 Bin", bolge: "Güneydoğu Anadolu", plaka: "79" },
        meshur: "Kilis Tavası ve Zeytinyağı",
        bilinmesiGerekenler: [
            "Kilis Tavası, zırhla çekilen etin tepsiye yayılmasıyla yapılan bir lezzettir.",
            "Zeytin üretimi kentin binlerce yıllık temel geçim kaynağıdır.",
            "Ravanda Kalesi, kenti tepeden gören tarihi bir savunma yapısıdır.",
            "Kilis katmeri, fıstığı ve kaymağıyla damak çatlatan bir tatlıdır.",
            "Cennet Çamuru, kente özgü farklı bir kadayıf türevi tatlıdır.",
            "Kentin dar sokakları 'kabaltı' denilen geçitlerle doludur.",
            "Üzüm ve pekmez üretimi bölgede çok köklü bir gelenektir.",
            "Eski hamamları ve camileri Osmanlı mimarisinin güzel örnekleridir.",
            "Sınır kenti olması nedeniyle ticari hayat oldukça hareketlidir.",
            "Oylum Höyük, bölgenin en büyük arkeolojik yerleşim alanlarından biridir."
        ]
    },
    {
        id: 4,
        name: "Ağrı",
        image: "img/04_agri.jpg",
        kunye: { nufus: "510 Bin", bolge: "Doğu Anadolu", plaka: "04" },
        meshur: "İshak Paşa Sarayı ve Ağrı Dağı",
        bilinmesiGerekenler: [
            "Türkiye'nin en yüksek noktası Ağrı Dağı'na ev sahipliği yapar.",
            "İshak Paşa Sarayı, Osmanlı mimarisinin doğudaki en zarif eseridir.",
            "Doğubayazıt'taki Meteor Çukuru, dünyanın en büyük ikinci çukurudur.",
            "Nuh'un Gemisi'nin izi olduğu düşünülen oluşum burada yer alır.",
            "Diyadin kaplıcaları ve Murat Nehri kentin doğal zenginlikleridir.",
            "Abdigör Köftesi, kentin en eski ve en meşhur yöresel yemeğidir.",
            "Balık Gölü, Türkiye'nin en yüksek rakımlı göllerinden biridir.",
            "Kışın termometrelerin en düşük değerleri gördüğü illerimizdendir.",
            "Ağrı dağı tırmanışçıları için dünya çapında bir cazibe merkezidir.",
            "Hamur Kümbeti kentin önemli tarihi anıt mezarlarındandır."
        ]
    },
    {
        id: 14,
        name: "Bolu",
        image: "img/14_bolu.jpg",
        kunye: { nufus: "320 Bin", bolge: "Karadeniz", plaka: "14" },
        meshur: "Abant Gölü ve Aşçılık",
        bilinmesiGerekenler: [
            "Mengen ilçesi, Osmanlı'dan beri padişahların aşçılarının yetiştiği yerdir.",
            "Abant Gölü, dört mevsim ayrı güzellik sunan bir doğa harikasıdır.",
            "Gölcük Tabiat Parkı, eviyle meşhur kartpostallık bir manzaraya sahiptir.",
            "Yedigöller Milli Parkı, özellikle sonbaharda bir renk cümbüşüdür.",
            "Kartalkaya, Türkiye'nin en önemli kış turizm merkezlerinden biridir.",
            "Mudurnu ve Göynük, tarihi evleriyle 'Cittaslow' (sakin şehir) ünvanlıdır.",
            "Bolu çikolatası ve fındık şekeri kentin en meşhur hediyeliğidir.",
            "Kentin orman varlığı Türkiye ortalamasının çok üzerindedir.",
            "Seben Kaya Evleri, antik çağın ilginç yerleşim izlerini taşır.",
            "Bolu Kebabı ve Mengen Pilavı mutfağın en özel yemekleridir."
        ]
    },
    {
        id: 81,
        name: "Düzce",
        image: "img/81_duzce.jpg",
        kunye: { nufus: "405 Bin", bolge: "Karadeniz", plaka: "81" },
        meshur: "Samandere Şelalesi ve Fındık",
        bilinmesiGerekenler: [
            "Türkiye'nin 81. ve son il olan şehirdir.",
            "Samandere Şelalesi, tescilli bir tabiat anıtı ve doğa harikasıdır.",
            "Güzeldere Şelalesi, Türkiye'nin en yüksekten dökülen şelalelerindendir.",
            "Akçakoca, kentin Karadeniz'e açılan turistik ve mavi bayraklı kapısıdır.",
            "Konuralp (Prusias ad Hyppium) antik kenti ve tiyatrosu meşhurdur.",
            "Fındık üretimi kentin ekonomisinde çok büyük bir paya sahiptir.",
            "Efteni Gölü, kuş gözlemcileri için önemli bir durak noktasıdır.",
            "Kardüz Yaylası, kış sporları için gelişen bir merkezdir.",
            "Yöresel Çerkez tavuğu ve hamur işleri mutfağın zenginliğini oluşturur.",
            "Düzce köftesi kendine has tadıyla tescilli lezzetler arasındadır."
        ]
    },
    {
        id: 70,
        name: "Karaman",
        image: "img/70_karaman.jpg",
        kunye: { nufus: "260 Bin", bolge: "İç Anadolu", plaka: "70" },
        meshur: "Türkçenin Başkenti ve Karaman Koyunu",
        bilinmesiGerekenler: [
            "Karamanoğlu Mehmet Bey'in Türkçeyi resmi dil ilan ettiği yerdir.",
            "Yunus Emre'nin mezarının olduğu yerlerden biridir.",
            "Binbir Kilise (Karadağ), Bizans döneminin önemli bir dini merkezidir.",
            "Karaman Koyunu, verimliliğiyle ünlü yerli bir hayvan ırkıdır.",
            "Taşkale Tahıl Ambarları, kaya içine oyulmuş devasa doğal depolardır.",
            "İncesu Mağarası, uzunluğu ve içindeki sarkıtlarla dikkat çekicidir.",
            "Kentin bisküvi ve gıda sanayisi Türkiye çapında çok gelişmiştir.",
            "Hatuniye Medresesi, Osmanlı mimarisinin zarif bir örneğidir.",
            "Karaman Kalesi şehrin tarihini yansıtan güçlü bir silüettir.",
            "Divle Obruk Peyniri, dünyanın en kaliteli küflü peynirleri arasında sayılır."
        ]
    },
    {
        id: 19,
        name: "Çorum",
        image: "img/19_corum.jpg",
        kunye: { nufus: "524 Bin", bolge: "Karadeniz", plaka: "19" },
        meshur: "Leblebi ve Hattuşa",
        bilinmesiGerekenler: [
            "Hitit İmparatorluğu'nun başkenti Hattuşa (Boğazkale) buradadır.",
            "Çorum Leblebisi, dünyaca ünlü ve onlarca çeşidi olan bir markadır.",
            "Yazılıkaya Açık Hava Tapınağı, devasa kaya kabartmalarıyla ünlüdür.",
            "Alacahöyük, Anadolu'nun en eski yerleşimlerinden biridir.",
            "Kentin saat kulesi şehrin merkezi ve buluşma noktasıdır.",
            "İskilip Dolması, yapımı saatlerce süren çok özel bir tören yemeğidir.",
            "İncesu Kanyonu, yürüyüş ve doğa sporları için ideal bir parkurdur.",
            "Çorum Müzesi, Hitit dönemine ait eşsiz koleksiyonlara sahiptir.",
            "Osmancık pirinci, Türkiye'nin en kaliteli pirinç üretim bölgelerindendir.",
            "Kargı tulum peyniri bölgenin en sevilen yöresel ürünlerindendir."
        ]
    },
    {
        id: 5,
        name: "Amasya",
        image: "img/05_amasya.jpg",
        kunye: { nufus: "338 Bin", bolge: "Karadeniz", plaka: "05" },
        meshur: "Elma ve Şehzadeler Şehri",
        bilinmesiGerekenler: [
            "Osmanlı şehzadelerinin eğitim gördüğü önemli bir merkezdir.",
            "Kral Kaya Mezarları, Yeşilırmak kenarındaki dağlara oyulmuş görkemli yapılardır.",
            "Amasya Elması (Misket), kokusu ve tadıyla tescilli bir meyvedir.",
            "Yalıboyu Evleri, nehir kenarına dizilmiş klasik Osmanlı mimarisi örnekleridir.",
            "Ferhat ile Şirin efsanesinin yaşandığı şehir olarak bilinir.",
            "Borabay Gölü, orman içindeki muazzam rengiyle büyüleyicidir.",
            "Amasya Genelgesi ile Kurtuluş Savaşı'nın planı burada çizilmiştir.",
            "Şehzadeler Müzesi, kentin tarihsel kimliğini yaşatan bir yerdir.",
            "Sabuncuoğlu Şerefeddin Tıp ve Cerrahi Müzesi ilginç tıp aletleri barındırır.",
            "Hazeranlar Konağı, dönemin sosyal hayatını yansıtan şık bir müzedir."
        ]
    },
    {
        id: 60,
        name: "Tokat",
        image: "img/60_tokat.jpg",
        kunye: { nufus: "602 Bin", bolge: "Karadeniz", plaka: "60" },
        meshur: "Tokat Kebabı ve Yazmacılık",
        bilinmesiGerekenler: [
            "Ballıca Mağarası, dünyanın en büyük ve görkemli mağaralarından biridir.",
            "Tokat Kebabı, kuzu eti ve sebzelerin özel ocaklarda pişmesiyle yapılır.",
            "Tokat yazması, el baskısı motifleriyle kentin simge el sanatıdır.",
            "Tarihi Tokat Kalesi, Kont Dracula'nın bir dönem hapsedildiği yer olarak bilinir.",
            "Niksar ilçesi, Türkiye'nin ilk tescilli şifalı suyu ve tarihiyle ünlüdür.",
            "Zile pekmezi, kente özgü beyaz renkli ve katı formlu bir lezzettir.",
            "Sulu Saray (Sebastopolis) antik kenti bölgenin önemli Roma mirasıdır.",
            "Mahperi Hatun Kervansarayı Selçuklu mimarisinin görkemini taşır.",
            "Hıdırlık Köprüsü, Yeşilırmak üzerindeki en eski ve sağlam köprülerdendir.",
            "Tokat pağacı ve cevizli çöreği kentin sevilen hamur işleridir."
        ]
    },
    {
        id: 26,
        name: "Eskişehir",
        image: "img/26_eskisehir.jpg",
        kunye: { nufus: "906 Bin", bolge: "İç Anadolu", plaka: "26" },
        meshur: "Lüle Taşı ve Porsuk Çayı",
        bilinmesiGerekenler: [
            "Porsuk Çayı'nda gondol ve tekne turlarıyla 'Anadolu'nun Venedik'i'dir.",
            "Odunpazarı Evleri, renkli ve tarihi dokusuyla kentin turizm kalbidir.",
            "Lüle Taşı (Beyaz Altın), dünyada sadece Eskişehir'de çıkan bir madendir.",
            "Sazova Parkı (Bilim Kültür ve Sanat Parkı) masalsı şatosuyla ünlüdür.",
            "Çibörek, Eskişehir mutfağının Tatar kültüründen gelen simge lezzetidir.",
            "Türkiye'nin ilk yerli otomobili 'Devrim', TÜLOMSAŞ müzesinde sergilenir.",
            "Yılmaz Büyükerşen Balmumu Heykeller Müzesi çok popüler bir duraktır.",
            "Şehir, iki büyük üniversitesiyle tam bir öğrenci kentidir.",
            "Frig Vadisi ve Midas Anıtı kentin köklü tarihini yansıtır.",
            "Met helvası kentin en meşhur yöresel tatlısıdır."
        ]
    },
    {
        id: 68,
        name: "Aksaray",
        image: "img/68_aksaray.jpg",
        kunye: { nufus: "433 Bin", bolge: "İç Anadolu", plaka: "68" },
        meshur: "Ihlara Vadisi ve Malaklı Köpeği",
        bilinmesiGerekenler: [
            "Ihlara Vadisi, dünyanın en büyük kanyonlarından biridir ve kaya kiliseleriyle doludur.",
            "Hasandağı, kentin silüetini oluşturan görkemli bir sönmüş volkandır.",
            "Aksaray Malaklısı, dünyanın en iri çoban köpeği ırklarından biridir.",
            "Eğri Minare (Kızıl Minare), Selçuklu döneminden kalan ve hafif eğik olan bir yapıdır.",
            "Sultanhanı, Anadolu'nun en büyük ve en güzel kervansarayıdır.",
            "Güzelyurt (Gelveri), tarihi taş evleri ve yer altı şehirleriyle Kapadokya'nın bir parçasıdır.",
            "Tuz Gölü'nün bir kısmı Aksaray sınırları içindedir.",
            "Aşıklı Höyük, Orta Anadolu'nun bilinen en eski köy yerleşimidir.",
            "Yöresel Aksaray tava ve sıkma yemeği oldukça meşhurdur.",
            "Somuncu Baba Türbesi ve Külliyesi kentin manevi duraklarındandır."
        ]
    },
    {
        id: 69,
        name: "Bayburt",
        image: "img/69_bayburt.jpg",
        kunye: { nufus: "85 Bin", bolge: "Karadeniz", plaka: "69" },
        meshur: "Bayburt Kalesi ve Baksı Müzesi",
        bilinmesiGerekenler: [
            "Bayburt Kalesi (Çinimaçin), kenti tepeden gören en görkemli yapıdır.",
            "Baksı Müzesi, Avrupa Konseyi Müze Ödülü almış, modern ve geleneksel sanatı birleştiren bir yerdir.",
            "Çoruh Nehri, kentin ortasından geçen ve rafting için kullanılan güçlü bir akarsudur.",
            "Kenan Yavuz Etnografya Müzesi, köy yaşamını ve kültürünü yaşatan ödüllü bir müzedir.",
            "Dede Korkut Türbesi, Türk dünyası için çok önemli bir kültürel duraktır.",
            "Aydıntepe Yer Altı Şehri, tüf kayalara oyulmuş gizemli bir yerleşimdir.",
            "Bayburt lor dolması kentin en özgün ve lezzetli yöresel yemeğidir.",
            "Sırakayalar Şelaleleri doğa ile baş başa kalmak için idealdir.",
            "Kentin balı ve hayvansal ürünleri yüksek kalitesiyle bilinir.",
            "Kop Dağı kış sporları ve tarihi önemiyle kentin kilit noktalarındandır."
        ]
    },
    {
        id: 80,
        name: "Osmaniye",
        image: "img/80_osmaniye.jpg",
        kunye: { nufus: "560 Bin", bolge: "Akdeniz", plaka: "80" },
        meshur: "Yer Fıstığı ve Karatepe-Aslantaş",
        bilinmesiGerekenler: [
            "Türkiye'nin yer fıstığı üretim ve ticaret merkezidir.",
            "Karatepe-Aslantaş Açık Hava Müzesi, Hitit dönemine ait nadir eserler barındırır.",
            "Kentin kaleler şehri olarak bilinmesini sağlayan onlarca tarihi kalesi vardır.",
            "Zorkun Yaylası, Çukurova'nın en büyük ve popüler yaylalarındandır.",
            "Kastabala Antik Kenti ve sütunlu yolu kentin antik görkemini yansıtır.",
            "Osmaniye simidi, pekmezli ve susamlı tadıyla çok sevilir.",
            "Yer fıstıklı şekerleme ve ürünleri en popüler hediyeliğidir.",
            "Toprakkale Kalesi, kavşak noktasında nöbet tutan dev bir yapıdır.",
            "Sabun Çayı şelaleleri serinlemek için tercih edilen doğa alanlarıdır.",
            "Kentin mutfağında etli kömbe ve içli köfte baş köşededir."
        ]
    }
];













