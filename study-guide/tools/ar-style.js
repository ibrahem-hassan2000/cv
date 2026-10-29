// Helper for the Egyptian-Arabic style pass (study-guide/STYLE-AR.md).
//   node ar-style.js stats                 → per file: how many `ar` strings need work
//   node ar-style.js list <data file>      → numbered list of strings that need work (raw source text)
//   node ar-style.js apply <data file> <fixes.js>
//        fixes.js exports [[old, new], …] written with String.raw`…` so escapes match the source exactly.
// Run from the repo root: node study-guide/tools/ar-style.js stats. Rules: study-guide/STYLE-AR.md.
const fs = require("fs");
const path = require("path");
const [cmd, file, fixesPath] = process.argv.slice(2);
const DIRS = ["study-guide/data", "project-guides/data", "market/data"];
const LIT = /ar:\s*"((?:\\.|[^"\\])*)"/g;

// Real problems only: «؛», or one sentence (between full stops) longer than ~170 characters.
const needs = (s) => {
  const text = s.replace(/<[^>]+>/g, "");
  return /؛/.test(text) || text.split(/[.!?؟]\s/).some((sentence) => sentence.length > 170);
};
const strings = (p) => [...fs.readFileSync(p, "utf8").matchAll(LIT)].map((m) => m[1]);

if (cmd === "stats") {
  let total = 0, all = 0;
  for (const d of DIRS) for (const f of fs.readdirSync(d)) {
    if (!f.endsWith(".js") || f.startsWith("_")) continue;
    const list = strings(path.join(d, f));
    const n = list.filter(needs).length;
    total += n; all += list.length;
    if (n) console.log(`${(d.split("/")[0] + "/" + f).padEnd(40)} ${String(n).padStart(4)} / ${list.length}`);
  }
  console.log(`total needing work: ${total} of ${all}`);
} else if (cmd === "list") {
  strings(file).filter(needs).forEach((s, i) => console.log(`[${i + 1}] ${s}\n`));
} else if (cmd === "apply") {
  let src = fs.readFileSync(file, "utf8");
  const fixes = require(path.resolve(fixesPath));
  let done = 0;
  for (const [oldS, newS] of fixes) {
    const needle = `ar: "${oldS}"`;
    const at = src.indexOf(needle);
    if (at < 0) { console.error("NOT FOUND: " + oldS.slice(0, 80)); process.exitCode = 1; continue; }
    if (src.indexOf(needle, at + 1) >= 0) console.warn("note: appears more than once, replacing all: " + oldS.slice(0, 60));
    src = src.split(needle).join(`ar: "${newS}"`);
    done++;
  }
  fs.writeFileSync(file, src);
  console.log(`applied ${done}/${fixes.length}`);
} else {
  console.log("usage: stats | list <file> | apply <file> <fixes.js>");
}
