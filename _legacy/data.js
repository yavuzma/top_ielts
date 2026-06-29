// =====================================================================
//  IELTS 9/9 — İçerik verisi
//  Seviyeler: B1 (kelime + grammar) · B2 & C1 (tam IELTS)
//  Bu dosyayı düzenleyerek kelime/grammar/essay/görev ekleyebilirsin.
// =====================================================================

// Sınav tarihi — null ise dashboard'tan ayarlayabilirsin
window.EXAM_DATE = null; // örn "2026-12-01"

// ===== Seviye başına günlük rutin =====
window.ROUTINES = {
  B1: [
    "Grammar: 1 konu çalış + örnek cümleler yaz (30 dk)",
    "Kelime: 15 yeni kelime + dünküleri tekrar (30 dk)",
    "Okuma: kısa bir B1 metni oku, bilmediklerini kelime kartına ekle (20 dk)",
    "Dinleme: 1 BBC 6 Minute English + transkript (20 dk)",
    "Yazma: 5-6 cümlelik kısa paragraf yaz, Claude'a düzelttir (20 dk)"
  ],
  B2: [
    "Kelime: 15 akademik kelime (AWL) + tekrar (30 dk)",
    "Dinleme: 1 IELTS Listening bölümü veya TED Talk + shadowing (40 dk)",
    "Okuma: 1 IELTS Reading pasajı zamanlı + soru analizi (40 dk)",
    "Yazma: Günlük Essay sekmesinden 1 essay yaz + Claude'a puanlat (45 dk)",
    "Konuşma: Claude ile Speaking Part 1/2 (30 dk)",
    "Hata defteri: bugünkü hataları gözden geçir (15 dk)"
  ],
  C1: [
    "Kelime: ileri kelime + collocation + paraphrase pratiği (30 dk)",
    "Dinleme: tam IELTS Listening testi (zamanlı) (40 dk)",
    "Okuma: tam IELTS Reading testi (60 dk, zamanlı)",
    "Yazma: Günlük Essay (Task 2) — band 8+ hedefiyle, Claude'a puanlat (50 dk)",
    "Konuşma: Claude ile tam Speaking turu (Part 1+2+3) + kayıt (30 dk)",
    "Hata defteri + paraphrase bankası güncelle (20 dk)"
  ]
};

// ===== Band takibi =====
window.BANDS = [
  { key: "listening", label: "Listening" },
  { key: "reading",   label: "Reading" },
  { key: "writing",   label: "Writing" },
  { key: "speaking",  label: "Speaking" }
];

// =====================================================================
//  SEVİYE MODÜLLERİ (B1 / B2 / C1)
//  Her modülün görevlerini işaretledikçe ilerlemen kaydedilir/senkronlanır.
// =====================================================================
window.LEVELS = {
  B1: {
    title: "B1 — Temel: Kelime & Grammar",
    desc: "Önce sağlam zemin. Bu seviyede asıl iş kelime hazinesi ve dilbilgisi. IELTS tekniğine B2'de geçeceğiz.",
    modules: [
      { id: "b1m1", name: "Modül 1 — Zamanlar (Tenses)", focus: "Present / Past / Future temelleri",
        tasks: [
          "Grammar sekmesi: Present Simple vs Continuous konusunu bitir",
          "Grammar sekmesi: Past Simple vs Present Perfect konusunu bitir",
          "Her zaman için 5'er kendi cümleni yaz, Claude'a düzelttir",
          "Kelime: 'B1 · Günlük Hayat' listesini başlat"
        ]},
      { id: "b1m2", name: "Modül 2 — Cümle Yapısı", focus: "Articles, prepositions, word order",
        tasks: [
          "Grammar: Articles (a/an/the) konusunu bitir",
          "Grammar: Prepositions (in/on/at) konusunu bitir",
          "10 cümleyi doğru sıra ile yeniden yaz (Claude kontrol etsin)",
          "Kelime: 'B1 · Günlük Hayat' listesinin yarısını öğren"
        ]},
      { id: "b1m3", name: "Modül 3 — Bağlaçlar & Akış", focus: "and/but/because, relative clauses",
        tasks: [
          "Grammar: Conjunctions (and, but, because, although) konusunu bitir",
          "Grammar: Relative clauses (who, which, that) konusunu bitir",
          "Kısa bir paragraf yaz: bağlaçlarla cümleleri birleştir",
          "Kelime: 'B1 · İş & Eğitim' listesini başlat"
        ]},
      { id: "b1m4", name: "Modül 4 — Modallar & Şartlar", focus: "can/should/must, 1st conditional",
        tasks: [
          "Grammar: Modals (can, should, must, have to) konusunu bitir",
          "Grammar: First Conditional konusunu bitir",
          "5 öneri + 5 olasılık cümlesi yaz",
          "Kelime: 'B1 · İş & Eğitim' listesini bitir"
        ]},
      { id: "b1m5", name: "Modül 5 — B1 → B2 köprüsü", focus: "Passive, kısa essay",
        tasks: [
          "Grammar: Passive voice (temel) konusunu bitir",
          "120-150 kelimelik fikir paragrafı yaz (Günlük Essay'de 'kısa' modu)",
          "Claude'a B1 seviye testi yaptır: 'Bana B1 seviyesinde 20 soruluk grammar+kelime testi ver'",
          "Sonuç iyiyse B2 sekmesine geç 🎉"
        ]}
    ]
  },

  B2: {
    title: "B2 — Tam IELTS Formatı",
    desc: "Artık dört becerinin de IELTS formatını öğreniyoruz. Hedef band: 6.0–7.0. Günlük essay şart.",
    modules: [
      { id: "b2m1", name: "Modül 1 — Format & Listening", focus: "Sınav yapısı + dinleme soru tipleri",
        tasks: [
          "IELTS Academic formatını öğren: her bölümün soru tipleri",
          "Resmi ücretsiz deneme testi çöz (4 beceri) — başlangıç bandını ölç",
          "Listening soru tipleri: form / map / multiple choice ayrı ayrı çalış",
          "Kelime: AWL Sublist 1'i bitir",
          "Günlük Essay: ilk Task 2 essay'ini yaz + Claude'a puanlat"
        ]},
      { id: "b2m2", name: "Modül 2 — Reading teknikleri", focus: "Skimming, scanning, TFNG",
        tasks: [
          "Skimming & scanning tekniklerini bir pasajda uygula",
          "True / False / Not Given ve Matching Headings çalış",
          "1 tam Reading pasajı zamanlı çöz (20 dk)",
          "Kelime: AWL Sublist 2",
          "Günlük Essay: 1 essay (Opinion tipi)"
        ]},
      { id: "b2m3", name: "Modül 3 — Writing Task 1", focus: "Grafik/tablo betimleme",
        tasks: [
          "Task 1 dili: artış/azalış/dalgalanma kelimeleri",
          "Bir line graph ve bir tabloyu betimle (her biri 150+ kelime)",
          "Claude'a 2 Task 1 yazıp puanlat",
          "Kelime: AWL Sublist 3",
          "Günlük Essay: 1 essay (Discussion tipi)"
        ]},
      { id: "b2m4", name: "Modül 4 — Writing Task 2 + Speaking", focus: "Essay yapısı + akıcılık",
        tasks: [
          "Task 2 yapısı: giriş → 2 gövde → sonuç kalıbını ezberle",
          "Opinion / Discussion / Problem-Solution tiplerini ayırt et",
          "Claude ile Speaking Part 2 (cue card) x3",
          "Speaking Part 3: fikrini gerekçelendirme",
          "Günlük Essay: bu hafta her gün 1 essay (hafta sonu dahil)"
        ]},
      { id: "b2m5", name: "Modül 5 — Ara deneme", focus: "İlk testle karşılaştır",
        tasks: [
          "Tam Listening + tam Reading testi (zamanlı)",
          "Sonuçları band tablosuna işle, ilk testle karşılaştır",
          "En zayıf 2 soru tipini belirle",
          "Kelime: AWL Sublist 4-5",
          "7.0+ alıyorsan C1 sekmesine geç"
        ]}
    ]
  },

  C1: {
    title: "C1 — Band 8/9 Cilası",
    desc: "İleri seviye. Hedef: her beceride 8+. Karmaşık yapılar, paraphrase ustalığı, tam mock sınavlar.",
    modules: [
      { id: "c1m1", name: "Modül 1 — Hız & doğruluk", focus: "Zamanlı tam testler",
        tasks: [
          "Haftada 2 tam Listening + 2 tam Reading testi (gerçek koşullarda)",
          "Her hata için 'neden' analizi yaz (hata defteri)",
          "İleri kelime: collocation + academic phrase bankası kur",
          "Günlük Essay: her gün 1 Task 2, band 8 hedefiyle"
        ]},
      { id: "c1m2", name: "Modül 2 — Yüksek band Writing", focus: "Cohesion, lexical resource",
        tasks: [
          "Paraphrase pratiği: aynı fikri 3 farklı yapıda yaz",
          "Cohesive devices: gereksiz bağlaç değil, doğal akış kur",
          "3 Task 2 essay yaz, her birinde 9 kriterini hedefle",
          "Claude'a her essay için ayrıntılı band breakdown yaptır",
          "Günlük Essay: her gün 1 essay"
        ]},
      { id: "c1m3", name: "Modül 3 — Speaking 8+", focus: "Akıcılık + idiomatik dil",
        tasks: [
          "Her gün 1 tam Speaking turu (Part 1+2+3), kaydet ve dinle",
          "Idiomatik ifadeler ve doğal duraksamalar (fillers) çalış",
          "Telaffuz: zayıf sesleri hedefle (BBC Pronunciation)",
          "Claude'a Speaking band breakdown yaptır",
          "Günlük Essay: devam"
        ]},
      { id: "c1m4", name: "Modül 4 — Tam mock sınavlar", focus: "Gerçek sınav simülasyonu",
        tasks: [
          "2 tam mock sınav (4 beceri, gerçek süre ve koşullar)",
          "Mock sonuçlarını band tablosuna işle",
          "En zayıf 2 soru tipine cerrahi müdahale",
          "Günlük Essay: her gün 1 essay"
        ]},
      { id: "c1m5", name: "Modül 5 — Sınav haftası", focus: "Cila + strateji",
        tasks: [
          "1 son tam mock sınav",
          "Sınav günü zaman yönetimi planını yaz",
          "Esnek hazır kalıplar (Speaking & Writing) — ama ezber kokmasın",
          "Hafif tekrar, yeni konu YOK",
          "Uyku + dinlenme: sınava zinde git 💪"
        ]}
    ]
  }
};

