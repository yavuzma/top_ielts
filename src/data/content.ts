// =====================================================================
//  NineBands — study content (single source of truth)
//  To add content, append an item with the same shape to the relevant array.
// =====================================================================

export type Level = "B1" | "B2" | "C1";
export const LEVEL_ORDER: Record<Level, number> = { B1: 1, B2: 2, C1: 3 };

export interface Module {
  id: string;
  name: string;
  focus: string;
  tasks: string[];
}
export interface LevelInfo {
  title: string;
  blurb: string;
  desc: string;
  modules: Module[];
}

export const LEVELS: Record<Level, LevelInfo> = {
  B1: {
    title: "B1 — Foundations: Vocabulary & Grammar",
    blurb: "Solid foundation",
    desc: "Build a solid base first. At this level the real work is vocabulary and grammar. We move on to IELTS technique at B2.",
    modules: [
      {
        id: "b1m1",
        name: "Module 1 — Tenses",
        focus: "Present / Past / Future basics",
        tasks: [
          "Grammar: finish Present Simple vs Continuous",
          "Grammar: finish Past Simple vs Present Perfect",
          "Write 5 of your own sentences for each tense, get Claude to correct them",
          "Vocabulary: start the 'B1 · Daily Life' list",
        ],
      },
      {
        id: "b1m2",
        name: "Module 2 — Sentence Structure",
        focus: "Articles, prepositions, word order",
        tasks: [
          "Grammar: finish Articles (a/an/the)",
          "Grammar: finish Prepositions (in/on/at)",
          "Rewrite 10 sentences in the correct word order (let Claude check)",
          "Vocabulary: learn half of the 'B1 · Daily Life' list",
        ],
      },
      {
        id: "b1m3",
        name: "Module 3 — Connectors & Flow",
        focus: "and/but/because, relative clauses",
        tasks: [
          "Grammar: finish Conjunctions (and, but, because, although)",
          "Grammar: finish Relative clauses (who, which, that)",
          "Write a short paragraph: join sentences with connectors",
          "Vocabulary: start the 'B1 · Work & Education' list",
        ],
      },
      {
        id: "b1m4",
        name: "Module 4 — Modals & Conditionals",
        focus: "can/should/must, 1st conditional",
        tasks: [
          "Grammar: finish Modals (can, should, must, have to)",
          "Grammar: finish First Conditional",
          "Write 5 advice + 5 possibility sentences",
          "Vocabulary: finish the 'B1 · Work & Education' list",
        ],
      },
      {
        id: "b1m5",
        name: "Module 5 — B1 → B2 bridge",
        focus: "Passive, short essay",
        tasks: [
          "Grammar: finish Passive voice (basic)",
          "Write a 120–150 word opinion paragraph (Writing tab)",
          "Ask Claude for a B1-level test: 20 grammar + vocabulary questions",
          "If you do well, move up to B2 🎉",
        ],
      },
    ],
  },
  B2: {
    title: "B2 — Full IELTS Format",
    blurb: "Band 6–7",
    desc: "Now we learn the IELTS format for all four skills. Target band: 6.0–7.0. A daily essay is a must.",
    modules: [
      {
        id: "b2m1",
        name: "Module 1 — Format & Listening",
        focus: "Test structure + listening question types",
        tasks: [
          "Learn the IELTS Academic format: question types of each section",
          "Take a free official mock test (4 skills) — measure your starting band",
          "Listening question types: study form / map / multiple choice separately",
          "Vocabulary: finish AWL Sublist 1",
          "Writing: write your first Task 2 essay + get Claude to score it",
        ],
      },
      {
        id: "b2m2",
        name: "Module 2 — Reading techniques",
        focus: "Skimming, scanning, TFNG",
        tasks: [
          "Apply skimming & scanning on a passage",
          "Practise True / False / Not Given and Matching Headings",
          "Do 1 full Reading passage, timed (20 min)",
          "Vocabulary: AWL Sublist 2",
          "Writing: 1 essay (Opinion type)",
        ],
      },
      {
        id: "b2m3",
        name: "Module 3 — Writing Task 1",
        focus: "Describing graphs/tables",
        tasks: [
          "Task 1 language: increase/decrease/fluctuation words",
          "Describe a line graph and a table (150+ words each)",
          "Get Claude to score 2 Task 1 responses",
          "Vocabulary: AWL Sublist 3",
          "Writing: 1 essay (Discussion type)",
        ],
      },
      {
        id: "b2m4",
        name: "Module 4 — Writing Task 2 + Speaking",
        focus: "Essay structure + fluency",
        tasks: [
          "Memorise the Task 2 structure: intro → 2 body → conclusion",
          "Tell apart Opinion / Discussion / Problem-Solution types",
          "Speaking Part 2 (cue card) x3 with Claude",
          "Speaking Part 3: justifying your opinion",
          "Writing: 1 essay every day this week",
        ],
      },
      {
        id: "b2m5",
        name: "Module 5 — Mid mock",
        focus: "Compare with your first test",
        tasks: [
          "Full Listening + full Reading test (timed)",
          "Record results in the band table, compare with the first test",
          "Identify your 2 weakest question types",
          "Vocabulary: AWL Sublist 4-5",
          "If you're scoring 7.0+, move up to C1",
        ],
      },
    ],
  },
  C1: {
    title: "C1 — Band 8/9 Polish",
    blurb: "Band 8+",
    desc: "Advanced level. Target: 8+ in every skill. Complex structures, paraphrasing mastery, full mock exams.",
    modules: [
      {
        id: "c1m1",
        name: "Module 1 — Speed & accuracy",
        focus: "Timed full tests",
        tasks: [
          "2 full Listening + 2 full Reading tests a week (real conditions)",
          "Write a 'why' analysis for every mistake (error log)",
          "Advanced vocabulary: build a collocation + academic phrase bank",
          "Writing: 1 Task 2 every day, aiming for band 8",
        ],
      },
      {
        id: "c1m2",
        name: "Module 2 — High-band Writing",
        focus: "Cohesion, lexical resource",
        tasks: [
          "Paraphrase practice: write the same idea in 3 different structures",
          "Cohesive devices: build natural flow, not forced connectors",
          "Write 3 Task 2 essays, targeting the band 9 criteria in each",
          "Get Claude to give a detailed band breakdown for each essay",
          "Writing: 1 essay every day",
        ],
      },
      {
        id: "c1m3",
        name: "Module 3 — Speaking 8+",
        focus: "Fluency + idiomatic language",
        tasks: [
          "1 full Speaking round (Part 1+2+3) every day, record and listen back",
          "Practise idiomatic expressions and natural fillers",
          "Pronunciation: target your weak sounds (BBC Pronunciation)",
          "Get Claude to give a Speaking band breakdown",
          "Writing: keep going",
        ],
      },
      {
        id: "c1m4",
        name: "Module 4 — Full mock exams",
        focus: "Real exam simulation",
        tasks: [
          "2 full mock exams (4 skills, real timing and conditions)",
          "Record mock results in the band table",
          "Surgically target your 2 weakest question types",
          "Writing: 1 essay every day",
        ],
      },
      {
        id: "c1m5",
        name: "Module 5 — Exam week",
        focus: "Polish + strategy",
        tasks: [
          "1 final full mock exam",
          "Write your exam-day time-management plan",
          "Flexible ready-made phrases (Speaking & Writing) — but don't sound memorised",
          "Light review, NO new topics",
          "Sleep + rest: arrive fresh 💪",
        ],
      },
    ],
  },
};

