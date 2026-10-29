// TypeScript — written 2026-10-29.
STUDY.fill("typescript", {
  intro: { en: "Types that catch bugs before users do: type vs interface, unions and narrowing, generics, utility types, any/unknown/never, typing React, and runtime validation.", ar: "Types بتمسك الـ bugs قبل المستخدم: type ولا interface، الـ unions والـ narrowing، الـ generics، الـ utility types، any و unknown و never، إزاي تكتب types لـ React، والـ validation وقت التشغيل." },
  topics: [
    {
      id: "type-vs-interface",
      title: { en: "type vs interface", ar: "type ولا interface" },
      tldr: { en: "Both describe object shapes. <code>interface</code> can be re-opened (declaration merging) and extended; <code>type</code> can also express unions, tuples, mapped and conditional types. Pick one convention for objects; use <code>type</code> for everything else.", ar: "الاتنين بيوصفوا شكل الـ object. الـ <code>interface</code> ينفع يتفتح تاني (declaration merging) ويتعمله extend؛ والـ <code>type</code> كمان بيعبر عن unions و tuples و mapped و conditional types. اختار قاعدة واحدة للـ objects؛ واستخدم <code>type</code> لأي حاجة تانية." },
      blocks: [
        { type: "compare", cols: ["", "interface", "type"], rows: [
          [{ en: "Object shapes", ar: "شكل object" }, "✓", "✓"],
          [{ en: "Unions / tuples / primitives", ar: "Unions / tuples / primitives" }, "✗", "✓"],
          [{ en: "Declaration merging", ar: "Declaration merging" }, { en: "✓ (augment libraries, e.g. Window)", ar: "✓ (تزود على مكتبات، زي Window)" }, "✗"],
          [{ en: "Extending", ar: "Extending" }, "extends", { en: "intersection &", ar: "intersection &" }],
          [{ en: "Mapped / conditional types", ar: "Mapped / conditional" }, "✗", "✓"]
        ] },
        { type: "code", code: "interface User { id: string; name: string }\ninterface Admin extends User { permissions: string[] }\n\ntype Status = \"draft\" | \"review\" | \"published\";   // only `type` can do this\ntype WithTimestamps<T> = T & { createdAt: string };\n\n// augmenting a library type needs interface merging\ndeclare module \"@tanstack/react-query\" {\n  interface Register { defaultError: ApiError }\n}" },
        { type: "projects", items: [{ text: { en: "Smart FAQ registers its ApiError as React Query's default error through interface merging — every <code>error</code> is typed.", ar: "Smart FAQ سجل الـ ApiError بتاعه كـ default error في React Query عن طريق interface merging — فكل <code>error</code> ليه type." }, p: "smartfaq", tab: "decisions", label: "Smart FAQ" }] }
      ],
      say: "I use type for unions and composed types and interface where I need to extend or augment a library's types.",
      interview: [{ q: "When must you use interface?", a: { en: "When you need declaration merging — augmenting a library's or the global types (Window, a module's Register interface).", ar: "لما تحتاج declaration merging — تزود على types مكتبة أو الـ global (Window، أو interface Register بتاع module)." },
        follow: [{ q: "Any performance difference?", a: { en: "Interfaces with extends are cached by the compiler and can be faster for big hierarchies than deep intersections — matters only in very large codebases.", ar: "الـ interfaces بالـ extends الـ compiler بيعملها cache، وممكن تبقى أسرع من intersections كبيرة — ده يفرق بس في codebases ضخمة جدًا." } }] }],
      quiz: [{ q: { en: "Can an interface describe <code>\"a\" | \"b\"</code>?", ar: "الـ interface يقدر يوصف <code>\"a\" | \"b\"</code>؟" }, a: { en: "No — unions need type.", ar: "لأ — الـ unions محتاجة type." } }],
      quick: [{ en: "type = unions, tuples, mapped; interface = extend + merging (augment libraries).", ar: "type = unions و tuples و mapped؛ interface = extend و merging (تزود على مكتبات)." }]
    },
    {
      id: "narrowing",
      title: { en: "Unions, narrowing and discriminated unions", ar: "الـ Unions والـ Narrowing والـ Discriminated unions" },
      tldr: { en: "A union says “one of these”. TypeScript narrows it with checks (<code>typeof</code>, <code>in</code>, <code>instanceof</code>, equality, custom type guards). Give each member a shared literal field (<code>status</code>) and a <code>switch</code> narrows perfectly — add <code>never</code> to make missing cases a compile error.", ar: "الـ union معناها «واحد من دول». TypeScript بيضيّقها بالـ checks (<code>typeof</code>، <code>in</code>، <code>instanceof</code>، المساواة، type guards بتاعتك). ولو كل عضو فيه field ثابت مشترك (<code>status</code>)، الـ <code>switch</code> بيضيّق صح — وزود <code>never</code> علشان أي حالة ناقصة تبقى error." },
      blocks: [
        { type: "code", code: "type Query<T> =\n  | { status: \"loading\" }\n  | { status: \"error\"; error: ApiError }\n  | { status: \"success\"; data: T };\n\nfunction view(q: Query<User>) {\n  switch (q.status) {\n    case \"loading\": return \"…\";\n    case \"error\":   return q.error.code;   // error exists only here\n    case \"success\": return q.data.name;\n    default: { const never: never = q; return never; } // compile error if a case is added and not handled\n  }\n}\n\nfunction isApiError(e: unknown): e is ApiError {  // custom type guard\n  return e instanceof ApiError;\n}" },
        { type: "when", use: [{ en: "Model states as discriminated unions (loading/error/success, draft/review/published) instead of many optional booleans.", ar: "اعمل الحالات discriminated unions (loading/error/success، draft/review/published) بدل booleans كتير optional." }], avoid: [{ en: "<code>isLoading?: boolean; error?: Error; data?: T</code> — allows impossible combinations.", ar: "<code>isLoading?: boolean; error?: Error; data?: T</code> — بيسمح بتركيبات مستحيلة." }] }
      ],
      say: "I model UI states as discriminated unions so impossible states can't be represented, and an exhaustive switch catches unhandled cases at compile time.",
      interview: [{ q: "What is a discriminated union and why use it?", a: { en: "A union whose members share a literal tag. Checking the tag narrows to one member, so you only access fields that exist in that state. It removes impossible states like “loading and error at once”.", ar: "Union أعضاؤها فيهم tag ثابت مشترك. لما تشيك على الـ tag بيضيّق لعضو واحد، فمش هتوصل غير للـ fields الموجودة في الحالة دي. وبيشيل الحالات المستحيلة زي «loading و error في نفس الوقت»." } }],
      quiz: [{ q: { en: "What does <code>e is ApiError</code> in a return type do?", ar: "<code>e is ApiError</code> في الـ return type بتعمل إيه؟" }, a: { en: "Makes the function a type guard: when it returns true, e is narrowed to ApiError.", ar: "بتخلي الـ function type guard: لما ترجع true، الـ e بيتضيّق لـ ApiError." } }],
      quick: [{ en: "Discriminated unions + exhaustive switch with never; custom guards with `x is T`.", ar: "Discriminated unions و switch كامل بـ never؛ و guards بـ `x is T`." }]
    },
    {
      id: "generics",
      title: { en: "Generics", ar: "الـ Generics" },
      tldr: { en: "Generics are type parameters: write a function/component once and keep the caller's types. Constrain them with <code>extends</code>, give defaults, and let inference do the work.", ar: "الـ Generics هي parameters للـ types: تكتب function أو component مرة واحدة وتحافظ على types اللي بينادي. وتقيدها بـ <code>extends</code>، وتديها default، وتسيب الـ inference يشتغل." },
      blocks: [
        { type: "code", code: "function first<T>(list: T[]): T | undefined { return list[0]; }\nfirst([1, 2]);        // number | undefined  (inferred)\n\nfunction pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {\n  return items.map((i) => i[key]);\n}\npluck(users, \"name\"); // string[]; pluck(users, \"nope\") is an error\n\n// generic component\ntype TableProps<Row> = { rows: Row[]; columns: { key: keyof Row; label: string }[] };\nfunction DataTable<Row>({ rows, columns }: TableProps<Row>) { /* … */ }\n\n// generic API helper\nasync function get<T>(path: string): Promise<T> { return (await fetch(path)).json(); }" },
        { type: "pitfalls", items: [{ en: "A generic that's only used once (<code>function f&lt;T&gt;(x: T): void</code>) adds nothing — use the concrete type.", ar: "Generic مستخدم مرة واحدة بس (<code>function f&lt;T&gt;(x: T): void</code>) مش بيضيف حاجة — استخدم الـ type العادي." }, { en: "<code>get&lt;User&gt;(url)</code> is a promise, not a check — the server can still send something else. Validate at the boundary.", ar: "<code>get&lt;User&gt;(url)</code> وعد مش فحص — السيرفر ممكن يبعت حاجة تانية. اعمل validation عند الحدود." }] }
      ],
      say: "Generics let shared pieces like tables and API helpers keep the caller's exact types; I constrain them with extends keyof so wrong keys fail at compile time.",
      interview: [{ q: "Explain <code>K extends keyof T</code>.", a: { en: "K must be one of T's property names, so <code>T[K]</code> is the exact type of that property. It's how pluck/sortBy helpers stay type-safe.", ar: "K لازم يبقى اسم من أسماء properties الـ T، فـ <code>T[K]</code> بيبقى type الـ property دي بالظبط. وده اللي بيخلي helpers زي pluck و sortBy آمنة." } }],
      quiz: [{ q: { en: "Type of <code>first([\"a\"])</code>?", ar: "الـ type بتاع <code>first([\"a\"])</code>؟" }, a: { en: "string | undefined.", ar: "string | undefined." } }],
      quick: [{ en: "Generics keep the caller's types; constrain with extends; keyof + T[K] for safe keys.", ar: "الـ Generics بتحافظ على types اللي بينادي؛ قيد بـ extends؛ و keyof مع T[K] للمفاتيح الآمنة." }]
    },
    {
      id: "utility-types",
      title: { en: "Utility, mapped and conditional types", ar: "الـ Utility و mapped و conditional types" },
      tldr: { en: "Build new types from existing ones instead of copying: <code>Partial</code>, <code>Required</code>, <code>Pick</code>, <code>Omit</code>, <code>Record</code>, <code>ReturnType</code>, <code>Parameters</code>, <code>Awaited</code>, <code>NonNullable</code>. Under the hood they are mapped (<code>[K in keyof T]</code>) and conditional (<code>T extends U ? X : Y</code>) types.", ar: "ابني types جديدة من الموجودة بدل ما تنسخ: <code>Partial</code> و <code>Required</code> و <code>Pick</code> و <code>Omit</code> و <code>Record</code> و <code>ReturnType</code> و <code>Parameters</code> و <code>Awaited</code> و <code>NonNullable</code>. وهي من جوه mapped (<code>[K in keyof T]</code>) و conditional (<code>T extends U ? X : Y</code>)." },
      blocks: [
        { type: "code", code: "type User = { id: string; name: string; email: string; role: \"admin\" | \"member\" };\n\ntype UserPatch   = Partial<Omit<User, \"id\">>;        // PATCH body\ntype UserRow     = Pick<User, \"id\" | \"name\">;\ntype ByRole      = Record<User[\"role\"], User[]>;\ntype Loaded      = Awaited<ReturnType<typeof fetchUser>>;\n\n// how Partial is built (mapped type)\ntype MyPartial<T> = { [K in keyof T]?: T[K] };\n// conditional type + infer\ntype ElementOf<T> = T extends (infer E)[] ? E : never;\n\nconst routes = { home: \"/\", orders: \"/orders\" } as const;\ntype RouteKey = keyof typeof routes;                 // \"home\" | \"orders\"\nconst config = { retries: 2 } satisfies Partial<Settings>; // checked, but keeps its literal type" },
        { type: "list", title: { en: "as const and satisfies", ar: "as const و satisfies" }, items: [
          { en: "<code>as const</code> makes values readonly literals — perfect for route maps, status lists, capability catalogues.", ar: "<code>as const</code> بيخلي القيم literals و readonly — ممتاز لخرايط الـ routes وقوايم الحالات وكتالوج الـ capabilities." },
          { en: "<code>satisfies</code> checks a value against a type without widening it (unlike <code>: Type</code>).", ar: "<code>satisfies</code> بيشيك على القيمة من غير ما يوسّع الـ type بتاعها (عكس <code>: Type</code>)." }
        ] },
        { type: "projects", items: [{ text: { en: "Smart FAQ keeps routes, capabilities and query scopes as <code>as const</code> objects and uses <code>satisfies</code> for request bodies.", ar: "Smart FAQ شايل الـ routes والـ capabilities والـ query scopes كـ objects بـ <code>as const</code> وبيستخدم <code>satisfies</code> لأجسام الـ requests." }, p: "smartfaq", tab: "decisions", label: "Smart FAQ" }] }
      ],
      say: "I derive types instead of duplicating them — Omit and Partial for patch bodies, as const for catalogues, satisfies to check config without losing literal types.",
      interview: [{ q: "Omit vs Pick — and why not just write a new type?", a: { en: "Pick keeps listed keys, Omit removes them. Deriving keeps types in sync: when User gains a field, every derived type updates.", ar: "الـ Pick بيحتفظ بالمفاتيح اللي قلتها، و Omit بيشيلها. والاشتقاق بيخلي الـ types متزامنة: لما User يزيد field، كل الـ types المشتقة بتتحدث." },
        follow: [{ q: "What does `infer` do?", a: { en: "Inside a conditional type it captures a part of a type into a variable — e.g. the element of an array or the resolved value of a promise.", ar: "جوه conditional type بيمسك جزء من type في متغير — زي عنصر الـ array أو القيمة اللي الـ promise بيتحل بيها." } }] }],
      quiz: [{ q: { en: "Type of the body for PATCH /users/:id?", ar: "الـ type بتاع body لـ PATCH /users/:id؟" }, a: { en: "<code>Partial&lt;Omit&lt;User, \"id\"&gt;&gt;</code>.", ar: "<code>Partial&lt;Omit&lt;User, \"id\"&gt;&gt;</code>." } }],
      quick: [{ en: "Derive, don't duplicate: Pick/Omit/Partial/Record/ReturnType/Awaited; as const; satisfies.", ar: "اشتق متنسخش: Pick و Omit و Partial و Record و ReturnType و Awaited؛ as const؛ satisfies." }]
    },
    {
      id: "any-unknown-never",
      title: { en: "any vs unknown vs never", ar: "any ولا unknown ولا never" },
      tldr: { en: "<code>any</code> turns checking off. <code>unknown</code> means “could be anything — prove it first”. <code>never</code> is the empty type: impossible values, functions that never return, exhaustive checks.", ar: "<code>any</code> بيقفل الفحص. <code>unknown</code> معناها «ممكن تبقى أي حاجة — اثبت الأول». <code>never</code> هو الـ type الفاضي: قيم مستحيلة، functions مش بترجع، وفحص الحالات كلها." },
      blocks: [
        { type: "code", code: "function parse(json: string): unknown { return JSON.parse(json); }\nconst v = parse(text);\nv.name;                              // ✗ error: unknown must be narrowed\nif (typeof v === \"object\" && v && \"name\" in v) { /* ok */ }\n\ntry { … } catch (e) {               // e is unknown (useUnknownInCatchVariables)\n  if (e instanceof ApiError) show(e.code);\n}\n\nfunction fail(msg: string): never { throw new Error(msg); }" },
        { type: "when", use: [{ en: "<code>unknown</code> for data from outside (JSON, API, storage, catch) — then validate.", ar: "<code>unknown</code> للداتا اللي جاية من برا (JSON، API، storage، catch) — وبعدين validate." }], avoid: [{ en: "<code>any</code> — it spreads silently. If you must, use <code>// @ts-expect-error</code> with a reason, which fails when no longer needed.", ar: "<code>any</code> — بيتنشر من غير ما تحس. لو مضطر، استخدم <code>// @ts-expect-error</code> بسبب، وده بيفشل لما ميبقاش له لازمة." }] }
      ],
      say: "Anything from outside the app is unknown until validated; I avoid any because it switches off checking everywhere it flows.",
      interview: [{ q: "Why is unknown safer than any?", a: { en: "You can assign anything to both, but you can't use an unknown without narrowing it first. any lets you call anything, and that unsafety leaks into everything it touches.", ar: "الاتنين تقدر تحط فيهم أي حاجة، بس الـ unknown مينفعش تستخدمه من غير narrowing. والـ any بيسيبك تعمل أي حاجة، وعدم الأمان ده بيتنشر في كل حاجة بيلمسها." } }],
      quiz: [{ q: { en: "Return type of a function that always throws?", ar: "الـ return type لـ function دايمًا بترمي error؟" }, a: { en: "never.", ar: "never." } }],
      quick: [{ en: "any = off; unknown = narrow first; never = impossible / exhaustive.", ar: "any = مقفول؛ unknown = ضيّق الأول؛ never = مستحيل / فحص كامل." }]
    },
    {
      id: "typing-react",
      title: { en: "Typing React", ar: "Types في React" },
      tldr: { en: "Type props with a type alias, children as <code>ReactNode</code>, events with React's event types, refs with the element type, and extend native props with <code>ComponentProps&lt;\"button\"&gt;</code>. Let hooks infer where possible.", ar: "اكتب types للـ props بـ type alias، والـ children كـ <code>ReactNode</code>، والـ events بأنواع React، والـ refs بنوع العنصر، ووسّع الـ props الأصلية بـ <code>ComponentProps&lt;\"button\"&gt;</code>. وسيب الـ hooks تستنتج لما ينفع." },
      blocks: [
        { type: "code", code: "type ButtonProps = ComponentProps<\"button\"> & { tone?: \"primary\" | \"danger\"; loading?: boolean };\nfunction Button({ tone = \"primary\", loading, children, ...rest }: ButtonProps) {\n  return <button {...rest} data-tone={tone} disabled={loading || rest.disabled}>{children}</button>;\n}\n\nconst [user, setUser] = useState<User | null>(null);        // union needs a hint\nconst inputRef = useRef<HTMLInputElement>(null);\nconst onChange = (e: ChangeEvent<HTMLInputElement>) => setQ(e.target.value);\nconst onSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault();\n\ntype ListProps<T> = { items: T[]; render: (item: T) => ReactNode };   // generic component\n\n// zod: one schema → runtime check + type\nconst UserSchema = z.object({ id: z.string(), email: z.string().email() });\ntype User = z.infer<typeof UserSchema>;" },
        { type: "pitfalls", items: [{ en: "<code>React.FC</code> is optional today; plain functions with typed props are the common style.", ar: "<code>React.FC</code> مش لازم النهارده؛ الـ functions العادية بـ props ليها types هي الشائعة." }, { en: "Types disappear at runtime — API responses still need validation (Zod) or generated types from a trusted contract.", ar: "الـ types بتختفي وقت التشغيل — ردود الـ API لسه محتاجة validation (Zod) أو types متولدة من contract موثوق." }] },
        { type: "projects", items: [{ text: { en: "Smart FAQ: OpenAPI-generated types for 94 endpoints + Zod schemas for forms; Bites: react-hook-form + Zod.", ar: "Smart FAQ: types متولدة من OpenAPI لـ 94 endpoint و Zod للفورمز؛ و Bites: react-hook-form مع Zod." }, p: "smartfaq", tab: "decisions", label: "Smart FAQ" }] }
      ],
      say: "Types come from one source of truth — the OpenAPI contract for API data, a Zod schema for forms — so runtime checks and compile-time types never drift.",
      interview: [{ q: "How do you type a component that wraps a native button?", a: { en: "Spread <code>ComponentProps&lt;\"button\"&gt;</code> into the props type and pass <code>...rest</code> down, so every native attribute (aria-*, type, onClick) works and is typed.", ar: "أدخّل <code>ComponentProps&lt;\"button\"&gt;</code> في type الـ props وأعدّي <code>...rest</code>، فكل attribute أصلي (aria-*، type، onClick) يشتغل وليه type." },
        follow: [{ q: "How does TypeScript help with API data that can be wrong at runtime?", a: { en: "It doesn't by itself. Validate at the boundary (Zod parse) or trust a generated contract, and treat everything else as unknown.", ar: "لوحده لأ. اعمل validation عند الحدود (Zod parse) أو اعتمد على contract متولد، واعتبر أي حاجة تانية unknown." } }] }],
      quiz: [{ q: { en: "Type of <code>useRef</code> for an input?", ar: "Type الـ <code>useRef</code> لـ input؟" }, a: { en: "<code>useRef&lt;HTMLInputElement&gt;(null)</code>.", ar: "<code>useRef&lt;HTMLInputElement&gt;(null)</code>." } }],
      quick: [{ en: "ComponentProps<\"button\"> for wrappers; ReactNode children; z.infer for one source of truth.", ar: "ComponentProps<\"button\"> للـ wrappers؛ ReactNode للـ children؛ z.infer لمصدر حقيقة واحد." }]
    },
    {
      id: "ts-config",
      title: { en: "Strict mode and config that matters", ar: "الـ Strict mode والإعدادات المهمة" },
      tldr: { en: "Turn on <code>strict</code> (null checks, no implicit any). Add <code>noUncheckedIndexedAccess</code> so <code>arr[i]</code> can be undefined. TypeScript only type-checks — Vite/SWC/esbuild strip types without checking, so run <code>tsc --noEmit</code> in CI.", ar: "شغّل <code>strict</code> (فحص null، ومفيش any ضمني). وزود <code>noUncheckedIndexedAccess</code> علشان <code>arr[i]</code> ممكن يبقى undefined. و TypeScript بيفحص بس — Vite و SWC و esbuild بيشيلوا الـ types من غير فحص، فشغّل <code>tsc --noEmit</code> في الـ CI." },
      blocks: [
        { type: "compare", cols: [{ en: "Option", ar: "الخيار" }, { en: "Catches", ar: "بيمسك" }], rows: [
          ["strictNullChecks", { en: "Using a value that may be null/undefined", ar: "استخدام قيمة ممكن تبقى null أو undefined" }],
          ["noImplicitAny", { en: "Untyped parameters silently becoming any", ar: "Parameters من غير type بتبقى any من غير ما تحس" }],
          ["noUncheckedIndexedAccess", { en: "<code>list[0].name</code> on a maybe-empty array", ar: "<code>list[0].name</code> على array ممكن يبقى فاضي" }],
          ["exactOptionalPropertyTypes", { en: "Passing undefined where a prop should be absent", ar: "تبعت undefined في مكان المفروض الـ prop يبقى مش موجود" }]
        ] }
      ],
      say: "Strict mode plus noUncheckedIndexedAccess catches most null bugs, and CI runs tsc because the bundler strips types without checking them.",
      interview: [{ q: "Does Vite type-check your code?", a: { en: "No. It transpiles TypeScript with esbuild and just removes types. Type errors are caught by the editor and a separate <code>tsc --noEmit</code> (or <code>tsc -b</code>) step.", ar: "لأ. بيعمل transpile للـ TypeScript بـ esbuild وبيشيل الـ types بس. وأخطاء الـ types بتتمسك في الـ editor وفي خطوة <code>tsc --noEmit</code> (أو <code>tsc -b</code>) لوحدها." } }],
      quiz: [{ q: { en: "Smart FAQ's build script starts with…?", ar: "الـ build script في Smart FAQ بيبدأ بـ…؟" }, a: { en: "<code>tsc -b &amp;&amp; vite build</code> — type-check first, then bundle.", ar: "<code>tsc -b &amp;&amp; vite build</code> — فحص الـ types الأول، وبعدين الـ bundle." } }],
      quick: [{ en: "strict + noUncheckedIndexedAccess; bundlers strip types — tsc in CI.", ar: "strict و noUncheckedIndexedAccess؛ الـ bundlers بتشيل الـ types — tsc في الـ CI." }]
    }
  ]
});