// =====================================================================
//  GRAMMAR DERSLERİ (özellikle B1) — işaretleyince 'öğrenildi' sayılır
// =====================================================================
window.GRAMMAR = [
  { id:"g_pres", level:"B1", title:"Present Simple vs Continuous",
    summary:"Genel gerçekler/alışkanlıklar için Simple; şu an olan/geçici durumlar için Continuous.",
    points:[
      "Present Simple: I work, she works (genel/rutin). Soru: Do/Does. Olumsuz: don't/doesn't.",
      "Present Continuous: I am working (şu an / geçici). am/is/are + fiil-ing.",
      "Sıklık zarfları (always, usually, never) Simple ile gelir.",
      "stative fiiller (know, like, want) genelde Continuous almaz."
    ],
    examples:["I usually drink tea. (alışkanlık)","I am drinking coffee now. (şu an)","She works at a bank.","They are studying for IELTS this month. (geçici)"],
    practice:"Claude'a yaz: 'Present Simple ve Continuous için 10 boşluk doldurma sorusu ver, sonra kontrol et.'" },

  { id:"g_past", level:"B1", title:"Past Simple vs Present Perfect",
    summary:"Bitmiş belirli zaman için Past Simple; geçmişle bağı süren / belirsiz zaman için Present Perfect.",
    points:[
      "Past Simple: I visited London in 2019. (belirli, bitmiş zaman)",
      "Present Perfect: I have visited London. (ne zaman önemli değil / etkisi sürüyor)",
      "yesterday, last year, ago → Past Simple.",
      "already, yet, ever, never, just, since, for → Present Perfect."
    ],
    examples:["I saw that film last week.","I have already seen that film.","She has lived here for 3 years.","Did you finish? / Have you finished yet?"],
    practice:"Claude'a yaz: 'Past Simple mi Present Perfect mi? 10 cümle ver, ben dolduracağım.'" },

  { id:"g_art", level:"B1", title:"Articles — a / an / the",
    summary:"a/an: tekil, belirsiz, ilk bahsediş. the: belirli, ortak bilinen. Çoğul/genel: article yok.",
    points:[
      "a + sessiz ses (a car), an + sesli ses (an apple, an hour).",
      "the: daha önce geçen veya tek olan şey (the sun, the book I bought).",
      "Genel çoğul/sayılamayan: article yok (Cars are useful. Water is essential).",
      "Çoğu ülke/şehir article almaz; the USA, the UK istisna."
    ],
    examples:["I saw a dog. The dog was barking.","She is an engineer.","The Earth orbits the Sun.","Books are expensive. (genel)"],
    practice:"Claude'a yaz: 'a/an/the/(boş) için 12 boşluklu cümle ver, kontrol et.'" },

  { id:"g_prep", level:"B1", title:"Prepositions — in / on / at",
    summary:"Zaman ve yer için en sık üç edat. Kalıpları örnekle ezberle.",
    points:[
      "Zaman: at (saat: at 5), on (gün: on Monday), in (ay/yıl/uzun süre: in May, in 2026).",
      "Yer: at (nokta: at the door), on (yüzey: on the table), in (içinde: in the room).",
      "Sık kalıplar: at night, in the morning, on time, in time.",
      "Hareket: to (to school), into, onto."
    ],
    examples:["The meeting is at 9 on Friday in June.","The keys are on the table.","She lives in Istanbul.","See you in the morning."],
    practice:"Claude'a yaz: 'in/on/at için 12 soru ver, kontrol et.'" },

  { id:"g_conj", level:"B1", title:"Conjunctions — and / but / because / although",
    summary:"Cümleleri birleştirip akıcılık kurar. IELTS'te 'coherence' puanının temeli.",
    points:[
      "and: ekleme. but: zıtlık. so: sonuç. because: sebep.",
      "although / even though: beklenmeyen zıtlık (Although it rained, we went out).",
      "however cümle başında, virgülle (..., however, ...).",
      "Aşırı bağlaç kullanma; doğal akış daha yüksek puan getirir."
    ],
    examples:["I was tired, but I finished the essay.","We stayed home because it was raining.","Although she is young, she is experienced."],
    practice:"Claude'a yaz: '5 cümle çiftini uygun bağlaçla birleştir bana, sonra kontrol et.'" },

  { id:"g_rel", level:"B1", title:"Relative Clauses — who / which / that",
    summary:"İsmi tarif eden yan cümle. Cümleleri kısaltır, daha akıcı yapar.",
    points:[
      "who: insanlar. which: nesneler. that: ikisi de (defining cümlede).",
      "where: yer, when: zaman.",
      "Defining (gerekli bilgi): virgül yok. Non-defining (ekstra bilgi): virgül var.",
      "Object durumunda 'that/who/which' düşebilir: The book (that) I read."
    ],
    examples:["The man who called is my boss.","This is the house which/that we bought.","My brother, who lives in Ankara, is a doctor."],
    practice:"Claude'a yaz: 'İki cümleyi relative clause ile birleştir alıştırması: 8 çift ver.'" },

  { id:"g_modal", level:"B1", title:"Modals — can / should / must / have to",
    summary:"Yetenek, öneri, zorunluluk ve olasılık. Konuşma ve yazıda çok işine yarar.",
    points:[
      "can/could: yetenek, izin, olasılık (I can swim).",
      "should/ought to: öneri (You should rest).",
      "must: güçlü zorunluluk/kesinlik (You must stop). mustn't: yasak.",
      "have to: dışarıdan zorunluluk. don't have to: gerek yok."
    ],
    examples:["You should practise every day.","I can't come tomorrow.","Students must arrive on time.","You don't have to pay; it's free."],
    practice:"Claude'a yaz: 'Modal seç (can/should/must/have to) 10 soru, kontrol et.'" },

  { id:"g_cond1", level:"B1", title:"First Conditional",
    summary:"Gerçekçi gelecek koşulu: If + present, will + fiil.",
    points:[
      "If it rains, I will stay home.",
      "if cümlesinde gelecek için present kullanılır (rains, not will rain).",
      "will yerine may/might/can de gelebilir (olasılık).",
      "if = unless (eğer ...mazsa): Unless you study, you won't pass."
    ],
    examples:["If you study hard, you will improve.","I will call you if I have time.","Unless we leave now, we'll be late."],
    practice:"Claude'a yaz: 'First conditional için 8 yarım cümle ver, ben tamamlayayım.'" },

  { id:"g_pass", level:"B1", title:"Passive Voice (temel)",
    summary:"Eylemi yapan değil, eylemin kendisi önemliyse: be + V3 (past participle).",
    points:[
      "Aktif: They build houses. Pasif: Houses are built.",
      "Past: The house was built in 1990.",
      "Yapan kişi 'by' ile: The book was written by Orwell.",
      "Akademik yazıda nesnel ton için sık kullanılır (It is believed that...)."
    ],
    examples:["English is spoken here.","The results were analysed carefully.","A new bridge is being built."],
    practice:"Claude'a yaz: 'Aktif cümleleri pasife çevir: 8 cümle ver, kontrol et.'" },

  { id:"g_cond23", level:"B2", title:"Second & Third Conditional",
    summary:"Hayali/gerçek dışı durumlar. Yüksek band yazıda esneklik katar.",
    points:[
      "2nd (şimdi/gelecek hayali): If I had time, I would travel.",
      "3rd (geçmiş pişmanlık): If I had studied, I would have passed.",
      "Mixed: If I had studied medicine, I would be a doctor now.",
      "were her özne ile: If I were you, I would..."
    ],
    examples:["If I were rich, I would help others.","If she had left earlier, she wouldn't have missed it."],
    practice:"Claude'a yaz: '2nd ve 3rd conditional karışık 10 soru ver.'" },

  { id:"g_complex", level:"C1", title:"İleri Cümle Yapıları (band 8+)",
    summary:"Çeşitlilik = yüksek 'Grammatical Range'. Bunları essaylerinde dozunda kullan.",
    points:[
      "Cleft cümleler: It is X that... / What matters is...",
      "Inversion: Not only did it..., but also... / Rarely have we seen...",
      "Participle clauses: Having finished the task, she left.",
      "Nominalisation (akademik ton): 'The increase in pollution...' ('Pollution increased' yerine)."
    ],
    examples:["What concerns me most is the cost.","Not only is it cheaper, but it is also faster.","Having considered both views, I believe..."],
    practice:"Claude'a yaz: 'Bu 6 basit cümleyi band-8 ileri yapılara dönüştür, neden daha iyi açıkla.'" }
];

