// Companies he can target (Cairo, Alexandria, remote-friendly) + what to study for each. Shown in the React site (/companies).
// Facts come from market/companies.md (passes 1–2, 2026-10-27) and a refresh search on 2026-10-29. Postings close fast:
// status.level = "recent" (a dated 2026 posting) · "check" (seen, date unclear) · "old" (2025 or closed) · "none" (no frontend role found).
// study / lead refer to Study Guide topics ("section/topic") and Project Guide ids. Arabic follows study-guide/STYLE-AR.md.
window.MARKET = {
  checked: "2026-10-29",

  boards: [
    { name: "LinkedIn Jobs", url: "https://www.linkedin.com/jobs/", note: { en: "Most companies post here first. Save a search for “React” + Cairo/Alexandria and turn on alerts.", ar: "أغلب الشركات بتنزّل هنا الأول. احفظ search لـ «React» في القاهرة واسكندرية، وشغّل التنبيهات." } },
    { name: "Wuzzuf", url: "https://wuzzuf.net/a/React-Jobs-in-Egypt", note: { en: "The biggest Egyptian board. Good for outsourcing and enterprise companies.", ar: "أكبر موقع وظايف مصري. كويس لشركات الـ outsourcing والشركات الكبيرة." } },
    { name: "Bayt — Egypt", url: "https://www.bayt.com/en/egypt/jobs/front-end-developer-jobs/", note: { en: "Enterprise and Gulf-linked companies (_VOIS, PwC, Giza Systems).", ar: "الشركات الكبيرة واللي ليها علاقة بالخليج (_VOIS و PwC و Giza Systems)." } },
    { name: "Glassdoor — Cairo React", url: "https://www.glassdoor.com/Job/cairo-react-developer-jobs-SRCH_IL.0,5_IC3438985_KO6,21.htm", note: { en: "Postings plus interview reports — read the reports before an interview.", ar: "وظايف، ومعاها تجارب إنترفيو. اقرا التجارب قبل أي إنترفيو." } },
    { name: "BECO Capital portfolio", url: "https://careers.becocapital.com/", note: { en: "Startups like Thndr post roles here before Wuzzuf.", ar: "Startups زي Thndr بتنزّل الوظايف هنا قبل Wuzzuf." } },
    { name: "Hub71 jobs", url: "https://jobs.hub71.com/", note: { en: "Another early board for Thndr and other fintechs.", ar: "موقع تاني بينزل فيه Thndr وشركات fintech تانية بدري." } },
    { name: "MEVP portfolio", url: "https://jobs.mevp.com/", note: { en: "Money Fellows and other MEVP startups.", ar: "Money Fellows وباقي الـ startups بتاعة MEVP." } },
    { name: "Global Ventures portfolio", url: "https://jobs.global.vc/", note: { en: "Thndr and other regional startups.", ar: "Thndr و startups تانية في المنطقة." } },
    { name: "4DX Ventures portfolio", url: "https://careers.4dxventures.com/", note: { en: "Bosta and other African startups.", ar: "Bosta و startups أفريقية تانية." } },
    { name: "corvi.careers — Cairo frontend", url: "https://corvi.careers/jobs/cairo/frontend-development-jobs/", note: { en: "A small board that collects Cairo frontend roles in one list.", ar: "موقع صغير بيجمّع وظايف الفرونت في القاهرة في ليستة واحدة." } }
  ],

  salary: {
    note: {
      en: "Indicative only (self-reported): Levels.fyi shows a Senior Software Engineer median in Cairo around EGP 938K a year (Dec 2025). Product and fintech companies usually pay closer to that than agencies and outsourcing. Check the latest numbers before any offer.",
      ar: "أرقام تقريبية بس، لأن الناس هي اللي بتكتبها. الـ Levels.fyi بيقول إن متوسط الـ Senior Software Engineer في القاهرة حوالي 938 ألف جنيه في السنة (ديسمبر 2025). وشركات الـ product والـ fintech غالبًا بتدفع أقرب للرقم ده من الـ agencies والـ outsourcing. شوف آخر أرقام قبل أي عرض."
    },
    url: "https://www.levels.fyi/t/software-engineer/levels/senior/locations/cairo-egy"
  },

  // Study tracks: "core" is for every company; the others are added by company type.
  tracks: {
    core: {
      name: { en: "Core — for every company", ar: "الأساس — لأي شركة" },
      why: { en: "Every frontend loop in Egypt asks these: JS fundamentals, how React renders, hooks, one live-coding task, and your stories.", ar: "أي إنترفيو فرونت في مصر بيسأل في دول: أساسيات JS، و React بيعمل render إزاي، والـ hooks، ومهمة live coding، وقصصك." },
      study: ["javascript/event-loop", "javascript/closures", "javascript/promises", "javascript/this", "javascript/references", "react/mental-model", "react/reconciliation", "react/state-snapshots", "hooks/useeffect", "hooks/usememo-usecallback", "performance/react-perf", "typescript/narrowing", "live-coding/approach", "live-coding/debounce", "live-coding/promise-all", "behavioral/intro", "behavioral/star"]
    },
    fintech: {
      name: { en: "Fintech", ar: "Fintech" },
      why: { en: "Money, auth and correctness: they ask about precise numbers, forms and validation, security, testing, and often React Native.", ar: "فلوس، و auth، ودقة. هيسألوك عن الأرقام المظبوطة، والفورمز والـ validation، والأمان، والـ testing، وغالبًا React Native." },
      study: ["javascript/types", "hooks/tanstack-hooks", "state/query-deep", "state/kinds-of-state", "forms/schemas", "forms/server-errors", "security/auth-tokens", "security/csrf", "security/xss", "testing/strategy", "testing/rtl", "i18n/rtl", "react-native/architecture"],
      lead: ["smartfaq", "ahs", "kalima", "one14"]
    },
    enterprise: {
      name: { en: "Enterprise & outsourcing", ar: "شركات كبيرة و outsourcing" },
      why: { en: "Big codebases, many teams and clients: Next.js, architecture, Git and CI, API styles (including GraphQL), and system design for dashboards.", ar: "codebases كبيرة وفرق وعملاء كتير. فـ Next.js، والـ architecture، و Git والـ CI، وأنواع الـ APIs (ومنها GraphQL)، و system design للداشبوردات." },
      study: ["nextjs/rendering", "nextjs/server-client-components", "nextjs/data-caching", "network/api-styles", "network/api-contract", "react-patterns/architecture", "react-patterns/composition", "typescript/generics", "tooling/git", "tooling/ci-cd", "system-design/radio", "system-design/dashboard"],
      lead: ["smartfaq", "ahs", "okorent"]
    },
    product: {
      name: { en: "Product SaaS", ar: "Product SaaS" },
      why: { en: "High bar on quality: system design, accessibility, design systems, performance, tests, and a coding challenge.", ar: "مستوى عالي في الجودة. system design، و accessibility، و design systems، وأداء، و tests، و coding challenge." },
      study: ["system-design/radio", "system-design/autocomplete", "styling/design-systems", "a11y/wcag", "a11y/keyboard-focus", "performance/cwv", "performance/bundle", "react-patterns/compound", "testing/strategy", "live-coding/lru", "live-coding/event-emitter"],
      lead: ["smartfaq", "ahs"]
    },
    commerce: {
      name: { en: "Commerce & logistics", ar: "تجارة و logistics" },
      why: { en: "Lots of users on phones: Core Web Vitals, images, SEO and rendering, Arabic/RTL, feeds and admin dashboards.", ar: "يوزرز كتير على الموبايل. Core Web Vitals، والصور، والـ SEO والـ rendering، والعربي والـ RTL، والـ feeds وداشبوردات الأدمن." },
      study: ["performance/cwv", "performance/assets", "nextjs/rendering", "nextjs/seo-assets", "i18n/rtl", "i18n/intl", "system-design/feed", "system-design/dashboard", "state/offline"],
      lead: ["okorent", "bites", "one14"]
    },
    mobile: {
      name: { en: "Mobile (React Native)", ar: "موبايل (React Native)" },
      why: { en: "Native features, lists, offline and releases — the questions that separate web-only developers from mobile ones.", ar: "الـ native features، والقوايم، والـ offline، والنشر. ودي الأسئلة اللي بتفرّق بين اللي بيعمل web بس واللي بيعمل موبايل." },
      study: ["react-native/architecture", "react-native/expo", "react-native/lists", "react-native/native-capabilities", "react-native/rn-data", "react-native/release", "hooks/rn-hooks", "system-design/offline-mobile-case"],
      lead: ["one14", "kalima"]
    }
  },

  companies: [
    // ---------- Fintech ----------
    { id: "thndr", name: "Thndr", city: "Cairo", mode: "hybrid", sector: { en: "Investing app (fintech)", ar: "تطبيق استثمار (fintech)" }, tracks: ["fintech", "mobile"], tier: "A",
      stack: ["React", "React Native", "Redux / MobX / Context", "Jest or Cypress"],
      status: { level: "old", note: { en: "Senior Frontend (web) is closed. Recent roles: Fullstack Intern (Apr 2026) and Lead Mobile Engineer (React Native). They hire repeatedly — watch the VC boards.", ar: "الـ Senior Frontend (web) اتقفلت. وآخر وظايف: Fullstack Intern (أبريل 2026) و Lead Mobile Engineer (React Native). بيوظّفوا كتير، فتابع مواقع الـ VCs." }, url: "https://careers.becocapital.com/companies/thndr/jobs/50211005-frontend-intern" },
      fit: { en: "Strong match: React + RN + testing. Lead with Smart FAQ's tests and auth, then ONE14 for mobile.", ar: "مناسبة جدًا: React و RN و testing. ابدأ بالـ tests والـ auth في Smart FAQ، وبعدين ONE14 للموبايل." } },
    { id: "halan", name: "MNT-Halan", city: "Cairo", mode: "onsite", sector: { en: "Lending fintech / super-app", ar: "fintech للقروض و super-app" }, tracks: ["fintech", "enterprise"], tier: "A",
      stack: ["React", "TypeScript", "React Query", "Nx monorepo", "Ant Design", "Arabic/English RTL"],
      status: { level: "old", note: { en: "Last frontend posting seen around May 2026 (React, TS, React Query, Nx, RTL). Nothing new this week — check LinkedIn.", ar: "آخر وظيفة فرونت ظهرت حوالي مايو 2026 (React و TS و React Query و Nx و RTL). مفيش جديد الأسبوع ده، فشوف LinkedIn." }, url: "https://bebee.com/eg/jobs/frontend-engineer-halan-cairo-cairo--theirstack-683827132" },
      fit: { en: "Very close to his stack: the AHS TanStack migration and RTL work answer most of their posting.", ar: "قريبة جدًا من الـ stack بتاعه. الـ migration لـ TanStack في AHS وشغل الـ RTL بيجاوبوا على أغلب الإعلان." },
      gap: { en: "Nx monorepo and Ant Design — read the Nx basics before the interview.", ar: "Nx monorepo و Ant Design. اقرا أساسيات Nx قبل الإنترفيو." } },
    { id: "yassir", name: "Yassir", city: "Cairo / Alexandria", mode: "hybrid", sector: { en: "Super-app, financial services team", ar: "super-app، فريق الخدمات المالية" }, tracks: ["fintech"], tier: "A",
      stack: ["React", "TypeScript"],
      status: { level: "recent", note: { en: "Senior Front-End Engineer (React), Financial Services — listed for Cairo or Alexandria, hybrid.", ar: "Senior Front-End Engineer (React) في الخدمات المالية، والمكان القاهرة أو اسكندرية، hybrid." }, url: "https://jobs.lever.co/Yassir/c0784a7f-084b-49a9-a7b5-a1051fb68c3a" },
      fit: { en: "One of the few senior React roles that lists Alexandria. Lead with Smart FAQ and the AHS billing formulas.", ar: "من الوظايف القليلة الـ Senior اللي فيها اسكندرية. ابدأ بـ Smart FAQ ومعادلات الـ billing في AHS." } },
    { id: "dopay", name: "Dopay", city: "Cairo", mode: "onsite", sector: { en: "Payroll fintech", ar: "fintech للمرتبات" }, tracks: ["fintech"], tier: "A",
      stack: ["React", "TypeScript", "3–6 years production React"],
      status: { level: "recent", note: { en: "Front-end Engineer postings dated April 2026 (on-site, React + TS).", ar: "وظايف Front-end Engineer بتاريخ أبريل 2026 (في المكتب، React و TS)." }, url: "https://apply.workable.com/dopay-8/" },
      fit: { en: "Good match on experience range and stack.", ar: "مناسبة في سنين الخبرة والـ stack." } },
    { id: "moneyfellows", name: "Money Fellows", city: "Cairo", mode: "onsite", sector: { en: "Savings circles (fintech)", ar: "جمعيات ادخار (fintech)" }, tracks: ["fintech"], tier: "A",
      stack: ["React"],
      status: { level: "check", note: { en: "Senior Frontend Engineer listed on the MEVP board; the date isn't shown.", ar: "Senior Frontend Engineer على موقع MEVP، والتاريخ مش ظاهر." }, url: "https://jobs.mevp.com/companies/moneyfellows/jobs/35882619-senior-frontend-engineer" },
      fit: { en: "Fintech track; lead with Smart FAQ and AHS.", ar: "مسار الـ fintech. ابدأ بـ Smart FAQ و AHS." } },
    { id: "zeal", name: "Zeal", city: "Cairo", mode: "remote / onsite", sector: { en: "Loyalty and payments", ar: "loyalty ومدفوعات" }, tracks: ["fintech", "mobile"], tier: "A",
      stack: ["React", "Next.js", "React Query", "4+ years"],
      status: { level: "check", note: { en: "Senior Frontend Engineer (React, Next.js, React Query), remote or on-site — seen in this week's search, date not shown. They also hired Senior React Native before.", ar: "Senior Frontend Engineer (React و Next.js و React Query)، remote أو في المكتب. ظهرت في search الأسبوع ده من غير تاريخ. وكانوا بيوظفوا Senior React Native قبل كده." } },
      fit: { en: "Exact stack match (React Query + Next.js), and remote is possible.", ar: "الـ stack مطابق بالظبط (React Query و Next.js)، و remote ممكن." } },
    { id: "telda", name: "Telda", city: "Cairo", mode: "—", sector: { en: "Neobank", ar: "بنك رقمي" }, tracks: ["fintech", "mobile"], tier: "B",
      stack: [],
      status: { level: "check", note: { en: "A Frontend Engineer listing appeared on Built In with few details. Check their careers page.", ar: "ظهرت وظيفة Frontend Engineer على Built In، والتفاصيل قليلة. شوف صفحة الوظايف بتاعتهم." } },
      fit: { en: "Fintech track.", ar: "مسار الـ fintech." } },
    { id: "mylo", name: "mylo", city: "Cairo", mode: "onsite", sector: { en: "Buy now, pay later", ar: "اشتري دلوقتي وادفع بعدين" }, tracks: ["fintech"], tier: "B",
      stack: [],
      status: { level: "old", note: { en: "Senior Frontend Engineer posted August 2025, now archived.", ar: "Senior Frontend Engineer اتنزلت في أغسطس 2025، ودلوقتي متأرشفة." } },
      fit: { en: "Fintech track; watch for a new opening.", ar: "مسار الـ fintech. استنى وظيفة جديدة." } },
    { id: "paymob", name: "Paymob", city: "Cairo", mode: "—", sector: { en: "Payments", ar: "مدفوعات" }, tracks: ["fintech"], tier: "B",
      stack: [],
      status: { level: "none", note: { en: "No open frontend role found; they do have frontend developers on staff (500–1000+ employees).", ar: "مفيش وظيفة فرونت مفتوحة، بس عندهم frontend developers في الفريق (من 500 لأكتر من 1000 موظف)." }, url: "https://wuzzuf.net/jobs/careers/Paymob-Solutions-Egypt-43747" },
      fit: { en: "Big payments company — worth following on LinkedIn.", ar: "شركة مدفوعات كبيرة، تستاهل تتابعها على LinkedIn." } },
    { id: "fintech-others", name: "valU · Fawry · Khazna · Sympl", city: "Cairo", mode: "—", sector: { en: "Other fintechs", ar: "شركات fintech تانية" }, tracks: ["fintech"], tier: "B",
      stack: [],
      status: { level: "none", note: { en: "No frontend posting found in the searches. Check their LinkedIn pages by hand.", ar: "مفيش وظيفة فرونت ظهرت في الـ search. شوف صفحاتهم على LinkedIn بإيدك." } },
      fit: { en: "Same fintech track if a role opens.", ar: "نفس مسار الـ fintech لو اتفتحت وظيفة." } },

    // ---------- Commerce, logistics, consumer ----------
    { id: "bosta", name: "Bosta", city: "Cairo", mode: "hybrid", sector: { en: "Logistics / delivery", ar: "logistics وتوصيل" }, tracks: ["commerce", "mobile"], tier: "A",
      stack: ["React", "React Native", "TypeScript"],
      status: { level: "recent", note: { en: "Senior Frontend Engineer, Cairo hybrid, posted March 2026.", ar: "Senior Frontend Engineer، القاهرة hybrid، اتنزلت في مارس 2026." }, url: "https://careers.4dxventures.com/companies/bosta-2/jobs/70406649-senior-frontend-engineer" },
      fit: { en: "Web + RN: lead with Smart FAQ dashboards and ONE14.", ar: "web و RN. ابدأ بداشبوردات Smart FAQ و ONE14." } },
    { id: "breadfast", name: "Breadfast", city: "Cairo", mode: "—", sector: { en: "Quick commerce / groceries", ar: "توصيل بقالة سريع" }, tracks: ["commerce", "mobile"], tier: "B",
      stack: [],
      status: { level: "check", note: { en: "Senior Software Frontend Engineer on LinkedIn around mid-2026.", ar: "Senior Software Frontend Engineer على LinkedIn حوالي نص 2026." }, url: "https://www.linkedin.com/jobs/breadfast-jobs-worldwide" },
      fit: { en: "Commerce track: performance and RTL stories.", ar: "مسار التجارة. قصص الأداء والـ RTL." } },
    { id: "noon", name: "noon", city: "New Cairo", mode: "onsite", sector: { en: "E-commerce", ar: "تجارة إلكترونية" }, tracks: ["commerce"], tier: "B",
      stack: [],
      status: { level: "check", note: { en: "Software Engineer I (Frontend) roles in New Cairo — a junior level; watch for II/senior roles.", ar: "وظايف Software Engineer I (Frontend) في القاهرة الجديدة، ودي مستوى junior. استنى وظايف II أو senior." } },
      fit: { en: "Big e-commerce scale; the level must match before applying.", ar: "تجارة إلكترونية على مستوى كبير. لازم المستوى يناسبك قبل ما تقدّم." } },
    { id: "talabat", name: "Talabat", city: "Dubai (not Cairo)", mode: "—", sector: { en: "Food delivery", ar: "توصيل أكل" }, tracks: ["commerce"], tier: "C",
      stack: [],
      status: { level: "none", note: { en: "Frontend roles found were in Dubai only (Software Engineer II, Frontend). Cairo showed backend roles.", ar: "وظايف الفرونت اللي ظهرت كانت في دبي بس (Software Engineer II، Frontend). وفي القاهرة ظهرت وظايف backend." } },
      fit: { en: "Only if you consider relocation.", ar: "بس لو بتفكر تسافر." } },
    { id: "commerce-others", name: "Rabbit · Cartona · Swvl · Nawy", city: "Cairo", mode: "—", sector: { en: "Commerce, mobility, proptech", ar: "تجارة، ومواصلات، وعقارات" }, tracks: ["commerce"], tier: "C",
      stack: [],
      status: { level: "none", note: { en: "No frontend posting found. Check their LinkedIn pages.", ar: "مفيش وظيفة فرونت ظهرت. شوف صفحاتهم على LinkedIn." } },
      fit: { en: "Commerce track if a role opens.", ar: "مسار التجارة لو اتفتحت وظيفة." } },

    // ---------- Product SaaS & tech ----------
    { id: "instabug", name: "Instabug", city: "Cairo", mode: "—", sector: { en: "Mobile observability SaaS", ar: "SaaS لمراقبة تطبيقات الموبايل" }, tracks: ["product"], tier: "B",
      stack: ["React", "well-tested, performant UI"],
      status: { level: "old", note: { en: "Senior Frontend Engineer posted March 2025. Reported process: application → coding challenge → interviews.", ar: "Senior Frontend Engineer اتنزلت في مارس 2025. والناس بتقول إن الخطوات: تقديم، وبعدين coding challenge، وبعدين إنترفيوهات." }, url: "https://jobs.forgepointcap.com/companies/instabug/jobs/47886393-senior-frontend-engineer" },
      fit: { en: "High bar: tests, design system and Storybook from Smart FAQ are the right stories.", ar: "مستوى عالي. الـ tests والـ design system والـ Storybook في Smart FAQ هما القصص الصح." } },
    { id: "synapse", name: "Synapse Analytics", city: "Maadi, Cairo", mode: "hybrid", sector: { en: "AI / data products", ar: "منتجات AI وداتا" }, tracks: ["product"], tier: "B",
      stack: ["React"],
      status: { level: "check", note: { en: "Frontend Engineer (React), Maadi, hybrid.", ar: "Frontend Engineer (React)، المعادي، hybrid." }, url: "https://synapseanalytics.recruitee.com/o/frontend-engineer-react" },
      fit: { en: "Dashboards and data UIs — Smart FAQ admin and the dashboard case.", ar: "داشبوردات وواجهات داتا. الـ admin بتاع Smart FAQ وحالة الداشبورد." } },
    { id: "vezeeta", name: "Vezeeta", city: "Cairo", mode: "—", sector: { en: "Healthtech booking", ar: "حجز دكاترة (healthtech)" }, tracks: ["commerce", "product"], tier: "B",
      stack: ["React", "SEO-friendly HTML/CSS"],
      status: { level: "old", note: { en: "Only an old Senior Front-End posting (React, SEO-friendly HTML/CSS).", ar: "فيه بس وظيفة Senior Front-End قديمة (React، و HTML/CSS مناسب للـ SEO)." }, url: "https://wuzzuf.net/jobs/p/232115-Senior-Front-End-Engineer-Vezeeta-com-Cairo-Egypt" },
      fit: { en: "Health domain: AHS, Spectra and Smart FAQ (healthcare ops client).", ar: "مجال صحي: AHS و Spectra و Smart FAQ (عميل في تشغيل الخدمات الصحية)." } },

    // ---------- Enterprise, telecom, consulting ----------
    { id: "vois", name: "_VOIS (Vodafone)", city: "Smart Village, Cairo", mode: "onsite / hybrid", sector: { en: "Vodafone's shared tech hub", ar: "مركز التكنولوجيا المشترك بتاع Vodafone" }, tracks: ["enterprise"], tier: "A",
      stack: ["React", "Next.js", "TypeScript", "GraphQL"],
      status: { level: "check", note: { en: "React/Next.js Senior and Tech Lead roles were listed on Bayt. Reported interviews: JS core (closures, OOP), the request flow from frontend to backend, React rendering and re-render prevention.", ar: "كان فيه وظايف Senior و Tech Lead بـ React و Next.js على Bayt. والناس بتقول إن الإنترفيو فيه: أساسيات JS (closures و OOP)، والـ request بيمشي إزاي من الفرونت للـ backend، والـ rendering في React وإزاي تمنع الـ re-render." }, url: "https://www.bayt.com/en/egypt/jobs/frontend-react-developer-jobs/" },
      fit: { en: "Big enterprise; the Smart FAQ re-render fix is a perfect story for their React round.", ar: "شركة كبيرة جدًا. وتصليح الـ re-render في Smart FAQ قصة ممتازة لجولة الـ React عندهم." },
      gap: { en: "GraphQL — read the API styles topic and build one small Apollo example.", ar: "GraphQL. اقرا topic أنواع الـ APIs، واعمل مثال صغير بـ Apollo." },
      study: ["react/reconciliation", "javascript/closures", "network/api-styles"] },
    { id: "pwc", name: "PwC (ETIC Cairo)", city: "Cairo", mode: "—", sector: { en: "Consulting / tech centre", ar: "استشارات ومركز تكنولوجيا" }, tracks: ["enterprise", "mobile"], tier: "B",
      stack: ["React", "React Native"],
      status: { level: "check", note: { en: "Senior Associate Frontend Engineer (React) in Cairo; Senior React Native roles were also listed.", ar: "Senior Associate Frontend Engineer (React) في القاهرة. وكان فيه كمان وظايف Senior React Native." } },
      fit: { en: "Enterprise track; RN experience is a plus.", ar: "مسار الشركات الكبيرة، وخبرة الـ RN ميزة." } },
    { id: "gizasystems", name: "Giza Systems", city: "Cairo", mode: "—", sector: { en: "Systems integrator", ar: "systems integrator" }, tracks: ["enterprise"], tier: "B",
      stack: ["React"],
      status: { level: "check", note: { en: "Senior Frontend Developer (React JS) listed on GulfTalent.", ar: "Senior Frontend Developer (React JS) على GulfTalent." }, url: "https://www.gulftalent.com/egypt/jobs/senior-frontend-developer-react-js-417314" },
      fit: { en: "Enterprise track.", ar: "مسار الشركات الكبيرة." } },
    { id: "linkdev", name: "Link Development", city: "Cairo", mode: "—", sector: { en: "Digital solutions / outsourcing", ar: "حلول رقمية و outsourcing" }, tracks: ["enterprise"], tier: "B",
      stack: ["React"],
      status: { level: "check", note: { en: "A Frontend React Developer role (LINK TSP) was republished on Wuzzuf/Tanqeeb; the date is unclear.", ar: "وظيفة Frontend React Developer (LINK TSP) اتنشرت على Wuzzuf و Tanqeeb، والتاريخ مش واضح." } },
      fit: { en: "Enterprise track.", ar: "مسار الشركات الكبيرة." } },
    { id: "arrow", name: "Arrow Electronics", city: "Cairo", mode: "—", sector: { en: "Global electronics distributor (tech centre)", ar: "موزّع إلكترونيات عالمي (مركز تكنولوجيا)" }, tracks: ["enterprise"], tier: "B",
      stack: ["React", "Material UI", "TypeScript", "Node.js"],
      status: { level: "check", note: { en: "Senior React Developer in Cairo (React, MUI, TS, Node.js).", ar: "Senior React Developer في القاهرة (React و MUI و TS و Node.js)." } },
      fit: { en: "MUI from Bites and full-stack bits from the freelance work help here.", ar: "الـ MUI من Bites، والشغل الـ full-stack من الـ freelance بيفيدوا هنا." } },
    { id: "enterprise-others", name: "Sumerge · ITWorx", city: "Cairo", mode: "—", sector: { en: "Software services", ar: "خدمات برمجة" }, tracks: ["enterprise"], tier: "C",
      stack: ["React", "Angular"],
      status: { level: "none", note: { en: "No Cairo frontend posting found (Sumerge's recent frontend roles were in Poland, React + Angular).", ar: "مفيش وظيفة فرونت في القاهرة ظهرت. وآخر وظايف فرونت في Sumerge كانت في بولندا، بـ React و Angular." } },
      fit: { en: "Check their careers pages directly.", ar: "شوف صفحات الوظايف بتاعتهم مباشرة." } },

    // ---------- Outsourcing, studios, agencies ----------
    { id: "robusta", name: "Robusta", city: "Cairo", mode: "hybrid / remote", sector: { en: "Product studio / outsourcing", ar: "product studio و outsourcing" }, tracks: ["enterprise"], tier: "A",
      stack: ["React", "Next.js", "TypeScript", "4+ years for senior"],
      status: { level: "old", note: { en: "The last Senior Frontend role was removed in February 2026; they hire repeatedly. Reported process: HR call → take-home task → review of the task → manager talk.", ar: "آخر وظيفة Senior Frontend اتشالت في فبراير 2026، بس بيوظّفوا كتير. والناس بتقول إن الخطوات: مكالمة HR، وبعدين take-home task، وبعدين مراجعة للمهمة، وبعدين كلام مع المدير." } },
      fit: { en: "A clean, tested take-home is what wins here — use Smart FAQ's structure as the model.", ar: "اللي بيكسب هنا take-home نضيف وعليه tests. استخدم structure بتاع Smart FAQ كنموذج." },
      study: ["testing/rtl", "react-patterns/architecture"] },
    { id: "nilebits", name: "Nile Bits", city: "Cairo", mode: "remote options", sector: { en: "Software outsourcing", ar: "outsourcing برمجة" }, tracks: ["enterprise"], tier: "A",
      stack: ["React", "TypeScript"],
      status: { level: "recent", note: { en: "Senior React Developer (TS), Cairo with remote options — posted March 2026 and listed again recently.", ar: "Senior React Developer (TS)، القاهرة مع إمكانية remote. اتنزلت في مارس 2026، وظهرت تاني قريب." } },
      fit: { en: "Remote options make it realistic from Alexandria.", ar: "إمكانية الـ remote بتخليها مناسبة وإنت في اسكندرية." } },
    { id: "advansys", name: "Advansys", city: "Nasr City, Cairo", mode: "contract", sector: { en: "Software services", ar: "خدمات برمجة" }, tracks: ["enterprise"], tier: "B",
      stack: ["React", "TypeScript", "Redux Toolkit"],
      status: { level: "recent", note: { en: "Senior React Developer (React, TS, Redux Toolkit), external contract, first seen May 2026.", ar: "Senior React Developer (React و TS و Redux Toolkit)، عقد خارجي، ظهرت أول مرة في مايو 2026." } },
      fit: { en: "Redux Toolkit: review the Zustand vs Redux topic and the anyShop work.", ar: "Redux Toolkit: راجع topic الـ Zustand قصاد Redux، وشغل anyShop." },
      study: ["state/zustand-redux"] },
    { id: "valleysoft", name: "Valleysoft", city: "Cairo", mode: "—", sector: { en: "Software services", ar: "خدمات برمجة" }, tracks: ["enterprise", "mobile"], tier: "B",
      stack: ["React", "React Native"],
      status: { level: "recent", note: { en: "Senior Frontend Engineer (React + React Native), posted April 2026.", ar: "Senior Frontend Engineer (React و React Native)، اتنزلت في أبريل 2026." } },
      fit: { en: "Web + RN — both sides of his experience.", ar: "web و RN، يعني الناحيتين بتوع خبرته." } },
    { id: "flairstech", name: "FlairsTech", city: "Cairo", mode: "—", sector: { en: "Custom development for clients", ar: "برمجة مخصوصة للعملاء" }, tracks: ["enterprise"], tier: "B",
      stack: ["React"],
      status: { level: "check", note: { en: "Senior Frontend Developer for client projects in a small delivery team.", ar: "Senior Frontend Developer لمشاريع العملاء، في فريق تسليم صغير." } },
      fit: { en: "Client work like nWeave — talk about many clients and owning features end to end.", ar: "شغل عملاء زي nWeave. اتكلم عن عملاء كتير، وإنك ماسك الـ feature من أولها لآخرها." } },
    { id: "crossworkers", name: "CrossWorkers", city: "New Cairo", mode: "onsite", sector: { en: "Software services", ar: "خدمات برمجة" }, tracks: ["enterprise"], tier: "C",
      stack: ["React", "Next.js", "TypeScript"],
      status: { level: "old", note: { en: "Mid-Level Frontend (React, Next.js, TS), December 2025.", ar: "Mid-Level Frontend (React و Next.js و TS)، ديسمبر 2025." } },
      fit: { en: "Mid level — fine as a backup.", ar: "مستوى mid، ينفع كاحتياطي." } },
    { id: "media-giza", name: "Augustus Media · Mondia Media", city: "Giza", mode: "—", sector: { en: "Digital media", ar: "ميديا رقمية" }, tracks: ["commerce"], tier: "C",
      stack: ["React", "Next.js (SSR)"],
      status: { level: "check", note: { en: "Senior Frontend roles; Augustus works with React and Next.js server-side rendering.", ar: "وظايف Senior Frontend. و Augustus شغالة بـ React و Next.js مع server-side rendering." } },
      fit: { en: "SSR and SEO focus — the Next.js rendering topics.", ar: "التركيز على الـ SSR والـ SEO، يعني topics الـ rendering في Next.js." } },

    // ---------- Alexandria ----------
    { id: "complymarket", name: "ComplyMarket", city: "Sidi Bishr, Alexandria", mode: "—", sector: { en: "Compliance marketplace", ar: "marketplace للـ compliance" }, tracks: ["enterprise"], tier: "B",
      stack: [],
      status: { level: "check", note: { en: "Senior Front End Developer to rebuild their web platform, in Alexandria.", ar: "Senior Front End Developer علشان يعيد بناء الـ web platform بتاعتهم، في اسكندرية." }, url: "https://wuzzuf.net/jobs/p/rsw9zuupuogv-senior-front-end-developer-complymarket-alexandria-egypt" },
      fit: { en: "A rebuild from scratch — exactly what he did in Smart FAQ.", ar: "بناء من الصفر، ودي بالظبط اللي عمله في Smart FAQ." } },
    { id: "tutanic", name: "Tutanic", city: "Alexandria", mode: "—", sector: { en: "Software company", ar: "شركة برمجة" }, tracks: ["enterprise"], tier: "C",
      stack: ["React", "TypeScript"],
      status: { level: "check", note: { en: "Frontend Engineer (React / TypeScript), 1–3 years — below his level.", ar: "Frontend Engineer (React و TypeScript)، من سنة لـ 3 سنين، يعني أقل من مستواه." } },
      fit: { en: "Only as a local backup.", ar: "بس كاحتياطي في اسكندرية." } },
    { id: "espace", name: "eSpace", city: "Alexandria", mode: "—", sector: { en: "Software house", ar: "software house" }, tracks: ["enterprise"], tier: "C",
      stack: ["Angular"],
      status: { level: "none", note: { en: "Senior Front-End roles use Angular — not a fit unless he wants Angular.", ar: "وظايف الـ Senior Front-End عندهم بـ Angular، فمش مناسبة إلا لو عايز Angular." } },
      fit: { en: "Not a match today.", ar: "مش مناسبة دلوقتي." } }
  ]
};
