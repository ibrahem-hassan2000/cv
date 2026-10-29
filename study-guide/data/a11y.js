// Accessibility — written 2026-10-29.
STUDY.fill("a11y", {
  intro: { en: "Building for everyone: WCAG principles and levels, keyboard and focus, ARIA used correctly, accessible forms, colour/contrast/motion, and how to test it.", ar: "تبني للكل: مبادئ WCAG ومستوياتها، والكيبورد والـ focus، و ARIA مستخدمة صح، وفورمز accessible، والألوان والـ contrast والحركة، وإزاي تختبرها." },
  topics: [
    {
      id: "wcag",
      title: { en: "WCAG in one page", ar: "WCAG في صفحة" },
      tldr: { en: "WCAG's four principles: <b>Perceivable</b> (alt text, captions, contrast), <b>Operable</b> (keyboard, enough time, no seizures), <b>Understandable</b> (labels, predictable, error help), <b>Robust</b> (valid semantics, works with assistive tech). Level AA is the usual target (and the legal one in many places).", ar: "مبادئ WCAG الأربعة: <b>Perceivable</b> (alt text، captions، contrast)، و<b>Operable</b> (كيبورد، وقت كفاية، من غير ومضات)، و<b>Understandable</b> (labels، متوقع، مساعدة في الأخطاء)، و<b>Robust</b> (semantics صح، يشتغل مع الأدوات المساعدة). والمستوى AA هو الهدف المعتاد (والقانوني في أماكن كتير)." },
      blocks: [
        { type: "list", title: { en: "AA checks you'll be asked about", ar: "فحوصات AA اللي هتتسأل عنها" }, items: [
          { en: "Text contrast ≥ 4.5:1 (≥ 3:1 for large text and UI components/focus rings).", ar: "Contrast النص ≥ 4.5:1 (≥ 3:1 للنص الكبير والـ components وحلقة الـ focus)." },
          { en: "Everything works with a keyboard; focus is visible; no keyboard traps.", ar: "كل حاجة بتشتغل بالكيبورد؛ والـ focus ظاهر؛ ومفيش حبسة للكيبورد." },
          { en: "Every form field has a label; errors are identified in text, not only colour.", ar: "كل field ليه label؛ والأخطاء متوضحة بالكلام مش باللون بس." },
          { en: "Page works at 200% zoom and 320px width (reflow) without horizontal scrolling.", ar: "الصفحة بتشتغل على zoom 200% وعرض 320px (reflow) من غير scroll أفقي." },
          { en: "Touch targets at least 24×24 px (WCAG 2.2).", ar: "أهداف اللمس 24×24px على الأقل (WCAG 2.2)." }
        ] }
      ],
      say: "I target WCAG 2.2 AA: keyboard access with visible focus, labelled controls, text-based error messages, 4.5:1 contrast and layouts that reflow at 320px.",
      interview: [{ q: "What does accessibility mean to you in practice?", a: { en: "Semantic HTML first, keyboard and focus handled, labels and announcements for screen readers, contrast and motion respected — checked with automated tools and by actually tabbing through and using a screen reader.", ar: "HTML semantic الأول، والكيبورد والـ focus متظبطين، و labels وإعلانات لقارئ الشاشة، والـ contrast والحركة محترمين — ومتأكد منها بأدوات أوتوماتيك وبإني فعلًا أتنقل بالـ Tab وأستخدم قارئ شاشة." } }],
      quiz: [{ q: { en: "Minimum AA contrast for body text?", ar: "أقل contrast لـ AA للنص العادي؟" }, a: { en: "4.5:1.", ar: "4.5:1." } }],
      quick: [{ en: "POUR; AA: 4.5:1, keyboard + visible focus, labels, text errors, reflow at 320px, 24px targets.", ar: "POUR؛ AA: 4.5:1، كيبورد و focus ظاهر، labels، أخطاء بالكلام، reflow على 320px، أهداف 24px." }]
    },
    {
      id: "keyboard-focus",
      title: { en: "Keyboard and focus management", ar: "الكيبورد وإدارة الـ focus" },
      tldr: { en: "Use native interactive elements so Tab, Enter and Space work. Keep a visible <code>:focus-visible</code> style. Modals trap focus and return it to the trigger on close. After client-side navigation or deleting an item, move focus somewhere sensible. Composite widgets (menus, tabs, grids) use arrow keys with a roving tabindex.", ar: "استخدم العناصر التفاعلية الأصلية علشان Tab و Enter و Space يشتغلوا. وخلي فيه style ظاهر لـ <code>:focus-visible</code>. والـ modals بتحبس الـ focus وترجعه للزرار اللي فتحها لما تتقفل. وبعد التنقل في الـ client أو مسح عنصر، حرك الـ focus لمكان منطقي. والـ widgets المركبة (منيو، تابات، grids) بتستخدم الأسهم بـ roving tabindex." },
      blocks: [
        { type: "code", code: ":focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }   /* keyboard focus only */\n\n// skip link\n<a href=\"#main\" className=\"sr-only focus:not-sr-only\">Skip to content</a>\n\n// after route change\nuseEffect(() => { headingRef.current?.focus(); }, [pathname]);   // <h1 tabIndex={-1} ref={headingRef}>" },
        { type: "pitfalls", items: [
          { en: "<code>outline: none</code> without a replacement — keyboard users get lost.", ar: "<code>outline: none</code> من غير بديل — مستخدم الكيبورد بيتوه." },
          { en: "Positive <code>tabIndex</code> values break the natural order. Use 0 or -1 only.", ar: "قيم <code>tabIndex</code> موجبة بتبوظ الترتيب الطبيعي. استخدم 0 أو -1 بس." }
        ] },
        { type: "projects", items: [{ text: { en: "Smart FAQ: dnd-kit with a KeyboardSensor (taxonomy reorder works by keyboard), Radix dialogs/menus for focus traps, “/” shortcut to focus search; Trackoo: sign-in keyboard navigation.", ar: "Smart FAQ: dnd-kit مع KeyboardSensor (ترتيب الـ taxonomy بيشتغل بالكيبورد)، و dialogs ومنيوهات Radix لحبس الـ focus، واختصار «/» للبحث؛ و Trackoo: تنقل بالكيبورد في الـ sign-in." }, p: "smartfaq", tab: "overview", label: "Smart FAQ" }] }
      ],
      say: "Everything I build is usable from the keyboard: visible focus, trapped and restored focus in dialogs, focus moved after navigation, and drag-and-drop with a keyboard alternative.",
      interview: [{ q: "How should focus behave in a modal?", a: { en: "Move focus into the dialog on open (first field or the dialog), trap Tab inside, close on Escape, make the background inert, and return focus to the trigger on close.", ar: "حرك الـ focus جوه الـ dialog لما يفتح (أول field أو الـ dialog نفسه)، واحبس الـ Tab جوه، واقفل بـ Escape، وخلي الخلفية inert، ورجّع الـ focus للزرار اللي فتحه لما يتقفل." } }],
      quiz: [{ q: { en: ":focus vs :focus-visible?", ar: ":focus ولا :focus-visible؟" }, a: { en: ":focus-visible shows only when the browser thinks focus should be visible (keyboard), not on mouse clicks.", ar: ":focus-visible بيظهر بس لما المتصفح يشوف إن الـ focus لازم يبان (الكيبورد)، مش مع ضغط الماوس." } }],
      quick: [{ en: "Native controls; :focus-visible; dialogs trap + restore; focus after navigation; no positive tabIndex; keyboard alternative to drag.", ar: "Controls أصلية؛ :focus-visible؛ الـ dialogs بتحبس وترجّع؛ focus بعد التنقل؛ مفيش tabIndex موجب؛ بديل كيبورد للسحب." }]
    },
    {
      id: "aria",
      title: { en: "ARIA: the rules", ar: "ARIA: القواعد" },
      tldr: { en: "Rule 1: don't use ARIA if a native element does the job. ARIA changes what assistive tech is <i>told</i>, not how the element behaves. Use it for names (<code>aria-label</code>), relationships (<code>aria-describedby</code>, <code>aria-controls</code>), states (<code>aria-expanded</code>, <code>aria-selected</code>, <code>aria-invalid</code>) and live updates (<code>aria-live</code>).", ar: "القاعدة 1: متستخدمش ARIA لو فيه عنصر أصلي بيعمل الشغلانة. الـ ARIA بتغير اللي الأدوات المساعدة <i>بتتقاله</i>، مش سلوك العنصر. استخدمها للأسماء (<code>aria-label</code>)، والعلاقات (<code>aria-describedby</code> و <code>aria-controls</code>)، والحالات (<code>aria-expanded</code> و <code>aria-selected</code> و <code>aria-invalid</code>)، والتحديثات اللايف (<code>aria-live</code>)." },
      blocks: [
        { type: "code", code: "<button aria-label=\"Close dialog\"><XIcon aria-hidden=\"true\" /></button>   // icon-only button needs a name\n<button aria-expanded={open} aria-controls=\"filters\">Filters</button>\n<div id=\"filters\" hidden={!open}>…</div>\n<div role=\"status\" aria-live=\"polite\">{saved && \"Saved\"}</div>          // announced without moving focus\n<p role=\"alert\">{error}</p>                                              // assertive: interrupts" },
        { type: "pitfalls", items: [
          { en: "<code>&lt;div role=\"button\"&gt;</code> still needs tabIndex and Enter/Space handling — just use <code>&lt;button&gt;</code>.", ar: "<code>&lt;div role=\"button\"&gt;</code> لسه محتاج tabIndex و Enter و Space — استخدم <code>&lt;button&gt;</code> وخلاص." },
          { en: "<code>aria-hidden=\"true\"</code> on something focusable hides it from readers but not from Tab.", ar: "<code>aria-hidden=\"true\"</code> على حاجة بتاخد focus بيخبيها عن القارئ بس مش عن الـ Tab." }
        ] },
        { type: "projects", items: [{ text: { en: "Smart FAQ: live regions for status text (pagination, password strength), Radix providing the ARIA states for menus and dialogs.", ar: "Smart FAQ: live regions لنصوص الحالة (الـ pagination، قوة الباسورد)، و Radix بيدي حالات ARIA للمنيوهات والـ dialogs." }, p: "smartfaq", tab: "decisions", label: "Smart FAQ" }] }
      ],
      say: "No ARIA is better than bad ARIA: native elements first, ARIA only for names, relationships, states and live announcements.",
      interview: [{ q: "How do you announce “Saved” to a screen reader without moving focus?", a: { en: "Render it inside an element with <code>role=\"status\"</code> / <code>aria-live=\"polite\"</code> that exists before the text changes.", ar: "اعرضها جوه عنصر عليه <code>role=\"status\"</code> أو <code>aria-live=\"polite\"</code> موجود قبل ما النص يتغير." } }],
      quiz: [{ q: { en: "Icon-only close button — what does it need?", ar: "زرار قفل أيقونة بس — محتاج إيه؟" }, a: { en: "An accessible name (aria-label) and the icon aria-hidden.", ar: "اسم (aria-label) والأيقونة aria-hidden." } }],
      quick: [{ en: "Native first; ARIA = names, relations, states, live regions; it never adds behaviour.", ar: "الأصلي الأول؛ ARIA = أسماء وعلاقات وحالات و live regions؛ وعمرها ما بتضيف سلوك." }]
    },
    {
      id: "a11y-visual",
      title: { en: "Colour, contrast, motion and text", ar: "الألوان والـ contrast والحركة والنص" },
      tldr: { en: "Never use colour alone to carry meaning (add an icon or text). Meet contrast ratios. Respect <code>prefers-reduced-motion</code> — big parallax and scroll animations can make people sick. Let text resize (rem) and keep line length readable.", ar: "عمرك ما تعتمد على اللون لوحده للمعنى (زود أيقونة أو كلام). والتزم بنسب الـ contrast. واحترم <code>prefers-reduced-motion</code> — الـ parallax الكبير وأنيميشن الـ scroll ممكن يتعبوا الناس. وسيب النص يكبر (rem) وخلي طول السطر مريح." },
      blocks: [
        { type: "code", code: "@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }\n}\n// GSAP: gsap.matchMedia().add(\"(prefers-reduced-motion: no-preference)\", () => { /* scroll animations */ });" },
        { type: "projects", items: [{ text: { en: "The motion-heavy sites (Osloop, ARVAmethod, Makka Juice) are where reduced-motion matters most; Smart FAQ has a usePrefersReducedMotion hook.", ar: "المواقع اللي فيها حركة كتير (Osloop، ARVAmethod، Makka Juice) هي أكتر مكان الـ reduced-motion مهم فيه؛ و Smart FAQ فيه hook اسمه usePrefersReducedMotion." }, p: "smartfaq", tab: "hooks", label: "Smart FAQ" }] }
      ],
      say: "Status uses text or icons, not colour alone, and every scroll-driven animation has a reduced-motion version.",
      interview: [{ q: "How do you make a GSAP-heavy site accessible?", a: { en: "Respect prefers-reduced-motion (gsap.matchMedia), keep content readable without the animation, don't hijack scrolling for keyboard users, and keep focus order matching the visual order.", ar: "احترم prefers-reduced-motion (gsap.matchMedia)، وخلي المحتوى مقروء من غير الأنيميشن، ومتسيطرش على الـ scroll لمستخدم الكيبورد، وخلي ترتيب الـ focus زي الترتيب اللي ظاهر." } }],
      quiz: [{ q: { en: "A red border is the only error signal — OK?", ar: "إطار أحمر هو العلامة الوحيدة للخطأ — تمام؟" }, a: { en: "No — add text (and an icon).", ar: "لأ — زود كلام (وأيقونة)." } }],
      quick: [{ en: "Not colour alone; contrast; prefers-reduced-motion (gsap.matchMedia); rem text; ~70ch lines.", ar: "مش اللون لوحده؛ contrast؛ prefers-reduced-motion (gsap.matchMedia)؛ نص بـ rem؛ سطور حوالي 70ch." }]
    },
    {
      id: "a11y-testing",
      title: { en: "Testing accessibility", ar: "اختبار الـ accessibility" },
      tldr: { en: "Automated tools (axe, Lighthouse, Storybook a11y, eslint-plugin-jsx-a11y) catch ~30–40% of issues. Testing Library's role-based queries test accessibility by default. Then test by hand: keyboard only, zoom 200%, a screen reader (VoiceOver, NVDA, TalkBack).", ar: "الأدوات الأوتوماتيك (axe، Lighthouse، Storybook a11y، eslint-plugin-jsx-a11y) بتمسك حوالي 30–40% من المشاكل. واستعلامات Testing Library بالـ role بتختبر الـ accessibility افتراضيًا. وبعدين اختبر بإيدك: كيبورد بس، zoom 200%، وقارئ شاشة (VoiceOver، NVDA، TalkBack)." },
      blocks: [
        { type: "code", code: "// role-based queries fail if the accessible name or role is wrong\nawait user.click(screen.getByRole(\"button\", { name: /publish/i }));\nexpect(screen.getByRole(\"alert\")).toHaveTextContent(\"Title is required\");\n\n// jest-axe / vitest-axe\nexpect(await axe(container)).toHaveNoViolations();" },
        { type: "projects", items: [{ text: { en: "Smart FAQ: Storybook a11y addon on 75 stories and Testing Library role queries across 551 tests.", ar: "Smart FAQ: Storybook a11y addon على 75 story، واستعلامات Testing Library بالـ role في 551 test." }, p: "smartfaq", tab: "interview", label: "Smart FAQ" }] }
      ],
      say: "Automated checks in Storybook and role-based queries in tests catch the basics; I still tab through every flow and try it with a screen reader.",
      interview: [{ q: "Why does getByRole improve your tests?", a: { en: "It finds elements the way assistive tech does — by role and accessible name — so a missing label or wrong element makes the test fail.", ar: "بيلاقي العناصر زي ما الأدوات المساعدة بتلاقيها — بالـ role والاسم — فلو label ناقص أو عنصر غلط الـ test بيفشل." } }],
      quiz: [{ q: { en: "Do automated tools find most a11y issues?", ar: "الأدوات الأوتوماتيك بتلاقي معظم مشاكل الـ a11y؟" }, a: { en: "No — roughly a third; manual testing is required.", ar: "لأ — حوالي التلت؛ والاختبار اليدوي لازم." } }],
      quick: [{ en: "axe/Storybook/lint + getByRole in tests + manual keyboard, zoom and screen reader.", ar: "axe و Storybook و lint و getByRole في الـ tests + اختبار يدوي بالكيبورد والـ zoom وقارئ الشاشة." }]
    }
  ]
});
