# NineBands — IELTS preparation platform

An account-based IELTS preparation app for B1 → C1 levels that syncs across every device.
Vocabulary & grammar (B1), full IELTS practice (B2–C1), daily **reading · listening · writing**,
progress/streak tracking, and PWA support.

**Stack:** Vite · React 19 · TypeScript · Tailwind v4 · shadcn/ui · Firebase (Auth + Firestore) · vite-plugin-pwa

---

## Development (local)

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build (dist/)
npm run preview    # preview the build locally
npm run typecheck  # type checking
```

Works without Firebase configured: the app opens in **guest mode** (only on that device, localStorage).

---

## Firebase setup (accounts + cloud sync)

1. [console.firebase.google.com](https://console.firebase.google.com) → **Add project**.
2. **Build → Authentication → Get started** → under **Sign-in method** enable
   **Email/Password** and optionally **Google**.
3. **Build → Firestore Database → Create database** (production mode) → pick a region.
4. Paste the contents of `firestore.rules` into the **Rules** tab and **Publish**
   (each user can access only their own data).
5. Register a web app via **Project settings → Your apps → Web (`</>`)** and grab the config values.
6. Copy `.env.example` to `.env.local` and fill it in:

   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```

> Firebase web keys are **not secret** (they're for identification); security is enforced by
> Firestore rules. Even so, providing them as environment variables instead of committing them to
> the repo is the clean approach.

When publishing on GitHub Pages, users sign in **with their own account** (in production, don't
forget to add the Pages domain to `Authentication → Settings → Authorized domains`).

---

## Publishing — GitHub Pages (automatic)

1. Push the repo to GitHub (e.g. `ninebands`).
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Add the 6 variables under **Settings → Secrets and variables → Actions → Variables**
   (with the `VITE_FIREBASE_*` names above).
4. On every push to `main`, `.github/workflows/deploy.yml` builds and publishes automatically.
   Link: `https://YOURUSERNAME.github.io/REPO/`

Because `vite.config.ts` uses `base: "./"`, it works fine under a subdirectory.
On phone/tablet, **"Add to Home Screen"** from the browser → installs like an app (PWA), opens offline.

---

## Project structure

```
src/
  data/content.ts     # all study content (level, grammar, vocabulary, reading, listening, essay)
  store/              # auth + per-user cloud sync store (local-first, merge-based)
  components/ui/      # shadcn/ui components
  features/           # pages: Dashboard, LevelPlan, Grammar, Vocab, Reading, Listening,
                      #        Essay, Speaking, Resources, Account
  App.tsx             # providers + auth gate + tabbed shell
_legacy/              # first vanilla version (kept for reference)
```

Adding content: add an item to the relevant array (READING, GRAMMAR, VOCAB, …) in `src/data/content.ts`.

---

## Roadmap (commercial)

- [x] Accounts + cross-device cloud sync
- [x] PWA (installable, offline)
- [ ] Payment/subscription (Stripe) + free/premium content split
- [ ] Exam countdown notifications, weekly progress email
- [ ] Content management panel (admin)
- [ ] Multi-language UI (TR/EN)