// =====================================================================
//  KELİME LİSTELERİ (flashcard) — seviye etiketli
// =====================================================================
window.VOCAB = {
  "B1 · Günlük Hayat": [
    { w:"neighbour", d:"komşu", e:"My neighbour is very friendly." },
    { w:"borrow", d:"ödünç almak", e:"Can I borrow your pen?" },
    { w:"lend", d:"ödünç vermek", e:"She lent me some money." },
    { w:"afford", d:"gücü yetmek", e:"I can't afford a new car." },
    { w:"complain", d:"şikayet etmek", e:"He complained about the noise." },
    { w:"appointment", d:"randevu", e:"I have a doctor's appointment." },
    { w:"crowded", d:"kalabalık", e:"The bus was very crowded." },
    { w:"convenient", d:"elverişli, kullanışlı", e:"This shop is very convenient." },
    { w:"rent", d:"kira; kiralamak", e:"The rent is too high." },
    { w:"queue", d:"sıra (beklemek)", e:"We waited in a long queue." },
    { w:"reliable", d:"güvenilir", e:"He is a reliable friend." },
    { w:"on purpose", d:"bilerek, kasten", e:"He broke it on purpose." },
    { w:"get on with", d:"iyi geçinmek", e:"I get on well with my colleagues." },
    { w:"look forward to", d:"dört gözle beklemek", e:"I look forward to the weekend." },
    { w:"used to", d:"eskiden ...ardı", e:"I used to live in a village." },
    { w:"in charge of", d:"sorumlu", e:"She is in charge of the team." },
    { w:"give up", d:"vazgeçmek", e:"Don't give up so easily." },
    { w:"deal with", d:"baş etmek", e:"How do you deal with stress?" },
    { w:"turn down", d:"reddetmek; kısmak", e:"She turned down the offer." },
    { w:"set up", d:"kurmak", e:"They set up a small business." }
  ],
  "B1 · İş & Eğitim": [
    { w:"apply for", d:"başvurmak", e:"I applied for the job." },
    { w:"degree", d:"(üniversite) diploma", e:"She has a degree in biology." },
    { w:"deadline", d:"son teslim tarihi", e:"The deadline is on Friday." },
    { w:"schedule", d:"program, çizelge", e:"My schedule is full this week." },
    { w:"colleague", d:"meslektaş, iş arkadaşı", e:"My colleagues are helpful." },
    { w:"experience", d:"deneyim", e:"He has years of experience." },
    { w:"opportunity", d:"fırsat", e:"It's a great opportunity." },
    { w:"improve", d:"geliştirmek", e:"I want to improve my English." },
    { w:"achieve", d:"başarmak", e:"She achieved her goal." },
    { w:"responsible", d:"sorumlu", e:"You are responsible for this task." },
    { w:"flexible", d:"esnek", e:"We have flexible working hours." },
    { w:"qualification", d:"yeterlilik, nitelik", e:"What qualifications do you have?" },
    { w:"earn", d:"kazanmak (para)", e:"How much do you earn?" },
    { w:"promote", d:"terfi ettirmek", e:"She was promoted to manager." },
    { w:"attend", d:"katılmak (etkinliğe)", e:"I attend evening classes." },
    { w:"research", d:"araştırma", e:"More research is needed." },
    { w:"knowledge", d:"bilgi", e:"He has deep knowledge of history." },
    { w:"skill", d:"beceri", e:"Communication is a key skill." },
    { w:"motivate", d:"motive etmek", e:"Good teachers motivate students." },
    { w:"progress", d:"ilerleme", e:"You're making good progress." }
  ],
  "AWL Sublist 1": [
    { w:"analyse", d:"incelemek, çözümlemek", e:"Researchers analyse the data carefully." },
    { w:"approach", d:"yaklaşım; yaklaşmak", e:"We need a new approach to this problem." },
    { w:"area", d:"alan, bölge", e:"This area of study is growing fast." },
    { w:"assess", d:"değerlendirmek, ölçmek", e:"Teachers assess students' progress." },
    { w:"assume", d:"varsaymak", e:"Don't assume the result without evidence." },
    { w:"authority", d:"otorite, yetki", e:"The local authority approved the plan." },
    { w:"available", d:"mevcut, ulaşılabilir", e:"More data is available online now." },
    { w:"benefit", d:"fayda; yararlanmak", e:"Exercise has many health benefits." },
    { w:"concept", d:"kavram", e:"The concept is hard to define." },
    { w:"consist", d:"oluşmak (of)", e:"Water consists of hydrogen and oxygen." },
    { w:"context", d:"bağlam", e:"Words change meaning depending on context." },
    { w:"create", d:"yaratmak, oluşturmak", e:"The policy created new opportunities." },
    { w:"data", d:"veri", e:"The data supports our hypothesis." },
    { w:"define", d:"tanımlamak", e:"It is hard to define happiness." },
    { w:"derive", d:"türetmek, elde etmek (from)", e:"The word derives from Latin." },
    { w:"distribute", d:"dağıtmak", e:"Resources should be distributed fairly." },
    { w:"economy", d:"ekonomi", e:"The economy is recovering slowly." },
    { w:"environment", d:"çevre, ortam", e:"We must protect the environment." },
    { w:"establish", d:"kurmak, oturtmak", e:"The company was established in 1990." },
    { w:"estimate", d:"tahmin etmek; tahmin", e:"Experts estimate a 10% rise." },
    { w:"evident", d:"açık, belli", e:"It is evident that change is needed." },
    { w:"factor", d:"etken, faktör", e:"Cost is a key factor in the decision." },
    { w:"function", d:"işlev; işlemek", e:"The heart's main function is pumping blood." },
    { w:"identify", d:"belirlemek", e:"Scientists identified the cause." },
    { w:"income", d:"gelir", e:"Average income rose last year." },
    { w:"indicate", d:"göstermek, belirtmek", e:"The results indicate a clear trend." },
    { w:"individual", d:"birey; bireysel", e:"Each individual has different needs." },
    { w:"interpret", d:"yorumlamak", e:"How you interpret data matters." },
    { w:"involve", d:"içermek, dahil etmek", e:"The job involves a lot of travel." },
    { w:"issue", d:"konu, sorun", e:"Climate change is a global issue." },
    { w:"major", d:"büyük, önemli", e:"This is a major breakthrough." },
    { w:"method", d:"yöntem", e:"We used a scientific method." },
    { w:"occur", d:"meydana gelmek", e:"Errors occur when people rush." },
    { w:"percent", d:"yüzde", e:"Sales rose by ten percent." },
    { w:"period", d:"dönem, süre", e:"Over a long period of time." },
    { w:"policy", d:"politika", e:"The government changed its policy." },
    { w:"principle", d:"ilke, prensip", e:"It works on a simple principle." },
    { w:"process", d:"süreç; işlemek", e:"Learning is a slow process." },
    { w:"require", d:"gerektirmek", e:"This task requires patience." },
    { w:"research", d:"araştırma", e:"More research is needed on this." },
    { w:"respond", d:"yanıt vermek", e:"How did they respond to the news?" },
    { w:"role", d:"rol, görev", e:"Education plays a vital role." },
    { w:"significant", d:"önemli, anlamlı", e:"There was a significant improvement." },
    { w:"similar", d:"benzer", e:"The two cases are similar." },
    { w:"source", d:"kaynak", e:"Cite your sources properly." },
    { w:"specific", d:"belirli, özgül", e:"Give a specific example." },
    { w:"structure", d:"yapı", e:"The essay has a clear structure." },
    { w:"theory", d:"kuram, teori", e:"The theory explains the data well." },
    { w:"vary", d:"değişmek, çeşitlilik göstermek", e:"Prices vary from shop to shop." }
  ],
  "AWL Sublist 2": [
    { w:"achieve", d:"başarmak, elde etmek", e:"She achieved her goal." },
    { w:"acquire", d:"edinmek, kazanmak", e:"Children acquire language quickly." },
    { w:"affect", d:"etkilemek", e:"Stress can affect your health." },
    { w:"appropriate", d:"uygun", e:"Choose appropriate vocabulary." },
    { w:"aspect", d:"yön, boyut", e:"Consider every aspect of the issue." },
    { w:"assist", d:"yardım etmek", e:"Software assists the analysis." },
    { w:"category", d:"kategori, sınıf", e:"It falls into a new category." },
    { w:"community", d:"topluluk", e:"The local community supports it." },
    { w:"complex", d:"karmaşık", e:"It is a complex situation." },
    { w:"conclude", d:"sonuçlandırmak, varmak", e:"We conclude that it works." },
    { w:"conduct", d:"yürütmek; davranış", e:"They conducted an experiment." },
    { w:"consequent", d:"bunun sonucu olan", e:"The consequent delays were costly." },
    { w:"construct", d:"inşa etmek, kurmak", e:"Construct a clear argument." },
    { w:"consume", d:"tüketmek", e:"Cars consume a lot of fuel." },
    { w:"culture", d:"kültür", e:"Language reflects culture." },
    { w:"design", d:"tasarım; tasarlamak", e:"The study design was solid." },
    { w:"distinct", d:"belirgin, ayrı", e:"Two distinct groups emerged." },
    { w:"element", d:"öğe, unsur", e:"Trust is a key element." },
    { w:"evaluate", d:"değerlendirmek", e:"Evaluate the evidence first." },
    { w:"feature", d:"özellik", e:"A key feature of the app." },
    { w:"final", d:"son, nihai", e:"The final results are in." },
    { w:"focus", d:"odak; odaklanmak", e:"Focus on your weak skills." },
    { w:"impact", d:"etki", e:"It had a huge impact." },
    { w:"institute", d:"kurum; başlatmak", e:"The institute funds research." },
    { w:"invest", d:"yatırım yapmak", e:"Invest time in vocabulary." },
    { w:"maintain", d:"sürdürmek, korumak", e:"Maintain a daily routine." },
    { w:"obtain", d:"elde etmek", e:"We obtained good results." },
    { w:"participate", d:"katılmak", e:"Students participate actively." },
    { w:"perceive", d:"algılamak", e:"How people perceive risk varies." },
    { w:"positive", d:"olumlu, pozitif", e:"A positive attitude helps." },
    { w:"potential", d:"potansiyel", e:"She has great potential." },
    { w:"previous", d:"önceki", e:"See the previous chapter." },
    { w:"primary", d:"birincil, temel", e:"Health is the primary concern." },
    { w:"range", d:"aralık, yelpaze", e:"A wide range of options." },
    { w:"region", d:"bölge", e:"The region has cold winters." },
    { w:"regulate", d:"düzenlemek", e:"Laws regulate the market." },
    { w:"relevant", d:"ilgili, konuyla alakalı", e:"Give relevant examples." },
    { w:"resource", d:"kaynak", e:"Use free resources wisely." },
    { w:"restrict", d:"kısıtlamak", e:"Rules restrict access." },
    { w:"secure", d:"güvenli; güvence altına almak", e:"A secure connection." },
    { w:"seek", d:"aramak, çabalamak", e:"Seek feedback often." },
    { w:"select", d:"seçmek", e:"Select the best answer." },
    { w:"strategy", d:"strateji", e:"A good exam strategy." },
    { w:"survey", d:"anket, inceleme", e:"We ran a survey." },
    { w:"tradition", d:"gelenek", e:"It is a long tradition." },
    { w:"transfer", d:"aktarmak, transfer", e:"Transfer your notes here." }
  ],
  "C1 · İleri & Collocation": [
    { w:"albeit", d:"her ne kadar ...olsa da", e:"A useful, albeit costly, solution." },
    { w:"mitigate", d:"hafifletmek, azaltmak", e:"Policies to mitigate climate change." },
    { w:"ubiquitous", d:"her yerde bulunan", e:"Smartphones are now ubiquitous." },
    { w:"detrimental", d:"zararlı", e:"Stress is detrimental to health." },
    { w:"prevalent", d:"yaygın", e:"Obesity is increasingly prevalent." },
    { w:"compelling", d:"ikna edici, çarpıcı", e:"A compelling argument." },
    { w:"undermine", d:"baltalamak, zayıflatmak", e:"It undermines public trust." },
    { w:"exacerbate", d:"kötüleştirmek", e:"Tax cuts may exacerbate inequality." },
    { w:"viable", d:"uygulanabilir", e:"A viable alternative to cars." },
    { w:"inherent", d:"doğasında olan", e:"Risk is inherent in investing." },
    { w:"profound", d:"derin, köklü", e:"A profound impact on society." },
    { w:"counterproductive", d:"ters etki yapan", e:"Punishment can be counterproductive." },
    { w:"a growing body of evidence", d:"giderek artan kanıtlar", e:"A growing body of evidence suggests..." },
    { w:"strike a balance", d:"denge kurmak", e:"We must strike a balance between..." },
    { w:"play a pivotal role", d:"kilit rol oynamak", e:"Education plays a pivotal role." },
    { w:"pose a threat", d:"tehdit oluşturmak", e:"Pollution poses a threat to wildlife." },
    { w:"shed light on", d:"aydınlatmak", e:"The study sheds light on the issue." },
    { w:"at the expense of", d:"...pahasına", e:"Growth at the expense of the environment." },
    { w:"a double-edged sword", d:"iki ucu keskin kılıç", e:"Technology is a double-edged sword." },
    { w:"bridge the gap", d:"açığı kapatmak", e:"Policies to bridge the gap between rich and poor." }
  ]
};

