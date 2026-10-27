// Aquadic — 9 client repos (GitHub org AQuadic) read on laptop 3, 2026-10-28.
// Code sketches are simplified patterns, not project code.
HANDBOOK.projects.push({
  id: "aquadic",
  name: "Aquadic",
  monogram: "A",
  color: "#2f56c9",
  company: "Aquadic",
  years: "2022–24",
  period: "Oct 2022 – Jul 2024",
  role: { en: "Frontend Developer · first job", ar: "Frontend Developer · أول شغل" },
  team: { en: "main frontend dev on each project", ar: "الفرونت الأساسي في كل مشروع" },
  tagline: { en: "Client websites and web apps: e-learning, a services marketplace, a resort portal, e-commerce.", ar: "مواقع وتطبيقات لعملاء: منصة تعليمية، ماركت بليس خدمات، بورتال منتجع، ومتاجر." },
  stats: [
    ["9", { en: "client projects", ar: "مشاريع عملاء" }],
    ["~530", { en: "commits", ar: "كوميت" }],
    ["3 + 6", { en: "Next.js apps + HTML sites", ar: "تطبيقات Next.js + مواقع HTML" }],
    ["21 mo", { en: "Oct 2022 → Jul 2024", ar: "أكتوبر 2022 ← يوليو 2024" }]
  ],

  pitch: [
    { en: "My first job, at a software company in Alexandria that builds for clients.", ar: "أول شغل ليا، في شركة software في إسكندرية بتعمل مشاريع لعملاء." },
    { en: "Started with <b>6 HTML/CSS/JS sites</b>, then built <b>3 Next.js 13 apps</b>: an e-learning platform, a services marketplace with live chat, and the Marina resort portal.", ar: "بدأت بـ <b>6 مواقع HTML/CSS/JS</b>، وبعدين بنيت <b>3 تطبيقات Next.js 13</b>: منصة تعليمية، ماركت بليس خدمات فيه شات لايف، وبورتال منتجع مارينا." },
    { en: "Almost everything was <b>Arabic / English with RTL</b>, and I used the App Router from 2023.", ar: "تقريبًا كل حاجة كانت <b>عربي / إنجليزي بـ RTL</b>، واستخدمت الـ App Router من 2023." }
  ],

  built: [
    { title: { en: "Analytica — e-learning (142 commits)", ar: "Analytica — منصة تعليمية (142 كوميت)" }, items: [
      { en: "Courses, course content and video, quizzes, certificates", ar: "الكورسات، محتواها والفيديو، الاختبارات، الشهادات" },
      { en: "Instructor pages, my courses, checkout (success / failed), active devices", ar: "صفحات المدرب، كورساتي، الدفع (نجاح / فشل)، الأجهزة المسجلة" },
      { en: "Google login (next-auth), next-intl, SEO metadata on 19 pages", ar: "Google login (next-auth)، next-intl، و SEO metadata في 19 صفحة" }
    ]},
    { title: { en: "Find Help — services marketplace (98)", ar: "Find Help — ماركت بليس خدمات (98)" }, items: [
      { en: "Categories, service details, add and promote services, orders", ar: "التصنيفات، تفاصيل الخدمة، إضافة وترويج خدمات، الطلبات" },
      { en: "Real-time chat on Firestore; phone OTP with Firebase", ar: "شات لايف على Firestore؛ OTP بالموبايل بـ Firebase" },
      { en: "Favourites, addresses on Google Maps, checkout", ar: "المفضلة، العناوين على Google Maps، الدفع" }
    ]},
    { title: { en: "Marina — resort portal (83)", ar: "Marina — بورتال منتجع (83)" }, items: [
      { en: "Listings, articles, guide (where to go, what to do)", ar: "الـ listings، المقالات، الدليل (تروح فين، تعمل إيه)" },
      { en: "Service requests, invoices and payment, lost & found, complaints", ar: "طلبات الخدمات، الفواتير ودفعها، المفقودات، الشكاوى" },
      { en: "Admin login, OTP; Pages Router + react-i18next", ar: "login للأدمن، OTP؛ Pages Router + react-i18next" }
    ]},
    { title: { en: "HTML / CSS / JS sites (6)", ar: "مواقع HTML / CSS / JS (6)" }, items: [
      { en: "Alwatania and MDR — e-commerce (basket, checkout, orders)", ar: "الوطنية و MDR — متاجر (سلة، دفع، طلبات)" },
      { en: "Megaminds Academy, Learning, Institute — education", ar: "Megaminds Academy، Learning، Institute — تعليم" },
      { en: "Tajj — bilingual landing page", ar: "Tajj — landing page بلغتين" }
    ]}
  ],

  myRole: [
    { en: "Main frontend developer on all 9 repos; the repo owner made a few commits.", ar: "الفرونت الأساسي في الـ 9 مشاريع؛ وصاحب الـ repo كان بيعمل كوميتات قليلة." },
    { en: "Megaminds: 60 of 83 commits (another developer did 21).", ar: "Megaminds: 60 من 83 كوميت (مطور تاني عمل 21)." }
  ],

  stack: [
    [{ en: "Apps", ar: "التطبيقات" }, ["Next.js 13 (App Router)", "Next.js 13 (Pages Router)", "React", "JavaScript"]],
    [{ en: "i18n", ar: "اللغات" }, ["next-intl", "react-i18next"]],
    [{ en: "Auth", ar: "الـ Auth" }, ["next-auth (Google)", "Firebase Phone Auth"]],
    [{ en: "Data", ar: "الداتا" }, ["axios", "Firestore"]],
    [{ en: "UI", ar: "الواجهة" }, ["MUI", "Mantine", "React-Bootstrap", "Tailwind", "Sass"]],
    [{ en: "Sites", ar: "المواقع" }, ["HTML", "CSS", "JavaScript"]]
  ],

  decisions: [
    {
      title: { en: "Plain HTML or a framework", ar: "HTML عادي ولا framework" },
      chose: "HTML/CSS/JS for simple sites", alts: ["React / Next.js everywhere"],
      why: { en: "Marketing and catalogue sites with little state don't need a framework — faster to build and to host.", ar: "مواقع تسويق وكتالوج فيها state قليل مش محتاجة framework — أسرع في البناء والاستضافة." },
      both: { v: "yes", en: "Static pages and a framework app can sit side by side (e.g. landing in HTML, app in Next.js).", ar: "صفحات static و تطبيق framework ممكن يبقوا جنب بعض (landing بـ HTML والتطبيق بـ Next.js)." },
      better: { en: "Today Astro or Next.js static export: still static output, but with components and reuse.", ar: "النهارده Astro أو Next.js static export: نفس الناتج static بس بـ components وإعادة استخدام." },
      say: "I moved from static sites to Next.js when projects needed auth, state and data."
    },
    {
      title: { en: "Pages Router vs App Router", ar: "Pages Router ولا App Router" },
      chose: "App Router (Analytica, Find Help)", alts: ["Pages Router (Marina)"],
      why: { en: "Marina started in April 2023 on the Pages Router. The App Router became stable in Next 13.4 (May 2023), so the projects from August used it: nested layouts, server components and the metadata API.", ar: "Marina بدأ في أبريل 2023 على الـ Pages Router. والـ App Router بقى stable في Next 13.4 (مايو 2023)، فالمشاريع اللي بدأت في أغسطس استخدمته: layouts متداخلة، server components، و metadata API." },
      both: { v: "yes", en: "Both routers can coexist in one app — the official way to migrate page by page.", ar: "الاتنين ينفعوا مع بعض في نفس التطبيق — ودي الطريقة الرسمية للـ migration صفحة صفحة." },
      better: { en: "App Router for anything new.", ar: "App Router لأي حاجة جديدة." },
      say: "I've shipped on both routers; I know getServerSideProps-style data and the App Router's server components and layouts.",
      concept: "routers"
    },
    {
      title: { en: "Translations", ar: "الترجمة" },
      chose: "next-intl", alts: ["next-i18next / react-i18next"],
      why: { en: "next-i18next was built for the Pages Router; next-intl supports the App Router (server components, <code>[locale]</code> routes, middleware). Marina used react-i18next because it was on the Pages Router.", ar: "next-i18next معمول للـ Pages Router؛ و next-intl بيدعم الـ App Router (server components، و routes بـ <code>[locale]</code>، و middleware). و Marina استخدم react-i18next علشان كان Pages Router." },
      both: { v: "no", en: "Two i18n libraries in one app means two message formats.", ar: "مكتبتين ترجمة في تطبيق واحد = شكلين مختلفين لملفات الترجمة." },
      better: { en: "next-intl for App Router projects.", ar: "next-intl لمشاريع الـ App Router." },
      say: "For App Router projects I use next-intl because it works in server components and with locale routing.",
      concept: "i18n"
    },
    {
      title: { en: "Live chat without a socket server", ar: "شات لايف من غير socket server" },
      chose: "Firestore onSnapshot", alts: ["Socket.IO server", "polling"],
      why: { en: "Find Help had no real-time backend. Firestore stores messages and pushes changes to every listener.", ar: "Find Help ماكانش عنده باك إند real-time. Firestore بيخزن الرسايل وبيبعت أي تغيير لكل اللي سامعين." },
      both: { v: "no", en: "Two real-time channels for the same chat would duplicate messages.", ar: "قناتين real-time لنفس الشات هيكرروا الرسايل." },
      better: { en: "Fine for a small app. Watch read costs (each listener counts) and lock it down with security rules.", ar: "مناسب لتطبيق صغير. خلي بالك من تكلفة الـ reads (كل listener بيتحسب) واقفله بـ security rules." },
      say: "We used Firestore listeners for chat because the backend had no sockets; unsubscribing in the effect cleanup kept listeners from piling up.",
      concept: "realtime"
    },
    {
      title: { en: "Fetching data", ar: "جلب الداتا" },
      chose: "axios + useEffect", alts: ["TanStack Query"],
      why: { en: "That's how I fetched data then: one axios instance and <code>useEffect</code> + <code>useState</code> per page.", ar: "دي كانت طريقتي ساعتها: axios instance واحدة و <code>useEffect</code> + <code>useState</code> في كل صفحة." },
      both: { v: "partly", en: "TanStack Query was installed in Analytica but never used — a dependency with no job.", ar: "TanStack Query كان متسطب في Analytica بس عمره ما اتستخدم — dependency ملهاش شغلانة." },
      better: { en: "TanStack Query: caching, loading/error states and retries for free — which I adopted at Profound.", ar: "TanStack Query: caching و loading/error و retries جاهزين — ودي اللي بدأت أستخدمها في Profound." },
      say: "My early projects fetched in effects; moving to TanStack Query later removed a lot of manual loading and error code.",
      concept: "server-state"
    }
  ],

  flows: [
    {
      title: { en: "Find Help chat (Firestore)", ar: "شات Find Help (Firestore)" },
      steps: [
        ["Open chat", { en: "query messages for this chat, orderBy created_at", ar: "query لرسايل الشات ده، مترتبة بـ created_at" }],
        ["onSnapshot", { en: "inside useEffect; fires on every change", ar: "جوه useEffect؛ بيشتغل مع أي تغيير" }],
        ["setState", { en: "messages list updates", ar: "قايمة الرسايل بتتحدث" }],
        ["addDoc", { en: "sending writes a new message", ar: "الإرسال بيكتب رسالة جديدة" }],
        ["Cleanup", { en: "unsubscribe when leaving", ar: "unsubscribe لما تخرج" }]
      ]
    },
    {
      title: { en: "Phone sign-up (Firebase)", ar: "التسجيل بالموبايل (Firebase)" },
      steps: [
        ["Phone", { en: "user enters the number", ar: "المستخدم يدخل الرقم" }],
        ["RecaptchaVerifier", { en: "bot check", ar: "تأكيد إنه مش bot" }],
        ["signInWithPhoneNumber", { en: "Firebase sends the SMS", ar: "Firebase بيبعت الـ SMS" }],
        ["confirm(code)", { en: "user enters the code", ar: "المستخدم يدخل الكود" }]
      ]
    }
  ],

  patterns: [
    {
      title: { en: "Subscribe in an effect, unsubscribe in cleanup", ar: "اشترك في effect، والغي في الـ cleanup" },
      body: { en: "Any listener (Firestore, WebSocket, event) must be removed when the component leaves.", ar: "أي listener (Firestore، WebSocket، event) لازم يتشال لما الـ component يمشي." },
      code: "useEffect(() => {\n  const q = query(\n    collection(db, \"messages\"),\n    where(\"chatId\", \"==\", chatId),\n    orderBy(\"created_at\")\n  );\n  const unsubscribe = onSnapshot(q, (snap) => {\n    setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));\n  });\n  return unsubscribe; // leave the chat → stop listening\n}, [chatId]);"
    }
  ],

  hooks: [
    { group: { en: "Hooks I used most", ar: "أكتر hooks استخدمتها" }, items: [
      { name: "useEffect", what: { en: "Fetch on mount; Firestore subscription with unsubscribe in cleanup.", ar: "جلب الداتا أول ما الصفحة تفتح؛ واشتراك Firestore مع unsubscribe في الـ cleanup." }, remember: { en: "Return the cleanup — otherwise listeners pile up.", ar: "رجّع الـ cleanup — وإلا الـ listeners هتتراكم." } },
      { name: "useState", what: { en: "Data, loading, forms, messages.", ar: "الداتا، الـ loading، الفورمز، الرسايل." } },
      { name: "useSession", what: { en: "next-auth: is the user signed in?", ar: "next-auth: المستخدم عامل login؟" } },
      { name: "useTranslations / useTranslation", what: { en: "next-intl on the App Router; react-i18next on Marina.", ar: "next-intl في الـ App Router؛ و react-i18next في Marina." } },
      { name: "useRouter", what: { en: "Navigate after login or checkout; switch language.", ar: "التنقل بعد الـ login أو الدفع؛ وتغيير اللغة." } }
    ]}
  ],

  problems: [
    {
      title: { en: "Live chat without a real-time backend", ar: "شات لايف من غير باك إند real-time" },
      problem: { en: "Find Help needed client–provider chat and had no socket server.", ar: "Find Help كان محتاج شات بين العميل ومقدم الخدمة ومفيش socket server." },
      fix: { en: "Firestore: onSnapshot pushes new messages instantly, ordered by time; unsubscribe on leave.", ar: "Firestore: onSnapshot بيبعت الرسايل الجديدة فورًا مترتبة بالوقت؛ و unsubscribe لما تخرج." },
      result: { en: "Working chat with no extra server.", ar: "شات شغال من غير سيرفر زيادة." }
    },
    {
      title: { en: "Two languages and RTL everywhere", ar: "لغتين و RTL في كل حتة" },
      problem: { en: "Every client wanted Arabic and English; Arabic needs RTL and a different font.", ar: "كل العملاء عايزين عربي وإنجليزي؛ والعربي محتاج RTL وخط مختلف." },
      fix: { en: "Locale in the URL, message files, <code>dir</code> switching by language, separate Arabic styles.", ar: "اللغة في الـ URL، ملفات ترجمة، <code>dir</code> بيتغير حسب اللغة، وستايل منفصل للعربي." },
      result: { en: "Bilingual sites from one codebase.", ar: "مواقع بلغتين من نفس الكود." }
    }
  ],

  star: {
    s: { en: "First job, at a company building many client projects.", ar: "أول شغل، في شركة بتعمل مشاريع لعملاء كتير." },
    t: { en: "Main frontend developer on each project.", ar: "الفرونت الأساسي في كل مشروع." },
    a: { en: "Started with HTML/CSS/JS sites, then built bilingual Next.js 13 apps: e-learning with Google login, a marketplace with Firestore chat and phone OTP, and the Marina resort portal.", ar: "بدأت بمواقع HTML/CSS/JS، وبعدين بنيت تطبيقات Next.js 13 بلغتين: منصة تعليمية بـ Google login، ماركت بليس بشات Firestore و OTP بالموبايل، وبورتال منتجع مارينا." },
    r: { en: "9 client projects and about 530 commits in 21 months.", ar: "9 مشاريع عملاء وحوالي 530 كوميت في 21 شهر." }
  },

  qa: [
    { q: "Why unsubscribe from onSnapshot in the cleanup?", a: { en: "An open listener keeps costing reads and calling setState. Leaving the chat without unsubscribing leaks memory and updates an unmounted component.", ar: "الـ listener المفتوح بيفضل يستهلك reads وينادي setState. لو خرجت من الشات من غير unsubscribe يبقى في memory leak و update لـ component اتشال." } },
    { q: "App Router vs Pages Router — what changes?", a: { en: "Nested layouts, server components by default, the metadata API instead of next/head, and data fetching in components instead of getServerSideProps.", ar: "layouts متداخلة، server components بالـ default، metadata API بدل next/head، وجلب الداتا جوه الـ components بدل getServerSideProps." } },
    { q: "What would you do differently?", a: { en: "TanStack Query instead of effect fetching, TypeScript, and fewer UI libraries per project.", ar: "TanStack Query بدل الـ fetch في effects، و TypeScript، ومكتبات UI أقل في كل مشروع." } }
  ],

  terms: ["App Router", "Pages Router", "nested layouts", "metadata API", "RTL", "locale routing", "realtime listener", "cleanup function"],

  dont: [
    { en: "TanStack Query was installed in Analytica but never used — don't claim it here.", ar: "TanStack Query كان متسطب في Analytica بس ما اتستخدمش — ماتقولش إنك استخدمته هنا." },
    { en: "“10+ clients” — 9 are proven.", ar: "«10+ عملاء» — المثبت 9." },
    { en: "No “axios layer with retries” and no performance numbers — no evidence.", ar: "مفيش «axios layer بـ retries» ولا أرقام performance — مفيش دليل." },
    { en: "These projects are JavaScript, not TypeScript.", ar: "المشاريع دي JavaScript مش TypeScript." }
  ],

  evidence: [
    "GitHub org AQuadic repos on laptop 3 (OneDrive/Desktop/Projects, Desktop/Projects/megamind_front)",
    "Deep dive: evidence/projects/aquadic.md"
  ]
});
