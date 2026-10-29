// Routing — written 2026-10-29.
STUDY.fill("routing", {
  intro: { en: "Client vs server routing, React Router's nested layouts and loaders, route guards, the URL as state, and the Next.js App Router's file-based routes.", ar: "الـ routing في الـ client ولا السيرفر، والـ layouts المتداخلة والـ loaders في React Router، والـ route guards، والـ URL كـ state، و routes الملفات في Next.js App Router." },
  topics: [
    {
      id: "client-vs-server",
      title: { en: "Client-side vs server-side routing", ar: "Routing في الـ client ولا السيرفر" },
      tldr: { en: "Server routing: every navigation loads a new HTML page. Client routing (SPA): JS intercepts links, updates the URL with the History API and renders the new screen without a reload. Frameworks like Next.js mix both: server-render the first page, then navigate on the client.", ar: "Routing السيرفر: كل تنقل بيحمل صفحة HTML جديدة. Routing الـ client (SPA): الـ JS بيمسك اللينكات، ويحدّث الـ URL بالـ History API، ويرسم الشاشة الجديدة من غير reload. و frameworks زي Next.js بتخلط الاتنين: أول صفحة من السيرفر، وبعدين التنقل في الـ client." },
      blocks: [
        { type: "pitfalls", items: [
          { en: "SPA on a static host: refreshing <code>/orders/42</code> gives 404 unless the server falls back to <code>index.html</code>.", ar: "SPA على static host: الـ refresh على <code>/orders/42</code> بيدي 404 إلا لو السيرفر بيرجع <code>index.html</code>." },
          { en: "Manage focus and scroll on navigation (move focus to the main heading) — screen readers don't notice client navigations.", ar: "اتحكم في الـ focus والـ scroll مع التنقل (حرك الـ focus للعنوان الرئيسي) — قارئ الشاشة مش بيحس بتنقل الـ client." }
        ] }
      ],
      say: "SPAs route on the client with the History API; I make sure the server falls back to index.html and that focus moves to the new page's heading.",
      interview: [{ q: "Why does my SPA 404 on refresh in production?", a: { en: "The server looks for a file at that path. Configure a rewrite of unknown paths to index.html (Vercel/Netlify rewrites, nginx try_files).", ar: "السيرفر بيدور على ملف في المسار ده. اعمل rewrite لأي مسار مش معروف لـ index.html (rewrites في Vercel أو Netlify، أو try_files في nginx)." } }],
      quiz: [{ q: { en: "API that lets a SPA change the URL without reloading?", ar: "الـ API اللي بيخلي الـ SPA يغير الـ URL من غير reload؟" }, a: { en: "History API (pushState/replaceState).", ar: "الـ History API (pushState و replaceState)." } }],
      quick: [{ en: "SPA = History API + client render; rewrite to index.html; manage focus/scroll.", ar: "SPA = History API و render في الـ client؛ rewrite لـ index.html؛ اتحكم في الـ focus والـ scroll." }]
    },
    {
      id: "react-router",
      title: { en: "React Router: nested routes, layouts, loaders", ar: "React Router: routes متداخلة و layouts و loaders" },
      tldr: { en: "Routes nest: a parent renders shared layout and an <code>&lt;Outlet /&gt;</code> for the child. Data routers add <code>loader</code> (fetch before render), <code>action</code> (handle form posts), <code>errorElement</code> and lazy route modules.", ar: "الـ routes بتتداخل: الأب بيرسم الـ layout المشترك و <code>&lt;Outlet /&gt;</code> للابن. والـ data routers بتزود <code>loader</code> (هات الداتا قبل الـ render)، و <code>action</code> (تعامل مع الفورم)، و <code>errorElement</code>، و route modules بـ lazy." },
      blocks: [
        { type: "code", code: "const router = createBrowserRouter([\n  { element: <AuthLayout />, children: [{ path: \"/sign-in\", element: <SignIn /> }] },\n  {\n    element: <RequireSession />,                  // guard\n    errorElement: <RouteError />,\n    children: [{\n      element: <AppShell />,                       // sidebar + header + <Outlet />\n      children: [\n        { index: true, element: <Home /> },\n        { path: \"departments/:id\", element: <Department /> },\n        { path: \"admin\", element: <RequireCapability cap=\"users.manage\" />, children: [{ path: \"users\", lazy: () => import(\"./admin/users\") }] },\n      ],\n    }],\n  },\n  { path: \"*\", element: <NotFound /> },\n]);" },
        { type: "projects", items: [{ text: { en: "Smart FAQ: route layouts per role, role guards, detail routes with link builders, error/404/403 pages, and the route tree reused by tests.", ar: "Smart FAQ: layouts للـ routes حسب الـ role، و guards، و detail routes بـ link builders، وصفحات error و 404 و 403، وشجرة الـ routes نفسها مستخدمة في الـ tests." }, p: "smartfaq", tab: "overview", label: "Smart FAQ" }] }
      ],
      say: "I nest routes so layouts render once with an Outlet, guard groups of routes in one layout route, and lazy-load heavy sections.",
      interview: [{ q: "Loaders vs React Query?", a: { en: "Loaders start fetching before render (no waterfall) and tie data to navigation; React Query gives caching and background refresh. They combine well: the loader calls <code>queryClient.ensureQueryData</code> and the component uses useQuery.", ar: "الـ loaders بتبدأ تجيب الداتا قبل الـ render (من غير waterfall) وبتربط الداتا بالتنقل؛ و React Query بيدي الكاش والتحديث في الخلفية. وبيتركبوا كويس: الـ loader بينادي <code>queryClient.ensureQueryData</code> والـ component بيستخدم useQuery." } }],
      quiz: [{ q: { en: "Where does a child route render?", ar: "الـ route الابن بيترسم فين؟" }, a: { en: "In the parent's &lt;Outlet /&gt;.", ar: "في الـ &lt;Outlet /&gt; بتاع الأب." } }],
      quick: [{ en: "Nested routes + Outlet; layout routes as guards; loaders + ensureQueryData; lazy routes.", ar: "Routes متداخلة و Outlet؛ layout routes كـ guards؛ loaders و ensureQueryData؛ routes بـ lazy." }]
    },
    {
      id: "guards",
      title: { en: "Route guards and auth redirects", ar: "الـ Route guards وتحويلات الـ auth" },
      tldr: { en: "A guard route reads the session and either renders <code>&lt;Outlet /&gt;</code> or redirects (to sign-in with a return URL, or to access denied). In Next.js, middleware can redirect before the page renders. Guards are UX — the API still enforces access.", ar: "الـ guard route بيقرا الـ session ويا يرسم <code>&lt;Outlet /&gt;</code> يا يحوّل (للـ sign-in ومعاه رابط الرجوع، أو لصفحة ممنوع). وفي Next.js، الـ middleware يقدر يحوّل قبل ما الصفحة تترسم. والـ guards للتجربة بس — الـ API لسه هو اللي بيفرض الصلاحية." },
      blocks: [
        { type: "code", code: "function RequireSession() {\n  const { data: session, isPending } = useSession();\n  const location = useLocation();\n  if (isPending) return <ShellSkeleton />;\n  if (!session) return <Navigate to={`/sign-in?next=${encodeURIComponent(location.pathname)}`} replace />;\n  return <Outlet />;\n}\n\n// Next.js middleware\nexport function middleware(req: NextRequest) {\n  if (!req.cookies.get(\"session\")) return NextResponse.redirect(new URL(\"/login\", req.url));\n}" },
        { type: "pitfalls", items: [{ en: "Open redirect: validate <code>next</code> is a same-site path before navigating to it.", ar: "Open redirect: اتأكد إن <code>next</code> مسار في نفس الموقع قبل ما تروحله." }] },
        { type: "projects", items: [{ text: { en: "okoRent: Next.js middleware reads the httpOnly cookie and redirects by role; Boost-KGoal: AdminAuthGuard with tests.", ar: "okoRent: middleware في Next.js بيقرا الكوكي httpOnly ويحوّل حسب الـ role؛ و Boost-KGoal: AdminAuthGuard بـ tests." }, p: "okorent", tab: "decisions", label: "okoRent" }] }
      ],
      say: "Guards are layout routes or middleware that redirect with a validated return URL; they shape the experience while the API enforces the rules.",
      interview: [{ q: "How do you return the user to the page they wanted after login?", a: { en: "Pass the original path as <code>next</code>, check it's a relative same-site path, and navigate there with replace after sign-in.", ar: "ابعت المسار الأصلي كـ <code>next</code>، واتأكد إنه مسار relative في نفس الموقع، وروحله بـ replace بعد الـ sign-in." } }],
      quiz: [{ q: { en: "Why replace in the redirect to sign-in?", ar: "ليه replace في التحويل للـ sign-in؟" }, a: { en: "So Back doesn't return to the protected page and bounce again.", ar: "علشان الـ Back ميرجعش للصفحة المحمية ويتحول تاني." } }],
      quick: [{ en: "Guard = layout route/middleware; ?next= validated; replace; API still enforces.", ar: "الـ Guard = layout route أو middleware؛ ?next= متأكد منه؛ replace؛ والـ API لسه بيفرض." }]
    },
    {
      id: "url-state",
      title: { en: "The URL as state", ar: "الـ URL كـ state" },
      tldr: { en: "Anything that defines “what the user is looking at” — filters, sort, page, tab, selected item — belongs in the URL: it survives refresh, works with Back, and can be shared. Validate values from the URL; keep private text (search with personal data) out of it.", ar: "أي حاجة بتحدد «المستخدم بيبص على إيه» — فلاتر، ترتيب، صفحة، تاب، عنصر مختار — مكانها الـ URL: بتعيش بعد الـ refresh، وبتشتغل مع الـ Back، وتتبعت. اتأكد من القيم اللي جاية من الـ URL؛ وخلي النص الخاص (بحث فيه بيانات شخصية) براه." },
      blocks: [
        { type: "code", code: "// nuqs: typed URL state (Next.js / React Router)\nconst [page, setPage] = useQueryState(\"page\", parseAsInteger.withDefault(1));\nconst [status, setStatus] = useQueryState(\"status\", parseAsStringLiteral([\"all\", \"draft\", \"published\"]).withDefault(\"all\"));\n// the query key includes them → each filter combination has its own cache entry\nuseQuery({ queryKey: [\"articles\", { page, status }], queryFn: … });" },
        { type: "projects", items: [
          { text: { en: "Smart FAQ: custom useUrlFilters (ignores invalid values, replace not push, search words never in the URL for privacy).", ar: "Smart FAQ: useUrlFilters مخصوص (بيتجاهل القيم الغلط، replace مش push، وكلمات البحث عمرها ما تدخل الـ URL علشان الخصوصية)." }, p: "smartfaq", tab: "decisions", label: "Smart FAQ" },
          { text: { en: "okoRent: nuqs + a hand-written useQueryParams — a lesson in picking one approach.", ar: "okoRent: nuqs و useQueryParams مكتوب بإيده — درس في إنك تختار طريقة واحدة." }, p: "okorent", tab: "decisions", label: "okoRent" }
        ] }
      ],
      say: "View state lives in the URL with validated values and becomes part of the query key, except text that may contain personal data.",
      interview: [{ q: "How do you keep URL and UI in sync without bugs?", a: { en: "Make the URL the single source: read values from it (parsed and validated), write through one helper, and never copy them into local state.", ar: "خلي الـ URL مصدر واحد: اقرا منه (parsed و validated)، واكتب عن طريق helper واحد، وعمرك ما تنسخها في state محلي." } }],
      quiz: [{ q: { en: "Should the page number be in the URL?", ar: "رقم الصفحة يتحط في الـ URL؟" }, a: { en: "Yes — refresh and Back keep it.", ar: "أيوه — الـ refresh والـ Back بيحافظوا عليه." } }],
      quick: [{ en: "URL = view state; validate; one writer; part of the query key; no personal text.", ar: "الـ URL = حالة العرض؛ validate؛ كاتب واحد؛ جزء من الـ query key؛ من غير نص شخصي." }]
    },
    {
      id: "next-routing",
      title: { en: "Next.js App Router routing", ar: "الـ Routing في Next.js App Router" },
      tldr: { en: "Folders are routes: <code>page.tsx</code> is the screen, <code>layout.tsx</code> wraps children and persists, <code>loading.tsx</code>/<code>error.tsx</code>/<code>not-found.tsx</code> are boundaries. <code>[id]</code> = dynamic, <code>(group)</code> = organise without changing the URL, <code>@slot</code> = parallel routes, <code>(.)x</code> = intercepting (modals).", ar: "الفولدرات هي الـ routes: <code>page.tsx</code> هي الشاشة، و <code>layout.tsx</code> بيلف الأولاد ويفضل موجود، و <code>loading.tsx</code> و <code>error.tsx</code> و <code>not-found.tsx</code> حدود. و <code>[id]</code> = dynamic، و <code>(group)</code> = ترتيب من غير ما يغير الـ URL، و <code>@slot</code> = parallel routes، و <code>(.)x</code> = intercepting (modals)." },
      blocks: [
        { type: "code", code: "app/\n  (marketing)/page.tsx            → /\n  (app)/layout.tsx                → shared app shell for the group\n  (app)/orders/page.tsx           → /orders\n  (app)/orders/[id]/page.tsx      → /orders/42      (params.id)\n  (app)/orders/loading.tsx        → Suspense fallback for the segment\n  (app)/orders/error.tsx          → error boundary (\"use client\")\n  api/webhooks/route.ts           → route handler (GET/POST)\n  middleware.ts                   → runs before matching routes" },
        { type: "projects", items: [
          { text: { en: "okoRent: route groups for four portals with their own layouts; Bites: Next.js 14 App Router; Marina (Aquadic): Pages Router.", ar: "okoRent: route groups لأربع بوابات وكل واحدة ليها layout؛ و Bites: Next.js 14 App Router؛ و Marina (Aquadic): Pages Router." }, p: "okorent", tab: "decisions", label: "okoRent" }
        ] }
      ],
      say: "In the App Router I use route groups for separate layouts per area, loading and error files as boundaries, and middleware for early redirects.",
      interview: [{ q: "layout.tsx vs template.tsx?", a: { en: "A layout persists across navigations between its children (state kept, no remount). A template remounts on every navigation — for enter animations or per-page effects.", ar: "الـ layout بيفضل موجود وانت بتتنقل بين أولاده (الـ state بيفضل، من غير remount). والـ template بيعمل remount مع كل تنقل — للأنيميشن أو effects لكل صفحة." } }],
      quiz: [{ q: { en: "Does (admin) appear in the URL?", ar: "(admin) بيظهر في الـ URL؟" }, a: { en: "No — route groups don't.", ar: "لأ — الـ route groups مش بتظهر." } }],
      quick: [{ en: "page / layout / loading / error / not-found; [id] dynamic; (group); @slot parallel; (.) intercept.", ar: "page و layout و loading و error و not-found؛ [id] dynamic؛ (group)؛ @slot parallel؛ (.) intercept." }]
    }
  ]
});