// =====================================================================
//  GÜNLÜK ESSAY — soru bankası (IELTS Task 2 + birkaç Task 1)
// =====================================================================
window.ESSAY_PROMPTS = [
  { type:"Task 2 · Opinion", topic:"Education",
    q:"Some people believe that university education should be free for everyone. To what extent do you agree or disagree?" },
  { type:"Task 2 · Discussion", topic:"Technology",
    q:"Some say technology has made our lives more complex, while others believe it has made life easier. Discuss both views and give your own opinion." },
  { type:"Task 2 · Problem-Solution", topic:"Environment",
    q:"Many cities suffer from air pollution. What are the main causes, and what measures can be taken to address this problem?" },
  { type:"Task 2 · Opinion", topic:"Work",
    q:"Some people think that working from home is better than working in an office. To what extent do you agree or disagree?" },
  { type:"Task 2 · Discussion", topic:"Society",
    q:"Some believe that governments should spend money on public services rather than on the arts. Discuss both views and give your opinion." },
  { type:"Task 2 · Two-part", topic:"Health",
    q:"More people are becoming overweight in many countries. Why is this happening, and what can be done about it?" },
  { type:"Task 2 · Opinion", topic:"Crime",
    q:"Some people think that prison is the best way to reduce crime, while others believe education is more effective. Discuss and give your view." },
  { type:"Task 2 · Opinion", topic:"Globalisation",
    q:"Some argue that globalisation harms local cultures. To what extent do you agree or disagree?" },
  { type:"Task 2 · Discussion", topic:"Children",
    q:"Some parents believe children should start school at a very young age; others think they should start later. Discuss both views." },
  { type:"Task 2 · Problem-Solution", topic:"Transport",
    q:"Traffic congestion is a serious problem in many cities. What are the causes, and what solutions can you suggest?" },
  { type:"Task 2 · Opinion", topic:"Media",
    q:"The news media pays too much attention to celebrities. To what extent do you agree or disagree?" },
  { type:"Task 2 · Two-part", topic:"Environment",
    q:"Many species of animals are becoming extinct. Why is this a problem, and what can be done to prevent it?" },
  { type:"Task 1 · Academic", topic:"Graph",
    q:"The chart below shows the percentage of households with internet access in three countries from 2000 to 2020. Summarise the information by selecting and reporting the main features. (150+ words)" },
  { type:"Task 1 · Academic", topic:"Process",
    q:"The diagram below shows how recycled paper is produced. Summarise the information by describing the main stages of the process. (150+ words)" }
];

