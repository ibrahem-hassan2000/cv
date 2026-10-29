// Runs every question in data/js-output.js and checks the printed output against its answer.
// Usage: node study-guide/tools/verify-output.js   (exit code 1 if any answer is wrong)
// Each snippet runs as a classic script in a fresh context, like a browser <script> tag.
const vm = require("vm");
const fs = require("fs");
const path = require("path");

process.on("unhandledRejection", () => {}); // some questions leave a rejection unhandled on purpose

const groups = [];
const STUDY = { fill: (id, data) => groups.push(...data.groups) };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "../data/js-output.js"), "utf8"), { STUDY });

function format(v) {
  if (typeof v === "string") return v;
  if (v === undefined) return "undefined";
  if (v === null || typeof v !== "object") return String(v);
  return JSON.stringify(v);
}

function run(code) {
  return new Promise((resolve) => {
    const lines = [];
    const timers = new Set();
    const context = {
      console: { log: (...args) => { lines.push(args.map(format).join(" ")); } }, // returns undefined like the real one
      setTimeout: (fn, ms) => { const id = setTimeout(() => { timers.delete(id); fn(); }, ms); timers.add(id); return id; },
      clearTimeout: (id) => { clearTimeout(id); timers.delete(id); },
      queueMicrotask,
      structuredClone
    };
    vm.createContext(context);
    try {
      vm.runInContext(code, context);
    } catch (e) {
      lines.push(e.name + ": " + e.message);
    }
    setTimeout(() => resolve(lines.join("\n")), 120);
  });
}

(async () => {
  let failed = 0, total = 0;
  for (const g of groups) {
    for (let i = 0; i < g.questions.length; i++) {
      const q = g.questions[i];
      total++;
      const got = await run(q.code);
      if (got !== q.answer) {
        failed++;
        console.log(`✗ ${g.id} #${i + 1}\n  expected: ${JSON.stringify(q.answer)}\n  got:      ${JSON.stringify(got)}`);
      }
    }
  }
  console.log(`${total - failed}/${total} answers match`);
  process.exit(failed ? 1 : 0);
})();
