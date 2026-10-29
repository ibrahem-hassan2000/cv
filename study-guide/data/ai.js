// Working with AI — written 2026-10-29 (requested by the user: how to talk to AI and build with it for the best result).
STUDY.fill("ai", {
  intro: { en: "Using AI as a senior engineer: how LLMs behave, how to prompt for code, how to run an agent workflow that stays correct (context docs, plans, small steps, tests), how to review AI output, how to build AI features into products, and how to talk about all of it in interviews.", ar: "إزاي تستخدم الـ AI كمهندس Senior: الـ LLMs بتتصرف إزاي، وإزاي تكتب prompt للكود، وإزاي تدير workflow مع agent يفضل صح (context docs، خطط، خطوات صغيرة، tests)، وإزاي تراجع اللي الـ AI كتبه، وإزاي تبني features فيها AI في المنتجات، وإزاي تتكلم عن ده كله في الإنترفيو." },
  topics: [
    {
      id: "llm-basics",
      title: { en: "How LLMs behave (and why it matters)", ar: "الـ LLMs بتتصرف إزاي (وليه ده يهمك)" },
      tldr: { en: "An LLM predicts the next token from everything in its context window. It has no memory between sessions unless you give it context, it can be confidently wrong (hallucination), its knowledge has a cutoff, and the same prompt can give different answers. Everything good you get from it comes from <b>context + constraints + verification</b>.", ar: "الـ LLM بيتوقع الـ token اللي بعده من كل اللي في الـ context window بتاعه. ملوش ذاكرة بين الجلسات إلا لو انت اديته context، وممكن يغلط وهو واثق (hallucination)، ومعلوماته ليها تاريخ وقفت عنده، ونفس الـ prompt ممكن يدي إجابات مختلفة. وكل حاجة كويسة بتاخدها منه جاية من <b>context + قيود + تحقق</b>." },
      blocks: [
        { type: "compare", cols: [{ en: "Property", ar: "الخاصية" }, { en: "What to do about it", ar: "تعمل إيه" }], rows: [
          [{ en: "Context window (limited)", ar: "Context window (محدود)" }, { en: "Give the relevant files, rules and examples — not the whole repo; keep long-lived context in docs it can re-read", ar: "اديله الملفات والقواعد والأمثلة المهمة — مش الـ repo كله؛ وخلي الـ context الدايم في docs يقدر يرجعلها" }],
          [{ en: "No memory", ar: "مفيش ذاكرة" }, { en: "Project instruction files (CLAUDE.md), plans and logs that every session reads first", ar: "ملفات تعليمات للمشروع (CLAUDE.md)، وخطط و logs كل جلسة بتقراها الأول" }],
          [{ en: "Hallucination", ar: "الـ Hallucination" }, { en: "Ask it to read the code first; run the code; check APIs against docs/versions", ar: "خليه يقرا الكود الأول؛ وشغّل الكود؛ واتأكد من الـ APIs من الـ docs والـ versions" }],
          [{ en: "Knowledge cutoff", ar: "تاريخ وقوف المعلومات" }, { en: "Tell it the versions you use; paste current docs for new APIs", ar: "قوله الـ versions اللي بتستخدمها؛ والصق الـ docs الحالية للـ APIs الجديدة" }],
          [{ en: "Non-deterministic", ar: "مش ثابت" }, { en: "Pin decisions in writing; verify outputs with tests rather than trusting a run", ar: "ثبّت القرارات بالكتابة؛ واتأكد من النتايج بـ tests بدل ما تثق في تشغيلة" }]
        ] }
      ],
      say: "I treat an LLM as a fast collaborator with no memory and no guarantees: I give it the right context and constraints, and I verify everything it produces.",
      interview: [{ q: "What is a hallucination and how do you guard against it in code?", a: { en: "A confident but false output — an API that doesn't exist, a wrong version's syntax, an invented fact. Guard: make it read the actual code/docs, run types/tests/lint, and review the diff like a teammate's.", ar: "ناتج واثق بس غلط — API مش موجود، syntax نسخة غلط، معلومة مختلقة. الحماية: خليه يقرا الكود والـ docs الحقيقية، وشغّل الـ types والـ tests والـ lint، وراجع الـ diff زي ما تراجع شغل زميل." } }],
      quiz: [{ q: { en: "Why do project instruction files help agents?", ar: "ليه ملفات تعليمات المشروع بتساعد الـ agents؟" }, a: { en: "They give every new session the context and rules it can't remember.", ar: "بتدي كل جلسة جديدة الـ context والقواعد اللي مش فاكرها." } }],
      quick: [{ en: "Next-token prediction; limited context; no memory; can hallucinate; cutoff; non-deterministic → context + constraints + verification.", ar: "توقع الـ token الجاي؛ context محدود؛ من غير ذاكرة؛ ممكن يألف؛ معلومات ليها تاريخ؛ مش ثابت ← context و قيود وتحقق." }]
    },
    {
      id: "prompting-code",
      title: { en: "How to talk to AI to get good code", ar: "تكلم الـ AI إزاي علشان يطلع كود كويس" },
      tldr: { en: "A strong request has five parts: <b>goal</b> (what and why), <b>context</b> (files, stack, versions, existing patterns), <b>constraints</b> (what not to change, style, libraries), <b>acceptance criteria</b> (how we'll know it's right — tests, behaviour), and <b>output format</b> (plan first, small diff, explanation). Ask for a plan before code on anything non-trivial.", ar: "الطلب القوي فيه 5 أجزاء: <b>الهدف</b> (إيه وليه)، و<b>الـ context</b> (ملفات، stack، versions، أنماط موجودة)، و<b>القيود</b> (إيه اللي ميتغيرش، الستايل، المكتبات)، و<b>معايير القبول</b> (هنعرف إنه صح إزاي — tests، سلوك)، و<b>شكل الناتج</b> (خطة الأول، diff صغير، شرح). واطلب خطة قبل الكود في أي حاجة مش بسيطة." },
      blocks: [
        { type: "code", title: { en: "Template", ar: "قالب" }, code: "Goal: Add server-side pagination to the Users admin table so it handles 50k users.\nContext: React 19 + TanStack Query 5 + our DataTable (src/components/organisms/data-table).\n  Filters already live in the URL via useUrlFilters. API: GET /users?page&size&status → { items, total }.\nConstraints: Don't change DataTable's public props. Follow the query-key pattern in lib/api/query-keys.ts.\n  No new dependencies. Keep page size options 10/25/50.\nAcceptance: page and size in the URL; Back restores the page; no flash between pages (keepPreviousData);\n  tests: switching page calls the API with the right params; empty and error states render.\nOutput: First a short plan and the files you'll touch. Wait for my OK. Then the diff, then how you tested it." },
        { type: "when", title: { en: "Good vs weak prompts", ar: "Prompt كويس ولا ضعيف" }, use: [
          { en: "“Read X and Y first, then propose a plan.”", ar: "«اقرا X و Y الأول، وبعدين اقترح خطة.»" },
          { en: "Concrete examples of input/output, or a failing test.", ar: "أمثلة واضحة للمدخلات والمخرجات، أو test فاشل." },
          { en: "Name the pattern to follow (“like useOrders in AHS's query folder”).", ar: "سمّي النمط اللي يمشي عليه («زي useOrders في فولدر الـ query في AHS»)." },
          { en: "One task per request; small, reviewable diffs.", ar: "مهمة واحدة لكل طلب؛ و diffs صغيرة تتراجع." }
        ], avoid: [
          { en: "“Make it better” / “fix the bug” with no repro or criteria.", ar: "«حسّنه» أو «صلّح الـ bug» من غير خطوات أو معايير." },
          { en: "Pasting secrets, client data or production keys.", ar: "تلصق أسرار أو داتا عملاء أو مفاتيح production." },
          { en: "Accepting a large diff you haven't read.", ar: "توافق على diff كبير مقريتوش." }
        ] },
        { type: "list", title: { en: "Prompts worth keeping", ar: "Prompts تستاهل تحفظها" }, items: [
          { en: "<b>Debug:</b> “Here's the error, the steps to reproduce and the relevant files. List 3 likely causes ranked by evidence, and how to confirm each, before changing code.”", ar: "<b>Debug:</b> «ده الـ error، وخطوات إعادته، والملفات المهمة. قول 3 أسباب محتملة مترتبة حسب الدليل، وإزاي نتأكد من كل واحد، قبل ما تغير كود.»" },
          { en: "<b>Review:</b> “Review this diff for bugs, security and accessibility. Only report issues you can point to a line for.”", ar: "<b>Review:</b> «راجع الـ diff ده من ناحية الـ bugs والأمان والـ accessibility. قول بس المشاكل اللي تقدر تشاور على سطرها.»" },
          { en: "<b>Tests:</b> “Write tests for the behaviour in this spec, using Testing Library role queries and our fake API helper. Don't test implementation details.”", ar: "<b>Tests:</b> «اكتب tests للسلوك اللي في المواصفات دي، بـ استعلامات Testing Library بالـ role و helper الـ API المزيف بتاعنا. متختبرش تفاصيل التنفيذ.»" },
          { en: "<b>Explain:</b> “Explain this code to a new teammate: what it does, why it's built this way, and the risky parts.”", ar: "<b>شرح:</b> «اشرح الكود ده لزميل جديد: بيعمل إيه، وليه متعمل كده، وإيه الأجزاء الخطيرة.»" },
          { en: "<b>Interview prep:</b> “Ask me 10 senior React interview questions one at a time, wait for my answer, then grade it and show a stronger answer.”", ar: "<b>تحضير إنترفيو:</b> «اسألني 10 أسئلة React لمستوى Senior واحد واحد، واستنى إجابتي، وبعدين قيّمها ووريني إجابة أقوى.»" }
        ] }
      ],
      say: "I prompt like I'd brief a teammate: goal, context, constraints and acceptance criteria — and on anything non-trivial I ask for a plan before any code.",
      interview: [{ q: "How do you get consistent code style from AI across a codebase?", a: { en: "Point it at existing examples to imitate, keep a code-standards doc it reads every session, and let lint/format/type checks enforce the rest.", ar: "أشاوره على أمثلة موجودة يقلدها، وأخلي عندي doc لقواعد الكود يقراه كل جلسة، والـ lint والـ format والـ types يفرضوا الباقي." } }],
      quiz: [{ q: { en: "Five parts of a strong coding prompt?", ar: "الخمس أجزاء لـ prompt كود قوي؟" }, a: { en: "Goal, context, constraints, acceptance criteria, output format.", ar: "الهدف، الـ context، القيود، معايير القبول، شكل الناتج." } }],
      quick: [{ en: "Goal + context + constraints + acceptance + output format; plan first; one task; small diffs; no secrets.", ar: "هدف و context وقيود ومعايير قبول وشكل ناتج؛ خطة الأول؛ مهمة واحدة؛ diffs صغيرة؛ من غير أسرار." }]
    },
    {
      id: "agent-workflow",
      title: { en: "Building with an AI agent: the workflow that stays correct", ar: "البناء مع AI agent: الـ workflow اللي بيفضل صح" },
      tldr: { en: "Agents (Claude Code and similar) read files, run commands and edit code. Results stay good when you: (1) keep persistent context files (rules, architecture, progress), (2) plan before building, (3) work in small steps with a commit after each, (4) let tests, types and lint act as guardrails, (5) review every diff, (6) log decisions so the next session continues correctly.", ar: "الـ Agents (Claude Code وأمثاله) بتقرا الملفات وتشغل أوامر وتعدل الكود. والنتايج بتفضل كويسة لما: (1) يبقى عندك ملفات context دايمة (قواعد، architecture، تقدم)، (2) تخطط قبل البناء، (3) تشتغل خطوات صغيرة و commit بعد كل واحدة، (4) الـ tests والـ types والـ lint يبقوا حواجز، (5) تراجع كل diff، (6) تسجل القرارات علشان الجلسة الجاية تكمل صح." },
      blocks: [
        { type: "code", title: { en: "A context folder that works", ar: "فولدر context بيشتغل" }, code: "CLAUDE.md               # read first: goal, hard rules, where things are, how to continue\ncontext/\n  architecture.md       # stack, boundaries, folder rules\n  code-standards.md     # naming, patterns to copy, things to never do\n  data-layer.md         # API contract, errors, caching rules\n  progress-tracker.md   # what's done, what's next, open questions\n  unit-XX-plan.md       # plan for the current piece of work" },
        { type: "list", title: { en: "The loop", ar: "اللفة" }, items: [
          { en: "Explore: “read these files and summarise how X works” — correct its understanding before it writes.", ar: "استكشف: «اقرا الملفات دي ولخّص X شغال إزاي» — صحح فهمه قبل ما يكتب." },
          { en: "Plan: agree on steps and the files to touch; push back on scope creep.", ar: "خطط: اتفقوا على الخطوات والملفات؛ وارفض أي توسع في النطاق." },
          { en: "Build one step → run tests/types/lint → read the diff → commit.", ar: "ابني خطوة ← شغّل tests و types و lint ← اقرا الـ diff ← commit." },
          { en: "Verify for real: open the app, click the flow, check edge cases — not just “tests pass”.", ar: "اتأكد بجد: افتح التطبيق، وجرب الـ flow، وشوف الحالات الحدية — مش بس «الـ tests نجحت»." },
          { en: "Record: update the progress log and any rule you discovered.", ar: "سجّل: حدّث الـ progress log وأي قاعدة اكتشفتها." }
        ] },
        { type: "projects", items: [
          { text: { en: "Smart FAQ ran exactly this: context/ai-workflow-rules.md, architecture, data-layer, code standards, progress tracker and unit plans — 27 screens and 551 tests in about three weeks.", ar: "Smart FAQ اشتغل بالظبط كده: context/ai-workflow-rules.md و architecture و data-layer و code standards و progress tracker وخطط لكل unit — 27 شاشة و 551 test في حوالي 3 أسابيع." }, p: "smartfaq", tab: "interview", label: "Smart FAQ" },
          { text: { en: "This CV project too: CLAUDE.md + a master plan with STATUS and a session log let three laptops and many sessions continue without losing the thread; verifier scripts caught wrong answers before they reached you.", ar: "ومشروع الـ CV ده كمان: CLAUDE.md وخطة رئيسية فيها STATUS و session log خلوا تلات لابات وجلسات كتير يكملوا من غير ما الخيط يضيع؛ وأدوات التحقق مسكت إجابات غلط قبل ما توصلك." } },
          { text: { en: "ONE14: he led product and technical direction while a teammate built through an AI-assisted workflow — he planned features, made the technical calls (audio per ayah vs per surah, GPS filtering) and owned QA.", ar: "ONE14: هو قاد اتجاه المنتج والتقنية وزميله بنى عن طريق AI-assisted workflow — هو اللي خطط الـ features، وأخد القرارات التقنية (الصوت لكل آية ولا لكل سورة، فلترة الـ GPS)، ومسك الـ QA." }, p: "one14", tab: "overview", label: "ONE14" }
        ] }
      ],
      say: "I run AI-assisted development like a well-run team: written context and rules, a plan, small verified steps with commits, and a progress log — I review every change and own the result.",
      interview: [{ q: "How do you stop an AI agent from drifting or breaking things in a big codebase?", a: { en: "Persistent rules and architecture docs it reads first, a plan agreed before coding, small scoped steps, guardrails (types, tests, lint, CI) after each step, diffs reviewed, and commits as checkpoints to roll back.", ar: "قواعد و docs للـ architecture دايمة بيقراها الأول، وخطة متفق عليها قبل الكود، وخطوات صغيرة محددة، وحواجز (types، tests، lint، CI) بعد كل خطوة، ومراجعة الـ diffs، و commits كنقط رجوع." },
        follow: [{ q: "Doesn't AI make engineers less valuable?", a: { en: "It moves the value: problem framing, architecture, product judgment, reviewing and verifying, and owning outcomes matter more. I'm faster at typing code, so I spend more time on those.", ar: "بيغير مكان القيمة: فهم المشكلة، والـ architecture، والحكم على المنتج، والمراجعة والتحقق، والمسؤولية عن النتيجة بقوا أهم. أنا بقيت أسرع في كتابة الكود، فبصرف وقت أكتر على الحاجات دي." } }] }],
      quiz: [{ q: { en: "What should every agent session read first?", ar: "كل جلسة agent المفروض تقرا إيه الأول؟" }, a: { en: "The project's instruction/context files (rules, architecture, progress).", ar: "ملفات التعليمات والـ context بتاعة المشروع (قواعد، architecture، تقدم)." } }],
      quick: [{ en: "Context files → plan → small step → tests/types/lint → review diff → commit → log. Verify in the real app.", ar: "ملفات context ← خطة ← خطوة صغيرة ← tests و types و lint ← مراجعة الـ diff ← commit ← تسجيل. واتأكد في التطبيق الحقيقي." }]
    },
    {
      id: "review-ai",
      title: { en: "Reviewing AI-written code", ar: "مراجعة الكود اللي الـ AI كتبه" },
      tldr: { en: "Review it harder than a teammate's code: check that APIs and versions exist, that it followed your patterns, security (XSS, auth checks, secrets), accessibility, error handling, over-engineering, duplicated helpers, and tests that test behaviour rather than mirror the implementation. Run it.", ar: "راجعه أشد من كود زميل: اتأكد إن الـ APIs والـ versions موجودة، وإنه مشي على أنماطك، والأمان (XSS، فحص الصلاحيات، الأسرار)، والـ accessibility، والتعامل مع الأخطاء، والتعقيد الزيادة، والـ helpers المكررة، والـ tests إنها بتختبر السلوك مش بتنسخ التنفيذ. وشغّله." },
      blocks: [
        { type: "list", title: { en: "Checklist", ar: "Checklist" }, items: [
          { en: "Does every imported function/option exist in the version we use?", ar: "كل function أو option متعملها import موجودة في النسخة اللي بنستخدمها؟" },
          { en: "Did it invent data shapes instead of using the contract/types?", ar: "اخترع أشكال داتا بدل ما يستخدم الـ contract أو الـ types؟" },
          { en: "Security: user input rendered as HTML? permissions only in the UI? keys in the client?", ar: "الأمان: مدخلات المستخدم بتتعرض كـ HTML؟ الصلاحيات في الواجهة بس؟ مفاتيح في الـ client؟" },
          { en: "Error, loading and empty states; cleanup of effects/subscriptions.", ar: "حالات الـ error والـ loading والفاضي؛ والـ cleanup للـ effects والاشتراكات." },
          { en: "Is there a simpler version? Did it add a dependency we don't need?", ar: "فيه نسخة أبسط؟ زوّد مكتبة مش محتاجينها؟" },
          { en: "Tests: would they fail if the feature broke?", ar: "الـ tests: هتفشل لو الـ feature باظت؟" }
        ] },
        { type: "projects", items: [{ text: { en: "Real example from this guide: the output-question checker ran all 88 snippets and the live-coding checker ran 12 solutions with tests; claims about his projects were checked against the code (several wrong ones removed).", ar: "مثال حقيقي من الدليل ده: أداة التحقق شغلت الـ 88 سؤال، وأداة الـ live coding شغلت 12 حل بـ tests؛ والكلام عن مشاريعه اتراجع على الكود (وشلنا كذا حاجة طلعت غلط)." } }] }
      ],
      say: "I review AI code harder than a colleague's: verify APIs and versions, security and accessibility, look for a simpler solution, and run it before it merges.",
      interview: [{ q: "Give an example of AI being confidently wrong and how you caught it.", a: { en: "Use a real one, e.g.: a generated answer or claim that a test/run disproved — the fix was to make verification automatic (a script that runs the examples) rather than trusting the output.", ar: "استخدم مثال حقيقي، زي: إجابة أو معلومة متولدة والـ test أو التشغيل أثبت إنها غلط — والحل كان إن التحقق يبقى أوتوماتيك (script بيشغل الأمثلة) بدل ما نثق في الناتج." } }],
      quiz: [{ q: { en: "Fastest way to catch a hallucinated API?", ar: "أسرع طريقة تمسك بيها API متألف؟" }, a: { en: "Type-check and run it; check the library's docs for your version.", ar: "شغّل فحص الـ types وشغّله؛ وشوف docs المكتبة للنسخة بتاعتك." } }],
      quick: [{ en: "Exists? follows patterns? secure? accessible? errors/cleanup? simpler? tests meaningful? run it.", ar: "موجود؟ ماشي على الأنماط؟ آمن؟ accessible؟ أخطاء و cleanup؟ أبسط؟ tests ليها معنى؟ شغّله." }]
    },
    {
      id: "ai-features",
      title: { en: "Building AI features into products", ar: "بناء features فيها AI في المنتجات" },
      tldr: { en: "Call models from your server (never ship keys), stream responses to the UI (SSE/streamed fetch), ask for structured output (JSON schema / tool calling) and validate it, ground answers in your data (RAG: embeddings + retrieval), handle latency/cost (cache, limits, smaller models), defend against prompt injection, and evaluate quality with test sets.", ar: "نادي الموديلات من السيرفر بتاعك (عمرك ما تبعت المفاتيح)، و stream للرد للواجهة (SSE أو fetch بيتبث)، واطلب ناتج منظم (JSON schema أو tool calling) واعمله validate، واربط الإجابات بداتا بتاعتك (RAG: embeddings و retrieval)، واتعامل مع البطء والتكلفة (كاش، حدود، موديلات أصغر)، واحمي من prompt injection، وقيّم الجودة بمجموعات اختبار." },
      blocks: [
        { type: "code", code: "// client: stream tokens into the UI\nconst res = await fetch(\"/api/assistant\", { method: \"POST\", body: JSON.stringify({ question }), signal });\nconst reader = res.body!.pipeThrough(new TextDecoderStream()).getReader();\nfor (;;) { const { value, done } = await reader.read(); if (done) break; setAnswer((a) => a + value); }\n\n// server (edge function): key stays here, answer grounded in retrieved FAQs, structured output validated\nconst faqs = await search(embed(question), { topK: 5 });\nconst out = await model.generate({ system: RULES, context: faqs, question, schema: AnswerSchema });\nreturn AnswerSchema.parse(out);   // never trust the shape blindly" },
        { type: "projects", items: [
          { text: { en: "FAQ AI POC: understands intent across Arabic, Franco-Arabic and English, picks matching FAQs and refuses off-topic questions (Supabase edge function).", ar: "FAQ AI POC: بيفهم النية بالعربي والفرانكو والإنجليزي، وبيختار الأسئلة المطابقة، وبيرفض الأسئلة اللي برا الموضوع (Supabase edge function)." } },
          { text: { en: "Kalima: Gemini behind a Supabase edge function with a shared cache and a daily limit — key server-side, cost controlled.", ar: "Kalima: Gemini ورا Supabase edge function مع كاش مشترك وحد يومي — المفتاح على السيرفر والتكلفة متحكم فيها." }, p: "kalima", tab: "decisions", label: "Kalima" }
        ] }
      ],
      say: "AI features run through our server with the key hidden, stream to the UI, return validated structured output grounded in our own data, and have caching and limits for cost.",
      interview: [{ q: "What is prompt injection and how do you mitigate it?", a: { en: "User-supplied or retrieved text that tries to override the system's instructions (“ignore previous rules…”). Treat model output as untrusted, keep tools/permissions minimal, separate instructions from data, validate outputs, and never let the model alone authorise sensitive actions.", ar: "نص جاي من المستخدم أو من البحث بيحاول يغطي على تعليمات النظام («تجاهل القواعد اللي فاتت…»). اعتبر ناتج الموديل مش موثوق، وخلي الأدوات والصلاحيات أقل حاجة، وافصل التعليمات عن الداتا، واعمل validate للناتج، وعمرك ما تسيب الموديل لوحده يوافق على أكشنز حساسة." },
        follow: [{ q: "What is RAG?", a: { en: "Retrieval-Augmented Generation: find relevant documents (often with embeddings/vector search) and put them in the prompt so the model answers from your data, with sources — fewer hallucinations, fresher knowledge.", ar: "Retrieval-Augmented Generation: دوّر على المستندات المهمة (غالبًا بـ embeddings و vector search) وحطها في الـ prompt علشان الموديل يجاوب من داتا بتاعتك، ومعاها المصادر — hallucinations أقل ومعلومات أحدث." } }] }],
      quiz: [{ q: { en: "Where must the model API key live?", ar: "مفتاح API الموديل لازم يبقى فين؟" }, a: { en: "On the server / edge function — never in the client bundle.", ar: "على السيرفر أو الـ edge function — عمره ما يبقى في الـ client bundle." } }],
      quick: [{ en: "Server-side keys; stream; structured output + validate; RAG for grounding; cache/limits; prompt-injection defence; evals.", ar: "المفاتيح على السيرفر؛ stream؛ ناتج منظم و validate؛ RAG للربط بالداتا؛ كاش وحدود؛ حماية من prompt injection؛ تقييم." }]
    },
    {
      id: "ai-interview",
      title: { en: "Talking about AI in interviews", ar: "إزاي تتكلم عن الـ AI في الإنترفيو" },
      tldr: { en: "Be open and specific: you use AI as a tool, you own every line, and you can show the process (context docs, plans, tests, reviews). Never say “the AI wrote it”; never hide it either. Be ready to code without it in the interview.", ar: "خليك صريح ومحدد: بتستخدم الـ AI كأداة، وانت المسؤول عن كل سطر، وتقدر توري الطريقة (context docs، خطط، tests، مراجعات). عمرك ما تقول «الـ AI هو اللي كتبه»؛ ومتخبيهوش برضه. وخليك جاهز تكتب كود من غيره في الإنترفيو." },
      blocks: [
        { type: "list", title: { en: "Strong lines to use", ar: "جمل قوية تستخدمها" }, items: [
          { en: "“I run an AI-assisted workflow with written context and plans; I review every change and the tests decide when it's done.”", ar: "«بشتغل بـ AI-assisted workflow فيه context وخطط مكتوبة؛ بأراجع كل تغيير، والـ tests هي اللي بتقرر إمتى خلص.»" },
          { en: "“AI made me faster at the typing; I spend the time saved on architecture, edge cases and testing.”", ar: "«الـ AI خلاني أسرع في الكتابة؛ وبصرف الوقت اللي وفرته على الـ architecture والحالات الحدية والـ tests.»" },
          { en: "“On ONE14 I led direction and QA while a teammate built with AI — I made the technical calls, like moving GPS to 1 Hz with a software filter.”", ar: "«في ONE14 أنا قُدت الاتجاه والـ QA وزميلي بنى بالـ AI — أنا اللي أخدت القرارات التقنية، زي نقل الـ GPS لـ 1 Hz بفلتر software.»" }
        ] },
        { type: "pitfalls", items: [
          { en: "Not being able to explain code from your own projects — study the handbook's Decisions tab.", ar: "إنك متقدرش تشرح كود من مشاريعك — ذاكر تاب الـ Decisions في الـ handbook." },
          { en: "Over-claiming (“I built all of it”) when commits or the team say otherwise.", ar: "إنك تقول أكتر من الحقيقة («أنا بنيته كله») والـ commits أو التيم بيقولوا غير كده." }
        ] }
      ],
      say: "I use AI openly as a tool inside a disciplined process, and I own and can explain every line that ships.",
      interview: [{ q: "Do you use AI tools? How?", a: { en: "Yes, daily: for exploring a codebase, drafting code from a clear plan, writing tests and reviewing diffs. I keep project context and rules in docs, work in small verified steps, and review everything. Example: Smart FAQ — 27 screens and 551 tests in three weeks with that process.", ar: "أيوه، كل يوم: لاستكشاف الـ codebase، وكتابة كود من خطة واضحة، وكتابة tests، ومراجعة الـ diffs. بحط الـ context والقواعد في docs، وبشتغل خطوات صغيرة متأكد منها، وبأراجع كل حاجة. مثال: Smart FAQ — 27 شاشة و 551 test في 3 أسابيع بالطريقة دي." } }],
      quiz: [{ q: { en: "The one sentence to never say?", ar: "الجملة اللي عمرك ما تقولها؟" }, a: { en: "“The AI wrote it” (implies you don't own or understand it).", ar: "«الـ AI هو اللي كتبه» (معناها إنك مش مسؤول أو مش فاهم)." } }],
      quick: [{ en: "Open + specific + owned; show the process; be ready without AI; never over-claim.", ar: "صريح ومحدد ومسؤول؛ ورّي الطريقة؛ جاهز من غير AI؛ متقولش أكتر من الحقيقة." }]
    }
  ]
});
