// Deep dive for the Performance section. Same shape as deep-javascript.js (see README "Deep dive").
STUDY.deepen("performance", {
  cwv: {
    why: {
      en: "Every senior frontend loop has a performance question, and Core Web Vitals give it numbers. Interviewers want the thresholds, how each metric breaks down, and a real fix — not “I'd use Lighthouse”.",
      ar: "كل مجموعة إنترفيوهات Senior frontend فيها سؤال performance، والـ Core Web Vitals بتديله أرقام. والإنترفيورز عايزين الحدود، وكل مقياس بيتقسم لإيه، وحل حقيقي — مش «هستخدم Lighthouse»."
    },
    how: [
      {
        title: { en: "Three metrics, judged on real users at the 75th percentile", ar: "تلات مقاييس، بتتقاس على يوزرز حقيقيين عند الـ 75th percentile" },
        body: {
          en: "<b>LCP</b> (loading) ≤ 2.5 s, <b>INP</b> (responsiveness) ≤ 200 ms, <b>CLS</b> (visual stability) ≤ 0.1. A page passes when 75% of real visits (field data, e.g. CrUX), per device type, meet each threshold. INP replaced FID in March 2024 because FID only measured the input delay of the first interaction.",
          ar: "<b>LCP</b> (التحميل) ≤ 2.5 ثانية، و <b>INP</b> (سرعة الاستجابة) ≤ 200ms، و <b>CLS</b> (ثبات الشكل) ≤ 0.1. والصفحة بتعدّي لما 75% من الزيارات الحقيقية (field data، زي CrUX)، لكل نوع جهاز، يحققوا كل حد. والـ INP خد مكان الـ FID في مارس 2024 لأن الـ FID كان بيقيس تأخير الـ input في أول تفاعل بس."
        }
      },
      {
        title: { en: "LCP has four parts — fix the biggest", ar: "الـ LCP ليه 4 أجزاء — صلّح أكبرهم" },
        body: {
          en: "Time to first byte → resource load delay (how late the browser discovers the LCP image) → resource load duration → element render delay. Typical fixes: put the LCP image in the HTML (not injected by JS), give it <code>fetchpriority=\"high\"</code>, never lazy-load it, serve the right size and format, and avoid render-blocking CSS/JS before it.",
          ar: "الوقت لأول byte ← تأخير اكتشاف الـ resource (المتصفح عرف صورة الـ LCP متأخر قد إيه) ← مدة تحميل الـ resource ← تأخير رسم الـ element. والحلول المعتادة: حط صورة الـ LCP في الـ HTML (مش الـ JS هو اللي يضيفها)، وادّيها <code>fetchpriority=\"high\"</code>، وعمرك ما تعملها lazy-load، وابعتها بالحجم والـ format الصح، وشيل أي CSS/JS بيوقف الرسم قبلها."
        },
        code: "<img src=\"/hero-1200.avif\" srcset=\"/hero-800.avif 800w, /hero-1200.avif 1200w\" sizes=\"100vw\"\n     width=\"1200\" height=\"600\" fetchpriority=\"high\" alt=\"…\">   <!-- no loading=\"lazy\" on the LCP image -->",
        run: "browser"
      },
      {
        title: { en: "INP = input delay + processing + presentation", ar: "الـ INP = تأخير الـ input + المعالجة + العرض" },
        body: {
          en: "For each interaction: how long it waited for the main thread, how long your handlers ran, and how long until the next frame was painted. INP reports roughly the slowest interaction of the visit. Fixes: break long tasks, do less in handlers (show feedback first, defer the rest), avoid huge re-renders, and keep the DOM small.",
          ar: "لكل تفاعل: استنى الـ main thread قد إيه، والـ handlers بتاعتك اشتغلت قد إيه، وقد إيه لحد ما الـ frame الجاي اترسم. والـ INP بيقول تقريبًا أبطأ تفاعل في الزيارة. والحلول: قسّم الـ long tasks، وقلّل الشغل في الـ handlers (اعرض feedback الأول وأجّل الباقي)، وابعد عن الـ re-renders الضخمة، وخلي الـ DOM صغير."
        }
      },
      {
        title: { en: "CLS counts unexpected movement", ar: "الـ CLS بيعدّ الحركة اللي مش متوقعة" },
        body: {
          en: "Layout shifts are grouped in session windows (up to 5 s, with gaps under 1 s), and the worst window counts. Shifts within 500 ms after a user input don't count. Usual causes: images without dimensions, web fonts swapping, banners or ads inserted above content.",
          ar: "الـ layout shifts بتتجمع في session windows (لحد 5 ثواني، والفاصل أقل من ثانية)، وأوحش window هو اللي بيتحسب. والـ shifts اللي بتحصل في 500ms بعد input من اليوزر مش بتتحسب. والأسباب المعتادة: صور من غير أبعاد، و web fonts بتتبدل، و banners أو إعلانات بتتحط فوق المحتوى."
        }
      }
    ],
    breaks: [
      {
        title: { en: "Lazy-loading the hero image", ar: "Lazy-loading لصورة الـ hero" },
        body: {
          en: "A blanket “lazy-load all images” rule delays the LCP element until layout decides it's visible.",
          ar: "قاعدة «اعمل lazy-load لكل الصور» بتأخر عنصر الـ LCP لحد ما الـ layout يقرر إنه ظاهر."
        },
        fix: { en: "Eager + <code>fetchpriority=\"high\"</code> for the LCP image; lazy only below the fold.", ar: "eager + <code>fetchpriority=\"high\"</code> لصورة الـ LCP؛ والـ lazy للي تحت بس." }
      },
      {
        title: { en: "Content rendered only by client JS", ar: "محتوى بيترسم بالـ JS على الـ client بس" },
        body: {
          en: "In a client-rendered SPA the LCP element exists only after the bundle downloads, runs and fetches data — LCP includes all of that.",
          ar: "في SPA بيترسم على الـ client، عنصر الـ LCP مش بيبقى موجود غير بعد ما الـ bundle يتحمّل ويشتغل ويجيب الداتا — والـ LCP بيحسب ده كله."
        },
        fix: { en: "Server-render or prerender public pages; for SPAs, shrink the critical bundle and start the data request early (preload or parallel with the JS).", ar: "اعمل server-render أو prerender للصفحات العامة؛ وفي الـ SPAs صغّر الـ bundle الأساسي وابدأ request الداتا بدري (preload أو بالتوازي مع الـ JS)." }
      },
      {
        title: { en: "Trusting only Lighthouse", ar: "إنك تثق في Lighthouse بس" },
        body: {
          en: "Lighthouse is lab data on one simulated device and can't measure INP (it shows TBT as a proxy). A perfect lab score can coexist with a failing field INP.",
          ar: "الـ Lighthouse عبارة عن lab data على جهاز واحد متقلّد ومش بيقدر يقيس الـ INP (بيعرض الـ TBT كبديل). ممكن يبقى الـ score في الـ lab كامل والـ INP من اليوزرز الحقيقيين فاشل."
        },
        fix: { en: "Collect field data (the <code>web-vitals</code> library with attribution, or CrUX) and use the lab to reproduce and debug.", ar: "اجمع field data (مكتبة <code>web-vitals</code> مع الـ attribution، أو CrUX)، واستخدم الـ lab علشان تعيد المشكلة وتعمل لها debug." }
      }
    ],
    levels: [
      {
        q: "How would you improve a slow LCP?",
        mid: { en: "Compress and lazy-load images, use a CDN, and reduce JavaScript.", ar: "أضغط الصور وأعملها lazy-load، وأستخدم CDN، وأقلل الـ JavaScript." },
        senior: {
          en: "First find which element is the LCP and which of its four parts dominates — TTFB, load delay, load duration, render delay. Then fix that part: a slow server or missing CDN cache for TTFB; for load delay, make the image discoverable in the HTML with <code>fetchpriority=\"high\"</code> and never lazy; for duration, size and format (AVIF/WebP, <code>srcset</code>); for render delay, remove render-blocking CSS/JS and client-only rendering. Then confirm in field data at p75, not just Lighthouse.",
          ar: "الأول ألاقي أنهي element هو الـ LCP وأنهي جزء من الـ 4 هو الكبير — TTFB، أو تأخير الاكتشاف، أو مدة التحميل، أو تأخير الرسم. وبعدين أصلّح الجزء ده: سيرفر بطيء أو CDN cache ناقص للـ TTFB؛ وللتأخير في الاكتشاف، أخلي الصورة باينة في الـ HTML مع <code>fetchpriority=\"high\"</code> ومن غير lazy؛ وللمدة، الحجم والـ format (AVIF/WebP، <code>srcset</code>)؛ ولتأخير الرسم، أشيل الـ CSS/JS اللي بيوقف الرسم والرسم على الـ client بس. وبعدين أتأكد من الـ field data عند الـ p75، مش من Lighthouse بس."
        }
      },
      {
        q: "Lab data vs field data?",
        mid: { en: "Lab is Lighthouse; field is real users.", ar: "الـ lab هو Lighthouse؛ والـ field هو اليوزرز الحقيقيين." },
        senior: {
          en: "Field data (RUM, CrUX) is what users experience and what Google evaluates — real devices, networks and interactions, at p75. Lab data is a controlled, repeatable run — great for debugging and catching regressions in CI, but it has no real interactions, so no real INP. I use field data to decide what to fix, and the lab to reproduce it and prove the fix.",
          ar: "الـ field data (RUM، CrUX) هي اللي اليوزرز بيعيشوها وهي اللي Google بيقيّم بيها — أجهزة وشبكات وتفاعلات حقيقية، عند الـ p75. والـ lab data تشغيل متحكَّم فيه وبيتكرر — ممتاز للـ debugging ولمسك التراجعات في الـ CI، بس مفيهوش تفاعلات حقيقية، فمفيش INP حقيقي. بستخدم الـ field data علشان أقرر أصلّح إيه، والـ lab علشان أعيد المشكلة وأثبت الحل."
        }
      }
    ],
    drill: [
      {
        q: "Why did INP replace FID?",
        a: { en: "FID only measured the delay before the first interaction's handler started. INP covers every interaction in the visit and includes processing and the time to paint the next frame.", ar: "الـ FID كان بيقيس التأخير قبل ما handler أول تفاعل يبدأ بس. والـ INP بيغطي كل تفاعل في الزيارة، وبيحسب المعالجة والوقت لحد رسم الـ frame الجاي." },
        follow: [
          {
            q: "How do you find which interaction is slow in production?",
            a: { en: "The <code>web-vitals</code> attribution build reports the target element, the event type and the three INP parts; the Long Animation Frames API names the scripts that ran. Send that to analytics, group by element, and fix the worst.", ar: "نسخة الـ attribution من <code>web-vitals</code> بتبلّغ عن الـ element والـ event type والـ 3 أجزاء بتوع الـ INP؛ والـ Long Animation Frames API بيقول أنهي scripts اشتغلت. ابعت ده للـ analytics، وجمّع حسب الـ element، وصلّح الأوحش." },
            follow: [
              {
                q: "And if processing time dominates?",
                a: { en: "Do the visible update first and defer the rest (yield, a transition, or <code>requestIdleCallback</code> for non-urgent work), and cut unnecessary re-renders the interaction triggers.", ar: "اعمل التحديث اللي بيبان الأول وأجّل الباقي (yield، أو transition، أو <code>requestIdleCallback</code> للشغل اللي مش مستعجل)، وقلّل الـ re-renders الزيادة اللي التفاعل بيعملها." }
              }
            ]
          }
        ]
      }
    ],
    story: {
      text: { en: "Smart FAQ's table fix (~20 ms → ~2 ms per re-render) is an INP story: the details panel stopped lagging when it opened.", ar: "تصليح الـ table في Smart FAQ (~20ms ← ~2ms لكل re-render) قصة INP: الـ details panel بطّل يتأخر لما بيتفتح." },
      p: "smartfaq", tab: "problems", label: "Smart FAQ"
    },
    sources: [
      { label: "web.dev — Web Vitals", url: "https://web.dev/articles/vitals" },
      { label: "web.dev — Optimize LCP", url: "https://web.dev/articles/optimize-lcp" },
      { label: "web.dev — Interaction to Next Paint (INP)", url: "https://web.dev/articles/inp" },
      { label: "web.dev — Cumulative Layout Shift (CLS)", url: "https://web.dev/articles/cls" }
    ]
  },

  bundle: {
    why: {
      en: "“How do you reduce bundle size?” is easy to answer badly with a list of tools. A senior answer explains why JavaScript bytes are expensive, what blocks tree-shaking, where to split, and how to keep the size from creeping back.",
      ar: "«إزاي تصغّر الـ bundle؟» سهل تجاوب عليه غلط بليستة أدوات. وإجابة الـ Senior بتشرح ليه الـ bytes بتاعة الـ JavaScript غالية، وإيه اللي بيمنع الـ tree-shaking، وتقسّم فين، وإزاي تمنع الحجم إنه يرجع يزيد."
    },
    how: [
      {
        title: { en: "JavaScript costs twice: download and execution", ar: "الـ JavaScript بيتدفع تمنه مرتين: التحميل والتشغيل" },
        body: {
          en: "Compression (Brotli/gzip) shrinks the transfer, but the browser still parses, compiles and runs the full uncompressed code on the main thread — on a mid-range phone that's far slower than on your laptop. 200 KB of JS costs much more than a 200 KB image.",
          ar: "الضغط (Brotli/gzip) بيصغّر النقل، بس المتصفح لسه بيعمل parse و compile ويشغّل الكود كله من غير ضغط على الـ main thread — وعلى موبايل متوسط ده أبطأ بكتير من اللابتوب بتاعك. و 200KB JS تمنهم أكتر بكتير من صورة 200KB."
        }
      },
      {
        title: { en: "What tree-shaking needs", ar: "الـ tree-shaking محتاج إيه" },
        body: {
          en: "Static ESM imports and exports, packages marked <code>\"sideEffects\": false</code> (or listing the files that do have side effects), and named imports. CommonJS libraries and modules with top-level side effects can't be removed safely, so the bundler keeps them.",
          ar: "imports و exports ثابتة بالـ ESM، و packages متعلّم عليها <code>\"sideEffects\": false</code> (أو بتحدد الملفات اللي فيها side effects)، و named imports. ومكتبات الـ CommonJS والـ modules اللي فيها side effects في أول مستوى مينفعش تتشال بأمان، فالـ bundler بيسيبها."
        },
        code: "import _ from \"lodash\";               // CommonJS → the whole library\nimport { debounce } from \"lodash-es\"; // ESM → only debounce and what it uses",
        run: "browser"
      },
      {
        title: { en: "Split where users would wait for code they don't need", ar: "قسّم في الأماكن اللي اليوزر هيستنى فيها كود مش محتاجه" },
        body: {
          en: "Routes first (frameworks do it), then heavy, rarely used components: editors, charts, maps, animation libraries used in one place. Prefetch the next likely chunk on hover or in idle time; don't split into dozens of tiny chunks that load as a waterfall.",
          ar: "الـ routes الأول (والـ frameworks بتعمل كده)، وبعدين الـ components التقيلة اللي نادرًا ما بتتستخدم: editors، و charts، و maps، ومكتبات animation مستخدمة في مكان واحد. واعمل prefetch للـ chunk اللي غالبًا جاي لما الماوس يقف أو في وقت الفراغ؛ ومتقسمش لعشرات الـ chunks الصغيرة اللي بتتحمّل ورا بعض."
        }
      },
      {
        title: { en: "Measure and set a budget", ar: "قيس وحط حد" },
        body: {
          en: "A bundle analyzer (rollup-plugin-visualizer, <code>@next/bundle-analyzer</code>) shows what's inside; the DevTools Coverage tab shows how much of it runs on load; a size budget in CI (e.g. size-limit) fails the build when a dependency adds 80 KB by accident.",
          ar: "الـ bundle analyzer (rollup-plugin-visualizer، <code>@next/bundle-analyzer</code>) بيوريك إيه اللي جوه؛ وتاب الـ Coverage في DevTools بيوريك قد إيه منه بيشتغل وقت التحميل؛ وحد للحجم في الـ CI (زي size-limit) بيوقّع الـ build لما dependency تزوّد 80KB من غير قصد."
        }
      }
    ],
    breaks: [
      {
        title: { en: "Importing a whole library for one function", ar: "import لمكتبة كاملة علشان function واحدة" },
        body: {
          en: "A date library with every locale, an icon pack imported from its root, or a UI kit's barrel file can each add hundreds of KB.",
          ar: "مكتبة تواريخ بكل الـ locales، أو icon pack متعمل له import من أوله، أو barrel file بتاع UI kit، كل واحد ممكن يزوّد مئات الـ KB."
        },
        fix: { en: "Per-function or per-icon imports, smaller alternatives (date-fns or <code>Intl</code>), and check a package's cost before adding it.", ar: "import لكل function أو icon لوحدها، وبدائل أصغر (date-fns أو <code>Intl</code>)، وشوف تمن الـ package قبل ما تضيفه." }
      },
      {
        title: { en: "Splitting too finely", ar: "تقسيم لحتت صغيرة أوي" },
        body: {
          en: "Chunk A imports chunk B which imports C: three round trips before anything renders, slower than one bigger file.",
          ar: "chunk A بيعمل import لـ chunk B اللي بيعمل import لـ C: تلات رحلات قبل ما أي حاجة تترسم، أبطأ من ملف واحد أكبر."
        },
        fix: { en: "Split at meaningful boundaries, and preload chunks you know the next step needs.", ar: "قسّم عند حدود ليها معنى، واعمل preload للـ chunks اللي عارف إن الخطوة الجاية محتاجاها." }
      },
      {
        title: { en: "Shipping old-browser code to modern browsers", ar: "إنك تبعت كود للمتصفحات القديمة للمتصفحات الحديثة" },
        body: {
          en: "A wide <code>browserslist</code> adds polyfills and transpiles modern syntax into longer code for every user.",
          ar: "الـ <code>browserslist</code> الواسع بيزوّد polyfills وبيحوّل الـ syntax الحديث لكود أطول لكل اليوزرز."
        },
        fix: { en: "Target the browsers your analytics actually show, and duplicate-check dependencies (two versions of the same library).", ar: "استهدف المتصفحات اللي الـ analytics بتاعتك بتبيّنها فعلًا، واتأكد إن مفيش dependencies متكررة (نسختين من نفس المكتبة)." }
      }
    ],
    levels: [
      {
        q: "How do you reduce bundle size?",
        mid: { en: "Code splitting with lazy loading, tree-shaking and removing unused libraries.", ar: "code splitting مع lazy loading، و tree-shaking، وإني أشيل المكتبات اللي مش مستخدمة." },
        senior: {
          en: "Measure first: an analyzer for what's inside, Coverage for what runs at load, field metrics for whether it matters. Then: replace or slim heavy dependencies, make sure tree-shaking works (ESM, <code>sideEffects</code>, no CJS where it matters, no barrels), split routes and heavy rare components with sensible prefetching, and trim polyfills to real targets. Finally, a size budget in CI so it doesn't creep back — that last part is what keeps it fixed.",
          ar: "أقيس الأول: analyzer علشان أعرف إيه اللي جوه، و Coverage علشان أعرف إيه اللي بيشتغل وقت التحميل، ومقاييس الـ field علشان أعرف ده فارق ولا لأ. وبعدين: أبدّل أو أخفف الـ dependencies التقيلة، وأتأكد إن الـ tree-shaking شغال (ESM، و <code>sideEffects</code>، ومفيش CJS في الأماكن المهمة، ومفيش barrels)، وأقسّم الـ routes والـ components التقيلة النادرة مع prefetch منطقي، وأقلل الـ polyfills للمتصفحات الحقيقية. وفي الآخر حد للحجم في الـ CI علشان ميرجعش يزيد — والجزء ده هو اللي بيخلي الحل يفضل."
        }
      }
    ],
    drill: [
      {
        q: "Why is a KB of JavaScript more expensive than a KB of image?",
        a: { en: "Images decode off the main thread; JavaScript must be parsed, compiled and executed on it, and executing it often triggers more work (rendering, data requests).", ar: "الصور بتتفك برّه الـ main thread؛ لكن الـ JavaScript لازم يتعمل له parse و compile ويشتغل عليه، وتشغيله غالبًا بيعمل شغل زيادة (render، و data requests)." },
        follow: [
          {
            q: "Doesn't Brotli solve it?",
            a: { en: "It reduces transfer time only. The engine still processes the uncompressed size.", ar: "بيقلل وقت النقل بس. والـ engine لسه بيعالج الحجم من غير ضغط." }
          }
        ]
      }
    ],
    story: {
      text: { en: "ARVAmethod: Motion (menu only) and OGL/WebGL (version 3 only) are lazy-loaded, with a production-build preview script to judge performance honestly.", ar: "ARVAmethod: الـ Motion (للـ menu بس) و OGL/WebGL (للنسخة 3 بس) بيتعملهم lazy-load، ومعاهم script بيعمل preview لـ production build علشان الأداء يتقاس صح." }
    },
    sources: [
      { label: "web.dev — Reduce JavaScript payloads with code splitting", url: "https://web.dev/articles/reduce-javascript-payloads-with-code-splitting" },
      { label: "MDN — Tree shaking", url: "https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking" },
      { label: "webpack — Tree shaking and sideEffects", url: "https://webpack.js.org/guides/tree-shaking/" },
      { label: "Chrome DevTools — Coverage", url: "https://developer.chrome.com/docs/devtools/coverage" }
    ]
  },

  "react-perf": {
    why: {
      en: "“The page is slow — what do you do?” is where interviewers see your process. They want measurement before memo, structural fixes before micro-optimisations, and a real example.",
      ar: "«الصفحة بطيئة — هتعمل إيه؟» هنا الإنترفيورز بيشوفوا طريقتك. عايزين قياس قبل الـ memo، وحلول في الـ structure قبل الـ micro-optimisations، ومثال حقيقي."
    },
    how: [
      {
        title: { en: "Measure: Profiler first", ar: "قيس: الـ Profiler الأول" },
        body: {
          en: "React DevTools Profiler shows each commit, which components rendered, how long they took and <b>why</b> (“props changed: onSelect”). The browser Performance panel shows whether the cost is React rendering, layout, or something else; React 19.2 adds React tracks to it.",
          ar: "الـ React DevTools Profiler بيوريك كل commit، وأنهي components عملت render، وأخدت قد إيه، و<b>ليه</b> («props changed: onSelect»). والـ Performance panel في المتصفح بيوريك التمن ده render بتاع React ولا layout ولا حاجة تانية؛ و React 19.2 ضاف له tracks خاصة بـ React."
        }
      },
      {
        title: { en: "Fix in this order", ar: "صلّح بالترتيب ده" },
        body: {
          en: "1) Render less by structure: state closer to where it's used, heavy parts passed as children, hidden UI (menus, dialogs) mounted only when open. 2) Make skipping possible: <code>memo</code> with stable props where the Profiler shows repeated work. 3) Render fewer items: virtualisation. 4) Keep input urgent: transitions or deferred values for expensive updates.",
          ar: "1) قلّل الـ render بالـ structure: الـ state قريب من مكان استخدامه، والأجزاء التقيلة بتتبعت كـ children، والـ UI المستخبي (menus، dialogs) بيتعمل له mount بس لما يتفتح. 2) خلي التخطي ممكن: <code>memo</code> مع props ثابتة في الأماكن اللي الـ Profiler بيبيّن فيها شغل متكرر. 3) ارسم عناصر أقل: virtualisation. 4) خلي الـ input مستعجل: transitions أو deferred values للتحديثات الغالية."
        }
      },
      {
        title: { en: "Virtualisation and its trade-offs", ar: "الـ Virtualisation وعيوبها" },
        body: {
          en: "Render only the rows in view (TanStack Virtual, react-virtuoso). It turns 10,000 DOM rows into ~30. The costs: browser find-in-page can't see off-screen rows, screen readers need correct row counts (<code>aria-rowcount</code>, <code>aria-rowindex</code>), variable heights need measuring, and scroll restoration needs care.",
          ar: "ارسم الـ rows اللي ظاهرة بس (TanStack Virtual، react-virtuoso). وده بيحوّل 10,000 row في الـ DOM لحوالي 30. والتمن: البحث في الصفحة بتاع المتصفح مش بيشوف الـ rows اللي برّه الشاشة، والـ screen readers محتاجة عدد الـ rows الصح (<code>aria-rowcount</code>، <code>aria-rowindex</code>)، والارتفاعات المختلفة محتاجة قياس، ورجوع الـ scroll محتاج اهتمام."
        }
      }
    ],
    breaks: [
      {
        title: { en: "Expensive work in the render body", ar: "شغل غالي جوه الـ render" },
        body: {
          en: "Sorting and filtering 10,000 rows on every keystroke, or formatting every cell with a new <code>Intl.NumberFormat</code>, repeats on every render.",
          ar: "ترتيب وفلترة 10,000 row مع كل حرف، أو formatting لكل cell بـ <code>Intl.NumberFormat</code> جديد، بيتكرر مع كل render."
        },
        fix: { en: "<code>useMemo</code> the derived list, create formatters once at module level, and defer the filter value.", ar: "اعمل <code>useMemo</code> للـ list المحسوبة، واعمل الـ formatters مرة واحدة في الـ module، وأجّل قيمة الفلتر." }
      },
      {
        title: { en: "A fast-changing value at the top", ar: "قيمة بتتغير بسرعة في أعلى الشجرة" },
        body: {
          en: "Scroll position, hover state or a live timer kept in a top-level component or context re-renders the whole page many times a second.",
          ar: "مكان الـ scroll، أو حالة الـ hover، أو timer لايف محفوظين في component فوق خالص أو context بيعملوا re-render للصفحة كلها كذا مرة في الثانية."
        },
        fix: { en: "Keep it in the smallest component that needs it, a store with selectors, or a ref plus direct DOM/CSS updates for purely visual effects.", ar: "خليه في أصغر component محتاجه، أو store بـ selectors، أو ref مع تحديث مباشر للـ DOM/CSS للتأثيرات الشكلية بس." }
      },
      {
        title: { en: "Virtualising everything", ar: "Virtualisation لكل حاجة" },
        body: {
          en: "A 40-row table doesn't need virtualisation; you pay in complexity, accessibility and find-in-page for nothing.",
          ar: "table فيه 40 row مش محتاج virtualisation؛ هتدفع تمنه في التعقيد والـ accessibility والبحث في الصفحة من غير فايدة."
        },
        fix: { en: "Virtualise when the Profiler or DOM size says so (hundreds to thousands of complex rows); otherwise paginate.", ar: "اعمل virtualisation لما الـ Profiler أو حجم الـ DOM يقولوا كده (مئات لآلاف الـ rows المعقدة)؛ وإلا اعمل pagination." }
      }
    ],
    levels: [
      {
        q: "A page with a big table feels slow. What do you do?",
        mid: { en: "Add <code>React.memo</code>, <code>useMemo</code> and <code>useCallback</code>, and maybe pagination.", ar: "أضيف <code>React.memo</code> و <code>useMemo</code> و <code>useCallback</code>، وممكن pagination." },
        senior: {
          en: "I reproduce it and record with the Profiler to see what renders on the slow interaction and why. In Smart FAQ the answer was that every row menu re-rendered because its actions array was new each render. The fix was structural and targeted: one layout per screen size, menus mounted only when opened, and memoised row menus and badges comparing only what they show, with latest-ref handlers. Re-renders went from about 20 ms to about 2 ms. If rows had been in the thousands, I'd add virtualisation; if the filter itself were slow, a deferred value.",
          ar: "بعيد المشكلة وبسجّل بالـ Profiler علشان أشوف إيه اللي بيعمل render في التفاعل البطيء وليه. وفي Smart FAQ كانت الإجابة إن كل row menu بيعمل re-render لأن الـ actions array بتاعه جديد كل render. والحل كان في الـ structure ومحدد: layout واحد لكل مقاس شاشة، والـ menus بتتعمل لها mount بس لما تتفتح، و row menus و badges معمول لها memo بتقارن اللي بتعرضه بس، ومعاها handlers بـ latest ref. والـ re-renders نزلت من حوالي 20ms لحوالي 2ms. ولو الـ rows كانت بالآلاف كنت هضيف virtualisation؛ ولو الفلتر نفسه بطيء، deferred value."
        }
      },
      {
        q: "When do you virtualise a list?",
        mid: { en: "When the list is very long.", ar: "لما الـ list تبقى طويلة أوي." },
        senior: {
          en: "When the DOM size or the Profiler shows that rendering the rows is the bottleneck — usually hundreds to thousands of non-trivial rows, or an endless feed or chat. I pick a library that handles variable heights when needed (okoRent's chat grows upwards with variable-height messages, so react-virtuoso), and I keep accessibility: row counts, keyboard navigation, and an alternative to find-in-page like a search box.",
          ar: "لما حجم الـ DOM أو الـ Profiler يبيّنوا إن رسم الـ rows هو عنق الزجاجة — غالبًا مئات لآلاف الـ rows اللي مش بسيطة، أو feed أو chat مالوش آخر. وبختار مكتبة بتتعامل مع الارتفاعات المختلفة لما أحتاج (الشات في okoRent بيكبر لفوق ورسايله ارتفاعاتها مختلفة، فاستخدمنا react-virtuoso)، وبحافظ على الـ accessibility: عدد الـ rows، والتنقل بالكيبورد، وبديل للبحث في الصفحة زي search box."
        }
      }
    ],
    drill: [
      {
        q: "The Profiler shows a component rendered but its output didn't change. Why?",
        a: { en: "Its parent rendered (default behaviour), a context it reads changed, or a memoised component got a new object or function prop.", ar: "الـ parent بتاعه عمل render (السلوك الافتراضي)، أو context بيقراه اتغير، أو component معمول له memo جاله prop جديد object أو function." },
        follow: [
          {
            q: "How do you tell which one?",
            a: { en: "Turn on “Record why each component rendered” in the Profiler settings: it lists changed props, state, hooks or context, or “parent rendered”.", ar: "شغّل «Record why each component rendered» من إعدادات الـ Profiler: بيعرض الـ props أو الـ state أو الـ hooks أو الـ context اللي اتغيرت، أو «parent rendered»." }
          }
        ]
      }
    ],
    story: {
      text: { en: "Smart FAQ: one layout per screen size, memoised row menus and badges, and lazily mounted menus took a table re-render from ~20 ms to ~2 ms; okoRent uses react-virtuoso for a chat that grows upwards with variable-height messages.", ar: "Smart FAQ: layout واحد لكل مقاس شاشة، و row menus و badges معمول لها memo، و menus بتتعمل لها mount وقت الحاجة نزّلوا الـ re-render بتاع الـ table من ~20ms لـ ~2ms؛ و okoRent بيستخدم react-virtuoso لشات بيكبر لفوق ورسايله ارتفاعاتها مختلفة." },
      p: "smartfaq", tab: "problems", label: "Smart FAQ"
    },
    sources: [
      { label: "react.dev — Profiler", url: "https://react.dev/reference/react/Profiler" },
      { label: "react.dev — memo: minimizing props changes", url: "https://react.dev/reference/react/memo#minimizing-props-changes" },
      { label: "TanStack Virtual", url: "https://tanstack.com/virtual/latest" },
      { label: "web.dev — Virtualize large lists", url: "https://web.dev/articles/virtualize-long-lists-react-window" }
    ]
  }
});
