// AHS Medical Exchange — researched from the code on laptop 1 (Bitbucket nweave/ahs-medical-exchange-services-frontend,
// all branches as fetched ≤ 2026-03-02, plus the mono repo nweave/ahs-medical-exchange-services up to 2026-10-27), 2026-10-28.
// Facts only; code sketches are simplified patterns written from scratch, not project code.
HANDBOOK.projects.push({
  id: "ahs",
  name: "AHS Medical Exchange",
  logo: "assets/img/ahs-logo.svg",
  monogram: "AHS",
  color: "#3d3877",
  company: "nWeave",
  years: "2025–26",
  period: "Dec 2025 – Feb 2026",
  role: { en: "Frontend engineer in a multi-team codebase", ar: "فرونت إند في codebase كبير فيه تيمز كتير" },
  team: { en: "Many frontend devs since 2023 + .NET backend team", ar: "فرونت إند كتير من 2023 + تيم باك إند .NET" },
  tagline: { en: "A healthcare B2B exchange: practices, providers, services, orders and billing.", ar: "منصة B2B صحية: عيادات، مقدمي خدمة، خدمات، أوردرات، وفواتير." },
  stats: [
    ["52", { en: "my commits", ar: "كوميت بتوعي" }],
    ["3.9k", { en: "commits in the repo", ar: "كوميت في الـ repo" }],
    ["25", { en: "query modules (branch)", ar: "query module (على branch)" }],
    ["~½", { en: "of the shipped formula module", ar: "من موديول الـ formula اللي نزل" }],
    ["+21k / −10k", { en: "lines in my diffs", ar: "سطر في الـ diffs بتاعتي" }]
  ],

  pitch: [
    { en: "AHS MedX connects medical practices with service providers: services with custom questions, orders, clinical invitations, messaging and billing.", ar: "AHS MedX بيربط العيادات بمقدمي الخدمات: خدمات بأسئلة مخصوصة، أوردرات، دعوات، رسايل، وفواتير." },
    { en: "I built the <b>first version of the billing-formula builder</b> and led the move from a custom <code>useAxios</code> hook to <b>TanStack Query</b> — 25 domain modules plus a guide for the team.", ar: "بنيت <b>أول نسخة من الـ formula builder بتاع الفواتير</b>، وقُدت النقل من hook اسمه <code>useAxios</code> لـ <b>TanStack Query</b> — 25 domain module ومعاهم guide للتيم." },
    { en: "Hardest part: changing the data layer of a <b>big, busy codebase</b> without blocking other teams — domain by domain, on a branch, with the base landing first.", ar: "أصعب حاجة: تغيير الـ data layer في <b>codebase كبير وشغال عليه ناس كتير</b> من غير ما أعطّل حد — domain ورا domain، على branch، والأساس ينزل الأول." }
  ],

  built: [
    { title: { en: "Billing formula builder (MEDX-1057)", ar: "الـ Formula builder للفواتير (MEDX-1057)" }, items: [
      { en: "Editor that inserts variables (from the service's questions) and operators at the cursor, with name suggestions", ar: "Editor بيحط المتغيرات (من أسئلة الخدمة) والعلامات مكان الـ cursor، ومعاه اقتراحات للأسماء" },
      { en: "Instant validation with mathjs: parse to a tree, allow only known variables and + − × ÷ ^ %, no functions, catch divide-by-zero", ar: "Validation فوري بـ mathjs: يحول المعادلة لشجرة، يسمح بس بالمتغيرات المعروفة و + − × ÷ ^ %، مفيش functions، ويمسك القسمة على صفر" },
      { en: "Output type, unique formula names, rounding warnings, a test panel", ar: "نوع الناتج، أسماء formulas مش متكررة، تحذيرات التقريب، و test panel" },
      { en: "First version also had drag-and-drop and its own parser/evaluator; the team later simplified it", ar: "أول نسخة كان فيها drag-and-drop و parser/evaluator خاص بيها. والتيم بعدين بسّطها" }
    ]},
    { title: { en: "TanStack Query migration (MEDX-879)", ar: "النقل لـ TanStack Query (MEDX-879)" }, items: [
      { en: "Shared QueryClient with defaults + devtools", ar: "QueryClient مشترك بـ defaults و devtools" },
      { en: "Layer: axios instance → service objects → query hooks → components", ar: "طبقات: axios instance ← service objects ← query hooks ← components" },
      { en: "25 domain modules: orders, invitations, messaging, staff, teams, billing, documents, practices, locations…", ar: "25 domain module: الأوردرات، الدعوات، الرسايل، الستاف، التيمز، الفواتير، المستندات، العيادات، الأماكن…" },
      { en: "Migrated the order, messaging/notifications, invitations, staff, teams and billing screens on the branch", ar: "نقلت شاشات الأوردرات، الرسايل والإشعارات، الدعوات، الستاف، التيمز، والفواتير على الـ branch" },
      { en: "React Query implementation guide for the team", ar: "Guide لـ React Query للتيم" }
    ]}
  ],

  myRole: [
    { en: "52 commits (Dec 2025 – Feb 2026) in a repo with ~3.9k commits and many developers. Then I moved to other nWeave projects.", ar: "52 كوميت (ديسمبر 2025 – فبراير 2026) في repo فيه حوالي 3.9k كوميت ومطورين كتير. وبعدها اتنقلت لمشاريع تانية في nWeave." },
    { en: "<b>Formula builder: I built it</b> — drag-and-drop editor, my own parser and evaluator, mathjs validation, test panel — and it was merged into <code>dev</code>. Later a teammate restructured it into a simpler text editor; about half of today's module and the whole validator are still my code.", ar: "<b>الـ formula builder: اتبنى مع زميل.</b> أنا عملت أول نسخة، وزميل عمل لها restructure وزوّد عليها. والنهارده على <code>dev</code>، حوالي نص سطور الموديول بتوعي، والـ validator بتاع mathjs كله بتاعي." },
    { en: "<b>TanStack Query: I led it</b> on branch MEDX-879. The base (QueryClient + the <code>src/query</code> pattern) shipped, and the team uses it for new modules; most screens still use <code>useAxios</code> and move over in stages.", ar: "<b>الـ TanStack Query: أنا اللي قُدته</b>، على branch اسمه MEDX-879. الأساس نزل (الـ QueryClient وشكل <code>src/query</code>)، والتيم بيستخدمه في الموديولات الجديدة. ومعظم الشاشات لسه على <code>useAxios</code>، وبتتنقل على مراحل." },
    { en: "Not mine: Azure MSAL, SignalR, the QuestionMaker. They were in the codebase before me.", ar: "مش بتوعي: Azure MSAL، و SignalR، و الـ QuestionMaker. كانوا موجودين قبلي." }
  ],

  stack: [
    [{ en: "Core", ar: "الأساس" }, ["React 18", "JavaScript", "React Router", "CRA / craco"]],
    [{ en: "Data", ar: "الداتا" }, ["TanStack Query 5", "axios", "qs"]],
    [{ en: "State", ar: "الـ State" }, ["Zustand (existing)"]],
    [{ en: "UI", ar: "الواجهة" }, ["PrimeReact", "Tailwind"]],
    [{ en: "Formulas", ar: "المعادلات" }, ["mathjs", "react-hook-form"]],
    [{ en: "Backend", ar: "الباك إند" }, ["ASP.NET Core (team's)", "SignalR + Azure MSAL (existing)"]]
  ],

  decisions: [
    {
      title: { en: "Replace a custom fetch hook", ar: "تبديل الـ fetch hook المخصوص" },
      chose: "TanStack Query", alts: ["Keep useAxios + useEffect", "RTK Query", "SWR"],
      why: { en: "<code>useAxios</code> + <code>useEffect</code> meant every screen managed its own loading, errors and refetching, the same order was fetched many times, and two quick actions could race. TanStack Query gives one cache, request dedupe, invalidation after writes and devtools.", ar: "<code>useAxios</code> مع <code>useEffect</code> معناها إن كل شاشة بتدير الـ loading والـ errors والـ refetch لوحدها، ونفس الأوردر بيتجاب كذا مرة، واتنين أكشن ورا بعض ممكن يتسابقوا. TanStack Query بيدي كاش واحد، ويمنع تكرار الـ requests، و invalidation بعد الكتابة، و devtools." },
      both: { v: "partly", en: "Yes during a migration: old screens keep <code>useAxios</code>, new ones use queries. Long-term, one way only — otherwise data is fetched and cached two ways.", ar: "أيوه وقت الـ migration: الشاشات القديمة على <code>useAxios</code> والجديدة على queries. على المدى الطويل طريقة واحدة بس — غير كده الداتا بتتجاب وتتخزن بطريقتين." },
      better: { en: "Same tool. RTK Query only makes sense if the app already lives in Redux; this app uses Zustand.", ar: "نفس الأداة. الـ RTK Query بيبقى منطقي لو الـ app أصلًا على Redux، وده على Zustand." },
      say: "The custom hook made every screen own its loading and caching, so I moved server state to TanStack Query to get one cache, dedupe and invalidation.",
      concept: "server-state"
    },
    {
      title: { en: "Big-bang or step by step", ar: "مرة واحدة ولا خطوة خطوة" },
      chose: "Domain by domain on a branch", alts: ["Rewrite everything at once", "Only new screens"],
      why: { en: "Many people commit to this repo every day. A big-bang rewrite would conflict with everyone and be hard to test. So: land the QueryClient and the folder pattern first, then move one domain at a time (orders, invitations, staff…), each one testable alone.", ar: "ناس كتير بتعمل كوميت كل يوم في الـ repo. لو غيرت كله مرة واحدة هيعمل conflicts مع الكل وهيبقى صعب يتعمله test. فالخطة: الـ QueryClient وشكل الفولدرات ينزلوا الأول، وبعدين domain واحد كل مرة (الأوردرات، الدعوات، الستاف…)، وكل واحد يتشيك لوحده." },
      both: { v: "yes", en: "New screens use queries from day one while old domains move over — that's exactly the strangler approach.", ar: "الشاشات الجديدة تستخدم queries من أول يوم، والـ domains القديمة تتنقل بالتدريج — ده بالظبط الـ strangler approach." },
      better: { en: "Same plan, with smaller PRs merged to <code>dev</code> per domain instead of one long-lived branch — long branches are what slowed the rollout.", ar: "نفس الخطة، بس بـ PRs أصغر تتعمل merge في <code>dev</code> لكل domain بدل branch واحد طويل — الـ branches الطويلة هي اللي أخّرت النزول." },
      say: "I migrated domain by domain so other teams could keep shipping; in hindsight, merging each domain separately would have shipped it faster."
    },
    {
      title: { en: "Where API calls live", ar: "الـ API calls مكانها فين" },
      chose: "Service objects + query hooks", alts: ["Call axios inside components", "One giant api.js"],
      why: { en: "Three layers: an axios instance (base URL, token), a <b>service object</b> per domain with plain async functions, and <b>query hooks</b> that wrap them with keys and invalidation. Components only call hooks. Services stay easy to test and reuse outside React.", ar: "3 طبقات: axios instance (الـ base URL والتوكن)، و<b>service object</b> لكل domain فيه async functions عادية، و<b>query hooks</b> بتلفهم بالـ keys والـ invalidation. الـ components بتنادي hooks بس. والـ services سهلة تتعمل test وتتستخدم برا React." },
      both: { v: "yes", en: "Services + hooks are complementary: the service knows HTTP, the hook knows caching.", ar: "الـ services والـ hooks بيكملوا بعض: الـ service يعرف الـ HTTP، والـ hook يعرف الـ caching." },
      better: { en: "Same layering. In TypeScript I'd add <code>queryOptions()</code> factories so keys and functions travel together.", ar: "نفس التقسيم. لو TypeScript كنت هضيف <code>queryOptions()</code> factories علشان الـ key والـ function يمشوا مع بعض." },
      say: "Components call hooks, hooks call services, services call axios — each layer has one job."
    },
    {
      title: { en: "Query keys", ar: "الـ Query keys" },
      chose: "Plain arrays per hook", alts: ["Query-key factory per domain", "String keys"],
      why: { en: "I wrote keys like <code>[\"orderDetails\", orderId, isOrdering]</code> next to each hook — quick to read during a migration.", ar: "كتبت الـ keys زي <code>[\"orderDetails\", orderId, isOrdering]</code> جنب كل hook — سهلة القراية وقت الـ migration." },
      both: { v: "yes", en: "You can move to a factory later without changing behaviour.", ar: "ممكن تنقل لـ factory بعدين من غير ما السلوك يتغير." },
      better: { en: "A <b>key factory per domain</b> (<code>orderKeys.detail(id)</code>). With 25 modules, hand-written keys drift, and invalidating \"all orders\" becomes guesswork.", ar: "<b>Key factory لكل domain</b> (<code>orderKeys.detail(id)</code>). مع 25 موديول، الـ keys المكتوبة بإيدك بتتلخبط، و invalidate لـ «كل الأوردرات» بيبقى تخمين." },
      say: "I'd use a key factory per domain today; with many modules it keeps invalidation precise.",
      concept: "query-keys"
    },
    {
      title: { en: "Cache defaults", ar: "إعدادات الكاش الافتراضية" },
      chose: "staleTime 5 min, no focus refetch, retry 1", alts: ["Library defaults (staleTime 0)", "Per-query only"],
      why: { en: "Most data (services, practices, staff) changes rarely, and the old app never refetched on focus — users would notice sudden reloads. Writes invalidate what they change, so freshness comes from mutations, not timers. Mutations never retry (no double orders).", ar: "معظم الداتا (الخدمات، العيادات، الستاف) نادرًا ما بتتغير، والتطبيق القديم عمره ما عمل refetch مع الـ focus — المستخدم كان هياخد باله من reload مفاجئ. والكتابة بتعمل invalidate للي اتغير، فالداتا الجديدة بتيجي من الـ mutations مش من تايمر. والـ mutations مفيهاش retry (علشان مايتعملش أوردر مرتين)." },
      both: { v: "yes", en: "Global defaults + per-query overrides (e.g. a short staleTime for notifications).", ar: "Defaults عامة + تعديل لكل query (زي staleTime قصير للإشعارات)." },
      better: { en: "Same idea. Note v5 renamed <code>cacheTime</code> to <code>gcTime</code> — I had to fix that.", ar: "نفس الفكرة. خلي بالك إن v5 غيّر اسم <code>cacheTime</code> لـ <code>gcTime</code> — واضطريت أصلّحها." },
      say: "Freshness comes from invalidating after writes, so a five-minute staleTime avoided refetch storms without showing stale data after edits."
    },
    {
      title: { en: "Validating a formula", ar: "إزاي نتأكد إن المعادلة صح" },
      chose: "mathjs AST + allowlist (client) and the API (final)", alts: ["eval / new Function", "Regex", "Server only"],
      why: { en: "Formulas decide how much a patient is billed, so they must be safe and correct. mathjs <b>parses to a tree</b>; I walk it and allow only the service's variables and basic operators — no functions, no <code>eval</code>. A trial run with every variable = 1 catches divide-by-zero. The API's <code>EvaluateExpressionSyntax</code> stays the final check before saving.", ar: "المعادلات بتحدد المريض هيدفع كام، فلازم تبقى آمنة وصح. الـ mathjs <b>بيحوّل المعادلة لشجرة</b>، وأنا بمشي عليها. وبسمح بس بمتغيرات الخدمة والعلامات الأساسية، فمفيش functions ومفيش <code>eval</code>. وتجربة بكل المتغيرات = 1 بتمسك القسمة على صفر. والـ API (<code>EvaluateExpressionSyntax</code>) هو الفحص النهائي قبل الحفظ." },
      both: { v: "yes", en: "Client check for instant feedback, server check as the source of truth — always both for money.", ar: "فحص في الفرونت علشان الرد يبقى فوري، وفحص في السيرفر كمصدر الحقيقة — في الفلوس لازم الاتنين." },
      better: { en: "Same split. I'd add unit tests for tricky expressions (nested brackets, % and ^ precedence).", ar: "نفس التقسيم. كنت هضيف unit tests للمعادلات الصعبة (أقواس جوه أقواس، وأولوية % و ^)." },
      say: "I never eval user formulas: mathjs parses them into a tree, I allow only known variables and operators, and the server re-validates before saving."
    },
    {
      title: { en: "How admins build a formula", ar: "الأدمن بيكتب المعادلة إزاي" },
      chose: "Text editor + click-to-insert + suggestions", alts: ["Drag-and-drop blocks", "Free text only"],
      why: { en: "My first version had drag-and-drop blocks. It looked friendly but was slow for long formulas and hard to edit in the middle. The shipped editor is a text field where clicking a variable or operator inserts it at the cursor, with name suggestions while typing.", ar: "أول نسخة عملتها كان فيها drag-and-drop بلوكات. شكلها سهل، بس كانت بطيئة في المعادلات الطويلة وصعب تعدل في النص. اللي نزل: text field، لما تضغط على متغير أو علامة بتتحط مكان الـ cursor، ومعاه اقتراحات للأسماء وانت بتكتب." },
      both: { v: "partly", en: "Blocks can help beginners, but two editing modes double the bugs. One good text editor won.", ar: "البلوكات ممكن تساعد المبتدئين، بس طريقتين تعديل يعني bugs الضعف. Text editor واحد كويس كسب." },
      better: { en: "Today: a small code editor (CodeMirror) with variable autocomplete and inline error underlines.", ar: "النهارده: code editor صغير (CodeMirror) فيه autocomplete للمتغيرات وخط تحت الغلط." },
      say: "We started with drag-and-drop, but power users wrote long formulas, so a text editor with click-to-insert and autocomplete worked better."
    },
    {
      title: { en: "Variables are names, storage uses IDs", ar: "المتغيرات أسماء، بس اللي بيتخزن IDs" },
      chose: "Show names, save question IDs", alts: ["Save names as typed"],
      why: { en: "Admins write <code>weight * 2</code>, but a question can be renamed later. Before saving, names are replaced with question IDs, so renaming a question doesn't break existing formulas.", ar: "الأدمن بيكتب <code>weight * 2</code>، بس اسم السؤال ممكن يتغير بعدين. قبل الحفظ الأسماء بتتبدل بـ IDs الأسئلة، فتغيير اسم سؤال مابيبوظش المعادلات القديمة." },
      both: { v: "yes", en: "Names for people, IDs for storage — convert at the edges.", ar: "الأسماء للناس، والـ IDs للتخزين — والتحويل عند الحدود." },
      better: { en: "Same.", ar: "نفس الحاجة." },
      say: "Formulas are stored with question IDs and shown with names, so renaming a question never breaks a saved formula."
    }
  ],

  flows: [
    { title: { en: "Saving a billing formula", ar: "حفظ معادلة فواتير" }, steps: [
      ["Write", { en: "Type or click variables/operators into the editor", ar: "اكتب أو اضغط على المتغيرات والعلامات" }],
      ["Validate", { en: "mathjs parse → allowlist walk → trial run", ar: "mathjs parse ← فحص الـ allowlist ← تجربة" }],
      ["Server check", { en: "POST EvaluateExpressionSyntax", ar: "POST EvaluateExpressionSyntax" }],
      ["IDs", { en: "Replace variable names with question IDs", ar: "بدّل أسماء المتغيرات بـ IDs الأسئلة" }],
      ["Save", { en: "Save the formula with the service", ar: "احفظ المعادلة مع الخدمة" }]
    ]},
    { title: { en: "A screen after the migration", ar: "شاشة بعد الـ migration" }, steps: [
      ["Component", { en: "useGetOrderDetails(id)", ar: "useGetOrderDetails(id)" }],
      ["Hook", { en: "useQuery({ queryKey, queryFn })", ar: "useQuery({ queryKey, queryFn })" }],
      ["Service", { en: "ordersService.getOrderDetails()", ar: "ordersService.getOrderDetails()" }],
      ["axios", { en: "api.get with the token", ar: "api.get بالتوكن" }],
      ["Write", { en: "useUpdateOrder → onSuccess invalidate order keys", ar: "useUpdateOrder ← onSuccess invalidate لـ keys الأوردر" }]
    ]}
  ],

  patterns: [
    {
      title: { en: "Safe formula check with an AST", ar: "فحص آمن للمعادلة بالـ AST" },
      body: { en: "Parse, walk the tree, reject anything not allowed. Never eval.", ar: "اعمل parse، وامشي على الشجرة، وارفض أي حاجة مش مسموحة. وعمرك ما تستخدم eval." },
      code: "const ALLOWED_OPS = [\"+\", \"-\", \"*\", \"/\", \"^\", \"%\"];\n\nfunction check(expr, variables) {\n  const tree = math.parse(expr);\n  tree.traverse((node) => {\n    if (node.isFunctionNode) throw new Error(\"No functions\");\n    if (node.isSymbolNode && !variables.includes(node.name)) throw new Error(`Unknown: ${node.name}`);\n    if (node.isOperatorNode && !ALLOWED_OPS.includes(node.op)) throw new Error(`Not allowed: ${node.op}`);\n  });\n  const trial = tree.compile().evaluate(Object.fromEntries(variables.map(v => [v, 1])));\n  if (!Number.isFinite(trial)) throw new Error(\"Invalid result (divide by zero?)\");\n}"
    },
    {
      title: { en: "Service + query hook", ar: "Service و query hook" },
      body: { en: "The service knows HTTP; the hook knows caching.", ar: "الـ service يعرف الـ HTTP، والـ hook يعرف الـ caching." },
      code: "export const ordersService = {\n  get: (id) => api.get(`/orders/${id}`).then(r => r.data),\n  update: (id, body) => api.put(`/orders/${id}`, body).then(r => r.data),\n};\n\nexport const useOrder = (id) =>\n  useQuery({ queryKey: [\"orders\", id], queryFn: () => ordersService.get(id), enabled: !!id });\n\nexport const useUpdateOrder = () => {\n  const qc = useQueryClient();\n  return useMutation({\n    mutationFn: ({ id, body }) => ordersService.update(id, body),\n    onSuccess: (_, { id }) => qc.invalidateQueries({ queryKey: [\"orders\", id] }),\n  });\n};"
    },
    {
      title: { en: "Insert at the cursor", ar: "حط النص مكان الـ cursor" },
      body: { en: "Use selectionStart/End, then put the cursor after the inserted text.", ar: "استخدم selectionStart و End، وبعدين رجّع الـ cursor بعد النص اللي اتحط." },
      code: "function insertAtCursor(textarea, text, setValue) {\n  const { selectionStart: s, selectionEnd: e, value } = textarea;\n  setValue(value.slice(0, s) + text + value.slice(e));\n  requestAnimationFrame(() => {\n    textarea.focus();\n    textarea.selectionStart = textarea.selectionEnd = s + text.length;\n  });\n}"
    }
  ],

  hooks: [
    { group: { en: "On the migration branch (src/query)", ar: "على branch الـ migration (src/query)" }, items: [
      { name: "useMutation", count: "×169", what: { en: "Every write: create/update/accept orders, invite, resend, delete…", ar: "كل كتابة: إنشاء وتعديل وقبول الأوردرات، الدعوة، إعادة الإرسال، الحذف…" }, remember: { en: "Some reads were also wrapped as mutations (search-as-you-type, counts) — a smell; they should be queries.", ar: "شوية قراية اتعملت كـ mutations، زي البحث وإنت بتكتب، والأعداد. ودي غلطة، المفروض تبقى queries." } },
      { name: "useQuery", count: "×49", what: { en: "Order details, lists, settings, dashboards", ar: "تفاصيل الأوردر، القوايم، الإعدادات، الداشبورد" }, remember: { en: "<code>enabled: !!id</code> waits for the id.", ar: "<code>enabled: !!id</code> بيستنى الـ id." } },
      { name: "invalidateQueries", count: "×53", what: { en: "Refresh after writes", ar: "تحديث بعد الكتابة" }, remember: { en: "Hand-written keys must match exactly — a factory would help.", ar: "الـ keys المكتوبة بإيدك لازم تطابق بالظبط — الـ factory كان هيساعد." } },
      { name: "useQueryClient", count: "×44", what: { en: "Access the cache inside mutation hooks", ar: "الوصول للكاش جوه الـ mutation hooks" }, remember: { en: "One shared QueryClient created at the app root.", ar: "QueryClient واحد مشترك متعمل في أول التطبيق." } }
    ]},
    { group: { en: "Formula builder", ar: "الـ Formula builder" }, items: [
      { name: "useForm", count: "×1", what: { en: "The formula form (name, expression, output type)", ar: "فورم المعادلة (الاسم، المعادلة، نوع الناتج)" }, remember: { en: "API errors go back onto the expression field with setError.", ar: "أخطاء الـ API بترجع على field المعادلة بـ setError." } },
      { name: "useRef", count: "×10", what: { en: "The textarea, to insert at the cursor", ar: "الـ textarea، علشان أحط مكان الـ cursor" }, remember: { en: "Restore focus and cursor after inserting.", ar: "رجّع الـ focus والـ cursor بعد ما تحط." } },
      { name: "useState / useEffect", count: "×43 / ×24", what: { en: "Suggestions list, validation messages, panels", ar: "قايمة الاقتراحات، رسايل الـ validation، الـ panels" }, remember: { en: "Validation result is derived from the expression, not stored twice.", ar: "نتيجة الـ validation بتتحسب من المعادلة، مش متخزنة مرتين." } }
    ]}
  ],

  problems: [
    {
      title: { en: "Same data fetched again and again", ar: "نفس الداتا بتتجاب كذا مرة" },
      problem: { en: "With <code>useAxios</code> + <code>useEffect</code>, every component fetched on mount; the order page, its sidebar and notifications each loaded the same data, and two quick clicks could race.", ar: "مع <code>useAxios</code> و <code>useEffect</code>، كل component بيعمل fetch أول ما يظهر. فصفحة الأوردر والـ sidebar والإشعارات، كل واحد بيجيب نفس الداتا. ودوستين ورا بعض ممكن يتسابقوا." },
      fix: { en: "Moved those domains to query hooks with shared keys; writes invalidate the affected keys.", ar: "نقلت الـ domains دي لـ query hooks بـ keys مشتركة. والكتابة بتعمل invalidate للـ keys اللي اتأثرت." },
      result: { en: "One request per key on the migrated screens, and consistent data after edits.", ar: "Request واحد لكل key في الشاشات اللي اتنقلت، وداتا متسقة بعد التعديل." },
      lesson: { en: "I don't have a measured % — don't quote one.", ar: "معنديش نسبة متقاسة — متقولش رقم." }
    },
    {
      title: { en: "v5 option silently ignored", ar: "Option في v5 كان بيتجاهل من غير ما حد يحس" },
      problem: { en: "The QueryClient used <code>cacheTime</code>, which TanStack Query v5 renamed to <code>gcTime</code>, so the setting did nothing.", ar: "الـ QueryClient كان فيه <code>cacheTime</code>، و v5 غيّر اسمها لـ <code>gcTime</code>، فالإعداد ماكانش بيعمل حاجة." },
      fix: { en: "Switched to <code>gcTime</code> (commit 5ce75a0d).", ar: "غيرتها لـ <code>gcTime</code> (كوميت 5ce75a0d)." },
      result: { en: "Cache lifetime works as intended.", ar: "مدة الكاش بقت شغالة زي ما المفروض." },
      lesson: { en: "Read the migration guide when a major version is installed; JS won't warn you — TypeScript would have.", ar: "اقرا الـ migration guide لما تنزّل major version. الـ JS مش هيحذّرك، لكن TypeScript كان هيحذّرك." }
    },
    {
      title: { en: "Unsafe or broken formulas", ar: "معادلات خطر أو بايظة" },
      problem: { en: "A formula decides billing amounts. A typo, an unknown variable or a divide-by-zero would only show up when an order was billed.", ar: "المعادلة بتحدد مبلغ الفاتورة. غلطة كتابة، أو متغير مش موجود، أو قسمة على صفر كانت هتبان بس وقت ما الأوردر يتحاسب." },
      fix: { en: "Instant mathjs validation with an allowlist and a trial run, a test panel, and the server check before saving.", ar: "Validation فوري بـ mathjs بـ allowlist وتجربة، و test panel، وفحص السيرفر قبل الحفظ." },
      result: { en: "Errors show while typing, with a clear message, before anything is saved.", ar: "الأخطاء بتبان وانت بتكتب، برسالة واضحة، قبل ما أي حاجة تتحفظ." }
    }
  ],

  star: {
    s: { en: "A large healthcare platform fetched data with a custom hook: duplicated requests, scattered loading logic and occasional race conditions; many developers committed every day.", ar: "منصة صحية كبيرة كانت بتجيب الداتا بـ hook مخصوص. فكان فيه requests متكررة، و loading متفرق، وأحيانًا race conditions. ومطورين كتير بيعملوا commit كل يوم." },
    t: { en: "Introduce TanStack Query without blocking other teams.", ar: "أدخّل TanStack Query من غير ما أعطّل التيمز التانية." },
    a: { en: "Set up a shared QueryClient and a services → hooks pattern, migrated 25 domains on a branch one by one, and wrote a guide for the team.", ar: "عملت QueryClient مشترك وشكل services ← hooks، ونقلت 25 domain على branch واحد ورا التاني، وكتبت guide للتيم." },
    r: { en: "The base and the pattern shipped and the team uses them for new modules; the remaining screens move over in stages. Lesson: merge per domain instead of one long branch.", ar: "الأساس والشكل نزلوا، والتيم بيستخدمهم في الموديولات الجديدة. والشاشات الباقية بتتنقل على مراحل. والدرس: merge لكل domain، بدل branch واحد طويل." }
  },

  qa: [
    { q: "Why move from a custom Axios hook to TanStack Query?", a: { en: "Server state needs caching, dedupe, invalidation and retry rules. The custom hook rebuilt that per screen; TanStack Query does it once.", ar: "الـ server state محتاج caching، ومنع للتكرار، و invalidation، وقواعد retry. الـ hook المخصوص كان بيعمل ده في كل شاشة لوحدها. أما TanStack Query فبيعمله مرة واحدة." } },
    { q: "How do you migrate a big codebase safely?", a: { en: "Strangler approach: land the base first, move one domain at a time behind the same UI, keep old and new side by side, merge small. My mistake was keeping one long branch.", ar: "الـ strangler approach: نزّل الأساس الأول، وانقل domain واحد كل مرة من غير ما الواجهة تتغير، وخلي القديم والجديد جنب بعض، واعمل merge صغير. غلطتي إني سبت branch واحد طويل." } },
    { q: "How did you make user-written formulas safe?", a: { en: "No eval. mathjs parses to an AST; I allow only known variables and basic operators, block functions, do a trial run, and the server validates again before saving.", ar: "مفيش eval. الـ mathjs بيعمل AST، وأنا بسمح بس بالمتغيرات المعروفة والعلامات الأساسية. وبمنع الـ functions، وبعمل تجربة. والسيرفر بيعمل validation تاني قبل الحفظ." } },
    { q: "When would you use useMutation for a read?", a: { en: "Almost never. In this codebase some searches were mutations because they ran from event handlers; a query with <code>enabled</code> and a debounced key is the right tool.", ar: "تقريبًا أبدًا. في الكود ده، شوية بحث اتعمل mutations لأنه كان بيتنادى من event handlers. والصح query بـ <code>enabled</code>، و key عليه debounce." } }
  ],

  terms: ["server state", "request deduplication", "query invalidation", "staleTime / gcTime", "strangler migration", "service layer", "AST", "allowlist", "mathjs", "client vs server validation"],

  dont: [
    { en: "Don't say you implemented Azure MSAL SSO, SignalR or the QuestionMaker — they were there before you.", ar: "متقولش إنك عملت Azure MSAL SSO أو SignalR أو الـ QuestionMaker — كانوا موجودين قبلك." },
    { en: "Don't say the whole app runs on TanStack Query — the base shipped; most screens move over in stages.", ar: "متقولش إن التطبيق كله على TanStack Query — الأساس نزل، ومعظم الشاشات بتتنقل على مراحل." },
    { en: "If asked whether it's still drag-and-drop today, say no: the team later simplified it to a text editor with click-to-insert — and explain why that was a good call.", ar: "لو اتسألت هو لسه drag-and-drop النهارده، قول لأ: التيم بعدين بسّطه لـ text editor فيه click-to-insert — واشرح ليه ده كان قرار كويس." },
    { en: "Don't quote \"40% fewer requests\" or any percentage — nothing was measured.", ar: "متقولش «40% requests أقل» أو أي نسبة — مفيش حاجة اتقاست." }
  ],

  evidence: [
    "Repo: Bitbucket nweave/ahs-medical-exchange-services-frontend — 52 non-merge commits by him, 2025-12-02 → 2026-02-08",
    "Migration: branch MEDX-879/using-react-query (25 modules in src/query, 31 files; 169 useMutation, 49 useQuery); base on MEDX-879/react-query-base; mono repo ClientApp has the QueryClient and src/query (2026-10)",
    "Formula: MEDX-1057 branches; on origin/dev about half of the formula module's lines (git blame) and all of src/utils/formulaValidator.js are his; parser/evaluator/drag-drop files removed in the teammate's restructure (37a14c6b, 8d2ad80d)",
    "Deep dive: evidence/projects/ahs-medx.md"
  ]
});
