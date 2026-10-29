// Tooling, Git & CI/CD — written 2026-10-29.
STUDY.fill("tooling", {
  intro: { en: "The machinery around the code: bundlers and dev servers, transpilers and browser targets, package managers and monorepos, Git workflows, CI/CD with preview deploys, linting and formatting, and environment config.", ar: "المكنة اللي حوالين الكود: الـ bundlers وسيرفرات التطوير، والـ transpilers والمتصفحات المستهدفة، والـ package managers والـ monorepos، وطرق الشغل بـ Git، و CI/CD مع preview deploys، والـ linting والـ formatting، وإعدادات البيئات." },
  topics: [
    {
      id: "bundlers",
      title: { en: "Bundlers: Vite, webpack, Turbopack", ar: "الـ Bundlers: Vite و webpack و Turbopack" },
      tldr: { en: "A bundler turns your modules into optimised files for the browser (resolving imports, transforming TS/JSX, splitting chunks, hashing names, minifying). Vite serves native ES modules in dev (instant start, fast HMR) and bundles with Rollup for production. webpack is the configurable veteran; Turbopack is Next.js's Rust-based successor.", ar: "الـ bundler بيحول الـ modules بتاعتك لملفات محسنة للمتصفح (يحل الـ imports، يحول TS و JSX، يقسم chunks، يحط hash في الأسماء، يصغر). و Vite في التطوير بيبعت ES modules أصلية (بداية فورية و HMR سريع) وبيعمل bundle بـ Rollup للـ production. و webpack المخضرم اللي بيتظبط في كل حاجة؛ و Turbopack هو خليفته في Next.js مكتوب بـ Rust." },
      blocks: [
        { type: "compare", cols: ["", "Vite", "webpack", "Turbopack"], rows: [
          [{ en: "Dev server", ar: "سيرفر التطوير" }, { en: "Native ESM, esbuild pre-bundling", ar: "ESM أصلي، و esbuild pre-bundling" }, { en: "Bundles first", ar: "بيعمل bundle الأول" }, { en: "Incremental, Rust", ar: "Incremental، بـ Rust" }],
          [{ en: "Production", ar: "الـ Production" }, { en: "Rollup (Rolldown coming)", ar: "Rollup (و Rolldown جاي)" }, "webpack", { en: "Next.js builds", ar: "builds بتاعة Next.js" }],
          [{ en: "Config", ar: "الإعداد" }, { en: "Small", ar: "صغير" }, { en: "Large, very flexible", ar: "كبير ومرن جدًا" }, { en: "Through Next.js", ar: "عن طريق Next.js" }]
        ] },
        { type: "projects", items: [{ text: { en: "Smart FAQ (Vite 8): dev proxy to the backend, HTTPS dev server on a fixed port for the backend's one-command start; AHS used CRA + craco (webpack).", ar: "Smart FAQ (Vite 8): proxy للباك إند في التطوير، وسيرفر تطوير HTTPS على port ثابت علشان الباك إند يشتغل بأمر واحد؛ و AHS كان CRA و craco (webpack)." }, p: "smartfaq", tab: "decisions", label: "Smart FAQ" }] }
      ],
      say: "Vite gives instant dev startup by serving native modules and a proxy to the API; production builds are hashed, split and minified.",
      interview: [{ q: "Why is Vite's dev server fast?", a: { en: "It doesn't bundle the app in dev: the browser requests ES modules on demand, Vite transforms only what's requested, and dependencies are pre-bundled once with esbuild. HMR updates just the changed module.", ar: "مش بيعمل bundle للتطبيق في التطوير: المتصفح بيطلب الـ ES modules وقت الحاجة، و Vite بيحول اللي اتطلب بس، والـ dependencies بتتعمل pre-bundle مرة بـ esbuild. والـ HMR بيحدث الـ module اللي اتغير بس." } }],
      quiz: [{ q: { en: "What does a content hash in a file name enable?", ar: "الـ hash في اسم الملف بيسمح بإيه؟" }, a: { en: "Caching forever (immutable) — a change produces a new URL.", ar: "Cache للأبد (immutable) — أي تغيير بيعمل URL جديد." } }],
      quick: [{ en: "Vite = native ESM dev + Rollup build; webpack = configurable veteran; Turbopack = Next's Rust bundler.", ar: "Vite = ESM في التطوير و Rollup في الـ build؛ webpack = المخضرم المرن؛ Turbopack = bundler بتاع Next بـ Rust." }]
    },
    {
      id: "transpile",
      title: { en: "Transpilers, polyfills and browser targets", ar: "الـ Transpilers والـ polyfills والمتصفحات المستهدفة" },
      tldr: { en: "Transpilers (Babel, SWC, esbuild) turn TS/JSX/new syntax into JS your targets understand. Polyfills add missing APIs at runtime (core-js). Targets come from <code>browserslist</code>. Syntax can be transpiled; missing APIs need polyfills.", ar: "الـ Transpilers (Babel، SWC، esbuild) بيحولوا TS و JSX والـ syntax الجديد لـ JS المتصفحات المستهدفة فاهماه. والـ Polyfills بتزود APIs ناقصة وقت التشغيل (core-js). والمتصفحات المستهدفة جاية من <code>browserslist</code>. الـ syntax يتحول؛ لكن الـ APIs الناقصة محتاجة polyfills." },
      blocks: [
        { type: "list", items: [
          { en: "<code>a?.b</code> → transpilable syntax. <code>Array.prototype.toSorted</code> → an API that needs a polyfill on old browsers.", ar: "<code>a?.b</code> ← syntax يتحول. <code>Array.prototype.toSorted</code> ← API محتاج polyfill في المتصفحات القديمة." },
          { en: "Target modern browsers to ship less code; use <code>@vitejs/plugin-legacy</code> only if you must support old ones.", ar: "استهدف المتصفحات الحديثة علشان تبعت كود أقل؛ واستخدم <code>@vitejs/plugin-legacy</code> بس لو مضطر تدعم القديمة." }
        ] }
      ],
      say: "Syntax gets transpiled for our browserslist targets; new APIs need polyfills, so I check support before using them in user-facing code.",
      interview: [{ q: "Babel vs SWC vs esbuild?", a: { en: "All transpile. Babel is JS, slower, with the biggest plugin ecosystem; SWC (Rust) and esbuild (Go) are much faster and power Next.js/Vite.", ar: "كلهم بيعملوا transpile. Babel مكتوب بـ JS وأبطأ وعنده أكبر مجموعة plugins؛ و SWC (Rust) و esbuild (Go) أسرع بكتير وهما ورا Next.js و Vite." } }],
      quiz: [{ q: { en: "structuredClone missing on an old browser — transpile or polyfill?", ar: "structuredClone مش موجود في متصفح قديم — transpile ولا polyfill؟" }, a: { en: "Polyfill (it's an API).", ar: "Polyfill (ده API)." } }],
      quick: [{ en: "Syntax → transpile (SWC/esbuild/Babel); APIs → polyfill; browserslist decides.", ar: "الـ Syntax ← transpile؛ الـ APIs ← polyfill؛ و browserslist بيحدد." }]
    },
    {
      id: "packages",
      title: { en: "Package managers, lockfiles and monorepos", ar: "الـ Package managers والـ lockfiles والـ monorepos" },
      tldr: { en: "npm, pnpm and yarn install from package.json; the lockfile pins exact versions so every machine and CI gets the same tree (<code>npm ci</code>). pnpm saves disk with a content-addressed store and strict node_modules. Monorepos (pnpm workspaces + Turborepo/Nx) share code and cache builds across apps.", ar: "npm و pnpm و yarn بينزلوا من package.json؛ والـ lockfile بيثبت النسخ بالظبط علشان كل جهاز والـ CI ياخدوا نفس الشجرة (<code>npm ci</code>). و pnpm بيوفر المساحة بـ store بالمحتوى و node_modules صارم. والـ Monorepos (pnpm workspaces و Turborepo أو Nx) بتشارك الكود وتعمل cache للـ builds بين التطبيقات." },
      blocks: [
        { type: "list", items: [
          { en: "Semver: <code>^1.4.2</code> allows 1.x.x ≥ 1.4.2; <code>~1.4.2</code> allows 1.4.x; the lockfile decides what's actually installed.", ar: "Semver: <code>^1.4.2</code> بيسمح بـ 1.x.x ≥ 1.4.2؛ و <code>~1.4.2</code> بيسمح بـ 1.4.x؛ والـ lockfile هو اللي بيحدد اللي اتنزل فعلًا." },
          { en: "Commit the lockfile; use <code>npm ci</code> in CI; review dependency updates.", ar: "اعمل commit للـ lockfile؛ واستخدم <code>npm ci</code> في الـ CI؛ وراجع تحديثات المكتبات." }
        ] },
        { type: "projects", items: [{ text: { en: "ONE14: a pnpm monorepo (mobile app, API server, Firebase functions); Kalima: pinned a transitive Expo dependency so <code>npm ci</code> resolves the same everywhere.", ar: "ONE14: pnpm monorepo (تطبيق الموبايل، و API server، و Firebase functions)؛ و Kalima: ثبّت dependency غير مباشرة في Expo علشان <code>npm ci</code> يطلع نفس النتيجة في كل حتة." }, p: "one14", tab: "decisions", label: "ONE14" }] }
      ],
      say: "Lockfiles are committed and CI installs with npm ci, so builds are reproducible; in monorepos workspaces share code and Turborepo-style caching keeps builds fast.",
      interview: [{ q: "Why npm ci instead of npm install in CI?", a: { en: "It installs exactly what the lockfile says, fails if package.json and the lockfile disagree, and starts from a clean node_modules — reproducible and faster.", ar: "بينزل اللي في الـ lockfile بالظبط، ويفشل لو package.json والـ lockfile مختلفين، ويبدأ من node_modules نضيف — نتيجة ثابتة وأسرع." } }],
      quiz: [{ q: { en: "Does ^2.1.0 allow 3.0.0?", ar: "^2.1.0 بيسمح بـ 3.0.0؟" }, a: { en: "No — only 2.x.", ar: "لأ — 2.x بس." } }],
      quick: [{ en: "Commit lockfile; npm ci in CI; ^ = minor+patch, ~ = patch; pnpm workspaces + Turborepo/Nx for monorepos.", ar: "commit للـ lockfile؛ npm ci في الـ CI؛ ^ = minor و patch، و ~ = patch؛ pnpm workspaces و Turborepo أو Nx للـ monorepos." }]
    },
    {
      id: "git",
      title: { en: "Git workflows: branches, merge vs rebase, commits", ar: "Git: الـ branches و merge ولا rebase والـ commits" },
      tldr: { en: "Short-lived feature branches off main/dev, small PRs, clear commit messages (Conventional Commits: <code>feat(scope): …</code>), rebase your own branch to stay current, merge (or squash) into shared branches, never rewrite shared history. Long-lived branches are where merges hurt.", ar: "Feature branches عمرها قصير طالعة من main أو dev، و PRs صغيرة، ورسايل commits واضحة (Conventional Commits: <code>feat(scope): …</code>)، واعمل rebase للـ branch بتاعك علشان يفضل محدث، و merge (أو squash) للـ branches المشتركة، وعمرك ما تعيد كتابة history مشترك. والـ branches الطويلة هي اللي الـ merge فيها بيوجع." },
      blocks: [
        { type: "compare", cols: ["", "merge", "rebase", "squash merge"], rows: [
          [{ en: "History", ar: "الـ History" }, { en: "Keeps branch + merge commit", ar: "بيحافظ على الـ branch و merge commit" }, { en: "Linear, rewritten commits", ar: "خطي، و commits متعاد كتابتها" }, { en: "One commit per PR", ar: "commit واحد لكل PR" }],
          [{ en: "Safe on shared branches", ar: "آمن على branches مشتركة" }, "✓", { en: "✗ (rewrites)", ar: "✗ (بيعيد الكتابة)" }, "✓"],
          [{ en: "Use for", ar: "استخدمه لـ" }, { en: "Integrating shared work", ar: "دمج شغل مشترك" }, { en: "Updating your own branch", ar: "تحديث الـ branch بتاعك" }, { en: "Clean main history", ar: "history نضيف في main" }]
        ] },
        { type: "projects", items: [
          { text: { en: "Smart FAQ: Conventional-Commit style messages (feat/fix/refactor/docs/test/build with scopes) and a documented git workflow; AHS: Jira-ticketed branches (MEDX-xxx). Lesson from AHS: one long-lived migration branch slowed the rollout.", ar: "Smart FAQ: رسايل commits بأسلوب Conventional Commits (feat و fix و refactor و docs و test و build مع scopes) و git workflow مكتوب؛ و AHS: branches بأرقام تذاكر Jira (MEDX-xxx). والدرس من AHS: branch واحد طويل للـ migration أخّر النزول." }, p: "ahs", tab: "interview", label: "AHS" }
        ] }
      ],
      say: "I keep branches short and PRs small, rebase my own branch and merge into shared ones; a long-lived branch in AHS taught me that small merges ship faster.",
      interview: [{ q: "You force-pushed a rebased branch someone else was using. What happens?", a: { en: "Their history diverges; their next pull conflicts or duplicates commits. Coordinate, or don't rebase shared branches — use merge there. <code>git push --force-with-lease</code> at least refuses if the remote moved.", ar: "الـ history عندهم بيختلف؛ وأول pull بيعمل conflicts أو commits مكررة. اتفق معاهم، أو متعملش rebase للـ branches المشتركة — استخدم merge هناك. و <code>git push --force-with-lease</code> على الأقل بيرفض لو الـ remote اتغير." },
        follow: [{ q: "How do you find which commit broke something?", a: { en: "<code>git bisect</code>: mark a good and a bad commit and Git binary-searches the history while you test each step.", ar: "<code>git bisect</code>: علّم commit سليم و commit بايظ و Git بيعمل بحث ثنائي في الـ history وانت بتجرب كل خطوة." } }] }],
      quiz: [{ q: { en: "Undo the last local commit but keep the changes?", ar: "تلغي آخر commit محلي وتحافظ على التغييرات؟" }, a: { en: "git reset --soft HEAD~1.", ar: "git reset --soft HEAD~1." } }],
      quick: [{ en: "Short branches, small PRs; rebase own / merge shared; conventional commits; bisect; --force-with-lease.", ar: "Branches قصيرة و PRs صغيرة؛ rebase للبتاعك و merge للمشترك؛ conventional commits؛ bisect؛ --force-with-lease." }]
    },
    {
      id: "ci-cd",
      title: { en: "CI/CD and preview deployments", ar: "الـ CI/CD والـ Preview deployments" },
      tldr: { en: "CI runs on every push/PR: install (cached) → lint → type-check → test → build. CD deploys automatically: a preview URL per PR for review, then production on merge, with the ability to roll back. Keep secrets in the CI's secret store.", ar: "الـ CI بيشتغل مع كل push أو PR: install (متكاش) ← lint ← فحص types ← tests ← build. والـ CD بيعمل deploy أوتوماتيك: رابط preview لكل PR للمراجعة، وبعدين production مع الـ merge، مع إمكانية الرجوع. وخلي الأسرار في secret store بتاع الـ CI." },
      blocks: [
        { type: "code", code: "# .github/workflows/ci.yml (sketch)\non: [pull_request]\njobs:\n  check:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 22, cache: npm }\n      - run: npm ci\n      - run: npm run lint\n      - run: npx tsc --noEmit\n      - run: npm test -- --run\n      - run: npm run build" },
        { type: "projects", items: [{ text: { en: "His showcase sites deploy on Vercel (preview URLs); AHS and other nWeave repos use Bitbucket with pipelines; Profound used Azure DevOps.", ar: "مواقع العرض بتاعته بتتعمل deploy على Vercel (روابط preview)؛ و AHS ومشاريع nWeave التانية على Bitbucket بـ pipelines؛ و Profound كان Azure DevOps." } }] }
      ],
      say: "Every PR runs lint, types, tests and a build, and gets a preview URL so design and QA review the real thing before merge.",
      interview: [{ q: "What's the value of preview deployments?", a: { en: "Reviewers, designers and QA click through the actual change on a real URL, catching issues that code review can't — before it reaches production.", ar: "المراجعين والديزاينرز والـ QA بيجربوا التغيير الحقيقي على رابط حقيقي، وبيمسكوا مشاكل مراجعة الكود مش هتشوفها — قبل ما توصل للـ production." } }],
      quiz: [{ q: { en: "Order of CI checks to fail fast?", ar: "ترتيب فحوصات الـ CI علشان يفشل بسرعة؟" }, a: { en: "lint/types (seconds) before tests, before build.", ar: "lint و types (ثواني) قبل الـ tests، وقبل الـ build." } }],
      quick: [{ en: "CI: npm ci → lint → tsc → test → build; preview per PR; deploy on merge; rollback; secrets in CI.", ar: "CI: npm ci ← lint ← tsc ← test ← build؛ preview لكل PR؛ deploy مع الـ merge؛ رجوع؛ أسرار في الـ CI." }]
    },
    {
      id: "lint-format",
      title: { en: "Linting, formatting and env config", ar: "الـ Linting والـ formatting وإعدادات البيئة" },
      tldr: { en: "ESLint (or the much faster oxlint/Biome) finds bugs and enforces rules (hooks rules, a11y). Prettier formats — no style debates. Run them on save and in a pre-commit hook (husky + lint-staged). Env vars configure per environment; only prefixed ones (<code>VITE_</code>, <code>NEXT_PUBLIC_</code>) reach the browser — and those are public.", ar: "ESLint (أو oxlint و Biome الأسرع بكتير) بيلاقي الـ bugs ويفرض قواعد (قواعد الـ hooks، الـ a11y). و Prettier بيظبط الشكل — من غير نقاش على الستايل. شغّلهم مع الحفظ وفي pre-commit hook (husky و lint-staged). والـ env vars بتظبط كل بيئة؛ والمتغيرات اللي ليها بادئة بس (<code>VITE_</code> و <code>NEXT_PUBLIC_</code>) بتوصل للمتصفح — ودي علنية." },
      blocks: [
        { type: "projects", items: [{ text: { en: "Smart FAQ uses oxlint (Rust, very fast) and keeps mocks out of production builds with env-based switches.", ar: "Smart FAQ بيستخدم oxlint (Rust، سريع جدًا) وبيخلي الـ mocks برا الـ production عن طريق إعدادات البيئة." }, p: "smartfaq", tab: "decisions", label: "Smart FAQ" }] }
      ],
      say: "Linting catches bugs, Prettier ends style debates, both run before commit and in CI; client env vars are treated as public.",
      interview: [{ q: "Which lint rules matter most in React?", a: { en: "rules-of-hooks and exhaustive-deps (correctness), jsx-a11y (accessibility), no-floating-promises with typed linting, and import/order or cycle checks in bigger codebases.", ar: "rules-of-hooks و exhaustive-deps (الصحة)، و jsx-a11y (الـ accessibility)، و no-floating-promises مع typed linting، و import/order أو فحص الـ cycles في الـ codebases الكبيرة." } }],
      quiz: [{ q: { en: "Is VITE_API_KEY secret?", ar: "VITE_API_KEY سري؟" }, a: { en: "No — it's inlined into the bundle.", ar: "لأ — بيتحط جوه الـ bundle." } }],
      quick: [{ en: "Lint (bugs) + Prettier (format) on save, pre-commit and CI; VITE_/NEXT_PUBLIC_ = public.", ar: "Lint (bugs) و Prettier (شكل) مع الحفظ وقبل الـ commit وفي الـ CI؛ VITE_ و NEXT_PUBLIC_ = علني." }]
    }
  ]
});
