// CSS — written 2026-10-29.
STUDY.fill("css", {
  intro: { en: "How the browser decides which style wins, how boxes size and position, Flexbox vs Grid, stacking, responsive units and the modern features (logical properties, :has, layers).", ar: "المتصفح بيقرر أنهي style يكسب إزاي، الصناديق بتتحسب وتتحط إزاي، Flexbox ولا Grid، الـ stacking، الوحدات الـ responsive، والحاجات الحديثة (logical properties، :has، layers)." },
  topics: [
    {
      id: "cascade",
      title: { en: "Cascade, specificity and inheritance", ar: "الـ Cascade والـ specificity والوراثة" },
      tldr: { en: "When rules conflict, the browser compares: origin & <code>!important</code> → cascade layer → specificity → order in the source. Specificity is a score (IDs, classes/attributes/pseudo-classes, elements).", ar: "لما القواعد تتعارض، المتصفح بيقارن: المصدر و <code>!important</code> ← الـ cascade layer ← الـ specificity ← الترتيب في الكود. والـ specificity عبارة عن سكور (IDs، classes/attributes/pseudo-classes، elements)." },
      blocks: [
        { type: "compare", title: { en: "Specificity scores (a, b, c)", ar: "سكور الـ specificity (a, b, c)" }, cols: [{ en: "Selector", ar: "الـ Selector" }, { en: "Score", ar: "السكور" }, { en: "Note", ar: "ملاحظة" }],
          rows: [
            ["<code>p</code>", "0,0,1", { en: "element", ar: "element" }],
            ["<code>.card p</code>", "0,1,1", { en: "class + element", ar: "class + element" }],
            ["<code>#main .card</code>", "1,1,0", { en: "one ID beats any number of classes", ar: "ID واحد بيكسب أي عدد classes" }],
            ["<code>:where(.a, #b)</code>", "0,0,0", { en: "always zero — great for resets/libraries", ar: "دايمًا صفر — ممتاز للـ resets والمكتبات" }],
            ["<code>:is(.a, #b)</code>", "1,0,0", { en: "takes its most specific argument", ar: "بياخد أعلى argument فيه" }],
            ["inline <code>style=\"\"</code>", { en: "beats selectors", ar: "بيكسب الـ selectors" }, { en: "only !important beats it", ar: "مفيش غير !important يكسبه" }]
          ] },
        { type: "text", title: { en: "Inheritance", ar: "الوراثة" }, body: { en: "Text properties inherit (<code>color</code>, <code>font</code>, <code>line-height</code>, <code>direction</code>); box properties don't (<code>margin</code>, <code>border</code>, <code>width</code>). Force it with <code>inherit</code>, reset with <code>initial</code>/<code>unset</code>/<code>revert</code>.", ar: "خصائص النص بتتورث (<code>color</code>، <code>font</code>، <code>line-height</code>، <code>direction</code>)؛ وخصائص الصندوق لأ (<code>margin</code>، <code>border</code>، <code>width</code>). تجبرها بـ <code>inherit</code>، وترجعها بـ <code>initial</code> أو <code>unset</code> أو <code>revert</code>." } },
        { type: "code", title: { en: "Cascade layers end specificity wars", ar: "الـ Cascade layers بتنهي حرب الـ specificity" }, code: "@layer reset, library, components, utilities;\n\n@layer library    { .btn { padding: 12px; } }\n@layer components { button { padding: 8px; } }   /* wins: later layer beats earlier, whatever the specificity */\n\n/* Unlayered styles beat all layers. Tailwind v4 uses layers for exactly this. */" },
        { type: "pitfalls", items: [
          { en: "<code>!important</code> as a fix starts an arms race. Lower the other selector or use layers.", ar: "<code>!important</code> كحل بيبدأ سباق تسلح. قلل الـ selector التاني أو استخدم layers." },
          { en: "Order only matters when specificity is equal.", ar: "الترتيب يفرق بس لما الـ specificity تبقى متساوية." }
        ] },
        { type: "projects", items: [{ text: { en: "okoRent mixed Mantine and Tailwind — CSS order decides whether Tailwind's reset overrides Mantine.", ar: "okoRent كان فيه Mantine و Tailwind مع بعض — ترتيب الـ CSS هو اللي بيحدد هل الـ reset بتاع Tailwind هيغطي على Mantine." }, p: "okorent", tab: "decisions", label: "okoRent" }] }
      ],
      say: "Conflicts resolve by importance, then layer, then specificity, then source order — so I keep selectors flat and use layers instead of !important.",
      interview: [
        { q: "Two rules target the same element: #nav a and .menu .link.item. Which wins?", a: { en: "<code>#nav a</code> = 1,0,1; <code>.menu .link.item</code> = 0,3,0. The ID column is compared first, so <code>#nav a</code> wins.", ar: "<code>#nav a</code> = 1,0,1؛ و <code>.menu .link.item</code> = 0,3,0. عمود الـ ID بيتقارن الأول، فـ <code>#nav a</code> بيكسب." },
          follow: [{ q: "How would you make a library's styles easy to override?", a: { en: "Wrap them in <code>:where()</code> (zero specificity) or put them in an earlier <code>@layer</code>.", ar: "ألفّها في <code>:where()</code> (specificity صفر) أو أحطها في <code>@layer</code> بدري." } }] }
      ],
      quiz: [
        { q: { en: "Does <code>border</code> inherit?", ar: "الـ <code>border</code> بيتورث؟" }, a: { en: "No. Box properties don't inherit.", ar: "لأ. خصائص الصندوق مش بتتورث." } },
        { q: { en: "Specificity of <code>ul li:hover</code>?", ar: "الـ specificity بتاعة <code>ul li:hover</code>؟" }, a: { en: "0,1,2 — the pseudo-class counts as a class.", ar: "0,1,2 — الـ pseudo-class بيتحسب class." } }
      ],
      quick: [
        { en: "importance → layer → specificity (ID, class, element) → order.", ar: "الأهمية ← الـ layer ← الـ specificity (ID، class، element) ← الترتيب." },
        { en: ":where() = 0 specificity; :is() = its strongest argument.", ar: ":where() = صفر؛ :is() = أقوى argument فيه." }
      ]
    },
    {
      id: "box-model",
      title: { en: "The box model", ar: "الـ Box model" },
      tldr: { en: "Every element is content + padding + border + margin. With <code>box-sizing: border-box</code>, <code>width</code> includes padding and border — what designers expect. Vertical margins between blocks collapse.", ar: "كل عنصر = content + padding + border + margin. ومع <code>box-sizing: border-box</code>، الـ <code>width</code> بيشمل الـ padding والـ border — زي ما الديزاينر متوقع. والـ margins الرأسية بين الـ blocks بتعمل collapse." },
      blocks: [
        { type: "code", code: "*, *::before, *::after { box-sizing: border-box; }\n\n.card { width: 300px; padding: 20px; border: 2px solid; }\n/* content-box: rendered width = 300 + 40 + 4 = 344px\n   border-box:  rendered width = 300px (content shrinks to 256px) */" },
        { type: "list", title: { en: "Margin collapse", ar: "الـ Margin collapse" }, items: [
          { en: "Adjacent vertical margins of blocks merge into the larger one (20px + 30px → 30px).", ar: "الـ margins الرأسية المتجاورة بين blocks بتندمج وتبقى الأكبر (20 + 30 ← 30)." },
          { en: "A child's top margin can “leak” out of a parent with no padding/border.", ar: "الـ margin العلوي بتاع الابن ممكن «يهرب» برا الأب لو الأب مفيهوش padding أو border." },
          { en: "No collapse in flex/grid containers, or when the parent creates a BFC (<code>display: flow-root</code>, <code>overflow</code> not visible).", ar: "مفيش collapse جوه flex أو grid، أو لما الأب يعمل BFC (<code>display: flow-root</code>، أو <code>overflow</code> غير visible)." }
        ] },
        { type: "pitfalls", items: [{ en: "Using margins for spacing between list items — <code>gap</code> on flex/grid is cleaner and never collapses.", ar: "تستخدم margins للمسافات بين العناصر — الـ <code>gap</code> في flex أو grid أنضف وعمره ما بيعمل collapse." }] }
      ],
      say: "I set border-box globally so widths mean what the design says, and use gap instead of margins for spacing inside layouts.",
      interview: [{ q: "Why does my card's width come out bigger than 300px?", a: { en: "<code>content-box</code> adds padding and border to the width. Switch to <code>border-box</code>.", ar: "الـ <code>content-box</code> بيزود الـ padding والـ border على الـ width. حوّل لـ <code>border-box</code>." } }],
      quiz: [{ q: { en: "Margins 24px and 16px between two paragraphs — the gap?", ar: "margins بـ 24px و 16px بين فقرتين — المسافة كام؟" }, a: { en: "24px — they collapse to the larger.", ar: "24px — بيندمجوا وياخدوا الأكبر." } }],
      quick: [{ en: "border-box everywhere; vertical margins collapse (not in flex/grid); prefer gap.", ar: "border-box في كل حتة؛ الـ margins الرأسية بتعمل collapse (مش في flex/grid)؛ استخدم gap." }]
    },
    {
      id: "positioning",
      title: { en: "Display and positioning", ar: "الـ Display والـ Positioning" },
      tldr: { en: "<code>relative</code> nudges and creates a reference; <code>absolute</code> positions against the nearest positioned ancestor; <code>fixed</code> against the viewport; <code>sticky</code> acts relative until a scroll threshold, then sticks inside its parent.", ar: "<code>relative</code> بيزحزح وبيعمل مرجع؛ <code>absolute</code> بيتحط بالنسبة لأقرب جد positioned؛ <code>fixed</code> بالنسبة للشاشة؛ و <code>sticky</code> بيبقى relative لحد حد معين في الـ scroll وبعدين يلزق جوه الأب بتاعه." },
      blocks: [
        { type: "compare", cols: ["position", { en: "Relative to", ar: "بالنسبة لـ" }, { en: "In the flow?", ar: "في الـ flow؟" }, { en: "Typical use", ar: "استخدام شائع" }],
          rows: [
            ["static", "—", { en: "Yes", ar: "أيوه" }, { en: "Default", ar: "الافتراضي" }],
            ["relative", { en: "Its own spot", ar: "مكانه هو" }, { en: "Yes (space kept)", ar: "أيوه (مكانه محفوظ)" }, { en: "Anchor for absolute children", ar: "مرجع للأولاد الـ absolute" }],
            ["absolute", { en: "Nearest positioned ancestor", ar: "أقرب جد positioned" }, { en: "No", ar: "لأ" }, { en: "Badges, tooltips, overlays", ar: "Badges، tooltips، overlays" }],
            ["fixed", { en: "Viewport*", ar: "الشاشة*" }, { en: "No", ar: "لأ" }, { en: "Toasts, floating buttons", ar: "Toasts، زراير عايمة" }],
            ["sticky", { en: "Scroll container, inside its parent", ar: "الـ scroll container، جوه الأب" }, { en: "Yes", ar: "أيوه" }, { en: "Table headers, tab bars", ar: "رؤوس الجداول، شريط التابات" }]
          ] },
        { type: "pitfalls", items: [
          { en: "*A parent with <code>transform</code>, <code>filter</code> or <code>will-change: transform</code> becomes the containing block for <code>fixed</code> children — your “fixed” modal scrolls away.", ar: "*لو الأب عليه <code>transform</code> أو <code>filter</code> أو <code>will-change: transform</code>، بيبقى هو المرجع للأولاد الـ <code>fixed</code> — والـ modal «الثابت» بيمشي مع الـ scroll." },
          { en: "Sticky doesn't stick: an ancestor has <code>overflow: hidden/auto</code>, or no <code>top</code> is set.", ar: "الـ sticky مش بيلزق: جد عليه <code>overflow: hidden/auto</code>، أو مفيش <code>top</code>." }
        ] },
        { type: "projects", items: [{ text: { en: "Smart FAQ and the handbook use sticky tab bars; dialogs use portals (Radix) to escape transformed parents.", ar: "Smart FAQ والـ handbook بيستخدموا شريط تابات sticky؛ والـ dialogs بتستخدم portals (Radix) علشان تهرب من الأب اللي عليه transform." } }] }
      ],
      say: "Modals render in a portal or the top layer so a transformed or overflow-hidden ancestor can't trap them.",
      interview: [{ q: "Why would position: fixed not stay fixed?", a: { en: "An ancestor with transform, filter, perspective or will-change creates a new containing block. Render the element in a portal at the body level.", ar: "جد عليه transform أو filter أو perspective أو will-change بيعمل containing block جديد. ارسم العنصر في portal على مستوى الـ body." } }],
      quiz: [{ q: { en: "absolute child, no positioned ancestors — relative to what?", ar: "ابن absolute ومفيش جد positioned — بالنسبة لإيه؟" }, a: { en: "The initial containing block (the page/viewport area).", ar: "الـ initial containing block (مساحة الصفحة/الشاشة)." } }],
      quick: [{ en: "absolute → nearest positioned ancestor; transformed ancestors break fixed; sticky needs top and no overflow-clipping ancestor.", ar: "absolute ← أقرب جد positioned؛ الـ transform بيبوظ الـ fixed؛ والـ sticky محتاج top ومفيش جد عليه overflow." }]
    },
    {
      id: "flexbox",
      title: { en: "Flexbox", ar: "Flexbox" },
      tldr: { en: "One-dimensional layout: items along a main axis. <code>justify-content</code> = main axis, <code>align-items</code> = cross axis. <code>flex: 1</code> = grow and shrink from a 0 basis.", ar: "Layout في اتجاه واحد: العناصر على محور رئيسي. <code>justify-content</code> = المحور الرئيسي، <code>align-items</code> = المحور العرضي. و <code>flex: 1</code> = يكبر ويصغر من basis = 0." },
      blocks: [
        { type: "code", code: ".toolbar { display: flex; align-items: center; gap: 8px; }\n.toolbar .search { flex: 1; min-width: 0; }   /* takes the remaining space, may shrink below content */\n.toolbar .actions { margin-inline-start: auto; } /* push to the end (RTL-safe) */\n\n/* flex shorthand */\nflex: 1;        /* 1 1 0%   → equal shares */\nflex: auto;     /* 1 1 auto → shares extra space by content size */\nflex: none;     /* 0 0 auto → rigid */" },
        { type: "pitfalls", items: [
          { en: "Text won't truncate inside a flex child: flex items default to <code>min-width: auto</code>. Add <code>min-width: 0</code>.", ar: "النص مش بيتقص جوه flex item: الافتراضي <code>min-width: auto</code>. حط <code>min-width: 0</code>." },
          { en: "<code>justify-content</code> moves along the main axis — with <code>flex-direction: column</code> that's vertical.", ar: "<code>justify-content</code> بيشتغل على المحور الرئيسي — ومع <code>flex-direction: column</code> ده بيبقى رأسي." }
        ] },
        { type: "projects", items: [{ text: { en: "Smart FAQ commit “long and short text wrap or truncate everywhere, never spill” — mostly <code>min-width: 0</code> on flex children.", ar: "كوميت في Smart FAQ «النص الطويل والقصير يلف أو يتقص في كل حتة، ميخرجش برا» — معظمه <code>min-width: 0</code> على عناصر الـ flex." }, p: "smartfaq", tab: "overview", label: "Smart FAQ" }] }
      ],
      say: "Flexbox for one direction — toolbars, rows, centering; I add min-width: 0 whenever text should truncate inside a flex item.",
      interview: [{ q: "flex: 1 vs flex: auto?", a: { en: "<code>flex: 1</code> starts from a 0 basis, so items share space equally. <code>flex: auto</code> starts from content size, so bigger content gets more.", ar: "<code>flex: 1</code> بيبدأ من basis = 0، فالعناصر بتقسم المساحة بالتساوي. و <code>flex: auto</code> بيبدأ من حجم المحتوى، فالمحتوى الأكبر ياخد أكتر." } }],
      quiz: [{ q: { en: "Center a div both ways with flex?", ar: "توسّط div في الاتجاهين بـ flex؟" }, a: { en: "Parent: <code>display:flex; justify-content:center; align-items:center</code> (or <code>display:grid; place-items:center</code>).", ar: "الأب: <code>display:flex; justify-content:center; align-items:center</code> (أو <code>display:grid; place-items:center</code>)." } }],
      quick: [{ en: "justify = main axis, align = cross axis; min-width: 0 for truncation; gap for spacing.", ar: "justify = المحور الرئيسي، align = العرضي؛ min-width: 0 للقص؛ gap للمسافات." }]
    },
    {
      id: "grid",
      title: { en: "CSS Grid (and Grid vs Flex)", ar: "CSS Grid (و Grid ولا Flex)" },
      tldr: { en: "Two-dimensional layout: you define rows and columns, items snap to them. Use Grid when the layout comes from the container (page shells, card grids, forms); Flex when it comes from the content (toolbars, chips).", ar: "Layout في اتجاهين: بتحدد صفوف وأعمدة، والعناصر بتتحط فيهم. استخدم Grid لما الشكل جاي من الأب (هيكل الصفحة، شبكة كروت، فورم)؛ و Flex لما الشكل جاي من المحتوى (toolbar، chips)." },
      blocks: [
        { type: "code", code: "/* responsive cards with no media queries */\n.cards { display: grid; gap: 12px; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); }\n\n/* app shell */\n.shell { display: grid; grid-template-columns: 280px 1fr; min-height: 100dvh; }\n\n/* named areas */\n.page { display: grid; grid-template-areas: \"head head\" \"side main\"; }\n\n/* auto-fill keeps empty tracks; auto-fit collapses them so items stretch */" },
        { type: "compare", cols: ["", "Flexbox", "Grid"], rows: [
          [{ en: "Dimensions", ar: "الاتجاهات" }, { en: "One (row or column)", ar: "واحد (صف أو عمود)" }, { en: "Two (rows and columns)", ar: "اتنين (صفوف وأعمدة)" }],
          [{ en: "Size comes from", ar: "المقاس جاي من" }, { en: "The items' content", ar: "محتوى العناصر" }, { en: "The container's tracks", ar: "التراكات بتاعة الأب" }],
          [{ en: "Best for", ar: "أحسن لـ" }, { en: "Toolbars, nav, chips, centering", ar: "Toolbars، nav، chips، توسيط" }, { en: "Page layout, galleries, dashboards, forms", ar: "هيكل الصفحة، معارض، داشبورد، فورمز" }]
        ] },
        { type: "projects", items: [{ text: { en: "This guide: the shell is a grid (sidebar + main), cards use <code>auto-fill + minmax</code>.", ar: "الدليل ده نفسه: الهيكل grid (sidebar + main)، والكروت بـ <code>auto-fill + minmax</code>." } }] }
      ],
      say: "Grid when the container defines the layout, flex when the content does — and they nest happily.",
      interview: [{ q: "auto-fill vs auto-fit?", a: { en: "Both create as many columns as fit. auto-fill keeps empty columns; auto-fit collapses them so the existing items stretch to fill the row.", ar: "الاتنين بيعملوا أعمدة على قد ما تيجي. auto-fill بيسيب الأعمدة الفاضية؛ و auto-fit بيقفلها فالعناصر الموجودة بتتمط وتملا الصف." } }],
      quiz: [{ q: { en: "Card grid, min 240px each, no media queries?", ar: "شبكة كروت، كل كارت 240px على الأقل، من غير media queries؟" }, a: { en: "<code>grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))</code>.", ar: "<code>grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))</code>." } }],
      quick: [{ en: "Grid = 2D, container-driven; Flex = 1D, content-driven; repeat(auto-fill, minmax()) for responsive cards.", ar: "Grid = اتجاهين والأب بيحدد؛ Flex = اتجاه والمحتوى بيحدد؛ repeat(auto-fill, minmax()) للكروت." }]
    },
    {
      id: "stacking",
      title: { en: "Stacking contexts and z-index", ar: "الـ Stacking context والـ z-index" },
      tldr: { en: "<code>z-index</code> only compares elements inside the same stacking context. <code>opacity &lt; 1</code>, <code>transform</code>, <code>filter</code>, positioned + z-index, <code>isolation: isolate</code> all create new contexts — a child can never escape its parent's level.", ar: "الـ <code>z-index</code> بيقارن بس بين عناصر جوه نفس الـ stacking context. و <code>opacity &lt; 1</code> و <code>transform</code> و <code>filter</code> و positioned + z-index و <code>isolation: isolate</code> كلهم بيعملوا context جديد — والابن عمره ما يطلع فوق مستوى أبوه." },
      blocks: [
        { type: "code", code: ".header { position: relative; z-index: 10; }\n.page   { position: relative; z-index: 1; }\n.page .dropdown { position: absolute; z-index: 9999; }\n/* The dropdown is still BELOW the header: it lives inside .page's context (z=1 < 10). */" },
        { type: "when", title: { en: "Fixing “z-index: 9999 doesn't work”", ar: "حل «z-index: 9999 مش شغال»" }, use: [{ en: "Render overlays in a portal / top layer (dialog, popover).", ar: "ارسم الـ overlays في portal أو الـ top layer (dialog، popover)." }, { en: "Keep a small z-index scale as tokens (base, dropdown, sticky, modal, toast).", ar: "خلي عندك سلم z-index صغير كـ tokens (base، dropdown، sticky، modal، toast)." }], avoid: [{ en: "Raising numbers blindly — check which context the element is in first.", ar: "تكبّر الأرقام على العمى — شوف العنصر جوه أنهي context الأول." }] }
      ],
      say: "z-index only competes inside a stacking context, so overlays go in a portal and z-values come from a small token scale.",
      interview: [{ q: "Name things that create a stacking context.", a: { en: "Root element; positioned element with z-index; flex/grid child with z-index; opacity &lt; 1; transform, filter, perspective, clip-path, mask; will-change on those; isolation: isolate; position fixed/sticky.", ar: "الـ root؛ عنصر positioned عليه z-index؛ ابن flex أو grid عليه z-index؛ opacity أقل من 1؛ transform و filter و perspective و clip-path و mask؛ will-change عليهم؛ isolation: isolate؛ position fixed أو sticky." } }],
      quiz: [{ q: { en: "Parent has opacity: .99. Can its child with z-index 999 cover a sibling of the parent with z-index 2?", ar: "الأب عليه opacity: .99. الابن بـ z-index 999 يقدر يغطي أخو الأب اللي z-index بتاعه 2؟" }, a: { en: "Not if the parent's context sits below that sibling — the child is confined to the parent's level.", ar: "لأ لو context الأب تحت الأخ ده — الابن محبوس في مستوى أبوه." } }],
      quick: [{ en: "z-index is local to a stacking context; opacity/transform create one; portals for overlays.", ar: "الـ z-index محلي جوه الـ stacking context؛ opacity و transform بيعملوا واحد؛ portals للـ overlays." }]
    },
    {
      id: "responsive",
      title: { en: "Responsive design and units", ar: "الـ Responsive والوحدات" },
      tldr: { en: "Mobile-first media queries, fluid sizes with <code>clamp()</code>, <code>rem</code> for type and spacing, <code>dvh</code> for full-height on mobile, and container queries when a component should adapt to its own space, not the screen.", ar: "Media queries بـ mobile-first، ومقاسات مرنة بـ <code>clamp()</code>، و <code>rem</code> للخط والمسافات، و <code>dvh</code> للطول الكامل على الموبايل، و container queries لما الـ component يتكيّف على مساحته هو مش الشاشة." },
      blocks: [
        { type: "compare", cols: [{ en: "Unit", ar: "الوحدة" }, { en: "Relative to", ar: "بالنسبة لـ" }, { en: "Use for", ar: "استخدمه لـ" }], rows: [
          ["rem", { en: "Root font size (user setting)", ar: "حجم خط الـ root (إعداد المستخدم)" }, { en: "Font sizes, spacing", ar: "الخطوط والمسافات" }],
          ["em", { en: "The element's own font size", ar: "حجم خط العنصر نفسه" }, { en: "Padding that scales with the text (buttons)", ar: "padding بيكبر مع النص (الزراير)" }],
          ["%", { en: "Parent's size", ar: "مقاس الأب" }, { en: "Widths inside a container", ar: "العرض جوه container" }],
          ["vw / vh", { en: "Viewport", ar: "الشاشة" }, { en: "Hero sizes", ar: "مقاسات الـ hero" }],
          ["dvh / svh", { en: "Viewport minus mobile browser bars (dynamic / small)", ar: "الشاشة من غير شريط المتصفح في الموبايل" }, { en: "Full-height screens on phones", ar: "شاشات بطول كامل على الموبايل" }],
          ["ch", { en: "Width of “0”", ar: "عرض حرف «0»" }, { en: "Readable line length (max-width: 70ch)", ar: "طول سطر مريح (max-width: 70ch)" }]
        ] },
        { type: "code", code: "h1 { font-size: clamp(1.75rem, 1.2rem + 2vw, 3rem); }   /* fluid, with limits */\n\n.card-list { container-type: inline-size; }\n@container (min-width: 500px) {           /* the component reacts to its own width */\n  .card { display: grid; grid-template-columns: 120px 1fr; }\n}\n\n@media (min-width: 768px) { /* mobile-first: base styles are for phones */ }\n@media (prefers-reduced-motion: reduce) { * { animation: none; } }" },
        { type: "pitfalls", items: [
          { en: "<code>100vh</code> on mobile includes the hidden URL bar → content cut off. Use <code>100dvh</code>.", ar: "<code>100vh</code> على الموبايل بيشمل شريط العنوان المستخبي ← المحتوى بيتقص. استخدم <code>100dvh</code>." },
          { en: "px font sizes ignore the user's browser font setting — use rem.", ar: "الخط بالـ px بيتجاهل إعداد حجم الخط عند المستخدم — استخدم rem." }
        ] },
        { type: "projects", items: [{ text: { en: "Smart FAQ matched Figma at 1440 and 390 px and stayed usable in between; Osloop is responsive from 320px.", ar: "Smart FAQ طابق الـ Figma على 1440 و 390 px وفضل شغال في النص؛ و Osloop responsive من 320px." }, p: "smartfaq", tab: "decisions", label: "Smart FAQ" }] }
      ],
      say: "I write mobile-first, size type in rem with clamp for fluid scaling, and use container queries when a component lives in places of different widths.",
      interview: [{ q: "Media queries vs container queries?", a: { en: "Media queries react to the viewport; container queries react to the component's container. A card in a sidebar and in the main area can then lay itself out correctly in both.", ar: "الـ media queries بترد على الشاشة؛ والـ container queries بترد على الـ container بتاع الـ component. فكارت في الـ sidebar وكارت في الـ main يعرفوا يترتبوا صح في الحالتين." } }],
      quiz: [{ q: { en: "Why rem over px for font size?", ar: "ليه rem بدل px للخط؟" }, a: { en: "rem follows the user's root font size (accessibility zoom settings).", ar: "الـ rem بيمشي مع حجم الخط اللي المستخدم مختاره (إعدادات الـ accessibility)." } }],
      quick: [{ en: "Mobile-first; rem + clamp(); 100dvh; container queries for reusable components.", ar: "Mobile-first؛ rem و clamp()؛ 100dvh؛ container queries للـ components اللي بتتكرر." }]
    },
    {
      id: "modern-css",
      title: { en: "Modern CSS: variables, logical properties, :has, nesting", ar: "CSS حديث: variables، logical properties، :has، nesting" },
      tldr: { en: "Custom properties for theming at runtime, logical properties (<code>margin-inline-start</code>) so RTL works for free, <code>:has()</code> as a parent selector, native nesting, and transitions on cheap properties.", ar: "Custom properties للـ theming وقت التشغيل، و logical properties (<code>margin-inline-start</code>) علشان الـ RTL يشتغل ببلاش، و <code>:has()</code> كـ parent selector، و nesting جاهز، و transitions على الخصائص الرخيصة." },
      blocks: [
        { type: "code", code: ":root { --brand: #1f6f5c; --radius: 12px; }\n[data-theme=\"dark\"] { --brand: #5cc4a6; }        /* change at runtime, no rebuild */\n.btn { background: var(--brand); border-radius: var(--radius); }\n\n/* logical properties: correct in LTR and RTL */\n.icon { margin-inline-end: 8px; }   /* not margin-right */\n.panel { padding-block: 16px; inset-inline-start: 0; }\n\n/* parent selector */\n.field:has(input:invalid) label { color: crimson; }\n.card:has(img) { grid-template-rows: 160px 1fr; }\n\n/* native nesting */\n.menu { & a { color: inherit; } &:hover { background: #eee; } }" },
        { type: "compare", title: { en: "CSS variables vs Sass variables", ar: "متغيرات CSS ولا Sass" }, cols: ["", "CSS custom properties", "Sass $vars"], rows: [
          [{ en: "When resolved", ar: "بتتحسب إمتى" }, { en: "At runtime in the browser", ar: "وقت التشغيل في المتصفح" }, { en: "At build time", ar: "وقت الـ build" }],
          [{ en: "Change per theme / element", ar: "تتغير لكل theme أو عنصر" }, { en: "Yes, and they cascade", ar: "أيوه، وبتتورث" }, { en: "No", ar: "لأ" }],
          [{ en: "Readable from JS", ar: "تتقري من JS" }, { en: "Yes (getComputedStyle)", ar: "أيوه (getComputedStyle)" }, { en: "No", ar: "لأ" }]
        ] },
        { type: "projects", items: [{ text: { en: "All his Arabic/English apps (Aquadic, Kalima, this guide) depend on logical properties for RTL.", ar: "كل تطبيقاته العربي والإنجليزي (Aquadic، Kalima، الدليل ده) معتمدة على الـ logical properties علشان الـ RTL." }, p: "aquadic", tab: "decisions", label: "Aquadic" }] }
      ],
      say: "I use logical properties so the same CSS works in Arabic and English, and CSS variables for themes because they change at runtime.",
      interview: [{ q: "How do you support RTL without duplicating CSS?", a: { en: "Set <code>dir</code> on the html element and use logical properties (inline-start/end, block). Flip only directional icons; Tailwind has <code>ms-*</code>/<code>me-*</code> and <code>rtl:</code> variants.", ar: "أحط <code>dir</code> على الـ html وأستخدم logical properties (inline-start/end و block). وأقلب بس الأيقونات اللي ليها اتجاه؛ و Tailwind فيه <code>ms-*</code> و <code>me-*</code> و <code>rtl:</code>." } }],
      quiz: [{ q: { en: "Style a form row red when its input is invalid, no JS?", ar: "تخلي صف الفورم أحمر لما الـ input يبقى غلط من غير JS؟" }, a: { en: "<code>.row:has(input:invalid) { … }</code> (or <code>:user-invalid</code> to wait for interaction).", ar: "<code>.row:has(input:invalid) { … }</code> (أو <code>:user-invalid</code> علشان يستنى المستخدم يتفاعل)." } }],
      quick: [{ en: "Logical properties for RTL; CSS vars for runtime themes; :has() = parent selector.", ar: "Logical properties للـ RTL؛ CSS vars للـ themes؛ :has() = parent selector." }]
    }
  ]
});