export const ROUTINES: Record<Level, string[]> = {
  B1: [
    "Grammar: study 1 topic + write example sentences (30 min)",
    "Vocabulary: 15 new words + review yesterday's (30 min)",
    "Reading: read a short B1 text, add unknown words to flashcards (20 min)",
    "Listening: 1 BBC 6 Minute English + transcript (20 min)",
    "Writing: write a short 5–6 sentence paragraph, get Claude to correct it (20 min)",
  ],
  B2: [
    "Vocabulary: 15 academic words (AWL) + review (30 min)",
    "Listening: 1 IELTS Listening section or TED Talk + shadowing (40 min)",
    "Reading: 1 timed IELTS Reading passage + answer analysis (40 min)",
    "Writing: write 1 essay + get Claude to score it (45 min)",
    "Speaking: Speaking Part 1/2 with Claude (30 min)",
    "Error log: review today's mistakes (15 min)",
  ],
  C1: [
    "Vocabulary: advanced words + collocations + paraphrase practice (30 min)",
    "Listening: full IELTS Listening test, timed (40 min)",
    "Reading: full IELTS Reading test (60 min, timed)",
    "Writing: 1 essay (Task 2) aiming for band 8+, get Claude to score it (50 min)",
    "Speaking: full Speaking round (Part 1+2+3) + recording with Claude (30 min)",
    "Update error log + paraphrase bank (20 min)",
  ],
};

export const BANDS = [
  { key: "listening", label: "Listening" },
  { key: "reading", label: "Reading" },
  { key: "writing", label: "Writing" },
  { key: "speaking", label: "Speaking" },
] as const;

export interface GrammarLesson {
  id: string;
  level: Level;
  title: string;
  summary: string;
  points: string[];
  examples: string[];
  practice: string;
}

export const GRAMMAR: GrammarLesson[] = [
  {
    id: "g_pres",
    level: "B1",
    title: "Present Simple vs Continuous",
    summary: "Use Simple for facts/habits; Continuous for actions happening now or temporary situations.",
    points: [
      "Present Simple: I work, she works (routine/general). Questions: Do/Does. Negative: don't/doesn't.",
      "Present Continuous: I am working (now/temporary). am/is/are + verb-ing.",
      "Frequency adverbs (always, usually, never) go with the Simple.",
      "Stative verbs (know, like, want) are usually not used in the Continuous.",
    ],
    examples: [
      "I usually drink tea. (habit)",
      "I am drinking coffee now. (right now)",
      "She works at a bank.",
      "They are studying for IELTS this month. (temporary)",
    ],
    practice: "Ask Claude: 'Give me 10 fill-in-the-blank questions on Present Simple vs Continuous, then check my answers.'",
  },
  {
    id: "g_past",
    level: "B1",
    title: "Past Simple vs Present Perfect",
    summary: "Past Simple for a finished, specific time; Present Perfect for unspecified time or present relevance.",
    points: [
      "Past Simple: I visited London in 2019. (specific, finished time)",
      "Present Perfect: I have visited London. (when is not important / effect continues)",
      "yesterday, last year, ago → Past Simple.",
      "already, yet, ever, never, just, since, for → Present Perfect.",
    ],
    examples: [
      "I saw that film last week.",
      "I have already seen that film.",
      "She has lived here for 3 years.",
      "Did you finish? / Have you finished yet?",
    ],
    practice: "Ask Claude: 'Past Simple or Present Perfect? Give me 10 sentences to complete.'",
  },
  {
    id: "g_art",
    level: "B1",
    title: "Articles — a / an / the",
    summary: "a/an: singular, indefinite, first mention. the: definite, already known. plural/general: no article.",
    points: [
      "a + consonant sound (a car), an + vowel sound (an apple, an hour).",
      "the: something already mentioned or unique (the sun, the book I bought).",
      "General plural/uncountable: no article (Cars are useful. Water is essential).",
      "Most countries/cities take no article; the USA, the UK are exceptions.",
    ],
    examples: [
      "I saw a dog. The dog was barking.",
      "She is an engineer.",
      "The Earth orbits the Sun.",
      "Books are expensive. (general)",
    ],
    practice: "Ask Claude: 'Give me 12 gap sentences for a/an/the/(none) and check my answers.'",
  },
  {
    id: "g_prep",
    level: "B1",
    title: "Prepositions — in / on / at",
    summary: "The three most common prepositions for time and place. Learn them through example patterns.",
    points: [
      "Time: at (clock: at 5), on (day: on Monday), in (month/year: in May, in 2026).",
      "Place: at (point: at the door), on (surface: on the table), in (inside: in the room).",
      "Common phrases: at night, in the morning, on time, in time.",
      "Movement: to (to school), into, onto.",
    ],
    examples: [
      "The meeting is at 9 on Friday in June.",
      "The keys are on the table.",
      "She lives in Istanbul.",
      "See you in the morning.",
    ],
    practice: "Ask Claude: 'Give me 12 in/on/at questions and check my answers.'",
  },
  {
    id: "g_conj",
    level: "B1",
    title: "Conjunctions — and / but / because / although",
    summary: "They join sentences and create flow. The basis of the 'coherence' score in IELTS.",
    points: [
      "and: addition. but: contrast. so: result. because: reason.",
      "although / even though: unexpected contrast (Although it rained, we went out).",
      "however at the start of a sentence, with a comma (..., however, ...).",
      "Don't overuse connectors; natural flow scores higher.",
    ],
    examples: [
      "I was tired, but I finished the essay.",
      "We stayed home because it was raining.",
      "Although she is young, she is experienced.",
    ],
    practice: "Ask Claude: 'Give me 5 sentence pairs to join with the right connector, then check them.'",
  },
  {
    id: "g_rel",
    level: "B1",
    title: "Relative Clauses — who / which / that",
    summary: "A clause that describes a noun. It shortens sentences and makes them flow better.",
    points: [
      "who: people. which: things. that: both (in defining clauses).",
      "where: place, when: time.",
      "Defining (essential info): no commas. Non-defining (extra info): commas.",
      "As an object, 'that/who/which' can be dropped: The book (that) I read.",
    ],
    examples: [
      "The man who called is my boss.",
      "This is the house which/that we bought.",
      "My brother, who lives in Ankara, is a doctor.",
    ],
    practice: "Ask Claude: 'Give me 8 sentence pairs to combine using relative clauses.'",
  },
  {
    id: "g_modal",
    level: "B1",
    title: "Modals — can / should / must / have to",
    summary: "Ability, advice, obligation and possibility. Very useful in speaking and writing.",
    points: [
      "can/could: ability, permission, possibility (I can swim).",
      "should/ought to: advice (You should rest).",
      "must: strong obligation/certainty (You must stop). mustn't: prohibition.",
      "have to: external obligation. don't have to: no need.",
    ],
    examples: [
      "You should practise every day.",
      "I can't come tomorrow.",
      "Students must arrive on time.",
      "You don't have to pay; it's free.",
    ],
    practice: "Ask Claude: 'Choose the modal (can/should/must/have to), 10 questions, then check them.'",
  },
  {
    id: "g_cond1",
    level: "B1",
    title: "First Conditional",
    summary: "A realistic future condition: If + present, will + verb.",
    points: [
      "If it rains, I will stay home.",
      "Use the present (not 'will') in the if-clause for the future (rains, not will rain).",
      "may/might/can can replace will (possibility).",
      "if = unless (if ... not): Unless you study, you won't pass.",
    ],
    examples: [
      "If you study hard, you will improve.",
      "I will call you if I have time.",
      "Unless we leave now, we'll be late.",
    ],
    practice: "Ask Claude: 'Give me 8 half-sentences for the first conditional to complete.'",
  },
  {
    id: "g_pass",
    level: "B1",
    title: "Passive Voice (basic)",
    summary: "When the action matters more than who does it: be + V3 (past participle).",
    points: [
      "Active: They build houses. Passive: Houses are built.",
      "Past: The house was built in 1990.",
      "The doer is introduced with 'by': The book was written by Orwell.",
      "Common in academic writing for an objective tone (It is believed that...).",
    ],
    examples: [
      "English is spoken here.",
      "The results were analysed carefully.",
      "A new bridge is being built.",
    ],
    practice: "Ask Claude: 'Turn active sentences into passive: give me 8 sentences and check them.'",
  },
  {
    id: "g_cond23",
    level: "B2",
    title: "Second & Third Conditional",
    summary: "Imaginary / unreal situations. They add flexibility to high-band writing.",
    points: [
      "2nd (present/future unreal): If I had time, I would travel.",
      "3rd (past regret): If I had studied, I would have passed.",
      "Mixed: If I had studied medicine, I would be a doctor now.",
      "'were' with every subject: If I were you, I would...",
    ],
    examples: [
      "If I were rich, I would help others.",
      "If she had left earlier, she wouldn't have missed it.",
    ],
    practice: "Ask Claude: 'Give me 10 mixed second/third conditional questions.'",
  },
  {
    id: "g_complex",
    level: "C1",
    title: "Advanced Sentence Structures (band 8+)",
    summary: "Variety = a high 'Grammatical Range' score. Use these in moderation in your essays.",
    points: [
      "Cleft sentences: It is X that... / What matters is...",
      "Inversion: Not only did it..., but also... / Rarely have we seen...",
      "Participle clauses: Having finished the task, she left.",
      "Nominalisation: 'The increase in pollution...' (instead of 'Pollution increased').",
    ],
    examples: [
      "What concerns me most is the cost.",
      "Not only is it cheaper, but it is also faster.",
      "Having considered both views, I believe...",
    ],
    practice: "Ask Claude: 'Rewrite these 6 simple sentences as band-8 advanced structures and explain why they are better.'",
  },
];

