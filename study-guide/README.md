# Study Guide — how it works and how to add a section

> **بالعربي:** ده «دليل المذاكرة» بتاع إبراهيم: كل اللي ممكن يتسأل في إنترفيو Frontend، من HTML لحد الـ system design، متشرح بإمتى تستخدم إيه وليه والمطبات، ومربوط بمشاريعه في الـ Interview Handbook. افتح `index.html` في المتصفح. أي Claude على أي لاب يكمّل الأقسام اللي لسه «قريبًا» بالترتيب، بنفس الشكل والقواعد اللي تحت.

## Decided with the user (2026-10-29)
- A **separate dashboard** in this folder, with its own sidebar. The Handbook sidebar links here and this sidebar links back.
- **No “mark as done”** — it's a reference he returns to before every interview.
- Tools: **Test yourself** (think → open), **Before the interview** (one-page summary), **search** across everything.
- Language like the Handbook: simple Egyptian Arabic + English terms, switch عربي / English / Both (shared setting), interview sentence in English.
- Study order = the order in `data/registry.js` (HTML → … → Behavioral). Extra weight on **JS output questions** (with the reason for every answer) and a **Working with AI** section.

## Structure
- `index.html` — loads `../project-guides/assets/guide.css` (shared look), `assets/study.css`, the data files, then `assets/study.js`.
- The React site (`site/`) imports these same files; a new section file needs an import line in `site/src/data.ts` too.
- `data/registry.js` — every section in order (planned ones too) + `STUDY.fill(id, data)`.
- `data/<section>.js` — one file per section: `STUDY.fill("<id>", { intro, topics: [...] })`. The output section uses `{ intro, groups: [...] }`.
- `tools/check-data.js` — validates every data file (fields, block types, links into the Handbook).
- `tools/verify-live-coding.js` — executes every `solution: true` block in `data/live-coding.js` and runs tests against it.
- `tools/verify-output.js` — runs every output question in Node and checks the answer. **Run it after any change to `data/js-output.js`** (`node study-guide/tools/verify-output.js`).
- Routes: `#/` · `#/s/<section>` · `#/t/<section>/<topic>` · `#/o/<group>` · `#/quick` · `#/quiz[/<section>]` · `#/search/<q>`.

## Topic shape
```js
{
  id: "event-loop",
  title: { en, ar },
  tldr: { en, ar },                        // one-paragraph answer
  blocks: [                                 // any order, any number
    { type: "text", title?, body: { en, ar } },          // HTML allowed
    { type: "code", title?, code: "…", note? },
    { type: "list", title?, items: [{ en, ar }] },
    { type: "compare", title?, cols: [...], rows: [[...]] }, // X vs Y tables; cells are strings or { en, ar }
    { type: "when", title?, use: [...], avoid: [...] },     // when to use / avoid
    { type: "pitfalls", items: [...] },
    { type: "projects", items: [{ text: { en, ar }, p: "smartfaq", tab: "decisions", label: "Smart FAQ" }] } // links into the Handbook
  ],
  say: "One English sentence for the interview.",
  interview: [{ q: "English question?", a: { en, ar }, follow: [{ q, a }] }], // follow = the deeper questions
  quiz: [{ q: { en, ar }, a: { en, ar } }],                                   // self-test
  quick: [{ en, ar }]                                                         // shown on “Before the interview”
}
```
Output question: `{ level: 1|2|3, tags: [...], code: "…", answer: "exact console output, lines joined by \\n", why: { en, ar } }`, inside `groups: [{ id, title, intro, rules: [...], questions: [...] }]`.

## Rules for writing
- Correct before clever: every code answer must be checked (output questions by the verifier; other snippets by running them).
- Each topic answers: what it is, **when to use / when not**, **X vs Y** with cases, traps, how it showed up in his projects (only real ones — see `project-guides/data/*.js`), interview questions **with the follow-ups** an interviewer digs with, self-test, quick points.
- Code is written from scratch — never client code (the repo is public).
- After adding a section: add its `<script>` line in `index.html`, check every route in the browser, update `CV_MASTER_PLAN.md` (§9 row 9 and §10).

## Status
All 27 sections ready (2026-10-29): 184 topics, 468 questions, 88 verified output questions, 12 tested live-coding solutions.
Check before every commit that touches this folder:
```bash
node study-guide/tools/check-data.js          # shape, ids, Handbook links
node study-guide/tools/verify-output.js       # 88 output questions
node study-guide/tools/verify-live-coding.js  # live-coding solutions with tests
```
Next ideas: more output questions (React rendering, TypeScript), a GraphQL mini-section once he builds the practice project, refresh salary/company notes before applying.
