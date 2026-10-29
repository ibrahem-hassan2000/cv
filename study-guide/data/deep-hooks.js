// Deep dive for the Hooks section. Same shape as deep-javascript.js (see README "Deep dive").
// Hook examples need React and a page → run: "browser"; plain-JS models of how React works → run: "node".
STUDY.deepen("hooks", {
  useeffect: {
    why: {
      en: "Beyond “useEffect vs useLayoutEffect”, interviewers dig into timing and dependencies: when exactly cleanup runs, why an effect loops, and how to read the latest value without re-subscribing.",
      ar: "بعد «useEffect ولا useLayoutEffect»، الإنترفيورز بيحفروا في التوقيت والـ dependencies: الـ cleanup بيشتغل إمتى بالظبط، وليه الـ effect بيلف في loop، وإزاي تقرا آخر قيمة من غير ما تعمل subscribe تاني."
    },
    how: [
      {
        title: { en: "Three effect hooks, three moments", ar: "تلات effect hooks، تلات لحظات" },
        body: {
          en: "<code>useInsertionEffect</code> runs first, before any layout effects — only for CSS-in-JS libraries to inject styles. <code>useLayoutEffect</code> runs after the DOM is updated but <b>before paint</b>, synchronously, so measuring and adjusting causes no flicker but blocks the frame. <code>useEffect</code> usually runs <b>after paint</b> and doesn't block it.",
          ar: "<code>useInsertionEffect</code> بيشتغل الأول، قبل أي layout effects — للمكتبات بتاعة CSS-in-JS بس علشان تحط الـ styles. و <code>useLayoutEffect</code> بيشتغل بعد ما الـ DOM يتحدث بس <b>قبل الرسم</b>، ومن غير توقف، فالقياس والتعديل مش بيعملوا flicker بس بيوقفوا الـ frame. و <code>useEffect</code> غالبًا بيشتغل <b>بعد الرسم</b> ومش بيوقفه."
        }
      },
      {
        title: { en: "Cleanup runs with the old values, before the next setup", ar: "الـ cleanup بيشتغل بالقيم القديمة، قبل الـ setup الجاي" },
        body: {
          en: "When deps change, React re-renders, commits, then runs the previous cleanup (which still sees the previous render's values) and then the new setup. On unmount only the cleanup runs.",
          ar: "لما الـ deps تتغير، React بيعمل render و commit، وبعدين يشغّل الـ cleanup اللي قبله (اللي لسه شايف قيم الـ render اللي فات) وبعدين الـ setup الجديد. وفي الـ unmount الـ cleanup بس اللي بيشتغل."
        },
        code: "useEffect(() => {\n  console.log(\"subscribe\", id);\n  return () => console.log(\"unsubscribe\", id);\n}, [id]);\n// id 1 → 2:  subscribe 1 … unsubscribe 1, subscribe 2",
        run: "browser"
      },
      {
        title: { en: "Deps are compared with Object.is, item by item", ar: "الـ deps بتتقارن بـ Object.is، عنصر عنصر" },
        body: {
          en: "Primitives compare by value; objects, arrays and functions by reference. An object or function created during render is “new” every time, so an effect that depends on it re-runs every render.",
          ar: "الـ primitives بتتقارن بالقيمة؛ والـ objects والـ arrays والـ functions بالـ reference. فأي object أو function اتعمل وقت الـ render بيبقى «جديد» كل مرة، والـ effect المعتمد عليه بيشتغل مع كل render."
        }
      },
      {
        title: { en: "useEffectEvent: read the latest value without depending on it", ar: "useEffectEvent: اقرا آخر قيمة من غير ما تعتمد عليها" },
        body: {
          en: "Some code inside an effect should see current values but shouldn't restart the effect — e.g. the theme used for a notification when a chat connects. Wrap it in <code>useEffectEvent</code> (stable since React 19.2) and call it from the effect; it isn't a dependency.",
          ar: "فيه كود جوه الـ effect المفروض يشوف القيم الحالية بس مايعيدش تشغيل الـ effect — زي الـ theme اللي بيتستخدم في notification لما الشات يتوصل. لفّه في <code>useEffectEvent</code> (stable من React 19.2) وناديه من الـ effect؛ وهو مش dependency."
        },
        code: "const onConnected = useEffectEvent(() => showToast(\"Connected\", theme));\nuseEffect(() => {\n  const conn = connect(roomId);\n  conn.on(\"connected\", onConnected);   // reads the latest theme\n  return () => conn.close();\n}, [roomId]);                          // theme changes don't reconnect",
        run: "browser"
      }
    ],
    breaks: [
      {
        title: { en: "The effect that loops forever", ar: "الـ effect اللي بيلف على طول" },
        body: {
          en: "An effect sets state that is (or produces) one of its own deps: <code>setOptions({ ...options })</code> with <code>[options]</code>, or an object built during render.",
          ar: "effect بيحط state هو (أو بيطلّع) واحد من الـ deps بتاعته: <code>setOptions({ ...options })</code> مع <code>[options]</code>، أو object بيتعمل وقت الـ render."
        },
        fix: { en: "Depend on primitives, move the object inside the effect, use an updater, or compute the value during render instead.", ar: "اعتمد على primitives، أو انقل الـ object جوه الـ effect، أو استخدم updater، أو احسب القيمة وقت الـ render بدل كده." }
      },
      {
        title: { en: "An async function as the effect", ar: "async function كـ effect" },
        body: {
          en: "<code>useEffect(async () =&gt; …)</code> returns a promise, not a cleanup, so React can't clean up and warns. You also lose the chance to ignore stale responses.",
          ar: "<code>useEffect(async () =&gt; …)</code> بيرجّع promise مش cleanup، فـ React مش هيقدر يعمل cleanup وهيطلع warning. وكمان بتضيّع فرصة إنك تتجاهل الـ responses القديمة."
        },
        code: "useEffect(() => {\n  const ac = new AbortController();\n  (async () => {\n    const res = await fetch(url, { signal: ac.signal });\n    setData(await res.json());\n  })().catch((e) => { if (e.name !== \"AbortError\") setError(e); });\n  return () => ac.abort();\n}, [url]);",
        run: "browser",
        fix: { en: "Define an inner async function, call it, and return a cleanup that aborts or sets an ignore flag.", ar: "اعمل async function جوه، وناديها، ورجّع cleanup بيعمل abort أو بيحط ignore flag." }
      },
      {
        title: { en: "useLayoutEffect everywhere", ar: "useLayoutEffect في كل حتة" },
        body: {
          en: "Layout effects block painting, so heavy work there delays every frame; on the server they don't run at all (older React versions warned during SSR).",
          ar: "الـ layout effects بتوقف الرسم، فأي شغل تقيل فيها بيأخر كل frame؛ وعلى السيرفر مش بتشتغل خالص (والإصدارات القديمة من React كانت بتطلع warning في الـ SSR)."
        },
        fix: { en: "Use it only to measure the DOM and adjust before the user sees it (tooltips, scroll restoration); everything else in <code>useEffect</code>.", ar: "استخدمه بس علشان تقيس الـ DOM وتظبط قبل ما اليوزر يشوف (tooltips، رجوع الـ scroll)؛ وكل حاجة تانية في <code>useEffect</code>." }
      }
    ],
    levels: [
      {
        q: "useEffect vs useLayoutEffect?",
        mid: { en: "<code>useLayoutEffect</code> runs before paint, <code>useEffect</code> after. Use layout effect to avoid flicker.", ar: "<code>useLayoutEffect</code> بيشتغل قبل الرسم، و <code>useEffect</code> بعده. استخدم الـ layout effect علشان تتجنب الـ flicker." },
        senior: {
          en: "Both run after the DOM is updated in the commit. <code>useLayoutEffect</code> runs synchronously before the browser paints: measure, then set state, and the user only sees the corrected frame — at the cost of blocking that frame. <code>useEffect</code> usually runs after paint and doesn't block. So layout effects only for measurement-driven positioning (tooltips, popovers, scroll restore), and I keep them small; everything else is a normal effect. <code>useInsertionEffect</code> exists only for CSS-in-JS libraries.",
          ar: "الاتنين بيشتغلوا بعد ما الـ DOM يتحدث في الـ commit. و <code>useLayoutEffect</code> بيشتغل من غير توقف قبل ما المتصفح يرسم: تقيس، وبعدين تحط state، واليوزر يشوف الـ frame المظبوط بس — والتمن إنك بتوقف الـ frame ده. و <code>useEffect</code> غالبًا بيشتغل بعد الرسم ومش بيوقفه. فالـ layout effects بس للتمركز المعتمد على القياس (tooltips، popovers، رجوع الـ scroll)، وبخليها صغيرة؛ وأي حاجة تانية effect عادي. و <code>useInsertionEffect</code> موجود بس لمكتبات الـ CSS-in-JS."
        }
      },
      {
        q: "My effect re-runs too often. What do you do?",
        mid: { en: "Remove the dependency that causes it, or disable the lint rule.", ar: "أشيل الـ dependency اللي عاملة كده، أو أقفل قاعدة الـ lint." },
        senior: {
          en: "Never lie about deps — I change the code so it doesn't need the value. Objects or functions from render: move them inside the effect or memoise them. State read only to compute the next state: use an updater. A value read for an event-like part (a log, a toast) but that shouldn't reconnect: put it in <code>useEffectEvent</code>. And sometimes the conclusion is that it shouldn't be an effect at all.",
          ar: "عمري ما بكدب في الـ deps — بغيّر الكود علشان ميحتاجش القيمة. objects أو functions من الـ render: بنقلها جوه الـ effect أو بعمل لها memo. state بيتقرا بس علشان أحسب الـ state الجاي: استخدم updater. قيمة بتتقرا لجزء شبه event (log أو toast) بس مينفعش يعمل reconnect: أحطها في <code>useEffectEvent</code>. وساعات النتيجة إنه مكانش المفروض يبقى effect أصلًا."
        }
      }
    ],
    drill: [
      {
        q: "Can the effect function itself be async?",
        a: { en: "No. It must return a cleanup function or nothing; an async function returns a promise.", ar: "لأ. لازم يرجّع cleanup function أو مفيش حاجة؛ والـ async function بترجّع promise." },
        follow: [
          {
            q: "So how do you fetch in an effect?",
            a: { en: "An inner async function plus an <code>AbortController</code> or an <code>ignore</code> flag in cleanup, so a slow old response can't overwrite a newer one.", ar: "async function جوه، ومعاها <code>AbortController</code> أو <code>ignore</code> flag في الـ cleanup، علشان response قديم بطيء ميكتبش فوق واحد أحدث." },
            follow: [
              {
                q: "Why would you still avoid it in production code?",
                a: { en: "No cache, no request deduplication, no background refetch, no SSR integration, and every component repeats the race handling. A data library or the framework's loader does all of that.", ar: "مفيش cache، ولا dedup للـ requests، ولا refetch في الخلفية، ولا تكامل مع الـ SSR، وكل component بيكرر التعامل مع الـ race. ومكتبة داتا أو الـ loader بتاع الـ framework بيعملوا ده كله." }
              }
            ]
          }
        ]
      }
    ],
    story: {
      text: { en: "okoRent: the SignalR connection opens in useEffect with the token in deps and stops in cleanup, so a new token reconnects cleanly.", ar: "okoRent: الـ SignalR connection بيتفتح في useEffect والـ token في الـ deps وبيتقفل في الـ cleanup، فلما ييجي token جديد بيعمل reconnect نضيف." },
      p: "okorent", tab: "hooks", label: "okoRent"
    },
    sources: [
      { label: "react.dev — useEffect", url: "https://react.dev/reference/react/useEffect" },
      { label: "react.dev — useLayoutEffect", url: "https://react.dev/reference/react/useLayoutEffect" },
      { label: "react.dev — useEffectEvent", url: "https://react.dev/reference/react/useEffectEvent" },
      { label: "react.dev — Removing effect dependencies", url: "https://react.dev/learn/removing-effect-dependencies" }
    ]
  },

  useref: {
    why: {
      en: "Refs are the escape hatch. The questions check that you know what refs are for (DOM, timers, latest values), what they must not be used for (anything the UI shows), and how React 19 changed passing them.",
      ar: "الـ refs هي باب الطوارئ. والأسئلة بتشوف إنك عارف الـ refs معمولة ليه (DOM، timers، آخر قيمة)، ومينفعش تتستخدم في إيه (أي حاجة الـ UI بيعرضها)، و React 19 غيّر طريقة تمريرها إزاي."
    },
    how: [
      {
        title: { en: "A stable box that doesn't re-render", ar: "صندوق ثابت ومش بيعمل re-render" },
        body: {
          en: "<code>useRef(initial)</code> returns the same <code>{ current }</code> object on every render. Changing <code>current</code> doesn't trigger a render. That makes it right for values the UI doesn't display: timer ids, the previous value, the latest callback, a DOM node.",
          ar: "<code>useRef(initial)</code> بيرجّع نفس الـ object <code>{ current }</code> في كل render. وتغيير <code>current</code> مش بيعمل render. وده بيخليه مناسب للقيم اللي الـ UI مش بيعرضها: timer ids، والقيمة اللي قبلها، وآخر callback، و DOM node."
        }
      },
      {
        title: { en: "DOM refs are set in the commit", ar: "الـ DOM refs بتتحط في الـ commit" },
        body: {
          en: "During the first render <code>ref.current</code> is still <code>null</code>; React sets it during the commit and resets it to <code>null</code> on removal. Read it in effects and handlers. A <b>ref callback</b> runs when the node attaches; in React 19 it can return a cleanup.",
          ar: "في أول render <code>ref.current</code> لسه <code>null</code>؛ و React بيحطه وقت الـ commit ويرجّعه <code>null</code> لما الـ node يتشال. اقراه في الـ effects والـ handlers. والـ <b>ref callback</b> بيشتغل لما الـ node يتركب؛ وفي React 19 ينفع يرجّع cleanup."
        },
        code: "<div ref={(node) => {\n  const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));\n  ro.observe(node);\n  return () => ro.disconnect();   // React 19: cleanup when the node is removed\n}} />",
        run: "browser"
      },
      {
        title: { en: "React 19: ref is a normal prop", ar: "React 19: الـ ref بقى prop عادي" },
        body: {
          en: "Function components receive <code>ref</code> as a prop, so <code>forwardRef</code> is no longer needed. <code>useImperativeHandle</code> still lets a component expose a small, deliberate API (<code>focus()</code>, <code>scrollToRow(i)</code>) instead of its whole DOM node.",
          ar: "الـ function components بتاخد <code>ref</code> كـ prop، فمبقاش محتاج <code>forwardRef</code>. و <code>useImperativeHandle</code> لسه بيخلي الـ component يكشف API صغير ومقصود (<code>focus()</code>، <code>scrollToRow(i)</code>) بدل الـ DOM node كله."
        },
        code: "function SearchInput({ ref, ...props }) {\n  const inputRef = useRef(null);\n  useImperativeHandle(ref, () => ({ focus: () => inputRef.current.focus(), clear: () => { inputRef.current.value = \"\"; } }), []);\n  return <input ref={inputRef} {...props} />;\n}",
        run: "browser"
      },
      {
        title: { en: "The latest-ref pattern", ar: "pattern الـ latest-ref" },
        body: {
          en: "Store the newest callback in a ref after each commit, and give children a stable function that calls <code>ref.current</code>. Memoised children never re-render for a new handler and never call a stale one. <code>useEffectEvent</code> is the built-in version for effects.",
          ar: "خزّن أحدث callback في ref بعد كل commit، وادي الـ children function ثابتة بتنادي <code>ref.current</code>. فالـ children المعمول لها memo عمرها ما هتعمل re-render علشان handler جديد، وعمرها ما هتنادي واحد قديم. و <code>useEffectEvent</code> هو النسخة الجاهزة جوه React للـ effects."
        },
        code: "const latest = useRef(onAction);\nuseLayoutEffect(() => { latest.current = onAction; });\nconst stableOnAction = useCallback((...args) => latest.current(...args), []);",
        run: "browser"
      }
    ],
    breaks: [
      {
        title: { en: "Reading or writing refs during render", ar: "قراية أو كتابة الـ refs وقت الـ render" },
        body: {
          en: "Render may run several times or be discarded, so a ref changed during render can hold a value from a render that never committed. The only accepted exception is lazy initialisation: <code>if (ref.current === null) ref.current = create()</code>.",
          ar: "الـ render ممكن يشتغل كذا مرة أو يترمي، فالـ ref اللي اتغير وقت الـ render ممكن يبقى شايل قيمة من render عمره ما اتعمل له commit. والاستثناء الوحيد المقبول هو الـ lazy initialisation: <code>if (ref.current === null) ref.current = create()</code>."
        },
        fix: { en: "Update refs in effects or handlers.", ar: "حدّث الـ refs في الـ effects أو الـ handlers." }
      },
      {
        title: { en: "A ref for something the UI shows", ar: "ref لحاجة الـ UI بيعرضها" },
        body: {
          en: "A counter or “isOpen” kept in a ref changes silently: the screen updates only when something else happens to re-render it.",
          ar: "counter أو «isOpen» محفوظ في ref بيتغير من غير ما حد ياخد باله: الشاشة بتتحدث بس لما حاجة تانية تحصل وتعمل re-render."
        },
        fix: { en: "If it affects the output, it's state.", ar: "لو بيأثر على اللي بيظهر، يبقى state." }
      }
    ],
    levels: [
      {
        q: "useRef vs useState?",
        mid: { en: "State re-renders the component when it changes; a ref doesn't.", ar: "الـ state بيعمل re-render لما يتغير؛ والـ ref لأ." },
        senior: {
          en: "State is a snapshot per render and changing it schedules a render; a ref is one mutable object for the component's lifetime, and changing it is invisible to React. So: anything that affects the output is state; anything used only by effects and handlers — timer ids, DOM nodes, the latest callback, the previous value — is a ref. I never read or write refs during render (except lazy init), because render can be replayed or thrown away.",
          ar: "الـ state عبارة عن snapshot لكل render وتغييره بيجدول render؛ والـ ref عبارة عن object واحد بيتغير طول عمر الـ component، وتغييره React مش بيشوفه. فأي حاجة بتأثر على اللي بيظهر state؛ وأي حاجة بتستخدمها الـ effects والـ handlers بس — timer ids، و DOM nodes، وآخر callback، والقيمة اللي قبلها — ref. وعمري ما بقرا أو بكتب الـ refs وقت الـ render (ماعدا الـ lazy init)، لأن الـ render ممكن يتعاد أو يترمي."
        }
      },
      {
        q: "When would you use useImperativeHandle?",
        mid: { en: "To let a parent call functions on a child, like <code>focus</code>.", ar: "علشان الـ parent ينادي functions في الـ child، زي <code>focus</code>." },
        senior: {
          en: "Rarely, and on purpose: when a parent needs an imperative action that isn't naturally state — focus, scroll to a row, play a video, reset an uncontrolled editor. I expose a minimal API instead of the DOM node, so the child keeps control of its internals. If the parent wants to change what the child shows, that's a prop, not a handle.",
          ar: "نادرًا، وبقصد: لما الـ parent يحتاج أكشن imperative مش state بطبيعته — focus، أو scroll لـ row، أو تشغيل فيديو، أو reset لـ editor مش controlled. وبكشف API صغير بدل الـ DOM node، علشان الـ child يفضل متحكم في اللي جواه. ولو الـ parent عايز يغيّر اللي الـ child بيعرضه، يبقى ده prop، مش handle."
        }
      }
    ],
    drill: [
      {
        q: "In the latest-ref pattern, why update the ref in an effect, not during render?",
        a: { en: "A render may never commit (concurrent rendering, Strict Mode). Updating after the commit guarantees the ref holds the handler of the UI the user actually sees.", ar: "الـ render ممكن عمره ما يتعمل له commit (concurrent rendering، Strict Mode). والتحديث بعد الـ commit بيضمن إن الـ ref شايل الـ handler بتاع الـ UI اللي اليوزر شايفه فعلًا." },
        follow: [
          {
            q: "Which effect — useEffect or useLayoutEffect?",
            a: { en: "A layout effect (or insertion effect) runs earlier in the commit, so a handler triggered right after paint already sees the new callback.", ar: "الـ layout effect (أو الـ insertion effect) بيشتغل بدري في الـ commit، فأي handler يتنادى بعد الرسم على طول بيكون شايف الـ callback الجديد." },
            follow: [
              {
                q: "What replaces this pattern inside effects?",
                a: { en: "<code>useEffectEvent</code>: a function that always sees the latest props and state, callable from effects, and not a dependency.", ar: "<code>useEffectEvent</code>: function دايمًا شايفة آخر props و state، وينفع تتنادى من الـ effects، ومش dependency." }
              }
            ]
          }
        ]
      }
    ],
    story: {
      text: { en: "Smart FAQ row menu uses a latest ref so memoised menus always call the current handler; the AHS formula editor uses a textarea ref to insert text at the cursor and restore it.", ar: "الـ row menu في Smart FAQ بيستخدم latest ref علشان الـ menus المعمول لها memo تنادي الـ handler الحالي دايمًا؛ والـ formula editor في AHS بيستخدم ref للـ textarea علشان يحط نص مكان الـ cursor ويرجّعه." },
      p: "smartfaq", tab: "how", label: "Smart FAQ"
    },
    sources: [
      { label: "react.dev — useRef", url: "https://react.dev/reference/react/useRef" },
      { label: "react.dev — Manipulating the DOM with refs", url: "https://react.dev/learn/manipulating-the-dom-with-refs" },
      { label: "react.dev — useImperativeHandle", url: "https://react.dev/reference/react/useImperativeHandle" },
      { label: "react.dev — React 19: ref as a prop", url: "https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop" }
    ]
  },

  "usememo-usecallback": {
    why: {
      en: "Memoisation questions catch both extremes: people who wrap everything and people who never measure. A senior answer explains when identity matters, proves it with the Profiler, and knows what React Compiler changes.",
      ar: "أسئلة الـ memoisation بتمسك الطرفين: اللي بيلف كل حاجة، واللي عمره ما بيقيس. وإجابة الـ Senior بتشرح إمتى الـ identity بتفرق، وبتثبت ده بالـ Profiler، وعارفة React Compiler بيغيّر إيه."
    },
    how: [
      {
        title: { en: "Three tools, one idea: keep the same thing if inputs didn't change", ar: "تلات أدوات، وفكرة واحدة: احتفظ بنفس الحاجة لو المدخلات متغيرتش" },
        body: {
          en: "<code>useMemo(fn, deps)</code> keeps a computed value; <code>useCallback(fn, deps)</code> keeps a function (it's <code>useMemo(() =&gt; fn)</code>); <code>React.memo(Component)</code> skips rendering a component when every prop is <code>Object.is</code>-equal to last time.",
          ar: "<code>useMemo(fn, deps)</code> بيحتفظ بقيمة محسوبة؛ و <code>useCallback(fn, deps)</code> بيحتفظ بـ function (هو نفسه <code>useMemo(() =&gt; fn)</code>)؛ و <code>React.memo(Component)</code> بيتخطى الـ render بتاع component لما كل prop تكون <code>Object.is</code>-equal للمرة اللي فاتت."
        }
      },
      {
        title: { en: "They only pay off in three cases", ar: "بيستاهلوا في تلات حالات بس" },
        body: {
          en: "1) The calculation is measurably expensive. 2) The value or function is a prop of a <code>memo</code> child — otherwise the child re-renders anyway. 3) It's a dependency of another hook (an effect, another memo) that shouldn't re-run. Outside these, they add work and noise.",
          ar: "1) الحساب تقيل فعلًا ومتقاس. 2) القيمة أو الـ function prop لـ child معمول له <code>memo</code> — وإلا الـ child هيعمل render كده كده. 3) هي dependency لـ hook تاني (effect، أو memo تاني) المفروض مايتعادش. وبرّه الحالات دي، بيزوّدوا شغل ودوشة."
        },
        code: "const Row = memo(function Row({ item, onSelect }) { /* … */ });\n\nfunction Table({ items }) {\n  const [selected, setSelected] = useState(null);\n  const onSelect = useCallback((id) => setSelected(id), []);  // stable → memo(Row) can skip\n  return items.map((it) => <Row key={it.id} item={it} onSelect={onSelect} />);\n}",
        run: "browser"
      },
      {
        title: { en: "A cache, not a guarantee", ar: "cache، مش ضمان" },
        body: {
          en: "React may discard memoised values (and does in some cases, like a suspended first render). Code must still be correct if the function runs again — never use <code>useMemo</code> to keep a subscription, an instance that must be unique, or anything with side effects; use a ref or state for that.",
          ar: "React ممكن يرمي القيم المعمول لها memo (وبيعمل كده في حالات، زي أول render عمل suspend). فالكود لازم يفضل صح لو الـ function اشتغلت تاني — عمرك ما تستخدم <code>useMemo</code> علشان تحتفظ بـ subscription، أو instance لازم يبقى واحد، أو أي حاجة فيها side effects؛ استخدم ref أو state لده."
        }
      },
      {
        title: { en: "React Compiler does it for you", ar: "React Compiler بيعمله بدالك" },
        body: {
          en: "React Compiler analyses components at build time and memoises values, callbacks and JSX automatically, more precisely than hand-written hooks. With it, manual memo becomes the exception — for third-party APIs that need stable identities, or to control effect deps.",
          ar: "React Compiler بيحلل الـ components وقت الـ build وبيعمل memo للقيم والـ callbacks والـ JSX أوتوماتيك، وبدقة أكتر من الـ hooks اللي بتكتبها بإيدك. ومعاه الـ memo اليدوي بيبقى استثناء — للـ APIs بتاعة مكتبات تانية اللي محتاجة identity ثابتة، أو علشان تتحكم في deps الـ effects."
        }
      }
    ],
    breaks: [
      {
        title: { en: "useCallback with no memo child", ar: "useCallback من غير child معمول له memo" },
        body: {
          en: "Passing a memoised callback to a plain component or a DOM element changes nothing: the child renders anyway. You pay for the hook and the deps comparison for no benefit.",
          ar: "لو بعت callback معمول له memo لـ component عادي أو DOM element مش هيفرق حاجة: الـ child هيعمل render كده كده. بتدفع تمن الـ hook ومقارنة الـ deps من غير فايدة."
        },
        fix: { en: "Pair <code>useCallback</code> with a <code>memo</code> child or a hook dependency — or don't use it.", ar: "خلي <code>useCallback</code> مع child معمول له <code>memo</code> أو dependency لـ hook — أو متستخدموش." }
      },
      {
        title: { en: "memo defeated by one inline prop", ar: "الـ memo بيبوظ بسبب prop واحدة inline" },
        body: {
          en: "<code>&lt;Row style={{ padding: 8 }} /&gt;</code> or <code>actions={[edit, remove]}</code> creates a new object each render, so the memoised child always re-renders.",
          ar: "<code>&lt;Row style={{ padding: 8 }} /&gt;</code> أو <code>actions={[edit, remove]}</code> بيعمل object جديد كل render، فالـ child المعمول له memo دايمًا بيعمل re-render."
        },
        fix: { en: "Hoist constants outside the component, memoise the object, or compare only the fields that matter with a custom <code>areEqual</code> — and keep handlers fresh with a latest ref so that comparison can't make them stale.", ar: "طلّع الثوابت برّه الـ component، أو اعمل memo للـ object، أو قارن الـ fields المهمة بس بـ <code>areEqual</code> بتاعتك — وخلي الـ handlers جديدة بـ latest ref علشان المقارنة دي متخليهاش قديمة." }
      },
      {
        title: { en: "A custom comparison that hides changes", ar: "مقارنة بتاعتك بتخبّي تغييرات" },
        body: {
          en: "An <code>areEqual</code> that ignores a prop also ignores its updates: the row keeps showing old text, or calls an old handler.",
          ar: "الـ <code>areEqual</code> اللي بيتجاهل prop بيتجاهل تحديثاتها كمان: الـ row يفضل يعرض نص قديم، أو ينادي handler قديم."
        },
        fix: { en: "Compare every field the component renders; route callbacks through a latest ref; cover it with a test.", ar: "قارن كل field الـ component بيعرضه؛ وعدّي الـ callbacks على latest ref؛ واكتب test يغطيها." }
      }
    ],
    levels: [
      {
        q: "When do you use useMemo and useCallback?",
        mid: { en: "To avoid recalculating values and recreating functions on every render, for performance.", ar: "علشان أتجنب إعادة حساب القيم وإعادة إنشاء الـ functions مع كل render، للأداء." },
        senior: {
          en: "Only where identity or cost matters: an expensive calculation I've measured, a prop for a <code>memo</code> child, or a dependency of another hook. Creating a function is cheap; what's expensive is the re-render of a subtree that a stable identity lets React skip. So I profile first, fix structure (state placement, children) second, and memoise the specific hot spot third. With React Compiler most of this becomes automatic, and I keep manual memo for third-party APIs or effect deps.",
          ar: "بس في الأماكن اللي الـ identity أو التكلفة بتفرق فيها: حساب تقيل قسته، أو prop لـ child معمول له <code>memo</code>، أو dependency لـ hook تاني. إنشاء function رخيص؛ الغالي هو الـ re-render لشجرة كاملة، والـ identity الثابتة بتخلي React يتخطاها. فبعمل profile الأول، وأظبط الـ structure تاني (مكان الـ state، والـ children)، وأعمل memo للنقطة السخنة بالظبط تالت. ومع React Compiler أغلب ده بيبقى أوتوماتيك، وبسيب الـ memo اليدوي لـ APIs المكتبات التانية أو deps الـ effects."
        }
      },
      {
        q: "Tell me about a render-performance problem you fixed.",
        mid: { en: "I added <code>React.memo</code> and <code>useCallback</code> to a slow list.", ar: "ضفت <code>React.memo</code> و <code>useCallback</code> لـ list بطيئة." },
        senior: {
          en: "In Smart FAQ the table re-rendered every row menu on each change because the actions array was a new reference every render. I measured it, then memoised the row menu with a comparison of only the fields it shows, and routed handlers through a latest ref so the comparison couldn't make them stale. The table's re-render went from about 20 ms to about 2 ms. The lesson I'd repeat: find the identity that changes, fix that, then verify with the Profiler.",
          ar: "في Smart FAQ الـ table كان بيعمل re-render لكل row menu مع كل تغيير، لأن الـ actions array كان reference جديد كل render. قسته، وبعدين عملت memo للـ row menu بمقارنة للـ fields اللي بيعرضها بس، وعدّيت الـ handlers على latest ref علشان المقارنة متخليهاش قديمة. والـ re-render بتاع الـ table نزل من حوالي 20ms لحوالي 2ms. والدرس اللي بكرره: لاقي الـ identity اللي بتتغير، وصلّحها، وبعدين اتأكد بالـ Profiler."
        }
      }
    ],
    drill: [
      {
        q: "Does useMemo guarantee the value is kept?",
        a: { en: "No — it's a performance hint. React may throw the cache away and recompute.", ar: "لأ — هو تلميح للأداء. React ممكن يرمي الـ cache ويحسب تاني." },
        follow: [
          {
            q: "So what do you use when you need exactly one instance per component?",
            a: { en: "A ref with lazy init (<code>if (!ref.current) ref.current = create()</code>) or <code>useState(() =&gt; create())</code> — both are kept for the component's lifetime.", ar: "ref مع lazy init (<code>if (!ref.current) ref.current = create()</code>) أو <code>useState(() =&gt; create())</code> — الاتنين بيتحفظوا طول عمر الـ component." },
            follow: [
              {
                q: "And what does React Compiler need from your code to memoise it safely?",
                a: { en: "That components follow the Rules of React: pure render, no mutation of props or state, hooks called unconditionally. When it can't prove that, it skips that component instead of guessing.", ar: "إن الـ components ماشية على قواعد React: render pure، ومفيش تعديل للـ props أو الـ state، والـ hooks بتتنادى من غير شروط. ولما ميقدرش يثبت ده، بيتخطى الـ component ده بدل ما يخمّن." }
              }
            ]
          }
        ]
      }
    ],
    story: {
      text: { en: "Smart FAQ: memo with a custom comparison (only the fields the menu shows) plus latest-ref handlers cut a table re-render from ~20 ms to ~2 ms.", ar: "Smart FAQ: memo بمقارنة مخصوصة (الـ fields اللي الـ menu بيعرضها بس) ومعاها handlers بـ latest ref نزّلوا الـ re-render بتاع الـ table من ~20ms لـ ~2ms." },
      p: "smartfaq", tab: "problems", label: "Smart FAQ"
    },
    sources: [
      { label: "react.dev — useMemo", url: "https://react.dev/reference/react/useMemo" },
      { label: "react.dev — useCallback", url: "https://react.dev/reference/react/useCallback" },
      { label: "react.dev — memo", url: "https://react.dev/reference/react/memo" },
      { label: "react.dev — React Compiler", url: "https://react.dev/learn/react-compiler" }
    ]
  },

  usecontext: {
    why: {
      en: "Context questions are really architecture questions: what belongs in context, why every consumer re-renders, and when you should reach for a store with selectors instead.",
      ar: "أسئلة الـ context في الحقيقة أسئلة architecture: إيه اللي مكانه context، وليه كل consumer بيعمل re-render، وإمتى تروح لـ store بـ selectors بدل كده."
    },
    how: [
      {
        title: { en: "Context passes a value through the tree", ar: "الـ context بيعدّي قيمة في الشجرة" },
        body: {
          en: "A provider supplies a value; any descendant reads it with <code>useContext</code> (or <code>use</code>, which can be called conditionally). It solves prop drilling — it is not a state manager by itself: the state still lives in a component's <code>useState</code>/<code>useReducer</code>.",
          ar: "الـ provider بيدي قيمة؛ وأي descendant بيقراها بـ <code>useContext</code> (أو <code>use</code>، اللي ينفع يتنادى بشرط). هو بيحل الـ prop drilling — ومش state manager لوحده: الـ state لسه عايش في <code>useState</code>/<code>useReducer</code> بتاع component."
        }
      },
      {
        title: { en: "Every consumer re-renders when the value changes", ar: "كل consumer بيعمل re-render لما القيمة تتغير" },
        body: {
          en: "When the provider's <code>value</code> is a different object (<code>Object.is</code>), every component that reads that context re-renders — even if it uses one field that didn't change, and even through <code>memo</code>. There is no built-in selector.",
          ar: "لما الـ <code>value</code> بتاع الـ provider يبقى object مختلف (<code>Object.is</code>)، كل component بيقرا الـ context ده بيعمل re-render — حتى لو بيستخدم field واحد متغيرش، وحتى من ورا <code>memo</code>. ومفيش selector جاهز."
        }
      },
      {
        title: { en: "Stable values and split contexts", ar: "قيم ثابتة و contexts متقسمة" },
        body: {
          en: "Memoise the provider value so parent renders don't create a new object. Split rarely-changing parts (actions, <code>dispatch</code>) from often-changing ones (state), so components that only trigger updates don't re-render on every change.",
          ar: "اعمل memo لقيمة الـ provider علشان الـ renders بتاعة الـ parent متعملش object جديد. وقسّم الأجزاء اللي نادرًا ما بتتغير (الأكشنز، <code>dispatch</code>) عن اللي بتتغير كتير (الـ state)، علشان الـ components اللي بتعمل تحديثات بس متعملش re-render مع كل تغيير."
        },
        code: "const StateCtx = createContext(null);\nconst ActionsCtx = createContext(null);\n\nfunction CartProvider({ children }) {\n  const [items, dispatch] = useReducer(cartReducer, []);\n  const actions = useMemo(() => ({ add: (p) => dispatch({ type: \"add\", p }) }), []);\n  return (\n    <ActionsCtx value={actions}>      {/* React 19: <Context> as provider */}\n      <StateCtx value={items}>{children}</StateCtx>\n    </ActionsCtx>\n  );\n}",
        run: "browser"
      }
    ],
    breaks: [
      {
        title: { en: "One big AppContext", ar: "AppContext واحد كبير" },
        body: {
          en: "User, theme, cart, filters and notifications in one value: a toast re-renders the whole app.",
          ar: "الـ user والـ theme والـ cart والـ filters والـ notifications في قيمة واحدة: toast واحد بيعمل re-render للـ app كله."
        },
        fix: { en: "One context per concern; keep context for low-frequency data (auth, theme, locale, feature flags).", ar: "context لكل حاجة لوحدها؛ وخلي الـ context للداتا اللي مش بتتغير كتير (auth، theme، locale، feature flags)." }
      },
      {
        title: { en: "A new value object every render", ar: "value object جديد كل render" },
        body: {
          en: "<code>&lt;Ctx value={{ user, logout }}&gt;</code> creates a new object whenever the provider's parent renders, so all consumers re-render even when nothing changed.",
          ar: "<code>&lt;Ctx value={{ user, logout }}&gt;</code> بيعمل object جديد كل ما الـ parent بتاع الـ provider يعمل render، فكل الـ consumers بيعملوا re-render حتى لو مفيش حاجة اتغيرت."
        },
        fix: { en: "<code>useMemo</code> the value with its real deps, and keep callbacks stable.", ar: "اعمل <code>useMemo</code> للقيمة بالـ deps الحقيقية بتاعتها، وخلي الـ callbacks ثابتة." }
      },
      {
        title: { en: "High-frequency state in context", ar: "state بيتغير كتير في context" },
        body: {
          en: "Mouse position, a form being typed into, a live price feed: every update re-renders every consumer.",
          ar: "مكان الماوس، أو فورم بيتكتب فيه، أو أسعار لايف: كل تحديث بيعمل re-render لكل consumer."
        },
        fix: { en: "Use a store with selectors (Zustand, Redux, or <code>useSyncExternalStore</code>) so each component re-renders only when its slice changes; or keep that state local.", ar: "استخدم store بـ selectors (Zustand، أو Redux، أو <code>useSyncExternalStore</code>) علشان كل component يعمل re-render بس لما الجزء بتاعه يتغير؛ أو خلي الـ state ده محلي." }
      }
    ],
    levels: [
      {
        q: "Context or a state library?",
        mid: { en: "Context for simple global state; Redux or Zustand for complex state.", ar: "Context للـ global state البسيط؛ و Redux أو Zustand للـ state المعقد." },
        senior: {
          en: "Context is dependency injection, not a store: it re-renders every consumer on any change and has no selectors. I use it for low-frequency values — auth, theme, locale, a token for a socket — with memoised values and split contexts. For client state that changes often or is read in many places, a store with selectors (Zustand) re-renders only the components whose slice changed. And server data goes to TanStack Query, not either. In okoRent that's exactly the split: a small context passes the token to SignalR, Zustand holds the rest.",
          ar: "الـ Context عبارة عن dependency injection، مش store: بيعمل re-render لكل consumer مع أي تغيير ومفيهوش selectors. بستخدمه للقيم اللي مش بتتغير كتير — auth، و theme، و locale، و token لـ socket — مع values معمول لها memo و contexts متقسمة. وللـ client state اللي بيتغير كتير أو بيتقرا في أماكن كتير، store بـ selectors (Zustand) بيعمل re-render بس للـ components اللي الجزء بتاعها اتغير. وداتا السيرفر بتروح لـ TanStack Query، مش ده ولا ده. وفي okoRent ده التقسيم بالظبط: context صغير بيعدّي الـ token لـ SignalR، و Zustand شايل الباقي."
        }
      },
      {
        q: "Why are all my context consumers re-rendering?",
        mid: { en: "Because the context value changes.", ar: "لأن قيمة الـ context بتتغير." },
        senior: {
          en: "Usually the value is a new object each render of the provider's parent — memoise it. If it really changes often, consumers that read one field still re-render because context has no selectors: split the context by how often parts change, separate actions from state, or move that state into a store with selectors. <code>memo</code> on consumers doesn't help — context updates go through it.",
          ar: "غالبًا القيمة object جديد مع كل render للـ parent بتاع الـ provider — اعمل لها memo. ولو فعلًا بتتغير كتير، الـ consumers اللي بتقرا field واحد برضه بتعمل re-render لأن الـ context ملوش selectors: قسّم الـ context حسب الأجزاء بتتغير قد إيه، وافصل الأكشنز عن الـ state، أو انقل الـ state ده لـ store بـ selectors. و <code>memo</code> على الـ consumers مش بيفيد — تحديثات الـ context بتعدّي من خلاله."
        }
      }
    ],
    drill: [
      {
        q: "Does React.memo stop a context-driven re-render?",
        a: { en: "No. A component that reads the context re-renders when the value changes, memo or not.", ar: "لأ. الـ component اللي بيقرا الـ context بيعمل re-render لما القيمة تتغير، memo ولا مش memo." },
        follow: [
          {
            q: "How can a component subscribe to just part of a context?",
            a: { en: "Not with context alone. Split it into smaller contexts, or read from an external store through a selector.", ar: "مش بالـ context لوحده. قسّمه لـ contexts أصغر، أو اقرا من external store عن طريق selector." },
            follow: [
              {
                q: "How does Zustand avoid the problem?",
                a: { en: "Each component subscribes with a selector through <code>useSyncExternalStore</code>; on a change, Zustand compares that component's selected slice and re-renders only if it changed.", ar: "كل component بيعمل subscribe بـ selector عن طريق <code>useSyncExternalStore</code>؛ ومع أي تغيير، Zustand بيقارن الجزء اللي الـ component ده مختاره ويعمل re-render بس لو اتغير." }
              }
            ]
          }
        ]
      }
    ],
    story: {
      text: { en: "Smart FAQ's UnsavedChangesProvider memoises { anyUnsaved, mark } with a stable mark callback; okoRent uses a small context only to pass the token to SignalR, with Zustand for the rest.", ar: "الـ UnsavedChangesProvider في Smart FAQ بيعمل memo لـ { anyUnsaved, mark } ومعاه callback ثابت لـ mark؛ و okoRent بيستخدم context صغير بس علشان يعدّي الـ token لـ SignalR، و Zustand للباقي." },
      p: "okorent", tab: "decisions", label: "okoRent"
    },
    sources: [
      { label: "react.dev — useContext", url: "https://react.dev/reference/react/useContext" },
      { label: "react.dev — Scaling up with reducer and context", url: "https://react.dev/learn/scaling-up-with-reducer-and-context" },
      { label: "Zustand — Introduction", url: "https://zustand.docs.pmnd.rs/getting-started/introduction" }
    ]
  },

  "transition-deferred": {
    why: {
      en: "These hooks test whether you understand priorities, not just syntax: what stays urgent, what can wait, and why <code>useDeferredValue</code> is not a debounce.",
      ar: "الـ hooks دي بتختبر إنك فاهم الأولويات، مش الـ syntax بس: إيه اللي يفضل مستعجل، وإيه اللي ينفع يستنى، وليه <code>useDeferredValue</code> مش debounce."
    },
    how: [
      {
        title: { en: "useTransition marks updates as non-urgent", ar: "الـ useTransition بيعلّم التحديثات إنها مش مستعجلة" },
        body: {
          en: "<code>const [isPending, startTransition] = useTransition()</code>. Updates inside <code>startTransition</code> render in the background and can be interrupted by urgent ones; <code>isPending</code> lets you dim the old UI. In React 19 the function can be async (an Action) and <code>isPending</code> stays true until it finishes.",
          ar: "<code>const [isPending, startTransition] = useTransition()</code>. التحديثات جوه <code>startTransition</code> بتترسم في الخلفية وينفع تتقطع بالتحديثات المستعجلة؛ و <code>isPending</code> بيخليك تبهّت الـ UI القديم. وفي React 19 الـ function ينفع تبقى async (Action) و <code>isPending</code> يفضل true لحد ما تخلص."
        },
        code: "const [isPending, startTransition] = useTransition();\nfunction selectTab(next) {\n  startTransition(() => setTab(next));   // old tab stays interactive while the new one renders\n}\nreturn <div style={{ opacity: isPending ? 0.6 : 1 }}>{tab === \"reports\" ? <Reports /> : <Overview />}</div>;",
        run: "browser"
      },
      {
        title: { en: "useDeferredValue gives you a value that lags behind", ar: "الـ useDeferredValue بيديك قيمة متأخرة شوية" },
        body: {
          en: "When you don't own the state update (it's a prop or comes from an input), <code>useDeferredValue(value)</code> returns the old value first, then re-renders in the background with the new one. Pair it with a <code>memo</code> child so the urgent render can skip the heavy part.",
          ar: "لما التحديث مش بتاعك (prop أو جاي من input)، <code>useDeferredValue(value)</code> بيرجّع القيمة القديمة الأول، وبعدين يعمل re-render في الخلفية بالجديدة. وخليه مع child معمول له <code>memo</code> علشان الـ render المستعجل يقدر يتخطى الجزء التقيل."
        },
        code: "const deferredQuery = useDeferredValue(query);\nconst isStale = query !== deferredQuery;\nreturn (\n  <>\n    <input value={query} onChange={(e) => setQuery(e.target.value)} />\n    <div style={{ opacity: isStale ? 0.6 : 1 }}><SlowList query={deferredQuery} /></div>  {/* SlowList = memo(...) */}\n  </>\n);",
        run: "browser"
      },
      {
        title: { en: "Not a debounce", ar: "مش debounce" },
        body: {
          en: "A debounce waits a fixed time and still blocks when it fires. Deferred rendering has no fixed delay: on a fast device it's almost instant, on a slow one it waits, and typing interrupts it. Use debounce to reduce <b>network requests</b>; use deferred values or transitions to keep <b>rendering</b> from blocking input.",
          ar: "الـ debounce بيستنى وقت ثابت وبرضه بيوقف الصفحة لما يشتغل. والـ deferred rendering ملوش وقت ثابت: على جهاز سريع تقريبًا فوري، وعلى جهاز بطيء بيستنى، والكتابة بتقطعه. استخدم الـ debounce علشان تقلل <b>الـ network requests</b>؛ واستخدم الـ deferred values أو الـ transitions علشان <b>الـ render</b> ميوقفش الـ input."
        }
      }
    ],
    breaks: [
      {
        title: { en: "Deferring without memo", ar: "deferring من غير memo" },
        body: {
          en: "If the heavy child isn't memoised, the urgent render (with the old deferred value) renders it anyway, so nothing gets faster.",
          ar: "لو الـ child التقيل مش معمول له memo، الـ render المستعجل (بالقيمة القديمة) هيعمله render كده كده، فمفيش حاجة هتبقى أسرع."
        },
        fix: { en: "Wrap the slow part in <code>memo</code> and pass it the deferred value.", ar: "لف الجزء البطيء في <code>memo</code> وابعتله القيمة المتأخرة." }
      },
      {
        title: { en: "Putting the input's own state in a transition", ar: "حط الـ state بتاع الـ input نفسه في transition" },
        body: {
          en: "A controlled input must update urgently, or characters lag and the cursor jumps.",
          ar: "الـ controlled input لازم يتحدث بشكل مستعجل، وإلا الحروف تتأخر والـ cursor ينط."
        },
        fix: { en: "Keep two states (or one state plus a deferred copy): the input text urgent, the filter for results in a transition.", ar: "خلي two states (أو state ونسخة متأخرة منه): نص الـ input مستعجل، والفلتر بتاع النتايج في transition." }
      },
      {
        title: { en: "Using transitions to stop request spam", ar: "استخدام الـ transitions علشان توقف كترة الـ requests" },
        body: {
          en: "Transitions control rendering, not fetching. A query per keystroke is still sent.",
          ar: "الـ transitions بتتحكم في الـ render، مش الـ fetching. فـ query مع كل حرف لسه بيتبعت."
        },
        fix: { en: "Debounce the value that goes into the query key (Smart FAQ has a tested <code>useDebouncedValue</code>), and let the data library cancel old requests.", ar: "اعمل debounce للقيمة اللي داخلة في الـ query key (Smart FAQ فيه <code>useDebouncedValue</code> عليه tests)، وسيب مكتبة الداتا تلغي الـ requests القديمة." }
      }
    ],
    levels: [
      {
        q: "useTransition vs useDeferredValue?",
        mid: { en: "Both make updates lower priority; <code>useTransition</code> wraps the state update, <code>useDeferredValue</code> wraps a value.", ar: "الاتنين بيقللوا أولوية التحديثات؛ <code>useTransition</code> بيلف الـ state update، و <code>useDeferredValue</code> بيلف قيمة." },
        senior: {
          en: "Same mechanism, different access. If I own the update, <code>startTransition</code> marks it non-urgent and gives me <code>isPending</code>; in React 19 it can wrap an async action. If I only receive a value — a prop, a search string — <code>useDeferredValue</code> gives me a lagging copy to render the expensive part with, and a memoised child makes the urgent render cheap. Either way, urgent input stays responsive and the background render is interruptible.",
          ar: "نفس الآلية، بس طريقة وصول مختلفة. لو التحديث بتاعي، <code>startTransition</code> بيعلّمه إنه مش مستعجل وبيديني <code>isPending</code>؛ وفي React 19 ينفع يلف async action. ولو أنا بستقبل قيمة بس — prop أو نص search — <code>useDeferredValue</code> بيديني نسخة متأخرة أرسم بيها الجزء الغالي، و child معمول له memo بيخلي الـ render المستعجل رخيص. وفي الحالتين، الـ input المستعجل بيفضل سريع، والـ render اللي في الخلفية ينفع يتقطع."
        }
      }
    ],
    drill: [
      {
        q: "Why is useDeferredValue better than a debounce for slow rendering?",
        a: { en: "No fixed delay, adapts to the device, and it's interruptible — typing never waits for a render to finish.", ar: "ملوش وقت ثابت، وبيتأقلم مع الجهاز، وينفع يتقطع — الكتابة عمرها ما بتستنى render يخلص." },
        follow: [
          {
            q: "So do you never debounce?",
            a: { en: "I still debounce work that leaves the browser — requests, analytics, saves — because those have a cost per call.", ar: "لسه بعمل debounce للشغل اللي بيخرج برّه المتصفح — requests، و analytics، و saves — لأن ليهم تمن مع كل نداء." },
            follow: [
              {
                q: "What does the user see while a transition renders?",
                a: { en: "The previous UI, still interactive. Use <code>isPending</code> (or compare value vs deferred value) to dim it or show a small indicator; Suspense fallbacks don't replace content that's already visible.", ar: "الـ UI اللي قبله، ولسه ينفع يتفاعل معاه. استخدم <code>isPending</code> (أو قارن القيمة بالنسخة المتأخرة) علشان تبهّته أو تعرض مؤشر صغير؛ والـ Suspense fallbacks مش بتشيل المحتوى اللي ظاهر." }
              }
            ]
          }
        ]
      }
    ],
    sources: [
      { label: "react.dev — useTransition", url: "https://react.dev/reference/react/useTransition" },
      { label: "react.dev — useDeferredValue", url: "https://react.dev/reference/react/useDeferredValue" },
      { label: "react.dev — startTransition", url: "https://react.dev/reference/react/startTransition" }
    ]
  },

  "usesyncexternalstore-useid": {
    why: {
      en: "<code>useSyncExternalStore</code> shows you understand how state libraries plug into React safely; <code>useId</code> shows you care about accessibility and SSR. Both are small APIs with sharp edges.",
      ar: "<code>useSyncExternalStore</code> بيبيّن إنك فاهم مكتبات الـ state بتتركب في React بأمان إزاي؛ و <code>useId</code> بيبيّن إنك مهتم بالـ accessibility والـ SSR. الاتنين APIs صغيرة بس ليها حواف حادة."
    },
    how: [
      {
        title: { en: "subscribe + getSnapshot", ar: "subscribe + getSnapshot" },
        body: {
          en: "<code>useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)</code>: React calls <code>subscribe(callback)</code> once, calls <code>getSnapshot()</code> during render, and re-renders when the callback fires and the snapshot changed (<code>Object.is</code>). It's concurrent-safe: no tearing.",
          ar: "<code>useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)</code>: React بينادي <code>subscribe(callback)</code> مرة، وبينادي <code>getSnapshot()</code> وقت الـ render، ويعمل re-render لما الـ callback يتنادى والـ snapshot يتغير (<code>Object.is</code>). وهو آمن مع الـ concurrent rendering: مفيش tearing."
        },
        code: "function subscribe(cb) {\n  window.addEventListener(\"online\", cb);\n  window.addEventListener(\"offline\", cb);\n  return () => { window.removeEventListener(\"online\", cb); window.removeEventListener(\"offline\", cb); };\n}\nexport function useOnline() {\n  return useSyncExternalStore(subscribe, () => navigator.onLine, () => true);\n}",
        run: "browser"
      },
      {
        title: { en: "A tiny store in plain JS", ar: "store صغير بـ JS عادي" },
        body: {
          en: "Any object with “get the current immutable value” and “tell me when it changes” works with the hook. Replace the value on change — never mutate it — so the snapshot reference changes exactly when the data does.",
          ar: "أي object فيه «هات القيمة الحالية immutable» و «قولي لما تتغير» بيشتغل مع الـ hook. بدّل القيمة لما تتغير — عمرك ما تعدّلها — علشان الـ reference بتاع الـ snapshot يتغير بالظبط لما الداتا تتغير."
        },
        code: "function createStore(initial) {\n  let state = initial;\n  const listeners = new Set();\n  return {\n    get: () => state,\n    set: (next) => { state = { ...state, ...next }; listeners.forEach((l) => l()); },\n    subscribe: (l) => { listeners.add(l); return () => listeners.delete(l); },\n  };\n}\nconst toasts = createStore({ items: [] });\nconst before = toasts.get();\ntoasts.subscribe(() => console.log(\"changed:\", toasts.get().items.length));\ntoasts.set({ items: [\"Saved\"] });\nconsole.log(before === toasts.get());",
        out: "changed: 1\nfalse",
        run: "node"
      },
      {
        title: { en: "useId: stable ids for accessibility", ar: "useId: ids ثابتة للـ accessibility" },
        body: {
          en: "<code>useId()</code> returns an id that is unique per component instance and identical on server and client, so <code>htmlFor</code>, <code>aria-describedby</code> and <code>aria-labelledby</code> don't cause hydration mismatches. Derive several ids from one: <code>`${id}-hint`</code>.",
          ar: "<code>useId()</code> بيرجّع id مش متكرر لكل instance، وهو هو على السيرفر والـ client، فـ <code>htmlFor</code> و <code>aria-describedby</code> و <code>aria-labelledby</code> مش بيعملوا hydration mismatch. واعمل كذا id من واحد: <code>`${id}-hint`</code>."
        },
        code: "const id = useId();\nreturn (\n  <>\n    <label htmlFor={id}>Password</label>\n    <input id={id} type=\"password\" aria-describedby={`${id}-hint`} />\n    <p id={`${id}-hint`}>At least 12 characters.</p>\n  </>\n);",
        run: "browser"
      }
    ],
    breaks: [
      {
        title: { en: "getSnapshot returns a new object every call", ar: "getSnapshot بيرجّع object جديد كل مرة" },
        body: {
          en: "<code>() =&gt; ({ ...store.state })</code> is never <code>Object.is</code>-equal, so React thinks the store keeps changing and re-renders forever (“The result of getSnapshot should be cached”).",
          ar: "<code>() =&gt; ({ ...store.state })</code> عمره ما هيبقى <code>Object.is</code>-equal، فـ React بيفتكر إن الـ store بيتغير على طول ويعمل re-render للأبد («The result of getSnapshot should be cached»)."
        },
        fix: { en: "Return the stored immutable value itself, or a primitive; compute derived objects with a memoised selector.", ar: "رجّع القيمة الـ immutable المتخزنة نفسها، أو primitive؛ واحسب الـ objects المشتقة بـ selector معمول له memo." }
      },
      {
        title: { en: "subscribe defined inside the component", ar: "subscribe متعرّف جوه الـ component" },
        body: {
          en: "A new <code>subscribe</code> function each render makes React unsubscribe and subscribe again on every render.",
          ar: "function <code>subscribe</code> جديدة كل render بتخلي React يعمل unsubscribe و subscribe تاني مع كل render."
        },
        fix: { en: "Define it outside the component (or memoise it with the deps it really needs).", ar: "عرّفها برّه الـ component (أو اعمل لها memo بالـ deps اللي فعلًا محتاجاها)." }
      },
      {
        title: { en: "useId as a list key", ar: "useId كـ key لـ list" },
        body: {
          en: "<code>useId</code> identifies a component instance, not a data item, and keys must come from the data.",
          ar: "الـ <code>useId</code> بيعرّف instance لـ component، مش عنصر في الداتا، والـ keys لازم تيجي من الداتا."
        },
        fix: { en: "Keys from data ids; <code>useId</code> only for DOM id attributes.", ar: "الـ keys من ids الداتا؛ و <code>useId</code> بس لـ attributes الـ id في الـ DOM." }
      }
    ],
    levels: [
      {
        q: "Why useSyncExternalStore instead of useEffect + useState for a store?",
        mid: { en: "It's the official hook for subscribing to external stores.", ar: "هو الـ hook الرسمي للـ subscribe لـ external stores." },
        senior: {
          en: "The effect version subscribes after paint, so the first render can show a stale value and then flash; and during concurrent rendering, different components can read the store at different moments and tear. <code>useSyncExternalStore</code> reads during render, re-checks before commit, and forces a consistent synchronous update when the store changes — plus <code>getServerSnapshot</code> for SSR. Smart FAQ uses it six times (toasts, a session-expired flag, media queries) instead of adding a store library.",
          ar: "النسخة بالـ effect بتعمل subscribe بعد الرسم، فأول render ممكن يعرض قيمة قديمة وبعدين تتغير فجأة؛ ومع الـ concurrent rendering، components مختلفة ممكن تقرا الـ store في لحظات مختلفة ويحصل tearing. لكن <code>useSyncExternalStore</code> بيقرا وقت الـ render، ويتأكد تاني قبل الـ commit، ويجبر تحديث متسق من غير توقف لما الـ store يتغير — وفيه كمان <code>getServerSnapshot</code> للـ SSR. و Smart FAQ بيستخدمه 6 مرات (toasts، و flag للـ session-expired، و media queries) بدل ما يضيف مكتبة store."
        }
      }
    ],
    drill: [
      {
        q: "What must getSnapshot return?",
        a: { en: "The same value (by <code>Object.is</code>) as long as the store hasn't changed — an immutable object or a primitive.", ar: "نفس القيمة (بـ <code>Object.is</code>) طول ما الـ store متغيرش — object immutable أو primitive." },
        follow: [
          {
            q: "What happens if it doesn't?",
            a: { en: "React sees a “change” on every check and re-renders in a loop; in development it warns that the result should be cached.", ar: "React بيشوف «تغيير» مع كل check ويعمل re-render في loop؛ وفي الـ development بيحذّر إن النتيجة لازم تتعمل لها cache." },
            follow: [
              {
                q: "And on the server?",
                a: { en: "Provide <code>getServerSnapshot</code>; it's used for SSR and for hydration, so the first client render matches the HTML. Without it, the component can't render on the server.", ar: "ادي <code>getServerSnapshot</code>؛ وده بيتستخدم في الـ SSR والـ hydration، علشان أول render على الـ client يطابق الـ HTML. ومن غيره الـ component مش هيقدر يعمل render على السيرفر." }
              }
            ]
          }
        ]
      }
    ],
    story: {
      text: { en: "Smart FAQ uses useSyncExternalStore 6 times — toast store, session-expired flag, media queries — instead of adding Zustand, and useId 6 times for label wiring.", ar: "Smart FAQ بيستخدم useSyncExternalStore 6 مرات — store للـ toasts، و flag للـ session-expired، و media queries — بدل ما يضيف Zustand، و useId 6 مرات لربط الـ labels." },
      p: "smartfaq", tab: "hooks", label: "Smart FAQ"
    },
    sources: [
      { label: "react.dev — useSyncExternalStore", url: "https://react.dev/reference/react/useSyncExternalStore" },
      { label: "react.dev — useId", url: "https://react.dev/reference/react/useId" },
      { label: "react.dev — useDebugValue", url: "https://react.dev/reference/react/useDebugValue" }
    ]
  },

  "custom-hooks": {
    why: {
      en: "Custom hooks show how you structure a codebase. Expect questions on the Rules of Hooks (and <b>why</b> they exist), what a good hook API looks like, and how you test one.",
      ar: "الـ custom hooks بتبيّن إنت بتنظّم الكود إزاي. استنى أسئلة عن قواعد الـ Hooks (و<b>ليه</b> موجودة)، وشكل الـ API الكويس للـ hook، وبتعمل له test إزاي."
    },
    how: [
      {
        title: { en: "Hooks share logic, not state", ar: "الـ hooks بتشارك منطق، مش state" },
        body: {
          en: "A custom hook is a function that calls other hooks. Each component that calls it gets its <b>own</b> state and effects. To share state itself, lift it up, put it in context or a store.",
          ar: "الـ custom hook عبارة عن function بتنادي hooks تانية. وكل component بيناديها بياخد state و effects <b>بتوعه هو</b>. ولو عايز تشارك الـ state نفسه، ارفعه لفوق، أو حطه في context أو store."
        }
      },
      {
        title: { en: "Why the Rules of Hooks exist: state is stored by call order", ar: "ليه قواعد الـ Hooks موجودة: الـ state بيتخزن بترتيب النداء" },
        body: {
          en: "React keeps a list of hook slots per component and matches each call to a slot by <b>order</b>. Call a hook conditionally and every hook after it reads the wrong slot. This plain-JS model shows the mix-up:",
          ar: "React بيحتفظ بليستة خانات للـ hooks لكل component، وبيطابق كل نداء بخانة <b>بالترتيب</b>. لو ناديت hook بشرط، كل hook بعده هيقرا الخانة الغلط. والموديل ده بـ JS عادي بيوضح اللخبطة:"
        },
        code: "let slots = [], i = 0;\nfunction useState(init) {\n  const k = i++;\n  if (!(k in slots)) slots[k] = init;\n  return [slots[k], (v) => { slots[k] = v; }];\n}\nfunction render(showExtra) {\n  i = 0;\n  const [a] = useState(\"a\");\n  if (showExtra) useState(\"extra\");   // conditional hook\n  const [b] = useState(\"b\");\n  return a + \",\" + b;\n}\nconsole.log(render(true));\nconsole.log(render(false));          // b now reads the \"extra\" slot",
        out: "a,b\na,extra",
        run: "node"
      },
      {
        title: { en: "A good hook API", ar: "API كويس للـ hook" },
        body: {
          en: "Name it <code>use…</code> (so the linter applies the rules), accept an options object, return the smallest useful API (a tuple for two values, an object for more), keep returned functions stable, clean up everything it starts, and keep it focused — <code>useUrlFilters</code>, not <code>usePage</code>.",
          ar: "سمّيه <code>use…</code> (علشان الـ linter يطبّق القواعد)، وخليه ياخد options object، ويرجّع أصغر API مفيد (tuple لو قيمتين، و object لو أكتر)، ويخلي الـ functions اللي بيرجّعها ثابتة، ويعمل cleanup لكل حاجة بيبدأها، ويبقى مركّز — <code>useUrlFilters</code> مش <code>usePage</code>."
        },
        code: "export function useDebouncedValue(value, delay = 300) {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const id = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(id);\n  }, [value, delay]);\n  return debounced;\n}",
        run: "browser"
      },
      {
        title: { en: "Testing hooks", ar: "اختبار الـ hooks" },
        body: {
          en: "Test through behaviour: <code>renderHook</code> from Testing Library with fake timers for time-based hooks, or a tiny test component when the hook's purpose is UI. Test the contract (what it returns and when), not its internals.",
          ar: "اختبر من خلال السلوك: <code>renderHook</code> من Testing Library مع fake timers للـ hooks المعتمدة على الوقت، أو component صغير للـ test لما الـ hook هدفه UI. اختبر الاتفاق (بيرجّع إيه وإمتى)، مش اللي جواه."
        },
        code: "test(\"updates after the delay\", () => {\n  vi.useFakeTimers();\n  const { result, rerender } = renderHook(({ v }) => useDebouncedValue(v, 300), { initialProps: { v: \"a\" } });\n  rerender({ v: \"ab\" });\n  expect(result.current).toBe(\"a\");\n  act(() => vi.advanceTimersByTime(300));\n  expect(result.current).toBe(\"ab\");\n});",
        run: "browser"
      }
    ],
    breaks: [
      {
        title: { en: "Returning new objects and functions every render", ar: "بيرجّع objects و functions جديدة كل render" },
        body: {
          en: "<code>return { data, refresh: () =&gt; load() }</code> gives callers a new <code>refresh</code> every render, which breaks their effects and memoised children.",
          ar: "<code>return { data, refresh: () =&gt; load() }</code> بيدي اللي بيستخدمه <code>refresh</code> جديدة كل render، وده بيبوّظ الـ effects بتاعتهم والـ children المعمول لها memo."
        },
        fix: { en: "Wrap returned functions in <code>useCallback</code> (or a latest ref) and the returned object in <code>useMemo</code> when callers depend on identity.", ar: "لف الـ functions اللي بترجع في <code>useCallback</code> (أو latest ref) والـ object اللي بيرجع في <code>useMemo</code> لما اللي بيستخدموه معتمدين على الـ identity." }
      },
      {
        title: { en: "The god hook", ar: "الـ hook اللي بيعمل كل حاجة" },
        body: {
          en: "One <code>usePageLogic</code> with fetching, form state, URL sync and analytics: hard to test, re-renders everything that uses any part of it, and can't be reused.",
          ar: "<code>usePageLogic</code> واحد فيه fetching و form state و URL sync و analytics: صعب يتعمل له test، وبيعمل re-render لأي حاجة بتستخدم أي جزء منه، ومينفعش يتستخدم تاني."
        },
        fix: { en: "Split by concern; compose small hooks in the component.", ar: "قسّمه حسب كل حاجة؛ وركّب hooks صغيرة جوه الـ component." }
      },
      {
        title: { en: "Effects hidden inside hooks without cleanup", ar: "effects مستخبية جوه hooks من غير cleanup" },
        body: {
          en: "A hook that adds a listener or timer looks harmless at the call site; if it doesn't clean up, every component using it leaks.",
          ar: "الـ hook اللي بيضيف listener أو timer شكله بريء من مكان النداء؛ ولو مش بيعمل cleanup، كل component بيستخدمه بيعمل leak."
        },
        fix: { en: "Every effect in a shared hook returns a cleanup; test mount/unmount.", ar: "كل effect في hook مشترك لازم يرجّع cleanup؛ واختبر الـ mount والـ unmount." }
      }
    ],
    levels: [
      {
        q: "Why can't hooks be called conditionally?",
        mid: { en: "It's a rule of React: always call hooks at the top level, in the same order.", ar: "دي قاعدة في React: نادي الـ hooks دايمًا في أول مستوى، بنفس الترتيب." },
        senior: {
          en: "Because React identifies a hook by its position in the call order, not by a name: each component has a list of hook slots, and the n-th call reads the n-th slot. A condition or early return changes the order, so later hooks read another hook's state. The <code>use</code> prefix lets the lint plugin find hooks and enforce this. The only exception is <code>use()</code> in React 19, which isn't stored in a slot and may be called conditionally.",
          ar: "لأن React بيعرف الـ hook بمكانه في ترتيب النداء، مش باسم: كل component ليه ليستة خانات للـ hooks، والنداء رقم n بيقرا الخانة رقم n. ولو فيه شرط أو return بدري، الترتيب بيتغير، فالـ hooks اللي بعدها بتقرا state بتاع hook تاني. والبادئة <code>use</code> بتخلي الـ lint plugin يلاقي الـ hooks ويطبّق ده. والاستثناء الوحيد <code>use()</code> في React 19، لأنه مش بيتخزن في خانة وينفع يتنادى بشرط."
        }
      },
      {
        q: "What makes a custom hook well designed?",
        mid: { en: "It's reusable and starts with <code>use</code>.", ar: "بيتستخدم تاني وبيبدأ بـ <code>use</code>." },
        senior: {
          en: "One responsibility, a small stable API, options instead of many positional parameters, stable returned functions, cleanup for everything it starts, and tests for its contract. In Smart FAQ that's <code>useUrlFilters</code>, <code>useDebouncedValue</code> (with tests), <code>useSlashShortcut</code>, <code>useRetryAfter</code>; in AHS each domain module exposes query hooks like <code>useGetOrderDetails</code>, so components never see endpoints or cache keys.",
          ar: "مسؤولية واحدة، و API صغير وثابت، و options بدل parameters كتير بالترتيب، و functions ثابتة بترجع، و cleanup لكل حاجة بيبدأها، و tests للاتفاق بتاعه. وفي Smart FAQ ده زي <code>useUrlFilters</code> و <code>useDebouncedValue</code> (بـ tests) و <code>useSlashShortcut</code> و <code>useRetryAfter</code>؛ وفي AHS كل domain module بيكشف query hooks زي <code>useGetOrderDetails</code>، فالـ components عمرها ما بتشوف endpoints أو cache keys."
        }
      }
    ],
    drill: [
      {
        q: "Do two components using the same custom hook share state?",
        a: { en: "No. Each call has its own state and effects; only the logic is shared.", ar: "لأ. كل نداء ليه state و effects بتوعه؛ المنطق بس هو اللي مشترك." },
        follow: [
          {
            q: "Then how would you share it?",
            a: { en: "Lift state to a common parent, put it in context (low-frequency) or a store with selectors (high-frequency), or for server data use the query cache — two <code>useQuery</code> calls with the same key share one cache entry.", ar: "ارفع الـ state لـ parent مشترك، أو حطه في context (لو مش بيتغير كتير) أو store بـ selectors (لو بيتغير كتير)، ولو داتا سيرفر استخدم الـ query cache — اتنين <code>useQuery</code> بنفس الـ key بيشاركوا entry واحد في الـ cache." }
          }
        ]
      }
    ],
    story: {
      text: { en: "Smart FAQ: useUrlFilters, useDebouncedValue (with tests), useSlashShortcut, useStoredFlag, useRetryAfter, useUnsavedChanges. AHS: 25 domain query modules exposing hooks like useGetOrderDetails.", ar: "Smart FAQ: useUrlFilters و useDebouncedValue (بـ tests) و useSlashShortcut و useStoredFlag و useRetryAfter و useUnsavedChanges. و AHS: 25 domain query module بيكشفوا hooks زي useGetOrderDetails." },
      p: "smartfaq", tab: "hooks", label: "Smart FAQ"
    },
    sources: [
      { label: "react.dev — Reusing logic with custom hooks", url: "https://react.dev/learn/reusing-logic-with-custom-hooks" },
      { label: "react.dev — Rules of Hooks", url: "https://react.dev/reference/rules/rules-of-hooks" },
      { label: "Testing Library — renderHook", url: "https://testing-library.com/docs/react-testing-library/api/#renderhook" }
    ]
  },

  "tanstack-hooks": {
    why: {
      en: "Most of his projects use TanStack Query, so expect deep follow-ups: cache keys, stale vs garbage-collected data, invalidation vs direct updates, optimistic updates and their rollback.",
      ar: "أغلب مشاريعه بتستخدم TanStack Query، فاستنى أسئلة عميقة: الـ cache keys، والداتا الـ stale قصاد اللي اتمسحت من الـ cache، والـ invalidation قصاد التحديث المباشر، والـ optimistic updates والرجوع فيها."
    },
    how: [
      {
        title: { en: "Server state is a cache keyed by the query key", ar: "الـ server state عبارة عن cache متخزن بالـ query key" },
        body: {
          en: "<code>useQuery({ queryKey, queryFn })</code> reads from a shared cache. The key is the identity of the data: every parameter the fetch depends on must be in it (<code>[\"orders\", { status, page }]</code>). Two components with the same key share one request and one cache entry.",
          ar: "<code>useQuery({ queryKey, queryFn })</code> بيقرا من cache مشترك. والـ key هو هوية الداتا: أي parameter الـ fetch معتمد عليه لازم يبقى فيه (<code>[\"orders\", { status, page }]</code>). واتنين components بنفس الـ key بيشاركوا request واحد و entry واحد في الـ cache."
        }
      },
      {
        title: { en: "staleTime vs gcTime", ar: "staleTime قصاد gcTime" },
        body: {
          en: "<code>staleTime</code> (default 0): how long data counts as fresh — fresh data is served without refetching. <code>gcTime</code> (default 5 minutes): how long an <b>unused</b> entry stays in memory after its last observer unmounts. Stale data is still shown instantly, then refetched in the background on mount, window focus or reconnect.",
          ar: "<code>staleTime</code> (افتراضيًا 0): الداتا تفضل fresh قد إيه — والداتا الـ fresh بتتعرض من غير refetch. و <code>gcTime</code> (افتراضيًا 5 دقايق): الـ entry اللي <b>محدش بيستخدمه</b> يفضل في الذاكرة قد إيه بعد ما آخر observer يتشال. والداتا الـ stale بتتعرض على طول برضه، وبعدين بيتعمل لها refetch في الخلفية مع الـ mount أو الـ window focus أو الـ reconnect."
        }
      },
      {
        title: { en: "After a mutation: invalidate or set", ar: "بعد الـ mutation: invalidate ولا set" },
        body: {
          en: "<code>invalidateQueries</code> marks matching keys stale and refetches the active ones — simple and always correct. <code>setQueryData</code> writes the server's response straight into the cache — no extra request, but you must get the shape right. Optimistic updates write first, keep a snapshot, and roll back on error.",
          ar: "<code>invalidateQueries</code> بيعلّم الـ keys اللي بتطابق إنها stale ويعمل refetch للي شغالين — بسيط ودايمًا صح. و <code>setQueryData</code> بيكتب رد السيرفر في الـ cache على طول — من غير request زيادة، بس لازم الشكل يبقى مظبوط. والـ optimistic updates بتكتب الأول، وتحتفظ بـ snapshot، وترجع فيه لو حصل error."
        },
        code: "useMutation({\n  mutationFn: toggleDone,\n  onMutate: async (id) => {\n    await qc.cancelQueries({ queryKey: [\"todos\"] });\n    const prev = qc.getQueryData([\"todos\"]);\n    qc.setQueryData([\"todos\"], (old) => old.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));\n    return { prev };\n  },\n  onError: (_e, _id, ctx) => qc.setQueryData([\"todos\"], ctx.prev),   // roll back\n  onSettled: () => qc.invalidateQueries({ queryKey: [\"todos\"] }),     // sync with the server\n});",
        run: "browser"
      },
      {
        title: { en: "Cancellation and deduplication come built in", ar: "الإلغاء والـ dedup جاهزين" },
        body: {
          en: "The query function receives a <code>signal</code>; pass it to <code>fetch</code> and TanStack Query aborts requests nobody needs anymore. Identical keys requested at the same time share one in-flight request. Results use structural sharing, so unchanged parts keep their identity and memoised components don't re-render.",
          ar: "الـ query function بتاخد <code>signal</code>؛ ابعته لـ <code>fetch</code> و TanStack Query بيعمل abort للـ requests اللي محدش بقى محتاجها. والـ keys المتطابقة اللي بتتطلب في نفس الوقت بتشارك request واحد شغال. والنتايج بتستخدم structural sharing، فالأجزاء اللي متغيرتش بتحافظ على الـ identity بتاعتها والـ components المعمول لها memo مش بتعمل re-render."
        }
      }
    ],
    breaks: [
      {
        title: { en: "A query key missing a parameter", ar: "query key ناقصه parameter" },
        body: {
          en: "<code>queryKey: [\"orders\"]</code> with a <code>queryFn</code> that uses <code>status</code>: changing the filter shows the cached list for the old status, because as far as the cache knows it's the same data.",
          ar: "<code>queryKey: [\"orders\"]</code> و <code>queryFn</code> بيستخدم <code>status</code>: لما تغيّر الفلتر بتظهر الـ list المتخزنة بتاعة الـ status القديم، لأن بالنسبة للـ cache دي نفس الداتا."
        },
        fix: { en: "Put every variable the fetch uses in the key; use query-key factories per domain and the ESLint plugin's exhaustive-deps rule for keys.", ar: "حط كل متغير الـ fetch بيستخدمه في الـ key؛ واستخدم query-key factories لكل domain وقاعدة exhaustive-deps للـ keys في الـ ESLint plugin." }
      },
      {
        title: { en: "Copying query data into useState", ar: "نسخ داتا الـ query في useState" },
        body: {
          en: "<code>const [rows, setRows] = useState(data)</code> takes a snapshot that never updates after a refetch, and now there are two sources of truth.",
          ar: "<code>const [rows, setRows] = useState(data)</code> بياخد snapshot عمره ما بيتحدث بعد الـ refetch، وبقى فيه مصدرين للحقيقة."
        },
        fix: { en: "Read from the query; derive with <code>select</code> or during render; keep only real UI state (selection, edits in progress) in local state.", ar: "اقرا من الـ query؛ واحسب بـ <code>select</code> أو وقت الـ render؛ وخلي الـ UI state الحقيقي بس (الاختيار، التعديلات اللي شغالة) في state محلي." }
      },
      {
        title: { en: "Reads wrapped as mutations", ar: "قراية ملفوفة كـ mutations" },
        body: {
          en: "Using <code>useMutation</code> to fetch data (because it's “on click” or because the endpoint is POST) loses caching, deduplication, background refetch and loading state on remount.",
          ar: "إنك تستخدم <code>useMutation</code> علشان تجيب داتا (علشان هي «بعد ضغطة» أو علشان الـ endpoint بيبقى POST) بيضيّع الـ caching والـ dedup والـ refetch في الخلفية والـ loading state مع الـ remount."
        },
        fix: { en: "Reads are queries — use <code>enabled</code> to fetch on demand, or <code>queryClient.fetchQuery</code> in a handler. Mutations are for changes.", ar: "القراية queries — استخدم <code>enabled</code> علشان تجيبها وقت الحاجة، أو <code>queryClient.fetchQuery</code> في handler. والـ mutations للتغييرات." }
      }
    ],
    levels: [
      {
        q: "Why TanStack Query instead of fetching in useEffect?",
        mid: { en: "It handles loading and error states, caching and refetching for you.", ar: "بيتعامل مع حالات الـ loading والـ error والـ caching والـ refetching بدالك." },
        senior: {
          en: "Because server data is a cache problem, not component state: shared entries by key, deduplicated requests, stale-while-revalidate with background refetch on focus and reconnect, cancellation through the signal, retries with backoff, pagination and infinite queries, and mutation tools for invalidation and optimistic updates. In an effect I'd rebuild each of these per component, with races. In Smart FAQ that meant 37 queries and 32 mutations with retries only for network errors, 5xx and 429.",
          ar: "لأن داتا السيرفر مشكلة cache، مش state بتاع component: entries مشتركة بالـ key، و requests مش متكررة، و stale-while-revalidate مع refetch في الخلفية مع الـ focus والـ reconnect، وإلغاء عن طريق الـ signal، و retries مع backoff، و pagination و infinite queries، وأدوات mutations للـ invalidation والـ optimistic updates. ولو في effect كنت هعيد بناء كل ده لكل component، ومعاه races. وفي Smart FAQ ده كان 37 query و 32 mutation، والـ retries بس لأخطاء الشبكة والـ 5xx والـ 429."
        }
      },
      {
        q: "invalidateQueries, setQueryData or an optimistic update?",
        mid: { en: "Invalidate after a mutation so the list refetches.", ar: "اعمل invalidate بعد الـ mutation علشان الـ list تعمل refetch." },
        senior: {
          en: "Invalidate by default — it's simple and always matches the server. <code>setQueryData</code> when the response already contains the updated entity, to save a round trip — e.g. updating one item in a list. Optimistic when the action is frequent and almost always succeeds (toggles, likes): cancel in-flight queries, snapshot, write, roll back on error, and invalidate on settle to re-sync. Then I check the edge cases: other lists that include the item, and pagination.",
          ar: "الـ invalidate هو الأساس — بسيط ودايمًا مطابق للسيرفر. و <code>setQueryData</code> لما الـ response يكون فيه الـ entity المتحدث خلاص، علشان أوفر رحلة — زي تحديث عنصر واحد في list. والـ optimistic لما الأكشن بيتكرر كتير وتقريبًا دايمًا بينجح (toggles، likes): الغي الـ queries الشغالة، وخد snapshot، واكتب، وارجع لو حصل error، واعمل invalidate في الآخر علشان تتزامن تاني. وبعدين بشوف الحالات الطرفية: lists تانية فيها نفس العنصر، والـ pagination."
        }
      }
    ],
    drill: [
      {
        q: "What's the difference between staleTime and gcTime?",
        a: { en: "<code>staleTime</code>: how long data is fresh (no refetch). <code>gcTime</code>: how long unused data stays cached after the last component using it unmounts.", ar: "<code>staleTime</code>: الداتا تفضل fresh قد إيه (من غير refetch). و <code>gcTime</code>: الداتا اللي محدش بيستخدمها تفضل في الـ cache قد إيه بعد ما آخر component بيستخدمها يتشال." },
        follow: [
          {
            q: "What happens when the user comes back to a page after two minutes?",
            a: { en: "With defaults, the entry is still in the cache (gcTime 5 min) but stale (staleTime 0): the old data shows instantly and a background refetch updates it.", ar: "بالقيم الافتراضية، الـ entry لسه في الـ cache (gcTime 5 دقايق) بس stale (staleTime 0): الداتا القديمة بتظهر على طول و refetch في الخلفية بيحدّثها." },
            follow: [
              {
                q: "How do you avoid a loading flash when changing pages in a paginated table?",
                a: { en: "<code>placeholderData: keepPreviousData</code> keeps showing the previous page while the next one loads (<code>isPlaceholderData</code> tells you), and prefetching the next page makes it instant.", ar: "<code>placeholderData: keepPreviousData</code> بيفضل يعرض الصفحة اللي قبلها لحد ما اللي بعدها تحمّل (و <code>isPlaceholderData</code> بيقولك)، والـ prefetch للصفحة الجاية بيخليها فورية." }
              }
            ]
          }
        ]
      }
    ],
    story: {
      text: { en: "Smart FAQ: 37 useQuery, 32 useMutation, 40 invalidateQueries, 18 setQueryData; retries only for network errors, 5xx and 429. AHS: 49 useQuery / 169 useMutation in the migration — some reads wrapped as mutations, a lesson to discuss honestly.", ar: "Smart FAQ: 37 useQuery و 32 useMutation و 40 invalidateQueries و 18 setQueryData؛ والـ retries بس لأخطاء الشبكة والـ 5xx والـ 429. و AHS: 49 useQuery و 169 useMutation في الـ migration — فيه قراية ملفوفة كـ mutations، ودرس تتكلم عنه بصراحة." },
      p: "smartfaq", tab: "hooks", label: "Smart FAQ"
    },
    sources: [
      { label: "TanStack Query — Important defaults", url: "https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults" },
      { label: "TanStack Query — Query keys", url: "https://tanstack.com/query/latest/docs/framework/react/guides/query-keys" },
      { label: "TanStack Query — Optimistic updates", url: "https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates" },
      { label: "TkDodo — Practical React Query", url: "https://tkdodo.eu/blog/practical-react-query" }
    ]
  }
});
