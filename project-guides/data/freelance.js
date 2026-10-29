// Freelance — Takhawy, Edubrain, Rashaktk, Rehla (repos on laptop 3), 2026-10-28.
// Code sketches are simplified patterns, not project code.
HANDBOOK.projects.push({
  id: "freelance",
  name: "Freelance",
  monogram: "F",
  color: "#5a46c8",
  company: "Freelance",
  years: "2024–25",
  period: "Feb 2024 – May 2025",
  role: { en: "Solo on every project", ar: "لوحدي في كل مشروع" },
  team: { en: "alongside Aquadic and Profound", ar: "جنب Aquadic و Profound" },
  tagline: { en: "Four client projects in Next.js 14 + TypeScript — one of them full-stack.", ar: "4 مشاريع عملاء بـ Next.js 14 و TypeScript — واحد منهم full-stack." },
  stats: [
    ["4", { en: "clients", ar: "عملاء" }],
    ["187", { en: "commits, all mine", ar: "كوميت، كلهم بتوعي" }],
    ["12", { en: "API route handlers (Edubrain)", ar: "API route handler (Edubrain)" }]
  ],

  pitch: [
    { en: "Freelance work next to my jobs: four clients, each project solo from start to finish.", ar: "شغل فريلانس جنب الوظيفة: 4 عملاء، وكل مشروع لوحدي من الأول للآخر." },
    { en: "<b>Takhawy</b> (Saudi trip-sharing app site), <b>Rashaktk</b> (women's fitness centre), <b>Rehla</b> (travel landing) — bilingual Next.js 14.", ar: "<b>تخاوي</b> (موقع تطبيق سعودي لمشاركة الرحلات)، <b>رشاقتك</b> (مركز رشاقة نسائي)، <b>رحلة</b> (landing لرحلات) — Next.js 14 بلغتين." },
    { en: "<b>Edubrain</b> is full-stack Next.js: 12 route handlers with bcrypt + JWT auth, Google sign-in and PDF export with Puppeteer.", ar: "<b>Edubrain</b> full-stack بـ Next.js: 12 route handler بـ auth (bcrypt + JWT)، و Google sign-in، وتصدير PDF بـ Puppeteer." }
  ],

  built: [
    { title: { en: "Takhawy — 62 commits", ar: "تخاوي — 62 كوميت" }, items: [
      { en: "Captain (driver) sign-up with image upload", ar: "انضمام الكباتن مع رفع الصور" },
      { en: "Investors, jobs with an application form, contact, terms, privacy", ar: "المستثمرين، الوظايف بفورم تقديم، تواصل، الشروط، الخصوصية" },
      { en: "Arabic / English (next-intl), SEO metadata", ar: "عربي / إنجليزي (next-intl)، و SEO metadata" }
    ]},
    { title: { en: "Edubrain — 65 commits", ar: "Edubrain — 65 كوميت" }, items: [
      { en: "Subject and answer pages, question-image upload (Mantine Dropzone)", ar: "صفحات المواد والإجابات، رفع صورة السؤال (Mantine Dropzone)" },
      { en: "User dashboard with TanStack Table and URL pagination (nuqs)", ar: "داشبورد بجدول TanStack Table و pagination في الـ URL (nuqs)" },
      { en: "Google sign-in, reCAPTCHA, Markdown blog", ar: "Google sign-in، reCAPTCHA، بلوج من Markdown" },
      { en: "API: sign-up/login (bcrypt + JWT), answers, profile, PDF export", ar: "API: تسجيل/login (bcrypt + JWT)، الإجابات، البروفايل، تصدير PDF" }
    ]},
    { title: { en: "Rashaktk — 51 · Rehla — 9", ar: "رشاقتك — 51 · رحلة — 9" }, items: [
      { en: "Rashaktk: programs, subscriptions, offers, working hours, map — bilingual", ar: "رشاقتك: البرامج، الاشتراكات، العروض، مواعيد العمل، خريطة — بلغتين" },
      { en: "Rehla: travel landing page with videos", ar: "رحلة: landing page لرحلات بفيديوهات" }
    ]}
  ],

  myRole: [
    { en: "Solo developer on all four; client of Takhawy: Hayah Technology.", ar: "المطور الوحيد في الأربعة. والعميل بتاع تخاوي هو Hayah Technology." },
    { en: "On the CV this is one “Freelance” entry, not a company.", ar: "على الـ CV بيتكتب entry واحدة «Freelance»، مش شركة." }
  ],

  stack: [
    [{ en: "Core", ar: "الأساس" }, ["Next.js 14", "TypeScript", "Route Handlers"]],
    [{ en: "Auth", ar: "الـ Auth" }, ["bcryptjs", "JWT", "next-auth (Google)", "reCAPTCHA"]],
    [{ en: "UI & data", ar: "الواجهة والداتا" }, ["Mantine", "TanStack Table", "nuqs", "react-hook-form + yup", "Swiper"]],
    [{ en: "Content", ar: "المحتوى" }, ["next-intl", "gray-matter", "remark", "Puppeteer"]]
  ],

  decisions: [
    {
      title: { en: "PDF export", ar: "تصدير PDF" },
      chose: "Puppeteer", alts: ["@react-pdf/renderer", "jsPDF"],
      why: { en: "Headless Chrome prints the real page — same fonts, layout and images — instead of rebuilding the design in a PDF library.", ar: "Chrome بدون واجهة بيطبع الصفحة الحقيقية — نفس الخطوط والشكل والصور — بدل ما أعيد بناء التصميم في مكتبة PDF." },
      both: { v: "partly", en: "The project also lists @react-pdf/renderer. Keep the one you use.", ar: "المشروع فيه @react-pdf/renderer كمان. سيب اللي بتستخدمه بس." },
      better: { en: "Puppeteer is heavy (a whole browser) and won't run on many serverless hosts; in production move it to a worker or a PDF service. @react-pdf is lighter when the PDF has its own simple design.", ar: "الـ Puppeteer تقيل، لأنه متصفح كامل، ومش بيشتغل على hosting كتير من نوع serverless. ففي الـ production يتنقل لـ worker أو خدمة PDF. و @react-pdf أخف، لو الـ PDF ليه تصميم بسيط خاص بيه." },
      say: "I generated PDFs with Puppeteer for pixel-perfect output, knowing it should run in a worker in production."
    },
    {
      title: { en: "Where data is stored (Edubrain)", ar: "الداتا متخزنة فين (Edubrain)" },
      chose: "JSON files (prototype)", alts: ["PostgreSQL / MongoDB", "SQLite + Prisma"],
      why: { en: "A demo for the client: route handlers read and write JSON files with <code>fs</code>, so it runs with no database.", ar: "ديمو للعميل: الـ route handlers بتقرا وتكتب ملفات JSON بـ <code>fs</code>، فبيشتغل من غير database." },
      both: { v: "no", en: "Pick one source of data.", ar: "مصدر داتا واحد." },
      better: { en: "A real database. Writing files fails on serverless hosts (read-only file system) and has no concurrency control.", ar: "database حقيقية. الكتابة في ملفات بتفشل على الـ serverless (الـ file system read-only) ومفيهاش تحكم لما أكتر من request يكتبوا مع بعض." },
      say: "Edubrain's API was a file-based prototype; for production I'd use a database because serverless file systems are read-only.",
      concept: "one-tool"
    },
    {
      title: { en: "Password hashing", ar: "تشفير الباسورد" },
      chose: "bcryptjs", alts: ["bcrypt (native)", "argon2"],
      why: { en: "A one-way, salted, deliberately slow hash. The pure-JS version installs anywhere without native builds.", ar: "hash اتجاه واحد، فيه salt، وبطيء عن قصد. والنسخة الـ JS بتتسطب في أي حتة من غير native build." },
      both: { v: "no", en: "One hashing algorithm per user table.", ar: "خوارزمية hash واحدة لجدول المستخدمين." },
      better: { en: "argon2id is the current recommendation; native bcrypt is faster than bcryptjs.", ar: "الـ argon2id هو المُوصى بيه حاليًا. والـ bcrypt الـ native أسرع من bcryptjs." },
      say: "Passwords are hashed with bcrypt and compared with bcrypt.compare — never stored or encrypted reversibly."
    },
    {
      title: { en: "Two sign-in systems", ar: "نظامين للدخول" },
      chose: "own JWT + next-auth (Google)", alts: ["Auth.js for both"],
      why: { en: "Email/password went through my own route handlers and JWT; Google sign-in through next-auth.", ar: "الإيميل والباسورد عن طريق route handlers بتاعتي و JWT. و Google عن طريق next-auth." },
      both: { v: "partly", en: "It works, but two session mechanisms must be kept in sync.", ar: "شغال، بس لازم آلية الـ sessions الاتنين يفضلوا متزامنين." },
      better: { en: "Auth.js with both the Credentials and Google providers — one session for everything.", ar: "Auth.js بالـ Credentials و Google providers — session واحدة لكل حاجة." },
      say: "Today I'd put credentials and Google behind one Auth.js session instead of two mechanisms.",
      concept: "token-storage"
    },
    {
      title: { en: "Blog content", ar: "محتوى البلوج" },
      chose: "Markdown files + gray-matter + remark", alts: ["headless CMS", "MDX"],
      why: { en: "Simple, versioned with the code, no CMS to pay for.", ar: "بسيط، متخزن مع الكود في git، ومن غير CMS تدفع له." },
      both: { v: "yes", en: "Markdown for developer content and a CMS for editors can coexist.", ar: "Markdown لمحتوى المطورين و CMS للمحررين ممكن يبقوا مع بعض." },
      better: { en: "MDX if posts need components; a CMS if non-developers write.", ar: "MDX لو المقالات محتاجة components. و CMS لو اللي بيكتبوا مش developers." },
      say: "The blog is Markdown with front matter, rendered at build time."
    }
  ],

  flows: [
    {
      title: { en: "Edubrain login", ar: "الـ login في Edubrain" },
      steps: [
        ["Form + reCAPTCHA", { en: "validate input, block bots", ar: "تأكيد البيانات ومنع الـ bots" }],
        ["POST /api/login", { en: "route handler", ar: "route handler" }],
        ["bcrypt.compare", { en: "check the password hash", ar: "مقارنة الـ hash" }],
        ["JWT", { en: "signed token returned", ar: "توكن متوقّع بيرجع" }],
        ["Dashboard", { en: "user's answers and profile", ar: "إجابات المستخدم وبروفايله" }]
      ]
    },
    {
      title: { en: "Answer → PDF", ar: "إجابة ← PDF" },
      steps: [
        ["Click export", { en: "from the answer page", ar: "من صفحة الإجابة" }],
        ["/api/generate-pdf", { en: "route handler", ar: "route handler" }],
        ["Puppeteer", { en: "headless Chrome opens the page", ar: "Chrome بدون واجهة بيفتح الصفحة" }],
        ["page.pdf()", { en: "prints it", ar: "بيطبعها" }],
        ["Download", { en: "PDF streamed back", ar: "الـ PDF بيرجع للتحميل" }]
      ]
    }
  ],

  patterns: [
    {
      title: { en: "A login route handler", ar: "route handler للـ login" },
      body: { en: "Validate, compare the hash, return a signed token. Never return why it failed (user vs password).", ar: "تأكيد البيانات، مقارنة الـ hash، ورجّع توكن متوقّع. وماتقولش ليه فشل (المستخدم ولا الباسورد)." },
      code: "export async function POST(req: Request) {\n  const { email, password } = await req.json();\n  const user = await findUserByEmail(email);\n  const ok = user && (await bcrypt.compare(password, user.passwordHash));\n  if (!ok) return Response.json({ message: \"Invalid credentials\" }, { status: 401 });\n\n  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, { expiresIn: \"7d\" });\n  return Response.json({ token });\n}"
    }
  ],

  hooks: [
    { group: { en: "Hooks I used", ar: "الـ hooks اللي استخدمتها" }, items: [
      { name: "useTranslations", what: { en: "next-intl text in Takhawy (14 files) and Rashaktk.", ar: "نصوص next-intl في تخاوي (14 ملف) ورشاقتك." } },
      { name: "useForm + yupResolver", what: { en: "Edubrain forms (sign-up, sign-in, profile, contact).", ar: "فورمز Edubrain (تسجيل، login، بروفايل، تواصل)." } },
      { name: "useQueryState", what: { en: "nuqs: dashboard page in the URL.", ar: "nuqs: رقم الصفحة في الداشبورد في الـ URL." } },
      { name: "useReactTable", what: { en: "TanStack Table for the answers table.", ar: "TanStack Table لجدول الإجابات." } },
      { name: "useSession", what: { en: "next-auth: Google sign-in state.", ar: "next-auth: حالة الـ Google sign-in." } },
      { name: "useRef", what: { en: "reCAPTCHA widget reference to read and reset the token.", ar: "مرجع لـ reCAPTCHA علشان أقرا التوكن وأعمله reset." } }
    ]}
  ],

  problems: [
    {
      title: { en: "A PDF that looks like the page", ar: "PDF شكله زي الصفحة" },
      problem: { en: "Users wanted to download an answer as a PDF that looks like the page.", ar: "المستخدمين عايزين ينزلوا الإجابة PDF بنفس شكل الصفحة." },
      fix: { en: "A route handler launches Puppeteer and prints the page.", ar: "route handler بيشغّل Puppeteer ويطبع الصفحة." },
      result: { en: "Pixel-perfect PDFs without a second layout.", ar: "PDF مطابق من غير تصميم تاني." },
      lesson: { en: "Heavy work like this belongs in a worker or a separate service in production.", ar: "الشغل التقيل ده مكانه worker أو خدمة منفصلة في production." }
    },
    {
      title: { en: "A working demo without a backend team", ar: "ديمو شغال من غير فريق باك إند" },
      problem: { en: "The client needed a full demo (accounts, answers, profile) before a real backend existed.", ar: "العميل كان محتاج ديمو كامل (حسابات، إجابات، بروفايل) قبل ما يبقى في باك إند حقيقي." },
      fix: { en: "12 Next.js route handlers with bcrypt, JWT and JSON-file storage.", ar: "12 route handler في Next.js بـ bcrypt و JWT وتخزين في ملفات JSON." },
      result: { en: "A clickable full-stack prototype.", ar: "prototype full-stack تقدر تجربه." }
    }
  ],

  star: {
    s: { en: "Small clients needed websites and one needed a working platform demo.", ar: "عملاء صغيرين محتاجين مواقع، وواحد محتاج ديمو منصة شغال." },
    t: { en: "Build each one alone, next to my full-time job.", ar: "أعمل كل واحد لوحدي، جنب شغلي الأساسي." },
    a: { en: "Bilingual Next.js 14 + TypeScript sites, and for Edubrain a full-stack prototype with route handlers, hashed passwords, JWT, Google sign-in and Puppeteer PDFs.", ar: "مواقع Next.js 14 و TypeScript بلغتين، ولـ Edubrain prototype full-stack بـ route handlers، وباسوردات متشفرة، و JWT، و Google sign-in، و PDF بـ Puppeteer." },
    r: { en: "Four delivered projects, 187 commits.", ar: "4 مشاريع اتسلمت، 187 كوميت." }
  },

  qa: [
    { q: "Why hash passwords instead of encrypting them?", a: { en: "A hash is one-way, so there's no key to steal. bcrypt is salted and slow on purpose, which makes brute force and rainbow tables impractical.", ar: "الـ hash اتجاه واحد، فمفيش مفتاح يتسرق. و bcrypt فيه salt وبطيء عن قصد، فالـ brute force والـ rainbow tables مش عملية." } },
    { q: "Why can't you write JSON files on Vercel?", a: { en: "Serverless functions have a read-only file system and each request can run on a different instance, so file writes are lost or fail. You need a database or object storage.", ar: "الـ serverless functions الـ file system بتاعها read-only وكل request ممكن يشتغل على instance مختلف، فالكتابة بتضيع أو تفشل. محتاج database أو object storage." } },
    { q: "How do you manage freelance alongside a full-time job?", a: { en: "Small, clearly scoped projects with staged delivery.", ar: "مشاريع صغيرة ومحددة، والتسليم على مراحل." } }
  ],

  terms: ["route handlers", "password hashing", "salt", "JWT", "serverless file system", "headless browser", "front matter"],

  dont: [
    { en: "Edubrain: don't say “AI homework assistant” — no AI in my code.", ar: "Edubrain: ماتقولش «AI homework assistant» — مفيش AI في الكود بتاعي." },
    { en: "Edubrain's API is a JSON-file prototype — not a production backend or a database.", ar: "الـ API بتاع Edubrain prototype بملفات JSON — مش production backend ولا database." },
    { en: "No user or traffic numbers.", ar: "مفيش أرقام مستخدمين أو زيارات." }
  ],

  evidence: [
    "Repos on laptop 3: OneDrive/Desktop/Projects/{TakhawiWebsiteFrontENd, Takhawy_Next, rashaktk, rehla}, Desktop/Projects/edubrain",
    "Deep dive: evidence/projects/freelance.md"
  ]
});