// =====================================================================
//  KAYNAKLAR (ücretsiz & yasal)
// =====================================================================
window.RESOURCES = [
  { group:"Resmi & Deneme Testleri", items:[
    { name:"IELTS.org — Resmi örnek sorular", url:"https://ielts.org/take-a-test/preparation-resources/sample-test-questions", desc:"Sınavı yapan kurumun kendi ücretsiz örnekleri" },
    { name:"British Council — Take IELTS", url:"https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-practice-tests", desc:"4 beceri için ücretsiz pratik testler" },
    { name:"IDP — IELTS hazırlık", url:"https://www.ielts.org/for-test-takers/sample-test-questions", desc:"Ücretsiz örnek testler ve ipuçları" }
  ]},
  { group:"Grammar (B1 zemini)", items:[
    { name:"British Council — Grammar", url:"https://learnenglish.britishcouncil.org/grammar", desc:"Seviyeye göre dilbilgisi dersleri + alıştırma" },
    { name:"Perfect English Grammar", url:"https://www.perfect-english-grammar.com/", desc:"Konu konu açıklama + ücretsiz quiz" }
  ]},
  { group:"Listening", items:[
    { name:"BBC — 6 Minute English", url:"https://www.bbc.co.uk/learningenglish/english/features/6-minute-english", desc:"Kısa, transkriptli, seviye dostu" },
    { name:"TED Talks", url:"https://www.ted.com/talks", desc:"Altyazı + transkript, akademik dil ve aksan çeşitliliği" },
    { name:"British Council — Listening", url:"https://learnenglish.britishcouncil.org/skills/listening", desc:"Seviyeye göre dinleme + quiz" }
  ]},
  { group:"Speaking & Pronunciation", items:[
    { name:"Claude ile (bu sohbet!)", url:"#", desc:"Cue card al, cevap ver, anında band + düzeltme" },
    { name:"IELTS Liz — Speaking", url:"https://ieltsliz.com/ielts-speaking-free-lessons-essential-tips/", desc:"Ücretsiz Speaking dersleri ve gerçek sorular" },
    { name:"BBC — Pronunciation", url:"https://www.bbc.co.uk/learningenglish/english/features/pronunciation", desc:"Telaffuz videoları" }
  ]},
  { group:"Writing & Reading", items:[
    { name:"IELTS Liz — Writing", url:"https://ieltsliz.com/ielts-writing-task-2/", desc:"Task 1 & 2 model essay ve şablonlar" },
    { name:"British Council — Reading", url:"https://learnenglish.britishcouncil.org/skills/reading", desc:"Seviyeye göre okuma + anlama" }
  ]},
  { group:"Kelime", items:[
    { name:"Academic Word List (resmi)", url:"https://www.wgtn.ac.nz/lals/resources/academicwordlist", desc:"Akademik İngilizcenin en sık 570 kelime ailesi" },
    { name:"IELTS Liz — Vocabulary", url:"https://ieltsliz.com/ielts-vocabulary/", desc:"Konu bazlı kelime listeleri" }
  ]}
];

