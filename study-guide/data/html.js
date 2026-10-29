// HTML — written 2026-10-29. Block types: text · code · list · compare · when · pitfalls · projects (see README.md).
STUDY.fill("html", {
  intro: { en: "The structure under every React app: semantic elements, the document head, script loading, forms, images and the native elements people forget.", ar: "الهيكل اللي تحت أي React app: العناصر الـ semantic، الـ head، تحميل الـ scripts، الفورمز، الصور، والعناصر الجاهزة اللي الناس بتنساها." },
  topics: [
    {
      id: "semantics",
      title: { en: "Semantic HTML", ar: "الـ Semantic HTML" },
      tldr: { en: "Use the element that describes the meaning (<code>button</code>, <code>nav</code>, <code>article</code>), not a styled <code>div</code>. You get keyboard support, screen-reader roles and better SEO for free.", ar: "استخدم العنصر اللي بيوصف المعنى (<code>button</code>، <code>nav</code>، <code>article</code>)، مش <code>div</code> متستيل. هتاخد دعم الكيبورد، و roles لقارئ الشاشة، و SEO أحسن ببلاش." },
      blocks: [
        { type: "text", body: { en: "<p>The browser and assistive tech read <b>roles</b> from elements. <code>&lt;button&gt;</code> is focusable, fires on Enter and Space, and is announced as “button”. A <code>&lt;div onClick&gt;</code> has none of that — you'd need <code>role</code>, <code>tabIndex</code> and key handlers to fake it.</p><p><b>Landmarks</b> (<code>header</code>, <code>nav</code>, <code>main</code>, <code>aside</code>, <code>footer</code>) let screen-reader users jump between regions. Headings <code>h1–h6</code> build the page outline — don't pick them for their size.</p>", ar: "<p>المتصفح وأدوات الـ accessibility بيقروا الـ <b>role</b> من العنصر. الـ <code>&lt;button&gt;</code> بياخد focus، وبيشتغل بـ Enter و Space، والـ screen reader بيقول «button». لكن <code>&lt;div onClick&gt;</code> مفيهوش أي حاجة من دي. هتحتاج <code>role</code> و <code>tabIndex</code> و key handlers علشان تقلّده.</p><p>الـ <b>landmarks</b> (<code>header</code> و <code>nav</code> و <code>main</code> و <code>aside</code> و <code>footer</code>) بتخلي اليوزر اللي بيستخدم screen reader ينط بين أجزاء الصفحة. والـ headings من <code>h1</code> لـ <code>h6</code> بتعمل هيكل الصفحة، فمتختارهاش علشان حجمها.</p>" } },
        { type: "compare", title: { en: "Look-alike elements", ar: "عناصر شبه بعض" },
          cols: [{ en: "Element", ar: "العنصر" }, { en: "Meaning", ar: "معناه" }, { en: "Use it for", ar: "استخدمه لـ" }],
          rows: [
            ["<code>section</code>", { en: "A themed part of the page, usually with a heading", ar: "جزء من الصفحة ليه موضوع، غالبًا بعنوان" }, { en: "Chapters of one page (pricing, FAQ)", ar: "أجزاء الصفحة الواحدة (الأسعار، الأسئلة)" }],
            ["<code>article</code>", { en: "Content that makes sense on its own", ar: "محتوى ليه معنى لوحده" }, { en: "A post, a product card, a comment", ar: "بوست، كارت منتج، كومنت" }],
            ["<code>div</code>", { en: "No meaning — a box for styling", ar: "ملوش معنى — صندوق للـ styling" }, { en: "Layout wrappers only", ar: "غلاف للـ layout بس" }],
            ["<code>button</code>", { en: "Does something here", ar: "بيعمل حاجة هنا" }, { en: "Submit, open a dialog, toggle", ar: "Submit، يفتح dialog، toggle" }],
            ["<code>a href</code>", { en: "Goes somewhere", ar: "بيوديك مكان" }, { en: "Navigation (new URL)", ar: "التنقل (URL جديد)" }]
          ] },
        { type: "pitfalls", items: [
          { en: "<code>&lt;a&gt;</code> without <code>href</code> is not focusable — and a link that acts like a button confuses screen readers.", ar: "<code>&lt;a&gt;</code> من غير <code>href</code> مش بياخد focus — واللينك اللي بيتصرف زي زرار بيلخبط قارئ الشاشة." },
          { en: "More than one <code>main</code>, or skipping heading levels (h1 → h4).", ar: "أكتر من <code>main</code>، أو تنط في الـ headings (من h1 لـ h4)." },
          { en: "In React, <code>&lt;button&gt;</code> inside a <code>&lt;form&gt;</code> defaults to <code>type=\"submit\"</code> — set <code>type=\"button\"</code> for other actions.", ar: "في React، أي <code>&lt;button&gt;</code> جوه <code>&lt;form&gt;</code> نوعه الافتراضي <code>submit</code> — حط <code>type=\"button\"</code> للأكشنز التانية." }
        ] },
        { type: "projects", items: [
          { text: { en: "Smart FAQ uses Radix primitives (real buttons, dialogs, menus) and <code>useId</code> to wire labels — semantics come built in.", ar: "Smart FAQ بيستخدم Radix (زراير و dialogs ومنيوهات حقيقية) و <code>useId</code> لربط الـ labels — فالـ semantics جاهزة." }, p: "smartfaq", tab: "decisions", label: "Smart FAQ" }
        ] }
      ],
      say: "I use the element that matches the meaning — a button for actions, a link for navigation — so keyboard and screen-reader support come for free.",
      interview: [
        { q: "Why not just use divs with onClick?", a: { en: "A div isn't focusable, doesn't react to Enter/Space and has no role. You'd have to rebuild what <code>button</code> already gives you, and you'd probably miss something.", ar: "الـ div مش بياخد focus، ومش بيرد على Enter و Space، وملوش role. هتضطر تعيد بناء اللي الـ <code>button</code> بيديهولك، وغالبًا هتنسى حاجة." },
          follow: [{ q: "When is a link styled as a button correct?", a: { en: "When it navigates (e.g. “Sign up” going to /register). Meaning decides the element; CSS decides the look.", ar: "لما بيعمل navigation (زي «Sign up» بيروح /register). المعنى بيحدد العنصر، والـ CSS بيحدد الشكل." } }] },
        { q: "section vs article vs div?", a: { en: "<code>article</code> stands alone (could be syndicated), <code>section</code> is a themed part of a page with a heading, <code>div</code> has no meaning and is for styling.", ar: "<code>article</code> ليه معنى لوحده (ينفع يتنشر لوحده)، و <code>section</code> جزء له موضوع وعنوان، و <code>div</code> ملوش معنى وللـ styling بس." } }
      ],
      quiz: [
        { q: { en: "Which element should “Delete” in a row menu be?", ar: "زرار «Delete» في منيو الصف المفروض يبقى أنهي عنصر؟" }, a: { en: "<code>button type=\"button\"</code> — it performs an action, it doesn't navigate.", ar: "<code>button type=\"button\"</code> — بيعمل أكشن، مش بيوديك مكان." } },
        { q: { en: "What do landmarks give screen-reader users?", ar: "الـ landmarks بتدي مستخدم قارئ الشاشة إيه؟" }, a: { en: "Shortcuts to jump between page regions (nav, main, footer).", ar: "اختصارات ينط بيها بين أجزاء الصفحة (nav، main، footer)." } }
      ],
      quick: [
        { en: "Meaning decides the element, CSS decides the look.", ar: "المعنى بيحدد العنصر، والـ CSS بيحدد الشكل." },
        { en: "button = action, a href = navigation.", ar: "button = أكشن، a href = تنقل." },
        { en: "One h1, no skipped heading levels, one main.", ar: "h1 واحد، متنطش في الـ headings، و main واحد." }
      ]
    },
    {
      id: "head-and-scripts",
      title: { en: "The head, meta tags and script loading", ar: "الـ head والـ meta وتحميل الـ scripts" },
      tldr: { en: "The head tells the browser how to render (charset, viewport), how to share the page (title, description, Open Graph) and what to fetch early. Scripts with <code>defer</code> download in parallel and run in order after parsing; <code>async</code> runs as soon as it arrives.", ar: "الـ head بيقول للمتصفح يرسم إزاي (charset و viewport)، والصفحة تتشارك إزاي (title و description و Open Graph)، ويجيب إيه بدري. والـ script اللي عليه <code>defer</code> بيتحمّل بالتوازي، وبيشتغل بالترتيب بعد الـ parsing. أما <code>async</code> فبيشتغل أول ما يوصل." },
      blocks: [
        { type: "code", title: { en: "A solid head", ar: "head كويس" }, code: "<!doctype html>                         <!-- standards mode -->\n<html lang=\"en\" dir=\"ltr\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Orders — Acme</title>\n  <meta name=\"description\" content=\"Track and manage your orders.\">\n  <meta property=\"og:title\" content=\"Orders — Acme\">   <!-- link previews -->\n  <link rel=\"preconnect\" href=\"https://api.acme.com\">\n  <link rel=\"preload\" href=\"/fonts/inter.woff2\" as=\"font\" type=\"font/woff2\" crossorigin>\n  <script src=\"/app.js\" defer></script>\n</head>" },
        { type: "compare", title: { en: "How a script loads", ar: "الـ script بيتحمل إزاي" },
          cols: ["", { en: "Blocks HTML parsing?", ar: "بيوقف الـ parsing؟" }, { en: "Runs when", ar: "بيشتغل إمتى" }, { en: "Order kept?", ar: "بيحافظ على الترتيب؟" }],
          rows: [
            ["<code>&lt;script&gt;</code>", { en: "Yes — download and run", ar: "أيوه — تحميل وتشغيل" }, { en: "Immediately", ar: "على طول" }, { en: "Yes", ar: "أيوه" }],
            ["<code>defer</code>", { en: "No", ar: "لأ" }, { en: "After parsing, before DOMContentLoaded", ar: "بعد الـ parsing، قبل DOMContentLoaded" }, { en: "Yes", ar: "أيوه" }],
            ["<code>async</code>", { en: "No (pauses only to run)", ar: "لأ (بيوقف وقت التشغيل بس)" }, { en: "As soon as downloaded", ar: "أول ما يتحمل" }, { en: "No", ar: "لأ" }],
            ["<code>type=\"module\"</code>", { en: "No", ar: "لأ" }, { en: "Like defer by default", ar: "زي defer افتراضيًا" }, { en: "Yes", ar: "أيوه" }]
          ] },
        { type: "when", title: { en: "async or defer?", ar: "async ولا defer؟" },
          use: [{ en: "<b>defer</b>: your app code that needs the DOM or other scripts.", ar: "<b>defer</b>: كود التطبيق اللي محتاج الـ DOM أو scripts تانية." }, { en: "<b>async</b>: independent scripts — analytics, ads.", ar: "<b>async</b>: scripts مستقلة — analytics، إعلانات." }],
          avoid: [{ en: "async for scripts that depend on each other (order is random).", ar: "async لـ scripts معتمدة على بعض (الترتيب عشوائي)." }, { en: "Plain blocking scripts in the head.", ar: "Scripts عادية بتوقف الـ parsing في الـ head." }] },
        { type: "pitfalls", items: [
          { en: "Missing viewport meta → mobile renders a 980px desktop page zoomed out.", ar: "من غير viewport meta ← الموبايل بيعرض صفحة desktop عرضها 980px وصغيرة." },
          { en: "Preloading too much competes with what's really critical.", ar: "لو عملت preload لحاجات كتير هتزاحم الحاجات المهمة فعلًا." },
          { en: "Missing <code>&lt;!doctype html&gt;</code> → quirks mode and odd CSS.", ar: "من غير <code>&lt;!doctype html&gt;</code> ← quirks mode و CSS غريب." }
        ] },
        { type: "projects", items: [
          { text: { en: "Zeustra: SEO data and meta per page (Astro). okoRent/Bites: Next.js <code>metadata</code> generates these tags for you.", ar: "Zeustra: بيانات SEO و meta لكل صفحة (Astro). okoRent و Bites: الـ <code>metadata</code> في Next.js بيولّد الـ tags دي." }, p: "okorent", tab: "decisions", label: "okoRent" }
        ] }
      ],
      say: "App scripts get defer so they download in parallel and run in order after parsing; independent third-party scripts get async.",
      interview: [
        { q: "What's the difference between async and defer?", a: { en: "Both download without blocking parsing. <code>defer</code> runs after parsing, in document order, before DOMContentLoaded. <code>async</code> runs as soon as it arrives, in any order.", ar: "الاتنين بيتحملوا من غير ما يوقفوا الـ parsing. <code>defer</code> بيشتغل بعد الـ parsing بترتيب الصفحة وقبل DOMContentLoaded. و <code>async</code> بيشتغل أول ما يوصل وبأي ترتيب." },
          follow: [{ q: "Why do module scripts behave like defer?", a: { en: "Modules can import each other, so the browser must fetch the graph first; deferring is the safe default.", ar: "الـ modules بتعمل import لبعض، فالمتصفح لازم يجيب الشجرة كلها الأول. علشان كده الـ defer هو الافتراضي الآمن." } },
                   { q: "preload vs prefetch vs preconnect?", a: { en: "preload = needed now on this page; prefetch = probably needed on the next page (low priority); preconnect = open the connection (DNS, TCP, TLS) to an origin early.", ar: "الـ preload معناه «محتاجه دلوقتي في الصفحة دي». والـ prefetch معناه «غالبًا هتحتاجه في الصفحة الجاية»، وأولويته قليلة. والـ preconnect معناه «افتح الاتصال بدري» (DNS و TCP و TLS)." } }] }
      ],
      quiz: [
        { q: { en: "Two scripts, B needs A. async or defer?", ar: "scriptين، B محتاج A. async ولا defer؟" }, a: { en: "defer — it keeps document order.", ar: "defer — بيحافظ على الترتيب." } },
        { q: { en: "What does the viewport meta fix?", ar: "الـ viewport meta بيصلّح إيه؟" }, a: { en: "It makes mobile use the device width instead of a ~980px virtual desktop width.", ar: "بيخلي الموبايل يستخدم عرض الجهاز بدل عرض desktop وهمي حوالي 980px." } }
      ],
      quick: [
        { en: "defer = parallel download, ordered, after parsing. async = whenever ready, unordered.", ar: "defer = تحميل بالتوازي، بالترتيب، بعد الـ parsing. async = أول ما يجهز، من غير ترتيب." },
        { en: "preload (now) · prefetch (next page) · preconnect (warm the connection).", ar: "preload (دلوقتي) · prefetch (الصفحة الجاية) · preconnect (سخّن الاتصال)." }
      ]
    },
    {
      id: "forms",
      title: { en: "Forms the native way", ar: "الفورمز بالطريقة الأصلية" },
      tldr: { en: "A real <code>form</code> gives you Enter-to-submit, built-in validation, autofill and <code>FormData</code>. Every input needs a <code>label</code>. Libraries like react-hook-form build on this, they don't replace it.", ar: "الـ <code>form</code> الحقيقي بيديك submit بـ Enter، و validation جاهز، و autofill، و <code>FormData</code>. وكل input محتاج <code>label</code>. مكتبات زي react-hook-form بتبني على ده، مش بتلغيه." },
      blocks: [
        { type: "code", code: "<form action=\"/login\" method=\"post\" novalidate>\n  <label for=\"email\">Email</label>\n  <input id=\"email\" name=\"email\" type=\"email\" autocomplete=\"email\" required>\n\n  <label>Password\n    <input name=\"password\" type=\"password\" autocomplete=\"current-password\" minlength=\"8\" required>\n  </label>\n\n  <fieldset>\n    <legend>Plan</legend>\n    <label><input type=\"radio\" name=\"plan\" value=\"free\" checked> Free</label>\n    <label><input type=\"radio\" name=\"plan\" value=\"pro\"> Pro</label>\n  </fieldset>\n\n  <button type=\"submit\">Sign in</button>\n</form>\n\n// JS: read everything at once\nform.addEventListener(\"submit\", (e) => {\n  e.preventDefault();\n  const data = Object.fromEntries(new FormData(e.currentTarget));\n});", note: { en: "<code>novalidate</code> turns off the browser's bubbles when you show your own errors — the constraints still work through the Validity API.", ar: "<code>novalidate</code> بيقفل رسايل المتصفح لما تعرض الأخطاء بنفسك — بس القيود لسه شغالة عن طريق الـ Validity API." } },
        { type: "list", title: { en: "Why it matters", ar: "ليه ده مهم" }, items: [
          { en: "<code>label for</code> (or wrapping) → clicking the label focuses the input, screen readers read it.", ar: "<code>label for</code> (أو اللف) ← الضغط على الـ label بيعمل focus، وقارئ الشاشة بيقراه." },
          { en: "<code>name</code> is what ends up in <code>FormData</code> and the request.", ar: "الـ <code>name</code> هو اللي بيظهر في <code>FormData</code> وفي الـ request." },
          { en: "<code>type</code> + <code>autocomplete</code> → right mobile keyboard and password-manager autofill.", ar: "<code>type</code> و <code>autocomplete</code> ← الكيبورد الصح في الموبايل و autofill من مدير الباسوردات." },
          { en: "<code>fieldset</code> + <code>legend</code> group radios/checkboxes under one question.", ar: "<code>fieldset</code> و <code>legend</code> بيجمعوا الـ radios والـ checkboxes تحت سؤال واحد." }
        ] },
        { type: "compare", title: { en: "Controlled vs uncontrolled (React)", ar: "Controlled ولا uncontrolled (React)" },
          cols: ["", { en: "Value lives in", ar: "القيمة فين" }, { en: "Re-renders", ar: "الـ re-renders" }, { en: "Good for", ar: "كويس لـ" }],
          rows: [
            [{ en: "Controlled", ar: "Controlled" }, "React state", { en: "Every keystroke", ar: "مع كل حرف" }, { en: "Live formatting, dependent fields", ar: "تنسيق لايف، fields معتمدة على بعض" }],
            [{ en: "Uncontrolled", ar: "Uncontrolled" }, { en: "The DOM (refs / FormData)", ar: "الـ DOM (refs / FormData)" }, { en: "Only when you need them", ar: "بس لما تحتاج" }, { en: "Big forms, performance — react-hook-form's model", ar: "فورمز كبيرة، أداء — ده أسلوب react-hook-form" }]
          ] },
        { type: "pitfalls", items: [
          { en: "Placeholder is not a label — it disappears and has poor contrast.", ar: "الـ placeholder مش label — بيختفي و contrast بتاعه ضعيف." },
          { en: "Client validation is UX only; the server must validate again.", ar: "الـ validation في الفرونت للتجربة بس، والسيرفر لازم يعمل validation تاني." }
        ] },
        { type: "projects", items: [
          { text: { en: "Smart FAQ: react-hook-form + Zod, and the API's 422 field errors mapped back onto the inputs.", ar: "Smart FAQ: react-hook-form مع Zod، وأخطاء الـ 422 من الـ API بترجع على الـ inputs." }, p: "smartfaq", tab: "hooks", label: "Smart FAQ" },
          { text: { en: "AHS formula editor: client check for instant feedback, server check before saving.", ar: "الـ formula editor في AHS: فحص في الفرونت للرد السريع، وفحص في السيرفر قبل الحفظ." }, p: "ahs", tab: "decisions", label: "AHS" }
        ] }
      ],
      say: "I start from a real form with labels and names, then add react-hook-form and a schema on top; the server still validates.",
      interview: [
        { q: "Controlled vs uncontrolled inputs — which do you prefer?", a: { en: "For big forms uncontrolled (react-hook-form registers refs), so typing doesn't re-render the whole form. Controlled when a value drives other UI on every keystroke.", ar: "للفورمز الكبيرة uncontrolled (react-hook-form بيسجل refs)، فالكتابة مش بتعمل re-render للفورم كله. و controlled لما القيمة بتغير UI تاني مع كل حرف." },
          follow: [{ q: "How do you show server validation errors?", a: { en: "Map the API's field errors to the form fields (<code>setError</code>) and keep a general error for the rest.", ar: "أربط أخطاء الـ fields اللي جاية من الـ API بالـ fields (<code>setError</code>)، وأسيب error عام للباقي." } }] }
      ],
      quiz: [
        { q: { en: "Pressing Enter in an input does nothing. Likely cause?", ar: "Enter في input مش بيعمل حاجة. السبب المحتمل؟" }, a: { en: "There's no <code>form</code> element (or no submit button) — the inputs aren't inside a real form.", ar: "مفيش <code>form</code> (أو مفيش submit button) — الـ inputs مش جوه فورم حقيقي." } }
      ],
      quick: [
        { en: "Every input: label + name + right type + autocomplete.", ar: "كل input: label و name و type صح و autocomplete." },
        { en: "Client validation = UX; server validation = truth.", ar: "الـ validation في الفرونت للتجربة، وفي السيرفر للحقيقة." }
      ]
    },
    {
      id: "images-media",
      title: { en: "Images and media", ar: "الصور والميديا" },
      tldr: { en: "Always set <code>width</code>/<code>height</code> (no layout shift), lazy-load below the fold, serve the right size with <code>srcset</code>/<code>sizes</code> and modern formats with <code>picture</code>. <code>alt</code> describes the image — empty for decoration.", ar: "دايمًا حط <code>width</code> و <code>height</code> (من غير layout shift)، واعمل lazy-load للي تحت، وابعت المقاس الصح بـ <code>srcset</code> و <code>sizes</code>، والصيغ الحديثة بـ <code>picture</code>. والـ <code>alt</code> بيوصف الصورة — فاضي لو للزينة." },
      blocks: [
        { type: "code", code: "<picture>\n  <source srcset=\"/hero.avif\" type=\"image/avif\">\n  <source srcset=\"/hero.webp\" type=\"image/webp\">\n  <img src=\"/hero.jpg\" alt=\"Runner on the corniche at sunrise\"\n       width=\"1200\" height=\"600\" fetchpriority=\"high\">\n</picture>\n\n<img src=\"/card-400.jpg\"\n     srcset=\"/card-400.jpg 400w, /card-800.jpg 800w\"\n     sizes=\"(max-width: 600px) 100vw, 400px\"\n     alt=\"\" width=\"400\" height=\"300\" loading=\"lazy\" decoding=\"async\">" },
        { type: "when", use: [{ en: "<code>loading=\"lazy\"</code> for images below the fold.", ar: "<code>loading=\"lazy\"</code> للصور اللي تحت." }, { en: "<code>fetchpriority=\"high\"</code> for the LCP hero image.", ar: "<code>fetchpriority=\"high\"</code> لصورة الـ hero اللي هي الـ LCP." }], avoid: [{ en: "Lazy-loading the hero/LCP image — it delays your main metric.", ar: "Lazy-load لصورة الـ hero — بيأخر أهم metric." }, { en: "Missing dimensions — causes CLS when the image arrives.", ar: "من غير أبعاد — بيعمل CLS لما الصورة توصل." }] },
        { type: "projects", items: [
          { text: { en: "Osloop website: project stills download only where they're seen (lazy media).", ar: "موقع Osloop: صور المشاريع بتتحمل بس لما تبان (lazy media)." } }
        ] }
      ],
      say: "Every image gets dimensions to avoid layout shift, below-the-fold images are lazy, and the hero gets high fetch priority because it's usually the LCP.",
      interview: [
        { q: "How do srcset and sizes work together?", a: { en: "<code>srcset</code> lists files and their widths; <code>sizes</code> tells the browser how wide the image will display at each breakpoint. The browser picks the smallest file that's sharp enough for that width and pixel density.", ar: "الـ <code>srcset</code> بيقول الملفات وعرض كل واحد. والـ <code>sizes</code> بيقول الصورة هتظهر بعرض قد إيه في كل breakpoint. والمتصفح بيختار أصغر ملف واضح كفاية، للعرض ده ولكثافة الشاشة." } }
      ],
      quiz: [
        { q: { en: "Decorative divider image — what alt?", ar: "صورة فاصل للزينة — الـ alt إيه؟" }, a: { en: "<code>alt=\"\"</code> so screen readers skip it (missing alt makes them read the file name).", ar: "<code>alt=\"\"</code> علشان قارئ الشاشة يتجاهلها (من غير alt بيقرا اسم الملف)." } }
      ],
      quick: [
        { en: "width/height always · lazy below the fold · never lazy the LCP image.", ar: "width و height دايمًا · lazy للي تحت · عمرك ما تعمل lazy لصورة الـ LCP." }
      ]
    },
    {
      id: "native-elements",
      title: { en: "Native elements people forget", ar: "عناصر جاهزة الناس بتنساها" },
      tldr: { en: "<code>dialog</code>, <code>details/summary</code>, <code>datalist</code>, <code>output</code>, <code>time</code>, <code>data-*</code> attributes and the <code>inert</code> attribute solve common UI needs with built-in accessibility.", ar: "<code>dialog</code> و <code>details/summary</code> و <code>datalist</code> و <code>output</code> و <code>time</code> و <code>data-*</code> و <code>inert</code> بيحلوا حاجات UI كتير بـ accessibility جاهزة." },
      blocks: [
        { type: "code", code: "<dialog id=\"confirm\">\n  <form method=\"dialog\">          <!-- submitting closes the dialog -->\n    <p>Delete this order?</p>\n    <button value=\"cancel\">Cancel</button>\n    <button value=\"ok\">Delete</button>\n  </form>\n</dialog>\n\n// showModal(): focus trap, Esc to close, ::backdrop, top layer\ndocument.getElementById(\"confirm\").showModal();\n\n<details><summary>Shipping</summary>2–4 days.</details>   <!-- accordion, no JS -->\n<li data-id=\"42\">…</li>   // el.dataset.id === \"42\"", note: { en: "<code>inert</code> on the rest of the page makes it unfocusable and hidden from screen readers while a custom overlay is open.", ar: "<code>inert</code> على باقي الصفحة بيخليها مش بتاخد focus ومستخبية من قارئ الشاشة وأنت فاتح overlay مخصوص." } },
        { type: "when", use: [{ en: "Simple confirms, accordions, FAQs — native first.", ar: "تأكيد بسيط، accordion، أسئلة شائعة — الجاهز الأول." }], avoid: [{ en: "When the design system already ships an accessible Dialog (Radix) — stay consistent.", ar: "لو الـ design system عنده Dialog جاهز و accessible (Radix) — خليك متسق." }] }
      ],
      say: "Before reaching for a library I check the platform: dialog gives focus trapping and Escape for free.",
      interview: [
        { q: "What does showModal() give you that a positioned div doesn't?", a: { en: "Top-layer rendering (no z-index fights), a backdrop, focus moved into the dialog and trapped, Escape to close, and the rest of the page made inert.", ar: "بيترسم في الـ top layer (من غير خناقات z-index)، و backdrop، والـ focus بيدخل جوه ويتحبس، و Escape بيقفل، وباقي الصفحة بتبقى inert." } }
      ],
      quiz: [
        { q: { en: "Read <code>data-user-id</code> in JS?", ar: "تقرا <code>data-user-id</code> في JS إزاي؟" }, a: { en: "<code>el.dataset.userId</code> (kebab-case becomes camelCase).", ar: "<code>el.dataset.userId</code> (الـ kebab-case بيبقى camelCase)." } }
      ],
      quick: [{ en: "dialog + showModal() = focus trap, Esc, backdrop, top layer — free.", ar: "dialog مع showModal() = focus trap و Esc و backdrop و top layer — ببلاش." }]
    },
    {
      id: "parsing-dom",
      title: { en: "From HTML to the page: parsing and the DOM", ar: "من HTML للصفحة: الـ parsing والـ DOM" },
      tldr: { en: "The browser parses HTML into the DOM, CSS into the CSSOM, combines them into the render tree, then lays out, paints and composites. CSS blocks rendering; plain scripts block parsing.", ar: "المتصفح بيعمل parse للـ HTML ويطلّع DOM، وللـ CSS ويطلّع CSSOM. ويجمعهم في render tree، وبعدين layout و paint و composite. والـ CSS بيوقف الرسم، والـ scripts العادية بتوقف الـ parsing." },
      blocks: [
        { type: "list", title: { en: "The critical rendering path", ar: "الـ Critical rendering path" }, items: [
          { en: "<b>DOM</b> — tree of elements from HTML.", ar: "<b>DOM</b> — شجرة العناصر من الـ HTML." },
          { en: "<b>CSSOM</b> — tree of styles; rendering waits for it (CSS is render-blocking).", ar: "<b>CSSOM</b>، يعني شجرة الـ styles. والرسم بيستناها، لأن الـ CSS بيوقف الرسم." },
          { en: "<b>Render tree</b> — only visible nodes (<code>display:none</code> is excluded).", ar: "<b>Render tree</b> — العناصر الظاهرة بس (<code>display:none</code> مش فيها)." },
          { en: "<b>Layout</b> (reflow) — sizes and positions. <b>Paint</b> — pixels. <b>Composite</b> — layers on the GPU.", ar: "<b>Layout</b> (reflow) — المقاسات والأماكن. <b>Paint</b> — البيكسلات. <b>Composite</b> — الطبقات على الـ GPU." }
        ] },
        { type: "compare", title: { en: "What a change costs", ar: "التغيير بيكلف إيه" }, cols: [{ en: "You change", ar: "بتغير" }, { en: "Triggers", ar: "بيعمل" }, { en: "Cost", ar: "التكلفة" }],
          rows: [
            ["width, top, font-size", "layout → paint → composite", { en: "High", ar: "عالية" }],
            ["color, background", "paint → composite", { en: "Medium", ar: "متوسطة" }],
            ["transform, opacity", "composite", { en: "Low — animate these", ar: "قليلة — اعمل animation بيهم" }]
          ] },
        { type: "pitfalls", items: [
          { en: "<b>Layout thrashing</b>: reading <code>offsetHeight</code> right after writing styles in a loop forces a layout each time. Batch reads, then writes.", ar: "<b>Layout thrashing</b>: إنك تقرا <code>offsetHeight</code> بعد ما تكتب styles جوه loop بيجبر layout كل مرة. اقرا الأول كله، وبعدين اكتب." }
        ] },
        { type: "projects", items: [{ text: { en: "Osloop and the GSAP sites animate transform and opacity so scroll animations stay smooth.", ar: "Osloop ومواقع GSAP بتعمل animation لـ transform و opacity علشان الـ scroll يفضل ناعم." } }] }
      ],
      say: "I animate transform and opacity because they only trigger compositing, not layout or paint.",
      interview: [
        { q: "What happens between typing a URL and seeing the page?", a: { en: "DNS → TCP/TLS → HTTP request → HTML streams in → parser builds the DOM, fetches CSS/JS → CSSOM → render tree → layout → paint → composite. JS can block parsing; CSS blocks rendering.", ar: "DNS، وبعدين TCP/TLS، وبعدين HTTP request. والـ HTML بيوصل على دفعات، والـ parser بيبني الـ DOM ويجيب الـ CSS والـ JS. وبعدين CSSOM، و render tree، و layout، و paint، و composite. والـ JS ممكن يوقف الـ parsing، والـ CSS بيوقف الرسم." },
          follow: [{ q: "Reflow vs repaint?", a: { en: "Reflow recalculates geometry (expensive, can cascade to children/parents). Repaint redraws pixels without geometry changes.", ar: "الـ Reflow بيعيد حساب المقاسات (غالي، وممكن يأثر على الأولاد والأب). الـ Repaint بيعيد رسم البيكسلات من غير تغيير مقاسات." } }] }
      ],
      quiz: [
        { q: { en: "Is <code>visibility:hidden</code> in the render tree?", ar: "<code>visibility:hidden</code> موجود في الـ render tree؟" }, a: { en: "Yes — it takes space but isn't painted. <code>display:none</code> is not in it.", ar: "أيوه — بياخد مكان بس مش بيترسم. أما <code>display:none</code> مش موجود فيها." } }
      ],
      quick: [
        { en: "DOM + CSSOM → render tree → layout → paint → composite.", ar: "DOM + CSSOM ← render tree ← layout ← paint ← composite." },
        { en: "Animate transform/opacity; batch DOM reads before writes.", ar: "الـ animation بـ transform و opacity. واقرا من الـ DOM كل اللي محتاجه قبل ما تكتب فيه." }
      ]
    }
  ]
});
