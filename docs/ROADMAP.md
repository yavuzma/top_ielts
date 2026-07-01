# NineBands — Content & AI Roadmap

Goal: turn the app into a complete, exam-focused IELTS platform — hundreds of
levelled reading/listening practices, the full 10,000-word vocabulary, a
dedicated IELTS templates/tactics section, and ChatGPT woven into every skill.

**Strategy decided:** build sequentially (Phase 0 → 1 → 2 → 3); reading/listening
use a **hybrid** model — a hand-picked static seed library (works offline) plus
unlimited original AI generation.

**AI-first pivot (2026-07-01):** AI is now the *heart* of the app, not an add-on.
Delivered:
- `src/lib/ielts.ts` — the "trained examiner": encodes real IELTS format, band
  descriptors, all question types, and original exemplars. Every AI call is
  grounded on `IELTS_SYSTEM` so output is exam-quality (we can't fine-tune from
  the browser, so this few-shot grounding *is* the training). No copyrighted text.
- `src/lib/openai.ts` — added `chatOnce` / `chatJSON` (reliable structured JSON).
- `src/lib/generate.ts` — AI practice engine (`generateReading`, `generateListening`).
- `src/components/AiTutor.tsx` — global floating "Ask AI" tutor on every tab,
  context-aware (knows the current tab), ask-anything anytime.
- Reading tab now has an AI passage generator (first proof).
Next: wire the generator into Listening/Vocab/Writing, add Task 1, cache
generated items to Firestore, then the Templates & Tactics tab.

## Hard constraints

1. **Cambridge IELTS 15 PDF is copyrighted.** It stays in `resources/`
   (gitignored), used only as a *personal* reference. Its passages/questions must
   **never** be baked into the public site. All shipped content is original
   (AI-generated or openly licensed).
2. **No giant single file.** `src/data/content.ts` (~1k lines) must be split into
   per-section / per-level JSON with lazy loading before content scales, or the
   bundle and editor will choke (10k words ≈ 1MB+).
3. **AI = user's own OpenAI key** (`src/lib/openai.ts`, browser-direct, streaming).
   Already powers Speaking (Iris). Extend the same pattern everywhere.

## Phase 0 — Content architecture refactor (foundation, do first)

- Split `src/data/content.ts` into `src/data/{reading,listening,vocab,grammar,patterns}/`
  as JSON + small typed loaders.
- Lazy-load per level/section so nothing loads eagerly.
- Keep the existing exported types/shape so features don't break.

## Phase 1 — IELTS Templates & Tactics tab (fastest visible win)

New "Templates & Tactics" feature tab, fully exam-oriented, static authored:
- Writing Task 1 & Task 2 templates (intro/body/conclusion skeletons, linker bank).
- Speaking Part 1/2/3 templates + time-buying phrases.
- Per question-type strategy: TFNG, Matching Headings, gap-fill, listening maps, etc.
- Band 7→9 upgrade lists, time management, common mistakes.
- "Apply this template to my prompt" → AI button.

## Phase 2 — AI practice engine (embed ChatGPT everywhere)

Shared generation layer reused by every tab; generated items cached to Firestore
so they accumulate and work offline afterwards.
- Reading: generate an original level-appropriate passage + IELTS-style questions; mark + explain answers.
- Listening: generate a dialogue/transcript, speak it via browser TTS, ask comprehension questions.
- Vocab: example sentences, synonyms, mini quizzes.
- Essay: add Task 1 (Task 2 scoring already exists).

## Phase 3 — 10,000-word vocabulary

- Import an open CEFR/frequency-ranked word list.
- Chunk into ~50-word decks, banded A1→C2, wired into the existing spaced repetition.
- AI fills missing definitions/examples on demand.

## Phase 4 — Static seed library

- ~30–40 hand-picked quality items per section (offline + first-load).

## Phase 5 — Polish

- Exam countdown, daily goal, progress charts, error log.

---

_Started 2026-06-30. Live at https://yavuzma.github.io/top_ielts/_
