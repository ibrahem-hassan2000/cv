// Web security — written 2026-10-29.
STUDY.fill("security", {
  intro: { en: "What a frontend engineer must defend against: XSS, CSRF, token theft, broken OAuth flows, clickjacking, leaked secrets and trusting the UI for authorization.", ar: "اللي مهندس الفرونت لازم يحمي منه: XSS، CSRF، سرقة التوكن، OAuth متركب غلط، clickjacking، أسرار متسربة، والاعتماد على الواجهة في الصلاحيات." },
  topics: [
    {
      id: "xss",
      title: { en: "XSS and how React helps (and doesn't)", ar: "الـ XSS و React بيساعد إزاي (وإمتى لأ)" },
      tldr: { en: "Cross-site scripting = attacker-controlled script running in your page, with your user's session. React escapes text by default. The holes: <code>dangerouslySetInnerHTML</code>, <code>href=\"javascript:…\"</code>, injecting into <code>&lt;script&gt;</code>, and third-party scripts. Defend with sanitizing, safe-URL checks and a Content Security Policy.", ar: "الـ Cross-site scripting = script المهاجم بيتحكم فيه بيشتغل في صفحتك بـ session المستخدم. React بيعمل escape للنص افتراضيًا. الثغرات: <code>dangerouslySetInnerHTML</code>، و <code>href=\"javascript:…\"</code>، والحقن جوه <code>&lt;script&gt;</code>، والـ scripts الخارجية. والحماية: sanitize، وفحص الـ URLs، و Content Security Policy." },
      blocks: [
        { type: "compare", cols: [{ en: "Type", ar: "النوع" }, { en: "How", ar: "إزاي" }, { en: "Example", ar: "مثال" }], rows: [
          ["Stored", { en: "Saved in the DB, shown to others", ar: "متخزن في الداتابيز وبيظهر لغيره" }, { en: "Comment with &lt;img onerror&gt;", ar: "كومنت فيه &lt;img onerror&gt;" }],
          ["Reflected", { en: "From the URL straight into the page", ar: "من الـ URL للصفحة على طول" }, "?q=&lt;script&gt;…"],
          ["DOM-based", { en: "Client JS writes unsafe data into the DOM", ar: "JS الـ client بيكتب داتا مش آمنة في الـ DOM" }, "el.innerHTML = location.hash"]
        ] },
        { type: "code", code: "<p>{comment.text}</p>                                  // ✓ escaped by React\n<div dangerouslySetInnerHTML={{ __html: html }} />     // ✗ unless sanitized\n<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} /> // ✓\n\nconst SAFE = /^(https:|mailto:|tel:)/i;                // block javascript: URLs\n<a href={SAFE.test(url) ? url : \"#\"}>…</a>\n\n// CSP header: only our scripts, no inline script\nContent-Security-Policy: default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'none'" },
        { type: "projects", items: [{ text: { en: "Smart FAQ renders article HTML through an allowlist that matches the API's sanitizer exactly, and only allows https/mailto/tel links.", ar: "Smart FAQ بيعرض HTML المقالات عن طريق allowlist مطابقة بالظبط للـ sanitizer بتاع الـ API، وبيسمح بس بلينكات https و mailto و tel." }, p: "smartfaq", tab: "decisions", label: "Smart FAQ" }] }
      ],
      say: "React escapes text, so the risks are raw HTML and URLs: I sanitize any HTML with an allowlist, block javascript: links, and rely on a CSP as the second layer.",
      interview: [{ q: "Is a React app immune to XSS?", a: { en: "No. JSX escapes strings, but dangerouslySetInnerHTML, unsafe href/src values, server-rendered data in script tags, and compromised third-party scripts still allow it.", ar: "لأ. الـ JSX بيعمل escape للـ strings، بس dangerouslySetInnerHTML، وقيم href و src مش آمنة، وداتا السيرفر جوه script tags، و scripts خارجية مخترقة لسه بتسمح بيه." },
        follow: [{ q: "What does a CSP add?", a: { en: "Even if markup gets injected, the browser refuses to run scripts not allowed by the policy (no inline, only listed origins or nonces). Defence in depth.", ar: "حتى لو اتحقن markup، المتصفح بيرفض يشغل scripts مش مسموحة في الـ policy (من غير inline، بس origins مسموحة أو nonces). حماية على طبقتين." } }] }],
      quiz: [{ q: { en: "Is <code>href={userUrl}</code> safe in React?", ar: "<code>href={userUrl}</code> آمن في React؟" }, a: { en: "Not by itself — <code>javascript:</code> URLs can run code. Validate the scheme.", ar: "مش لوحده — URLs بـ <code>javascript:</code> ممكن تشغل كود. شيك على الـ scheme." } }],
      quick: [{ en: "React escapes text; danger = innerHTML, javascript: URLs, 3rd-party scripts; sanitize + CSP.", ar: "React بيعمل escape للنص. والخطر في innerHTML، والـ javascript: URLs، والـ scripts الخارجية. والحل sanitize و CSP." }]
    },
    {
      id: "csrf",
      title: { en: "CSRF and SameSite", ar: "الـ CSRF والـ SameSite" },
      tldr: { en: "Cross-site request forgery: another site makes the user's browser send a request with their cookies. Defences: <code>SameSite=Lax/Strict</code> cookies, an antiforgery token the attacker can't read (double submit / header), and never changing state on GET.", ar: "الـ Cross-site request forgery: موقع تاني بيخلي متصفح المستخدم يبعت request بالكوكيز بتاعته. الحماية: كوكيز <code>SameSite=Lax/Strict</code>، و antiforgery token المهاجم مايقدرش يقراه (double submit / header)، وعمرك ما تغير state بـ GET." },
      blocks: [
        { type: "code", code: "Set-Cookie: session=…; HttpOnly; Secure; SameSite=Lax; Path=/\nSet-Cookie: __Host-XSRF-TOKEN=…; Secure; SameSite=Strict; Path=/   // readable by our JS only\n\n// every unsafe request\nfetch(\"/api/orders\", { method: \"POST\", headers: { \"X-XSRF-TOKEN\": readCookie(\"__Host-XSRF-TOKEN\") }, credentials: \"same-origin\" });" },
        { type: "compare", cols: ["SameSite", { en: "Cross-site requests send the cookie?", ar: "الكوكي بيتبعت مع requests من موقع تاني؟" }], rows: [
          ["Strict", { en: "Never", ar: "أبدًا" }],
          ["Lax (default)", { en: "Only top-level GET navigations (clicking a link)", ar: "بس الـ navigation بـ GET (ضغط لينك)" }],
          ["None; Secure", { en: "Always — needed for third-party embeds", ar: "دايمًا — محتاجه للـ embeds الخارجية" }]
        ] },
        { type: "projects", items: [{ text: { en: "Smart FAQ: cookie session + <code>__Host-XSRF-TOKEN</code> sent as <code>X-XSRF-TOKEN</code> on POST/PUT/PATCH/DELETE, refreshed once and retried when it rotates.", ar: "Smart FAQ: session بالكوكي و <code>__Host-XSRF-TOKEN</code> بيتبعت كـ <code>X-XSRF-TOKEN</code> مع POST و PUT و PATCH و DELETE، وبيتجدد مرة ويعيد لما يتغير." }, p: "smartfaq", tab: "decisions", label: "Smart FAQ" }] }
      ],
      say: "Cookie sessions need CSRF protection: SameSite cookies plus an antiforgery token in a header on every state-changing request.",
      interview: [{ q: "If I store the JWT in localStorage, do I need CSRF protection?", a: { en: "Not for CSRF — the browser won't attach it automatically. But it's now readable by XSS. Cookie sessions trade that for CSRF, which SameSite + antiforgery tokens solve.", ar: "مش للـ CSRF — المتصفح مش هيبعته لوحده. بس كده بقى مقروء لأي XSS. الـ session بالكوكي بتبدّل ده بالـ CSRF، واللي SameSite و antiforgery tokens بيحلوه." },
        follow: [{ q: "Why the __Host- prefix?", a: { en: "The browser only accepts it if Secure, Path=/ and no Domain — so a subdomain can't overwrite it.", ar: "المتصفح بيقبله بس لو Secure و Path=/ ومن غير Domain — فمفيش subdomain يقدر يكتب فوقه." } }] }],
      quiz: [{ q: { en: "Default SameSite in modern browsers?", ar: "الـ SameSite الافتراضي في المتصفحات الحديثة؟" }, a: { en: "Lax.", ar: "Lax." } }],
      quick: [{ en: "CSRF = your cookies sent by another site; SameSite + antiforgery header; no state changes on GET.", ar: "الـ CSRF معناه إن الكوكيز بتاعتك بتتبعت من موقع تاني. والحل SameSite و antiforgery header. ومفيش تغيير state بـ GET." }]
    },
    {
      id: "auth-tokens",
      title: { en: "Sessions, JWTs and refresh tokens", ar: "الـ Sessions والـ JWTs والـ Refresh tokens" },
      tldr: { en: "Server sessions (cookie with an ID) are easy to revoke. JWTs are self-contained and stateless but hard to revoke — keep them short-lived and rotate with a refresh token in an httpOnly cookie. For SPAs, a Backend-for-Frontend that holds tokens server-side is the safest pattern.", ar: "الـ Sessions على السيرفر (كوكي فيها ID) سهل تلغيها. والـ JWTs فيها كل حاجة ومش محتاجة state بس صعب تلغيها — خليها قصيرة العمر وجددها بـ refresh token في كوكي httpOnly. ولتطبيقات الـ SPA، الـ Backend-for-Frontend اللي شايل التوكنز على السيرفر هو أأمن نمط." },
      blocks: [
        { type: "compare", cols: ["", { en: "Where", ar: "فين" }, { en: "XSS can steal?", ar: "الـ XSS يسرقه؟" }, { en: "CSRF risk?", ar: "خطر CSRF؟" }], rows: [
          ["httpOnly cookie", { en: "Browser, sent automatically", ar: "المتصفح، بيتبعت لوحده" }, { en: "No", ar: "لأ" }, { en: "Yes → SameSite + token", ar: "أيوه ← SameSite و token" }],
          ["localStorage", { en: "JS-readable storage", ar: "تخزين الـ JS يقراه" }, { en: "Yes", ar: "أيوه" }, { en: "No", ar: "لأ" }],
          [{ en: "Memory (+ refresh cookie)", ar: "الميموري (+ refresh cookie)" }, { en: "A JS variable", ar: "متغير JS" }, { en: "Only while the page runs", ar: "بس طول ما الصفحة شغالة" }, { en: "Refresh endpoint needs protection", ar: "الـ refresh endpoint محتاج حماية" }]
        ] },
        { type: "code", code: "// refresh-on-401 with a single shared refresh (pattern)\nlet refreshing: Promise<void> | null = null;\nasync function request(input, init) {\n  let res = await fetch(input, init);\n  if (res.status !== 401) return res;\n  refreshing ??= fetch(\"/auth/refresh\", { method: \"POST\" }).then(() => {}).finally(() => (refreshing = null));\n  await refreshing;                 // everyone waits for the same refresh\n  return fetch(input, init);        // retry once\n}" },
        { type: "projects", items: [{ text: { en: "okoRent: JWT in an httpOnly SameSite=strict cookie set by a server action, middleware checks it before pages load; the token is passed to SignalR through a small context. Smart FAQ: cookie session with session-expired handling.", ar: "okoRent: الـ JWT في كوكي httpOnly و SameSite=strict، وبيتحط من server action. والـ middleware بيتأكد منه قبل الصفحات. والـ token بيتعدّى لـ SignalR عن طريق context صغير. و Smart FAQ: session بالكوكي، ومعالجة لانتهاء الـ session." }, p: "okorent", tab: "decisions", label: "okoRent" }] }
      ],
      say: "I keep tokens out of JavaScript where I can — httpOnly cookies or a BFF — and if a token must live in the client it's short-lived, in memory, with a single shared refresh.",
      interview: [{ q: "How do you handle many parallel requests getting 401 at once?", a: { en: "Share one in-flight refresh promise; every request awaits it and retries once. Without it you fire N refreshes and may invalidate each other's tokens.", ar: "خلي فيه promise واحد بس للـ refresh شغال. وكل request يستناه ويعيد نفسه مرة. من غير كده هتبعت N refresh، وممكن يلغوا الـ tokens بتاعة بعض." },
        follow: [{ q: "How do you log a JWT user out everywhere?", a: { en: "Short access-token lifetimes plus revoking the refresh token server-side (or a token version in the DB). Pure stateless JWTs can't be revoked instantly.", ar: "عمر قصير للـ access token وإلغاء الـ refresh token على السيرفر (أو version للتوكن في الداتابيز). الـ JWT الـ stateless خالص مينفعش يتلغي في ساعتها." } }] }],
      quiz: [{ q: { en: "Can the client trust data inside a JWT payload?", ar: "الـ client يقدر يثق في الداتا اللي جوه الـ JWT؟" }, a: { en: "It can read it (base64), but it's the server that verifies the signature; don't base security decisions on client-decoded claims.", ar: "يقدر يقراها لأنها base64، بس السيرفر هو اللي بيتأكد من التوقيع. فمتبنيش قرارات أمان على claims متفكوكة في الـ client." } }],
      quick: [{ en: "Cookies (httpOnly) or BFF > memory > localStorage; short JWT + rotating refresh; one shared refresh promise.", ar: "الترتيب من الأحسن: كوكيز httpOnly أو BFF، وبعدين الميموري، وبعدين localStorage. و JWT عمره قصير، و refresh token بيتجدد. و promise واحد للـ refresh." }]
    },
    {
      id: "oauth",
      title: { en: "OAuth 2.0, OpenID Connect and PKCE", ar: "OAuth 2.0 و OpenID Connect و PKCE" },
      tldr: { en: "OAuth lets an app act on a user's behalf at another service (scopes, access tokens). OpenID Connect adds identity on top (ID token = who logged in). Browser and mobile apps use the Authorization Code flow with PKCE; the implicit flow is obsolete.", ar: "الـ OAuth بيخلي app يعمل حاجات نيابة عن اليوزر في سيرفس تانية (scopes و access tokens). والـ OpenID Connect بيزوّد الهوية فوقه، والـ ID token بيقول مين اللي دخل. وتطبيقات المتصفح والموبايل بتستخدم Authorization Code مع PKCE. والـ implicit flow خلاص اتلغى." },
      blocks: [
        { type: "list", title: { en: "Authorization Code + PKCE", ar: "Authorization Code مع PKCE" }, items: [
          { en: "App creates a random <code>code_verifier</code> and sends its hash (<code>code_challenge</code>) with the redirect to the provider.", ar: "التطبيق بيعمل <code>code_verifier</code> عشوائي ويبعت الـ hash بتاعه (<code>code_challenge</code>) مع الـ redirect للـ provider." },
          { en: "User logs in and consents; provider redirects back with a short-lived <code>code</code> (+ <code>state</code> to prevent CSRF).", ar: "اليوزر بيسجّل ويوافق. والـ provider بيرجّع بـ <code>code</code> عمره قصير، ومعاه <code>state</code> ضد الـ CSRF." },
          { en: "App exchanges code + verifier for tokens — a stolen code is useless without the verifier.", ar: "التطبيق بيبدل الـ code والـ verifier بالتوكنز — الـ code المسروق ملوش لازمة من غير الـ verifier." },
          { en: "Confidential exchanges (client secret, long-lived refresh) happen on your server.", ar: "التبديلات السرية (client secret، refresh طويل) بتحصل على سيرفرك." }
        ] },
        { type: "projects", items: [
          { text: { en: "ONE14: Strava OAuth with the token exchange done in Firebase Cloud Functions (secret stays server-side).", ar: "ONE14: OAuth مع Strava والـ token exchange بيتعمل في Firebase Cloud Functions (الـ secret بيفضل على السيرفر)." }, p: "one14", tab: "decisions", label: "ONE14" },
          { text: { en: "Edubrain (freelance): Google sign-in via next-auth.", ar: "Edubrain (freelance): تسجيل بـ Google عن طريق next-auth." }, p: "freelance", tab: "decisions", label: "Freelance" }
        ] }
      ],
      say: "For third-party login I use the authorization code flow with PKCE, and anything that needs a client secret runs on the server.",
      interview: [{ q: "OAuth vs OpenID Connect?", a: { en: "OAuth is authorization (access to APIs with scopes). OIDC is authentication on top of it — an ID token with who the user is.", ar: "OAuth للصلاحيات (الوصول لـ APIs بـ scopes). و OIDC للهوية فوقه — ID token فيه المستخدم مين." },
        follow: [{ q: "What does the state parameter protect against?", a: { en: "CSRF on the redirect: the app checks the returned state matches what it sent, so an attacker can't inject their own code.", ar: "CSRF في الـ redirect: التطبيق بيتأكد إن الـ state اللي رجع هو اللي بعته، فالمهاجم مايقدرش يدخل code بتاعه." } }] }],
      quiz: [{ q: { en: "Why PKCE for SPAs and mobile?", ar: "ليه PKCE للـ SPA والموبايل؟" }, a: { en: "They can't keep a client secret; PKCE binds the code to the app instance that started the flow.", ar: "مايقدروش يخبّوا client secret. والـ PKCE بيربط الـ code بالنسخة اللي بدأت العملية." } }],
      quick: [{ en: "OAuth = access, OIDC = identity; Auth Code + PKCE + state; secrets on the server.", ar: "الـ OAuth للوصول، والـ OIDC للهوية. واستخدم Auth Code و PKCE و state. والأسرار على السيرفر." }]
    },
    {
      id: "authorization-ui",
      title: { en: "Authorization: the UI is not a security boundary", ar: "الصلاحيات: الواجهة مش حماية" },
      tldr: { en: "Hiding a button or route improves UX; it doesn't secure anything — anyone can call the API. The server must check every request. On the client, drive what you show from capabilities the server sends, not hard-coded role names.", ar: "إنك تخبي زرار أو route بيحسّن التجربة، بس مش بيأمّن حاجة، لأن أي حد يقدر ينادي الـ API. السيرفر لازم يتأكد من كل request. وفي الفرونت، خلي اللي بيظهر معتمد على capabilities جاية من السيرفر، مش على أسماء roles مكتوبة في الكود." },
      blocks: [
        { type: "code", code: "// UI: show what you may do (from the session)\n{hasCapability(session.capabilities, CAPABILITY.submissionPublish) && <PublishButton />}\n\n// Route guard: redirect early, still not security\n<Route element={<RequireCapability cap=\"users.manage\" />}>…</Route>\n\n// Server: the real check, every time\nPOST /submissions/42/publish → 403 if the caller lacks submission.publish" },
        { type: "projects", items: [{ text: { en: "Smart FAQ (capabilities, guards, MFA for admins), Spectra (user permissions), okoRent (role-based middleware), Boost-KGoal (admin guard with tests).", ar: "Smart FAQ (capabilities و guards و MFA للأدمن)، و Spectra (صلاحيات اليوزرز)، و okoRent (middleware حسب الـ role)، و Boost-KGoal (admin guard بـ tests)." }, p: "smartfaq", tab: "decisions", label: "Smart FAQ" }] }
      ],
      say: "The UI hides what you can't do for a better experience, but the server re-checks every request — the frontend is never the security boundary.",
      interview: [{ q: "How do you implement role-based access in a React app?", a: { en: "Session from the API lists capabilities; navigation, route guards and buttons check them through one helper; 403 from the API shows an access-denied state. Permissions live on the server and the UI follows.", ar: "الـ session اللي جاية من الـ API فيها capabilities. والـ navigation والـ guards والزراير بيتأكدوا منها بـ helper واحد. والـ 403 من الـ API بيعرض حالة «ممنوع». يعني الصلاحيات على السيرفر، والواجهة بتمشي وراها." } }],
      quiz: [{ q: { en: "Is a hidden admin route safe?", ar: "الـ admin route المستخبي آمن؟" }, a: { en: "No — the API must enforce access.", ar: "لأ — الـ API لازم يفرض الصلاحية." } }],
      quick: [{ en: "UI hides, server enforces; capabilities from the session; handle 403 gracefully.", ar: "الواجهة بتخبي، والسيرفر هو اللي بيفرض. والـ capabilities جاية من الـ session. واتعامل مع الـ 403 بهدوء." }]
    },
    {
      id: "secrets-supply-chain",
      title: { en: "Secrets, env vars, clickjacking and dependencies", ar: "الأسرار والـ env vars والـ clickjacking والمكتبات" },
      tldr: { en: "Anything shipped to the browser is public — <code>VITE_*</code> / <code>NEXT_PUBLIC_*</code> variables included; keep secrets on the server. Stop clickjacking with <code>frame-ancestors</code>. Treat npm packages as code you run: lockfiles, audits, few dependencies.", ar: "أي حاجة بتتبعت للمتصفح علنية، حتى متغيرات <code>VITE_*</code> و <code>NEXT_PUBLIC_*</code>. فخلي الأسرار على السيرفر. وامنع الـ clickjacking بـ <code>frame-ancestors</code>. واتعامل مع مكتبات npm على إنها كود إنت بتشغّله: lockfiles، و audits، ومكتبات قليلة." },
      blocks: [
        { type: "list", items: [
          { en: "API keys for paid services (AI, maps with write access) → call them from your server or an edge function.", ar: "مفاتيح الخدمات المدفوعة (AI، خرايط بصلاحية كتابة) ← ناديها من السيرفر أو edge function." },
          { en: "<code>Content-Security-Policy: frame-ancestors 'none'</code> (or X-Frame-Options: DENY) so other sites can't frame you.", ar: "<code>Content-Security-Policy: frame-ancestors 'none'</code> (أو X-Frame-Options: DENY) علشان مواقع تانية ماتحطكش في iframe." },
          { en: "Commit the lockfile, run <code>npm audit</code> / Dependabot, pin CI installs (<code>npm ci</code>).", ar: "اعمل commit للـ lockfile، وشغّل <code>npm audit</code> أو Dependabot، وثبّت الـ installs في الـ CI (<code>npm ci</code>)." },
          { en: "Never commit <code>.env</code> files or keys; rotate anything that leaked.", ar: "عمرك ما تعمل commit لملفات <code>.env</code> أو مفاتيح. ولو حاجة اتسربت، غيّرها على طول." }
        ] },
        { type: "projects", items: [{ text: { en: "Kalima calls Gemini through a Supabase edge function (key server-side, shared cache, daily limit). Smart FAQ applied non-breaking npm audit fixes.", ar: "Kalima بينادي Gemini عن طريق Supabase edge function (المفتاح على السيرفر، وكاش مشترك، وحد يومي). و Smart FAQ طبق إصلاحات npm audit اللي مش بتكسر حاجة." }, p: "kalima", tab: "decisions", label: "Kalima" }] }
      ],
      say: "Everything in the bundle is public, so secret keys stay behind a server or edge function, and I treat dependencies as code we ship.",
      interview: [{ q: "Can you hide an API key in a React app's env vars?", a: { en: "No. Build-time env vars are inlined into the JS bundle. Put the call behind your backend or an edge function and rate-limit it there.", ar: "لأ. الـ env vars وقت الـ build بتتحط جوه الـ JS bundle. حط النداء ورا الباك إند أو edge function وحط حد للـ requests هناك." } }],
      quiz: [{ q: { en: "Header that stops your site being framed?", ar: "الـ header اللي بيمنع موقعك يتحط في iframe؟" }, a: { en: "CSP frame-ancestors (or X-Frame-Options).", ar: "CSP frame-ancestors (أو X-Frame-Options)." } }],
      quick: [{ en: "Bundle = public; secrets via server/edge; frame-ancestors; lockfile + audit.", ar: "الـ bundle علني، والأسرار تعدّي عن طريق السيرفر أو الـ edge. و frame-ancestors. و lockfile و audit." }]
    }
  ]
});
