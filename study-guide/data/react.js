// React fundamentals — written 2026-10-29. Every hook has its own page in data/hooks.js.
STUDY.fill("react", {
  intro: { en: "How React really works: elements and components, rendering and reconciliation, keys, state snapshots and batching, effects as synchronisation, Strict Mode, and the concurrent features of React 18–19.", ar: "React شغال إزاي فعلًا. الـ elements والـ components، والـ rendering والـ reconciliation، والـ keys. وكمان الـ state كـ snapshot والـ batching، والـ effects كمزامنة، والـ Strict Mode، والـ concurrent features في React 18 و 19." },
  topics: [
    {
      id: "mental-model",
      title: { en: "The mental model: UI = f(state)", ar: "الفكرة الأساسية: UI = f(state)" },
      tldr: { en: "A component is a function that returns a description of the UI (elements) for the current props and state. React calls it (render), compares the result with the previous one (reconciliation) and applies only the differences to the DOM (commit).", ar: "الـ component عبارة عن function بترجع وصف للواجهة (elements) حسب الـ props والـ state الحالية. React بينادِيها (render)، ويقارن النتيجة باللي قبلها (reconciliation)، ويطبق الفرق بس على الـ DOM (commit)." },
      blocks: [
        { type: "list", title: { en: "Three phases", ar: "تلات مراحل" }, items: [
          { en: "<b>Trigger</b> — initial mount, or a state update (setState, a context value, a parent re-render).", ar: "<b>Trigger</b> — أول mount، أو تحديث state (setState، قيمة context، re-render للأب)." },
          { en: "<b>Render</b> — React calls your components. Must be pure: same inputs → same JSX, no side effects.", ar: "<b>Render</b> — React بينادي الـ components بتاعتك. لازم تبقى pure: نفس المدخلات ← نفس الـ JSX، من غير side effects." },
          { en: "<b>Commit</b> — React updates the DOM, then runs layout effects, the browser paints, then passive effects run.", ar: "<b>Commit</b> — React بيحدّث الـ DOM، وبعدين layout effects، والمتصفح يرسم، وبعدين الـ effects العادية." }
        ] },
        { type: "code", code: "// JSX is just function calls that create plain objects\nconst el = <Button tone=\"danger\">Delete</Button>;\n// ≈ jsx(Button, { tone: \"danger\", children: \"Delete\" }) → { type: Button, props: {…}, key: null }" },
        { type: "pitfalls", items: [
          { en: "Rendering ≠ updating the DOM. A re-render that returns the same JSX changes nothing in the DOM — it only costs CPU.", ar: "الـ Render مش معناه تحديث الـ DOM. re-render بيرجع نفس الـ JSX مش بيغير حاجة في الـ DOM — بس بيكلف CPU." },
          { en: "Side effects in render (fetch, subscriptions, mutating outside variables) break purity and double-run in Strict Mode.", ar: "الـ side effects جوه الـ render (fetch، subscriptions، تعديل متغيرات برا) بتكسر الـ purity وبتشتغل مرتين في Strict Mode." }
        ] }
      ],
      say: "A render is React calling my function to get a description; the commit is when it touches the DOM — so a re-render is cheap unless the component itself is expensive.",
      interview: [
        { q: "What triggers a re-render?", a: { en: "Its own state changing, its parent re-rendering (props or not), or a context it reads changing. Props changing is not a trigger by itself — the parent re-rendering is.", ar: "إن الـ state بتاعه يتغير، أو الأب يعمل re-render (سواء الـ props اتغيرت أو لأ)، أو context بيقراه يتغير. تغيير الـ props لوحده مش trigger — الـ re-render بتاع الأب هو الـ trigger." },
          follow: [{ q: "So does a child re-render when the parent does, even with the same props?", a: { en: "Yes by default. <code>React.memo</code> skips it when props are shallow-equal (and the React Compiler can do this automatically).", ar: "أيوه افتراضيًا. و <code>React.memo</code> بيعديه لو الـ props متساوية shallow (و React Compiler ممكن يعمل ده لوحده)." } }] },
        { q: "What is the virtual DOM?", a: { en: "The tree of plain element objects your components return. React diffs the new tree against the previous one and applies minimal DOM operations. The win is a simple programming model, not raw speed.", ar: "شجرة الـ objects اللي الـ components بترجعها. React بيقارن الشجرة الجديدة بالقديمة ويطبق أقل عمليات DOM. المكسب إن طريقة البرمجة بسيطة، مش السرعة في حد ذاتها." } }
      ],
      quiz: [{ q: { en: "Is calling fetch directly in a component body OK?", ar: "ينفع تنادي fetch في جسم الـ component على طول؟" }, a: { en: "No — render must be pure. Use React Query (or an effect / a server component).", ar: "لأ — الـ render لازم يبقى pure. استخدم React Query (أو effect / server component)." } }],
      quick: [{ en: "Trigger → render (pure) → commit (DOM) → effects. Parent re-render re-renders children by default.", ar: "Trigger ← render (pure) ← commit (DOM) ← effects. الـ re-render بتاع الأب بيعمل re-render للأولاد افتراضيًا." }]
    },
    {
      id: "reconciliation",
      title: { en: "Reconciliation and keys", ar: "الـ Reconciliation والـ Keys" },
      tldr: { en: "React compares trees by position and type: same type at the same place → update it and keep its state; different type → unmount and mount fresh. In lists, <code>key</code> is the identity — stable ids keep the right state with the right item.", ar: "React بيقارن الشجر بالمكان والنوع. لو نفس النوع في نفس المكان، بيحدّثه ويحافظ على الـ state. ولو النوع مختلف، بيعمل unmount و mount من جديد. وفي القوايم، الـ <code>key</code> هو الهوية. والـ IDs الثابتة بتخلي الـ state الصح يفضل مع العنصر الصح." },
      blocks: [
        { type: "code", code: "{items.map((item, i) => <Row key={i} item={item} />)}      // ✗ index: state moves when items reorder/insert\n{items.map((item) => <Row key={item.id} item={item} />)}   // ✓ stable id\n\n// reset a component's state on purpose: change its key\n<ProfileForm key={userId} user={user} />                   // new user → fresh form state" },
        { type: "when", title: { en: "Is the index OK as a key?", ar: "الـ index ينفع كـ key؟" }, use: [{ en: "Static lists that never reorder, insert or delete, and rows have no state.", ar: "قوايم ثابتة مش بتترتب ولا يتضاف فيها ولا يتمسح، والصفوف ملهاش state." }], avoid: [{ en: "Sortable/filterable lists, lists with inputs, checkboxes, animations.", ar: "قوايم بتترتب أو تتفلتر، أو فيها inputs أو checkboxes أو أنيميشن." }] },
        { type: "pitfalls", items: [
          { en: "Defining a component inside another component creates a new type every render → its subtree remounts and loses state.", ar: "لو عرّفت component جوه component تاني بيبقى type جديد كل render ← اللي تحته بيعمل remount ويخسر الـ state." },
          { en: "<code>key={Math.random()}</code> remounts every render.", ar: "<code>key={Math.random()}</code> بيعمل remount كل render." }
        ] },
        { type: "projects", items: [{ text: { en: "Smart FAQ's taxonomy tree (dnd-kit sortable) keys rows by node id so drag and drop keeps the right state; Trackoo: a missing key in a FlatList was one of his fixes.", ar: "في Smart FAQ، شجرة الـ taxonomy (dnd-kit sortable) بتستخدم الـ id بتاع الـ node كـ key، علشان الـ drag and drop يحافظ على الـ state الصح. وفي Trackoo، كان من الحاجات اللي صلحها key ناقص في FlatList." }, p: "smartfaq", tab: "overview", label: "Smart FAQ" }] }
      ],
      say: "Keys are identity, not just a warning fix — stable ids keep each row's state attached to the right item, and changing a key is the clean way to reset a component.",
      interview: [{ q: "Why is the index a bad key for a sortable list?", a: { en: "After sorting, index 0 points to a different item but React keeps the old row's state (input text, checkbox) at index 0 — state ends up on the wrong item.", ar: "بعد الترتيب، index 0 بيشاور على عنصر مختلف بس React بيحافظ على state الصف القديم (نص الـ input، الـ checkbox) في index 0 — فالـ state بيروح للعنصر الغلط." },
        follow: [{ q: "How do you reset a form when the selected user changes?", a: { en: "Give the form <code>key={userId}</code>, so React mounts a fresh instance — simpler and safer than syncing state in an effect.", ar: "اديله <code>key={userId}</code>، فـ React يعمل instance جديد — أبسط وأأمن من مزامنة الـ state في effect." } }] }],
      quiz: [{ q: { en: "Same position, &lt;div&gt; becomes &lt;section&gt; — what happens to children's state?", ar: "نفس المكان، &lt;div&gt; بقى &lt;section&gt; — الـ state بتاع الأولاد إيه؟" }, a: { en: "Lost — a different type remounts the subtree.", ar: "بيضيع — النوع المختلف بيعمل remount للي تحته." } }],
      quick: [{ en: "Same type + same place = keep state; key = identity; change key to reset; never define components inside components.", ar: "نفس النوع في نفس المكان يعني الـ state بيفضل. والـ key هو الهوية. غيّر الـ key علشان تعمل reset. ومتعرّفش component جوه component." }]
    },
    {
      id: "state-snapshots",
      title: { en: "State as a snapshot and batching", ar: "الـ State كـ snapshot والـ Batching" },
      tldr: { en: "Each render sees a fixed snapshot of state. <code>setX</code> schedules a new render — it doesn't change the variable you're holding. Updates inside the same event (and since React 18, timeouts and promises too) are batched into one render. Use the updater form when the next value depends on the previous one.", ar: "كل render شايف صورة ثابتة من الـ state. و <code>setX</code> بيجدول render جديد — مش بيغير المتغير اللي في إيدك. والتحديثات اللي في نفس الـ event (ومن React 18 كمان timeouts و promises) بتتجمع في render واحد. واستخدم الـ updater لما القيمة الجديدة معتمدة على القديمة." },
      blocks: [
        { type: "code", code: "const [count, setCount] = useState(0);\n\nfunction add3() {\n  setCount(count + 1);\n  setCount(count + 1);\n  setCount(count + 1);\n  console.log(count);        // 0 — this render's snapshot\n}                            // next render: 1 (all three used count = 0)\n\nfunction add3Right() {\n  setCount((c) => c + 1);\n  setCount((c) => c + 1);\n  setCount((c) => c + 1);    // next render: 3\n}" },
        { type: "list", items: [
          { en: "Setting the same value (<code>Object.is</code>) bails out of re-rendering.", ar: "لو حطيت نفس القيمة (<code>Object.is</code>) مفيش re-render." },
          { en: "Mutating an object then setting it (same reference) is ignored — create a new object.", ar: "لو عدلت object وبعدين عملته set (نفس الـ reference) بيتجاهل — اعمل object جديد." },
          { en: "<code>flushSync</code> forces a synchronous update (rarely needed — e.g. scroll to a just-added item).", ar: "<code>flushSync</code> بيجبر تحديث sync (نادرًا ما تحتاجه — زي scroll لعنصر لسه متضاف)." }
        ] }
      ],
      say: "State is a snapshot per render; setters schedule the next render, so I use updater functions when the new value depends on the old one.",
      interview: [{ q: "Why does console.log right after setState show the old value?", a: { en: "Because the variable belongs to the current render's snapshot. setState schedules a re-render where the component function runs again with the new value.", ar: "علشان المتغير تبع snapshot الـ render الحالي. و setState بيجدول re-render والـ function بتشتغل تاني بالقيمة الجديدة." },
        follow: [{ q: "What changed about batching in React 18?", a: { en: "Automatic batching everywhere: updates in timeouts, promises and native handlers are batched too, not only in React event handlers.", ar: "Batching أوتوماتيك في كل حتة: التحديثات في الـ timeouts والـ promises والـ native handlers بتتجمع كمان، مش بس في event handlers بتاعة React." } }] }],
      quiz: [{ q: { en: "Three <code>setCount(count + 1)</code> in one click from 0 → ?", ar: "تلاتة <code>setCount(count + 1)</code> في ضغطة واحدة من 0 ← ؟" }, a: { en: "1.", ar: "1." } }],
      quick: [{ en: "State = snapshot; setter schedules; updater fn for dependent updates; batching everywhere since 18.", ar: "الـ state عبارة عن snapshot. والـ setter بيجدول تحديث. واستخدم updater function للتحديثات المعتمدة على اللي قبلها. والـ batching في كل حتة من React 18." }]
    },
    {
      id: "effects-model",
      title: { en: "Effects: synchronising with the outside", ar: "الـ Effects: مزامنة مع الخارج" },
      tldr: { en: "An effect keeps something outside React in sync with your state (a subscription, a widget, the document title). It runs after commit, re-runs when its dependencies change, and cleans up before re-running and on unmount. If there's nothing external, you probably don't need an effect.", ar: "الـ effect بيخلي حاجة برا React متزامنة مع الـ state (subscription، widget، عنوان الصفحة). بيشتغل بعد الـ commit، ويتعاد لما الـ dependencies تتغير، ويعمل cleanup قبل ما يتعاد ومع الـ unmount. ولو مفيش حاجة خارجية، غالبًا مش محتاج effect." },
      blocks: [
        { type: "compare", title: { en: "You might not need an effect", ar: "غالبًا مش محتاج effect" }, cols: [{ en: "Instead of an effect that…", ar: "بدل effect بي…" }, { en: "Do this", ar: "اعمل كده" }], rows: [
          [{ en: "Computes a value from props/state", ar: "يحسب قيمة من props أو state" }, { en: "Compute it during render (useMemo if expensive)", ar: "احسبها في الـ render (useMemo لو تقيلة)" }],
          [{ en: "Fetches data", ar: "يجيب داتا" }, { en: "TanStack Query / a router loader / a server component", ar: "TanStack Query / router loader / server component" }],
          [{ en: "Resets state when a prop changes", ar: "يعمل reset للـ state لما prop يتغير" }, { en: "Change the <code>key</code>", ar: "غيّر الـ <code>key</code>" }],
          [{ en: "Reacts to a click (send analytics, POST)", ar: "يرد على ضغطة (analytics، POST)" }, { en: "Do it in the event handler", ar: "اعمله في الـ event handler" }],
          [{ en: "Syncs two states", ar: "يزامن اتنين state" }, { en: "Keep one and derive the other", ar: "خلي واحد واشتق التاني" }]
        ] },
        { type: "code", code: "useEffect(() => {\n  const conn = createConnection(roomId);   // external system\n  conn.connect();\n  return () => conn.disconnect();          // cleanup: before next run and on unmount\n}, [roomId]);                              // re-sync when roomId changes" },
        { type: "projects", items: [{ text: { en: "Smart FAQ's guide says “not for fetching — that's React Query's job”: 26 effects in 166 commits, used for focus, timers and ref syncing.", ar: "قاعدة Smart FAQ «مش للـ fetching — ده شغل React Query»: 26 effect بس في 166 كوميت، للـ focus والتايمرز ومزامنة الـ refs." }, p: "smartfaq", tab: "hooks", label: "Smart FAQ" }] }
      ],
      say: "I use effects only to synchronise with something outside React; derived values are computed in render, data comes from React Query, and user actions run in event handlers.",
      interview: [{ q: "Why is fetching in useEffect discouraged?", a: { en: "You must handle race conditions, cancellation, caching, deduping, retries, loading/error states and Strict Mode's double run yourself. A data library or framework loader already does it.", ar: "لازم تتعامل بنفسك مع الـ race conditions والإلغاء والكاش ومنع التكرار والـ retry وحالات الـ loading والـ error وتشغيل Strict Mode مرتين. ومكتبة داتا أو loader بتاع framework بيعملوا ده جاهز." },
        follow: [{ q: "If you must fetch in an effect, how do you avoid a race?", a: { en: "Use an <code>ignore</code> flag set in cleanup, or AbortController, so a stale response doesn't overwrite a newer one.", ar: "استخدم flag <code>ignore</code> بيتعمل في الـ cleanup، أو AbortController، علشان رد قديم ميغطيش على رد أحدث." } }] }],
      quiz: [{ q: { en: "When does the cleanup function run?", ar: "الـ cleanup بيشتغل إمتى؟" }, a: { en: "Before the effect re-runs (deps changed) and on unmount.", ar: "قبل ما الـ effect يتعاد (الـ deps اتغيرت) ومع الـ unmount." } }],
      quick: [{ en: "Effects = sync with external systems; derive in render; fetch with a data lib; events in handlers; cleanup always.", ar: "الـ effects للمزامنة مع حاجة برّه React. واحسب الداتا المشتقة في الـ render. والـ fetch بمكتبة داتا. والأكشنز في الـ handlers. والـ cleanup دايمًا." }]
    },
    {
      id: "strict-mode",
      title: { en: "Strict Mode and render order", ar: "الـ Strict Mode وترتيب الـ render" },
      tldr: { en: "In development, Strict Mode renders components twice and mounts → unmounts → mounts effects once more, to expose impure renders and missing cleanups. Nothing doubles in production. Children's effects run before their parent's.", ar: "في التطوير، Strict Mode بيعمل render للـ components مرتين، وبيعمل mount ← unmount ← mount للـ effects مرة زيادة، علشان يكشف الـ render اللي مش pure والـ cleanup الناقص. مفيش حاجة بتتكرر في الـ production. والـ effects بتاعة الأولاد بتشتغل قبل الأب." },
      blocks: [
        { type: "code", code: "function Parent() { useEffect(() => console.log(\"parent effect\")); return <Child />; }\nfunction Child()  { useEffect(() => console.log(\"child effect\"));  return null; }\n// mount: child effect, parent effect   (effects run bottom-up, after the whole tree commits)\n\n// with <StrictMode> in dev, an effect with a subscription logs:\n// subscribe → unsubscribe → subscribe   (if that breaks your app, your cleanup is missing)" }
      ],
      say: "Strict Mode double-invokes renders and effects in development so missing cleanups show up before production — I fix the cleanup rather than turning it off.",
      interview: [{ q: "My effect runs twice in development. Bug?", a: { en: "Expected with Strict Mode: React mounts, unmounts and re-mounts to test your cleanup. If the double run causes a visible problem (two connections, two analytics events), the effect is missing cleanup or doesn't belong in an effect.", ar: "متوقع مع Strict Mode: React بيعمل mount و unmount و mount تاني علشان يجرب الـ cleanup. ولو التشغيل المزدوج عمل مشكلة ظاهرة (اتصالين، اتنين analytics)، يبقى الـ effect ناقصه cleanup أو مكانه مش في effect." } }],
      quiz: [{ q: { en: "Parent and child both log in useEffect on mount — order?", ar: "الأب والابن بيطبعوا في useEffect مع الـ mount — الترتيب؟" }, a: { en: "Child first, then parent.", ar: "الابن الأول، وبعدين الأب." } }],
      quick: [{ en: "Strict Mode dev-only double render/effect; effects run child → parent.", ar: "الـ Strict Mode بيكرر الـ render والـ effect في الـ development بس. والـ effects بتشتغل من الـ child للـ parent." }]
    },
    {
      id: "concurrent",
      title: { en: "Concurrent React, Suspense and React 19", ar: "Concurrent React والـ Suspense و React 19" },
      tldr: { en: "React 18 can interrupt rendering: urgent updates (typing) go first, transitions (filtering a big list) can wait. Suspense shows a fallback while something loads. React 19 adds Actions (async functions in transitions and forms), <code>use()</code>, <code>useOptimistic</code>, <code>useActionState</code>, refs as props, and the React Compiler that memoizes automatically.", ar: "React 18 يقدر يقطع الـ rendering. التحديثات المستعجلة (زي الكتابة) بتتعمل الأول، والـ transitions (زي فلترة قايمة كبيرة) بتستنى. و Suspense بيعرض fallback وفيه حاجة بتتحمّل. و React 19 زوّد الـ Actions، وهي async functions في الـ transitions والفورمز. وزوّد كمان <code>use()</code> و <code>useOptimistic</code> و <code>useActionState</code>، والـ ref كـ prop، و React Compiler اللي بيعمل memo لوحده." },
      blocks: [
        { type: "code", code: "<Suspense fallback={<Skeleton />}>\n  <Orders />                    {/* suspends while its data/code loads */}\n</Suspense>\n\nconst [isPending, startTransition] = useTransition();\nstartTransition(() => setFilter(next));   // keep the input responsive, render the list when possible\n\n// React 19 Action in a form\nconst [state, formAction, pending] = useActionState(saveProfile, null);\n<form action={formAction}>…<button disabled={pending}>Save</button></form>" },
        { type: "compare", cols: [{ en: "Feature", ar: "الميزة" }, { en: "Solves", ar: "بيحل" }], rows: [
          ["Suspense", { en: "Declarative loading boundaries (lazy code, data in frameworks)", ar: "حدود loading تصريحية (كود lazy، داتا في الـ frameworks)" }],
          ["useTransition / startTransition", { en: "Mark slow updates as non-urgent", ar: "تعلّم التحديثات البطيئة إنها مش مستعجلة" }],
          ["useDeferredValue", { en: "Render a slow child with a lagging copy of a value", ar: "تعرض ابن بطيء بنسخة متأخرة من القيمة" }],
          ["Server Components", { en: "Render on the server, ship no JS for that part", ar: "Render على السيرفر من غير ما تبعت JS للجزء ده" }],
          ["React Compiler", { en: "Auto-memoization — less manual useMemo/useCallback", ar: "Memo أوتوماتيك — useMemo و useCallback يدوي أقل" }]
        ] }
      ],
      say: "Transitions let me keep typing responsive while expensive renders wait, and Suspense gives clean loading boundaries; with React 19 Actions, forms handle pending and errors with much less code.",
      interview: [{ q: "What does “concurrent rendering” actually mean?", a: { en: "Rendering can be paused, interrupted and resumed, so React can handle an urgent update (a keystroke) before finishing a non-urgent one. It's not multi-threading — it's interruptible work on one thread.", ar: "الـ rendering ممكن يتوقف ويتقطع ويكمل، فـ React يقدر يتعامل مع تحديث مستعجل (ضغطة زرار) قبل ما يخلص واحد مش مستعجل. ده مش multi-threading — ده شغل يتقطع على thread واحد." },
        follow: [{ q: "What will the React Compiler change for you?", a: { en: "It memoizes components and values at build time when it can prove it's safe, so most manual useMemo/useCallback/memo becomes unnecessary — as long as components follow the rules (pure render, no mutation).", ar: "بيعمل memo للـ components والقيم وقت الـ build، لما يتأكد إن ده آمن. فمعظم الـ useMemo والـ useCallback والـ memo اليدوي بيبقى ملوش لازمة. بس ده بشرط إن الـ components ماشية على القواعد: render pure، ومن غير تعديل." } }] }],
      quiz: [{ q: { en: "Does startTransition make code run in another thread?", ar: "startTransition بيشغل الكود في thread تاني؟" }, a: { en: "No — it marks the update as interruptible.", ar: "لأ — بيعلّم التحديث إنه يتقطع." } }],
      quick: [{ en: "Transitions = non-urgent; Suspense = loading boundaries; React 19: Actions, use(), useOptimistic, Compiler.", ar: "الـ transitions معناها «مش مستعجل». والـ Suspense حدود للـ loading. و React 19 جاب Actions و use() و useOptimistic والـ Compiler." }]
    },
    {
      id: "react-output",
      title: { en: "React “what happens?” questions", ar: "أسئلة React «هيحصل إيه؟»" },
      tldr: { en: "The rendering rules in quiz form: snapshots, batching, effect order, stale closures, keys and memo.", ar: "قواعد الـ rendering في شكل أسئلة: الـ snapshots، والـ batching، وترتيب الـ effects، والـ stale closures، والـ keys، والـ memo." },
      blocks: [
        { type: "code", title: { en: "1 · How many renders, final value?", ar: "1 · كام render، والقيمة النهائية؟" }, code: "function C() {\n  const [n, setN] = useState(0);\n  return <button onClick={() => { setN(n + 1); setN((p) => p + 1); setN(n + 5); }}>{n}</button>;\n}\n// One click → one re-render, n = 5. Updates are queued in order: n+1 → 1, p+1 → 2, then n+5 uses the snapshot n=0 → 5." },
        { type: "code", title: { en: "2 · Stale closure in a timer", ar: "2 · Stale closure في تايمر" }, code: "function Counter() {\n  const [n, setN] = useState(0);\n  useEffect(() => { const id = setInterval(() => setN(n + 1), 1000); return () => clearInterval(id); }, []);\n  return n;\n}\n// Shows 1 forever: the interval closed over n = 0. Fix: setN(p => p + 1)." },
        { type: "code", title: { en: "3 · memo and a new object prop", ar: "3 · memo و prop object جديد" }, code: "const Row = memo(function Row({ style }) { console.log(\"row\"); return <div style={style} />; });\nfunction List() { const [t, setT] = useState(0); return <><Row style={{ color: \"red\" }} /><button onClick={() => setT(t + 1)} /></>; }\n// \"row\" logs on every click: {color:\"red\"} is a new object each render, so memo's shallow compare fails." },
        { type: "code", title: { en: "4 · Effect without deps", ar: "4 · Effect من غير deps" }, code: "useEffect(() => { setCount(count + 1); });\n// Infinite loop: no dependency array → runs after every render, and it causes a render." },
        { type: "code", title: { en: "5 · Children as props skip re-renders", ar: "5 · الـ children كـ props مش بتعمل re-render" }, code: "function Wrapper({ children }) { const [open, setOpen] = useState(false); return <div onClick={() => setOpen(!open)}>{children}</div>; }\n<Wrapper><ExpensiveTree /></Wrapper>\n// Toggling `open` does NOT re-render ExpensiveTree: it was created by the parent, and the same element object is passed again." }
      ],
      say: "When I'm unsure what renders, I reason from three rules: state is a snapshot, a parent render re-renders children, and memo compares props by reference.",
      interview: [{ q: "How do you find why a component re-renders?", a: { en: "React DevTools Profiler with “record why each component rendered”, or highlight updates. Then fix the cause: lift state down, stabilise props, split context, or memo.", ar: "React DevTools Profiler مع «سجّل ليه كل component عمل render»، أو highlight updates. وبعدين أصلّح السبب: أنزّل الـ state، أثبّت الـ props، أقسّم الـ context، أو memo." } }],
      quiz: [
        { q: { en: "Example 1: what if all three were updater functions?", ar: "مثال 1: لو التلاتة updater functions؟" }, a: { en: "n = 3 in one render.", ar: "n = 3 في render واحد." } },
        { q: { en: "Example 3: one-line fix?", ar: "مثال 3: الحل في سطر؟" }, a: { en: "Hoist the style object outside the component (or useMemo it).", ar: "طلّع الـ style object برا الـ component (أو useMemo)." } }
      ],
      quick: [{ en: "Queued updates apply in order; intervals need updater fns; memo fails on new object props; children passed as props don't re-render.", ar: "التحديثات بتتطبق بالترتيب. والـ intervals محتاجة updater. والـ memo بيفشل مع props بتبقى objects جديدة. والـ children اللي بتتبعت كـ props مش بتعمل re-render." }]
    }
  ]
});
