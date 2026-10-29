// Performance & Core Web Vitals — written 2026-10-29.
STUDY.fill("performance", {
  intro: { en: "Fast for real users: Core Web Vitals (LCP, INP, CLS) and their fixes, measuring (lab vs field), bundle size, React rendering performance, images and fonts, network, and long tasks.", ar: "سريع للمستخدمين الحقيقيين: Core Web Vitals (LCP و INP و CLS) وحلولهم، والقياس (lab ولا field)، وحجم الـ bundle، وأداء الـ rendering في React، والصور والخطوط، والشبكة، والـ long tasks." },
  topics: [
    {
      id: "cwv",
      title: { en: "Core Web Vitals: LCP, INP, CLS", ar: "Core Web Vitals: LCP و INP و CLS" },
      tldr: { en: "<b>LCP</b> (largest content shown) ≤ 2.5 s — loading. <b>INP</b> (slowest interaction to next paint) ≤ 200 ms — responsiveness (replaced FID in 2024). <b>CLS</b> (unexpected layout shift) ≤ 0.1 — stability. Measured at the 75th percentile of real users.", ar: "<b>LCP</b> (أكبر محتوى ظهر) ≤ 2.5 ثانية — التحميل. و<b>INP</b> (أبطأ تفاعل لحد الرسم اللي بعده) ≤ 200ms — الاستجابة (حل محل FID في 2024). و<b>CLS</b> (تحرك الـ layout المفاجئ) ≤ 0.1 — الثبات. وبيتقاسوا عند الـ percentile الـ 75 للمستخدمين الحقيقيين." },
      blocks: [
        { type: "compare", cols: [{ en: "Metric", ar: "المقياس" }, { en: "Usual causes", ar: "الأسباب المعتادة" }, { en: "Fixes", ar: "الحلول" }], rows: [
          ["LCP", { en: "Slow server, render-blocking CSS/JS, big unoptimised hero image, client-only rendering", ar: "سيرفر بطيء، CSS و JS بيوقفوا الرسم، صورة hero كبيرة، رسم في الـ client بس" }, { en: "SSR/SSG, preload + fetchpriority=high on the hero, AVIF/WebP + sizes, CDN, less JS before content", ar: "SSR أو SSG، و preload و fetchpriority=high للـ hero، و AVIF/WebP و sizes، و CDN، و JS أقل قبل المحتوى" }],
          ["INP", { en: "Long tasks, heavy handlers, big re-renders, hydration", ar: "Long tasks، handlers تقيلة، re-renders كبيرة، hydration" }, { en: "Split work, yield, transitions/deferred values, memo, virtualise, web workers, less JS", ar: "قسّم الشغل، yield، transitions و deferred values، memo، virtualization، web workers، JS أقل" }],
          ["CLS", { en: "Images without size, ads/embeds, late fonts, content injected above", ar: "صور من غير مقاس، إعلانات و embeds، خطوط بتتأخر، محتوى بيتحط فوق" }, { en: "width/height or aspect-ratio, reserve space, font-display + size-adjust, skeletons with the final size", ar: "width و height أو aspect-ratio، احجز مكان، font-display و size-adjust، skeletons بنفس المقاس النهائي" }]
        ] },
        { type: "projects", items: [{ text: { en: "Smart FAQ's table fix (~20 ms → ~2 ms per re-render) is an INP story: the details panel stopped lagging on open.", ar: "حل جدول Smart FAQ (من حوالي 20ms لـ 2ms لكل re-render) قصة INP: الـ details panel بطّل يهنج وهو بيفتح." }, p: "smartfaq", tab: "problems", label: "Smart FAQ" }] }
      ],
      say: "I think in the three vitals: get the LCP element early, keep main-thread work short for INP, and reserve space for everything to keep CLS near zero.",
      interview: [{ q: "Your LCP is 4 s. Walk me through fixing it.", a: { en: "Find the LCP element (DevTools/Lighthouse). Break the time down: server response (TTFB) → resource load delay → load time → render delay. Then fix the biggest part: cache/SSR for TTFB, preload + high priority for the image, compress and size it, cut render-blocking CSS/JS.", ar: "حدد عنصر الـ LCP (DevTools أو Lighthouse). قسّم الوقت: رد السيرفر (TTFB) ← تأخير بداية التحميل ← وقت التحميل ← تأخير الرسم. وبعدين صلّح أكبر جزء: كاش أو SSR للـ TTFB، و preload وأولوية عالية للصورة، وضغطها وتظبيط مقاسها، وشيل الـ CSS والـ JS اللي بيوقفوا الرسم." },
        follow: [{ q: "What replaced FID and why?", a: { en: "INP (March 2024). FID measured only the delay of the first input; INP covers all interactions and the full time until the next frame is painted.", ar: "INP (مارس 2024). الـ FID كان بيقيس تأخير أول تفاعل بس؛ والـ INP بيغطي كل التفاعلات والوقت كله لحد ما الفريم اللي بعده يترسم." } }] }],
      quiz: [{ q: { en: "Good thresholds for LCP / INP / CLS?", ar: "الحدود الكويسة لـ LCP و INP و CLS؟" }, a: { en: "≤ 2.5 s / ≤ 200 ms / ≤ 0.1.", ar: "≤ 2.5 ثانية / ≤ 200ms / ≤ 0.1." } }],
      quick: [{ en: "LCP ≤ 2.5 s (hero early) · INP ≤ 200 ms (short tasks) · CLS ≤ 0.1 (reserve space) · p75 of real users.", ar: "LCP ≤ 2.5 ثانية (الـ hero بدري) · INP ≤ 200ms (tasks قصيرة) · CLS ≤ 0.1 (احجز مكان) · p75 للمستخدمين." }]
    },
    {
      id: "measuring",
      title: { en: "Measuring: lab vs field, and the tools", ar: "القياس: lab ولا field، والأدوات" },
      tldr: { en: "Lab data (Lighthouse, DevTools Performance) is repeatable and good for debugging. Field data (CrUX, the <code>web-vitals</code> library sent to analytics) is what users really get — and what Google ranks on. Profile React with the React DevTools Profiler.", ar: "الـ Lab data (Lighthouse و DevTools Performance) بتتكرر بنفس الشكل وكويسة للـ debugging. والـ Field data (CrUX، ومكتبة <code>web-vitals</code> بتبعت للـ analytics) هي اللي المستخدمين بياخدوها فعلًا — واللي جوجل بيرتب عليها. واعمل profile لـ React بـ React DevTools Profiler." },
      blocks: [
        { type: "code", code: "import { onLCP, onINP, onCLS } from \"web-vitals\";\nconst send = (m) => navigator.sendBeacon(\"/analytics\", JSON.stringify({ name: m.name, value: m.value, id: m.id, page: location.pathname }));\nonLCP(send); onINP(send); onCLS(send);" },
        { type: "list", items: [
          { en: "Lighthouse: run in incognito, mobile throttling, several runs — scores vary.", ar: "Lighthouse: شغّله في incognito، بـ throttling موبايل، وكذا مرة — الأرقام بتختلف." },
          { en: "Performance panel: look for long tasks (red corners, > 50 ms), layout thrashing, forced reflows.", ar: "Performance panel: دوّر على long tasks (زوايا حمرا، أكتر من 50ms)، و layout thrashing، و reflows إجبارية." },
          { en: "React Profiler: which components rendered, why, and how long.", ar: "React Profiler: أنهي components عملت render، وليه، وأخدت قد إيه." }
        ] }
      ],
      say: "I debug with Lighthouse and the Performance panel, but I judge success by field data from real users, collected with the web-vitals library.",
      interview: [{ q: "Lighthouse says 98 but users complain it's slow. Why?", a: { en: "Lab runs one device on one network with an empty cache and no real interactions. Real users have slower phones, logged-in data, long sessions and interactions (INP). Collect field metrics.", ar: "الـ Lab بيشغل جهاز واحد وشبكة واحدة وكاش فاضي ومن غير تفاعل حقيقي. المستخدمين عندهم موبايلات أبطأ، وداتا بعد الـ login، وجلسات طويلة وتفاعلات (INP). اجمع field metrics." } }],
      quiz: [{ q: { en: "Which data does Google use for ranking signals?", ar: "جوجل بيستخدم أنهي داتا في الترتيب؟" }, a: { en: "Field data (Chrome UX Report).", ar: "الـ Field data (Chrome UX Report)." } }],
      quick: [{ en: "Lab to debug, field to judge; web-vitals → analytics; Profiler for React.", ar: "Lab للـ debugging و field للحكم؛ web-vitals ← analytics؛ Profiler لـ React." }]
    },
    {
      id: "bundle",
      title: { en: "Bundle size and code splitting", ar: "حجم الـ Bundle والـ Code splitting" },
      tldr: { en: "Ship less JavaScript: analyse the bundle, split by route and heavy widgets, import only what you use (tree-shakable ESM, per-function imports), replace heavy libraries, and lazy-load below-the-fold features. JS costs download <i>and</i> parse/execute time.", ar: "ابعت JavaScript أقل: حلل الـ bundle، وقسّم بالـ route والـ widgets التقيلة، واعمل import للي بتستخدمه بس (ESM بيعمل tree-shaking، import لكل function)، وبدّل المكتبات التقيلة، واعمل lazy-load للحاجات اللي تحت. والـ JS بيكلف تحميل <i>وكمان</i> وقت parse وتشغيل." },
      blocks: [
        { type: "code", code: "// analyse\nnpx vite-bundle-visualizer           // or @next/bundle-analyzer\n\n// import only what you need\nimport debounce from \"lodash/debounce\";    // not: import _ from \"lodash\"\nimport { format } from \"date-fns\";         // ESM, tree-shakable (vs moment)\n\n// heavy widget on demand\nconst Chart = lazy(() => import(\"./RevenueChart\"));" },
        { type: "pitfalls", items: [{ en: "Barrel files (<code>index.ts</code> re-exporting everything) can defeat tree-shaking and slow builds.", ar: "ملفات الـ Barrel (<code>index.ts</code> بيعمل re-export لكل حاجة) ممكن تبوظ الـ tree-shaking وتبطّأ الـ build." }] },
        { type: "projects", items: [{ text: { en: "ARVAmethod: Motion (menu only) and OGL/WebGL (version 3 only) are lazy-loaded; a prod-build preview script to judge performance.", ar: "ARVAmethod: الـ Motion (للمنيو بس) و OGL/WebGL (للنسخة 3 بس) بيتعملهم lazy-load؛ و script بيعمل preview لنسخة الـ production علشان تحكم على الأداء." } }] }
      ],
      say: "I keep the critical path small: route-level splitting, lazy heavy widgets like editors, charts and WebGL, and a bundle analyser in the loop.",
      interview: [{ q: "A page ships 1.5 MB of JS. What do you do?", a: { en: "Run the analyser; find the biggest modules; lazy-load what isn't needed for first render (editors, charts, maps); replace or cherry-pick heavy libraries; check for duplicates; move non-interactive parts to server components if on Next.js.", ar: "شغّل الـ analyzer؛ لاقي أكبر modules؛ اعمل lazy-load للي مش لازم لأول render (editors، charts، خرايط)؛ بدّل المكتبات التقيلة أو خد منها اللي محتاجه؛ دوّر على تكرار؛ وانقل الأجزاء اللي مش تفاعلية لـ server components لو Next.js." } }],
      quiz: [{ q: { en: "Why is JS more expensive than an image of the same size?", ar: "ليه الـ JS أغلى من صورة بنفس الحجم؟" }, a: { en: "It must also be parsed, compiled and executed on the main thread.", ar: "لازم كمان يتعمله parse و compile ويتشغل على الـ main thread." } }],
      quick: [{ en: "Analyse; split by route/widget; cherry-pick imports; avoid barrels; lazy below the fold.", ar: "حلّل؛ قسّم بالـ route والـ widget؛ import للمحتاجه بس؛ ابعد عن الـ barrels؛ lazy للي تحت." }]
    },
    {
      id: "react-perf",
      title: { en: "React rendering performance", ar: "أداء الـ rendering في React" },
      tldr: { en: "Order of fixes: measure → move state down / pass children → stabilise props → memo → virtualise long lists → transitions for heavy updates → move work off the main thread. Most slowness is too many renders of too many components, not one slow function.", ar: "ترتيب الحلول: قيس ← نزّل الـ state أو ابعت children ← ثبّت الـ props ← memo ← virtualization للقوايم الطويلة ← transitions للتحديثات التقيلة ← انقل الشغل برا الـ main thread. ومعظم البطء جاي من renders كتير لـ components كتير، مش function واحدة بطيئة." },
      blocks: [
        { type: "compare", cols: [{ en: "Symptom", ar: "العَرَض" }, { en: "Likely fix", ar: "الحل المحتمل" }], rows: [
          [{ en: "Typing lags in a big form/page", ar: "الكتابة بتهنج في فورم أو صفحة كبيرة" }, { en: "Colocate state; uncontrolled inputs; useDeferredValue", ar: "خلي الـ state قريب؛ inputs uncontrolled؛ useDeferredValue" }],
          [{ en: "Long list scrolls badly", ar: "قايمة طويلة الـ scroll فيها وحش" }, { en: "Virtualise (TanStack Virtual, react-virtuoso)", ar: "Virtualization (TanStack Virtual، react-virtuoso)" }],
          [{ en: "Every row re-renders on any change", ar: "كل صف بيعمل re-render مع أي تغيير" }, { en: "memo rows + stable props + stable keys", ar: "memo للصفوف و props ثابتة و keys ثابتة" }],
          [{ en: "Context change re-renders everything", ar: "تغيير الـ context بيعمل re-render لكل حاجة" }, { en: "Split context, memo value, or a selector store", ar: "قسّم الـ context، و memo للقيمة، أو store بـ selectors" }],
          [{ en: "Hidden duplicate UI (desktop + mobile both rendered)", ar: "UI مكرر مستخبي (desktop و mobile متعملين الاتنين)" }, { en: "Render one layout by media query", ar: "ارسم layout واحد حسب الـ media query" }]
        ] },
        { type: "projects", items: [
          { text: { en: "Smart FAQ: one layout per screen size + memoized row menus/badges + lazy-mounted menus → ~20 ms → ~2 ms.", ar: "Smart FAQ: layout واحد لكل مقاس شاشة و memo لمنيوهات وbadges الصفوف ومنيوهات بتتعمل mount وقت الفتح ← من 20ms لـ 2ms." }, p: "smartfaq", tab: "problems", label: "Smart FAQ" },
          { text: { en: "okoRent: react-virtuoso for a chat that grows upwards with variable-height messages.", ar: "okoRent: react-virtuoso لشات بيكبر لفوق ورسايل أطوالها مختلفة." }, p: "okorent", tab: "decisions", label: "okoRent" }
        ] }
      ],
      say: "I measure with the Profiler, then fix structure before memoizing — and for long lists I virtualise; that combination cut a table re-render from 20 to 2 milliseconds.",
      interview: [{ q: "What is virtualization and when do you need it?", a: { en: "Rendering only the rows in view (plus a buffer) and recycling them while scrolling. Needed when lists reach hundreds/thousands of complex rows; for 50 rows it's usually unnecessary.", ar: "إنك ترسم الصفوف اللي ظاهرة بس (ومعاها شوية زيادة) وتعيد استخدامها مع الـ scroll. لازم لما القوايم توصل مئات أو آلاف صفوف معقدة؛ لـ 50 صف غالبًا مش محتاجه." } }],
      quiz: [{ q: { en: "First step before adding memo?", ar: "أول خطوة قبل ما تضيف memo؟" }, a: { en: "Profile to find what re-renders and why.", ar: "اعمل profile تعرف إيه اللي بيعمل re-render وليه." } }],
      quick: [{ en: "Measure → state down → stable props → memo → virtualise → transitions → workers.", ar: "قيس ← نزّل الـ state ← props ثابتة ← memo ← virtualization ← transitions ← workers." }]
    },
    {
      id: "assets",
      title: { en: "Images, fonts and third-party scripts", ar: "الصور والخطوط والـ scripts الخارجية" },
      tldr: { en: "Images: right size (srcset), modern format (AVIF/WebP), lazy below the fold, priority for the hero, dimensions always. Fonts: self-host, subset, <code>font-display: swap</code>, preload the main one, few weights (variable font). Third-party scripts: load late (<code>async</code>/after interaction) or not at all.", ar: "الصور: المقاس الصح (srcset)، صيغة حديثة (AVIF و WebP)، lazy للي تحت، أولوية للـ hero، وأبعاد دايمًا. الخطوط: استضيفها عندك، و subset، و <code>font-display: swap</code>، و preload للأساسي، وأوزان قليلة (variable font). والـ scripts الخارجية: حمّلها متأخر (<code>async</code> أو بعد التفاعل) أو متحملهاش خالص." },
      blocks: [
        { type: "projects", items: [
          { text: { en: "Smart FAQ uses one variable font (Inter Variable via @fontsource-variable); ARVAmethod has an image re-compression script; Osloop loads project stills only where they're seen.", ar: "Smart FAQ بيستخدم خط variable واحد (Inter Variable عن طريق @fontsource-variable)؛ و ARVAmethod فيه script بيعيد ضغط الصور؛ و Osloop بيحمل صور المشاريع بس لما تبان." } }
        ] }
      ],
      say: "Images are sized, modern and lazy except the hero; fonts are self-hosted variable fonts with swap; third-party scripts load after the page is usable.",
      interview: [{ q: "Why self-host Google Fonts?", a: { en: "No extra DNS/TLS connection to another origin, better caching control, privacy, and you can preload and subset exactly what you use.", ar: "مفيش اتصال DNS و TLS زيادة لـ origin تاني، وتحكم أحسن في الكاش، وخصوصية، وتقدر تعمل preload و subset للي بتستخدمه بالظبط." } }],
      quiz: [{ q: { en: "font-display value to avoid invisible text?", ar: "قيمة font-display علشان النص ميختفيش؟" }, a: { en: "swap (or optional).", ar: "swap (أو optional)." } }],
      quick: [{ en: "srcset + AVIF/WebP + lazy (not hero); self-hosted variable font + swap + preload; 3rd-party late.", ar: "srcset و AVIF/WebP و lazy (مش الـ hero)؛ خط variable عندك و swap و preload؛ الخارجي متأخر." }]
    },
    {
      id: "long-tasks",
      title: { en: "Long tasks and the main thread", ar: "الـ Long tasks والـ Main thread" },
      tldr: { en: "Any task over 50 ms blocks input and paint. Break work into chunks and yield (<code>scheduler.yield()</code>, <code>setTimeout</code>), debounce/throttle frequent events, use <code>requestAnimationFrame</code> for visual updates, and move heavy computation to a Web Worker.", ar: "أي task أكتر من 50ms بتوقف الـ input والرسم. قسّم الشغل لأجزاء واعمل yield (<code>scheduler.yield()</code>، <code>setTimeout</code>)، واعمل debounce أو throttle للأحداث الكتير، واستخدم <code>requestAnimationFrame</code> للتحديثات الشكلية، وانقل الحسابات التقيلة لـ Web Worker." },
      blocks: [
        { type: "code", code: "async function processAll(items) {\n  for (let i = 0; i < items.length; i++) {\n    process(items[i]);\n    if (i % 200 === 0) await (globalThis.scheduler?.yield?.() ?? new Promise((r) => setTimeout(r)));  // let the browser breathe\n  }\n}\n\nconst onScroll = throttle(() => updateHeader(window.scrollY), 100);" }
      ],
      say: "I keep tasks under 50 ms by chunking and yielding, throttle scroll-rate events, and move real computation into a worker.",
      interview: [{ q: "debounce vs throttle?", a: { en: "Debounce waits until events stop for N ms, then runs once (search input). Throttle runs at most once every N ms while events keep coming (scroll, resize).", ar: "الـ Debounce بيستنى لحد ما الأحداث تقف N ms وبعدين يشتغل مرة (input البحث). والـ Throttle بيشتغل مرة على الأكتر كل N ms طول ما الأحداث جاية (scroll، resize)." } }],
      quiz: [{ q: { en: "Threshold for a “long task”?", ar: "الحد اللي بعده الـ task تبقى «long»؟" }, a: { en: "50 ms.", ar: "50ms." } }],
      quick: [{ en: "> 50 ms = long task; chunk + yield; debounce/throttle; rAF for visuals; workers for compute.", ar: "أكتر من 50ms = long task؛ قسّم و yield؛ debounce و throttle؛ rAF للشكل؛ workers للحسابات." }]
    }
  ]
});
