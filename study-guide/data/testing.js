// Testing — written 2026-10-29.
STUDY.fill("testing", {
  intro: { en: "Tests that give confidence without slowing you down: the testing trophy, unit tests with Vitest/Jest, Testing Library's philosophy, mocking the network, E2E with Playwright, and what is worth testing.", ar: "Tests بتديك ثقة من غير ما تبطّأك: الـ testing trophy، و unit tests بـ Vitest و Jest، وفلسفة Testing Library، وعمل mock للشبكة، و E2E بـ Playwright، وإيه اللي يستاهل يتعمله test." },
  topics: [
    {
      id: "strategy",
      title: { en: "Test strategy: pyramid vs trophy", ar: "استراتيجية الـ tests: pyramid ولا trophy" },
      tldr: { en: "Static checks (TypeScript, lint) catch typos for free. Unit tests cover pure logic. <b>Integration/component tests</b> — rendering real components with a fake network — give the most confidence per effort for frontends. A few E2E tests cover critical journeys through the real stack.", ar: "الفحوصات الـ static (TypeScript و lint) بتمسك الأخطاء الصغيرة ببلاش. والـ unit tests بتغطي المنطق الـ pure. و<b>الـ integration أو component tests</b> — بترسم components حقيقية مع شبكة مزيفة — بتدي أكتر ثقة مقابل المجهود في الفرونت. وشوية E2E بيغطوا الرحلات المهمة على الـ stack الحقيقي." },
      blocks: [
        { type: "compare", cols: [{ en: "Layer", ar: "الطبقة" }, { en: "Tool", ar: "الأداة" }, { en: "Covers", ar: "بيغطي" }, { en: "Speed", ar: "السرعة" }], rows: [
          [{ en: "Static", ar: "Static" }, "TypeScript, ESLint/oxlint", { en: "Types, obvious bugs", ar: "Types وأخطاء واضحة" }, { en: "Instant", ar: "فوري" }],
          ["Unit", "Vitest / Jest", { en: "Pure functions, hooks, reducers", ar: "Functions pure، hooks، reducers" }, { en: "ms", ar: "ms" }],
          [{ en: "Integration / component", ar: "Integration / component" }, "Testing Library + fake fetch/MSW", { en: "Screens and flows as users use them", ar: "الشاشات والـ flows زي المستخدم" }, { en: "Fast", ar: "سريع" }],
          ["E2E", "Playwright / Cypress", { en: "Critical journeys, real browser + backend", ar: "الرحلات المهمة، متصفح وباك إند حقيقي" }, { en: "Slow", ar: "بطيء" }],
          [{ en: "Visual / a11y", ar: "شكلي / a11y" }, "Storybook, Chromatic, axe", { en: "Looks and accessibility", ar: "الشكل والـ accessibility" }, { en: "Medium", ar: "متوسط" }]
        ] },
        { type: "projects", items: [{ text: { en: "Smart FAQ: tsc + oxlint, 551 Vitest/Testing Library tests (request layer, query client, auth journeys through the real routes, review workflow), Storybook with a11y.", ar: "Smart FAQ: tsc و oxlint، و 551 test بـ Vitest و Testing Library (طبقة الـ requests، والـ query client، ورحلات الـ auth على الـ routes الحقيقية، وworkflow المراجعة)، و Storybook بـ a11y." }, p: "smartfaq", tab: "decisions", label: "Smart FAQ" }] }
      ],
      say: "Most of my confidence comes from component tests that render real screens against a fake network, with types and lint underneath and a few E2E journeys on top.",
      interview: [{ q: "How do you decide what to test?", a: { en: "Test behaviour users and other code depend on: critical flows (sign-in, checkout, publish), business rules (money, permissions), shared building blocks (request layer, design system), and every bug fixed (a regression test). Skip implementation details and trivial markup.", ar: "اختبر السلوك اللي المستخدمين والكود التاني معتمد عليه: الـ flows المهمة (sign-in، checkout، نشر)، وقواعد البيزنس (فلوس، صلاحيات)، والأجزاء المشتركة (طبقة الـ requests، الـ design system)، وكل bug اتصلح (regression test). وعدّي تفاصيل التنفيذ والـ markup البسيط." } }],
      quiz: [{ q: { en: "Best effort/confidence ratio for frontends?", ar: "أحسن نسبة مجهود/ثقة في الفرونت؟" }, a: { en: "Integration/component tests.", ar: "الـ Integration أو component tests." } }],
      quick: [{ en: "Static → unit (logic) → component/integration (most) → few E2E; test behaviour, not implementation.", ar: "Static ← unit (المنطق) ← component/integration (الأكتر) ← شوية E2E؛ اختبر السلوك مش التنفيذ." }]
    },
    {
      id: "unit",
      title: { en: "Unit tests with Vitest / Jest", ar: "الـ Unit tests بـ Vitest و Jest" },
      tldr: { en: "Arrange → act → assert. Test pure functions with many cases (<code>it.each</code>), hooks with <code>renderHook</code>, time with fake timers, and keep tests independent. Vitest is Jest-compatible and shares Vite's config — faster for Vite apps.", ar: "Arrange ← act ← assert. اختبر الـ functions الـ pure بحالات كتير (<code>it.each</code>)، والـ hooks بـ <code>renderHook</code>، والوقت بـ fake timers، وخلي كل test مستقل. و Vitest متوافق مع Jest وبيشارك config بتاع Vite — أسرع لتطبيقات Vite." },
      blocks: [
        { type: "code", code: "describe(\"retryDelay\", () => {\n  it.each([[0, 1000], [1, 2000], [2, 4000], [5, 8000]])(\"attempt %i waits %i ms\", (attempt, ms) => {\n    expect(retryDelay(attempt, new Error())).toBe(ms);\n  });\n  it(\"uses Retry-After when present\", () => {\n    expect(retryDelay(0, new ApiError(\"request.rate_limited\", { status: 429, retryAfter: 3 }))).toBe(3000);\n  });\n});\n\nit(\"debounces\", () => {\n  vi.useFakeTimers();\n  const { result, rerender } = renderHook(({ v }) => useDebouncedValue(v, 300), { initialProps: { v: \"a\" } });\n  rerender({ v: \"ab\" });\n  expect(result.current).toBe(\"a\");\n  act(() => vi.advanceTimersByTime(300));\n  expect(result.current).toBe(\"ab\");\n});" },
        { type: "projects", items: [{ text: { en: "Smart FAQ tests lib helpers (paging, time zone, password strength, mark-terms, form-errors, article HTML) and hooks (useDebouncedValue); AHS's formula utils had a spec file.", ar: "Smart FAQ بيختبر helpers الـ lib (paging، time zone، قوة الباسورد، mark-terms، form-errors، HTML المقالات) والـ hooks (useDebouncedValue)؛ و utils المعادلات في AHS كان ليها spec file." }, p: "smartfaq", tab: "interview", label: "Smart FAQ" }] }
      ],
      say: "Pure logic gets table-driven unit tests, hooks get renderHook with fake timers, and every test sets up its own state.",
      interview: [{ q: "Why Vitest over Jest in a Vite project?", a: { en: "Same API, but it reuses Vite's config and transforms (no separate Babel/ts-jest setup), runs ESM natively, and is fast in watch mode.", ar: "نفس الـ API، بس بيستخدم config و transforms بتوع Vite (من غير Babel أو ts-jest لوحده)، وبيشغل ESM أصلًا، وسريع في الـ watch mode." } }],
      quiz: [{ q: { en: "Test a 5-second timeout without waiting 5 seconds?", ar: "تختبر timeout 5 ثواني من غير ما تستنى 5 ثواني؟" }, a: { en: "Fake timers (vi.useFakeTimers + advanceTimersByTime).", ar: "Fake timers (vi.useFakeTimers و advanceTimersByTime)." } }],
      quick: [{ en: "AAA; it.each for cases; renderHook; fake timers; independent tests; Vitest = Jest API on Vite.", ar: "AAA؛ it.each للحالات؛ renderHook؛ fake timers؛ tests مستقلة؛ Vitest = API بتاع Jest على Vite." }]
    },
    {
      id: "rtl",
      title: { en: "Testing Library: test like a user", ar: "Testing Library: اختبر زي المستخدم" },
      tldr: { en: "“The more your tests resemble the way your software is used, the more confidence they give.” Query by role and name (<code>getByRole</code>), then label, then text — <code>getByTestId</code> last. Interact with <code>userEvent</code>, wait with <code>findBy*</code>, assert what the user sees.", ar: "«كل ما الـ tests تشبه طريقة استخدام البرنامج، كل ما تديك ثقة أكتر.» استعلم بالـ role والاسم (<code>getByRole</code>)، وبعدين الـ label، وبعدين النص — و <code>getByTestId</code> في الآخر. اتفاعل بـ <code>userEvent</code>، واستنى بـ <code>findBy*</code>، واتأكد من اللي المستخدم شايفه." },
      blocks: [
        { type: "code", code: "it(\"returns a draft with feedback\", async () => {\n  const user = userEvent.setup();\n  server.use(on(\"POST /submissions/42/return\", () => json({ status: \"returned\" })));\n  renderApp(\"/review/42\", { session: admin });\n\n  await user.click(await screen.findByRole(\"button\", { name: /return for changes/i }));\n  await user.type(screen.getByRole(\"textbox\", { name: /feedback/i }), \"Add the source link\");\n  await user.click(screen.getByRole(\"button\", { name: /^return$/i }));\n\n  expect(await screen.findByRole(\"status\")).toHaveTextContent(/returned/i);\n});" },
        { type: "compare", cols: [{ en: "Query", ar: "الاستعلام" }, { en: "Not found", ar: "مش موجود" }, { en: "Use for", ar: "استخدمه لـ" }], rows: [
          ["getBy*", { en: "Throws", ar: "بيرمي error" }, { en: "Must be there now", ar: "لازم يبقى موجود دلوقتي" }],
          ["queryBy*", { en: "Returns null", ar: "بيرجع null" }, { en: "Asserting something is NOT there", ar: "تتأكد إن حاجة مش موجودة" }],
          ["findBy*", { en: "Rejects after waiting", ar: "بيفشل بعد ما يستنى" }, { en: "Appears asynchronously", ar: "بيظهر بعدين (async)" }]
        ] },
        { type: "pitfalls", items: [{ en: "Testing implementation (state values, class names, internal function calls) — tests break on refactors that don't change behaviour.", ar: "اختبار التنفيذ (قيم الـ state، أسماء الـ classes، نداءات داخلية) — الـ tests بتبوظ مع refactor مش بيغير السلوك." }] }
      ],
      say: "My component tests query by role and accessible name, click with userEvent and assert what the user would see — so they double as accessibility checks and survive refactors.",
      interview: [{ q: "getBy vs queryBy vs findBy?", a: { en: "getBy throws if missing (sync). queryBy returns null (for “not present” assertions). findBy waits and retries (for async UI).", ar: "getBy بيرمي error لو مش موجود (sync). و queryBy بيرجع null (لتأكيد «مش موجود»). و findBy بيستنى ويعيد (للـ UI الـ async)." },
        follow: [{ q: "userEvent vs fireEvent?", a: { en: "userEvent simulates the full interaction (focus, keydown, input, click) like a real user; fireEvent dispatches a single event.", ar: "userEvent بيقلد التفاعل كله (focus، keydown، input، click) زي مستخدم حقيقي؛ و fireEvent بيبعت event واحد." } }] }],
      quiz: [{ q: { en: "Assert an error message disappeared?", ar: "تتأكد إن رسالة خطأ اختفت؟" }, a: { en: "expect(screen.queryByRole(\"alert\")).not.toBeInTheDocument() (or waitForElementToBeRemoved).", ar: "expect(screen.queryByRole(\"alert\")).not.toBeInTheDocument() (أو waitForElementToBeRemoved)." } }],
      quick: [{ en: "getByRole first; userEvent; findBy for async; queryBy for absence; assert what users see.", ar: "getByRole الأول؛ userEvent؛ findBy للـ async؛ queryBy للغياب؛ اتأكد من اللي المستخدم شايفه." }]
    },
    {
      id: "mocking",
      title: { en: "Mocking the network (MSW vs fake fetch vs module mocks)", ar: "Mock للشبكة (MSW ولا fake fetch ولا module mocks)" },
      tldr: { en: "Mock at the network edge, not inside your app: MSW intercepts requests (works in tests, Storybook and the browser); a fake <code>fetch</code> does the same in tests. Mocking your own hooks/modules skips the code you most need to test (client, cache, error handling).", ar: "اعمل mock عند حافة الشبكة، مش جوه التطبيق: MSW بيمسك الـ requests (بيشتغل في الـ tests و Storybook والمتصفح)؛ و <code>fetch</code> مزيف بيعمل نفس الحاجة في الـ tests. أما إنك تعمل mock للـ hooks أو الـ modules بتاعتك بيعدّي الكود اللي محتاج تختبره أكتر حاجة (الـ client، الكاش، التعامل مع الأخطاء)." },
      blocks: [
        { type: "code", code: "// MSW\nexport const handlers = [\n  http.get(\"/api/v1/articles\", () => HttpResponse.json({ items: [article()], nextCursor: null })),\n  http.post(\"/api/v1/articles/:id/publish\", () => HttpResponse.json(problem(\"access.denied\"), { status: 403 })),\n];\nconst server = setupServer(...handlers);\nbeforeAll(() => server.listen()); afterEach(() => server.resetHandlers()); afterAll(() => server.close());" },
        { type: "projects", items: [{ text: { en: "Smart FAQ replaced only <code>fetch</code> with a fake API that speaks the contract's shapes and RFC 9457 error codes — tests run the real client, query client and routes.", ar: "Smart FAQ بدّل الـ <code>fetch</code> بس بـ API مزيف بيتكلم بأشكال الـ contract وأكواد أخطاء RFC 9457 — فالـ tests بتشغل الـ client والـ query client والـ routes الحقيقيين." }, p: "smartfaq", tab: "decisions", label: "Smart FAQ" }] }
      ],
      say: "I mock at the network boundary so tests exercise the real request layer, caching and error handling — never by mocking my own hooks.",
      interview: [{ q: "Why not jest.mock(\"./useOrders\")?", a: { en: "Then the test never runs the hook, the request code, the cache, retries or error mapping — the parts most likely to break. Mock the network response instead.", ar: "كده الـ test عمره ما هيشغل الـ hook ولا كود الـ request ولا الكاش ولا الـ retries ولا تحويل الأخطاء — الأجزاء اللي غالبًا بتبوظ. اعمل mock لرد الشبكة بداله." } }],
      quiz: [{ q: { en: "One React Query QueryClient for all tests?", ar: "QueryClient واحد لكل الـ tests؟" }, a: { en: "No — a fresh client per test (retry: false) so caches don't leak between tests.", ar: "لأ — client جديد لكل test (retry: false) علشان الكاش ميتسربش بين الـ tests." } }],
      quick: [{ en: "Mock the network (MSW/fake fetch), not your modules; fresh QueryClient per test; contract-shaped responses.", ar: "Mock للشبكة (MSW أو fake fetch) مش للـ modules؛ QueryClient جديد لكل test؛ ردود بشكل الـ contract." }]
    },
    {
      id: "e2e",
      title: { en: "E2E with Playwright (and Cypress)", ar: "E2E بـ Playwright (و Cypress)" },
      tldr: { en: "E2E tests drive a real browser through the real app — keep them few and focused on journeys that must never break (sign in, pay, publish). Playwright: multi-browser, parallel, auto-waiting, traces; Cypress: great DX, runs inside the browser.", ar: "الـ E2E tests بتشغل متصفح حقيقي على التطبيق الحقيقي — خليها قليلة ومركزة على الرحلات اللي عمرها ما تبوظ (sign in، دفع، نشر). Playwright: متصفحات كتير، بالتوازي، بيستنى لوحده، و traces؛ و Cypress: تجربة مطور حلوة، وبيشتغل جوه المتصفح." },
      blocks: [
        { type: "code", code: "test(\"admin publishes an article\", async ({ page }) => {\n  await page.goto(\"/sign-in\");\n  await page.getByLabel(\"Email\").fill(process.env.E2E_ADMIN!);\n  await page.getByLabel(\"Password\").fill(process.env.E2E_PASSWORD!);\n  await page.getByRole(\"button\", { name: \"Sign in\" }).click();\n  await page.getByRole(\"link\", { name: \"Review queue\" }).click();\n  await page.getByRole(\"row\", { name: /onboarding/i }).click();\n  await page.getByRole(\"button\", { name: \"Publish\" }).click();\n  await expect(page.getByText(\"Published\")).toBeVisible();\n});" },
        { type: "pitfalls", items: [{ en: "Flaky tests from fixed sleeps or shared data — use auto-waiting assertions and seed isolated data per test.", ar: "Tests بتفشل أحيانًا بسبب sleeps ثابتة أو داتا مشتركة — استخدم assertions بتستنى لوحدها وحضّر داتا معزولة لكل test." }] },
        { type: "projects", items: [{ text: { en: "Playwright is in Smart FAQ (as Vitest's browser runner) and in Zeustra's repo; a real E2E suite on a public repo is a good gap to close.", ar: "Playwright موجود في Smart FAQ (كـ browser runner لـ Vitest) وفي repo Zeustra؛ و E2E suite حقيقي على repo public فجوة كويس تقفلها." } }] }
      ],
      say: "E2E tests cover a handful of journeys that must never break, with Playwright's role locators and auto-waiting so they stay stable.",
      interview: [{ q: "How do you fight flaky E2E tests?", a: { en: "No fixed waits — use web-first assertions; isolated test data; stable locators (roles/labels); retries only as a safety net; traces/videos to debug failures.", ar: "من غير waits ثابتة — استخدم assertions بتستنى؛ داتا معزولة؛ locators ثابتة (roles و labels)؛ retries بس كشبكة أمان؛ و traces وفيديوهات تفهم بيها الفشل." } }],
      quiz: [{ q: { en: "How many E2E tests compared to component tests?", ar: "عدد الـ E2E مقارنة بالـ component tests؟" }, a: { en: "Far fewer — only critical journeys.", ar: "أقل بكتير — الرحلات المهمة بس." } }],
      quick: [{ en: "Few E2E for critical journeys; role locators; auto-waiting; isolated data; traces.", ar: "E2E قليلة للرحلات المهمة؛ locators بالـ role؛ استنى لوحده؛ داتا معزولة؛ traces." }]
    },
    {
      id: "coverage-tdd",
      title: { en: "Coverage, TDD and tests in CI", ar: "الـ Coverage والـ TDD والـ tests في الـ CI" },
      tldr: { en: "Coverage shows what isn't tested, not what is tested well — aim for meaningful tests, not 100%. Write a failing test first for bugs (regression) and for tricky logic. Run lint, types and tests on every PR; keep the suite fast enough that people run it locally.", ar: "الـ Coverage بيوريك إيه اللي متختبرش، مش إيه اللي متختبر كويس — اهدف لـ tests ليها معنى مش 100%. اكتب test فاشل الأول للـ bugs (regression) وللمنطق الصعب. وشغّل الـ lint والـ types والـ tests مع كل PR؛ وخلي الـ suite سريع كفاية إن الناس تشغله عندها." },
      blocks: [
        { type: "list", items: [
          { en: "Bug → reproduce it in a test → fix → the test stays forever.", ar: "Bug ← اعمل test بيوريه ← صلّح ← الـ test بيفضل للأبد." },
          { en: "Smart FAQ's progress tracker records “Checked: build, lint, 523 tests, live as a Knowledge Manager” before a fix was merged — a good habit to describe.", ar: "الـ progress tracker في Smart FAQ مكتوب فيه «Checked: build, lint, 523 tests, live as a Knowledge Manager» قبل merge لـ fix — عادة كويسة تحكيها." }
        ] }
      ],
      say: "Coverage tells me what's untested; I write a regression test for every bug, and CI blocks merges on lint, types and tests.",
      interview: [{ q: "Is 100% coverage a good goal?", a: { en: "No — it rewards testing trivial code and implementation details. Better: cover critical paths and business rules, and treat uncovered risky code as a todo.", ar: "لأ — بيكافئ اختبار الكود البسيط وتفاصيل التنفيذ. الأحسن: غطي المسارات المهمة وقواعد البيزنس، واعتبر الكود الخطير اللي مش متغطي حاجة لازم تتعمل." } }],
      quiz: [{ q: { en: "First step when fixing a bug, test-wise?", ar: "أول خطوة وانت بتصلح bug من ناحية الـ tests؟" }, a: { en: "Write a failing test that reproduces it.", ar: "اكتب test فاشل بيوري الـ bug." } }],
      quick: [{ en: "Coverage = what's missing; regression test per bug; CI gates; fast suite.", ar: "الـ Coverage = اللي ناقص؛ regression test لكل bug؛ بوابات في الـ CI؛ suite سريع." }]
    }
  ]
});
