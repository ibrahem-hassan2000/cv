// Frontend system design — written 2026-10-29.
STUDY.fill("system-design", {
  intro: { en: "How to answer “design the frontend of X” in 45 minutes: a framework (RADIO), then worked cases — autocomplete, news feed, chat, an admin dashboard with tables and filters, a rich-text editor with review, a design system, and an offline-first mobile app.", ar: "إزاي تجاوب «صمم الفرونت إند لـ X» في 45 دقيقة. الأول framework اسمه RADIO. وبعدين حالات محلولة: autocomplete، و news feed، وشات، وداشبورد أدمن بجداول وفلاتر، و rich-text editor بمراجعة، و design system، وتطبيق موبايل offline-first." },
  topics: [
    {
      id: "radio",
      title: { en: "The RADIO framework", ar: "الـ RADIO framework" },
      tldr: { en: "<b>R</b>equirements (functional, non-functional, scope) → <b>A</b>rchitecture (components, data flow, rendering choice) → <b>D</b>ata model (entities, client state vs server state) → <b>I</b>nterface (API: endpoints, pagination, real-time) → <b>O</b>ptimisations (performance, a11y, i18n, security, offline, observability). Drive the conversation and time-box each part.", ar: "الترتيب كده. <b>R</b>equirements: الـ functional والـ non-functional والـ scope. وبعدين <b>A</b>rchitecture: الـ components، والداتا بتمشي إزاي، وطريقة الـ rendering. وبعدين <b>D</b>ata model: الـ entities، وإيه client state وإيه server state. وبعدين <b>I</b>nterface: الـ API (endpoints و pagination و real-time). وفي الآخر <b>O</b>ptimisations: الأداء، والـ a11y، واللغات، والأمان، والـ offline، والمراقبة. وإنت اللي بتقود الكلام، وبتحدد وقت لكل جزء." },
      blocks: [
        { type: "compare", cols: [{ en: "Step", ar: "الخطوة" }, { en: "Time", ar: "الوقت" }, { en: "Say / draw", ar: "قول / ارسم" }], rows: [
          ["Requirements", "5–8 min", { en: "Core features, users, devices, scale, offline?, real-time?, SEO?, a11y, languages", ar: "الـ features الأساسية، المستخدمين، الأجهزة، الحجم، offline؟، real-time؟، SEO؟، a11y، اللغات" }],
          ["Architecture", "8–10 min", { en: "Component tree, where state lives, CSR/SSR choice, data layer", ar: "شجرة الـ components، الـ state فين، CSR ولا SSR، طبقة الداتا" }],
          ["Data model", "5 min", { en: "Entities and fields; normalised cache; what's derived", ar: "الـ entities والـ fields، وكاش normalised، وإيه اللي بيتحسب منهم" }],
          ["Interface (API)", "5–8 min", { en: "Endpoints, request/response shapes, pagination, errors, real-time channel", ar: "Endpoints، شكل الـ requests والردود، pagination، أخطاء، قناة real-time" }],
          ["Optimisations", "10+ min", { en: "Perf (virtualise, split, cache), a11y, i18n/RTL, security, offline, monitoring", ar: "أداء (virtualization، تقسيم، كاش)، a11y، لغات و RTL، أمان، offline، مراقبة" }]
        ] }
      ],
      say: "I'll start by agreeing on requirements and scope, then sketch the component architecture and data flow, define the data model and API, and spend the rest on performance, accessibility and edge cases.",
      interview: [{ q: "What separates a senior answer from a mid one?", a: { en: "Trade-offs stated explicitly (why cursor pagination, why SSR here), non-functional requirements (perf budgets, a11y, i18n, offline, errors), and owning the conversation instead of waiting for prompts.", ar: "إنه بيقول الـ trade-offs صراحة، زي ليه cursor pagination، وليه SSR هنا. وبيتكلم عن الـ non-functional requirements: ميزانية الأداء، والـ a11y، واللغات، والـ offline، والأخطاء. وبيقود الكلام بدل ما يستنى الأسئلة." } }],
      quiz: [{ q: { en: "What comes first in RADIO?", ar: "إيه أول حاجة في RADIO؟" }, a: { en: "Requirements — clarify scope before designing.", ar: "الـ Requirements — وضّح النطاق قبل التصميم." } }],
      quick: [{ en: "Requirements → Architecture → Data → Interface → Optimisations; state trade-offs; drive the clock.", ar: "Requirements ← Architecture ← Data ← Interface ← Optimisations. وقول الـ trade-offs، وإنت اللي ماسك الوقت." }]
    },
    {
      id: "autocomplete",
      title: { en: "Case: search autocomplete / typeahead", ar: "حالة: autocomplete للبحث" },
      tldr: { en: "Debounce input, cancel or ignore stale requests, cache results per query, show loading/empty/error states, keyboard navigation with ARIA combobox semantics, highlight matches, and keep the list fast.", ar: "debounce للـ input، وإلغاء أو تجاهل الـ requests القديمة، وكاش للنتايج لكل بحث. وحالات loading وفاضي و error. وتنقل بالكيبورد بالـ semantics بتاعة ARIA combobox. وتلوين الكلمات المطابقة. والقايمة تفضل سريعة." },
      blocks: [
        { type: "list", items: [
          { en: "<b>Data:</b> <code>useQuery({ queryKey: [\"search\", debouncedQ], enabled: q.length ≥ 2 })</code> — the key gives a cache per query, the signal cancels outdated requests.", ar: "<b>الداتا:</b> <code>useQuery({ queryKey: [\"search\", debouncedQ], enabled: q.length ≥ 2 })</code> — الـ key بيدي كاش لكل بحث، والـ signal بيلغي القديم." },
          { en: "<b>A11y:</b> input <code>role=\"combobox\"</code> + <code>aria-expanded</code> + <code>aria-controls</code>; list <code>role=\"listbox\"</code>; <code>aria-activedescendant</code> for the highlighted option; ↑ ↓ Enter Esc.", ar: "<b>A11y:</b> الـ input عليه <code>role=\"combobox\"</code> و <code>aria-expanded</code> و <code>aria-controls</code>. والقايمة عليها <code>role=\"listbox\"</code>. و <code>aria-activedescendant</code> للاختيار المتعلّم عليه. والمفاتيح: ↑ ↓ Enter Esc." },
          { en: "<b>Perf:</b> limit results, virtualise if long, prefetch the top result's page on highlight.", ar: "<b>الأداء:</b> حط حد للنتايج، و virtualization لو طويلة، و prefetch لصفحة أول نتيجة مع التظليل." },
          { en: "<b>Privacy:</b> don't put the query in the URL if it may contain personal data; don't log it.", ar: "<b>الخصوصية:</b> متحطش البحث في الـ URL لو ممكن يبقى فيه بيانات شخصية. ومتسجّلوش." }
        ] },
        { type: "projects", items: [{ text: { en: "Smart FAQ search: highlighted matches, multi-department filter, synonyms and typo handling (backend), search text kept out of the URL; FAQ AI POC: intent-based matching in Arabic, Franco and English.", ar: "البحث في Smart FAQ فيه تلوين للمطابق، وفلتر لأكتر من قسم، ومرادفات وأخطاء كتابة (في الـ backend). ونص البحث برّه الـ URL. والـ FAQ AI POC كان بيطابق بالنية، بالعربي والفرانكو والإنجليزي." }, p: "smartfaq", tab: "decisions", label: "Smart FAQ" }] }
      ],
      say: "Debounced input feeds a query keyed by the search text, so results are cached and stale requests cancelled; the UI follows the ARIA combobox pattern for keyboard and screen readers.",
      interview: [{ q: "How do you prevent showing results for an older query?", a: { en: "Key the cache by the query and cancel previous requests (AbortSignal) — the UI only renders data for the current key. Without a library: keep the latest request id and ignore older responses.", ar: "اعمل الكاش بالـ key بتاع البحث والغي الـ requests اللي قبل (AbortSignal) — الواجهة بترسم بس داتا الـ key الحالي. ومن غير مكتبة: احتفظ بـ id آخر request وتجاهل الردود الأقدم." } }],
      quiz: [{ q: { en: "ARIA attribute pointing to the highlighted option?", ar: "الـ ARIA attribute اللي بيشاور على الاختيار المظلل؟" }, a: { en: "aria-activedescendant.", ar: "aria-activedescendant." } }],
      quick: [{ en: "Debounce + query key per text + cancel; combobox/listbox ARIA + arrows; limit/virtualise; privacy.", ar: "debounce، و key لكل نص، وإلغاء. و ARIA combobox و listbox والأسهم. وحد للكاش و virtualization. والخصوصية." }]
    },
    {
      id: "feed",
      title: { en: "Case: infinite news feed", ar: "حالة: news feed لانهائي" },
      tldr: { en: "Cursor pagination with useInfiniteQuery, an IntersectionObserver sentinel, list virtualisation, optimistic likes, new-post indicator instead of jumping the scroll, lazy media with reserved space, and scroll restoration on Back.", ar: "cursor pagination بـ useInfiniteQuery، و sentinel بـ IntersectionObserver، و virtualization للقايمة. والـ likes بـ optimistic. ومؤشر «بوستات جديدة» بدل ما الـ scroll يتنطط. والميديا lazy ومكانها محجوز. والرجوع لنفس مكان الـ scroll مع زرار Back." },
      blocks: [
        { type: "code", code: "Feed (page)\n ├─ NewPostsBanner        ← real-time count; click = prepend + scroll to top\n ├─ VirtualList           ← windowed rows, measured heights\n │   └─ PostCard (memo)   ← media with aspect-ratio box, optimistic Like\n └─ Sentinel              ← IntersectionObserver → fetchNextPage()\n\nGET /feed?cursor=abc&limit=20 → { items, nextCursor }\nPOST /posts/:id/like (idempotent per user)" },
        { type: "projects", items: [{ text: { en: "Trackoo: social feed and 24h stories with TanStack Query and heart animation; okoRent: virtualised chat history growing upwards.", ar: "Trackoo: فيه feed اجتماعي و stories لمدة 24 ساعة، بـ TanStack Query وأنيميشن القلب. و okoRent: فيه تاريخ شات virtualized بيكبر لفوق." }, p: "okorent", tab: "decisions", label: "okoRent" }] }
      ],
      say: "The feed uses cursor pagination with useInfiniteQuery, virtualises rows, reserves media space to avoid layout shift, and shows a new-posts banner instead of moving the user's scroll.",
      interview: [{ q: "Why cursor and not page numbers for a feed?", a: { en: "New posts arriving shift offsets, causing duplicates or skipped items; a cursor points to a stable position. Feeds also don't need “jump to page 7”.", ar: "البوستات الجديدة بتزحزح الـ offsets، فبيحصل تكرار أو نط. أما الـ cursor فبيشاور على مكان ثابت. والـ feeds كمان مش محتاجة «روح لصفحة 7»." } }],
      quiz: [{ q: { en: "How do you avoid CLS when images load in the feed?", ar: "تتجنب CLS إزاي لما الصور تتحمل في الـ feed؟" }, a: { en: "Reserve space with known dimensions / aspect-ratio.", ar: "احجز المكان بأبعاد معروفة أو aspect-ratio." } }],
      quick: [{ en: "Cursor + useInfiniteQuery + sentinel; virtualise; aspect-ratio media; optimistic likes; new-posts banner; scroll restoration.", ar: "cursor و useInfiniteQuery و sentinel. و virtualization. وميديا بـ aspect-ratio. و likes optimistic. وبانر للبوستات الجديدة. ورجوع الـ scroll." }]
    },
    {
      id: "chat",
      title: { en: "Case: real-time chat", ar: "حالة: شات real-time" },
      tldr: { en: "A socket (WebSocket/SignalR) for new messages, typing and presence; history loaded in pages upwards; messages written into the query cache; optimistic sending with client ids and retry; reconnect with backoff and a refetch to fill gaps; unread counts.", ar: "socket (WebSocket أو SignalR) للرسايل الجديدة، ولـ «بيكتب دلوقتي»، وللـ presence. والتاريخ بيتحمّل صفحات لفوق. والرسايل بتتكتب في كاش الـ queries. والإرسال optimistic، بـ IDs من الـ client، ومعاه retry. والـ reconnect بـ backoff، ومعاه refetch يملا اللي فات. وعدّاد للرسايل اللي متقريتش." },
      blocks: [
        { type: "list", items: [
          { en: "<b>Send:</b> add the message with <code>clientId</code> and status “sending” → POST → replace with the server message (match by clientId) or mark “failed — retry”.", ar: "<b>الإرسال:</b> زود الرسالة بـ <code>clientId</code> وحالة «بيتبعت» ← POST ← بدّلها برسالة السيرفر (طابق بالـ clientId) أو علّمها «فشل — أعد»." },
          { en: "<b>Receive:</b> socket event → <code>setQueryData</code> to append (dedupe by id) → bump unread if the thread isn't open.", ar: "<b>الاستقبال:</b> event من الـ socket ← <code>setQueryData</code> يزود (من غير تكرار بالـ id) ← يزود غير المقروء لو المحادثة مش مفتوحة." },
          { en: "<b>Scroll:</b> stick to bottom only if the user is already at the bottom; loading older pages keeps the position (Virtuoso <code>firstItemIndex</code>).", ar: "<b>الـ Scroll:</b> انزل لتحت لوحدك بس لو اليوزر أصلًا تحت. وتحميل الصفحات الأقدم لازم يحافظ على مكانه (<code>firstItemIndex</code> في Virtuoso)." },
          { en: "<b>Resilience:</b> automatic reconnect, “reconnecting…” banner, refetch since last message id after reconnect.", ar: "<b>الصمود:</b> reconnect لوحده، وبانر «بنحاول نتصل…»، و refetch من آخر id بعد الرجوع." }
        ] },
        { type: "projects", items: [{ text: { en: "okoRent: SignalR chat hub and notifications, an infinite-scroll virtualised inbox; Aquadic's Find Help: Firebase real-time chat.", ar: "okoRent: فيه chat hub بـ SignalR وإشعارات، و inbox فيه infinite scroll و virtualization. و Find Help في Aquadic: شات real-time بـ Firebase." }, p: "okorent", tab: "how", label: "okoRent" }] }
      ],
      say: "Messages are sent optimistically with client ids, the socket writes incoming messages into the query cache with de-duplication, and after any reconnect we refetch to close gaps.",
      interview: [{ q: "How do you avoid duplicate messages when both the POST response and the socket event arrive?", a: { en: "Give each message a client-generated id; when either arrives, upsert by id (or replace the optimistic one by clientId) instead of appending blindly.", ar: "ادّي كل رسالة id من الـ client. ولما أي نسخة منها توصل، اعمل upsert بالـ id (أو بدّل الـ optimistic بالـ clientId)، بدل ما تضيف وخلاص." } }],
      quiz: [{ q: { en: "Transport for chat on a .NET backend?", ar: "الـ transport لشات على باك إند .NET؟" }, a: { en: "SignalR.", ar: "SignalR." } }],
      quick: [{ en: "Socket → setQueryData (dedupe); optimistic send with clientId; paged history upwards; reconnect + refetch; sticky-bottom only when at bottom.", ar: "الـ socket بيكتب بـ setQueryData، من غير تكرار. والإرسال optimistic بـ clientId. والتاريخ بصفحات لفوق. و reconnect و refetch. وانزل لتحت بس لو اليوزر تحت." }]
    },
    {
      id: "dashboard",
      title: { en: "Case: admin dashboard with tables and filters", ar: "حالة: داشبورد أدمن بجداول وفلاتر" },
      tldr: { en: "Filters, sort and page in the URL; server-side pagination and filtering; a typed data layer with query keys built from the URL; a reusable DataTable (columns config, empty/loading/error states, row actions, responsive cards on phones); permissions from capabilities; optimistic or invalidating mutations; audit trail.", ar: "الفلاتر والترتيب والصفحة في الـ URL. والـ pagination والفلترة على السيرفر. وطبقة داتا بـ types، والـ query keys متعملة من الـ URL. و DataTable بيتستخدم في كل حتة: إعداد أعمدة، وحالات فاضي و loading و error، وأكشنز للصف، وكروت على الموبايل. والصلاحيات من الـ capabilities. والـ mutations بـ optimistic أو invalidation. و audit trail." },
      blocks: [
        { type: "code", code: "URL  /admin/articles?status=review&dept=7&dept=9&sort=-updated&page=2\n  → useUrlFilters() → { status, depts, sort, page }\n  → useQuery([\"admin\",\"articles\",{ status, depts, sort, page }]) → GET /articles?…\n  → <FilterToolbar/> <DataTable columns=… rows=… rowActions=… /> <Pagination/>\nRow action \"Archive\" → useMutation → invalidate [\"admin\"] and [\"knowledge\"]\nConcurrent edits → ETag + If-Match → 412 → reload + message" },
        { type: "projects", items: [{ text: { en: "Smart FAQ (admin articles, users, audit log, review queue), okoRent and Spectra back offices, Bites finance reports — all this shape.", ar: "Smart FAQ (مقالات الأدمن، اليوزرز، الـ audit log، قايمة المراجعة)، والباك أوفيس في okoRent و Spectra، وتقارير المالية في Bites — كلهم بالشكل ده." }, p: "smartfaq", tab: "how", label: "Smart FAQ" }] }
      ],
      say: "Dashboards keep view state in the URL, which becomes the query key; one reusable table handles states and responsive layouts; mutations invalidate by scope, and ETags protect concurrent edits.",
      interview: [{ q: "Client-side or server-side filtering for a 50k-row table?", a: { en: "Server-side: send filters/sort/page to the API and render one page; client-side only when the full dataset is small and already loaded. Virtualise if you must show many rows at once.", ar: "على السيرفر. ابعت الفلاتر والترتيب والصفحة للـ API، واعرض صفحة واحدة. والـ client بس لو الداتا كلها صغيرة ومتحمّلة أصلًا. واعمل virtualization لو لازم تعرض rows كتير مرة واحدة." } }],
      quiz: [{ q: { en: "Where do filters live so Back and share work?", ar: "الفلاتر تتحط فين علشان الـ Back والمشاركة يشتغلوا؟" }, a: { en: "The URL.", ar: "الـ URL." } }],
      quick: [{ en: "URL state → query key → server pagination; reusable table with states + responsive cards; capabilities; invalidate by scope; ETags.", ar: "الـ URL state بيبني الـ query key، والـ pagination على السيرفر. وجدول واحد بيتكرر بحالاته، وكروت على الموبايل. و capabilities. و invalidate بالـ scope. و ETags." }]
    },
    {
      id: "editor",
      title: { en: "Case: rich-text editor with drafts and review", ar: "حالة: rich-text editor بـ drafts ومراجعة" },
      tldr: { en: "A ProseMirror-based editor (TipTap) with a limited schema that matches the backend sanitizer; autosave drafts with debounce + ETag; a state machine for draft → submitted → returned/published; diff view for corrections; unsaved-changes guard; sanitise on render.", ar: "editor مبني على ProseMirror (TipTap)، بـ schema محدود ومطابق للـ sanitizer بتاع الـ backend. و autosave للـ drafts بـ debounce و ETag. و state machine: draft ← submitted ← returned أو published. وعرض الفرق للتصحيحات. وتحذير للتغييرات اللي متحفظتش. و sanitize وقت العرض." },
      blocks: [
        { type: "compare", cols: [{ en: "Decision", ar: "القرار" }, { en: "Choice", ar: "الاختيار" }, { en: "Why", ar: "ليه" }], rows: [
          [{ en: "Editor engine", ar: "محرك الـ editor" }, "TipTap (ProseMirror)", { en: "Structured document, extensible, collaborative later (Yjs)", ar: "مستند منظم، يتوسع، ويبقى جماعي بعدين (Yjs)" }],
          [{ en: "Storage format", ar: "صيغة التخزين" }, { en: "HTML limited to an allowlist (or JSON)", ar: "HTML محدود بـ allowlist (أو JSON)" }, { en: "Matches the server sanitizer; safe to render", ar: "مطابق للـ sanitizer، وآمن في العرض" }],
          [{ en: "Saving", ar: "الحفظ" }, { en: "Debounced autosave + ETag", ar: "Autosave بـ debounce و ETag" }, { en: "No lost work, no silent overwrites", ar: "مفيش شغل ضايع ولا مسح في السر" }],
          [{ en: "Workflow", ar: "الـ Workflow" }, { en: "Explicit states + capabilities", ar: "حالات صريحة و capabilities" }, { en: "Only valid transitions are offered", ar: "بيظهر بس التحولات المسموحة" }]
        ] },
        { type: "projects", items: [{ text: { en: "Smart FAQ: TipTap editor with callouts and tables, article HTML allowlist, draft states, submit/return/publish, correction diff, leave-without-saving guard.", ar: "Smart FAQ: editor بـ TipTap فيه callouts وجداول، و allowlist لـ HTML المقالات، وحالات الـ draft، و submit و return و publish، وفرق التصحيح، وتحذير الخروج من غير حفظ." }, p: "smartfaq", tab: "how", label: "Smart FAQ" }] }
      ],
      say: "The editor's schema matches the server's sanitizer, drafts autosave with ETags, and the review flow is an explicit state machine where the UI offers only the transitions your capabilities allow.",
      interview: [{ q: "How would you add real-time collaboration?", a: { en: "Move to a CRDT (Yjs with TipTap's collaboration extension) over WebSockets, show presence cursors, and keep the review workflow on top of saved versions.", ar: "انقل لـ CRDT (Yjs مع extension التعاون في TipTap) فوق WebSockets، واعرض الـ cursors بتاعة الناس، وخلي الـ review workflow فوق النسخ المحفوظة." } }],
      quiz: [{ q: { en: "Why limit the editor schema?", ar: "ليه تحدد schema الـ editor؟" }, a: { en: "So users can't create content the server will strip, and rendering stays safe.", ar: "علشان المستخدم مايعملش محتوى السيرفر هيشيله، والعرض يفضل آمن." } }],
      quick: [{ en: "TipTap + schema = sanitizer allowlist; debounced autosave + ETag; state machine + capabilities; diff; unsaved guard.", ar: "TipTap، والـ schema هي نفس الـ allowlist بتاعة الـ sanitizer. و autosave بـ debounce و ETag. و state machine و capabilities. و diff. وتحذير قبل ما تخرج من غير حفظ." }]
    },
    {
      id: "design-system-case",
      title: { en: "Case: a design system for several apps", ar: "حالة: design system لكذا تطبيق" },
      tldr: { en: "Tokens first (from Figma variables), headless primitives (Radix) for behaviour, styled components with variants, Storybook as the catalogue with a11y/visual tests, a versioned package (monorepo), theming via CSS variables, RTL from logical properties, and a contribution process.", ar: "الـ tokens الأول (من Figma variables). وبعدين headless primitives (Radix) للسلوك. وبعدين components متستيلة بـ variants. و Storybook ككتالوج، ومعاه فحص للـ a11y وللشكل. و package بـ version (monorepo). و theming بـ CSS variables. والـ RTL من الـ logical properties. وطريقة واضحة للمساهمة." },
      blocks: [
        { type: "list", items: [
          { en: "Layers: tokens → primitives (Radix) → components (Button, Dialog, DataTable) → patterns (FilterToolbar, PageHeader).", ar: "الطبقات: tokens ← primitives (Radix) ← components (Button، Dialog، DataTable) ← patterns (FilterToolbar، PageHeader)." },
          { en: "Distribution: npm package with semver and changelog — or shadcn-style “copy into app” for flexibility.", ar: "التوزيع: npm package بـ semver و changelog — أو أسلوب shadcn «انسخ في التطبيق» للمرونة." },
          { en: "Quality gates: a11y checks, visual regression (Chromatic), docs per component, deprecation policy.", ar: "بوابات الجودة: فحص a11y، و visual regression (Chromatic)، و docs لكل component، وسياسة deprecation." }
        ] },
        { type: "projects", items: [{ text: { en: "Smart FAQ's Atomic-Design system with tokens, shadcn/Radix and 75 Storybook stories is a single-app version of this.", ar: "الـ design system بـ Atomic Design في Smart FAQ بالـ tokens و shadcn/Radix و 75 Storybook story هو نسخة لتطبيق واحد من ده." }, p: "smartfaq", tab: "decisions", label: "Smart FAQ" }] }
      ],
      say: "I'd build it token-first on headless primitives, document every component state in Storybook with a11y and visual tests, and ship it as a versioned package with a clear deprecation policy.",
      interview: [{ q: "Package or copy-in (shadcn style)?", a: { en: "Package for consistency across many teams (one upgrade path); copy-in when apps need to diverge and teams own their components. Many orgs combine: tokens and primitives as a package, components copied.", ar: "الـ package للاتساق بين تيمز كتير، لأن الترقية بتبقى من مكان واحد. والـ copy-in لما الـ apps محتاجة تختلف، وكل تيم ماسك الـ components بتاعته. وشركات كتير بتدمج الاتنين: الـ tokens والـ primitives كـ package، والـ components منسوخة." } }],
      quiz: [{ q: { en: "Tool for visual regression on stories?", ar: "أداة للـ visual regression على الـ stories؟" }, a: { en: "Chromatic (or Playwright screenshots).", ar: "Chromatic (أو screenshots بـ Playwright)." } }],
      quick: [{ en: "Tokens → primitives → components → patterns; Storybook + a11y + visual tests; semver package or copy-in.", ar: "tokens ← primitives ← components ← patterns. و Storybook و a11y و visual tests. و package بـ semver أو copy-in." }]
    },
    {
      id: "offline-mobile-case",
      title: { en: "Case: offline-first mobile app", ar: "حالة: تطبيق موبايل offline-first" },
      tldr: { en: "Local database as the read source (SQLite), a write queue (outbox) with idempotent ids, background sync when online, persisted query cache, conflict rules, and clear sync status in the UI; native features (GPS, audio) record locally first.", ar: "database محلية (SQLite) هي مصدر القراية. وطابور كتابة (outbox) بـ IDs idempotent. ومزامنة في الخلفية لما النت يرجع. وكاش queries متخزن. وقواعد للتعارض. وحالة المزامنة واضحة في الواجهة. والحاجات الـ native (زي الـ GPS والصوت) بتتسجل محلي الأول." },
      blocks: [
        { type: "projects", items: [
          { text: { en: "ONE14: runs recorded locally with session recovery and a persistent outbox; Kalima: SQLite offline queue with idempotent replay and a persisted query cache.", ar: "ONE14: الجري بيتسجل محلي، ومعاه استرجاع للـ session و outbox متخزن. و Kalima: طابور offline في SQLite، بإعادة idempotent، وكاش queries متخزن." }, p: "one14", tab: "decisions", label: "ONE14" }
        ] }
      ],
      say: "The app reads from local storage first, writes go through an outbox with idempotent ids that syncs when online, and the UI always shows what's pending.",
      interview: [{ q: "Two devices edit the same record offline. What happens?", a: { en: "Pick a rule per entity: last-write-wins with timestamps for simple fields, server-wins for authoritative data, or merge/CRDT for collaborative content — and surface conflicts to the user when it matters.", ar: "اختار قاعدة لكل كيان: آخر كتابة تكسب بالـ timestamps للحاجات البسيطة، أو السيرفر يكسب للداتا الرسمية، أو دمج/CRDT للمحتوى الجماعي — وورّي التعارض للمستخدم لما يبقى مهم." } }],
      quiz: [{ q: { en: "Name for the local queue of pending writes?", ar: "اسم الطابور المحلي للكتابات المستنية؟" }, a: { en: "Outbox.", ar: "Outbox." } }],
      quick: [{ en: "Local DB reads; outbox writes with idempotent ids; sync on reconnect; conflict rule per entity; visible sync status.", ar: "القراية من الـ database المحلية. والـ outbox للكتابة بـ IDs idempotent. والمزامنة لما النت يرجع. وقاعدة تعارض لكل entity. وحالة المزامنة ظاهرة لليوزر." }]
    }
  ]
});
