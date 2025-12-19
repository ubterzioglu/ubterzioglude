window.BUYORBYE_DATA = {
  ui: {
    appName: "BUYORBYE",
    subtitle: "15 hızlı soru cevapla. Net bir BUY / WAIT / BYE önerisi al. Üyelik yok. Tarayıcıda yerel çalışır.",
    pillReady: "Hazır.",
    pillStep: (n, total) => `Adım ${n}/${total}`,
    pillResult: "Sonuç hazır.",
    next: "İleri",
    back: "Geri",
    startOver: "Baştan başla",
    required: "Bu alan zorunlu.",
    numberInvalid: "Lütfen geçerli bir sayı gir.",
    budgetMustBeGte0: "Bütçe 0 veya daha büyük olmalı.",
    priceMustBeGte0: "Fiyat 0 veya daha büyük olmalı.",
    optional: "Opsiyonel",
    stepTitles: {
      s1: "1) Temeller",
      s2: "2) Kullanım & öncelikler",
      s3: "3) Gerçeklik kontrolü",
      result: "4) Sonuç"
    },
    stepSubs: {
      s1: "Önce sayılar, sonra sakin karar.",
      s2: "Burada karar netleşir.",
      s3: "İmpulsif alışverişe karşı birkaç koruma sorusu."
    },
    result: {
      why: "Neden",
      tradeoffs: "Artılar / eksiler",
      nextSteps: "Öneri",
      nudge: "Bu tool senin yanında. Paran boşa gitmesin, sonradan pişman olma diye var."
    }
  },

  steps: [
    { id: "s1", color: "card-blue",  qids: ["item", "price", "budget", "incomePct", "urgency"] },
    { id: "s2", color: "card-green", qids: ["frequency", "needwant", "priorities", "alt80", "returnPolicy"] },
    { id: "s3", color: "card-purple", qids: ["regret2y", "priceDrop15", "reliability", "socialPressure", "impulse", "canWait72"] }
  ],

  questions: {
    item: {
      id: "item",
      type: "text",
      required: false,
      label: "Ne alıyorsun?",
      sub: "Kısa bir isim yeter.",
      placeholder: "örn: kulaklık, monitör, kurs"
    },
    price: {
      id: "price",
      type: "number",
      required: true,
      label: "Fiyat (EUR)",
      sub: "Bugün ödeyeceğin toplam fiyat.",
      placeholder: "örn: 199"
    },
    budget: {
      id: "budget",
      type: "number",
      required: true,
      label: "Maksimum bütçen (EUR)",
      sub: "Rahat hissettiğin üst limit.",
      placeholder: "örn: 250"
    },

    /* Maaş sormuyoruz: yüzde seçtiriyoruz */
    incomePct: {
      id: "incomePct",
      type: "single",
      required: true,
      label: "Yaklaşık: bu alışveriş aylık gelirinin yüzde kaçına denk?",
      sub: "Maaşını söylemene gerek yok. Sadece aralık seç.",
      options: [
        { v: "p10",  t: "≈ %10" },
        { v: "p20",  t: "≈ %20" },
        { v: "p30",  t: "≈ %30" },
        { v: "p40",  t: "≈ %40" },
        { v: "p50",  t: "%50 veya daha fazla" },
        { v: "unk",  t: "Emin değilim" }
      ]
    },

    urgency: {
      id: "urgency",
      type: "single",
      required: true,
      label: "Ne kadar acil?",
      sub: "Acilse strateji değişir.",
      options: [
        { v: "today",  t: "Bugün" },
        { v: "week",   t: "7 gün içinde" },
        { v: "month",  t: "30 gün içinde" },
        { v: "none",   t: "Acil değil" }
      ]
    },

    frequency: {
      id: "frequency",
      type: "single",
      required: true,
      label: "Ne sıklıkla kullanacaksın?",
      sub: "Sıklık, pişmanlık riskini en iyi anlatan şeylerden.",
      options: [
        { v: "daily",  t: "Her gün" },
        { v: "weekly", t: "Haftalık" },
        { v: "monthly",t: "Aylık" },
        { v: "rare",   t: "Nadiren" }
      ]
    },
    needwant: {
      id: "needwant",
      type: "single",
      required: true,
      label: "Bu daha çok ihtiyaç mı istek mi?",
      sub: "Yargı yok. Sadece netlik.",
      options: [
        { v: "need", t: "İhtiyaç" },
        { v: "want", t: "İstek" }
      ]
    },
    priorities: {
      id: "priorities",
      type: "multi",
      required: true,
      max: 3,
      label: "En fazla 3 öncelik seç",
      sub: "Senin için ‘iyi’ ne demek, onu anlayalım.",
      options: [
        { v: "price",       t: "Fiyat" },
        { v: "quality",     t: "Kalite" },
        { v: "durability",  t: "Dayanıklılık" },
        { v: "warranty",    t: "Garanti" },
        { v: "performance", t: "Performans" },
        { v: "ease",        t: "Kolay kullanım" },
        { v: "design",      t: "Tasarım" },
        { v: "brand",       t: "Marka" }
      ]
    },
    alt80: {
      id: "alt80",
      type: "yesno",
      required: true,
      label: "Zaten işini ‘yeterince’ gören (≈%80) bir alternatifin var mı?",
      sub: "Evetse, çoğu zaman beklemek daha akıllıca olur."
    },
    returnPolicy: {
      id: "returnPolicy",
      type: "yesno",
      required: true,
      label: "İade imkânı var mı?",
      sub: "İade, özellikle pahalı ürünlerde riski azaltır."
    },

    regret2y: {
      id: "regret2y",
      type: "yesno",
      required: true,
      label: "2 yıl sonra bozulsa, bugün yine de alır mıydın?",
      sub: "En güçlü pişmanlık testi."
    },
    priceDrop15: {
      id: "priceDrop15",
      type: "yesno",
      required: true,
      label: "Fiyatı gelecek ay %15 düşse, şimdi aldığın için pişman olur musun?",
      sub: "‘Çok erken aldım’ acısını yakalar."
    },
    reliability: {
      id: "reliability",
      type: "single",
      required: true,
      label: "Güvenilirlik / garanti senin için ne kadar önemli?",
      sub: "Önem yüksekse, riskli alışverişlerden kaçınmak gerekir.",
      options: [
        { v: "low",  t: "Düşük" },
        { v: "med",  t: "Orta" },
        { v: "high", t: "Yüksek" }
      ]
    },
    socialPressure: {
      id: "socialPressure",
      type: "yesno",
      required: true,
      label: "Bu alışverişte trend / sosyal etki ağır basıyor mu?",
      sub: "Bu, hızlı pişmanlığa sık gider."
    },
    impulse: {
      id: "impulse",
      type: "yesno",
      required: true,
      label: "Şu an stres / sıkıntı / can sıkıntısını ‘alışverişle’ düzeltmeye mi çalışıyorsun?",
      sub: "İmpulsif alışveriş nadiren iyi çıkar."
    },
    canWait72: {
      id: "canWait72",
      type: "yesno",
      required: true,
      label: "Önemli bir şey kaybetmeden 72 saat bekleyebilir misin?",
      sub: "Evetse, beklemek çoğu zaman kazanır."
    }
  },

  scoring: {
    hard: {
      overBudgetOutcome: "bye",
      overBudgetReasonKey: "overBudget"
    },
    thresholds: {
      buyMin: 3,
      byeMax: -3
    },

    pctBands: [
      { maxPct: 10, score: +1, key: "pctLow" },
      { maxPct: 20, score:  0, key: "pctMedium" },
      { maxPct: 30, score: -1, key: "pctHigh" },
      { maxPct: 40, score: -2, key: "pctVeryHigh" },
      { maxPct: 100,score: -3, key: "pctExtreme" }
    ],

    weights: {
      urgency: { today: +2, week: +1, month: 0, none: -1 },
      frequency: { daily: +2, weekly: +1, monthly: 0, rare: -1 },
      needwant: { need: +1, want: -1 },
      alt80: { yes: -2, no: +1 },
      returnPolicy: { yes: +1, no: -1 },
      regret2y: { yes: +2, no: -2 },
      priceDrop15: { yes: -1, no: +1 },
      reliability: { low: 0, med: -1, high: -2 },
      socialPressure: { yes: -2, no: 0 },
      impulse: { yes: -2, no: 0 },
      canWait72: { yes: -1, no: +1 }
    }
  },

  reasons: {
    overBudget: {
      why: [
        "Bütçeni aşıyor.",
        "Bu, pişmanlığa en hızlı giden yol."
      ],
      tradeoffs: [
        "Finansal rahatlığını korursun.",
        "Fiyat düşerse veya şartlar değişirse tekrar bakarsın."
      ],
      next: [
        "Hâlâ istiyorsan hedef fiyat belirle ve bekle.",
        "En önemli önceliğini karşılayan daha uygun bir alternatif düşün."
      ]
    },

    pctLow: {
      why: ["Para oranı sağlıklı görünüyor."],
      tradeoffs: ["Yine de: hızlı kıyasla, sonsuz sekme açma."],
      next: ["Diğer cevaplar da iyiyse almak mantıklı olabilir."]
    },
    pctMedium: {
      why: ["Para oranı yönetilebilir."],
      tradeoffs: ["İndirim beklemek akıllı bir yükseltme olabilir."],
      next: ["Acil değilse fiyat alarmı kurabilirsin."]
    },
    pctHigh: {
      why: ["Bu alışveriş ay içinde hissedilir bir pay."],
      tradeoffs: ["Beklemek pişmanlık riskini azaltır."],
      next: ["72 saat bekleyebiliyorsan bekle ve cevaplarını tekrar kontrol et."]
    },
    pctVeryHigh: {
      why: ["Bu alışveriş aylık gelirine ciddi yük bindiriyor."],
      tradeoffs: ["İndirim veya daha ucuz seçenek seni korur."],
      next: ["WAIT + hedef fiyat. Acele etme."]
    },
    pctExtreme: {
      why: ["Bu alışveriş ayına göre aşırı pahalı görünüyor."],
      tradeoffs: ["İmpulsif alım burada en çok yakar."],
      next: ["Güçlü öneri: dur, alternatif bak ve çok daha iyi bir fırsat bekle."]
    }
  },

  outcomes: {
    buy: { label: "BUY", headline: "Almak mantıklı görünüyor.", tone: "Büyük kırmızı bayrak yok. Bilinçli şekilde keyfini çıkar." },
    wait:{ label: "WAIT",headline: "Biraz bekle.",            tone: "Kararın kötü değil, ama zaman para ve pişmanlık kazandırabilir." },
    bye: { label: "BYE", headline: "Şimdilik pas geç.",       tone: "Biz senin yanındayız — bu alışveriş cüzdanın veya ‘gelecekteki sen’ için riskli." }
  }
};
