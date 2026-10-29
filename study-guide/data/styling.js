// Styling & design systems — written 2026-10-29.
STUDY.fill("styling", {
  intro: { en: "How to style a React app and keep it consistent: CSS Modules vs Tailwind vs CSS-in-JS, Tailwind in depth, component libraries vs headless, design tokens and Storybook, theming and dark mode.", ar: "إزاي تعمل styling لتطبيق React وتخليه متسق: CSS Modules ولا Tailwind ولا CSS-in-JS، و Tailwind بالتفصيل، ومكتبات الـ components ولا الـ headless، والـ design tokens و Storybook، والـ theming والـ dark mode." },
  topics: [
    {
      id: "approaches",
      title: { en: "CSS Modules vs Tailwind vs CSS-in-JS", ar: "CSS Modules ولا Tailwind ولا CSS-in-JS" },
      tldr: { en: "CSS Modules: plain CSS with locally scoped class names. Tailwind: utility classes in the markup, generated at build time, tiny CSS output. Runtime CSS-in-JS (styled-components, Emotion): styles in JS computed at runtime — dynamic but costly, and awkward with Server Components. Zero-runtime CSS-in-JS (vanilla-extract, Panda) compiles to CSS.", ar: "CSS Modules: CSS عادي بأسماء classes محلية. Tailwind: utility classes في الـ markup بتتولد وقت الـ build، وناتج CSS صغير. و CSS-in-JS وقت التشغيل (styled-components، Emotion): styles في الـ JS بتتحسب وقت التشغيل — مرنة بس مكلفة، وصعبة مع Server Components. و CSS-in-JS من غير runtime (vanilla-extract، Panda) بيتحول لـ CSS." },
      blocks: [
        { type: "compare", cols: ["", "CSS Modules", "Tailwind", { en: "Runtime CSS-in-JS", ar: "CSS-in-JS runtime" }], rows: [
          [{ en: "Runtime cost", ar: "تكلفة التشغيل" }, { en: "None", ar: "صفر" }, { en: "None", ar: "صفر" }, { en: "Yes (style injection)", ar: "أيوه (حقن styles)" }],
          [{ en: "Server Components", ar: "Server Components" }, "✓", "✓", { en: "Needs client components", ar: "محتاج client components" }],
          [{ en: "Consistency", ar: "الاتساق" }, { en: "Up to discipline", ar: "حسب الالتزام" }, { en: "Built-in scale (tokens)", ar: "سلم جاهز (tokens)" }, { en: "Theme objects", ar: "Theme objects" }],
          [{ en: "Dynamic styles", ar: "Styles متغيرة" }, { en: "CSS variables", ar: "CSS variables" }, { en: "Variants + CSS variables", ar: "Variants و CSS variables" }, { en: "Props → styles", ar: "Props ← styles" }]
        ] },
        { type: "projects", items: [{ text: { en: "Tailwind in Smart FAQ (v4), Spectra, okoRent, Bites and the showcase sites; MUI in Bites and the ElevateMate Astro version; Mantine in okoRent and Spectra; PrimeReact in AHS and Boost-KGoal; Sass in Marina.", ar: "Tailwind في Smart FAQ (v4) و Spectra و okoRent و Bites ومواقع العرض؛ و MUI في Bites ونسخة ElevateMate بـ Astro؛ و Mantine في okoRent و Spectra؛ و PrimeReact في AHS و Boost-KGoal؛ و Sass في Marina." }, p: "spectra", tab: "decisions", label: "Spectra" }] }
      ],
      say: "I default to Tailwind with design tokens — no runtime cost, works with server components, and the scale keeps spacing and colours consistent.",
      interview: [{ q: "Why are teams moving away from runtime CSS-in-JS?", a: { en: "It injects styles during render (slower, especially with concurrent rendering), adds bundle size, and doesn't work in Server Components. Tailwind, CSS Modules or zero-runtime libraries avoid that.", ar: "بيحقن الـ styles وقت الـ render (أبطأ، خصوصًا مع الـ concurrent rendering)، وبيكبر الـ bundle، ومش بيشتغل في Server Components. و Tailwind أو CSS Modules أو مكتبات من غير runtime بيتجنبوا ده." } }],
      quiz: [{ q: { en: "Does Tailwind ship every class to the browser?", ar: "Tailwind بيبعت كل الـ classes للمتصفح؟" }, a: { en: "No — only classes found in your source are generated.", ar: "لأ — بس الـ classes اللي موجودة في الكود بتتولد." } }],
      quick: [{ en: "Tailwind/CSS Modules = zero runtime; runtime CSS-in-JS costs and fights RSC.", ar: "Tailwind و CSS Modules = من غير runtime؛ CSS-in-JS runtime مكلف ومش ماشي مع RSC." }]
    },
    {
      id: "tailwind",
      title: { en: "Tailwind in depth", ar: "Tailwind بالتفصيل" },
      tldr: { en: "Utilities map to a design scale (spacing, colours, type). Use variants (<code>hover:</code>, <code>md:</code>, <code>dark:</code>, <code>rtl:</code>, <code>data-[state=open]:</code>), merge conflicting classes with <code>tailwind-merge</code>, and build component variants with <code>cva</code>. v4 configures tokens in CSS with <code>@theme</code>.", ar: "الـ utilities مربوطة بسلم ديزاين (مسافات، ألوان، خط). استخدم الـ variants (<code>hover:</code> و <code>md:</code> و <code>dark:</code> و <code>rtl:</code> و <code>data-[state=open]:</code>)، وادمج الـ classes المتعارضة بـ <code>tailwind-merge</code>، واعمل variants للـ components بـ <code>cva</code>. و v4 بيضبط الـ tokens في الـ CSS بـ <code>@theme</code>." },
      blocks: [
        { type: "code", code: "@import \"tailwindcss\";\n@theme { --color-brand: #5b3fd6; --radius-tile: 12px; --font-sans: \"Inter Variable\", sans-serif; }\n\nconst button = cva(\"inline-flex items-center gap-2 rounded-tile font-medium\", {\n  variants: {\n    tone: { primary: \"bg-brand text-white\", danger: \"bg-red-600 text-white\", ghost: \"bg-transparent\" },\n    size: { sm: \"h-8 px-3 text-sm\", md: \"h-10 px-4\" },\n  },\n  defaultVariants: { tone: \"primary\", size: \"md\" },\n});\nexport const cn = (...c: ClassValue[]) => twMerge(clsx(c));\n<button className={cn(button({ tone }), className)} />    // caller's px-6 wins over px-4" },
        { type: "pitfalls", items: [
          { en: "Building class names dynamically (<code>`bg-${color}-500`</code>) — the compiler can't see them. Map to full class strings.", ar: "تبني أسماء classes بشكل dynamic (<code>`bg-${color}-500`</code>) — الـ compiler مش هيشوفها. اربطها بـ strings كاملة." },
          { en: "Very long class lists → extract a component or a cva variant, not @apply everywhere.", ar: "قوايم classes طويلة جدًا ← اعمل component أو cva variant، مش @apply في كل حتة." }
        ] },
        { type: "projects", items: [{ text: { en: "Smart FAQ: Tailwind v4 tokens, cva + a custom <code>cn</code> extended with the project's type scale; dialog/heading/danger-button tokens added from Figma.", ar: "Smart FAQ: tokens بـ Tailwind v4، و cva مع <code>cn</code> مخصوص متوسع بسلم الخطوط بتاع المشروع؛ و tokens للـ dialog والعناوين وزرار الخطر من Figma." }, p: "smartfaq", tab: "decisions", label: "Smart FAQ" }] }
      ],
      say: "Tailwind tokens come from the design, components expose variants with cva, and tailwind-merge lets callers override safely.",
      interview: [{ q: "Don't utility classes make the markup unreadable?", a: { en: "They can; the fix is components and variants. The payoff is no naming, no dead CSS, styles next to markup and a consistent scale — and the CSS stays small as the app grows.", ar: "ممكن؛ والحل components و variants. والمكسب: من غير تسمية، ومن غير CSS ميت، والـ styles جنب الـ markup، وسلم متسق — والـ CSS بيفضل صغير مهما التطبيق كبر." } }],
      quiz: [{ q: { en: "Two conflicting paddings in one className — which tool resolves it?", ar: "اتنين padding متعارضين في className واحد — أنهي أداة بتحل ده؟" }, a: { en: "tailwind-merge (the last one wins).", ar: "tailwind-merge (الأخير بيكسب)." } }],
      quick: [{ en: "@theme tokens (v4); cva variants; cn = clsx + twMerge; no dynamic class strings.", ar: "tokens بـ @theme (v4)؛ variants بـ cva؛ cn = clsx و twMerge؛ من غير classes dynamic." }]
    },
    {
      id: "component-libraries",
      title: { en: "Component libraries vs headless vs shadcn", ar: "مكتبات Components ولا headless ولا shadcn" },
      tldr: { en: "Full kits (MUI, Mantine, PrimeReact, Ant Design) give styled, ready components — fastest for admin-heavy apps, harder to make fully custom. Headless (Radix, React Aria) give behaviour + accessibility only. shadcn/ui copies Radix-based components into your repo so you own the code and styling.", ar: "المكتبات الكاملة (MUI، Mantine، PrimeReact، Ant Design) بتدي components جاهزة ومتستيلة — أسرع حاجة لتطبيقات فيها أدمن كتير، بس صعب تخليها مخصوصة بالكامل. والـ headless (Radix، React Aria) بتدي السلوك والـ accessibility بس. و shadcn/ui بينسخ components مبنية على Radix جوه الـ repo بتاعك فانت ماسك الكود والستايل." },
      blocks: [
        { type: "compare", cols: [{ en: "Option", ar: "الاختيار" }, { en: "Speed", ar: "السرعة" }, { en: "Custom look", ar: "شكل مخصوص" }, { en: "Fits", ar: "مناسب لـ" }], rows: [
          ["MUI / Mantine / PrimeReact", { en: "Fastest", ar: "الأسرع" }, { en: "Theming, fights at edges", ar: "Theming، وبيتخانق في التفاصيل" }, { en: "Dense back offices, internal tools", ar: "باك أوفيس مليان، أدوات داخلية" }],
          ["shadcn/ui (Radix)", { en: "Fast", ar: "سريع" }, { en: "Full control (you own it)", ar: "تحكم كامل (الكود بتاعك)" }, { en: "Custom Figma designs", ar: "ديزاين Figma مخصوص" }],
          ["Radix / React Aria", { en: "Medium", ar: "متوسط" }, { en: "Total", ar: "كامل" }, { en: "Your own design system", ar: "Design system بتاعك" }]
        ] },
        { type: "projects", items: [
          { text: { en: "Smart FAQ chose shadcn + Radix for a pixel-accurate custom design; okoRent chose Mantine for four admin-heavy portals.", ar: "Smart FAQ اختار shadcn و Radix لديزاين مخصوص بالبيكسل؛ و okoRent اختار Mantine لأربع بوابات فيها أدمن كتير." }, p: "smartfaq", tab: "decisions", label: "Smart FAQ" }
        ] }
      ],
      say: "For a custom design I use shadcn on Radix so we own the components; for dense back offices a full kit like Mantine ships faster.",
      interview: [{ q: "Why might you avoid mixing two component libraries?", a: { en: "Two looks, two theming systems, duplicated components (two date pickers) and double the bundle. Pick one and wrap it in your own components.", ar: "شكلين، ونظامين theming، و components مكررة (اتنين date picker)، و bundle الضعف. اختار واحدة ولفها في components بتاعتك." } }],
      quiz: [{ q: { en: "Where does shadcn's code live?", ar: "كود shadcn موجود فين؟" }, a: { en: "In your repo — it's copied, not installed as a dependency.", ar: "في الـ repo بتاعك — بيتنسخ مش بيتنزل كـ dependency." } }],
      quick: [{ en: "Kits = speed; headless = behaviour + a11y; shadcn = own the Radix-based code; one library per app.", ar: "المكتبات الكاملة = سرعة؛ headless = سلوك و a11y؛ shadcn = الكود بتاعك فوق Radix؛ مكتبة واحدة لكل تطبيق." }]
    },
    {
      id: "design-systems",
      title: { en: "Design systems, tokens and Storybook", ar: "الـ Design systems والـ tokens و Storybook" },
      tldr: { en: "A design system = tokens (colours, spacing, type, radius, shadow) + components + rules for using them. Tokens come from design (Figma variables) into code (CSS variables/Tailwind theme). Storybook documents every component and state in isolation, with a11y and visual checks.", ar: "الـ design system = tokens (ألوان، مسافات، خطوط، زوايا، ظلال) + components + قواعد استخدامهم. والـ tokens جاية من الديزاين (Figma variables) للكود (CSS variables أو Tailwind theme). و Storybook بيوثق كل component وكل حالة لوحده، ومعاه فحص a11y وفحص شكلي." },
      blocks: [
        { type: "list", items: [
          { en: "<b>Primitive tokens</b> (blue-600) → <b>semantic tokens</b> (color-action, color-danger) — components only use semantic ones, so themes swap underneath.", ar: "<b>Tokens أساسية</b> (blue-600) ← <b>tokens بمعنى</b> (color-action، color-danger) — الـ components بتستخدم اللي بمعنى بس، فالـ themes تتغير من تحت." },
          { en: "A story per state: default, hover/focus, loading, empty, error, long text, RTL, mobile.", ar: "Story لكل حالة: العادي، hover و focus، loading، فاضي، error، نص طويل، RTL، موبايل." },
          { en: "Version and document it; deprecate before deleting.", ar: "حط version ووثّقه؛ اعمل deprecate قبل ما تمسح." }
        ] },
        { type: "projects", items: [{ text: { en: "Smart FAQ: design tokens and brand assets first, Atomic Design components, 75 Storybook stories with the a11y addon.", ar: "Smart FAQ: الـ tokens والـ brand assets الأول، و components بـ Atomic Design، و 75 Storybook story بالـ a11y addon." }, p: "smartfaq", tab: "overview", label: "Smart FAQ" }] }
      ],
      say: "I build design systems token-first — semantic tokens from Figma, components that only use them, and a Storybook story for every state including RTL and errors.",
      interview: [{ q: "How do you keep design and code in sync?", a: { en: "Tokens as the shared language (Figma variables ↔ CSS variables), components reviewed against Figma in Storybook, and design reviews on stories instead of on finished pages.", ar: "الـ tokens كلغة مشتركة (Figma variables ↔ CSS variables)، والـ components بتتراجع مع Figma في Storybook، ومراجعات الديزاين على الـ stories مش على الصفحات الخلصانة." } }],
      quiz: [{ q: { en: "Why semantic tokens over raw colours?", ar: "ليه tokens بمعنى بدل ألوان مباشرة؟" }, a: { en: "Themes (dark, brand) change values without touching components.", ar: "الـ themes (dark، براند) بتغير القيم من غير ما تلمس الـ components." } }],
      quick: [{ en: "Primitive → semantic tokens; components use semantic; Storybook story per state (RTL, error, long text).", ar: "Tokens أساسية ← tokens بمعنى؛ الـ components بتستخدم اللي بمعنى؛ story لكل حالة (RTL، error، نص طويل)." }]
    },
    {
      id: "theming",
      title: { en: "Theming and dark mode", ar: "الـ Theming والـ Dark mode" },
      tldr: { en: "Define colours as CSS variables, switch them with <code>prefers-color-scheme</code> and a <code>data-theme</code> attribute for a manual choice, remember the choice, and set it before first paint to avoid a flash. Check contrast in both themes.", ar: "عرّف الألوان كـ CSS variables، وغيّرها بـ <code>prefers-color-scheme</code> و attribute <code>data-theme</code> للاختيار اليدوي، واحفظ الاختيار، وحطه قبل أول رسم علشان متحصلش رعشة. واتأكد من الـ contrast في الاتنين." },
      blocks: [
        { type: "code", code: ":root { --bg: #fff; --text: #111; }\n@media (prefers-color-scheme: dark) { :root:not([data-theme=\"light\"]) { --bg: #111; --text: #eee; } }\n:root[data-theme=\"dark\"] { --bg: #111; --text: #eee; }\n\n<!-- inline in <head>, before CSS paints: no flash of the wrong theme -->\n<script>try { const t = localStorage.getItem(\"theme\"); if (t) document.documentElement.dataset.theme = t; } catch {}</script>" },
        { type: "projects", items: [{ text: { en: "Osloop website: light/dark toggle (light default, choice remembered); this guide and the handbook follow the system theme.", ar: "موقع Osloop: زرار light/dark (الافتراضي light والاختيار بيتحفظ)؛ والدليل ده والـ handbook بيمشوا مع theme النظام." } }] }
      ],
      say: "Themes are just different values for the same semantic variables, applied before first paint so there's no flash.",
      interview: [{ q: "How do you avoid the flash of the wrong theme with SSR?", a: { en: "A tiny inline script in the head sets data-theme from storage before the CSS paints (or a cookie read on the server).", ar: "script صغير inline في الـ head بيحط data-theme من الـ storage قبل ما الـ CSS يرسم (أو كوكي بيتقري على السيرفر)." } }],
      quiz: [{ q: { en: "Media query for the OS dark setting?", ar: "الـ media query لإعداد الـ dark في النظام؟" }, a: { en: "prefers-color-scheme: dark.", ar: "prefers-color-scheme: dark." } }],
      quick: [{ en: "CSS variables + prefers-color-scheme + data-theme; inline script avoids flash; contrast in both.", ar: "CSS variables و prefers-color-scheme و data-theme؛ script inline بيمنع الرعشة؛ contrast في الاتنين." }]
    }
  ]
});
