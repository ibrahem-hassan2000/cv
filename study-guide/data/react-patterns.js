// React patterns — written 2026-10-29.
STUDY.fill("react-patterns", {
  intro: { en: "How to structure components so they stay reusable: composition, compound components, hooks vs render props vs HOCs, controlled/uncontrolled APIs, error boundaries, lazy loading, portals and folder architecture.", ar: "إزاي ترتب الـ components علشان تفضل قابلة لإعادة الاستخدام: composition، و compound components، و hooks ولا render props ولا HOCs، و APIs controlled و uncontrolled، و error boundaries، و lazy loading، و portals، وترتيب الفولدرات." },
  topics: [
    {
      id: "composition",
      title: { en: "Composition over configuration", ar: "الـ Composition بدل الإعدادات" },
      tldr: { en: "Pass components (children, slots) instead of piling up boolean props. A <code>Card</code> with <code>header</code>/<code>actions</code> slots stays small; a <code>Card</code> with 15 flags becomes unmaintainable. Composition also avoids prop drilling and unnecessary re-renders.", ar: "ابعت components (children، slots) بدل ما تكوم props boolean. <code>Card</code> فيها slots زي <code>header</code> و <code>actions</code> بتفضل صغيرة؛ و <code>Card</code> فيها 15 flag بتبقى صعب تتصان. والـ composition كمان بيمنع الـ prop drilling والـ re-renders اللي ملهاش لازمة." },
      blocks: [
        { type: "code", code: "// ✗ configuration explosion\n<Card title=\"Orders\" showBadge badgeTone=\"warn\" hasFooter footerAlign=\"end\" … />\n\n// ✓ composition with slots\n<Card>\n  <Card.Header title=\"Orders\" badge={<Badge tone=\"warn\">3</Badge>} />\n  <OrdersTable />\n  <Card.Footer><Button>Export</Button></Card.Footer>\n</Card>\n\n// avoid drilling: pass the element, not the data\n<Layout sidebar={<UserMenu user={user} />} />" },
        { type: "projects", items: [{ text: { en: "Smart FAQ's Atomic Design: atoms → molecules (PageHeader, MetadataPanel) → organisms (DataTable, FilterToolbar) → templates (AppShell) composed by pages.", ar: "Atomic Design في Smart FAQ: atoms ← molecules (PageHeader، MetadataPanel) ← organisms (DataTable، FilterToolbar) ← templates (AppShell) والصفحات بتركّبهم." }, p: "smartfaq", tab: "decisions", label: "Smart FAQ" }] }
      ],
      say: "I prefer composition with children and slots over boolean props, so components stay small and callers decide what goes inside.",
      interview: [{ q: "How do you avoid prop drilling without context?", a: { en: "Composition: the parent that owns the data renders the deep component and passes it down as a child or slot, so the middle layers never see the data.", ar: "الـ Composition: الأب اللي معاه الداتا بيرسم الـ component اللي تحت ويبعته كـ child أو slot، فالطبقات اللي في النص مش بتشوف الداتا خالص." } }],
      quiz: [{ q: { en: "A Modal grows 12 boolean props. Fix?", ar: "Modal بقى فيه 12 prop boolean. الحل؟" }, a: { en: "Split into composable parts (Modal.Header/Body/Footer) or slots.", ar: "قسّمه لأجزاء تتركب (Modal.Header و Body و Footer) أو slots." } }],
      quick: [{ en: "Children/slots > boolean props; pass elements to avoid drilling.", ar: "Children و slots أحسن من props boolean؛ ابعت elements علشان تتجنب الـ drilling." }]
    },
    {
      id: "compound",
      title: { en: "Compound components and headless UI", ar: "الـ Compound components والـ Headless UI" },
      tldr: { en: "A set of components that share hidden state through context (<code>Tabs</code>, <code>Tabs.List</code>, <code>Tabs.Trigger</code>, <code>Tabs.Panel</code>). Headless libraries (Radix, React Aria, Headless UI) provide behaviour and accessibility; you provide the styling.", ar: "مجموعة components بتشارك state مخفي عن طريق context (<code>Tabs</code>، <code>Tabs.List</code>، <code>Tabs.Trigger</code>، <code>Tabs.Panel</code>). والمكتبات الـ headless (Radix، React Aria، Headless UI) بتدي السلوك والـ accessibility؛ وانت بتدي الستايل." },
      blocks: [
        { type: "code", code: "const TabsCtx = createContext<{ value: string; set: (v: string) => void } | null>(null);\nfunction Tabs({ defaultValue, children }) {\n  const [value, set] = useState(defaultValue);\n  return <TabsCtx.Provider value={{ value, set }}>{children}</TabsCtx.Provider>;\n}\nTabs.Trigger = function Trigger({ value, children }) {\n  const ctx = useContext(TabsCtx)!;\n  return <button role=\"tab\" aria-selected={ctx.value === value} onClick={() => ctx.set(value)}>{children}</button>;\n};\nTabs.Panel = function Panel({ value, children }) {\n  return useContext(TabsCtx)!.value === value ? <div role=\"tabpanel\">{children}</div> : null;\n};" }
      ],
      say: "For complex widgets I use compound components over a headless library: Radix handles focus and ARIA, our design system handles the look.",
      interview: [{ q: "Why headless components?", a: { en: "Accessibility and keyboard behaviour are hard (focus traps, roving tabindex, ARIA states). Headless libraries solve them once and let the design stay fully custom.", ar: "الـ accessibility وسلوك الكيبورد صعبين (focus traps، roving tabindex، ARIA states). المكتبات الـ headless بتحلهم مرة وبتسيب الديزاين مخصوص بالكامل." } }],
      quiz: [{ q: { en: "How do compound parts share state?", ar: "الأجزاء بتشارك الـ state إزاي؟" }, a: { en: "Through a context created by the parent component.", ar: "عن طريق context بيعمله الـ component الأب." } }],
      quick: [{ en: "Compound = shared context between parts; headless (Radix) = behaviour + a11y, your styles.", ar: "Compound = context مشترك بين الأجزاء؛ headless (Radix) = سلوك و a11y وانت الستايل." }]
    },
    {
      id: "reuse-logic",
      title: { en: "Sharing logic: hooks vs render props vs HOCs", ar: "مشاركة المنطق: hooks ولا render props ولا HOCs" },
      tldr: { en: "Custom hooks are the default for sharing stateful logic. Render props still fit when the <i>caller</i> decides what to render with your data (virtualized lists, Controller). HOCs wrap a component (auth, analytics) but hide props and nest badly — mostly legacy.", ar: "الـ Custom hooks هي الافتراضي لمشاركة المنطق اللي فيه state. والـ render props لسه مناسبة لما <i>اللي بينادي</i> هو اللي يحدد يرسم إيه بالداتا بتاعتك (قوايم virtualized، Controller). والـ HOCs بتلف component (auth، analytics) بس بتخبي props وبتتداخل وحش — معظمها قديم." },
      blocks: [
        { type: "compare", cols: ["", { en: "Hook", ar: "Hook" }, "Render prop", "HOC"], rows: [
          [{ en: "Shape", ar: "الشكل" }, "const x = useX()", "<X>{(x) => …}</X>", "withX(Component)"],
          [{ en: "Composes", ar: "بيتركب" }, { en: "Easily", ar: "بسهولة" }, { en: "Nesting (“callback hell”)", ar: "بالتداخل" }, { en: "Wrapper hell, name clashes", ar: "wrappers كتير وتعارض أسماء" }],
          [{ en: "Still useful for", ar: "لسه مفيد لـ" }, { en: "Almost everything", ar: "تقريبًا كل حاجة" }, { en: "Caller-controlled rendering", ar: "الـ caller يتحكم في الرسم" }, { en: "Cross-cutting wrappers in old code", ar: "Wrappers عامة في كود قديم" }]
        ] }
      ],
      say: "Custom hooks are my default for shared logic; render props when the caller controls the markup, and I avoid new HOCs.",
      interview: [{ q: "Why did hooks replace most HOCs and render props?", a: { en: "They share logic without changing the component tree, compose by just calling them, and make data flow explicit — no wrapper nesting or hidden props.", ar: "بيشاركوا المنطق من غير ما يغيروا شجرة الـ components، وبيتركبوا بالنداء وبس، والداتا بتبقى واضحة — من غير wrappers ولا props مستخبية." } }],
      quiz: [{ q: { en: "react-hook-form's Controller is which pattern?", ar: "الـ Controller بتاع react-hook-form أنهي نمط؟" }, a: { en: "Render prop (render={({ field }) =&gt; …}).", ar: "Render prop (render={({ field }) =&gt; …})." } }],
      quick: [{ en: "Hooks by default; render props for caller-controlled UI; HOCs mostly legacy.", ar: "Hooks افتراضيًا؛ render props لما الـ caller يتحكم؛ HOCs معظمها قديم." }]
    },
    {
      id: "controlled-api",
      title: { en: "Designing controlled and uncontrolled components", ar: "تصميم components controlled و uncontrolled" },
      tldr: { en: "A reusable component should work both ways: uncontrolled with <code>defaultValue</code> (it keeps its own state) or controlled with <code>value</code> + <code>onChange</code> (the parent owns it). That's how native inputs and Radix components behave.", ar: "الـ component اللي بيتكرر المفروض يشتغل بالطريقتين: uncontrolled بـ <code>defaultValue</code> (بيحتفظ بالـ state بتاعه) أو controlled بـ <code>value</code> و <code>onChange</code> (الأب هو اللي ماسكه). وده سلوك الـ inputs الأصلية و components Radix." },
      blocks: [
        { type: "code", code: "function useControllable<T>({ value, defaultValue, onChange }: { value?: T; defaultValue: T; onChange?: (v: T) => void }) {\n  const [inner, setInner] = useState(defaultValue);\n  const controlled = value !== undefined;\n  const current = controlled ? value : inner;\n  const set = (v: T) => { if (!controlled) setInner(v); onChange?.(v); };\n  return [current, set] as const;\n}\n// <Accordion defaultValue=\"a\" />  or  <Accordion value={open} onChange={setOpen} />" }
      ],
      say: "My shared components accept both defaultValue and value plus onChange, like native inputs, so callers choose whether to own the state.",
      interview: [{ q: "Why warn when switching from uncontrolled to controlled?", a: { en: "Ownership changes mid-life (value goes from undefined to defined), so the component's internal state and the parent's state disagree. Decide once at mount.", ar: "الملكية بتتغير في النص (الـ value بيتحول من undefined لقيمة)، فالـ state اللي جوه والـ state بتاع الأب بيختلفوا. القرار بيتاخد مرة وقت الـ mount." } }],
      quiz: [{ q: { en: "Prop pair for a controlled component?", ar: "زوج الـ props للـ controlled component؟" }, a: { en: "value + onChange.", ar: "value و onChange." } }],
      quick: [{ en: "Support defaultValue (uncontrolled) and value+onChange (controlled); don't switch mid-life.", ar: "ادعم defaultValue (uncontrolled) و value مع onChange (controlled)؛ ومتبدلش في النص." }]
    },
    {
      id: "error-boundaries",
      title: { en: "Error boundaries", ar: "الـ Error boundaries" },
      tldr: { en: "An error boundary catches errors thrown while rendering its children and shows a fallback instead of a blank page. It does <b>not</b> catch errors in event handlers, async code or the boundary itself. Place them per route and around risky widgets.", ar: "الـ Error boundary بيمسك الأخطاء اللي بتحصل وقت الـ render بتاع الأولاد ويعرض fallback بدل صفحة بيضا. <b>مش</b> بيمسك أخطاء الـ event handlers ولا الكود الـ async ولا الـ boundary نفسه. حطهم لكل route وحوالين الـ widgets الخطيرة." },
      blocks: [
        { type: "code", code: "// class component (or the react-error-boundary package)\nclass Boundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {\n  state = { failed: false };\n  static getDerivedStateFromError() { return { failed: true }; }\n  componentDidCatch(error: Error, info: ErrorInfo) { report(error, info.componentStack); }\n  render() { return this.state.failed ? this.props.fallback : this.props.children; }\n}\n\n// React Query: throw query errors to the nearest boundary\nuseQuery({ queryKey, queryFn, throwOnError: (e) => e.status >= 500 });\n// React Router: errorElement per route" },
        { type: "projects", items: [{ text: { en: "Smart FAQ: route error pages (404, 403, route error), one illustrated load error used everywhere, and “server unreachable” separated from sign-out.", ar: "Smart FAQ: صفحات أخطاء للـ routes (404، 403، route error)، وشكل واحد مرسوم لخطأ التحميل في كل حتة، و«السيرفر مش متاح» منفصل عن الـ sign-out." }, p: "smartfaq", tab: "problems", label: "Smart FAQ" }] }
      ],
      say: "Each route has an error boundary with a useful fallback, render errors are reported, and expected API errors are shown inline rather than crashing the page.",
      interview: [{ q: "What doesn't an error boundary catch?", a: { en: "Errors in event handlers, in setTimeout/promises, during SSR, or in the boundary itself. Handle those with try/catch, query error states, or by rethrowing into render state.", ar: "أخطاء الـ event handlers، و setTimeout والـ promises، ووقت الـ SSR، أو في الـ boundary نفسه. اتعامل معاهم بـ try/catch، أو حالات الـ error في الـ queries، أو ترميهم في state الـ render." } }],
      quiz: [{ q: { en: "Can a function component be an error boundary?", ar: "الـ function component ينفع يبقى error boundary؟" }, a: { en: "Not natively — it needs a class (or a library wrapping one).", ar: "مش أصلًا — محتاج class (أو مكتبة لافّة واحد)." } }],
      quick: [{ en: "Boundaries catch render errors only; per route + risky widgets; report in componentDidCatch.", ar: "الـ Boundaries بتمسك أخطاء الـ render بس؛ لكل route وحوالين الـ widgets الخطيرة؛ وبلّغ في componentDidCatch." }]
    },
    {
      id: "lazy-portals",
      title: { en: "Code splitting with lazy, and portals", ar: "تقسيم الكود بـ lazy، والـ portals" },
      tldr: { en: "<code>React.lazy(() =&gt; import(\"./X\"))</code> + <code>Suspense</code> loads a component's code only when it renders — split by route and by heavy widgets (editors, charts, maps). <code>createPortal</code> renders children into another DOM node (modals, toasts, tooltips) while keeping React context and events.", ar: "<code>React.lazy(() =&gt; import(\"./X\"))</code> مع <code>Suspense</code> بيحمل كود الـ component بس لما يترسم — قسّم بالـ route وبالـ widgets التقيلة (editors، charts، خرايط). و <code>createPortal</code> بيرسم الأولاد في عنصر DOM تاني (modals، toasts، tooltips) مع الحفاظ على الـ context والـ events." },
      blocks: [
        { type: "code", code: "const Editor = lazy(() => import(\"./RichTextEditor\"));     // TipTap only loads on the editor page\n<Suspense fallback={<EditorSkeleton />}><Editor /></Suspense>\n\nreturn createPortal(<div role=\"dialog\" aria-modal>…</div>, document.body);\n// events still bubble through the React tree (to the component that rendered the portal), not the DOM tree" },
        { type: "pitfalls", items: [{ en: "Too many tiny chunks → request waterfalls. Split by route and big dependencies, prefetch on hover/intent.", ar: "Chunks صغيرة كتير ← شلال requests. قسّم بالـ routes والمكتبات الكبيرة، واعمل prefetch مع الـ hover أو النية." }] }
      ],
      say: "I split code by route and by heavy widgets with lazy and Suspense, and render overlays in portals so ancestors' overflow and stacking can't clip them.",
      interview: [{ q: "Do events from a portal bubble to its DOM parent or React parent?", a: { en: "To the React parent — React propagates synthetic events along the component tree, so a click in a portaled modal reaches the component that rendered it.", ar: "للأب في React — React بيمشي الـ synthetic events على شجرة الـ components، فضغطة في modal جوه portal بتوصل للـ component اللي رسمه." } }],
      quiz: [{ q: { en: "What must wrap a lazy component?", ar: "إيه اللي لازم يلف الـ lazy component؟" }, a: { en: "A Suspense boundary.", ar: "Suspense boundary." } }],
      quick: [{ en: "lazy + Suspense per route/heavy widget; prefetch on intent; portals for overlays (React events still bubble).", ar: "lazy و Suspense لكل route أو widget تقيل؛ prefetch مع النية؛ portals للـ overlays (والـ events لسه بتطلع في React)." }]
    },
    {
      id: "architecture",
      title: { en: "Folder architecture for a growing app", ar: "ترتيب الفولدرات لتطبيق بيكبر" },
      tldr: { en: "Group by feature, not by file type: <code>features/orders/{pages,components,api,types}</code> plus a shared design system (<code>components/</code>) and config. Features don't import each other's internals; shared code moves down into <code>lib</code>/<code>components</code>.", ar: "رتّب بالـ feature مش بنوع الملف: <code>features/orders/{pages,components,api,types}</code> ومعاه design system مشترك (<code>components/</code>) و config. والـ features مش بتعمل import لحاجات جوه بعض؛ والكود المشترك بينزل لـ <code>lib</code> أو <code>components</code>." },
      blocks: [
        { type: "code", code: "src/\n  app/            providers, router, layouts\n  config/         routes, capabilities, navigation (no React)\n  components/     design system: atoms/ molecules/ organisms/ templates/ ui/(shadcn)\n  features/\n    knowledge/    pages/<page>/ (page-as-a-folder), components/, api/ (queries, mutations), types\n    drafts/  admin/  auth/ …\n  lib/            http client, api errors, query keys, utils\n  hooks/          shared hooks\n  test/           render helpers, fake API" },
        { type: "projects", items: [{ text: { en: "This is the Smart FAQ layout he designed; AHS used <code>services/</code> + <code>query/</code> domain folders.", ar: "ده بالظبط ترتيب Smart FAQ اللي هو صممه؛ و AHS كان بيستخدم فولدرات domain في <code>services/</code> و <code>query/</code>." }, p: "smartfaq", tab: "decisions", label: "Smart FAQ" }] }
      ],
      say: "I organise by feature with a shared design system underneath, so each product area owns its pages, API hooks and types, and features never reach into each other.",
      interview: [{ q: "How do features talk to each other without imports?", a: { en: "Through shared contracts: routes/link builders in config, query scopes for cross-feature invalidation, and shared components in the design system.", ar: "عن طريق حاجات مشتركة: الـ routes و link builders في الـ config، و query scopes للـ invalidation بين الـ features، والـ components المشتركة في الـ design system." } }],
      quiz: [{ q: { en: "Where does an Orders-only table column component go?", ar: "component عمود جدول للأوردرات بس يروح فين؟" }, a: { en: "features/orders/components — not the shared design system.", ar: "features/orders/components — مش الـ design system المشترك." } }],
      quick: [{ en: "Feature folders + shared design system; no cross-feature internals; shared code moves down.", ar: "فولدرات features و design system مشترك؛ مفيش import لحاجات جوه features تانية؛ الكود المشترك بينزل." }]
    }
  ]
});