export interface VocabCard {
  w: string;
  d: string;
  e: string;
}

export const VOCAB: Record<string, VocabCard[]> = {
  "B1 · Daily Life": [
    { w: "neighbour", d: "a person who lives near you", e: "My neighbour is very friendly." },
    { w: "borrow", d: "to take and use something you will give back", e: "Can I borrow your pen?" },
    { w: "lend", d: "to give something for a short time", e: "She lent me some money." },
    { w: "afford", d: "to have enough money for something", e: "I can't afford a new car." },
    { w: "complain", d: "to say you are unhappy about something", e: "He complained about the noise." },
    { w: "appointment", d: "an arranged meeting at a set time", e: "I have a doctor's appointment." },
    { w: "crowded", d: "full of people", e: "The bus was very crowded." },
    { w: "convenient", d: "easy to use or suitable", e: "This shop is very convenient." },
    { w: "rent", d: "money paid to use a home; to pay to use", e: "The rent is too high." },
    { w: "queue", d: "a line of people waiting", e: "We waited in a long queue." },
    { w: "reliable", d: "able to be trusted", e: "He is a reliable friend." },
    { w: "on purpose", d: "deliberately, not by accident", e: "He broke it on purpose." },
    { w: "get on with", d: "to have a good relationship with", e: "I get on well with my colleagues." },
    { w: "look forward to", d: "to feel happy about something coming", e: "I look forward to the weekend." },
    { w: "used to", d: "did regularly in the past", e: "I used to live in a village." },
    { w: "in charge of", d: "responsible for", e: "She is in charge of the team." },
    { w: "give up", d: "to stop trying", e: "Don't give up so easily." },
    { w: "deal with", d: "to handle or manage", e: "How do you deal with stress?" },
    { w: "turn down", d: "to refuse; to lower", e: "She turned down the offer." },
    { w: "set up", d: "to start or establish", e: "They set up a small business." },
  ],
  "B1 · Work & Education": [
    { w: "apply for", d: "to make a formal request for", e: "I applied for the job." },
    { w: "degree", d: "a university qualification", e: "She has a degree in biology." },
    { w: "deadline", d: "the latest time to finish something", e: "The deadline is on Friday." },
    { w: "schedule", d: "a plan of times and tasks", e: "My schedule is full this week." },
    { w: "colleague", d: "a person you work with", e: "My colleagues are helpful." },
    { w: "experience", d: "knowledge or skill from doing something", e: "He has years of experience." },
    { w: "opportunity", d: "a chance to do something", e: "It's a great opportunity." },
    { w: "improve", d: "to make or become better", e: "I want to improve my English." },
    { w: "achieve", d: "to succeed in reaching a goal", e: "She achieved her goal." },
    { w: "responsible", d: "having a duty to deal with something", e: "You are responsible for this task." },
    { w: "flexible", d: "able to change easily", e: "We have flexible working hours." },
    { w: "qualification", d: "an official skill or certificate", e: "What qualifications do you have?" },
    { w: "earn", d: "to get money for work", e: "How much do you earn?" },
    { w: "promote", d: "to raise to a higher position", e: "She was promoted to manager." },
    { w: "attend", d: "to be present at an event", e: "I attend evening classes." },
    { w: "research", d: "careful study to find facts", e: "More research is needed." },
    { w: "knowledge", d: "information and understanding", e: "He has deep knowledge of history." },
    { w: "skill", d: "an ability to do something well", e: "Communication is a key skill." },
    { w: "motivate", d: "to give someone a reason to act", e: "Good teachers motivate students." },
    { w: "progress", d: "movement towards a goal", e: "You're making good progress." },
  ],
  "AWL Sublist 1": [
    { w: "analyse", d: "to examine something in detail", e: "Researchers analyse the data carefully." },
    { w: "approach", d: "a way of dealing with something; to come near", e: "We need a new approach to this problem." },
    { w: "area", d: "a part of a place or a subject", e: "This area of study is growing fast." },
    { w: "assess", d: "to judge or evaluate", e: "Teachers assess students' progress." },
    { w: "assume", d: "to suppose without proof", e: "Don't assume the result without evidence." },
    { w: "authority", d: "power, or an official body", e: "The local authority approved the plan." },
    { w: "available", d: "able to be obtained or used", e: "More data is available online now." },
    { w: "benefit", d: "an advantage; to gain", e: "Exercise has many health benefits." },
    { w: "concept", d: "an abstract idea", e: "The concept is hard to define." },
    { w: "consist", d: "to be made up (of)", e: "Water consists of hydrogen and oxygen." },
    { w: "context", d: "the situation or background", e: "Words change meaning depending on context." },
    { w: "create", d: "to make or produce", e: "The policy created new opportunities." },
    { w: "data", d: "facts and figures", e: "The data supports our hypothesis." },
    { w: "define", d: "to state the meaning of", e: "It is hard to define happiness." },
    { w: "derive", d: "to obtain from a source (from)", e: "The word derives from Latin." },
    { w: "distribute", d: "to share out or spread", e: "Resources should be distributed fairly." },
    { w: "economy", d: "a country's system of money and trade", e: "The economy is recovering slowly." },
    { w: "environment", d: "the natural world or surroundings", e: "We must protect the environment." },
    { w: "establish", d: "to set up or found", e: "The company was established in 1990." },
    { w: "estimate", d: "to judge approximately; an approximate judgement", e: "Experts estimate a 10% rise." },
    { w: "evident", d: "clear, obvious", e: "It is evident that change is needed." },
    { w: "factor", d: "something that influences a result", e: "Cost is a key factor in the decision." },
    { w: "function", d: "a purpose or role; to work", e: "The heart's main function is pumping blood." },
    { w: "identify", d: "to recognise or name", e: "Scientists identified the cause." },
    { w: "income", d: "money received", e: "Average income rose last year." },
    { w: "indicate", d: "to show or point out", e: "The results indicate a clear trend." },
    { w: "individual", d: "a single person; relating to one", e: "Each individual has different needs." },
    { w: "interpret", d: "to explain the meaning of", e: "How you interpret data matters." },
    { w: "involve", d: "to include or require", e: "The job involves a lot of travel." },
    { w: "issue", d: "a topic or problem", e: "Climate change is a global issue." },
    { w: "major", d: "large or important", e: "This is a major breakthrough." },
    { w: "method", d: "a way of doing something", e: "We used a scientific method." },
    { w: "occur", d: "to happen", e: "Errors occur when people rush." },
    { w: "percent", d: "per hundred", e: "Sales rose by ten percent." },
    { w: "period", d: "a length of time", e: "Over a long period of time." },
    { w: "policy", d: "a plan of action by an organisation", e: "The government changed its policy." },
    { w: "principle", d: "a basic rule or truth", e: "It works on a simple principle." },
    { w: "process", d: "a series of actions; to handle", e: "Learning is a slow process." },
    { w: "require", d: "to need", e: "This task requires patience." },
    { w: "research", d: "careful study to find facts", e: "More research is needed on this." },
    { w: "respond", d: "to answer or react", e: "How did they respond to the news?" },
    { w: "role", d: "a part or function", e: "Education plays a vital role." },
    { w: "significant", d: "important or meaningful", e: "There was a significant improvement." },
    { w: "similar", d: "alike", e: "The two cases are similar." },
    { w: "source", d: "where something comes from", e: "Cite your sources properly." },
    { w: "specific", d: "particular, precise", e: "Give a specific example." },
    { w: "structure", d: "the way parts are arranged", e: "The essay has a clear structure." },
    { w: "theory", d: "an idea that explains something", e: "The theory explains the data well." },
    { w: "vary", d: "to differ or change", e: "Prices vary from shop to shop." },
  ],
  "AWL Sublist 2": [
    { w: "achieve", d: "to reach a goal", e: "She achieved her goal." },
    { w: "acquire", d: "to gain or get", e: "Children acquire language quickly." },
    { w: "affect", d: "to influence", e: "Stress can affect your health." },
    { w: "appropriate", d: "suitable", e: "Choose appropriate vocabulary." },
    { w: "aspect", d: "a part or feature", e: "Consider every aspect of the issue." },
    { w: "assist", d: "to help", e: "Software assists the analysis." },
    { w: "category", d: "a class or group", e: "It falls into a new category." },
    { w: "community", d: "a group living or sharing together", e: "The local community supports it." },
    { w: "complex", d: "complicated", e: "It is a complex situation." },
    { w: "conclude", d: "to decide or end", e: "We conclude that it works." },
    { w: "conduct", d: "to carry out; behaviour", e: "They conducted an experiment." },
    { w: "consequent", d: "following as a result", e: "The consequent delays were costly." },
    { w: "construct", d: "to build", e: "Construct a clear argument." },
    { w: "consume", d: "to use up", e: "Cars consume a lot of fuel." },
    { w: "culture", d: "the ideas and customs of a society", e: "Language reflects culture." },
    { w: "design", d: "a plan; to plan", e: "The study design was solid." },
    { w: "distinct", d: "clearly separate", e: "Two distinct groups emerged." },
    { w: "element", d: "a basic part", e: "Trust is a key element." },
    { w: "evaluate", d: "to judge the value of", e: "Evaluate the evidence first." },
    { w: "feature", d: "a notable part", e: "A key feature of the app." },
    { w: "final", d: "last", e: "The final results are in." },
    { w: "focus", d: "the centre of attention; to concentrate", e: "Focus on your weak skills." },
    { w: "impact", d: "a strong effect", e: "It had a huge impact." },
    { w: "institute", d: "an organisation; to begin", e: "The institute funds research." },
    { w: "invest", d: "to put in money or effort for a return", e: "Invest time in vocabulary." },
    { w: "maintain", d: "to keep up", e: "Maintain a daily routine." },
    { w: "obtain", d: "to get", e: "We obtained good results." },
    { w: "participate", d: "to take part", e: "Students participate actively." },
    { w: "perceive", d: "to become aware of", e: "How people perceive risk varies." },
    { w: "positive", d: "favourable", e: "A positive attitude helps." },
    { w: "potential", d: "possible ability", e: "She has great potential." },
    { w: "previous", d: "earlier", e: "See the previous chapter." },
    { w: "primary", d: "main or first", e: "Health is the primary concern." },
    { w: "range", d: "a set or extent", e: "A wide range of options." },
    { w: "region", d: "an area", e: "The region has cold winters." },
    { w: "regulate", d: "to control by rules", e: "Laws regulate the market." },
    { w: "relevant", d: "connected to the matter", e: "Give relevant examples." },
    { w: "resource", d: "a useful supply", e: "Use free resources wisely." },
    { w: "restrict", d: "to limit", e: "Rules restrict access." },
    { w: "secure", d: "safe; to make safe", e: "A secure connection." },
    { w: "seek", d: "to try to find", e: "Seek feedback often." },
    { w: "select", d: "to choose", e: "Select the best answer." },
    { w: "strategy", d: "a plan to reach a goal", e: "A good exam strategy." },
    { w: "survey", d: "a study of opinions or facts", e: "We ran a survey." },
    { w: "tradition", d: "a long-established custom", e: "It is a long tradition." },
    { w: "transfer", d: "to move from one place to another", e: "Transfer your notes here." },
  ],
  "C1 · Advanced & Collocation": [
    { w: "albeit", d: "although", e: "A useful, albeit costly, solution." },
    { w: "mitigate", d: "to make less severe", e: "Policies to mitigate climate change." },
    { w: "ubiquitous", d: "found everywhere", e: "Smartphones are now ubiquitous." },
    { w: "detrimental", d: "harmful", e: "Stress is detrimental to health." },
    { w: "prevalent", d: "widespread, common", e: "Obesity is increasingly prevalent." },
    { w: "compelling", d: "convincing, powerful", e: "A compelling argument." },
    { w: "undermine", d: "to weaken gradually", e: "It undermines public trust." },
    { w: "exacerbate", d: "to make worse", e: "Tax cuts may exacerbate inequality." },
    { w: "viable", d: "workable, feasible", e: "A viable alternative to cars." },
    { w: "inherent", d: "existing as a natural part", e: "Risk is inherent in investing." },
    { w: "profound", d: "deep, far-reaching", e: "A profound impact on society." },
    { w: "counterproductive", d: "having the opposite of the intended effect", e: "Punishment can be counterproductive." },
    { w: "a growing body of evidence", d: "an increasing amount of proof", e: "A growing body of evidence suggests..." },
    { w: "strike a balance", d: "to find a fair middle point", e: "We must strike a balance between..." },
    { w: "play a pivotal role", d: "to be crucially important", e: "Education plays a pivotal role." },
    { w: "pose a threat", d: "to be a danger", e: "Pollution poses a threat to wildlife." },
    { w: "shed light on", d: "to make clearer, to explain", e: "The study sheds light on the issue." },
    { w: "at the expense of", d: "at the cost or sacrifice of", e: "Growth at the expense of the environment." },
    { w: "a double-edged sword", d: "something with both good and bad effects", e: "Technology is a double-edged sword." },
    { w: "bridge the gap", d: "to reduce a difference", e: "Policies to bridge the gap between rich and poor." },
  ],
};

