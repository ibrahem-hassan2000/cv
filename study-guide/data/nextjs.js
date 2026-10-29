// Next.js — written 2026-10-29.
STUDY.fill("nextjs", {
  intro: { en: "Next.js from the interview angle: rendering strategies, Server vs Client Components, data fetching and caching, Server Actions, middleware and route handlers, SEO/images/fonts, Pages vs App Router, and where it runs.", ar: "Next.js من زاوية الإنترفيو: استراتيجيات الـ rendering، و Server ولا Client Components، وجلب الداتا والكاش، و Server Actions، و middleware و route handlers، و SEO والصور والخطوط، و Pages ولا App Router، وبيشتغل فين." },
  topics: [
    {
      id: "rendering",
      title: { en: "CSR, SSR, SSG, ISR and streaming", ar: "CSR و SSR و SSG و ISR والـ streaming" },
      tldr: { en: "CSR renders in the browser (fast to build, slower first paint, weak SEO). SSR renders per request (fresh, personalised). SSG renders at build (fastest, static). ISR = static pages regenerated after N seconds or on demand. Streaming sends HTML in chunks with Suspense so the shell shows before slow parts finish.", ar: "CSR بيرندر في المتصفح (سهل، بس أول رسم أبطأ و SEO ضعيف). و SSR بيرندر مع كل request (جديد ومخصص). و SSG بيرندر وقت الـ build (أسرع حاجة، static). و ISR = صفحات static بتتجدد بعد N ثانية أو عند الطلب. والـ Streaming بيبعت الـ HTML على دفعات بـ Suspense فالهيكل يظهر قبل الأجزاء البطيئة." },
      blocks: [
        { type: "compare", cols: [{ en: "Strategy", ar: "الطريقة" }, { en: "HTML made", ar: "الـ HTML بيتعمل" }, { en: "Good for", ar: "كويس لـ" }, { en: "In the App Router", ar: "في الـ App Router" }], rows: [
          ["SSG", { en: "At build", ar: "وقت الـ build" }, { en: "Marketing, docs, blogs", ar: "تسويق، docs، مدونات" }, { en: "Default for routes with no dynamic data", ar: "الافتراضي للـ routes من غير داتا dynamic" }],
          ["ISR", { en: "At build, refreshed later", ar: "وقت الـ build وبيتجدد بعدين" }, { en: "Product pages, catalogues", ar: "صفحات منتجات، كتالوجات" }, "export const revalidate = 60 / revalidateTag()"],
          ["SSR", { en: "Every request", ar: "مع كل request" }, { en: "Personalised or always-fresh pages", ar: "صفحات مخصصة أو لازم تبقى جديدة دايمًا" }, { en: "cookies()/headers()/no-store make it dynamic", ar: "cookies() و headers() و no-store بيخلوها dynamic" }],
          ["CSR", { en: "In the browser", ar: "في المتصفح" }, { en: "Dashboards behind login", ar: "داشبورد ورا login" }, { en: "\"use client\" components fetching with React Query", ar: "Components بـ \"use client\" بتجيب بـ React Query" }]
        ] },
        { type: "projects", items: [{ text: { en: "okoRent's public marketplace needed SEO-friendly pages (App Router); Smart FAQ, an invitation-only tool, is a Vite SPA — CSR was enough.", ar: "السوق العام في okoRent كان محتاج صفحات SEO (App Router)؛ و Smart FAQ أداة بالدعوة بس، فبقى Vite SPA — والـ CSR كان كفاية." }, p: "okorent", tab: "decisions", label: "okoRent" }] }
      ],
      say: "I choose per page: static or ISR for public content, dynamic rendering when it depends on the request, and client rendering for app screens behind login.",
      interview: [{ q: "SSR vs SSG — how do you choose?", a: { en: "If every visitor sees the same content that changes rarely → SSG/ISR (fast, cacheable). If it depends on the user or must be live → SSR. Behind login with lots of interaction → CSR is fine.", ar: "لو كل الزوار شايفين نفس المحتوى ونادرًا ما بيتغير ← SSG أو ISR (سريع ويتعمله cache). لو معتمد على المستخدم أو لازم يبقى لايف ← SSR. ورا login وفيه تفاعل كتير ← CSR كويس." },
        follow: [{ q: "What is hydration?", a: { en: "The browser receives server HTML, then React attaches event handlers and state to that markup. If the client render differs from the server HTML you get a hydration mismatch (dates, random ids, window checks).", ar: "المتصفح بيستلم HTML من السيرفر، وبعدين React بيربط الـ event handlers والـ state بالـ markup ده. ولو الـ render في الـ client مختلف عن HTML السيرفر بيحصل hydration mismatch (تواريخ، IDs عشوائية، فحص window)." } }] }],
      quiz: [{ q: { en: "Blog page updated hourly — strategy?", ar: "صفحة مدونة بتتحدث كل ساعة — الطريقة؟" }, a: { en: "ISR with revalidate = 3600 (or on-demand revalidation on publish).", ar: "ISR بـ revalidate = 3600 (أو revalidation عند النشر)." } }],
      quick: [{ en: "SSG/ISR public · SSR per request · CSR behind login · streaming with Suspense · hydration must match.", ar: "SSG و ISR للعام · SSR مع كل request · CSR ورا login · streaming بـ Suspense · الـ hydration لازم يطابق." }]
    },
    {
      id: "server-client-components",
      title: { en: "Server Components vs Client Components", ar: "Server Components ولا Client Components" },
      tldr: { en: "In the App Router components are Server Components by default: they run only on the server, can be async and read data/secrets directly, and ship no JS. Add <code>\"use client\"</code> for state, effects, event handlers and browser APIs. Keep client components small, at the leaves.", ar: "في الـ App Router الـ components افتراضيًا Server Components: بتشتغل على السيرفر بس، وينفع تبقى async وتقرا الداتا والأسرار على طول، ومش بتبعت JS. حط <code>\"use client\"</code> للـ state والـ effects والـ event handlers و APIs المتصفح. وخلي الـ client components صغيرة وفي الأطراف." },
      blocks: [
        { type: "code", code: "// app/orders/page.tsx — Server Component\nexport default async function OrdersPage() {\n  const orders = await db.order.findMany();          // direct data access, no API route needed\n  return <OrdersTable orders={orders} filters={<Filters />} />;\n}\n\n// Filters.tsx\n\"use client\";\nexport function Filters() { const [open, setOpen] = useState(false); /* interactive */ }" },
        { type: "compare", cols: ["", "Server Component", "Client Component"], rows: [
          [{ en: "useState / useEffect / onClick", ar: "useState / useEffect / onClick" }, "✗", "✓"],
          [{ en: "async + direct DB/secrets", ar: "async و DB والأسرار على طول" }, "✓", "✗"],
          [{ en: "JS sent to the browser", ar: "JS بيتبعت للمتصفح" }, { en: "None", ar: "صفر" }, { en: "Yes", ar: "أيوه" }],
          [{ en: "Can render the other", ar: "يقدر يرسم التاني" }, { en: "Yes (as children/props)", ar: "أيوه (كـ children أو props)" }, { en: "Only via children/props passed in", ar: "بس عن طريق children أو props جاية" }]
        ] },
        { type: "pitfalls", items: [
          { en: "Putting \"use client\" at the top of a page makes the whole subtree client-side. Push it down to the interactive leaf.", ar: "حط \"use client\" في أول الصفحة بيخلي الشجرة كلها client. نزّله للطرف اللي فيه تفاعل." },
          { en: "Props from server to client must be serialisable (no functions, classes, Dates turn into strings).", ar: "الـ props من السيرفر للـ client لازم تبقى serialisable (مفيش functions ولا classes، والـ Dates بتتحول strings)." }
        ] }
      ],
      say: "Pages are server components that fetch data and ship no JavaScript; interactivity lives in small client components at the leaves.",
      interview: [{ q: "Are Server Components the same as SSR?", a: { en: "No. SSR renders HTML for the first load of any component (including client ones). Server Components never run in the browser at all — their output is sent as a serialized tree, and they stay server-only on later navigations too.", ar: "لأ. الـ SSR بيعمل HTML لأول تحميل لأي component (حتى الـ client). أما الـ Server Components عمرها ما بتشتغل في المتصفح — الناتج بتاعها بيتبعت كشجرة serialized، وبتفضل على السيرفر حتى في التنقلات اللي بعدها." } }],
      quiz: [{ q: { en: "Can a Client Component import a Server Component?", ar: "الـ Client Component ينفع يعمل import لـ Server Component؟" }, a: { en: "Not directly — pass it in as children/props from a server parent.", ar: "مش على طول — ابعته كـ children أو props من أب server." } }],
      quick: [{ en: "Server by default (async, no JS); \"use client\" at the leaves; serialisable props; RSC ≠ SSR.", ar: "Server افتراضيًا (async ومن غير JS)؛ \"use client\" في الأطراف؛ props serialisable؛ RSC مش هي SSR." }]
    },
    {
      id: "data-caching",
      title: { en: "Data fetching and caching in the App Router", ar: "جلب الداتا والكاش في الـ App Router" },
      tldr: { en: "Fetch in Server Components with async/await. Control freshness per request: <code>cache: \"no-store\"</code> (always fresh), <code>next: { revalidate: 60 }</code> (time-based), <code>next: { tags: [\"orders\"] }</code> + <code>revalidateTag</code> (on demand). Avoid waterfalls by starting requests in parallel. Caching defaults changed across versions — check the version you're on.", ar: "هات الداتا في الـ Server Components بـ async/await. واتحكم في الجِدّة لكل request: <code>cache: \"no-store\"</code> (جديد دايمًا)، و <code>next: { revalidate: 60 }</code> (بالوقت)، و <code>next: { tags: [\"orders\"] }</code> مع <code>revalidateTag</code> (عند الطلب). وتجنب الـ waterfalls إنك تبدأ الـ requests بالتوازي. والافتراضيات بتاعة الكاش اتغيرت بين النسخ — شوف انت على أنهي نسخة." },
      blocks: [
        { type: "code", code: "const [user, orders] = await Promise.all([\n  fetch(`${API}/me`, { cache: \"no-store\" }).then((r) => r.json()),\n  fetch(`${API}/orders`, { next: { tags: [\"orders\"], revalidate: 300 } }).then((r) => r.json()),\n]);\n\n// after a write (server action / route handler)\nrevalidateTag(\"orders\");          // every page using that tag gets fresh data\nrevalidatePath(\"/orders\");" },
        { type: "when", title: { en: "Server fetching or React Query?", ar: "جلب على السيرفر ولا React Query؟" }, use: [{ en: "Server Components: initial page data, SEO content, secrets.", ar: "Server Components: داتا الصفحة الأولى، محتوى SEO، الأسرار." }, { en: "React Query in client components: highly interactive data (infinite lists, polling, optimistic updates) — seed it with server data via hydration.", ar: "React Query في الـ client components: داتا تفاعلية جدًا (قوايم infinite، polling، optimistic) — وابدأه بداتا السيرفر عن طريق hydration." }], avoid: [{ en: "Fetching the same data in a server component and again on the client without hydration.", ar: "تجيب نفس الداتا في server component وتاني في الـ client من غير hydration." }] }
      ],
      say: "Server components fetch in parallel with explicit cache rules; writes revalidate by tag, and React Query stays for the highly interactive client parts.",
      interview: [{ q: "How do you avoid request waterfalls in server components?", a: { en: "Start independent fetches together (Promise.all), move slow parts behind Suspense so the shell streams first, and preload data for children before awaiting.", ar: "ابدأ الـ fetches المستقلة مع بعض (Promise.all)، وحط الأجزاء البطيئة ورا Suspense علشان الهيكل يتبعت الأول، واعمل preload لداتا الأولاد قبل الـ await." } }],
      quiz: [{ q: { en: "Refresh all pages showing orders after creating one?", ar: "تحدث كل الصفحات اللي بتعرض الأوردرات بعد ما تعمل واحد؟" }, a: { en: "Tag the fetches and call revalidateTag(\"orders\").", ar: "حط tag على الـ fetches وناديِ revalidateTag(\"orders\")." } }],
      quick: [{ en: "no-store · revalidate N · tags + revalidateTag; Promise.all + Suspense; React Query for interactive client data.", ar: "no-store · revalidate N · tags و revalidateTag؛ Promise.all و Suspense؛ React Query للداتا التفاعلية." }]
    },
    {
      id: "server-actions",
      title: { en: "Server Actions", ar: "الـ Server Actions" },
      tldr: { en: "<code>\"use server\"</code> functions run on the server but can be called from forms and client code — no hand-written API route. Treat them as public endpoints: validate input, check auth, then revalidate. They work with <code>useActionState</code>/<code>useFormStatus</code> and progressive enhancement.", ar: "الـ functions اللي عليها <code>\"use server\"</code> بتشتغل على السيرفر بس ينفع تتنادى من الفورمز وكود الـ client — من غير API route تكتبه. اعتبرها endpoints عامة: اعمل validation للمدخلات، وشيك على الـ auth، وبعدين revalidate. وبتشتغل مع <code>useActionState</code> و <code>useFormStatus</code> و progressive enhancement." },
      blocks: [
        { type: "code", code: "\"use server\";\nexport async function createOrder(_prev: State, formData: FormData) {\n  const session = await auth();                          // 1. who is calling?\n  if (!session) return { error: \"unauthenticated\" };\n  const parsed = OrderSchema.safeParse(Object.fromEntries(formData)); // 2. validate\n  if (!parsed.success) return { fieldErrors: parsed.error.flatten().fieldErrors };\n  await db.order.create({ data: { ...parsed.data, userId: session.id } });\n  revalidateTag(\"orders\");                               // 3. refresh cached pages\n  redirect(\"/orders\");\n}" },
        { type: "projects", items: [{ text: { en: "okoRent: a server action sets the httpOnly auth cookie after login, so the token never touches client JS storage.", ar: "okoRent: server action بيحط كوكي الـ auth الـ httpOnly بعد الـ login، فالتوكن عمره ما يلمس تخزين الـ JS في الـ client." }, p: "okorent", tab: "decisions", label: "okoRent" }] }
      ],
      say: "Server actions remove boilerplate API routes, but I treat each one like a public endpoint: authenticate, validate with a schema, then revalidate.",
      interview: [{ q: "Are server actions secure because they're on the server?", a: { en: "No — each action is reachable by a POST from anyone who has its id. Always check the session and permissions and validate the input inside the action.", ar: "لأ — كل action ممكن حد يوصله بـ POST لو معاه الـ id بتاعه. شيك دايمًا على الـ session والصلاحيات واعمل validation للمدخلات جوه الـ action." } }],
      quiz: [{ q: { en: "Directive for a server action file?", ar: "الـ directive لملف server action؟" }, a: { en: "\"use server\".", ar: "\"use server\"." } }],
      quick: [{ en: "\"use server\"; auth + validate + revalidate inside; works with forms and useActionState.", ar: "\"use server\"؛ auth و validate و revalidate جوه؛ بيشتغل مع الفورمز و useActionState." }]
    },
    {
      id: "middleware-handlers",
      title: { en: "Middleware and route handlers", ar: "الـ Middleware والـ Route handlers" },
      tldr: { en: "<code>middleware.ts</code> runs before a request reaches a route (edge-style runtime): redirects, auth checks, locale detection, headers. Keep it light. <code>route.ts</code> handlers are API endpoints (GET/POST…) — for webhooks, third-party callbacks and anything non-React.", ar: "<code>middleware.ts</code> بيشتغل قبل ما الـ request يوصل للـ route: تحويلات، فحص auth، اكتشاف اللغة، headers. خليه خفيف. و handlers <code>route.ts</code> هي API endpoints (GET و POST…) — للـ webhooks و callbacks الخدمات الخارجية وأي حاجة مش React." },
      blocks: [
        { type: "code", code: "export function middleware(req: NextRequest) {\n  const token = req.cookies.get(\"token\")?.value;\n  if (req.nextUrl.pathname.startsWith(\"/admin\") && !isAdmin(token)) {\n    return NextResponse.redirect(new URL(\"/403\", req.url));\n  }\n  return NextResponse.next();\n}\nexport const config = { matcher: [\"/admin/:path*\", \"/account/:path*\"] };\n\n// app/api/webhooks/payment/route.ts\nexport async function POST(req: Request) { verifySignature(req); /* … */ return Response.json({ ok: true }); }" },
        { type: "projects", items: [
          { text: { en: "okoRent: role-based protection in middleware; next-intl routing also runs through middleware.", ar: "okoRent: حماية حسب الـ role في الـ middleware؛ وكمان next-intl routing بيعدي من الـ middleware." }, p: "okorent", tab: "decisions", label: "okoRent" },
          { text: { en: "Edubrain (freelance): 12 route handlers (bcrypt + JWT, Puppeteer PDF) — a full-stack prototype in Next.js.", ar: "Edubrain (freelance): 12 route handler (bcrypt و JWT، و PDF بـ Puppeteer) — prototype full-stack في Next.js." }, p: "freelance", tab: "decisions", label: "Freelance" }
        ] }
      ],
      say: "Middleware does fast checks and redirects before rendering; route handlers are for webhooks and endpoints other systems call.",
      interview: [{ q: "What should not go in middleware?", a: { en: "Heavy work or database calls on every request — it runs for every matched route and delays everything. Keep it to cookies, headers and redirects.", ar: "شغل تقيل أو نداءات داتابيز مع كل request — بيشتغل مع كل route مطابق وبيأخر كل حاجة. خليه للكوكيز والـ headers والتحويلات." } }],
      quiz: [{ q: { en: "Where do you receive a payment provider's webhook?", ar: "تستقبل webhook بتاع شركة الدفع فين؟" }, a: { en: "A route handler (route.ts), verifying its signature.", ar: "Route handler (route.ts) مع التأكد من التوقيع." } }],
      quick: [{ en: "Middleware = light pre-route checks/redirects (matcher); route.ts = HTTP endpoints/webhooks.", ar: "Middleware = فحوصات وتحويلات خفيفة قبل الـ route (matcher)؛ route.ts = endpoints و webhooks." }]
    },
    {
      id: "seo-assets",
      title: { en: "SEO, metadata, images and fonts", ar: "الـ SEO والـ metadata والصور والخطوط" },
      tldr: { en: "Export <code>metadata</code> or <code>generateMetadata</code> per route for titles, descriptions and Open Graph. <code>next/image</code> resizes, lazy-loads and serves modern formats with fixed dimensions (no CLS). <code>next/font</code> self-hosts fonts with no layout shift. Add sitemap/robots files.", ar: "صدّر <code>metadata</code> أو <code>generateMetadata</code> لكل route للعناوين والوصف و Open Graph. و <code>next/image</code> بيصغر الصور، ويعمل lazy-load، ويبعت صيغ حديثة بأبعاد ثابتة (من غير CLS). و <code>next/font</code> بيستضيف الخطوط من غير layout shift. وزود ملفات sitemap و robots." },
      blocks: [
        { type: "code", code: "export async function generateMetadata({ params }): Promise<Metadata> {\n  const p = await getProduct(params.id);\n  return { title: `${p.name} — OkoRent`, description: p.summary, openGraph: { images: [p.image] }, alternates: { canonical: `/p/${p.id}` } };\n}\n\n<Image src={p.image} alt={p.name} width={640} height={480} sizes=\"(max-width: 768px) 100vw, 640px\" priority={isHero} />\n\nconst inter = Inter({ subsets: [\"latin\"], display: \"swap\" });" }
      ],
      say: "Each route generates its own metadata, images go through next/image with real dimensions and priority only for the hero, and fonts are self-hosted with next/font.",
      interview: [{ q: "How does next/image help Core Web Vitals?", a: { en: "Required width/height (or fill) prevents CLS, responsive sizes and AVIF/WebP cut bytes for LCP, lazy-loading by default, and priority preloads the hero.", ar: "الـ width و height الإجباريين (أو fill) بيمنعوا الـ CLS، والمقاسات الـ responsive و AVIF/WebP بيقللوا الحجم للـ LCP، والـ lazy-loading افتراضي، و priority بيعمل preload للـ hero." } }],
      quiz: [{ q: { en: "Per-product page title?", ar: "عنوان لكل صفحة منتج؟" }, a: { en: "generateMetadata in that route.", ar: "generateMetadata في الـ route ده." } }],
      quick: [{ en: "metadata/generateMetadata; next/image (dimensions, priority hero); next/font; sitemap/robots.", ar: "metadata و generateMetadata؛ next/image (أبعاد، priority للـ hero)؛ next/font؛ sitemap و robots." }]
    },
    {
      id: "pages-vs-app",
      title: { en: "Pages Router vs App Router, and where it runs", ar: "Pages Router ولا App Router، وبيشتغل فين" },
      tldr: { en: "Pages Router: <code>getServerSideProps</code>/<code>getStaticProps</code>, everything is a client component, <code>_app</code>/<code>_document</code>. App Router: Server Components, nested layouts, streaming, server actions. Both can coexist during a migration. Code can run on the Node runtime, the Edge runtime (limited APIs, fast cold start) or statically on a CDN.", ar: "Pages Router: <code>getServerSideProps</code> و <code>getStaticProps</code>، وكل حاجة client component، و <code>_app</code> و <code>_document</code>. App Router: Server Components، و layouts متداخلة، و streaming، و server actions. والاتنين ينفعوا مع بعض وقت الـ migration. والكود ممكن يشتغل على Node runtime، أو Edge runtime (APIs محدودة وبيبدأ بسرعة)، أو static على CDN." },
      blocks: [
        { type: "compare", cols: ["", "Pages Router", "App Router"], rows: [
          [{ en: "Data", ar: "الداتا" }, "getServerSideProps / getStaticProps", { en: "async Server Components + fetch cache", ar: "async Server Components و fetch cache" }],
          [{ en: "Layouts", ar: "الـ Layouts" }, { en: "_app + manual", ar: "_app ويدوي" }, { en: "Nested layout.tsx", ar: "layout.tsx متداخل" }],
          [{ en: "JS shipped", ar: "الـ JS المبعوت" }, { en: "Every component", ar: "كل component" }, { en: "Only client components", ar: "الـ client components بس" }],
          [{ en: "Mutations", ar: "الكتابة" }, { en: "API routes", ar: "API routes" }, { en: "Server Actions / route handlers", ar: "Server Actions و route handlers" }]
        ] },
        { type: "projects", items: [{ text: { en: "Marina (Aquadic, 2023) used the Pages Router; Analytica and Find Help (Aquadic), okoRent, Spectra and Bites used the App Router.", ar: "Marina (Aquadic، 2023) كان Pages Router؛ و Analytica و Find Help (Aquadic) و okoRent و Spectra و Bites كانوا App Router." }, p: "aquadic", tab: "decisions", label: "Aquadic" }] }
      ],
      say: "I've shipped both routers; the App Router's server components and nested layouts reduce client JavaScript, and the two can coexist while migrating page by page.",
      interview: [{ q: "How would you migrate a Pages Router app?", a: { en: "Incrementally: add the app directory, move shared layouts first, then route by route, converting getServerSideProps into server-component fetches and API routes into actions/handlers where it helps.", ar: "بالتدريج: زود فولدر app، وانقل الـ layouts المشتركة الأول، وبعدين route ورا route، وحوّل getServerSideProps لـ fetch في server components، والـ API routes لـ actions أو handlers لما ده يفيد." } }],
      quiz: [{ q: { en: "Can the Edge runtime use Node's fs module?", ar: "الـ Edge runtime يقدر يستخدم fs بتاع Node؟" }, a: { en: "No — it has a limited, web-standard API set.", ar: "لأ — APIs محدودة ومعيارية للويب." } }],
      quick: [{ en: "Pages: gSSP/gSP, all client; App: RSC, layouts, streaming, actions; coexist during migration; Node vs Edge runtime.", ar: "Pages: gSSP و gSP وكله client؛ App: RSC و layouts و streaming و actions؛ بيتعايشوا وقت الـ migration؛ Node ولا Edge." }]
    }
  ]
});
