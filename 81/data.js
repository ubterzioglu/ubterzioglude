const citiesData = [
   {
        id: 1,
        name: "Adana",
        image: "img/01_adana.jpg",
        kunye: { nufus: "2.3 Milyon", bolge: "Akdeniz", plaka: "01" },
        meshur: "Adana Kebap ve Taş Köprü",
        bilinmesiGerekenler: [
            "Dünyanın en eski ve hala kullanılan köprülerinden olan Taş Köprü buradadır.",
            "Adana Kebap, zırhla çekilen etiyle kentin dünyaya sunduğu bir lezzettir.",
            "Sabancı Merkez Camii, Orta Doğu'nun en büyük camilerinden biridir.",
            "Varda Köprüsü (Alman Köprüsü), sinematik ve devasa bir demiryolu yapısıdır.",
            "Çukurova, Türkiye'nin en bereketli tarım ovasıdır.",
            "Şalgam suyu kentin milli içeceği gibidir.",
            "Bici bici, sıcak yaz günlerinin serinletici buzlu tatlısıdır.",
            "Portakal Çiçeği Karnavalı, Türkiye'nin ilk sokak karnavalıdır.",
            "Misis Antik Kenti ve Mozaik Müzesi tarih meraklıları içindir.",
            "Seyhan Baraj Gölü kıyısı dinlenme ve spor alanıdır."
        ]
    },
    {
        id: 2,
        name: "Adıyaman",
        image: "img/02_adiyaman.jpg",
        kunye: { nufus: "632 Bin", bolge: "Güneydoğu Anadolu", plaka: "02" },
        meshur: "Nemrut Dağı ve Çiğ Köfte",
        bilinmesiGerekenler: [
            "Nemrut Dağı'ndaki devasa kral heykelleri dünyanın 8. harikası olarak anılır.",
            "Nemrut'ta gün doğumu ve gün batımı en etkileyici manzaralardan biridir.",
            "Etsiz Çiğ Köfte, kentin tüm ülkeye yayılmış en meşhur lezzetidir.",
            "Cendere Köprüsü, Roma döneminden kalan ve hala ayakta olan muhteşem bir yapıdır.",
            "Perre Antik Kenti kaya mezarları kentin köklü tarihini yansıtır.",
            "Atatürk Barajı kentin coğrafyasını ve ekonomisini değiştirmiş dev bir eserdir.",
            "Adıyaman kahvesi (Kervansaray) kente özgü karışımıyla ünlüdür.",
            "Arsemia antik kenti Kommagene krallığının önemli bir yönetim merkezidir.",
            "Pirin mozaikleri kentin gizli kalmış sanat eserleridir.",
            "Yöresel meyir çorbası kentin iç ısıtan lezzetidir."
        ]
    },
    {
        id: 3,
        name: "Afyonkarahisar",
        image: "img/03_afyon.jpg",
        kunye: { nufus: "744 Bin", bolge: "Ege", plaka: "03" },
        meshur: "Sucuk, Lokum ve Termal Kaplıcalar",
        bilinmesiGerekenler: [
            "Türkiye'nin termal başkenti olarak bilinir.",
            "Afyon sucuğu ve kaymağı tescilli lezzetleridir.",
            "Karahisar Kalesi, 226 metre yükseklikteki volkanik bir kaya üzerindedir.",
            "Haşhaş üretimi ve haşhaşlı çörekleri çok meşhurdur.",
            "Büyük Taarruz'un başladığı Kocatepe bu il sınırları içindedir.",
            "Mermer ocaklarıyla dünyanın en kaliteli mermerlerini üretir.",
            "Frig Vadisi'nin önemli bir bölümü buradadır.",
            "Afyon lokumu, yumuşaklığı ve çeşitleriyle ünlüdür.",
            "İhsaniye ve Gazlıgöl bölgesi şifalı sularıyla tanınır.",
            "Şehir, yolların kesişme noktası olduğu için önemli bir durak yeridir."
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
        id: 6,
        name: "Ankara",
        image: "img/06_ankara.jpg",
        kunye: { nufus: "5.8 Milyon", bolge: "İç Anadolu", plaka: "06" },
        meshur: "Anıtkabir ve Ankara Kalesi",
        bilinmesiGerekenler: [
            "Türkiye Cumhuriyeti'nin kalbi ve başkentidir.",
            "Anıtkabir, Atatürk'ün ebedi istirahatgahıdır.",
            "Anadolu Medeniyetleri Müzesi, dünyanın sayılı müzeleri arasındadır.",
            "Eski Meclis binaları (I. ve II. TBMM) tarihe tanıklık eder.",
            "Ankara Kalesi, kentin en eski ve panoramik noktasıdır.",
            "Kızılay Meydanı ve Tunalı Hilmi kentin sosyal merkezleridir.",
            "Ankara tiftik keçisi (Angora) ve tavşanı dünyaca ünlüdür.",
            "Atakule, şehrin modern simgesi ve seyir terasıdır.",
            "Ankara tavası, kentin en sevilen geleneksel et yemeğidir.",
            "Eymir Gölü ve Kuğulu Park, şehirlilerin nefes alma noktalarıdır."
        ]
    },
    {
        id: 7,
        name: "Antalya",
        image: "img/07_antalya.jpg",
        kunye: { nufus: "2.6 Milyon", bolge: "Akdeniz", plaka: "07" },
        meshur: "Kaleiçi, Plajlar ve Düden Şelalesi",
        bilinmesiGerekenler: [
            "Türkiye'nin turizm başkenti olarak kabul edilir.",
            "Kaleiçi (Old Town), Osmanlı mimarisini yansıtan dar sokaklara sahiptir.",
            "Aspendos Tiyatrosu, dünyada en iyi korunmuş antik tiyatrolardan biridir.",
            "Düden ve Kurşunlu şelaleleri doğa harikası duraklardır.",
            "Konyaaltı ve Lara, şehrin merkezindeki devasa plajlardır.",
            "Kaş ve Kalkan bölgeleri dalış tutkunlarının dünya çapındaki merkezidir.",
            "Antalya Müzesi, eşsiz antik heykel koleksiyonlarına ev sahipliği yapar.",
            "Saklıkent'te kışın sabah kayak yapıp, öğleden sonra denize girebilirsiniz.",
            "Olimpos ve Çıralı, doğa ile iç içe tatil bölgeleridir.",
            "Turunçgil ve muz üretimiyle Türkiye'nin tarım devidir."
        ]
    },
    {
        id: 8,
        name: "Artvin",
        image: "img/08_artvin.jpg",
        kunye: { nufus: "170 Bin", bolge: "Karadeniz", plaka: "08" },
        meshur: "Borçka Karagöl ve Boğa Güreşleri",
        bilinmesiGerekenler: [
            "Borçka Karagöl, yansımasıyla dünyanın en güzel gölleri arasında sayılır.",
            "Kafkasör Boğa Güreşleri, kentin en heyecanlı geleneksel festivalidir.",
            "Şavşat (Cittaslow), masalsı doğası ve ahşap evleriyle bir huzur adasıdır.",
            "Dünyanın en büyük Atatürk Heykeli kentin tepesinde yer alır.",
            "Meneçuna Şelalesi ve Çifte Köprüler mimari ve doğa uyumunun kanıtıdır.",
            "Hatila Vadisi Cam Terası, Türkiye'nin en yüksek seyir teraslarındandır.",
            "Arhavi ve Hopa sahilleri Karadeniz'in hırçın dokusunu yansıtır.",
            "Yöresel puçuko ve caşur mutfağın özgün ot ve sebze yemekleridir.",
            "Çoruh Nehri, dünyanın en hızlı akan ve rafting yapılan nehirlerindendir.",
            "Camili (Macahel) bölgesi, Türkiye'nin ilk biyosfer rezerv alanıdır."
        ]
    },
    {
        id: 9,
        name: "Aydın",
        image: "img/09_aydin.jpg",
        kunye: { nufus: "1.1 Milyon", bolge: "Ege", plaka: "09" },
        meshur: "İncir ve Kuşadası",
        bilinmesiGerekenler: [
            "Dünya incir üretiminin merkezidir.",
            "Kuşadası ve Didim, Türkiye'nin en popüler tatil ilçelerindendir.",
            "Apollon Tapınağı (Didim), antik dünyanın en büyük tapınaklarındandır.",
            "Zeytin ve zeytinyağı üretiminde Türkiye liderlerindendir.",
            "Tralles Antik Kenti ve 'Üç Gözler' kentin simgesidir.",
            "Aydın dağlarından yağ, ovalarından bal akar sözüyle bilinir.",
            "Efeler ve Zeybek kültürü kentin ruhunu yansıtır.",
            "Dilek Yarımadası Milli Parkı, doğa ve denizin birleştiği noktadır.",
            "Yöresel Yuvarlama yemeği mutlaka tadılması gereken bir lezzettir.",
            "Milet Antik Kenti felsefe ve bilimin doğduğu yerlerden biridir."
        ]
    },
    {
        id: 10,
        name: "Balıkesir",
        image: "img/10_balikesir.jpg",
        kunye: { nufus: "1.2 Milyon", bolge: "Marmara", plaka: "10" },
        meshur: "Ayvalık, Cunda ve Höşmerim",
        bilinmesiGerekenler: [
            "Hem Ege hem de Marmara Denizi'ne kıyısı olan nadir illerdendir.",
            "Kaz Dağları (İda Dağı), dünyanın en yüksek oksijen oranlı yerlerindendir.",
            "Ayvalık ve Cunda Adası, Rum mimarisi ve zeytinyağlılarıyla meşhurdur.",
            "Höşmerim tatlısı kentin en bilinen yerel lezzetidir.",
            "Manyas Kuş Cenneti, yüzlerce kuş türüne ev sahipliği yapar.",
            "Susurluk ayranı ve tostu bir yol üstü klasiğidir.",
            "Şeytan Sofrası'ndan Ayvalık adaları üzerine gün batımını izlemek eşsizdir.",
            "Erdek ve Bandırma, Marmara'nın önemli turizm ve sanayi noktalarıdır.",
            "Sındırgı Yağcıbedir halıları geleneksel motifleriyle tanınır.",
            "Balıkesir, Türkiye'nin süt ve et hayvancılığında öncü illerindendir."
        ]
    },
    {
        id: 11,
        name: "Bilecik",
        image: "img/11_bilecik.jpg",
        kunye: { nufus: "228 Bin", bolge: "Marmara", plaka: "11" },
        meshur: "Şeyh Edebali Türbesi ve Osmanlı'nın Kuruluşu",
        bilinmesiGerekenler: [
            "Osmanlı İmparatorluğu'nun temellerinin atıldığı topraklardır.",
            "Şeyh Edebali Türbesi, kentin en önemli manevi durak noktasıdır.",
            "Söğüt ilçesinde her yıl Ertuğrul Gazi'yi Anma törenleri yapılır.",
            "Bilecik mermeri dünyaca ünlü yapılarda kullanılmaktadır.",
            "Pazaryeri ilçesindeki boza ve helva kentin sevilen tadıdır.",
            "Pelitözü Göleti, piknik ve doğa yürüyüşleri için idealdir.",
            "Harmankaya Kanyonu macera tutkunları için popüler bir rotadır.",
            "Bilecik bezi, kente özgü geleneksel bir dokumadır.",
            "Osmaneli evleri, sivil mimarinin en güzel örneklerini sunar.",
            "Şehir, sanayi kuruluşları ve demiryolu geçiş güzergahıyla önemlidir."
        ]
    },
    {
        id: 12,
        name: "Bingöl",
        image: "img/12_bingol.jpg",
        kunye: { nufus: "282 Bin", bolge: "Doğu Anadolu", plaka: "12" },
        meshur: "Yüzen Adalar ve Bingöl Balı",
        bilinmesiGerekenler: [
            "Yüzen Adalar (Solhan), krater gölünde hareket eden doğa mucizeleridir.",
            "Bingöl Balı, yüksek yayla çiçeklerinden elde edilen ödüllü bir lezzettir.",
            "Güneşin doğuşunu en iyi izleyebileceğiniz yerlerden biri olan Kale Tepesi buradadır.",
            "Hesarek Kayak Merkezi, kış sporları için yeni ve popüler bir duraktır.",
            "Bin Göl efsanesi bölgenin zengin su kaynaklarını anlatır.",
            "Kırkkale efsanesi ve yerel hikayeler sözlü kültürde çok güçlüdür.",
            "Çır Şelalesi ilkbaharda devasa bir debiyle akar.",
            "Yöresel gömme (gömbe) ve keldoş mutfağın temelini oluşturur.",
            "Kığı Kalesi tarihi kalıntılarıyla kentin geçmişine ışık tutar.",
            "Şehir, kaplıca ve termal suları bakımından da oldukça zengindir."
        ]
    },
    {
        id: 13,
        name: "Bitlis",
        image: "img/13_bitlis.jpg",
        kunye: { nufus: "350 Bin", bolge: "Doğu Anadolu", plaka: "13" },
        meshur: "Büryan Kebabı ve Ahlat Selçuklu Mezarlığı",
        bilinmesiGerekenler: [
            "Ahlat Selçuklu Meydan Mezarlığı, dünyanın en büyük İslam mezarlığıdır.",
            "Nemrut Krater Gölü, dünyanın ikinci büyük krater gölü ve bir doğa harikasıdır.",
            "Büryan Kebabı, kuyu içinde saatlerce pişirilerek hazırlanan bir lezzettir.",
            "Bitlis Kalesi beş minareli şehir türküsüne konu olan silüetin parçasıdır.",
            "Adilcevaz Cevizi, büyüklüğü ve kalitesiyle Türkiye'nin en iyilerindendir.",
            "Bitlis Evleri, kesme taştan yapılan karakteristik mimarisiyle bilinir.",
            "El-Aman Hanı, Anadolu'nun en büyük kervansaraylarından biridir.",
            "Tatvan sahili, Van Gölü kıyısındaki modern ve hareketli bir duraktır.",
            "Bitlis balı, kentin yüksek rakımlı yaylalarından süzülen şifadır.",
            "İlçe isimlerinden olan Mutki ve Hizan el sanatlarıyla tanınır."
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
            "Mudurnu ve Göynük, tarihi evleriyle Cittaslow (sakin şehir) ünvanlıdır.",
            "Bolu çikolatası ve fındık şekeri kentin en meşhur hediyeliğidir.",
            "Kentin orman varlığı Türkiye ortalamasının çok üzerindedir.",
            "Seben Kaya Evleri, antik çağın ilginç yerleşim izlerini taşır.",
            "Bolu Kebabı ve Mengen Pilavı mutfağın en özel yemekleridir."
        ]
    },
    {
        id: 15,
        name: "Burdur",
        image: "img/15_burdur.jpg",
        kunye: { nufus: "273 Bin", bolge: "Akdeniz", plaka: "15" },
        meshur: "Salda Gölü ve Sagalassos",
        bilinmesiGerekenler: [
            "Salda Gölü, beyaz kumu ve turkuaz suyuyla 'Türkiye'nin Maldivleri'dir.",
            "Sagalassos Antik Kenti, görkemli Antoninler Çeşmesi ile ünlüdür.",
            "İnsuyu Mağarası, Türkiye'nin turizme açılan ilk mağarasıdır.",
            "Burdur Şiş, kentin en sevilen yerel et yemeğidir.",
            "Kibyra Antik Kenti, devasa stadı ve Medusa mozaiğiyle bilinir.",
            "Teke Yöresi'nin kültürel başkenti olarak kabul edilir.",
            "Burdur Arkeoloji Müzesi çok zengin bir koleksiyona sahiptir.",
            "Ceviz ezmesi kentin tescilli ve geleneksel tatlısıdır.",
            "Lisinia Doğa Projesi yaban hayatı koruma merkezidir.",
            "Burdur Gölü, flamingo ve birçok kuş türünün durak noktasıdır."
        ]
    },
    {
        id: 16,
        name: "Bursa",
        image: "img/16_bursa.jpg",
        kunye: { nufus: "3.1 Milyon", bolge: "Marmara", plaka: "16" },
        meshur: "İskender Kebap ve Uludağ",
        bilinmesiGerekenler: [
            "Osmanlı İmparatorluğu'nun ilk başkentidir.",
            "Uludağ, Türkiye'nin en popüler kış sporları ve kayak merkezidir.",
            "İskender Kebap, kentin dünyaya armağan ettiği en meşhur lezzettir.",
            "Yeşil Türbe ve Ulu Cami, Türk-İslam mimarisinin zirve eserleridir.",
            "Bursa ipeği ve tekstili tarih boyunca dünyaca ünlü olmuştur.",
            "Kestane şekeri, Bursa denince akla gelen ilk hediyeliktir.",
            "Cumalıkızık Köyü, UNESCO Dünya Mirası listesinde bir Osmanlı köyüdür.",
            "Tarihi Çınar (İnkaya Çınarı), 600 yılı aşkın yaşıyla devasa bir anıttır.",
            "Mudanya ve Trilye, kentin deniz kıyısındaki tarihi duraklarıdır.",
            "Şehir, otomotiv sanayisinin Türkiye'deki kalbidir."
        ]
    },
    {
        id: 17,
        name: "Çanakkale",
        image: "img/17_canakkale.jpg",
        kunye: { nufus: "560 Bin", bolge: "Marmara", plaka: "17" },
        meshur: "Şehitler Abidesi ve Truva Atı",
        bilinmesiGerekenler: [
            "Çanakkale Savaşı'nın yaşandığı tarihi Gelibolu Yarımadası buradadır.",
            "Truva Antik Kenti (Troy), binlerce yıllık efsanelere ev sahipliği yapar.",
            "Aynalı Çarşı, kentin simge türkülerine konu olmuş bir alışveriş yeridir.",
            "Gökçeada ve Bozcaada, Türkiye'nin en büyük ve turistik adalarıdır.",
            "Assos (Behramkale), Antik limanı ve felsefe tarihiyle ünlüdür.",
            "Çanakkale Boğazı, Asya ve Avrupa'yı birbirine bağlayan stratejik yoldur.",
            "Peynir helvası, kentin en sevilen geleneksel tatlısıdır.",
            "Kilitbahir Kalesi, boğazın en dar noktasında yükselen dev bir yapıdır.",
            "Kaz Dağları'nın bir kısmı kentin güneyinde doğa turizmi imkanı sunar.",
            "Truva Atı (film versiyonu) kentin sahil kordonunda sergilenmektedir."
        ]
    },
    {
        id: 18,
        name: "Çankırı",
        image: "img/18_cankiri.jpg",
        kunye: { nufus: "196 Bin", bolge: "İç Anadolu", plaka: "18" },
        meshur: "Tuz Mağarası ve Yaren Kültürü",
        bilinmesiGerekenler: [
            "Tuz Mağarası, Hititlerden beri kullanılan devasa bir tuz madenidir.",
            "Yarenlik kültürü, kentin köklü bir yardımlaşma geleneğidir.",
            "Çankırı Kalesi kenti tepeden gören tarihi bir noktadır.",
            "Taş Mescit, Selçuklu döneminden kalan önemli bir tıp merkezi kalıntısıdır.",
            "Kentin kaya tuzu tüm Türkiye'de sofraların vazgeçilmezidir.",
            "Eldivan kirazı kentin en meşhur meyvesidir.",
            "Ilgaz Dağı kış sporları için önemli bir kayak merkezine sahiptir.",
            "Yöresel ince ekmek muskası ve takılmaca yemeği meşhurdur.",
            "Cendere Höyük tarih öncesi yerleşim izlerini barındırır.",
            "Tuz lambaları kentin en popüler hediyelik eşyasıdır."
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
        id: 20,
        name: "Denizli",
        image: "img/20_denizli.jpg",
        kunye: { nufus: "1.05 Milyon", bolge: "Ege", plaka: "20" },
        meshur: "Pamukkale Travertenleri ve Horoz",
        bilinmesiGerekenler: [
            "Pamukkale Travertenleri, dünyada eşi benzeri olmayan bir doğa harikasıdır.",
            "Hierapolis Antik Kenti, UNESCO Dünya Mirası listesinde yer alır.",
            "Denizli Horozu, kendine has ötüşü ve heybetiyle kentin sembolüdür.",
            "Tekstil ve havlu üretimiyle dünya çapında bir ticaret merkezidir.",
            "Laodikya Antik Kenti, İncil'de adı geçen 7 kiliseden birine sahiptir.",
            "Karahayıt kaplıcaları kırmızı renkli şifalı sularıyla ünlüdür.",
            "Buldan bezi, el tezgahlarında dokunan geleneksel bir üründür.",
            "Denizli Kebabı (Fırın Kebabı), elle yenen özel bir lezzettir.",
            "Honaz Dağı Milli Parkı, Ege'nin en yüksek noktalarından biridir.",
            "Teleferik ile Bağbaşı Yaylası'na çıkıp şehir manzarasını izleyebilirsiniz."
        ]
    },
    {
        id: 21,
        name: "Diyarbakır",
        image: "img/21_diyarbakir.jpg",
        kunye: { nufus: "1.8 Milyon", bolge: "Güneydoğu Anadolu", plaka: "21" },
        meshur: "Diyarbakır Surları ve Karpuz",
        bilinmesiGerekenler: [
            "Diyarbakır Surları, dünyanın en uzun ve sağlam antik yapılarındandır.",
            "Hevsel Bahçeleri, binlerce yıldır tarım yapılan bir dünya mirasıdır.",
            "Ulu Cami, İslam dünyasının 5. Harem-i Şerif'i kabul edilir.",
            "Karpuzu, devasa boyutlarıyla kentin tarımsal simgesidir.",
            "On Gözlü Köprü, Dicle Nehri üzerinde tarihe tanıklık eder.",
            "Cahit Sıtkı Tarancı Müzesi, geleneksel ev mimarisini yansıtır.",
            "Diyarbakır ciğer kebabı ve kaburga dolması mutfağın zirvesidir.",
            "Hasan Paşa Hanı, kahvaltı ve kahve molası için en popüler yerdir.",
            "Ziya Gökalp Müzesi kentin kültürel zenginliğini gösterir.",
            "İçkale bölgesi kentin binlerce yıllık yönetim ve tarih merkezidir."
        ]
    },
    {
        id: 22,
        name: "Edirne",
        image: "img/22_edirne.jpg",
        kunye: { nufus: "414 Bin", bolge: "Marmara", plaka: "22" },
        meshur: "Selimiye Camii ve Kırkpınar Yağlı Güreşleri",
        bilinmesiGerekenler: [
            "Mimar Sinan'ın 'ustalık eserim' dediği Selimiye Camii buradadır.",
            "Osmanlı İmparatorluğu'na 92 yıl boyunca başkentlik yapmıştır.",
            "Tarihi Kırkpınar Yağlı Güreşleri, dünyanın en eski spor organizasyonlarından biridir.",
            "Tava Ciğeri, kentin dünyaya nam salmış en meşhur lezzetidir.",
            "Eski Camii ve Üç Şerefeli Camii mimari açıdan çok değerlidir.",
            "Meriç ve Tunca köprüleri gün batımı manzaralarıyla ünlüdür.",
            "Sağlık Müzesi (II. Bayezid Külliyesi), döneminin en ileri tıp merkezidir.",
            "Badem ezmesi ve Kavala kurabiyesi kentin en tatlı hediyelikleridir.",
            "Karaağaç semti, tarihi gar binası ve kafeleriyle kentin huzur köşesidir.",
            "Sarayiçi bölgesi her yıl kışın Kakava şenliklerine ev sahipliği yapar."
        ]
    },
    {
        id: 23,
        name: "Elazığ",
        image: "img/23_elazig.jpg",
        kunye: { nufus: "591 Bin", bolge: "Doğu Anadolu", plaka: "23" },
        meshur: "Harput ve Gakgoş Kültürü",
        bilinmesiGerekenler: [
            "Tarihi Harput şehri ve Eğri Minare kentin en önemli tarihi mirasıdır.",
            "Hazar Gölü, içinde batık şehir bulunan masmavi bir tektonik göldür.",
            "Çayda Çıra oyunu, kentin dünyaca ünlü folklorik sembolüdür.",
            "Gakgoş ünvanı, kentin insanının samimiyetini temsil eder.",
            "Orcik (cevizli sucuk), kentin en ünlü tatlısıdır.",
            "Hazarbaba Kayak Merkezi, göl manzarasına karşı kayak imkanı sunar.",
            "Elazığ Kapalı Çarşı, taze yerel ürünlerin ve peynirlerin merkezidir.",
            "Harput Köftesi ve İçli Köfte kentin tescilli lezzetleridir.",
            "Keban Barajı, inşa edildiği dönemde Türkiye'nin en büyük enerji kaynağıdır.",
            "Buzluk Mağarası, yazın bile içinde doğal buzların oluştuğu yerdir."
        ]
    },
    {
        id: 24,
        name: "Erzincan",
        image: "img/24_erzincan.jpg",
        kunye: { nufus: "237 Bin", bolge: "Doğu Anadolu", plaka: "24" },
        meshur: "Tulum Peyniri ve Bakır İşlemeciliği",
        bilinmesiGerekenler: [
            "Erzincan Tulum Peyniri, derilerde bekletilen eşsiz bir lezzettir.",
            "Girlevik Şelalesi, kışın buz tutan görüntüsüyle büyüleyicidir.",
            "Bakır el işlemeciliği kentin asırlardır devam eden sanatıdır.",
            "Karanlık Kanyon (Kemaliye), dünyanın en derin kanyonlarından biridir.",
            "Erzincan üzümü (Cimin üzümü) siyah renkli ve ince kabukludur.",
            "Ergan Dağı kayak merkezi, göl manzaralı kayak imkanı sunar.",
            "Şehir, düzenli yerleşimi ve geniş caddeleriyle dikkat çeker.",
            "Kemaliye (Eğin) evleri ve taş yolu tarihi bir mirastır.",
            "Erzincan çorbası ve ketesi kentin en sevilen yerel tatlarıdır.",
            "Ekşisu mesire alanı doğal maden suyu kaynaklarına sahiptir."
        ]
    },
    {
        id: 25,
        name: "Erzurum",
        image: "img/25_erzurum.jpg",
        kunye: { nufus: "750 Bin", bolge: "Doğu Anadolu", plaka: "25" },
        meshur: "Cağ Kebabı ve Palandöken",
        bilinmesiGerekenler: [
            "Palandöken Kayak Merkezi, dünyanın en uzun pistlerine sahiptir.",
            "Cağ Kebabı, yatık döner şeklinde pişirilen kentin lezzetidir.",
            "Çifte Minareli Medrese, Selçuklu mimarisinin sembolüdür.",
            "Oltu Taşı el işçiliği (tespih ve takı), kentin en değerli zanaatıdır.",
            "Erzurum Kongre Binası, Kurtuluş Savaşı'nın temellerinin atıldığı yerdir.",
            "Üç Kümbetler, Anadolu'daki anıt mezarların en güzel örnekleridir.",
            "Tortum Şelalesi, Türkiye'nin en büyük şelalelerinden biridir.",
            "Kadayıf dolması, kentin en ağır ve en lezzetli geleneksel tatlısıdır.",
            "Yakutiye Medrese, devasa taç kapısıyla dikkat çeken bir eserdir.",
            "Kıtlama şekerli çay kültürü, Erzurum'un günlük yaşam ritüelidir."
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
            "Odunpazarı Evleri, renkli dokusuyla kentin turizm kalbidir.",
            "Lüle Taşı (Beyaz Altın), dünyada sadece Eskişehir'de çıkan bir madendir.",
            "Sazova Parkı masalsı şatosuyla ünlüdür.",
            "Çibörek, kentin Tatar kültüründen gelen simge lezzetidir.",
            "Türkiye'nin ilk yerli otomobili 'Devrim' burada sergilenir.",
            "Yılmaz Büyükerşen Balmumu Heykeller Müzesi çok popülerdir.",
            "Şehir, iki büyük üniversitesiyle tam bir öğrenci kentidir.",
            "Frig Vadisi ve Midas Anıtı kentin köklü tarihini yansıtır.",
            "Met helvası kentin en meşhur yöresel tatlısıdır."
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
            "Baklava, kentin dünyaca ünlü en büyük markasıdır.",
            "Antep fıstığı, kentin ekonomisinin altın değeridir.",
            "Tarihi Antep Kalesi, şehrin merkezinde heybetle yükselir.",
            "Bakırcılar Çarşısı'nda geleneksel sanat yaşatılır.",
            "Beyran çorbası, kentin vazgeçilmez kahvaltısıdır.",
            "Rumkale, Fırat Nehri üzerinde büyüleyici bir manzaraya sahiptir.",
            "Katmer, kentin en sevilen tatlı kahvaltı seçeneğidir.",
            "Tahmis Kahvesi, 1635 yılından beri hizmet veren tarihi bir mekandır."
        ]
    },
    {
        id: 28,
        name: "Giresun",
        image: "img/28_giresun.jpg",
        kunye: { nufus: "450 Bin", bolge: "Karadeniz", plaka: "28" },
        meshur: "Kiraz, Fındık ve Giresun Adası",
        bilinmesiGerekenler: [
            "Dünyaya kirazın yayıldığı şehir olarak kabul edilir.",
            "Giresun Adası, Karadeniz'in yaşama açık tek adasıdır.",
            "Kümbet ve Kulakkaya yaylaları doğa turizminin odak noktalarıdır.",
            "Giresun Kalesi kenti ikiye bölen bir yarımada üzerindedir.",
            "Mavi Göl (Palanlı), turkuaz rengiyle görenleri büyüler.",
            "Tirebolu çayı, aroması ve kalitesiyle çok özeldir.",
            "Göksu Travertenleri, 'Karadeniz'in Pamukkalesi' olarak anılır.",
            "Yöresel pırasa pastası ve karalahana diblesi mutfağın yıldızlarıdır.",
            "Zeytinlik Semti, tarihi taş evleriyle kentin eski ruhunu korur.",
            "Giresun fındığı, yağ oranıyla dünyanın en lezzetlisi tescillidir."
        ]
    },
    {
        id: 29,
        name: "Gümüşhane",
        image: "img/29_gumushane.jpg",
        kunye: { nufus: "141 Bin", bolge: "Karadeniz", plaka: "29" },
        meshur: "Pestil, Köme ve Karaca Mağarası",
        bilinmesiGerekenler: [
            "Karaca Mağarası, dünyanın en güzel mağaralarından biri sayılır.",
            "Pestil ve Köme üretimi, kentin en büyük markasıdır.",
            "Santa Harabeleri, terk edilmiş tarihi bir Rum yerleşimidir.",
            "Kürtün Araköy ekmeği, dev boyutuyla günlerce taze kalır.",
            "Tomara Şelalesi, dağın ortasından fışkıran sularıyla eşsizdir.",
            "Kentin eski adı gümüş madenlerinin zenginliğini anlatır.",
            "Kov Kalesi kenti tepeden koruyan görkemli bir yapıdır.",
            "Kadırga Yaylası, her yıl binlerce kişinin katıldığı şenlikleriyle meşhurdur.",
            "Limni Gölü, orman içindeki huzurlu atmosferiyle bilinir.",
            "Siron, kente özgü bir hamur işi yemeğidir."
        ]
    },
    {
        id: 30,
        name: "Hakkari",
        image: "img/30_hakkari.jpg",
        kunye: { nufus: "280 Bin", bolge: "Doğu Anadolu", plaka: "30" },
        meshur: "Cilo Dağları ve Ters Lale",
        bilinmesiGerekenler: [
            "Türkiye'nin en yüksek dağlık bölgelerinden biridir.",
            "Ters Lale (Ağlayan Gelin), dünyada çok az yerde yetişen nadir bir çiçektir.",
            "Cilo Buzulları, binlerce yıllık buz kütlelerini barındırır.",
            "Hakkari kilimleri üzerindeki motiflerle binlerce yıllık dili anlatır.",
            "Merga Bütan Kayak Merkezi, kış sporları için popülerdir.",
            "Zap Suyu, hırçın akıntısıyla bölgenin en güçlü nehridir.",
            "Hakkari mutfağının baş tacı olan 'Doaba' mutlaka tadılmalıdır.",
            "Seyithan Gölü ve Sat Gölleri yüksek rakımlı buzul gölleridir.",
            "Meydan Medresesi kentin köklü kültür geçmişini temsil eder.",
            "Şehir, sarp vadileriyle doğa sporları için dev bir potansiyeldir."
        ]
    },
    {
        id: 31,
        name: "Hatay",
        image: "img/31_hatay.jpg",
        kunye: { nufus: "1.6 Milyon", bolge: "Akdeniz", plaka: "31" },
        meshur: "Künefe ve Medeniyetler Sofrası",
        bilinmesiGerekenler: [
            "UNESCO Gastronomi Şehri olarak tescillenmiştir.",
            "Künefe, taze peyniri ve şerbetiyle kentin simge tatlısıdır.",
            "St. Pierre Kilisesi, dünyanın ilk mağara kiliselerinden biridir.",
            "Hatay Arkeoloji Müzesi, dünyanın en büyük mozaik koleksiyonuna sahiptir.",
            "Eski Antakya evleri ve dar sokakları tarih kokar.",
            "Habib-i Neccar Camii, Anadolu'nun ilk camisi olarak kabul edilir.",
            "Samandağ'daki Titus Tüneli, antik çağın mühendislik harikasıdır.",
            "Farklı inançların bir arada yaşadığı hoşgörü kentidir.",
            "Tepsi kebabı ve kâğıt kebabı mutlaka tadılmalıdır.",
            "Harbiye Şelaleleri serin havasıyla meşhur bir dinlenme yeridir."
        ]
    },
    {
        id: 32,
        name: "Isparta",
        image: "img/32_isparta.jpg",
        kunye: { nufus: "445 Bin", bolge: "Akdeniz", plaka: "32" },
        meshur: "Gül ve Lavanta Bahçeleri",
        bilinmesiGerekenler: [
            "Dünya gül yağı üretiminin %65'i Isparta'da gerçekleşir.",
            "Lavanta Kokulu Köy (Kuyucak), mor rengiyle büyüleyicidir.",
            "Eğirdir Gölü, rengi gün içinde değişen eşsiz bir tatlı su gölüdür.",
            "Sagalassos Antik Kenti, kentin görkemli tarihi mirasıdır.",
            "Davraz Dağı, göl manzaralı kayak keyfi sunar.",
            "Elma üretimi kentin ekonomisinde büyük yer tutar.",
            "Isparta halıları geleneksel motifleriyle tanınır.",
            "Kovada Gölü Milli Parkı çok zengindir.",
            "Yazılı Kanyon, doğa yürüyüşü ve kampçılar için popülerdir.",
            "Gül reçeli ve gül kozmetikleri kentin en iyi hediyelikleridir."
        ]
    },
    {
        id: 33,
        name: "Mersin",
        image: "img/33_mersin.jpg",
        kunye: { nufus: "1.9 Milyon", bolge: "Akdeniz", plaka: "33" },
        meshur: "Tantuni ve Kızkalesi",
        bilinmesiGerekenler: [
            "Kızkalesi, denizin ortasında yükselen kentin en ikonik simgesidir.",
            "Tantuni, Mersin denince akla gelen ilk tescilli lezzettir.",
            "Mersin Limanı, Doğu Akdeniz'in en büyük ticaret kapılarındandır.",
            "Tarsus Şelalesi ve Ashab-ı Kehf Mağarası tarihi öneme sahiptir.",
            "Narlıkuyu kahvaltıları ve taze balıklarıyla ünlüdür.",
            "Cennet ve Cehennem obrukları doğa üstü bir manzara sunar.",
            "Kanlıdivane antik kenti görkemli bir tarihi atmosfer sunar.",
            "Palmiye ağaçlarıyla süslü sahil şeridi en uzunlarından biridir.",
            "Cezerye, havuçtan yapılan kentin meşhur tatlısıdır.",
            "Mersin Marina, kentin modern ve sosyal yaşam alanıdır."
        ]
    },
    {
        id: 34,
        name: "İstanbul",
        image: "img/34_istanbul.jpg",
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
        image: "img/35_izmir.jpg",
        kunye: { nufus: "4.4 Milyon", bolge: "Ege", plaka: "35" },
        meshur: "Saat Kulesi ve Boyoz",
        bilinmesiGerekenler: [
            "Ege'nin İncisi olarak bilinir ve Türkiye'nin 3. büyük şehridir.",
            "Konak Saat Kulesi kentin en ikonik buluşma noktasıdır.",
            "Boyoz, kentin sabah kahvaltılarının vazgeçilmez lezzetidir.",
            "Efess Antik Kenti, dünyanın en iyi korunmuş Roma şehirlerinden biridir.",
            "Kordon Boyu, akşam yürüyüşleri için kentin sosyal kalbidir.",
            "Çeşme ve Alaçatı, rüzgar sörfü ve turizmin dünya çapındaki merkezidir.",
            "Kemeraltı Çarşısı, kentin tarihi ve hareketli ticaret merkezidir.",
            "İzmir Enternasyonal Fuarı, Türkiye'nin en eski fuarlarından biridir.",
            "Şirince Köyü, tarihi evleri ve meyve şaraplarıyla meşhurdur.",
            "Asansör, kentin iki semtini birbirine bağlayan tarihi ve panoramik bir yapıdır."
        ]
    },
    {
        id: 36,
        name: "Kars",
        image: "img/36_kars.jpg",
        kunye: { nufus: "281 Bin", bolge: "Doğu Anadolu", plaka: "36" },
        meshur: "Ani Harabeleri ve Kars Gravyeri",
        bilinmesiGerekenler: [
            "Ani Antik Kenti, '1001 Kilise Şehri' olarak bilinen UNESCO mirasıdır.",
            "Kars Gravyeri ve Kaşarı, dünyanın en seçkin peynirleri arasındadır.",
            "Çıldır Gölü, kışın tamamen buz tutar ve üzerinde atlı kızaklarla gezilir.",
            "Doğu Ekspresi, Ankara'dan Kars'a uzanan masalsı bir yolculuktur.",
            "Kentin Rus mimarisi etkisindeki Baltık Tarzı binaları eşsizdir.",
            "Kars Kaz Eti, kış aylarının en meşhur yöresel yemeğidir.",
            "Sarıkamış Kayak Merkezi, dünyada nadir görülen Kristal Kar yapısına sahiptir.",
            "Kars Kalesi kenti kuşbakışı gören görkemli bir yapıdır.",
            "Âşıklık geleneği kentin yaşayan en önemli kültürel mirasıdır.",
            "Kanlı Tabya Müzesi kentin yakın tarihine dair bilgiler sunar."
        ]
    },
    {
        id: 37,
        name: "Kastamonu",
        image: "img/37_kastamonu.jpg",
        kunye: { nufus: "375 Bin", bolge: "Karadeniz", plaka: "37" },
        meshur: "Taşköprü Sarımsağı ve Etli Ekmek",
        bilinmesiGerekenler: [
            "Taşköprü Sarımsağı, dünyada aroması en yüksek olandır.",
            "Valla Kanyonu, dünyanın en derin kanyonları arasında gösterilir.",
            "Ilgaz Dağı Milli Parkı, kış turizminin merkezidir.",
            "Kastamonu Etli Ekmeği, Konya'dakinden farklı olarak kapalı yapılır.",
            "Horma Kanyonu, devasa ahşap platform yoluyla macera sunar.",
            "Kastamonu Kalesi kentin en heybetli tarihi yapısıdır.",
            "İnebolu evleri kırmızı renkleriyle karakteristik bir dokudur.",
            "Banduma ve Tirit kentin en meşhur yöresel yemekleridir.",
            "Hz. Pir Şeyh Şaban-ı Veli Türbesi önemli bir manevi merkezidir.",
            "Loç Vadisi, biyolojik çeşitliliği ile doğaseverlerin gözdesidir."
        ]
    },
    {
        id: 38,
        name: "Kayseri",
        image: "img/38_kayseri.jpg",
        kunye: { nufus: "1.4 Milyon", bolge: "İç Anadolu", plaka: "38" },
        meshur: "Mantı, Pastırma ve Erciyes Dağı",
        bilinmesiGerekenler: [
            "Erciyes Dağı, kış sporları için modern bir merkeze sahiptir.",
            "Kayseri mantısı, bir kaşığa 40 tane sığmasıyla meşhurdur.",
            "Pastırma ve sucuk üretiminde Türkiye'nin lideridir.",
            "Gevher Nesibe Şifahanesi dünyanın ilk tıp merkezlerindendir.",
            "Kayseri Kalesi ve Kapalı Çarşı şehrin tarihi merkezidir.",
            "Talas ilçesi, tarihi taş evleriyle popülerdir.",
            "Sultan Sazlığı, yüzlerce kuş türüne ev sahipliği yapan bir milli parktır.",
            "Yağlaması, kentin iştah kabartan özel bir yerel yemeğidir.",
            "Mimar Sinan'ın doğduğu köy olan Ağırnas buradadır.",
            "Ticari zekasıyla tanınan insanların ve sanayinin şehridir."
        ]
    },
    {
        id: 39,
        name: "Kırklareli",
        image: "img/39_kirklareli.jpg",
        kunye: { nufus: "366 Bin", bolge: "Marmara", plaka: "39" },
        meshur: "Longoz Ormanları ve Köfte",
        bilinmesiGerekenler: [
            "İğneada Longoz Ormanları, Avrupa'nın en büyük subasar ormanıdır.",
            "Dupnisa Mağarası, kentin en önemli yer altı hazinesidir.",
            "Kırklareli köftesi, özel harcı ve pişirme tekniğiyle meşhurdur.",
            "Hardaliye, üzümden yapılan kente özgü ferahlatıcı bir içecektir.",
            "Kıyıköy ve İğneada, kentin Karadeniz kıyısındaki huzurlu köyleridir.",
            "Peynir ve süt ürünleri kalitesiyle Trakya genelinde tanınır.",
            "Yıldız Dağları (Istrancalar), kentin en önemli doğa kaynağıdır.",
            "Aşağı Pınar açık hava müzesi tarih öncesi döneme ışık tutar.",
            "Kentin şarap bağları ve bağ rotası oldukça popülerdir.",
            "Kanlıgeçit arkeolojik kazı alanı Avrupa'nın ilk şehirleşme izlerini barındırır."
        ]
    },
    {
        id: 40,
        name: "Kırşehir",
        image: "img/40_kirsehir.jpg",
        kunye: { nufus: "243 Bin", bolge: "İç Anadolu", plaka: "40" },
        meshur: "Ahi Evran ve Neşet Ertaş",
        bilinmesiGerekenler: [
            "Ahilik teşkilatının kurucusu Ahi Evran'ın memleketidir.",
            "Bozkırın tezenesi Neşet Ertaş'ın ozanlık kültürünün kalbidir.",
            "UNESCO tarafından 'Müzik Şehri' olarak ilan edilmiştir.",
            "Cacabey Medresesi, antik çağda bir astronomi okulu olarak kullanılmıştır.",
            "Seyfe Gölü Kuş Cenneti flamingo gözlemi için idealdir.",
            "Kaman cevizleri dünya çapında kalitesiyle tanınır.",
            "Kırşehir Kaman Kalehöyük Arkeoloji Müzesi ödüllü bir yapıdır.",
            "Aşık Paşa Türbesi Türk diline verilen önemi temsil eder.",
            "Termal suları ve kaplıca turizmiyle de bilinir.",
            "Kentin yöresel çullama yemeği tadılması gereken bir lezzettir."
        ]
    },
    {
        id: 41,
        name: "Kocaeli",
        image: "img/41_kocaeli.jpg",
        kunye: { nufus: "2 Milyon", bolge: "Marmara", plaka: "41" },
        meshur: "Pişmaniye ve Sanayi",
        bilinmesiGerekenler: [
            "Türkiye'nin sanayi ve imalat merkezidir.",
            "Pişmaniye, kentin dünyaca ünlü tescilli tatlısıdır.",
            "Kartepe, İstanbul'a en yakın popüler kayak merkezidir.",
            "Maşukiye ve Sapanca Gölü kıyısı doğa severlerin durak noktasıdır.",
            "Kocaeli Bilim Merkezi, eski SEKA kağıt fabrikasında kurulmuştur.",
            "İzmit Saat Kulesi şehrin sembol yapılarındandır.",
            "Eskihisar Kalesi ve Osman Hamdi Bey Müzesi mutlaka görülmelidir.",
            "Ballıkayalar Tabiat Parkı kaya tırmanışı için idealdir.",
            "Kentin geniş limanları Türkiye dış ticaretinde büyük role sahiptir.",
            "Ormanya, Avrupa'nın en büyük doğal yaşam parklarından biridir."
        ]
    },
    {
        id: 42,
        name: "Konya",
        image: "img/42_konya.jpg",
        kunye: { nufus: "2.3 Milyon", bolge: "İç Anadolu", plaka: "42" },
        meshur: "Mevlana Müzesi ve Etli Ekmek",
        bilinmesiGerekenler: [
            "Anadolu Selçuklu Devleti'nin görkemli başkentidir.",
            "Mevlana Celaleddin Rumi'nin türbesi ve müzesi manevi merkezidir.",
            "Etli Ekmek, kentin tüm ülkede tanınan en meşhur lezzetidir.",
            "Sille Köyü, binlerce yıllık tarihi dokusuyla büyüleyicidir.",
            "Çatalhöyük, insanlık tarihinin en eski yerleşimlerindendir.",
            "Tropikal Kelebek Bahçesi, Avrupa'nın en büyük kelebek alanıdır.",
            "Karapınar Kumulları, Türkiye'nin tek çöl benzeri bölgesidir.",
            "Selimiye Camii ve İnce Minareli Medrese mimari şaheserlerdir.",
            "Fırın kebabı ve Bamya Çorbası geleneksel mutfağın yıldızlarıdır.",
            "Şehir, geniş bulvarları ve düzenli yapısıyla tanınır."
        ]
    },
    {
        id: 43,
        name: "Kütahya",
        image: "img/43_kutahya.jpg",
        kunye: { nufus: "580 Bin", bolge: "Ege", plaka: "43" },
        meshur: "Çini ve Aizanoi Antik Kenti",
        bilinmesiGerekenler: [
            "Dünya çini sanatının en önemli merkezidir.",
            "Aizanoi Antik Kenti, dünyanın ilk borsasının kurulduğu yerdir.",
            "Porselen üretimiyle Türkiye'nin dünyaya açılan kapısıdır.",
            "Kütahya Kalesi şehrin panoramik görüntüsünü sunar.",
            "Ilıca ve Yoncalı kaplıcaları önemli termal merkezlerdir.",
            "Frig Vadisi kalıntıları kentin tarihi dokusunda yer alır.",
            "Dumlupınar Şehitliği, Milli Mücadele'nin önemli durak noktasıdır.",
            "Kentin yöresel cimcik yemeği ve tirit kebabı meşhurdur.",
            "Döner Gazino, şehrin simge yapılarından biridir.",
            "Domaniç ormanları tertemiz havasıyla doğaseverlerin adresidir."
        ]
    },
    {
        id: 44,
        name: "Malatya",
        image: "img/44_malatya.jpg",
        kunye: { nufus: "812 Bin", bolge: "Doğu Anadolu", plaka: "44" },
        meshur: "Kayısı ve Arslantepe Höyüğü",
        bilinmesiGerekenler: [
            "Dünyanın en kaliteli gün kurusu kayısı üretim merkezidir.",
            "Arslantepe Höyüğü, dünyanın ilk saray yapısına sahiptir.",
            "Kayısıdan yapılan onlarca çeşit tatlı ve hediyelik ürün meşhurdur.",
            "Levent Vadisi, milyonlarca yıllık devasa bir kanyondur.",
            "Malatya analı kızlı yemeği içli köftenin farklı bir yorumudur.",
            "Kentin kerpiç evleri geleneksel mimarinin örnekleridir.",
            "Darende Somuncu Baba Türbesi manevi huzur noktasıdır.",
            "Günpınar Şelalesi doğa yürüyüşü için idealdir.",
            "Malatya Kağıt Kebabı kentin en sevilen et yemeğidir.",
            "Kanalboyu Caddesi kentin popüler rotasıdır."
        ]
    },
    {
        id: 45,
        name: "Manisa",
        image: "img/45_manisa.jpg",
        kunye: { nufus: "1.4 Milyon", bolge: "Ege", plaka: "45" },
        meshur: "Mesir Macunu ve Sultaniye Üzümü",
        bilinmesiGerekenler: [
            "Şehzadeler şehri olarak bilinir, pek çok padişah burada yetişmiştir.",
            "Mesir Macunu Festivali, asırlardır süren bir gelenektir.",
            "Sultaniye Üzümü üretiminde Türkiye ve dünya lideridir.",
            "Spil Dağı Milli Parkı ve meşhur yılkı atları kentin simgesidir.",
            "Sardes Antik Kenti, paranın ilk basıldığı yer olarak bilinir.",
            "Kula Volkanik Jeoparkı, Türkiye'nin ilk jeoparkıdır.",
            "Manisa Kebabı, kentin en özel yerel lezzetidir.",
            "Ağlayan Kaya (Niobe), kentin en bilinen efsanevi taşıdır.",
            "Muradiye Camii, Mimar Sinan'ın Ege'deki önemli eserlerindendir.",
            "Şehir, tarımının yanı sıra sanayisiyle de Ege'nin devidir."
        ]
    },
    {
        id: 46,
        name: "Kahramanmaraş",
        image: "img/46_kahramanmaras.jpg",
        kunye: { nufus: "1.1 Milyon", bolge: "Akdeniz", plaka: "46" },
        meshur: "Dövme Dondurma ve Biber",
        bilinmesiGerekenler: [
            "Keçi sütü ve orkide kökünden yapılan dondurması dünya çapındadır.",
            "Kurtuluş Savaşı'ndaki kahramanlığıyla 'Kahraman' ünvanı almıştır.",
            "Maraş biberi, rengi ve aromasıyla mutfakların vazgeçilmezidir.",
            "Tarihi Maraş Çarşısı bakırcılık ve kuyumculuğun merkezidir.",
            "Eshab-ı Kehf Külliyesi (Afşin) önemli bir inanç merkezidir.",
            "Tarhana cipsi (Maraş tarhanası) kente özgü farklı bir lezzettir.",
            "Başkonuş Yaylası tertemiz havasıyla doğa tutkunlarının adresidir.",
            "Maraş burması kentin meşhur altın el işçiliği ürünüdür.",
            "Menzelet Baraj Gölü tekne turları için idealdir.",
            "Eli böğründe (Yanyana), kentin iştah açan yerel yemeğidir."
        ]
    },
    {
        id: 47,
        name: "Mardin",
        image: "img/47_mardin.jpg",
        kunye: { nufus: "862 Bin", bolge: "Güneydoğu Anadolu", plaka: "47" },
        meshur: "Eski Mardin Evleri ve Gümüş (Telkari)",
        bilinmesiGerekenler: [
            "Tarihi dokusu tamamen koruma altına alınmış bir 'müze şehir'dir.",
            "Eski Mardin sokakları, taş evlerden oluşur.",
            "Deyrulzafaran Manastırı, Süryani kültürünün merkezlerindendir.",
            "Telkari sanatı (gümüş işleme), kentin en zarif el sanatıdır.",
            "Kasımiye Medresesi, taş işçiliğiyle bir sanat şaheseridir.",
            "Mardin Dara Antik Kenti görkemli su kanallarına sahiptir.",
            "Süryani şarabı ve Mardin çöreği mutlaka tadılmalıdır.",
            "Mavi badem şekeri kentin en renkli hediyeliğidir.",
            "Farklı dinlerin binlerce yıldır bir arada yaşadığı hoşgörü kentidir.",
            "Mezopotamya Ovası kentin balkonlarından deniz gibi izlenir."
        ]
    },
    {
        id: 48,
        name: "Muğla",
        image: "img/48_mugla.jpg",
        kunye: { nufus: "1 Milyon", bolge: "Ege", plaka: "48" },
        meshur: "Bodrum, Marmaris ve Fethiye",
        bilinmesiGerekenler: [
            "Türkiye'nin en uzun kıyı şeridine sahip ilidir.",
            "Bodrum Kalesi ve Antik Tiyatrosu kentin dünyaca ünlü noktalarıdır.",
            "Ölüdeniz (Fethiye), turkuaz suyuyla dünyanın en iyi plajlarındandır.",
            "Kelebekler Vadisi ve Saklıkent Kanyonu doğa harikasıdır.",
            "Dalyan'daki İztuzu Plajı, Caretta Caretta'ların üreme alanıdır.",
            "Marmaris ve Göcek, mavi tur tutkunlarının vazgeçilmezidir.",
            "Muğla bacası, kente özgü karakteristik mimari bir detaydır.",
            "Akyaka (Azmak Nehri), berrak suyu ve doğasıyla büyüleyicidir.",
            "Çam balı üretiminde Türkiye'nin en önemli merkezidir.",
            "Knidos ve Kaunos antik kentleri tarihe ışık tutar."
        ]
    },
    {
        id: 49,
        name: "Muş",
        image: "img/49_mus.jpg",
        kunye: { nufus: "400 Bin", bolge: "Doğu Anadolu", plaka: "49" },
        meshur: "Malazgirt Meydan Muharebesi ve Muş Lalesi",
        bilinmesiGerekenler: [
            "Malazgirt Ovası, 1071 yılında Anadolu'nun kapılarının açıldığı yerdir.",
            "Muş Lalesi, ilkbaharda ovayı kırmızıya boyayan nadir bir bitkidir.",
            "Tarihi Murat Köprüsü, Selçuklu mimarisinin zarif bir örneğidir.",
            "Muş Ovası, Türkiye'nin en büyük ve bereketli ovalarındandır.",
            "Kentin üzüm bağları tarih boyunca bilinir.",
            "Haspet Kalesi kentin en eski savunma kalıntısıdır.",
            "Arak Manastırı kentin inanç turizmi potansiyelini temsil eder.",
            "Yöresel Muş Köftesi mutlaka tadılmalıdır.",
            "Kayalıdere Antik Kenti Urartu dönemine ait izler taşır.",
            "Şehir, kış aylarında aldığı yoğun kar yağışı ile bilinir."
        ]
    },
    {
        id: 50,
        name: "Nevşehir",
        image: "img/50_nevsehir.jpg",
        kunye: { nufus: "310 Bin", bolge: "İç Anadolu", plaka: "50" },
        meshur: "Kapadokya ve Peri Bacaları",
        bilinmesiGerekenler: [
            "Volkanik küllerin aşınmasıyla oluşan Peri Bacaları kentin kalbidir.",
            "Uçhisar Kalesi bölgenin en yüksek noktasıdır.",
            "Göreme Açık Hava Müzesi kaya içine oyulmuş kiliseleriyle ünlüdür.",
            "Sıcak Hava Balonu turları dünyaca ünlü bir Kapadokya ritüelidir.",
            "Avanos, çömlekçiliğin merkezidir.",
            "Derinkuyu ve Kaymaklı yer altı şehirleri mühendislik harikasıdır.",
            "Ihlara Vadisi kanyonu yürüyüş yoluyla büyüleyicidir.",
            "Testi Kebabı bölgenin en meşhur seremonik yemeğidir.",
            "Üç Güzeller bölgenin en çok fotoğraflanan noktasıdır.",
            "Cave Hotels eşsiz bir konaklama deneyimi sunar."
        ]
    },
    {
        id: 51,
        name: "Niğde",
        image: "img/51_nigde.jpg",
        kunye: { nufus: "363 Bin", bolge: "İç Anadolu", plaka: "51" },
        meshur: "Patates ve Niğde Gazozu",
        bilinmesiGerekenler: [
            "Türkiye'nin patates üretim merkezlerinden biridir.",
            "Niğde Gazozu, ahududu aromasıyla ikonik bir yerel içecektir.",
            "Gümüşler Manastırı, Gülen Meryem freskiyle ünlüdür.",
            "Aladağlar, dağcılık ve trekking sporcularının merkezidir.",
            "Niğde Kalesi kentin tarihi silüetini oluşturur.",
            "Bolkar Dağları'nda yaşayan ötmeyen kurbağa türü sadece buradadır.",
            "Eski Gümüşler yer altı şehri gizemli yapısıyla dikkat çeker.",
            "Kentin elması tadı ve kalitesiyle bilinir.",
            "Alaaddin Camii kapısındaki taçlı kadın figürü meşhurdur.",
            "Çiftehan kaplıcaları bölgenin önemli termal merkezidir."
        ]
    },
    {
        id: 52,
        name: "Ordu",
        image: "img/52_ordu.jpg",
        kunye: { nufus: "761 Bin", bolge: "Karadeniz", plaka: "52" },
        meshur: "Fındık ve Boztepe",
        bilinmesiGerekenler: [
            "Dünyanın en fazla fındık üretilen şehridir.",
            "Boztepe'ye teleferik ile çıkıp şehri izlemek bir Ordu klasiğidir.",
            "Yason Burnu efsanelere konu olmuş tarihi bir yarımadadır.",
            "Perşembe Yaylası, menderesleri (kıvrımlı suları) ile ünlüdür.",
            "Ordu sahil şeridi, Karadeniz'in en düzenli yürüyüş yollarına sahiptir.",
            "Kurul Kalesi kazılarında bulunan Kybele heykeli çok değerlidir.",
            "Bolaman ve Vona koyları Karadeniz'in saklı kalmış köşeleridir.",
            "Fındıklı çikolata üretimi kentin yeni gelişen yüzüdür.",
            "Yöresel pancar çorbası mutfağın temelidir.",
            "Çambaşı Yaylası, kışın kayak yazın festival merkezidir."
        ]
    },
    {
        id: 53,
        name: "Rize",
        image: "img/53_rize.jpg",
        kunye: { nufus: "345 Bin", bolge: "Karadeniz", plaka: "53" },
        meshur: "Çay ve Ayder Yaylası",
        bilinmesiGerekenler: [
            "Türkiye'nin çay üretim merkezidir.",
            "Ayder Yaylası, şelaleleri ve kaplıcalarıyla dünyaca ünlüdür.",
            "Fırtına Deresi, rafting tutkunlarının Karadeniz'deki adresidir.",
            "Zilkale, vadi içinde sarp bir kayalıkta yükselen masalsı kaledir.",
            "Anzer Balı, dünyanın en kaliteli ve şifalı ballarından biridir.",
            "Rize bezi, kenevir ipliğinden yapılan geleneksel bir dokumadır.",
            "Kaçkar Dağları Milli Parkı doğa cennetidir.",
            "Hamsili pilav ve mısır ekmeği mutfağın temel taşlarıdır.",
            "Pokut ve Sal yaylaları, bulut denizi manzarasıyla ünlüdür.",
            "Rize simidi (kel simit), susamsız yapısıyla çok farklıdır."
        ]
    },
    {
        id: 54,
        name: "Sakarya",
        image: "img/54_sakarya.jpg",
        kunye: { nufus: "1.06 Milyon", bolge: "Marmara", plaka: "54" },
        meshur: "Islama Köfte ve Sapanca Gölü",
        bilinmesiGerekenler: [
            "Sapanca Gölü, İstanbul'a yakınlığıyla en popüler hafta sonu kaçamağıdır.",
            "Islama Köfte, kentin kendine has soslu ekmeğiyle meşhur lezzetidir.",
            "Justinianus Köprüsü (Beşköprü), Roma döneminden kalma dev bir eserdir.",
            "Taraklı ilçesi, tarihi evleriyle sakin şehir (Cittaslow) ünvanlıdır.",
            "Karasu plajı, Karadeniz'in uzun sahil şeritlerinden biridir.",
            "Şehir, otomotiv ve savunma sanayisinin önemli merkezlerindendir.",
            "Acarlar Longozu, Türkiye'nin tek parça halindeki en büyük subasar ormanıdır.",
            "Adapazarı kabak tatlısı kentin tescilli gurme lezzetidir.",
            "Sakarya Nehri kentin coğrafyasına ve ismine hayat verir.",
            "Poyrazlar Gölü tabiat parkı orman ve gölün birleştiği huzur noktasıdır."
        ]
    },
    {
        id: 55,
        name: "Samsun",
        image: "img/55_samsun.jpg",
        kunye: { nufus: "1.3 Milyon", bolge: "Karadeniz", plaka: "55" },
        meshur: "Bandırma Vapuru ve Pide",
        bilinmesiGerekenler: [
            "Milli mücadelenin başladığı, Atatürk'ün Şehri olarak bilinir.",
            "Bandırma Vapuru Müzesi, kentin bağımsızlık sembolüdür.",
            "Bafra ve Terme pideleri meşhurdur.",
            "Amisos Tepesi ve Kaya Mezarları antik çağın izlerini taşır.",
            "Kızılırmak Deltası Kuş Cenneti doğa harikasıdır.",
            "Onur Anıtı, kentin en ikonik buluşma noktasıdır.",
            "Şahinkaya Kanyonu devasa boyutlarıyla tekne turu sunar.",
            "Samsun simidi, bol pekmeziyle diğerlerinden ayrılır.",
            "Amazon Köyü, kadın savaşçıların anısını yaşatır.",
            "Karadeniz'in en gelişmiş ticaret ve liman şehridir."
        ]
    },
    {
        id: 56,
        name: "Siirt",
        image: "img/56_siirt.jpg",
        kunye: { nufus: "331 Bin", bolge: "Güneydoğu Anadolu", plaka: "56" },
        meshur: "Büryan Kebabı ve Pervari Balı",
        bilinmesiGerekenler: [
            "Büryan Kebabı, kuyu tandırda pişen kentin en ünlü lezzetidir.",
            "Pervari Balı, yüksek yaylalardan gelen şifalı bir üründür.",
            "Siirt fıstığı, iri taneli yapısıyla meşhurdur.",
            "Veysel Karani Türbesi, inanç turizminin önemli bir noktasıdır.",
            "İbrahim Hakkı Hazretleri'nin Işık Hadisesi düzeneği Tillo'dadır.",
            "Siirt battaniyesi, tiftik keçisi kılından yapılan asırlık sanattır.",
            "Bıttım sabunu, yabani fıstık yağından yapılan doğal bir üründür.",
            "Siirt Ulu Camii, kentin en eski ve özgün yapısıdır.",
            "Kentin yöresel perde pilavı sunumuyla özeldir.",
            "Botan Çayı vadisi kentin en etkileyici doğal manzaralarını sunar."
        ]
    },
    {
        id: 57,
        name: "Sinop",
        image: "img/57_sinop.jpg",
        kunye: { nufus: "218 Bin", bolge: "Karadeniz", plaka: "57" },
        meshur: "Tarihi Cezaevi ve Sinop Mantısı",
        bilinmesiGerekenler: [
            "Türkiye'nin en kuzey noktası olan İnceburun buradadır.",
            "Sinop Tarihi Cezaevi, 'Anadolu'nun Alkatrazı' olarak bilinen müzedir.",
            "Sinop Mantısı, bol cevizli ve sarımsaklı sosuyla eşsizdir.",
            "Hamsilos Koyu, Türkiye'nin tek fiyord benzeri oluşumuna sahiptir.",
            "Erfelek Tatlıca Şelaleleri, ardı ardına sıralanan 28 şelaledir.",
            "Diyojen (Diogenes) gibi dünyaca ünlü bir filozofun doğum yeridir.",
            "Kotracılık (maket gemi yapımı), kentin en köklü el sanatıdır.",
            "Şehir, Türkiye'nin en mutlu insanlarının yaşadığı il seçilmiştir.",
            "Sinop Kalesi surları kenti denizden koruyan devasa yapılardır.",
            "Nokul, kente özgü bir hamur işidir."
        ]
    },
    {
        id: 58,
        name: "Sivas",
        image: "img/58_sivas.jpg",
        kunye: { nufus: "636 Bin", bolge: "İç Anadolu", plaka: "58" },
        meshur: "Kangal Köpeği ve Gök Medrese",
        bilinmesiGerekenler: [
            "Milli mücadelenin kilit noktası Sivas Kongresi'ne ev sahipliği yapmıştır.",
            "Kangal Köpeği dünyaca ünlü koruma ve çoban köpeği ırkıdır.",
            "Divriği Ulu Camii ve Darüşşifası UNESCO Dünya Mirası listesindedir.",
            "Gök Medrese mimari zarafetin doruk noktasıdır.",
            "Kangal Balıklı Kaplıcası dünyada sedef tedavisinde kullanılır.",
            "Sivas Köftesi, kendine has tadıyla tescilli bir lezzettir.",
            "Gürün Gökpınar Gölü, berraklığıyla 'doğal akvaryum'dur.",
            "Sivas bıçakları el işçiliğiyle bilinir.",
            "Madımak yemeği kentin en meşhur yöresel ot yemeğidir.",
            "Paşabahçe mesire alanı kentin sosyal yaşam merkezidir."
        ]
    },
    {
        id: 59,
        name: "Tekirdağ",
        image: "img/59_tekirdag.jpg",
        kunye: { nufus: "1.1 Milyon", bolge: "Marmara", plaka: "59" },
        meshur: "Köfte ve Rakı",
        bilinmesiGerekenler: [
            "Tekirdağ Köftesi, kendine has tadı ve sosuyla ulusal bir markadır.",
            "Namık Kemal'in doğduğu ev müze olarak ziyaret edilebilir.",
            "Şarköy ve Mürefte, Türkiye'nin en büyük bağcılık ve şarap merkezleridir.",
            "Uçmakdere, yamaç paraşütü tutkunlarının Marmara'daki adresidir.",
            "Rakoczi Müzesi, Macar prensinin kente sürgün edildiği evdir.",
            "Kentin ayçiçeği tarlaları yazın sarı bir deniz görüntüsü sunar.",
            "Tekirdağ Kiraz Festivali kentin en eski etkinliklerindendir.",
            "Süleymanpaşa sahil kordonu yürüyüş için çok keyiflidir.",
            "Marmaraereğlisi antik kalıntıları kentin derin tarihini yansıtır.",
            "Şehir, limanı ve sanayisiyle Trakya'nın en hızlı gelişen ilidir."
        ]
    },
    {
        id: 60,
        name: "Tokat",
        image: "img/60_tokat.jpg",
        kunye: { nufus: "602 Bin", bolge: "Karadeniz", plaka: "60" },
        meshur: "Tokat Kebabı ve Yazmacılık",
        bilinmesiGerekenler: [
            "Ballıca Mağarası, dünyanın en büyük mağaralarından biridir.",
            "Tokat Kebabı kuzu eti ve sebzelerin özel ocaklarda pişmesiyle yapılır.",
            "Tokat yazması, el baskısı motifleriyle simge el sanatıdır.",
            "Tarihi Tokat Kalesi, Kont Dracula'nın bir dönem hapsedildiği yerdir.",
            "Niksar ilçesi, Türkiye'nin ilk tescilli şifalı suyuyla ünlüdür.",
            "Zile pekmezi beyaz renkli ve katı formlu bir lezzettir.",
            "Sulu Saray (Sebastopolis) antik kenti bölgenin önemli Roma mirasıdır.",
            "Mahperi Hatun Kervansarayı Selçuklu mimarisinin görkemini taşır.",
            "Hıdırlık Köprüsü, Yeşilırmak üzerindeki en eski köprülerdendir.",
            "Tokat pağacı ve cevizli çöreği kentin sevilen hamur işleridir."
        ]
    },
    {
        id: 61,
        name: "Trabzon",
        image: "img/61_trabzon.jpg",
        kunye: { nufus: "816 Bin", bolge: "Karadeniz", plaka: "61" },
        meshur: "Sümela Manastırı ve Hamsi",
        bilinmesiGerekenler: [
            "Sümela Manastırı, sarp kayalıklar üzerine inşa edilmiş bir harikadır.",
            "Uzungöl, kartpostallık manzarasıyla en popüler doğa merkezidir.",
            "Trabzon ekmeği (Vakfıkebir) devasa boyutuyla ünlüdür.",
            "Atatürk Köşkü şık bir Cumhuriyet mimarisine sahiptir.",
            "Boztepe, şehri ve Karadeniz'i kuşbakışı izlemek için en iyi noktadır.",
            "Hamsiköy sütlacı kentin tescilli tatlısıdır.",
            "Akçaabat Köftesi Türkiye çapında tanınır.",
            "Ayasofya Camii (Müzesi) geç Bizans mimarisinin örneğidir.",
            "Sürmene bıçağı el işçiliğiyle dünyaca bilinir.",
            "Yayla kültürü kentin sosyal hayatının kalbidir."
        ]
    },
    {
        id: 62,
        name: "Tunceli",
        image: "img/62_tunceli.jpg",
        kunye: { nufus: "84 Bin", bolge: "Doğu Anadolu", plaka: "62" },
        meshur: "Munzur Gözeleri ve Milli Parkı",
        bilinmesiGerekenler: [
            "Munzur Vadisi Milli Parkı, en zengin milli parklardandır.",
            "Munzur Gözeleri, suların kayaların arasından fışkırdığı efsanevi bir alandır.",
            "Ovacık, doğal tarım ürünleri ve kooperatifçiliğiyle tanınır.",
            "Munzur Çayı üzerinde rafting ve doğa sporları yapılmaktadır.",
            "Pertek Kalesi, baraj gölü içinde masalsı bir görünüme sahiptir.",
            "Tunceli dağ sarımsağı ve çiçek balı kentin şifalı ürünleridir.",
            "Pülümür Vadisi kar manzaralarıyla meşhurdur.",
            "Dersim mutfağının baş tacı Zerefet (Gömbe) mutlaka tadılmalıdır.",
            "Yaban keçilerinin koruma altında olduğu bakir bir doğası vardır.",
            "Şehir, okuma-yazma oranının en yüksek olduğu illerimizdendir."
        ]
    },
    {
        id: 63,
        name: "Şanlıurfa",
        image: "img/63_sanliurfa.jpg",
        kunye: { nufus: "2.1 Milyon", bolge: "Güneydoğu Anadolu", plaka: "63" },
        meshur: "Göbeklitepe ve Balıklıgöl",
        bilinmesiGerekenler: [
            "Göbeklitepe, insanlık tarihinin bilinen en eski tapınağıdır.",
            "Balıklıgöl, kentin en kutsal ve turistik merkezidir.",
            "Peygamberler Şehri olarak bilinir ve inanç turizminin kalbidir.",
            "Harran Evleri, konik çatılarıyla binlerce yıllık tarihe sahiptir.",
            "Sıra Gecesi kültürü, müziğin ve yemeğin birleştiği bir gelenektir.",
            "Urfa İsotu mutfağa karakteristik tadını veren özel bir biberdir.",
            "Halfeti (Batık Şehir) kentin en meşhur turistik noktalarındandır.",
            "Şanlıurfa Arkeoloji Müzesi dev bir müze kompleksidir.",
            "Ciğer kebabı kentin en sevilen yemeğidir.",
            "Dünyanın en eski üniversitesi kalıntıları buradadır."
        ]
    },
    {
        id: 64,
        name: "Uşak",
        image: "img/64_usak.jpg",
        kunye: { nufus: "374 Bin", bolge: "Ege", plaka: "64" },
        meshur: "Tarhana ve Ulubey Kanyonu",
        bilinmesiGerekenler: [
            "Ulubey Kanyonu, dünyanın en uzun ikinci kanyonu olarak bilinir.",
            "Uşak Tarhanası, kentin dünyaca ünlü tescilli en önemli lezzetidir.",
            "Karun Hazinesi, dünyaca ünlü Kanatlı Denizatı Broşu ile bu kentin müzesindedir.",
            "Eşme kilimleri, kendine has kök boyası ve motifleriyle tanınır.",
            "Türkiye'de ilk şeker fabrikası (Nuri Şeker) bu ilde kurulmuştur.",
            "Clandras Köprüsü, Frigyalılar döneminden kalan antik bir yapıdır.",
            "Uşak, halı ve deri sanayisinde köklü bir geçmişe sahiptir.",
            "Blaundus Antik Kenti, kanyon manzaralı antik tiyatrosuyla büyüleyicidir.",
            "Yöresel Ebem Köftesi kentin sevilen bir yemeğidir.",
            "Banaz Hamamboğazı kaplıcaları önemli bir termal turizm merkezidir."
        ]
    },
    {
        id: 65,
        name: "Van",
        image: "img/65_van.jpg",
        kunye: { nufus: "1.1 Milyon", bolge: "Doğu Anadolu", plaka: "65" },
        meshur: "Van Gölü ve Van Kedisi",
        bilinmesiGerekenler: [
            "Van Gölü, Türkiye'nin en büyük gölüdür (Van Denizi).",
            "Akdamar Adası ve Kilisesi göl ortasında bir cevherdir.",
            "Farklı göz renklerine sahip Van Kedisi dünyaca ünlü mirastır.",
            "Van Kahvaltısı Guinness rekorlar kitabına girmiş bir kültürdür.",
            "Van Kalesi (Tuşpa) Urartu Krallığı'nın görkemli başkentidir.",
            "Muradiye Şelalesi coşkun akan suyuyla meşhurdur.",
            "Otlu peynir, yayla otlarıyla hazırlanan eşsiz bir lezzettir.",
            "Peri Bacaları'na benzeyen Vanadokya oluşumları dikkat çekicidir.",
            "Eski Van Şehri kalıntıları tarihsel derinliği yansıtır.",
            "İnci Kefali, dünyada sadece Van Gölü'nde yaşayan özel bir balıktır."
        ]
    },
    {
        id: 66,
        name: "Yozgat",
        image: "img/66_yozgat.jpg",
        kunye: { nufus: "418 Bin", bolge: "İç Anadolu", plaka: "66" },
        meshur: "Testi Kebabı ve Saat Kulesi",
        bilinmesiGerekenler: [
            "Yozgat Çamlığı, Türkiye'nin ilk Milli Parkı'dır.",
            "Testi Kebabı, kırılan testi seremonisiyle meşhurdur.",
            "Yozgat Saat Kulesi kentin en önemli tarihi simgesidir.",
            "Saraykent Kaplıcaları şifalı sularıyla tanınır.",
            "Çapanoğlu Camii Anadolu'daki barok tarzı mimarinin örneğidir.",
            "Roma Hamamı (Basilica Therma) antik çağın hamamı olarak bilinir.",
            "Arabaşı çorbası kış aylarının vazgeçilmez geleneğidir.",
            "Akdağmadeni ormanları İç Anadolu'nun yeşil vahasidir.",
            "Yozgat parmağı (ekmek) kente özgü bir unlu mamuldür.",
            "Kerkenes Harabeleri devasa bir sur kenti kalıntısıdır."
        ]
    },
    {
        id: 67,
        name: "Zonguldak",
        image: "img/67_zonguldak.jpg",
        kunye: { nufus: "589 Bin", bolge: "Karadeniz", plaka: "67" },
        meshur: "Taş Kömürü ve Madenler",
        bilinmesiGerekenler: [
            "Türkiye'nin 'Emeğin Başkenti' ve en önemli kömür havzasıdır.",
            "Maden Müzesi madenciliği yaşatan etkileyici bir yerdir.",
            "Gökgöl Mağarası, sarkıtlarıyla masalsı bir yerdir.",
            "Filyos Antik Kenti (Tios) Karadeniz'in Efes'i olma yolundadır.",
            "Ereğli ilçesi, çelik sanayisi ve Osmanlı çileği ile ünlüdür.",
            "Cehennemağzı Mağaraları mitolojik hikayelere ev sahipliği yapar.",
            "Kentin dik yokuşları ve merdivenli sokakları karakteristiktir.",
            "Zonguldak simidi (pekmezsiz) yerel bir kahvaltı klasiğidir.",
            "Harmankaya Şelaleleri doğa yürüyüşü için gizli bir rotadır.",
            "Kapuz Plajı merkezde denize girilebilen nadir yerlerdendir."
        ]
    },
    {
        id: 68,
        name: "Aksaray",
        image: "img/68_aksaray.jpg",
        kunye: { nufus: "433 Bin", bolge: "İç Anadolu", plaka: "68" },
        meshur: "Ihlara Vadisi ve Malaklı Köpeği",
        bilinmesiGerekenler: [
            "Ihlara Vadisi, dünyanın en büyük kanyonlarındandır.",
            "Hasandağı görkemli bir sönmüş volkandır.",
            "Aksaray Malaklısı, dünyanın en iri çoban köpeği ırklarındandır.",
            "Eğri Minare (Kızıl Minare) Selçuklu döneminden kalan bir yapıdır.",
            "Sultanhanı, Anadolu'nun en büyük kervansarayıdır.",
            "Güzelyurt Kapadokya'nın bir parçasıdır.",
            "Tuz Gölü'nün bir kısmı Aksaray sınırları içindedir.",
            "Aşıklı Höyük en eski köy yerleşimidir.",
            "Yöresel Aksaray tava meşhurdur.",
            "Somuncu Baba Türbesi manevi duraklarındandır."
        ]
    },
    {
        id: 69,
        name: "Bayburt",
        image: "img/69_bayburt.jpg",
        kunye: { nufus: "85 Bin", bolge: "Karadeniz", plaka: "69" },
        meshur: "Bayburt Kalesi ve Baksı Müzesi",
        bilinmesiGerekenler: [
            "Bayburt Kalesi kenti tepeden gören en görkemli yapıdır.",
            "Baksı Müzesi modern ve geleneksel sanatı birleştirir.",
            "Çoruh Nehri rafting için kullanılan güçlü bir akarsudur.",
            "Kenan Yavuz Etnografya Müzesi köy yaşamını yaşatır.",
            "Dede Korkut Türbesi çok önemli bir kültürel duraktır.",
            "Aydıntepe Yer Altı Şehri gizemli bir yerleşimdir.",
            "Bayburt lor dolması kentin en özgün yemeğidir.",
            "Sırakayalar Şelaleleri doğa ile baş başa kalmak içindir.",
            "Kentin balı yüksek kalitesiyle bilinir.",
            "Kop Dağı kış sporları ve tarihi önemiyle kilit noktadır."
        ]
    },
    {
        id: 70,
        name: "Karaman",
        image: "img/70_karaman.jpg",
        kunye: { nufus: "260 Bin", bolge: "İç Anadolu", plaka: "70" },
        meshur: "Türkçenin Başkenti ve Karaman Koyunu",
        bilinmesiGerekenler: [
            "Türkçenin resmi dil ilan edildiği yerdir.",
            "Yunus Emre'nin mezarının olduğu yerlerden biridir.",
            "Binbir Kilise (Karadağ) önemli bir dini merkezdir.",
            "Karaman Koyunu, verimliliğiyle ünlü bir ırktır.",
            "Taşkale Tahıl Ambarları kaya içine oyulmuş doğal depolardır.",
            "İncesu Mağarası dikkat çekicidir.",
            "Kentin bisküvi sanayisi çok gelişmiştir.",
            "Hatuniye Medresesi mimari bir örnektir.",
            "Karaman Kalesi şehrin tarihini yansıtır.",
            "Divle Obruk Peyniri dünyanın en kaliteli küflü peynirlerindendir."
        ]
    },
    {
        id: 71,
        name: "Kırıkkale",
        image: "img/71_kirikkale.jpg",
        kunye: { nufus: "277 Bin", bolge: "İç Anadolu", plaka: "71" },
        meshur: "Makine Kimya (MKE) ve Silah Sanayi",
        bilinmesiGerekenler: [
            "Türkiye savunma sanayisinin en önemli merkezlerinden biridir.",
            "Silah Sanayi Müzesi Türkiye'nin ilk ve tek silah müzesidir.",
            "Kızılırmak üzerindeki Çeşnigir Köprüsü tarihi bir yapıdır.",
            "Hasandede Camii kentin önemli manevi duraklarındandır.",
            "Silah fabrikalarıyla Cumhuriyet döneminde büyümüş bir şehirdir.",
            "Kızılırmak kenarı piknik alanlarıyla doludur.",
            "Yöresel Kırıkkale pidesi tadılması gereken lezzettir.",
            "Ankara'ya yakınlığı nedeniyle sanayi gelişmiştir.",
            "Dinek Dağı doğa sporlarına uygundur.",
            "Celal Bayar Parkı kentin en büyük yeşil alanlarındandır."
        ]
    },
    {
        id: 72,
        name: "Batman",
        image: "img/72_batman.jpg",
        kunye: { nufus: "634 Bin", bolge: "Güneydoğu Anadolu", plaka: "72" },
        meshur: "Hasankeyf ve Petrol",
        bilinmesiGerekenler: [
            "Hasankeyf, 12 bin yıllık geçmişe sahiptir.",
            "Petrolün ilk bulunduğu ve çıkarıldığı şehirdir.",
            "Zeynel Bey Türbesi çok özeldir.",
            "Malabadi Köprüsü mimari bir şaheserdir.",
            "Sason çileği kentin en önemli tarımsal markasıdır.",
            "Modern yerleşimi petrol sanayisiyle gelişmiştir.",
            "Kozluk İbrahim Bey Camii önemli tarihi yapılardandır.",
            "Yöresel perde pilavı meşhurdur.",
            "Güneydoğu'nun sanayi merkezlerindendir.",
            "Batman Üniversitesi bölgenin kültür hayatına yön verir."
        ]
    },
    {
        id: 73,
        name: "Şırnak",
        image: "img/73_sirnak.jpg",
        kunye: { nufus: "557 Bin", bolge: "Güneydoğu Anadolu", plaka: "73" },
        meshur: "Cudi Dağı ve Hz. Nuh Türbesi",
        bilinmesiGerekenler: [
            "Nuh'un Gemisi'nin indiği inanılan Cudi Dağı buradadır.",
            "Hz. Nuh Türbesi kentin en önemli inanç merkezidir.",
            "İsmail Ebul-İz El Cezeri burada yaşamıştır.",
            "Mem u Zin türbesi destansı bir aşkın izlerini barındırır.",
            "Kasrik Boğazı kentin kapısı gibidir.",
            "Abdaliye Medresesi köklü geçmişi temsil eder.",
            "Şal-şapik kumaşı yöresel kıyafetlerin değerli parçasıdır.",
            "Yüksek yaylaları hayvancılığa uygundur.",
            "Gabar Dağı petrol keşifleriyle gündemdedir.",
            "Yöresel mutfağında serbidev gibi özgün yemekler bulunur."
        ]
    },
    {
        id: 74,
        name: "Bartın",
        image: "img/74_bartin.jpg",
        kunye: { nufus: "201 Bin", bolge: "Karadeniz", plaka: "74" },
        meshur: "Amasra ve Tel Kırma",
        bilinmesiGerekenler: [
            "Amasra, Fatih Sultan Mehmet'in 'Çeşm-i Cihan' dediği yerdir.",
            "Amasra Salatası görsel bir şölendir.",
            "Tel Kırma kentin simge sanatıdır.",
            "Bartın Çayı üzerinde gemilerin yüzebildiği tek akarsudur.",
            "İnkumu plajı bölgenin tatil merkezidir.",
            "Kuşkayası Yol Anıtı eşsiz bir kaya kabartmasıdır.",
            "Tarihi Bartın Evleri ahşap mimarinin örnekleridir.",
            "Güzelcehisar Lav Sütunları 80 milyon yıllık yapılardır.",
            "Ahşap tekne yapımı yüzyıllardır süren bir geleneğidir.",
            "Galla Pazarı tarihi bir yerdir."
        ]
    },
    {
        id: 75,
        name: "Ardahan",
        image: "img/75_ardahan.jpg",
        kunye: { nufus: "92 Bin", bolge: "Doğu Anadolu", plaka: "75" },
        meshur: "Ardahan Çiçek Balı ve Kaşar",
        bilinmesiGerekenler: [
            "Türkiye'nin en kuzeydoğu ucundaki sınır kentidir.",
            "Ardahan Çiçek Balı tescilli bir üründür.",
            "Ardahan Kalesi Osmanlı döneminden kalan yapıdır.",
            "Çıldır Gölü'nün bir kısmı buradadır.",
            "Yalnızçam Kayak Merkezi kristal kar yapısına sahiptir.",
            "Şeytan Kalesi sarp bir vadi üzerindedir.",
            "Posof Türkmen elması içi de kırmızı olan nadir bir türdür.",
            "Kura Nehri kentin ortasından geçer.",
            "Ardahan peyniri en kaliteli kaşarlar arasındadır.",
            "Damal bebekleri yöresel kıyafetlerin minyatür sanatıdır."
        ]
    },
    {
        id: 76,
        name: "Iğdır",
        image: "img/76_igdir.jpg",
        kunye: { nufus: "203 Bin", bolge: "Doğu Anadolu", plaka: "76" },
        meshur: "Ağrı Dağı ve Kayısı",
        bilinmesiGerekenler: [
            "Ağrı Dağı'nın büyük bölümü buradadır.",
            "Üç ülkeye sınırı olan tek ilimizdir.",
            "Doğu'nun Çukurova'sı olarak anılır.",
            "Iğdır Kayısısı bölgenin en sevilen meyvesidir.",
            "Türkiye'de güneşin ilk doğduğu topraklardır.",
            "Koç Başlı Mezarları kentin tarihini belgeler.",
            "Tuzluca Tuz Mağaraları sağlık turizmi için kullanılır.",
            "Yöresel bozbaş yemeği kentin en meşhur lezzetidir.",
            "Iğdır Ovası her türlü tarıma uygundur.",
            "Nuh'un Gemisi efsanesi kentin en büyük hikayesidir."
        ]
    },
    {
        id: 77,
        name: "Yalova",
        image: "img/77_yalova.jpg",
        kunye: { nufus: "305 Bin", bolge: "Marmara", plaka: "77" },
        meshur: "Termal Kaplıcalar ve Yürüyen Köşk",
        bilinmesiGerekenler: [
            "Atatürk'ün 'Yalova benim kentimdir' dediği yerdir.",
            "Yürüyen Köşk, bir ağacın dalı kesilmesin diye raylar üzerinde kaydırılmıştır.",
            "Termal ilçesi, şifalı suları ve doğasıyla dünya çapında tanınır.",
            "Karaca Arboretumu, Türkiye'nin ilk özel fidanlığı ve canlı ağaç müzesidir.",
            "Sudüşen Şelalesi, kentin en popüler doğa kaçış noktalarından biridir.",
            "Yalova, süs bitkileri ve çiçek üretiminde Türkiye'nin merkezidir.",
            "Çınarcık, Marmara Bölgesi'nin en popüler deniz turizmi merkezlerindendir.",
            "Erikli Yaylası, kampçılar ve doğa yürüyüşçüleri için vazgeçilmezdir.",
            "Şehir, İstanbul, Bursa ve Kocaeli arasındaki stratejik konumuyla bilinir.",
            "Yalova sütlüsü, kente özgü hafif ve tescilli bir tatlıdır."
        ]
    },
    {
        id: 78,
        name: "Karabük",
        image: "img/78_karabuk.jpg",
        kunye: { nufus: "250 Bin", bolge: "Karadeniz", plaka: "78" },
        meshur: "Safranbolu Evleri ve Lokum",
        bilinmesiGerekenler: [
            "Safranbolu UNESCO Dünya Mirası listesinde bir müze kenttir.",
            "Tarihi konaklar Türk mimarisinin zirvesidir.",
            "Safran bitkisi dünyanın en pahalı baharatıdır.",
            "Kardemir, Türkiye'nin ilk ağır sanayi fabrikasıdır.",
            "Cam Teras kanyon manzarasını ayaklar altına serer.",
            "Yörük Köyü açık hava müzesi gibidir.",
            "Safranbolu Lokumu hafifliğiyle çok özeldir.",
            "Hadrianapolis Antik Kenti Karadeniz'in Zeugma'sıdır.",
            "Tokatlı Kanyonu doğa yürüyüşü için muhteşemdir.",
            "Bulak Mağarası en uzun mağaralardan biridir."
        ]
    },
    {
        id: 79,
        name: "Kilis",
        image: "img/79_kilis.jpg",
        kunye: { nufus: "145 Bin", bolge: "Güneydoğu Anadolu", plaka: "79" },
        meshur: "Kilis Tavası ve Zeytinyağı",
        bilinmesiGerekenler: [
            "Kilis Tavası kentin en meşhur lezzetidir.",
            "Zeytin üretimi kentin temel geçim kaynağıdır.",
            "Ravanda Kalesi tarihi bir savunma yapısıdır.",
            "Kilis katmeri damak çatlatan bir tatlıdır.",
            "Cennet Çamuru kente özgü bir tatlıdır.",
            "Kentin dar sokakları kabaltı geçitleriyle doludur.",
            "Üzüm ve pekmez üretimi köklü bir geleneğidir.",
            "Eski hamamları Osmanlı mimarisinin örnekleridir.",
            "Sınır kenti olması nedeniyle ticari hayat hareketlidir.",
            "Oylum Höyük en büyük arkeolojik yerleşimlerdendir."
        ]
    },
    {
        id: 80,
        name: "Osmaniye",
        image: "img/80_osmaniye.jpg",
        kunye: { nufus: "560 Bin", bolge: "Akdeniz", plaka: "80" },
        meshur: "Yer Fıstığı ve Karatepe-Aslantaş",
        bilinmesiGerekenler: [
            "Türkiye'nin yer fıstığı üretim merkezidir.",
            "Karatepe-Aslantaş Açık Hava Müzesi Hitit eserlerini barındırır.",
            "Kaleler şehri olarak bilinir.",
            "Zorkun Yaylası en büyük yaylalardandır.",
            "Kastabala Antik Kenti antik görkemini yansıtır.",
            "Osmaniye simidi pekmezli tadıyla çok sevilir.",
            "Yer fıstıklı şekerleme en popüler hediyeliğidir.",
            "Toprakkale Kalesi dev bir yapıdır.",
            "Sabun Çayı şelaleleri doğa alanlarıdır.",
            "Etli kömbe mutfağın baş köşesindedir."
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
            "Samandere Şelalesi tescilli bir tabiat anıtıdır.",
            "Güzeldere Şelalesi en yüksekten dökülenlerdendir.",
            "Akçakoca Karadeniz'e açılan turistik kapısıdır.",
            "Konuralp antik kenti ve tiyatrosu meşhurdur.",
            "Fındık üretimi ekonomisinde büyük paya sahiptir.",
            "Efteni Gölü kuş gözlemcileri için önemli bir duraktır.",
            "Kardüz Yaylası kış sporları için gelişen bir merkezdir.",
            "Yöresel Çerkez tavuğu mutfağın zenginliğidir.",
            "Düzce köftesi tescilli lezzetler arasındadır."
        ]
    }
];