export interface EssayPrompt {
  type: string;
  topic: string;
  q: string;
}

export const ESSAY_PROMPTS: EssayPrompt[] = [
  { type: "Task 2 · Opinion", topic: "Education", q: "Some people believe that university education should be free for everyone. To what extent do you agree or disagree?" },
  { type: "Task 2 · Discussion", topic: "Technology", q: "Some say technology has made our lives more complex, while others believe it has made life easier. Discuss both views and give your own opinion." },
  { type: "Task 2 · Problem-Solution", topic: "Environment", q: "Many cities suffer from air pollution. What are the main causes, and what measures can be taken to address this problem?" },
  { type: "Task 2 · Opinion", topic: "Work", q: "Some people think that working from home is better than working in an office. To what extent do you agree or disagree?" },
  { type: "Task 2 · Discussion", topic: "Society", q: "Some believe that governments should spend money on public services rather than on the arts. Discuss both views and give your opinion." },
  { type: "Task 2 · Two-part", topic: "Health", q: "More people are becoming overweight in many countries. Why is this happening, and what can be done about it?" },
  { type: "Task 2 · Opinion", topic: "Crime", q: "Some people think that prison is the best way to reduce crime, while others believe education is more effective. Discuss and give your view." },
  { type: "Task 2 · Opinion", topic: "Globalisation", q: "Some argue that globalisation harms local cultures. To what extent do you agree or disagree?" },
  { type: "Task 2 · Discussion", topic: "Children", q: "Some parents believe children should start school at a very young age; others think they should start later. Discuss both views." },
  { type: "Task 2 · Problem-Solution", topic: "Transport", q: "Traffic congestion is a serious problem in many cities. What are the causes, and what solutions can you suggest?" },
  { type: "Task 2 · Opinion", topic: "Media", q: "The news media pays too much attention to celebrities. To what extent do you agree or disagree?" },
  { type: "Task 2 · Two-part", topic: "Environment", q: "Many species of animals are becoming extinct. Why is this a problem, and what can be done to prevent it?" },
  { type: "Task 1 · Academic", topic: "Graph", q: "The chart below shows the percentage of households with internet access in three countries from 2000 to 2020. Summarise the information by selecting and reporting the main features. (150+ words)" },
  { type: "Task 1 · Academic", topic: "Process", q: "The diagram below shows how recycled paper is produced. Summarise the information by describing the main stages of the process. (150+ words)" },
];

