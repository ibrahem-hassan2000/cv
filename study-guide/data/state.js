// State & data fetching — written 2026-10-29.
STUDY.fill("state", {
  intro: { en: "Where each kind of state belongs: server, client UI, URL, form and derived state; colocation; Context, Zustand, Redux Toolkit and RTK Query; and TanStack Query in depth (keys, freshness, invalidation, optimistic updates, pagination, prefetching, SSR).", ar: "كل نوع state مكانه فين: سيرفر، UI، URL، فورم، ومشتق؛ الـ colocation؛ و Context و Zustand و Redux Toolkit و RTK Query؛ و TanStack Query بالتفصيل (keys، الجِدّة، invalidation، optimistic، pagination، prefetch، SSR)." },
  topics: [
    {
      id: "kinds-of-state",
      title: { en: "Five kinds of state", ar: "خمس أنواع state" },
      tldr: { en: "Most “state management” problems come from mixing kinds. <b>Server state</b> (a cache of the backend) → TanStack Query. <b>URL state</b> (filters, tabs, pagination) → search params. <b>Form state</b> → react-hook-form. <b>UI state</b> (open, selected) → useState near where it's used. <b>Derived</b> → compute, don't store. Global client state is usually small.", ar: "معظم مشاكل «إدارة الـ state» جاية من خلط الأنواع. <b>Server state</b> (كاش للباك إند) ← TanStack Query. <b>URL state</b> (فلاتر، تابات، صفحات) ← search params. <b>Form state</b> ← react-hook-form. <b>UI state</b> (مفتوح، متحدد) ← useState جنب مكان استخدامه. <b>المشتق</b> ← احسبه متخزنهوش. والـ global client state عادة صغير." },
      blocks: [
        { type: "compare", cols: [{ en: "Kind", ar: "النوع" }, { en: "Owner", ar: "مين ماسكه" }, { en: "Tool", ar: "الأداة" }, { en: "Example", ar: "مثال" }], rows: [
          ["Server", { en: "The backend", ar: "الباك إند" }, "TanStack Query / RTK Query / SWR", { en: "Orders list, user profile", ar: "قايمة الأوردرات، البروفايل" }],
          ["URL", { en: "The address bar", ar: "شريط العنوان" }, "useSearchParams / nuqs", { en: "Status filter, page, tab", ar: "فلتر الحالة، الصفحة، التاب" }],
          ["Form", { en: "The form until submit", ar: "الفورم لحد الـ submit" }, "react-hook-form + Zod", { en: "Invoice being edited", ar: "فاتورة بتتعدل" }],
          ["UI (local)", { en: "One component", ar: "component واحد" }, "useState / useReducer", { en: "Dialog open, hovered row", ar: "Dialog مفتوح، صف عليه hover" }],
          ["UI (shared)", { en: "Several distant components", ar: "components بعيدة عن بعض" }, "Zustand / context / Redux", { en: "Sidebar collapsed, rent mode, toasts", ar: "Sidebar مقفول، وضع الإيجار، toasts" }],
          ["Derived", { en: "Nobody — computed", ar: "محدش — بيتحسب" }, { en: "const / useMemo", ar: "const / useMemo" }, { en: "Filtered list, totals", ar: "قايمة متفلترة، مجاميع" }]
        ] },
        { type: "projects", items: [
          { text: { en: "okoRent: TanStack Query for server state, Zustand only for small cross-page UI state, nuqs for filters.", ar: "okoRent: TanStack Query للـ server state، و Zustand بس للـ UI state الصغير بين الصفحات، و nuqs للفلاتر." }, p: "okorent", tab: "decisions", label: "okoRent" },
          { text: { en: "Smart FAQ: no global store at all — queries, URL filters, forms and a few useSyncExternalStore stores.", ar: "Smart FAQ: مفيش global store خالص — queries، وفلاتر URL، وفورمز، وكام store بـ useSyncExternalStore." }, p: "smartfaq", tab: "decisions", label: "Smart FAQ" }
        ] }
      ],
      say: "I split state by owner: the server cache in TanStack Query, shareable view state in the URL, forms in react-hook-form, and only small UI state in components or a tiny store.",
      interview: [{ q: "Do you use Redux?", a: { en: "Rarely needed now: once server data lives in a query cache, what's left is small UI state. I'd pick Redux Toolkit for a large team with lots of complex client-side state and a need for devtools/time travel; otherwise Zustand or local state.", ar: "نادرًا ما بقى لازم: لما داتا السيرفر تبقى في كاش الـ queries، اللي بيفضل UI state صغير. هختار Redux Toolkit لتيم كبير فيه client state معقد كتير ومحتاج devtools و time travel؛ غير كده Zustand أو state محلي." } }],
      quiz: [{ q: { en: "The selected tab should survive refresh and be shareable — where?", ar: "التاب المختار لازم يفضل بعد الـ refresh ويتبعت — فين؟" }, a: { en: "In the URL.", ar: "في الـ URL." } }],
      quick: [{ en: "Server → query cache · URL → params · form → RHF · UI → local · derived → compute.", ar: "سيرفر ← كاش queries · URL ← params · فورم ← RHF · UI ← محلي · مشتق ← احسبه." }]
    },
    {
      id: "colocation",
      title: { en: "Colocation, lifting state and moving state down", ar: "الـ Colocation ورفع الـ state وتنزيله" },
      tldr: { en: "Keep state as close as possible to where it's used. Lift it only to the nearest common parent of the components that need it. Moving state down (or extracting the stateful part) is the cheapest performance fix there is.", ar: "خلي الـ state أقرب ما يمكن لمكان استخدامه. ارفعه بس لأقرب أب مشترك للـ components اللي محتاجاه. وتنزيل الـ state (أو فصل الجزء اللي فيه state) أرخص حل للأداء موجود." },
      blocks: [
        { type: "code", code: "// ✗ typing in the search re-renders the whole page\nfunction Page() { const [q, setQ] = useState(\"\"); return <><input value={q} onChange={(e) => setQ(e.target.value)} /><HugeTable /></>; }\n\n// ✓ state moved into the component that needs it\nfunction SearchBox() { const [q, setQ] = useState(\"\"); return <input value={q} onChange={(e) => setQ(e.target.value)} />; }\nfunction Page() { return <><SearchBox /><HugeTable /></>; }" }
      ],
      say: "Before reaching for memo I move state down to the component that needs it — fewer components re-render and the code gets simpler.",
      interview: [{ q: "What's your first step when a page re-renders too much?", a: { en: "Profile it, then check where state lives: move state down, pass expensive subtrees as children, split contexts — and only then memoize.", ar: "أعمله profile، وبعدين أشوف الـ state عايش فين: أنزّله، أبعت الأجزاء التقيلة كـ children، أقسم الـ contexts — وبعد كده بس memo." } }],
      quiz: [{ q: { en: "Two siblings need the same value — where does state go?", ar: "أخين محتاجين نفس القيمة — الـ state يروح فين؟" }, a: { en: "Their nearest common parent.", ar: "أقرب أب مشترك ليهم." } }],
      quick: [{ en: "Colocate; lift to the nearest common parent; move down before memoizing.", ar: "خليه قريب؛ ارفعه لأقرب أب مشترك؛ نزّله قبل الـ memo." }]
    },
    {
      id: "zustand-redux",
      title: { en: "Zustand vs Redux Toolkit vs Context", ar: "Zustand ولا Redux Toolkit ولا Context" },
      tldr: { en: "Context passes values (no selectors). Zustand is a tiny store with selectors — components re-render only when their slice changes. Redux Toolkit adds structure (slices, reducers, middleware), excellent devtools and RTK Query — worth it for large, complex client state and big teams.", ar: "الـ Context بيعدّي قيم (من غير selectors). و Zustand store صغير بـ selectors — الـ component بيعمل re-render بس لما الجزء بتاعه يتغير. و Redux Toolkit بيزود هيكل (slices، reducers، middleware)، و devtools ممتازة، و RTK Query — يستاهل للـ client state الكبير والمعقد والتيمز الكبيرة." },
      blocks: [
        { type: "code", code: "// Zustand\nconst useUI = create<{ sidebar: boolean; toggle: () => void }>((set) => ({\n  sidebar: true,\n  toggle: () => set((s) => ({ sidebar: !s.sidebar })),\n}));\nconst sidebar = useUI((s) => s.sidebar);      // selector: re-render only when this changes\n\n// Redux Toolkit\nconst ui = createSlice({ name: \"ui\", initialState: { sidebar: true }, reducers: { toggle: (s) => { s.sidebar = !s.sidebar; } } }); // Immer: \"mutations\" are safe\nconst sidebar2 = useSelector((s: RootState) => s.ui.sidebar);" },
        { type: "compare", cols: ["", "Context", "Zustand", "Redux Toolkit"], rows: [
          [{ en: "Selectors", ar: "Selectors" }, "✗", "✓", "✓"],
          [{ en: "Boilerplate", ar: "كود زيادة" }, { en: "Low", ar: "قليل" }, { en: "Very low", ar: "قليل جدًا" }, { en: "Medium", ar: "متوسط" }],
          [{ en: "Devtools / time travel", ar: "Devtools و time travel" }, "✗", { en: "via middleware", ar: "عن طريق middleware" }, { en: "Excellent", ar: "ممتازة" }],
          [{ en: "Server-data layer", ar: "طبقة داتا السيرفر" }, "✗", { en: "pair with TanStack Query", ar: "معاه TanStack Query" }, "RTK Query"],
          [{ en: "Best for", ar: "أحسن لـ" }, { en: "Theme, locale, session", ar: "Theme، locale، session" }, { en: "Small/medium shared UI state", ar: "UI state مشترك صغير أو متوسط" }, { en: "Large apps, many devs, complex flows", ar: "تطبيقات كبيرة، مطورين كتير، flows معقدة" }]
        ] },
        { type: "projects", items: [
          { text: { en: "okoRent and Spectra used Zustand for small shared state; AHS kept its existing Zustand store; anyShop and two 2025 take-home tasks used Redux Toolkit.", ar: "okoRent و Spectra استخدموا Zustand للـ state المشترك الصغير؛ و AHS حافظ على الـ Zustand store الموجود؛ و anyShop ومهمتين take-home في 2025 استخدموا Redux Toolkit." }, p: "okorent", tab: "decisions", label: "okoRent" }
        ] }
      ],
      say: "With server data in TanStack Query, what's left is small UI state, so Zustand with selectors is usually enough; Redux Toolkit earns its place in large apps with complex client flows.",
      interview: [{ q: "Why are selectors important?", a: { en: "Without them every subscriber re-renders on any store change. A selector subscribes a component to just the slice it reads, compared by reference.", ar: "من غيرهم كل مشترك بيعمل re-render مع أي تغيير في الـ store. والـ selector بيخلي الـ component مشترك في الجزء اللي بيقراه بس، والمقارنة بالـ reference." },
        follow: [{ q: "Selector returns a new object each time — problem?", a: { en: "Yes: a new reference every time means a re-render every time. Select primitives, or use a shallow-equality helper (useShallow).", ar: "أيوه: reference جديد كل مرة يعني re-render كل مرة. اختار primitives، أو استخدم مقارنة shallow (useShallow)." } }] }],
      quiz: [{ q: { en: "Why can RTK reducers “mutate” state?", ar: "ليه الـ reducers في RTK ينفع «تعدل» الـ state؟" }, a: { en: "Immer records the changes and produces a new immutable state.", ar: "Immer بيسجل التغييرات ويطلع state جديد immutable." } }],
      quick: [{ en: "Context = no selectors; Zustand = tiny + selectors; RTK = structure + devtools + RTK Query.", ar: "Context = من غير selectors؛ Zustand = صغير و selectors؛ RTK = هيكل و devtools و RTK Query." }]
    },
    {
      id: "query-deep",
      title: { en: "TanStack Query in depth", ar: "TanStack Query بالتفصيل" },
      tldr: { en: "A query is “data described by a key, fetched by a function, cached and kept fresh”. Design keys hierarchically, set staleTime per kind of data, invalidate by scope after writes, prefetch on intent, use placeholder data for pagination, and hydrate the cache from the server in SSR.", ar: "الـ query = «داتا موصوفة بـ key، بتتجاب بـ function، ومتخزنة ومتحدثة». صمم الـ keys بشكل هرمي، وحدد staleTime لكل نوع داتا، واعمل invalidate بالـ scope بعد الكتابة، و prefetch مع النية، و placeholder data للـ pagination، و hydrate للكاش من السيرفر في الـ SSR." },
      blocks: [
        { type: "code", code: "// key factory per domain\nexport const orderKeys = {\n  all: [\"orders\"] as const,\n  lists: () => [...orderKeys.all, \"list\"] as const,\n  list: (f: Filters) => [...orderKeys.lists(), f] as const,\n  detail: (id: string) => [...orderKeys.all, \"detail\", id] as const,\n};\nqc.invalidateQueries({ queryKey: orderKeys.lists() });   // all lists, any filters\n\n// prefetch on hover\n<Link to={`/orders/${id}`} onMouseEnter={() => qc.prefetchQuery({ queryKey: orderKeys.detail(id), queryFn: () => api.get(id) })} />\n\n// seed a detail from the list cache\nuseQuery({ queryKey: orderKeys.detail(id), queryFn, initialData: () => qc.getQueryData(orderKeys.lists())?.find((o) => o.id === id) });" },
        { type: "compare", title: { en: "After a mutation", ar: "بعد الـ mutation" }, cols: [{ en: "Approach", ar: "الطريقة" }, { en: "When", ar: "إمتى" }], rows: [
          ["invalidateQueries", { en: "Default — refetch what changed (simple, always correct)", ar: "الافتراضي — refetch للي اتغير (بسيط ودايمًا صح)" }],
          ["setQueryData with the response", { en: "The response already contains the new entity", ar: "الرد فيه الحاجة الجديدة أصلًا" }],
          [{ en: "Optimistic (onMutate + rollback)", ar: "Optimistic (onMutate + رجوع)" }, { en: "Instant feedback matters (likes, toggles, reorder)", ar: "الرد الفوري مهم (likes، toggles، ترتيب)" }]
        ] },
        { type: "pitfalls", items: [
          { en: "Keys that don't include every input of the queryFn → wrong cached data shown for other params.", ar: "Keys مش فيها كل مدخلات الـ queryFn ← داتا غلط متخزنة بتظهر لـ params تانية." },
          { en: "Copying query data into useState → it stops updating.", ar: "نسخ داتا الـ query في useState ← بتبطل تتحدث." },
          { en: "Using useMutation for reads → no caching, no dedupe (seen in a big codebase).", ar: "استخدام useMutation للقراية ← مفيش كاش ولا منع تكرار (شفتها في codebase كبير)." }
        ] },
        { type: "projects", items: [
          { text: { en: "Smart FAQ: scope-first keys so one feature refreshes another without importing it; QueryCache onError clears the session on 401.", ar: "Smart FAQ: keys بتبدأ بالـ scope علشان feature تحدث التانية من غير import؛ و onError في الـ QueryCache بيمسح الـ session مع 401." }, p: "smartfaq", tab: "decisions", label: "Smart FAQ" },
          { text: { en: "AHS: the migration from a custom Axios hook — services → query hooks, 25 domain modules.", ar: "AHS: النقل من Axios hook مخصوص — services ← query hooks، و 25 domain module." }, p: "ahs", tab: "decisions", label: "AHS" },
          { text: { en: "Kalima: a persisted query cache for offline use.", ar: "Kalima: كاش queries متخزن للاستخدام offline." }, p: "kalima", tab: "decisions", label: "Kalima" }
        ] }
      ],
      say: "I design query keys as a hierarchy with a factory, so invalidating a whole scope after a write is one line, and I add optimistic updates only where instant feedback matters.",
      interview: [
        { q: "How does React Query dedupe requests?", a: { en: "Components using the same key share one query; while it's fetching, new observers attach to the same promise instead of starting another request.", ar: "الـ components اللي بتستخدم نفس الـ key بتشارك query واحد؛ ولو بيتجاب، أي حد جديد بيتابع نفس الـ promise بدل ما يبدأ request تاني." } },
        { q: "How do you use it with SSR (Next.js)?", a: { en: "Prefetch on the server into a QueryClient, dehydrate it, and wrap the client part in HydrationBoundary so the client starts with the data — or fetch in server components and pass data down.", ar: "اعمل prefetch على السيرفر في QueryClient، وبعدين dehydrate، ولف الجزء اللي في الـ client بـ HydrationBoundary علشان يبدأ بالداتا — أو هات الداتا في server components وابعتها لتحت." } }
      ],
      quiz: [{ q: { en: "Invalidate every orders list regardless of filters?", ar: "تعمل invalidate لكل قوايم الأوردرات مهما كانت الفلاتر؟" }, a: { en: "invalidateQueries({ queryKey: [\"orders\", \"list\"] }) — prefix matching.", ar: "invalidateQueries({ queryKey: [\"orders\", \"list\"] }) — المطابقة بالبداية." } }],
      quick: [{ en: "Key factory hierarchy; invalidate by prefix; setQueryData when the response has it; optimistic only where needed; prefetch + hydrate.", ar: "Key factory هرمي؛ invalidate بالبداية؛ setQueryData لما الرد فيه الداتا؛ optimistic بس لما يلزم؛ prefetch و hydrate." }]
    },
    {
      id: "derived-state",
      title: { en: "Derived state and single source of truth", ar: "الـ Derived state ومصدر حقيقة واحد" },
      tldr: { en: "If a value can be computed from props/state, compute it during render. Storing it creates two sources of truth that drift apart and needs effects to sync them. For selections, store the id, not a copy of the object.", ar: "لو القيمة ينفع تتحسب من props أو state، احسبها في الـ render. لو خزنتها بيبقى عندك مصدرين للحقيقة بيبعدوا عن بعض ومحتاج effects تزامنهم. وللاختيار، خزّن الـ id مش نسخة من الـ object." },
      blocks: [
        { type: "code", code: "// ✗ two sources of truth + an effect to sync\nconst [items, setItems] = useState(rows);\nconst [selected, setSelected] = useState(rows[0]);   // stale after items update\n\n// ✓ store the id, derive the object\nconst [selectedId, setSelectedId] = useState(rows[0]?.id);\nconst selected = rows.find((r) => r.id === selectedId);\nconst total = rows.reduce((s, r) => s + r.amount, 0);  // derived, no state" }
      ],
      say: "I store the minimum state — ids, not copies — and derive the rest in render, so nothing needs to be kept in sync.",
      interview: [{ q: "Why is syncing state in useEffect a smell?", a: { en: "It renders once with stale data, then again after the effect — and the two copies can disagree. Deriving gives the right value in the first render.", ar: "بيعمل render مرة بداتا قديمة، وبعدين مرة تانية بعد الـ effect — والنسختين ممكن يختلفوا. الاشتقاق بيدي القيمة الصح من أول render." } }],
      quiz: [{ q: { en: "Store selectedUser object or selectedUserId?", ar: "تخزن الـ selectedUser object ولا الـ selectedUserId؟" }, a: { en: "The id.", ar: "الـ id." } }],
      quick: [{ en: "Minimum state; derive in render; store ids not copies; no syncing effects.", ar: "أقل state؛ اشتق في الـ render؛ خزّن IDs مش نسخ؛ من غير effects مزامنة." }]
    },
    {
      id: "offline",
      title: { en: "Offline-first and syncing", ar: "الـ Offline-first والمزامنة" },
      tldr: { en: "Offline-first means the UI reads and writes local data first and syncs later: persist the cache, queue mutations with idempotent ids, replay them when online, and resolve conflicts (last-write-wins, server wins, or merge).", ar: "الـ Offline-first معناه إن الواجهة بتقرا وتكتب داتا محلية الأول وتزامن بعدين: خزّن الكاش، وحط الـ mutations في طابور بـ IDs idempotent، وأعد تشغيلها لما النت يرجع، وحل التعارضات (آخر كتابة تكسب، أو السيرفر يكسب، أو دمج)." },
      blocks: [
        { type: "list", items: [
          { en: "Persist the query cache (React Query persister: AsyncStorage/IndexedDB/MMKV).", ar: "خزّن كاش الـ queries (persister في React Query: AsyncStorage أو IndexedDB أو MMKV)." },
          { en: "Queue writes locally (SQLite/IndexedDB) with a client-generated id so replaying twice is harmless.", ar: "حط الكتابة في طابور محلي (SQLite أو IndexedDB) بـ id من الـ client علشان التكرار ميضرش." },
          { en: "Show sync status (pending, failed) and retry with backoff.", ar: "اعرض حالة المزامنة (مستني، فشل) وأعد بـ backoff." }
        ] },
        { type: "projects", items: [
          { text: { en: "Kalima: SQLite offline queue with idempotent replay + persisted query cache. ONE14: a persistent outbox and offline-first session recovery.", ar: "Kalima: طابور offline في SQLite بإعادة idempotent وكاش queries متخزن. و ONE14: outbox متخزن واسترجاع الجلسة offline-first." }, p: "kalima", tab: "decisions", label: "Kalima" }
        ] }
      ],
      say: "Offline-first apps read from a persisted cache and write through a local queue with idempotent ids, replayed when the connection returns.",
      interview: [{ q: "How do you avoid duplicate records when replaying an offline queue?", a: { en: "Generate the id on the client (UUID) or send an idempotency key, so the server treats a replay as the same operation.", ar: "اعمل الـ id على الـ client (UUID) أو ابعت idempotency key، فالسيرفر يعتبر التكرار نفس العملية." } }],
      quiz: [{ q: { en: "Mobile storage for a big offline queue?", ar: "تخزين موبايل لطابور offline كبير؟" }, a: { en: "SQLite (MMKV/AsyncStorage for small key-value).", ar: "SQLite (و MMKV أو AsyncStorage للـ key-value الصغير)." } }],
      quick: [{ en: "Persisted cache + local write queue + idempotent ids + replay + conflict rule.", ar: "كاش متخزن + طابور كتابة محلي + IDs idempotent + إعادة + قاعدة للتعارض." }]
    }
  ]
});
