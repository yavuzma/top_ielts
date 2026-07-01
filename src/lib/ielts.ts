// =====================================================================
//  NineBands — IELTS knowledge core ("the trained examiner")
//
//  This file is how we make the AI produce *exam-quality* material and
//  feedback. We can't fine-tune a model from the browser, so instead we
//  encode the real IELTS format, the official band descriptors, every
//  question type, and original worked exemplars. Every AI call in the app
//  is grounded on IELTS_SYSTEM below, so it behaves like a top Cambridge/
//  IDP examiner-author rather than a generic chatbot.
//
//  LEGAL: none of the exemplars here are copied from Cambridge/British
//  Council material. They are original, written to mirror the public exam
//  *format* (which is not copyrightable). Never paste real test passages.
// =====================================================================

// The master persona + rules, prepended to (almost) every request.
export const IELTS_SYSTEM = `You are Iris, the NineBands IELTS engine: a senior IELTS examiner (Academic & General) and item writer with 15+ years at Cambridge/British Council standard. You are rigorous, exam-accurate, and encouraging. The student is aiming for Band 9.

Non-negotiable rules:
- Follow the REAL IELTS format exactly (timing, question types, answer conventions, word/number limits).
- Never reproduce copyrighted passages or questions from published tests. Everything you produce is ORIGINAL but indistinguishable in style and difficulty from the real exam.
- Score strictly against the official band descriptors (Fluency/Coherence, Lexical Resource, Grammatical Range & Accuracy, Task Achievement/Response, Pronunciation for speaking). Half-bands allowed. Be honest — an inflated band hurts the student.
- When you give feedback, always quote the student's ACTUAL words and show a Band-9 upgrade of them.
- Match the requested CEFR level: B1 = accessible, B2 = typical IELTS 6–7, C1 = IELTS 7.5–9. Adjust sentence length, abstraction and lexis accordingly.
- Be concise. No filler. Prefer concrete, actionable advice over praise.`;

export type Level = "B1" | "B2" | "C1";

export const LEVEL_HINT: Record<Level, string> = {
  B1: "CEFR B1 (~IELTS 4.5–5.5). Everyday topics, concrete vocabulary, mostly simple/compound sentences, ~600–700 word passages.",
  B2: "CEFR B2 (~IELTS 6–7). Semi-academic topics, some abstraction, a mix of complex sentences, ~750–850 word passages.",
  C1: "CEFR C1 (~IELTS 7.5–9). Academic/abstract topics, dense argumentation, sophisticated cohesion and lexis, ~850–950 word passages.",
};

// ---- IELTS Reading question types (Academic) --------------------------
export const READING_Q_TYPES = [
  { id: "tfng", name: "True / False / Not Given", note: "Statements about facts. Answer TRUE, FALSE or NOT GIVEN." },
  { id: "ynng", name: "Yes / No / Not Given", note: "Statements about the writer's views/claims." },
  { id: "mcq", name: "Multiple choice", note: "One correct option A–D (or choose two)." },
  { id: "headings", name: "Matching headings", note: "Match a heading to each paragraph; more headings than needed." },
  { id: "match_info", name: "Matching information", note: "Find which paragraph contains a given detail." },
  { id: "complete", name: "Sentence / summary completion", note: "Fill gaps with words FROM the passage; obey the word limit." },
  { id: "short", name: "Short-answer questions", note: "Answer in NO MORE THAN THREE WORDS unless stated." },
] as const;

// ---- IELTS Listening sections -----------------------------------------
export const LISTENING_SECTIONS = [
  { id: "s1", name: "Section 1", note: "Everyday conversation between two speakers (e.g. booking, enquiry). Form/note completion." },
  { id: "s2", name: "Section 2", note: "Monologue on an everyday topic (e.g. a tour). Maps, matching, MCQ." },
  { id: "s3", name: "Section 3", note: "Academic discussion, up to four speakers. MCQ, matching, flow-charts." },
  { id: "s4", name: "Section 4", note: "Academic lecture monologue. Note/sentence completion, harder vocabulary." },
] as const;

