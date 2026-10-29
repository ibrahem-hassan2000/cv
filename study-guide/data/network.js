// Networking & HTTP — written 2026-10-29.
STUDY.fill("network", {
  intro: { en: "What happens on the wire: HTTP methods and status codes, caching headers, CORS, REST vs GraphQL vs tRPC, real-time options, HTTP/2–3 and CDNs, and API design seen from the frontend.", ar: "اللي بيحصل على الشبكة: الـ HTTP methods والـ status codes، headers الكاش، CORS، REST ولا GraphQL ولا tRPC، اختيارات الـ real-time، HTTP/2 و 3 والـ CDNs، وتصميم الـ API من ناحية الفرونت." },
  topics: [
    {
      id: "http-basics",
      title: { en: "HTTP methods and status codes", ar: "الـ HTTP methods والـ Status codes" },
      tldr: { en: "GET reads (safe, cacheable), POST creates or runs an action, PUT replaces, PATCH changes part, DELETE removes. GET/PUT/DELETE are idempotent (repeating them has the same effect); POST is not. Status codes tell the client what to do next.", ar: "GET بيقرا (آمن وبيتعمله cache)، POST بيعمل حاجة جديدة أو أكشن، PUT بيستبدل، PATCH بيغير جزء، DELETE بيمسح. و GET و PUT و DELETE idempotent (تكرارهم نفس النتيجة)؛ و POST لأ. والـ status codes بتقول للـ client يعمل إيه بعد كده." },
      blocks: [
        { type: "compare", cols: [{ en: "Code", ar: "الكود" }, { en: "Meaning", ar: "المعنى" }, { en: "Frontend reaction", ar: "رد فعل الفرونت" }], rows: [
          ["200 / 201 / 204", { en: "OK / created / no content", ar: "تمام / اتعمل / مفيش body" }, { en: "Update cache; 204 has no body to parse", ar: "حدّث الكاش؛ الـ 204 مفيهوش body" }],
          ["304", { en: "Not modified (your cached copy is fine)", ar: "متغيرش (النسخة اللي عندك تمام)" }, { en: "Browser handles it", ar: "المتصفح بيتعامل" }],
          ["400 / 422", { en: "Bad request / validation failed", ar: "Request غلط / validation فشل" }, { en: "Show field errors", ar: "اعرض أخطاء الـ fields" }],
          ["401", { en: "Not authenticated", ar: "مش مسجل دخول" }, { en: "Go to sign-in / session-expired screen", ar: "روح للـ sign-in / شاشة انتهاء الـ session" }],
          ["403", { en: "Authenticated but not allowed", ar: "مسجل بس مش مسموح" }, { en: "Access-denied page; don't sign out", ar: "صفحة ممنوع؛ متعملش sign out" }],
          ["404 / 409 / 412", { en: "Not found / conflict / precondition failed (ETag)", ar: "مش موجود / تعارض / الشرط فشل (ETag)" }, { en: "Reload and tell the user", ar: "أعد التحميل وقول للمستخدم" }],
          ["429", { en: "Too many requests", ar: "Requests كتير" }, { en: "Wait for Retry-After", ar: "استنى Retry-After" }],
          ["5xx", { en: "Server error / unavailable", ar: "خطأ في السيرفر / مش متاح" }, { en: "Retry with backoff, show a friendly error", ar: "أعد بـ backoff، واعرض خطأ لطيف" }]
        ] },
        { type: "projects", items: [{ text: { en: "Smart FAQ maps each of these to a typed error code; only network/5xx/429 retry; 401 vs 403 lead to different screens.", ar: "Smart FAQ بيحوّل كل ده لـ error code ليه type؛ والـ retry بس للشبكة و 5xx و 429؛ و 401 و 403 بيودوا على شاشات مختلفة." }, p: "smartfaq", tab: "decisions", label: "Smart FAQ" }] }
      ],
      say: "I treat 4xx as final answers to show to the user and only retry network errors, 5xx and 429.",
      interview: [{ q: "401 vs 403?", a: { en: "401: we don't know who you are (sign in again). 403: we know, and you're not allowed — keep the session and show access denied.", ar: "401: إحنا مش عارفين انت مين (سجل دخول تاني). 403: عارفينك ومش مسموحلك — سيب الـ session واعرض ممنوع." },
        follow: [{ q: "What is idempotency and why does it matter for retries?", a: { en: "Repeating an idempotent request has the same effect as doing it once, so retrying is safe. A POST like “create order” isn't — retrying could create two orders unless the API supports an idempotency key.", ar: "تكرار request idempotent ليه نفس أثر مرة واحدة، فالـ retry آمن. لكن POST زي «اعمل أوردر» لأ — الـ retry ممكن يعمل أوردرين إلا لو الـ API بيدعم idempotency key." } }] }],
      quiz: [{ q: { en: "Is PATCH idempotent?", ar: "الـ PATCH idempotent؟" }, a: { en: "Not guaranteed — depends on the operation (setting a value is; incrementing isn't).", ar: "مش مضمون — حسب العملية (تحط قيمة آه؛ تزود رقم لأ)." } }],
      quick: [{ en: "GET safe+cacheable; GET/PUT/DELETE idempotent; 401 = who are you, 403 = not allowed; retry only network/5xx/429.", ar: "GET آمن ويتعمله cache؛ GET و PUT و DELETE idempotent؛ 401 = انت مين، 403 = ممنوع؛ retry بس للشبكة و 5xx و 429." }]
    },
    {
      id: "http-caching",
      title: { en: "HTTP caching: Cache-Control, ETag, 304", ar: "الـ HTTP caching: Cache-Control و ETag و 304" },
      tldr: { en: "<code>Cache-Control</code> decides who may cache and for how long. Hashed assets: <code>max-age=31536000, immutable</code>. HTML: <code>no-cache</code> (store but revalidate). Revalidation uses <code>ETag</code>/<code>If-None-Match</code> → 304 with no body.", ar: "<code>Cache-Control</code> بيحدد مين يعمل cache ولمدة قد إيه. الـ assets اللي فيها hash: <code>max-age=31536000, immutable</code>. الـ HTML: <code>no-cache</code> (خزّن بس اتأكد كل مرة). والتأكد بيتم بـ <code>ETag</code> و <code>If-None-Match</code> ← 304 من غير body." },
      blocks: [
        { type: "compare", cols: [{ en: "Directive", ar: "التوجيه" }, { en: "Meaning", ar: "المعنى" }], rows: [
          ["max-age=N", { en: "Fresh for N seconds — no request at all", ar: "جديد لمدة N ثانية — من غير أي request" }],
          ["no-cache", { en: "May store, must revalidate before use", ar: "يتخزن، بس لازم يتأكد قبل الاستخدام" }],
          ["no-store", { en: "Never store (sensitive data)", ar: "متخزنش خالص (داتا حساسة)" }],
          ["private / public", { en: "Only the browser / also CDNs and proxies", ar: "المتصفح بس / والـ CDN والـ proxies كمان" }],
          ["stale-while-revalidate=N", { en: "Serve stale for N s while refreshing in the background", ar: "رجّع القديم N ثانية وحدّث في الخلفية" }],
          ["immutable", { en: "Never changes (hashed file names)", ar: "عمره ما يتغير (أسماء ملفات بـ hash)" }]
        ] },
        { type: "text", body: { en: "<b>ETag</b> has a second job: optimistic concurrency. Send it back in <code>If-Match</code> on a write; the server answers 412 if someone changed the resource since you read it.", ar: "الـ <b>ETag</b> ليه شغلانة تانية: optimistic concurrency. ابعته في <code>If-Match</code> مع الكتابة؛ والسيرفر بيرد 412 لو حد غير الـ resource من ساعة ما قريته." } },
        { type: "projects", items: [{ text: { en: "Smart FAQ sends ETags with If-Match on departments, categories, drafts and settings — a 412 reloads the tree instead of overwriting another admin.", ar: "Smart FAQ بيبعت الـ ETag في If-Match مع الأقسام والتصنيفات والـ drafts والإعدادات — والـ 412 بيعيد تحميل الشجرة بدل ما يمسح شغل أدمن تاني." }, p: "smartfaq", tab: "problems", label: "Smart FAQ" }] }
      ],
      say: "Hashed assets are cached forever as immutable, HTML is no-cache so a deploy shows up immediately, and ETags give both 304s and safe concurrent edits.",
      interview: [{ q: "no-cache vs no-store?", a: { en: "no-cache stores the response but revalidates before every use; no-store never writes it anywhere — for sensitive responses.", ar: "no-cache بيخزن بس بيتأكد قبل كل استخدام؛ و no-store عمره ما بيكتبه في أي حتة — للردود الحساسة." },
        follow: [{ q: "How do you bust the cache after a deploy?", a: { en: "Content-hashed file names for JS/CSS (new hash = new URL) and a short-lived or no-cache HTML that references them.", ar: "أسماء ملفات بـ hash للمحتوى للـ JS والـ CSS (hash جديد = URL جديد)، و HTML عمره قصير أو no-cache بيشاور عليهم." } }] }],
      quiz: [{ q: { en: "Response to a matching If-None-Match?", ar: "الرد على If-None-Match مطابق؟" }, a: { en: "304 Not Modified, no body.", ar: "304 Not Modified من غير body." } }],
      quick: [{ en: "hashed assets: max-age=1y immutable; HTML: no-cache; ETag → 304 and If-Match → 412.", ar: "الـ assets بـ hash: max-age سنة و immutable؛ الـ HTML: no-cache؛ ETag ← 304 و If-Match ← 412." }]
    },
    {
      id: "cors",
      title: { en: "CORS", ar: "الـ CORS" },
      tldr: { en: "The browser blocks a page from reading responses from another origin unless the server allows it with <code>Access-Control-Allow-*</code> headers. Non-simple requests (JSON body, custom headers, PUT/DELETE) send an OPTIONS preflight first. CORS protects users' data, not your API.", ar: "المتصفح بيمنع الصفحة إنها تقرا ردود من origin تاني إلا لو السيرفر سمح بـ headers <code>Access-Control-Allow-*</code>. والـ requests اللي مش بسيطة (JSON body، headers مخصوصة، PUT و DELETE) بتبعت preflight بـ OPTIONS الأول. والـ CORS بيحمي داتا المستخدمين، مش الـ API بتاعك." },
      blocks: [
        { type: "code", code: "Origin = scheme + host + port      https://app.acme.com  ≠  https://api.acme.com\n\n// preflight\nOPTIONS /orders\nOrigin: https://app.acme.com\nAccess-Control-Request-Method: PATCH\nAccess-Control-Request-Headers: content-type, x-xsrf-token\n\n// server answer\nAccess-Control-Allow-Origin: https://app.acme.com   // with credentials: never \"*\"\nAccess-Control-Allow-Credentials: true\nAccess-Control-Allow-Methods: GET, POST, PATCH, DELETE\nAccess-Control-Allow-Headers: content-type, x-xsrf-token\nAccess-Control-Max-Age: 600" },
        { type: "when", title: { en: "Fixing CORS in development", ar: "حل الـ CORS في التطوير" }, use: [{ en: "A dev-server proxy (Vite <code>server.proxy</code>, Next rewrites) so the browser sees one origin.", ar: "Proxy في سيرفر التطوير (Vite <code>server.proxy</code>، rewrites في Next) فالمتصفح يشوف origin واحد." }, { en: "Configure allowed origins on the API for real environments.", ar: "اضبط الـ origins المسموحة في الـ API للبيئات الحقيقية." }], avoid: [{ en: "Browser extensions that disable CORS, or <code>Allow-Origin: *</code> with cookies (browsers reject it).", ar: "Extensions بتقفل الـ CORS، أو <code>Allow-Origin: *</code> مع cookies (المتصفح بيرفضها)." }] },
        { type: "projects", items: [{ text: { en: "Smart FAQ proxies <code>/api</code> to the backend in Vite dev (and runs HTTPS locally) — same origin, cookies just work.", ar: "Smart FAQ بيعمل proxy لـ <code>/api</code> للباك إند في Vite dev (وبيشغل HTTPS محلي) — origin واحد، والكوكيز بتشتغل عادي." }, p: "smartfaq", tab: "overview", label: "Smart FAQ" }] }
      ],
      say: "CORS is the browser protecting users; in development I proxy the API so it's same-origin, and in production the API allows our origin explicitly.",
      interview: [{ q: "Why does Postman work but the browser gets a CORS error?", a: { en: "CORS is enforced only by browsers. Postman doesn't run page scripts on behalf of a user, so there's nothing to protect.", ar: "الـ CORS المتصفحات بس اللي بتطبقه. Postman مش بيشغل scripts لصفحة نيابة عن مستخدم، فمفيش حاجة يحميها." },
        follow: [{ q: "When is a preflight sent?", a: { en: "For methods other than GET/HEAD/POST, custom headers, or a Content-Type other than form/text types (e.g. application/json).", ar: "مع methods غير GET و HEAD و POST، أو headers مخصوصة، أو Content-Type غير form و text (زي application/json)." } }] }],
      quiz: [{ q: { en: "Same origin? http://a.com vs https://a.com", ar: "نفس الـ origin؟ http://a.com و https://a.com" }, a: { en: "No — the scheme differs.", ar: "لأ — الـ scheme مختلف." } }],
      quick: [{ en: "Origin = scheme+host+port; preflight for JSON/custom headers; credentials need an exact origin; proxy in dev.", ar: "Origin = scheme و host و port؛ preflight مع JSON و headers مخصوصة؛ الـ credentials محتاجة origin بالظبط؛ proxy في التطوير." }]
    },
    {
      id: "api-styles",
      title: { en: "REST vs GraphQL vs tRPC", ar: "REST ولا GraphQL ولا tRPC" },
      tldr: { en: "REST: resources + HTTP verbs, cacheable, simple. GraphQL: one endpoint, the client asks for exactly the fields it needs — great for many clients and nested data, costs caching and server complexity. tRPC: end-to-end types when both sides are TypeScript.", ar: "REST: resources و HTTP verbs، بيتعمله cache، وبسيط. GraphQL: endpoint واحد، والـ client بيطلب الـ fields اللي محتاجها بالظبط — ممتاز لـ clients كتير وداتا متداخلة، بس على حساب الـ caching وتعقيد السيرفر. tRPC: types من الأول للآخر لما الناحيتين TypeScript." },
      blocks: [
        { type: "compare", cols: ["", "REST", "GraphQL", "tRPC"], rows: [
          [{ en: "Over/under-fetching", ar: "داتا زيادة أو ناقصة" }, { en: "Common", ar: "شائع" }, { en: "Solved by field selection", ar: "متحلول باختيار الـ fields" }, { en: "Per procedure", ar: "حسب كل procedure" }],
          [{ en: "HTTP caching", ar: "HTTP caching" }, { en: "Native (GET, ETag)", ar: "جاهز (GET، ETag)" }, { en: "Needs a client cache (Apollo/urql)", ar: "محتاج client cache (Apollo/urql)" }, { en: "Via React Query", ar: "عن طريق React Query" }],
          [{ en: "Types", ar: "الـ Types" }, { en: "OpenAPI codegen", ar: "OpenAPI codegen" }, { en: "Schema codegen", ar: "Schema codegen" }, { en: "Inferred, no codegen", ar: "Inferred من غير codegen" }],
          [{ en: "Best fit", ar: "أنسب لـ" }, { en: "Most CRUD APIs, any backend", ar: "معظم الـ CRUD، أي باك إند" }, { en: "Many clients, nested graphs, mobile bandwidth", ar: "clients كتير، داتا متداخلة، باندويدث الموبايل" }, { en: "TS monorepo (Next + Node)", ar: "TS monorepo (Next + Node)" }]
        ] },
        { type: "code", title: { en: "GraphQL in one look", ar: "GraphQL في نظرة" }, code: "query Order($id: ID!) {\n  order(id: $id) { id status total customer { name } items { name qty } }\n}\n// one round trip, exactly these fields; errors come back with HTTP 200 in an `errors` array" },
        { type: "pitfalls", items: [{ en: "GraphQL N+1 on the server (resolve customer per order) → DataLoader batching.", ar: "مشكلة N+1 في سيرفر GraphQL (customer لكل أوردر) ← DataLoader batching." }, { en: "GraphQL errors often arrive with status 200 — check the <code>errors</code> field.", ar: "أخطاء GraphQL غالبًا بتيجي بـ status 200 — شيك على field الـ <code>errors</code>." }] }
      ],
      say: "I default to REST with generated types; GraphQL pays off when many clients need different shapes of nested data, and tRPC when the whole stack is TypeScript.",
      interview: [{ q: "When would you choose GraphQL?", a: { en: "Several clients (web, mobile) needing different slices of nested data, or screens that would otherwise make many REST calls. Not for a simple CRUD app — REST + HTTP caching is cheaper.", ar: "لما يبقى فيه clients كتير (ويب، موبايل) محتاجين أجزاء مختلفة من داتا متداخلة، أو شاشات كانت هتعمل REST calls كتير. مش لتطبيق CRUD بسيط — REST مع HTTP caching أرخص." },
        follow: [{ q: "Your gap: have you used GraphQL?", a: { en: "Be honest: “Not in production — my APIs were REST/.NET with OpenAPI. I know the model (queries, mutations, fragments, normalized cache) and I've built a small project with Apollo.” (Build that project first.)", ar: "قول الحقيقة: «مش في production — الـ APIs بتاعتي كانت REST/.NET بـ OpenAPI. فاهم الفكرة (queries، mutations، fragments، normalized cache) وعملت مشروع صغير بـ Apollo.» (اعمل المشروع ده الأول.)" } }] }],
      quiz: [{ q: { en: "What problem does DataLoader solve?", ar: "DataLoader بيحل مشكلة إيه؟" }, a: { en: "N+1 queries in GraphQL resolvers — it batches and caches loads per request.", ar: "الـ N+1 queries في resolvers بتاعة GraphQL — بيجمع ويعمل cache للتحميل في كل request." } }],
      quick: [{ en: "REST = simple + HTTP cache; GraphQL = exact fields, many clients; tRPC = TS end to end.", ar: "REST = بسيط و HTTP cache؛ GraphQL = fields بالظبط و clients كتير؛ tRPC = TS من أوله لآخره." }]
    },
    {
      id: "realtime",
      title: { en: "Real-time: polling, SSE, WebSockets, SignalR", ar: "الـ Real-time: polling و SSE و WebSockets و SignalR" },
      tldr: { en: "Polling asks every N seconds (simple, wasteful). SSE streams server → client over HTTP (notifications, AI tokens). WebSockets are two-way (chat, collaboration). SignalR / Socket.IO are libraries on top with reconnection, groups and fallbacks — pick the one your backend speaks.", ar: "الـ Polling بيسأل كل N ثانية (بسيط بس مسرف). الـ SSE بيبعت من السيرفر للـ client على HTTP (إشعارات، كلمات الـ AI). الـ WebSockets في الاتجاهين (شات، شغل جماعي). و SignalR و Socket.IO مكتبات فوقهم فيها reconnection و groups و fallbacks — اختار اللي الباك إند بيتكلمه." },
      blocks: [
        { type: "compare", cols: ["", { en: "Direction", ar: "الاتجاه" }, { en: "Use for", ar: "استخدمه لـ" }, { en: "Cost", ar: "التكلفة" }], rows: [
          ["Polling / refetchInterval", { en: "client asks", ar: "الـ client بيسأل" }, { en: "Dashboards that can be a few seconds late", ar: "داشبورد ممكن يتأخر ثواني" }, { en: "Wasted requests", ar: "Requests على الفاضي" }],
          ["SSE (EventSource)", { en: "server → client", ar: "سيرفر ← client" }, { en: "Notifications, progress, LLM streaming", ar: "إشعارات، تقدم، streaming للـ LLM" }, { en: "Plain HTTP, auto-reconnect", ar: "HTTP عادي، reconnect لوحده" }],
          ["WebSocket", { en: "both ways", ar: "الاتجاهين" }, { en: "Chat, presence, live collaboration", ar: "شات، presence، شغل جماعي لايف" }, { en: "Stateful connections to scale", ar: "اتصالات stateful لازم تتكبر" }],
          ["SignalR", { en: "both ways (.NET)", ar: "الاتجاهين (.NET)" }, { en: ".NET backends: hubs, groups, auth", ar: "باك إند .NET: hubs و groups و auth" }, { en: "Library + transport negotiation", ar: "مكتبة + اختيار الـ transport" }]
        ] },
        { type: "code", code: "// SignalR client in React (pattern)\nuseEffect(() => {\n  if (!token) return;\n  const conn = new HubConnectionBuilder()\n    .withUrl(\"/hubs/chat\", { accessTokenFactory: () => token })\n    .withAutomaticReconnect()\n    .build();\n  conn.on(\"message\", (m) => queryClient.setQueryData(chatKeys.thread(m.threadId), (old) => append(old, m)));\n  conn.start();\n  return () => { conn.stop(); };\n}, [token]);" },
        { type: "projects", items: [{ text: { en: "okoRent: real-time chat and notifications with SignalR on a .NET backend; Bites: LiveKit video and P2P rooms.", ar: "okoRent: شات وإشعارات لايف بـ SignalR على باك إند .NET؛ و Bites: فيديو بـ LiveKit و P2P rooms." }, p: "okorent", tab: "decisions", label: "okoRent" }] }
      ],
      say: "I choose by direction and backend: SSE for server-to-client streams, WebSockets for two-way, SignalR when the backend is .NET — and real-time events update the query cache instead of a separate store.",
      interview: [{ q: "How do real-time messages and React Query live together?", a: { en: "The socket handler writes into the cache (<code>setQueryData</code>) or invalidates the affected keys; screens keep reading from queries, so there is one source of truth.", ar: "الـ handler بتاع الـ socket بيكتب في الكاش (<code>setQueryData</code>) أو بيعمل invalidate للـ keys اللي اتأثرت؛ والشاشات بتفضل تقرا من الـ queries، فمصدر الحقيقة واحد." },
        follow: [{ q: "What about reconnection and missed messages?", a: { en: "Auto-reconnect with backoff, show a “reconnecting” state, and on reconnect refetch (invalidate) to catch anything missed while offline.", ar: "Reconnect لوحده بـ backoff، واعرض حالة «بنحاول نتصل»، ولما يرجع اعمل refetch (invalidate) علشان تلحق اللي فاتك وانت offline." } }] }],
      quiz: [{ q: { en: "Best fit for streaming LLM tokens to the browser?", ar: "أنسب حاجة لبث كلمات الـ LLM للمتصفح؟" }, a: { en: "SSE (or a streamed fetch response) — one direction, plain HTTP.", ar: "SSE (أو fetch response بيتبث) — اتجاه واحد و HTTP عادي." } }],
      quick: [{ en: "Polling simple · SSE server→client · WebSocket two-way · SignalR for .NET; sockets write into the query cache; refetch on reconnect.", ar: "Polling بسيط · SSE من السيرفر · WebSocket الاتجاهين · SignalR لـ .NET؛ الـ sockets بتكتب في الكاش؛ refetch بعد الـ reconnect." }]
    },
    {
      id: "http2-cdn",
      title: { en: "HTTP/2, HTTP/3 and CDNs", ar: "HTTP/2 و HTTP/3 والـ CDNs" },
      tldr: { en: "HTTP/2 multiplexes many requests on one connection (so bundling everything into one giant file matters less); HTTP/3 runs on QUIC (UDP) and recovers better on mobile networks. A CDN serves files from servers near the user and caches by your Cache-Control.", ar: "HTTP/2 بيبعت requests كتير على اتصال واحد (فدمج كل حاجة في ملف ضخم بقى أقل أهمية)؛ و HTTP/3 شغال على QUIC (UDP) وأحسن على شبكات الموبايل. والـ CDN بيبعت الملفات من سيرفرات قريبة من المستخدم وبيعمل cache حسب الـ Cache-Control بتاعك." },
      blocks: [
        { type: "list", items: [
          { en: "HTTP/1.1: ~6 connections per origin, head-of-line blocking → old tricks like sprites and domain sharding.", ar: "HTTP/1.1: حوالي 6 اتصالات لكل origin، و head-of-line blocking ← حيل قديمة زي الـ sprites والـ domain sharding." },
          { en: "HTTP/2: one connection, streams, header compression → split code into sensible chunks.", ar: "HTTP/2: اتصال واحد، streams، ضغط الـ headers ← قسّم الكود chunks معقولة." },
          { en: "Compression: Brotli (better) or gzip for text assets.", ar: "الضغط: Brotli (أحسن) أو gzip لملفات النص." },
          { en: "Edge: CDNs can also run code (middleware, edge functions) near users.", ar: "الـ Edge: الـ CDNs كمان بتشغل كود (middleware، edge functions) قريب من المستخدم." }
        ] }
      ],
      say: "With HTTP/2 I split code into route-level chunks instead of one bundle, serve them Brotli-compressed from a CDN with long-lived immutable caching.",
      interview: [{ q: "Does bundling still matter with HTTP/2?", a: { en: "Less for request count, still for compression and duplicate code. The sweet spot is route-level chunks plus a shared vendor chunk — not one huge bundle and not hundreds of tiny files.", ar: "بقت أقل أهمية لعدد الـ requests، بس لسه مهمة للضغط والكود المتكرر. الأحسن chunks على مستوى الـ routes و chunk مشترك للمكتبات — مش bundle ضخم ولا مئات ملفات صغيرة." } }],
      quiz: [{ q: { en: "Which transport does HTTP/3 use?", ar: "HTTP/3 شغال على إيه؟" }, a: { en: "QUIC over UDP.", ar: "QUIC فوق UDP." } }],
      quick: [{ en: "HTTP/2 multiplexing → route chunks; HTTP/3 = QUIC; CDN + Brotli + immutable caching.", ar: "HTTP/2 multiplexing ← chunks للـ routes؛ HTTP/3 = QUIC؛ CDN و Brotli و immutable caching." }]
    },
    {
      id: "api-contract",
      title: { en: "API design from the frontend", ar: "تصميم الـ API من ناحية الفرونت" },
      tldr: { en: "What makes an API pleasant to build UI on: a typed contract (OpenAPI), one error format with stable codes (RFC 9457 problem+json), field-level validation errors, cursor pagination for feeds, ETags for concurrency, and idempotency keys for payments.", ar: "اللي بيخلي الـ API سهل تبني عليه UI: contract ليه types (OpenAPI)، وشكل واحد للأخطاء بأكواد ثابتة (RFC 9457 problem+json)، وأخطاء validation لكل field، و cursor pagination للـ feeds، و ETags للتعديل المتزامن، و idempotency keys للمدفوعات." },
      blocks: [
        { type: "compare", title: { en: "Offset vs cursor pagination", ar: "Offset ولا cursor pagination" }, cols: ["", "offset/limit (page=3)", "cursor (after=abc)"], rows: [
          [{ en: "Jump to page N", ar: "تنط لصفحة N" }, "✓", "✗"],
          [{ en: "Stable when items are added", ar: "ثابت لما عناصر تتضاف" }, { en: "✗ duplicates/skips", ar: "✗ تكرار أو نط" }, "✓"],
          [{ en: "Fast on huge tables", ar: "سريع في جداول ضخمة" }, { en: "Slower deep pages", ar: "الصفحات البعيدة أبطأ" }, "✓"],
          [{ en: "Use for", ar: "استخدمه لـ" }, { en: "Admin tables with page numbers", ar: "جداول أدمن بأرقام صفحات" }, { en: "Feeds, chat, infinite scroll", ar: "Feeds، شات، infinite scroll" }]
        ] },
        { type: "code", code: "HTTP/1.1 422 Unprocessable Content\nContent-Type: application/problem+json\n{\n  \"type\": \"urn:app:problem:validation.failed\",\n  \"title\": \"Validation failed\",\n  \"status\": 422,\n  \"code\": \"validation.failed\",\n  \"errors\": { \"email\": [\"auth.email_taken\"] },\n  \"traceId\": \"…\"\n}" },
        { type: "projects", items: [{ text: { en: "Smart FAQ consumed exactly this: OpenAPI types, a problem+json error catalogue, 422 field errors mapped onto forms, ETags, Retry-After.", ar: "Smart FAQ اشتغل على ده بالظبط: types من OpenAPI، وكتالوج أخطاء problem+json، وأخطاء 422 بترجع على الفورمز، و ETags، و Retry-After." }, p: "smartfaq", tab: "decisions", label: "Smart FAQ" }] }
      ],
      say: "I push for one error format with stable codes and field errors, cursor pagination for feeds, and an OpenAPI contract the frontend generates types from.",
      interview: [{ q: "What do you ask the backend team for before building screens?", a: { en: "An OpenAPI contract early (even mocked), stable error codes, field-level validation errors, pagination style per list, concurrency rules (ETag), and which endpoints are idempotent.", ar: "OpenAPI contract بدري (حتى لو mock)، وأكواد أخطاء ثابتة، وأخطاء validation لكل field، وطريقة الـ pagination لكل قايمة، وقواعد التعديل المتزامن (ETag)، وأنهي endpoints idempotent." } }],
      quiz: [{ q: { en: "Pagination for a chat history?", ar: "Pagination لتاريخ شات؟" }, a: { en: "Cursor-based.", ar: "Cursor." } }],
      quick: [{ en: "OpenAPI contract · problem+json + codes · 422 field errors · cursor for feeds · ETag · idempotency keys.", ar: "OpenAPI · problem+json وأكواد · أخطاء 422 للـ fields · cursor للـ feeds · ETag · idempotency keys." }]
    }
  ]
});
