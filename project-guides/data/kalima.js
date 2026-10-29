// Kalima — researched from the code on laptop 2 (~/kalima, github ibrahemhassan-cpu/kalima), 2026-10-28.
// All 25 commits are his, so hook counts are from the current code (= his code). Code sketches are simplified patterns, not project code.
HANDBOOK.projects.push({
  id: "kalima",
  name: "Kalima",
  logo: "assets/img/kalima-logo.png",
  color: "#4f46e5",
  company: "Personal",
  years: "2026",
  period: "Aug 2026 – Sep 2026",
  role: { en: "Solo — design, app and backend", ar: "لوحدي — التصميم والأبلكيشن والباك إند" },
  team: { en: "Just me (AI-assisted)", ar: "أنا بس (بمساعدة AI)" },
  tagline: { en: "An English-vocabulary app for Arabic speakers: spaced repetition, AI word cards, offline reviews and a home-screen widget.", ar: "أبلكيشن لحفظ كلمات إنجليزي للي بيتكلموا عربي: مراجعة متباعدة، كروت كلمات بالـ AI، مراجعة offline، و widget على الشاشة الرئيسية." },
  stats: [
    ["25", { en: "commits, all mine", ar: "كوميت، كلهم بتوعي" }],
    ["32", { en: "screens (Expo Router)", ar: "شاشة (Expo Router)" }],
    ["10", { en: "SQL migrations", ar: "SQL migration" }],
    ["3", { en: "edge functions (Gemini, questions, delete account)", ar: "edge functions (Gemini، الأسئلة، حذف الحساب)" }],
    ["3 wk", { en: "Aug 12 → Sep 3, 2026", ar: "12 أغسطس ← 3 سبتمبر 2026" }]
  ],

  pitch: [
    { en: "Kalima helps Arabic speakers <b>learn English words</b>: add a word, get an AI-made card (meaning, examples, pronunciation), review it on a <b>spaced-repetition</b> schedule, and test yourself.", ar: "Kalima بيساعد اللي بيتكلموا عربي <b>يحفظوا كلمات إنجليزي</b>: تضيف كلمة، ييجي لها كارت معمول بالـ AI (المعنى، أمثلة، النطق)، تراجعها بجدول <b>مراجعة متباعدة</b>، وتختبر نفسك." },
    { en: "I built it alone: Expo app, Supabase database with row-level security, SQL functions for scheduling, and edge functions that call Gemini.", ar: "عملته لوحدي: أبلكيشن Expo، وداتابيز Supabase بـ row-level security، و SQL functions للجدولة، و edge functions بتكلم Gemini." },
    { en: "Hardest part: making it <b>work on the metro with no signal</b> — reviews are queued in SQLite and replayed safely, and the last data is shown instantly from a disk cache.", ar: "أصعب حاجة: إنه <b>يشتغل في المترو من غير نت</b> — المراجعات بتتحفظ في SQLite وتتبعت بأمان بعدين، وآخر داتا بتظهر على طول من cache على الموبايل." }
  ],

  built: [
    { title: { en: "Learning", ar: "التعلم" }, items: [
      { en: "Add words; AI card with meaning, examples, pronunciation", ar: "إضافة كلمات. وكارت بالـ AI فيه المعنى والأمثلة والنطق" },
      { en: "Review sessions on a modified SM-2 schedule", ar: "سيشنز مراجعة بجدول SM-2 معدّل" },
      { en: "Per-word exam, quiz bank, topic packs, word of the day, achievements", ar: "امتحان لكل كلمة، بنك أسئلة، باقات حسب الموضوع، كلمة اليوم، إنجازات" }
    ]},
    { title: { en: "Offline & speed", ar: "Offline والسرعة" }, items: [
      { en: "Offline review queue in SQLite, replayed when online", ar: "طابور مراجعات offline في SQLite، بيتبعت لما النت يرجع" },
      { en: "Query cache saved to disk → real data on first paint", ar: "الـ query cache بيتحفظ على الموبايل ← أول ما يفتح يظهر داتا حقيقية" },
      { en: "Text-to-speech with expo-speech (free, offline)", ar: "نطق بـ expo-speech (ببلاش و offline)" }
    ]},
    { title: { en: "Device features", ar: "مميزات الموبايل" }, items: [
      { en: "Home-screen widget (Android + iOS) that rotates words by itself", ar: "Widget على الشاشة الرئيسية (أندرويد و iOS) بيقلّب الكلمات لوحده" },
      { en: "Fingerprint quick sign-in", ar: "دخول سريع بالبصمة" },
      { en: "Multiple daily reminders, Arabic / English UI", ar: "أكتر من تذكير في اليوم، واجهة عربي / إنجليزي" }
    ]},
    { title: { en: "Backend (Supabase)", ar: "الباك إند (Supabase)" }, items: [
      { en: "Postgres tables + row-level security per user", ar: "جداول Postgres + row-level security لكل يوزر" },
      { en: "SQL RPCs: scheduling, review sync, daily AI limit", ar: "SQL RPCs: الجدولة، مزامنة المراجعات، حد الـ AI اليومي" },
      { en: "Edge functions: enrich-word (Gemini), generate-questions, delete-account", ar: "Edge functions: enrich-word (Gemini)، generate-questions، delete-account" }
    ]}
  ],

  myRole: [
    { en: "<b>Built everything myself</b>: product idea, UX, the Expo app, the database, SQL functions and edge functions (25 of 25 commits).", ar: "<b>عملت كل حاجة لوحدي</b>: الفكرة، الـ UX، أبلكيشن Expo، الداتابيز، الـ SQL functions والـ edge functions (25 من 25 كوميت)." },
    { en: "Used AI as a pair programmer, with my own design docs (<code>docs/PLAN.md</code>, <code>DESIGN_BRIEF.md</code>).", ar: "استخدمت الـ AI كـ pair programmer، مع ملفات تصميم كتبتها (<code>docs/PLAN.md</code>، <code>DESIGN_BRIEF.md</code>)." },
    { en: "Not published on the stores yet.", ar: "لسه مش منشور على الستورز." }
  ],

  stack: [
    [{ en: "App", ar: "الأبلكيشن" }, ["Expo", "React Native", "TypeScript", "Expo Router"]],
    [{ en: "Data", ar: "الداتا" }, ["TanStack Query (+ disk persister)", "expo-sqlite", "Zustand"]],
    [{ en: "Backend", ar: "الباك إند" }, ["Supabase (Postgres, RLS, RPC)", "Edge Functions (Deno)", "Gemini"]],
    [{ en: "Device", ar: "الموبايل" }, ["expo-local-authentication", "expo-secure-store", "expo-notifications", "expo-speech"]],
    [{ en: "Native", ar: "Native" }, ["Expo module (Android widget)", "@bacons/apple-targets (iOS widget)"]],
    [{ en: "UI", ar: "الواجهة" }, ["Reanimated", "@gorhom/bottom-sheet", "expo-blur", "i18next"]]
  ],

  decisions: [
    {
      title: { en: "Backend", ar: "الباك إند" },
      chose: "Supabase", alts: ["Firebase", "own Node API"],
      why: { en: "The data is relational — words, each user's copy with its schedule, a review log, packs — so SQL fits. <b>Row-level security</b> means a user can only touch their rows, and scheduling runs as SQL functions next to the data.", ar: "الداتا relational — الكلمات، ونسخة كل يوزر بجدولها، وسجل المراجعات، والباقات — فالـ SQL مناسب. و<b>row-level security</b> معناه إن كل يوزر يلمس صفوفه بس، والجدولة بتشتغل كـ SQL functions جنب الداتا." },
      both: { v: "no", en: "Two backends for one small app is extra cost with no gain.", ar: "باك إندين لأبلكيشن صغير = تكلفة زيادة من غير فايدة." },
      better: { en: "Supabase is a strong pick for relational apps; Firebase fits document-shaped data (I used it on ONE14).", ar: "الـ Supabase اختيار قوي للـ apps اللي الداتا بتاعتها relational. والـ Firebase مناسب للداتا اللي شكلها documents (واستخدمته في ONE14)." },
      say: "I chose Supabase because the data is relational and row-level security keeps each user's rows private by default."
    },
    {
      title: { en: "When to review a word", ar: "إمتى نراجع الكلمة" },
      chose: "modified SM-2 in a SQL function", alts: ["schedule in the app", "FSRS", "fixed intervals"],
      why: { en: "Anki-style SM-2: a new word goes through short <b>learning steps</b> (minutes), then graduates to 3 or 5 days; after that the interval grows by the <b>ease factor</b>. Forgetting doesn't reset to zero (that's demotivating) — the interval shrinks to 40% and the ease drops; words forgotten too often are marked <b>leech</b>. A ±5% fuzz stops reviews piling up on one day. Running it <b>on the server</b> keeps one source of truth.", ar: "SM-2 على طريقة Anki. الكلمة الجديدة بتعدّي بـ <b>خطوات تعلم</b> قصيرة (بالدقايق)، وبعدين تتخرج لـ 3 أو 5 أيام. وبعد كده الـ interval بيكبر بالـ <b>ease factor</b>. والنسيان مش بيرجّعها للصفر، لأن ده محبط. الـ interval بيقل لـ 40%، والـ ease بيقل. والكلمة اللي بتتنسي كتير بتتعلّم <b>leech</b>. وفيه fuzz ±5%، علشان المراجعات ماتتكوّمش في يوم واحد. ولأنه بيشتغل <b>على السيرفر</b>، فيه مصدر واحد للحقيقة." },
      both: { v: "no", en: "Scheduling in two places would disagree. Server only.", ar: "الجدولة في مكانين هتختلف. السيرفر بس." },
      better: { en: "<b>FSRS</b> is the modern algorithm (Anki uses it now) and predicts forgetting better. Easy upgrade later because the full review log is kept.", ar: "<b>FSRS</b> هو الخوارزمية الأحدث (Anki بقى بيستخدمها) وبيتوقع النسيان أحسن. سهل نطلع له بعدين لأن سجل المراجعات كله محفوظ." },
      say: "Scheduling is a modified SM-2 that runs in Postgres, and because I keep the full review log I could move to FSRS later."
    },
    {
      title: { en: "Reviewing with no signal", ar: "المراجعة من غير نت" },
      chose: "SQLite queue + idempotent replay", alts: ["block offline", "optimistic cache only"],
      why: { en: "The metro is the most common place to review. Each answer goes into SQLite with a <code>client_id</code>; when back online it's sent through <code>sync_reviews</code>. Replaying twice is harmless because the id is unique.", ar: "المترو أكتر مكان الناس بتراجع فيه. كل إجابة بتتحفظ في SQLite بـ <code>client_id</code>. ولما النت يرجع، بتتبعت عن طريق <code>sync_reviews</code>. ولو اتبعتت مرتين مفيش مشكلة، لأن الـ id مش بيتكرر." },
      both: { v: "yes", en: "Update the screen optimistically <b>and</b> keep the durable queue — the cache is for display, the queue is the truth.", ar: "حدّث الشاشة على طول <b>و</b> احتفظ بالطابور — الـ cache للعرض، والطابور هو الحقيقة." },
      better: { en: "Same pattern; for many tables a sync engine (PowerSync, WatermelonDB) would save work.", ar: "نفس الـ pattern. ولو الجداول كتير، sync engine (زي PowerSync أو WatermelonDB) هيوفّر شغل." },
      say: "Offline answers are stored in SQLite with a client id and replayed later, so a duplicate replay can't double-count.",
      concept: "optimistic-ui"
    },
    {
      title: { en: "Opening the app offline", ar: "فتح الأبلكيشن من غير نت" },
      chose: "TanStack Query persisted to disk", alts: ["mirror everything in SQLite", "show a spinner"],
      why: { en: "Every successful query is saved and read back on launch, so the first paint is <b>real data</b>, not a spinner. Only server text is kept — a few hundred KB.", ar: "كل query بتنجح بتتحفظ وتتقري أول ما الأبلكيشن يفتح، فأول شاشة <b>داتا حقيقية</b> مش spinner. بنحفظ نص السيرفر بس — كام مية KB." },
      both: { v: "yes", en: "Persisted cache for <b>reading</b>, SQLite queue for <b>writing</b> — different jobs.", ar: "Cache محفوظ <b>للقراية</b>، وطابور SQLite <b>للكتابة</b> — شغلانتين مختلفين." },
      better: { en: "Same; set a max age so very old data gets refreshed.", ar: "نفس الحاجة. وحط max age، علشان الداتا القديمة أوي تتحدث." },
      say: "The query cache is persisted, so the app shows last-known data instantly even with no network.",
      concept: "server-state"
    },
    {
      title: { en: "Pull to refresh", ar: "Pull to refresh" },
      chose: "invalidate type: \"active\"", alts: ["hand-written list of keys"],
      why: { en: "Home reads four queries; a hand-written list goes stale the day a screen adds one more. <code>invalidateQueries({ type: \"active\" })</code> refetches exactly what's on screen.", ar: "الـ home بيقرا 4 queries. والقايمة اللي بتكتبها بإيدك بتبقى قديمة أول ما شاشة تزوّد query جديد. أما <code>invalidateQueries({ type: \"active\" })</code> فبيعيد تحميل اللي ظاهر على الشاشة بالظبط." },
      both: { v: "partly", en: "Use entity keys after a mutation, \"active\" for a manual refresh.", ar: "استخدم keys بالـ entity بعد أي mutation، و \"active\" للـ refresh اليدوي." },
      better: { en: "Same.", ar: "نفس الحاجة." },
      say: "Pull-to-refresh invalidates only active queries, so nothing on screen is missed and nothing off screen is fetched.",
      concept: "query-keys"
    },
    {
      title: { en: "AI word cards", ar: "كروت الكلمات بالـ AI" },
      chose: "Gemini in an edge function + shared dictionary cache", alts: ["call Gemini from the app", "a paid dictionary API"],
      why: { en: "The API key stays on the server. Each word is generated <b>once for everyone</b> and cached, so the second user gets it instantly at zero cost. A daily limit (30 calls per user, an atomic counter in SQL) caps spending.", ar: "الـ API key بيفضل على السيرفر. كل كلمة بتتعمل <b>مرة واحدة للكل</b> وتتخزن، فاليوزر التاني ياخدها على طول ومن غير تكلفة. وفيه حد يومي (30 نداء لكل يوزر، عدّاد atomic في SQL) بيحدد الصرف." },
      both: { v: "no", en: "Never ship the AI key in the app.", ar: "ماتحطش الـ AI key في الأبلكيشن أبدًا." },
      better: { en: "Same; validate the model's JSON against a schema before saving (the function already checks the output).", ar: "نفس الحاجة. واتأكد إن الـ JSON اللي راجع من الموديل مطابق لـ schema قبل الحفظ (والـ function بتتأكد فعلًا)." },
      say: "Gemini runs in an edge function with a shared cache and a per-user daily limit, so each word costs money only once."
    },
    {
      title: { en: "Arabic / English switch", ar: "التبديل عربي / إنجليزي" },
      chose: "translate text, keep layout LTR", alts: ["I18nManager.forceRTL"],
      why: { en: "Flipping layout direction in React Native needs a full app reload. Keeping the layout LTR and translating the copy makes the switch <b>instant</b>; Arabic still renders right-to-left inside each text.", ar: "قلب اتجاه الـ layout في React Native محتاج reload كامل للـ app. لما نسيب الـ layout من الشمال لليمين ونترجم النص بس، التبديل بيبقى <b>فوري</b>. والعربي لسه بيتكتب من اليمين جوه كل نص." },
      both: { v: "partly", en: "A full RTL mirror is better for an Arabic-first app; this trade-off fits a learning app where English is the content.", ar: "القلب الكامل للـ RTL أحسن لـ app عربي في الأساس. لكن الـ trade-off ده مناسب لـ app تعليم المحتوى بتاعه إنجليزي." },
      better: { en: "For a production Arabic app: real RTL with a one-time reload on change.", ar: "لأبلكيشن عربي production: RTL حقيقي مع reload مرة واحدة لما يتغير." },
      say: "I kept the layout left-to-right and translated the copy, so the language toggle is instant without a reload.",
      concept: "i18n"
    },
    {
      title: { en: "Fingerprint quick sign-in", ar: "الدخول السريع بالبصمة" },
      chose: "credentials in Keychain/Keystore, unlocked by fingerprint", alts: ["store the refresh token", "passkeys"],
      why: { en: "A fingerprint only unlocks the device; it proves nothing to the server. The refresh token rotates on every use and dies on sign-out, so quick sign-in failed exactly when needed. Storing the credentials in the OS secure store, guarded by the fingerprint, always works.", ar: "البصمة بتفتح الموبايل بس، ومش بتثبت حاجة للسيرفر. والـ refresh token بيتغير كل مرة، وبيموت مع الـ sign-out. فالدخول السريع كان بيفشل بالظبط في الوقت اللي محتاجه فيه. والحل: بيانات الدخول بتتحفظ في الـ secure store بتاع النظام، ومحمية بالبصمة، وده بيشتغل دايمًا." },
      both: { v: "no", en: "Pick one quick-sign-in secret.", ar: "اختار secret واحد للدخول السريع." },
      better: { en: "<b>Passkeys</b>: device-bound, revocable and phishing-resistant. The honest trade-off of my approach: a stored password can't be revoked server-side.", ar: "<b>Passkeys</b>: مربوطة بالجهاز، تقدر تلغيها، وصعب تتسرق بالـ phishing. والـ trade-off الصريح في طريقتي: الباسورد المحفوظ ماينفعش يتلغي من السيرفر." },
      say: "The fingerprint unlocks credentials kept in the OS keychain; I know passkeys are the better long-term answer because they can be revoked.",
      concept: "token-storage"
    },
    {
      title: { en: "Word on the home screen", ar: "الكلمة على الشاشة الرئيسية" },
      chose: "native widgets that run themselves", alts: ["notifications only", "widget that asks the app every time"],
      why: { en: "The app hands the widget a deck once; the widget advances on the system's half-hourly update and its own next button, with no app involvement. Notifications are optional, for people who never look at the home screen.", ar: "الـ app بيدي الـ widget مجموعة كلمات مرة واحدة. والـ widget بيقلّب لوحده مع تحديث النظام كل نص ساعة، وبزرار next بتاعه، من غير ما الـ app يتدخل. والإشعارات اختيارية، للي مش بيبص على الشاشة الرئيسية." },
      both: { v: "yes", en: "Widget for people who look at the home screen, notifications for those who don't.", ar: "Widget للي بيبص على الشاشة الرئيسية، وإشعارات للي مش بيبص." },
      better: { en: "Same.", ar: "نفس الحاجة." },
      say: "The widget gets a deck once and then runs on its own, so it keeps teaching even when the app is closed."
    },
    {
      title: { en: "Pronunciation", ar: "النطق" },
      chose: "expo-speech at 0.85 speed", alts: ["a cloud TTS API", "recorded audio"],
      why: { en: "Free, offline and on every device. Slower than default on purpose — beginners need time.", ar: "ببلاش، offline، وعلى كل جهاز. أبطأ من العادي عن قصد — المبتدئ محتاج وقت." },
      both: { v: "yes", en: "Planned: human audio when a word has an audio URL, device speech as the fallback.", ar: "المخطط: صوت بشري لما الكلمة يبقى ليها audio URL، وصوت الجهاز كـ fallback." },
      better: { en: "Neural cloud voices sound better but cost money and need a network.", ar: "الأصوات الـ neural على الكلاود أحلى بس بفلوس ومحتاجة نت." },
      say: "Device text-to-speech is free and offline; recorded audio can layer on top later."
    }
  ],

  flows: [
    {
      title: { en: "Adding a word", ar: "إضافة كلمة" },
      steps: [
        ["Normalize", { en: "trim, lower-case", ar: "تنضيف وحروف صغيرة" }],
        ["Cache", { en: "already in the dictionary? return it (free)", ar: "موجودة في القاموس؟ رجّعها (ببلاش)" }],
        ["Limit", { en: "bump_ai_usage: 30 calls / user / day", ar: "bump_ai_usage: 30 نداء لكل يوزر في اليوم" }],
        ["Gemini", { en: "meaning, examples, pronunciation", ar: "المعنى، الأمثلة، النطق" }],
        ["Validate", { en: "check the JSON shape", ar: "التأكد من شكل الـ JSON" }],
        ["Save", { en: "dictionary + the user's copy, due now", ar: "القاموس + نسخة اليوزر، ميعادها دلوقتي" }]
      ]
    },
    {
      title: { en: "A review on the metro", ar: "مراجعة في المترو" },
      steps: [
        ["Answer", { en: "rate the card", ar: "تقييم الكارت" }],
        ["SQLite", { en: "saved with a client_id", ar: "بيتحفظ بـ client_id" }],
        ["Online?", { en: "network listener", ar: "مراقبة النت" }],
        ["sync_reviews", { en: "replay the queue (idempotent)", ar: "إعادة إرسال الطابور (idempotent)" }],
        ["SM-2", { en: "server sets the next due_at", ar: "السيرفر بيحدد due_at الجاية" }],
        ["Refresh", { en: "invalidate active queries", ar: "invalidate للـ queries الظاهرة" }]
      ]
    },
    {
      title: { en: "Fingerprint sign-in", ar: "الدخول بالبصمة" },
      steps: [
        ["Opt in", { en: "after a normal sign-in", ar: "بعد دخول عادي" }],
        ["Store", { en: "credentials in Keychain / Keystore", ar: "البيانات في Keychain / Keystore" }],
        ["Next time", { en: "scan the fingerprint", ar: "تمسح البصمة" }],
        ["Read", { en: "unlock the secure store", ar: "تفتح الـ secure store" }],
        ["Sign in", { en: "normal Supabase sign-in", ar: "دخول Supabase عادي" }]
      ]
    }
  ],

  patterns: [
    {
      title: { en: "Idempotent offline queue", ar: "طابور offline آمن من التكرار" },
      body: { en: "The client creates the id, so sending the same answer twice changes nothing on the server.", ar: "الموبايل هو اللي بيعمل الـ id، فلو نفس الإجابة اتبعتت مرتين السيرفر مش هيتغير." },
      code: "async function recordAnswer(wordId, rating) {\n  const row = { client_id: uuid(), word_id: wordId, rating, at: Date.now() };\n  await db.runAsync(\"INSERT INTO pending_reviews VALUES (?, ?, ?, ?)\", Object.values(row));\n  if (await isOnline()) await flush();\n}\n\nasync function flush() {\n  const rows = await db.getAllAsync(\"SELECT * FROM pending_reviews\");\n  if (!rows.length) return;\n  await supabase.rpc(\"sync_reviews\", { reviews: rows }); // server ignores known client_ids\n  await db.runAsync(\"DELETE FROM pending_reviews\");\n}"
    },
    {
      title: { en: "SM-2 in one function", ar: "SM-2 في function واحدة" },
      body: { en: "Review phase only (learning steps omitted): forgetting shrinks the interval instead of resetting it; a good answer grows it by the ease; a little fuzz spreads the load.", ar: "مرحلة المراجعة بس، من غير خطوات التعلم. النسيان بيقلل الـ interval بدل ما يصفّره. والإجابة الصح بتكبّره بالـ ease. وشوية fuzz بيوزّع المراجعات." },
      code: "function nextReview({ ease, interval, lapses }, rating /* 0 forgot .. 3 easy */) {\n  if (rating === 0) {\n    return { ease: Math.max(1.3, ease - 0.2), interval: Math.max(1, interval * 0.4), lapses: lapses + 1 };\n  }\n  const newEase = Math.min(3.0, ease + (rating === 3 ? 0.15 : rating === 1 ? -0.15 : 0));\n  const fuzz = 0.95 + Math.random() * 0.1;          // ±5%: avoid review pile-ups\n  return { ease: newEase, interval: interval * newEase * fuzz, lapses };\n}"
    },
    {
      title: { en: "Persisted query cache", ar: "Query cache محفوظ" },
      body: { en: "Wrap the app once; every successful query is written to disk and restored on launch.", ar: "بتلف الـ app مرة واحدة. وكل query بينجح بيتكتب على الموبايل، ويرجع أول ما الـ app يفتح." },
      code: "const persister = createAsyncStoragePersister({ storage: AsyncStorage });\n\n<PersistQueryClientProvider\n  client={queryClient}\n  persistOptions={{ persister, maxAge: 7 * 24 * 60 * 60 * 1000 }}\n>\n  <App />\n</PersistQueryClientProvider>"
    }
  ],

  hooks: [
    { group: { en: "Server data", ar: "داتا السيرفر" }, items: [
      { name: "useQuery", count: "×17", what: { en: "Words, packs, summary, word of the day, achievements.", ar: "الكلمات، الباقات، الملخص، كلمة اليوم، الإنجازات." } },
      { name: "useMutation", count: "×16", what: { en: "Add word, review, quiz answers, settings.", ar: "إضافة كلمة، مراجعة، إجابات الكويز، الإعدادات." } },
      { name: "invalidateQueries / setQueryData", count: "×36 / ×3", what: { en: "Refresh after changes; \"active\" for pull-to-refresh.", ar: "تحديث بعد التغييرات. و \"active\" للـ pull-to-refresh." }, remember: { en: "setQueryData when you already have the new value; invalidate when the server must recompute (like SM-2).", ar: "setQueryData لما تكون القيمة الجديدة معاك. و invalidate لما السيرفر لازم يحسب تاني (زي SM-2)." } }
    ]},
    { group: { en: "Local state", ar: "الـ state المحلي" }, items: [
      { name: "Zustand create", count: "×2 stores", what: { en: "Settings and the onboarding draft — client-only state.", ar: "الإعدادات ومسودة الـ onboarding — state على الموبايل بس." }, remember: { en: "Server data in TanStack Query, UI/app settings in Zustand.", ar: "داتا السيرفر في TanStack Query، وإعدادات الأبلكيشن في Zustand." } },
      { name: "useState / useEffect / useRef", count: "×88 / ×37 / ×27", what: { en: "Session step, flipped card, timers, network listeners.", ar: "خطوة السيشن، الكارت المقلوب، التايمرز، مراقبة النت." } },
      { name: "useLocalSearchParams", count: "×10", what: { en: "Word, pack and quiz ids from the Expo Router URL.", ar: "ids الكلمة والباقة والكويز من URL الـ Expo Router." } }
    ]},
    { group: { en: "UI", ar: "الواجهة" }, items: [
      { name: "useTranslation", count: "×63", what: { en: "All copy from ar.json / en.json (~550 lines each).", ar: "كل النصوص من ar.json و en.json (حوالي 550 سطر لكل واحد)." } },
      { name: "useSharedValue / useAnimatedStyle", count: "×15 / ×11", what: { en: "Card flip and one shared motion language.", ar: "قلب الكارت ولغة حركة واحدة للأبلكيشن." } }
    ]}
  ],

  problems: [
    {
      title: { en: "Reviews on the metro", ar: "المراجعة في المترو" },
      problem: { en: "No signal underground; answers were lost or the screen blocked.", ar: "مفيش نت تحت الأرض. فالإجابات كانت بتضيع، أو الشاشة بتقف." },
      fix: { en: "SQLite queue with client ids, replayed through an idempotent RPC; the server rebuilds the schedule.", ar: "طابور SQLite بـ client ids، بيتبعت عن طريق RPC آمن من التكرار. والسيرفر هو اللي بيبني الجدول." },
      result: { en: "Review anywhere; nothing lost, nothing double-counted.", ar: "تراجع في أي مكان، ومفيش حاجة بتضيع، ولا بتتحسب مرتين." }
    },
    {
      title: { en: "A spinner on every launch", ar: "Spinner كل ما يفتح" },
      problem: { en: "Opening offline showed nothing until the network answered.", ar: "لما يفتح من غير نت ماكانش بيظهر حاجة لحد ما النت يرد." },
      fix: { en: "Persist the query cache to disk.", ar: "حفظ الـ query cache على الموبايل." },
      result: { en: "First paint is real data.", ar: "أول شاشة داتا حقيقية." }
    },
    {
      title: { en: "Quick sign-in failed when needed", ar: "الدخول السريع كان بيفشل وقت الحاجة" },
      problem: { en: "The stored refresh token rotated or died on sign-out.", ar: "الـ refresh token المحفوظ كان بيتغير أو بيموت مع الـ sign-out." },
      fix: { en: "Credentials in Keychain/Keystore, unlocked by the fingerprint.", ar: "بيانات الدخول في Keychain/Keystore، وبتتفتح بالبصمة." },
      result: { en: "Quick sign-in always works.", ar: "الدخول السريع بيشتغل دايمًا." },
      lesson: { en: "Name the trade-off: a stored password can't be revoked; passkeys fix that.", ar: "قول الـ trade-off بصراحة: الباسورد المحفوظ مايتلغيش. والـ passkeys بتحل ده." }
    },
    {
      title: { en: "The Android widget crashed", ar: "الـ widget على أندرويد كان بيقع" },
      problem: { en: "The layout used a <code>View</code>, which Android's RemoteViews rejects.", ar: "الـ layout كان فيه <code>View</code>، وده RemoteViews بتاع أندرويد مش بيقبله." },
      fix: { en: "Rebuilt it with RemoteViews-safe layouts (fix on 2026-08-18).", ar: "اتعمل تاني بـ layouts بتقبلها RemoteViews (اتصلح 18 أغسطس 2026)." },
      result: { en: "Widget renders and resizes freely.", ar: "الـ widget بيظهر وبيتغير مقاسه عادي." },
      lesson: { en: "Widgets aren't React views — they have their own small set of allowed layouts.", ar: "الـ widgets مش React views — ليها مجموعة layouts صغيرة مسموحة بس." }
    },
    {
      title: { en: "A quiz that answered itself", ar: "كويز بيجاوب نفسه" },
      problem: { en: "On the word's own screen, \"which of these is rent?\" gives the answer away; all-typed questions tested spelling, not knowing.", ar: "في شاشة الكلمة نفسها، سؤال \"أنهي واحدة معناها rent؟\" بيدّي الإجابة. والأسئلة اللي كلها كتابة كانت بتختبر الإملا، مش الفهم." },
      fix: { en: "Per-word exam: mostly recognition, one production question.", ar: "امتحان لكل كلمة: معظمه تمييز، وسؤال واحد إنتاج." },
      result: { en: "A short test that measures knowing the word.", ar: "اختبار قصير بيقيس إنك فاهم الكلمة." }
    },
    {
      title: { en: "AI cost", ar: "تكلفة الـ AI" },
      problem: { en: "Calling Gemini for every add, for every user, adds up.", ar: "نداء Gemini مع كل إضافة ولكل يوزر بيكلّف." },
      fix: { en: "Shared dictionary cache + per-user daily limit in SQL.", ar: "Cache قاموس مشترك + حد يومي لكل يوزر في SQL." },
      result: { en: "Each word is paid for once.", ar: "كل كلمة بندفع فيها مرة واحدة." }
    }
  ],

  star: {
    s: { en: "I wanted a vocabulary app that works where people actually review — on the metro, offline.", ar: "كنت عايز أبلكيشن كلمات يشتغل في المكان اللي الناس بتراجع فيه فعلًا — في المترو، من غير نت." },
    t: { en: "Build it alone: app, database and AI, with offline reviews that never double-count.", ar: "أبنيه لوحدي: أبلكيشن وداتابيز و AI، ومراجعة offline عمرها ما تتحسب مرتين." },
    a: { en: "Expo app, Supabase with RLS and SM-2 in SQL, a SQLite review queue with idempotent replay, a persisted query cache, Gemini behind an edge function with a cache and a daily limit, and native widgets.", ar: "أبلكيشن Expo، و Supabase بـ RLS و SM-2 في SQL، وطابور مراجعات SQLite بإعادة آمنة، و query cache محفوظ، و Gemini ورا edge function بـ cache وحد يومي، و widgets native." },
    r: { en: "A working app in three weeks (25 commits): 32 screens, 10 migrations, 3 edge functions. Not published yet.", ar: "أبلكيشن شغال في 3 أسابيع (25 كوميت): 32 شاشة، 10 migrations، 3 edge functions. لسه مش منشور." }
  },

  qa: [
    { q: "How does spaced repetition work in your app?", a: { en: "Anki-style SM-2 in Postgres: learning steps in minutes, then graduation to 3–5 days, then the interval grows by the ease factor. Forgetting shrinks the interval to 40% instead of resetting it, too many lapses marks a leech, and a ±5% fuzz spreads reviews out.", ar: "SM-2 على طريقة Anki في Postgres: خطوات تعلم بالدقايق، وبعدين تخرّج لـ 3–5 أيام، وبعدين الـ interval بيكبر بالـ ease factor. النسيان بيقلل الـ interval لـ 40% بدل ما يصفّره، والنسيان الكتير بيعلّم الكلمة leech، و fuzz ±5% بيوزّع المراجعات." } },
    { q: "What happens if the same offline review is sent twice?", a: { en: "Nothing — every review has a client-generated id, and the sync function ignores ids it already has.", ar: "ولا حاجة — كل مراجعة ليها id معمول على الموبايل، و function المزامنة بتتجاهل أي id موجود." } },
    { q: "Why not call Gemini directly from the app?", a: { en: "The key would ship inside the app. The edge function keeps it secret, caches each word for all users, and enforces a daily limit.", ar: "الـ key كان هيبقى جوه الأبلكيشن. الـ edge function بتخبيه، وبتخزن كل كلمة للكل، وبتطبق الحد اليومي." } },
    { q: "Is storing the password for fingerprint sign-in safe?", a: { en: "It's in the OS secure store and only readable after a biometric check, but it can't be revoked server-side. Passkeys would be my next step.", ar: "محفوظ في الـ secure store بتاع النظام وماينفعش يتقري غير بعد البصمة، بس مايتلغيش من السيرفر. والـ passkeys هتبقى خطوتي الجاية." } },
    { q: "Why Zustand and TanStack Query together?", a: { en: "Different jobs: TanStack Query owns server data and caching; Zustand holds client-only settings and the onboarding draft.", ar: "شغلانتين مختلفين. TanStack Query مسؤول عن داتا السيرفر والكاش. و Zustand للإعدادات اللي على الموبايل بس، ومسودة الـ onboarding." } }
  ],

  terms: ["spaced repetition", "SM-2", "FSRS", "row-level security", "RPC", "edge function", "idempotency", "offline queue", "persisted cache", "rate limiting", "Keychain / Keystore", "passkeys", "RemoteViews", "WidgetKit", "text-to-speech"],

  dont: [
    { en: "Don't say it's <b>published</b> — it isn't on the stores yet.", ar: "ماتقولش إنه <b>منشور</b> — لسه مش على الستورز." },
    { en: "No user numbers — it's a personal project.", ar: "مفيش أرقام يوزرز — ده مشروع شخصي." },
    { en: "Human-recorded audio is planned, not built.", ar: "الصوت البشري متخطط له، مش معمول." },
    { en: "The layout isn't mirrored for RTL — say \"translated UI, instant toggle\".", ar: "الـ layout مش مقلوب RTL — قول \"واجهة مترجمة وتبديل فوري\"." }
  ],

  evidence: [
    "Repo ~/kalima (github ibrahemhassan-cpu/kalima), 25 commits 2026-08-12 → 09-03, all his",
    "Files: src/lib/offline.ts, src/lib/queryCache.ts, src/lib/refresh.ts, src/features/auth/biometric.ts, src/i18n/rtl.ts, src/features/exam/buildExam.ts, modules/word-widget, targets/widget",
    "Supabase: migrations 0001–0010 (SM-2 in 0003, AI limit in 0005), functions enrich-word / generate-questions / delete-account",
    "Deep dive: inventory/laptop-1-dell.md (Kalima row) · master CV Projects"
  ]
});
