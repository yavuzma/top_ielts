// =====================================================================
//  IELTS Templates & Tactics — original, exam-focused reference content.
//  Skeletons, phrase banks and per-question-type strategy. All original;
//  no copyrighted test material. The UI adds an "Apply with AI" button
//  that fills a template around the student's own topic.
// =====================================================================

export type TacticCat = "writing" | "speaking" | "reading" | "listening" | "general";

export interface Tactic {
  heading: string;
  body?: string;
  template?: string; // copyable skeleton; also feeds "Apply with AI"
  bullets?: string[];
}

export interface TacticGroup {
  id: string;
  cat: TacticCat;
  title: string;
  blurb: string;
  tactics: Tactic[];
}

export const TAC_CATS: { id: TacticCat; label: string }[] = [
  { id: "writing", label: "Writing" },
  { id: "speaking", label: "Speaking" },
  { id: "reading", label: "Reading" },
  { id: "listening", label: "Listening" },
  { id: "general", label: "Strategy" },
];

export const TACTICS: TacticGroup[] = [
  // ---------------- WRITING ----------------
  {
    id: "t2-structure",
    cat: "writing",
    title: "Task 2 — essay structures",
    blurb: "A reliable 4-paragraph shape for every essay type. Match the structure to the question.",
    tactics: [
      {
        heading: "Opinion (agree/disagree)",
        template: `Introduction: paraphrase the statement + state your position clearly.
Body 1: your first reason → explain → specific example.
Body 2: your second reason → explain → specific example.
Conclusion: restate your position + summarise the two reasons.`,
        bullets: ["Pick ONE clear side — don't sit on the fence.", "Each body = one main idea, fully developed."],
      },
      {
        heading: "Discussion (discuss both views + opinion)",
        template: `Introduction: paraphrase both views + state which you favour.
Body 1: view A — why some people hold it → example.
Body 2: view B — why others hold it → example → why you side here.
Conclusion: restate the balance and your view.`,
      },
      {
        heading: "Problem / solution (or cause / solution)",
        template: `Introduction: paraphrase the issue + say you'll cover causes/problems and solutions.
Body 1: the main problem(s)/cause(s) → consequence → example.
Body 2: realistic solution(s) → how it helps → who acts.
Conclusion: summarise the key problem and most effective solution.`,
      },
      {
        heading: "Two-part (direct question)",
        template: `Introduction: paraphrase the topic + note there are two questions.
Body 1: answer question 1 fully → example.
Body 2: answer question 2 fully → example.
Conclusion: combine both answers in one sentence.`,
      },
    ],
  },
  {
    id: "t2-intro",
    cat: "writing",
    title: "Task 2 — intro & conclusion sentences",
    blurb: "Plug-in sentence frames. Change the topic words, keep the shape.",
    tactics: [
      {
        heading: "Introduction frame",
        template: `It is often argued that [paraphrase the topic]. While some believe [view A], I am convinced that [your position], for the reasons outlined below.`,
      },
      {
        heading: "Conclusion frame",
        template: `In conclusion, although [concede the other side briefly], the evidence strongly suggests that [restate your position]. [One forward-looking sentence about the future/consequences].`,
      },
    ],
  },
  {
    id: "linkers",
    cat: "writing",
    title: "Cohesion — linker bank",
    blurb: "Vary your connectors. Overusing 'Firstly/Secondly/Moreover' caps you at Band 6.",
    tactics: [
      { heading: "Adding", body: "In addition, Furthermore, What is more, Coupled with this, Not only… but also…" },
      { heading: "Contrast", body: "However, Nevertheless, On the other hand, That said, Whereas, While…" },
      { heading: "Cause / effect", body: "Consequently, As a result, This is largely because, Owing to, Which in turn…" },
      { heading: "Examples", body: "For instance, To illustrate, A case in point is, As can be seen in…" },
      { heading: "Concession", body: "Admittedly, Although, Even though, Despite the fact that, Granted that…" },
    ],
  },
  {
    id: "t1-academic",
    cat: "writing",
    title: "Task 1 (Academic) — describe data",
    blurb: "Report, don't interpret. Always include an overview — it's required for Band 7+.",
    tactics: [
      {
        heading: "Structure",
        template: `Introduction: paraphrase what the chart shows (what/where/when + unit).
Overview: 2–3 sentences on the BIGGEST features/trends — no numbers here.
Body 1: describe & compare the key figures for one group.
Body 2: describe & compare the rest.`,
      },
      { heading: "Trend verbs", body: "rose, climbed, surged, dipped, plummeted, levelled off, plateaued, fluctuated, hovered around" },
      { heading: "Degree language", body: "sharply, dramatically, steadily, gradually, marginally, slightly; a significant/modest/negligible increase" },
    ],
  },
  {
    id: "t1-general",
    cat: "writing",
    title: "Task 1 (General) — letters",
    blurb: "Match tone to the reader; cover all three bullet points.",
    tactics: [
      { heading: "Openings", body: "Formal: Dear Sir or Madam, · Semi: Dear Mr Ahmed, · Informal: Hi Sam," },
      { heading: "Closings", body: "Formal: Yours faithfully, (no name) / Yours sincerely, (named) · Informal: Best wishes, / Take care," },
      {
        heading: "Body shape",
        template: `Para 1: reason for writing (purpose).
Para 2: bullet point 1 with detail.
Para 3: bullet point 2 with detail.
Para 4: bullet point 3 + polite call to action.`,
      },
    ],
  },
  // ---------------- SPEAKING ----------------
  {
    id: "sp-part2",
    cat: "speaking",
    title: "Part 2 — cue card long turn",
    blurb: "Use your 1 minute to jot a mini-plan. Aim to speak the full 2 minutes.",
    tactics: [
      {
        heading: "Plan template (from the bullets)",
        template: `What/who/where it is → 1 sentence.
When/how it happened → set the scene with a past tense story.
Details & why it matters → the bulk: describe with adjectives + feelings.
Reflection → how you feel now / would do differently.`,
      },
      { heading: "Stretch it", bullets: ["Add a short anecdote.", "Use 'the reason I chose this is…'.", "Don't stop early — keep adding detail until told to stop."] },
    ],
  },
  {
    id: "sp-fillers",
    cat: "speaking",
    title: "Fluency — buy time naturally",
    blurb: "Silence hurts Fluency. Use natural fillers instead of 'um' — but don't overuse them.",
    tactics: [
      { heading: "Thinking phrases", body: "That's an interesting question… · Let me think for a second… · I'd say that… · Off the top of my head…" },
      { heading: "Opinion phrases", body: "Personally, I feel that… · If you ask me… · I'm inclined to think… · There's no doubt that…" },
      { heading: "Rephrasing", body: "What I mean is… · Or to put it another way… · In other words…" },
    ],
  },
  {
    id: "sp-part3",
    cat: "speaking",
    title: "Part 3 — extend your answers",
    blurb: "Part 3 rewards developed, abstract answers. Use a mini-structure every time.",
    tactics: [
      {
        heading: "Answer template",
        template: `Direct answer → I'd say…
Reason → This is mainly because…
Example/evidence → For example, in my country…
Balance → That said, some might argue…`,
      },
    ],
  },
  // ---------------- READING ----------------
  {
    id: "r-tfng",
    cat: "reading",
    title: "True / False / Not Given",
    blurb: "The most-feared question type. The trick is the difference between False and Not Given.",
    tactics: [
      { heading: "The rule", bullets: ["TRUE = the text confirms the statement.", "FALSE = the text contradicts it.", "NOT GIVEN = the text neither confirms nor contradicts — no info."] },
      { heading: "Tactics", bullets: ["Don't use outside knowledge — only the passage.", "Watch qualifiers: all/some/always/never often flip TRUE to FALSE.", "If you can't find it after a careful scan, it's usually NOT GIVEN."] },
    ],
  },
  {
    id: "r-headings",
    cat: "reading",
    title: "Matching headings",
    blurb: "There are always more headings than paragraphs. Focus on the main idea, not a detail.",
    tactics: [
      { heading: "Method", bullets: ["Read the paragraph's first & last sentences first.", "Ask: what is the ONE main point?", "Eliminate headings that match only a small detail.", "Do the easy paragraphs first, then the leftovers."] },
    ],
  },
  {
    id: "r-completion",
    cat: "reading",
    title: "Sentence / summary completion",
    blurb: "Answers come straight from the passage — and the word limit is strict.",
    tactics: [
      { heading: "Method", bullets: ["Predict the type of word needed (noun? verb? number?).", "Copy the word(s) EXACTLY — no changes.", "Obey 'NO MORE THAN TWO/THREE WORDS'.", "The questions usually follow the passage order."] },
    ],
  },
  {
    id: "r-time",
    cat: "reading",
    title: "Reading time management",
    blurb: "60 minutes, 3 passages, 40 questions, no extra transfer time.",
    tactics: [
      { heading: "Pacing", bullets: ["~20 minutes per passage — then move on.", "Skim first for structure, don't read every word.", "Scan for keywords/synonyms to locate answers.", "Never leave a blank — guess before the clock runs out."] },
    ],
  },
  // ---------------- LISTENING ----------------
  {
    id: "l-general",
    cat: "listening",
    title: "Listening — before it plays",
    blurb: "You get seconds to read the questions. Use them to predict.",
    tactics: [
      { heading: "Predict", bullets: ["Read ahead and underline keywords.", "Predict the answer type: number, name, date, noun?", "For forms, guess whether it's a spelling or a figure."] },
      { heading: "Common traps", bullets: ["Speakers correct themselves — the SECOND number is usually right.", "Synonyms replace the words on the page.", "Distractors: they mention a wrong option before the right one."] },
    ],
  },
  {
    id: "l-maps",
    cat: "listening",
    title: "Map & plan labelling",
    blurb: "Section 2 often has a map. Orientation language is everything.",
    tactics: [
      { heading: "Track direction", body: "Anchor to the entrance/'you are here'. Follow: north/south, opposite, adjacent to, at the far end, on your left, next to, between." },
    ],
  },
  // ---------------- GENERAL ----------------
  {
    id: "g-7to9",
    cat: "general",
    title: "Band 7 → 9 upgrades",
    blurb: "Small habit changes that examiners reward across every skill.",
    tactics: [
      { heading: "Lexical resource", bullets: ["Swap common words for precise ones: 'big problem' → 'pressing issue'.", "Use collocations, not just single words.", "Avoid repeating a keyword — paraphrase it."] },
      { heading: "Grammar", bullets: ["Mix complex structures: conditionals, relative clauses, passives.", "Accuracy beats complexity — a correct simple sentence > a broken complex one.", "Punctuate cleanly; run-ons drop your band."] },
      { heading: "Task response", bullets: ["Answer the WHOLE question, every part.", "Develop ideas — explain and exemplify, don't just list.", "Keep a clear, single position in opinion essays."] },
    ],
  },
  {
    id: "g-mistakes",
    cat: "general",
    title: "Common mistakes that cap your band",
    blurb: "Fix these first — they're the cheapest points to win back.",
    tactics: [
      { heading: "Writing", bullets: ["Under the word count (150/250) → automatic penalty.", "Memorised phrases that don't fit the question.", "No overview in Task 1.", "One giant paragraph — no clear structure."] },
      { heading: "Speaking", bullets: ["One-word answers in Part 1.", "Memorised speeches (examiners spot them).", "Going silent instead of using a filler."] },
    ],
  },
];
