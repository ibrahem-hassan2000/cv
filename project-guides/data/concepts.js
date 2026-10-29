// Concepts behind the decisions. Decisions link here with `concept: "<id>"`.
HANDBOOK.concepts = [
  {
    id: "server-state", name: "Server state vs client state",
    tagline: { en: "Two kinds of state, two kinds of tools.", ar: "نوعين state، ونوعين أدوات." },
    what: { en: "<b>Server state</b> lives on the backend and you only hold a copy (lists, users, invoices): it can go stale, needs caching, refetching and invalidation. <b>Client state</b> exists only in the browser (open modal, selected tab, form draft).", ar: "<b>الـ Server state</b> مكانه الباك إند وانت ماسك نسخة منه بس (قوايم، مستخدمين، فواتير): ممكن يبقى قديم، ومحتاج caching و refetch و invalidation. <b>الـ Client state</b> موجود في المتصفح بس (modal مفتوح، تاب مختار، مسودة فورم)." },
    when: { en: "Use TanStack Query (or SWR/RTK Query) for server state, and useState / Zustand / URL for client state. Mixing them (copying API data into a store) creates two sources of truth.", ar: "استخدم TanStack Query (أو SWR/RTK Query) للـ server state، و useState / Zustand / الـ URL للـ client state. الخلط (نسخ داتا الـ API في store) بيعمل مصدرين للحقيقة." },
    pitfall: { en: "Putting API responses into Redux/Zustand and syncing them by hand.", ar: "تحط ردود الـ API في Redux/Zustand وتزامنها بإيدك." },
    q: "Why not keep API data in Redux?", a: { en: "Redux doesn't know when data is stale. A server-state library handles caching, deduping, background refetch and invalidation, so I write less code and have fewer sync bugs.", ar: "Redux مايعرفش إمتى الداتا بقت قديمة. مكتبة الـ server state بتتعامل مع الـ caching ومنع التكرار والـ refetch والـ invalidation، فبكتب كود أقل و bugs مزامنة أقل." }
  },
  {
    id: "query-keys", name: "Query keys & invalidation",
    tagline: { en: "The cache is only as good as its keys.", ar: "الكاش كويس بقدر ما الـ keys بتاعته كويسة." },
    what: { en: "Each query is cached under a key like <code>[\"invoice\", 42]</code>. Invalidating a key (or a prefix like <code>[\"invoice\"]</code>) marks it stale and refetches what's on screen.", ar: "كل query بيتخزن تحت key زي <code>[\"invoice\", 42]</code>. لما تعمل invalidate لـ key (أو بداية زي <code>[\"invoice\"]</code>) بيبقى stale وبيتجاب تاني لو ظاهر." },
    when: { en: "Use one convention — a key factory per domain (<code>all → list → detail</code>) — and invalidate the smallest set that changed.", ar: "استخدم طريقة واحدة — key factory لكل domain (<code>all ← list ← detail</code>) — واعمل invalidate لأقل حاجة اتغيرت." },
    pitfall: { en: "Querying with one key and invalidating another (seen on Spectra) — the list never refreshes.", ar: "تعمل query بـ key وتعمل invalidate بـ key تاني (حصل في Spectra) — القايمة عمرها ما تتحدث." },
    q: "How do you structure query keys?", a: { en: "A factory per domain: all, list(filters), detail(id). Filters are part of the key so each filter has its own cache, and mutations invalidate by prefix.", ar: "factory لكل domain: all و list(filters) و detail(id). الفلاتر جزء من الـ key فكل فلتر ليه كاش، والـ mutations بتعمل invalidate بالـ prefix." }
  },
  {
    id: "optimistic-ui", name: "Optimistic updates",
    tagline: { en: "Show the result before the server confirms.", ar: "اعرض النتيجة قبل ما السيرفر يأكد." },
    what: { en: "Update the cache immediately (e.g. a chat message with status “pending”), then confirm or roll back when the request finishes.", ar: "حدّث الكاش فورًا (زي رسالة شات بحالة «pending»)، وبعدين أكّد أو ارجع لما الـ request يخلص." },
    when: { en: "Actions that almost always succeed and where speed matters: chat, likes, toggles. Avoid for payments.", ar: "حاجات غالبًا بتنجح والسرعة فيها مهمة: شات، لايك، toggle. وابعد عنها في الدفع." },
    pitfall: { en: "Forgetting the rollback on error.", ar: "تنسى ترجع الحالة لو حصل error." },
    q: "How would you roll back an optimistic update?", a: { en: "In onMutate, snapshot the old cache value and return it; in onError, restore it with setQueryData; in onSettled, invalidate to sync with the server.", ar: "في onMutate، خد نسخة من الكاش القديم ورجّعها. وفي onError، رجّعها بـ setQueryData. وفي onSettled، اعمل invalidate علشان تتزامن مع السيرفر." }
  },
  {
    id: "realtime", name: "Real-time options",
    tagline: { en: "WebSocket, SignalR, Socket.IO, SSE, polling, Firestore.", ar: "WebSocket، SignalR، Socket.IO، SSE، polling، Firestore." },
    what: { en: "<b>Polling</b>: ask every N seconds. <b>SSE</b>: server → client stream over HTTP. <b>WebSocket</b>: two-way connection. <b>SignalR</b> (.NET) and <b>Socket.IO</b> (Node) add rooms, reconnects and transport fallback on top. <b>Firestore</b> gives listeners on a managed database.", ar: "<b>Polling</b>: تسأل كل N ثانية. <b>SSE</b>: stream من السيرفر للمتصفح على HTTP. <b>WebSocket</b>: اتصال في الاتجاهين. <b>SignalR</b> (.NET) و <b>Socket.IO</b> (Node) بيضيفوا rooms و reconnect وبدائل للاتصال. <b>Firestore</b> بيدي listeners على database جاهزة." },
    when: { en: "Pick what matches the backend: .NET → SignalR, Node → Socket.IO, no backend → Firestore/Supabase, one-way updates → SSE.", ar: "اختار اللي يناسب الباك إند: .NET ← SignalR، Node ← Socket.IO، مفيش باك إند ← Firestore/Supabase، تحديثات في اتجاه واحد ← SSE." },
    pitfall: { en: "Not closing connections or listeners in the effect cleanup.", ar: "ماتقفلش الاتصال أو الـ listener في الـ cleanup بتاع الـ effect." },
    q: "When would you choose SSE over WebSockets?", a: { en: "When only the server pushes (notifications, progress). SSE is plain HTTP, reconnects automatically and passes proxies easily.", ar: "لما السيرفر بس هو اللي بيبعت (إشعارات، progress). الـ SSE عبارة عن HTTP عادي، وبيعمل reconnect لوحده، وبيعدي من الـ proxies بسهولة." }
  },
  {
    id: "token-storage", name: "Where to keep the auth token",
    tagline: { en: "localStorage vs httpOnly cookie vs session library.", ar: "localStorage ولا httpOnly cookie ولا مكتبة sessions." },
    what: { en: "<b>localStorage</b>: easy, but any script can read it (XSS). <b>httpOnly cookie</b>: JS can't read it, the browser sends it automatically; protect against CSRF with SameSite. <b>Auth.js</b>: manages the cookie and refresh for you.", ar: "<b>localStorage</b>: سهل، بس أي script يقدر يقراه (XSS). <b>httpOnly cookie</b>: الـ JS مايقدرش يقراه، والمتصفح بيبعته لوحده. واحمي من الـ CSRF بـ SameSite. <b>Auth.js</b>: بيدير الكوكي والـ refresh بدالك." },
    when: { en: "Prefer httpOnly cookies for anything sensitive; read them in middleware / server code.", ar: "فضّل الـ httpOnly cookies لأي حاجة حساسة. واقراها في الـ middleware أو كود السيرفر." },
    pitfall: { en: "Client features that need the raw token (sockets) — plan how they get it.", ar: "features في المتصفح محتاجة التوكن نفسه (sockets) — خطط إزاي توصلها." },
    q: "What is the difference between XSS and CSRF here?", a: { en: "XSS = attacker's script runs in your page and can read localStorage. CSRF = another site makes the browser send your cookie. httpOnly stops the first; SameSite and CSRF tokens stop the second.", ar: "الـ XSS معناه script بتاع مهاجم بيشتغل في صفحتك، ويقدر يقرا الـ localStorage. والـ CSRF معناه موقع تاني بيخلي المتصفح يبعت الكوكي بتاعك. الـ httpOnly بيمنع الأول. و SameSite و CSRF tokens بيمنعوا التاني." }
  },
  {
    id: "virtualization", name: "List virtualization",
    tagline: { en: "Render only what is on screen.", ar: "ارسم اللي ظاهر على الشاشة بس." },
    what: { en: "A virtual list keeps a few DOM nodes and swaps their content while you scroll, so 10,000 rows cost the same as 30.", ar: "الـ virtual list بتمسك عدد قليل من الـ DOM nodes وبتبدل محتواها وانت بتعمل scroll، فـ 10,000 صف بيكلفوا زي 30." },
    when: { en: "Long chats, feeds, big tables. Variable heights or reverse scroll → react-virtuoso; fixed heights → react-window; full control → TanStack Virtual.", ar: "شاتات طويلة، و feeds، وجداول كبيرة. لو الأطوال مختلفة أو الـ scroll بالعكس، react-virtuoso. ولو الأطوال ثابتة، react-window. ولو عايز تحكم كامل، TanStack Virtual." },
    pitfall: { en: "Find-in-page (Ctrl+F) and screen readers only see rendered rows.", ar: "البحث في الصفحة (Ctrl+F) وقارئات الشاشة بيشوفوا الصفوف المرسومة بس." },
    q: "How do you load older messages without the list jumping?", a: { en: "Prepend the page and shift the index base (Virtuoso's firstItemIndex) so the visible item keeps its position.", ar: "ضيف الصفحة فوق وزحّح بداية الـ index (firstItemIndex في Virtuoso) فالعنصر الظاهر يفضل في مكانه." }
  },
  {
    id: "url-state", name: "The URL as state",
    tagline: { en: "If refresh should keep it, put it in the URL.", ar: "لو الـ refresh لازم يحافظ عليه، حطه في الـ URL." },
    what: { en: "Filters, search, page number and tabs stored in search params survive refresh, Back and sharing.", ar: "الفلاتر والبحث ورقم الصفحة والتابات لو في الـ search params بيفضلوا بعد الـ refresh والـ Back والمشاركة." },
    when: { en: "Lists and dashboards. nuqs gives typed parsers; plain useSearchParams works too.", ar: "القوايم والداشبوردات. الـ nuqs بيدي parsers بـ types، و useSearchParams العادي شغال برضه." },
    pitfall: { en: "Two different ways to read the same params in one app.", ar: "طريقتين مختلفتين تقرا بيهم نفس الـ params في نفس التطبيق." },
    q: "Why not keep filters in useState?", a: { en: "They'd reset on refresh and couldn't be shared or restored with Back.", ar: "هيتمسحوا مع الـ refresh، ومينفعش تبعتهم في لينك أو ترجعلهم بالـ Back." }
  },
  {
    id: "forms", name: "Forms: controlled vs uncontrolled",
    tagline: { en: "Why React Hook Form is fast.", ar: "ليه React Hook Form سريع." },
    what: { en: "<b>Controlled</b>: every key press goes through React state → re-render. <b>Uncontrolled</b> (React Hook Form): the DOM holds values, React reads them on demand → few re-renders. A schema (zod/yup) validates everything in one place.", ar: "<b>Controlled</b>: كل حرف بيعدي على state في React ← re-render. <b>Uncontrolled</b> (React Hook Form): الـ DOM ماسك القيم و React بيقراها لما يحتاج ← re-renders قليلة. و schema (zod/yup) بيعمل validation لكل حاجة في مكان واحد." },
    when: { en: "Large forms, dynamic rows (useFieldArray), forms in dialogs (reset / values).", ar: "فورمز كبيرة، صفوف متغيرة (useFieldArray)، فورمز في dialogs (reset / values)." },
    pitfall: { en: "Using the array index as a key for dynamic rows.", ar: "تستخدم الـ index كـ key للصفوف المتغيرة." },
    q: "zod or yup?", a: { en: "Both validate. zod infers the TypeScript type from the schema (z.infer), so with TypeScript I prefer zod.", ar: "الاتنين بيعملوا validation. zod بيطلّع الـ TypeScript type من الـ schema (z.infer)، فمع TypeScript بفضّل zod." }
  },
  {
    id: "derived-state", name: "Derived state",
    tagline: { en: "Compute it, don't store it.", ar: "احسبه، ماتخزنهوش." },
    what: { en: "Anything you can calculate from other state (totals, counts, filtered lists) should be calculated during render, not kept in its own state.", ar: "أي حاجة تقدر تحسبها من state تاني (إجماليات، أعداد، قوايم متفلترة) تتحسب وقت الـ render، مش تتخزن في state لوحدها." },
    when: { en: "Invoice totals, badges, filtered views. Use useMemo only if the calculation is expensive.", ar: "إجمالي الفاتورة، الـ badges، القوايم المتفلترة. واستخدم useMemo بس لو الحسبة تقيلة." },
    pitfall: { en: "useEffect that sets state from other state — an extra render and a sync bug waiting to happen.", ar: "useEffect بيعمل set لـ state من state تاني — render زيادة و bug مزامنة مستني يحصل." },
    q: "Where should money totals be calculated?", a: { en: "Derived in the UI for display, and recalculated on the server, which is the source of truth.", ar: "بيتحسب في الـ UI للعرض، وبيتحسب تاني على السيرفر لأنه مصدر الحقيقة." }
  },
  {
    id: "effects", name: "useEffect — when (not) to use it",
    tagline: { en: "Effects are for syncing with the outside world.", ar: "الـ effects للمزامنة مع العالم برا React." },
    what: { en: "Good: subscriptions (sockets, Firestore), timers, DOM APIs, analytics — always with cleanup. Not needed: computing values, copying props/query data into state, reacting to events (do it in the handler).", ar: "كويس: الاشتراكات (sockets، Firestore)، الـ timers، الـ DOM APIs، الـ analytics — ودايمًا مع cleanup. مش محتاجه: حساب قيم، نسخ props أو داتا query في state، الرد على events (اعمله في الـ handler)." },
    when: { en: "Ask: “is this syncing with something outside React?” If not, you probably don't need an effect.", ar: "اسأل: «ده بيتزامن مع حاجة برا React؟» لو لأ، غالبًا مش محتاج effect." },
    pitfall: { en: "Missing dependencies or depending on a flag like isLoading instead of the data.", ar: "dependencies ناقصة، أو الاعتماد على flag زي isLoading بدل الداتا نفسها." },
    q: "Why does an effect run twice in development?", a: { en: "React Strict Mode mounts, unmounts and remounts to reveal missing cleanups. A correct effect works the same either way.", ar: "React Strict Mode بيعمل mount و unmount و mount تاني علشان يكشف الـ cleanups الناقصة. الـ effect الصح بيشتغل نفس الشكل في الحالتين." }
  },
  {
    id: "routers", name: "Next.js: App Router vs Pages Router",
    tagline: { en: "Two routing systems in the same framework.", ar: "نظامين routing في نفس الـ framework." },
    what: { en: "<b>Pages Router</b> (<code>pages/</code>): getServerSideProps / getStaticProps, next/head. <b>App Router</b> (<code>app/</code>, stable since 13.4): nested layouts, React Server Components by default, metadata API, server actions, loading/error files.", ar: "<b>Pages Router</b> (<code>pages/</code>): getServerSideProps / getStaticProps، و next/head. <b>App Router</b> (<code>app/</code>، stable من 13.4): layouts متداخلة، React Server Components بالـ default، metadata API، server actions، وملفات loading/error." },
    when: { en: "New projects: App Router. Old ones can migrate page by page — both routers work in one app.", ar: "مشاريع جديدة: App Router. والقديمة تقدر تنقل صفحة صفحة — الاتنين بيشتغلوا في نفس التطبيق." },
    pitfall: { en: "Adding \"use client\" everywhere and losing the server-component benefits.", ar: "تحط \"use client\" في كل حتة وتخسر مميزات الـ server components." },
    q: "What is a Server Component?", a: { en: "A component rendered on the server only; it can read data directly and sends no JavaScript for itself to the browser. Interactive parts are Client Components.", ar: "component بيترسم على السيرفر بس. يقدر يقرا الداتا مباشرة، ومش بيبعت الـ JavaScript بتاعه للمتصفح. والأجزاء التفاعلية بتبقى Client Components." }
  },
  {
    id: "i18n", name: "i18n and RTL",
    tagline: { en: "Translations are half of it; direction is the other half.", ar: "الترجمة نص الموضوع، والاتجاه النص التاني." },
    what: { en: "Locale in the URL (<code>/ar</code>, <code>/en</code>), message files, <code>dir=\"rtl\"</code> on the page, and logical CSS (<code>margin-inline-start</code>) so layouts flip.", ar: "اللغة في الـ URL (<code>/ar</code>، <code>/en</code>)، ملفات ترجمة، <code>dir=\"rtl\"</code> على الصفحة، و CSS منطقي (<code>margin-inline-start</code>) علشان الـ layout يتقلب." },
    when: { en: "next-intl for the App Router; react-i18next / next-i18next for the Pages Router.", ar: "الـ next-intl للـ App Router. و react-i18next أو next-i18next للـ Pages Router." },
    pitfall: { en: "Locale routing without translated text (okoRent) is not “bilingual”.", ar: "routing باللغة من غير نصوص مترجمة (okoRent) مش اسمه «bilingual»." },
    q: "How do you handle RTL in CSS?", a: { en: "Logical properties (inline-start/end), dir on the root, and checking icons and arrows that must flip.", ar: "logical properties (inline-start/end)، و dir على الـ root، ومراجعة الأيقونات والأسهم اللي لازم تتقلب." }
  },
  {
    id: "typescript", name: "Why TypeScript",
    tagline: { en: "Catch shape errors before the user does.", ar: "امسك أخطاء شكل الداتا قبل المستخدم." },
    what: { en: "Types describe the shape of props and API data, so wrong fields and typos fail at build time, and editors autocomplete.", ar: "الـ types بتوصف شكل الـ props وداتا الـ API، فالحقول الغلط والأخطاء الإملائية بتفشل وقت الـ build، والـ editor بيكمّل لوحده." },
    when: { en: "Any project that lives longer than a demo. Generate API types from OpenAPI when the backend has it.", ar: "أي مشروع هيعيش أكتر من ديمو. وولّد types الـ API من الـ OpenAPI لو الباك إند عنده." },
    pitfall: { en: "Typing everything as <code>any</code> — you pay the cost and get no safety.", ar: "تكتب كل حاجة <code>any</code> — بتدفع التمن ومن غير أمان." },
    q: "How would you migrate a JS project?", a: { en: "Enable allowJs, add tsconfig, convert files from the edges inward (API layer and shared components first), turn on strict gradually.", ar: "فعّل allowJs، ضيف tsconfig، وحوّل الملفات من الأطراف للجوه (طبقة الـ API والـ components المشتركة الأول)، وشغّل strict بالتدريج." }
  },
  {
    id: "one-tool", name: "One library per job",
    tagline: { en: "Two tools for the same job cost more than they give.", ar: "أداتين لنفس الشغلانة بيكلفوا أكتر ما بيدّوا." },
    what: { en: "Duplicate libraries (two map libs, two debounce hooks, two drag-and-drop libs, two PDF libs) mean a bigger bundle, two APIs to learn and inconsistent behavior.", ar: "المكتبات المكررة (مكتبتين خرايط، اتنين debounce، اتنين drag-and-drop، اتنين PDF) = bundle أكبر، واتنين API تتعلمهم، وسلوك مش متسق." },
    when: { en: "Before adding a dependency, check if the project already has one that does it.", ar: "قبل ما تضيف dependency، شوف المشروع فيه حاجة بتعمل كده ولا لأ." },
    pitfall: { en: "Installed but unused packages (TanStack Query in Analytica).", ar: "packages متسطبة ومش مستخدمة (TanStack Query في Analytica)." },
    q: "How do you keep dependencies under control?", a: { en: "Review package.json in PRs, prefer what the project already uses, remove unused ones, and check bundle size with an analyzer.", ar: "راجع الـ package.json في الـ PRs، فضّل اللي المشروع بيستخدمه أصلًا، شيل اللي مش مستخدم، وشوف حجم الـ bundle بـ analyzer." }
  }
];
