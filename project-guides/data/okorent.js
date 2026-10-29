// okoRent — researched from the code on laptop 3 (repo Profound-Group/We Rent, branch Development), 2026-10-28.
// Facts only; code sketches are simplified patterns, not project code.
HANDBOOK.projects.push({
  id: "okorent",
  name: "okoRent",
  logo: "assets/img/okorent-logo.png",
  color: "#3f8a2a",
  company: "Profound Agency",
  years: "2024–25",
  period: "Aug 2024 – Apr 2025",
  role: { en: "Sole frontend developer", ar: "الفرونت إند الوحيد" },
  team: { en: "1 frontend + .NET backend", ar: "فرونت واحد + باك إند .NET" },
  tagline: { en: "A peer-to-peer rental marketplace with four portals and real-time chat.", ar: "منصة إيجار بين الناس، فيها 4 بوابات وشات لايف." },
  stats: [
    ["336 / 364", { en: "commits (mine / total)", ar: "كوميت (بتوعي / الكل)" }],
    ["110", { en: "pages", ar: "صفحة" }],
    ["4", { en: "portals", ar: "بوابات" }],
    ["31", { en: "query hook modules", ar: "module للـ queries" }],
    ["8 mo", { en: "Aug 2024 → Apr 2025", ar: "أغسطس 2024 ← أبريل 2025" }]
  ],

  pitch: [
    { en: "okoRent lets people and businesses <b>rent out</b> things and others <b>book them for dates</b>, pay, chat with the owner and track the order.", ar: "okoRent بيخلي الناس والشركات <b>يأجّروا</b> حاجاتهم، وغيرهم <b>يحجزوها بتواريخ</b>، يدفعوا، يكلموا صاحبها، ويتابعوا الأوردر." },
    { en: "I was the <b>only frontend developer</b>: 110 pages across guest, user, business and admin portals in Next.js 14 + TypeScript + TanStack Query.", ar: "كنت <b>الفرونت إند الوحيد</b>: 110 صفحة على 4 بوابات (زائر، يوزر، بيزنس، أدمن) بـ Next.js 14 و TypeScript و TanStack Query." },
    { en: "Hardest parts: <b>real-time chat and notifications with SignalR</b>, a chat that scrolls back through history without jumping, and secure auth with an <b>httpOnly cookie + middleware</b>.", ar: "أصعب حاجات: <b>شات وإشعارات لايف بـ SignalR</b>، شات بيرجع لورا في الرسايل القديمة من غير ما يتنطط، و auth آمن بـ <b>httpOnly cookie + middleware</b>." }
  ],

  built: [
    { title: { en: "Guest site", ar: "الموقع العام (Guest)" }, items: [
      { en: "Home with search by location and rental dates", ar: "هوم فيه بحث بالمكان وتواريخ الإيجار" },
      { en: "Products, product details, reviews, owner profiles", ar: "المنتجات، التفاصيل، الـ reviews، بروفايل صاحب المنتج" },
      { en: "How it works, Pricing, Who we are, Contact", ar: "How it works، Pricing، Who we are، Contact" },
      { en: "Sign-up, login, email confirm, phone verify, reset password", ar: "تسجيل، login، تأكيد الإيميل والموبايل، استرجاع الباسورد" }
    ]},
    { title: { en: "User portal (free)", ar: "بوابة اليوزر (مجانية)" }, items: [
      { en: "Dashboard, listings with stock locations on a map", ar: "داشبورد، و listings بأماكن المخزون على الخريطة" },
      { en: "Bookings, requests, rentals, checkout, payment result", ar: "الحجوزات، الطلبات، الإيجارات، الـ checkout، نتيجة الدفع" },
      { en: "Wallet, billing with filters, wishlist, inbox, support", ar: "المحفظة، الفواتير بفلاتر، المفضلة، الـ inbox، الدعم" }
    ]},
    { title: { en: "Premium (business) portal", ar: "بوابة البيزنس (Premium)" }, items: [
      { en: "Order creation, orders, clients, maintenance", ar: "إنشاء أوردر، الأوردرات، العملاء، الصيانة" },
      { en: "Taxes, warehouses, employees", ar: "الضرايب، المخازن، الموظفين" },
      { en: "Invoice and quotation templates", ar: "قوالب الفواتير وعروض الأسعار" }
    ]},
    { title: { en: "Admin portal", ar: "بوابة الأدمن" }, items: [
      { en: "Accounts with notes history and reviews", ar: "الحسابات مع سجل الملاحظات والـ reviews" },
      { en: "Bookings, order details and editing", ar: "الحجوزات، تفاصيل الأوردر وتعديله" },
      { en: "Master data: categories, ads + pricing, banners, plans", ar: "Master data: التصنيفات، الإعلانات وأسعارها، البانرات، الباقات" },
      { en: "Memberships, invoices, demo requests, support", ar: "العضويات، الفواتير، طلبات الديمو، الدعم" }
    ]}
  ],

  myRole: [
    { en: "Sole frontend developer — 336 of 364 commits. The other 28 are the backend lead's (.NET, tests, branch cleanup).", ar: "الفرونت إند الوحيد — 336 من 364 كوميت. الـ 28 الباقيين للـ backend lead (.NET، tests، تنظيف branches)." },
    { en: "Started the client app inside the .NET solution (Aug 2024) and moved it to a standalone Next.js app in Dec 2024.", ar: "بدأت الـ client app جوه الـ .NET solution (أغسطس 2024) ونقلته لـ Next.js app مستقل في ديسمبر 2024." },
    { en: "Worked with the backend on API contracts and the SignalR hubs; the hubs themselves are backend work.", ar: "اشتغلت مع الـ backend على شكل الـ API والـ SignalR hubs. والـ hubs نفسها شغل الـ backend." }
  ],

  stack: [
    [{ en: "Core", ar: "الأساس" }, ["Next.js 14 (App Router)", "React 18", "TypeScript"]],
    [{ en: "Data", ar: "الداتا" }, ["TanStack Query v5", "axios", "nuqs"]],
    [{ en: "State", ar: "الـ State" }, ["Zustand", "React Context"]],
    [{ en: "Real-time", ar: "Real-time" }, ["@microsoft/signalr"]],
    [{ en: "UI", ar: "الواجهة" }, ["Mantine 7", "Tailwind CSS", "TanStack Table", "react-virtuoso", "FullCalendar", "Recharts"]],
    [{ en: "Forms", ar: "الفورمز" }, ["react-hook-form", "yup"]],
    [{ en: "Maps", ar: "الخرايط" }, ["Google Maps", "OpenLayers"]],
    [{ en: "i18n", ar: "اللغات" }, ["next-intl (routing only)"]]
  ],

  decisions: [
    {
      title: { en: "Framework", ar: "الـ Framework" },
      chose: "Next.js 14 App Router", alts: ["Vite + React SPA", "Next.js Pages Router"],
      why: { en: "The guest side is a marketplace that needs SEO-friendly pages. The app side needs a different layout per portal (route groups) and a <b>middleware</b> that checks the cookie before any page loads. Server actions let me set an httpOnly cookie without a separate API.", ar: "الموقع العام marketplace محتاج صفحات تظهر في جوجل (SEO). والتطبيق محتاج layout مختلف لكل بوابة (route groups) و <b>middleware</b> يشيك على الكوكي قبل ما أي صفحة تفتح. والـ server actions خلتني أحط httpOnly cookie من غير API منفصل." },
      both: { v: "partly", en: "App Router and Pages Router can live in one Next.js app — useful only while migrating. A new project should pick one.", ar: "App Router و Pages Router ينفعوا في نفس المشروع — بس ده مفيد وقت الـ migration بس. مشروع جديد يختار واحد." },
      better: { en: "Still Next.js App Router (15 today). A Vite SPA would lose SEO and middleware; it fits internal dashboards better.", ar: "لسه Next.js App Router (النسخة 15 النهارده). الـ Vite SPA هيخسّرني الـ SEO والـ middleware، وهو مناسب أكتر لداشبورد داخلي." },
      say: "The public marketplace needed SEO and every portal needed its own layout and edge auth checks, so the App Router fit both sides.",
      concept: "routers"
    },
    {
      title: { en: "Server state (data from the API)", ar: "الـ Server state (الداتا اللي جاية من الـ API)" },
      chose: "TanStack Query", alts: ["Redux Toolkit / RTK Query", "SWR", "useEffect + useState"],
      why: { en: "API data needs caching, loading/error states, refetching and <b>invalidation after mutations</b>. TanStack Query gives all of that plus <code>useInfiniteQuery</code> for the chat — without writing a reducer.", ar: "داتا الـ API محتاجة caching، وحالات loading/error، و refetch، و <b>invalidation بعد أي تعديل</b>. TanStack Query بيدي ده كله ومعاه <code>useInfiniteQuery</code> للشات — من غير ما أكتب reducer." },
      both: { v: "no", en: "TanStack Query + RTK Query = two caches for the same data. But TanStack Query + Zustand is normal: one owns server state, the other small UI state.", ar: "TanStack Query مع RTK Query = كاشين لنفس الداتا، غلط. لكن TanStack Query مع Zustand عادي جدًا: واحد للـ server state والتاني للـ UI state الصغير." },
      better: { en: "Same tool. Today I would add a <b>query-key factory</b> and <b>typed API responses</b> generated from the backend's OpenAPI.", ar: "نفس الأداة. النهارده كنت هضيف <b>query-key factory</b> و <b>types للـ API</b> متولدة من الـ OpenAPI بتاع الباك إند." },
      say: "I separate server state from client state: TanStack Query owns everything that comes from the API, so caching and invalidation are handled in one place.",
      concept: "server-state"
    },
    {
      title: { en: "Real-time", ar: "الـ Real-time" },
      chose: "SignalR", alts: ["Socket.IO", "raw WebSocket", "Server-Sent Events", "polling"],
      why: { en: "The backend is .NET, and SignalR is .NET's real-time library. The server already had hubs; the client only needs <code>@microsoft/signalr</code>. It picks the best transport by itself (WebSockets → SSE → long polling) and sends the token through <code>accessTokenFactory</code>.", ar: "الباك إند .NET، و SignalR هو مكتبة الـ real-time بتاعة .NET. السيرفر كان عنده hubs جاهزة، والـ client محتاج <code>@microsoft/signalr</code> بس. وبيختار أحسن طريقة اتصال لوحده (WebSockets ← SSE ← long polling) وبيبعت التوكن عن طريق <code>accessTokenFactory</code>." },
      both: { v: "no", en: "Socket.IO needs its own Node server and protocol — running it next to SignalR means two real-time systems to secure and scale.", ar: "Socket.IO محتاج سيرفر Node وبروتوكول خاص بيه — لو اشتغل جنب SignalR يبقى عندك نظامين real-time تأمنهم وتكبّرهم." },
      better: { en: "SignalR is right for a .NET backend. I would add <code>withAutomaticReconnect()</code> and a small “reconnecting…” banner.", ar: "SignalR هو الصح مع باك إند .NET. كنت هضيف <code>withAutomaticReconnect()</code> وشريط صغير «بنحاول نتصل…»." },
      say: "We used SignalR because the backend was .NET and already exposed hubs; it negotiates the transport and authenticates with the same JWT.",
      concept: "realtime"
    },
    {
      title: { en: "Where the login token lives", ar: "التوكن متخزن فين" },
      chose: "httpOnly cookie (server action)", alts: ["localStorage", "NextAuth / Auth.js session"],
      why: { en: "JavaScript can't read an httpOnly cookie, so an XSS bug can't steal it. The middleware can read it on the server to redirect by role. <code>sameSite=strict</code> limits CSRF, and the cookie expires with the JWT.", ar: "الـ JavaScript مايقدرش يقرا الـ httpOnly cookie، فلو حصل XSS التوكن مايتسرقش. والـ middleware بيقراه على السيرفر علشان يعمل redirect حسب الـ role. و <code>sameSite=strict</code> بيقلل الـ CSRF، والكوكي بيخلص مع الـ JWT." },
      both: { v: "no", en: "Copying the token into localStorage as well cancels the protection.", ar: "لو نسخت التوكن كمان في localStorage يبقى الحماية راحت." },
      better: { en: "Auth.js would handle sessions and refresh for me. The trade-off I hit: SignalR on the client needs the token, so I passed it through a small context. A cookie-authenticated hub would remove that.", ar: "Auth.js كان هيتعامل مع الـ sessions والـ refresh. المشكلة اللي قابلتني: SignalR في المتصفح محتاج التوكن، فعديته في context صغير. لو الـ hub بيقبل الكوكي كانت المشكلة دي هتختفي." },
      say: "The token lives in an httpOnly, SameSite=strict cookie set by a server action, so client-side scripts can never read it.",
      concept: "token-storage"
    },
    {
      title: { en: "Shared UI state", ar: "الـ UI state المشترك" },
      chose: "Zustand", alts: ["Redux Toolkit", "React Context"],
      why: { en: "Only a few small values are shared (rent / rent-out mode, billing tab, sign-up data). Zustand is a few lines, and components re-render only for the slice they read. Context re-renders every consumer.", ar: "الحاجات المشتركة قليلة وصغيرة (وضع rent / rent out، تاب الـ billing، بيانات الـ sign-up). Zustand سطرين، والـ component بيعمل re-render بس لما الجزء اللي بيقراه يتغير. الـ Context بيعمل re-render لكل اللي بيستخدموه." },
      both: { v: "yes", en: "Zustand next to TanStack Query is the usual split. Redux next to Zustand would be pointless.", ar: "Zustand جنب TanStack Query ده التقسيم العادي. Redux جنب Zustand ملوش لازمة." },
      better: { en: "The rent / rent-out mode could live in the URL (nuqs) so a shared link opens in the same mode.", ar: "وضع rent / rent out كان ممكن يبقى في الـ URL (nuqs) علشان اللينك اللي يتبعت يفتح على نفس الوضع." },
      say: "Zustand only holds small cross-page UI state; anything from the server stays in TanStack Query.",
      concept: "server-state"
    },
    {
      title: { en: "Long chat lists", ar: "قوايم الشات الطويلة" },
      chose: "react-virtuoso", alts: ["react-window", "TanStack Virtual", "render everything"],
      why: { en: "Messages have different heights and the chat scrolls <b>upwards</b> into history. Virtuoso measures heights by itself and has chat features built in (<code>firstItemIndex</code>, <code>startReached</code>, <code>followOutput</code>). react-window wants fixed heights.", ar: "الرسايل أطوالها مختلفة، والشات بيـ scroll <b>لفوق</b> للرسايل القديمة. Virtuoso بيقيس الأطوال لوحده وفيه حاجات الشات جاهزة (<code>firstItemIndex</code>، <code>startReached</code>، <code>followOutput</code>). react-window عايز أطوال ثابتة." },
      both: { v: "no", en: "One virtualizer per list; two libraries for the same job only add bundle size.", ar: "مكتبة virtualization واحدة كفاية. واتنين لنفس الشغلانة بيكبّروا الـ bundle وخلاص." },
      better: { en: "TanStack Virtual is headless and more flexible, but for a chat Virtuoso saves real time. I'd keep it.", ar: "TanStack Virtual أمرن (headless)، بس للشات Virtuoso بيوفر وقت حقيقي. كنت هفضل عليه." },
      say: "I virtualized the chat with react-virtuoso because messages have variable heights and the list grows upwards.",
      concept: "virtualization"
    },
    {
      title: { en: "Filters in the URL", ar: "الفلاتر في الـ URL" },
      chose: "nuqs + useSearchParams", alts: ["Zustand", "local useState"],
      why: { en: "A filter is part of “where I am”: refresh, Back, or a shared link must keep it. The page, search and filter values build the query key, so each filter gets its own cache entry.", ar: "الفلتر جزء من «أنا فين»: الـ refresh أو الـ Back أو اللينك المتبعت لازم يحافظوا عليه. والـ page والبحث والفلتر بيدخلوا في الـ query key، فكل فلتر ليه كاش لوحده." },
      both: { v: "partly", en: "I used both a hand-written <code>useQueryParams</code> hook and nuqs. It works, but one approach is cleaner.", ar: "استخدمت الاتنين: hook مكتوب بإيدي <code>useQueryParams</code> و nuqs. شغال، بس طريقة واحدة أنضف." },
      better: { en: "nuqs everywhere — typed parsers (<code>parseAsInteger</code>) and less code.", ar: "nuqs في كل حتة — parsers بـ types (<code>parseAsInteger</code>) وكود أقل." },
      say: "Filters and pagination live in the URL, so they survive refresh and can be shared, and they become part of the query key.",
      concept: "url-state"
    },
    {
      title: { en: "UI kit", ar: "مكتبة الواجهة" },
      chose: "Mantine + Tailwind", alts: ["MUI", "shadcn/ui"],
      why: { en: "An admin-heavy product needs modals, date pickers, dropzones and charts fast. Mantine has them plus useful hooks (<code>useDisclosure</code>, <code>useMediaQuery</code>). Tailwind handles layout and spacing.", ar: "منتج فيه أدمن كتير محتاج modals و date pickers و dropzone و charts بسرعة. Mantine فيه ده كله ومعاه hooks مفيدة (<code>useDisclosure</code>، <code>useMediaQuery</code>). و Tailwind للـ layout والمسافات." },
      both: { v: "yes", en: "Mantine + Tailwind work together; watch CSS order so Tailwind's reset doesn't override Mantine styles.", ar: "الـ Mantine والـ Tailwind بيشتغلوا مع بعض. بس خلي بالك من ترتيب الـ CSS، علشان الـ reset بتاع Tailwind مايبوّظش ستايل Mantine." },
      better: { en: "shadcn/ui + Tailwind gives full control of the components; Mantine is faster for dense admin screens. Both are fine choices.", ar: "الـ shadcn/ui مع Tailwind بيديك تحكم كامل في الـ components. والـ Mantine أسرع للشاشات المليانة. والاتنين اختيارات كويسة." },
      say: "Mantine gave us production-ready inputs, dates and modals for four portals; Tailwind kept layout consistent."
    },
    {
      title: { en: "Maps", ar: "الخرايط" },
      chose: "Google Maps", alts: ["OpenLayers", "Leaflet / MapLibre"],
      why: { en: "Listing and stock locations need a familiar map and address search; most of the map work (27 of 29 commits) uses Google Maps.", ar: "أماكن الـ listings والمخزون محتاجة خريطة مألوفة وبحث عناوين. وأغلب شغل الخرايط (27 من 29 commit) على Google Maps." },
      both: { v: "partly", en: "The project also has OpenLayers (9 commits). Two map libraries for the same job means a bigger bundle and two APIs to learn.", ar: "المشروع فيه OpenLayers كمان (9 كوميت). مكتبتين خرايط لنفس الشغلانة = bundle أكبر واتنين API تتعلمهم." },
      better: { en: "Pick one. Google Maps if you need Places search; MapLibre / Leaflet if cost matters.", ar: "اختار واحدة. Google Maps لو محتاج بحث الأماكن. و MapLibre أو Leaflet لو التكلفة مهمة." },
      say: "One lesson from okoRent: keep one library per job — we ended up with two map libraries, which cost bundle size.",
      concept: "one-tool"
    }
  ],

  flows: [
    {
      title: { en: "Login and route protection", ar: "الـ Login وحماية الصفحات" },
      steps: [
        ["Login form", { en: "react-hook-form + yup validate input", ar: "react-hook-form + yup بيتأكدوا من البيانات" }],
        ["Server action", { en: "stores the JWT in an httpOnly cookie", ar: "بيخزن الـ JWT في httpOnly cookie" }],
        ["middleware.ts", { en: "every request: locale + cookie check, redirect by role", ar: "كل request: اللغة + الكوكي، و redirect حسب الـ role" }],
        ["axios interceptor", { en: "adds Authorization: Bearer", ar: "بيضيف Authorization: Bearer" }],
        ["QueryWrapper", { en: "401 → clear token; 403/404/500 → error page", ar: "الـ 401 بيمسح الـ token. والـ 403/404/500 بيعرضوا صفحة خطأ" }]
      ]
    },
    {
      title: { en: "A chat message, end to end", ar: "رسالة الشات من الأول للآخر" },
      steps: [
        ["Send", { en: "message shows at once with status “pending”", ar: "الرسالة تظهر فورًا بحالة «pending»" }],
        ["POST /chat", { en: "the API saves it", ar: "الـ API بيحفظها" }],
        ["SignalR hub", { en: "server pushes OnNewMessage to the room", ar: "السيرفر بيبعت OnNewMessage للغرفة" }],
        ["setQueriesData", { en: "message written into page 1 of the cache", ar: "الرسالة بتتكتب في أول صفحة في الكاش" }],
        ["Virtuoso", { en: "renders it; scrolls down only if you were at the bottom", ar: "بيعرضها، وينزل لتحت بس لو إنت كنت تحت" }]
      ]
    },
    {
      title: { en: "Renting an item", ar: "إيجار حاجة" },
      steps: [
        ["Search", { en: "location + rental dates", ar: "المكان + تواريخ الإيجار" }],
        ["Product", { en: "details, availability, reviews", ar: "التفاصيل، المتاح، الـ reviews" }],
        ["Checkout", { en: "order created", ar: "الأوردر بيتعمل" }],
        ["Payment link", { en: "success / failed page", ar: "صفحة نجاح / فشل" }],
        ["Track", { en: "order status + chat with the owner", ar: "حالة الأوردر + شات مع صاحبه" }]
      ]
    }
  ],

  patterns: [
    {
      title: { en: "One base key per domain, targeted invalidation", ar: "key أساسي لكل domain، و invalidation دقيقة" },
      body: { en: "Each of the 31 query modules starts from one base key. Lists and details derive from it, so a mutation refreshes only what it changed.", ar: "كل module من الـ 31 بيبدأ من key أساسي. القوايم والتفاصيل متبنية عليه، فأي تعديل بيحدّث اللي اتغير بس." },
      code: "// one base key per domain\nconst chatKeys = {\n  all: [\"chat\"] as const,\n  list: () => [...chatKeys.all, \"list\"] as const,\n  room: (id: string) => [...chatKeys.all, id] as const,\n};\n\nfunction useCreateChat(roomId: string) {\n  const qc = useQueryClient();\n  return useMutation({\n    mutationFn: createChat,\n    onSuccess: () => {\n      qc.invalidateQueries({ queryKey: chatKeys.room(roomId) });\n      qc.invalidateQueries({ queryKey: chatKeys.list() });\n    },\n  });\n}"
    },
    {
      title: { en: "One component for loading, empty and error states", ar: "component واحد للـ loading والـ empty والأخطاء" },
      body: { en: "<code>QueryWrapper</code> takes a query and decides what to show. Pages only write the happy path (render prop).", ar: "<code>QueryWrapper</code> بياخد الـ query ويقرر يعرض إيه. الصفحة بتكتب الحالة الطبيعية بس (render prop)." },
      code: "function QueryState({ query, children }) {\n  if (query.isPending) return <Skeleton />;\n  if (query.isError) {\n    const status = query.error?.status;\n    if (status === 401) return <SessionExpired />; // also clears the token\n    if (status === 403) return <Forbidden />;\n    if (status === 404) return <NotFound />;\n    return <ServerError onRetry={query.refetch} />;\n  }\n  const items = query.data?.items ?? [];\n  if (items.length === 0) return <Empty />;\n  return children(items);\n}"
    },
    {
      title: { en: "Real-time message straight into the cache", ar: "رسالة الـ real-time على الكاش مباشرة" },
      body: { en: "The connection lives in <code>useEffect</code> with the token as a dependency; the cleanup stops it. New messages are written into the cached first page instead of refetching.", ar: "الاتصال جوه <code>useEffect</code>، والـ token في الـ dependencies، والـ cleanup بيقفله. والرسايل الجديدة بتتكتب في أول صفحة في الكاش، بدل الـ refetch." },
      code: "useEffect(() => {\n  if (!token) return;\n  const conn = new HubConnectionBuilder()\n    .withUrl(HUB_URL, { accessTokenFactory: () => token })\n    .build();\n\n  conn.on(\"OnNewMessage\", (msg) => {\n    qc.setQueriesData({ queryKey: chatKeys.room(msg.roomId) }, (old) => {\n      if (!old) return old;\n      const [first, ...rest] = old.pages;\n      return { ...old, pages: [{ ...first, items: [msg, ...first.items] }, ...rest] };\n    });\n  });\n\n  conn.start();\n  return () => { conn.stop(); }; // unmount or token change\n}, [token]);"
    },
    {
      title: { en: "Chat that loads history upwards", ar: "شات بيحمّل القديم لفوق" },
      body: { en: "<code>firstItemIndex</code> goes down as older pages are added on top, so the list doesn't jump. <code>followOutput</code> follows new messages only if you are at the bottom.", ar: "<code>firstItemIndex</code> بيقل كل ما صفحات قديمة تتضاف فوق، فالقايمة ماتتنططش. و <code>followOutput</code> ينزل مع الرسايل الجديدة بس لو انت تحت." },
      code: "<Virtuoso\n  data={messages}\n  firstItemIndex={START_INDEX - messages.length}\n  initialTopMostItemIndex={messages.length - 1}\n  startReached={() => hasNextPage && fetchNextPage()}\n  followOutput={(atBottom) => (atBottom ? \"smooth\" : false)}\n  itemContent={(_, m) => <Bubble message={m} />}\n/>"
    }
  ],

  hooks: [
    { group: { en: "Server data — TanStack Query", ar: "داتا السيرفر — TanStack Query" }, items: [
      { name: "useQuery", count: "26 files", what: { en: "Lists and details. <code>enabled: !!id</code> waits for the id.", ar: "القوايم والتفاصيل. <code>enabled: !!id</code> بيستنى الـ id." }, remember: { en: "Defaults: <code>staleTime</code> 10 s, no refetch on window focus.", ar: "الـ defaults: <code>staleTime</code> 10 ثواني، ومفيش refetch لما ترجع للتاب." } },
      { name: "useMutation", count: "26 files", what: { en: "Create / update / delete, then <code>invalidateQueries</code> on the list and detail keys.", ar: "إنشاء / تعديل / حذف، وبعدها <code>invalidateQueries</code> للقايمة والتفاصيل." }, remember: { en: "Invalidate the smallest set of keys that changed.", ar: "اعمل invalidate لأقل keys اتغيرت." } },
      { name: "useInfiniteQuery", count: "3 files", what: { en: "Chat rooms and messages, page by page.", ar: "غرف الشات والرسايل صفحة صفحة." }, remember: { en: "<code>getNextPageParam</code> returns <code>undefined</code> when loaded pages reach <code>totalPages</code>.", ar: "<code>getNextPageParam</code> بيرجع <code>undefined</code> لما الصفحات المحملة توصل لـ <code>totalPages</code>." } },
      { name: "setQueriesData", what: { en: "Optimistic chat and SignalR messages written into the cache.", ar: "الشات الـ optimistic ورسايل SignalR بتتكتب في الكاش." }, remember: { en: "Return a new object — never mutate <code>old</code>.", ar: "رجّع object جديد — ماتعدلش <code>old</code> نفسه." } },
      { name: "placeholderData", what: { en: "Keeps the previous page visible while the next one loads.", ar: "بيسيب الصفحة القديمة ظاهرة لحد ما الجديدة تحمل." }, remember: { en: "v5 replacement for <code>keepPreviousData</code>.", ar: "البديل في v5 لـ <code>keepPreviousData</code>." } }
    ]},
    { group: { en: "Effects and real-time", ar: "الـ Effects والـ real-time" }, items: [
      { name: "useEffect", what: { en: "Open the SignalR connection when a token exists; <code>stop()</code> in cleanup.", ar: "بيفتح اتصال SignalR لما يبقى فيه token، و <code>stop()</code> في الـ cleanup." }, remember: { en: "Token in the dependency array → new token = reconnect.", ar: "التوكن في الـ dependencies ← توكن جديد = اتصال جديد." } },
      { name: "useCallback", what: { en: "Stable <code>addMessage</code> handler passed to the hub.", ar: "handler ثابت <code>addMessage</code> بيتبعت للـ hub." }, remember: { en: "Without it the effect would reconnect on every render.", ar: "من غيره الـ effect كان هيعيد الاتصال مع كل render." } }
    ]},
    { group: { en: "State and URL", ar: "الـ State والـ URL" }, items: [
      { name: "create (Zustand)", what: { en: "<code>useSwitchRent</code>, <code>useSwitchBilling</code>; <code>useUserStore</code> with <code>persist</code> keeps sign-up data after refresh.", ar: "<code>useSwitchRent</code> و <code>useSwitchBilling</code>. و <code>useUserStore</code> بـ <code>persist</code> بيحافظ على بيانات التسجيل بعد الـ refresh." } },
      { name: "useToken", what: { en: "Custom context that gives client components the token (for SignalR).", ar: "context مخصوص بيدي الـ components التوكن (علشان SignalR)." } },
      { name: "useQueryState", count: "11 files", what: { en: "nuqs: billing filters and the calendar date in the URL.", ar: "nuqs: فلاتر الفواتير وتاريخ التقويم في الـ URL." } },
      { name: "useQueryParams", what: { en: "Custom hook: <code>page</code>, <code>search</code>, <code>filter</code> from the URL with defaults.", ar: "hook مخصوص: <code>page</code> و <code>search</code> و <code>filter</code> من الـ URL بقيم default." } },
      { name: "useDisclosure", count: "92 files", what: { en: "Mantine: open/close for modals.", ar: "Mantine: فتح وقفل الـ modals." } },
      { name: "useMediaQuery", count: "10 files", what: { en: "Switch tables to cards on mobile.", ar: "يحوّل الجداول لـ cards على الموبايل." } }
    ]},
    { group: { en: "Custom hooks and forms", ar: "Hooks مخصوصة وفورمز" }, items: [
      { name: "useCreateOrder", what: { en: "Wraps the mutation, modal, toast and rent mode — the page only calls <code>onSubmit</code>.", ar: "بيلم الـ mutation والـ modal والـ toast ووضع الإيجار — الصفحة بتنادي <code>onSubmit</code> بس." } },
      { name: "useAddMessageLocally", what: { en: "Writes an optimistic or incoming message into the cache.", ar: "بيكتب رسالة optimistic أو جاية من السيرفر في الكاش." } },
      { name: "useForm + yupResolver", count: "3 files", what: { en: "Auth forms with a schema.", ar: "فورمز الـ auth بـ schema." } },
      { name: "useMemo / memo", what: { en: "Memoized loader and error components; chat <code>firstItemIndex</code>.", ar: "الـ components بتاعة الـ loading والأخطاء متعمل لها memo. و <code>firstItemIndex</code> بتاع الشات." } }
    ]}
  ],

  problems: [
    {
      title: { en: "The chat jumped when loading older messages", ar: "الشات كان بيتنطط لما يحمّل رسايل قديمة" },
      problem: { en: "Scrolling up added older messages on top, which pushed the view and lost the user's place.", ar: "لما تعمل scroll لفوق، الرسايل القديمة بتتضاف فوق فالشاشة بتتزق ومكانك بيضيع." },
      fix: { en: "react-virtuoso with a decreasing <code>firstItemIndex</code>, <code>startReached</code> → <code>fetchNextPage</code>, and <code>followOutput</code> only at the bottom.", ar: "react-virtuoso مع <code>firstItemIndex</code> بيقل، و <code>startReached</code> ← <code>fetchNextPage</code>، و <code>followOutput</code> بس لو انت تحت." },
      result: { en: "Stable scroll and a list that stays fast for long chats (Feb 2025).", ar: "scroll ثابت وقايمة سريعة حتى مع الشاتات الطويلة (فبراير 2025)." }
    },
    {
      title: { en: "Real-time messages would have caused constant refetches", ar: "رسايل الـ real-time كانت هتعمل refetch كل شوية" },
      problem: { en: "Invalidating on every SignalR event reloads the whole chat each time.", ar: "لو كل event من SignalR يعمل invalidate، الشات كله يتحمل تاني كل مرة." },
      fix: { en: "<code>setQueriesData</code> inserts the message into page 1 of the cache; my own message appears instantly as “pending”.", ar: "الـ <code>setQueriesData</code> بيضيف الرسالة في أول صفحة في الكاش. ورسالتي بتظهر على طول كـ «pending»." },
      result: { en: "The chat feels instant with no extra requests.", ar: "الشات بيحس إنه فوري ومن غير requests زيادة." }
    },
    {
      title: { en: "110 pages, each handling errors its own way", ar: "110 صفحة وكل واحدة بتتعامل مع الأخطاء بطريقتها" },
      problem: { en: "Loading, empty and error states were repeated and inconsistent; an expired session wasn't handled.", ar: "حالات الـ loading والـ empty والأخطاء كانت متكررة ومختلفة من صفحة للتانية. وانتهاء الـ session مكانش متعامل معاه." },
      fix: { en: "One <code>QueryWrapper</code> derives the state from the query; a 401 clears the token.", ar: "<code>QueryWrapper</code> واحد بيعرف الحالة من الـ query. والـ 401 بيمسح الـ token." },
      result: { en: "Every page behaves the same; new pages only write the happy path.", ar: "كل الصفحات بقت بتتصرف بنفس الشكل. والصفحة الجديدة بتكتب الحالة الطبيعية بس." }
    },
    {
      title: { en: "Upgrading to React Query v5", ar: "الترقية لـ React Query v5" },
      problem: { en: "v5 renamed APIs (<code>isLoading</code> → <code>isPending</code>, <code>keepPreviousData</code> → <code>placeholderData</code>).", ar: "v5 غيّر أسامي (<code>isLoading</code> ← <code>isPending</code>، <code>keepPreviousData</code> ← <code>placeholderData</code>)." },
      fix: { en: "Upgraded and updated the hooks; the wrapper checks both flags.", ar: "رقّيت المكتبة وعدّلت الـ hooks. والـ wrapper بيتعامل مع الاتنين." },
      result: { en: "Done in one pass in Feb 2025.", ar: "خلصت مرة واحدة في فبراير 2025." }
    },
    {
      title: { en: "Frontend locked inside the .NET solution", ar: "الفرونت كان محبوس جوه الـ .NET solution" },
      problem: { en: "The client app lived in <code>WeRent/src/Web/ClientApp</code>, so build and deploy were tied to the backend.", ar: "الـ client app كان في <code>WeRent/src/Web/ClientApp</code>، فالـ build والـ deploy مربوطين بالباك إند." },
      fix: { en: "Moved it to a standalone Next.js app (Dec 2024), fixed the build, removed unused code.", ar: "نقلته لـ Next.js app مستقل (ديسمبر 2024)، ظبطت الـ build، ومسحت الكود اللي مش مستخدم." },
      result: { en: "Frontend deploys on its own.", ar: "الفرونت بقى بيتعمله deploy لوحده." }
    }
  ],

  star: {
    s: { en: "Profound was building a rental marketplace with four user types on a .NET backend.", ar: "Profound كانت بتعمل منصة إيجار بـ 4 أنواع مستخدمين وباك إند .NET." },
    t: { en: "I was the only frontend developer.", ar: "كنت الفرونت إند الوحيد." },
    a: { en: "Built every portal on Next.js 14 with a TanStack Query layer, httpOnly-cookie auth with middleware, and SignalR chat and notifications with optimistic updates and a virtualized list.", ar: "بنيت كل البوابات على Next.js 14 بـ TanStack Query، و auth بـ httpOnly cookie و middleware، وشات وإشعارات SignalR بـ optimistic updates وقايمة virtualized." },
    r: { en: "110 pages and 336 commits in 8 months.", ar: "110 صفحة و 336 كوميت في 8 شهور." }
  },

  qa: [
    { q: "Why an httpOnly cookie and not localStorage?", a: { en: "localStorage is readable by any script, so an XSS bug leaks the token. An httpOnly cookie is sent automatically and can't be read from JS; SameSite=strict reduces CSRF. The cost: SignalR on the client still needed the token, so a small context passed it down.", ar: "localStorage أي script يقدر يقراه، فلو حصل XSS التوكن يتسرق. الـ httpOnly cookie المتصفح بيبعته لوحده ومحدش يقراه من JS، و SameSite=strict بيقلل الـ CSRF. التمن: SignalR في المتصفح كان محتاج التوكن، فعديته في context صغير." } },
    { q: "How did you keep the cache in sync after a mutation?", a: { en: "Every domain has a base key. After a mutation I invalidate only the affected list and detail. For chat I don't invalidate — I write into the cache with setQueriesData.", ar: "كل domain ليه key أساسي. بعد أي تعديل بعمل invalidate للقايمة والتفاصيل اللي اتأثروا بس. في الشات مابعملش invalidate — بكتب في الكاش بـ setQueriesData." } },
    { q: "What happens to the SignalR connection on logout?", a: { en: "It lives in a useEffect with the token as a dependency. Logout or unmount runs the cleanup (stop()); with no token it never connects.", ar: "الاتصال جوه useEffect والتوكن في الـ dependencies. الـ logout أو الـ unmount بيشغل الـ cleanup (stop())، ومن غير توكن مش بيتصل أصلًا." } },
    { q: "Why is a filter in the URL instead of state?", a: { en: "Refresh, Back and sharing must keep it, and the query key is built from it, so each filter has its own cache entry.", ar: "علشان الـ refresh والـ Back واللينك يحافظوا عليه، والـ query key متبني منه فكل فلتر ليه كاش لوحده." } },
    { q: "Why virtualize the chat?", a: { en: "Long chats would mount thousands of DOM nodes. Virtualization renders only what is on screen; Virtuoso also handles variable heights and reverse scrolling.", ar: "الشات الطويل هيعمل آلاف الـ DOM nodes. والـ virtualization بيرسم اللي على الشاشة بس. و Virtuoso كمان بيتعامل مع الأطوال المختلفة، والـ scroll اللي بالعكس." } },
    { q: "What would you do differently today?", a: { en: "(1) Real translations with next-intl, not only locale routing. (2) Tests for the chat and order hooks. (3) SignalR auto-reconnect. (4) Typed API responses instead of <code>any</code>. (5) One map library.", ar: "(1) ترجمة حقيقية بـ next-intl مش routing بس. (2) tests لـ hooks الشات والأوردر. (3) auto-reconnect لـ SignalR. (4) types للـ API بدل <code>any</code>. (5) مكتبة خرايط واحدة." } }
  ],

  terms: ["server state vs client state", "query key", "targeted invalidation", "optimistic update", "httpOnly cookie", "SameSite", "role-based redirect", "render prop", "virtualization", "reverse infinite scroll", "URL as state", "SignalR hub", "transport fallback"],

  dont: [
    { en: "Don't call the UI <b>bilingual</b> — only the routing has <code>/ar</code> and <code>/en</code>; the translation files were copied from another project.", ar: "ماتقولش إن الـ UI <b>مترجم</b>. الـ routing بس هو اللي فيه <code>/ar</code> و <code>/en</code>، وملفات الترجمة منقولة من مشروع تاني." },
    { en: "Don't claim the backend or the SignalR hubs — you built the client side.", ar: "ماتقولش إنك عملت الباك إند أو الـ hubs — إنت عملت الـ client side." },
    { en: "No user or booking numbers. No frontend tests.", ar: "مفيش أرقام مستخدمين أو حجوزات. ومفيش tests في الفرونت." },
    { en: "No link on the CV (your choice).", ar: "مفيش لينك على الـ CV (اختيارك)." }
  ],

  evidence: [
    "Repo Profound-Group/We Rent (laptop 3: Desktop/Projects/WeRent), branch Development",
    "SignalR notifications e494da4 (2025-01-12) · chat hub 2a0417f (2025-02-18) · standalone app 02f3b88 (2024-12-09)",
    "Files: src/components/query-wrapper.tsx, chat-hub.tsx, notifications-hub.tsx, inbox/chat-body.tsx, src/hooks/queries/**, src/lib/token.tsx, src/middleware.ts",
    "Deep dive: evidence/projects/okorent.md"
  ]
});
