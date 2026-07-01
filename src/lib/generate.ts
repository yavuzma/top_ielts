// =====================================================================
//  AI practice engine — turns the IELTS knowledge core into original,
//  exam-quality practice material on demand. Every generator is grounded
//  on IELTS_SYSTEM so output matches real test format & difficulty.
// =====================================================================

import { chatJSON, type ChatMessage } from "@/lib/openai";
import {
  IELTS_SYSTEM,
  LEVEL_HINT,
  READING_EXEMPLAR,
  READING_JSON_CONTRACT,
  READING_Q_TYPES,
  LISTENING_JSON_CONTRACT,
  LISTENING_SECTIONS,
  type Level,
} from "@/lib/ielts";

export interface GenQuestion {
  type: string;
  q: string;
  a: string;
  why: string;
}

export interface GenReading {
  title: string;
  topic: string;
  level: Level;
  words: number;
  text: string;
  questions: GenQuestion[];
}

export interface GenListening {
  title: string;
  section: 1 | 2 | 3 | 4;
  level: Level;
  transcript: string;
  questions: GenQuestion[];
}

export async function generateReading(
  level: Level,
  topic: string | undefined,
  signal?: AbortSignal,
): Promise<GenReading> {
  const types = READING_Q_TYPES.map((t) => `${t.name} — ${t.note}`).join("\n");
  const messages: ChatMessage[] = [
    { role: "system", content: IELTS_SYSTEM },
    {
      role: "user",
      content: `Write ONE original IELTS Academic Reading passage with questions.
Level: ${LEVEL_HINT[level]}
Topic: ${topic?.trim() || "choose an interesting academic topic (science, history, environment, society, technology)"}.

Use a realistic mix of these question types:
${types}

${READING_EXEMPLAR}

${READING_JSON_CONTRACT}`,
    },
  ];
  const out = await chatJSON<GenReading>(messages, signal);
  out.level = level;
  return out;
}

export interface WordDef {
  d: string; // concise learner definition
  e: string; // one natural example sentence
}

// Fill a definition + example for a bare frequency-list word (cached by caller).
export async function defineWord(word: string, signal?: AbortSignal): Promise<WordDef> {
  const messages: ChatMessage[] = [
    { role: "system", content: IELTS_SYSTEM },
    {
      role: "user",
      content: `Define the English word "${word}" for an IELTS learner. Return ONLY minified JSON: {"d":"a concise one-line definition (learner-friendly)","e":"one natural example sentence using the word at IELTS Band 7-8"}. If the word has several senses, use the most common one.`,
    },
  ];
  return chatJSON<WordDef>(messages, signal);
}

export async function generateListening(
  level: Level,
  section: 1 | 2 | 3 | 4,
  topic: string | undefined,
  signal?: AbortSignal,
): Promise<GenListening> {
  const sec = LISTENING_SECTIONS[section - 1];
  const messages: ChatMessage[] = [
    { role: "system", content: IELTS_SYSTEM },
    {
      role: "user",
      content: `Write ONE original IELTS Listening ${sec.name} with questions.
${sec.name}: ${sec.note}
Level: ${LEVEL_HINT[level]}
Topic: ${topic?.trim() || "choose a suitable everyday or academic topic for this section"}.
The transcript must sound natural when read aloud by a text-to-speech voice.

${LISTENING_JSON_CONTRACT}`,
    },
  ];
  const out = await chatJSON<GenListening>(messages, signal);
  out.level = level;
  out.section = section;
  return out;
}
