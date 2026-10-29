// Smart FAQ — researched from the code on laptop 1 (Bitbucket nweave/smart-faq-frontend, all branches), 2026-10-28.
// Facts only; code sketches are simplified patterns written from scratch, not project code.
HANDBOOK.projects.push({
  id: "smartfaq",
  name: "Smart FAQ",
  logo: "assets/img/smartfaq-logo.webp",
  monogram: "SF",
  color: "#5b3fd6",
  company: "nWeave",
  years: "2026",
  period: "Oct 2026",
  role: { en: "Lead frontend (main author)", ar: "الفرونت إند الأساسي (lead)" },
  team: { en: "Me + 1 frontend (7 commits) + ASP.NET Core backend team", ar: "أنا + فرونت تاني (7 كوميت) + تيم باك إند ASP.NET Core" },
  tagline: { en: "An internal knowledge hub for a healthcare operations client: search, write, review, publish.", ar: "مكتبة معلومات داخلية لعميل في مجال تشغيل خدمات صحية: بحث، كتابة، مراجعة، نشر." },
  stats: [
    ["166 / 173", { en: "commits (mine / total)", ar: "كوميت (بتوعي / الكل)" }],
    ["27", { en: "Figma screens", ar: "شاشة من Figma" }],
    ["551", { en: "unit + component tests", ar: "test" }],
    ["94", { en: "typed API endpoints", ar: "endpoint متعملهم types" }],
    ["~3 wk", { en: "Oct 4 → Oct 26", ar: "4 أكتوبر ← 26 أكتوبر" }]
  ],

  pitch: [
    { en: "Smart FAQ lets a healthcare operations team find <b>approved answers</b> fast. Knowledge Managers write articles, Admins review and publish them, and every answer is traceable.", ar: "Smart FAQ بيخلي تيم التشغيل يلاقي <b>إجابات متراجعة ومعتمدة</b> بسرعة. الـ Knowledge Managers بيكتبوا المقالات، والأدمن بيراجع وينشر، وكل إجابة ليها مصدر." },
    { en: "I built the frontend <b>from the first commit</b>: architecture, design system, 27 screens, data layer, auth and tests — React 19, TypeScript, TanStack Query, Tailwind, shadcn/ui.", ar: "بنيت الفرونت إند <b>من أول commit</b>: الـ architecture، والـ design system، و 27 شاشة، والـ data layer، والـ auth، والـ tests. والـ stack: React 19 و TypeScript و TanStack Query و Tailwind و shadcn/ui." },
    { en: "Hardest parts: a <b>secure cookie session with XSRF tokens</b>, <b>safe concurrent edits with ETags</b>, and keeping a big admin table fast (<b>20 ms → 2 ms</b> per re-render).", ar: "أصعب حاجات: <b>session بالكوكي مع XSRF token</b>، <b>تعديل آمن لما اتنين يعدلوا نفس الحاجة (ETag)</b>، وإن جدول الأدمن الكبير يفضل سريع (<b>من 20ms لـ 2ms</b> في كل re-render)." }
  ],

  built: [
    { title: { en: "Foundation", ar: "الأساس" }, items: [
      { en: "Vite + React 19 + TypeScript setup, React Router 8, route layouts per role", ar: "Setup بـ Vite و React 19 و TypeScript، و React Router 8، و layout لكل role" },
      { en: "Atomic-Design component system (atoms → templates) with 75 Storybook stories and a11y checks", ar: "Design system بـ Atomic Design (من atoms لحد templates) و 75 Storybook story ومعاهم فحص a11y" },
      { en: "Context docs for the team: architecture, data layer, code standards, progress tracker", ar: "Docs للتيم: الـ architecture، الـ data layer، قواعد الكود، و progress tracker" }
    ]},
    { title: { en: "Auth & access", ar: "الـ Auth والصلاحيات" }, items: [
      { en: "Sign-in, invitation activation, password change, session-expired screen", ar: "تسجيل الدخول، تفعيل الدعوة، تغيير الباسورد، شاشة انتهاء الـ session" },
      { en: "MFA setup and verification for Admins", ar: "إعداد وتأكيد الـ MFA للأدمن" },
      { en: "Capability-based navigation and route guards (3 roles)", ar: "Navigation و route guards على حسب الـ capabilities (3 roles)" }
    ]},
    { title: { en: "Readers", ar: "القرّاء" }, items: [
      { en: "Knowledge home, departments, search with highlights and multi-department filter", ar: "الصفحة الرئيسية، الأقسام، بحث بيلوّن الكلمات وفلتر لأكتر من قسم" },
      { en: "Published article page, recently opened, report a problem, ask a question", ar: "صفحة المقال، آخر حاجات اتفتحت، الإبلاغ عن مشكلة، اسأل سؤال" }
    ]},
    { title: { en: "Authors & reviewers", ar: "الكتّاب والمراجعين" }, items: [
      { en: "TipTap editor with callouts, tables and safe links", ar: "Editor بـ TipTap فيه callouts وجداول ولينكات آمنة" },
      { en: "Drafts: validate → preview → submit → returned / published, discard, withdraw", ar: "الـ Drafts: validate ← preview ← submit ← رجع / اتنشر، و discard و withdraw" },
      { en: "Review queue, compare a correction with the published version", ar: "قايمة المراجعة، ومقارنة التصحيح بالنسخة المنشورة" }
    ]},
    { title: { en: "Admin", ar: "الأدمن" }, items: [
      { en: "Users: invite, edit, role, disable, delete; MFA reset", ar: "اليوزرز: دعوة، وتعديل، و role، وإيقاف، وحذف. وإعادة ضبط الـ MFA" },
      { en: "Department/category tree with drag-and-drop (mouse + keyboard)", ar: "شجرة الأقسام والتصنيفات بالـ drag-and-drop (ماوس وكيبورد)" },
      { en: "Audit log with action/result/date filters; search synonyms; per-user time zone", ar: "audit log بفلاتر للأكشن والنتيجة والتاريخ. ومرادفات البحث. و time zone لكل يوزر" }
    ]}
  ],

  myRole: [
    { en: "Lead and main author: 166 of 173 commits. A second frontend developer added 7 commits.", ar: "الـ lead والكاتب الأساسي: 166 من 173 كوميت. فرونت تاني ضاف 7 كوميت." },
    { en: "I wrote the shared core myself: the HTTP client, query client, retry rules, session handling, URL filters, the article HTML allowlist and the data table.", ar: "الأجزاء المشتركة كلها أنا اللي كتبتها: الـ HTTP client، الـ query client، قواعد الـ retry، الـ session، فلاتر الـ URL، الـ allowlist بتاع HTML المقال، والجدول." },
    { en: "The ASP.NET Core API is another team's work. I worked from its OpenAPI contract and sent them backend requests per unit.", ar: "الـ API بـ ASP.NET Core شغل تيم تاني. أنا اشتغلت من الـ OpenAPI contract بتاعه وكنت ببعتلهم طلبات لكل unit." },
    { en: "I used an AI-assisted workflow (context docs, unit plans, progress tracker). I reviewed and own every line I shipped.", ar: "اشتغلت بـ AI-assisted workflow (context docs، خطط لكل unit، progress tracker). وراجعت كل سطر نزل وأنا مسؤول عنه." }
  ],

  stack: [
    [{ en: "Core", ar: "الأساس" }, ["React 19", "TypeScript 6", "Vite 8", "React Router 8"]],
    [{ en: "Data", ar: "الداتا" }, ["TanStack Query 5", "fetch client", "openapi-typescript"]],
    [{ en: "Forms", ar: "الفورمز" }, ["react-hook-form", "Zod"]],
    [{ en: "UI", ar: "الواجهة" }, ["Tailwind v4", "shadcn/ui", "Radix", "lucide", "TipTap 3", "dnd-kit"]],
    [{ en: "Quality", ar: "الجودة" }, ["Vitest 4", "Testing Library", "Playwright (browser runner)", "Storybook 10 + a11y", "oxlint"]]
  ],

  decisions: [
    {
      title: { en: "SPA, not Next.js", ar: "SPA مش Next.js" },
      chose: "Vite + React Router", alts: ["Next.js App Router", "Remix"],
      why: { en: "The app is <b>invitation-only</b> — nothing needs SEO or server rendering. The API is a separate ASP.NET Core service, so a static SPA behind a proxy is the simplest deploy. Vite gives very fast dev and tests (Vitest shares its config).", ar: "التطبيق <b>بالدعوة بس</b> — مفيش حاجة محتاجة SEO أو server rendering. والـ API سيرفس منفصلة بـ ASP.NET Core، فـ SPA static ورا proxy هو أبسط deploy. و Vite سريع جدًا في التطوير والـ tests (Vitest بيستخدم نفس الـ config)." },
      both: { v: "no", en: "One app needs one router. You could add Next.js later for a public help site, but as a separate app.", ar: "التطبيق الواحد محتاج router واحد. ممكن بعدين تعمل موقع public بـ Next.js، بس يبقى app منفصل." },
      better: { en: "Same choice today. Next.js would add a Node server and server/client boundaries with no benefit for an internal tool.", ar: "نفس الاختيار النهارده. Next.js هيزود سيرفر Node وتقسيم server/client من غير فايدة لأداة داخلية." },
      say: "It's an invitation-only internal tool with a separate .NET API, so a Vite SPA gave us the simplest deploy and the fastest feedback loop.",
      concept: "routers"
    },
    {
      title: { en: "Login session and CSRF", ar: "الـ session والحماية من CSRF" },
      chose: "Cookie session + XSRF header (double submit)", alts: ["JWT in localStorage", "JWT in memory + refresh token"],
      why: { en: "The backend sets an httpOnly session cookie, so scripts can't steal it. Because cookies are sent automatically, every unsafe call (POST/PUT/PATCH/DELETE) also sends an <b>X-XSRF-TOKEN</b> header read from a <code>__Host-</code> cookie. If the token expired, the client fetches a new one and <b>retries once</b>; parallel calls share one refresh.", ar: "الـ backend بيحط session cookie نوعها httpOnly، فالـ scripts ماتقدرش تسرقها. وعلشان الكوكي بيتبعت لوحده، كل request بيغيّر داتا (POST/PUT/PATCH/DELETE) بيبعت كمان header اسمه <b>X-XSRF-TOKEN</b>، وبنقراه من كوكي <code>__Host-</code>. ولو الـ token خلص، الـ client بيجيب واحد جديد و<b>يعيد الـ request مرة واحدة</b>. والـ requests اللي بتحصل في نفس الوقت بيستنوا نفس الـ refresh." },
      both: { v: "no", en: "Mixing a cookie session with a bearer token in storage gives two auth paths to secure. Pick one.", ar: "لو خلطت session بالكوكي مع توكن في الـ storage يبقى عندك طريقتين auth لازم تأمنهم. اختار واحدة." },
      better: { en: "For a browser app talking to its own API, cookie + antiforgery is still the safest default (BFF pattern).", ar: "لـ app في المتصفح بيكلم الـ API بتاعه، الكوكي مع antiforgery لسه أأمن اختيار (BFF pattern)." },
      say: "The session lives in an httpOnly cookie, and every state-changing request carries an antiforgery header; if the token rotates, the client refreshes it once and retries.",
      concept: "token-storage"
    },
    {
      title: { en: "Server state and errors", ar: "الـ Server state والأخطاء" },
      chose: "TanStack Query with one typed ApiError", alts: ["RTK Query", "SWR", "useEffect + fetch"],
      why: { en: "Every API error is turned into one <code>ApiError</code> with a <b>code</b> from the API's catalogue (RFC 9457 problem+json). I registered it as React Query's <code>defaultError</code>, so every <code>error</code> is typed. Retries only happen for network loss, 5xx and 429 — a 4xx is the API's final answer. <code>Retry-After</code> is respected.", ar: "كل error من الـ API بيتحول لـ <code>ApiError</code> واحد فيه <b>code</b> من كتالوج الـ API (RFC 9457 problem+json). وسجلته كـ <code>defaultError</code> في React Query، فكل <code>error</code> ليه type. والـ retry بيحصل بس لو النت فصل أو 5xx أو 429 — الـ 4xx ده رد نهائي. وبنحترم <code>Retry-After</code>." },
      both: { v: "no", en: "Two server caches (RTK Query + TanStack Query) would fight over the same data.", ar: "كاشين للسيرفر (RTK Query و TanStack Query) هيتخانقوا على نفس الداتا." },
      better: { en: "Same tool. I'd consider generating the query hooks too (e.g. Orval) once the contract is stable.", ar: "نفس الأداة. ممكن كمان أولّد الـ query hooks نفسها (زي Orval) لما الـ contract يستقر." },
      say: "All API errors become one typed ApiError with a stable code, React Query retries only what can succeed later, and the screens switch on the code, not on the HTTP status.",
      concept: "server-state"
    },
    {
      title: { en: "Query keys across features", ar: "الـ Query keys بين الـ features" },
      chose: "Keys grouped by scope", alts: ["Each feature imports the others' keys", "Refetch everything"],
      why: { en: "Every key starts with a scope (<code>knowledge</code>, <code>drafts</code>, <code>admin</code>…). When an admin publishes, the mutation invalidates <code>[\"knowledge\"]</code> without importing the knowledge feature. Features stay independent.", ar: "كل key بيبدأ بـ scope (<code>knowledge</code>، <code>drafts</code>، <code>admin</code>…). لما الأدمن ينشر، الـ mutation بيعمل invalidate لـ <code>[\"knowledge\"]</code> من غير ما يعمل import للـ feature بتاعة الـ knowledge. فالـ features تفضل منفصلة." },
      both: { v: "yes", en: "Scopes and per-feature key factories work together: the factory builds keys, the scope is their first part.", ar: "الـ scopes والـ key factories بيشتغلوا مع بعض: الـ factory بيبني الـ keys، والـ scope أول جزء فيهم." },
      better: { en: "Same approach; it scales well. TanStack's <code>queryOptions()</code> helper makes the factories even more typed.", ar: "نفس الطريقة، وبتكبر كويس. والـ helper اللي اسمه <code>queryOptions()</code> بيخلي الـ factories عليها types أكتر." },
      say: "Query keys start with a feature scope, so one feature can refresh another's data without importing it.",
      concept: "query-keys"
    },
    {
      title: { en: "Who can do what", ar: "مين يقدر يعمل إيه" },
      chose: "Capabilities from the API", alts: ["Check the role name in the UI", "Hard-coded permission tables"],
      why: { en: "The session lists <b>capabilities</b> (<code>submission.publish</code>, <code>users.invite</code>…). Navigation, guards and buttons key on those, never on the role. When the backend changes what a role may do, the UI follows with no deploy. The backend still re-checks every request.", ar: "الـ session فيها قايمة <b>capabilities</b> (<code>submission.publish</code>، <code>users.invite</code>…). الـ navigation والـ guards والزراير بيشوفوا دي، مش اسم الـ role. لو الباك إند غيّر صلاحيات role، الواجهة بتتغير من غير deploy. والباك إند بيشيك تاني على كل request." },
      both: { v: "partly", en: "The role is still shown as a label; only access decisions use capabilities.", ar: "اسم الـ role لسه بيظهر كـ label. بس قرارات الصلاحيات بتستخدم الـ capabilities." },
      better: { en: "Same. It's how mature products do RBAC on the client.", ar: "نفس الحاجة. دي الطريقة اللي المنتجات الكبيرة بتعمل بيها RBAC في الفرونت." },
      say: "The UI never checks role names; it checks capabilities the API sends, so permissions live in one place and the server still enforces them."
    },
    {
      title: { en: "Two admins edit the same thing", ar: "اتنين أدمن يعدلوا نفس الحاجة" },
      chose: "ETag + If-Match (optimistic concurrency)", alts: ["Last write wins", "Locking"],
      why: { en: "Each department, category, draft and setting comes with an <b>ETag</b>. Saving sends it in <code>If-Match</code>. If someone saved first, the API answers <b>412</b>; the UI reloads the tree and tells the admin, instead of silently overwriting.", ar: "كل قسم وتصنيف و draft وإعداد جاي معاه <b>ETag</b>. ولما تحفظ، بنبعته في <code>If-Match</code>. ولو حد حفظ قبلك، الـ API بيرد <b>412</b>. والواجهة بتعيد تحميل الشجرة وتقول للأدمن، بدل ما تمسح شغل غيره من غير ما حد ياخد باله." },
      both: { v: "no", en: "It's one rule per resource: either you check the version or you don't.", ar: "قاعدة واحدة لكل resource: يا تشيك على النسخة يا لأ." },
      better: { en: "Same. Real-time presence (\"Sara is editing\") could be added on top, but ETags are the safety net.", ar: "نفس الحاجة. ممكن نضيف فوقها presence لايف («سارة بتعدل دلوقتي»)، بس الـ ETag هو شبكة الأمان." },
      say: "Edits send the ETag they were based on; a 412 means someone saved first, so we reload instead of overwriting their work."
    },
    {
      title: { en: "API types", ar: "الـ Types بتاعة الـ API" },
      chose: "Generated from OpenAPI", alts: ["Hand-written interfaces", "tRPC / GraphQL codegen"],
      why: { en: "The backend publishes an OpenAPI contract (94 endpoints). <code>openapi-typescript</code> turns it into types, so a renamed field breaks the build, not production. One npm script refreshes them.", ar: "الباك إند بينشر OpenAPI contract (94 endpoint). <code>openapi-typescript</code> بيحوله لـ types، فلو field اسمه اتغير الـ build هو اللي يبوظ، مش الـ production. و script واحد بيحدّثهم." },
      both: { v: "partly", en: "Hand-written UI types can wrap the generated ones (e.g. a friendlier <code>Draft</code>), but the wire types should come from the contract.", ar: "ممكن تعمل types للواجهة فوق المتولدة (زي <code>Draft</code> أسهل)، بس types الـ API نفسها لازم تيجي من الـ contract." },
      better: { en: "Same. tRPC only fits when both sides are TypeScript; here the backend is .NET.", ar: "نفس الحاجة. الـ tRPC ينفع بس لو الناحيتين TypeScript، وهنا الـ backend بـ .NET." },
      say: "Types are generated from the backend's OpenAPI contract, so contract changes show up as compile errors.",
      concept: "typescript"
    },
    {
      title: { en: "Filters in the URL — but not search words", ar: "الفلاتر في الـ URL — بس مش كلمات البحث" },
      chose: "Custom useUrlFilters", alts: ["nuqs", "useState", "Zustand"],
      why: { en: "Filters and page live in the URL so Back and reload return to the same list. Invalid values are ignored, never sent. <b>Search words stay out of the URL</b>: they may contain a caller's details, and URLs end up in logs and history.", ar: "الفلاتر ورقم الصفحة في الـ URL علشان الـ Back والـ reload يرجعوا لنفس القايمة. والقيم الغلط بتتجاهل ومش بتتبعت. <b>كلمات البحث برا الـ URL</b>: ممكن يكون فيها بيانات متصل، والـ URLs بتتسجل في الـ logs والـ history." },
      both: { v: "yes", en: "URL for shareable filters, component state for private text. That split is the point.", ar: "الـ URL للفلاتر اللي تتشارك، والـ state للنص الخاص. التقسيم ده هو الفكرة." },
      better: { en: "nuqs would save some code, but the privacy rule stays the same.", ar: "nuqs كان هيوفر شوية كود، بس قاعدة الخصوصية هي هي." },
      say: "Filters live in the URL for Back and reload, but search text never does, because it can contain patient or caller details.",
      concept: "url-state"
    },
    {
      title: { en: "Design system", ar: "الـ Design system" },
      chose: "shadcn/ui + Radix + Tailwind, Atomic Design", alts: ["MUI", "Mantine"],
      why: { en: "The Figma design is custom, and the brief was <b>1:1 at 1440 and 390 px</b>. shadcn copies accessible Radix components into the repo, so I own the markup and tokens. Atomic Design (atoms → templates) plus Storybook let each piece be built and checked alone.", ar: "الديزاين على Figma مخصوص، والمطلوب <b>1:1 على 1440 و 390 px</b>. shadcn بينسخ components من Radix (accessible) جوه الـ repo، فأنا اللي متحكم في الـ markup والـ tokens. و Atomic Design (atoms ← templates) مع Storybook خلوا كل حتة تتبني وتتشيك لوحدها." },
      both: { v: "no", en: "Two component libraries means two looks and double the bundle.", ar: "مكتبتين components يعني شكلين و bundle الضعف." },
      better: { en: "Same for a custom design. For a dense back office with a generic look, Mantine is faster.", ar: "نفس الحاجة لديزاين مخصوص. لو باك أوفيس شكله عادي، Mantine أسرع." },
      say: "shadcn gave us accessible Radix primitives we own in the repo, which made a pixel-accurate custom design practical."
    },
    {
      title: { en: "How the app is tested", ar: "إزاي التطبيق بيتعمله test" },
      chose: "Vitest + Testing Library + a fake fetch", alts: ["MSW", "Mock the hooks", "Only E2E"],
      why: { en: "Tests replace only <code>fetch</code>. Every request still goes through the real HTTP client, query client and routes, and the fake answers use the contract's shapes and error codes. So a test of \"session expired\" exercises the same code as production.", ar: "الـ tests بتبدل الـ <code>fetch</code> بس. كل request لسه بيعدي على الـ HTTP client والـ query client والـ routes الحقيقيين، والردود المزيفة بنفس شكل الـ contract وأكواد الأخطاء. فـ test زي «الـ session خلصت» بيجرب نفس الكود اللي في الـ production." },
      both: { v: "yes", en: "MSW does the same at the network level and also works in the browser; it could replace the helper. E2E on top is still useful.", ar: "الـ MSW بيعمل نفس الحاجة على مستوى الشبكة، وكمان بيشتغل في المتصفح، فممكن ياخد مكان الـ helper. والـ E2E فوقهم لسه مفيد." },
      better: { en: "MSW for the fake server plus a few Playwright E2E journeys.", ar: "MSW للسيرفر المزيف، ومعاه شوية رحلات E2E بـ Playwright." },
      say: "Tests fake only the network, so they run the real client, cache and routes; that's how 551 tests stay meaningful.",
      concept: "one-tool"
    }
  ],

  flows: [
    { title: { en: "An unsafe request (e.g. publish)", ar: "Request بيغير داتا (زي النشر)" }, steps: [
      ["Mutation", { en: "useMutation calls http.post", ar: "useMutation بيكلم http.post" }],
      ["XSRF", { en: "Read __Host-XSRF-TOKEN; fetch one if missing", ar: "اقرا __Host-XSRF-TOKEN، وهات واحد لو مش موجود" }],
      ["Send", { en: "POST + X-XSRF-TOKEN (+ If-Match if editing)", ar: "POST + X-XSRF-TOKEN (+ If-Match لو تعديل)" }],
      ["Error?", { en: "problem+json → ApiError with a code", ar: "problem+json ← ApiError بـ code" }],
      ["Token rotated", { en: "refresh antiforgery once, retry", ar: "جدد الـ antiforgery مرة وأعد" }],
      ["Success", { en: "invalidate [\"knowledge\"], [\"drafts\"]; toast", ar: "invalidate لـ [\"knowledge\"] و [\"drafts\"]، و toast" }]
    ]},
    { title: { en: "Session ends", ar: "الـ session تخلص" }, steps: [
      ["401", { en: "Any query or mutation gets auth.session_expired", ar: "أي query أو mutation يرجعله auth.session_expired" }],
      ["Cache", { en: "QueryCache onError clears the cache and the session", ar: "الـ onError في QueryCache يمسح الكاش والـ session" }],
      ["Flag", { en: "markSessionExpired() (memory only)", ar: "markSessionExpired() (في الميموري بس)" }],
      ["Route", { en: "Layout reads the session → \"Session expired\" screen", ar: "الـ layout يقرا الـ session ← شاشة «الـ session خلصت»" }]
    ]},
    { title: { en: "Article life", ar: "حياة المقال" }, steps: [
      ["Draft", { en: "Manager writes in TipTap", ar: "الـ Manager يكتب في TipTap" }],
      ["Submit", { en: "Validation, preview, submit", ar: "Validation و preview و submit" }],
      ["Review", { en: "Admin: return with feedback, or publish", ar: "الأدمن: يرجّعه بملاحظات أو ينشره" }],
      ["Published", { en: "Readers see it; corrections compare with it", ar: "القرّاء يشوفوه، والتصحيحات تتقارن بيه" }]
    ]}
  ],

  patterns: [
    {
      title: { en: "Retry only what can succeed later", ar: "اعمل retry بس للي ممكن ينجح بعدين" },
      body: { en: "4xx = final answer. Network, 5xx and 429 retry with backoff, or wait for Retry-After.", ar: "الـ 4xx رد نهائي. النت والـ 5xx والـ 429 يتعادوا بـ backoff، أو نستنى Retry-After." },
      code: "const retryable = (e) =>\n  e.code === \"network\" || e.status === 429 || e.status >= 500;\n\nnew QueryClient({\n  defaultOptions: { queries: {\n    staleTime: 30_000,\n    retry: (n, e) => n < 2 && retryable(e),\n    retryDelay: (n, e) => e.retryAfter ? e.retryAfter * 1000 : Math.min(1000 * 2 ** n, 8000),\n  }},\n});"
    },
    {
      title: { en: "One shared refresh for parallel calls", ar: "Refresh واحد لكل الـ calls اللي في نفس الوقت" },
      body: { en: "Keep the in-flight promise; everyone awaits the same one.", ar: "احتفظ بالـ promise اللي شغال، والكل يستنى نفس الـ promise." },
      code: "let pending;\nexport function refreshToken() {\n  pending ??= fetch(\"/auth/antiforgery\").finally(() => { pending = undefined; });\n  return pending;\n}"
    },
    {
      title: { en: "Stop a list's menus from re-rendering", ar: "امنع منيو كل صف إنها تعمل re-render" },
      body: { en: "memo + compare only what's shown; read the latest handler from a ref when clicked.", ar: "memo، وقارن اللي ظاهر بس. واقرا آخر handler من ref وقت الضغط." },
      code: "function RowMenu({ actions }) {\n  const latest = useRef(actions);\n  useEffect(() => { latest.current = actions; });\n  const run = (id) => latest.current.find(a => a.id === id)?.onSelect?.();\n  return <Menu items={actions} run={run} />; // Menu = memo(..., sameVisibleItems)\n}"
    }
  ],

  hooks: [
    { group: { en: "Data (TanStack Query)", ar: "الداتا (TanStack Query)" }, items: [
      { name: "useQuery", count: "×37", what: { en: "Reads: session, articles, drafts, users, audit…", ar: "القراية: الـ session، المقالات، الـ drafts، اليوزرز، الـ audit…" }, remember: { en: "Key = scope + params; staleTime 30 s.", ar: "الـ key فيه الـ scope والـ params، والـ staleTime 30 ثانية." } },
      { name: "useMutation", count: "×32", what: { en: "Writes: publish, return, invite, reorder…", ar: "الكتابة: نشر، إرجاع، دعوة، ترتيب…" }, remember: { en: "No retries on mutations (default).", ar: "مفيش retry للـ mutations (الافتراضي)." } },
      { name: "invalidateQueries", count: "×40", what: { en: "Refresh by scope after a write", ar: "تحديث بالـ scope بعد أي كتابة" }, remember: { en: "Invalidate the scope, not one key, when many screens show the data.", ar: "اعمل invalidate للـ scope مش key واحد لو الداتا ظاهرة في شاشات كتير." } },
      { name: "setQueryData", count: "×18", what: { en: "Put the saved draft / new session straight into the cache", ar: "حط الـ draft المحفوظ أو الـ session الجديدة في الكاش على طول" }, remember: { en: "Saves a refetch when the response already has the new data.", ar: "بيوفر refetch لما الرد فيه الداتا الجديدة أصلًا." } }
    ]},
    { group: { en: "Forms", ar: "الفورمز" }, items: [
      { name: "useForm + zodResolver", count: "×16 / ×30", what: { en: "Sign-in, MFA, invite, drafts, settings", ar: "تسجيل الدخول، الـ MFA، الدعوة، الـ drafts، الإعدادات" }, remember: { en: "API field errors (422) are mapped back onto the form fields.", ar: "أخطاء الـ fields من الـ API (422) بترجع على الـ fields في الفورم." } },
      { name: "useWatch", count: "×5", what: { en: "Live password-strength hint, dependent fields", ar: "مؤشر قوة الباسورد، و fields بتعتمد على بعض" }, remember: { en: "Subscribes to one field instead of re-rendering the whole form.", ar: "بيسمع لـ field واحد بدل ما الفورم كله يعمل re-render." } }
    ]},
    { group: { en: "Routing", ar: "الـ Routing" }, items: [
      { name: "useNavigate", count: "×30", what: { en: "After save/publish, guards, links", ar: "بعد الحفظ والنشر، الـ guards، اللينكات" }, remember: { en: "Link builders in config/routes keep paths in one place.", ar: "الـ link builders في config/routes بيخلوا المسارات في مكان واحد." } },
      { name: "useSearchParams", count: "×9", what: { en: "Inside useUrlFilters", ar: "جوه useUrlFilters" }, remember: { en: "Replace, don't push: Back leaves the list.", ar: "اعمل replace مش push: الـ Back يخرج من القايمة." } },
      { name: "useBlocker", count: "×1", what: { en: "Leave-without-saving guard", ar: "تحذير لو خارج من غير ما تحفظ" }, remember: { en: "A router allows one blocker, so one provider collects all dirty forms.", ar: "الـ router بيسمح بـ blocker واحد، فـ provider واحد بيجمع كل الفورمز اللي اتعدلت." } }
    ]},
    { group: { en: "React", ar: "React" }, items: [
      { name: "useState", count: "×119", what: { en: "Dialogs, menus, local UI", ar: "الـ dialogs، المنيوهات، الـ UI المحلي" }, remember: { en: "Server data never goes in useState.", ar: "داتا السيرفر عمرها ما تتحط في useState." } },
      { name: "useEffect", count: "×26", what: { en: "Sync refs, focus, timers", ar: "تحديث الـ refs، الـ focus، التايمرز" }, remember: { en: "Not for fetching — that's React Query's job.", ar: "مش للـ fetching — ده شغل React Query." } },
      { name: "useSyncExternalStore", count: "×6", what: { en: "Tiny stores: toast, session-expired flag, media query", ar: "Stores صغيرة: الـ toast، علامة انتهاء الـ session، الـ media query" }, remember: { en: "A few lines instead of adding Zustand.", ar: "كام سطر بدل ما أضيف Zustand." } },
      { name: "useRef / useMemo / useCallback", count: "×12 / ×9 / ×10", what: { en: "Latest-handler refs, stable context values", ar: "Refs لآخر handler، وقيم context ثابتة" }, remember: { en: "Used where a profiler showed re-renders, not everywhere.", ar: "استخدمتهم في الأماكن اللي الـ profiler ورّى فيها re-renders، مش في كل حتة." } },
      { name: "useId", count: "×6", what: { en: "Label ↔ input ids for accessibility", ar: "ربط الـ label بالـ input علشان الـ accessibility" }, remember: { en: "Stable ids, safe with SSR too.", ar: "IDs ثابتة، وآمنة حتى مع SSR." } }
    ]}
  ],

  problems: [
    {
      title: { en: "Admin table lagged", ar: "جدول الأدمن كان بيهنج" },
      problem: { en: "Opening the Articles details panel was slow. Every row's ⋮ menu and status tooltip re-rendered — twice, because the table and the hidden phone cards were both drawn.", ar: "فتح الـ details panel في صفحة المقالات كان بطيء. منيو ⋮ بتاعة كل صف و tooltip الحالة كانوا بيعملوا re-render — مرتين، لأن الجدول وكروت الموبايل المستخبية الاتنين كانوا مرسومين." },
      fix: { en: "Draw only one layout by screen width; <code>memo</code> the menu and badge with a comparison of what they show; read handlers from a ref; mount menu lists and tooltips on first open.", ar: "ارسم layout واحد بس حسب عرض الشاشة. واعمل <code>memo</code> للمنيو والـ badge، وقارن باللي ظاهر بس. واقرا الـ handlers من ref. وخلي المنيو والـ tooltip يتعمل لهم mount أول ما يتفتحوا بس." },
      result: { en: "A 10-row table re-render went from ~20 ms to ~2 ms (measured in the test harness); the panel opens without lag.", ar: "الـ re-render لجدول فيه 10 صفوف نزل من حوالي 20ms لـ 2ms (متقاس في الـ test harness). والـ panel بقى بيفتح من غير تهنيج." },
      lesson: { en: "Measure first; hidden duplicate DOM is a common cause.", ar: "قيس الأول. والـ DOM المتكرر والمستخبي سبب شائع." }
    },
    {
      title: { en: "Two admins, one tree", ar: "اتنين أدمن وشجرة واحدة" },
      problem: { en: "Reordering departments while another admin renamed one could silently lose a change.", ar: "ترتيب الأقسام وأدمن تاني بيغير اسم قسم كان ممكن يضيّع تعديل من غير ما حد يعرف." },
      fix: { en: "Send each node's ETag with If-Match. On 409/412 reload the tree and tell the admin what happened.", ar: "ابعت الـ ETag بتاع كل node في If-Match. ولو جه 409 أو 412، أعد تحميل الشجرة وقول للأدمن اللي حصل." },
      result: { en: "No silent overwrites; the admin always works on the latest tree.", ar: "مفيش تعديل بيتمسح في السر، والأدمن دايمًا شغال على آخر نسخة." }
    },
    {
      title: { en: "Session expired vs. never signed in", ar: "الـ session خلصت ولا مسجلش أصلًا" },
      problem: { en: "Both come back as 401, but they need different screens.", ar: "الاتنين بيرجعوا 401، بس محتاجين شاشتين مختلفين." },
      fix: { en: "The API sends a code; the query cache's onError clears data and sets a memory-only \"expired\" flag that the layout reads.", ar: "الـ API بيبعت code. والـ onError في الكاش بيمسح الداتا، ويحط علامة «expired» في الميموري بس، والـ layout بيقراها." },
      result: { en: "Expired users see \"Your session ended\"; new visitors go straight to sign-in. Server unreachable shows its own message instead of signing out.", ar: "اللي الـ session بتاعته خلصت بيشوف «الـ session خلصت». واليوزر الجديد بيروح للـ sign-in على طول. ولو السيرفر مش متاح، بتظهر رسالة لوحدها، بدل ما يعمل sign out." }
    },
    {
      title: { en: "From mocks to the real API", ar: "من الـ mocks للـ API الحقيقي" },
      problem: { en: "The UI was built before the backend existed, on mock APIs.", ar: "الواجهة اتبنت قبل الباك إند، على mock APIs." },
      fix: { en: "Generated types from the OpenAPI contract, rewired every feature to the real client, then deleted all mocks from the app; tests kept a fake fetch.", ar: "ولّدت types من الـ OpenAPI contract، ووصّلت كل feature بالـ client الحقيقي. وبعدين مسحت كل الـ mocks من الـ app. والـ tests فضل فيها fake fetch." },
      result: { en: "No mock code in production builds; contract changes break the build.", ar: "مفيش كود mock في الـ production. وأي تغيير في الـ contract بيبوّظ الـ build." }
    }
  ],

  star: {
    s: { en: "A healthcare operations client needed an internal knowledge hub; the backend was still being built by another team.", ar: "عميل في تشغيل الخدمات الصحية كان محتاج مكتبة معلومات داخلية. والـ backend كان لسه بيتبني مع تيم تاني." },
    t: { en: "Own the whole frontend and match the Figma 1:1, without waiting for the API.", ar: "أمسك الفرونت كله وأطابق الـ Figma 1:1، من غير ما أستنى الـ API." },
    a: { en: "Built the design system and screens on mocks, then typed the OpenAPI contract, built a secure client (cookie + XSRF, typed errors, ETags), swapped mocks for the real API and covered it with tests.", ar: "بنيت الـ design system والشاشات على mocks. وبعدين عملت types من الـ OpenAPI، وبنيت client آمن: كوكي و XSRF، وأخطاء ليها types، و ETags. وبدّلت الـ mocks بالـ API الحقيقي، وغطيته بـ tests." },
    r: { en: "27 screens, 3 roles with MFA, 551 tests, no mocks in production — in about three weeks (166 of 173 commits).", ar: "27 شاشة، 3 roles مع MFA، 551 test، ومفيش mocks في الـ production — في حوالي 3 أسابيع (166 من 173 كوميت)." }
  },

  qa: [
    { q: "Why not store the token in localStorage?", a: { en: "Any XSS could read it. The session is an httpOnly cookie, and CSRF is handled by an antiforgery header on every unsafe request.", ar: "أي XSS يقدر يقراه. الـ session كوكي httpOnly، والـ CSRF متحلول بـ antiforgery header في كل request بيغير داتا." } },
    { q: "How do you decide what to retry?", a: { en: "Only failures that can succeed later: network errors, 5xx and 429, with backoff or Retry-After. A 4xx is final; mutations never retry automatically.", ar: "بس الأخطاء اللي ممكن تنجح بعدين: النت، والـ 5xx، والـ 429، بـ backoff أو Retry-After. الـ 4xx نهائي. والـ mutations مفيش ليها retry أوتوماتيك." } },
    { q: "How did you find and fix the slow table?", a: { en: "Measured re-renders in the test harness: every row's menu and tooltip re-rendered twice. I drew one layout, memoized with a 'what is shown' comparison, and lazy-mounted menus — 20 ms to 2 ms.", ar: "قست الـ re-renders في الـ test harness: منيو و tooltip كل صف كانوا بيعملوا re-render مرتين. رسمت layout واحد، وعملت memo بمقارنة «اللي ظاهر»، وخليت المنيوهات تتعمل mount وقت الفتح — من 20ms لـ 2ms." } },
    { q: "How do you handle permissions on the frontend?", a: { en: "With capabilities from the session, not role names. The UI hides what you can't do; the backend re-checks every call.", ar: "بالـ capabilities اللي جاية في الـ session، مش أسماء الـ roles. الواجهة بتخبي اللي متقدرش تعمله، والباك إند بيشيك تاني على كل call." } },
    { q: "What's your testing strategy?", a: { en: "Unit tests for helpers, component tests with Testing Library through the real client and router, a fake fetch that speaks the contract, and Storybook for visual states and accessibility.", ar: "unit tests للـ helpers. و component tests بـ Testing Library، بتعدّي على الـ client والـ router الحقيقيين. و fake fetch بيتكلم بنفس الـ contract. و Storybook للحالات الشكلية والـ accessibility." } },
    { q: "How did AI fit into your workflow?", a: { en: "I kept context docs, unit plans and a progress tracker so the AI worked inside our rules. I reviewed every change, ran the tests and own the code.", ar: "كنت عامل context docs وخطط لكل unit و progress tracker علشان الـ AI يشتغل جوه قواعدنا. وكنت براجع كل تغيير وأشغل الـ tests، والكود مسؤوليتي." } }
  ],

  terms: ["httpOnly cookie", "CSRF / antiforgery", "double-submit token", "RFC 9457 problem+json", "ETag / If-Match / 412", "optimistic concurrency", "capability-based access", "OpenAPI codegen", "staleTime", "query invalidation", "exponential backoff", "Retry-After", "React.memo", "Atomic Design", "Storybook a11y"],

  dont: [
    { en: "Don't say you built the backend or the API — you built the client against its contract.", ar: "متقولش إنك بنيت الباك إند أو الـ API — انت بنيت الـ client على الـ contract بتاعه." },
    { en: "Don't say \"E2E tests\": the 551 are unit and component tests (Vitest + Testing Library).", ar: "متقولش «E2E tests»: الـ 551 دول unit و component tests (Vitest + Testing Library)." },
    { en: "Don't say the AI wrote it: say you used an AI-assisted workflow and reviewed every change.", ar: "متقولش إن الـ AI كتبه: قول إنك استخدمت AI-assisted workflow وراجعت كل تغيير." },
    { en: "Don't call it real-time: there are no WebSockets here; data refreshes on navigation, focus and after mutations.", ar: "متقولش real-time: مفيش WebSockets هنا. الداتا بتتحدث مع التنقل، ومع الـ focus، وبعد الـ mutations." },
    { en: "Don't quote the 20→2 ms as a user-facing page metric — it's per table re-render in the test harness.", ar: "متقولش إن الـ 20←2ms ده رقم تحميل الصفحة — ده لكل re-render للجدول في الـ test harness." }
  ],

  evidence: [
    "Repo: Bitbucket nweave/smart-faq-frontend (private) — 166 of 173 non-merge commits by him, 2026-10-04 → 10-26",
    "Core files authored only by him: src/lib/api/http.ts, retry.ts, session-end.ts, src/app/query-client.ts, src/hooks/use-url-filters.ts, src/lib/article-html.ts, data-table row-actions-menu.tsx",
    "Re-render fix: commit 0680377 (20 ms → 2 ms in the test harness)",
    "Deep dive: evidence/projects/smart-faq.md"
  ]
});
