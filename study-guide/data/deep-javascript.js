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
  }
});
