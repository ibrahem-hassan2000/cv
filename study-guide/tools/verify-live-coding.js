// Runs every `solution: true` code block in data/live-coding.js and tests it.
// Usage: node study-guide/tools/verify-live-coding.js   (exit code 1 on any failure)
const vm = require("vm");
const fs = require("fs");
const path = require("path");
const assert = require("assert");

let section;
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "../data/live-coding.js"), "utf8"), { STUDY: { fill: (_id, d) => (section = d) } });

// Arrays/objects built inside the vm context have their own prototypes, so compare structurally through JSON.
const same = (a, b) => assert.strictEqual(JSON.stringify(a), JSON.stringify(b));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const load = (id) => {
  const topic = section.topics.find((t) => t.id === id);
  const code = topic.blocks.filter((b) => b.solution).map((b) => b.code).join("\n");
  const ctx = { setTimeout, clearTimeout, Promise, Map, Set, WeakMap, Date, Reflect, Object, Array, Math, Error };
  vm.createContext(ctx);
  vm.runInContext(code + "\n;this.__exports = { " + [...code.matchAll(/^(?:async )?function (\w+)|^class (\w+)|^const (\w+) =/gm)].map((m) => m[1] || m[2] || m[3]).join(", ") + " };", ctx);
  return ctx.__exports;
};