// =====================================================================
//  OKUMA METİNLERİ (seviyeye göre) — her birinde sorular + cevap anahtarı
//  Yeni metin eklemek için aynı yapıyı kopyala.
// =====================================================================
window.READING = [
  // ---------------- B1 ----------------
  { id:"r_b1_1", level:"B1", title:"A New Café in Town", topic:"Daily life", words:190,
    text:`Last month, a small café called The Green Cup opened on King Street. The owner, Maria, used to work in a large restaurant, but she always wanted her own place. "I was tired of the noise and the long hours," she says. "I wanted somewhere calm where people could relax."

The café is popular with students because the prices are low and the internet is fast. Many of them stay for hours, reading or studying. Maria does not mind. "As long as they buy a coffee, they can stay all day," she laughs.

The café also sells cakes made by a local baker. These sell out quickly, especially at the weekend. Maria plans to add sandwiches to the menu next month. She also hopes to open a second café next year if business stays good.`,
    questions:[
      { q:"Where did Maria work before?", a:"In a large restaurant." },
      { q:"Why is the café popular with students?", a:"Low prices and fast internet." },
      { q:"Who makes the cakes?", a:"A local baker." },
      { q:"True/False/Not Given: Maria wants to open a second café.", a:"True — she hopes to if business stays good." },
      { q:"True/False/Not Given: The café opens early in the morning.", a:"Not Given." }
    ]},
  { id:"r_b1_2", level:"B1", title:"Cycling to Work", topic:"Health & transport", words:200,
    text:`More and more people in cities are choosing to cycle to work instead of driving. There are several reasons for this change. First, cycling is cheaper. You do not have to pay for petrol or parking, and a bicycle is much cheaper than a car.

Second, cycling is good for your health. Doctors say that thirty minutes of exercise a day can improve your heart and help you feel less stressed. Many cyclists say they arrive at work feeling fresh and full of energy.

Finally, cycling is better for the environment because bicycles do not produce pollution. Some city governments now build special cycle lanes to make riding safer. However, cycling is not perfect. In bad weather it can be uncomfortable, and busy roads can be dangerous. Even so, the number of cyclists continues to grow every year.`,
    questions:[
      { q:"Name one reason cycling is cheaper than driving.", a:"No petrol/parking costs; bikes cost less than cars." },
      { q:"How much daily exercise do doctors recommend, according to the text?", a:"Thirty minutes a day." },
      { q:"Why do governments build cycle lanes?", a:"To make cycling safer." },
      { q:"True/False/Not Given: Cycling produces no pollution.", a:"True." },
      { q:"True/False/Not Given: Most people in cities now cycle to work.", a:"Not Given (it says 'more and more', not 'most')." }
    ]},

  // ---------------- B2 ----------------
  { id:"r_b2_1", level:"B2", title:"The Decline of Bees", topic:"Environment", words:270,
    text:`Bees play a vital role in food production. By carrying pollen from one flower to another, they allow many crops to grow, from apples and almonds to coffee. Scientists estimate that around a third of the food we eat depends, directly or indirectly, on pollination by insects, and bees are among the most important pollinators of all.

In recent decades, however, bee populations in many countries have fallen sharply. Researchers point to several causes. The widespread use of certain pesticides appears to damage bees' ability to navigate, so that they cannot find their way back to the hive. The loss of wild flowers, as land is cleared for farming and housing, reduces the food available to them. In addition, a parasite known as the varroa mite has spread through colonies, weakening bees and spreading disease.

The consequences could be serious. If pollination declined significantly, the price of many fruits and vegetables would rise, and some crops might fail altogether. For this reason, governments and conservation groups have begun to act. Some have restricted the most harmful pesticides, while others encourage farmers to leave strips of wild flowers at the edges of their fields. City dwellers, too, can help by planting flowers and avoiding chemicals in their gardens. Although no single measure will solve the problem, together such efforts may give bees a better chance of survival.`,
    questions:[
      { q:"What proportion of our food depends on insect pollination?", a:"About one third." },
      { q:"How do certain pesticides harm bees?", a:"They damage bees' ability to navigate back to the hive." },
      { q:"Name the parasite mentioned.", a:"The varroa mite." },
      { q:"What can farmers do to help, according to the text?", a:"Leave strips of wild flowers at field edges." },
      { q:"True/False/Not Given: A single solution will fix the problem.", a:"False — no single measure will solve it." }
    ]},
  { id:"r_b2_2", level:"B2", title:"Working Four Days a Week", topic:"Work", words:260,
    text:`The idea of a four-day working week has attracted growing attention. Under most versions of the scheme, employees work fewer hours but receive the same pay, on the condition that they maintain their usual level of output. Supporters argue that this is not only possible but desirable.

Trials in several countries have produced encouraging results. In a large study in the United Kingdom, most participating companies reported that productivity stayed the same or even improved, while staff said they felt less stressed and more satisfied with their jobs. Many firms found it easier to attract and keep talented workers. Employees, meanwhile, used their extra day for rest, family, or study.

Critics, however, urge caution. They point out that the trials often involved offices where tasks can be organised flexibly. In hospitals, factories, or shops, where someone must always be present, reducing hours is far more difficult. There are also concerns that workers may simply cram the same amount of labour into fewer days, increasing daily stress rather than reducing it.

Despite these doubts, interest continues to grow. Some economists believe that as automation takes over routine tasks, shorter working weeks may become not just an option but a necessity. Whether the four-day week becomes the norm remains uncertain, but it has clearly moved from a radical idea to a serious topic of debate.`,
    questions:[
      { q:"Under the scheme, what happens to pay?", a:"It stays the same." },
      { q:"What condition must employees meet?", a:"Maintain their usual output/productivity." },
      { q:"Why is the model harder in hospitals and factories?", a:"Someone must always be present." },
      { q:"What concern do critics raise about cramming work?", a:"Workers may do the same work in fewer days, raising daily stress." },
      { q:"True/False/Not Given: Automation may make shorter weeks necessary.", a:"True (some economists believe so)." }
    ]},
  { id:"r_b2_3", level:"B2", title:"The Return of the Wolf", topic:"Wildlife", words:255,
    text:`A century ago, wolves had almost disappeared from much of Europe, hunted by farmers who feared for their livestock. Today, against many expectations, they are returning. Stronger legal protection, the regrowth of forests, and an abundance of wild deer have allowed wolf numbers to recover across countries from Germany to Italy.

For ecologists, this is welcome news. Wolves are what scientists call a "keystone species": by hunting deer, they prevent overgrazing, which in turn allows young trees and other plants to flourish. The presence of a top predator can therefore reshape an entire landscape, benefiting many other species.

Not everyone shares this enthusiasm. Farmers worry about attacks on sheep and cattle, and some rural communities feel that decisions about wildlife are made by distant officials who do not understand country life. Conservationists respond that the actual number of livestock killed is small and that compensation schemes and guard dogs can reduce conflict.

The debate reflects a wider question: how should humans share space with wild animals in a crowded continent? There are no easy answers, but the wolf's quiet comeback shows that, given the chance, nature can recover faster than many people believe.`,
    questions:[
      { q:"Why had wolves nearly vanished a century ago?", a:"They were hunted by farmers protecting livestock." },
      { q:"Name two factors behind their recovery.", a:"Legal protection, forest regrowth, plenty of wild deer." },
      { q:"What is a 'keystone species'?", a:"A species whose presence strongly shapes the whole ecosystem." },
      { q:"How do conservationists suggest reducing conflict?", a:"Compensation schemes and guard dogs." },
      { q:"True/False/Not Given: Large numbers of livestock are killed by wolves.", a:"False — the actual number is small." }
    ]},

  // ---------------- C1 (en fazla metin burada) ----------------
  { id:"r_c1_1", level:"C1", title:"The Paradox of Choice", topic:"Psychology", words:330,
    text:`It is widely assumed that the more options people have, the better off they are. Freedom of choice, after all, lies at the heart of modern consumer society. Yet a body of research in psychology suggests that this assumption deserves scrutiny. Beyond a certain point, an abundance of choice may not liberate us at all; it may instead leave us anxious, dissatisfied, and curiously paralysed.

In one well-known experiment, shoppers were offered free samples of jam. When a small selection of six varieties was on display, many customers tasted and then bought a jar. When the display was expanded to twenty-four varieties, more people stopped to sample, but far fewer actually made a purchase. The wider array attracted attention but discouraged commitment, apparently because comparing so many alternatives became overwhelming.

The phenomenon extends well beyond jam. When faced with dozens of investment plans, employees are less likely to enrol in any of them. Patients presented with numerous treatment options may defer decisions that ought to be made promptly. Even after a choice is finally made, an excess of alternatives can breed regret: the chooser cannot help wondering whether one of the roads not taken would have proved superior.

This does not mean that choice is undesirable; a degree of autonomy is plainly valuable. The point, rather, is that choice carries hidden costs which conventional economics tends to ignore. Designers of public policy and private services are therefore beginning to ask not how to maximise options, but how to structure them wisely—offering enough variety to respect individual preferences, while sparing people the burden of evaluating possibilities that, in practice, they neither want nor need.`,
    questions:[
      { q:"What common assumption does the passage challenge?", a:"That more choice always makes people better off." },
      { q:"In the jam experiment, what did the larger display do?", a:"Attracted more samplers but led to fewer purchases." },
      { q:"Give one non-shopping example of choice overload mentioned.", a:"Investment plans / medical treatment options." },
      { q:"How can excess choice affect feelings after deciding?", a:"It can breed regret about roads not taken." },
      { q:"What does the author suggest policymakers should do?", a:"Structure choices wisely rather than maximise options." },
      { q:"True/False/Not Given: The author argues choice is undesirable.", a:"False — a degree of autonomy is valuable." }
    ]},
  { id:"r_c1_2", level:"C1", title:"Language and Thought", topic:"Linguistics", words:320,
    text:`Does the language we speak shape the way we think? The question has fascinated and divided scholars for the better part of a century. In its strongest form, the so-called Sapir–Whorf hypothesis held that language determines thought, so that speakers of different languages inhabit, in effect, different cognitive worlds. This bold claim has largely been abandoned; people are evidently capable of conceiving of ideas for which their language has no single word.

A weaker version, however, has fared considerably better. According to this view, language does not imprison thought but gently influences it, nudging speakers to attend to certain distinctions more readily than others. Experimental evidence lends it some support. Languages differ, for instance, in how they describe space: some rely on terms like "left" and "right", others on fixed compass directions such as "north" and "south". Speakers of the latter prove remarkably skilled at staying oriented, even in unfamiliar surroundings—a habit of mind apparently fostered by the constant demands of their grammar.

Colour offers another illustration. Where a language draws a lexical boundary between two shades, its speakers tend to discriminate between those shades a fraction faster than speakers whose language treats them as one. The effect is subtle and easily overstated, but it is real.

What emerges is a picture more nuanced than either extreme. Language neither dictates the limits of thought nor floats above it without consequence. Instead, the categories a language makes habitual become, over a lifetime of use, well-worn paths of attention. We remain free to wander off them, but we are inclined, more often than we notice, to follow where our words have already led.`,
    questions:[
      { q:"What did the strong Sapir–Whorf hypothesis claim?", a:"That language determines thought." },
      { q:"Why has the strong version been abandoned?", a:"People can conceive ideas their language has no word for." },
      { q:"How does the spatial-language example support the weak version?", a:"Speakers using compass directions stay better oriented." },
      { q:"What does the colour example show?", a:"A lexical boundary speeds discrimination between shades." },
      { q:"Summarise the author's final position in your own words.", a:"Language influences but does not dictate thought; categories become habitual paths of attention." },
      { q:"True/False/Not Given: The colour effect is large and obvious.", a:"False — it is subtle and easily overstated." }
    ]},
  { id:"r_c1_3", level:"C1", title:"The Economics of Happiness", topic:"Economics", words:325,
    text:`For most of the twentieth century, economists treated rising income as a reliable proxy for rising welfare. The richer a nation grew, the better off its citizens were assumed to be. In recent decades, however, this comfortable equation has come under sustained challenge from researchers who actually ask people how satisfied they are with their lives.

Their findings are striking. Within a given country at a given time, the wealthy do report greater life satisfaction than the poor. Yet once a society has escaped poverty and secured the basics of food, shelter, and security, further increases in average income yield surprisingly modest gains in reported happiness. The United States, for example, has grown considerably richer since the 1950s, while measures of average wellbeing have remained stubbornly flat.

Several explanations have been advanced. One is that human beings adapt: a pay rise that thrills us today becomes the unremarkable norm tomorrow. Another is that much of the satisfaction we derive from income is relative rather than absolute; we judge our position by comparison with others, so that when everyone grows richer together, few feel any better. A third points to the things that money buys least easily—close relationships, good health, a sense of purpose—which weigh heavily in people's accounts of what makes life worthwhile.

None of this implies that economic growth is worthless; for poor societies it remains transformative. But it does suggest that beyond a threshold, the single-minded pursuit of higher output may be a poor guide to human flourishing. A growing number of governments have accordingly begun to supplement traditional economic statistics with broader measures of national wellbeing.`,
    questions:[
      { q:"What did economists traditionally assume about income?", a:"That rising income meant rising welfare." },
      { q:"What happens to happiness once basic needs are met?", a:"Further income gives only modest gains." },
      { q:"Explain the 'relative income' idea.", a:"We judge wellbeing by comparison with others, so collective gains help little." },
      { q:"Name something money buys least easily, per the text.", a:"Relationships, health, or a sense of purpose." },
      { q:"What have some governments started doing?", a:"Adding broader wellbeing measures to economic statistics." },
      { q:"True/False/Not Given: Growth is worthless for poor societies.", a:"False — for poor societies it remains transformative." }
    ]},
  { id:"r_c1_4", level:"C1", title:"The Ethics of Artificial Intelligence", topic:"Technology", words:330,
    text:`As artificial intelligence migrates from research laboratories into hospitals, courtrooms, and hiring offices, the ethical questions it raises have grown impossible to ignore. A system that recommends medical treatments or assesses the risk that a defendant will reoffend wields real power over human lives, and with power comes the demand for accountability.

One difficulty is that the most capable systems are often the least transparent. Modern machine-learning models arrive at their conclusions through statistical processes so intricate that even their designers cannot fully explain a given decision. This "black box" quality is troubling when the stakes are high: a patient denied a treatment, or an applicant rejected for a loan, may reasonably wish to know why, and "the algorithm decided" is hardly a satisfying answer.

A second concern is bias. Because such systems learn from historical data, they can absorb and then reproduce the prejudices embedded in that data. A recruitment tool trained on the records of a company that has long favoured one group may quietly continue to do so, all the while wearing the reassuring mask of mathematical objectivity. The appearance of neutrality can make discrimination harder, not easier, to detect.

Addressing these problems is not merely a technical matter. It requires deciding what fairness means—a question on which reasonable people disagree—and determining who should bear responsibility when an automated system errs. Some argue for a legal right to an explanation; others for independent auditing of high-stakes algorithms. What is clear is that these decisions cannot be left to engineers alone. They are, at bottom, questions about the kind of society we wish to build, and they deserve the widest possible public deliberation.`,
    questions:[
      { q:"Why is the 'black box' quality troubling?", a:"High-stakes decisions can't be explained, even by designers." },
      { q:"How can AI systems become biased?", a:"They learn from historical data containing prejudice." },
      { q:"Why can apparent neutrality be dangerous?", a:"It can hide discrimination, making it harder to detect." },
      { q:"Name one proposed solution mentioned.", a:"A right to explanation; independent auditing of algorithms." },
      { q:"What is the author's main argument about who decides?", a:"These are societal questions needing public deliberation, not just engineers." },
      { q:"True/False/Not Given: The author says fairness is easy to define.", a:"False — reasonable people disagree on what fairness means." }
    ]},
  { id:"r_c1_5", level:"C1", title:"The Vanishing Night Sky", topic:"Science & society", words:315,
    text:`For almost the whole of human history, the night sky was a familiar presence: a canopy of thousands of stars under which our ancestors told stories, navigated oceans, and measured the seasons. For a growing share of the world's population, that spectacle has now all but disappeared, erased not by cloud but by the glow of our own cities. Light pollution—the scattering of artificial light into the night—has spread so far that, by some estimates, a third of humanity can no longer see the Milky Way.

The costs are more than aesthetic. Many organisms have evolved in step with the natural rhythm of light and darkness, and excessive illumination disrupts them. Migrating birds, navigating by the stars, are drawn fatally towards lit buildings; newly hatched turtles, which instinctively head for the bright horizon over the sea, crawl instead towards roads. Human health, too, may suffer, since the hormones that govern our sleep are sensitive to light at night.

What makes the problem peculiarly frustrating is how needless much of it is. A great deal of artificial light serves no purpose, spilling uselessly upwards or sideways rather than illuminating the ground below. Unlike many environmental harms, this one admits of a remarkably simple remedy: shielding lamps so that they point downward, dimming them when no one is about, and using warmer tones less disruptive to wildlife. Such measures save energy and money even as they restore the dark.

A handful of communities have begun to act, establishing "dark-sky reserves" where lighting is strictly controlled. Whether such efforts spread will determine if future generations inherit the stars—or merely read about them.`,
    questions:[
      { q:"What fraction of humanity cannot see the Milky Way?", a:"About one third." },
      { q:"How does light pollution harm migrating birds?", a:"They are drawn fatally towards lit buildings." },
      { q:"Why may human health suffer?", a:"Sleep hormones are sensitive to light at night." },
      { q:"Why does the author call the problem 'needless'?", a:"Much light is wasted, spilling upward/sideways uselessly." },
      { q:"Name one simple remedy mentioned.", a:"Shield lamps downward; dim them; use warmer tones." },
      { q:"True/False/Not Given: Fixing light pollution is expensive.", a:"False — remedies save energy and money." }
    ]}
];

