// TEMPLATE — copy to data/<id>.js, fill it from the code, then add <script src="data/<id>.js"> to index.html
// and remove the project from HANDBOOK.todo in data/handbook.js. Rules: project-guides/README.md.
// Every text is { en: "...", ar: "..." } (simple Egyptian Arabic, technical terms in English). HTML like <b>, <code> is allowed.
HANDBOOK.projects.push({
  id: "project-id",                       // used in the URL: #/project-id
  name: "Project name",
  logo: "assets/img/project-logo.png",    // from the repo; or remove and use monogram
  monogram: "P",
  color: "#1f6f5c",                       // brand colour (white text must be readable on it)
  company: "Company",
  years: "2026",
  period: "Mon YYYY – Mon YYYY",
  role: { en: "", ar: "" },
  team: { en: "", ar: "" },
  tagline: { en: "", ar: "" },
  stats: [["123", { en: "commits", ar: "كوميت" }]],

  pitch: [{ en: "", ar: "" }],            // 3 bullets: what it is, what I did, the hardest part
  built: [{ title: { en: "", ar: "" }, items: [{ en: "", ar: "" }] }],
  myRole: [{ en: "", ar: "" }],           // mine vs the team's — built / co-built / contributed / led
  stack: [[{ en: "Core", ar: "الأساس" }, ["Next.js"]]],

  decisions: [{
    title: { en: "", ar: "" },
    chose: "Tool I used", alts: ["Alternative 1", "Alternative 2"],
    why: { en: "", ar: "" },
    both: { v: "yes | no | partly", en: "", ar: "" },   // could both live together?
    better: { en: "", ar: "" },                          // what I'd pick today and why
    say: "One English sentence to say in the interview.",
    concept: "server-state"                              // optional: id from data/concepts.js
  }],

  flows: [{ title: { en: "", ar: "" }, steps: [["Step label", { en: "", ar: "" }]] }],
  patterns: [{ title: { en: "", ar: "" }, body: { en: "", ar: "" }, code: "// simplified sketch, never copied client code" }],

  hooks: [{ group: { en: "", ar: "" }, items: [{ name: "useQuery", count: "×10", what: { en: "", ar: "" }, remember: { en: "", ar: "" } }] }],
  problems: [{ title: { en: "", ar: "" }, problem: { en: "", ar: "" }, fix: { en: "", ar: "" }, result: { en: "", ar: "" }, lesson: { en: "", ar: "" } }],

  star: { s: { en: "", ar: "" }, t: { en: "", ar: "" }, a: { en: "", ar: "" }, r: { en: "", ar: "" } },
  qa: [{ q: "Question in English?", a: { en: "", ar: "" } }],
  terms: ["key term"],
  dont: [{ en: "", ar: "" }],
  evidence: ["Repo, branch, key commits and files", "Deep dive: evidence/projects/<id>.md"]
});