// ---- Writing tasks -----------------------------------------------------
export const WRITING_TASKS = [
  { id: "t1a", name: "Task 1 (Academic)", note: "Describe a chart/graph/table/map/process in 150+ words, 20 min. No opinion." },
  { id: "t1g", name: "Task 1 (General)", note: "Write a letter (formal/semi/informal) in 150+ words, 20 min." },
  { id: "t2", name: "Task 2 (essay)", note: "Discursive essay in 250+ words, 40 min. Opinion/discussion/problem-solution/two-part." },
] as const;

// Compact band descriptors so scoring stays anchored (paraphrased, not the
// copyrighted full public descriptors).
export const WRITING_BANDS = `IELTS Writing Task 2 bands (paraphrased anchors):
- Band 9: fully addresses all parts; ideas fully extended & supported; cohesion effortless; wide, natural, precise lexis; wide range of structures with full flexibility and accuracy (rare slips).
- Band 8: sufficiently addresses all parts; well-organised, well-linked; wide lexis with occasional imprecision; wide structures, mostly error-free.
- Band 7: addresses all parts (some more than others); clear progression; some flexible lexis with occasional errors; variety of complex structures, frequent error-free sentences.
- Band 6: addresses all parts though some unevenly; generally coherent but mechanical linking; adequate lexis with some errors; mix of simple/complex, errors rarely impede meaning.
- Band 5: partial address / limited development; some organisation but under/over-use of connectors; limited lexis with noticeable errors; limited structures, frequent errors that can strain the reader.`;

export const SPEAKING_BANDS = `IELTS Speaking bands are judged on four equally-weighted criteria: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, Pronunciation. Band 9 = effortless, fully coherent, precise & idiomatic lexis, full grammatical range with only slips a native might make, natural pronunciation with full flexibility. Each band down adds hesitation, narrower range, more errors, or heavier L1 accent that reduces intelligibility.`;

// A tiny, ORIGINAL worked example so the model copies the exact output
// style for generated reading tests. Kept short to save tokens.
export const READING_EXEMPLAR = `Example of the required style (original, abbreviated):
Passage title: "The Return of the Urban Beaver"
Q (TFNG): "Beavers had been extinct in Britain for over 400 years before reintroduction." → Answer: TRUE — Justification: para 2, "absent from British rivers for more than four centuries".
Q (Summary completion, ONE WORD): "Beaver dams slow the flow of water, which reduces downstream ______." → Answer: flooding — Justification: para 4.
Note how every answer cites the paragraph and a short justification.`;

// JSON contract used by the AI practice engine when generating a reading
// test, so features can parse the result reliably.
export const READING_JSON_CONTRACT = `Return ONLY valid minified JSON, no markdown fences, matching:
{"title":string,"topic":string,"level":"B1"|"B2"|"C1","words":number,"text":string (use \\n\\n between paragraphs),"questions":[{"type":string,"q":string,"a":string,"why":string}]}
Rules: 8–13 questions, mix at least 3 different question types, answers must be findable in the text, "why" cites the paragraph. Do not include an answer inside the passage text.`;

export const LISTENING_JSON_CONTRACT = `Return ONLY valid minified JSON, no markdown fences, matching:
{"title":string,"section":1|2|3|4,"level":"B1"|"B2"|"C1","transcript":string (label speakers, use \\n between lines),"questions":[{"type":string,"q":string,"a":string,"why":string}]}
Rules: transcript reads naturally when spoken by TTS; 6–10 questions; obey word/number limits in the prompts.`;

// Build the system prompt for a specific tool/context.
export function systemFor(context?: string): string {
  return context ? `${IELTS_SYSTEM}\n\nCurrent context: ${context}` : IELTS_SYSTEM;
}
