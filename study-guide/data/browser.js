// Browser & Web APIs — written 2026-10-29.
STUDY.fill("browser", {
  intro: { en: "What the browser gives you beyond the DOM: storage, observers, workers, service workers and offline, the History/URL APIs, device APIs and the page lifecycle.", ar: "اللي المتصفح بيديهولك غير الـ DOM: التخزين، الـ observers، الـ workers، الـ service workers والـ offline، الـ History و URL APIs، APIs الجهاز، ودورة حياة الصفحة." },
  topics: [
    {
      id: "storage",
      title: { en: "Cookies, localStorage, sessionStorage, IndexedDB", ar: "الـ Cookies و localStorage و sessionStorage و IndexedDB" },
      tldr: { en: "Cookies travel with every request (good for sessions, small). localStorage/sessionStorage are synchronous string stores readable by any script (never put tokens there). IndexedDB is async, large and structured — for offline data.", ar: "الـ Cookies بتتبعت مع كل request (كويسة للـ sessions، وصغيرة). localStorage و sessionStorage تخزين strings sync وأي script يقدر يقراه (عمرك ما تحط توكن فيه). IndexedDB async وكبير ومنظم — للداتا الـ offline." },
      blocks: [
        { type: "compare", cols: ["", "Cookie", "localStorage", "sessionStorage", "IndexedDB"], rows: [
          [{ en: "Size", ar: "الحجم" }, "~4 KB", "~5–10 MB", "~5 MB", { en: "Large (quota)", ar: "كبير (quota)" }],
          [{ en: "Sent to server", ar: "بيتبعت للسيرفر" }, { en: "Every request", ar: "مع كل request" }, { en: "No", ar: "لأ" }, { en: "No", ar: "لأ" }, { en: "No", ar: "لأ" }],
          [{ en: "Lifetime", ar: "مدته" }, { en: "Expires / session", ar: "Expires / session" }, { en: "Until cleared", ar: "لحد ما يتمسح" }, { en: "This tab", ar: "التاب ده" }, { en: "Until cleared", ar: "لحد ما يتمسح" }],
          [{ en: "JS can read", ar: "الـ JS يقرا" }, { en: "Not if httpOnly", ar: "لأ لو httpOnly" }, { en: "Yes", ar: "أيوه" }, { en: "Yes", ar: "أيوه" }, { en: "Yes", ar: "أيوه" }],
          [{ en: "API", ar: "الـ API" }, "document.cookie / headers", { en: "sync strings", ar: "sync strings" }, { en: "sync strings", ar: "sync strings" }, { en: "async, objects, indexes", ar: "async، objects، indexes" }]
        ] },
        { type: "pitfalls", items: [
          { en: "Storage can throw (private mode, quota, blocked) — wrap reads/writes in try/catch.", ar: "الـ storage ممكن يرمي error (private mode، quota، ممنوع) — لف القراية والكتابة في try/catch." },
          { en: "localStorage is synchronous: big JSON parses block the main thread.", ar: "localStorage sync: JSON كبير بيوقف الـ main thread." },
          { en: "Tabs share localStorage; listen to the <code>storage</code> event to sync them.", ar: "التابات بتشارك localStorage؛ اسمع event الـ <code>storage</code> علشان تزامنهم." }
        ] },
        { type: "projects", items: [
          { text: { en: "okoRent and Smart FAQ keep the session in an httpOnly cookie; this guide stores only the language choice in localStorage (wrapped in try/catch).", ar: "okoRent و Smart FAQ شايلين الـ session في كوكي httpOnly؛ والدليل ده بيخزن اختيار اللغة بس في localStorage (ملفوف في try/catch)." }, p: "okorent", tab: "decisions", label: "okoRent" },
          { text: { en: "Kalima (React Native) uses SQLite for an offline queue — the mobile cousin of IndexedDB.", ar: "Kalima (React Native) بيستخدم SQLite لطابور offline — ده قريب IndexedDB في الموبايل." }, p: "kalima", tab: "decisions", label: "Kalima" }
        ] }
      ],
      say: "Sessions live in httpOnly cookies, preferences in localStorage, and offline data in IndexedDB — never tokens in web storage.",
      interview: [{ q: "Where would you store a JWT and why?", a: { en: "In an httpOnly, Secure, SameSite cookie set by the server — XSS can't read it. localStorage is readable by any injected script. If the token must be in JS (e.g. a third-party API), keep it in memory and refresh via an httpOnly refresh cookie.", ar: "في كوكي httpOnly و Secure و SameSite السيرفر بيحطها — الـ XSS مايقدرش يقراها. الـ localStorage أي script متحقن يقراه. ولو التوكن لازم يبقى في الـ JS (زي API خارجي)، خليه في الميموري وجدده عن طريق refresh cookie httpOnly." },
        follow: [{ q: "sessionStorage across tabs?", a: { en: "Each tab has its own sessionStorage; a duplicated tab starts with a copy.", ar: "كل تاب ليه sessionStorage لوحده؛ والتاب المتكرر بيبدأ بنسخة." } }] }],
      quiz: [{ q: { en: "Which storage is sent to the server automatically?", ar: "أنهي تخزين بيتبعت للسيرفر لوحده؟" }, a: { en: "Cookies.", ar: "الـ Cookies." } }],
      quick: [{ en: "Cookie = session (httpOnly); localStorage = prefs; IndexedDB = offline data; wrap storage in try/catch.", ar: "Cookie = session (httpOnly)؛ localStorage = تفضيلات؛ IndexedDB = داتا offline؛ لف الـ storage في try/catch." }]
    },
    {
      id: "observers",
      title: { en: "Observers: Intersection, Resize, Mutation", ar: "الـ Observers: Intersection و Resize و Mutation" },
      tldr: { en: "Observers replace polling and scroll/resize listeners: <b>IntersectionObserver</b> (is it visible? — lazy load, infinite scroll, analytics), <b>ResizeObserver</b> (did this element's size change?), <b>MutationObserver</b> (did the DOM change?). They run off the hot path and batch callbacks.", ar: "الـ Observers بتحل محل الـ polling و listeners الـ scroll والـ resize: <b>IntersectionObserver</b> (هو ظاهر؟ — lazy load، infinite scroll، analytics)، و<b>ResizeObserver</b> (مقاس العنصر اتغير؟)، و<b>MutationObserver</b> (الـ DOM اتغير؟). بيشتغلوا بعيد عن الطريق التقيل وبيجمعوا الـ callbacks." },
      blocks: [
        { type: "code", code: "// infinite scroll: load the next page when the sentinel is near\nconst io = new IntersectionObserver(([entry]) => {\n  if (entry.isIntersecting) fetchNextPage();\n}, { rootMargin: \"400px\" });\nio.observe(sentinel);\n\n// react to a container's width (charts, truncation)\nconst ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));\nro.observe(chartBox);\n\n// cleanup in React\nreturn () => { io.disconnect(); ro.disconnect(); };" },
        { type: "when", use: [{ en: "Lazy media, infinite lists, “seen” analytics, sticky-state detection, animations on enter.", ar: "ميديا lazy، قوايم infinite، تحليلات «اتشاف»، اكتشاف حالة sticky، أنيميشن عند الظهور." }], avoid: [{ en: "<code>scroll</code> listeners that call <code>getBoundingClientRect</code> on every event — forces layout repeatedly.", ar: "Listeners على <code>scroll</code> بتنادي <code>getBoundingClientRect</code> مع كل event — بتجبر layout كل مرة." }] },
        { type: "projects", items: [{ text: { en: "The Osloop site loads project stills only where they're seen; GSAP ScrollTrigger uses the same idea for scroll-driven sections.", ar: "موقع Osloop بيحمل صور المشاريع بس لما تبان؛ و GSAP ScrollTrigger بيستخدم نفس الفكرة للأجزاء اللي بتتحرك مع الـ scroll." } }] }
      ],
      say: "For visibility and size I use IntersectionObserver and ResizeObserver instead of scroll and resize listeners, so I never force layout on every scroll event.",
      interview: [{ q: "How would you build infinite scroll?", a: { en: "A sentinel element at the end of the list observed by IntersectionObserver with a rootMargin; when it intersects, fetch the next page (useInfiniteQuery), and virtualize the list if it gets long.", ar: "عنصر sentinel في آخر القايمة عليه IntersectionObserver بـ rootMargin؛ لما يظهر، هات الصفحة اللي بعدها (useInfiniteQuery)، ولو القايمة طولت اعملها virtualization." } }],
      quiz: [{ q: { en: "Which observer for “element width changed”?", ar: "أنهي observer لـ «عرض العنصر اتغير»؟" }, a: { en: "ResizeObserver.", ar: "ResizeObserver." } }],
      quick: [{ en: "Intersection = visible?; Resize = size?; Mutation = DOM changed?; disconnect on cleanup.", ar: "Intersection = ظاهر؟؛ Resize = المقاس؟؛ Mutation = الـ DOM اتغير؟؛ disconnect في الـ cleanup." }]
    },
    {
      id: "workers",
      title: { en: "Web Workers", ar: "الـ Web Workers" },
      tldr: { en: "A Web Worker runs JS on another thread, so heavy work (parsing big files, image processing, diffing, search indexes) doesn't freeze the UI. It has no DOM; you talk to it with <code>postMessage</code>.", ar: "الـ Web Worker بيشغل JS على thread تاني، فالشغل التقيل (parse لملفات كبيرة، معالجة صور، diffing، فهارس بحث) مش بيهنج الواجهة. ملوش DOM؛ وبتكلمه بـ <code>postMessage</code>." },
      blocks: [
        { type: "code", code: "// main.ts\nconst worker = new Worker(new URL(\"./parse.worker.ts\", import.meta.url), { type: \"module\" });\nworker.postMessage(file);                      // structured clone (or transfer ArrayBuffers)\nworker.onmessage = (e) => setRows(e.data);\n\n// parse.worker.ts\nself.onmessage = async (e) => {\n  const text = await e.data.text();\n  self.postMessage(parseCsv(text));            // heavy work off the main thread\n};" },
        { type: "when", use: [{ en: "CPU work over ~50 ms that would cause jank or a bad INP.", ar: "شغل CPU أكتر من حوالي 50ms هيعمل تقطيع أو INP وحش." }], avoid: [{ en: "Small tasks — message copying costs more than it saves. Try splitting work or <code>scheduler.yield()</code> first.", ar: "حاجات صغيرة — نسخ الرسايل بيكلف أكتر من اللي بيوفره. جرب تقسم الشغل أو <code>scheduler.yield()</code> الأول." }] }
      ],
      say: "If work blocks the main thread for more than a frame or two, I move it to a Web Worker and post results back.",
      interview: [{ q: "What can't a worker do?", a: { en: "Touch the DOM or window; it has its own global (self), can use fetch, timers, IndexedDB, WebSockets. Data is copied (structured clone) unless you transfer it.", ar: "يلمس الـ DOM أو الـ window؛ ليه global خاص (self)، ويقدر يستخدم fetch والتايمرز و IndexedDB و WebSockets. والداتا بتتنسخ (structured clone) إلا لو عملت لها transfer." } }],
      quiz: [{ q: { en: "How do worker and page communicate?", ar: "الـ worker والصفحة بيتكلموا إزاي؟" }, a: { en: "postMessage / onmessage.", ar: "postMessage و onmessage." } }],
      quick: [{ en: "Workers = another thread, no DOM, postMessage; for >50 ms CPU work.", ar: "Workers = thread تاني، من غير DOM، و postMessage؛ للشغل اللي أكتر من 50ms." }]
    },
    {
      id: "service-workers",
      title: { en: "Service workers, caching and PWAs", ar: "الـ Service workers والـ caching والـ PWA" },
      tldr: { en: "A service worker is a proxy between your app and the network: it can serve cached files offline, cache API responses with a strategy, and receive push notifications. A PWA = HTTPS + manifest + service worker → installable and offline-capable.", ar: "الـ Service worker عبارة عن proxy بين التطبيق والشبكة: يقدر يرجع ملفات من الكاش offline، ويخزن ردود الـ API باستراتيجية، ويستقبل push notifications. والـ PWA = HTTPS + manifest + service worker ← يتنزل ويشتغل offline." },
      blocks: [
        { type: "compare", title: { en: "Caching strategies", ar: "استراتيجيات الكاش" }, cols: [{ en: "Strategy", ar: "الاستراتيجية" }, { en: "How", ar: "إزاي" }, { en: "Use for", ar: "استخدمها لـ" }], rows: [
          ["Cache first", { en: "Cache, fall back to network", ar: "الكاش، ولو مش موجود الشبكة" }, { en: "Hashed static assets, fonts", ar: "Assets ثابتة بـ hash، الخطوط" }],
          ["Network first", { en: "Network, fall back to cache", ar: "الشبكة، ولو فشلت الكاش" }, { en: "HTML, fresh API data", ar: "الـ HTML، داتا API لازم تبقى جديدة" }],
          ["Stale-while-revalidate", { en: "Serve cache now, update in background", ar: "رجّع الكاش دلوقتي، وحدّث في الخلفية" }, { en: "Avatars, lists that may be a bit old", ar: "صور بروفايل، قوايم ممكن تبقى قديمة شوية" }]
        ] },
        { type: "pitfalls", items: [{ en: "A buggy service worker keeps serving old files — version caches, call <code>skipWaiting</code> carefully, and test updates.", ar: "Service worker فيه bug بيفضل يرجع ملفات قديمة — حط version للكاش، واستخدم <code>skipWaiting</code> بحذر، وجرب التحديثات." }] },
        { type: "projects", items: [{ text: { en: "The Orchard learning game is an installable offline PWA.", ar: "لعبة البستان PWA بتتنزل وتشتغل offline." } }] }
      ],
      say: "Static hashed assets are cache-first, HTML is network-first, and data that can be a little stale uses stale-while-revalidate.",
      interview: [{ q: "Service worker vs web worker?", a: { en: "Both run off the main thread. A web worker belongs to a page and does computation. A service worker sits between all pages of an origin and the network, survives page closes, and handles fetch, cache and push events.", ar: "الاتنين بعيد عن الـ main thread. الـ web worker تابع لصفحة وبيعمل حسابات. الـ service worker واقف بين كل صفحات الـ origin والشبكة، وبيعيش بعد قفل الصفحة، وبيتعامل مع fetch والكاش والـ push." } }],
      quiz: [{ q: { en: "Three things a PWA needs?", ar: "تلات حاجات الـ PWA محتاجها؟" }, a: { en: "HTTPS, a web app manifest, a service worker.", ar: "HTTPS، و web app manifest، و service worker." } }],
      quick: [{ en: "SW = network proxy: cache-first (assets), network-first (HTML), SWR (soft data).", ar: "SW = proxy للشبكة: cache-first (assets)، network-first (HTML)، SWR (داتا مش حرجة)." }]
    },
    {
      id: "history-url",
      title: { en: "History and URL APIs", ar: "الـ History و URL APIs" },
      tldr: { en: "<code>history.pushState</code>/<code>replaceState</code> change the URL without reloading (what routers use); <code>popstate</code> fires on Back/Forward. <code>URL</code> and <code>URLSearchParams</code> parse and build URLs safely — no string concatenation.", ar: "<code>history.pushState</code> و <code>replaceState</code> بيغيروا الـ URL من غير reload (ده اللي الـ routers بتستخدمه)؛ و <code>popstate</code> بيحصل مع Back و Forward. و <code>URL</code> و <code>URLSearchParams</code> بيقروا ويبنوا الـ URLs بأمان — من غير لزق strings." },
      blocks: [
        { type: "code", code: "const url = new URL(location.href);\nurl.searchParams.set(\"status\", \"draft\");\nurl.searchParams.append(\"dept\", \"7\");\nhistory.replaceState(null, \"\", url);     // filter change: replace, Back leaves the list\n\nconst params = new URLSearchParams(\"?q=a%20b&tag=x&tag=y\");\nparams.get(\"q\");        // \"a b\"  (decoded)\nparams.getAll(\"tag\");   // [\"x\", \"y\"]\n\nwindow.addEventListener(\"popstate\", () => render(location.pathname));" },
        { type: "projects", items: [{ text: { en: "Smart FAQ's useUrlFilters writes filters with replace (Back leaves the list) and repeats keys for multi-select; search text never goes into the URL.", ar: "useUrlFilters في Smart FAQ بيكتب الفلاتر بـ replace (الـ Back يخرج من القايمة) وبيكرر المفتاح للاختيار المتعدد؛ ونص البحث عمره ما بيدخل الـ URL." }, p: "smartfaq", tab: "decisions", label: "Smart FAQ" }] }
      ],
      say: "Filters use replaceState so Back leaves the list instead of undoing every click, and URLs are built with URLSearchParams, never by hand.",
      interview: [{ q: "push vs replace for filters?", a: { en: "push adds a history entry per change (Back undoes each filter); replace updates the current entry. For filters, replace is usually right; for opening a detail page, push.", ar: "الـ push بيزود entry مع كل تغيير (الـ Back بيلغي كل فلتر)؛ والـ replace بيحدث الـ entry الحالي. للفلاتر غالبًا replace؛ ولفتح صفحة تفاصيل push." } }],
      quiz: [{ q: { en: "Read all values of a repeated query key?", ar: "تقرا كل قيم مفتاح متكرر في الـ query؟" }, a: { en: "<code>searchParams.getAll(\"key\")</code>.", ar: "<code>searchParams.getAll(\"key\")</code>." } }],
      quick: [{ en: "pushState/replaceState + popstate = client routing; URLSearchParams to build/parse.", ar: "pushState و replaceState و popstate = client routing؛ URLSearchParams للبناء والقراية." }]
    },
    {
      id: "page-lifecycle",
      title: { en: "Page lifecycle and device APIs", ar: "دورة حياة الصفحة و APIs الجهاز" },
      tldr: { en: "<code>DOMContentLoaded</code> (HTML parsed) → <code>load</code> (everything loaded). <code>visibilitychange</code> tells you the tab is hidden — pause work, flush analytics. <code>beforeunload</code> warns about unsaved changes. Device APIs (clipboard, geolocation, notifications) need permission and HTTPS.", ar: "<code>DOMContentLoaded</code> (الـ HTML اتقرا) ← <code>load</code> (كل حاجة اتحملت). و <code>visibilitychange</code> بيقولك التاب استخبى — وقّف الشغل وابعت الـ analytics. و <code>beforeunload</code> بيحذر من تغييرات مش محفوظة. و APIs الجهاز (clipboard، geolocation، notifications) محتاجة إذن و HTTPS." },
      blocks: [
        { type: "code", code: "document.addEventListener(\"visibilitychange\", () => {\n  if (document.visibilityState === \"hidden\") navigator.sendBeacon(\"/analytics\", payload);\n});\n\nwindow.addEventListener(\"beforeunload\", (e) => { if (dirty) e.preventDefault(); }); // browser shows its own prompt\n\nawait navigator.clipboard.writeText(link);       // needs a user gesture + secure context" },
        { type: "pitfalls", items: [{ en: "<code>unload</code> listeners disable the back/forward cache (instant Back). Use <code>pagehide</code>/<code>visibilitychange</code>.", ar: "Listeners على <code>unload</code> بتعطل الـ back/forward cache (الـ Back الفوري). استخدم <code>pagehide</code> أو <code>visibilitychange</code>." }] },
        { type: "projects", items: [{ text: { en: "Smart FAQ guards unsaved forms on in-app navigation (router blocker); ONE14 handles app background/foreground for GPS and audio.", ar: "Smart FAQ بيحمي الفورمز اللي مش محفوظة وقت التنقل جوه التطبيق (router blocker)؛ و ONE14 بيتعامل مع دخول التطبيق للخلفية ورجوعه للـ GPS والصوت." }, p: "smartfaq", tab: "hooks", label: "Smart FAQ" }] }
      ],
      say: "I pause work and flush analytics on visibilitychange, and avoid unload listeners so the back-forward cache keeps working.",
      interview: [{ q: "DOMContentLoaded vs load?", a: { en: "DOMContentLoaded fires when HTML is parsed and deferred scripts ran; load waits for images, styles and iframes too.", ar: "DOMContentLoaded بيحصل لما الـ HTML يتقرا والـ scripts الـ deferred تشتغل؛ و load بيستنى الصور والـ styles والـ iframes كمان." } }],
      quiz: [{ q: { en: "Reliable way to send analytics when the user leaves?", ar: "طريقة مضمونة تبعت analytics لما المستخدم يمشي؟" }, a: { en: "<code>navigator.sendBeacon</code> on visibilitychange (hidden).", ar: "<code>navigator.sendBeacon</code> مع visibilitychange (hidden)." } }],
      quick: [{ en: "visibilitychange to pause/flush; no unload (breaks bfcache); beforeunload for unsaved work.", ar: "visibilitychange للإيقاف والإرسال؛ متستخدمش unload (بيبوظ الـ bfcache)؛ beforeunload للشغل اللي مش محفوظ." }]
    }
  ]
});