export interface ReadingQuestion {
  q: string;
  a: string;
}
export interface ReadingPassage {
  id: string;
  level: Level;
  title: string;
  topic: string;
  words: number;
  text: string;
  questions: ReadingQuestion[];
}

export const READING: ReadingPassage[] = [
  {
    id: "r_b1_1",
    level: "B1",
    title: "A New Café in Town",
    topic: "Daily life",
    words: 190,
    text: `Last month, a small café called The Green Cup opened on King Street. The owner, Maria, used to work in a large restaurant, but she always wanted her own place. "I was tired of the noise and the long hours," she says. "I wanted somewhere calm where people could relax."

The café is popular with students because the prices are low and the internet is fast. Many of them stay for hours, reading or studying. Maria does not mind. "As long as they buy a coffee, they can stay all day," she laughs.

The café also sells cakes made by a local baker. These sell out quickly, especially at the weekend. Maria plans to add sandwiches to the menu next month. She also hopes to open a second café next year if business stays good.`,
    questions: [
      { q: "Where did Maria work before?", a: "In a large restaurant." },
      { q: "Why is the café popular with students?", a: "Low prices and fast internet." },
      { q: "Who makes the cakes?", a: "A local baker." },
      { q: "True/False/Not Given: Maria wants to open a second café.", a: "True — she hopes to if business stays good." },
      { q: "True/False/Not Given: The café opens early in the morning.", a: "Not Given." },
    ],
  },
  {
    id: "r_b1_2",
    level: "B1",
    title: "Cycling to Work",
    topic: "Health & transport",
    words: 200,
    text: `More and more people in cities are choosing to cycle to work instead of driving. There are several reasons for this change. First, cycling is cheaper. You do not have to pay for petrol or parking, and a bicycle is much cheaper than a car.

Second, cycling is good for your health. Doctors say that thirty minutes of exercise a day can improve your heart and help you feel less stressed. Many cyclists say they arrive at work feeling fresh and full of energy.

Finally, cycling is better for the environment because bicycles do not produce pollution. Some city governments now build special cycle lanes to make riding safer. However, cycling is not perfect. In bad weather it can be uncomfortable, and busy roads can be dangerous. Even so, the number of cyclists continues to grow every year.`,
    questions: [
      { q: "Name one reason cycling is cheaper than driving.", a: "No petrol/parking costs; bikes cost less than cars." },
      { q: "How much daily exercise do doctors recommend, according to the text?", a: "Thirty minutes a day." },
      { q: "Why do governments build cycle lanes?", a: "To make cycling safer." },
      { q: "True/False/Not Given: Cycling produces no pollution.", a: "True." },
      { q: "True/False/Not Given: Most people in cities now cycle to work.", a: "Not Given (it says 'more and more', not 'most')." },
    ],
  },
  {
    id: "r_b2_1",
    level: "B2",
    title: "The Decline of Bees",
    topic: "Environment",
    words: 270,
    text: `Bees play a vital role in food production. By carrying pollen from one flower to another, they allow many crops to grow, from apples and almonds to coffee. Scientists estimate that around a third of the food we eat depends, directly or indirectly, on pollination by insects, and bees are among the most important pollinators of all.

In recent decades, however, bee populations in many countries have fallen sharply. Researchers point to several causes. The widespread use of certain pesticides appears to damage bees' ability to navigate, so that they cannot find their way back to the hive. The loss of wild flowers, as land is cleared for farming and housing, reduces the food available to them. In addition, a parasite known as the varroa mite has spread through colonies, weakening bees and spreading disease.

The consequences could be serious. If pollination declined significantly, the price of many fruits and vegetables would rise, and some crops might fail altogether. For this reason, governments and conservation groups have begun to act. Some have restricted the most harmful pesticides, while others encourage farmers to leave strips of wild flowers at the edges of their fields. City dwellers, too, can help by planting flowers and avoiding chemicals in their gardens. Although no single measure will solve the problem, together such efforts may give bees a better chance of survival.`,
    questions: [
      { q: "What proportion of our food depends on insect pollination?", a: "About one third." },
      { q: "How do certain pesticides harm bees?", a: "They damage bees' ability to navigate back to the hive." },
      { q: "Name the parasite mentioned.", a: "The varroa mite." },
      { q: "What can farmers do to help, according to the text?", a: "Leave strips of wild flowers at field edges." },
      { q: "True/False/Not Given: A single solution will fix the problem.", a: "False — no single measure will solve it." },
    ],
  },
  {
    id: "r_b2_2",
    level: "B2",
    title: "Working Four Days a Week",
    topic: "Work",
    words: 260,
    text: `The idea of a four-day working week has attracted growing attention. Under most versions of the scheme, employees work fewer hours but receive the same pay, on the condition that they maintain their usual level of output. Supporters argue that this is not only possible but desirable.

Trials in several countries have produced encouraging results. In a large study in the United Kingdom, most participating companies reported that productivity stayed the same or even improved, while staff said they felt less stressed and more satisfied with their jobs. Many firms found it easier to attract and keep talented workers. Employees, meanwhile, used their extra day for rest, family, or study.

Critics, however, urge caution. They point out that the trials often involved offices where tasks can be organised flexibly. In hospitals, factories, or shops, where someone must always be present, reducing hours is far more difficult. There are also concerns that workers may simply cram the same amount of labour into fewer days, increasing daily stress rather than reducing it.

Despite these doubts, interest continues to grow. Some economists believe that as automation takes over routine tasks, shorter working weeks may become not just an option but a necessity. Whether the four-day week becomes the norm remains uncertain, but it has clearly moved from a radical idea to a serious topic of debate.`,
    questions: [
      { q: "Under the scheme, what happens to pay?", a: "It stays the same." },
      { q: "What condition must employees meet?", a: "Maintain their usual output/productivity." },
      { q: "Why is the model harder in hospitals and factories?", a: "Someone must always be present." },
      { q: "What concern do critics raise about cramming work?", a: "Workers may do the same work in fewer days, raising daily stress." },
      { q: "True/False/Not Given: Automation may make shorter weeks necessary.", a: "True (some economists believe so)." },
    ],
  },
  {
    id: "r_b2_3",
    level: "B2",
    title: "The Return of the Wolf",
    topic: "Wildlife",
    words: 255,
    text: `A century ago, wolves had almost disappeared from much of Europe, hunted by farmers who feared for their livestock. Today, against many expectations, they are returning. Stronger legal protection, the regrowth of forests, and an abundance of wild deer have allowed wolf numbers to recover across countries from Germany to Italy.

For ecologists, this is welcome news. Wolves are what scientists call a "keystone species": by hunting deer, they prevent overgrazing, which in turn allows young trees and other plants to flourish. The presence of a top predator can therefore reshape an entire landscape, benefiting many other species.

Not everyone shares this enthusiasm. Farmers worry about attacks on sheep and cattle, and some rural communities feel that decisions about wildlife are made by distant officials who do not understand country life. Conservationists respond that the actual number of livestock killed is small and that compensation schemes and guard dogs can reduce conflict.

The debate reflects a wider question: how should humans share space with wild animals in a crowded continent? There are no easy answers, but the wolf's quiet comeback shows that, given the chance, nature can recover faster than many people believe.`,
    questions: [
      { q: "Why had wolves nearly vanished a century ago?", a: "They were hunted by farmers protecting livestock." },
      { q: "Name two factors behind their recovery.", a: "Legal protection, forest regrowth, plenty of wild deer." },
      { q: "What is a 'keystone species'?", a: "A species whose presence strongly shapes the whole ecosystem." },
      { q: "How do conservationists suggest reducing conflict?", a: "Compensation schemes and guard dogs." },
      { q: "True/False/Not Given: Large numbers of livestock are killed by wolves.", a: "False — the actual number is small." },
    ],
  },
  {
    id: "r_c1_1",
    level: "C1",
    title: "The Paradox of Choice",
    topic: "Psychology",
    words: 330,
    text: `It is widely assumed that the more options people have, the better off they are. Freedom of choice, after all, lies at the heart of modern consumer society. Yet a body of research in psychology suggests that this assumption deserves scrutiny. Beyond a certain point, an abundance of choice may not liberate us at all; it may instead leave us anxious, dissatisfied, and curiously paralysed.

In one well-known experiment, shoppers were offered free samples of jam. When a small selection of six varieties was on display, many customers tasted and then bought a jar. When the display was expanded to twenty-four varieties, more people stopped to sample, but far fewer actually made a purchase. The wider array attracted attention but discouraged commitment, apparently because comparing so many alternatives became overwhelming.

The phenomenon extends well beyond jam. When faced with dozens of investment plans, employees are less likely to enrol in any of them. Patients presented with numerous treatment options may defer decisions that ought to be made promptly. Even after a choice is finally made, an excess of alternatives can breed regret: the chooser cannot help wondering whether one of the roads not taken would have proved superior.

This does not mean that choice is undesirable; a degree of autonomy is plainly valuable. The point, rather, is that choice carries hidden costs which conventional economics tends to ignore. Designers of public policy and private services are therefore beginning to ask not how to maximise options, but how to structure them wisely—offering enough variety to respect individual preferences, while sparing people the burden of evaluating possibilities that, in practice, they neither want nor need.`,
    questions: [
      { q: "What common assumption does the passage challenge?", a: "That more choice always makes people better off." },
      { q: "In the jam experiment, what did the larger display do?", a: "Attracted more samplers but led to fewer purchases." },
      { q: "Give one non-shopping example of choice overload mentioned.", a: "Investment plans / medical treatment options." },
      { q: "How can excess choice affect feelings after deciding?", a: "It can breed regret about roads not taken." },
      { q: "What does the author suggest policymakers should do?", a: "Structure choices wisely rather than maximise options." },
      { q: "True/False/Not Given: The author argues choice is undesirable.", a: "False — a degree of autonomy is valuable." },
    ],
  },
  {
    id: "r_c1_2",
    level: "C1",
    title: "Language and Thought",
    topic: "Linguistics",
    words: 320,
    text: `Does the language we speak shape the way we think? The question has fascinated and divided scholars for the better part of a century. In its strongest form, the so-called Sapir–Whorf hypothesis held that language determines thought, so that speakers of different languages inhabit, in effect, different cognitive worlds. This bold claim has largely been abandoned; people are evidently capable of conceiving of ideas for which their language has no single word.

A weaker version, however, has fared considerably better. According to this view, language does not imprison thought but gently influences it, nudging speakers to attend to certain distinctions more readily than others. Experimental evidence lends it some support. Languages differ, for instance, in how they describe space: some rely on terms like "left" and "right", others on fixed compass directions such as "north" and "south". Speakers of the latter prove remarkably skilled at staying oriented, even in unfamiliar surroundings—a habit of mind apparently fostered by the constant demands of their grammar.

Colour offers another illustration. Where a language draws a lexical boundary between two shades, its speakers tend to discriminate between those shades a fraction faster than speakers whose language treats them as one. The effect is subtle and easily overstated, but it is real.

What emerges is a picture more nuanced than either extreme. Language neither dictates the limits of thought nor floats above it without consequence. Instead, the categories a language makes habitual become, over a lifetime of use, well-worn paths of attention. We remain free to wander off them, but we are inclined, more often than we notice, to follow where our words have already led.`,
    questions: [
      { q: "What did the strong Sapir–Whorf hypothesis claim?", a: "That language determines thought." },
      { q: "Why has the strong version been abandoned?", a: "People can conceive ideas their language has no word for." },
      { q: "How does the spatial-language example support the weak version?", a: "Speakers using compass directions stay better oriented." },
      { q: "What does the colour example show?", a: "A lexical boundary speeds discrimination between shades." },
      { q: "Summarise the author's final position in your own words.", a: "Language influences but does not dictate thought; categories become habitual paths of attention." },
      { q: "True/False/Not Given: The colour effect is large and obvious.", a: "False — it is subtle and easily overstated." },
    ],
  },
  {
    id: "r_c1_3",
    level: "C1",
    title: "The Economics of Happiness",
    topic: "Economics",
    words: 325,
    text: `For most of the twentieth century, economists treated rising income as a reliable proxy for rising welfare. The richer a nation grew, the better off its citizens were assumed to be. In recent decades, however, this comfortable equation has come under sustained challenge from researchers who actually ask people how satisfied they are with their lives.

Their findings are striking. Within a given country at a given time, the wealthy do report greater life satisfaction than the poor. Yet once a society has escaped poverty and secured the basics of food, shelter, and security, further increases in average income yield surprisingly modest gains in reported happiness. The United States, for example, has grown considerably richer since the 1950s, while measures of average wellbeing have remained stubbornly flat.

Several explanations have been advanced. One is that human beings adapt: a pay rise that thrills us today becomes the unremarkable norm tomorrow. Another is that much of the satisfaction we derive from income is relative rather than absolute; we judge our position by comparison with others, so that when everyone grows richer together, few feel any better. A third points to the things that money buys least easily—close relationships, good health, a sense of purpose—which weigh heavily in people's accounts of what makes life worthwhile.

None of this implies that economic growth is worthless; for poor societies it remains transformative. But it does suggest that beyond a threshold, the single-minded pursuit of higher output may be a poor guide to human flourishing. A growing number of governments have accordingly begun to supplement traditional economic statistics with broader measures of national wellbeing.`,
    questions: [
      { q: "What did economists traditionally assume about income?", a: "That rising income meant rising welfare." },
      { q: "What happens to happiness once basic needs are met?", a: "Further income gives only modest gains." },
      { q: "Explain the 'relative income' idea.", a: "We judge wellbeing by comparison with others, so collective gains help little." },
      { q: "Name something money buys least easily, per the text.", a: "Relationships, health, or a sense of purpose." },
      { q: "What have some governments started doing?", a: "Adding broader wellbeing measures to economic statistics." },
      { q: "True/False/Not Given: Growth is worthless for poor societies.", a: "False — for poor societies it remains transformative." },
    ],
  },
  {
    id: "r_c1_4",
    level: "C1",
    title: "The Ethics of Artificial Intelligence",
    topic: "Technology",
    words: 330,
    text: `As artificial intelligence migrates from research laboratories into hospitals, courtrooms, and hiring offices, the ethical questions it raises have grown impossible to ignore. A system that recommends medical treatments or assesses the risk that a defendant will reoffend wields real power over human lives, and with power comes the demand for accountability.

One difficulty is that the most capable systems are often the least transparent. Modern machine-learning models arrive at their conclusions through statistical processes so intricate that even their designers cannot fully explain a given decision. This "black box" quality is troubling when the stakes are high: a patient denied a treatment, or an applicant rejected for a loan, may reasonably wish to know why, and "the algorithm decided" is hardly a satisfying answer.

A second concern is bias. Because such systems learn from historical data, they can absorb and then reproduce the prejudices embedded in that data. A recruitment tool trained on the records of a company that has long favoured one group may quietly continue to do so, all the while wearing the reassuring mask of mathematical objectivity. The appearance of neutrality can make discrimination harder, not easier, to detect.

Addressing these problems is not merely a technical matter. It requires deciding what fairness means—a question on which reasonable people disagree—and determining who should bear responsibility when an automated system errs. Some argue for a legal right to an explanation; others for independent auditing of high-stakes algorithms. What is clear is that these decisions cannot be left to engineers alone. They are, at bottom, questions about the kind of society we wish to build, and they deserve the widest possible public deliberation.`,
    questions: [
      { q: "Why is the 'black box' quality troubling?", a: "High-stakes decisions can't be explained, even by designers." },
      { q: "How can AI systems become biased?", a: "They learn from historical data containing prejudice." },
      { q: "Why can apparent neutrality be dangerous?", a: "It can hide discrimination, making it harder to detect." },
      { q: "Name one proposed solution mentioned.", a: "A right to explanation; independent auditing of algorithms." },
      { q: "What is the author's main argument about who decides?", a: "These are societal questions needing public deliberation, not just engineers." },
      { q: "True/False/Not Given: The author says fairness is easy to define.", a: "False — reasonable people disagree on what fairness means." },
    ],
  },
  {
    id: "r_c1_5",
    level: "C1",
    title: "The Vanishing Night Sky",
    topic: "Science & society",
    words: 315,
    text: `For almost the whole of human history, the night sky was a familiar presence: a canopy of thousands of stars under which our ancestors told stories, navigated oceans, and measured the seasons. For a growing share of the world's population, that spectacle has now all but disappeared, erased not by cloud but by the glow of our own cities. Light pollution—the scattering of artificial light into the night—has spread so far that, by some estimates, a third of humanity can no longer see the Milky Way.

The costs are more than aesthetic. Many organisms have evolved in step with the natural rhythm of light and darkness, and excessive illumination disrupts them. Migrating birds, navigating by the stars, are drawn fatally towards lit buildings; newly hatched turtles, which instinctively head for the bright horizon over the sea, crawl instead towards roads. Human health, too, may suffer, since the hormones that govern our sleep are sensitive to light at night.

What makes the problem peculiarly frustrating is how needless much of it is. A great deal of artificial light serves no purpose, spilling uselessly upwards or sideways rather than illuminating the ground below. Unlike many environmental harms, this one admits of a remarkably simple remedy: shielding lamps so that they point downward, dimming them when no one is about, and using warmer tones less disruptive to wildlife. Such measures save energy and money even as they restore the dark.

A handful of communities have begun to act, establishing "dark-sky reserves" where lighting is strictly controlled. Whether such efforts spread will determine if future generations inherit the stars—or merely read about them.`,
    questions: [
      { q: "What fraction of humanity cannot see the Milky Way?", a: "About one third." },
      { q: "How does light pollution harm migrating birds?", a: "They are drawn fatally towards lit buildings." },
      { q: "Why may human health suffer?", a: "Sleep hormones are sensitive to light at night." },
      { q: "Why does the author call the problem 'needless'?", a: "Much light is wasted, spilling upward/sideways uselessly." },
      { q: "Name one simple remedy mentioned.", a: "Shield lamps downward; dim them; use warmer tones." },
      { q: "True/False/Not Given: Fixing light pollution is expensive.", a: "False — remedies save energy and money." },
    ],
  },
];

