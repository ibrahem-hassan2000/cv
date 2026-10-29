// i18n & RTL — written 2026-10-29.
STUDY.fill("i18n", {
  intro: { en: "Building apps in Arabic and English: message keys and ICU plurals, next-intl and i18next, RTL layout, formatting dates/numbers/currency with Intl, and Arabic-specific details.", ar: "إزاي تبني تطبيقات بالعربي والإنجليزي: مفاتيح الرسايل و ICU plurals، و next-intl و i18next، والـ layout بالـ RTL، وتنسيق التواريخ والأرقام والعملة بـ Intl، وتفاصيل العربي." },
  topics: [
    {
      id: "i18n-basics",
      title: { en: "Messages, interpolation and plurals", ar: "الرسايل والـ interpolation والجمع" },
      tldr: { en: "Never concatenate translated fragments — use whole messages with placeholders. Plurals differ by language (Arabic has six forms: zero, one, two, few, many, other), so use ICU MessageFormat. Keep keys meaningful and grouped by feature.", ar: "عمرك ما تلزق أجزاء مترجمة — استخدم رسايل كاملة فيها placeholders. والجمع بيختلف من لغة للتانية (العربي فيه 6 أشكال: zero و one و two و few و many و other)، فاستخدم ICU MessageFormat. وخلي المفاتيح ليها معنى ومتقسمة حسب الـ feature." },
      blocks: [
        { type: "code", code: "// ✗ \"You have \" + n + \" orders\"  — word order and plural break in Arabic\n// ✓ ICU\n\"orders.count\": \"{count, plural, =0 {No orders} one {# order} other {# orders}}\"\n\"orders.count\": \"{count, plural, zero {لا توجد طلبات} one {طلب واحد} two {طلبان} few {# طلبات} many {# طلبًا} other {# طلب}}\"\n\nt(\"orders.count\", { count: 3 });   // \"3 طلبات\"" },
        { type: "projects", items: [
          { text: { en: "Aquadic: bilingual Next.js sites with next-intl and i18next; Kalima: i18next with Arabic-first copy and bilingual legal pages.", ar: "Aquadic: مواقع Next.js بلغتين، بـ next-intl و i18next. و Kalima: بـ i18next، والنصوص عربي الأول، وصفحات قانونية بلغتين." }, p: "aquadic", tab: "decisions", label: "Aquadic" },
          { text: { en: "okoRent lesson: next-intl routing was set up but the translation files were copied from another project — the app wasn't really bilingual, so it isn't claimed.", ar: "درس okoRent: الـ routing بـ next-intl كان موجود بس ملفات الترجمة كانت منسوخة من مشروع تاني — التطبيق مكانش بلغتين فعلًا، فمش بنقول إنه كده." }, p: "okorent", tab: "interview", label: "okoRent" }
        ] }
      ],
      say: "I translate whole messages with ICU placeholders and plural rules, because Arabic has six plural forms and a different word order.",
      interview: [{ q: "Why not build sentences from translated words?", a: { en: "Word order, gender and plural agreement differ between languages; translators need the full sentence with placeholders to produce correct grammar.", ar: "ترتيب الكلام، والتذكير والتأنيث، والجمع، كلهم بيختلفوا بين اللغات. والمترجم محتاج الجملة كاملة بالـ placeholders، علشان يطلّع القواعد صح." } }],
      quiz: [{ q: { en: "How many plural categories does Arabic use in CLDR?", ar: "العربي فيه كام فئة جمع في CLDR؟" }, a: { en: "Six.", ar: "ستة." } }],
      quick: [{ en: "Whole messages + placeholders; ICU plurals (Arabic = 6 forms); keys per feature.", ar: "رسايل كاملة و placeholders. و ICU plurals (العربي فيه 6 أشكال). و keys لكل feature." }]
    },
    {
      id: "libraries",
      title: { en: "next-intl vs i18next", ar: "next-intl ولا i18next" },
      tldr: { en: "next-intl is built for the Next.js App Router: locale routing (<code>/ar/…</code>) via middleware, server-component support, ICU messages. i18next (react-i18next) works anywhere (React, React Native, Node) with namespaces, lazy-loaded resources and many plugins.", ar: "next-intl معمول للـ Next.js App Router: routing باللغة (<code>/ar/…</code>) عن طريق الـ middleware، ودعم server components، ورسايل ICU. و i18next (react-i18next) بيشتغل في أي حتة (React، React Native، Node) بـ namespaces وموارد بتتحمل وقت الحاجة و plugins كتير." },
      blocks: [
        { type: "compare", cols: ["", "next-intl", "i18next"], rows: [
          [{ en: "Best in", ar: "أحسن في" }, "Next.js App Router", { en: "Any React app, React Native", ar: "أي تطبيق React، و React Native" }],
          [{ en: "Routing", ar: "الـ Routing" }, { en: "Built-in locale prefixes", ar: "بادئات اللغة جاهزة" }, { en: "Bring your own", ar: "اعملها بنفسك" }],
          [{ en: "Server components", ar: "Server components" }, "✓", { en: "Needs setup", ar: "محتاج إعداد" }],
          [{ en: "Messages", ar: "الرسايل" }, "ICU", { en: "Own format (+ ICU plugin)", ar: "صيغته (و plugin لـ ICU)" }]
        ] }
      ],
      say: "On the Next.js App Router I use next-intl for locale routing and server components; for React Native or plain React, i18next.",
      interview: [{ q: "How do you detect and persist the user's language?", a: { en: "URL prefix as the source of truth (shareable, SEO), a cookie for the last choice, Accept-Language on first visit, and a switcher that keeps the current path.", ar: "بادئة الـ URL كمصدر الحقيقة (بتتبعت وكويسة للـ SEO)، وكوكي لآخر اختيار، و Accept-Language في أول زيارة، وزرار تبديل بيحافظ على المسار الحالي." } }],
      quiz: [{ q: { en: "i18n library for a React Native app?", ar: "مكتبة i18n لتطبيق React Native؟" }, a: { en: "i18next (react-i18next).", ar: "i18next (react-i18next)." } }],
      quick: [{ en: "next-intl for App Router (routing + RSC); i18next for RN/any React; URL prefix + cookie + Accept-Language.", ar: "الـ next-intl للـ App Router (routing و RSC). والـ i18next لـ RN وأي React. واللغة بتتحدد من بادئة الـ URL، والكوكي، و Accept-Language." }]
    },
    {
      id: "rtl",
      title: { en: "RTL layout done right", ar: "الـ RTL صح" },
      tldr: { en: "Set <code>dir=\"rtl\"</code> and <code>lang=\"ar\"</code> on <code>&lt;html&gt;</code>, use logical properties (<code>margin-inline-start</code>, <code>inset-inline-end</code>) or Tailwind's <code>ms-/me-/ps-/pe-</code>, flip only directional icons (arrows, chevrons — not a play button or logos), and isolate mixed-direction text with <code>&lt;bdi&gt;</code> or <code>unicode-bidi: isolate</code>.", ar: "حط <code>dir=\"rtl\"</code> و <code>lang=\"ar\"</code> على <code>&lt;html&gt;</code>. واستخدم logical properties (زي <code>margin-inline-start</code> و <code>inset-inline-end</code>)، أو <code>ms-/me-/ps-/pe-</code> في Tailwind. واقلب الأيقونات اللي ليها اتجاه بس، زي الأسهم والـ chevrons، مش زرار play ولا اللوجوهات. والنص اللي فيه اتجاهين اعزله بـ <code>&lt;bdi&gt;</code> أو <code>unicode-bidi: isolate</code>." },
      blocks: [
        { type: "code", code: "<html lang=\"ar\" dir=\"rtl\">\n\n.chip { padding-inline: 10px; margin-inline-end: 6px; }      /* works both ways */\n[dir=\"rtl\"] .icon-arrow { transform: scaleX(-1); }            /* only directional icons */\n\n<p>تم إرسال <bdi>{orderId}</bdi> بنجاح</p>                      // \"#A-1023\" stays readable\n<code dir=\"ltr\">npm run dev</code>                              // code is always LTR" },
        { type: "projects", items: [{ text: { en: "This guide and the handbook switch dir at runtime and use logical properties and isolated LTR code; Aquadic's e-learning platform was Arabic/English RTL.", ar: "الدليل ده والـ handbook بيغيّروا الـ dir وقت التشغيل، وبيستخدموا logical properties، والكود معزول LTR. ومنصة التعليم في Aquadic كانت عربي وإنجليزي، بـ RTL." }, p: "aquadic", tab: "decisions", label: "Aquadic" }] }
      ],
      say: "RTL is mostly free with logical properties; I flip only directional icons and isolate LTR fragments like codes and IDs inside Arabic text.",
      interview: [{ q: "Which icons should not be mirrored in RTL?", a: { en: "Media controls (play/pause), clocks, checkmarks, logos, anything representing a real-world object. Mirror arrows, back/forward, progress direction.", ar: "أزرار الميديا (play و pause)، والساعات، وعلامة الصح، واللوجوهات، وأي حاجة بتمثل حاجة حقيقية. واقلب الأسهم، والرجوع والتقدم، واتجاه الـ progress." } }],
      quiz: [{ q: { en: "CSS for “space after the icon” that works in both directions?", ar: "CSS لـ «مسافة بعد الأيقونة» بتشتغل في الاتجاهين؟" }, a: { en: "margin-inline-end.", ar: "margin-inline-end." } }],
      quick: [{ en: "dir + lang on html; logical properties; mirror directional icons only; <bdi>/isolate for mixed text; code LTR.", ar: "dir و lang على الـ html. و logical properties. واقلب الأيقونات اللي ليها اتجاه بس. و <bdi> أو isolate للنص المخلوط. والكود دايمًا LTR." }]
    },
    {
      id: "intl",
      title: { en: "Formatting with Intl", ar: "التنسيق بـ Intl" },
      tldr: { en: "Use the built-in <code>Intl</code> APIs instead of hand-made formatting: <code>NumberFormat</code> (currency, percent, compact), <code>DateTimeFormat</code> (with a time zone), <code>RelativeTimeFormat</code> (\"3 days ago\"), <code>PluralRules</code>, <code>Collator</code> (correct sorting), <code>ListFormat</code>. Store dates in UTC, display in the user's time zone.", ar: "استخدم الـ <code>Intl</code> APIs الجاهزة بدل ما تعمل التنسيق بإيدك. <code>NumberFormat</code> للعملة والنسبة والأرقام المختصرة. و <code>DateTimeFormat</code> بالـ time zone. و <code>RelativeTimeFormat</code> لـ «من 3 أيام». و <code>PluralRules</code>، و <code>Collator</code> للترتيب الصح، و <code>ListFormat</code>. وخزّن التواريخ بـ UTC، واعرضها بالـ time zone بتاع اليوزر." },
      blocks: [
        { type: "code", code: "new Intl.NumberFormat(\"ar-EG\", { style: \"currency\", currency: \"EGP\" }).format(1250.5);   // \"‏١٬٢٥٠٫٥٠ ج.م.‏\"\nnew Intl.NumberFormat(\"en-EG\", { style: \"currency\", currency: \"EGP\" }).format(1250.5);   // \"EGP 1,250.50\"\nnew Intl.DateTimeFormat(\"en-GB\", { dateStyle: \"medium\", timeStyle: \"short\", timeZone: user.timeZone }).format(date);\nnew Intl.RelativeTimeFormat(\"ar\", { numeric: \"auto\" }).format(-1, \"day\");                 // \"أمس\"\n[\"ب\", \"أ\", \"ت\"].sort(new Intl.Collator(\"ar\").compare);" },
        { type: "projects", items: [{ text: { en: "Smart FAQ: each user picks a time zone and every date on their screens uses it (lib/time-zone with tests).", ar: "Smart FAQ: كل يوزر بيختار time zone وكل التواريخ على شاشاته بتستخدمه (lib/time-zone ومعاه tests)." }, p: "smartfaq", tab: "overview", label: "Smart FAQ" }] }
      ],
      say: "Numbers, money and dates go through Intl with the user's locale and time zone; dates are stored in UTC.",
      interview: [{ q: "Eastern Arabic or Western digits?", a: { en: "Follow the locale and product decision: ar-EG formats with Eastern Arabic digits by default; many Egyptian apps prefer Western digits (<code>ar-EG-u-nu-latn</code>). Be consistent, and keep inputs accepting both.", ar: "امشي ورا الـ locale وقرار المنتج. الـ ar-EG افتراضيًا بيكتب أرقام عربية شرقية. وتطبيقات مصرية كتير بتفضّل الأرقام اللاتينية (<code>ar-EG-u-nu-latn</code>). المهم تبقى متسق، وتخلي الـ inputs تقبل الاتنين." } }],
      quiz: [{ q: { en: "Where should you store timestamps?", ar: "تخزن الـ timestamps إزاي؟" }, a: { en: "UTC (ISO strings); convert for display.", ar: "بـ UTC (ISO strings)، وحوّل وقت العرض." } }],
      quick: [{ en: "Intl.NumberFormat/DateTimeFormat/RelativeTimeFormat/Collator; UTC storage; user's time zone; digit system per product.", ar: "Intl.NumberFormat و DateTimeFormat و RelativeTimeFormat و Collator. والتخزين بـ UTC، والعرض بالـ time zone بتاع اليوزر. ونظام الأرقام حسب قرار المنتج." }]
    },
    {
      id: "arabic",
      title: { en: "Arabic-specific details", ar: "تفاصيل خاصة بالعربي" },
      tldr: { en: "Use a font with good Arabic glyphs (IBM Plex Sans Arabic, Cairo, Noto), allow more line height, never letter-space Arabic (it breaks joining), don't uppercase-transform, expect longer or shorter strings, and normalise Arabic input for search (alef forms, ta marbuta, diacritics).", ar: "استخدم خط حروفه العربي حلوة، زي IBM Plex Sans Arabic أو Cairo أو Noto. وزوّد الـ line height. وعمرك ما تعمل letter-spacing للعربي، لأنه بيكسر وصل الحروف. ومتعملش uppercase. واعمل حسابك إن النصوص هتبقى أطول أو أقصر. وفي البحث، اعمل normalise للعربي: أشكال الألف، والتاء المربوطة، والتشكيل." },
      blocks: [
        { type: "code", code: "const normalizeAr = (s: string) => s\n  .replace(/[\\u064B-\\u0652]/g, \"\")   // remove diacritics\n  .replace(/[إأآ]/g, \"ا\")\n  .replace(/ى/g, \"ي\")\n  .replace(/ة/g, \"ه\");\nnormalizeAr(\"مُحاسبة\") === normalizeAr(\"محاسبه\");   // true" },
        { type: "projects", items: [{ text: { en: "The FAQ AI POC matched customer intent across Arabic, Franco-Arabic (“3ayez flousy tany”) and English — normalisation and intent beat exact keywords.", ar: "الـ FAQ AI POC كان بيفهم نية العميل بالعربي والفرانكو («3ayez flousy tany») والإنجليزي — الـ normalisation والنية أحسن من الكلمات بالظبط." } }] }
      ],
      say: "For Arabic I choose fonts with proper joining, avoid letter-spacing and normalise search input so different spellings still match.",
      interview: [{ q: "Why might Arabic search miss obvious matches?", a: { en: "Different alef forms, ta marbuta vs ha, ya vs alef maqsura, and diacritics produce different strings for the same word. Normalise both the query and the index.", ar: "أشكال الألف المختلفة، والتاء المربوطة والهاء، والياء والألف المقصورة، والتشكيل، بيطلعوا strings مختلفة لنفس الكلمة. اعمل normalise للبحث والفهرس الاتنين." } }],
      quiz: [{ q: { en: "Is letter-spacing OK for Arabic headings?", ar: "الـ letter-spacing ينفع لعناوين عربي؟" }, a: { en: "No — it breaks letter joining.", ar: "لأ — بيكسر وصل الحروف." } }],
      quick: [{ en: "Good Arabic font + line height; no letter-spacing/uppercase; normalise for search; plan for text length.", ar: "خط عربي كويس و line height أكبر. ومن غير letter-spacing ولا uppercase. و normalise للبحث. وحساب لطول النص." }]
    }
  ]
});
