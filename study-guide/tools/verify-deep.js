// Runs every deep-dive example marked run: "node" in a fresh Node process and checks it prints exactly `out`.
// Examples marked run: "browser" need a page and are listed, not run.
// Usage: node study-guide/tools/verify-deep.js
const { execFileSync } = require("child_process");
const vm = require("vm");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const ctx = { window: {} };
vm.createContext(ctx);
for (const m of html.matchAll(/<script src="(data\/[^"]+)"/g)) {
  vm.runInContext(fs.readFileSync(path.join(root, m[1]), "utf8").replace(/^STUDY\./gm, "window.STUDY."), ctx, { filename: m[1] });
}

let pass = 0, fail = 0, browser = 0;
for (const s of ctx.window.STUDY.sections) {
  for (const t of s.topics || []) {
    if (!t.deep) continue;
    const examples = [...(t.deep.how || []), ...(t.deep.breaks || [])].filter((x) => x.code);
    for (const x of examples) {
      const name = `${s.id}/${t.id} · ${x.title.en}`;
      if (x.run !== "node") { browser++; continue; }
      const got = execFileSync(process.execPath, ["-e", x.code], { encoding: "utf8", timeout: 10000 }).trim();
      if (got === x.out.trim()) pass++;
      else { fail++; console.log(`✗ ${name}\n  expected: ${JSON.stringify(x.out)}\n  got:      ${JSON.stringify(got)}`); }
    }
  }
}
console.log(`${pass} passed · ${fail} failed · ${browser} browser-only (not run)`);
process.exit(fail ? 1 : 0);
