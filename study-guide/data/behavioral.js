// Behavioral & interview strategy — written 2026-10-29. Stories point to real events in the evidence base; never invent.
STUDY.fill("behavioral", {
  intro: { en: "The non-technical half that decides offers: the STAR method, your 90-second introduction, why you're moving, conflict, mistakes, leadership and mentoring, questions to ask, salary talk, and the interview day itself.", ar: "النص اللي مش تقني واللي بيحسم العروض: طريقة STAR، والتعريف بنفسك في 90 ثانية، وليه بتغير، والخلافات، والأخطاء، والقيادة والـ mentoring، والأسئلة اللي تسألها، والكلام عن المرتب، ويوم الإنترفيو نفسه." },
  topics: [
    {
      id: "star",
      title: { en: "The STAR method", ar: "طريقة STAR" },
      tldr: { en: "<b>S</b>ituation (1–2 lines) → <b>T</b>ask (your responsibility) → <b>A</b>ction (what <i>you</i> did — most of the answer) → <b>R</b>esult (measured if possible, plus what you learned). 60–120 seconds. Say “I” for your part and “we” for the team's.", ar: "<b>S</b>ituation (سطر أو اتنين) ← <b>T</b>ask (مسؤوليتك) ← <b>A</b>ction (<i>انت</i> عملت إيه — معظم الإجابة) ← <b>R</b>esult (برقم لو ينفع، ومعاه اللي اتعلمته). من 60 لـ 120 ثانية. قول «أنا» للجزء بتاعك و«إحنا» للتيم." },
      blocks: [
        { type: "compare", title: { en: "Your story bank (real, from the evidence)", ar: "بنك القصص بتاعك (حقيقي، من الأدلة)" }, cols: [{ en: "Question type", ar: "نوع السؤال" }, { en: "Story", ar: "القصة" }], rows: [
          [{ en: "Biggest achievement / ownership", ar: "أكبر إنجاز / مسؤولية" }, { en: "Smart FAQ from first commit: 27 screens, 3 roles + MFA, 551 tests, ~3 weeks", ar: "Smart FAQ من أول commit: 27 شاشة، 3 roles و MFA، 551 test، حوالي 3 أسابيع" }],
          [{ en: "Hard technical problem", ar: "مشكلة تقنية صعبة" }, { en: "ONE14 GPS under-count (−17% on 30 km) → 1 Hz + software filter", ar: "ONE14 الـ GPS بيعد أقل (‎-17% على 30 كم) ← 1 Hz وفلتر software" }],
          [{ en: "Performance", ar: "الأداء" }, { en: "Smart FAQ admin table: ~20 ms → ~2 ms per re-render", ar: "جدول أدمن Smart FAQ: من 20ms لـ 2ms لكل re-render" }],
          [{ en: "Mistake / lesson", ar: "غلطة / درس" }, { en: "AHS TanStack migration on one long-lived branch → rolled out slower; now merges per domain", ar: "migration الـ TanStack في AHS على branch واحد طويل ← نزل أبطأ؛ دلوقتي بعمل merge لكل domain" }],
          [{ en: "Working alone, big scope", ar: "شغل لوحدك ونطاق كبير" }, { en: "okoRent: sole frontend dev, 110 pages, four portals, SignalR chat", ar: "okoRent: الفرونت الوحيد، 110 صفحة، 4 بوابات، شات بـ SignalR" }],
          [{ en: "Leadership without title", ar: "قيادة من غير لقب" }, { en: "ONE14: led direction, technical calls and QA; mentored 2 teammates at nWeave", ar: "ONE14: قاد الاتجاه والقرارات التقنية والـ QA؛ و mentoring لاتنين في nWeave" }],
          [{ en: "Client / stakeholder", ar: "عميل / أصحاب مصلحة" }, { en: "Osloop website: two feedback rounds (26+ items) handled with the client; FAQ AI POC to show the client the idea", ar: "موقع Osloop: جولتين feedback (26+ ملاحظة) مع العميل؛ و FAQ AI POC علشان يوري العميل الفكرة" }],
          [{ en: "Working with backend / other teams", ar: "الشغل مع الباك إند أو تيمز تانية" }, { en: "Smart FAQ: built on mocks, then OpenAPI contract, sent backend requests per unit, removed mocks", ar: "Smart FAQ: بنى على mocks، وبعدين OpenAPI contract، وبعت طلبات للباك إند لكل unit، وشال الـ mocks" }]
        ] },
        { type: "projects", items: [{ text: { en: "Every handbook project has a STAR block — rehearse them out loud.", ar: "كل مشروع في الـ handbook فيه STAR — اتمرن عليهم بصوت عالي." }, p: "smartfaq", tab: "interview", label: "Smart FAQ" }] }
      ],
      say: "Let me give you the situation briefly, then focus on what I did and the result.",
      interview: [{ q: "Tell me about a challenging project.", a: { en: "Pick ONE14 GPS or Smart FAQ. S: the problem in one line. T: your responsibility. A: 3–4 concrete steps you took (how you found the cause, the options, why you chose one). R: the number + what you'd do differently.", ar: "اختار GPS في ONE14 أو Smart FAQ. S: المشكلة في سطر. T: مسؤوليتك. A: 3–4 خطوات محددة عملتها (لقيت السبب إزاي، الاختيارات، ليه اخترت واحد). R: الرقم + كنت هتعمل إيه مختلف." } }],
      quiz: [{ q: { en: "Which STAR part should be the longest?", ar: "أنهي جزء في STAR المفروض يبقى الأطول؟" }, a: { en: "Action.", ar: "الـ Action." } }],
      quick: [{ en: "S·T short, A long (your actions), R with numbers + lesson; 60–120 s; “I” for your part.", ar: "S و T قصيرين، و A طويل (اللي انت عملته)، و R بأرقام ودرس؛ 60–120 ثانية؛ «أنا» للجزء بتاعك." }]
    },
    {
      id: "intro",
      title: { en: "“Tell me about yourself” (90 seconds)", ar: "«عرّفني بنفسك» (90 ثانية)" },
      tldr: { en: "Present → past → why this role. Lead with what you do now and your strongest proof, connect your path, and end with why their job fits. Tailor the middle to the company type (fintech, health, SaaS, agency).", ar: "الحاضر ← الماضي ← ليه الوظيفة دي. ابدأ باللي بتعمله دلوقتي وأقوى دليل، واربط مسارك، واقفل بليه وظيفتهم مناسبة. وغيّر النص حسب نوع الشركة (fintech، صحة، SaaS، agency)." },
      blocks: [
        { type: "code", title: { en: "A draft to adapt (English, as you'd say it)", ar: "مسودة تعدّل عليها (إنجليزي، زي ما هتقولها)" }, code: "I'm a frontend engineer with four years of experience in React, Next.js and React Native.\nRight now I'm at nWeave, where I recently built the frontend of a healthcare-operations\nknowledge platform from the first commit — 27 screens, role-based access with MFA and\nover 550 automated tests — and before that I introduced TanStack Query to a large\nhealthcare platform and built its billing-formula builder. I also led a Qur'an-and-running\nmobile app that's live on both stores.\n\nBefore nWeave I was the only frontend developer on a rental marketplace at Profound —\n110 pages, real-time chat with SignalR — and I started at Aquadic building client sites.\n\nWhat I enjoy most is owning a product area end to end: the data layer, the design system\nand the tests. That's why this role caught my attention — [specific reason about them]." },
        { type: "pitfalls", items: [{ en: "Reciting the CV line by line, starting from university, or going over two minutes.", ar: "تقرا الـ CV سطر سطر، أو تبدأ من الجامعة، أو تعدي دقيقتين." }] }
      ],
      say: "I'm a frontend engineer who likes owning a product area end to end — data layer, design system and tests — and I can show it in what I shipped this year.",
      interview: [{ q: "Walk me through your CV.", a: { en: "Same structure: current role and proof, the path (each job in one line with its highlight), and why this role is the next step.", ar: "نفس الهيكل: الوظيفة الحالية والدليل، والمسار (كل شغلانة في سطر بأهم حاجة فيها)، وليه الوظيفة دي هي الخطوة الجاية." } }],
      quiz: [{ q: { en: "Order of the intro?", ar: "ترتيب التعريف؟" }, a: { en: "Present → past → why this role.", ar: "الحاضر ← الماضي ← ليه الوظيفة دي." } }],
      quick: [{ en: "Present (proof) → past (one line each) → why them; 90 s; tailor the middle.", ar: "الحاضر (دليل) ← الماضي (سطر لكل واحدة) ← ليه همّا؛ 90 ثانية؛ غيّر النص." }]
    },
    {
      id: "why",
      title: { en: "Why are you leaving? Why us? Where in 5 years?", ar: "ليه بتمشي؟ ليه إحنا؟ هتبقى فين بعد 5 سنين؟" },
      tldr: { en: "Always forward-looking and positive: you want bigger products, deeper engineering practice, a strong team, a domain you care about. Never criticise your current employer. “Why us” must mention something specific (their product, stack, engineering blog, mission).", ar: "دايمًا بصّ لقدام وبإيجابية: عايز منتجات أكبر، وممارسة هندسية أعمق، وتيم قوي، ومجال بيهمك. وعمرك ما تنتقد شغلك الحالي. و«ليه إحنا» لازم يبقى فيها حاجة محددة (المنتج بتاعهم، الـ stack، الـ engineering blog، الرسالة)." },
      blocks: [
        { type: "list", items: [
          { en: "<b>Leaving:</b> “I've grown a lot at nWeave across many client projects; I want to go deep on one product at scale with a strong engineering culture.”", ar: "<b>ليه بتمشي:</b> «اتعلمت كتير في nWeave في مشاريع عملاء كتير؛ وعايز أتعمق في منتج واحد كبير مع ثقافة هندسية قوية.»" },
          { en: "<b>Why us:</b> one product reason + one engineering reason + one personal reason (fintech → money flows you've built at Bites and AHS billing).", ar: "<b>ليه إحنا:</b> سبب عن المنتج + سبب هندسي + سبب شخصي (fintech ← فلوس اشتغلت عليها في Bites والفواتير في AHS)." },
          { en: "<b>5 years:</b> “Senior → leading the frontend of a product area, mentoring, shaping architecture and the design system.”", ar: "<b>5 سنين:</b> «Senior ← أقود فرونت جزء من المنتج، وأعمل mentoring، وأشكل الـ architecture والـ design system.»" }
        ] }
      ],
      say: "I'm looking for depth: one product at scale, a strong engineering culture, and a team I can grow into a lead role with.",
      interview: [{ q: "Why do you have overlapping jobs (part-time + full-time)?", a: { en: "Be direct: “Bites was a part-time remote role alongside nWeave from 09/2025 to 04/2026; I managed both, and it's where I built the finance modules.” Don't be defensive.", ar: "خليك مباشر: «Bites كانت شغلانة part-time remote جنب nWeave من 09/2025 لـ 04/2026؛ كنت ماسك الاتنين، وهناك بنيت الـ finance modules.» ومتدافعش عن نفسك." } }],
      quiz: [{ q: { en: "Rule for talking about your current employer?", ar: "القاعدة وانت بتتكلم عن شغلك الحالي؟" }, a: { en: "Positive or neutral — never criticise.", ar: "إيجابي أو محايد — عمرك ما تنتقد." } }],
      quick: [{ en: "Forward-looking reasons; specific “why us”; growth path to lead; explain overlaps calmly.", ar: "أسباب لقدام؛ «ليه إحنا» محددة؛ طريق للقيادة؛ اشرح التداخل بهدوء." }]
    },
    {
      id: "conflict",
      title: { en: "Conflict, disagreement and feedback", ar: "الخلافات والاعتراض والـ feedback" },
      tldr: { en: "Show that you disagree with data, listen, decide together, and commit. Structure: the disagreement → how you understood their view → the evidence you brought → the outcome → the relationship after. For feedback: what you received, what you changed, the result.", ar: "ورّي إنك بتعترض بالدليل، وبتسمع، وبتقرروا مع بعض، وبتلتزم. الهيكل: الخلاف ← فهمت وجهة نظرهم إزاي ← الدليل اللي جبته ← النتيجة ← العلاقة بعدها. وللـ feedback: إيه اللي جالك، وغيرت إيه، والنتيجة." },
      blocks: [
        { type: "list", title: { en: "Real situations you can build stories from (check the details with your memory)", ar: "مواقف حقيقية تقدر تبني منها قصص (اتأكد من التفاصيل من ذاكرتك)" }, items: [
          { en: "Client feedback rounds on the Osloop site — balancing the client's wishes with performance and consistency.", ar: "جولات feedback العميل في موقع Osloop — توازن بين طلبات العميل والأداء والاتساق." },
          { en: "Proposing a data-layer change (TanStack Query) to a busy team — getting buy-in, writing the guide.", ar: "اقتراح تغيير في الـ data layer (TanStack Query) لتيم مشغول — إقناعهم، وكتابة الـ guide." },
          { en: "Sending backend requests per unit on Smart FAQ when the contract didn't fit the screens.", ar: "طلبات للباك إند لكل unit في Smart FAQ لما الـ contract مكانش مناسب للشاشات." },
          { en: "ONE14 technical calls (audio per ayah vs per surah) — options, trade-offs, decision.", ar: "قرارات ONE14 التقنية (الصوت لكل آية ولا لكل سورة) — الاختيارات والـ trade-offs والقرار." }
        ] },
        { type: "pitfalls", items: [{ en: "Stories where you were simply right and the other person wrong; or no resolution.", ar: "قصص انت فيها كنت صح وخلاص والتاني غلط؛ أو من غير نهاية." }] }
      ],
      say: "When I disagree, I bring evidence, make sure I understand the other side, and once we decide, I fully commit to the decision.",
      interview: [{ q: "Tell me about a time you disagreed with a teammate or lead.", a: { en: "Use one real case. Show: you listened, you proposed a small experiment or brought data, the team decided, and the outcome — even if your idea wasn't chosen.", ar: "استخدم حالة حقيقية. ورّي: إنك سمعت، واقترحت تجربة صغيرة أو جبت داتا، والتيم قرر، والنتيجة — حتى لو فكرتك ماتاخدتش." } }],
      quiz: [{ q: { en: "What must every conflict story end with?", ar: "كل قصة خلاف لازم تنتهي بإيه؟" }, a: { en: "A resolution and a good working relationship (plus a lesson).", ar: "حل وعلاقة شغل كويسة (ومعاها درس)." } }],
      quick: [{ en: "Disagree with evidence; understand them; decide together; commit; relationship intact.", ar: "اعترض بالدليل؛ افهمهم؛ قرروا مع بعض؛ التزم؛ والعلاقة سليمة." }]
    },
    {
      id: "mistakes",
      title: { en: "Mistakes, failure and weaknesses", ar: "الأخطاء والفشل ونقط الضعف" },
      tldr: { en: "Pick a real, moderate mistake you own, show how you fixed it and what you changed so it doesn't happen again. For weaknesses: a real one you're actively improving, with the steps you're taking.", ar: "اختار غلطة حقيقية ومتوسطة انت مسؤول عنها، وورّي صلحتها إزاي وغيرت إيه علشان متتكررش. ولنقط الضعف: واحدة حقيقية انت شغال على تحسينها، والخطوات اللي بتعملها." },
      blocks: [
        { type: "list", items: [
          { en: "<b>Mistake:</b> AHS migration kept on one long-lived branch → most screens didn't ship together; lesson: merge per domain, smaller PRs.", ar: "<b>غلطة:</b> migration الـ AHS فضل على branch واحد طويل ← معظم الشاشات ماتعملهاش merge مع بعض؛ الدرس: merge لكل domain و PRs أصغر." },
          { en: "<b>Weakness (honest + improving):</b> GraphQL and formal E2E suites weren't part of my production work — I'm building a small GraphQL project and adding Playwright E2E to a public repo.", ar: "<b>نقطة ضعف (صادقة وبتتحسن):</b> GraphQL و E2E suites رسمية مكانوش في شغلي في الـ production — بعمل مشروع GraphQL صغير وبزود E2E بـ Playwright على repo public." },
          { en: "<b>Weakness (style):</b> taking on too much myself (sole frontend on big projects) — now I write context docs and guides so others can pick work up.", ar: "<b>نقطة ضعف (أسلوب):</b> إني أشيل كتير لوحدي (الفرونت الوحيد في مشاريع كبيرة) — دلوقتي بكتب context docs و guides علشان غيري يقدر يمسك الشغل." }
        ] }
      ],
      say: "The mistake that taught me most was keeping a big migration on one long-lived branch; now I ship large changes in small, mergeable steps.",
      interview: [{ q: "What's your biggest weakness?", a: { en: "Name a real gap, show the plan and progress. Avoid fake weaknesses (“I work too hard”).", ar: "سمّي فجوة حقيقية، وورّي الخطة والتقدم. وابعد عن نقط الضعف المزيفة («بشتغل زيادة»)." } }],
      quiz: [{ q: { en: "Three parts of a good mistake story?", ar: "التلات أجزاء لقصة غلطة كويسة؟" }, a: { en: "What happened (owned) → how you fixed it → what you changed for the future.", ar: "اللي حصل (وانت مسؤول) ← صلحته إزاي ← غيرت إيه للمستقبل." } }],
      quick: [{ en: "Own it → fix → prevent; real weakness + active plan (GraphQL, E2E); no fake weaknesses.", ar: "اعترف ← صلّح ← امنع التكرار؛ نقطة ضعف حقيقية وخطة شغالة (GraphQL، E2E)؛ من غير ضعف مزيف." }]
    },
    {
      id: "leadership",
      title: { en: "Leadership, mentoring and ownership", ar: "القيادة والـ mentoring والمسؤولية" },
      tldr: { en: "Senior roles look for influence without authority: you raised the bar (guides, standards, tests), helped others grow (mentoring two teammates), drove decisions (ONE14 technical calls), and owned outcomes end to end (Smart FAQ, okoRent).", ar: "الوظايف الـ Senior بتدور على تأثير من غير سلطة: رفعت المستوى (guides، قواعد، tests)، وساعدت غيرك يكبر (mentoring لاتنين)، وقُدت قرارات (قرارات ONE14 التقنية)، وكنت مسؤول عن النتيجة من أولها لآخرها (Smart FAQ، okoRent)." },
      blocks: [
        { type: "list", items: [
          { en: "Mentoring 2 teammates: code reviews and pairing — have one concrete example of something you taught and how they improved.", ar: "Mentoring لاتنين: code reviews و pairing — خلي عندك مثال محدد لحاجة علمتها وإزاي اتحسنوا." },
          { en: "Raising standards: React Query guide (AHS), context docs and code standards (Smart FAQ), tests on every feature.", ar: "رفع المستوى: guide لـ React Query (AHS)، و context docs وقواعد كود (Smart FAQ)، و tests مع كل feature." },
          { en: "Driving decisions: ONE14 audio and GPS approaches; Smart FAQ architecture.", ar: "قيادة القرارات: طريقة الصوت والـ GPS في ONE14؛ و architecture Smart FAQ." }
        ] }
      ],
      say: "I lead by raising the bar for everyone — guides, standards and tests — and by mentoring; I've mentored two teammates and led the technical direction of a mobile app.",
      interview: [{ q: "How do you mentor someone?", a: { en: "Start from their goal, pair on real tasks, review with questions rather than fixes, give them ownership of a piece, and check progress regularly.", ar: "ابدأ من هدفهم، واشتغل معاهم على مهام حقيقية، وراجع بأسئلة مش بحلول جاهزة، واديهم مسؤولية جزء، وتابع التقدم بانتظام." } }],
      quiz: [{ q: { en: "“Influence without authority” examples from your work?", ar: "أمثلة «تأثير من غير سلطة» من شغلك؟" }, a: { en: "The React Query guide, introducing TanStack Query, Smart FAQ context docs, ONE14 technical decisions.", ar: "الـ guide بتاع React Query، وإدخال TanStack Query، و context docs في Smart FAQ، وقرارات ONE14 التقنية." } }],
      quick: [{ en: "Influence: guides, standards, tests; mentoring 2 with a concrete example; decisions you drove; end-to-end ownership.", ar: "التأثير: guides وقواعد و tests؛ mentoring لاتنين بمثال محدد؛ قرارات قُدتها؛ مسؤولية من الأول للآخر." }]
    },
    {
      id: "closing",
      title: { en: "Questions to ask, salary, and the interview day", ar: "أسئلة تسألها، والمرتب، ويوم الإنترفيو" },
      tldr: { en: "Ask 2–3 real questions (team, how they ship, what success looks like in 6 months). On salary: research the range (see market notes), let them share a range first if possible, answer with a researched range, negotiate the whole package. On the day: test your setup, have your projects open, think out loud, and send a short thank-you.", ar: "اسأل 2–3 أسئلة حقيقية (التيم، بيعملوا ship إزاي، النجاح بعد 6 شهور شكله إيه). وفي المرتب: اعرف الرينج (شوف ملاحظات السوق)، وسيبهم يقولوا رينج الأول لو ينفع، وجاوب برينج مبني على بحث، واتفاوض على الباكدج كلها. ويوم الإنترفيو: جرّب الأجهزة، وخلي مشاريعك مفتوحة، وفكّر بصوت عالي، وابعت شكر قصير." },
      blocks: [
        { type: "list", title: { en: "Questions worth asking", ar: "أسئلة تستاهل تسألها" }, items: [
          { en: "“What does a great first six months look like in this role?”", ar: "«أول 6 شهور الممتازة في الوظيفة دي شكلها إيه؟»" },
          { en: "“How do you go from idea to production — reviews, testing, releases?”", ar: "«بتروحوا من الفكرة للـ production إزاي — مراجعات، tests، إصدارات؟»" },
          { en: "“What's the biggest technical challenge the frontend team faces right now?”", ar: "«إيه أكبر تحدي تقني قدام تيم الفرونت دلوقتي؟»" },
          { en: "“How do frontend engineers grow here — what does the path to lead look like?”", ar: "«مهندس الفرونت بيكبر هنا إزاي — الطريق للـ lead شكله إيه؟»" }
        ] },
        { type: "list", title: { en: "Egypt-specific notes", ar: "ملاحظات خاصة بمصر" }, items: [
          { en: "Military status: Exempted — say it clearly; many companies ask.", ar: "الموقف من التجنيد: معفي — قوله بوضوح؛ شركات كتير بتسأل." },
          { en: "Notice period at nWeave and start date — know them before the offer stage.", ar: "فترة الإخطار في nWeave وميعاد البداية — اعرفهم قبل مرحلة العرض." },
          { en: "Social insurance history may be checked — dates on your CV should match reality.", ar: "تاريخ التأمينات ممكن يتشاف — التواريخ في الـ CV لازم تطابق الحقيقة." },
          { en: "Salary benchmarks: see <code>market/companies.md</code> (Levels.fyi Cairo ranges); product/fintech usually pay more than agencies.", ar: "أرقام المرتبات: شوف <code>market/companies.md</code> (رينجات Levels.fyi في القاهرة)؛ والـ product والـ fintech غالبًا بيدفعوا أكتر من الـ agencies." }
        ] }
      ],
      say: "Before we wrap up, I'd love to ask: what does a great first six months look like for this role?",
      interview: [{ q: "What are your salary expectations?", a: { en: "“Based on the role's scope and market data for senior frontend roles in Cairo, I'm looking at a range of X–Y, depending on the full package.” Give a researched range, not one number, and be ready to justify it with your scope.", ar: "«حسب مسؤوليات الوظيفة وداتا السوق لوظايف Senior Frontend في القاهرة، أنا بفكر في رينج من X لـ Y، حسب الباكدج كلها.» ادي رينج مبني على بحث مش رقم واحد، وكن جاهز تبرره بحجم شغلك." } }],
      quiz: [{ q: { en: "How many questions should you ask at the end?", ar: "تسأل كام سؤال في الآخر؟" }, a: { en: "2–3 real ones.", ar: "2–3 حقيقيين." } }],
      quick: [{ en: "Ask 2–3 real questions; researched salary range; know notice period; dates match insurance; thank-you note.", ar: "اسأل 2–3 أسئلة حقيقية؛ رينج مرتب مبني على بحث؛ اعرف فترة الإخطار؛ التواريخ تطابق التأمينات؛ رسالة شكر." }]
    }
  ]
});
