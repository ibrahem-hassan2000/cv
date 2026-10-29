// Loads every data file listed in index.html and checks the shape: ids, required fields, block types,
// and that "In my projects" links point to real Handbook projects and tabs.
// Usage: node study-guide/tools/check-data.js
const vm = require("vm");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const files = [...html.matchAll(/<script src="(data\/[^"]+)"/g)].map((m) => m[1]);
const ctx = { window: {} };
vm.createContext(ctx);
for (const f of files) vm.runInContext(fs.readFileSync(path.join(root, f), "utf8").replace(/^STUDY\./gm, "window.STUDY."), ctx, { filename: f });

const handbook = { window: {} };
vm.createContext(handbook);
const hbDir = path.join(root, "../project-guides");
const hbHtml = fs.readFileSync(path.join(hbDir, "index.html"), "utf8");
for (const m of hbHtml.matchAll(/<script src="(data\/[^"]+)"/g)) {
  vm.runInContext(fs.readFileSync(path.join(hbDir, m[1]), "utf8").replace(/^HANDBOOK\./gm, "window.HANDBOOK."), handbook);
}
const projects = new Set(handbook.window.HANDBOOK.projects.map((p) => p.id));
const TABS = new Set(["overview", "decisions", "how", "hooks", "problems", "interview"]);
const BLOCKS = new Set(["text", "code", "list", "compare", "when", "pitfalls", "projects"]);

const problems = [];
const bi = (x, where) => { if (!x || (typeof x !== "string" && (!x.en || !x.ar))) problems.push(`${where}: missing en/ar`); };
let topics = 0, questions = 0;
for (const s of ctx.window.STUDY.sections) {
  const ids = new Set();
  for (const t of s.topics || []) {
    topics++;
    const w = `${s.id}/${t.id}`;
    if (ids.has(t.id)) problems.push(`${w}: duplicate id`);
    ids.add(t.id);
    bi(t.title, w + " title"); bi(t.tldr, w + " tldr");
    for (const b of t.blocks || []) {
      if (!BLOCKS.has(b.type)) problems.push(`${w}: unknown block ${b.type}`);
      if (b.type === "compare") for (const r of b.rows) if (r.length !== b.cols.length) problems.push(`${w}: compare row has ${r.length} cells, ${b.cols.length} cols`);
      if (b.type === "projects") for (const i of b.items) {
        if (i.p && !projects.has(i.p)) problems.push(`${w}: unknown project ${i.p}`);
        if (i.tab && !TABS.has(i.tab)) problems.push(`${w}: unknown tab ${i.tab}`);
      }
    }
    if (t.deep) {
      const d = t.deep;
      bi(d.why, w + " deep why");
      (d.how || []).forEach((x, i) => { bi(x.title, `${w} deep how ${i}`); bi(x.body, `${w} deep how ${i}`); });
      (d.breaks || []).forEach((x, i) => { bi(x.title, `${w} deep break ${i}`); bi(x.body, `${w} deep break ${i}`); bi(x.fix, `${w} deep break ${i} fix`); });
      for (const x of [...(d.how || []), ...(d.breaks || [])]) {
        if (x.code && x.run !== "node" && x.run !== "browser") problems.push(`${w}: deep code needs run "node" or "browser"`);
        if (x.run === "node" && !x.out) problems.push(`${w}: deep node example needs out`);
      }
      (d.levels || []).forEach((x, i) => { bi(x.mid, `${w} deep level ${i} mid`); bi(x.senior, `${w} deep level ${i} senior`); questions++; });
      const drill = (list, depth) => (list || []).forEach((x) => { bi(x.a, `${w} deep drill depth ${depth}`); questions++; drill(x.follow, depth + 1); });
      drill(d.drill, 1);
      if (d.story) {
        bi(d.story.text, w + " deep story");
        if (d.story.p && !projects.has(d.story.p)) problems.push(`${w}: deep story unknown project ${d.story.p}`);
      }
      for (const src of d.sources || []) if (!/^https:\/\//.test(src.url)) problems.push(`${w}: deep source must be https`);
    }
    for (const q of t.interview || []) { bi(q.a, w + " interview"); questions++; }
    for (const q of t.quiz || []) { bi(q.q, w + " quiz q"); bi(q.a, w + " quiz a"); questions++; }
  }
  for (const g of s.groups || []) for (const q of g.questions) { questions++; if (!q.answer && q.answer !== "") problems.push(`${g.id}: missing answer`); }
}
const ready = ctx.window.STUDY.sections.filter((s) => (s.topics && s.topics.length) || (s.groups && s.groups.length)).length;
problems.forEach((p) => console.log("✗ " + p));
console.log(`${ready}/${ctx.window.STUDY.sections.length} sections ready · ${topics} topics · ${questions} questions · ${problems.length} problems`);
process.exit(problems.length ? 1 : 0);
