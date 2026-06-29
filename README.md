# NineBands — IELTS hazırlık platformu

B1 → C1 seviyeli, hesap tabanlı, her cihazda senkronlanan IELTS hazırlık uygulaması.
Kelime & grammar (B1), tam IELTS pratiği (B2–C1), günlük **okuma · dinleme · yazma**,
ilerleme/seri takibi ve PWA desteği.

**Stack:** Vite · React 19 · TypeScript · Tailwind v4 · shadcn/ui · Firebase (Auth + Firestore) · vite-plugin-pwa

---

## Geliştirme (local)

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production derleme (dist/)
npm run preview    # derlemeyi yerelde önizle
npm run typecheck  # tip kontrolü
```

Firebase ayarlanmadan da çalışır: uygulama **misafir modunda** (yalnızca o cihazda, localStorage) açılır.

---

## Firebase kurulumu (hesaplar + bulut senkron)

1. [console.firebase.google.com](https://console.firebase.google.com) → **Add project**.
2. **Build → Authentication → Get started** → **Sign-in method**'tan
   **Email/Password** ve istersen **Google**'ı etkinleştir.
3. **Build → Firestore Database → Create database** (production mode) → bölge seç.
4. **Rules** sekmesine `firestore.rules` içeriğini yapıştır ve **Publish** et
   (her kullanıcı yalnızca kendi verisine erişir).
5. **Project settings → Your apps → Web (`</>`)** ile bir web app kaydet, config değerlerini al.
6. `.env.example` dosyasını `.env.local` olarak kopyala ve doldur:

   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```

> Firebase web anahtarları **gizli değildir** (kimlik amaçlıdır); güvenlik Firestore kurallarıyla
> sağlanır. Yine de repoya commit'lemek yerine ortam değişkeni olarak vermek temiz yöntemdir.

GitHub Pages'te yayınlarken kullanıcı **kendi hesabıyla** giriş yapar (canlı yayında
`Authentication → Settings → Authorized domains`'e Pages alan adını eklemeyi unutma).

---

## Yayınlama — GitHub Pages (otomatik)

1. Repoyu GitHub'a gönder (örn. `ninebands`).
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. **Settings → Secrets and variables → Actions → Variables** altına 6 değişkeni ekle
   (yukarıdaki `VITE_FIREBASE_*` adlarıyla).
4. `main`'e her push'ta `.github/workflows/deploy.yml` otomatik derler ve yayınlar.
   Link: `https://KULLANICIADIN.github.io/REPO/`

`vite.config.ts`'te `base: "./"` olduğu için alt-dizinde sorunsuz çalışır.
Telefon/tablette tarayıcıdan **"Ana ekrana ekle"** → uygulama gibi kurulur (PWA), çevrimdışı açılır.

---

## Proje yapısı

```
src/
  data/content.ts     # tüm çalışma içeriği (seviye, grammar, kelime, okuma, dinleme, essay)
  store/              # auth + per-user bulut senkron store (local-first, merge tabanlı)
  components/ui/      # shadcn/ui bileşenleri
  features/           # sayfalar: Dashboard, LevelPlan, Grammar, Vocab, Reading, Listening,
                      #           Essay, Speaking, Resources, Account
  App.tsx             # provider'lar + auth kapısı + sekmeli kabuk
_legacy/              # ilk vanilla sürüm (referans için saklandı)
```

İçerik eklemek: `src/data/content.ts` içindeki ilgili diziye (READING, GRAMMAR, VOCAB, …) madde ekle.

---

## Yol haritası (ticari)

- [x] Hesaplar + cihazlar arası bulut senkron
- [x] PWA (kurulabilir, çevrimdışı)
- [ ] Ödeme/abonelik (Stripe) + ücretsiz/premium içerik ayrımı
- [ ] Sınav sayacı bildirimleri, haftalık ilerleme e-postası
- [ ] İçerik yönetim paneli (admin)
- [ ] Çoklu dil arayüzü (TR/EN)
