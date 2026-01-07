/* =========================================================
   ZGEN – zgen-data-tr.js
   Path: /zgen/zgen-data-tr.js

   AVATARS (male + female)
   Place PNGs under: /img/

   Required filenames:
     /img/gen_silent_m.jpg
     /img/gen_silent_f.jpg
     /img/gen_boomer_m.jpg
     /img/gen_boomer_f.jpg
     /img/gen_genx_m.jpg
     /img/gen_genx_f.jpg
     /img/gen_geny_m.jpg
     /img/gen_geny_f.jpg
     /img/gen_genz_m.jpg
     /img/gen_genz_f.jpg
     /img/gen_alpha_m.jpg
     /img/gen_alpha_f.jpg
     /img/gen_beta_m.jpg
     /img/gen_beta_f.jpg

   Optional fallbacks:
     /img/gen_placeholder_m.jpg
     /img/gen_placeholder_f.jpg

   Compatibility is DIRECTIONAL:
   compat[youGenId][otherGenId] => { dos: [5], donts: [5], joke: "..." }
   ========================================================= */

/* -----------------------
   PLACEHOLDER HELPERS
------------------------ */
function placeholderDos() {
  return [
    "Yapılacak #1 (yer tutucu)",
    "Yapılacak #2 (yer tutucu)",
    "Yapılacak #3 (yer tutucu)",
    "Yapılacak #4 (yer tutucu)",
    "Yapılacak #5 (yer tutucu)"
  ];
}

function placeholderDonts() {
  return [
    "Yapılmayacak #1 (yer tutucu)",
    "Yapılmayacak #2 (yer tutucu)",
    "Yapılmayacak #3 (yer tutucu)",
    "Yapılmayacak #4 (yer tutucu)",
    "Yapılmayacak #5 (yer tutucu)"
  ];
}

function placeholderJoke() {
  return "Yer tutucu şaka (isteğe bağlı).";
}

