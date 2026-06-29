# IELTS 9/9 — Kişisel Çalışma Uygulaman

B1 → B2 → C1 seviyeli, günlük essay'li, cihazlar arası senkronlanan IELTS hazırlık uygulaması.
Telefon, tablet ve bilgisayardan **aynı linkle** açarsın; ilerlemen üçünde de aynı olur.

## Sekmeler
- **📊 Panel** — seviye ilerlemesi, çalışma & essay serisi, band hedefleri, günlük rutin
- **🗺️ Seviye Planı** — B1/B2/C1 modülleri (görevleri işaretle)
- **📐 Grammar** — özellikle B1 için dilbilgisi dersleri (+ B2/C1 ileri konular)
- **🧠 Kelime** — flashcard (B1 günlük/iş, AWL akademik, C1 ileri & collocation)
- **✍️ Günlük Essay** — her gün soru çek, yaz, kaydet, tek tuşla Claude'a puanlat
- **🎧 Listening & Speaking** — rutin + Claude pratik istemleri
- **📚 Kaynaklar** — ücretsiz, yasal siteler
- **☁️ Senkron** — senkron kodu + sınav tarihi

> Firebase'i ayarlamasan bile uygulama çalışır — ama sadece açtığın cihazda (senkron kapalı).

---

## A) Hızlı deneme (kurulumsuz)
`index.html` dosyasına çift tıkla — tarayıcıda açılır, hemen çalışmaya başlarsın.
(Senkron için aşağıdaki adımları yap.)

---

## B) İnternete koyma — GitHub Pages (her cihazdan tek link)

1. [github.com](https://github.com) → ücretsiz hesap aç / giriş yap.
2. Sağ üst **+** → **New repository**. İsim: `ielts` (Public seç). **Create**.
3. Açılan sayfada **uploading an existing file** linkine tıkla.
4. Bu klasördeki **tüm dosyaları** sürükle-bırak ile yükle:
   `index.html, styles.css, app.js, data.js, firebase-config.js, manifest.webmanifest, sw.js, icon.svg`
5. **Commit changes**.
6. Repo → **Settings** → sol menü **Pages** → "Branch" altında **main** + **/ (root)** seç → **Save**.
7. 1-2 dakika sonra sayfanın üstünde linkin çıkar:
   `https://KULLANICIADIN.github.io/ielts/`
8. Bu linki telefon ve tabletinde aç → tarayıcı menüsünden **"Ana ekrana ekle"** de.
   Artık uygulama gibi açılır, çevrimdışı bile çalışır (PWA).

> İçeriği güncellemek (yeni kelime/essay sorusu eklemek) istersen ilgili dosyayı GitHub'da düzenleyip commit'le; link aynı kalır.

---

## C) Otomatik senkron — Firebase (ücretsiz)

Bir kez kurarsın, sonsuza kadar otomatik senkron olur.

### 1. Firebase projesi oluştur
1. [console.firebase.google.com](https://console.firebase.google.com) → Google hesabınla gir.
2. **Add project / Proje ekle** → isim ver (örn `ielts-app`) → Google Analytics'i **kapatabilirsin** → Create.

### 2. Web uygulaması ekle
1. Proje ana sayfasında **`</>`** (Web) simgesine tıkla.
2. Bir takma ad yaz (örn `ielts-web`) → **Register app**.
3. Karşına `const firebaseConfig = { apiKey: "...", ... }` çıkar. Bu değerleri kopyala.

### 3. Firestore veritabanını aç
1. Sol menü **Build → Firestore Database** → **Create database**.
2. **Start in test mode** (veya production) → bölge seç → Enable.
3. **Rules** sekmesine geç ve şunu yapıştır, **Publish** de:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /ielts_studies/{code} {
         allow read, write: if true;
       }
     }
   }
   ```
   > Güvenlik senkron kodunla sağlanır: kodu **uzun ve tahmin edilemez** yap (örn `ali-9b3xk2-2026`). Bu sadece kişisel çalışma verin; hassas bilgi tutma.

### 4. Config'i uygulamaya gir
`firebase-config.js` dosyasını aç, Firebase'in verdiği değerleri yapıştır:
```js
window.FIREBASE_CONFIG = {
  apiKey: "BURAYA",
  authDomain: "proje.firebaseapp.com",
  projectId: "proje-id",
  storageBucket: "proje.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234:web:abcd"
};
```
(GitHub'a yüklediysen bu dosyayı orada da güncelle.)

### 5. Senkronu başlat
1. Uygulamada **☁️ Senkron** sekmesine git.
2. Bir **senkron kodu** yaz (örn `ali-ielts-9b3x`) veya **🎲 Kod üret** de → **Kaydet / Bağlan**.
3. Durum **🟢 Senkron açık** olur.
4. **Diğer cihazlarda aynı linki aç → aynı kodu gir.** Hepsi anında senkronlanır.

> Bir cihazda görev işaretle → diğerinde birkaç saniyede güncellenir.

---

## Notlar
- **Veri kaybı koruması:** Senkron birleştirme "tamamlanan = tamamlanan kalır" mantığıyla çalışır; iki cihaz çakışsa bile ilerleme silinmez.
- **Sıfırlama:** Alttaki "Bu cihazı sıfırla" sadece yerel kopyayı siler; senkron kodunla buluttan geri gelir.
- **İçerik ekleme:** `data.js` içindeki `VOCAB`, `GRAMMAR`, `ESSAY_PROMPTS`, `LEVELS` dizilerine yeni madde ekleyerek uygulamayı genişletebilirsin.

Kolay gelsin — hedef 9/9! 💪