export interface ListeningTask {
  id: string;
  level: Level;
  title: string;
  topic: string;
  mins: number;
  source: string;
  url: string;
  before: string[];
  during: string[];
  after: string[];
}

export const LISTENING: ListeningTask[] = [
  {
    id: "l_b1_1",
    level: "B1",
    title: "BBC 6 Minute English",
    topic: "Everyday topics",
    mins: 6,
    source: "BBC Learning English",
    url: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english",
    before: ["Pick an episode from the list (a title that interests you).", "Look at the title and write 2-3 predictions about the topic."],
    during: ["On the first listen, just catch the main idea — don't take notes.", "On the second listen, note 5 new words."],
    after: [
      "Open the transcript and mark the parts you missed.",
      "Add the 5 words to the Vocabulary tab (get Claude to make example sentences).",
      "Ask Claude: 'I summarised this topic in 4-5 sentences, check it: ...'",
    ],
  },
  {
    id: "l_b1_2",
    level: "B1",
    title: "British Council — Listening (A2–B1)",
    topic: "Everyday dialogues",
    mins: 5,
    source: "British Council LearnEnglish",
    url: "https://learnenglish.britishcouncil.org/skills/listening",
    before: ["Pick an 'A2' or 'B1' exercise from the level menu.", "Read the questions before listening."],
    during: ["Listen to the dialogue and answer the multiple-choice/gap questions."],
    after: ["Check the answers and write down why you got them wrong.", "Note any expressions you didn't know."],
  },
  {
    id: "l_b2_1",
    level: "B2",
    title: "TED Talk + note-taking",
    topic: "Academic ideas",
    mins: 12,
    source: "TED",
    url: "https://www.ted.com/talks",
    before: ["Pick a 10-15 minute TED Talk close to your interests.", "Turn subtitles OFF (try it unaided first)."],
    during: ["Note the speaker's main argument and 3 supporting points (IELTS notes style)."],
    after: [
      "Turn subtitles on and listen again, filling in what you missed.",
      "Shadowing: repeat a 2-minute section along with the speaker.",
      "Ask Claude: 'I summarised the main idea of this talk, fix my academic language: ...'",
    ],
  },
  {
    id: "l_b2_2",
    level: "B2",
    title: "IELTS Listening — official sample",
    topic: "Exam format",
    mins: 30,
    source: "British Council / IELTS.org",
    url: "https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-practice-tests",
    before: ["Open a full Listening test (4 sections).", "Get pen and paper and sit as in a real exam."],
    during: ["Listen ONCE (there is no replay in the exam). Answer all questions."],
    after: [
      "Score with the answer key and work out your band.",
      "Write a 'why I missed it' note for each mistake in your error log (vocabulary? speed? spelling?).",
    ],
  },
  {
    id: "l_c1_1",
    level: "C1",
    title: "Academic lecture listening",
    topic: "Advanced academic",
    mins: 20,
    source: "TED-Ed / university lectures",
    url: "https://ed.ted.com/lessons",
    before: ["Pick a dense lecture (science/history/economics).", "Start without subtitles."],
    during: ["Take notes Cornell-style: main ideas on the left, details on the right.", "Especially catch figures, definitions and examples."],
    after: [
      "Write a 150-word summary without looking at your notes.",
      "Ask Claude: 'I listened to this lecture and summarised it. Raise it to band 8 in academic vocabulary and cohesion: ...'",
    ],
  },
  {
    id: "l_c1_2",
    level: "C1",
    title: "Podcast — fast/natural speech",
    topic: "Accent & fluency",
    mins: 30,
    source: "BBC Radio 4 / BBC World Service",
    url: "https://www.bbc.co.uk/sounds/category/podcasts",
    before: ["Pick an episode at natural speed with different accents.", "You'll listen without pausing — real-world pace."],
    during: ["Just listen; guess unfamiliar parts from context in your head."],
    after: [
      "Listen to one section again and pull out idioms/collocations you didn't know.",
      "Add them to your C1 'Advanced & Collocation' list.",
      "Ask Claude: 'I heard these expressions, give meanings and example uses: ...'",
    ],
  },
];

