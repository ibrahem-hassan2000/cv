// Live coding patterns — written 2026-10-29. Every block marked `solution: true` is plain JS and is executed
// and tested by tools/verify-live-coding.js (run it after editing this file).
STUDY.fill("live-coding", {
  intro: { en: "The functions interviewers ask you to write from scratch — debounce, throttle, Promise.all, a concurrency pool, an event emitter, an LRU cache, deep clone/equal and more — each with a tested solution, the reasoning, edge cases and the follow-ups.", ar: "الـ functions اللي الإنترفيور بيطلب منك تكتبها من الصفر. زي debounce و throttle و Promise.all و concurrency pool و event emitter و LRU cache و deep clone و deep equal وغيرهم. وكل واحدة معاها حل متختبر، وطريقة التفكير، والحالات الطرفية، والأسئلة اللي ممكن تيجي بعدها." },
  topics: [
    {
      id: "approach",
      title: { en: "How to approach a live-coding question", ar: "إزاي تتعامل مع سؤال live coding" },
      tldr: { en: "Clarify → examples → plan out loud → write the simplest correct version → test with your examples → handle edge cases → discuss complexity and improvements. Interviewers score communication as much as code.", ar: "وضّح ← أمثلة ← قول الخطة بصوت عالي ← اكتب أبسط نسخة صح ← جربها على الأمثلة ← الحالات الحدية ← اتكلم عن الـ complexity والتحسينات. والإنترفيور بيقيّم الكلام زي ما بيقيّم الكود." },
      blocks: [
        { type: "list", items: [
          { en: "<b>Clarify:</b> inputs, outputs, sync/async, what “equal” means, errors, `this`, arguments.", ar: "<b>وضّح:</b> المدخلات والمخرجات، sync ولا async، «متساوي» معناه إيه، الأخطاء، الـ this، الـ arguments." },
          { en: "<b>Say the plan</b> in one or two sentences before typing.", ar: "<b>قول الخطة</b> في جملة أو اتنين قبل ما تكتب." },
          { en: "<b>Start simple</b>, then extend (leading edge, cancel, options).", ar: "<b>ابدأ بسيط</b>، وبعدين زود (leading edge، cancel، options)." },
          { en: "<b>Test out loud</b> with a tiny example; mention edge cases (empty input, errors, order).", ar: "<b>جرّب بصوت عالي</b> على مثال صغير. واذكر الحالات الطرفية: مدخلات فاضية، وأخطاء، وترتيب." },
          { en: "<b>Close</b> with complexity and what you'd add in production (types, tests, cancellation).", ar: "<b>اقفل</b> بالـ complexity وإيه اللي هتزوده في الـ production (types، tests، إلغاء)." }
        ] }
      ],
      say: "Let me confirm the requirements first, then I'll write the simplest version, walk through an example and handle the edge cases.",
      interview: [{ q: "You're stuck mid-solution. What do you do?", a: { en: "Say where you're stuck, simplify the problem (solve a smaller case), write what you know works, and ask a targeted question. Silence is worse than a visible plan.", ar: "قول انت واقف فين، وبسّط المشكلة (حل حالة أصغر)، واكتب اللي متأكد إنه شغال، واسأل سؤال محدد. السكوت أوحش من خطة باينة." } }],
      quiz: [{ q: { en: "First thing to do after hearing the question?", ar: "أول حاجة تعملها بعد ما تسمع السؤال؟" }, a: { en: "Clarify requirements and edge cases with an example.", ar: "توضّح المطلوب والحالات الحدية بمثال." } }],
      quick: [{ en: "Clarify → examples → plan aloud → simple version → test → edge cases → complexity.", ar: "وضّح ← أمثلة ← الخطة بصوت عالي ← نسخة بسيطة ← تجربة ← حالات حدية ← complexity." }]
    },
    {
      id: "debounce",
      title: { en: "debounce", ar: "debounce" },
      tldr: { en: "Delay calling <code>fn</code> until <code>wait</code> ms have passed since the last call. Keep the timer in a closure, clear it on every call, preserve <code>this</code> and arguments, and add <code>cancel</code>.", ar: "أجّل نداء <code>fn</code> لحد ما يعدي <code>wait</code> ms من آخر نداء. خلي التايمر في closure، وامسحه مع كل نداء، وحافظ على <code>this</code> والـ arguments، وزود <code>cancel</code>." },
      blocks: [
        { type: "code", solution: true, code: "function debounce(fn, wait) {\n  let timer;\n  function debounced(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), wait);\n  }\n  debounced.cancel = () => clearTimeout(timer);\n  return debounced;\n}" },
        { type: "list", title: { en: "Follow-ups", ar: "الـ Follow-ups" }, items: [
          { en: "Leading edge: call immediately, then ignore until quiet (<code>{ leading: true }</code>).", ar: "Leading edge: نادي على طول، وبعدين تجاهل لحد ما يهدى (<code>{ leading: true }</code>)." },
          { en: "<code>flush()</code>: run the pending call now. <code>maxWait</code>: guarantee a call at least every N ms.", ar: "<code>flush()</code>: شغّل النداء المستني دلوقتي. و <code>maxWait</code>: اضمن نداء كل N ms على الأقل." },
          { en: "In React: keep the debounced function stable (useMemo/useRef) and cancel it on unmount.", ar: "في React: خلي الـ function الـ debounced ثابتة (useMemo أو useRef) واعملها cancel مع الـ unmount." }
        ] }
      ],
      say: "Debounce keeps one timer in a closure and restarts it on every call, so fn runs once after the calls stop.",
      interview: [{ q: "Where did you use debounce in real work?", a: { en: "Search-as-you-type (Smart FAQ has a tested useDebouncedValue hook) — combined with React Query keys so older responses never overwrite newer ones.", ar: "البحث وانت بتكتب (Smart FAQ فيه hook اسمه useDebouncedValue ومعاه tests) — مع keys بتاعة React Query علشان الردود القديمة عمرها ما تغطي على الجديدة." } }],
      quiz: [{ q: { en: "Calls at 0, 100, 200 ms with wait = 300 — when does fn run?", ar: "نداءات عند 0 و 100 و 200ms و wait = 300 — fn بتشتغل إمتى؟" }, a: { en: "Once, at ~500 ms, with the last call's arguments.", ar: "مرة واحدة، عند حوالي 500ms، بـ arguments آخر نداء." } }],
      quick: [{ en: "clearTimeout + setTimeout in a closure; apply(this, args); cancel; leading/maxWait as follow-ups.", ar: "clearTimeout و setTimeout جوه closure. وبعدين apply(this, args). وزوّد cancel. والـ leading والـ maxWait بييجوا كأسئلة بعدها." }]
    },
    {
      id: "throttle",
      title: { en: "throttle", ar: "throttle" },
      tldr: { en: "Run <code>fn</code> at most once every <code>wait</code> ms. This version runs immediately, then once more at the end of the window with the latest arguments (leading + trailing).", ar: "شغّل <code>fn</code> مرة على الأكتر كل <code>wait</code> ms. النسخة دي بتشتغل على طول، وبعدين مرة كمان في آخر الفترة بآخر arguments (leading و trailing)." },
      blocks: [
        { type: "code", solution: true, code: "function throttle(fn, wait) {\n  let last = 0;\n  let timer = null;\n  let pendingArgs = null;\n  return function throttled(...args) {\n    const now = Date.now();\n    const remaining = wait - (now - last);\n    if (remaining <= 0) {\n      last = now;\n      fn.apply(this, args);\n    } else {\n      pendingArgs = args;\n      if (!timer) {\n        timer = setTimeout(() => {\n          last = Date.now();\n          timer = null;\n          fn.apply(this, pendingArgs);\n        }, remaining);\n      }\n    }\n  };\n}" }
      ],
      say: "Throttle remembers when it last ran; inside the window it schedules one trailing call with the latest arguments.",
      interview: [{ q: "Throttle or debounce for a scroll-position header?", a: { en: "Throttle (or requestAnimationFrame) — you want regular updates while scrolling, not one update after scrolling stops.", ar: "Throttle (أو requestAnimationFrame) — عايز تحديثات منتظمة وانت بتعمل scroll، مش تحديث واحد بعد ما تقف." } }],
      quiz: [{ q: { en: "Without the trailing call, what bug appears?", ar: "من غير النداء الأخير، إيه الـ bug اللي بيظهر؟" }, a: { en: "The final position/state may never be applied.", ar: "آخر مكان أو state ممكن ميتطبقش خالص." } }],
      quick: [{ en: "Track last run; run if window passed; else schedule one trailing call with latest args.", ar: "احفظ وقت آخر تشغيل. لو الفترة عدّت، شغّل. وإلا اعمل نداء أخير واحد بآخر args." }]
    },
    {
      id: "promise-all",
      title: { en: "Promise.all from scratch", ar: "Promise.all من الصفر" },
      tldr: { en: "Return a promise; resolve each input with <code>Promise.resolve</code> (so plain values work), store results by index (keep input order), count completions, reject on the first rejection, and resolve immediately for an empty array.", ar: "رجّع promise. ولف كل مدخل بـ <code>Promise.resolve</code>، علشان القيم العادية تشتغل. وخزّن النتايج بالـ index علشان تحافظ على الترتيب. وعدّ اللي خلص. واعمل reject مع أول فشل. ولو الـ array فاضي، اعمل resolve على طول." },
      blocks: [
        { type: "code", solution: true, code: "function promiseAll(items) {\n  return new Promise((resolve, reject) => {\n    const list = Array.from(items);\n    const results = new Array(list.length);\n    let done = 0;\n    if (list.length === 0) return resolve(results);\n    list.forEach((item, i) => {\n      Promise.resolve(item).then((value) => {\n        results[i] = value;\n        done += 1;\n        if (done === list.length) resolve(results);\n      }, reject);\n    });\n  });\n}" },
        { type: "pitfalls", items: [{ en: "Using <code>results.push</code> → wrong order. Counting with <code>results.length</code> → wrong with sparse arrays. Forgetting the empty case → never resolves.", ar: "تستخدم <code>results.push</code> ← ترتيب غلط. تعد بـ <code>results.length</code> ← غلط مع الـ arrays اللي فيها فراغات. تنسى الحالة الفاضية ← عمره ما يخلص." }] }
      ],
      say: "Results go into their input index, a counter tells me when all resolved, and the first rejection rejects the whole thing.",
      interview: [{ q: "Now write allSettled.", a: { en: "Same shape, but both handlers store <code>{status: \"fulfilled\", value}</code> or <code>{status: \"rejected\", reason}</code> and count; it never rejects.", ar: "نفس الشكل، بس الـ handlerين بيخزنوا <code>{status: \"fulfilled\", value}</code> أو <code>{status: \"rejected\", reason}</code>، وبيعدّوا. وعمره ما بيفشل." } }],
      quiz: [{ q: { en: "Why Promise.resolve(item)?", ar: "ليه Promise.resolve(item)؟" }, a: { en: "So plain values and thenables work like promises.", ar: "علشان القيم العادية والـ thenables يشتغلوا زي الـ promises." } }],
      quick: [{ en: "Index results; count; reject first; empty → resolve []; Promise.resolve each.", ar: "النتايج بالـ index، ومعاها عدّاد. أول فشل يعمل reject. والـ array الفاضي يعمل resolve بـ []. وكل مدخل يتلف بـ Promise.resolve." }]
    },
    {
      id: "promise-all-settled",
      title: { en: "Promise.allSettled and Promise.race", ar: "Promise.allSettled و Promise.race" },
      tldr: { en: "allSettled waits for every input and reports each outcome; race settles with whichever input settles first.", ar: "الـ allSettled بيستنى كل المدخلات، ويقول نتيجة كل واحد. أما الـ race فبيخلص مع أول مدخل يخلص." },
      blocks: [
        { type: "code", solution: true, code: "function promiseAllSettled(items) {\n  const list = Array.from(items);\n  return promiseAllLike(list.map((item) =>\n    Promise.resolve(item).then(\n      (value) => ({ status: \"fulfilled\", value }),\n      (reason) => ({ status: \"rejected\", reason })\n    )\n  ));\n}\nfunction promiseAllLike(promises) {\n  return new Promise((resolve) => {\n    const out = new Array(promises.length);\n    let done = 0;\n    if (!promises.length) return resolve(out);\n    promises.forEach((p, i) => p.then((v) => { out[i] = v; if (++done === promises.length) resolve(out); }));\n  });\n}\nfunction promiseRace(items) {\n  return new Promise((resolve, reject) => {\n    for (const item of items) Promise.resolve(item).then(resolve, reject);\n  });\n}" }
      ],
      say: "allSettled maps every input to a settled record first, so the combined promise can never reject; race just forwards the first settlement.",
      interview: [{ q: "What does race do with an empty array?", a: { en: "It stays pending forever — nothing ever settles it.", ar: "بيفضل pending للأبد — مفيش حاجة بتحسمه." } }],
      quiz: [{ q: { en: "Can allSettled reject?", ar: "الـ allSettled ممكن يفشل؟" }, a: { en: "No.", ar: "لأ." } }],
      quick: [{ en: "allSettled = map to {status} then all; race = first settle wins; empty race never settles.", ar: "الـ allSettled: حوّل كل واحد لـ {status}، وبعدين all. والـ race: أول واحد يخلص يكسب. والـ race على array فاضي عمره ما بيخلص." }]
    },
    {
      id: "retry",
      title: { en: "Retry with exponential backoff", ar: "Retry بـ exponential backoff" },
      tldr: { en: "Call an async function; on failure wait <code>base × 2^attempt</code> ms and try again, up to N retries; stop early for errors that will never succeed (4xx).", ar: "نادي async function. ولو فشلت، استنى <code>base × 2^attempt</code> ms وجرّب تاني، لحد N مرة. ووقّف بدري مع الأخطاء اللي عمرها ما هتنجح (4xx)." },
      blocks: [
        { type: "code", solution: true, code: "async function retry(fn, { retries = 3, base = 100, shouldRetry = () => true } = {}) {\n  for (let attempt = 0; ; attempt++) {\n    try {\n      return await fn(attempt);\n    } catch (err) {\n      if (attempt >= retries || !shouldRetry(err)) throw err;\n      const delay = base * 2 ** attempt;\n      await new Promise((r) => setTimeout(r, delay));\n    }\n  }\n}" },
        { type: "projects", items: [{ text: { en: "Smart FAQ's retry rules: only network/5xx/429, Retry-After respected, 1 s → 2 s → 4 s capped at 8 s.", ar: "قواعد الـ retry في Smart FAQ: الشبكة و 5xx و 429 بس، واحترام Retry-After، و 1 ← 2 ← 4 ثواني بحد أقصى 8." }, p: "smartfaq", tab: "how", label: "Smart FAQ" }] }
      ],
      say: "Retries back off exponentially, only for errors that can succeed later, and give up after a few attempts.",
      interview: [{ q: "Why add jitter?", a: { en: "If many clients fail together, identical backoff makes them retry together (thundering herd). Random jitter spreads the retries out.", ar: "لو clients كتير فشلوا مع بعض، الـ backoff المتطابق بيخليهم يعيدوا مع بعض (thundering herd). والـ jitter العشوائي بيفرّق المحاولات." } }],
      quiz: [{ q: { en: "Delays with base 100 for attempts 0, 1, 2?", ar: "التأخير بـ base 100 للمحاولات 0 و 1 و 2؟" }, a: { en: "100, 200, 400 ms.", ar: "100 و 200 و 400ms." } }],
      quick: [{ en: "Loop; try/await; on error: give up if last or not retryable; wait base·2^n (+ jitter).", ar: "loop فيه try و await. ومع الخطأ: استسلم لو دي آخر مرة أو الخطأ مش retryable. وإلا استنى base·2^n، وزوّد jitter." }]
    },
    {
      id: "pool",
      title: { en: "Run promises with a concurrency limit", ar: "تشغيل promises بحد للتوازي" },
      tldr: { en: "Upload 100 files but only 3 at a time: start <code>limit</code> workers, each pulls the next task index from a shared counter until none are left; keep results in input order.", ar: "ارفع 100 ملف، بس 3 في المرة. ابدأ <code>limit</code> workers، وكل worker ياخد رقم المهمة الجاية من عدّاد مشترك، لحد ما المهام تخلص. وحافظ على ترتيب النتايج." },
      blocks: [
        { type: "code", solution: true, code: "async function runWithLimit(tasks, limit) {\n  const results = new Array(tasks.length);\n  let next = 0;\n  async function worker() {\n    while (next < tasks.length) {\n      const i = next++;\n      results[i] = await tasks[i]();\n    }\n  }\n  const workers = Array.from({ length: Math.min(limit, tasks.length) }, worker);\n  await Promise.all(workers);\n  return results;\n}" }
      ],
      say: "A fixed number of workers pull tasks from a shared index, so at most limit run at once and results keep their original order.",
      interview: [{ q: "What if one task fails?", a: { en: "Here the first failure rejects (like Promise.all) while other workers finish their current task. For “collect all outcomes”, catch inside the worker and store {status, value/reason}.", ar: "هنا أول فشل بيعمل reject (زي Promise.all) والـ workers التانيين بيخلصوا المهمة اللي في إيدهم. ولو عايز «كل النتايج»، امسك الخطأ جوه الـ worker وخزّن {status و value أو reason}." } }],
      quiz: [{ q: { en: "Why is next++ safe without locks?", ar: "ليه next++ آمن من غير locks؟" }, a: { en: "JS runs one thing at a time; the read and increment happen synchronously before any await.", ar: "الـ JS بيشغّل حاجة واحدة في المرة. والقراية والزيادة بيحصلوا sync، قبل أي await." } }],
      quick: [{ en: "N workers + shared index + results by index; Promise.all(workers).", ar: "N workers، و index مشترك، والنتايج بالـ index. وفي الآخر Promise.all(workers)." }]
    },
    {
      id: "event-emitter",
      title: { en: "Event emitter (pub/sub)", ar: "Event emitter (pub/sub)" },
      tldr: { en: "Keep a map of event → set of listeners. <code>on</code> adds and returns an unsubscribe function, <code>off</code> removes, <code>once</code> wraps a listener that removes itself, <code>emit</code> calls a copy of the listeners (so removing during emit is safe).", ar: "خلي عندك map من event ← set من listeners. و <code>on</code> بيزود ويرجّع function للإلغاء، و <code>off</code> بيشيل، و <code>once</code> بيلف listener بيشيل نفسه، و <code>emit</code> بينادي نسخة من الـ listeners (علشان الشيل وقت الـ emit يبقى آمن)." },
      blocks: [
        { type: "code", solution: true, code: "class Emitter {\n  constructor() { this.listeners = new Map(); }\n  on(event, fn) {\n    if (!this.listeners.has(event)) this.listeners.set(event, new Set());\n    this.listeners.get(event).add(fn);\n    return () => this.off(event, fn);\n  }\n  off(event, fn) { this.listeners.get(event)?.delete(fn); }\n  once(event, fn) {\n    const off = this.on(event, (...args) => { off(); fn(...args); });\n    return off;\n  }\n  emit(event, ...args) {\n    for (const fn of [...(this.listeners.get(event) ?? [])]) fn(...args);\n  }\n}" }
      ],
      say: "Listeners live in a Set per event; on returns an unsubscribe, once removes itself, and emit iterates over a copy.",
      interview: [{ q: "Where does this pattern show up in frontend code?", a: { en: "Tiny stores with useSyncExternalStore (subscribe/notify), socket handlers, analytics buses — Smart FAQ's toast and session-expired stores are exactly subscribe + notify.", ar: "بيتستخدم في stores صغيرة مع useSyncExternalStore (subscribe و notify)، وفي handlers الـ sockets، وفي buses للـ analytics. والـ stores بتاعة الـ toast وانتهاء الـ session في Smart FAQ هي بالظبط subscribe و notify." } }],
      quiz: [{ q: { en: "Why iterate over a copy in emit?", ar: "ليه بنلف على نسخة في الـ emit؟" }, a: { en: "A listener may unsubscribe (once) while we iterate.", ar: "listener ممكن يلغي اشتراكه (once) واحنا بنلف." } }],
      quick: [{ en: "Map<event, Set>; on returns unsubscribe; once self-removes; emit over a copy.", ar: "استخدم Map<event, Set>. والـ on بيرجّع function للإلغاء. والـ once بيشيل نفسه. والـ emit بيلف على نسخة." }]
    },
    {
      id: "memoize",
      title: { en: "memoize and once", ar: "memoize و once" },
      tldr: { en: "<code>memoize</code> caches results by a key built from the arguments (default: the first argument; allow a custom resolver). <code>once</code> runs a function only the first time and returns that result afterwards.", ar: "الـ <code>memoize</code> بيخزن النتايج بـ key متعمل من الـ arguments. والافتراضي أول argument، واسمح بـ resolver مخصوص. والـ <code>once</code> بيشغّل الـ function أول مرة بس، ويرجّع نفس النتيجة بعد كده." },
      blocks: [
        { type: "code", solution: true, code: "function memoize(fn, resolver = (...args) => args[0]) {\n  const cache = new Map();\n  return function memoized(...args) {\n    const key = resolver(...args);\n    if (cache.has(key)) return cache.get(key);\n    const value = fn.apply(this, args);\n    cache.set(key, value);\n    return value;\n  };\n}\n\nfunction once(fn) {\n  let called = false;\n  let result;\n  return function (...args) {\n    if (!called) { called = true; result = fn.apply(this, args); }\n    return result;\n  };\n}" }
      ],
      say: "Memoize trades memory for time with a Map keyed by the arguments; I'd bound it (LRU) if keys are unbounded.",
      interview: [{ q: "What's the risk of memoize in a long-running app?", a: { en: "Unbounded memory growth. Use an LRU or WeakMap (object keys), or clear on invalidation.", ar: "الميموري بتكبر من غير حد. استخدم LRU أو WeakMap (مفاتيح objects)، أو امسح مع الـ invalidation." } }],
      quiz: [{ q: { en: "Default memoize key in lodash?", ar: "الـ key الافتراضي لـ memoize في lodash؟" }, a: { en: "The first argument.", ar: "أول argument." } }],
      quick: [{ en: "Map cache keyed by resolver(args); bound it; once = flag + stored result.", ar: "كاش Map، والـ key جاي من resolver(args). وحط له حد. والـ once مجرد flag ونتيجة متخزنة." }]
    },
    {
      id: "lru",
      title: { en: "LRU cache", ar: "LRU cache" },
      tldr: { en: "A cache with a capacity that evicts the least-recently-used entry. In JS a <code>Map</code> keeps insertion order, so “touch” = delete + set, and the oldest key is <code>map.keys().next().value</code>. Both get and put are O(1).", ar: "كاش ليه سعة وبيشيل أقدم حاجة اتستخدمت. وفي JS الـ <code>Map</code> بيحافظ على ترتيب الإضافة، فـ «لمس» = delete و set، وأقدم key هو <code>map.keys().next().value</code>. والـ get والـ put الاتنين O(1)." },
      blocks: [
        { type: "code", solution: true, code: "class LRUCache {\n  constructor(capacity) { this.capacity = capacity; this.map = new Map(); }\n  get(key) {\n    if (!this.map.has(key)) return undefined;\n    const value = this.map.get(key);\n    this.map.delete(key);\n    this.map.set(key, value);          // mark as most recent\n    return value;\n  }\n  put(key, value) {\n    if (this.map.has(key)) this.map.delete(key);\n    this.map.set(key, value);\n    if (this.map.size > this.capacity) this.map.delete(this.map.keys().next().value);\n  }\n}" }
      ],
      say: "A Map's insertion order gives me LRU in O(1): re-insert on access, evict the first key when over capacity.",
      interview: [{ q: "How would you do it without Map ordering?", a: { en: "A hash map from key to node plus a doubly linked list: move nodes to the head on access, remove from the tail on eviction — both O(1).", ar: "Hash map من الـ key للـ node ومعاها doubly linked list: حرّك الـ node للأول مع الاستخدام، وشيل من الآخر وقت الإخراج — والاتنين O(1)." } }],
      quiz: [{ q: { en: "Capacity 2: put a, put b, get a, put c — which is evicted?", ar: "سعة 2: put a، put b، get a، put c — مين بيخرج؟" }, a: { en: "b.", ar: "b." } }],
      quick: [{ en: "Map order = recency; get: delete + set; put: set, evict first key if over.", ar: "الـ Map بيحافظ على الترتيب، والأحدث في الآخر. في الـ get: delete وبعدين set. وفي الـ put: set، ولو العدد زاد، أخرج أول key." }]
    },
    {
      id: "deep-clone-equal",
      title: { en: "deepClone and deepEqual", ar: "deepClone و deepEqual" },
      tldr: { en: "Recurse through arrays and plain objects; handle Dates, Maps, Sets; track visited objects in a WeakMap so circular references don't loop forever. (In real code: <code>structuredClone</code>.)", ar: "امشي بالـ recursion جوه الـ arrays والـ objects العادية. واتعامل مع الـ Dates والـ Maps والـ Sets. واحفظ الـ objects اللي زرتها في WeakMap، علشان الـ references الدايرية متلفش للأبد. (وفي الكود الحقيقي: <code>structuredClone</code>.)" },
      blocks: [
        { type: "code", solution: true, code: "function deepClone(value, seen = new WeakMap()) {\n  if (value === null || typeof value !== \"object\") return value;\n  if (seen.has(value)) return seen.get(value);\n  if (value instanceof Date) return new Date(value.getTime());\n  if (value instanceof Map) {\n    const m = new Map(); seen.set(value, m);\n    value.forEach((v, k) => m.set(deepClone(k, seen), deepClone(v, seen)));\n    return m;\n  }\n  if (value instanceof Set) {\n    const s = new Set(); seen.set(value, s);\n    value.forEach((v) => s.add(deepClone(v, seen)));\n    return s;\n  }\n  const out = Array.isArray(value) ? [] : Object.create(Object.getPrototypeOf(value));\n  seen.set(value, out);\n  for (const key of Reflect.ownKeys(value)) out[key] = deepClone(value[key], seen);\n  return out;\n}\n\nfunction deepEqual(a, b) {\n  if (Object.is(a, b)) return true;\n  if (typeof a !== \"object\" || typeof b !== \"object\" || a === null || b === null) return false;\n  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();\n  if (Array.isArray(a) !== Array.isArray(b)) return false;\n  const ka = Object.keys(a), kb = Object.keys(b);\n  if (ka.length !== kb.length) return false;\n  return ka.every((k) => Object.prototype.hasOwnProperty.call(b, k) && deepEqual(a[k], b[k]));\n}" }
      ],
      say: "deepClone recurses with a WeakMap of visited objects to survive cycles; in production I'd just use structuredClone.",
      interview: [{ q: "What does your deepEqual not handle?", a: { en: "Maps/Sets contents, cycles, class instances' private state, and NaN vs -0 subtleties beyond Object.is. Mention them and add as needed.", ar: "محتوى الـ Maps والـ Sets، والـ cycles، والـ state الخاص في الـ class instances، وتفاصيل NaN و -0 أبعد من Object.is. اذكرهم وزودهم لو لازم." } }],
      quiz: [{ q: { en: "Why a WeakMap in deepClone?", ar: "ليه WeakMap في deepClone؟" }, a: { en: "To return the same clone for an object seen before — handles circular references.", ar: "علشان يرجّع نفس النسخة لـ object شافه قبل كده — بيتعامل مع الـ references الدايرية." } }],
      quick: [{ en: "Recurse arrays/objects; Date/Map/Set; WeakMap for cycles; deepEqual via Object.is + keys; real code: structuredClone.", ar: "recursion للـ arrays والـ objects. وتعامل مع Date و Map و Set. و WeakMap للـ cycles. والـ deepEqual بـ Object.is ومقارنة الـ keys. وفي الكود الحقيقي: structuredClone." }]
    },
    {
      id: "flatten-curry",
      title: { en: "flatten, curry, compose/pipe", ar: "flatten و curry و compose/pipe" },
      tldr: { en: "<code>flatten(arr, depth)</code> recurses into arrays up to a depth. <code>curry(fn)</code> collects arguments until it has <code>fn.length</code> of them. <code>pipe(f, g, h)(x)</code> = h(g(f(x))); <code>compose</code> is the same right-to-left.", ar: "الـ <code>flatten(arr, depth)</code> بيدخل جوه الـ arrays لحد عمق معين. والـ <code>curry(fn)</code> بيجمع arguments لحد ما يبقى معاه <code>fn.length</code>. والـ <code>pipe(f, g, h)(x)</code> معناها h(g(f(x))). والـ <code>compose</code> نفس الحاجة، بس من اليمين للشمال." },
      blocks: [
        { type: "code", solution: true, code: "function flatten(arr, depth = Infinity) {\n  return arr.reduce((out, item) =>\n    Array.isArray(item) && depth > 0 ? out.concat(flatten(item, depth - 1)) : out.concat([item]), []);\n}\n\nfunction curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) return fn.apply(this, args);\n    return (...more) => curried.apply(this, [...args, ...more]);\n  };\n}\n\nconst pipe = (...fns) => (x) => fns.reduce((acc, f) => f(acc), x);\nconst compose = (...fns) => (x) => fns.reduceRight((acc, f) => f(acc), x);" }
      ],
      say: "flatten recurses with a depth budget, curry collects arguments until fn.length, and pipe is just a reduce over functions.",
      interview: [{ q: "Why does curry rely on fn.length, and when does it break?", a: { en: "fn.length is the number of declared parameters — it's 0 for rest parameters and stops counting at the first default, so curry can't know when to call. Pass the arity explicitly then.", ar: "fn.length هو عدد الـ parameters المتعرفة — بيبقى 0 مع الـ rest وبيقف عند أول default، فالـ curry مش هيعرف يناديها إمتى. ابعت العدد صراحةً ساعتها." } }],
      quiz: [{ q: { en: "pipe(x => x + 1, x => x * 2)(3)?", ar: "pipe(x => x + 1, x => x * 2)(3)؟" }, a: { en: "8.", ar: "8." } }],
      quick: [{ en: "flatten = reduce + recursion with depth; curry until fn.length; pipe = reduce, compose = reduceRight.", ar: "الـ flatten عبارة عن reduce و recursion بعمق. والـ curry بيجمع لحد fn.length. والـ pipe عبارة عن reduce، والـ compose عبارة عن reduceRight." }]
    },
    {
      id: "data-utils",
      title: { en: "groupBy, get by path, chunk", ar: "groupBy و get by path و chunk" },
      tldr: { en: "Everyday data helpers: group items by a key function, safely read a nested path (<code>\"a.b[0].c\"</code>) with a default, split an array into chunks.", ar: "Helpers للداتا كل يوم: جمّع العناصر بـ function للمفتاح، واقرا مسار متداخل بأمان (<code>\"a.b[0].c\"</code>) بقيمة افتراضية، وقسّم array لأجزاء." },
      blocks: [
        { type: "code", solution: true, code: "function groupBy(items, keyFn) {\n  const out = {};\n  for (const item of items) {\n    const key = keyFn(item);\n    (out[key] ??= []).push(item);\n  }\n  return out;\n}\n\nfunction get(obj, path, fallback) {\n  const keys = path.replace(/\\[(\\w+)\\]/g, \".$1\").split(\".\").filter(Boolean);\n  let cur = obj;\n  for (const k of keys) {\n    if (cur == null) return fallback;\n    cur = cur[k];\n  }\n  return cur === undefined ? fallback : cur;\n}\n\nfunction chunk(arr, size) {\n  const out = [];\n  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));\n  return out;\n}" }
      ],
      say: "These are small, pure and easy to test — groupBy builds buckets, get walks a normalised path with a fallback, chunk slices by size.",
      interview: [{ q: "Built-in alternative to groupBy?", a: { en: "<code>Object.groupBy</code> / <code>Map.groupBy</code> (ES2024).", ar: "<code>Object.groupBy</code> و <code>Map.groupBy</code> (ES2024)." } }],
      quiz: [{ q: { en: "get({a:{b:[{c:1}]}}, \"a.b[0].c\")?", ar: "get({a:{b:[{c:1}]}}, \"a.b[0].c\")؟" }, a: { en: "1.", ar: "1." } }],
      quick: [{ en: "groupBy with ??= buckets; get = normalise brackets + walk + fallback; chunk by slice.", ar: "الـ groupBy بـ ??=. والـ get: حوّل الأقواس لنقط، وامشي على الطريق، ورجّع fallback. والـ chunk بـ slice." }]
    },
    {
      id: "react-hooks-coding",
      title: { en: "React hooks to write live", ar: "Hooks تكتبها live" },
      tldr: { en: "Common asks: <code>useDebouncedValue</code>, <code>usePrevious</code>, <code>useLocalStorage</code>, <code>useOnClickOutside</code>, <code>useFetch</code> with cancellation. Show cleanup, stable references and SSR safety.", ar: "الطلبات الشائعة: <code>useDebouncedValue</code> و <code>usePrevious</code> و <code>useLocalStorage</code> و <code>useOnClickOutside</code> و <code>useFetch</code> بإلغاء. وورّي الـ cleanup والـ references الثابتة والأمان مع الـ SSR." },
      blocks: [
        { type: "code", code: "function usePrevious(value) {\n  const ref = useRef();\n  useEffect(() => { ref.current = value; }, [value]);\n  return ref.current;                       // value from the previous render\n}\n\nfunction useLocalStorage(key, initial) {\n  const [value, setValue] = useState(() => {\n    try { const v = localStorage.getItem(key); return v != null ? JSON.parse(v) : initial; } catch { return initial; }\n  });\n  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }, [key, value]);\n  return [value, setValue];\n}\n\nfunction useOnClickOutside(ref, handler) {\n  useEffect(() => {\n    const listener = (e) => { if (ref.current && !ref.current.contains(e.target)) handler(e); };\n    document.addEventListener(\"pointerdown\", listener);\n    return () => document.removeEventListener(\"pointerdown\", listener);\n  }, [ref, handler]);\n}\n\nfunction useFetch(url) {\n  const [state, setState] = useState({ status: \"loading\" });\n  useEffect(() => {\n    const ctrl = new AbortController();\n    setState({ status: \"loading\" });\n    fetch(url, { signal: ctrl.signal })\n      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })\n      .then((data) => setState({ status: \"success\", data }))\n      .catch((error) => { if (error.name !== \"AbortError\") setState({ status: \"error\", error }); });\n    return () => ctrl.abort();               // cancels the stale request on url change/unmount\n  }, [url]);\n  return state;\n}", note: { en: "Not run by the verifier (needs React) — reason through them out loud.", ar: "الأداة مش بتشغلهم (محتاجين React) — اشرحهم بصوت عالي." } }
      ],
      say: "Every hook I write cleans up what it starts, survives storage errors, and cancels outdated requests — and in production I'd reach for React Query instead of useFetch.",
      interview: [{ q: "What's wrong with a naive useFetch?", a: { en: "Race conditions (a slow old response overwrites a newer one), no cancellation, no caching/deduping, Strict Mode double fetch. Abort in cleanup — or use React Query.", ar: "Race conditions (رد قديم بطيء بيغطي على رد أحدث)، ومفيش إلغاء، ومفيش كاش أو منع تكرار، والـ Strict Mode بيجيب مرتين. اعمل abort في الـ cleanup — أو استخدم React Query." } }],
      quiz: [{ q: { en: "When does usePrevious update its ref?", ar: "usePrevious بيحدث الـ ref إمتى؟" }, a: { en: "After render (in an effect), so during render it still holds the previous value.", ar: "بعد الـ render (في effect)، فوقت الـ render لسه شايل القيمة اللي قبل." } }],
      quick: [{ en: "Cleanup always; lazy init + try/catch for storage; AbortController in useFetch; prefer React Query.", ar: "الـ cleanup دايمًا. و lazy init و try/catch مع الـ storage. و AbortController في useFetch. والأحسن من ده كله React Query." }]
    }
  ]
});