/* -----------------------
   MAIN DATA
------------------------ */
const ZGEN_DATA = {
  generations: [
    {
      id: "silent",
      name: "Sessiz Nesil",
      range: [1928, 1945],
      avatars: { m: "/img/gen_silent_m.jpg", f: "/img/gen_silent_f.jpg" },
      avatarAlt: "Sessiz Nesil avatarı"
    },
    {
      id: "boomer",
      name: "Baby Boomers",
      range: [1946, 1964],
      avatars: { m: "/img/gen_boomer_m.jpg", f: "/img/gen_boomer_f.jpg" },
      avatarAlt: "Baby Boomers avatarı"
    },
    {
      id: "genx",
      name: "X Nesli",
      range: [1965, 1980],
      avatars: { m: "/img/gen_genx_m.jpg", f: "/img/gen_genx_f.jpg" },
      avatarAlt: "X Nesli avatarı"
    },
    {
      id: "geny",
      name: "Y Nesli (Millennials)",
      range: [1981, 1996],
      avatars: { m: "/img/gen_geny_m.jpg", f: "/img/gen_geny_f.jpg" },
      avatarAlt: "Y Nesli avatarı"
    },
    {
      id: "genz",
      name: "Z Nesli",
      range: [1997, 2012],
      avatars: { m: "/img/gen_genz_m.jpg", f: "/img/gen_genz_f.jpg" },
      avatarAlt: "Z Nesli avatarı"
    },
    {
      id: "alpha",
      name: "Alpha Nesli",
      range: [2013, 2025],
      avatars: { m: "/img/gen_alpha_m.jpg", f: "/img/gen_alpha_f.jpg" },
      avatarAlt: "Alpha Nesli avatarı"
    },
    {
      id: "beta",
      name: "Beta Nesli",
      range: [2026, 2100],
      avatars: { m: "/img/gen_beta_m.jpg", f: "/img/gen_beta_f.jpg" },
      avatarAlt: "Beta Nesli avatarı"
    }
  ],

  /* ===== Profiles: traits + vibes (used in Card 2) ===== */
  profiles: {
    silent: {
      traits: [
        "Önce görev, sonra duygular",
        "Nazik anlaşmazlık bir spor",
        "Güven yavaş kazanılır, sonsuza kadar korunur",
        "Parlak uygulamalar yerine kanıtlanmış araçları tercih eder",
        "Konuşmadan önce ortamı okur",
        "Refleks olarak tutumlu, trend değil",
        "Kurumlara sadık, değişime temkinli",
        "Başarıyı küçümser, sessizce fazlasını verir",
        "Uzmanlığa ve kıdeme saygı duyar",
        "Sakin ve kesin iletişim kurar"
      ],
      vibes: [
        "Sessiz yetkinlik, yüksek sonuçlar",
        "Sürece saygı",
        "Az konuş, çok yap",
        "İsraf etme; uzun süre kullan",
        "Sakin eller, sakin planlar"
      ]
    },

    boomer: {
      traits: [
        "Sıkı çalışmanın karşılığını alacağına dair iyimser",
        "Toplantıları meşru bir verimlilik birimi olarak görür",
        "Uzun mesaj zincirleri yerine telefon görüşmelerini tercih eder",
        "Ağ odaklı ve ilişki odaklı",
        "Unvanları, kilometre taşlarını ve net merdivenleri değerli bulur",
        "Kendinden emin sunumcu, odada liderlik etmekte rahat",
        "Mikro güncellemeler yerine büyük resim anlatılarını tercih eder",
        "Güvenilirlik ve dakiklik bekler",
        "Fikir birliğini sever ama sonuç ister",
        "Pratik problem çözücü, yapabilirim refleksiyle"
      ],
      vibes: [
        "Hizalayalım ve ilerleyelim",
        "Ara beni; halledelim",
        "Güçlü el sıkışma enerjisi",
        "Resmileştir",
        "Sıkı çalış, sonra dinlen"
      ]
    },

    genx: {
      traits: [
        "Şüpheci ama alaycı değil—genellikle",
        "Bağımsız problem çözücü, düşük bakım gerektiren takım arkadaşı",
        "Alkış yerine özerkliği tercih eder",
        "Kurumsal süslü sözlere alerjik",
        "Kuru mizahla doğrudan iletişimci",
        "Coşkudan çok yetkinliği değerli bulur",
        "Sekme kaosu öncesi dönemden verimli çoklu görevci",
        "Eylemlere güvenir, vaatleri sorgular",
        "Hızlı uyum sağlar, sessizce şikayet eder",
        "Net hedefleri ve minimal gözetimi sever"
      ],
      vibes: [
        "Bana noktayı göster",
        "Doğru yap, yüksek sesle değil",
        "Daha kötüsünü gördüm",
        "Basit tut, lütfen",
        "Drama değil, sonuçlar"
      ]
    },

    geny: {
      traits: [
        "Amaç odaklı ama teslim tarihi bilincinde",
        "Geri bildirim dostu ve büyüme odaklı",
        "Varsayılan olarak işbirlikçi, silolardan nefret eder",
        "Değişimle rahat, bağlam bekler",
        "Sürpriz toplantılar yerine asenkron netliği tercih eder",
        "Esnekliği bir verimlilik aracı olarak değerli bulur",
        "Nasıl'dan önce 'neden' sorar",
        "Hırsı tükenmişlik tespitiyle dengeler",
        "Komuta eden değil, koçluk yapan yöneticiler ister",
        "Araçları sistemlere ve iş akışlarına dönüştürür"
      ],
      vibes: [
        "Nedenini açıkla",
        "Süreci iyileştirelim",
        "Hızlı senkronize et, sonra gönder",
        "Esnek, ama kararsız değil",
        "Anlam artı momentum"
      ]
    },

    genz: {
      traits: [
        "Bilgiyi hızlı tarar, gereksiz sözlere düşük tolerans",
        "Kısa mesajları ve net istekleri tercih eder",
        "Fikirleri erken aşamada sorgulamakta rahat",
        "Resmiyetten çok samimiyeti değerli bulur",
        "Öğreticiler, deneyler ve tekrarlarla öğrenir",
        "Araçların sezgisel ve anında olmasını bekler",
        "Zaman ve enerji etrafında güçlü sınır koyma",
        "Sosyal olarak bilinçli, risk bilincinde, marka bilincinde",
        "Şeffaflık ve hızlı geri bildirim döngüleriyle gelişir",
        "Yan projeleri portföylere dönüştürür"
      ],
      vibes: [
        "Tek satırda söyle",
        "Havalar değil, kanıtlar göster",
        "Gönder, öğren, tekrarla",
        "Gerçekçi kal",
        "Sınırı saygı duy"
      ]
    },

    alpha: {
      traits: [
        "Dokunma öncelikli sezgi; kılavuzlar opsiyonel hissettirir",
        "AI destekli düşünme normal, süslü değil",
        "Her yerde kişiselleştirme bekler",
        "Görsel ve etkileşimli öğrenir",
        "Kısa dikkat süresi, keskin desen farkındalığı",
        "İstenmeden ilerlemeyi oyunlaştırır",
        "Doğal olarak çok modlu: ses, video, metin",
        "Tüketmek yerine birlikte yaratmakta rahat",
        "Yavaş arayüzler ve yavaş kararlara sabırsız",
        "Hız yargıyı geçtiği için koruyucu bariyerlere ihtiyaç duyar"
      ],
      vibes: [
        "Anında, etkileşimli, sezgisel",
        "Oynanabilir yap",
        "Çözmek için kaydır",
        "Cevabı birlikte yarat",
        "Sıkıcıysa, bozuk demektir"
      ]
    },

    beta: {
      traits: [
        "Yaygın AI ve akıllı ortamlara doğmuş",
        "Varsayılan olarak yetkilendirme: 'sistem, halletsin'",
        "Sorunsuz kimlik ve gizlilik kontrolleri bekler",
        "Sentetik medyayı günlük içerik olarak rahat kullanır",
        "UX için yüksek standartlar, sürtünme için düşük sabır",
        "Ajanları ve otomasyonu araçlar gibi kullanır",
        "Yaratıcılık kadar doğrulamayı değerli bulur",
        "İstemler, iş akışları ve orkestrasyonla düşünür",
        "İşbirliği insanları ve araçları eşit şekilde içerir",
        "Öğrenmeyi sürekli, kişiselleştirilmiş akış olarak görür"
      ],
      vibes: [
        "Ajan öncelikli yaşam tarzı",
        "Sürtünme bir hatadır",
        "Doğrula, sonra hava yap",
        "Her şeyi orkestra et",
        "Varsayılan olarak kişiselleştirilmiş"
      ]
    }
  },

  /* ===== Compatibility (directional) ===== */
  compat: {
    silent: {
      boomer: {
        dos: [
          "Bağlam ve noktayı başta açıkla.",
          "Değişiklik önermeden önce deneyime saygı göster.",
          "Hassas konular için telefon veya yüz yüze kullan.",
          "Söz verdiğin şeyi hızlıca takip et.",
          "Geri bildirimi özel ve gerçekçi tut."
        ],
        donts: [
          "Değişiklikten hoşlanmadıklarını varsayma; önce sor.",
          "Toplantılarda çok fazla argo veya alaycılık kullanma.",
          "Bir nokta yapmak için statüyü halka açık meydan okuma.",
          "Kötü haberleri belirsiz dilin arkasına gizleme.",
          "Resmi ortamlarda unvanları anlamsız sayma."
        ],
        joke: "Bir Boomer'ın onayını istiyorsan, planla—spontanlık bir takvim davetiyesi değildir."
      },
      genx: {
        dos: [
          "Kısa ve pratik ol.",
          "Özerklik ve net bir sonuç ver.",
          "Sözlü anlaşmalardan sonra yazılı notlar kullan.",
          "Aşırı övgü olmadan yetkinliği kabul et.",
          "Zamanlarına saygı duy; toplantıları kısa tut."
        ],
        donts: [
          "Nasıl yaptıklarını mikro yönetme.",
          "Açık adımları fazla açıklama.",
          "Her şeyi komite kararına çevirme.",
          "Alaycılığı ilgisizlikle eşitleme.",
          "Zorla eğlenceli takım ritüelleri dayatma."
        ],
        joke: "X Nesli planına başını sallayacak, sonra sen hala ikinci slaytı sunarken sessizce iyileştirecek."
      },
      geny: {
        dos: [
          "Nasıl'dan önce neden'i açıkla.",
          "Sonraki adımlarla büyüme odaklı geri bildirim ver.",
          "Fikirleri davet et, sonra net karar ver.",
          "Belirsizlik olmadan işbirlikçi dil kullan.",
          "Sonuçlara yol açtığında çabayı tanı."
        ],
        donts: [
          "Amaç ve adalet olmadan sadakati varsayma.",
          "Kararları haklı çıkarmak için sadece hiyerarşi kullanma.",
          "Yıllık değerlendirmeye kadar geri bildirimi erteleme.",
          "İş-yaşam sınırlarını zayıflık olarak reddetme.",
          "İş akışlarında dijital araçları opsiyonel sayma."
        ],
        joke: "Y Nesli'ne misyonu söyle, koşacaklar; 'çünkü ben öyle dedim' de, LinkedIn'i açacaklar."
      },
      genz: {
        dos: [
          "Doğrudan, nazik ve hızlı ol.",
          "Beklentileri yazılı olarak belirle ve bir kez tekrarla.",
          "Geri bildirimi nasıl almayı tercih ettiklerini sor.",
          "Küçük kazançlar ve hızlı öğrenme döngüleri sun.",
          "Kısıtlamalar ve ödünler hakkında şeffaf ol."
        ],
        donts: [
          "Uzun monologları bir yönetim tarzı olarak kullanma.",
          "Doğrudanlığı kabalıkla karıştırma.",
          "Sessizliği onay olarak varsayma.",
          "Yeni araçları veya formatları alay etme.",
          "Zihinsel yükü ve bağlam değiştirmeyi görmezden gelme."
        ],
        joke: "Güncellemen kısa bir videodan uzun sürerse, Z Nesli özeti isteyecek."
      },
      alpha: {
        dos: [
          "Görsel örnekler ve somut demolar kullan.",
          "Görevleri kısa, net adımlara böl.",
          "Denemeler üzerine anında geri bildirim ver.",
          "Kuralları açık ve tutarlı yap.",
          "Güvenli sınırlarla merakı teşvik et."
        ],
        donts: [
          "Örtülü normlara güvenme; açıkça belirt.",
          "Yavaş araçlar veya yavaş kararlar için sabır bekleme.",
          "Soruları kesinti olarak cezalandırma.",
          "Korku temelli motivasyon kullanma.",
          "Öncelikleri havadan çıkaracaklarını varsayma."
        ],
        joke: "Alpha kılavuzu istemez; girişi atlayan öğreticiyi ister."
      },
      beta: {
        dos: [
          "Sakin odak ve düzenli rutinler modelle.",
          "Basit kontrollerle eleştirel düşünmeyi öğret.",
          "Kısa, dostane istemler ve örnekler kullan.",
          "Yoğunluktan çok tutarlılığı ödüllendir.",
          "Kararların nasıl alındığını ve değiştirildiğini açıkla."
        ],
        donts: [
          "Bir seferde çok fazla seçenekle aşırı yükleme.",
          "Belirsiz sahipliği tolere edeceklerini varsayma.",
          "Karışıklık gösterdiğinde açıklamayı erteleme.",
          "Her şeyi varsayılan olarak rekabetçi yapma.",
          "Dikkati sonsuz sayma."
        ],
        joke: "Beta yetişkinler yazı tipi hakkında tartışmayı bitirmeden göndermeye hazır olacak."
      }
    },

    boomer: {
      silent: {
        dos: [
          "Resmi nezaket ve net sınırlar kullan.",
          "Değişiklik önerirken kanıt ve geçmiş getir.",
          "Tartışmadan önce bakış açılarını sor.",
          "Zor konular için bire bir konuşmaları tercih et.",
          "Tutarlı takiple güvenilirliği göster."
        ],
        donts: [
          "Yansıma zamanı olmadan kararlara zorlama.",
          "Modernize edilmek istediklerini varsayma.",
          "Dürüstlük olarak saldırgan yüzleşme kullanma.",
          "Spesifikler yerine buzzword'leri fazla kullanma.",
          "Uzun vadeli katkılar için minnettarlığı atlama."
        ],
        joke: "Sessiz Nesil ile yapabileceğin en yüksek sesli hareket hazırlıklı gelmektir."
      },
      genx: {
        dos: [
          "Hedefi belirt, sonra rotayı seçmelerine izin ver.",
          "Durum güncellemelerini kısa ve amaçlı tut.",
          "Şüpheciliğe saygı duy ve gerçeklerle cevapla.",
          "Hak edildiğinde krediyi halka açık ver.",
          "Saatlerde değil, sonuçlarda hizala."
        ],
        donts: [
          "Tek argümanın olarak otorite kullanma.",
          "Her sorunu toplantıya çevirme.",
          "Fazla söz verip az teslim etme.",
          "Bağımsızlığı saygısızlıkla karıştırma.",
          "Komutla coşku talep etme."
        ],
        joke: "X Nesli motivasyon konuşmasına ihtiyaç duymaz; engeli kaldırmaya ihtiyaç duyar."
      },
      geny: {
        dos: [
          "Görevleri etki ve öğrenmeye bağla.",
          "Erken ve spesifik geri bildirim ver.",
          "Sonuçlar güçlü kaldığında esneklik sun.",
          "İşbirliğini davet et, sonra karara bağlan.",
          "Terfi kriterleri hakkında şeffaf ol."
        ],
        donts: [
          "Uzun saatlerin bağlılık anlamına geldiğini varsayma.",
          "Soruları otoriteye meydan okuma olarak görme.",
          "Bilgiyi güç olarak saklama.",
          "Araç iyileştirme taleplerini görmezden gelme.",
          "Sadece görünür işi ödüllendir, etkili işi değil."
        ],
        joke: "Y Nesli zor işi kaldırabilir—sadece sonsuza kadar 'bedel ödeme' deme."
      },
      genz: {
        dos: [
          "Net beklentiler ve hızlı kontrol toplantıları kullan.",
          "Düzeltme yoluyla doğrudan geri bildirim ver.",
          "Samimi ol; kurumsal tiyatroyu bırak.",
          "Yazılı netlikle asenkron çalışmayı destekle.",
          "Erken yardım istemeyi normalleştir."
        ],
        donts: [
          "Sınır koymayı tembellik olarak yorumlama.",
          "Küçük sorunları ele almak için haftalar bekleme.",
          "Öğretim aracı olarak alaycılık kullanma.",
          "Sadakat testi olarak kamerayı zorla açtırma.",
          "Ruh sağlığını 'işle ilgili değil' olarak reddetme."
        ],
        joke: "Z Nesli Wi-Fi'n stabilse unvanına daha çok saygı duyacak."
      },
      alpha: {
        dos: [
          "Göstererek öğret, sonra hızlı denemelerine izin ver.",
          "Basit kurallar ve anında pekiştirme kullan.",
          "Öğrenmeyi oyunlu ama hedef odaklı yap.",
          "Talimatları kısa ve görsel tut.",
          "Koruyucu bariyerler koy, sonra keşfetmeye izin ver."
        ],
        donts: [
          "Önce uzun talimatları okuyacaklarını varsayma.",
          "Halka açık başarısız olduklarında utanç kullanma.",
          "Mola ve çeşitlilik olmadan odak bekleme.",
          "Teknolojiyi varsayılan olarak dikkat dağıtıcı sayma.",
          "Her küçük hatayı aşırı düzeltme."
        ],
        joke: "Alpha 'politika' kelimesini duyar duymaz atlama butonunun nerede olduğunu sorar."
      },
      beta: {
        dos: [
          "Öngörülebilir rutinler ve net roller oluştur.",
          "Güvenli deneylerle merakı teşvik et.",
          "Basit kontrol listeleri ve hatırlatıcılar kullan.",
          "Saygılı anlaşmazlığı modelle.",
          "Sorumlu teknoloji alışkanlıklarını erken öğret."
        ],
        donts: [
          "Normları osmozla öğreneceklerini varsayma.",
          "Uyarılar ve ping'lerle doldurma.",
          "Her seferinde doğruluktan çok hızı ödüllendirme.",
          "Her görevi bir performansa çevirme.",
          "Uyumu zorlamak için korku kullanma."
        ],
        joke: "Beta gerçek hayatta 'sürüm geçmişi' isteyecek."
      }
    },

    genx: {
      silent: {
        dos: [
          "Saygı ve sakin tonla başla.",
          "Sadece eleştiri değil, çözüm getir.",
          "Anlaşmaları yazılı olarak onayla.",
          "Dakik ve tutarlı ol.",
          "Hikayeler ve öğrenilen dersler sor."
        ],
        donts: [
          "Resmi anlarda keskin mizah kullanma.",
          "Kanıt olmadan hızlı değişim istediklerini varsayma.",
          "Hızlandırmak için kesme.",
          "Geleneği mantıksız sayma.",
          "Kapanış olmadan çatışmayı sürdürme."
        ],
        joke: "Sessiz Nesil sıcak yorumunu istemez; planını ve zaman çizelgeni ister."
      },
      boomer: {
        dos: [
          "Sonuçları ve geçmişi göster.",
          "İyileştirmeler önerirken sürece saygı duy.",
          "Net, kendinden emin iletişim kullan.",
          "Seçeneklerle erken sorunları yükselt.",
          "Zaten çalışan şeyi kabul et."
        ],
        donts: [
          "'Eski yol'a gözlerini devirme.",
          "Yan konuşmalarda kararları baltalama.",
          "Unvanın dinlemeyecekleri anlamına geldiğini varsayma.",
          "Paydaş yönetimini görmezden gelme.",
          "Sorumluluktan kaçınmak için belirsizliğin arkasına saklanma."
        ],
        joke: "Boomer'lar yeniliği sever—pilot, metrikler ve slayt sunumu olduktan sonra."
      },
      geny: {
        dos: [
          "Samimi ol ama empati ekle.",
          "Net sorumlulukla özgürlük sun.",
          "İşbirlikçi problem çözme kullan.",
          "Karar kriterlerini açıkça paylaş.",
          "Sadece çıktıyı değil, girişimi tanı."
        ],
        donts: [
          "İyimserliğin naiflik anlamına geldiğini varsayma.",
          "Rahatsızlıktan kaçınmak için geri bildirimi saklama.",
          "Esnekliği rastgele geri alabileceğin bir ayrıcalık olarak görme.",
          "Değer konuşmalarını 'yumuşak şeyler' olarak reddetme.",
          "Kariyer yolu netliği ihtiyacını görmezden gelme."
        ],
        joke: "Y Nesli vizyonunu soracak; X Nesli teslim tarihini soracak."
      },
      genz: {
        dos: [
          "Mesajları net eylemlerle kısa tut.",
          "Doğrudan geri bildirim ve hızlı tekrarlar kullan.",
          "Sınırlara ve asenkron iletişime saygı duy.",
          "Aşağılamadan ödünleri açıkla.",
          "Soruları bahane olarak etiketlemeden teşvik et."
        ],
        donts: [
          "Koçluk olarak 'sertleş' kullanma.",
          "Yazılmamış kuralları bildiklerini varsayma.",
          "Bilgiyi bir geçiş ritüeli olarak saklama.",
          "Her ping'i acil sayma.",
          "Araçlarını veya iletişim tarzını alay etme."
        ],
        joke: "X Nesli 'çöz' der; Z Nesli 'tamam, dokümantasyon linkini gönder' der."
      },
      alpha: {
        dos: [
          "Etkileşimli örneklerle öğret.",
          "Kısa döngüler kullan: dene, gözden geçir, ayarla.",
          "Net sınırlar koy ve nedenini açıkla.",
          "Sadece kazanmayı değil, öğrenmeyi kutla.",
          "Katılık olmadan yapı sağla."
        ],
        donts: [
          "Bir formatta uzun dikkat bekleme.",
          "Sonuçlar güvenli olduğunda denemeyi cezalandırma.",
          "'Profesyonel ol' gibi belirsiz talimatlar kullanma.",
          "Sessizliğin anlama anlamına geldiğini varsayma.",
          "Pratik yerine dersleri fazla kullanma."
        ],
        joke: "Alpha 'en iyi uygulamalar'ı bir meydan okuma istemi gibi görür."
      },
      beta: {
        dos: [
          "Sistemleri basit ve tekrarlanabilir tut.",
          "Net tek görev anlarıyla odaklanmayı öğret.",
          "Dostane kontrol listeleri ve ritüeller kullan.",
          "Sakin problem çözmeyi modelle.",
          "Bilgiyi hızlıca nasıl doğrulanacağını göster."
        ],
        donts: [
          "Bir seferde çok fazla araçla aşırı karmaşıklaştırma.",
          "Sürekli aktiviteyi ilerlemeyle karıştırma.",
          "Geri bildirimi sadece sonuçlar hakkında yapma, alışkanlıklar hakkında değil.",
          "Her zaman açık olmayı normalleştirme.",
          "Merakı bozulma olarak görme."
        ],
        joke: "Beta sabah kahveni bitirmeden rutinini yeniden düzenleyecek."
      }
    },

    geny: {
      silent: {
        dos: [
          "Nazik resmiyet ve sakin tempo kullan.",
          "Rehberlik iste ve görünür şekilde onurlandır.",
          "Taahhütleri sıkı ve tutarlı tut.",
          "Özel geri bildirim değişimlerini tercih et.",
          "Sadece idealler değil, pratik öneriler getir."
        ],
        donts: [
          "Resmi ortamlarda kişisel bağlamı fazla paylaşma.",
          "Anlıklığın her zaman değerli olduğunu varsayma.",
          "Her kararı bir beyin fırtınası oturumuna çevirme.",
          "Hassas konular için günlük dil kullanma.",
          "Duyulmadan önce kapanışı aceleye getirme."
        ],
        joke: "Sessiz Nesil motivasyonel bir söze ihtiyaç duymaz; söylediğini yapmana ihtiyaç duyar."
      },
      boomer: {
        dos: [
          "Saygı göster, sonra iyileştirmeler öner.",
          "Veri ve müşteri etkisi getir.",
          "Hedefler ve sahiplikle net hizala.",
          "Ültimatomlar değil, seçenekler sun.",
          "Kısa yazılı bir özetle takip et."
        ],
        donts: [
          "Esnekliğe karşı olduklarını varsayma; müzakere et.",
          "Sonuçları çevirmeden jargon kullanma.",
          "Hiyerarşiyi bir kötü adam hikayesi gibi görme.",
          "Riski kabul etmeden değişimi zorlama.",
          "İlk konuşmada anında onay bekleme."
        ],
        joke: "Boomer'lar fikrine üretimde iki kez çalıştığını gördükten hemen sonra güvenir."
      },
      genx: {
        dos: [
          "Verimli ve hazırlıklı ol.",
          "Bağımsızlığa saygı duy ve mikro yönetimden kaçın.",
          "Mizahı hafifçe kullan, performans olarak değil.",
          "Girdilerini erken sor, sonra harekete geç.",
          "Hataları hızlıca sahiplen ve devam et."
        ],
        donts: [
          "Coşkuyu yetkinlik olarak fazla satma.",
          "Geri bildirimi uzun bir koçluk oturumuna çevirme.",
          "Sürekli hizalama toplantıları istediklerini varsayma.",
          "Sessizliği ilgisizlikle karıştırma.",
          "'Yakında' gibi belirsiz zaman çizelgeleri kullanma."
        ],
        joke: "X Nesli yol haritanı istemez; engel listeni ister."
      },
      genz: {
        dos: [
          "Net beklentiler yaz ve 'bitti'yi tanımla.",
          "Hızlı ve spesifik geri bildirim ver.",
          "Araçlar ve iş akışı hakkında önerileri davet et.",
          "'Bilmiyorum' demeyi ve öğrenmeyi normalleştir.",
          "Asenkron güncellemelerle odak zamanını koru."
        ],
        donts: [
          "Belirsiz öncelikleri tolere edeceklerini varsayma.",
          "İstekler yerine pasif-agresif ipuçları kullanma.",
          "Sınırları varsayılan olarak müzakere edilebilir sayma.",
          "Görünürlük için onları toplantılarla aşırı yükleme.",
          "Doğrudanlıklarını saygısızlık olarak etiketleme."
        ],
        joke: "Z Nesli sürecini kabul edecek—daha az toplantı ve daha iyi dokümantasyonla gelirse."
      },
      alpha: {
        dos: [
          "Kısa talimatlar ve anında pratik kullan.",
          "Geri bildirimi sık ve pozitif-öncelikli tut.",
          "Seçenekler sun ama birkaçla sınırla.",
          "Konuşmalar yerine görseller ve örnekler kullan.",
          "Küçük günlük rutinlerle alışkanlıklar oluştur."
        ],
        donts: [
          "Yavaş ödül döngüleri için sabır varsayma.",
          "Her seferinde anında aşırı düzeltme.",
          "Kuralları günler arasında tutarsız yapma.",
          "Motivasyon olarak suçluluk kullanma.",
          "Teknoloji kullanımını tamamen iyi veya tamamen kötü sayma."
        ],
        joke: "Alpha çoklu görev yapmaz—sadece aynı beyin sekmesinde birden fazla uygulama çalıştırır."
      },
      beta: {
        dos: [
          "İyi sorular sormayı öğret.",
          "Güvenlik ve odak için basit koruyucu bariyerler kullan.",
          "Tutarlılığı ve nezaketi pekiştir.",
          "Kaynakları hızlıca nasıl doğrulanacağını göster.",
          "Hedefleri küçük tut ve ilerlemeyi görünür şekilde takip et."
        ],
        donts: [
          "Sinyali gürültüden yalnız ayıracaklarını varsayma.",
          "Sadece hız ve yeniliği ödüllendirme.",
          "Her dakikayı aşırı planlama.",
          "Hataları halka açık bir derse çevirme.",
          "Cihazların gerçek iletişimin yerini almasına izin verme."
        ],
        joke: "Beta'nın ilk kelimesi 'güncelleme' olabilir çünkü her şey bir tane alır."
      }
    },

    genz: {
      silent: {
        dos: [
          "Saygılı dil ve ölçülü ton kullan.",
          "Doğrudan geri bildirim vermeden önce izin iste.",
          "Güvenilir ol; tutarlılık güveni en hızlı inşa eder.",
          "Hızlı ateş tartışma yerine yapılandırılmış konuşmaları tercih et.",
          "Somut şekillerde takdir göster."
        ],
        donts: [
          "Ciddi konular etrafında keskin mizah kullanma.",
          "Gayri resmiyetin samimiyet anlamına geldiğini varsayma.",
          "Tartışmayı hızlandırmak için kesme.",
          "Uzun vadeli deneyimi modası geçmiş sayma.",
          "Yardım istedikten sonra takipleri görmezden gelme."
        ],
        joke: "Sessiz Nesil tüm mesajını okur; esneklik, bunu hak eden bir tane göndermektir."
      },
      boomer: {
        dos: [
          "Sonuçlar ve iş değeriyle başla.",
          "Doğrudan ol ama saygılı tut.",
          "Net metriklerle bir pilot plan sun.",
          "İlerlemeyi proaktif olarak iletişim kur.",
          "Esneklik istemeden önce sorumluluğu göster."
        ],
        donts: [
          "Yeni araçlardan nefret ettiklerini varsayma; faydayı kanıtla.",
          "Aynı fikirde olmadığında alaycılık kullanma.",
          "Paydaş hizalamasını atlama.",
          "Teslim tarihlerini opsiyonel sayma.",
          "Puan kazanmak için onları halka açık düzeltme."
        ],
        joke: "Boomer'lar aracını 'yeni standart' olarak yeniden adlandırırsan daha hızlı benimseyecek."
      },
      genx: {
        dos: [
          "Kısa ol ve gereksiz sözleri atla.",
          "Beklentileri açıkça sor.",
          "Aşırı paylaşmadan girişim göster.",
          "Doğrudan geri bildirimi kabul et ve harekete geç.",
          "Net sonraki adımlarla asenkron güncellemeler kullan."
        ],
        donts: [
          "Alaycılıklarını kişisel sayma.",
          "Tüm düşünce sürecini fazla açıklama.",
          "Sürekli güvence talep etme.",
          "Küçük çatışmaları duygusal olarak yükseltme.",
          "Bağımsızlığı soğuklukla karıştırma."
        ],
        joke: "X Nesli 'harika iş' demeyecek ama tekrar yapmanı da durdurmayacak."
      },
      geny: {
        dos: [
          "İşbirliği yap ve krediyi açıkça paylaş.",
          "Taktikle dürüst geri bildirim ver.",
          "Sınırlar ve yanıt süreleri üzerinde hizala.",
          "Modern araçlar kullan ama iş akışlarını stabil tut.",
          "Spesifik hedeflerle mentorluk iste."
        ],
        donts: [
          "Sosyal ve profesyonel olarak çağrıda olmak istediklerini varsayma.",
          "Amaç konuşmasını performans olarak görme.",
          "İplikleri görmezden gelip güvenin kalmasını bekleme.",
          "Daha iyi bir öneri sunmadan süreci reddetme.",
          "Her şeyi değerler hakkında bir tartışmaya çevirme."
        ],
        joke: "Y Nesli hırsını sever—bir mesaj olabilecek bir toplantı planladığı ana kadar."
      },
      alpha: {
        dos: [
          "Hızlı demolar ve tekrarlarla öğret.",
          "Basit dil ve net sınırlar kullan.",
          "Güvenli kısıtlamalarla yaratıcılığı teşvik et.",
          "Geri bildirimi anında ve uygulanabilir yap.",
          "Oturumları kısa ve çeşitli tut."
        ],
        donts: [
          "Bir kez izleyerek öğreneceklerini varsayma.",
          "Bir seferde çok fazla kuralla aşırı yükleme.",
          "Hataları düzeltmek için utanç kullanma.",
          "Mola olmadan uzun odak bekleme.",
          "Soruları kesinti olarak görme."
        ],
        joke: "Alpha açıklamandan daha hızlı öğrenir, sonra açıklamanın neden bu kadar yavaş olduğunu sorar."
      },
      beta: {
        dos: [
          "Sağlıklı dikkat alışkanlıklarını ve duraklamaları modelle.",
          "Basit sistemler öğret: kontrol et, doğrula, karar ver.",
          "Kısa istemler ve tutarlı rutinler kullan.",
          "Nezaketi ve işbirliğini ödüllendir.",
          "Erken yardım istemeyi nasıl göster."
        ],
        donts: [
          "Sürekli bildirimleri normalleştirme.",
          "Her görevi içerik veya performansa çevirme.",
          "Anlamadan çok kısayolları ödüllendirme.",
          "Yanlış bilginin meydan okunmadan geçmesine izin verme.",
          "Teknoloji akıcılığının yargı anlamına geldiğini varsayma."
        ],
        joke: "Beta, karmaşayı icat eden yetişkinlerden daha iyi dijital hijyene sahip olacak."
      }
    },

    alpha: {
      silent: {
        dos: [
          "Nazik ifadeler kullan ve temposu yavaşlat.",
          "Dinleyerek ve sabırla saygı göster.",
          "Fikrinden önce niyetini açıkla.",
          "Net yazılı bir özetle takip et.",
          "Tercih ettikleri iletişim yolunu sor."
        ],
        donts: [
          "Hızlı yanıtların zorunlu olduğunu varsayma.",
          "Resmi bağlamlarda argo kullanma.",
          "Eğlence için onları halka açık meydan okuma.",
          "Geleneği bir şaka olarak görme.",
          "Geçişler olmadan konuları hızlıca değiştirme."
        ],
        joke: "Sessiz Nesil konuşmadan önce düşünür; Alpha üç yeni sekme açarken düşünür."
      },
      boomer: {
        dos: [
          "Saygılı ol ve hedefler hakkında net ol.",
          "İşini ve mantığını kısaca göster.",
          "Yapıyı kabul et, sonra içinde optimize et.",
          "Küçük, sık dozlarda geri bildirim iste.",
          "Karışıklığı önlemek için paylaşılan belgeler kullan."
        ],
        donts: [
          "Kuralların tartışma olmadan müzakere edilebilir olduğunu varsayma.",
          "Deneyimi alakasız sayma.",
          "Ciddi noktalar yapmak için memeler kullanma.",
          "Hizalama olmadan haftalık araçları değiştirme.",
          "Teslim tarihlerini öneriler olarak görme."
        ],
        joke: "Boomer'lar bir plan ister; Alpha kendini güncelleyen bir plan ister."
      },
      genx: {
        dos: [
          "Verimli ve kendi kendine yönlendirilmiş ol.",
          "Geniş değil, kesin sorular sor.",
          "Küçük sonuçları erken teslim et.",
          "'Toplantı yok' tercihlerine saygı duy.",
          "Dramatize etmeden geri bildirimi al."
        ],
        donts: [
          "Her mikro kararı fazla paylaşma.",
          "Sürekli teşvik bekleme.",
          "Kanıt olarak trend dilini kullanma.",
          "Belirsiz sahipliği tolere edeceklerini varsayma.",
          "İşi sosyal bir performansa çevirme."
        ],
        joke: "X Nesli beş adımlı planını görür ve hangi adımın gerçekten gönderildiğini sorar."
      },
      geny: {
        dos: [
          "İşini etki ve öğrenmeye bağla.",
          "İşbirliği yap ve krediyi doğal olarak paylaş.",
          "Mentorluk iste ve koçluğu kabul et.",
          "Herkes için sürtünmeyi azaltan araçlar kullan.",
          "Beklentileri ve zaman çizelgelerini başta netleştir."
        ],
        donts: [
          "Her değişikliği acil sayma.",
          "Bağlamı görmezden gelip doğrudan çözümlere atlama.",
          "Esnekliğin sıfır yapı anlamına geldiğini varsayma.",
          "Geri bildirimi 'eski okul' olarak reddetme.",
          "Güvenilirlikten çok yenilik için optimize etme."
        ],
        joke: "Y Nesli büyümeni destekleyecek; sadece onları tam zamanlı takvimin yapma."
      },
      genz: {
        dos: [
          "Hızlı geri bildirim döngüleri ve hızlı tekrarlar kullan.",
          "İletişimi kısa ve açık tut.",
          "Sınırlar üzerinde anlaş ve saygı duy.",
          "Kaynakları ve şablonları açıkça paylaş.",
          "Erken yardım istemeyi normalleştir."
        ],
        donts: [
          "Kimin daha doğrudan olduğu üzerinde rekabet etme.",
          "Paylaşılan argo'nun paylaşılan anlam anlamına geldiğini varsayma.",
          "Her anlaşmazlığı kimlik temelli sayma.",
          "Birbirinizi sürekli ping'lerle aşırı yükleme.",
          "Yavaş hissettirdiği için dokümantasyonu atlama."
        ],
        joke: "Alpha ve Z Nesli projeyi bir günde bitirebilir—sonra bunu yapmak için en iyi aracı seçmek için bir hafta harcar."
      },
      beta: {
        dos: [
          "Odak ve sabırın sakin bir örneği ol.",
          "Basit rutinler kullan ve tekrarla.",
          "Doğrulama alışkanlıklarını erken öğret.",
          "Rekabetten çok işbirliğini teşvik et.",
          "Hedefleri küçük tut ve tutarlılığı kutla."
        ],
        donts: [
          "Sürekli değiştirmeyle aşırı uyarma.",
          "Her şeyi bir yarışa çevirme.",
          "Öğrenmeden çok dikkat çekmeyi ödüllendirme.",
          "Temelleri atlamayı normalleştirme.",
          "Hataları eğlence olarak görme."
        ],
        joke: "Alpha Beta'ya kısayolu öğretecek ve Beta kimin onayladığını soracak."
      }
    },

    beta: {
      silent: {
        dos: [
          "Saygılı dil ve net yapı kullan.",
          "Yanıtlamadan önce tamamen dinle.",
          "Tutarlı ol ve takip et.",
          "Kuralları ve beklentileri açıkça sor.",
          "Pratik, somut şekillerde yardım sun."
        ],
        donts: [
          "Hızlı konu değişiklikleriyle konuşmaları aceleye getirme.",
          "Gayri resmiyetin her zaman hoş karşılandığını varsayma.",
          "Deneyimi opsiyonel bağlam sayma.",
          "Ciddi tartışmalar sırasında şakalar yapma.",
          "Rehberlik istedikten sonra kaybolma."
        ],
        joke: "Sessiz Nesil sabrı değerli bulur; Beta hala kavramı yüklüyor."
      },
      boomer: {
        dos: [
          "Nazik, net ve sonuç odaklı ol.",
          "Sorumluluğu göster ve teslim tarihlerine saygı duy.",
          "Geri bildirim iste ve hızlıca uygula.",
          "Herkesi hizalı tutan basit araçlar kullan.",
          "Savunmacı görünmeden mantığını açıkla."
        ],
        donts: [
          "Yapının baskı olduğunu varsayma.",
          "Paydaşları bilgilendirmeden yön değiştirme.",
          "Netlik yerine trendy dil kullanma.",
          "Davet edildiysen toplantıları opsiyonel sayma.",
          "Alternatifler önermeden geri itme."
        ],
        joke: "Boomer'lar süreci getirir; Beta onu bir kez kıran otomatik güncellemeyi getirir."
      },
      genx: {
        dos: [
          "Kısa ve hazırlıklı ol.",
          "Güvenilir uygulamayla bağımsızlık göster.",
          "Spesifik sorular sor ve kısa cevapları kabul et.",
          "Sınırlara ve düşük toplantı kültürüne saygı duy.",
          "Sonuçları teslim et, sonra sessizce tekrarla."
        ],
        donts: [
          "Sürekli övgü ve güvence bekleme.",
          "Kulağa akıllı gelmek için planı aşırı karmaşıklaştırma.",
          "Doğrudan geri bildirimi kişisel sayma.",
          "İşi bir popülerlik yarışına çevirme.",
          "Yeni bilgi olmadan tekrar tekrar ping atma."
        ],
        joke: "X Nesli uzun mesajını okumayacak ama açıkladığı sorunu düzeltecek."
      },
      geny: {
        dos: [
          "Amaçta hizala, sonra metriklerde anlaş.",
          "İşbirlikçi ton ve paylaşılan sahiplik kullan.",
          "Kapasite ve engeller hakkında şeffaf ol.",
          "Koçluk iste ve hızlıca uygula.",
          "Sorumlu kalırken esnekliğe saygı duy."
        ],
        donts: [
          "Havaların net önceliklerin yerini aldığını varsayma.",
          "Geri bildirimi kişisel bir derecelendirme olarak görme.",
          "Takım kurallarını ve araçlarını görmezden gelme.",
          "Hevesli görünmek için fazla taahhüt etme.",
          "Emin olmadığında belirsizliği sürdürme."
        ],
        joke: "Y Nesli büyümeni destekleyecek—Beta sadece toplantı davet listesini büyütmeyi durdurmalı."
      },
      genz: {
        dos: [
          "Mesajları net sonraki adımlarla kısa tut.",
          "Sınırlara ve yanıt sürelerine saygı duy.",
          "Hızlı geri bildirim döngüleri kullan ve hızlıca ayarla.",
          "Kararları paylaşılan bir yerde dokümante et.",
          "Bir şey belirsiz olduğunda erken dürüst ol."
        ],
        donts: [
          "Hızın netlikten daha önemli olduğunu varsayma.",
          "Doğrudanlığı bir rekabete çevirme.",
          "Küçük çatışmalara aşırı tepki verme.",
          "Sürekli güncellemelerle sohbetleri doldurma.",
          "Hizalama atlayıp umut etme."
        ],
        joke: "Beta ve Z Nesli bir konuda anlaşabilir: yazılmadıysa, olmadı."
      },
      alpha: {
        dos: [
          "Rutinleri basit ve tutarlı tut.",
          "Kısa, etkileşimli öğrenme anları kullan.",
          "Sakin dikkat ve sıra alma modelle.",
          "Güvenli sınırlarla merakı teşvik et.",
          "Anında, nazik düzeltmeler ver."
        ],
        donts: [
          "Sürekli değiştirmeyle aşırı uyarma.",
          "Her şeyi rekabetçi yapma.",
          "Öğretimde mizah olarak alaycılık kullanma.",
          "Mola olmadan uzun odak bekleme.",
          "Hayal kırıklığı gösterdiğinde duyguları görmezden gelme."
        ],
        joke: "Beta Alpha'dan yardım isteyecek ve Alpha cümle ortasında yaptıkları bir öğreticiyle yanıt verecek."
      }
    }
  }
};