// =====================================================================
//  DİNLEME GÖREVLERİ (seviyeye göre) — gerçek ücretsiz kaynaklara yönlendirir
//  Her görev: dinlemeden önce / dinlerken / dinledikten sonra adımları
// =====================================================================
window.LISTENING = [
  { id:"l_b1_1", level:"B1", title:"BBC 6 Minute English", topic:"Günlük konular", mins:6,
    source:"BBC Learning English", url:"https://www.bbc.co.uk/learningenglish/english/features/6-minute-english",
    before:["Listeden bir bölüm seç (başlığı ilgini çeken).","Başlığa bakıp konu hakkında 2-3 tahmin yaz."],
    during:["İlk dinleyişte sadece ana fikri yakala, not alma.","İkinci dinleyişte 5 yeni kelime not al."],
    after:["Transkripti aç, kaçırdığın yerleri işaretle.","5 kelimeyi Kelime sekmesine 'B1' mantığıyla ekle (Claude'a örnek cümle yaptır).","Claude'a yaz: 'Bu konuyu 4-5 cümleyle özetledim, kontrol et: ...'"] },
  { id:"l_b1_2", level:"B1", title:"British Council — Listening (A2–B1)", topic:"Günlük diyaloglar", mins:5,
    source:"British Council LearnEnglish", url:"https://learnenglish.britishcouncil.org/skills/listening",
    before:["Seviyeden 'A2' veya 'B1' bir alıştırma seç.","Soruları dinlemeden önce oku."],
    during:["Diyaloğu dinle, çoktan seçmeli/boşluk sorularını yanıtla."],
    after:["Cevapları kontrol et, hataların nedenini yaz.","Bilmediğin ifadeleri not al."] },

  { id:"l_b2_1", level:"B2", title:"TED Talk + not alma", topic:"Akademik fikirler", mins:12,
    source:"TED", url:"https://www.ted.com/talks",
    before:["10-15 dakikalık, ilgi alanına yakın bir TED Talk seç.","Altyazıyı KAPAT (önce desteksiz dene)."],
    during:["Konuşmacının ana argümanını ve 3 destekleyici noktayı not al (IELTS Listening map/notes mantığı)."],
    after:["Altyazıyı açıp ikinci kez dinle, kaçırdıklarını tamamla.","Shadowing: 2 dakikalık bir bölümü konuşmacıyla birlikte tekrarla.","Claude'a yaz: 'Bu konuşmanın ana fikrini ve argümanlarını özetledim, akademik dilimi düzelt: ...'"] },
  { id:"l_b2_2", level:"B2", title:"IELTS Listening — resmi örnek", topic:"Sınav formatı", mins:30,
    source:"British Council / IELTS.org", url:"https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-practice-tests",
    before:["Tam bir Listening testi aç (4 bölüm).","Kalem-kağıt hazırla, gerçek sınav gibi otur."],
    during:["Sesi BİR KEZ dinle (sınavda tekrar yok). Tüm soruları yanıtla."],
    after:["Cevap anahtarıyla puanla, band'ini hesapla.","Her hatayı 'neden kaçırdım' notuyla hata defterine yaz (kelime mi, hız mı, yazım mı?)."] },

  { id:"l_c1_1", level:"C1", title:"Akademik ders / lecture dinleme", topic:"İleri akademik", mins:20,
    source:"TED-Ed / YouTube üniversite dersleri", url:"https://ed.ted.com/lessons",
    before:["Yoğun bilgi içeren bir ders seç (bilim/tarih/ekonomi).","Altyazısız başla."],
    during:["Cornell yöntemiyle not al: ana fikirler solda, detaylar sağda.","Sayısal veri, tanım ve örnekleri özellikle yakala."],
    after:["Notlarından bakmadan 150 kelimelik bir özet yaz.","Claude'a yaz: 'Bu dersi dinleyip özetledim. Akademik kelime ve cohesion açısından band 8 seviyesine çek: ...'"] },
  { id:"l_c1_2", level:"C1", title:"Podcast — hızlı/doğal konuşma", topic:"Aksan & akıcılık", mins:30,
    source:"BBC Radio 4 / The Documentary (BBC World Service)", url:"https://www.bbc.co.uk/sounds/category/podcasts",
    before:["Doğal hızda, farklı aksanlı bir bölüm seç.","Hiç durdurmadan dinleyeceksin — gerçek dünya temposu."],
    during:["Sadece dinle; anlamadığın yerleri zihinde bağlamdan tahmin et."],
    after:["Bir bölümü tekrar dinleyip bilmediğin idiom/collocation'ları çıkar.","C1 'İleri & Collocation' kelime listene ekle.","Claude'a yaz: 'Bu ifadeleri dinledim, anlamlarını ve örnek kullanımlarını ver: ...'"] }
];