export interface ResourceItem {
  name: string;
  url: string;
  desc: string;
}
export interface ResourceGroup {
  group: string;
  items: ResourceItem[];
}

export const RESOURCES: ResourceGroup[] = [
  {
    group: "Official & Practice Tests",
    items: [
      { name: "IELTS.org — Official sample questions", url: "https://ielts.org/take-a-test/preparation-resources/sample-test-questions", desc: "Free samples from the organisation that runs the test" },
      { name: "British Council — Take IELTS", url: "https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-practice-tests", desc: "Free practice tests for all four skills" },
      { name: "IDP — IELTS preparation", url: "https://www.ielts.org/for-test-takers/sample-test-questions", desc: "Free sample tests and tips" },
    ],
  },
  {
    group: "Grammar (B1 foundation)",
    items: [
      { name: "British Council — Grammar", url: "https://learnenglish.britishcouncil.org/grammar", desc: "Level-based grammar lessons + exercises" },
      { name: "Perfect English Grammar", url: "https://www.perfect-english-grammar.com/", desc: "Topic-by-topic explanations + free quizzes" },
    ],
  },
  {
    group: "Listening",
    items: [
      { name: "BBC — 6 Minute English", url: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english", desc: "Short, with transcripts, level-friendly" },
      { name: "TED Talks", url: "https://www.ted.com/talks", desc: "Subtitles + transcripts, academic language and accent variety" },
      { name: "British Council — Listening", url: "https://learnenglish.britishcouncil.org/skills/listening", desc: "Free listening + quizzes by level" },
    ],
  },
  {
    group: "Speaking & Pronunciation",
    items: [
      { name: "Practise with Claude", url: "https://claude.ai", desc: "Get a cue card, answer, instant band + correction" },
      { name: "IELTS Liz — Speaking", url: "https://ieltsliz.com/ielts-speaking-free-lessons-essential-tips/", desc: "Free Speaking lessons and real questions" },
      { name: "BBC — Pronunciation", url: "https://www.bbc.co.uk/learningenglish/english/features/pronunciation", desc: "Pronunciation videos" },
    ],
  },
  {
    group: "Writing & Reading",
    items: [
      { name: "IELTS Liz — Writing", url: "https://ieltsliz.com/ielts-writing-task-2/", desc: "Model essays and templates for Task 1 & 2" },
      { name: "British Council — Reading", url: "https://learnenglish.britishcouncil.org/skills/reading", desc: "Reading + comprehension by level" },
    ],
  },
  {
    group: "Vocabulary",
    items: [
      { name: "Academic Word List (official)", url: "https://www.wgtn.ac.nz/lals/resources/academicwordlist", desc: "The 570 most frequent word families in academic English" },
      { name: "IELTS Liz — Vocabulary", url: "https://ieltsliz.com/ielts-vocabulary/", desc: "Topic-based vocabulary lists" },
    ],
  },
];
