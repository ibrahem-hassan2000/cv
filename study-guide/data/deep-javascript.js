// Deep dive for the JavaScript section — the "how it really works / what breaks / mid vs senior" layer.
// Code with run: "node" is executed by tools/verify-deep.js and must print exactly `out`. run: "browser" = needs a page, not auto-checked.
STUDY.deepen("javascript", {
  "event-loop": {
    why: {
      en: "Interviewers use the event loop to tell people who memorised “microtasks before macrotasks” from people who can explain a frozen page, a flaky test or a bad INP score. Expect them to keep asking “why?” until you reach the spec or a real bug.",
      ar: "الإنترفيورز بيستخدموا الـ event loop علشان يفرّقوا بين اللي حافظ «الـ microtasks قبل الـ macrotasks» واللي يقدر يشرح صفحة مهنّجة، أو test بيقع ساعات، أو INP وحش. استنى إنهم يفضلوا يسألوا «ليه؟» لحد ما توصل للـ spec أو لـ bug حقيقي."
    },
    how: [
      {
        title: { en: "The engine doesn't have an event loop — the host does", ar: "الـ engine مفيهوش event loop — الـ host هو اللي فيه" },
        body: {
          en: "V8 only gives you a call stack and a heap. The event loop, timers, <code>fetch</code> and the DOM belong to the <b>host</b>: the browser (defined in the HTML spec) or Node (built on libuv). ECMAScript itself only defines <i>jobs</i> for promise reactions and leaves “when” to the host; browsers run them as <b>microtasks</b>. That is why <code>setTimeout</code> is not part of the JavaScript language.",
          ar: "الـ V8 بيديك call stack و heap بس. الـ event loop والـ timers و <code>fetch</code> والـ DOM بتاعة الـ <b>host</b>: المتصفح (متعرّفة في الـ HTML spec) أو Node (مبني على libuv). الـ ECMAScript نفسه بيعرّف <i>jobs</i> لردود الـ promises بس، وسايب «إمتى» للـ host؛ والمتصفحات بتشغلها كـ <b>microtasks</b>. وعلشان كده <code>setTimeout</code> مش جزء من لغة JavaScript."
        }
      },
      {
        title: { en: "Many task queues, and the browser picks one task per turn", ar: "طوابير tasks كتير، والمتصفح بيختار task واحدة كل لفة" },
        body: {
          en: "Every task comes from a <b>task source</b>: timers, user interaction, networking, <code>postMessage</code>… A browser can keep separate queues and prefer some (Chrome gives user input priority). Order is only guaranteed <b>inside one source</b>. So “a due timer or a click — which runs first?” has no guaranteed answer, while two timers with the same delay do run in order.",
          ar: "كل task جاية من <b>task source</b>: timers، تفاعل اليوزر، الشبكة، <code>postMessage</code>… والمتصفح ممكن يعمل طابور لكل واحد ويفضّل بعضهم (Chrome بيدي أولوية لـ input اليوزر). الترتيب مضمون <b>جوه نفس الـ source بس</b>. يعني «timer معاده جه ولا click — مين الأول؟» ملوش إجابة مضمونة، لكن اتنين timers بنفس الـ delay بيشتغلوا بالترتيب."
        }
      },
      {
        title: { en: "The microtask checkpoint runs whenever the stack empties — not only after a task", ar: "الـ microtasks بتتفضّى كل ما الـ stack يفضى — مش بعد الـ task بس" },
        body: {
          en: "After any callback finishes and the stack is empty, the browser drains <b>all</b> microtasks, including ones added while draining. That makes a real click and <code>el.click()</code> behave differently: with a real click each listener is called by the browser, so microtasks run between listeners. With <code>el.click()</code> your script is still on the stack, so they wait until it returns. Tests that call <code>click()</code> can pass while real users see a different order.",
          ar: "بعد أي callback ما يخلص والـ stack يفضى، المتصفح بيشغّل <b>كل</b> الـ microtasks، حتى اللي اتضافت وهو بيفضّي. وده بيخلي click حقيقي غير <code>el.click()</code>: في الـ click الحقيقي المتصفح بينادي كل listener لوحده، فالـ microtasks بتشتغل بين الـ listeners. لكن مع <code>el.click()</code> الـ script بتاعك لسه على الـ stack، فبتستنى لحد ما يرجع. فممكن test بيستخدم <code>click()</code> ينجح، واليوزر الحقيقي يشوف ترتيب تاني."
        },
        code: "btn.addEventListener(\"click\", () => {\n  Promise.resolve().then(() => console.log(\"micro 1\"));\n  console.log(\"listener 1\");\n});\nbtn.addEventListener(\"click\", () => {\n  Promise.resolve().then(() => console.log(\"micro 2\"));\n  console.log(\"listener 2\");\n});\n// A user clicks:      listener 1, micro 1, listener 2, micro 2\n// btn.click() in JS:  listener 1, listener 2, micro 1, micro 2",
        run: "browser"
      },
      {
        title: { en: "Rendering is a step of the loop, about once per frame", ar: "الرسم خطوة من خطوات الـ loop، تقريبًا مرة كل frame" },
        body: {
          en: "The browser does not paint after every task. At a <b>rendering opportunity</b> (about every 16.7 ms on a 60 Hz screen, only if something changed and the tab is visible) it runs: <code>requestAnimationFrame</code> callbacks → style → layout → paint (resize and intersection observers run in these steps too). Microtasks also run after each rAF callback. So two style changes inside one task never show the in-between state — which is why a CSS transition sometimes “doesn't start”.",
          ar: "المتصفح مش بيرسم بعد كل task. لما ييجي <b>وقت الرسم</b> (تقريبًا كل 16.7ms على شاشة 60Hz، ولو في حاجة اتغيرت والتاب ظاهرة) بيشغّل: callbacks الـ <code>requestAnimationFrame</code> ← style ← layout ← paint (والـ resize و intersection observers بيشتغلوا في الخطوات دي برضه). والـ microtasks بتشتغل بعد كل rAF callback. فلو غيّرت الـ style مرتين في نفس الـ task، الحالة اللي في النص عمرها ما هتتشاف — وده سبب إن الـ CSS transition ساعات «مش بيبدأ»."
        },
        code: "box.style.transform = \"translateX(300px)\";   // start position\nbox.style.transition = \"transform 300ms\";\nbox.style.transform = \"translateX(0)\";       // same task → never painted at 300px → no animation\n\n// Fix: let the browser apply the start position first\nbox.style.transform = \"translateX(300px)\";\nbox.getBoundingClientRect();                  // forces style + layout now\nbox.style.transition = \"transform 300ms\";\nbox.style.transform = \"translateX(0)\";       // now it animates",
        run: "browser"
      },
      {
        title: { en: "await is promise sugar — and the number of ticks is visible", ar: "الـ await مجرد promise بشكل أسهل — وعدد الـ ticks بيبان" },
        body: {
          en: "Code after <code>await</code> continues in a microtask. Awaiting a native promise costs one tick (since the ES2019 change V8 shipped as “faster async functions”). But an <code>async</code> function that <b>returns</b> a promise has to adopt it, which costs two more ticks. That's also why ESLint deprecated <code>no-return-await</code>: <code>return await</code> is not slower, keeps the function in async stack traces, and is <b>required</b> inside <code>try/catch</code> if you want the catch to see the rejection.",
          ar: "الكود اللي بعد <code>await</code> بيكمل في microtask. الـ await على promise عادي بياخد tick واحد (من تعديل ES2019 اللي V8 نزّله باسم «faster async functions»). لكن الـ <code>async</code> function اللي <b>بترجّع</b> promise لازم «تتبنّاه»، وده بياخد tickين زيادة. وده كمان سبب إن ESLint لغى قاعدة <code>no-return-await</code>: الـ <code>return await</code> مش أبطأ، وبيخلي الـ function تظهر في الـ async stack trace، وهو <b>لازم</b> جوه <code>try/catch</code> لو عايز الـ catch يمسك الـ rejection."
        },
        code: "const p = Promise.resolve();\nasync function a() { return p; }         // adopts a promise → 2 extra ticks\nasync function b() { return await p; }   // awaits it → 1 tick\na().then(() => console.log(\"a\"));\nb().then(() => console.log(\"b\"));\nPromise.resolve()\n  .then(() => console.log(\"t1\"))\n  .then(() => console.log(\"t2\"))\n  .then(() => console.log(\"t3\"));",
        out: "t1\nb\nt2\na\nt3",
        run: "node"
      },
      {
        title: { en: "Node: the same idea, with phases and nextTick", ar: "Node: نفس الفكرة، بس بـ phases و nextTick" },
        body: {
          en: "libuv runs phases in a cycle: <b>timers</b> → pending callbacks → <b>poll</b> (I/O) → <b>check</b> (<code>setImmediate</code>) → close callbacks. <code>process.nextTick</code> has its own queue that drains <b>before</b> promise microtasks. Since Node 11, microtasks run after every single timer or immediate callback, like browsers. At the top level of the main script, <code>setTimeout(0)</code> vs <code>setImmediate</code> order is not deterministic; inside an I/O or timer callback, <code>setImmediate</code> runs first.",
          ar: "الـ libuv بيلف على phases: <b>timers</b> ← pending callbacks ← <b>poll</b> (I/O) ← <b>check</b> (<code>setImmediate</code>) ← close callbacks. والـ <code>process.nextTick</code> ليه طابور لوحده بيتفضّى <b>قبل</b> الـ promise microtasks. ومن Node 11، الـ microtasks بتشتغل بعد كل timer أو immediate لوحده، زي المتصفحات. وفي أول مستوى في الـ main script، ترتيب <code>setTimeout(0)</code> و <code>setImmediate</code> مش مضمون؛ لكن جوه callback بتاع I/O أو timer، الـ <code>setImmediate</code> بيشتغل الأول."
        },
        code: "setTimeout(() => {\n  process.nextTick(() => console.log(\"nextTick\"));\n  Promise.resolve().then(() => console.log(\"promise\"));\n  setImmediate(() => console.log(\"immediate\"));\n  setTimeout(() => console.log(\"timeout\"), 0);\n}, 0);",
        out: "nextTick\npromise\nimmediate\ntimeout",
        run: "node"
      }
    ],
    breaks: [
      {
        title: { en: "Microtask starvation: a frozen tab with no error", ar: "الـ microtasks اللي مبتخلصش: تاب مهنّجة من غير أي error" },
        body: {
          en: "Because the checkpoint drains until the queue is empty, a microtask that keeps scheduling microtasks never lets the loop move on: no render, no clicks. The same recursion with a <b>task</b> keeps the page alive, because each turn can render and handle input.",
          ar: "علشان الـ microtasks بتتفضّى لحد ما الطابور يخلص، أي microtask بتعمل microtask تانية مش هتسيب الـ loop يكمل: لا رسم ولا clicks. ونفس الـ recursion بـ <b>task</b> بتسيب الصفحة شغالة، لأن كل لفة ممكن ترسم وتستقبل input."
        },
        code: "function spin() { queueMicrotask(spin); }  // freezes the tab\nfunction tick() { setTimeout(tick, 0); }   // page stays usable",
        run: "browser",
        fix: {
          en: "Repeat work with tasks (<code>setTimeout</code>, <code>MessageChannel</code>, <code>scheduler.postTask</code>), never with a self-feeding promise chain.",
          ar: "كرّر الشغل بـ tasks (<code>setTimeout</code>، <code>MessageChannel</code>، <code>scheduler.postTask</code>)، ومتعملش سلسلة promises بتغذّي نفسها."
        }
      },
      {
        title: { en: "Long tasks and INP — and the “yield” that doesn't yield", ar: "الـ Long tasks والـ INP — والـ «yield» اللي مش بيعمل yield" },
        body: {
          en: "Any task over <b>50 ms</b> is a long task; input that arrives during it waits. That delay is what <b>INP</b> (a Core Web Vital since March 2024, good ≤ 200 ms) measures. A common mistake: <code>await Promise.resolve()</code> inside a loop to “let the UI breathe”. It's a microtask, so the browser still can't render or handle input until the whole loop ends. You need a real task.",
          ar: "أي task أطول من <b>50ms</b> اسمها long task؛ وأي input ييجي وهي شغالة بيستنى. والتأخير ده هو اللي الـ <b>INP</b> بيقيسه (Core Web Vital من مارس 2024، والكويس ≤ 200ms). غلطة شائعة: <code>await Promise.resolve()</code> جوه loop علشان «الـ UI يتنفس». دي microtask، فالمتصفح برضه مش هيقدر يرسم أو يستقبل input لحد ما الـ loop كله يخلص. محتاج task حقيقية."
        },
        code: "async function processAll(rows) {\n  for (let i = 0; i < rows.length; i++) {\n    handle(rows[i]);\n    if (i % 500 === 0) await yieldToMain();   // let input and paint in\n  }\n}\nfunction yieldToMain() {\n  if (globalThis.scheduler?.yield) return scheduler.yield(); // keeps priority\n  return new Promise((resolve) => setTimeout(resolve, 0));   // a real task\n}",
        run: "browser",
        fix: {
          en: "Measure first (Performance panel: tasks with a red corner). Then: do less (virtualize, paginate), chunk and yield with a task, move pure CPU work to a Web Worker, or in React mark the slow update as non-urgent with <code>startTransition</code> / <code>useDeferredValue</code>.",
          ar: "قيس الأول (Performance panel: الـ tasks اللي في ركنها أحمر). وبعدين: قلّل الشغل (virtualize، pagination)، قسّمه واعمل yield بـ task، انقل الحسابات التقيلة لـ Web Worker، أو في React علّم التحديث البطيء إنه مش مستعجل بـ <code>startTransition</code> / <code>useDeferredValue</code>."
        }
      },
      {
        title: { en: "Timers lie about time", ar: "الـ timers مش بتقول الوقت الصح" },
        body: {
          en: "<code>setTimeout(fn, 0)</code> is clamped to ≥ 4 ms after 5 nested levels, throttled to ≥ 1 s in background tabs, and Chrome can batch chained timers to once a minute in tabs hidden for 5+ minutes. A countdown that does <code>seconds--</code> every 1000 ms drifts and jumps.",
          ar: "الـ <code>setTimeout(fn, 0)</code> بيتحط له حد أدنى ≥ 4ms بعد 5 مستويات متداخلة، وبيتبطّأ لـ ≥ 1 ثانية في التابات اللي في الخلفية، و Chrome ممكن يجمّع الـ timers المتسلسلة لمرة كل دقيقة في تاب مستخبية بقالها 5 دقايق أو أكتر. فالـ countdown اللي بيعمل <code>seconds--</code> كل 1000ms بيتأخر ويقفز."
        },
        code: "// Wrong: counts ticks\nsetInterval(() => setLeft((s) => s - 1), 1000);\n\n// Right: derives from the clock\nconst end = Date.now() + 60_000;\nsetInterval(() => setLeft(Math.max(0, Math.round((end - Date.now()) / 1000))), 250);",
        run: "browser",
        fix: {
          en: "Derive time from a clock (<code>Date.now()</code> / <code>performance.now()</code>), use <code>requestAnimationFrame</code> for visuals, and re-sync on <code>visibilitychange</code>.",
          ar: "احسب الوقت من ساعة (<code>Date.now()</code> / <code>performance.now()</code>)، واستخدم <code>requestAnimationFrame</code> لأي حاجة مرئية، واعمل re-sync عند <code>visibilitychange</code>."
        }
      },
      {
        title: { en: "async inside forEach doesn't wait", ar: "الـ async جوه forEach مش بيستنى" },
        body: {
          en: "<code>forEach</code> ignores the promises its callback returns, so the code after it runs first, and a rejection inside becomes an unhandled rejection that no outer <code>try/catch</code> sees.",
          ar: "الـ <code>forEach</code> بيتجاهل الـ promises اللي الـ callback بيرجّعها، فالكود اللي بعده بيشتغل الأول، وأي rejection جوه بيبقى unhandled rejection ومفيش <code>try/catch</code> برّه هيشوفه."
        },
        code: "const save = (id) => new Promise((resolve) => setTimeout(() => { console.log(\"saved \" + id); resolve(); }, 0));\n[1, 2, 3].forEach(async (id) => { await save(id); });\nconsole.log(\"done\");",
        out: "done\nsaved 1\nsaved 2\nsaved 3",
        run: "node",
        fix: {
          en: "In order: <code>for (const id of ids) await save(id)</code>. In parallel: <code>await Promise.all(ids.map(save))</code>. For hundreds of items: limit concurrency (a small pool).",
          ar: "بالترتيب: <code>for (const id of ids) await save(id)</code>. مع بعض: <code>await Promise.all(ids.map(save))</code>. ولو مئات: حدّد عدد اللي شغالين في نفس الوقت (pool صغير)."
        }
      }
    ],
    levels: [
      {
        q: "Explain the event loop.",
        mid: {
          en: "JS is single-threaded. Sync code runs on the call stack; async callbacks wait in queues. When the stack is empty, all microtasks (promises) run first, then one macrotask like <code>setTimeout</code>. That's why promises print before timeouts.",
          ar: "الـ JS بيشتغل على thread واحد. الكود الـ sync على الـ call stack، والـ callbacks الـ async مستنية في طوابير. لما الـ stack يفضى، كل الـ microtasks (promises) بتشتغل الأول، وبعدين macrotask واحدة زي <code>setTimeout</code>. وعلشان كده الـ promises بتطبع قبل الـ timeouts."
        },
        senior: {
          en: "I separate engine and host: V8 runs the stack, the browser's event loop decides what runs next. Each turn takes one task from one of several queues — the browser may prioritise input — then a microtask checkpoint, which also happens whenever the stack empties between callbacks. At most once per frame come the rendering steps: rAF, style, layout, paint. What I care about in practice: anything holding the stack over 50 ms delays input and hurts INP, so I measure long tasks and either do less, chunk with real yields, or move work to a worker. Node is the same model with libuv phases and <code>process.nextTick</code>.",
          ar: "بفصل بين الـ engine والـ host: الـ V8 بيشغّل الـ stack، والـ event loop بتاع المتصفح بيقرر إيه اللي يشتغل بعد كده. كل لفة بتاخد task واحدة من طابور من طوابير كتير — والمتصفح ممكن يدي أولوية للـ input — وبعدين بيفضّي الـ microtasks، وده بيحصل كمان كل ما الـ stack يفضى بين الـ callbacks. ومرة على الأكتر كل frame بتيجي خطوات الرسم: rAF، style، layout، paint. اللي يهمني عمليًا: أي حاجة ماسكة الـ stack أكتر من 50ms بتأخر الـ input وبتبوّظ الـ INP، فبقيس الـ long tasks وإما أقلل الشغل، أو أقسمه بـ yield حقيقي، أو أنقله لـ worker. و Node نفس الفكرة بـ phases الـ libuv و <code>process.nextTick</code>."
        }
      },
      {
        q: "setTimeout(fn, 0) — when does fn run?",
        mid: {
          en: "After the current code and all promise callbacks — it goes to the macrotask queue.",
          ar: "بعد الكود الحالي وكل الـ promise callbacks — لأنه بيروح طابور الـ macrotasks."
        },
        senior: {
          en: "Not before the current task and all its microtasks. Then it's a task from the timer source, so it can still wait behind input, other tasks and a render. It's clamped to 4 ms when nested and throttled in hidden tabs, so I never count timer ticks to measure time — I derive it from <code>performance.now()</code> — and for “after the next paint” I use rAF followed by a task, not a 0 ms timer.",
          ar: "مش قبل ما الـ task الحالية وكل الـ microtasks بتاعتها يخلصوا. وبعدين هو task من الـ timer source، فممكن يستنى ورا input أو tasks تانية أو رسم. وليه حد أدنى 4ms لما يتداخل، وبيتبطّأ في التابات المستخبية، فعمري ما بعدّ ticks الـ timer علشان أقيس وقت — بحسبه من <code>performance.now()</code> — ولو عايز «بعد الرسم الجاي» بستخدم rAF وبعده task، مش timer بـ 0ms."
        }
      },
      {
        q: "The page freezes while filtering 50,000 rows. What do you do?",
        mid: {
          en: "Move the filtering to a Web Worker, or debounce the input.",
          ar: "أنقل الـ filtering لـ Web Worker، أو أعمل debounce للـ input."
        },
        senior: {
          en: "Measure first: is the long task the filter (JS) or rendering thousands of DOM nodes? Usually it's rendering, so I virtualize the list. If the filter itself is slow, I keep typing urgent and the results non-urgent (<code>useDeferredValue</code> / <code>startTransition</code>), chunk with <code>scheduler.yield</code>, or move it to a worker — keeping the data inside the worker so I don't pay structured-clone cost on every keystroke. Then I confirm with the Performance panel and INP from real users.",
          ar: "أقيس الأول: الـ long task دي هي الـ filter (JS) ولا رسم آلاف الـ DOM nodes؟ غالبًا الرسم، فبعمل virtualization للـ list. ولو الـ filter نفسه بطيء، بخلي الكتابة urgent والنتايج مش مستعجلة (<code>useDeferredValue</code> / <code>startTransition</code>)، أو أقسمه بـ <code>scheduler.yield</code>، أو أنقله لـ worker — والداتا تفضل جوه الـ worker علشان مدفعش تمن الـ structured clone مع كل حرف. وبعدين أتأكد بالـ Performance panel وبالـ INP من اليوزرز الحقيقيين."
        }
      }
    ],
    drill: [
      {
        q: "Promise.then or setTimeout 0 — which runs first?",
        a: { en: "<code>then</code>: it's a microtask, and microtasks drain before the loop takes the next task.", ar: "<code>then</code>: لأنه microtask، والـ microtasks بتتفضّى قبل ما الـ loop ياخد الـ task اللي بعدها." },
        follow: [
          {
            q: "Why do microtasks get that priority?",
            a: { en: "Promise reactions must run as soon as the current JS finishes, so the program's state is consistent before anything else — a render, an input handler — can observe it. Tasks are “later”; microtasks are “right after this”.", ar: "ردود الـ promises لازم تشتغل أول ما الـ JS الحالي يخلص، علشان حالة البرنامج تبقى مظبوطة قبل ما أي حاجة تانية — رسم أو input handler — تشوفها. الـ tasks معناها «بعدين»؛ والـ microtasks معناها «بعد ده على طول»." },
            follow: [
              {
                q: "Then what if a microtask keeps adding microtasks?",
                a: { en: "The checkpoint drains until empty, so it never ends: no render, no input — a frozen tab with no error. Same effect as an infinite sync loop, but harder to spot in a stack trace.", ar: "التفضية بتكمل لحد ما الطابور يخلص، فمش هتخلص أبدًا: لا رسم ولا input — تاب مهنّجة من غير error. نفس تأثير loop sync مالوش آخر، بس أصعب تلاقيه في الـ stack trace." },
                follow: [
                  {
                    q: "How would you find that in production?",
                    a: { en: "Field data: INP attribution from <code>web-vitals</code> and the Long Animation Frames API, which names the scripts behind a slow frame. Locally: one huge task in the Performance panel full of “Run microtasks”. Fix: break the chain with a task.", ar: "من اليوزرز: الـ INP attribution من <code>web-vitals</code> والـ Long Animation Frames API اللي بيقولك أنهي scripts ورا الـ frame البطيء. على جهازك: task واحدة ضخمة في الـ Performance panel مليانة «Run microtasks». الحل: اكسر السلسلة بـ task." }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        q: "Does await block the thread?",
        a: { en: "No. It suspends only that async function; the caller keeps running, and the rest of the function resumes later as a microtask.", ar: "لأ. بيوقف الـ async function دي بس؛ واللي نادى عليها بيكمل، وباقي الـ function بيرجع يكمل بعدين كـ microtask." },
        follow: [
          {
            q: "So is await Promise.resolve() a good way to let the UI breathe?",
            a: { en: "No — the continuation is a microtask, so the browser can't render or handle input until the whole chain is done. You need a task: <code>scheduler.yield()</code>, <code>setTimeout</code> or a <code>MessageChannel</code> message.", ar: "لأ — اللي بعده microtask، فالمتصفح مش هيقدر يرسم أو يستقبل input لحد ما السلسلة كلها تخلص. محتاج task: <code>scheduler.yield()</code> أو <code>setTimeout</code> أو رسالة <code>MessageChannel</code>." },
            follow: [
              {
                q: "Why does React's scheduler use MessageChannel instead of setTimeout(0)?",
                a: { en: "A <code>MessageChannel</code> message is a task without the 4 ms nesting clamp. React works in slices of about 5 ms, yields to the browser so it can paint and handle input, then continues almost immediately.", ar: "رسالة الـ <code>MessageChannel</code> task من غير الحد الأدنى بتاع الـ 4ms. و React بيشتغل في حتت حوالي 5ms، ويسيب المتصفح يرسم ويستقبل input، وبعدين يكمل على طول تقريبًا." }
              }
            ]
          }
        ]
      }
    ],
    story: {
      text: {
        en: "AHS formula editor: clicking a variable inserts it at the cursor of a controlled textarea. The new value reaches the DOM only after React re-renders, so restoring the cursor has to be scheduled after that commit — the handbook's sketch does it in the next frame with <code>requestAnimationFrame</code>.",
        ar: "الـ formula editor في AHS: لما تدوس على متغير بيتحط مكان الـ cursor في textarea متحكَّم فيها. القيمة الجديدة مش بتوصل للـ DOM غير بعد ما React يعمل re-render، فرجوع الـ cursor لازم يتعمل بعد الـ commit ده — والـ sketch في دليل المشاريع بيعمله في الـ frame اللي بعده بـ <code>requestAnimationFrame</code>."
      },
      p: "ahs", tab: "how", label: "AHS"
    },
    sources: [
      { label: "HTML Standard — Event loops", url: "https://html.spec.whatwg.org/multipage/webappapis.html#event-loops" },
      { label: "Jake Archibald — Tasks, microtasks, queues and schedules", url: "https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/" },
      { label: "MDN — In depth: microtasks and the JavaScript runtime", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth" },
      { label: "V8 — Faster async functions and promises", url: "https://v8.dev/blog/fast-async" },
      { label: "Node.js — The event loop, timers and process.nextTick()", url: "https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick" },
      { label: "web.dev — Optimize long tasks", url: "https://web.dev/articles/optimize-long-tasks" }
    ]
  },

  types: {
    why: {
      en: "Coercion questions look like trivia, but the follow-ups are about real bugs: money that drifts by a piaster, IDs that change after JSON, <code>0</code> treated as “missing”. A senior answer explains the algorithm, then the rule you follow in code.",
      ar: "أسئلة الـ coercion شكلها حفظ، لكن الأسئلة اللي بعدها بتبقى عن bugs حقيقية: فلوس بتفرق قرش، IDs بتتغير بعد JSON، و <code>0</code> بيتعامل على إنه «مفيش». إجابة الـ Senior بتشرح الـ algorithm، وبعدين القاعدة اللي بتمشي عليها في الكود."
    },
    how: [
      {
        title: { en: "Seven primitives, one object type — and typeof's old bugs", ar: "سبع primitives ونوع object واحد — وأخطاء typeof القديمة" },
        body: {
          en: "Primitives: string, number, bigint, boolean, undefined, symbol, null. Everything else is an object (arrays and functions too). <code>typeof null</code> is <code>\"object\"</code> because of how the first engine tagged values; fixing it would break the web. <code>typeof</code> on an undeclared name returns <code>\"undefined\"</code> instead of throwing.",
          ar: "الـ primitives: string و number و bigint و boolean و undefined و symbol و null. وأي حاجة تانية object (حتى الـ arrays والـ functions). <code>typeof null</code> بيرجع <code>\"object\"</code> بسبب طريقة أول engine في تعليم القيم؛ ولو اتصلح هيكسر مواقع كتير. و <code>typeof</code> على اسم مش متعرّف بيرجع <code>\"undefined\"</code> بدل ما يرمي error."
        },
        code: "console.log(typeof null, typeof (() => {}), typeof notDeclared, typeof 10n, typeof Symbol());",
        out: "object function undefined bigint symbol",
        run: "node"
      },
      {
        title: { en: "Objects become primitives through ToPrimitive", ar: "الـ objects بتتحول لـ primitives عن طريق ToPrimitive" },
        body: {
          en: "When an operator needs a primitive, the engine calls <code>[Symbol.toPrimitive]</code> if it exists, otherwise <code>valueOf</code> then <code>toString</code> (for the “number”/“default” hint) or <code>toString</code> first (for the “string” hint, e.g. template literals). Arrays' <code>valueOf</code> returns the array itself, so they fall through to <code>toString</code> — that's where <code>[] + {}</code> comes from.",
          ar: "لما operator يحتاج primitive، الـ engine بينادي <code>[Symbol.toPrimitive]</code> لو موجود، وإلا <code>valueOf</code> وبعدين <code>toString</code> (للـ hint «number» أو «default») أو <code>toString</code> الأول (للـ hint «string»، زي الـ template literals). والـ <code>valueOf</code> بتاع الـ array بيرجّع الـ array نفسه، فبيكمل لـ <code>toString</code> — ومن هنا بييجي <code>[] + {}</code>."
        },
        code: "const price = { valueOf() { return 42; }, toString() { return \"price\"; } };\nconsole.log(price + 1);      // \"default\" hint → valueOf first\nconsole.log(`${price}`);     // \"string\" hint → toString first\nconsole.log([] + {});\nconsole.log([1, 2] + [3]);",
        out: "43\nprice\n[object Object]\n1,23",
        run: "node"
      },
      {
        title: { en: "== is an algorithm with a few fixed rules", ar: "الـ == عبارة عن algorithm بقواعد ثابتة" },
        body: {
          en: "<code>null</code> and <code>undefined</code> are loosely equal only to each other. A boolean is turned into a number <b>first</b> (so <code>\"2\" == true</code> is false). Number vs string → the string becomes a number. Object vs primitive → ToPrimitive. NaN equals nothing. Relational operators (<code>&lt;</code>, <code>&gt;=</code>) don't have the null rule, which gives the famous <code>null &gt;= 0</code> → true.",
          ar: "الـ <code>null</code> والـ <code>undefined</code> بيساووا بعض بـ == بس، ومحدش غيرهم. الـ boolean بيتحول لـ number <b>الأول</b> (فـ <code>\"2\" == true</code> بـ false). number قصاد string ← الـ string بيبقى number. object قصاد primitive ← ToPrimitive. والـ NaN مش بيساوي أي حاجة. وعلامات المقارنة (<code>&lt;</code>، <code>&gt;=</code>) معندهاش قاعدة الـ null، ومن هنا <code>null &gt;= 0</code> ← true المشهورة."
        },
        code: "console.log(null == 0, null >= 0, undefined == 0);\nconsole.log(\"2\" == true, \"1\" == true);\nconsole.log([] == ![]);\nconsole.log(NaN === NaN, Object.is(NaN, NaN), Object.is(0, -0));",
        out: "false true false\nfalse true\ntrue\nfalse true false",
        run: "node"
      },
      {
        title: { en: "Numbers are 64-bit doubles", ar: "الأرقام doubles بـ 64 bit" },
        body: {
          en: "Every <code>number</code> is an IEEE-754 double: 0.1 has no exact binary form, and integers are exact only up to <code>Number.MAX_SAFE_INTEGER</code> (2<sup>53</sup> − 1). Past that, different integers share one value — dangerous for 64-bit IDs coming from a backend. <code>bigint</code> is exact for any integer size but doesn't mix with <code>number</code> without an explicit conversion.",
          ar: "كل <code>number</code> عبارة عن IEEE-754 double: الـ 0.1 ملهاش شكل binary مظبوط، والأعداد الصحيحة مظبوطة لحد <code>Number.MAX_SAFE_INTEGER</code> بس (2<sup>53</sup> − 1). بعد كده أعداد مختلفة بتبقى نفس القيمة — وده خطر على IDs بـ 64 bit جاية من الـ backend. والـ <code>bigint</code> مظبوط لأي حجم عدد صحيح، بس مش بيتخلط مع <code>number</code> من غير تحويل صريح."
        },
        code: "console.log(0.1 + 0.2 === 0.3, (0.1 + 0.2).toFixed(2));\nconsole.log(9007199254740993 === 9007199254740992);\nconsole.log(2n ** 64n);",
        out: "false 0.30\ntrue\n18446744073709551616n",
        run: "node"
      }
    ],
    breaks: [
      {
        title: { en: "Money in floats, and toFixed as a “fix”", ar: "الفلوس في floats، و toFixed كـ «حل»" },
        body: {
          en: "<code>toFixed</code> and <code>Math.round(x * 100) / 100</code> round a binary value that is already slightly off, so 1.005 becomes 1.00. In billing, those piasters add up across thousands of invoice lines.",
          ar: "الـ <code>toFixed</code> و <code>Math.round(x * 100) / 100</code> بيقرّبوا قيمة binary أصلًا مش مظبوطة بالظبط، فـ 1.005 بتبقى 1.00. وفي الـ billing القروش دي بتتجمع على آلاف السطور في الفواتير."
        },
        code: "console.log(1.005 * 100, Math.round(1.005 * 100) / 100, (1.005).toFixed(2));",
        out: "100.49999999999999 1 1.00",
        run: "node",
        fix: {
          en: "Store and compute money in minor units (integers) or as decimal strings with a decimal library; round <b>once</b>, at the end, with a stated business rule; format for display with <code>Intl.NumberFormat</code>.",
          ar: "خزّن واحسب الفلوس بأصغر وحدة (أعداد صحيحة) أو كـ decimal strings بمكتبة decimal؛ وقرّب <b>مرة واحدة</b> في الآخر بقاعدة business واضحة؛ واعرضها بـ <code>Intl.NumberFormat</code>."
        }
      },
      {
        title: { en: "JSON silently changes types", ar: "الـ JSON بيغيّر الأنواع من غير ما يقول" },
        body: {
          en: "Dates become strings, <code>undefined</code> keys disappear, <code>NaN</code> becomes <code>null</code>, a <code>Map</code> becomes <code>{}</code>, and a <code>bigint</code> throws. Data that went through an API or <code>localStorage</code> is not the data you put in.",
          ar: "الـ Dates بتبقى strings، والـ keys اللي قيمتها <code>undefined</code> بتختفي، و <code>NaN</code> بيبقى <code>null</code>، و <code>Map</code> بيبقى <code>{}</code>، و <code>bigint</code> بيرمي error. الداتا اللي عدّت على API أو <code>localStorage</code> مش هي نفس الداتا اللي حطيتها."
        },
        code: "console.log(JSON.stringify({ d: new Date(0), u: undefined, n: NaN, m: new Map([[1, 2]]) }));",
        out: "{\"d\":\"1970-01-01T00:00:00.000Z\",\"n\":null,\"m\":{}}",
        run: "node",
        fix: {
          en: "Parse at the boundary with a schema (e.g. zod) that turns strings back into Dates and rejects bad shapes; keep 64-bit IDs as strings; use <code>structuredClone</code> for in-memory copies.",
          ar: "اعمل parse عند الحدود بـ schema (زي zod) ترجّع الـ strings لـ Dates وترفض الأشكال الغلط؛ وخلي الـ IDs اللي بـ 64 bit strings؛ واستخدم <code>structuredClone</code> للنسخ جوه الذاكرة."
        }
      },
      {
        title: { en: "0 and \"\" treated as missing", ar: "الـ 0 والـ \"\" بيتعاملوا على إنهم «مفيش»" },
        body: {
          en: "<code>||</code> replaces every falsy value, so a quantity of 0 or an empty search becomes the default. The same bug hides in <code>if (count)</code> and in JSX: <code>{count &amp;&amp; &lt;Badge/&gt;}</code> renders a literal 0.",
          ar: "الـ <code>||</code> بيبدّل أي قيمة falsy، فكمية 0 أو search فاضي بيبقى الـ default. ونفس الـ bug مستخبي في <code>if (count)</code> وفي الـ JSX: <code>{count &amp;&amp; &lt;Badge/&gt;}</code> بيطبع 0 على الشاشة."
        },
        code: "const qty = 0;\nconsole.log(qty || 10, qty ?? 10);",
        out: "10 0",
        run: "node",
        fix: {
          en: "Use <code>??</code> for defaults, compare explicitly (<code>count &gt; 0</code>, <code>x == null</code>), and in JSX turn conditions into booleans.",
          ar: "استخدم <code>??</code> للـ defaults، وقارن صراحة (<code>count &gt; 0</code>، <code>x == null</code>)، وفي الـ JSX حوّل الشرط لـ boolean."
        }
      },
      {
        title: { en: "map(parseInt)", ar: "map(parseInt)" },
        body: {
          en: "<code>map</code> passes <code>(value, index, array)</code>, and <code>parseInt</code>'s second parameter is the radix — so the index becomes the base.",
          ar: "الـ <code>map</code> بيبعت <code>(value, index, array)</code>، والـ parameter التاني في <code>parseInt</code> هو الـ radix — فالـ index بيبقى الأساس."
        },
        code: "console.log([\"1\", \"2\", \"3\"].map(parseInt).join(), [\"1\", \"2\", \"3\"].map(Number).join());",
        out: "1,NaN,NaN 1,2,3",
        run: "node",
        fix: {
          en: "Use <code>Number(s)</code> for whole strings, or <code>(s) =&gt; parseInt(s, 10)</code> when you really want to parse a prefix.",
          ar: "استخدم <code>Number(s)</code> للـ strings الكاملة، أو <code>(s) =&gt; parseInt(s, 10)</code> لو فعلًا عايز تقرا أول الـ string بس."
        }
      }
    ],
    levels: [
      {
        q: "== vs ===?",
        mid: { en: "<code>===</code> compares without converting types; <code>==</code> converts first, so I always use <code>===</code>.", ar: "الـ <code>===</code> بيقارن من غير تحويل؛ والـ <code>==</code> بيحوّل الأول، فأنا دايمًا بستخدم <code>===</code>." },
        senior: {
          en: "<code>===</code> is strict equality: no conversion, NaN isn't equal to itself, +0 equals −0. <code>==</code> runs the loose-equality algorithm: null and undefined only match each other, booleans become numbers first, objects go through ToPrimitive. I default to <code>===</code> and allow one idiom, <code>x == null</code>, to catch both null and undefined. And I remember there are two more comparisons: <code>Object.is</code> (React's state, props and deps) and SameValueZero (<code>Map</code> keys, <code>includes</code>) — they differ on NaN and −0.",
          ar: "الـ <code>===</code> مساواة strict: من غير تحويل، والـ NaN مش بيساوي نفسه، و +0 بيساوي −0. الـ <code>==</code> بيشغّل algorithm الـ loose equality: الـ null والـ undefined بيساووا بعض بس، والـ booleans بتبقى أرقام الأول، والـ objects بتعدي على ToPrimitive. أنا بستخدم <code>===</code> دايمًا ماعدا حالة واحدة، <code>x == null</code>، علشان تمسك الـ null والـ undefined مع بعض. وفاكر إن فيه مقارنتين كمان: <code>Object.is</code> (اللي React بيستخدمها للـ state والـ props والـ deps) و SameValueZero (keys الـ <code>Map</code> و <code>includes</code>) — والفرق بينهم في الـ NaN والـ −0."
        }
      },
      {
        q: "Why is 0.1 + 0.2 !== 0.3, and how do you handle money?",
        mid: { en: "Floating-point precision. I round with <code>toFixed(2)</code>.", ar: "دقة الـ floating point. بقرّب بـ <code>toFixed(2)</code>." },
        senior: {
          en: "Numbers are binary doubles, and 0.1 has no exact binary form, so the sum is off in the last bits. <code>toFixed</code> is for display and itself rounds the binary value (1.005 → \"1.00\"). For money I keep minor units as integers or decimal strings, compute with a decimal library, round once with an agreed rule, and format with <code>Intl.NumberFormat</code>. Above 2<sup>53</sup> — IDs, big counters — I use strings or <code>bigint</code>.",
          ar: "الأرقام doubles بالـ binary، والـ 0.1 ملهاش شكل binary مظبوط، فالمجموع بيفرق في آخر bits. و <code>toFixed</code> للعرض بس، وهو نفسه بيقرّب القيمة الـ binary (1.005 ← \"1.00\"). للفلوس بخزّن أصغر وحدة كأعداد صحيحة أو decimal strings، وبحسب بمكتبة decimal، وبقرّب مرة واحدة بقاعدة متفق عليها، وبعرض بـ <code>Intl.NumberFormat</code>. وفوق 2<sup>53</sup> — IDs أو عدادات كبيرة — بستخدم strings أو <code>bigint</code>."
        }
      }
    ],
    drill: [
      {
        q: "What does typeof null return?",
        a: { en: "<code>\"object\"</code>.", ar: "<code>\"object\"</code>." },
        follow: [
          {
            q: "Why?",
            a: { en: "The first implementation stored a type tag with each value; objects had tag 0, and null was the null pointer — all zeros — so it read as an object. Changing it later would break existing sites.", ar: "أول implementation كان بيخزن type tag مع كل قيمة؛ الـ objects كان الـ tag بتاعها 0، والـ null كان الـ null pointer — كله أصفار — فاتقرا كأنه object. وتغييره بعد كده كان هيكسر مواقع موجودة." },
            follow: [
              {
                q: "So how do you check for a plain object safely?",
                a: { en: "<code>x !== null &amp;&amp; typeof x === \"object\" &amp;&amp; !Array.isArray(x)</code>; for “plain” specifically, check that <code>Object.getPrototypeOf(x)</code> is <code>Object.prototype</code> or <code>null</code>. Better: validate the shape with a schema at the boundary.", ar: "<code>x !== null &amp;&amp; typeof x === \"object\" &amp;&amp; !Array.isArray(x)</code>؛ ولو عايز «plain» بالظبط، اتأكد إن <code>Object.getPrototypeOf(x)</code> هو <code>Object.prototype</code> أو <code>null</code>. والأحسن: اعمل validate للشكل بـ schema عند الحدود." }
              }
            ]
          }
        ]
      },
      {
        q: "Is [] truthy?",
        a: { en: "Yes — every object is truthy, even empty arrays and <code>new Boolean(false)</code>.", ar: "أيوه — أي object truthy، حتى الـ arrays الفاضية و <code>new Boolean(false)</code>." },
        follow: [
          {
            q: "Then why is [] == false true?",
            a: { en: "<code>==</code> doesn't check truthiness. false → 0, then [] → ToPrimitive → \"\" → 0, and 0 == 0. Truthiness and loose equality are different rules.", ar: "الـ <code>==</code> مش بيبص على الـ truthiness. الـ false ← 0، وبعدين [] ← ToPrimitive ← \"\" ← 0، و 0 == 0. الـ truthiness والـ loose equality قواعد مختلفة." }
          }
        ]
      }
    ],
    story: {
      text: { en: "Bites invoices and the AHS billing formulas handle money: amounts must avoid float drift, and AHS also checks for non-finite results.", ar: "فواتير Bites و formulas الـ billing في AHS بيتعاملوا مع فلوس: لازم المبالغ متتأثرش بأخطاء الـ float، و AHS كمان بيتأكد إن النتيجة مش non-finite." },
      p: "ahs", tab: "decisions", label: "AHS"
    },
    sources: [
      { label: "MDN — Equality comparisons and sameness", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness" },
      { label: "ECMAScript spec — IsLooselyEqual", url: "https://tc39.es/ecma262/#sec-islooselyequal" },
      { label: "MDN — JavaScript data types and data structures", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures" },
      { label: "MDN — Number.MAX_SAFE_INTEGER", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER" }
    ]
  },

  hoisting: {
    why: {
      en: "“What is hoisting?” is a warm-up. The real test is whether you know that nothing moves, what the TDZ is for, and why a circular import crashes with “Cannot access before initialization”.",
      ar: "«يعني إيه hoisting؟» سؤال تسخين. الاختبار الحقيقي إنك تعرف إن مفيش حاجة بتتنقل، والـ TDZ موجودة ليه، وليه الـ circular import بيقع بـ «Cannot access before initialization»."
    },
    how: [
      {
        title: { en: "Nothing moves: bindings are created before the code runs", ar: "مفيش حاجة بتتنقل: الـ bindings بتتعمل قبل ما الكود يشتغل" },
        body: {
          en: "Before a scope runs, the engine creates all its bindings. <code>var</code> starts as <code>undefined</code>, a function declaration starts as the whole function, and <code>let</code>/<code>const</code>/<code>class</code> are created <b>uninitialised</b>. Reading them before their line runs throws — that window is the Temporal Dead Zone.",
          ar: "قبل ما الـ scope يشتغل، الـ engine بيعمل كل الـ bindings بتاعته. الـ <code>var</code> بيبدأ بـ <code>undefined</code>، والـ function declaration بيبدأ بالـ function كلها، و <code>let</code>/<code>const</code>/<code>class</code> بيتعملوا <b>من غير قيمة</b>. ولو قريتهم قبل سطرهم يرمي error — والفترة دي اسمها الـ Temporal Dead Zone."
        },
        code: "console.log(a);\nconsole.log(f());\nvar a = 1;\nfunction f() { return \"f works\"; }\ntry { console.log(b); } catch (e) { console.log(e.name); }\nlet b = 2;",
        out: "undefined\nf works\nReferenceError",
        run: "node"
      },
      {
        title: { en: "The TDZ is about time, not position", ar: "الـ TDZ متعلقة بالوقت، مش بمكان السطر" },
        body: {
          en: "A function may mention a <code>let</code> declared below it. What matters is <b>when</b> it runs: before the declaration executes it throws, after it works.",
          ar: "ينفع function تستخدم <code>let</code> متعرّف تحتها. المهم <b>إمتى</b> بتشتغل: قبل ما سطر التعريف يتنفذ بترمي error، وبعده بتشتغل عادي."
        },
        code: "function read() { return x; }\ntry { read(); } catch (e) { console.log(\"too early:\", e.name); }\nlet x = 5;\nconsole.log(read());",
        out: "too early: ReferenceError\n5",
        run: "node"
      },
      {
        title: { en: "let in a loop creates a new binding every iteration", ar: "الـ let في الـ loop بيعمل binding جديد كل لفة" },
        body: {
          en: "<code>var</code> is function-scoped, so all closures in the loop share one <code>i</code>. <code>for (let …)</code> creates a fresh binding per iteration and copies the value forward — each closure keeps its own.",
          ar: "الـ <code>var</code> نطاقه الـ function كلها، فكل الـ closures في الـ loop بيشاركوا <code>i</code> واحد. لكن <code>for (let …)</code> بيعمل binding جديد كل لفة وبينقل القيمة — فكل closure بيحتفظ بتاعه."
        },
        code: "const fns = [];\nfor (var i = 0; i < 3; i++) fns.push(() => i);\nfor (let j = 0; j < 3; j++) fns.push(() => j);\nconsole.log(fns.map((f) => f()).join());",
        out: "3,3,3,0,1,2",
        run: "node"
      },
      {
        title: { en: "Function expressions hoist only the variable", ar: "الـ function expressions بيترفع منها المتغير بس" },
        body: {
          en: "<code>var g = function () {}</code> hoists <code>g</code> as <code>undefined</code>, so calling it early is a <code>TypeError</code> (“not a function”), not a <code>ReferenceError</code>. With <code>const</code> it would be a <code>ReferenceError</code> (TDZ). Only function <b>declarations</b> can be called before their line.",
          ar: "الـ <code>var g = function () {}</code> بيرفع <code>g</code> بقيمة <code>undefined</code>، فلو ناديتها بدري يبقى <code>TypeError</code> («not a function»)، مش <code>ReferenceError</code>. ولو بـ <code>const</code> يبقى <code>ReferenceError</code> (TDZ). الـ function <b>declarations</b> بس اللي ينفع تتنادى قبل سطرها."
        },
        code: "try { g(); } catch (e) { console.log(e.name + \": \" + e.message); }\nvar g = function () {};",
        out: "TypeError: g is not a function",
        run: "node"
      }
    ],
    breaks: [
      {
        title: { en: "var shadows the outer variable from the first line", ar: "الـ var بيغطي المتغير اللي برّه من أول سطر" },
        body: {
          en: "A <code>var</code> anywhere in a function — even in a block that never runs — creates a local binding for the whole function, hiding the outer one.",
          ar: "أي <code>var</code> في أي حتة جوه function — حتى في block عمره ما بيشتغل — بيعمل binding محلي للـ function كلها، ويغطي اللي برّه."
        },
        code: "var user = \"global\";\nfunction show() {\n  console.log(user);\n  if (false) { var user = \"local\"; }\n}\nshow();",
        out: "undefined",
        run: "node",
        fix: { en: "Use <code>let</code>/<code>const</code> and the <code>no-var</code> lint rule; keep declarations at the top of their block.", ar: "استخدم <code>let</code>/<code>const</code> وقاعدة الـ lint <code>no-var</code>؛ وخلي التعريفات في أول الـ block بتاعها." }
      },
      {
        title: { en: "typeof is not safe inside the TDZ", ar: "الـ typeof مش آمن جوه الـ TDZ" },
        body: {
          en: "<code>typeof</code> on an undeclared name returns \"undefined\", but on a <code>let</code> still in its TDZ it throws. Feature checks written as <code>typeof X</code> can crash after someone adds <code>let X</code> lower in the file.",
          ar: "الـ <code>typeof</code> على اسم مش متعرّف بيرجع \"undefined\"، لكن على <code>let</code> لسه في الـ TDZ بيرمي error. فأي check مكتوب <code>typeof X</code> ممكن يقع لو حد ضاف <code>let X</code> تحت في نفس الملف."
        },
        code: "try { typeof later; } catch (e) { console.log(e.name); }\nconsole.log(typeof neverDeclared);\nlet later = 1;",
        out: "ReferenceError\nundefined",
        run: "node",
        fix: { en: "Declare before use, and turn on <code>no-use-before-define</code>.", ar: "عرّف قبل ما تستخدم، وشغّل <code>no-use-before-define</code>." }
      },
      {
        title: { en: "Circular imports hit the TDZ", ar: "الـ circular imports بتقع في الـ TDZ" },
        body: {
          en: "ES module imports are live bindings to the exporter's variables. If A imports B and B imports A, one of them runs first and reads the other's <code>const</code> before it is initialised → “ReferenceError: Cannot access 'X' before initialization”. It often appears after adding an <code>index.ts</code> barrel that re-exports everything.",
          ar: "الـ imports في الـ ES modules عبارة عن live bindings لمتغيرات الملف اللي بيعمل export. لو A بيعمل import من B و B من A، واحد منهم هيشتغل الأول ويقرا <code>const</code> بتاع التاني قبل ما يتعرّف ← «ReferenceError: Cannot access 'X' before initialization». وغالبًا بتظهر بعد ما حد يضيف barrel <code>index.ts</code> بيعمل re-export لكل حاجة."
        },
        fix: { en: "Move the shared code into a third module, import directly instead of through barrels, read imported values inside functions (at call time), and add an import-cycle lint rule (<code>import/no-cycle</code>).", ar: "انقل الكود المشترك لملف تالت، واعمل import مباشر بدل الـ barrels، واقرا القيم المستوردة جوه functions (وقت النداء)، وضيف قاعدة lint للـ cycles (<code>import/no-cycle</code>)." }
      }
    ],
    levels: [
      {
        q: "What is hoisting?",
        mid: { en: "Declarations are moved to the top. <code>var</code> is <code>undefined</code> before its line; <code>let</code> and <code>const</code> can't be used before their declaration (TDZ).", ar: "التعريفات بتتنقل لفوق. الـ <code>var</code> بيبقى <code>undefined</code> قبل سطره؛ و <code>let</code> و <code>const</code> مينفعش يتستخدموا قبل تعريفهم (TDZ)." },
        senior: {
          en: "Nothing moves. Before a scope runs, the engine creates its bindings: <code>var</code> initialised to <code>undefined</code>, function declarations to the function, <code>let</code>/<code>const</code>/<code>class</code> left uninitialised until their line executes — the TDZ. The TDZ is about time, so a function that reads a later <code>let</code> works if it's called after it. Where I've seen it bite: circular ES module imports, because imports are live bindings to consts that may not be initialised yet.",
          ar: "مفيش حاجة بتتنقل. قبل ما الـ scope يشتغل، الـ engine بيعمل الـ bindings: الـ <code>var</code> بقيمة <code>undefined</code>، والـ function declarations بالـ function، و <code>let</code>/<code>const</code>/<code>class</code> من غير قيمة لحد ما سطرهم يتنفذ — ودي الـ TDZ. والـ TDZ متعلقة بالوقت، فالـ function اللي بتقرا <code>let</code> متعرّف بعدها بتشتغل لو اتنادت بعده. وفين بتعمل مشاكل: الـ circular imports في الـ ES modules، لأن الـ imports live bindings لـ consts ممكن تكون لسه متعرفتش."
        }
      },
      {
        q: "Why prefer const and let over var?",
        mid: { en: "Block scope, and you can't redeclare them.", ar: "نطاقهم الـ block، ومينفعش تعرّفهم تاني." },
        senior: {
          en: "Block scope; a fresh binding per loop iteration, so closures in loops behave; the TDZ turns use-before-init into a loud error instead of a silent <code>undefined</code>; top-level <code>let</code>/<code>const</code> don't become properties of <code>window</code>; and <code>const</code> tells the reader the binding never changes — not that the object is immutable.",
          ar: "نطاقهم الـ block؛ وفيه binding جديد كل لفة في الـ loop، فالـ closures جوه الـ loops بتشتغل صح؛ والـ TDZ بتحوّل الاستخدام قبل التعريف لـ error واضح بدل <code>undefined</code> ساكت؛ والـ <code>let</code>/<code>const</code> في أول مستوى مش بيبقوا properties على <code>window</code>؛ والـ <code>const</code> بيقول للي بيقرا إن الـ binding مش هيتغير — مش إن الـ object مش هيتغير."
        }
      }
    ],
    drill: [
      {
        q: "Is let hoisted?",
        a: { en: "Yes — the binding exists from the start of the block, but it's uninitialised until its line runs. That's the TDZ.", ar: "أيوه — الـ binding موجود من أول الـ block، بس من غير قيمة لحد ما سطره يتنفذ. ودي الـ TDZ." },
        follow: [
          {
            q: "How can you prove it's hoisted?",
            a: { en: "Shadowing: <code>let x = 1; { console.log(x); let x = 2; }</code> throws a ReferenceError instead of printing 1 — the inner <code>x</code> already exists in the block and hides the outer one.", ar: "بالـ shadowing: <code>let x = 1; { console.log(x); let x = 2; }</code> بيرمي ReferenceError بدل ما يطبع 1 — الـ <code>x</code> اللي جوه موجود من أول الـ block ومغطي اللي برّه." },
            follow: [
              {
                q: "Why did the language add the TDZ instead of giving undefined like var?",
                a: { en: "To catch use-before-init bugs, and to make <code>const</code> meaningful: a const readable as <code>undefined</code> before its assignment would have two values.", ar: "علشان يمسك bugs الاستخدام قبل التعريف، وعلشان الـ <code>const</code> يبقى ليه معنى: لو const ينفع يتقرا <code>undefined</code> قبل ما ياخد قيمته يبقى ليه قيمتين." }
              }
            ]
          }
        ]
      }
    ],
    sources: [
      { label: "MDN — Hoisting", url: "https://developer.mozilla.org/en-US/docs/Glossary/Hoisting" },
      { label: "MDN — let: temporal dead zone", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz" },
      { label: "MDN — var", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var" }
    ]
  },

  closures: {
    why: {
      en: "Every React interview reaches closures through stale state: “why does my interval always show 0?”. A senior answer connects the language rule (closures capture bindings) to React's rule (each render has its own bindings) and gives fixes with trade-offs.",
      ar: "كل إنترفيو React بيوصل للـ closures من باب الـ stale state: «ليه الـ interval بيطلع 0 على طول؟». إجابة الـ Senior بتربط قاعدة اللغة (الـ closures بتمسك bindings) بقاعدة React (كل render ليه bindings بتاعته) وبتدي حلول بمميزات وعيوب كل حل."
    },
    how: [
      {
        title: { en: "A function keeps a link to where it was created", ar: "الـ function بتحتفظ بلينك للمكان اللي اتعملت فيه" },
        body: {
          en: "Every function object stores a reference to the scope (lexical environment) it was created in. Lookups walk outward from there. That pair — function + environment — is the closure. Two functions created in the same call share the same variables.",
          ar: "كل function بتخزن reference للـ scope (الـ lexical environment) اللي اتعملت فيه. والبحث عن أي متغير بيمشي لبرّه من هناك. والاتنين دول مع بعض — الـ function والـ environment — هما الـ closure. واتنين functions اتعملوا في نفس النداء بيشاركوا نفس المتغيرات."
        },
        code: "function counter() {\n  let n = 0;\n  return { inc: () => ++n, get: () => n };\n}\nconst c = counter();\nc.inc(); c.inc();\nconsole.log(c.get());",
        out: "2",
        run: "node"
      },
      {
        title: { en: "Closures capture bindings, not values", ar: "الـ closures بتمسك الـ binding، مش القيمة" },
        body: {
          en: "The closure reads the variable when it runs, so it sees later assignments. “Stale” values happen when a <b>new</b> binding is created each time — exactly what React does on every render.",
          ar: "الـ closure بيقرا المتغير وقت ما يشتغل، فبيشوف أي قيمة اتحطت بعد كده. والقيم «القديمة» بتحصل لما يتعمل binding <b>جديد</b> كل مرة — ودي بالظبط اللي React بيعمله مع كل render."
        },
        code: "let msg = \"hi\";\nconst say = () => msg;\nmsg = \"bye\";\nconsole.log(say());",
        out: "bye",
        run: "node"
      },
      {
        title: { en: "Each React render is a new call with new bindings", ar: "كل render في React نداء جديد بـ bindings جديدة" },
        body: {
          en: "A component is a function React calls again on every render. <code>const [count]</code> is a new constant each time, and the handlers created in that render close over <b>that</b> render's value. An old handler kept by a timer or a subscription still sees the old render.",
          ar: "الـ component عبارة عن function بيناديها React تاني مع كل render. و <code>const [count]</code> constant جديد كل مرة، والـ handlers اللي اتعملت في الـ render ده بتمسك قيمة الـ render <b>ده</b>. ولو handler قديم محفوظ في timer أو subscription، هيفضل شايف الـ render القديم."
        },
        code: "function render(count) {\n  return () => console.log(\"clicked with\", count);\n}\nconst first = render(0);\nconst second = render(1);\nfirst(); second();",
        out: "clicked with 0\nclicked with 1",
        run: "node"
      },
      {
        title: { en: "The memory cost: one shared context per scope", ar: "تمن الذاكرة: context واحد مشترك لكل scope" },
        body: {
          en: "V8 keeps variables that inner functions capture in a context object, and <b>all</b> closures created in that scope share it. So a big array captured by one short-lived closure stays alive as long as any sibling closure (say, an event listener) is alive.",
          ar: "الـ V8 بيحط المتغيرات اللي الـ functions الداخلية بتمسكها في context object، و<b>كل</b> الـ closures اللي اتعملت في الـ scope ده بيشاركوه. فلو array كبير اتمسك في closure عمره قصير، هيفضل في الذاكرة طول ما أي closure تاني من نفس الـ scope (زي event listener) عايش."
        }
      }
    ],
    breaks: [
      {
        title: { en: "The interval that always sees 0", ar: "الـ interval اللي دايمًا شايف 0" },
        body: {
          en: "The effect runs once, so its callback closes over the first render's <code>count</code> forever.",
          ar: "الـ effect بيشتغل مرة واحدة، فالـ callback بتاعه ماسك <code>count</code> بتاع أول render على طول."
        },
        code: "useEffect(() => {\n  const id = setInterval(() => setCount(count + 1), 1000); // count is 0 forever\n  return () => clearInterval(id);\n}, []);\n\n// Fix: don't read count at all\nsetInterval(() => setCount((c) => c + 1), 1000);",
        run: "browser",
        fix: {
          en: "Pick by intent: a functional updater (no need to read the value); add the value to deps (re-subscribe each change); or a latest-value ref / <code>useEffectEvent</code> (keep one subscription, read fresh values).",
          ar: "اختار حسب اللي عايزه: functional updater (مش محتاج تقرا القيمة)؛ أو حط القيمة في الـ deps (يعمل subscribe من جديد مع كل تغيير)؛ أو ref بآخر قيمة / <code>useEffectEvent</code> (subscription واحد ويقرا القيم الجديدة)."
        }
      },
      {
        title: { en: "A debounce recreated on every render", ar: "debounce بيتعمل من جديد مع كل render" },
        body: {
          en: "<code>const onChange = debounce(save, 300)</code> in a component body makes a new debounced function — with its own timer — every render, so typing never debounces, or calls pile up.",
          ar: "لو كتبت <code>const onChange = debounce(save, 300)</code> جوه الـ component، كل render بيعمل debounced function جديدة — بـ timer لوحدها — فالكتابة عمرها ما بتتعمل لها debounce، أو النداءات بتتراكم."
        },
        code: "// Wrong: new timer every render\nconst onChange = debounce(save, 300);\n\n// Right: one instance, cancelled on unmount\nconst onChange = useMemo(() => debounce(save, 300), [save]);\nuseEffect(() => () => onChange.cancel(), [onChange]);",
        run: "browser",
        fix: { en: "Create it once (<code>useMemo</code>/<code>useRef</code>), keep <code>save</code> stable or read it from a ref, and cancel it in cleanup.", ar: "اعمله مرة واحدة (<code>useMemo</code>/<code>useRef</code>)، وخلي <code>save</code> ثابتة أو اقراها من ref، واعمل له cancel في الـ cleanup." }
      },
      {
        title: { en: "A long-lived closure keeps big data alive", ar: "closure عايش كتير بيمسك داتا كبيرة في الذاكرة" },
        body: {
          en: "A listener or cache entry created next to a large response keeps that response reachable through the shared context, even if the listener only uses one field.",
          ar: "listener أو entry في cache اتعمل جنب response كبير بيخلي الـ response ده موجود في الذاكرة عن طريق الـ context المشترك، حتى لو الـ listener بيستخدم field واحد بس."
        },
        fix: { en: "Copy the field you need into a small variable (or a separate small function) before creating long-lived callbacks, and drop references when done.", ar: "انسخ الـ field اللي محتاجه في متغير صغير (أو function صغيرة لوحدها) قبل ما تعمل callbacks عمرها طويل، وسيب الـ references لما تخلص." }
      }
    ],
    levels: [
      {
        q: "What is a closure?",
        mid: { en: "A function that remembers the variables of its outer scope, even after the outer function has returned.", ar: "function فاكرة متغيرات الـ scope اللي برّاها، حتى بعد ما الـ function اللي برّه خلصت." },
        senior: {
          en: "Every function keeps a reference to the environment it was created in; that's the closure. It captures bindings, not snapshots — so it sees later updates to a <code>let</code>, while a React handler sees the state of the render that created it, because each render makes new bindings. I use closures for privacy, factories, memoisation and debounce. The costs: memory (V8 shares one context per scope across its closures) and stale values in long-lived callbacks.",
          ar: "كل function بتحتفظ بـ reference للـ environment اللي اتعملت فيه؛ وده الـ closure. وهو بيمسك bindings مش نسخة من القيم — فبيشوف أي تحديث لـ <code>let</code>، لكن الـ handler في React بيشوف state الـ render اللي عمله، لأن كل render بيعمل bindings جديدة. بستخدم الـ closures للـ privacy والـ factories والـ memoisation والـ debounce. والتمن: الذاكرة (الـ V8 بيشارك context واحد لكل scope بين الـ closures بتاعته)، والقيم القديمة في الـ callbacks اللي عمرها طويل."
        }
      },
      {
        q: "Explain a stale closure in React and how you fix it.",
        mid: { en: "The callback uses an old state value. Add the value to the dependency array.", ar: "الـ callback بيستخدم قيمة state قديمة. حط القيمة في الـ dependency array." },
        senior: {
          en: "A callback created in one render outlives it — a timer, a subscription, a memoised handler — and keeps reading that render's values. Three fixes, chosen by intent: a functional updater when I only need the previous state; adding the value to deps when re-subscribing is fine; a latest-value ref (or <code>useEffectEvent</code>) when the subscription must stay but must read fresh values. In Smart FAQ the row menu reads handlers from a ref at click time for exactly that reason.",
          ar: "callback اتعمل في render وعاش بعده — timer أو subscription أو handler معمول له memo — وفضل يقرا قيم الـ render ده. فيه 3 حلول وبختار حسب الهدف: functional updater لو محتاج الـ state اللي قبلها بس؛ أو أحط القيمة في الـ deps لو مفيش مشكلة إنه يعمل subscribe تاني؛ أو ref بآخر قيمة (أو <code>useEffectEvent</code>) لو الـ subscription لازم يفضل بس يقرا قيم جديدة. وفي Smart FAQ الـ row menu بيقرا الـ handlers من ref وقت الضغط للسبب ده بالظبط."
        }
      }
    ],
    drill: [
      {
        q: "Does a closure copy variables?",
        a: { en: "No — it references the binding and reads it when it runs.", ar: "لأ — بيعمل reference للـ binding وبيقراه وقت ما يشتغل." },
        follow: [
          {
            q: "Then why does a React handler show old state?",
            a: { en: "State isn't one variable that changes. Each render calls the component again and creates new <code>const</code> bindings; the old handler still points to the old render's binding.", ar: "الـ state مش متغير واحد بيتغير. كل render بينادي الـ component تاني ويعمل bindings <code>const</code> جديدة؛ والـ handler القديم لسه بيشاور على binding الـ render القديم." },
            follow: [
              {
                q: "How does useRef escape that?",
                a: { en: "The ref object is the same object across renders. Closures capture the object and read <code>.current</code> at call time, so they see whatever the latest render stored there.", ar: "الـ ref object هو نفس الـ object في كل الـ renders. فالـ closures بتمسك الـ object وبتقرا <code>.current</code> وقت النداء، فبتشوف آخر حاجة الـ render الأخير حطها فيه." }
              }
            ]
          }
        ]
      }
    ],
    story: {
      text: { en: "Smart FAQ row menu: handlers are read from a ref at click time (the “latest ref” pattern), so memoised menus never call a stale handler.", ar: "الـ row menu في Smart FAQ: الـ handlers بتتقرا من ref وقت الضغط (pattern الـ «latest ref»)، فالـ menus المعمول لها memo عمرها ما بتنادي handler قديم." },
      p: "smartfaq", tab: "how", label: "Smart FAQ"
    },
    sources: [
      { label: "MDN — Closures", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures" },
      { label: "react.dev — Separating events from effects (useEffectEvent)", url: "https://react.dev/learn/separating-events-from-effects" },
      { label: "javascript.info — Variable scope, closure", url: "https://javascript.info/closure" }
    ]
  }
,

  this: {
    why: {
      en: "<code>this</code> questions check whether you reason from the call site or guess from where the code is written. The follow-ups go to arrows vs methods, <code>bind</code> rules, and why modern React code barely uses <code>this</code>.",
      ar: "أسئلة الـ <code>this</code> بتختبر إنت بتفكر من مكان النداء ولا بتخمّن من مكان الكتابة. والأسئلة اللي بعدها بتروح للـ arrows قصاد الـ methods، وقواعد الـ <code>bind</code>، وليه كود React الحديث تقريبًا مش بيستخدم <code>this</code>."
    },
    how: [
      {
        title: { en: "Four rules, decided at the call, in priority order", ar: "أربع قواعد بتتحدد وقت النداء، بالترتيب ده" },
        body: {
          en: "1) <code>new F()</code> → the new object. 2) <code>call</code>/<code>apply</code>/<code>bind</code> → the object you pass. 3) <code>obj.method()</code> → <code>obj</code>. 4) A plain call → <code>undefined</code> in strict mode and modules (the global object in sloppy scripts). Where the function was written doesn't matter — only how it's called.",
          ar: "1) <code>new F()</code> ← الـ object الجديد. 2) <code>call</code>/<code>apply</code>/<code>bind</code> ← الـ object اللي بعته. 3) <code>obj.method()</code> ← <code>obj</code>. 4) نداء عادي ← <code>undefined</code> في الـ strict mode والـ modules (والـ global object في الـ scripts العادية). مكان كتابة الـ function مش فارق — المهم بتتنادى إزاي."
        },
        code: "\"use strict\";\nfunction who() { return this === undefined ? \"undefined\" : this.name; }\nconst obj = { name: \"obj\", who };\nconsole.log(obj.who());\nconsole.log(who.call({ name: \"call\" }));\nconst loose = obj.who;\nconsole.log(loose());\nfunction Person(n) { this.name = n; }\nconsole.log(new Person(\"new\").name);",
        out: "obj\ncall\nundefined\nnew",
        run: "node"
      },
      {
        title: { en: "bind is permanent", ar: "الـ bind مش بيتغير" },
        body: {
          en: "<code>bind</code> returns a new function with <code>this</code> fixed. Calling it with <code>call</code> or binding it again doesn't change it. Only <code>new</code> can override a bound <code>this</code>.",
          ar: "الـ <code>bind</code> بيرجّع function جديدة الـ <code>this</code> فيها ثابت. ولو ناديتها بـ <code>call</code> أو عملت لها bind تاني مش هيتغير. الـ <code>new</code> بس اللي يقدر يغيّر الـ <code>this</code> المربوط."
        },
        code: "function show() { return this.v; }\nconst b = show.bind({ v: 1 });\nconsole.log(b.call({ v: 2 }), b.bind({ v: 3 })());",
        out: "1 1",
        run: "node"
      },
      {
        title: { en: "Arrows have no this of their own", ar: "الـ arrows ملهاش this بتاعها" },
        body: {
          en: "An arrow function takes <code>this</code> from the scope where it was written, and <code>call</code>/<code>bind</code> can't change it. In a class, an arrow <b>field</b> is created per instance (not on the prototype): it can be passed around safely, but costs memory per instance and can't be reached with <code>super.method()</code>. A normal method lives once on the prototype; class bodies are strict, so a detached method gets <code>undefined</code>.",
          ar: "الـ arrow function بتاخد <code>this</code> من الـ scope اللي اتكتبت فيه، و <code>call</code>/<code>bind</code> مش بيغيروه. وفي الـ class، الـ arrow <b>field</b> بيتعمل لكل instance (مش على الـ prototype): ينفع تبعته في أي حتة بأمان، بس بياخد ذاكرة مع كل instance ومينفعش توصله بـ <code>super.method()</code>. والـ method العادية موجودة مرة واحدة على الـ prototype؛ والـ class body بيبقى strict، فالـ method لو اتفصلت بتاخد <code>undefined</code>."
        },
        code: "class Timer {\n  constructor() { this.ticks = 0; }\n  method() { return this?.ticks; }\n  arrow = () => this.ticks;\n}\nconst t = new Timer();\nconst { method, arrow } = t;\nconsole.log(method(), arrow(), \"arrow\" in Timer.prototype);",
        out: "undefined 0 false",
        run: "node"
      },
      {
        title: { en: "Hosts choose this for callbacks", ar: "الـ host هو اللي بيختار this للـ callbacks" },
        body: {
          en: "A normal function given to <code>addEventListener</code> gets the element as <code>this</code> (the <code>currentTarget</code>). A browser timer calls it with <code>window</code>; Node's timer calls it with its <code>Timeout</code> object. React calls your handlers as plain functions — use <code>event.currentTarget</code>, not <code>this</code>.",
          ar: "الـ function العادية اللي بتديها لـ <code>addEventListener</code> بتاخد الـ element كـ <code>this</code> (الـ <code>currentTarget</code>). والـ timer في المتصفح بيناديها بـ <code>window</code>؛ وفي Node بيناديها بالـ <code>Timeout</code> object بتاعه. و React بينادي الـ handlers بتاعتك كـ functions عادية — استخدم <code>event.currentTarget</code> مش <code>this</code>."
        },
        code: "setTimeout(function () { console.log(this.constructor.name); }, 0);",
        out: "Timeout",
        run: "node"
      }
    ],
    breaks: [
      {
        title: { en: "Passing a method loses this", ar: "لما تبعت method كـ callback الـ this بيضيع" },
        body: {
          en: "<code>arr.map(store.count)</code>, <code>promise.then(api.load)</code> or <code>el.addEventListener(\"click\", this.handle)</code> pass the function alone; the object is gone.",
          ar: "<code>arr.map(store.count)</code> أو <code>promise.then(api.load)</code> أو <code>el.addEventListener(\"click\", this.handle)</code> بيبعتوا الـ function لوحدها؛ والـ object بيضيع."
        },
        code: "\"use strict\";\nconst store = { items: [1, 2], count() { return this.items.length; } };\ntry { [0].map(store.count); } catch (e) { console.log(e.constructor.name); }\nconsole.log([0].map(store.count, store)[0], [0].map(() => store.count())[0]);",
        out: "TypeError\n2 2",
        run: "node",
        fix: { en: "Wrap it in an arrow (<code>() =&gt; store.count()</code>), bind once in the constructor, use an arrow class field, or avoid <code>this</code> with plain functions and closures.", ar: "لفّها في arrow (<code>() =&gt; store.count()</code>)، أو اعمل bind مرة واحدة في الـ constructor، أو استخدم arrow class field، أو استغنى عن <code>this</code> بـ functions عادية و closures." }
      },
      {
        title: { en: "An arrow as an object method", ar: "arrow كـ method في object" },
        body: {
          en: "An arrow in an object literal doesn't get the object — it gets the <code>this</code> of the code around the literal.",
          ar: "الـ arrow جوه object literal مش بياخد الـ object — بياخد <code>this</code> بتاع الكود اللي حوالين الـ literal."
        },
        code: "function make() {\n  return { n: 1, get: () => this?.n, getN() { return this.n; } };\n}\nconst o = make.call({ n: \"outer\" });\nconsole.log(o.get(), o.getN());",
        out: "outer 1",
        run: "node",
        fix: { en: "Use method shorthand (<code>getN() {}</code>) for anything that needs the object.", ar: "استخدم شكل الـ method المختصر (<code>getN() {}</code>) لأي حاجة محتاجة الـ object." }
      }
    ],
    levels: [
      {
        q: "How is this determined?",
        mid: { en: "It's the object before the dot. Arrow functions take <code>this</code> from outside.", ar: "هو الـ object اللي قبل النقطة. والـ arrow functions بتاخد <code>this</code> من برّه." },
        senior: {
          en: "By the call site, with a priority: <code>new</code>, then explicit <code>call</code>/<code>apply</code>/<code>bind</code>, then the method call's object, then the default — <code>undefined</code> in strict code and modules. Arrows don't have their own <code>this</code> and can't be rebound; <code>bind</code> is permanent except under <code>new</code>. The bug I watch for is passing methods as callbacks. Fixes: an arrow wrapper, binding once, an arrow class field (a per-instance cost), or not using <code>this</code> at all — which is where hooks and plain modules took React.",
          ar: "بمكان النداء، بالأولوية دي: <code>new</code>، وبعدين <code>call</code>/<code>apply</code>/<code>bind</code> الصريحة، وبعدين الـ object بتاع نداء الـ method، وبعدين الـ default — <code>undefined</code> في الكود الـ strict والـ modules. الـ arrows ملهاش <code>this</code> بتاعها ومينفعش تتربط تاني؛ والـ <code>bind</code> ثابت ماعدا مع <code>new</code>. والـ bug اللي باخد بالي منه: إنك تبعت methods كـ callbacks. والحلول: arrow تلفها، أو bind مرة واحدة، أو arrow class field (تمنه ذاكرة لكل instance)، أو متستخدمش <code>this</code> أصلًا — وده اللي الـ hooks والـ modules العادية عملوه في React."
        }
      },
      {
        q: "When should you not use an arrow function?",
        mid: { en: "For object methods; arrows are for callbacks.", ar: "في الـ methods بتاعة الـ objects؛ الـ arrows للـ callbacks." },
        senior: {
          en: "Arrows have no own <code>this</code>, <code>arguments</code>, <code>prototype</code> or <code>new</code>. So not for object or prototype methods that need the object, not for DOM handlers that rely on <code>this</code> being the element, not as constructors, not for generators. And arrow class fields are per-instance: fine for a few components, wasteful for thousands of objects, and invisible to <code>super</code> and to prototype spies in tests.",
          ar: "الـ arrows ملهاش <code>this</code> ولا <code>arguments</code> ولا <code>prototype</code> بتوعها، ومينفعش معاها <code>new</code>. فمش للـ methods اللي محتاجة الـ object، ولا للـ DOM handlers اللي معتمدة إن <code>this</code> هو الـ element، ولا كـ constructors، ولا للـ generators. والـ arrow class fields بتتعمل لكل instance: مفيش مشكلة مع components قليلة، لكن تبذير مع آلاف الـ objects، ومش باينة لـ <code>super</code> ولا للـ spies على الـ prototype في الـ tests."
        }
      }
    ],
    drill: [
      {
        q: "What is this inside a normal setTimeout callback?",
        a: { en: "In browsers, <code>window</code> (timers call it with the global object). In Node, the <code>Timeout</code> object.", ar: "في المتصفح <code>window</code> (الـ timers بتناديها بالـ global object). وفي Node الـ <code>Timeout</code> object." },
        follow: [
          {
            q: "And in an addEventListener callback?",
            a: { en: "The element the listener is attached to — <code>event.currentTarget</code> — not necessarily <code>event.target</code>, which is where the event started.", ar: "الـ element اللي الـ listener متركب عليه — <code>event.currentTarget</code> — مش لازم يكون <code>event.target</code> اللي هو المكان اللي الـ event بدأ منه." },
            follow: [
              {
                q: "So what is this in a React onClick?",
                a: { en: "<code>undefined</code>: React calls handlers as plain functions with a synthetic event. Use <code>e.currentTarget</code> for the element, and closures for data.", ar: "<code>undefined</code>: React بينادي الـ handlers كـ functions عادية ومعاها synthetic event. استخدم <code>e.currentTarget</code> للـ element، والـ closures للداتا." }
              }
            ]
          }
        ]
      }
    ],
    sources: [
      { label: "MDN — this", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this" },
      { label: "MDN — Arrow function expressions", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions" },
      { label: "MDN — Function.prototype.bind()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind" }
    ]
  },

  prototypes: {
    why: {
      en: "Few frontend jobs need hand-written inheritance, so the question is really: do you understand what <code>class</code> compiles to, and can you spot prototype pollution or the shared-array bug in a review?",
      ar: "شغل الـ frontend قليل لما يحتاج inheritance مكتوب بالإيد، فالسؤال في الحقيقة: فاهم الـ <code>class</code> بيتحول لإيه، وتقدر تلاقي الـ prototype pollution أو bug الـ array المشترك في code review؟"
    },
    how: [
      {
        title: { en: "Reads walk the chain; writes stay on the object", ar: "القراية بتمشي على السلسلة؛ والكتابة بتفضل على الـ object" },
        body: {
          en: "Every object has a hidden <code>[[Prototype]]</code> link. Reading a property checks the object, then its prototype, and so on up to <code>null</code>. Assigning creates an own property that shadows the inherited one.",
          ar: "كل object ليه لينك مستخبي <code>[[Prototype]]</code>. لما تقرا property بيدوّر في الـ object، وبعدين الـ prototype بتاعه، وهكذا لحد <code>null</code>. ولما تكتب، بيتعمل property خاصة بالـ object تغطي اللي موروثة."
        },
        code: "const base = { greet() { return \"hi \" + this.name; } };\nconst u = Object.create(base);\nu.name = \"Ibrahem\";\nconsole.log(u.greet(), Object.hasOwn(u, \"greet\"), Object.getPrototypeOf(u) === base);",
        out: "hi Ibrahem false true",
        run: "node"
      },
      {
        title: { en: "What new actually does", ar: "الـ new بيعمل إيه بالظبط" },
        body: {
          en: "<code>new F()</code>: creates an object whose prototype is <code>F.prototype</code>, runs <code>F</code> with <code>this</code> set to it, and returns it — unless <code>F</code> returns another object, which wins.",
          ar: "<code>new F()</code>: بيعمل object الـ prototype بتاعه <code>F.prototype</code>، ويشغّل <code>F</code> والـ <code>this</code> هو الـ object ده، ويرجّعه — إلا لو <code>F</code> رجّعت object تاني، ساعتها هو اللي بيرجع."
        },
        code: "function F() { this.a = 1; return { b: 2 }; }\nconsole.log(new F().a, new F().b);",
        out: "undefined 2",
        run: "node"
      },
      {
        title: { en: "class is more than sugar", ar: "الـ class أكتر من مجرد شكل أسهل" },
        body: {
          en: "Same prototype model, plus: the body is strict, methods are non-enumerable, calling a class without <code>new</code> throws, class declarations have a TDZ, <code>extends</code> links two chains (instances <b>and</b> the constructors, so statics inherit), and <code>#private</code> fields are real privacy — not on the prototype at all, checkable with <code>#x in obj</code>.",
          ar: "نفس فكرة الـ prototype، وزيادة: الـ body بيبقى strict، والـ methods مش enumerable، ونداء class من غير <code>new</code> بيرمي error، وتعريف الـ class ليه TDZ، و <code>extends</code> بيربط سلسلتين (الـ instances <b>و</b> الـ constructors، فالـ statics بتتورث)، والـ <code>#private</code> fields خصوصية بجد — مش على الـ prototype خالص، وتقدر تتأكد منها بـ <code>#x in obj</code>."
        },
        code: "class A { static make() { return \"static\"; } #secret = 1; hasSecret(o) { return #secret in o; } }\nclass B extends A {}\nconsole.log(B.make(), Object.getPrototypeOf(B) === A, new B().hasSecret(new B()), new B().hasSecret({}));\ntry { A(); } catch (e) { console.log(e.name); }",
        out: "static true true false\nTypeError",
        run: "node"
      },
      {
        title: { en: "instanceof checks the chain — and breaks across realms", ar: "الـ instanceof بيدوّر في السلسلة — وبيبوظ بين الـ realms" },
        body: {
          en: "<code>x instanceof F</code> asks whether <code>F.prototype</code> is anywhere in <code>x</code>'s chain. An array from an iframe or a worker message has a different <code>Array.prototype</code>, so <code>instanceof Array</code> is false. Use <code>Array.isArray</code> and structural checks for data that crosses boundaries.",
          ar: "<code>x instanceof F</code> بيسأل: <code>F.prototype</code> موجود في سلسلة <code>x</code>؟ والـ array اللي جاي من iframe ليه <code>Array.prototype</code> مختلف، فـ <code>instanceof Array</code> بيطلع false. استخدم <code>Array.isArray</code> واتأكد من شكل الداتا اللي بتعدي حدود."
        },
        code: "const arr = new frames[0].Array();\nconsole.log(arr instanceof Array, Array.isArray(arr)); // false true",
        run: "browser"
      }
    ],
    breaks: [
      {
        title: { en: "Prototype pollution from untrusted JSON", ar: "الـ prototype pollution من JSON مش مضمون" },
        body: {
          en: "<code>JSON.parse</code> creates an own key called <code>\"__proto__\"</code>. A naive deep merge then follows <code>target[\"__proto__\"]</code> — which is <code>Object.prototype</code> — and writes into it. Every object in the app now has <code>isAdmin</code>.",
          ar: "الـ <code>JSON.parse</code> بيعمل key عادي اسمه <code>\"__proto__\"</code>. وأي deep merge بسيط بيمشي ورا <code>target[\"__proto__\"]</code> — اللي هو <code>Object.prototype</code> — ويكتب فيه. فكل object في الـ app بقى فيه <code>isAdmin</code>."
        },
        code: "function merge(target, src) {\n  for (const k in src) {\n    if (typeof src[k] === \"object\") merge(target[k] ??= {}, src[k]);\n    else target[k] = src[k];\n  }\n  return target;\n}\nmerge({}, JSON.parse('{\"__proto__\": {\"isAdmin\": true}}'));\nconsole.log({}.isAdmin);",
        out: "true",
        run: "node",
        fix: { en: "Skip <code>__proto__</code>, <code>constructor</code> and <code>prototype</code> keys; validate input with a schema; use <code>Map</code> or <code>Object.create(null)</code> for dictionaries; keep merge libraries up to date.", ar: "اتجاهل الـ keys <code>__proto__</code> و <code>constructor</code> و <code>prototype</code>؛ واعمل validate للـ input بـ schema؛ واستخدم <code>Map</code> أو <code>Object.create(null)</code> للـ dictionaries؛ وحدّث مكتبات الـ merge." }
      },
      {
        title: { en: "Mutable state on the prototype is shared", ar: "الـ state اللي بيتغير على الـ prototype بيبقى مشترك" },
        body: {
          en: "Methods belong on the prototype; arrays and objects don't. <code>push</code> doesn't assign, so it mutates the one shared array.",
          ar: "الـ methods مكانها الـ prototype؛ لكن الـ arrays والـ objects لأ. والـ <code>push</code> مش بيعمل assignment، فبيعدّل الـ array الوحيد المشترك."
        },
        code: "function Team() {}\nTeam.prototype.members = [];\nconst a = new Team(), b = new Team();\na.members.push(\"x\");\nconsole.log(b.members.length);",
        out: "1",
        run: "node",
        fix: { en: "Initialise per-instance state in the constructor or as class fields.", ar: "اعمل الـ state الخاص بكل instance في الـ constructor أو كـ class fields." }
      }
    ],
    levels: [
      {
        q: "Explain prototypal inheritance.",
        mid: { en: "Objects inherit from other objects through the prototype chain; <code>class</code> is syntax on top of it.", ar: "الـ objects بتورث من objects تانية عن طريق الـ prototype chain؛ والـ <code>class</code> شكل مكتوب فوقها." },
        senior: {
          en: "Property reads walk <code>[[Prototype]]</code> links; writes create own properties that shadow. <code>new</code> links the instance to <code>F.prototype</code>. <code>class</code> adds strict mode, non-enumerable methods, two parallel chains (instances and statics), <code>super</code>, and <code>#private</code> fields that aren't on the chain at all. In practice: share methods on the prototype, keep state per instance, never extend built-in prototypes in app code, and treat deep merges of untrusted input as a prototype-pollution risk.",
          ar: "قراية أي property بتمشي على لينكات الـ <code>[[Prototype]]</code>؛ والكتابة بتعمل properties خاصة تغطي الموروثة. الـ <code>new</code> بيربط الـ instance بـ <code>F.prototype</code>. والـ <code>class</code> بيزوّد strict mode، و methods مش enumerable، وسلسلتين جنب بعض (الـ instances والـ statics)، و <code>super</code>، و <code>#private</code> fields مش على السلسلة أصلًا. وعمليًا: الـ methods على الـ prototype، والـ state لكل instance، ومتعدّلش prototypes الـ built-ins في كود الـ app، وأي deep merge لـ input مش مضمون اعتبره خطر prototype pollution."
        }
      },
      {
        q: "Composition or inheritance in a frontend codebase?",
        mid: { en: "Prefer composition.", ar: "الأحسن composition." },
        senior: {
          en: "Composition by default — React itself is props, children and hooks. I use inheritance for small, stable “is-a” hierarchies where <code>instanceof</code> is the point, like a typed <code>ApiError extends Error</code> that the UI can branch on. Deep hierarchies make base-class changes risky for every subclass (the fragile base class problem).",
          ar: "الـ composition هو الأساس — React نفسه props و children و hooks. وبستخدم الـ inheritance في hierarchies صغيرة وثابتة من نوع «is-a» لما الـ <code>instanceof</code> يكون هو المطلوب، زي <code>ApiError extends Error</code> بنوع واضح الـ UI يقدر يتصرف على أساسه. والـ hierarchies العميقة بتخلي أي تغيير في الـ base class خطر على كل الـ subclasses (مشكلة الـ fragile base class)."
        }
      }
    ],
    drill: [
      {
        q: "What's the difference between __proto__ and prototype?",
        a: { en: "<code>prototype</code> is a property of functions, used by <code>new</code> as the new object's parent. <code>__proto__</code> (better: <code>Object.getPrototypeOf</code>) is the actual parent link that every object has.", ar: "الـ <code>prototype</code> property في الـ functions، والـ <code>new</code> بيستخدمها كأب للـ object الجديد. والـ <code>__proto__</code> (والأحسن <code>Object.getPrototypeOf</code>) هو لينك الأب الفعلي اللي في كل object." },
        follow: [
          {
            q: "What's at the end of the chain?",
            a: { en: "<code>Object.prototype</code>, whose prototype is <code>null</code>. <code>Object.create(null)</code> makes an object with no prototype at all.", ar: "<code>Object.prototype</code>، والـ prototype بتاعه <code>null</code>. و <code>Object.create(null)</code> بيعمل object من غير prototype خالص." },
            follow: [
              {
                q: "Why are prototype-less objects safer as dictionaries?",
                a: { en: "No inherited keys like <code>constructor</code> or <code>toString</code> to collide with user keys, and no <code>__proto__</code> setter to pollute through. A <code>Map</code> is usually better still.", ar: "مفيش keys موروثة زي <code>constructor</code> أو <code>toString</code> تتلخبط مع keys اليوزر، ومفيش setter بتاع <code>__proto__</code> يتعمل منه pollution. و <code>Map</code> غالبًا أحسن من الاتنين." }
              }
            ]
          }
        ]
      }
    ],
    sources: [
      { label: "MDN — Inheritance and the prototype chain", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain" },
      { label: "MDN — Private properties", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties" },
      { label: "PortSwigger — Prototype pollution", url: "https://portswigger.net/web-security/prototype-pollution" }
    ]
  },

  promises: {
    why: {
      en: "Async questions separate people who chain <code>.then</code> from people who have shipped data fetching: error propagation, cancellation, race conditions between responses, and what happens to the promises you didn't wait for.",
      ar: "أسئلة الـ async بتفرّق بين اللي بيكتب <code>.then</code> ورا بعض واللي عمل data fetching في production فعلًا: الـ errors بتمشي إزاي، والإلغاء، والـ race conditions بين الـ responses، وإيه اللي بيحصل للـ promises اللي مستنيتهاش."
    },
    how: [
      {
        title: { en: "The executor runs now; settling happens once", ar: "الـ executor بيشتغل فورًا؛ والـ promise بيخلص مرة واحدة بس" },
        body: {
          en: "<code>new Promise(executor)</code> runs the executor synchronously. The first <code>resolve</code>/<code>reject</code> wins; later calls are ignored. A <code>throw</code> inside the executor becomes a rejection. Resolving with another promise (a thenable) makes this one follow it.",
          ar: "الـ <code>new Promise(executor)</code> بيشغّل الـ executor sync على طول. وأول <code>resolve</code>/<code>reject</code> هو اللي بيكسب؛ وأي نداء بعده بيتجاهل. وأي <code>throw</code> جوه الـ executor بيبقى rejection. ولو عملت resolve بـ promise تاني (thenable)، الـ promise ده بيمشي وراه."
        },
        code: "const p = new Promise((resolve) => { console.log(\"executor runs now\"); resolve(1); resolve(2); });\np.then((v) => console.log(\"value\", v));\nconsole.log(\"after constructor\");",
        out: "executor runs now\nafter constructor\nvalue 1",
        run: "node"
      },
      {
        title: { en: "then returns a new promise — errors skip to the next catch", ar: "الـ then بيرجّع promise جديد — والـ errors بتنط لأقرب catch" },
        body: {
          en: "What a handler returns fulfils the next promise; what it throws rejects it; a promise it returns is adopted. A rejection skips every <code>then</code> until a <code>catch</code>, and the <code>catch</code>'s return value makes the chain fulfilled again — so a catch in the middle silently “recovers”.",
          ar: "اللي الـ handler بيرجّعه بيبقى قيمة الـ promise اللي بعده؛ واللي بيرميه بيبقى rejection؛ ولو رجّع promise بيتبنّاه. والـ rejection بينط من فوق كل <code>then</code> لحد <code>catch</code>، واللي الـ <code>catch</code> بيرجّعه بيرجّع السلسلة لحالة النجاح — فالـ catch اللي في النص بيعمل «recover» من غير ما حد ياخد باله."
        },
        code: "Promise.resolve(1)\n  .then((v) => { throw new Error(\"boom \" + v); })\n  .then(() => console.log(\"skipped\"))\n  .catch((e) => { console.log(\"caught\", e.message); return \"recovered\"; })\n  .then((v) => console.log(v));",
        out: "caught boom 1\nrecovered",
        run: "node"
      },
      {
        title: { en: "await in sequence vs in parallel", ar: "الـ await ورا بعض ولا مع بعض" },
        body: {
          en: "Two <code>await</code>s in a row wait one after the other. Start both, then wait for both with <code>Promise.all</code>, when they don't depend on each other — the classic hidden waterfall in data loading.",
          ar: "اتنين <code>await</code> ورا بعض بيستنوا واحد بعد التاني. لو مش معتمدين على بعض، ابدأهم الاتنين واستناهم مع بعض بـ <code>Promise.all</code> — ودي الـ waterfall المستخبية المشهورة في تحميل الداتا."
        },
        code: "const wait = (ms) => new Promise((r) => setTimeout(r, ms));\nasync function seq() { const t = Date.now(); await wait(50); await wait(50); return Date.now() - t >= 95; }\nasync function par() { const t = Date.now(); await Promise.all([wait(50), wait(50)]); return Date.now() - t < 90; }\nPromise.all([seq(), par()]).then(([a, b]) => console.log(a, b));",
        out: "true true",
        run: "node"
      },
      {
        title: { en: "You can't cancel a promise — you cancel the work", ar: "مينفعش تلغي promise — بتلغي الشغل نفسه" },
        body: {
          en: "A promise is just the result. <code>AbortController</code> gives you a <code>signal</code> to pass to the work (<code>fetch</code>, your own functions, event listeners); aborting stops the work and rejects with an <code>AbortError</code>. <code>AbortSignal.timeout(ms)</code> makes deadlines, <code>AbortSignal.any([...])</code> combines signals.",
          ar: "الـ promise مجرد النتيجة. الـ <code>AbortController</code> بيديك <code>signal</code> تبعته للشغل نفسه (<code>fetch</code>، أو functions بتاعتك، أو event listeners)؛ ولما تعمل abort الشغل بيقف والـ promise بيعمل reject بـ <code>AbortError</code>. و <code>AbortSignal.timeout(ms)</code> للمهلة، و <code>AbortSignal.any([...])</code> بيجمع signals."
        },
        code: "function sleep(ms, { signal } = {}) {\n  return new Promise((resolve, reject) => {\n    const id = setTimeout(resolve, ms, \"done\");\n    signal?.addEventListener(\"abort\", () => { clearTimeout(id); reject(signal.reason); }, { once: true });\n  });\n}\nconst c = new AbortController();\nsleep(1000, { signal: c.signal }).catch((e) => console.log(e.name));\nc.abort();",
        out: "AbortError",
        run: "node"
      }
    ],
    breaks: [
      {
        title: { en: "Promise.all fails fast — but nothing is cancelled", ar: "الـ Promise.all بيقع مع أول فشل — بس مفيش حاجة بتتلغي" },
        body: {
          en: "The combined promise rejects at the first failure, while the other operations keep running and finish (requests, writes, side effects).",
          ar: "الـ promise المجمّع بيعمل reject مع أول فشل، والعمليات التانية بتكمل وتخلص عادي (requests، كتابة، side effects)."
        },
        code: "const job = (ms, ok) => new Promise((res, rej) => setTimeout(() => {\n  console.log(\"finished\", ms);\n  ok ? res(ms) : rej(new Error(\"fail \" + ms));\n}, ms));\nPromise.all([job(10, false), job(30, true)]).catch((e) => console.log(e.message));",
        out: "finished 10\nfail 10\nfinished 30",
        run: "node",
        fix: { en: "Share one <code>AbortController</code> and abort it on the first failure, or use <code>allSettled</code> when you need every result.", ar: "اعمل <code>AbortController</code> واحد مشترك واعمل abort مع أول فشل، أو استخدم <code>allSettled</code> لو محتاج كل النتايج." }
      },
      {
        title: { en: "Out-of-order responses", ar: "الـ responses اللي بتوصل بترتيب غلط" },
        body: {
          en: "Typing “re” then “react” starts two requests. If the first is slower, its answer arrives last and overwrites the right one.",
          ar: "لما تكتب «re» وبعدين «react» بيبدأوا اتنين requests. ولو الأول أبطأ، الرد بتاعه بيوصل في الآخر ويكتب فوق الرد الصح."
        },
        code: "let shown;\nconst search = (q, ms) => new Promise((r) => setTimeout(() => r(q), ms));\nsearch(\"re\", 50).then((r) => { shown = r; });\nsearch(\"react\", 10).then((r) => { shown = r; });\nsetTimeout(() => console.log(\"shown:\", shown), 80);",
        out: "shown: re",
        run: "node",
        fix: { en: "Abort the previous request, or ignore stale ones (an <code>ignore</code> flag in effect cleanup, a request id). Libraries like TanStack Query key results by the query, so an old response can't land on a new key.", ar: "اعمل abort للـ request اللي قبله، أو اتجاهل القديمة (flag <code>ignore</code> في الـ cleanup بتاع الـ effect، أو request id). ومكتبات زي TanStack Query بتربط النتيجة بالـ query key، فالرد القديم مينفعش ينزل على key جديد." }
      },
      {
        title: { en: "A missing await: the error escapes", ar: "await ناقصة: الـ error بيهرب" },
        body: {
          en: "Without <code>await</code>, the <code>try</code> finishes before the promise rejects, so the catch never runs and the rejection is unhandled. In Node 15+ an unhandled rejection crashes the process by default.",
          ar: "من غير <code>await</code>، الـ <code>try</code> بيخلص قبل ما الـ promise يعمل reject، فالـ catch عمره ما بيشتغل والـ rejection بيبقى unhandled. وفي Node 15 وأحدث، الـ unhandled rejection بيوقّع الـ process افتراضيًا."
        },
        code: "async function save() { throw new Error(\"db down\"); }\nasync function handler() {\n  try { save(); console.log(\"saved?\"); }      // missing await\n  catch (e) { console.log(\"never here\"); }\n}\nprocess.on(\"unhandledRejection\", (e) => console.log(\"unhandled:\", e.message));\nhandler();",
        out: "saved?\nunhandled: db down",
        run: "node",
        fix: { en: "Turn on <code>@typescript-eslint/no-floating-promises</code>, always <code>return</code>/<code>await</code> promises, and report <code>unhandledrejection</code> to monitoring.", ar: "شغّل <code>@typescript-eslint/no-floating-promises</code>، ودايمًا اعمل <code>return</code>/<code>await</code> للـ promises، وابعت <code>unhandledrejection</code> للـ monitoring." }
      }
    ],
    levels: [
      {
        q: "How do you cancel a request in flight?",
        mid: { en: "With <code>AbortController</code>: pass the signal to <code>fetch</code> and call <code>abort()</code>.", ar: "بـ <code>AbortController</code>: ابعت الـ signal لـ <code>fetch</code> ونادي <code>abort()</code>." },
        senior: {
          en: "Promises can't be cancelled — the work can. I pass a <code>signal</code> to <code>fetch</code> and to my own async helpers; the promise rejects with <code>AbortError</code>, which the UI treats as “not an error”. <code>AbortSignal.timeout</code> gives deadlines and <code>AbortSignal.any</code> combines user-cancel with a timeout. In React I abort in effect cleanup, and TanStack Query passes a signal to the query function and aborts when nobody needs the query — that's what Smart FAQ's HTTP client does. And aborting a POST doesn't roll back the server: the write may already have happened.",
          ar: "الـ promises مينفعش تتلغي — الشغل هو اللي بيتلغي. ببعت <code>signal</code> لـ <code>fetch</code> وللـ helpers الـ async بتاعتي؛ والـ promise بيعمل reject بـ <code>AbortError</code>، والـ UI بيعتبره «مش error». و <code>AbortSignal.timeout</code> للمهلة، و <code>AbortSignal.any</code> بيجمع إلغاء اليوزر مع الـ timeout. وفي React بعمل abort في الـ cleanup بتاع الـ effect، و TanStack Query بيبعت signal للـ query function ويعمل abort لما محدش يبقى محتاج الـ query — وده اللي الـ HTTP client في Smart FAQ بيعمله. والـ abort لـ POST مش بيرجّع اللي حصل على السيرفر: ممكن الكتابة تكون حصلت خلاص."
        }
      },
      {
        q: "How do you handle errors in async code across an app?",
        mid: { en: "I wrap <code>await</code> calls in <code>try/catch</code> and show a message.", ar: "بلف الـ <code>await</code> في <code>try/catch</code> وبعرض رسالة." },
        senior: {
          en: "Turn transport failures into typed errors at one boundary (an <code>ApiError</code> with status and code), let them propagate instead of catching everywhere, and handle them in one place per concern: TanStack Query error state or <code>onError</code>, error boundaries for render failures, form-level errors for 4xx validation. Tell apart aborted, expected and unexpected errors. Retry only idempotent requests, with backoff. Report <code>unhandledrejection</code> to monitoring, and lint for floating promises.",
          ar: "بحوّل أخطاء الشبكة لـ errors بنوع واضح في مكان واحد (<code>ApiError</code> فيه الـ status والـ code)، وبسيبها تطلع لفوق بدل ما أعمل catch في كل حتة، وبتعامل معاها في مكان واحد لكل نوع: الـ error state أو <code>onError</code> في TanStack Query، والـ error boundaries لأخطاء الـ render، وأخطاء الفورم لـ validation الـ 4xx. وبفرّق بين اللي اتلغى، والمتوقع، واللي مش متوقع. وبعمل retry للـ requests الـ idempotent بس، مع backoff. وببعت <code>unhandledrejection</code> للـ monitoring، وبعمل lint للـ floating promises."
        }
      }
    ],
    drill: [
      {
        q: "What happens when a promise rejects and nobody handles it?",
        a: { en: "Browsers fire an <code>unhandledrejection</code> event and log an error. Node 15+ crashes the process by default (<code>--unhandled-rejections=throw</code>).", ar: "المتصفحات بتطلع event اسمه <code>unhandledrejection</code> وتكتب error. و Node 15 وأحدث بيوقّع الـ process افتراضيًا (<code>--unhandled-rejections=throw</code>)." },
        follow: [
          {
            q: "What if you attach the catch a moment later?",
            a: { en: "The check runs once the microtask queue drains. A <code>catch</code> attached from a later task is too late: Node has already crashed; browsers report it and then fire <code>rejectionhandled</code>.", ar: "الـ check بيحصل أول ما طابور الـ microtasks يفضى. فالـ <code>catch</code> اللي بيتحط من task بعد كده بيبقى متأخر: Node بيكون وقع خلاص؛ والمتصفحات بتبلّغ عنه وبعدين تطلع <code>rejectionhandled</code>." },
            follow: [
              {
                q: "So how do you start work now and handle it later safely?",
                a: { en: "Attach a handler right away (keep the promise but add <code>.catch</code> that records the error), or collect results with <code>Promise.allSettled</code>, or create the promise only when you're ready to await it.", ar: "حط handler على طول (احتفظ بالـ promise بس زوّد <code>.catch</code> يسجّل الـ error)، أو اجمع النتايج بـ <code>Promise.allSettled</code>، أو متعملش الـ promise غير لما تكون جاهز تعمل له await." }
              }
            ]
          }
        ]
      }
    ],
    story: {
      text: { en: "Smart FAQ HTTP client: throws a typed ApiError when the response isn't ok, passes the AbortSignal from React Query, and shares one in-flight antiforgery refresh between parallel calls.", ar: "الـ HTTP client في Smart FAQ: بيرمي ApiError بنوع واضح لما الـ response يبقى مش ok، وبيبعت الـ AbortSignal اللي جاي من React Query، وبيشارك refresh واحد للـ antiforgery token بين النداءات اللي شغالة مع بعض." },
      p: "smartfaq", tab: "how", label: "Smart FAQ"
    },
    sources: [
      { label: "MDN — Using promises", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises" },
      { label: "MDN — AbortController", url: "https://developer.mozilla.org/en-US/docs/Web/API/AbortController" },
      { label: "MDN — AbortSignal.any()", url: "https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/any_static" },
      { label: "Node.js — --unhandled-rejections", url: "https://nodejs.org/api/cli.html#--unhandled-rejectionsmode" },
      { label: "TanStack Query — Query cancellation", url: "https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation" }
    ]
  }
,

  references: {
    why: {
      en: "This is where JavaScript meets React performance. Interviewers ask about copying to find out if you know why <code>React.memo</code> “doesn't work”, why state updates are ignored, and when a deep clone is the wrong fix.",
      ar: "هنا JavaScript بتقابل أداء React. الإنترفيورز بيسألوا عن النسخ علشان يعرفوا إنت فاهم ليه <code>React.memo</code> «مش شغال»، وليه تحديثات الـ state بتتجاهل، وإمتى الـ deep clone يبقى حل غلط."
    },
    how: [
      {
        title: { en: "Pass by sharing: the value of an object variable is a reference", ar: "Pass by sharing: قيمة متغير الـ object هي reference" },
        body: {
          en: "JavaScript always passes values. For objects the value is a reference, so the function can mutate the caller's object, but reassigning the parameter only changes the local variable.",
          ar: "الـ JavaScript دايمًا بيبعت قيم. وفي الـ objects القيمة دي reference، فالـ function تقدر تعدّل الـ object بتاع اللي نادى، لكن لو عملت assign للـ parameter بيتغير المتغير المحلي بس."
        },
        code: "function change(o) { o.a = 2; o = { a: 3 }; }\nconst obj = { a: 1 };\nchange(obj);\nconsole.log(obj.a);",
        out: "2",
        run: "node"
      },
      {
        title: { en: "Spread copies one level", ar: "الـ spread بينسخ مستوى واحد" },
        body: {
          en: "<code>{ ...a }</code>, <code>Object.assign</code>, <code>[...arr]</code> and <code>Array.from</code> create a new outer object but keep the same nested objects. Changing a nested field through the copy changes the original; replacing a nested field doesn't.",
          ar: "<code>{ ...a }</code> و <code>Object.assign</code> و <code>[...arr]</code> و <code>Array.from</code> بيعملوا object جديد من برّه بس الـ objects اللي جوه هي هي. لو عدّلت field جوه من النسخة، الأصل بيتغير؛ لكن لو بدّلت الـ field كله لأ."
        },
        code: "const a = { user: { name: \"A\" }, tags: [\"x\"] };\nconst b = { ...a };\nb.user.name = \"B\";\nb.tags = [...b.tags, \"y\"];\nconsole.log(a.user.name, a.tags.length);",
        out: "B 1",
        run: "node"
      },
      {
        title: { en: "structuredClone: a real deep copy, with limits", ar: "الـ structuredClone: deep copy حقيقي، بس ليه حدود" },
        body: {
          en: "It copies Dates, Maps, Sets, typed arrays and circular references. It does <b>not</b> copy functions (throws <code>DataCloneError</code>), DOM nodes, or class identity — a class instance comes back as a plain object.",
          ar: "بينسخ الـ Dates والـ Maps والـ Sets والـ typed arrays والـ references الدايرية. لكن <b>مش</b> بينسخ functions (بيرمي <code>DataCloneError</code>)، ولا DOM nodes، ولا نوع الـ class — الـ instance بيرجع plain object."
        },
        code: "const src = { d: new Date(0), m: new Map([[\"k\", 1]]) };\nsrc.self = src;\nconst copy = structuredClone(src);\nconsole.log(copy.d instanceof Date, copy.m.get(\"k\"), copy.self === copy);\nclass Point { constructor() { this.x = 1; } }\nconsole.log(structuredClone(new Point()) instanceof Point);\ntry { structuredClone({ f() {} }); } catch (e) { console.log(e.name); }",
        out: "true 1 true\nfalse\nDataCloneError",
        run: "node"
      },
      {
        title: { en: "Structural sharing: copy only the path that changed", ar: "الـ Structural sharing: انسخ الطريق اللي اتغير بس" },
        body: {
          en: "An immutable update makes new objects along the changed path and reuses everything else. Unchanged items keep their identity, so <code>memo</code>, selectors and effect deps can compare with <code>===</code> and skip work.",
          ar: "الـ immutable update بيعمل objects جديدة على طول الطريق اللي اتغير بس، وبيستخدم الباقي زي ما هو. فالحاجات اللي متغيرتش بتفضل نفس الـ reference، و <code>memo</code> والـ selectors والـ deps بتاعة الـ effects تقدر تقارن بـ <code>===</code> وتتخطى الشغل."
        },
        code: "const state = { todos: [{ id: 1, done: false }, { id: 2, done: false }], filter: \"all\" };\nconst next = { ...state, todos: state.todos.map((t) => (t.id === 2 ? { ...t, done: true } : t)) };\nconsole.log(next.todos[0] === state.todos[0], next.todos[1] === state.todos[1], next.filter === state.filter);",
        out: "true false true",
        run: "node"
      },
      {
        title: { en: "const and Object.freeze are both shallow", ar: "الـ const و Object.freeze الاتنين shallow" },
        body: {
          en: "<code>const</code> stops reassigning the variable, not changing the object. <code>Object.freeze</code> locks one level; nested objects stay mutable.",
          ar: "الـ <code>const</code> بيمنع إنك تعمل assign للمتغير تاني، مش إن الـ object يتغير. و <code>Object.freeze</code> بيقفل مستوى واحد؛ والـ objects اللي جوه بتفضل تتغير عادي."
        },
        code: "const cfg = Object.freeze({ api: { url: \"a\" } });\ncfg.api.url = \"b\";\nconsole.log(cfg.api.url);",
        out: "b",
        run: "node"
      }
    ],
    breaks: [
      {
        title: { en: "Mutating state: React bails out", ar: "تعديل الـ state مباشرة: React مش بيعمل render" },
        body: {
          en: "<code>setItems(items)</code> after <code>items.push(x)</code> passes the same reference, <code>Object.is</code> says nothing changed, and React skips the render. Worse, a later unrelated render shows the mutation, so the bug looks random.",
          ar: "لو عملت <code>items.push(x)</code> وبعدين <code>setItems(items)</code>، إنت بتبعت نفس الـ reference، و <code>Object.is</code> بيقول مفيش حاجة اتغيرت، و React بيتخطى الـ render. والأوحش إن أي render بعد كده لسبب تاني بيعرض التعديل، فالـ bug يبان كأنه عشوائي."
        },
        code: "items.push(newItem);\nsetItems(items);                         // same reference → no render\n\nsetItems((prev) => [...prev, newItem]);  // new array → renders",
        run: "browser",
        fix: { en: "Always create new objects for the changed path; use copying array methods (<code>toSorted</code>, <code>toSpliced</code>, <code>with</code>) or Immer for deep updates.", ar: "دايمًا اعمل objects جديدة للطريق اللي اتغير؛ واستخدم الـ array methods اللي بتنسخ (<code>toSorted</code>، <code>toSpliced</code>، <code>with</code>) أو Immer للتحديثات العميقة." }
      },
      {
        title: { en: "New references every render defeat memo", ar: "references جديدة مع كل render بتبوّظ الـ memo" },
        body: {
          en: "An inline array, object or arrow is a new reference each render. <code>React.memo</code> compares props with <code>Object.is</code>, so it never skips; an effect with that object in its deps runs every render.",
          ar: "أي array أو object أو arrow مكتوب inline بيبقى reference جديد كل render. و <code>React.memo</code> بيقارن الـ props بـ <code>Object.is</code>، فعمره ما بيتخطى؛ وأي effect الـ object ده في الـ deps بتاعته بيشتغل كل render."
        },
        code: "<Row actions={[edit, remove]} />                // memo(Row) never skips\nuseEffect(() => load(options), [options]);       // options = {} made in render → runs every render",
        run: "browser",
        fix: { en: "Pass primitives or stable references (<code>useMemo</code>/<code>useCallback</code>), move constants out of the component, or compare only the fields that matter in a custom <code>areEqual</code>.", ar: "ابعت primitives أو references ثابتة (<code>useMemo</code>/<code>useCallback</code>)، وطلّع الثوابت برّه الـ component، أو قارن الـ fields المهمة بس في <code>areEqual</code> بتاعتك." }
      },
      {
        title: { en: "Deep cloning as a “fix”", ar: "الـ deep clone كـ «حل»" },
        body: {
          en: "Cloning the whole state on every update is O(size), and it gives every nested object a new identity — so every memoised child and selector re-runs. It hides mutation bugs by making everything change.",
          ar: "إنك تعمل clone للـ state كله مع كل تحديث تمنه على قد حجمه، وبيدي كل object جوه reference جديد — فكل child معمول له memo وكل selector بيشتغل تاني. وهو بيخبّي bugs الـ mutation عن طريق إنه بيغيّر كل حاجة."
        },
        fix: { en: "Copy only the changed path (structural sharing). Use <code>structuredClone</code> for real snapshots — undo history, sending to a worker — not for routine updates.", ar: "انسخ الطريق اللي اتغير بس (structural sharing). واستخدم <code>structuredClone</code> للـ snapshots الحقيقية — زي الـ undo أو إنك تبعت لـ worker — مش للتحديثات العادية." }
      }
    ],
    levels: [
      {
        q: "Shallow copy vs deep copy?",
        mid: { en: "Spread is shallow. For deep copies use <code>JSON.parse(JSON.stringify())</code> or <code>structuredClone</code>.", ar: "الـ spread shallow. وللـ deep copy استخدم <code>JSON.parse(JSON.stringify())</code> أو <code>structuredClone</code>." },
        senior: {
          en: "Spread copies one level. For deep copies I know what each tool loses: the JSON round-trip drops Dates, <code>undefined</code> and Maps and throws on cycles; <code>structuredClone</code> keeps those but drops functions and class identity. In state I rarely want a deep copy at all: structural sharing keeps unchanged parts identical, and that identity is what memo and selectors rely on.",
          ar: "الـ spread بينسخ مستوى واحد. وفي الـ deep copy عارف كل أداة بتضيّع إيه: الـ JSON بيضيّع الـ Dates والـ <code>undefined</code> والـ Maps وبيرمي error مع الـ cycles؛ والـ <code>structuredClone</code> بيحافظ عليهم بس بيضيّع الـ functions ونوع الـ class. وفي الـ state نادرًا ما بحتاج deep copy أصلًا: الـ structural sharing بيخلي الأجزاء اللي متغيرتش زي ما هي، والـ identity دي هي اللي الـ memo والـ selectors معتمدين عليها."
        }
      },
      {
        q: "Why does React want immutable updates?",
        mid: { en: "So React can detect that something changed.", ar: "علشان React يعرف إن في حاجة اتغيرت." },
        senior: {
          en: "React compares with <code>Object.is</code> — the state bail-out, <code>memo</code> props, effect deps. That's O(1) instead of a deep comparison, and it's only correct if “changed” means “new reference”. Immutable updates also keep render pure — React may render a component, throw the result away and render again under concurrent features, so mutating during render leaks half-done changes — and they make snapshots, undo and debugging cheap.",
          ar: "React بيقارن بـ <code>Object.is</code> — في الـ state bail-out، وفي props الـ <code>memo</code>، وفي deps الـ effects. ودي O(1) بدل مقارنة عميقة، وتبقى صح بس لو «اتغير» معناها «reference جديد». والـ immutable updates كمان بتخلي الـ render pure — React ممكن يعمل render لـ component ويرمي النتيجة ويعمل render تاني مع الـ concurrent features، فالتعديل وقت الـ render بيسرّب تغييرات نصها خلص — وبتخلي الـ snapshots والـ undo والـ debugging رخيصين."
        }
      }
    ],
    drill: [
      {
        q: "Is JavaScript pass-by-reference?",
        a: { en: "No — pass by value, where an object's value is a reference (call by sharing).", ar: "لأ — pass by value، بس قيمة الـ object هي reference (call by sharing)." },
        follow: [
          {
            q: "How would you prove it?",
            a: { en: "Reassign the parameter inside a function: the caller's variable doesn't change. With true pass-by-reference it would.", ar: "اعمل assign للـ parameter جوه function: المتغير بتاع اللي نادى مش بيتغير. ولو كانت pass-by-reference حقيقية كان هيتغير." },
            follow: [
              {
                q: "Then what does const guarantee?",
                a: { en: "Only that the binding can't be reassigned. The object can still change; use <code>Object.freeze</code> (shallow) or <code>readonly</code> types to state intent.", ar: "إن الـ binding مينفعش يتعمل له assign تاني بس. والـ object لسه ينفع يتغير؛ استخدم <code>Object.freeze</code> (shallow) أو أنواع <code>readonly</code> علشان توضّح النية." }
              }
            ]
          }
        ]
      }
    ],
    story: {
      text: { en: "Smart FAQ's memoised row menu compares only the fields it shows, because the actions array is a new reference every render.", ar: "الـ row menu في Smart FAQ معمول له memo وبيقارن الـ fields اللي بيعرضها بس، لأن الـ actions array بيبقى reference جديد مع كل render." },
      p: "smartfaq", tab: "problems", label: "Smart FAQ"
    },
    sources: [
      { label: "MDN — structuredClone()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone" },
      { label: "MDN — The structured clone algorithm", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm" },
      { label: "react.dev — Updating objects in state", url: "https://react.dev/learn/updating-objects-in-state" },
      { label: "MDN — Object.freeze()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze" }
    ]
  },

  arrays: {
    why: {
      en: "Array questions test two things at once: whether you know which methods mutate (state bugs) and whether you notice hidden O(n²) work in render (performance bugs).",
      ar: "أسئلة الـ arrays بتختبر حاجتين مع بعض: تعرف أنهي methods بتعدّل (bugs في الـ state)، وتاخد بالك من شغل O(n²) مستخبي في الـ render (bugs في الأداء)."
    },
    how: [
      {
        title: { en: "Mutating methods and their copying twins", ar: "الـ methods اللي بتعدّل والنسخ بتاعتها" },
        body: {
          en: "These change the array in place: <code>push</code>, <code>pop</code>, <code>shift</code>, <code>unshift</code>, <code>splice</code>, <code>sort</code>, <code>reverse</code>, <code>fill</code>, <code>copyWithin</code>. ES2023 added copies that return a new array: <code>toSorted</code>, <code>toReversed</code>, <code>toSpliced</code>, <code>with(index, value)</code>.",
          ar: "دول بيعدّلوا الـ array نفسه: <code>push</code> و <code>pop</code> و <code>shift</code> و <code>unshift</code> و <code>splice</code> و <code>sort</code> و <code>reverse</code> و <code>fill</code> و <code>copyWithin</code>. و ES2023 ضاف نسخ بترجّع array جديد: <code>toSorted</code> و <code>toReversed</code> و <code>toSpliced</code> و <code>with(index, value)</code>."
        },
        code: "const a = [3, 1, 2];\nconst s = a.toSorted();\nconsole.log(a.join(), s.join(), a.with(0, 9).join(), a.join());",
        out: "3,1,2 1,2,3 9,1,2 3,1,2",
        run: "node"
      },
      {
        title: { en: "sort compares strings unless you say otherwise", ar: "الـ sort بيقارن كـ strings إلا لو قلت غير كده" },
        body: {
          en: "The default comparator converts items to strings and compares UTF-16 code units. Since ES2019 sort is <b>stable</b>: equal items keep their order, so you can sort by a secondary key first and then by the primary key.",
          ar: "الـ comparator الافتراضي بيحوّل العناصر لـ strings ويقارن الـ UTF-16 code units. ومن ES2019 الـ sort بقى <b>stable</b>: العناصر المتساوية بتحافظ على ترتيبها، فتقدر ترتّب بالـ key التاني الأول وبعدين بالـ key الأساسي."
        },
        code: "console.log([10, 9, 1].sort().join(), [10, 9, 1].sort((x, y) => x - y).join());",
        out: "1,10,9 1,9,10",
        run: "node"
      },
      {
        title: { en: "Holes are not undefined", ar: "الفراغات مش undefined" },
        body: {
          en: "<code>new Array(3)</code> has a length but no elements. <code>map</code>, <code>forEach</code> and <code>filter</code> skip holes, so <code>new Array(3).map(...)</code> does nothing. <code>Array.from({ length })</code> creates real elements.",
          ar: "الـ <code>new Array(3)</code> ليه length بس مفيهوش عناصر. و <code>map</code> و <code>forEach</code> و <code>filter</code> بيتخطوا الفراغات، فـ <code>new Array(3).map(...)</code> مش بيعمل حاجة. و <code>Array.from({ length })</code> بيعمل عناصر حقيقية."
        },
        code: "const holes = new Array(3);\nconsole.log(holes.map(() => 1).length, holes.map(() => 1)[0], Array.from({ length: 3 }, () => 1).join());",
        out: "3 undefined 1,1,1",
        run: "node"
      },
      {
        title: { en: "The cost model: lookups and shifts are O(n)", ar: "حساب التكلفة: البحث والـ shift بـ O(n)" },
        body: {
          en: "<code>includes</code>, <code>find</code> and <code>indexOf</code> scan the array; <code>shift</code>/<code>unshift</code> move every element. Inside a loop over another list that's O(n·m). Build a <code>Set</code> or <code>Map</code> once and look up in O(1).",
          ar: "الـ <code>includes</code> و <code>find</code> و <code>indexOf</code> بيلفوا على الـ array كله؛ و <code>shift</code>/<code>unshift</code> بيحرّكوا كل العناصر. ولو ده جوه loop على list تانية يبقى O(n·m). اعمل <code>Set</code> أو <code>Map</code> مرة واحدة ودوّر فيه بـ O(1)."
        },
        code: "const rows = Array.from({ length: 5 }, (_, i) => ({ id: i }));\nconst selected = [{ id: 1 }, { id: 3 }];\nconst ids = new Set(selected.map((s) => s.id));      // O(m) once\nconsole.log(rows.filter((r) => ids.has(r.id)).map((r) => r.id).join()); // O(1) per row",
        out: "1,3",
        run: "node"
      }
    ],
    breaks: [
      {
        title: { en: "sort() on props or state", ar: "sort() على props أو state" },
        body: {
          en: "<code>items.sort(byName)</code> in render reorders the parent's array in place: the parent's data changes without a state update, and memo comparisons see the same reference.",
          ar: "<code>items.sort(byName)</code> جوه الـ render بيرتّب الـ array بتاع الـ parent نفسه: داتا الـ parent بتتغير من غير state update، ومقارنات الـ memo بتشوف نفس الـ reference."
        },
        code: "const sorted = items.sort(byName);      // mutates the prop\nconst sorted = items.toSorted(byName);  // new array",
        run: "browser",
        fix: { en: "Use <code>toSorted</code> (or <code>[...items].sort()</code>), and wrap it in <code>useMemo</code> if the list is big.", ar: "استخدم <code>toSorted</code> (أو <code>[...items].sort()</code>)، ولفّه في <code>useMemo</code> لو الـ list كبيرة." }
      },
      {
        title: { en: "reduce without an initial value", ar: "reduce من غير قيمة بداية" },
        body: {
          en: "With no initial value, <code>reduce</code> uses the first element — and throws on an empty array. The bug appears only when the API returns no rows.",
          ar: "من غير قيمة بداية، <code>reduce</code> بيستخدم أول عنصر — وبيرمي error لو الـ array فاضي. والـ bug بيظهر بس لما الـ API يرجّع مفيش rows."
        },
        code: "try { [].reduce((a, b) => a + b); } catch (e) { console.log(e.name); }\nconsole.log([].reduce((a, b) => a + b, 0));",
        out: "TypeError\n0",
        run: "node",
        fix: { en: "Always pass the initial value — it also fixes the result's type.", ar: "دايمًا ابعت قيمة البداية — وده كمان بيحدد نوع النتيجة." }
      },
      {
        title: { en: "Removing items while looping forward", ar: "شيل عناصر وإنت ماشي لقدام في الـ loop" },
        body: {
          en: "<code>splice</code> shifts the rest left, so the loop skips the element that moved into the current index.",
          ar: "الـ <code>splice</code> بيزحلق الباقي لليسار، فالـ loop بيتخطى العنصر اللي جه مكان الـ index الحالي."
        },
        code: "const xs = [1, 2, 2, 3];\nxs.forEach((x, i) => { if (x === 2) xs.splice(i, 1); });\nconsole.log(xs.join());",
        out: "1,2,3",
        run: "node",
        fix: { en: "Use <code>filter</code> (or loop backwards if you must mutate).", ar: "استخدم <code>filter</code> (أو لف من الآخر للأول لو لازم تعدّل)." }
      }
    ],
    levels: [
      {
        q: "Which array methods mutate, and why does it matter?",
        mid: { en: "<code>push</code>, <code>pop</code>, <code>splice</code>, <code>sort</code>, <code>reverse</code> mutate; <code>map</code>, <code>filter</code>, <code>slice</code> don't. Mutation can break React state.", ar: "<code>push</code> و <code>pop</code> و <code>splice</code> و <code>sort</code> و <code>reverse</code> بيعدّلوا؛ و <code>map</code> و <code>filter</code> و <code>slice</code> لأ. والتعديل ممكن يبوّظ الـ state في React." },
        senior: {
          en: "Same list, plus why it bites: React and Redux detect changes by reference, and arrays are shared between components and caches, so an in-place <code>sort</code> changes someone else's data silently. I use the ES2023 copies (<code>toSorted</code>, <code>toSpliced</code>, <code>with</code>). I also watch the cost side: <code>includes</code>/<code>find</code> inside a <code>map</code> is O(n·m) in render, so I build a <code>Set</code> or <code>Map</code> first.",
          ar: "نفس الليستة، وزيادة ليه بتأذي: React و Redux بيعرفوا التغيير بالـ reference، والـ arrays بتتشارك بين components و caches، فـ <code>sort</code> في مكانه بيغيّر داتا حد تاني من غير ما حد ياخد باله. فبستخدم النسخ بتاعة ES2023 (<code>toSorted</code> و <code>toSpliced</code> و <code>with</code>). وباخد بالي من التكلفة كمان: <code>includes</code>/<code>find</code> جوه <code>map</code> يبقى O(n·m) في الـ render، فبعمل <code>Set</code> أو <code>Map</code> الأول."
        }
      },
      {
        q: "map, forEach, for...of or reduce — when do you use which?",
        mid: { en: "<code>map</code> to transform, <code>forEach</code> for side effects, <code>reduce</code> to compute one value.", ar: "<code>map</code> للتحويل، و <code>forEach</code> للـ side effects، و <code>reduce</code> علشان تطلع قيمة واحدة." },
        senior: {
          en: "<code>map</code>/<code>filter</code> when I produce a new array. <code>for...of</code> when I need <code>break</code>, <code>continue</code> or sequential <code>await</code> — <code>forEach</code> supports none of those. <code>reduce</code> only when it reads more clearly than a loop; for grouping there's now <code>Object.groupBy</code>/<code>Map.groupBy</code>. And I don't chain five passes over a huge list in a hot path.",
          ar: "<code>map</code>/<code>filter</code> لما بطلّع array جديد. و <code>for...of</code> لما أحتاج <code>break</code> أو <code>continue</code> أو <code>await</code> ورا بعض — و <code>forEach</code> مبيدعمش أي واحدة منهم. و <code>reduce</code> بس لما يبقى أوضح من loop؛ وللـ grouping فيه دلوقتي <code>Object.groupBy</code>/<code>Map.groupBy</code>. ومش بعمل 5 لفات ورا بعض على list ضخمة في مكان بيتنادى كتير."
        }
      }
    ],
    drill: [
      {
        q: "Why does [10, 9, 1].sort() give 1,10,9?",
        a: { en: "The default comparator compares strings: \"10\" &lt; \"9\" because \"1\" &lt; \"9\".", ar: "الـ comparator الافتراضي بيقارن strings: \"10\" &lt; \"9\" لأن \"1\" &lt; \"9\"." },
        follow: [
          {
            q: "Is sort stable?",
            a: { en: "Yes, since ES2019 (V8 uses TimSort). Equal items keep their original order.", ar: "أيوه، من ES2019 (الـ V8 بيستخدم TimSort). العناصر المتساوية بتحافظ على ترتيبها." },
            follow: [
              {
                q: "What must a comparator guarantee?",
                a: { en: "Consistency: negative, zero or positive, and the same answer for the same pair every time. A random comparator used for shuffling is inconsistent and biased — use Fisher–Yates.", ar: "إنه يكون ثابت: سالب أو صفر أو موجب، ونفس الإجابة لنفس الاتنين كل مرة. والـ comparator العشوائي اللي بيتستخدم للـ shuffle مش ثابت ونتيجته مش عادلة — استخدم Fisher–Yates." }
              }
            ]
          }
        ]
      }
    ],
    sources: [
      { label: "MDN — Array (copying methods and mutating methods)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#copying_methods_and_mutating_methods" },
      { label: "V8 — Getting things sorted in V8", url: "https://v8.dev/blog/array-sort" },
      { label: "V8 — Elements kinds", url: "https://v8.dev/blog/elements-kinds" },
      { label: "MDN — Object.groupBy()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy" }
    ]
  },

  modules: {
    why: {
      en: "Module questions lead to bundle size, code splitting, “window is not defined” in Next.js and circular-import crashes — things you only explain well if you know how modules load.",
      ar: "أسئلة الـ modules بتوصل لحجم الـ bundle، والـ code splitting، و «window is not defined» في Next.js، والـ circular imports اللي بتوقّع — حاجات مش هتشرحها كويس غير لو فاهم الـ modules بتتحمّل إزاي."
    },
    how: [
      {
        title: { en: "ESM is static and loads in three phases", ar: "الـ ESM ثابت وبيتحمّل على 3 مراحل" },
        body: {
          en: "<b>Parse</b> every file and read its <code>import</code>/<code>export</code> statements (they can't be inside <code>if</code>), <b>link</b> imports to exports without running anything, then <b>evaluate</b> depth-first, each module once. Because the graph is known before running, bundlers can tree-shake and the engine can report a missing export before any code runs.",
          ar: "<b>Parse</b> لكل ملف وقراية الـ <code>import</code>/<code>export</code> بتوعه (مينفعش يبقوا جوه <code>if</code>)، وبعدين <b>link</b> للـ imports مع الـ exports من غير ما يشغّل حاجة، وبعدين <b>evaluate</b> من الأعمق للأعلى، وكل module مرة واحدة. ولأن الـ graph معروف قبل التشغيل، الـ bundlers تقدر تعمل tree-shaking، والـ engine يقدر يقولك إن في export ناقص قبل ما أي كود يشتغل."
        }
      },
      {
        title: { en: "Imports are live, read-only bindings", ar: "الـ imports عبارة عن bindings حية وللقراية بس" },
        body: {
          en: "An import is not a copy: it reads the exporter's current value. You can't assign to it — modules are strict, so it throws. CommonJS <code>require</code> gives you whatever <code>module.exports</code> held at that moment.",
          ar: "الـ import مش نسخة: بيقرا القيمة الحالية عند الملف اللي عامل export. ومينفعش تعمل له assign — الـ modules بتبقى strict، فبيرمي error. أما <code>require</code> في CommonJS فبيديك اللي كان في <code>module.exports</code> في اللحظة دي."
        },
        code: "\"use strict\";\nconst src = \"export let count = 0; export function inc() { count++; }\";\nimport(\"data:text/javascript,\" + encodeURIComponent(src)).then((m) => {\n  m.inc(); m.inc();\n  console.log(m.count);\n  try { m.count = 5; } catch (e) { console.log(e.name); }\n});",
        out: "2\nTypeError",
        run: "node"
      },
      {
        title: { en: "import() is a split point", ar: "الـ import() نقطة تقسيم" },
        body: {
          en: "Dynamic <code>import()</code> returns a promise of the module. Bundlers put that module (and what only it uses) in a separate chunk loaded on demand — that's what <code>React.lazy</code> and <code>next/dynamic</code> build on.",
          ar: "الـ <code>import()</code> الـ dynamic بيرجّع promise للـ module. والـ bundlers بتحط الـ module ده (واللي هو بس بيستخدمه) في chunk لوحده بيتحمّل وقت الحاجة — ودي اللي <code>React.lazy</code> و <code>next/dynamic</code> مبنيين عليها."
        },
        code: "const Chart = lazy(() => import(\"./Chart\"));   // separate chunk, loaded on first render\n\n<Suspense fallback={<Spinner />}>\n  <Chart data={data} />\n</Suspense>",
        run: "browser"
      },
      {
        title: { en: "Node: two systems and their interop", ar: "Node: نظامين والتعامل بينهم" },
        body: {
          en: "<code>\"type\": \"module\"</code> or <code>.mjs</code> means ESM, <code>.cjs</code> means CommonJS. ESM can import CommonJS (the default import is <code>module.exports</code>). Recent Node versions can also <code>require()</code> an ES module as long as its graph has no top-level <code>await</code>. Packages describe their entry points per environment in the <code>\"exports\"</code> field; shipping both formats risks two copies of the same state (the dual-package hazard).",
          ar: "<code>\"type\": \"module\"</code> أو <code>.mjs</code> معناها ESM، و <code>.cjs</code> معناها CommonJS. الـ ESM يقدر يعمل import لـ CommonJS (الـ default import بيبقى <code>module.exports</code>). وإصدارات Node الجديدة تقدر كمان تعمل <code>require()</code> لـ ES module طالما الـ graph بتاعه مفيهوش top-level <code>await</code>. والـ packages بتوصف نقط الدخول لكل بيئة في الـ field <code>\"exports\"</code>؛ ولو الـ package نازل بالشكلين، ممكن يبقى فيه نسختين من نفس الـ state (الـ dual-package hazard)."
        }
      }
    ],
    breaks: [
      {
        title: { en: "Side effects at import time crash SSR", ar: "الـ side effects وقت الـ import بتوقّع الـ SSR" },
        body: {
          en: "Top-level code runs when the module is first imported — on the server too. Reading <code>window</code> or <code>localStorage</code> there throws “window is not defined” during server rendering.",
          ar: "الكود اللي في أول مستوى بيشتغل أول ما الـ module يتعمل له import — وعلى السيرفر كمان. فلو قريت <code>window</code> أو <code>localStorage</code> هناك، هيرمي «window is not defined» وقت الـ server rendering."
        },
        code: "// utils/theme.ts\nconst saved = localStorage.getItem(\"theme\");   // runs on import → crashes on the server\nexport const theme = saved ?? \"light\";",
        run: "browser",
        fix: { en: "Read browser APIs inside functions or effects, guard with <code>typeof window !== \"undefined\"</code>, or load browser-only components with <code>next/dynamic</code> and <code>ssr: false</code>.", ar: "اقرا الـ browser APIs جوه functions أو effects، أو اتأكد بـ <code>typeof window !== \"undefined\"</code>، أو حمّل الـ components اللي للمتصفح بس بـ <code>next/dynamic</code> و <code>ssr: false</code>." }
      },
      {
        title: { en: "Barrel files bloat the graph", ar: "الـ barrel files بتنفخ الـ graph" },
        body: {
          en: "<code>import { Button } from \"@/components\"</code> through an <code>index.ts</code> that re-exports 200 files makes the dev server load all of them, and any file with side effects can't be tree-shaken out of the bundle.",
          ar: "<code>import { Button } from \"@/components\"</code> عن طريق <code>index.ts</code> بيعمل re-export لـ 200 ملف بيخلي الـ dev server يحمّلهم كلهم، وأي ملف فيه side effects مينفعش يتشال من الـ bundle بالـ tree-shaking."
        },
        fix: { en: "Import from the file directly, mark packages <code>\"sideEffects\": false</code> when true, use Next's <code>optimizePackageImports</code> for big libraries, and check with a bundle analyzer.", ar: "اعمل import من الملف نفسه، وعلّم الـ packages بـ <code>\"sideEffects\": false</code> لو ده صح، واستخدم <code>optimizePackageImports</code> في Next مع المكتبات الكبيرة، واتأكد بـ bundle analyzer." }
      },
      {
        title: { en: "Circular imports", ar: "الـ circular imports" },
        body: {
          en: "In a cycle, one module evaluates while the other is half-done. Reading its <code>const</code>/<code>class</code> exports at the top level throws “Cannot access before initialization”; function declarations work because they're initialised during linking.",
          ar: "في الـ cycle، module بيتعمل له evaluate والتاني لسه مخلصش. ولو قريت الـ <code>const</code>/<code>class</code> exports بتاعته في أول مستوى بيرمي «Cannot access before initialization»؛ والـ function declarations بتشتغل لأنها بتاخد قيمتها وقت الـ linking."
        },
        fix: { en: "Break the cycle (move shared code to a third module), read imports inside functions, and lint with <code>import/no-cycle</code>.", ar: "اكسر الـ cycle (انقل الكود المشترك لـ module تالت)، واقرا الـ imports جوه functions، واعمل lint بـ <code>import/no-cycle</code>." }
      }
    ],
    levels: [
      {
        q: "ES modules vs CommonJS?",
        mid: { en: "ESM uses <code>import</code>/<code>export</code> and is the standard; CommonJS uses <code>require</code> and is older Node.", ar: "الـ ESM بيستخدم <code>import</code>/<code>export</code> وهو الـ standard؛ والـ CommonJS بيستخدم <code>require</code> وده الـ Node القديم." },
        senior: {
          en: "ESM is static: the graph is known before running, which enables tree-shaking and early errors. Imports are live read-only bindings instead of value copies. Loading is async, so top-level <code>await</code> is possible, and modules are always strict. In Node there are file-type rules and interop rules — ESM imports CJS; newer Node can <code>require</code> synchronous ESM — plus the dual-package hazard. For apps I use ESM everywhere; CJS only where legacy tooling needs it.",
          ar: "الـ ESM ثابت: الـ graph معروف قبل التشغيل، وده بيسمح بالـ tree-shaking وبالـ errors بدري. والـ imports عبارة عن bindings حية للقراية بس بدل نسخ من القيم. والتحميل async، فينفع top-level <code>await</code>، والـ modules دايمًا strict. وفي Node فيه قواعد لنوع الملف وقواعد للتعامل بين الاتنين — الـ ESM يعمل import لـ CJS، و Node الجديد يقدر يعمل <code>require</code> لـ ESM اللي مفيهوش await في أول مستوى — وفيه كمان الـ dual-package hazard. وفي الـ apps بستخدم ESM في كل حتة؛ والـ CJS بس لما أداة قديمة تحتاجه."
        }
      },
      {
        q: "How does code splitting work, and where do you split?",
        mid: { en: "Dynamic <code>import()</code> creates a separate chunk that loads when needed.", ar: "الـ <code>import()</code> الـ dynamic بيعمل chunk لوحده بيتحمّل وقت الحاجة." },
        senior: {
          en: "The bundler treats each <code>import()</code> as a split point and emits a chunk plus a loader. I split by route first — Next.js already does this per route — then heavy, rarely used components: charts, rich editors, maps. I prefetch on hover or when the element enters the viewport, and avoid splitting too finely, which creates request waterfalls. I verify with a bundle analyzer and real loading metrics, not guesses.",
          ar: "الـ bundler بيعتبر كل <code>import()</code> نقطة تقسيم ويطلّع chunk ومعاه loader. بقسّم بالـ route الأول — و Next.js بيعمل كده لكل route أصلًا — وبعدين الـ components التقيلة اللي نادرًا ما بتتستخدم: charts و editors و maps. وبعمل prefetch لما الماوس يقف عليها أو لما الـ element يظهر في الشاشة، ومش بقسّم لحتت صغيرة أوي علشان متبقاش requests ورا بعض. وبتأكد بـ bundle analyzer وبأرقام تحميل حقيقية، مش بالتخمين."
        }
      }
    ],
    drill: [
      {
        q: "What is a live binding?",
        a: { en: "The importer sees the exporter's current value, not a copy taken at import time.", ar: "اللي عامل import بيشوف القيمة الحالية عند اللي عامل export، مش نسخة اتاخدت وقت الـ import." },
        follow: [
          {
            q: "Can the importer change it?",
            a: { en: "No. Imports are read-only; assigning throws a TypeError. Only the exporting module can change it (e.g. through an exported function).", ar: "لأ. الـ imports للقراية بس؛ والـ assign بيرمي TypeError. الـ module اللي عامل export بس هو اللي يقدر يغيّرها (مثلًا عن طريق function عاملها export)." },
            follow: [
              {
                q: "How does that relate to circular imports?",
                a: { en: "The binding exists from linking, before the exporter runs. Reading it during the cycle hits the TDZ for <code>let</code>/<code>const</code>/<code>class</code>; function declarations already have their value, so they work.", ar: "الـ binding موجود من وقت الـ linking، قبل ما الـ module اللي عامل export يشتغل. فلو اتقرا وقت الـ cycle بيقع في الـ TDZ لو <code>let</code>/<code>const</code>/<code>class</code>؛ والـ function declarations قيمتها موجودة من الأول، فبتشتغل." }
              }
            ]
          }
        ]
      }
    ],
    sources: [
      { label: "MDN — JavaScript modules", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules" },
      { label: "Node.js — ECMAScript modules", url: "https://nodejs.org/api/esm.html" },
      { label: "Node.js — Loading ECMAScript modules using require()", url: "https://nodejs.org/api/modules.html#loading-ecmascript-modules-using-require" },
      { label: "Next.js — optimizePackageImports", url: "https://nextjs.org/docs/app/api-reference/config/next-config-js/optimizePackageImports" }
    ]
  }
,

  "dom-events": {
    why: {
      en: "Event questions look old-school until they reach the bugs everyone ships: a modal that closes when you click inside it, an outside-click handler broken by <code>stopPropagation</code>, a scroll that janks. Knowing the dispatch path and React's event system explains all of them.",
      ar: "أسئلة الـ events شكلها قديمة لحد ما توصل للـ bugs اللي الكل بيعملها: modal بيتقفل لما تدوس جواه، و outside-click handler بايظ بسبب <code>stopPropagation</code>، و scroll بيقطّع. لو فاهم طريق الـ event ونظام الـ events في React، هتشرح كل ده."
    },
    how: [
      {
        title: { en: "Capture, target, bubble", ar: "Capture، وبعدين target، وبعدين bubble" },
        body: {
          en: "A dispatched event travels from <code>window</code> down to the target (capture phase), runs listeners on the target, then travels back up (bubble phase). <code>{ capture: true }</code> listens on the way down. Some events don't bubble — <code>focus</code>, <code>blur</code>, <code>mouseenter</code> — use <code>focusin</code>/<code>focusout</code> to delegate focus.",
          ar: "الـ event بيمشي من <code>window</code> لتحت لحد الـ target (مرحلة الـ capture)، ويشغّل الـ listeners اللي على الـ target، وبعدين يرجع لفوق (مرحلة الـ bubble). و <code>{ capture: true }</code> بيسمع وهو نازل. وفيه events مش بتعمل bubble — <code>focus</code> و <code>blur</code> و <code>mouseenter</code> — استخدم <code>focusin</code>/<code>focusout</code> لو عايز تعمل delegation للـ focus."
        },
        code: "document.body.addEventListener(\"click\", () => console.log(\"body capture\"), { capture: true });\ndocument.body.addEventListener(\"click\", () => console.log(\"body bubble\"));\nbutton.addEventListener(\"click\", () => console.log(\"button\"));\n// click the button → body capture, button, body bubble",
        run: "browser"
      },
      {
        title: { en: "target vs currentTarget, and the three “stops”", ar: "target قصاد currentTarget، والـ 3 «stops»" },
        body: {
          en: "<code>target</code> is where the event started (maybe an icon inside the button); <code>currentTarget</code> is the element whose listener is running. <code>preventDefault</code> cancels the browser's default action (submit, navigation) — it does not stop propagation. <code>stopPropagation</code> stops travel to the next elements; <code>stopImmediatePropagation</code> also skips the remaining listeners on the same element.",
          ar: "الـ <code>target</code> هو المكان اللي الـ event بدأ منه (ممكن icon جوه الزرار)؛ والـ <code>currentTarget</code> هو الـ element اللي الـ listener بتاعه شغال دلوقتي. و <code>preventDefault</code> بيلغي الأكشن الافتراضي للمتصفح (submit، navigation) — ومش بيوقف الانتشار. و <code>stopPropagation</code> بيوقف الوصول للـ elements اللي بعده؛ و <code>stopImmediatePropagation</code> كمان بيتخطى باقي الـ listeners على نفس الـ element."
        }
      },
      {
        title: { en: "Listener options: once, passive, signal", ar: "خيارات الـ listener: once و passive و signal" },
        body: {
          en: "<code>once</code> removes the listener after the first call. <code>passive: true</code> promises not to call <code>preventDefault</code>, so the browser can scroll without waiting for your JS (Chrome makes <code>touchstart</code>/<code>wheel</code> on <code>window</code>/<code>document</code> passive by default). <code>signal</code> lets one <code>AbortController</code> remove many listeners at once.",
          ar: "الـ <code>once</code> بيشيل الـ listener بعد أول مرة. و <code>passive: true</code> وعد إنك مش هتنادي <code>preventDefault</code>، فالمتصفح يقدر يعمل scroll من غير ما يستنى الـ JS بتاعك (و Chrome بيخلي <code>touchstart</code>/<code>wheel</code> على <code>window</code>/<code>document</code> passive افتراضيًا). و <code>signal</code> بيخلي <code>AbortController</code> واحد يشيل listeners كتير مرة واحدة."
        },
        code: "const ac = new AbortController();\nwindow.addEventListener(\"resize\", onResize, { signal: ac.signal });\nwindow.addEventListener(\"keydown\", onKey, { signal: ac.signal });\nac.abort();   // removes both — handy in effect cleanup",
        run: "browser"
      },
      {
        title: { en: "Delegation: one listener for many children", ar: "الـ Delegation: listener واحد لعيال كتير" },
        body: {
          en: "Listen on a parent and find the item with <code>event.target.closest(selector)</code> — <code>closest</code> because the click may land on a child of the item. It works for elements added later and saves listeners on long lists.",
          ar: "اسمع على الـ parent ولاقي العنصر بـ <code>event.target.closest(selector)</code> — <code>closest</code> لأن الضغطة ممكن تيجي على حاجة جوه العنصر. وبتشتغل مع الـ elements اللي بتتضاف بعدين، وبتوفر listeners في الـ lists الطويلة."
        },
        code: "list.addEventListener(\"click\", (e) => {\n  const row = e.target.closest(\"[data-id]\");\n  if (!row || !list.contains(row)) return;\n  open(row.dataset.id);\n});",
        run: "browser"
      },
      {
        title: { en: "React's event system", ar: "نظام الـ events في React" },
        body: {
          en: "Since React 17, React attaches listeners to the <b>root container</b> (before that, to <code>document</code>) and dispatches synthetic events through the <b>React tree</b>. So events from a portal bubble to the portal's React parent, even though the DOM node lives in <code>body</code>. React's <code>onFocus</code>/<code>onBlur</code> bubble (they use <code>focusin</code>/<code>focusout</code>), and <code>onScroll</code> no longer bubbles.",
          ar: "من React 17، React بيركّب الـ listeners على الـ <b>root container</b> (قبل كده كان على <code>document</code>) وبيمشّي الـ synthetic events في <b>شجرة React</b>. فالـ events اللي جاية من portal بتعمل bubble للـ parent بتاعه في React، حتى لو الـ DOM node موجود في <code>body</code>. و <code>onFocus</code>/<code>onBlur</code> في React بيعملوا bubble (بيستخدموا <code>focusin</code>/<code>focusout</code>)، و <code>onScroll</code> بطّل يعمل bubble."
        }
      }
    ],
    breaks: [
      {
        title: { en: "A click inside a portal triggers the parent's handler", ar: "ضغطة جوه portal بتشغّل handler الـ parent" },
        body: {
          en: "The modal is rendered into <code>body</code>, but in the React tree it's still inside the <code>div</code> with <code>onClick</code>, so clicking the modal also runs the parent's handler.",
          ar: "الـ modal بيترسم في <code>body</code>، بس في شجرة React لسه جوه الـ <code>div</code> اللي عليه <code>onClick</code>، فالضغط على الـ modal بيشغّل handler الـ parent كمان."
        },
        code: "<div onClick={closeMenu}>\n  {createPortal(<Modal onSave={save} />, document.body)}   {/* clicks in Modal also call closeMenu */}\n</div>",
        run: "browser",
        fix: { en: "Don't put click handlers on ancestors of portals, or check <code>e.currentTarget.contains(e.target)</code> (a DOM check) before acting, or stop propagation at the portal's root.", ar: "متحطش click handlers على الـ ancestors بتاعة الـ portals، أو اتأكد بـ <code>e.currentTarget.contains(e.target)</code> (check على الـ DOM) قبل ما تعمل حاجة، أو وقّف الانتشار عند أول الـ portal." }
      },
      {
        title: { en: "stopPropagation breaks other features", ar: "الـ stopPropagation بيبوّظ features تانية" },
        body: {
          en: "Outside-click detection, analytics and focus traps usually listen higher up. Stopping propagation “to fix” one component silently disables them for clicks inside it.",
          ar: "الـ outside-click والـ analytics والـ focus traps غالبًا بيسمعوا فوق. ولو وقفت الانتشار «علشان تصلّح» component، بتعطّلهم من غير ما تاخد بالك لأي ضغطة جواه."
        },
        fix: { en: "Let events travel; decide in the outer handler with <code>composedPath()</code> or <code>contains()</code> whether the click was inside.", ar: "سيب الـ events تمشي؛ وقرر في الـ handler اللي برّه بـ <code>composedPath()</code> أو <code>contains()</code> إذا كانت الضغطة جوه ولا لأ." }
      },
      {
        title: { en: "preventDefault in a passive listener", ar: "preventDefault في listener passive" },
        body: {
          en: "A passive listener can't cancel scrolling — the call is ignored with a console warning. Making every listener non-passive to get it back makes scrolling wait for JS.",
          ar: "الـ listener الـ passive مينفعش يلغي الـ scroll — النداء بيتجاهل ومعاه warning في الـ console. ولو خليت كل الـ listeners مش passive علشان ترجّعه، الـ scroll هيستنى الـ JS."
        },
        fix: { en: "Prefer CSS (<code>touch-action</code>, <code>overscroll-behavior</code>); use <code>{ passive: false }</code> only on the one element that truly needs to cancel.", ar: "الأحسن CSS (<code>touch-action</code>، <code>overscroll-behavior</code>)؛ واستخدم <code>{ passive: false }</code> بس على الـ element الوحيد اللي فعلًا محتاج يلغي." }
      }
    ],
    levels: [
      {
        q: "Explain event delegation.",
        mid: { en: "Put one listener on the parent and check <code>event.target</code> to know which child was clicked.", ar: "حط listener واحد على الـ parent وشوف <code>event.target</code> علشان تعرف أنهي child اتضغط." },
        senior: {
          en: "It relies on bubbling: one listener on a container, then <code>event.target.closest(selector)</code> to find the item, because the target can be a nested element. Benefits: fewer listeners, and it works for items added later. Limits: non-bubbling events (use <code>focusin</code>), and checking that the match is still inside the container. In React you rarely do it by hand — React already delegates everything to the root — but it's still the right tool for big vanilla lists or third-party DOM.",
          ar: "معتمدة على الـ bubbling: listener واحد على الـ container، وبعدين <code>event.target.closest(selector)</code> علشان تلاقي العنصر، لأن الـ target ممكن يكون element جوّاه. المميزات: listeners أقل، وبتشتغل مع العناصر اللي بتتضاف بعدين. الحدود: الـ events اللي مش بتعمل bubble (استخدم <code>focusin</code>)، وإنك تتأكد إن العنصر اللي لقيته لسه جوه الـ container. وفي React نادرًا ما بتعملها بإيدك — React بيعمل delegation لكل حاجة على الـ root أصلًا — بس لسه هي الأداة الصح للـ lists الكبيرة من غير framework أو للـ DOM اللي جاي من مكتبة تانية."
        }
      },
      {
        q: "stopPropagation vs preventDefault?",
        mid: { en: "<code>stopPropagation</code> stops the event from bubbling; <code>preventDefault</code> stops the default browser action.", ar: "<code>stopPropagation</code> بيوقف الـ bubbling؛ و <code>preventDefault</code> بيوقف الأكشن الافتراضي للمتصفح." },
        senior: {
          en: "Different jobs: <code>preventDefault</code> cancels the browser's action (needs a non-passive listener for scroll and touch); <code>stopPropagation</code> stops the event reaching other elements; <code>stopImmediatePropagation</code> also skips the remaining listeners on the same element. I avoid stopping propagation because it hides events from outside-click logic, analytics and focus management. I'd rather let the event travel and have the outer handler check where it came from.",
          ar: "كل واحد ليه شغلانة: <code>preventDefault</code> بيلغي أكشن المتصفح (ومحتاج listener مش passive مع الـ scroll والـ touch)؛ و <code>stopPropagation</code> بيمنع الـ event يوصل لـ elements تانية؛ و <code>stopImmediatePropagation</code> كمان بيتخطى باقي الـ listeners على نفس الـ element. وبتجنب إني أوقف الانتشار لأنه بيخبّي الـ events عن الـ outside-click والـ analytics وإدارة الـ focus. الأحسن أسيب الـ event يمشي، والـ handler اللي برّه يشوف هو جاي منين."
        }
      }
    ],
    drill: [
      {
        q: "Where does React attach its event listeners?",
        a: { en: "On the root container you pass to <code>createRoot</code> (since React 17; before that on <code>document</code>).", ar: "على الـ root container اللي بتبعته لـ <code>createRoot</code> (من React 17؛ قبلها كان على <code>document</code>)." },
        follow: [
          {
            q: "Why did they move it?",
            a: { en: "So several React roots or versions can live on one page, and so <code>e.stopPropagation()</code> in React behaves as expected for non-React listeners on <code>document</code>.", ar: "علشان أكتر من React root أو version يعيشوا في نفس الصفحة، وعلشان <code>e.stopPropagation()</code> في React يتصرف زي المتوقع مع الـ listeners اللي مش React على <code>document</code>." },
            follow: [
              {
                q: "Then does a click in a portal bubble to its DOM parent or its React parent?",
                a: { en: "For React handlers, the React parent. Native listeners still follow the DOM tree. That's why a portal modal can trigger a React <code>onClick</code> on an element it isn't inside in the DOM.", ar: "للـ handlers بتاعة React، الـ parent في React. والـ native listeners لسه بتمشي على شجرة الـ DOM. وعلشان كده modal في portal ممكن يشغّل <code>onClick</code> في React على element هو مش جواه في الـ DOM." }
              }
            ]
          }
        ]
      }
    ],
    sources: [
      { label: "MDN — Event bubbling", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling" },
      { label: "MDN — addEventListener() options", url: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener" },
      { label: "React 17 — Changes to event delegation", url: "https://legacy.reactjs.org/blog/2020/10/20/react-v17.html#changes-to-event-delegation" },
      { label: "react.dev — createPortal", url: "https://react.dev/reference/react-dom/createPortal" }
    ]
  },

  memory: {
    why: {
      en: "Memory questions check whether you can find a leak, not recite “mark and sweep”. Expect “a dashboard gets slow after an hour — what do you do?”, and be ready with a method and real causes.",
      ar: "أسئلة الذاكرة بتختبر إنك تقدر تلاقي leak، مش إنك تحفظ «mark and sweep». استنى سؤال زي «dashboard بيبطأ بعد ساعة — هتعمل إيه؟»، وخليك جاهز بطريقة وأسباب حقيقية."
    },
    how: [
      {
        title: { en: "Garbage collection is about reachability", ar: "الـ Garbage collection متعلق بإمكانية الوصول" },
        body: {
          en: "An object stays alive while it can be reached from a root: globals, the current stack, and anything held by closures, DOM nodes, listeners, timers or caches that are themselves reachable. A leak is not “memory GC missed” — it's an object you no longer need that something still references.",
          ar: "الـ object بيفضل عايش طول ما ينفع توصله من root: الـ globals، والـ stack الحالي، وأي حاجة ماسكاها closures أو DOM nodes أو listeners أو timers أو caches هي نفسها ينفع توصلها. والـ leak مش «ذاكرة الـ GC نسيها» — ده object إنت مش محتاجه بس لسه في حاجة ماسكة reference ليه."
        }
      },
      {
        title: { en: "V8 collects by generation", ar: "الـ V8 بيجمع حسب العمر" },
        body: {
          en: "Most objects die young. V8 allocates them in a small young generation cleaned often by a fast scavenger; survivors move to the old generation, cleaned by mark-compact, mostly incrementally and concurrently to keep pauses short. Allocating a lot in hot paths (every frame, every keystroke) still means more GC work and possible jank.",
          ar: "أغلب الـ objects بتموت صغيرة. الـ V8 بيحطها في young generation صغير بيتنضف كتير بـ scavenger سريع؛ واللي بيعيش بيتنقل للـ old generation اللي بيتنضف بـ mark-compact، وغالبًا على حتت وبالتوازي علشان الوقفات تبقى قصيرة. ولو عملت allocations كتير في أماكن بتتنادى كتير (كل frame، كل حرف)، ده برضه شغل GC أكتر وممكن تقطيع."
        }
      },
      {
        title: { en: "Weak references don't keep things alive", ar: "الـ weak references مش بتخلي الحاجة عايشة" },
        body: {
          en: "A <code>WeakMap</code> key doesn't keep its object alive: when the object is gone, the entry can go too. That makes it the right place for metadata about objects you don't own (DOM nodes, instances). It isn't iterable, because its contents depend on GC timing. <code>WeakRef</code> and <code>FinalizationRegistry</code> exist but are rarely the right tool.",
          ar: "الـ key في <code>WeakMap</code> مش بيخلي الـ object بتاعه عايش: لما الـ object يمشي، الـ entry ممكن يمشي معاه. وده بيخليه المكان الصح لأي metadata عن objects مش بتاعتك (DOM nodes، instances). ومينفعش تلف عليه، لأن محتواه معتمد على توقيت الـ GC. والـ <code>WeakRef</code> و <code>FinalizationRegistry</code> موجودين، بس نادرًا ما بيبقوا الأداة الصح."
        },
        code: "const meta = new WeakMap();\nlet el = { id: 1 };\nmeta.set(el, { clicks: 0 });\nconsole.log(meta.has(el));\nel = null;   // nothing else references the object → its entry can be collected",
        out: "true",
        run: "node"
      },
      {
        title: { en: "How to find a leak: compare heap snapshots", ar: "إزاي تلاقي leak: قارن heap snapshots" },
        body: {
          en: "Pick a repeatable action (open and close a modal, switch routes). In DevTools → Memory: take a snapshot, repeat the action several times, take another, and use the Comparison view. Look for counts that grow with each repeat and for “Detached” DOM nodes, then read the <b>Retainers</b> panel up to the root — it names the listener, timer, closure, store or cache holding it. Fix, and repeat to confirm the count stops growing.",
          ar: "اختار أكشن تقدر تكرره (افتح واقفل modal، اتنقل بين routes). في DevTools ← Memory: خد snapshot، كرر الأكشن كذا مرة، خد snapshot تاني، واستخدم الـ Comparison view. دوّر على أعداد بتزيد مع كل تكرار وعلى DOM nodes مكتوب عليها «Detached»، وبعدين اقرا الـ <b>Retainers</b> لحد الـ root — هيقولك أنهي listener أو timer أو closure أو store أو cache ماسكها. صلّح، وكرر تاني علشان تتأكد إن العدد بطّل يزيد."
        }
      }
    ],
    breaks: [
      {
        title: { en: "Subscriptions without cleanup", ar: "Subscriptions من غير cleanup" },
        body: {
          en: "Every time the effect re-runs (or the component remounts), a new connection, interval or listener starts. Without cleanup the old ones stay alive, keep their closures, and keep calling <code>setState</code> on unmounted components.",
          ar: "كل ما الـ effect يشتغل تاني (أو الـ component يتعمل له mount تاني)، connection أو interval أو listener جديد بيبدأ. ومن غير cleanup القديمة بتفضل عايشة، ماسكة الـ closures بتاعتها، وبتفضل تنادي <code>setState</code> على components اتشالت."
        },
        code: "useEffect(() => {\n  const conn = createConnection(token);\n  conn.start();\n  return () => conn.stop();   // without this, every token change leaks a live connection\n}, [token]);",
        run: "browser",
        fix: { en: "Every effect that starts something returns a cleanup; group DOM listeners with an <code>AbortController</code> signal.", ar: "أي effect بيبدأ حاجة لازم يرجّع cleanup؛ واجمع الـ DOM listeners بـ signal من <code>AbortController</code>." }
      },
      {
        title: { en: "Caches that only grow", ar: "Caches بتكبر بس" },
        body: {
          en: "A module-level <code>Map</code> keyed by query string, user input or URL grows for the whole session. That's a leak with a good intention.",
          ar: "الـ <code>Map</code> اللي في أول مستوى في الـ module والـ key بتاعه query string أو input أو URL بيكبر طول الـ session. ده leak بنية كويسة."
        },
        code: "const cache = new Map();\nfunction getCached(key, compute, max = 100) {\n  if (cache.has(key)) { const v = cache.get(key); cache.delete(key); cache.set(key, v); return v; }\n  const v = compute(key);\n  cache.set(key, v);\n  if (cache.size > max) cache.delete(cache.keys().next().value);   // drop the least recently used\n  return v;\n}\nfor (let i = 0; i < 1000; i++) getCached(\"q\" + i, (k) => k.toUpperCase());\nconsole.log(cache.size);",
        out: "100",
        run: "node",
        fix: { en: "Bound it (LRU, as above — a <code>Map</code> keeps insertion order), add a TTL, use a <code>WeakMap</code> when keys are objects, or let a library manage it (TanStack Query's <code>gcTime</code>).", ar: "حط له حد (LRU زي اللي فوق — الـ <code>Map</code> بيحافظ على ترتيب الإضافة)، أو TTL، أو <code>WeakMap</code> لو الـ keys objects، أو سيب مكتبة تديره (<code>gcTime</code> في TanStack Query)." }
      },
      {
        title: { en: "Detached DOM nodes", ar: "الـ DOM nodes المفصولة" },
        body: {
          en: "Removing an element from the page doesn't free it if JavaScript still holds it — in an array, a <code>Map</code>, a third-party widget instance, or a closure of a listener attached elsewhere. Its whole subtree stays in memory.",
          ar: "شيل element من الصفحة مش بيحرره لو الـ JavaScript لسه ماسكه — في array أو <code>Map</code> أو instance لـ widget من مكتبة تانية أو closure لـ listener متركب في حتة تانية. والشجرة اللي تحته كلها بتفضل في الذاكرة."
        },
        fix: { en: "Destroy third-party widgets in cleanup, keep element references in refs or a <code>WeakMap</code>, and search heap snapshots for “Detached”.", ar: "اعمل destroy لأي widget من مكتبة تانية في الـ cleanup، وخلي references الـ elements في refs أو <code>WeakMap</code>، ودوّر على «Detached» في الـ heap snapshots." }
      }
    ],
    levels: [
      {
        q: "How does garbage collection work in JavaScript?",
        mid: { en: "The engine frees memory that's no longer used, with mark and sweep.", ar: "الـ engine بيحرر الذاكرة اللي مبقتش مستخدمة، بـ mark and sweep." },
        senior: {
          en: "Reachability from roots decides what lives. V8 is generational: a fast scavenger for the young generation where most objects die, and mark-compact for the old generation, done incrementally and concurrently to keep pauses short. So a leak is a reachability bug — something still references what I don't need — and heavy allocation in hot paths shows up as GC pauses and jank.",
          ar: "اللي بيحدد مين يعيش هو إمكانية الوصول من الـ roots. والـ V8 بيقسم حسب العمر: scavenger سريع للـ young generation اللي أغلب الـ objects بتموت فيه، و mark-compact للـ old generation، بيتعمل على حتت وبالتوازي علشان الوقفات تبقى قصيرة. فالـ leak عبارة عن bug في الوصول — حاجة لسه ماسكة reference لحاجة مش محتاجها — والـ allocations الكتير في الأماكن اللي بتتنادى كتير بتبان كوقفات GC وتقطيع."
        }
      },
      {
        q: "A dashboard gets slower after an hour. How do you find a memory leak?",
        mid: { en: "Open Chrome DevTools, take a heap snapshot and look for big objects.", ar: "أفتح Chrome DevTools وآخد heap snapshot وأدوّر على الـ objects الكبيرة." },
        senior: {
          en: "First confirm it's memory: Performance monitor or the Memory panel's JS heap growing and not dropping after GC. Then a repeatable action — switch tabs, open and close a modal — with snapshots before and after N repeats, compared by delta. I look for counts that grow with N and for detached DOM, and follow the retainers to the root. The usual causes: missing effect cleanup (sockets, intervals, listeners), unbounded caches or stores, third-party widgets not destroyed. After the fix I repeat the same measurement.",
          ar: "الأول أتأكد إنها ذاكرة: الـ JS heap في الـ Performance monitor أو الـ Memory panel بيزيد ومش بينزل بعد الـ GC. وبعدين أكشن أقدر أكرره — أنقّل بين tabs، أفتح وأقفل modal — مع snapshots قبل وبعد N مرة، وأقارن بالفرق. بدوّر على أعداد بتزيد مع N وعلى DOM مفصول، وأمشي ورا الـ retainers لحد الـ root. والأسباب المعتادة: cleanup ناقص في الـ effects (sockets، intervals، listeners)، أو caches أو stores مالهاش حد، أو widgets من مكتبات تانية متعملهاش destroy. وبعد الحل بعيد نفس القياس."
        }
      }
    ],
    drill: [
      {
        q: "Can closures cause memory leaks?",
        a: { en: "Only if the closure itself stays reachable — as a listener, a timer, or a cache entry. Then everything it captures stays too.", ar: "بس لو الـ closure نفسه فضل ينفع يتوصل له — كـ listener أو timer أو entry في cache. ساعتها كل اللي ماسكه بيفضل كمان." },
        follow: [
          {
            q: "What's the subtle part in V8?",
            a: { en: "Closures created in the same scope share one context object. A big variable captured by any of them stays alive while any sibling closure is alive, even one that never uses it.", ar: "الـ closures اللي اتعملت في نفس الـ scope بتشارك context object واحد. فأي متغير كبير اتمسك في واحد منهم بيفضل عايش طول ما أي closure تاني منهم عايش، حتى لو مبيستخدمهوش." },
            follow: [
              {
                q: "How do you avoid it?",
                a: { en: "Extract the small value you need before creating long-lived callbacks, keep those callbacks in small scopes, and drop big references (<code>= null</code>) once you're done.", ar: "طلّع القيمة الصغيرة اللي محتاجها قبل ما تعمل callbacks عمرها طويل، وخلي الـ callbacks دي في scopes صغيرة، وسيب الـ references الكبيرة (<code>= null</code>) لما تخلص." }
              }
            ]
          }
        ]
      }
    ],
    story: {
      text: { en: "okoRent: the SignalR connection opens in an effect and is stopped in its cleanup; a new token reconnects.", ar: "okoRent: الـ SignalR connection بيتفتح في effect وبيتقفل في الـ cleanup بتاعه؛ ولما ييجي token جديد بيعمل reconnect." },
      p: "okorent", tab: "hooks", label: "okoRent"
    },
    sources: [
      { label: "MDN — Memory management", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management" },
      { label: "Chrome DevTools — Fix memory problems", url: "https://developer.chrome.com/docs/devtools/memory-problems" },
      { label: "V8 — Trash talk: the Orinoco garbage collector", url: "https://v8.dev/blog/trash-talk" },
      { label: "MDN — WeakMap", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap" }
    ]
  }
});
