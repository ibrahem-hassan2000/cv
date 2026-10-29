// Deep dive for the Next.js section. Same shape as deep-javascript.js (see README "Deep dive").
// Version facts checked against nextjs.org (Next.js 16 blog, Oct 2025; caching docs, 2026). His projects used Next.js 14 —
// know both models: Next 14 cached fetch by default; Next 15 stopped that; Next 16 made caching opt-in with Cache Components.
STUDY.deepen("nextjs", {
  rendering: {
    why: {
      en: "“SSR or SSG or CSR?” is the opener; the depth is in what makes a route dynamic, what hydration costs, and how Partial Prerendering removed the either/or choice.",
      ar: "«SSR ولا SSG ولا CSR؟» دي البداية؛ والعمق في إيه اللي بيخلي الـ route dynamic، والـ hydration تمنه إيه، وإزاي الـ Partial Prerendering شال الاختيار بين ده وده."
    },
    how: [
      {
        title: { en: "Static, dynamic, ISR — decided by what the route uses", ar: "Static و dynamic و ISR — بيتحددوا باللي الـ route بيستخدمه" },
        body: {
          en: "In the App Router you don't pick a function like <code>getServerSideProps</code>. A route is prerendered (static) unless it reads request data — <code>cookies()</code>, <code>headers()</code>, <code>searchParams</code>, unknown <code>params</code> — or uncached data. ISR is a static page regenerated in the background after a time or on demand. CSR still exists inside client components for purely interactive parts.",
          ar: "في الـ App Router إنت مش بتختار function زي <code>getServerSideProps</code>. الـ route بيتعمل له prerender (static) إلا لو بيقرا داتا الـ request — <code>cookies()</code> أو <code>headers()</code> أو <code>searchParams</code> أو <code>params</code> مش معروفة — أو داتا مش متعمل لها cache. والـ ISR صفحة static بتتعمل من جديد في الخلفية بعد وقت أو عند الطلب. والـ CSR لسه موجود جوه الـ client components للأجزاء التفاعلية بس."
        }
      },
      {
        title: { en: "Streaming sends the page in pieces", ar: "الـ Streaming بيبعت الصفحة على حتت" },
        body: {
          en: "With <code>loading.js</code> or <code>&lt;Suspense&gt;</code>, the server sends the shell and fallbacks immediately, then streams each section's HTML as its data resolves. Time to first byte stays low even when one query is slow, and each streamed part hydrates on its own.",
          ar: "مع <code>loading.js</code> أو <code>&lt;Suspense&gt;</code>، السيرفر بيبعت الـ shell والـ fallbacks على طول، وبعدين يبعت الـ HTML بتاع كل جزء أول ما الداتا بتاعته تجهز. فالوقت لأول byte بيفضل قليل حتى لو query واحد بطيء، وكل جزء بيوصل بيعمل hydrate لوحده."
        }
      },
      {
        title: { en: "Partial Prerendering: a static shell with dynamic holes", ar: "الـ Partial Prerendering: shell ثابت فيه فتحات dynamic" },
        body: {
          en: "Before PPR a whole URL was either static or dynamic. With Cache Components (Next.js 16), the static parts and cached parts become a shell served from the CDN, and anything that reads request data streams into its <code>&lt;Suspense&gt;</code> boundary at request time. Reading <code>cookies()</code> no longer makes the whole route dynamic.",
          ar: "قبل الـ PPR الـ URL كله كان يا static يا dynamic. ومع الـ Cache Components (Next.js 16)، الأجزاء الثابتة والأجزاء المتعمل لها cache بتبقى shell بيتبعت من الـ CDN، وأي حاجة بتقرا داتا الـ request بتعمل stream جوه الـ <code>&lt;Suspense&gt;</code> بتاعها وقت الـ request. وقراية <code>cookies()</code> مبقتش بتخلي الـ route كله dynamic."
        },
        code: "export default function Page() {\n  return (\n    <>\n      <ProductInfo />                       {/* 'use cache' → part of the static shell */}\n      <Suspense fallback={<CartSkeleton />}>\n        <Cart />                            {/* reads cookies() → streams per request */}\n      </Suspense>\n    </>\n  );\n}",
        run: "browser"
      },
      {
        title: { en: "Hydration: HTML first, interactivity after", ar: "الـ Hydration: الـ HTML الأول، والتفاعل بعده" },
        body: {
          en: "Server HTML is visible early, but buttons work only after the client JS loads and React hydrates — attaching handlers to the existing DOM, which must match what the client renders. Server Components reduce this cost because their code never ships to the browser.",
          ar: "الـ HTML اللي جاي من السيرفر بيظهر بدري، بس الزراير بتشتغل بس بعد ما الـ JS بتاع الـ client يتحمّل و React يعمل hydrate — يركّب الـ handlers على الـ DOM الموجود، اللي لازم يطابق اللي الـ client بيرسمه. والـ Server Components بتقلل التمن ده لأن الكود بتاعها عمره ما بيوصل للمتصفح."
        }
      }
    ],
    breaks: [
      {
        title: { en: "One cookies() call in a layout", ar: "نداء cookies() واحد في layout" },
        body: {
          en: "In the older model (Next 14/15 without Cache Components), reading request data in a root layout made every route under it dynamic — no static pages left.",
          ar: "في الموديل القديم (Next 14/15 من غير Cache Components)، قراية داتا الـ request في الـ root layout كانت بتخلي كل route تحته dynamic — ومفيش صفحات static خالص."
        },
        fix: { en: "Read request data as deep as possible, inside a <code>&lt;Suspense&gt;</code> boundary around the small part that needs it; with Cache Components that keeps the rest in the static shell.", ar: "اقرا داتا الـ request في أعمق مكان ممكن، جوه <code>&lt;Suspense&gt;</code> حوالين الجزء الصغير اللي محتاجها؛ ومع الـ Cache Components ده بيخلي الباقي في الـ static shell." }
      },
      {
        title: { en: "Hydration mismatch", ar: "الـ Hydration mismatch" },
        body: {
          en: "Rendering <code>Date.now()</code>, random ids, the user's locale or <code>typeof window</code> branches in render produces different HTML on server and client, so React warns and re-renders the subtree on the client.",
          ar: "إنك ترسم <code>Date.now()</code>، أو ids عشوائية، أو الـ locale بتاع اليوزر، أو تفرّع بـ <code>typeof window</code> وقت الـ render بيطلّع HTML مختلف على السيرفر والـ client، فـ React بيحذّر ويعيد رسم الجزء ده على الـ client."
        },
        fix: { en: "Pass the same data to both sides, use <code>useId</code> for ids, format dates with an explicit locale and time zone, and put browser-only values in an effect or a client-only component.", ar: "ابعت نفس الداتا للجهتين، واستخدم <code>useId</code> للـ ids، واعمل format للتواريخ بـ locale و time zone صريحين، وحط القيم اللي للمتصفح بس في effect أو component للـ client بس." }
      },
      {
        title: { en: "SSR where an SPA was enough", ar: "SSR في مكان كان الـ SPA كفاية فيه" },
        body: {
          en: "An invitation-only admin tool gains little from SEO or first-paint HTML, but pays for a server, caching rules and hydration.",
          ar: "أداة admin بالدعوة بس مش هتستفيد كتير من الـ SEO أو الـ HTML في أول رسم، بس هتدفع تمن سيرفر وقواعد caching و hydration."
        },
        fix: { en: "Choose by needs: public, SEO-sensitive pages → server rendering; logged-in internal tools → a SPA is a valid choice.", ar: "اختار حسب الاحتياج: صفحات عامة والـ SEO مهم فيها ← server rendering؛ وأدوات داخلية بعد تسجيل الدخول ← الـ SPA اختيار صح." }
      }
    ],
    levels: [
      {
        q: "CSR, SSR, SSG or ISR — how do you choose?",
        mid: { en: "SSG for static content, SSR for dynamic or personalised pages, ISR for content that changes sometimes, CSR for dashboards.", ar: "SSG للمحتوى الثابت، و SSR للصفحات الـ dynamic أو المخصصة، و ISR للمحتوى اللي بيتغير أحيانًا، و CSR للـ dashboards." },
        senior: {
          en: "Per part of the page, not per app. Content that's the same for everyone is prerendered or cached; personalised or per-request parts stream behind Suspense; highly interactive widgets are client components. In Next.js 16 that's literally one route — a static shell with dynamic holes. I also weigh product needs: okoRent's public marketplace needed SEO-friendly server-rendered pages, so App Router; Smart FAQ is an invitation-only tool, so a Vite SPA with CSR was the simpler, correct choice.",
          ar: "لكل جزء في الصفحة، مش لكل app. المحتوى اللي هو هو للكل بيتعمل له prerender أو cache؛ والأجزاء المخصصة أو اللي لكل request بتعمل stream ورا Suspense؛ والـ widgets التفاعلية جدًا client components. وفي Next.js 16 ده بالحرف route واحد — static shell فيه فتحات dynamic. وكمان بوزن احتياج المنتج: الـ marketplace العام في okoRent كان محتاج صفحات server-rendered مناسبة للـ SEO، فاخترنا App Router؛ و Smart FAQ أداة بالدعوة بس، فـ Vite SPA بـ CSR كان الاختيار الأبسط والصح."
        }
      },
      {
        q: "What is hydration, and what goes wrong with it?",
        mid: { en: "React attaches event handlers to server-rendered HTML. Mismatches cause errors.", ar: "React بيركّب الـ event handlers على الـ HTML اللي جاي من السيرفر. ولو فيه اختلاف بيطلع errors." },
        senior: {
          en: "The server sends HTML; the client downloads the JS, renders the same tree and attaches to the existing DOM instead of recreating it. Two costs: until it finishes, the page looks ready but isn't (bad INP on early clicks), and the client must render exactly what the server did — time, locale, randomness and window checks cause mismatches. Fixes: less client JS (Server Components), streaming with selective hydration, and deterministic render output.",
          ar: "السيرفر بيبعت HTML؛ والـ client بيحمّل الـ JS، ويرسم نفس الشجرة، ويتركب على الـ DOM الموجود بدل ما يعمله من جديد. وفيه تمنين: لحد ما يخلص الصفحة شكلها جاهزة بس مش جاهزة (INP وحش للضغطات البدري)، والـ client لازم يرسم بالظبط اللي السيرفر رسمه — الوقت، والـ locale، والعشوائية، و checks الـ window بتعمل mismatches. والحلول: JS أقل على الـ client (Server Components)، و streaming مع selective hydration، و render نتيجته ثابتة."
        }
      }
    ],
    drill: [
      {
        q: "What makes a route dynamic in the App Router?",
        a: { en: "Reading request-time data — <code>cookies()</code>, <code>headers()</code>, <code>searchParams</code>, params not generated at build — or using uncached data.", ar: "قراية داتا وقت الـ request — <code>cookies()</code> أو <code>headers()</code> أو <code>searchParams</code> أو params متعملتش وقت الـ build — أو استخدام داتا مش متعمل لها cache." },
        follow: [
          {
            q: "How do you keep most of such a page static?",
            a: { en: "Push the request-dependent part down into its own component wrapped in <code>&lt;Suspense&gt;</code>, and cache the shared data with <code>\"use cache\"</code>. With Cache Components, everything else becomes the prerendered shell.", ar: "نزّل الجزء المعتمد على الـ request في component لوحده ملفوف في <code>&lt;Suspense&gt;</code>، واعمل cache للداتا المشتركة بـ <code>\"use cache\"</code>. ومع الـ Cache Components، كل الباقي بيبقى الـ shell المتعمل له prerender." }
          }
        ]
      }
    ],
    story: {
      text: { en: "okoRent's public marketplace needed SEO-friendly pages (App Router); Smart FAQ, an invitation-only tool, is a Vite SPA — CSR was enough.", ar: "الـ marketplace العام في okoRent كان محتاج صفحات مناسبة للـ SEO (App Router)؛ و Smart FAQ، أداة بالدعوة بس، Vite SPA — والـ CSR كان كفاية." },
      p: "okorent", tab: "decisions", label: "okoRent"
    },
    sources: [
      { label: "Next.js 16 — Cache Components and PPR", url: "https://nextjs.org/blog/next-16" },
      { label: "Next.js docs — Caching (Cache Components)", url: "https://nextjs.org/docs/app/getting-started/caching" },
      { label: "react.dev — hydrateRoot", url: "https://react.dev/reference/react-dom/client/hydrateRoot" }
    ]
  },

  "server-client-components": {
    why: {
      en: "The App Router's core idea. Interviewers check where you draw the <code>\"use client\"</code> line, what can cross it, and how you keep secrets and heavy libraries on the server.",
      ar: "دي الفكرة الأساسية في الـ App Router. والإنترفيورز بيشوفوا إنت بترسم خط الـ <code>\"use client\"</code> فين، وإيه اللي ينفع يعدّيه، وإزاي بتخلي الـ secrets والمكتبات التقيلة على السيرفر."
    },
    how: [
      {
        title: { en: "Server Components never ship their code", ar: "الـ Server Components عمرها ما بتبعت الكود بتاعها" },
        body: {
          en: "They run on the server (at build or request time), can be <code>async</code>, read the database, files and secrets directly, and send only their rendered result (the RSC payload) to the browser. A Markdown parser used in a Server Component adds zero bytes to the client bundle.",
          ar: "بتشتغل على السيرفر (وقت الـ build أو الـ request)، وينفع تبقى <code>async</code>، وتقرا الـ database والملفات والـ secrets مباشرة، وبتبعت النتيجة بتاعتها بس (الـ RSC payload) للمتصفح. فـ Markdown parser مستخدم في Server Component مش بيزوّد ولا byte على الـ client bundle."
        }
      },
      {
        title: { en: "\"use client\" marks a boundary, not a single component", ar: "الـ \"use client\" بيعلّم حد، مش component واحد" },
        body: {
          en: "The file with <code>\"use client\"</code> and everything it imports become client code. Client components are still rendered to HTML on the server; “client” means their JS is shipped and they hydrate, so they can use state, effects and browser APIs.",
          ar: "الملف اللي فيه <code>\"use client\"</code> وكل اللي بيعمله import بيبقوا كود client. والـ client components برضه بتترسم HTML على السيرفر؛ و«client» معناها إن الـ JS بتاعها بيتبعت وبتعمل hydrate، فتقدر تستخدم state و effects و browser APIs."
        }
      },
      {
        title: { en: "Compose by passing server output as children", ar: "ركّب عن طريق إنك تبعت نتيجة السيرفر كـ children" },
        body: {
          en: "A client component can't import a Server Component, but it can receive one as <code>children</code> or another prop. So interactive shells (tabs, modals, providers) wrap server-rendered content without turning it into client code. Props crossing the boundary must be serialisable — no functions or class instances, except Server Actions.",
          ar: "الـ client component مينفعش يعمل import لـ Server Component، بس ينفع ياخده كـ <code>children</code> أو prop تاني. فالـ shells التفاعلية (tabs، modals، providers) بتلف محتوى بيترسم على السيرفر من غير ما تحوّله لكود client. والـ props اللي بتعدي الحد لازم تبقى serialisable — مفيش functions ولا class instances، ماعدا الـ Server Actions."
        },
        code: "// Tabs.tsx — \"use client\" (state for the active tab)\n// page.tsx — Server Component\nexport default async function Page() {\n  const report = await getReport();               // runs on the server\n  return <Tabs summary={<Summary data={report} />} details={<Details data={report} />} />;\n}",
        run: "browser"
      },
      {
        title: { en: "Guard the server side", ar: "احمي جهة السيرفر" },
        body: {
          en: "<code>import \"server-only\"</code> at the top of a module makes the build fail if a client component imports it — useful for DB clients and anything reading secrets. Only <code>NEXT_PUBLIC_</code> environment variables reach the browser.",
          ar: "<code>import \"server-only\"</code> في أول الـ module بيخلي الـ build يفشل لو client component عمل له import — مفيد للـ DB clients وأي حاجة بتقرا secrets. ومتغيرات البيئة اللي بتبدأ بـ <code>NEXT_PUBLIC_</code> بس هي اللي بتوصل للمتصفح."
        }
      }
    ],
    breaks: [
      {
        title: { en: "\"use client\" at the top of a layout", ar: "\"use client\" في أول layout" },
        body: {
          en: "Adding it to a layout (often to use one hook or a context) turns that layout and everything it imports into client code, losing the server benefits for whole sections.",
          ar: "إنك تضيفه لـ layout (غالبًا علشان hook واحد أو context) بيحوّل الـ layout ده وكل اللي بيعمله import لكود client، وبتخسر مميزات السيرفر لأجزاء كاملة."
        },
        fix: { en: "Push <code>\"use client\"</code> to the leaves: a small <code>Providers</code> component, a <code>LikeButton</code>, a <code>SearchBox</code>.", ar: "نزّل <code>\"use client\"</code> للأطراف: component صغير <code>Providers</code>، أو <code>LikeButton</code>، أو <code>SearchBox</code>." }
      },
      {
        title: { en: "Passing non-serialisable props", ar: "إنك تبعت props مش serialisable" },
        body: {
          en: "An <code>onClick</code> function, a Date-heavy class instance or a Map from a Server Component to a client component fails, or arrives as something else.",
          ar: "function <code>onClick</code>، أو instance من class، أو Map من Server Component لـ client component بيفشل، أو بيوصل حاجة تانية."
        },
        fix: { en: "Pass plain data; define handlers inside the client component; use a Server Action for server work triggered from the client.", ar: "ابعت داتا عادية؛ وعرّف الـ handlers جوه الـ client component؛ واستخدم Server Action للشغل اللي على السيرفر وبيتنادى من الـ client." }
      },
      {
        title: { en: "Leaking server code into the client", ar: "تسريب كود السيرفر للـ client" },
        body: {
          en: "A shared utils file that imports the DB client, imported once by a client component, pulls server-only code (and possibly secrets) toward the browser bundle.",
          ar: "ملف utils مشترك بيعمل import للـ DB client، ولو client component عمل له import مرة، بيسحب كود السيرفر (وممكن secrets) ناحية الـ bundle بتاع المتصفح."
        },
        fix: { en: "Split server and client utilities, mark server modules with <code>server-only</code>, and keep secrets out of <code>NEXT_PUBLIC_</code> variables.", ar: "افصل الـ utilities بتاعة السيرفر عن بتاعة الـ client، وعلّم modules السيرفر بـ <code>server-only</code>، وخلي الـ secrets برّه متغيرات <code>NEXT_PUBLIC_</code>." }
      }
    ],
    levels: [
      {
        q: "Server Components vs Client Components?",
        mid: { en: "Server Components render on the server and can fetch data; Client Components run in the browser and can use hooks.", ar: "الـ Server Components بتترسم على السيرفر وتقدر تجيب داتا؛ والـ Client Components بتشتغل في المتصفح وتقدر تستخدم hooks." },
        senior: {
          en: "Server Components run only on the server and ship no JS — data access, secrets and heavy rendering libraries stay there. Client Components are also server-rendered to HTML, but their code ships and hydrates, so they handle state, effects and events. Default to server; add <code>\"use client\"</code> at the smallest interactive leaf; compose by passing server output as children; keep props serialisable; guard server modules with <code>server-only</code>. The result is less client JS and simpler data fetching, at the cost of thinking about the boundary.",
          ar: "الـ Server Components بتشتغل على السيرفر بس ومش بتبعت JS — الوصول للداتا، والـ secrets، ومكتبات الرسم التقيلة بيفضلوا هناك. والـ Client Components برضه بتترسم HTML على السيرفر، بس الكود بتاعها بيتبعت وبتعمل hydrate، فبتتعامل مع الـ state والـ effects والـ events. الأساس server؛ وبضيف <code>\"use client\"</code> عند أصغر طرف تفاعلي؛ وبركّب عن طريق إني أبعت نتيجة السيرفر كـ children؛ وبخلي الـ props serialisable؛ وبحمي modules السيرفر بـ <code>server-only</code>. والنتيجة JS أقل على الـ client و data fetching أبسط، والتمن إنك تفكر في الحد ده."
        }
      }
    ],
    drill: [
      {
        q: "Is a Client Component rendered on the server?",
        a: { en: "Yes — for the initial HTML. Then its JS loads and it hydrates.", ar: "أيوه — للـ HTML الأولاني. وبعدين الـ JS بتاعه بيتحمّل ويعمل hydrate." },
        follow: [
          {
            q: "Then why call it “client”?",
            a: { en: "Because its code ships to the browser and runs there too; Server Components' code never does.", ar: "لأن الكود بتاعه بيتبعت للمتصفح وبيشتغل هناك كمان؛ والـ Server Components الكود بتاعها عمره ما بيتبعت." },
            follow: [
              {
                q: "How would you keep a 200 KB syntax highlighter off the client?",
                a: { en: "Highlight in a Server Component and send the resulting HTML; only the copy button (a tiny client component) ships JS.", ar: "اعمل الـ highlight في Server Component وابعت الـ HTML الناتج؛ وزرار النسخ بس (client component صغير) هو اللي بيبعت JS." }
              }
            ]
          }
        ]
      }
    ],
    sources: [
      { label: "Next.js docs — Server and Client Components", url: "https://nextjs.org/docs/app/getting-started/server-and-client-components" },
      { label: "react.dev — Server Components", url: "https://react.dev/reference/rsc/server-components" },
      { label: "react.dev — 'use client'", url: "https://react.dev/reference/rsc/use-client" }
    ]
  },

  "data-caching": {
    why: {
      en: "Caching is the most confusing part of the App Router and it changed in every major version. Expect “why is my page showing old data?” and be able to explain both the previous model (his Next 14 projects) and the current one.",
      ar: "الـ caching أكتر جزء ملخبط في الـ App Router، واتغير في كل version كبيرة. استنى «ليه الصفحة بتعرض داتا قديمة؟» وكن قادر تشرح الموديل القديم (مشاريعه على Next 14) والحالي."
    },
    how: [
      {
        title: { en: "How the defaults changed", ar: "الـ defaults اتغيرت إزاي" },
        body: {
          en: "<b>Next 14</b>: <code>fetch</code> results were cached by default, routes were static unless forced dynamic. <b>Next 15</b>: <code>fetch</code> and GET route handlers are no longer cached by default; you opt in. <b>Next 16</b>: Cache Components — caching is explicit with the <code>\"use cache\"</code> directive on functions, components or pages, with <code>cacheLife</code> for lifetime and <code>cacheTag</code> for invalidation; everything else runs at request time.",
          ar: "<b>Next 14</b>: نتايج الـ <code>fetch</code> كانت بتتعمل لها cache افتراضيًا، والـ routes static إلا لو اتجبرت dynamic. <b>Next 15</b>: الـ <code>fetch</code> والـ GET route handlers مبقاش ليهم cache افتراضيًا؛ إنت اللي بتختار. <b>Next 16</b>: الـ Cache Components — الـ caching صريح بالـ directive <code>\"use cache\"</code> على functions أو components أو pages، و <code>cacheLife</code> للمدة و <code>cacheTag</code> للـ invalidation؛ وأي حاجة تانية بتشتغل وقت الـ request."
        },
        code: "import { cacheLife, cacheTag } from \"next/cache\";\n\nexport async function getProducts() {\n  \"use cache\";\n  cacheLife(\"hours\");\n  cacheTag(\"products\");\n  return db.products.findMany();\n}",
        run: "browser"
      },
      {
        title: { en: "Request memoisation vs persistent cache", ar: "الـ memoisation في الـ request قصاد الـ cache الدايم" },
        body: {
          en: "Within one render pass, identical <code>fetch</code> calls are deduplicated, and <code>React.cache(fn)</code> does the same for any function (e.g. a DB query used by a layout and a page). That lasts only for the request. Persistent caching across requests is <code>\"use cache\"</code> (or <code>fetch</code> cache options in the previous model).",
          ar: "جوه render واحد، نداءات الـ <code>fetch</code> المتطابقة بتتعمل لها dedup، و <code>React.cache(fn)</code> بيعمل نفس الحاجة لأي function (زي DB query مستخدم في layout وفي page). وده بيعيش طول الـ request بس. والـ caching الدايم بين الـ requests هو <code>\"use cache\"</code> (أو options الـ cache في الـ <code>fetch</code> في الموديل القديم)."
        }
      },
      {
        title: { en: "Revalidation after a change", ar: "الـ Revalidation بعد أي تغيير" },
        body: {
          en: "Time-based through <code>cacheLife</code>; on demand from a Server Action or route handler: <code>updateTag(tag)</code> (Server Actions only, read-your-writes: the user sees the change in the same response), <code>revalidateTag(tag, \"max\")</code> (stale-while-revalidate: next visitors get fresh data), <code>revalidatePath(path)</code>, and <code>refresh()</code> for uncached data shown elsewhere.",
          ar: "بالوقت عن طريق <code>cacheLife</code>؛ وعند الطلب من Server Action أو route handler: <code>updateTag(tag)</code> (في الـ Server Actions بس، read-your-writes: اليوزر بيشوف التغيير في نفس الـ response)، و <code>revalidateTag(tag, \"max\")</code> (stale-while-revalidate: الزوار الجايين بياخدوا داتا جديدة)، و <code>revalidatePath(path)</code>، و <code>refresh()</code> للداتا اللي مش متعمل لها cache ومعروضة في حتة تانية."
        },
        code: "\"use server\";\nimport { updateTag } from \"next/cache\";\n\nexport async function renameProduct(id, name) {\n  await assertCanEdit(id);\n  await db.products.update({ where: { id }, data: { name } });\n  updateTag(\"products\");   // the editor sees the new name immediately\n}",
        run: "browser"
      },
      {
        title: { en: "The client also caches", ar: "الـ client كمان بيعمل cache" },
        body: {
          en: "The router keeps RSC payloads of visited and prefetched routes in the browser for a short <code>stale</code> window, so back/forward and repeat navigations are instant. <code>router.refresh()</code> refetches the current route's server data.",
          ar: "الـ router بيحتفظ بالـ RSC payloads بتاعة الـ routes اللي اتزارت واتعمل لها prefetch في المتصفح لفترة <code>stale</code> قصيرة، فالرجوع والتقدم والتنقل المتكرر بيبقوا فوريين. و <code>router.refresh()</code> بيجيب داتا السيرفر بتاعة الـ route الحالي من جديد."
        }
      }
    ],
    breaks: [
      {
        title: { en: "Old data after a mutation", ar: "داتا قديمة بعد mutation" },
        body: {
          en: "The action updates the database but nothing invalidates the cached function or page, so users keep seeing the old list until the lifetime expires.",
          ar: "الـ action بيحدّث الـ database بس مفيش حاجة بتعمل invalidate للـ function أو الصفحة المتعمل لها cache، فاليوزرز بيفضلوا شايفين الـ list القديمة لحد ما المدة تخلص."
        },
        fix: { en: "Tag cached data by entity and call <code>updateTag</code>/<code>revalidateTag</code> (or <code>revalidatePath</code>) in every action that changes it.", ar: "حط tag للداتا المتعمل لها cache حسب الـ entity، ونادي <code>updateTag</code>/<code>revalidateTag</code> (أو <code>revalidatePath</code>) في كل action بيغيّرها." }
      },
      {
        title: { en: "Caching personalised data for everyone", ar: "Cache لداتا مخصصة للكل" },
        body: {
          en: "A cached function that reads the current user internally, or a shared cache keyed without the user id, can serve one user's data to another.",
          ar: "function متعمل لها cache بتقرا اليوزر الحالي من جوه، أو cache مشترك الـ key بتاعه مفيهوش الـ user id، ممكن تعرض داتا يوزر ليوزر تاني."
        },
        fix: { en: "Read cookies/headers outside the cached function and pass the user id as an argument (it becomes part of the key), or use <code>\"use cache: private\"</code>; never put session-specific data in a shared entry.", ar: "اقرا الـ cookies/headers برّه الـ function المتعمل لها cache وابعت الـ user id كـ argument (بيبقى جزء من الـ key)، أو استخدم <code>\"use cache: private\"</code>؛ وعمرك ما تحط داتا خاصة بـ session في entry مشترك." }
      },
      {
        title: { en: "Sequential awaits on the server", ar: "awaits ورا بعض على السيرفر" },
        body: {
          en: "<code>const user = await getUser(); const orders = await getOrders();</code> in one component makes a server-side waterfall even though the calls are independent.",
          ar: "<code>const user = await getUser(); const orders = await getOrders();</code> في component واحد بيعمل waterfall على السيرفر رغم إن النداءات مستقلة."
        },
        fix: { en: "Start them together (<code>Promise.all</code>), or split into components each wrapped in Suspense so they fetch and stream in parallel.", ar: "ابدأهم مع بعض (<code>Promise.all</code>)، أو قسّمهم لـ components كل واحد ملفوف في Suspense علشان يجيبوا ويعملوا stream بالتوازي." }
      }
    ],
    levels: [
      {
        q: "Explain caching in the Next.js App Router.",
        mid: { en: "Next caches fetch requests and pages; you can use <code>revalidate</code> to refresh them.", ar: "Next بيعمل cache للـ fetch requests والصفحات؛ وتقدر تستخدم <code>revalidate</code> علشان تحدّثهم." },
        senior: {
          en: "It depends on the version, and I say which one. In Next 14, which my App Router projects used, <code>fetch</code> was cached by default and many routes were static. Next 15 removed those defaults. Next 16's Cache Components make caching explicit: <code>\"use cache\"</code> on data functions or components, <code>cacheLife</code> for freshness, <code>cacheTag</code> plus <code>updateTag</code>/<code>revalidateTag</code> after mutations; cached and static parts form a prerendered shell and request-time parts stream behind Suspense. Separately, <code>React.cache</code> dedupes within a request, and the client router keeps recent payloads for fast navigation.",
          ar: "ده بيعتمد على الـ version، وبقول أنهي واحدة. في Next 14، اللي مشاريعي على الـ App Router كانت عليه، الـ <code>fetch</code> كان ليه cache افتراضيًا وroutes كتير كانت static. و Next 15 شال الـ defaults دي. والـ Cache Components في Next 16 خلت الـ caching صريح: <code>\"use cache\"</code> على functions الداتا أو الـ components، و <code>cacheLife</code> للـ freshness، و <code>cacheTag</code> مع <code>updateTag</code>/<code>revalidateTag</code> بعد الـ mutations؛ والأجزاء المتعمل لها cache والثابتة بتعمل shell متعمل له prerender، والأجزاء اللي وقت الـ request بتعمل stream ورا Suspense. ولوحده، <code>React.cache</code> بيعمل dedup جوه الـ request، والـ router على الـ client بيحتفظ بالـ payloads الأخيرة علشان التنقل يبقى سريع."
        }
      },
      {
        q: "A user saves a change but the page still shows old data. How do you debug it?",
        mid: { en: "Add <code>revalidatePath</code> or disable caching for that page.", ar: "أضيف <code>revalidatePath</code> أو أقفل الـ caching للصفحة دي." },
        senior: {
          en: "I find which layer served the old data: the server cache (is the function or fetch cached, with which tag and lifetime?), the client router cache (does a hard reload fix it?), or something outside Next (a CDN or the API's own cache). Then fix at that layer: invalidate the right tag in the action — <code>updateTag</code> when the editor must see it immediately — or <code>router.refresh()</code> on the client. I avoid “disable all caching”, which trades a bug for a slow site.",
          ar: "بلاقي أنهي طبقة عرضت الداتا القديمة: الـ cache على السيرفر (الـ function أو الـ fetch عليه cache، بأنهي tag ومدة قد إيه؟)، ولا الـ router cache على الـ client (الـ hard reload بيصلّحها؟)، ولا حاجة برّه Next (CDN أو cache الـ API نفسه). وبعدين أصلّح في الطبقة دي: أعمل invalidate للـ tag الصح في الـ action — <code>updateTag</code> لما اللي بيعدّل لازم يشوف التغيير على طول — أو <code>router.refresh()</code> على الـ client. وبتجنب «اقفل كل الـ caching»، لأنه بيبدّل bug بموقع بطيء."
        }
      }
    ],
    drill: [
      {
        q: "Request memoisation vs the persistent cache?",
        a: { en: "Memoisation dedupes identical calls within one render of one request; the persistent cache (<code>\"use cache\"</code>) reuses results across requests until revalidated.", ar: "الـ memoisation بيعمل dedup للنداءات المتطابقة جوه render واحد لـ request واحد؛ والـ cache الدايم (<code>\"use cache\"</code>) بيستخدم النتايج بين الـ requests لحد ما يتعمل revalidate." },
        follow: [
          {
            q: "When do you need React.cache?",
            a: { en: "For non-fetch work like a DB query used in several components of the same request — layout, page and <code>generateMetadata</code> — so it runs once.", ar: "للشغل اللي مش fetch زي DB query مستخدم في كذا component في نفس الـ request — layout و page و <code>generateMetadata</code> — علشان يشتغل مرة واحدة." },
            follow: [
              {
                q: "updateTag or revalidateTag after a save?",
                a: { en: "<code>updateTag</code> in a Server Action when the person who saved must see the change in the response (read-your-writes); <code>revalidateTag(tag, \"max\")</code> when eventual freshness for other visitors is fine.", ar: "<code>updateTag</code> في Server Action لما الشخص اللي حفظ لازم يشوف التغيير في الـ response (read-your-writes)؛ و <code>revalidateTag(tag, \"max\")</code> لما يكفي إن الزوار التانيين ياخدوا الجديد بعد شوية." }
              }
            ]
          }
        ]
      }
    ],
    sources: [
      { label: "Next.js docs — Caching", url: "https://nextjs.org/docs/app/getting-started/caching" },
      { label: "Next.js docs — Caching and revalidating (previous model)", url: "https://nextjs.org/docs/app/guides/caching-without-cache-components" },
      { label: "Next.js docs — 'use cache'", url: "https://nextjs.org/docs/app/api-reference/directives/use-cache" },
      { label: "Next.js 16 — Improved caching APIs", url: "https://nextjs.org/blog/next-16#improved-caching-apis" },
      { label: "react.dev — cache", url: "https://react.dev/reference/react/cache" }
    ]
  },

  "server-actions": {
    why: {
      en: "Server Actions look like calling a function, which is exactly the trap: interviewers want to hear that each one is a public endpoint, and how you validate, authorise and refresh data after it.",
      ar: "الـ Server Actions شكلها زي نداء function، وده بالظبط الفخ: الإنترفيورز عايزين يسمعوا إن كل واحد فيهم endpoint عام، وإزاي بتعمل validate و authorise وتحدّث الداتا بعده."
    },
    how: [
      {
        title: { en: "A function that runs on the server, called from the client", ar: "function بتشتغل على السيرفر وبتتنادى من الـ client" },
        body: {
          en: "A function marked <code>\"use server\"</code> is compiled into a POST endpoint identified by an action id. Calling it from a client component sends its arguments (serialised) and returns its result. Passed to <code>&lt;form action&gt;</code>, it works even before JavaScript loads (progressive enhancement).",
          ar: "الـ function المعلّمة <code>\"use server\"</code> بتتحول لـ POST endpoint بيتعرف بـ action id. ولما تناديها من client component بتبعت الـ arguments (serialised) وبترجّع النتيجة. ولو اتبعتت لـ <code>&lt;form action&gt;</code>، بتشتغل حتى قبل ما الـ JavaScript يتحمّل (progressive enhancement)."
        }
      },
      {
        title: { en: "It's a public endpoint: validate and authorise inside", ar: "ده endpoint عام: اعمل validate و authorise جواه" },
        body: {
          en: "Anyone can call an action with any arguments, regardless of which page renders the form. Every action must check the session, check permission for <b>this</b> resource, and validate input (e.g. with zod). Return only what the UI needs.",
          ar: "أي حد يقدر ينادي الـ action بأي arguments، بغض النظر عن أنهي صفحة بترسم الفورم. وكل action لازم يتأكد من الـ session، ومن الصلاحية على الـ resource <b>ده</b>، ويعمل validate للـ input (مثلًا بـ zod). ورجّع اللي الـ UI محتاجه بس."
        },
        code: "\"use server\";\nconst Input = z.object({ id: z.string().uuid(), title: z.string().min(1).max(120) });\n\nexport async function renameArticle(_prev, formData) {\n  const session = await auth();\n  if (!session) return { error: \"unauthorised\" };\n  const parsed = Input.safeParse(Object.fromEntries(formData));\n  if (!parsed.success) return { error: \"invalid\", fields: parsed.error.flatten().fieldErrors };\n  if (!(await canEdit(session.user, parsed.data.id))) return { error: \"forbidden\" };\n  await db.article.update({ where: { id: parsed.data.id }, data: { title: parsed.data.title } });\n  updateTag(`article-${parsed.data.id}`);\n  return { ok: true };\n}",
        run: "browser"
      },
      {
        title: { en: "The React 19 hooks around actions", ar: "الـ hooks بتاعة React 19 حوالين الـ actions" },
        body: {
          en: "<code>useActionState(action, initial)</code> gives the last result and a pending flag; <code>useFormStatus()</code> lets a submit button inside the form know it's pending; <code>useOptimistic</code> shows the expected result immediately and reverts if the action fails.",
          ar: "<code>useActionState(action, initial)</code> بيديك آخر نتيجة و flag للـ pending؛ و <code>useFormStatus()</code> بيخلي زرار الـ submit جوه الفورم يعرف إنه pending؛ و <code>useOptimistic</code> بيعرض النتيجة المتوقعة على طول ويرجع فيها لو الـ action فشل."
        }
      },
      {
        title: { en: "Cookies and redirects belong here", ar: "الـ cookies والـ redirects مكانها هنا" },
        body: {
          en: "Actions run on the server with the request context, so they can set httpOnly cookies (<code>(await cookies()).set(...)</code>) and <code>redirect()</code> — the token never touches client-side JavaScript.",
          ar: "الـ actions بتشتغل على السيرفر ومعاها context الـ request، فتقدر تحط httpOnly cookies (<code>(await cookies()).set(...)</code>) وتعمل <code>redirect()</code> — والـ token عمره ما بيلمس JavaScript على الـ client."
        }
      }
    ],
    breaks: [
      {
        title: { en: "Trusting the page to protect the action", ar: "إنك تعتمد على الصفحة إنها تحمي الـ action" },
        body: {
          en: "The page is behind login, so the action skips checks — but the action id can be called directly by anyone who finds it.",
          ar: "الصفحة ورا تسجيل دخول، فالـ action مش بيتأكد من حاجة — بس أي حد يلاقي الـ action id يقدر يناديه مباشرة."
        },
        fix: { en: "Authenticate and authorise in every action (a shared helper), and rate-limit sensitive ones.", ar: "اعمل authenticate و authorise في كل action (helper مشترك)، وحط rate-limit على الحساسة منهم." }
      },
      {
        title: { en: "Using actions to read data", ar: "إنك تستخدم الـ actions علشان تقرا داتا" },
        body: {
          en: "Actions are POSTs that run one at a time from the client and aren't cached, so using them for reads makes slow, uncacheable waterfalls.",
          ar: "الـ actions عبارة عن POSTs بتشتغل واحدة واحدة من الـ client ومش بيتعمل لها cache، فاستخدامها للقراية بيعمل waterfalls بطيئة ومينفعش يتعمل لها cache."
        },
        fix: { en: "Read in Server Components (or a query library on the client); use actions for mutations.", ar: "اقرا في الـ Server Components (أو مكتبة queries على الـ client)؛ واستخدم الـ actions للـ mutations." }
      },
      {
        title: { en: "Returning too much", ar: "إنك ترجّع حاجات كتير" },
        body: {
          en: "Returning the whole DB row (with internal fields) from an action sends it to the browser.",
          ar: "إنك ترجّع الـ row كله من الـ DB (بالـ fields الداخلية) من action بيبعته للمتصفح."
        },
        fix: { en: "Return a small result shape (ok, errors, the fields the UI shows).", ar: "رجّع شكل نتيجة صغير (ok، errors، الـ fields اللي الـ UI بيعرضها)." }
      }
    ],
    levels: [
      {
        q: "What are Server Actions, and are they secure?",
        mid: { en: "Functions that run on the server that you can call from forms; they're secure because they run on the server.", ar: "functions بتشتغل على السيرفر وتقدر تناديها من الفورمز؛ وهي آمنة لأنها بتشتغل على السيرفر." },
        senior: {
          en: "They're RPC: a <code>\"use server\"</code> function becomes a POST endpoint, and the client calls it by id with serialised arguments. Running on the server doesn't make them safe — each one is a public endpoint, so I authenticate, authorise per resource and validate input inside every action, return minimal data, and refresh caches (<code>updateTag</code>/<code>revalidateTag</code>) or redirect. They shine for forms (progressive enhancement, <code>useActionState</code>, <code>useOptimistic</code>) and for things that must stay server-side — in okoRent, a server action sets the httpOnly auth cookie after login, so the token never touches client JS storage.",
          ar: "هي RPC: الـ function اللي عليها <code>\"use server\"</code> بتبقى POST endpoint، والـ client بيناديها بالـ id ومعاها arguments متعمل لها serialise. وإنها بتشتغل على السيرفر مش بيخليها آمنة — كل واحدة endpoint عام، فبعمل authenticate، و authorise لكل resource، و validate للـ input جوه كل action، وبرجّع أقل داتا، وبحدّث الـ caches (<code>updateTag</code>/<code>revalidateTag</code>) أو بعمل redirect. وهي ممتازة للفورمز (progressive enhancement، و <code>useActionState</code>، و <code>useOptimistic</code>) وللحاجات اللي لازم تفضل على السيرفر — في okoRent، server action بيحط الـ httpOnly auth cookie بعد الـ login، فالـ token عمره ما بيلمس تخزين JS على الـ client."
        }
      },
      {
        q: "Server Action or route handler?",
        mid: { en: "Actions for forms, route handlers for APIs.", ar: "الـ actions للفورمز، والـ route handlers للـ APIs." },
        senior: {
          en: "Server Actions for mutations triggered from my own UI: type-safe calls, integrated revalidation and form state. Route handlers when something else calls the server: webhooks, a mobile app, third parties, file downloads, or GET endpoints that need HTTP caching semantics. Both need the same validation and authorisation.",
          ar: "الـ Server Actions للـ mutations اللي بتيجي من الـ UI بتاعي: نداءات بـ types، و revalidation مدمج، و form state. والـ route handlers لما حاجة تانية بتنادي السيرفر: webhooks، أو mobile app، أو أطراف خارجية، أو تحميل ملفات، أو GET endpoints محتاجة HTTP caching. والاتنين محتاجين نفس الـ validation والـ authorisation."
        }
      }
    ],
    drill: [
      {
        q: "How is a Server Action called under the hood?",
        a: { en: "A POST request to the page's route with the action's id; the arguments are serialised in the body, and the response carries the result plus any updated RSC payload.", ar: "POST request على الـ route بتاع الصفحة ومعاه الـ id بتاع الـ action؛ والـ arguments متعمل لها serialise في الـ body، والـ response فيه النتيجة ومعاها أي RSC payload اتحدث." },
        follow: [
          {
            q: "So what does that mean for security?",
            a: { en: "Anyone can replay or forge that request with other arguments. Treat inputs (including closed-over values) as untrusted, check auth and ownership every time, and rate-limit.", ar: "أي حد يقدر يعيد الـ request ده أو يزوّره بـ arguments تانية. اعتبر الـ inputs (حتى القيم اللي جوه الـ closure) مش مضمونة، واتأكد من الـ auth والملكية كل مرة، وحط rate-limit." }
          }
        ]
      }
    ],
    story: {
      text: { en: "okoRent: a server action sets the httpOnly auth cookie after login, so the token never touches client JS storage.", ar: "okoRent: server action بيحط الـ httpOnly auth cookie بعد الـ login، فالـ token عمره ما بيلمس تخزين JS على الـ client." },
      p: "okorent", tab: "decisions", label: "okoRent"
    },
    sources: [
      { label: "Next.js docs — Updating data (Server Actions)", url: "https://nextjs.org/docs/app/getting-started/updating-data" },
      { label: "react.dev — Server Functions", url: "https://react.dev/reference/rsc/server-functions" },
      { label: "Next.js blog — Security in Server Components and Actions", url: "https://nextjs.org/blog/security-nextjs-server-components-actions" },
      { label: "react.dev — useActionState", url: "https://react.dev/reference/react/useActionState" }
    ]
  }
});
