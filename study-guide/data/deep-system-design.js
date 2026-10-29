// Deep dive for the Frontend system design section. Same shape as deep-javascript.js (see README "Deep dive").
STUDY.deepen("system-design", {
  radio: {
    why: {
      en: "In a system design round the structure of your answer is judged as much as the answer. RADIO keeps you from jumping into components, makes trade-offs visible, and helps you manage 45 minutes.",
      ar: "في جولة الـ system design، ترتيب إجابتك بيتقيّم قد الإجابة نفسها. والـ RADIO بيمنعك تنط على الـ components على طول، وبيخلي الـ trade-offs باينة، وبيساعدك تدير الـ 45 دقيقة."
    },
    how: [
      {
        title: { en: "R — Requirements (≈ 5–8 min)", ar: "R — Requirements (≈ 5–8 دقايق)" },
        body: {
          en: "Ask before designing. Functional: the core flows, what's out of scope. Non-functional: scale (items, users, update rate), devices and network, performance targets, accessibility, i18n/RTL, offline, security. Write the agreed list down; it's what you'll check your design against.",
          ar: "اسأل قبل ما تصمم. الـ functional: الـ flows الأساسية، وإيه اللي برّه الـ scope. والـ non-functional: الحجم (عدد العناصر، اليوزرز، معدل التحديث)، والأجهزة والشبكة، وأهداف الأداء، والـ accessibility، والـ i18n/RTL، والـ offline، والأمان. اكتب الليستة اللي اتفقتوا عليها؛ هي اللي هتقارن التصميم بيها."
        }
      },
      {
        title: { en: "A — Architecture (≈ 10 min)", ar: "A — Architecture (≈ 10 دقايق)" },
        body: {
          en: "Draw the main pieces and how data flows: server/API, a data layer (query cache, store), the main UI components, and where rendering happens (SPA vs server-rendered). Name the responsibility of each box.",
          ar: "ارسم الأجزاء الأساسية والداتا بتمشي إزاي: السيرفر/الـ API، وطبقة الداتا (query cache، store)، والـ UI components الأساسية، والـ rendering بيحصل فين (SPA ولا server-rendered). وقول مسؤولية كل box."
        }
      },
      {
        title: { en: "D — Data model, I — Interface (≈ 10 min)", ar: "D — Data model، و I — Interface (≈ 10 دقايق)" },
        body: {
          en: "Data: server entities, client-only state, normalisation (by id) and what is cached where. Interface: the API between client and server (REST/GraphQL, pagination style, real-time channel, error shapes) and the public API of the main components (props, events).",
          ar: "الداتا: الـ entities بتاعة السيرفر، والـ state اللي على الـ client بس، والـ normalisation (بالـ id)، وإيه اللي متعمل له cache فين. والـ Interface: الـ API بين الـ client والسيرفر (REST/GraphQL، نوع الـ pagination، قناة الـ real-time، شكل الـ errors) والـ API العام للـ components الأساسية (props، events)."
        }
      },
      {
        title: { en: "O — Optimisations and deep dives (the rest)", ar: "O — Optimisations والتعمق (الباقي)" },
        body: {
          en: "Pick the 2–3 that matter for <b>this</b> product and go deep: performance (virtualisation, code splitting, caching), network (debounce, cancellation, retries), accessibility, i18n/RTL, offline, security (XSS, auth), observability. State the trade-off of each choice.",
          ar: "اختار الـ 2–3 المهمين للمنتج <b>ده</b> واتعمق فيهم: الأداء (virtualisation، code splitting، caching)، والشبكة (debounce، الإلغاء، retries)، والـ accessibility، والـ i18n/RTL، والـ offline، والأمان (XSS، auth)، والـ observability. وقول الـ trade-off بتاع كل اختيار."
        }
      }
    ],
    breaks: [
      {
        title: { en: "Starting with components", ar: "إنك تبدأ بالـ components" },
        body: {
          en: "Drawing a component tree in minute one means designing for assumptions the interviewer never agreed to — and missing the requirement they cared about (offline, scale, real-time).",
          ar: "إنك ترسم شجرة components في أول دقيقة معناه إنك بتصمم على افتراضات الإنترفيور عمره ما وافق عليها — وبتفوّت الـ requirement اللي كان مهتم بيه (offline، حجم، real-time)."
        },
        fix: { en: "Spend the first minutes on questions and a written list of requirements.", ar: "اصرف أول دقايق في أسئلة وليستة requirements مكتوبة." }
      },
      {
        title: { en: "Ignoring non-functional requirements", ar: "إنك تتجاهل الـ non-functional requirements" },
        body: {
          en: "A design that works for 20 items on a laptop and says nothing about accessibility, slow networks or RTL reads as junior, even if the components are right.",
          ar: "تصميم شغال مع 20 عنصر على لابتوب ومش بيقول حاجة عن الـ accessibility أو الشبكات البطيئة أو الـ RTL بيبان junior، حتى لو الـ components صح."
        },
        fix: { en: "Bring them up yourself — especially the ones you have real experience with (his: RTL/i18n, offline mobile, admin tables).", ar: "افتحهم إنت بنفسك — خصوصًا اللي عندك فيها خبرة حقيقية (عنده: RTL/i18n، و offline mobile، و admin tables)." }
      },
      {
        title: { en: "Options without a decision", ar: "اختيارات من غير قرار" },
        body: {
          en: "Listing “we could use REST or GraphQL, polling or WebSockets” without choosing sounds unsure.",
          ar: "إنك تعدّ «ممكن REST أو GraphQL، أو polling أو WebSockets» من غير ما تختار بيبان إنك مش متأكد."
        },
        fix: { en: "Choose, give the reason tied to a requirement, and say when you'd switch.", ar: "اختار، وادّي السبب مربوط بـ requirement، وقول إمتى هتغيّر." }
      }
    ],
    levels: [
      {
        q: "How do you approach a frontend system design question?",
        mid: { en: "I break the UI into components, choose a state library and describe the API calls.", ar: "بقسّم الـ UI لـ components، وأختار مكتبة state، وأوصف نداءات الـ API." },
        senior: {
          en: "I lead the conversation with a structure: requirements first — functional and non-functional, written down — then a high-level architecture with data flow, then the data model and interfaces (API shape, pagination, real-time, component APIs), and I spend the remaining time on the two or three deep dives that matter most for this product, each with a decision and its trade-off. I check time as I go and summarise at the end against the requirements.",
          ar: "بقود الكلام بترتيب: الـ requirements الأول — functional و non-functional، ومكتوبين — وبعدين architecture عامة ومعاها مسار الداتا، وبعدين الـ data model والـ interfaces (شكل الـ API، والـ pagination، والـ real-time، و APIs الـ components)، وباقي الوقت بصرفه في أهم 2 أو 3 نقط تعمق للمنتج ده، وكل واحدة بقرار والـ trade-off بتاعه. وبراقب الوقت وأنا ماشي، وفي الآخر بلخّص وأقارن بالـ requirements."
        }
      }
    ],
    drill: [
      {
        q: "What would you ask first for “design a news feed”?",
        a: { en: "Who uses it and on what devices; post types (text, images, video); how fresh it must be (real-time or on refresh); scale (posts per page, total); interactions (like, comment, share); offline; accessibility and languages.", ar: "مين بيستخدمه وعلى أنهي أجهزة؛ أنواع البوستات (نص، صور، فيديو)؛ لازم يبقى جديد قد إيه (real-time ولا مع الـ refresh)؛ الحجم (بوستات في الصفحة، والإجمالي)؛ التفاعلات (like، comment، share)؛ الـ offline؛ والـ accessibility واللغات." },
        follow: [
          {
            q: "The interviewer says “you decide”. Now what?",
            a: { en: "State a reasonable assumption out loud (“mobile web first, refresh-based with a ‘new posts’ banner, 20 posts per page”), write it down, and design for it — they want to see judgement.", ar: "قول افتراض منطقي بصوت عالي («mobile web الأول، التحديث بالـ refresh مع banner ‹بوستات جديدة›، 20 بوست في الصفحة»)، واكتبه، وصمم على أساسه — هما عايزين يشوفوا تقديرك." }
          }
        ]
      }
    ],
    sources: [
      { label: "GreatFrontEnd — Front End System Design: RADIO framework", url: "https://www.greatfrontend.com/front-end-system-design-playbook/framework" },
      { label: "web.dev — Learn Performance", url: "https://web.dev/learn/performance" },
      { label: "W3C WAI — ARIA Authoring Practices Guide", url: "https://www.w3.org/WAI/ARIA/apg/" }
    ]
  },

  autocomplete: {
    why: {
      en: "Autocomplete is small enough to finish and deep enough to test everything: network races, caching, keyboard and screen-reader support, and safe highlighting.",
      ar: "الـ autocomplete صغير كفاية إنك تخلّصه، وعميق كفاية إنه يختبر كل حاجة: الـ races في الشبكة، والـ caching، ودعم الكيبورد والـ screen reader، والـ highlighting الآمن."
    },
    how: [
      {
        title: { en: "Network: debounce, minimum length, cancel stale", ar: "الشبكة: debounce، وحد أدنى للطول، وإلغاء القديم" },
        body: {
          en: "Wait ~200–300 ms after typing stops and require a minimum length to cut requests. Abort the previous request (or key results by query) so a slow old response can't replace a newer one. Show loading, empty and error states inside the listbox.",
          ar: "استنى حوالي 200–300ms بعد ما الكتابة تقف، واشترط حد أدنى للطول علشان تقلل الـ requests. واعمل abort للـ request اللي قبله (أو اربط النتايج بالـ query) علشان رد قديم بطيء ميحلّش مكان رد أحدث. واعرض حالات الـ loading والفاضي والـ error جوه الـ listbox."
        }
      },
      {
        title: { en: "Cache results per query", ar: "Cache للنتايج لكل query" },
        body: {
          en: "Keep a bounded cache (LRU) keyed by the normalised query so backspacing is instant; a query library does this with the query as part of the key. Optionally filter the cached results of a shorter prefix while the new request is in flight.",
          ar: "خلي cache ليه حد (LRU) الـ key بتاعه الـ query بعد normalisation، علشان الـ backspace يبقى فوري؛ ومكتبة queries بتعمل ده لما الـ query يبقى جزء من الـ key. وممكن تفلتر نتايج prefix أقصر متخزنة لحد ما الـ request الجديد يرجع."
        }
      },
      {
        title: { en: "The ARIA combobox pattern", ar: "pattern الـ ARIA combobox" },
        body: {
          en: "The input has <code>role=\"combobox\"</code>, <code>aria-expanded</code>, <code>aria-controls</code> pointing to the <code>role=\"listbox\"</code>, and <code>aria-activedescendant</code> for the highlighted <code>role=\"option\"</code> — focus stays in the input. Arrow keys move, Enter selects, Escape closes; announce the result count in a polite live region.",
          ar: "الـ input عليه <code>role=\"combobox\"</code>، و <code>aria-expanded</code>، و <code>aria-controls</code> بيشاور على الـ <code>role=\"listbox\"</code>، و <code>aria-activedescendant</code> للـ <code>role=\"option\"</code> اللي عليه الاختيار — والـ focus بيفضل في الـ input. والأسهم بتتحرك، و Enter بيختار، و Escape بيقفل؛ وأعلن عدد النتايج في live region مؤدب (polite)."
        },
        code: "<input role=\"combobox\" aria-expanded={open} aria-controls=\"results\" aria-autocomplete=\"list\"\n       aria-activedescendant={active != null ? `opt-${active}` : undefined} />\n<ul id=\"results\" role=\"listbox\">\n  {items.map((it, i) => <li key={it.id} id={`opt-${i}`} role=\"option\" aria-selected={i === active}>{it.label}</li>)}\n</ul>",
        run: "browser"
      },
      {
        title: { en: "Highlight matches without HTML injection", ar: "اعمل highlight للتطابق من غير HTML injection" },
        body: {
          en: "Split the label into text parts and wrap matches in <code>&lt;mark&gt;</code> elements in React. Never build HTML strings from the query or server text and inject them.",
          ar: "قسّم الـ label لأجزاء نص ولف التطابقات في elements <code>&lt;mark&gt;</code> في React. وعمرك ما تبني HTML strings من الـ query أو نص السيرفر وتحطها."
        },
        code: "function Highlight({ text, query }) {\n  if (!query) return text;\n  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\\]\\\\]/g, \"\\\\$&\")})`, \"gi\"));\n  return parts.map((p, i) => (p.toLowerCase() === query.toLowerCase() ? <mark key={i}>{p}</mark> : p));\n}",
        run: "browser"
      }
    ],
    breaks: [
      {
        title: { en: "Race conditions between responses", ar: "Race conditions بين الـ responses" },
        body: {
          en: "Without cancellation or keying, typing “rea” then “react” can end with results for “rea”.",
          ar: "من غير إلغاء أو ربط بالـ key، لو كتبت «rea» وبعدين «react» ممكن تخلص بنتايج «rea»."
        },
        fix: { en: "Abort on each new query, or ignore responses whose query no longer matches the input.", ar: "اعمل abort مع كل query جديد، أو اتجاهل الـ responses اللي الـ query بتاعها مبقاش مطابق للـ input." }
      },
      {
        title: { en: "A dropdown only a mouse can use", ar: "dropdown الماوس بس هو اللي يقدر يستخدمه" },
        body: {
          en: "A <code>div</code> list with click handlers is invisible to screen readers and unusable by keyboard.",
          ar: "list من <code>div</code> عليها click handlers مش باينة للـ screen readers ومينفعش تتستخدم بالكيبورد."
        },
        fix: { en: "Follow the APG combobox pattern (or use a tested primitive) and test with a screen reader.", ar: "امشي على pattern الـ combobox في الـ APG (أو استخدم primitive متجرب) واختبر بـ screen reader." }
      },
      {
        title: { en: "XSS through highlighting", ar: "XSS عن طريق الـ highlighting" },
        body: {
          en: "<code>dangerouslySetInnerHTML</code> with <code>label.replace(query, \"&lt;b&gt;$&amp;&lt;/b&gt;\")</code> lets a crafted label or query inject script.",
          ar: "<code>dangerouslySetInnerHTML</code> مع <code>label.replace(query, \"&lt;b&gt;$&amp;&lt;/b&gt;\")</code> بيخلي label أو query متعمل بقصد يحقن script."
        },
        fix: { en: "Render parts as React text and elements; if the server sends highlight ranges, map them to elements too.", ar: "اعرض الأجزاء كنص و elements في React؛ ولو السيرفر بيبعت أماكن الـ highlight، حوّلها لـ elements برضه." }
      }
    ],
    levels: [
      {
        q: "Design a search autocomplete.",
        mid: { en: "An input with debounce that calls the API and shows results in a dropdown.", ar: "input عليه debounce بينادي الـ API ويعرض النتايج في dropdown." },
        senior: {
          en: "Requirements first: data size and where search runs (server, with typo tolerance and synonyms), latency target, keyboard and screen-reader support, languages. Client: debounce plus minimum length, cancel or key requests to avoid races, a bounded cache per query, loading/empty/error states inside the listbox, the APG combobox pattern with <code>aria-activedescendant</code>, safe highlighting, and mobile behaviour. Decide whether the query belongs in the URL. In Smart FAQ search showed highlighted matches and a multi-department filter, synonyms and typo handling lived in the backend, and the search text was kept out of the URL.",
          ar: "الـ requirements الأول: حجم الداتا والبحث بيحصل فين (على السيرفر، مع تحمّل الأخطاء والمرادفات)، وهدف الوقت، ودعم الكيبورد والـ screen reader، واللغات. وعلى الـ client: debounce وحد أدنى للطول، وإلغاء أو ربط الـ requests علشان أتجنب الـ races، و cache ليه حد لكل query، وحالات loading وفاضي و error جوه الـ listbox، و pattern الـ combobox بتاع الـ APG مع <code>aria-activedescendant</code>، و highlighting آمن، وسلوك الموبايل. وأقرر الـ query مكانه الـ URL ولا لأ. وفي Smart FAQ البحث كان بيعرض التطابقات متعلّم عليها وفيه فلتر لكذا قسم، والمرادفات وتحمّل الأخطاء كانوا في الـ backend، ونص البحث كان برّه الـ URL."
        }
      }
    ],
    drill: [
      {
        q: "Why aria-activedescendant instead of moving focus to the options?",
        a: { en: "Focus stays in the input so the user can keep typing; the attribute tells assistive tech which option is active.", ar: "الـ focus بيفضل في الـ input علشان اليوزر يقدر يكمل كتابة؛ والـ attribute بيقول للتكنولوجيا المساعدة أنهي option هو الحالي." },
        follow: [
          {
            q: "How do screen-reader users learn how many results there are?",
            a: { en: "A visually hidden polite live region updated after results settle (“5 results”), debounced so it doesn't speak on every keystroke.", ar: "live region مؤدب ومستخبي من الشاشة بيتحدث بعد ما النتايج تستقر («5 results»)، وعليه debounce علشان ميتكلمش مع كل حرف." }
          }
        ]
      }
    ],
    story: {
      text: { en: "Smart FAQ search: highlighted matches, a multi-department filter, synonyms and typo handling in the backend, search text kept out of the URL; the FAQ AI POC did intent-based matching in Arabic, Franco and English.", ar: "البحث في Smart FAQ: تطابقات متعلّم عليها، وفلتر لكذا قسم، والمرادفات وتحمّل الأخطاء في الـ backend، ونص البحث برّه الـ URL؛ والـ FAQ AI POC كان بيطابق بالنية بالعربي والفرانكو والإنجليزي." },
      p: "smartfaq", tab: "decisions", label: "Smart FAQ"
    },
    sources: [
      { label: "W3C WAI — Combobox pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/" },
      { label: "GreatFrontEnd — Autocomplete system design", url: "https://www.greatfrontend.com/questions/system-design/autocomplete" },
      { label: "MDN — aria-activedescendant", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-activedescendant" }
    ]
  },

  dashboard: {
    why: {
      en: "Admin dashboards are what most product teams actually build — and what he has built repeatedly. Interviewers probe URL state, server-side pagination, consistency after edits, and how a big table stays fast and accessible.",
      ar: "الـ admin dashboards هي اللي أغلب فرق المنتجات بتبنيه فعلًا — وهو بناه كذا مرة. والإنترفيورز بيحفروا في الـ URL state، والـ pagination على السيرفر، والتناسق بعد التعديلات، وإزاي table كبير يفضل سريع وفيه accessibility."
    },
    how: [
      {
        title: { en: "Filters, sort and page live in the URL", ar: "الفلاتر والترتيب والصفحة عايشين في الـ URL" },
        body: {
          en: "The URL is the source of truth for the table view: shareable links, back/forward, refresh-safe. The query key is built from it, so the data follows the URL. Typed helpers (nuqs, or a <code>useUrlFilters</code> hook) parse and validate params.",
          ar: "الـ URL هو مصدر الحقيقة لشكل الـ table: لينكات تتشارك، ورجوع وتقدم، ومش بيضيع مع الـ refresh. والـ query key بيتبني منه، فالداتا بتمشي ورا الـ URL. والـ helpers اللي بأنواع (nuqs، أو hook زي <code>useUrlFilters</code>) بتعمل parse و validate للـ params."
        }
      },
      {
        title: { en: "Server-side paging, sorting and filtering", ar: "الـ paging والترتيب والفلترة على السيرفر" },
        body: {
          en: "With thousands of rows the server pages, sorts and filters; the client keeps the previous page visible while the next loads (<code>keepPreviousData</code>) and prefetches the next page. Choose offset pagination for “jump to page 7” and cursor pagination for data that changes underneath you.",
          ar: "مع آلاف الـ rows السيرفر هو اللي بيعمل paging وترتيب وفلترة؛ والـ client بيسيب الصفحة اللي قبلها ظاهرة لحد ما اللي بعدها تحمّل (<code>keepPreviousData</code>) وبيعمل prefetch للصفحة الجاية. اختار offset pagination لـ «روح للصفحة 7»، و cursor pagination للداتا اللي بتتغير تحت إيدك."
        },
        code: "// Plain-JS model: someone deletes item 1 while you are on page 1\nconst rows = Array.from({ length: 10 }, (_, i) => i + 1);\nconst page = (data, offset) => data.slice(offset, offset + 3).join();\nconst p1 = page(rows, 0);\nrows.splice(0, 1);\nconsole.log(p1, \"|\", page(rows, 3));            // offset: item 4 is skipped\nconst after = (data, cursor) => data.filter((id) => id > cursor).slice(0, 3).join();\nconsole.log(after(rows, 3));                      // cursor: continues after the last seen id",
        out: "1,2,3 | 5,6,7\n4,5,6",
        run: "node"
      },
      {
        title: { en: "Editing: optimistic where safe, invalidate always", ar: "التعديل: optimistic لما يبقى آمن، و invalidate دايمًا" },
        body: {
          en: "Inline toggles can be optimistic with rollback; destructive or validated edits wait for the server. After any mutation, invalidate the list queries (all pages and filters of that entity) so counts and order stay right. Bulk actions report per-item results (<code>allSettled</code>-style).",
          ar: "الـ toggles اللي في الـ table ينفع تبقى optimistic مع رجوع؛ والتعديلات اللي بتمسح أو محتاجة validation بتستنى السيرفر. وبعد أي mutation، اعمل invalidate لـ queries الـ list (كل الصفحات والفلاتر بتاعة الـ entity ده) علشان الأعداد والترتيب يفضلوا صح. والأكشنز الجماعية بتبلّغ بنتيجة كل عنصر (بأسلوب <code>allSettled</code>)."
        }
      },
      {
        title: { en: "Permissions, exports and states", ar: "الصلاحيات، والتصدير، والحالات" },
        body: {
          en: "Hide or disable actions by role in the UI, but enforce on the server. Large exports are generated by the backend and downloaded, not built from the current page. Design loading (skeleton rows), empty (with a clear-filters action) and error (retry) states up front.",
          ar: "اخفي أو عطّل الأكشنز حسب الـ role في الـ UI، بس الإلزام بيحصل على السيرفر. والتصدير الكبير بيتعمل في الـ backend ويتحمّل، مش بيتبني من الصفحة الحالية. وصمم حالات الـ loading (skeleton rows)، والفاضي (ومعاه أكشن مسح الفلاتر)، والـ error (retry) من الأول."
        }
      }
    ],
    breaks: [
      {
        title: { en: "Client-side filtering of the full data set", ar: "فلترة الداتا كلها على الـ client" },
        body: {
          en: "Downloading 20,000 rows to filter in the browser is slow on load, heavy in memory, and leaks data the user may not be allowed to see.",
          ar: "إنك تحمّل 20,000 row علشان تفلترهم في المتصفح بطيء في التحميل، وتقيل على الذاكرة، وبيسرّب داتا ممكن اليوزر ميكونش مسموحله يشوفها."
        },
        fix: { en: "Server-side filtering and pagination; client-side only for small, fully authorised lists.", ar: "فلترة و pagination على السيرفر؛ والـ client بس للـ lists الصغيرة اللي اليوزر مسموحله بيها كلها." }
      },
      {
        title: { en: "Offset drift after deletes", ar: "الـ offset بيتزحلق بعد المسح" },
        body: {
          en: "Deleting or inserting rows shifts every later offset, so “next page” skips or repeats rows (see the model above).",
          ar: "مسح أو إضافة rows بيزحلق كل الـ offsets اللي بعدها، فـ «الصفحة الجاية» بتتخطى rows أو بتكررها (شوف الموديل اللي فوق)."
        },
        fix: { en: "Cursor pagination for live data, or refetch the current page after mutations and accept that pages are a snapshot.", ar: "cursor pagination للداتا اللي بتتغير، أو اعمل refetch للصفحة الحالية بعد الـ mutations واقبل إن الصفحات snapshot." }
      },
      {
        title: { en: "Filters lost on refresh", ar: "الفلاتر بتضيع مع الـ refresh" },
        body: {
          en: "Keeping filters in component state means a refresh, a shared link or opening a row and coming back loses the user's work.",
          ar: "إنك تحفظ الفلاتر في state الـ component معناه إن الـ refresh، أو لينك اتبعت، أو إنك تفتح row وترجع، بيضيّع شغل اليوزر."
        },
        fix: { en: "URL state for everything that defines the view.", ar: "URL state لكل حاجة بتحدد شكل العرض." }
      }
    ],
    levels: [
      {
        q: "Design an admin table with filters, sorting and inline edits.",
        mid: { en: "Fetch the data with React Query, use a table library, keep filters in state and paginate.", ar: "أجيب الداتا بـ React Query، وأستخدم مكتبة table، وأحفظ الفلاتر في state، وأعمل pagination." },
        senior: {
          en: "Requirements: data size, update rate, roles, required actions, exports, accessibility. Architecture: URL as the source of truth for filters/sort/page; query keys built from it; server-side paging, sorting and filtering, with cursor pagination if data changes often; <code>keepPreviousData</code> plus next-page prefetch. Edits: optimistic toggles with rollback, server-confirmed edits for anything validated, invalidation of all list queries after mutations, per-item results for bulk actions. UI: a headless table (TanStack Table) with proper table semantics, sticky header, virtualisation only if rows are in the thousands, and designed loading/empty/error states. Permissions enforced on the server. That's the shape of Smart FAQ's admin screens (articles, users, audit log, review queue).",
          ar: "الـ Requirements: حجم الداتا، ومعدل التحديث، والـ roles، والأكشنز المطلوبة، والتصدير، والـ accessibility. والـ Architecture: الـ URL مصدر الحقيقة للفلاتر والترتيب والصفحة؛ والـ query keys بتتبني منه؛ و paging وترتيب وفلترة على السيرفر، و cursor pagination لو الداتا بتتغير كتير؛ و <code>keepPreviousData</code> مع prefetch للصفحة الجاية. والتعديلات: toggles بـ optimistic ورجوع، وتعديلات بتستنى تأكيد السيرفر لأي حاجة فيها validation، و invalidation لكل queries الـ list بعد الـ mutations، ونتيجة لكل عنصر في الأكشنز الجماعية. والـ UI: headless table (TanStack Table) بـ semantics الـ table الصح، و header ثابت، و virtualisation بس لو الـ rows بالآلاف، وحالات loading وفاضي و error متصممة. والصلاحيات بتتلزم على السيرفر. وده شكل شاشات الـ admin في Smart FAQ (المقالات، اليوزرز، الـ audit log، طابور المراجعة)."
        }
      }
    ],
    drill: [
      {
        q: "Offset or cursor pagination?",
        a: { en: "Offset when users jump to page numbers and data is fairly stable; cursor when data changes often or is endless (feeds, logs), because it doesn't skip or repeat rows.", ar: "Offset لما اليوزرز بينطوا لأرقام صفحات والداتا ثابتة نسبيًا؛ و cursor لما الداتا بتتغير كتير أو مالهاش آخر (feeds، logs)، لأنه مش بيتخطى rows ولا بيكررها." },
        follow: [
          {
            q: "How do you keep the total count accurate after a delete?",
            a: { en: "Invalidate the list queries for that entity (the count usually comes from the same response), or adjust it optimistically and let the refetch confirm.", ar: "اعمل invalidate لـ queries الـ list بتاعة الـ entity ده (العدد غالبًا جاي في نفس الـ response)، أو عدّله optimistic وسيب الـ refetch يأكده." }
          }
        ]
      }
    ],
    story: {
      text: { en: "Smart FAQ's admin (articles, users, audit log, review queue), the okoRent and Spectra back offices and Bites' finance reports all have this shape.", ar: "الـ admin في Smart FAQ (المقالات، اليوزرز، الـ audit log، طابور المراجعة)، والـ back offices في okoRent و Spectra، وتقارير الماليات في Bites، كلهم بالشكل ده." },
      p: "smartfaq", tab: "how", label: "Smart FAQ"
    },
    sources: [
      { label: "TanStack Table", url: "https://tanstack.com/table/latest" },
      { label: "TanStack Query — Paginated queries", url: "https://tanstack.com/query/latest/docs/framework/react/guides/paginated-queries" },
      { label: "nuqs — URL state", url: "https://nuqs.dev" },
      { label: "W3C WAI — Grid and table patterns", url: "https://www.w3.org/WAI/ARIA/apg/patterns/table/" }
    ]
  }
});