const tests = {
  async debounce() {
    const { debounce } = load("debounce");
    const calls = [];
    const d = debounce((x) => calls.push(x), 30);
    d(1); d(2); d(3);
    await sleep(60);
    same(calls, [3]);
    d(4); d.cancel(); await sleep(50);
    same(calls, [3]);
    const obj = { v: 7, run: debounce(function () { calls.push(this.v); }, 10) };
    obj.run(); await sleep(30);
    same(calls, [3, 7]);
  },
  async throttle() {
    const { throttle } = load("throttle");
    const calls = [];
    const t = throttle((x) => calls.push(x), 40);
    t(1); t(2); t(3);
    same(calls, [1]);
    await sleep(70);
    same(calls, [1, 3]);
  },
  async "promise-all"() {
    const { promiseAll } = load("promise-all");
    const wait = (ms, v) => new Promise((r) => setTimeout(() => r(v), ms));
    same(await promiseAll([wait(30, "a"), wait(5, "b"), "c"]), ["a", "b", "c"]);
    same(await promiseAll([]), []);
    await assert.rejects(promiseAll([wait(5, 1), Promise.reject(new Error("x"))]), /x/);
  },
  async "promise-all-settled"() {
    const { promiseAllSettled, promiseRace } = load("promise-all-settled");
    const r = await promiseAllSettled([Promise.resolve(1), Promise.reject("no"), 3]);
    same(r.map((x) => x.status), ["fulfilled", "rejected", "fulfilled"]);
    assert.strictEqual(r[1].reason, "no");
    const wait = (ms, v) => new Promise((res) => setTimeout(() => res(v), ms));
    assert.strictEqual(await promiseRace([wait(30, "slow"), wait(5, "fast")]), "fast");
  },
  async retry() {
    const { retry } = load("retry");
    let n = 0;
    const v = await retry(async () => { n++; if (n < 3) throw new Error("flaky"); return "ok"; }, { retries: 3, base: 1 });
    assert.strictEqual(v, "ok"); assert.strictEqual(n, 3);
    let m = 0;
    await assert.rejects(retry(async () => { m++; throw new Error("400"); }, { retries: 3, base: 1, shouldRetry: () => false }), /400/);
    assert.strictEqual(m, 1);
  },
  async pool() {
    const { runWithLimit } = load("pool");
    let running = 0, peak = 0;
    const task = (v, ms) => async () => { running++; peak = Math.max(peak, running); await sleep(ms); running--; return v; };
    const out = await runWithLimit([task("a", 20), task("b", 5), task("c", 10), task("d", 5), task("e", 1)], 2);
    same(out, ["a", "b", "c", "d", "e"]);
    assert.strictEqual(peak, 2);
  },
  async "event-emitter"() {
    const { Emitter } = load("event-emitter");
    const e = new Emitter(); const got = [];
    const off = e.on("x", (v) => got.push("a" + v));
    e.once("x", (v) => got.push("once" + v));
    e.emit("x", 1); e.emit("x", 2); off(); e.emit("x", 3);
    same(got, ["a1", "once1", "a2"]);
  },
  async memoize() {
    const { memoize, once } = load("memoize");
    let calls = 0;
    const sq = memoize((n) => { calls++; return n * n; });
    assert.strictEqual(sq(4), 16); assert.strictEqual(sq(4), 16); assert.strictEqual(calls, 1);
    const sum = memoize((a, b) => { calls++; return a + b; }, (a, b) => a + "," + b);
    sum(1, 2); sum(1, 3); sum(1, 2); assert.strictEqual(calls, 3);
    let k = 0; const init = once(() => ++k);
    assert.strictEqual(init(), 1); assert.strictEqual(init(), 1);
  },
  async lru() {
    const { LRUCache } = load("lru");
    const c = new LRUCache(2);
    c.put("a", 1); c.put("b", 2); c.get("a"); c.put("c", 3);
    assert.strictEqual(c.get("b"), undefined); assert.strictEqual(c.get("a"), 1); assert.strictEqual(c.get("c"), 3);
  },
  async "deep-clone-equal"() {
    const { deepClone, deepEqual } = load("deep-clone-equal");
    const src = { d: new Date(0), list: [1, { x: 2 }], m: new Map([["k", { y: 1 }]]), s: new Set([1, 2]) };
    src.self = src;
    const c = deepClone(src);
    assert.notStrictEqual(c, src); assert.strictEqual(c.self, c);
    assert.strictEqual(c.d.getTime(), 0); assert.notStrictEqual(c.list[1], src.list[1]);
    assert.strictEqual(c.m.get("k").y, 1); assert.ok(c.s.has(2));
    assert.ok(deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }));
    assert.ok(!deepEqual({ a: 1 }, { a: 1, b: undefined }));
    assert.ok(!deepEqual([1, 2], { 0: 1, 1: 2 }));
    assert.ok(deepEqual(NaN, NaN));
  },
  async "flatten-curry"() {
    const { flatten, curry, pipe, compose } = load("flatten-curry");
    same(flatten([1, [2, [3, [4]]]]), [1, 2, 3, 4]);
    same(flatten([1, [2, [3]]], 1), [1, 2, [3]]);
    const add3 = curry((a, b, c) => a + b + c);
    assert.strictEqual(add3(1)(2)(3), 6); assert.strictEqual(add3(1, 2)(3), 6); assert.strictEqual(add3(1)(2, 3), 6);
    assert.strictEqual(pipe((x) => x + 1, (x) => x * 2)(3), 8);
    assert.strictEqual(compose((x) => x + 1, (x) => x * 2)(3), 7);
  },
  async "data-utils"() {
    const { groupBy, get, chunk } = load("data-utils");
    same(groupBy([1, 2, 3, 4], (n) => (n % 2 ? "odd" : "even")), { odd: [1, 3], even: [2, 4] });
    assert.strictEqual(get({ a: { b: [{ c: 1 }] } }, "a.b[0].c"), 1);
    assert.strictEqual(get({ a: null }, "a.b.c", "none"), "none");
    same(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
  }
};

(async () => {
  let failed = 0;
  const ids = section.topics.filter((t) => t.blocks.some((b) => b.solution)).map((t) => t.id);
  for (const id of ids) {
    if (!tests[id]) { failed++; console.log(`✗ ${id}: no test`); continue; }
    try { await tests[id](); console.log(`✓ ${id}`); } catch (e) { failed++; console.log(`✗ ${id}: ${e.message}`); }
  }
  console.log(`${ids.length - failed}/${ids.length} solutions pass`);
  process.exit(failed ? 1 : 0);
})();
