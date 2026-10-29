// Hooks — every React hook plus the library hooks he uses — written 2026-10-29.
STUDY.fill("hooks", {
  intro: { en: "Every hook: what it does, when to reach for it, which hook to use instead, the traps, and where it appears in my projects — React core, React 19, TanStack Query, react-hook-form, routers and React Native.", ar: "كل hook: بيعمل إيه، تستخدمه إمتى، تستخدم بداله إيه، المطبات، وظهر فين في مشاريعي — React الأساسي، و React 19، و TanStack Query، و react-hook-form، والـ routers، و React Native." },
  topics: [
    {
      id: "hooks-map",
      title: { en: "The decision map: which hook?", ar: "خريطة القرار: أنهي hook؟" },
      tldr: { en: "Start from the need, not the hook: data from the server → useQuery; a value that changes the UI → useState/useReducer; a value that must NOT re-render → useRef; computed from other values → compute in render (useMemo if expensive); syncing with something outside React → useEffect.", ar: "ابدأ من الاحتياج مش من الـ hook: داتا من السيرفر ← useQuery؛ قيمة بتغير الواجهة ← useState أو useReducer؛ قيمة لازم متعملش re-render ← useRef؛ محسوبة من قيم تانية ← احسبها في الـ render (useMemo لو تقيلة)؛ مزامنة مع حاجة برا React ← useEffect." },
      blocks: [
        { type: "compare", cols: [{ en: "I need…", ar: "محتاج…" }, { en: "Use", ar: "استخدم" }, { en: "Not", ar: "مش" }], rows: [
          [{ en: "Data from an API", ar: "داتا من API" }, "useQuery / useMutation", "useEffect + useState"],
          [{ en: "UI value that triggers a render", ar: "قيمة UI بتعمل render" }, "useState", "useRef"],
          [{ en: "Several values changing together by actions", ar: "قيم كتير بتتغير مع بعض بأكشنز" }, "useReducer", { en: "many useStates", ar: "useState كتير" }],
          [{ en: "A mutable value / DOM node, no render", ar: "قيمة بتتغير / عنصر DOM من غير render" }, "useRef", "useState"],
          [{ en: "Derived value", ar: "قيمة مشتقة" }, { en: "plain const (useMemo if heavy)", ar: "const عادي (useMemo لو تقيلة)" }, "useEffect + setState"],
          [{ en: "Stable function for a memo child / deps", ar: "function ثابتة لابن عليه memo أو deps" }, "useCallback", { en: "new arrow each render", ar: "arrow جديدة كل render" }],
          [{ en: "Read shared value deep in the tree", ar: "تقرا قيمة مشتركة جوه الشجرة" }, "useContext", { en: "prop drilling 5 levels", ar: "تعدّي props 5 مستويات" }],
          [{ en: "Subscribe to an external store", ar: "تشترك في store خارجي" }, "useSyncExternalStore", "useEffect + setState"],
          [{ en: "Measure the DOM before paint", ar: "تقيس الـ DOM قبل الرسم" }, "useLayoutEffect", "useEffect"],
          [{ en: "Keep typing fast while a big list updates", ar: "الكتابة تفضل سريعة والقايمة الكبيرة بتتحدث" }, "useTransition / useDeferredValue", "debounce only"],
          [{ en: "Accessible id for label/input", ar: "id للـ label والـ input" }, "useId", "Math.random()"]
        ] }
      ],
      say: "I pick hooks by the kind of state: server state in React Query, UI state in useState or useReducer, non-rendering values in refs, derived values computed in render.",
      interview: [{ q: "What are the rules of hooks and why do they exist?", a: { en: "Call hooks only at the top level of components or custom hooks — never in conditions, loops or after early returns. React identifies each hook by call order; changing the order between renders mixes up their state.", ar: "نادِي الـ hooks في أول مستوى بس في الـ components أو الـ custom hooks — مش جوه شروط ولا loops ولا بعد return بدري. React بيعرف كل hook بترتيب ندائه؛ ولو الترتيب اتغير بين الـ renders الـ state بتاعهم بيتلخبط." } }],
      quiz: [{ q: { en: "A value used only inside an interval callback, no UI — which hook?", ar: "قيمة مستخدمة جوه callback بتاع interval بس، من غير UI — أنهي hook؟" }, a: { en: "useRef.", ar: "useRef." } }],
      quick: [{ en: "Server → useQuery · UI → useState/useReducer · no-render → useRef · derived → compute · external → useEffect.", ar: "سيرفر ← useQuery · UI ← useState/useReducer · من غير render ← useRef · مشتق ← احسبه · خارجي ← useEffect." }]
    },
    {
      id: "usestate",
      title: { en: "useState", ar: "useState" },
      tldr: { en: "Local state that re-renders the component when it changes. Use the updater form for dependent updates, a lazy initializer for expensive initial values, and new objects/arrays instead of mutation.", ar: "State محلي بيعمل re-render لما يتغير. استخدم الـ updater للتحديثات المعتمدة، و lazy initializer للقيمة الأولى التقيلة، و objects أو arrays جديدة بدل التعديل." },
      blocks: [
        { type: "code", code: "const [open, setOpen] = useState(false);\nsetOpen((o) => !o);                                   // updater: based on the latest value\n\nconst [rows, setRows] = useState(() => parse(bigCsv)); // lazy init: runs once, not every render\nsetRows((r) => r.filter((x) => x.id !== id));          // new array\n\nconst [user, setUser] = useState<User | null>(null);" },
        { type: "pitfalls", items: [
          { en: "Copying props into state (<code>useState(props.value)</code>) only uses the first value — later prop changes are ignored. Read the prop directly or reset with a key.", ar: "نسخ الـ props في state (<code>useState(props.value)</code>) بياخد أول قيمة بس — تغييرات الـ prop بعد كده بتتجاهل. اقرا الـ prop على طول أو اعمل reset بـ key." },
          { en: "Storing derived data (filteredList) in state → it goes out of sync. Derive it.", ar: "تخزين داتا مشتقة (filteredList) في state ← بتخرج عن التزامن. اشتقها." },
          { en: "Storing server data in useState → you rebuild caching badly. Use React Query.", ar: "تخزين داتا السيرفر في useState ← بتعيد بناء الكاش بشكل وحش. استخدم React Query." }
        ] },
        { type: "projects", items: [{ text: { en: "Smart FAQ: 119 useState calls — dialogs, menus, local UI; never server data.", ar: "Smart FAQ: 119 useState — dialogs ومنيوهات و UI محلي؛ عمرها ما كانت داتا سيرفر." }, p: "smartfaq", tab: "hooks", label: "Smart FAQ" }] }
      ],
      say: "useState is for UI state that changes what's on screen; I keep it minimal and derive everything else.",
      interview: [{ q: "When useState vs useRef?", a: { en: "If changing the value should update the screen → useState. If it shouldn't (a timer id, the previous value, a DOM node) → useRef.", ar: "لو تغيير القيمة لازم يحدث الشاشة ← useState. لو لأ (id تايمر، القيمة اللي قبل، عنصر DOM) ← useRef." },
        follow: [{ q: "What is the lazy initializer for?", a: { en: "<code>useState(() =&gt; expensive())</code> runs the function only on the first render; <code>useState(expensive())</code> runs it every render and throws the result away.", ar: "<code>useState(() =&gt; expensive())</code> بتشغل الـ function في أول render بس؛ و <code>useState(expensive())</code> بتشغلها كل render وترمي النتيجة." } }] }],
      quiz: [{ q: { en: "Does setting state to the same value re-render?", ar: "لو حطيت نفس القيمة، بيعمل re-render؟" }, a: { en: "No (Object.is bail-out).", ar: "لأ (Object.is bail-out)." } }],
      quick: [{ en: "Updater for dependent updates; lazy init; never mirror props or server data.", ar: "Updater للتحديثات المعتمدة؛ lazy init؛ متنسخش props ولا داتا سيرفر." }]
    },
    {
      id: "usereducer",
      title: { en: "useReducer", ar: "useReducer" },
      tldr: { en: "State + a pure function <code>(state, action) =&gt; newState</code>. Better than several useStates when values change together, when the next state depends on the previous in complex ways, or when you want the logic testable outside the component.", ar: "State و function pure <code>(state, action) =&gt; newState</code>. أحسن من useState كتير لما القيم بتتغير مع بعض، أو الـ state الجاي معتمد على اللي قبله بشكل معقد، أو عايز المنطق يتعمله test برا الـ component." },
      blocks: [
        { type: "code", code: "type State = { step: number; data: Draft; error?: string };\ntype Action = { type: \"next\" } | { type: \"back\" } | { type: \"field\"; name: keyof Draft; value: string } | { type: \"fail\"; error: string };\n\nfunction reducer(s: State, a: Action): State {\n  switch (a.type) {\n    case \"next\":  return { ...s, step: s.step + 1, error: undefined };\n    case \"back\":  return { ...s, step: Math.max(0, s.step - 1) };\n    case \"field\": return { ...s, data: { ...s.data, [a.name]: a.value } };\n    case \"fail\":  return { ...s, error: a.error };\n  }\n}\nconst [state, dispatch] = useReducer(reducer, initial);   // dispatch is stable" },
        { type: "compare", cols: ["", "useState", "useReducer"], rows: [
          [{ en: "Best for", ar: "أحسن لـ" }, { en: "Independent simple values", ar: "قيم بسيطة مستقلة" }, { en: "Related values, many transitions (wizards, editors)", ar: "قيم مرتبطة وتحولات كتير (wizards، editors)" }],
          [{ en: "Logic lives", ar: "المنطق فين" }, { en: "In handlers", ar: "في الـ handlers" }, { en: "In one pure, testable function", ar: "في function واحدة pure تتعمل test" }],
          [{ en: "Passing down", ar: "تعديتها لتحت" }, { en: "Many setters", ar: "setters كتير" }, { en: "One stable dispatch", ar: "dispatch واحد ثابت" }]
        ] }
      ],
      say: "When several pieces of state change together, a reducer keeps every transition in one pure, testable function, and dispatch is stable to pass down.",
      interview: [{ q: "useReducer vs Redux?", a: { en: "Same idea (reducer + actions) but local to a component tree. Redux adds a global store, middleware, devtools and selectors with subscriptions. Combine useReducer + context for medium cases.", ar: "نفس الفكرة (reducer و actions) بس محلي لشجرة component. و Redux بيزود store عام و middleware و devtools و selectors باشتراكات. و useReducer مع context ينفعوا للحالات المتوسطة." } }],
      quiz: [{ q: { en: "Can a reducer call an API?", ar: "الـ reducer ينفع ينادي API؟" }, a: { en: "No — it must be pure. Do side effects in handlers/effects and dispatch results.", ar: "لأ — لازم يبقى pure. اعمل الـ side effects في الـ handlers أو الـ effects وابعت النتيجة بـ dispatch." } }],
      quick: [{ en: "Related state + many transitions → reducer; pure; dispatch is stable.", ar: "State مرتبط وتحولات كتير ← reducer؛ pure؛ و dispatch ثابت." }]
    },
    {
      id: "useeffect",
      title: { en: "useEffect, useLayoutEffect, useInsertionEffect", ar: "useEffect و useLayoutEffect و useInsertionEffect" },
      tldr: { en: "<code>useEffect</code> runs after paint — for subscriptions and syncing with external systems. <code>useLayoutEffect</code> runs after DOM changes but before paint — for measuring and adjusting layout without a flicker. <code>useInsertionEffect</code> is for CSS-in-JS libraries to inject styles.", ar: "<code>useEffect</code> بيشتغل بعد الرسم — للاشتراكات والمزامنة مع الخارج. و <code>useLayoutEffect</code> بيشتغل بعد تغيير الـ DOM وقبل الرسم — للقياس وتعديل الـ layout من غير رعشة. و <code>useInsertionEffect</code> لمكتبات CSS-in-JS علشان تحط الـ styles." },
      blocks: [
        { type: "code", code: "useEffect(() => {\n  const onResize = () => setW(window.innerWidth);\n  window.addEventListener(\"resize\", onResize);\n  return () => window.removeEventListener(\"resize\", onResize);\n}, []);                                   // [] = on mount; [a,b] = when a or b change; none = every render\n\nuseLayoutEffect(() => {\n  const { height } = tooltipRef.current!.getBoundingClientRect();\n  setTop(anchorTop - height);             // positioned before the user sees it\n}, [anchorTop]);" },
        { type: "list", title: { en: "Dependency rules", ar: "قواعد الـ dependencies" }, items: [
          { en: "List every reactive value the effect reads (props, state, values derived from them). Trust the lint rule.", ar: "اكتب كل قيمة reactive الـ effect بيقراها (props، state، اللي متشتق منهم). صدّق الـ lint rule." },
          { en: "Objects/functions created in render change every time → move them inside the effect, or memoize.", ar: "الـ objects والـ functions اللي بتتعمل في الـ render بتتغير كل مرة ← دخّلها جوه الـ effect، أو اعمل memo." },
          { en: "Need the latest value without re-running? Read it from a ref (or React 19's <code>useEffectEvent</code>).", ar: "محتاج آخر قيمة من غير ما الـ effect يتعاد؟ اقراها من ref (أو <code>useEffectEvent</code> في React 19)." }
        ] },
        { type: "projects", items: [
          { text: { en: "okoRent: the SignalR connection opens in useEffect with the token in deps and stops in cleanup.", ar: "okoRent: اتصال SignalR بيتفتح في useEffect والتوكن في الـ deps وبيتقفل في الـ cleanup." }, p: "okorent", tab: "hooks", label: "okoRent" },
          { text: { en: "Smart FAQ: the row menu syncs the latest handlers into a ref in an effect with no deps.", ar: "Smart FAQ: منيو الصف بتحدث آخر handlers في ref جوه effect من غير deps." }, p: "smartfaq", tab: "how", label: "Smart FAQ" }
        ] }
      ],
      say: "useEffect is for syncing after paint; useLayoutEffect only when I must measure the DOM before the user sees it, because it blocks paint.",
      interview: [{ q: "useEffect vs useLayoutEffect?", a: { en: "Both run after React updates the DOM. useLayoutEffect runs synchronously before the browser paints (no flicker, but blocks paint); useEffect runs after paint (non-blocking). Default to useEffect.", ar: "الاتنين بيشتغلوا بعد ما React يحدّث الـ DOM. و useLayoutEffect بيشتغل sync قبل ما المتصفح يرسم (من غير رعشة، بس بيوقف الرسم)؛ و useEffect بعد الرسم (مش بيوقف). الافتراضي useEffect." },
        follow: [{ q: "Why does my effect run in an infinite loop?", a: { en: "It sets state that's in its own deps, or depends on an object/function recreated every render. Remove the dependency cause (derive instead, move inside, memoize).", ar: "بيعمل set لـ state موجود في الـ deps بتاعته، أو معتمد على object أو function بتتعمل من جديد كل render. شيل السبب (اشتق بدل كده، دخّلها جوه، اعمل memo)." } }] }],
      quiz: [{ q: { en: "Effect with <code>[]</code> reads a prop — what goes wrong?", ar: "Effect بـ <code>[]</code> بيقرا prop — إيه اللي بيبوظ؟" }, a: { en: "It keeps the first value forever (stale); add the prop to deps.", ar: "بيفضل ماسك أول قيمة للأبد (stale)؛ زود الـ prop في الـ deps." } }],
      quick: [{ en: "useEffect after paint; useLayoutEffect before paint (measure); honest deps; cleanup always.", ar: "useEffect بعد الرسم؛ useLayoutEffect قبل الرسم (قياس)؛ deps صادقة؛ cleanup دايمًا." }]
    },
    {
      id: "useref",
      title: { en: "useRef, forwardRef/ref prop, useImperativeHandle", ar: "useRef و forwardRef / ref كـ prop و useImperativeHandle" },
      tldr: { en: "<code>useRef</code> gives a mutable box (<code>.current</code>) that survives renders and doesn't trigger them — for DOM nodes, timer ids, previous values, latest callbacks. To give a parent a ref to your inner element: React 19 passes <code>ref</code> as a prop (older: <code>forwardRef</code>). <code>useImperativeHandle</code> exposes a small API instead of the raw node.", ar: "<code>useRef</code> بيديك صندوق بيتغير (<code>.current</code>) بيعيش بين الـ renders ومش بيعمل render — للـ DOM، و ids التايمرز، والقيمة اللي قبل، وآخر callback. ولو عايز الأب ياخد ref للعنصر اللي جوه: React 19 بيبعت <code>ref</code> كـ prop (القديم: <code>forwardRef</code>). و <code>useImperativeHandle</code> بيدي API صغير بدل العنصر نفسه." },
      blocks: [
        { type: "code", code: "const inputRef = useRef<HTMLInputElement>(null);\n<input ref={inputRef} />;  inputRef.current?.focus();\n\n// latest-ref pattern: read the newest handler without re-subscribing\nconst onTickRef = useRef(onTick);\nuseEffect(() => { onTickRef.current = onTick; });\nuseEffect(() => { const id = setInterval(() => onTickRef.current(), 1000); return () => clearInterval(id); }, []);\n\n// React 19: ref is a normal prop\nfunction TextField({ ref, ...props }) { return <input ref={ref} {...props} />; }\n\n// expose only focus()/clear()\nuseImperativeHandle(ref, () => ({ focus: () => inner.current?.focus(), clear: () => setValue(\"\") }), []);" },
        { type: "pitfalls", items: [{ en: "Reading or writing <code>ref.current</code> during render makes output depend on something React doesn't track. Do it in effects and handlers.", ar: "قراية أو كتابة <code>ref.current</code> في الـ render بتخلي الناتج معتمد على حاجة React مش متابعها. اعملها في الـ effects والـ handlers." }] },
        { type: "projects", items: [
          { text: { en: "Smart FAQ row menu: “latest ref” so memoized menus always call the current handler.", ar: "منيو الصف في Smart FAQ: «latest ref» علشان المنيو اللي عليها memo تنادي الـ handler الحالي دايمًا." }, p: "smartfaq", tab: "how", label: "Smart FAQ" },
          { text: { en: "AHS formula editor: a textarea ref to insert at the cursor and restore it.", ar: "الـ formula editor في AHS: ref للـ textarea علشان يحط مكان الـ cursor ويرجّعه." }, p: "ahs", tab: "how", label: "AHS" }
        ] }
      ],
      say: "Refs hold things that must survive renders without causing them — DOM nodes, timer ids and the latest callback — and I expose small imperative APIs with useImperativeHandle instead of raw nodes.",
      interview: [{ q: "Why doesn't changing ref.current re-render?", a: { en: "It's a plain mutable object React doesn't watch. That's the point — use state if the screen must change.", ar: "ده object عادي React مش متابعه. ودي الفكرة أصلًا — استخدم state لو الشاشة لازم تتغير." } }],
      quiz: [{ q: { en: "Store a setInterval id — state or ref?", ar: "تخزن id بتاع setInterval — state ولا ref؟" }, a: { en: "Ref.", ar: "Ref." } }],
      quick: [{ en: "Refs: DOM, timers, previous/latest values; no render; ref-as-prop in React 19; useImperativeHandle for small APIs.", ar: "الـ Refs: الـ DOM، التايمرز، القيمة اللي قبل أو الأخيرة؛ من غير render؛ ref كـ prop في React 19؛ useImperativeHandle لـ API صغير." }]
    },
    {
      id: "usememo-usecallback",
      title: { en: "useMemo, useCallback and React.memo", ar: "useMemo و useCallback و React.memo" },
      tldr: { en: "<code>useMemo</code> caches a computed value; <code>useCallback</code> caches a function; <code>React.memo</code> skips re-rendering a component when props are shallow-equal. They work together: memo on a child is useless if you pass it new objects/functions every render. Measure first — and the React Compiler can do this for you.", ar: "<code>useMemo</code> بيعمل cache لقيمة محسوبة؛ و <code>useCallback</code> لـ function؛ و <code>React.memo</code> بيعدي الـ re-render للـ component لو الـ props متساوية shallow. بيشتغلوا مع بعض: الـ memo على الابن ملوش لازمة لو بتبعتله objects أو functions جديدة كل render. قيس الأول — و React Compiler يقدر يعمل ده بداله." },
      blocks: [
        { type: "compare", cols: ["", { en: "Caches", ar: "بيخزن" }, { en: "Use when", ar: "استخدمه لما" }], rows: [
          ["useMemo", { en: "A value", ar: "قيمة" }, { en: "Expensive computation, or a stable object for deps/memo children", ar: "حساب تقيل، أو object ثابت للـ deps أو أولاد عليهم memo" }],
          ["useCallback", { en: "A function", ar: "function" }, { en: "Passed to a memo child or used in effect deps", ar: "بتتبعت لابن عليه memo أو في deps بتاعة effect" }],
          ["React.memo", { en: "A component's last render", ar: "آخر render للـ component" }, { en: "Re-renders often with the same props and is expensive", ar: "بيعمل re-render كتير بنفس الـ props وتقيل" }]
        ] },
        { type: "code", code: "const visible = useMemo(() => rows.filter(match(query)).sort(byDate), [rows, query]);\nconst onSelect = useCallback((id: string) => setSelected(id), []);\nconst Row = memo(RowView);                         // shallow-compares props\nconst Menu = memo(MenuView, (a, b) => sameShown(a, b)); // custom compare: only what's displayed" },
        { type: "when", use: [{ en: "A profiler shows a slow render, or a memo child re-renders because of unstable props.", ar: "الـ profiler بيوري render بطيء، أو ابن عليه memo بيعمل re-render بسبب props مش ثابتة." }], avoid: [{ en: "Wrapping everything “just in case” — memo has a cost (comparison, memory) and hides real fixes like moving state down.", ar: "تلف كل حاجة «احتياطي» — الـ memo ليه تكلفة (مقارنة، ميموري) وبيخبي حلول حقيقية زي إنك تنزّل الـ state." }] },
        { type: "projects", items: [{ text: { en: "Smart FAQ: memo with a custom comparison (only fields the menu shows) + latest-ref handlers cut a table re-render from ~20 ms to ~2 ms.", ar: "Smart FAQ: memo بمقارنة مخصوصة (الحاجات اللي المنيو بتعرضها بس) مع latest-ref للـ handlers نزّلوا re-render الجدول من حوالي 20ms لـ 2ms." }, p: "smartfaq", tab: "problems", label: "Smart FAQ" }] }
      ],
      say: "I memoize after measuring: React.memo on the expensive child, stable props with useMemo and useCallback, and sometimes a custom comparison — that's how I took a table re-render from 20 to 2 milliseconds.",
      interview: [{ q: "useMemo vs useCallback?", a: { en: "<code>useCallback(fn, deps)</code> is <code>useMemo(() =&gt; fn, deps)</code>. One caches the result of calling a function, the other caches the function itself.", ar: "<code>useCallback(fn, deps)</code> هو <code>useMemo(() =&gt; fn, deps)</code>. واحد بيخزن نتيجة نداء function، والتاني بيخزن الـ function نفسها." },
        follow: [{ q: "Does useMemo guarantee the value is kept?", a: { en: "No — it's a performance hint. React may drop the cache; code must still be correct without it.", ar: "لأ — دي مساعدة للأداء. React ممكن يمسح الكاش؛ والكود لازم يبقى صح من غيره." } },
                 { q: "How does the React Compiler change this?", a: { en: "It inserts memoization automatically at build time, so manual useMemo/useCallback/memo become rare — if components follow the rules.", ar: "بيحط الـ memo لوحده وقت الـ build، فالـ useMemo و useCallback و memo اليدوي بيبقوا نادرين — لو الـ components ماشية على القواعد." } }] }],
      quiz: [{ q: { en: "memo child, parent passes <code>onClick={() =&gt; …}</code> — does memo help?", ar: "ابن عليه memo، والأب بيبعت <code>onClick={() =&gt; …}</code> — الـ memo بيفيد؟" }, a: { en: "No — a new function each render. Wrap it in useCallback.", ar: "لأ — function جديدة كل render. لفها في useCallback." } }],
      quick: [{ en: "Measure first; memo child + stable props; useCallback = memoized fn; cache is a hint; Compiler automates.", ar: "قيس الأول؛ memo للابن و props ثابتة؛ useCallback = function متخزنة؛ الكاش مساعدة؛ والـ Compiler بيعملها لوحده." }]
    },
    {
      id: "usecontext",
      title: { en: "useContext (and its performance limit)", ar: "useContext (وحدود الأداء بتاعه)" },
      tldr: { en: "Context passes a value deep without prop drilling. Every consumer re-renders when the value changes (by reference) — so it's great for rarely-changing values (theme, locale, session, a dispatch) and poor for fast-changing global state.", ar: "الـ Context بيعدّي قيمة لتحت من غير prop drilling. وكل اللي بيقراه بيعمل re-render لما القيمة تتغير (بالـ reference) — فممتاز للقيم اللي نادرًا ما بتتغير (theme، locale، session، dispatch) ووحش للـ state العام اللي بيتغير بسرعة." },
      blocks: [
        { type: "code", code: "const ThemeContext = createContext<Theme>(\"light\");\n\nfunction App() {\n  const [theme, setTheme] = useState<Theme>(\"light\");\n  const value = useMemo(() => ({ theme, setTheme }), [theme]);  // stable unless theme changes\n  return <ThemeContext.Provider value={value}><Shell /></ThemeContext.Provider>;\n}\nconst { theme } = useContext(ThemeContext);   // React 19: use(ThemeContext) also works, even in conditions" },
        { type: "list", title: { en: "Keeping context fast", ar: "إزاي تخلي الـ context سريع" }, items: [
          { en: "Memoize the provider value (a new object every render re-renders all consumers).", ar: "اعمل memo لقيمة الـ provider (object جديد كل render بيعمل re-render لكل اللي بيقروه)." },
          { en: "Split state and dispatch into two contexts; split unrelated values.", ar: "قسّم الـ state والـ dispatch في contextين؛ وقسّم القيم اللي ملهاش علاقة ببعض." },
          { en: "For frequently changing shared state, use a store with selectors (Zustand, Redux, useSyncExternalStore).", ar: "للـ state المشترك اللي بيتغير كتير، استخدم store بـ selectors (Zustand، Redux، useSyncExternalStore)." }
        ] },
        { type: "projects", items: [
          { text: { en: "Smart FAQ: UnsavedChangesProvider memoizes <code>{ anyUnsaved, mark }</code> with a stable <code>mark</code> callback.", ar: "Smart FAQ: الـ UnsavedChangesProvider بيعمل memo لـ <code>{ anyUnsaved, mark }</code> و <code>mark</code> callback ثابت." }, p: "smartfaq", tab: "hooks", label: "Smart FAQ" },
          { text: { en: "okoRent: a small context passes the token to SignalR; Zustand for the rest.", ar: "okoRent: context صغير بيعدّي التوكن لـ SignalR؛ و Zustand للباقي." }, p: "okorent", tab: "decisions", label: "okoRent" }
        ] }
      ],
      say: "Context is dependency injection for slow-changing values; for fast-changing shared state I use a store with selectors so only the components that read a slice re-render.",
      interview: [{ q: "Is Context a state management tool?", a: { en: "It's a transport, not a store: it passes a value down. State still lives in useState/useReducer. Without selectors, every consumer re-renders on any change.", ar: "ده وسيلة نقل مش store: بيعدّي قيمة لتحت. والـ state لسه في useState أو useReducer. ومن غير selectors، كل اللي بيقرا بيعمل re-render مع أي تغيير." } }],
      quiz: [{ q: { en: "Provider value is <code>{{ user, logout }}</code> inline — problem?", ar: "قيمة الـ Provider <code>{{ user, logout }}</code> مكتوبة inline — المشكلة؟" }, a: { en: "New object every render → all consumers re-render. useMemo it.", ar: "Object جديد كل render ← كل اللي بيقروا بيعملوا re-render. اعمله useMemo." } }],
      quick: [{ en: "Context = DI for slow values; memo the value; split contexts; stores for fast state.", ar: "الـ Context = DI للقيم البطيئة؛ memo للقيمة؛ قسّم الـ contexts؛ stores للـ state السريع." }]
    },
    {
      id: "transition-deferred",
      title: { en: "useTransition and useDeferredValue", ar: "useTransition و useDeferredValue" },
      tldr: { en: "Both mark rendering work as non-urgent so input stays responsive. <code>useTransition</code> wraps the <b>update</b> you control (<code>startTransition(() =&gt; setTab(x))</code>) and gives <code>isPending</code>. <code>useDeferredValue</code> gives a lagging <b>copy of a value</b> you receive (a prop or a query string) for a slow child.", ar: "الاتنين بيعلّموا شغل الـ rendering إنه مش مستعجل علشان الـ input يفضل سريع. <code>useTransition</code> بيلف <b>التحديث</b> اللي انت متحكم فيه (<code>startTransition(() =&gt; setTab(x))</code>) ويديك <code>isPending</code>. و <code>useDeferredValue</code> بيديك <b>نسخة متأخرة من قيمة</b> جاتلك (prop أو نص بحث) لابن بطيء." },
      blocks: [
        { type: "code", code: "const [query, setQuery] = useState(\"\");\nconst deferred = useDeferredValue(query);            // input updates now, list catches up\nconst stale = query !== deferred;\n<input value={query} onChange={(e) => setQuery(e.target.value)} />\n<div style={{ opacity: stale ? 0.6 : 1 }}><BigList filter={deferred} /></div>   // BigList is memo'd\n\nconst [isPending, startTransition] = useTransition();\n<Tab onClick={() => startTransition(() => setTab(\"reports\"))} />" },
        { type: "compare", cols: ["", "useTransition", "useDeferredValue", "debounce"], rows: [
          [{ en: "You control", ar: "انت متحكم في" }, { en: "The setter call", ar: "نداء الـ setter" }, { en: "Only the value", ar: "القيمة بس" }, { en: "When the call happens", ar: "إمتى النداء يحصل" }],
          [{ en: "Waits a fixed time?", ar: "بيستنى وقت ثابت؟" }, { en: "No — as soon as possible", ar: "لأ — في أسرع وقت" }, { en: "No", ar: "لأ" }, { en: "Yes", ar: "أيوه" }],
          [{ en: "Reduces network calls?", ar: "بيقلل الـ requests؟" }, { en: "No", ar: "لأ" }, { en: "No", ar: "لأ" }, { en: "Yes — use for API search", ar: "أيوه — استخدمه لبحث الـ API" }]
        ] }
      ],
      say: "Transitions keep typing smooth when a render is heavy; for API search I still debounce, because transitions reduce render work, not requests.",
      interview: [{ q: "Does useDeferredValue replace debounce?", a: { en: "For expensive rendering, often yes — and it adapts to the device instead of a fixed delay. For network requests, no: you still debounce or cancel to avoid flooding the API.", ar: "للـ rendering التقيل، غالبًا أيوه — وكمان بيتكيف مع الجهاز بدل وقت ثابت. للـ requests، لأ: لسه محتاج debounce أو إلغاء علشان متغرقش الـ API." } }],
      quiz: [{ q: { en: "Which one gives isPending?", ar: "أنهي واحد بيدي isPending؟" }, a: { en: "useTransition.", ar: "useTransition." } }],
      quick: [{ en: "useTransition wraps the update (+isPending); useDeferredValue lags a value; debounce for network.", ar: "useTransition بيلف التحديث (+isPending)؛ useDeferredValue بيأخر قيمة؛ debounce للشبكة." }]
    },
    {
      id: "usesyncexternalstore-useid",
      title: { en: "useSyncExternalStore, useId, useDebugValue", ar: "useSyncExternalStore و useId و useDebugValue" },
      tldr: { en: "<code>useSyncExternalStore(subscribe, getSnapshot)</code> is the correct way to read a store that lives outside React (browser APIs, your own tiny store) — tear-free under concurrent rendering. <code>useId</code> makes stable unique ids for accessibility attributes (SSR-safe). <code>useDebugValue</code> labels custom hooks in DevTools.", ar: "<code>useSyncExternalStore(subscribe, getSnapshot)</code> هو الطريقة الصح لقراية store عايش برا React (APIs المتصفح، store صغير بتاعك) — من غير tearing مع الـ concurrent rendering. و <code>useId</code> بيعمل IDs فريدة وثابتة لـ attributes الـ accessibility (آمنة مع SSR). و <code>useDebugValue</code> بيكتب label للـ custom hooks في DevTools." },
      blocks: [
        { type: "code", code: "// a tiny store without a library\nlet expired = false; const listeners = new Set<() => void>();\nconst subscribe = (l: () => void) => { listeners.add(l); return () => listeners.delete(l); };\nexport const markExpired = () => { expired = true; listeners.forEach((l) => l()); };\nexport const useSessionExpired = () => useSyncExternalStore(subscribe, () => expired);\n\n// browser API\nconst online = useSyncExternalStore(\n  (cb) => { addEventListener(\"online\", cb); addEventListener(\"offline\", cb); return () => { removeEventListener(\"online\", cb); removeEventListener(\"offline\", cb); }; },\n  () => navigator.onLine, () => true);   // 3rd arg: server snapshot\n\nconst id = useId();\n<label htmlFor={id}>Email</label><input id={id} aria-describedby={`${id}-hint`} />" },
        { type: "projects", items: [{ text: { en: "Smart FAQ uses useSyncExternalStore 6 times — toast store, session-expired flag, media queries — instead of adding Zustand; useId 6 times for label wiring.", ar: "Smart FAQ استخدم useSyncExternalStore 6 مرات — store للـ toast، وعلامة انتهاء الـ session، و media queries — بدل ما يزود Zustand؛ و useId 6 مرات لربط الـ labels." }, p: "smartfaq", tab: "hooks", label: "Smart FAQ" }] }
      ],
      say: "For tiny shared stores and browser subscriptions I use useSyncExternalStore — a few lines, concurrent-safe, no extra dependency.",
      interview: [{ q: "Why not useEffect + useState to subscribe to a store?", a: { en: "Under concurrent rendering, different components could read different versions of the store in one render (tearing), and you get an extra render after mount. useSyncExternalStore reads synchronously and consistently.", ar: "مع الـ concurrent rendering، components مختلفة ممكن تقرا نسخ مختلفة من الـ store في نفس الـ render (tearing)، وكمان render زيادة بعد الـ mount. و useSyncExternalStore بيقرا sync وبشكل متسق." } }],
      quiz: [{ q: { en: "Why not Math.random() for an input id?", ar: "ليه مش Math.random() لـ id بتاع input؟" }, a: { en: "Changes every render and differs between server and client (hydration mismatch). useId is stable.", ar: "بيتغير كل render ومختلف بين السيرفر والـ client (hydration mismatch). و useId ثابت." } }],
      quick: [{ en: "useSyncExternalStore for external/tiny stores; useId for a11y ids; useDebugValue for DevTools labels.", ar: "useSyncExternalStore للـ stores الخارجية أو الصغيرة؛ useId لـ ids الـ a11y؛ useDebugValue لـ labels الـ DevTools." }]
    },
    {
      id: "react19-hooks",
      title: { en: "React 19: use, useOptimistic, useActionState, useFormStatus", ar: "React 19: use و useOptimistic و useActionState و useFormStatus" },
      tldr: { en: "<code>use(promise|context)</code> reads a promise (suspends until ready) or a context — even conditionally. <code>useActionState</code> wires an async action to state + pending. <code>useFormStatus</code> lets a submit button know its form is pending. <code>useOptimistic</code> shows the expected result instantly and rolls back if the action fails.", ar: "<code>use(promise|context)</code> بيقرا promise (بيعمل suspend لحد ما يجهز) أو context — حتى جوه شرط. و <code>useActionState</code> بيربط action async بـ state و pending. و <code>useFormStatus</code> بيخلي زرار الـ submit يعرف إن الفورم بتاعه pending. و <code>useOptimistic</code> بيعرض النتيجة المتوقعة على طول ويرجع لو الـ action فشل." },
      blocks: [
        { type: "code", code: "function Likes({ count, like }) {\n  const [optimistic, addOptimistic] = useOptimistic(count, (c, n: number) => c + n);\n  async function onLike() { addOptimistic(1); await like(); }   // UI shows +1 now; reverts if like() throws\n  return <form action={onLike}><button>♥ {optimistic}</button></form>;\n}\n\nfunction SubmitButton() { const { pending } = useFormStatus(); return <button disabled={pending}>Save</button>; }\n\nconst [error, submit, isPending] = useActionState(async (_prev, formData: FormData) => {\n  const res = await save(Object.fromEntries(formData));\n  return res.ok ? null : res.error;\n}, null);" },
        { type: "compare", cols: [{ en: "Optimistic updates with…", ar: "Optimistic updates بـ…" }, { en: "How", ar: "إزاي" }], rows: [
          ["useOptimistic", { en: "Temporary value during an Action; React reverts automatically", ar: "قيمة مؤقتة وقت الـ Action؛ و React بيرجّع لوحده" }],
          ["TanStack Query", { en: "onMutate: cancel + snapshot + setQueryData; onError: rollback; onSettled: invalidate", ar: "onMutate: إلغاء + snapshot + setQueryData؛ onError: رجوع؛ onSettled: invalidate" }]
        ] }
      ],
      say: "With React 19 Actions, useActionState and useFormStatus handle pending and errors, and useOptimistic gives instant feedback that rolls back on failure.",
      interview: [{ q: "What makes use() different from other hooks?", a: { en: "It can be called conditionally and in loops, and it reads promises by suspending. It still must be called during render of a component or hook.", ar: "ينفع يتنادى جوه شرط أو loop، وبيقرا الـ promises بإنه يعمل suspend. ولسه لازم يتنادى وقت الـ render في component أو hook." } }],
      quiz: [{ q: { en: "Which hook tells a nested button its form is submitting?", ar: "أنهي hook بيقول لزرار جوه الفورم إن الفورم بيتبعت؟" }, a: { en: "useFormStatus.", ar: "useFormStatus." } }],
      quick: [{ en: "use() reads promises/context; useActionState = action + state + pending; useFormStatus; useOptimistic with auto-rollback.", ar: "use() بيقرا promises و context؛ useActionState = action و state و pending؛ useFormStatus؛ useOptimistic بيرجع لوحده." }]
    },
    {
      id: "custom-hooks",
      title: { en: "Custom hooks", ar: "الـ Custom hooks" },
      tldr: { en: "A custom hook is a function starting with <code>use</code> that calls other hooks — it shares <b>logic</b>, not state (each call has its own). Good custom hooks hide a concern behind a small API: <code>useUrlFilters</code>, <code>useDebouncedValue</code>, <code>useOrder(id)</code>.", ar: "الـ custom hook عبارة عن function بتبدأ بـ <code>use</code> وبتنادي hooks تانية — بيشارك <b>المنطق</b> مش الـ state (كل نداء ليه state خاص). والـ custom hook الكويس بيخبي حاجة ورا API صغير: <code>useUrlFilters</code>، <code>useDebouncedValue</code>، <code>useOrder(id)</code>." },
      blocks: [
        { type: "code", code: "export function useDebouncedValue<T>(value: T, delay = 300) {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const id = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(id);\n  }, [value, delay]);\n  return debounced;\n}\n\n// domain hook: components never see URLs or keys\nexport const useOrder = (id?: string) =>\n  useQuery({ queryKey: orderKeys.detail(id!), queryFn: () => ordersService.get(id!), enabled: !!id });" },
        { type: "projects", items: [
          { text: { en: "Smart FAQ: useUrlFilters, useDebouncedValue (with tests), useSlashShortcut, useStoredFlag, useRetryAfter, useUnsavedChanges.", ar: "Smart FAQ: useUrlFilters، و useDebouncedValue (ومعاه tests)، و useSlashShortcut، و useStoredFlag، و useRetryAfter، و useUnsavedChanges." }, p: "smartfaq", tab: "hooks", label: "Smart FAQ" },
          { text: { en: "AHS: 25 domain query modules exposing hooks like useGetOrderDetails; the formula builder had its own hook.", ar: "AHS: 25 domain module بيطلعوا hooks زي useGetOrderDetails؛ والـ formula builder كان ليه hook خاص." }, p: "ahs", tab: "hooks", label: "AHS" }
        ] }
      ],
      say: "I extract custom hooks to give one concern a small API — URL filters, debouncing, a domain query — and test them on their own.",
      interview: [{ q: "Do two components using the same custom hook share state?", a: { en: "No. Each call runs its own hooks. To share state, lift it up, use context, or an external store the hook subscribes to.", ar: "لأ. كل نداء بيشغل hooks خاصة بيه. علشان تشارك state، ارفعه لفوق، أو استخدم context، أو store خارجي الـ hook بيشترك فيه." },
        follow: [{ q: "How do you test a custom hook?", a: { en: "<code>renderHook</code> from Testing Library, with providers in the wrapper (QueryClient, Router) and fake timers for debounce.", ar: "<code>renderHook</code> من Testing Library، والـ providers في الـ wrapper (QueryClient، Router)، و fake timers للـ debounce." } }] }],
      quiz: [{ q: { en: "Must a custom hook's name start with “use”?", ar: "اسم الـ custom hook لازم يبدأ بـ «use»؟" }, a: { en: "Yes — that's how lint rules and React know the hook rules apply.", ar: "أيوه — كده الـ lint rules و React بيعرفوا إن قواعد الـ hooks مطبقة عليه." } }],
      quick: [{ en: "Custom hooks share logic not state; small API; test with renderHook.", ar: "الـ Custom hooks بتشارك منطق مش state؛ API صغير؛ test بـ renderHook." }]
    },
    {
      id: "tanstack-hooks",
      title: { en: "TanStack Query hooks", ar: "Hooks بتاعة TanStack Query" },
      tldr: { en: "<code>useQuery</code> reads (cached by key), <code>useMutation</code> writes, <code>useQueryClient</code> gives the cache (invalidate, setQueryData, prefetch), <code>useInfiniteQuery</code> pages, <code>useSuspenseQuery</code> suspends instead of returning loading. Keys describe the data; invalidation keeps it fresh after writes.", ar: "<code>useQuery</code> للقراية (متخزنة بالـ key)، و <code>useMutation</code> للكتابة، و <code>useQueryClient</code> بيديك الكاش (invalidate، setQueryData، prefetch)، و <code>useInfiniteQuery</code> للصفحات، و <code>useSuspenseQuery</code> بيعمل suspend بدل ما يرجع loading. والـ keys بتوصف الداتا؛ والـ invalidation بتخليها جديدة بعد الكتابة." },
      blocks: [
        { type: "code", code: "const { data, isPending, error } = useQuery({\n  queryKey: [\"orders\", { status, page }],\n  queryFn: ({ signal }) => api.orders.list({ status, page }, { signal }),  // signal → auto-cancel\n  placeholderData: keepPreviousData,                                      // no flash between pages\n  staleTime: 30_000,\n});\n\nconst qc = useQueryClient();\nconst update = useMutation({\n  mutationFn: api.orders.update,\n  onMutate: async (next) => {                     // optimistic\n    await qc.cancelQueries({ queryKey: [\"orders\", next.id] });\n    const prev = qc.getQueryData([\"orders\", next.id]);\n    qc.setQueryData([\"orders\", next.id], next);\n    return { prev };\n  },\n  onError: (_e, next, ctx) => qc.setQueryData([\"orders\", next.id], ctx?.prev),\n  onSettled: () => qc.invalidateQueries({ queryKey: [\"orders\"] }),\n});\n\nconst feed = useInfiniteQuery({\n  queryKey: [\"feed\"], queryFn: ({ pageParam }) => api.feed(pageParam),\n  initialPageParam: null, getNextPageParam: (last) => last.nextCursor,\n});" },
        { type: "compare", cols: [{ en: "Option", ar: "الخيار" }, { en: "Meaning", ar: "المعنى" }], rows: [
          ["staleTime", { en: "How long data counts as fresh (no refetch). Default 0.", ar: "الداتا تفضل جديدة قد إيه (من غير refetch). الافتراضي 0." }],
          ["gcTime", { en: "How long unused data stays in memory (was cacheTime). Default 5 min.", ar: "الداتا اللي محدش بيستخدمها تفضل في الميموري قد إيه (كانت cacheTime). الافتراضي 5 دقايق." }],
          ["enabled", { en: "Wait until you have what you need (an id)", ar: "استنى لحد ما يبقى معاك اللي محتاجه (id)" }],
          ["select", { en: "Transform/subscribe to part of the data", ar: "تحوّل أو تشترك في جزء من الداتا" }],
          ["retry / retryDelay", { en: "Which failures to retry and how long to wait", ar: "أنهي أخطاء تعيدها وتستنى قد إيه" }]
        ] },
        { type: "projects", items: [
          { text: { en: "Smart FAQ: 37 useQuery, 32 useMutation, 40 invalidateQueries, 18 setQueryData; retries only network/5xx/429.", ar: "Smart FAQ: 37 useQuery و 32 useMutation و 40 invalidateQueries و 18 setQueryData؛ والـ retry للشبكة و 5xx و 429 بس." }, p: "smartfaq", tab: "hooks", label: "Smart FAQ" },
          { text: { en: "AHS: 49 useQuery / 169 useMutation in the migration — some reads wrapped as mutations, a lesson to discuss.", ar: "AHS: 49 useQuery و 169 useMutation في الـ migration — وشوية قراية اتعملت mutations، ودي درس تتكلم عنه." }, p: "ahs", tab: "hooks", label: "AHS" },
          { text: { en: "okoRent: 31 query modules, useInfiniteQuery for chat history.", ar: "okoRent: 31 query module، و useInfiniteQuery لتاريخ الشات." }, p: "okorent", tab: "hooks", label: "okoRent" }
        ] }
      ],
      say: "Queries are keyed by what they describe, mutations invalidate the scopes they change, and I add optimistic updates with snapshot and rollback where instant feedback matters.",
      interview: [
        { q: "staleTime vs gcTime?", a: { en: "staleTime: while fresh, no background refetch. gcTime: how long data with no observers stays cached before garbage collection. Data can be stale but still cached and shown instantly.", ar: "staleTime: طول ما الداتا جديدة مفيش refetch في الخلفية. gcTime: الداتا اللي محدش بيتابعها تفضل في الكاش قد إيه قبل ما تتمسح. والداتا ممكن تبقى stale بس لسه في الكاش وتظهر على طول." } },
        { q: "isPending vs isFetching?", a: { en: "isPending = no data yet (first load). isFetching = a request is in flight, including background refetches while old data is shown.", ar: "isPending = لسه مفيش داتا (أول تحميل). isFetching = فيه request شغال، حتى الـ refetch في الخلفية والداتا القديمة ظاهرة." } }
      ],
      quiz: [{ q: { en: "Search-as-you-type: how does React Query avoid stale responses?", ar: "بحث وانت بتكتب: React Query بيتجنب الردود القديمة إزاي؟" }, a: { en: "Each query string is its own key; passing <code>signal</code> cancels the outdated request.", ar: "كل نص بحث ليه key خاص؛ وتعدية الـ <code>signal</code> بتلغي الـ request القديم." } }],
      quick: [{ en: "Key = what; staleTime = fresh window; gcTime = memory; invalidate after writes; optimistic = cancel → snapshot → set → rollback → invalidate.", ar: "الـ Key = إيه؛ staleTime = مدة الجديد؛ gcTime = الميموري؛ invalidate بعد الكتابة؛ optimistic = إلغاء ← snapshot ← set ← رجوع ← invalidate." }]
    },
    {
      id: "rhf-hooks",
      title: { en: "react-hook-form hooks", ar: "Hooks بتاعة react-hook-form" },
      tldr: { en: "<code>useForm</code> owns the form with uncontrolled inputs (fast), <code>useWatch</code> subscribes to specific fields, <code>useFieldArray</code> manages dynamic lists, <code>useController</code>/<code>Controller</code> wraps controlled UI components, <code>useFormContext</code> reads the form in deep children.", ar: "<code>useForm</code> ماسك الفورم بـ inputs uncontrolled (سريع)، و <code>useWatch</code> بيشترك في fields معينة، و <code>useFieldArray</code> للقوايم اللي بتتغير، و <code>useController</code> أو <code>Controller</code> بيلف components controlled، و <code>useFormContext</code> بيقرا الفورم في الأولاد اللي تحت." },
      blocks: [
        { type: "code", code: "const form = useForm<Invoice>({ resolver: zodResolver(InvoiceSchema), defaultValues: { lines: [{ item: \"\", qty: 1, price: 0 }] } });\nconst { fields, append, remove } = useFieldArray({ control: form.control, name: \"lines\" });\nconst lines = useWatch({ control: form.control, name: \"lines\" });          // live total without re-rendering the whole form\nconst total = lines.reduce((s, l) => s + l.qty * l.price, 0);\n\n<Controller control={form.control} name=\"dueDate\" render={({ field }) => <DatePicker {...field} />} />\n\n// server 422 → field errors\ncatch (e) { for (const [name, codes] of Object.entries(e.fieldErrors)) form.setError(name, { message: t(codes[0]) }); }" },
        { type: "projects", items: [
          { text: { en: "Smart FAQ: useForm + zodResolver (16/30), useWatch for the password-strength hint, 422 errors mapped back with setError.", ar: "Smart FAQ: useForm مع zodResolver (16/30)، و useWatch لمؤشر قوة الباسورد، وأخطاء 422 بترجع بـ setError." }, p: "smartfaq", tab: "hooks", label: "Smart FAQ" },
          { text: { en: "Bites invoices and AHS formulas: react-hook-form for complex money forms.", ar: "فواتير Bites ومعادلات AHS: react-hook-form للفورمز المعقدة اللي فيها فلوس." }, p: "bites", tab: "decisions", label: "Bites" }
        ] }
      ],
      say: "react-hook-form keeps inputs uncontrolled so typing doesn't re-render the form; useWatch subscribes only to what drives live UI, and field arrays handle invoice lines.",
      interview: [{ q: "watch vs useWatch?", a: { en: "<code>watch()</code> in the form component re-renders the whole form on changes; <code>useWatch</code> isolates the subscription to the component that calls it.", ar: "<code>watch()</code> في component الفورم بيعمل re-render للفورم كله مع التغيير؛ و <code>useWatch</code> بيحصر الاشتراك في الـ component اللي بيناديه." } }],
      quiz: [{ q: { en: "Dynamic invoice lines — which hook?", ar: "سطور فاتورة بتزيد وتقل — أنهي hook؟" }, a: { en: "useFieldArray (use field.id as the key).", ar: "useFieldArray (واستخدم field.id كـ key)." } }],
      quick: [{ en: "useForm (uncontrolled) · useWatch (isolated) · useFieldArray (field.id key) · Controller for controlled UI · setError for 422.", ar: "useForm (uncontrolled) · useWatch (معزول) · useFieldArray (field.id كـ key) · Controller للـ controlled · setError للـ 422." }]
    },
    {
      id: "router-hooks",
      title: { en: "Router hooks (React Router and Next.js)", ar: "Hooks الـ Router (React Router و Next.js)" },
      tldr: { en: "React Router: <code>useNavigate</code>, <code>useParams</code>, <code>useSearchParams</code>, <code>useLocation</code>, <code>useBlocker</code>, <code>useLoaderData</code>. Next.js App Router (client components): <code>useRouter</code>, <code>usePathname</code>, <code>useSearchParams</code>, <code>useParams</code>; in server components read <code>params</code>/<code>searchParams</code> props instead.", ar: "React Router: <code>useNavigate</code> و <code>useParams</code> و <code>useSearchParams</code> و <code>useLocation</code> و <code>useBlocker</code> و <code>useLoaderData</code>. و Next.js App Router (client components): <code>useRouter</code> و <code>usePathname</code> و <code>useSearchParams</code> و <code>useParams</code>؛ وفي الـ server components اقرا <code>params</code> و <code>searchParams</code> من الـ props." },
      blocks: [
        { type: "compare", cols: [{ en: "Need", ar: "محتاج" }, "React Router", "Next.js (client)"], rows: [
          [{ en: "Go somewhere", ar: "تروح مكان" }, "useNavigate()(to)", "useRouter().push(to)"],
          [{ en: "Route params", ar: "params الـ route" }, "useParams()", "useParams()"],
          [{ en: "Query string", ar: "الـ query string" }, "useSearchParams() [get, set]", { en: "useSearchParams() (read-only) + router.replace", ar: "useSearchParams() (قراية بس) + router.replace" }],
          [{ en: "Current path", ar: "المسار الحالي" }, "useLocation().pathname", "usePathname()"],
          [{ en: "Block leaving", ar: "تمنع الخروج" }, "useBlocker", { en: "no built-in — beforeunload + custom", ar: "مفيش جاهز — beforeunload + حاجة مخصوصة" }]
        ] },
        { type: "projects", items: [
          { text: { en: "Smart FAQ (React Router 8): useNavigate ×30, useSearchParams inside useUrlFilters, one useBlocker for all dirty forms.", ar: "Smart FAQ (React Router 8): useNavigate ×30، و useSearchParams جوه useUrlFilters، و useBlocker واحد لكل الفورمز المتعدلة." }, p: "smartfaq", tab: "hooks", label: "Smart FAQ" },
          { text: { en: "okoRent and Bites (Next.js 14): App Router hooks with nuqs for typed URL state (okoRent).", ar: "okoRent و Bites (Next.js 14): hooks الـ App Router، و nuqs لـ URL state بـ types (okoRent)." }, p: "okorent", tab: "decisions", label: "okoRent" }
        ] }
      ],
      say: "I keep navigation in link builders and URL state in one hook, so screens never assemble paths or query strings by hand.",
      interview: [{ q: "Why does useSearchParams in Next.js need a Suspense boundary?", a: { en: "On statically rendered pages, search params are only known in the browser; reading them forces client rendering up to the nearest Suspense boundary, so you wrap that part in Suspense.", ar: "في الصفحات اللي بتترندر static، الـ search params بتتعرف في المتصفح بس؛ وقرايتها بتجبر client rendering لحد أقرب Suspense boundary، فبتلف الجزء ده في Suspense." } }],
      quiz: [{ q: { en: "Can a Next.js server component call useRouter?", ar: "الـ server component في Next.js ينفع ينادي useRouter؟" }, a: { en: "No — hooks are client-only; use redirect() or the params/searchParams props.", ar: "لأ — الـ hooks للـ client بس؛ استخدم redirect() أو props الـ params و searchParams." } }],
      quick: [{ en: "RR: useNavigate/useParams/useSearchParams/useBlocker; Next client: useRouter/usePathname/useSearchParams; server: props.", ar: "RR: useNavigate و useParams و useSearchParams و useBlocker؛ Next client: useRouter و usePathname و useSearchParams؛ السيرفر: props." }]
    },
    {
      id: "rn-hooks",
      title: { en: "React Native hooks", ar: "Hooks بتاعة React Native" },
      tldr: { en: "<code>useWindowDimensions</code> (responsive layout), <code>useColorScheme</code> (dark mode), React Navigation's <code>useFocusEffect</code>/<code>useIsFocused</code> (run work only when the screen is visible), <code>useSafeAreaInsets</code> (notches), plus <code>AppState</code> listeners for background/foreground.", ar: "<code>useWindowDimensions</code> (layout responsive)، و <code>useColorScheme</code> (dark mode)، و <code>useFocusEffect</code> و <code>useIsFocused</code> من React Navigation (تشغل الشغل لما الشاشة ظاهرة بس)، و <code>useSafeAreaInsets</code> (النوتش)، و listeners على <code>AppState</code> للخلفية والرجوع." },
      blocks: [
        { type: "code", code: "useFocusEffect(useCallback(() => {\n  const sub = startLocationUpdates();     // only while this screen is focused\n  return () => sub.remove();\n}, []));\n\nuseEffect(() => {\n  const s = AppState.addEventListener(\"change\", (state) => { if (state === \"active\") refetch(); });\n  return () => s.remove();\n}, []);\n\nconst { width } = useWindowDimensions();\nconst insets = useSafeAreaInsets();" },
        { type: "projects", items: [
          { text: { en: "ONE14 and Trackoo: background GPS and audio, lock-screen controls, app state transitions.", ar: "ONE14 و Trackoo: GPS وصوت في الخلفية، و lock-screen controls، والتنقل بين حالات التطبيق." }, p: "one14", tab: "hooks", label: "ONE14" },
          { text: { en: "Kalima: persisted query cache and an offline queue replayed when the app is active again.", ar: "Kalima: كاش queries متخزن وطابور offline بيتعاد لما التطبيق يرجع active." }, p: "kalima", tab: "hooks", label: "Kalima" }
        ] }
      ],
      say: "On mobile I tie work to screen focus and app state — subscriptions start on focus and stop on blur, and data refreshes when the app comes back to the foreground.",
      interview: [{ q: "useEffect vs useFocusEffect in React Navigation?", a: { en: "Screens in a stack stay mounted when you navigate away, so useEffect keeps running. useFocusEffect runs when the screen gains focus and cleans up when it loses it.", ar: "الشاشات في الـ stack بتفضل mounted لما تروح لشاشة تانية، فالـ useEffect بيفضل شغال. و useFocusEffect بيشتغل لما الشاشة تاخد focus وبيعمل cleanup لما تفقده." } }],
      quiz: [{ q: { en: "Refetch when the user returns to the app?", ar: "تعمل refetch لما المستخدم يرجع للتطبيق؟" }, a: { en: "AppState \"active\" listener (React Query has focusManager for this).", ar: "Listener على AppState \"active\" (و React Query فيه focusManager للحكاية دي)." } }],
      quick: [{ en: "useFocusEffect (not useEffect) for screen work; AppState for foreground; safe-area insets; useWindowDimensions.", ar: "useFocusEffect (مش useEffect) لشغل الشاشة؛ AppState للرجوع؛ safe-area insets؛ useWindowDimensions." }]
    }
  ]
});
