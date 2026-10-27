// ONE14 QARDIO — researched from the code on laptop 2 (~/one14-qardio-app, branch feat/google-maps @ 2026-09-15), 2026-10-28.
// His role is LEAD (planning, UX, technical direction, QA). He has no commits: a teammate wrote the code with AI.
// Hook counts below are from the APP code (team), not from his diffs. Code sketches are simplified patterns, not project code.
HANDBOOK.projects.push({
  id: "one14",
  name: "ONE14 QARDIO",
  logo: "assets/img/one14-logo.png",
  color: "#1f4d2b",
  company: "nWeave",
  years: "2026",
  period: "Apr 2026 – Sep 2026",
  role: { en: "Product & technical lead (not the committer)", ar: "Lead للمنتج والتقنية (مش أنا اللي بكتب الكوميتات)" },
  team: { en: "Me + a teammate building with AI, plus 2–3 nWeave devs", ar: "أنا + زميل بيبني بالـ AI، و2–3 مطورين من nWeave" },
  tagline: { en: "A Qur'an-and-running app: listen ayah by ayah while you run, with accurate distance, khatm progress and Strava.", ar: "أبلكيشن قرآن وجري: تسمع آية آية وانت بتجري، بمسافة دقيقة، وتقدم في الختمة، وربط مع Strava." },
  stats: [
    ["2", { en: "stores: Google Play + App Store", ar: "ستور: Google Play و App Store" }],
    ["100+", { en: "Google Play downloads (Oct 2026)", ar: "تحميل على Google Play (أكتوبر 2026)" }],
    ["−17%", { en: "distance under-count before the GPS fix", ar: "نقص في المسافة قبل حل الـ GPS" }],
    ["~2–6%", { en: "from Strava on field walks after it", ar: "فرق عن Strava في التجارب بعده" }],
    ["160", { en: "test files in the repo (team)", ar: "ملف test في الريبو (الفريق)" }]
  ],

  pitch: [
    { en: "ONE14 QARDIO plays the Qur'an <b>ayah by ayah while you run or walk</b>, tracks distance and route with GPS, counts your khatm progress, and can connect to Strava.", ar: "ONE14 QARDIO بيشغّل القرآن <b>آية آية وانت بتجري أو بتمشي</b>، وبيحسب المسافة والطريق بالـ GPS، وبيعدّ تقدمك في الختمة، ويتربط بـ Strava." },
    { en: "I <b>led</b> it: planned the features and UX, chose the technical approach, directed a teammate who built it with AI, and <b>tested every release</b> on iPhone and Android.", ar: "أنا كنت <b>الـ lead</b>: خططت الفيتشرز والـ UX، واخترت الطريقة التقنية، ووجّهت زميل كان بيبنيه بالـ AI، و<b>جرّبت كل release</b> على آيفون وأندرويد." },
    { en: "Hardest part: <b>distance accuracy</b>. Runs were under-counted (30 km → ~25 km). We traced it to coarse location filters and fixed it with 1 Hz high-accuracy GPS and a tuned software filter, tested against Strava and Apple Watch.", ar: "أصعب حاجة: <b>دقة المسافة</b>. الجري كان بيتحسب أقل (30 كم ← حوالي 25). لقينا السبب في فلاتر الموقع التقيلة، وحليناه بـ GPS عالي الدقة كل ثانية وفلتر software متظبط، وقارنّا بـ Strava و Apple Watch." }
  ],

  built: [
    { title: { en: "Running session", ar: "سيشن الجري" }, items: [
      { en: "Background GPS with two modes (screen off / screen on only)", ar: "GPS في الخلفية بوضعين (الشاشة مقفولة / الشاشة مفتوحة بس)" },
      { en: "Distance, pace, moving time, route on a map, session history", ar: "المسافة، السرعة، وقت الحركة، الطريق على الخريطة، تاريخ السيشنز" },
      { en: "Pedometer as a second witness when GPS drops", ar: "عدّاد الخطوات كشاهد تاني لما الـ GPS يقع" }
    ]},
    { title: { en: "Qur'an audio", ar: "صوت القرآن" }, items: [
      { en: "Reciters, surah ranges, lock-screen controls, background playback", ar: "القرّاء، نطاق السور، تحكم من شاشة القفل، تشغيل في الخلفية" },
      { en: "Ayah tracking from timestamps; khatm progress counts unique ayahs", ar: "تتبع الآيات بالـ timestamps؛ والختمة بتعدّ الآيات المسموعة من غير تكرار" },
      { en: "Audio cached on the device for weak networks", ar: "الصوت بيتخزن على الموبايل للشبكة الضعيفة" }
    ]},
    { title: { en: "Account, community, integrations", ar: "الحساب، المجتمع، الربط" }, items: [
      { en: "Firebase sign-in with Apple and Google; account deletion", ar: "تسجيل دخول Firebase بـ Apple و Google؛ حذف الحساب" },
      { en: "Community feed: share sessions and routes, reactions, duas, moderation", ar: "Community feed: مشاركة السيشنز والطرق، reactions، أدعية، moderation" },
      { en: "Strava connect (OAuth handled in Cloud Functions), push notifications, daily reminders", ar: "ربط Strava (الـ OAuth في Cloud Functions)، إشعارات push، تذكير يومي" }
    ]},
    { title: { en: "Release & quality", ar: "الإصدار والجودة" }, items: [
      { en: "TestFlight and internal Android builds, release notes per build", ar: "TestFlight و builds أندرويد داخلية، و release notes لكل build" },
      { en: "Field tests: two phones on the same walk, compared with Strava / Apple Watch", ar: "تجارب ميدانية: موبايلين في نفس المشية، ومقارنة بـ Strava و Apple Watch" },
      { en: "Crash reporting (Crashlytics), GPS diagnostics journal", ar: "تقارير الـ crashes (Crashlytics)، وسجل تشخيص للـ GPS" }
    ]}
  ],

  myRole: [
    { en: "<b>Led</b> product and technical direction: what each feature does, how it behaves, what goes where and what to leave out.", ar: "<b>قدت</b> المنتج والاتجاه التقني: كل فيتشر بتعمل إيه، بتشتغل إزاي، إيه يتحط فين وإيه مانحطوش." },
    { en: "<b>Directed</b> the build: a teammate wrote the code with AI (Claude) from my plans. None of the 413 commits are under my name — the team pushed from one place.", ar: "<b>وجّهت</b> البناء: زميل كان بيكتب الكود بالـ AI (Claude) من خططي. ولا كوميت من الـ 413 باسمي — الفريق كان بيرفع من مكان واحد." },
    { en: "<b>Owned QA</b>: tested each build on devices and pushed fixes for UI, performance and usability.", ar: "<b>مسؤول عن الـ QA</b>: جرّبت كل build على الأجهزة وطلبت إصلاحات للـ UI والأداء وسهولة الاستخدام." },
    { en: "<b>Drove the GPS distance fix</b> (the metres-wide gate before a point counted) and the audio approach (per ayah vs whole surah).", ar: "<b>دفعت حل مسافة الـ GPS</b> (الدايرة اللي كانت لازم تخرج منها قبل ما النقطة تتحسب) وطريقة الصوت (آية آية ولا السورة كاملة)." }
  ],

  stack: [
    [{ en: "App", ar: "الأبلكيشن" }, ["Expo (dev client, EAS)", "React Native", "TypeScript", "Expo Router"]],
    [{ en: "Native", ar: "Native" }, ["Expo Modules (Kotlin / Swift)", "pedometer module", "GPS-provider receiver"]],
    [{ en: "Location", ar: "الموقع" }, ["expo-location", "expo-task-manager", "react-native-maps"]],
    [{ en: "Audio", ar: "الصوت" }, ["react-native-track-player v5", "expo-file-system cache"]],
    [{ en: "Backend", ar: "الباك إند" }, ["Firebase Auth", "Firestore", "Cloud Functions", "FCM + notifee", "Crashlytics", "App Check"]],
    [{ en: "UI", ar: "الواجهة" }, ["Reanimated", "TanStack Query (community feed)"]]
  ],

  decisions: [
    {
      title: { en: "How to measure distance", ar: "إزاي نقيس المسافة" },
      chose: "1 Hz high-accuracy fixes + software filter", alts: ["OS distance filter (5–10 m) + Balanced accuracy", "native fitness APIs only"],
      why: { en: "The first builds asked the OS for <b>Balanced (~100 m) accuracy</b> in the background with a <b>10 m distance filter</b>, and the code also dropped steps under <b>8 m</b>. On a curve, skipping points cuts corners, so distance came out short (30 km → ~25 km). Now the OS delivers <b>every fix</b> (<code>distanceInterval: 0</code>, <code>Accuracy.Highest</code>, 1 s) and one software pipeline decides what counts.", ar: "أول نسخ كانت بتطلب من النظام دقة <b>Balanced (حوالي 100 متر)</b> في الخلفية، و<b>فلتر 10 متر</b>، والكود كمان كان بيرمي أي خطوة أقل من <b>8 متر</b>. في المنحنيات لما تفوّت نقط بتقطع الزوايا، فالمسافة بتطلع أقل (30 كم ← حوالي 25). دلوقتي النظام بيبعت <b>كل نقطة</b> (<code>distanceInterval: 0</code>، <code>Accuracy.Highest</code>، كل ثانية) وفلتر software واحد هو اللي يقرر إيه يتحسب." },
      both: { v: "no", en: "Filtering twice (OS + software) is what caused the under-count. Let the OS deliver everything and filter in one place.", ar: "الفلترة مرتين (النظام + الكود) هي اللي عملت النقص. خلي النظام يبعت كل حاجة وافلتر في مكان واحد." },
      better: { en: "Same idea; next step would be smoothing (e.g. a Kalman filter) and a measured ground truth (a 400 m track) for every release.", ar: "نفس الفكرة؛ والخطوة الجاية smoothing (زي Kalman filter) ومسافة حقيقية معروفة (تراك 400 متر) نقيس عليها كل release." },
      say: "We stopped filtering in the OS, took every 1 Hz fix at high accuracy, and moved all filtering into one tested software pipeline — that fixed the under-count."
    },
    {
      title: { en: "Jitter vs real movement", ar: "رعشة الـ GPS ولا حركة حقيقية" },
      chose: "adaptive floor max(8 m, accuracy × 0.5)", alts: ["fixed big radius", "no floor"],
      why: { en: "Standing still, GPS points dance around and add fake distance. A fixed big circle stops that but eats real steps. The floor grows only when accuracy is bad, plus a Doppler-speed check (&lt; 0.5 m/s = standing). The factor 0.8 → 0.5 was swept over seven field journals and was never worse.", ar: "وانت واقف، نقط الـ GPS بتتهز وبتزود مسافة وهمية. دايرة كبيرة ثابتة بتوقف ده بس بتاكل خطوات حقيقية. الحد بيكبر بس لما الدقة وحشة، ومعاه فحص سرعة Doppler (أقل من 0.5 م/ث = واقف). المعامل اتغير من 0.8 لـ 0.5 بعد ما اتجرب على 7 تسجيلات ميدانية وعمره ما كان أوحش." },
      both: { v: "yes", en: "Floor + speed check work together: one stops jitter when accuracy is poor, the other when you are clearly not moving.", ar: "الحد + فحص السرعة بيشتغلوا مع بعض: واحد بيوقف الرعشة لما الدقة وحشة، والتاني لما واضح إنك مش بتتحرك." },
      better: { en: "Same, but keep the numbers in one shared config with a test that pins them (the repo does this).", ar: "نفس الحاجة، بس الأرقام تبقى في config واحد عليه test بيثبتها (الريبو بيعمل كده)." },
      say: "The jitter gate is adaptive — max of 8 metres or half the reported accuracy — and we tuned the factor on recorded walks, not by guessing."
    },
    {
      title: { en: "Tracking with the screen off", ar: "التتبع والشاشة مقفولة" },
      chose: "Two modes: background task + foreground watcher", alts: ["foreground only", "background only"],
      why: { en: "Background location needs the \"Always\" permission, which many users deny. <b>Mode A</b> (background task) is used when allowed; <b>Mode B</b> (foreground watcher) still tracks with the screen on, shows a clear banner, and <b>upgrades to Mode A mid-session</b> if the user grants it.", ar: "التتبع في الخلفية محتاج إذن \"Always\"، وناس كتير بترفضه. <b>Mode A</b> (background task) لما الإذن موجود؛ و<b>Mode B</b> (foreground watcher) بيكمّل يتتبع والشاشة مفتوحة، وبيظهر banner واضح، و<b>بيتحول لـ Mode A في نص السيشن</b> لو اليوزر وافق." },
      both: { v: "yes", en: "Both lanes share the same distance function and constants, so the result doesn't depend on the mode.", ar: "الوضعين بيستخدموا نفس دالة المسافة ونفس الأرقام، فالنتيجة ماتتغيرش حسب الوضع." },
      better: { en: "Same design; keep both lanes on one shared pipeline (as here) so they never drift.", ar: "نفس التصميم؛ والمهم الوضعين يفضلوا على pipeline واحد (زي هنا) علشان مايبعدوش عن بعض." },
      say: "If the user denies background location we still track in the foreground and upgrade to background mode mid-run when they allow it."
    },
    {
      title: { en: "When GPS goes blind", ar: "لما الـ GPS يعمى" },
      chose: "pedometer as a second witness", alts: ["GPS only", "estimate from pace"],
      why: { en: "Under bridges, in tunnels, or when the OS kills the app in a pocket, GPS records nothing. A field report had Apple Watch at 6.1 km vs our 4.4 km. The phone's motion co-processor keeps counting; for a time window, if GPS credited much less than the pedometer, the gap is filled.", ar: "تحت الكباري، في الأنفاق، أو لما النظام يقفل الأبلكيشن في الجيب، الـ GPS مش بيسجل حاجة. في تقرير ميداني الـ Apple Watch سجلت 6.1 كم وإحنا 4.4. معالج الحركة في الموبايل بيكمّل يعدّ؛ فلو في فترة الـ GPS حسب أقل بكتير من عدّاد الخطوات، الفرق بيتعوّض." },
      both: { v: "yes", en: "That's the point: GPS stays primary, the pedometer only fills gaps.", ar: "ده بالظبط الهدف: الـ GPS هو الأساس، وعدّاد الخطوات بيسد الفجوات بس." },
      better: { en: "This is how watches do it (motion + GPS fusion). Calibrate stride length per user over time.", ar: "ده اللي الساعات بتعمله (دمج الحركة مع الـ GPS). والأحسن نظبط طول الخطوة لكل يوزر مع الوقت." },
      say: "GPS is the primary source; the pedometer is a second witness that fills windows where GPS was blind."
    },
    {
      title: { en: "Audio engine", ar: "محرك الصوت" },
      chose: "react-native-track-player", alts: ["expo-audio / expo-av", "custom native player"],
      why: { en: "We needed <b>lock-screen controls</b>, playback in a <b>native background service</b>, and gapless transitions. With JS-driven players, Android can suspend JS in the background, which left a gap between surahs.", ar: "كنا محتاجين <b>تحكم من شاشة القفل</b>، وتشغيل في <b>service native في الخلفية</b>، وانتقال من غير فواصل. مع players بيعتمدوا على الـ JS، أندرويد ممكن يوقف الـ JS في الخلفية، وده كان بيعمل فاصل بين السور." },
      both: { v: "no", en: "Two audio stacks fight over the audio session. Pick one.", ar: "محركين صوت بيتخانقوا على الـ audio session. اختار واحد." },
      better: { en: "Still the go-to for background audio in React Native.", ar: "لسه هو الاختيار الأول للصوت في الخلفية في React Native." },
      say: "Track-player runs playback in a native service, so the queue keeps moving even when Android suspends JavaScript."
    },
    {
      title: { en: "Play per ayah or per surah", ar: "نشغّل آية آية ولا السورة كاملة" },
      chose: "whole-surah tracks + ayah timestamps", alts: ["one file per ayah"],
      why: { en: "One file per ayah means hundreds of tiny tracks and a pause between each. Queuing <b>whole surahs</b> plays smoothly; a <b>timestamp manifest</b> tells us which ayah is playing (binary search on the position every 250 ms), so khatm counting still works per ayah.", ar: "ملف لكل آية يعني مئات التراكات الصغيرة ووقفة بين كل واحدة. لما نحط <b>السور كاملة</b> في الـ queue التشغيل بيبقى ناعم؛ و<b>manifest بالـ timestamps</b> بيقولنا أنهي آية شغالة (binary search على المكان كل 250ms)، فعدّ الختمة لسه آية آية." },
      both: { v: "partly", en: "The app still caches per-ayah MP3s for some paths; playback itself is surah-based. Keep one model per feature.", ar: "الأبلكيشن لسه بيخزن MP3 لكل آية في بعض الأماكن؛ بس التشغيل نفسه بالسورة. خلي طريقة واحدة لكل فيتشر." },
      better: { en: "Surah + timestamps is the better listening experience.", ar: "السورة + الـ timestamps تجربة سماع أحسن." },
      say: "We queue whole surahs for gapless playback and use a timestamp manifest to know the current ayah."
    },
    {
      title: { en: "Session timer", ar: "عدّاد وقت السيشن" },
      chose: "wall-clock (derived from timestamps)", alts: ["setInterval counter"],
      why: { en: "A counter that adds 1 every second stops when Android suspends JS — one run showed 67 min instead of 96. Now time = saved total + (now − start of the current active part). It can't drift.", ar: "عدّاد بيزود 1 كل ثانية بيقف لما أندرويد يوقف الـ JS — جرية اتسجلت 67 دقيقة بدل 96. دلوقتي الوقت = المجموع المحفوظ + (دلوقتي − بداية الجزء الحالي). مستحيل يبعد." },
      both: { v: "no", en: "Use the interval only to <b>re-render</b>, never to count.", ar: "استخدم الـ interval علشان <b>تعمل re-render</b> بس، مش علشان تعدّ." },
      better: { en: "Same.", ar: "نفس الحاجة." },
      say: "Elapsed time is derived from timestamps, not counted by a timer, so background suspension can't lose minutes.",
      concept: "derived-state"
    },
    {
      title: { en: "Backend", ar: "الباك إند" },
      chose: "Firebase (Auth, Firestore, Cloud Functions)", alts: ["Express + Postgres API", "Supabase"],
      why: { en: "Fast to ship for a small team, offline cache in the SDK, security rules per user, and Cloud Functions to keep secrets (Strava, Apple) off the phone. 59 app files talk to Firestore.", ar: "سريع في التسليم لفريق صغير، فيه cache offline في الـ SDK، وsecurity rules لكل يوزر، و Cloud Functions علشان الأسرار (Strava، Apple) ماتبقاش على الموبايل. 59 ملف في الأبلكيشن بيكلموا Firestore." },
      both: { v: "no", en: "The repo also has an Express + Postgres + OpenAPI scaffold, but the app never calls it — two backends for one app is maintenance cost.", ar: "الريبو فيه كمان scaffold لـ Express + Postgres + OpenAPI، بس الأبلكيشن مش بيكلمه خالص — باك إندين لأبلكيشن واحد = تكلفة صيانة." },
      better: { en: "Firebase is fine at this size; remove the unused server.", ar: "Firebase مناسب للحجم ده؛ والأحسن نشيل السيرفر اللي مش مستخدم." },
      say: "We used Firebase so a small team could ship fast, and kept third-party secrets in Cloud Functions."
    },
    {
      title: { en: "Strava tokens", ar: "توكنات Strava" },
      chose: "OAuth exchange in Cloud Functions", alts: ["exchange and store on the device"],
      why: { en: "The client secret must never ship in the app. The function exchanges the code, checks the user granted <code>activity:write</code>, and keeps tokens on the server.", ar: "الـ client secret عمره ما يتحط في الأبلكيشن. الـ function بتبدّل الكود، وبتتأكد إن اليوزر وافق على <code>activity:write</code>، وبتحفظ التوكنات على السيرفر." },
      both: { v: "no", en: "Tokens in one place only — the server.", ar: "التوكنات في مكان واحد بس — السيرفر." },
      better: { en: "Same.", ar: "نفس الحاجة." },
      say: "Strava OAuth runs in a Cloud Function so the client secret and tokens never live on the phone.",
      concept: "token-storage"
    },
    {
      title: { en: "Writes while offline", ar: "الحفظ وانت offline" },
      chose: "persistent outbox (AsyncStorage)", alts: ["Firestore's in-memory queue only"],
      why: { en: "Firestore retries unsent writes, but in React Native that queue lives <b>in memory</b>: kill the app offline and the change is gone. Pending profile writes and session drafts are saved locally and sent on the next launch.", ar: "Firestore بيعيد الكتابات اللي ماتبعتتش، بس في React Native الـ queue دي <b>في الميموري</b>: لو قفلت الأبلكيشن وانت offline التغيير بيضيع. الكتابات المعلقة ومسودات السيشن بتتحفظ على الموبايل وتتبعت أول ما يفتح تاني." },
      both: { v: "yes", en: "Keep the SDK's retry and add the outbox for anything you can't lose.", ar: "سيب الـ retry بتاع الـ SDK وزوّد الـ outbox لأي حاجة ماينفعش تضيع." },
      better: { en: "Same; make every write idempotent so a retry can't duplicate it.", ar: "نفس الحاجة؛ وخلي كل كتابة idempotent علشان الإعادة ماتكررش." },
      say: "A finished run is saved locally first and synced later, so killing the app offline never loses it.",
      concept: "optimistic-ui"
    }
  ],

  flows: [
    {
      title: { en: "A run, from start to save", ar: "جرية من البداية للحفظ" },
      steps: [
        ["Permissions", { en: "background allowed? Mode A : Mode B", ar: "الخلفية مسموحة؟ Mode A : Mode B" }],
        ["1 Hz fixes", { en: "Highest accuracy, no OS distance filter", ar: "أعلى دقة، من غير فلتر مسافة من النظام" }],
        ["Filter", { en: "accuracy gate → spike/speed cap → standing check → adaptive floor", ar: "حد الدقة ← قفلة القفزات والسرعة ← فحص الوقوف ← الحد المتغير" }],
        ["Witness", { en: "pedometer fills blind windows", ar: "عدّاد الخطوات يسد الفترات العمية" }],
        ["Save", { en: "local draft first, then Firestore", ar: "مسودة على الموبايل الأول، وبعدين Firestore" }],
        ["Share", { en: "community feed, Strava if connected", ar: "الـ community، و Strava لو مربوط" }]
      ]
    },
    {
      title: { en: "How we found the distance bug", ar: "إزاي لقينا مشكلة المسافة" },
      steps: [
        ["Report", { en: "track run: Strava 6.42 km, ONE14 3.10 km", ar: "جري على تراك: Strava 6.42 كم، ONE14 3.10" }],
        ["Twin walk", { en: "iPhone + Android together, diagnostics on", ar: "آيفون وأندرويد مع بعض، والتشخيص شغال" }],
        ["Replay", { en: "recordings through the real filter, offline", ar: "التسجيلات بتتشغل على الفلتر الحقيقي offline" }],
        ["Cause", { en: "100 m accuracy, 10 m OS filter, 8 m floor", ar: "دقة 100 متر، فلتر 10 متر من النظام، وحد 8 متر" }],
        ["Tune", { en: "every fix at 1 Hz; jitter factor 0.8 → 0.5", ar: "كل نقطة كل ثانية؛ معامل الرعشة 0.8 ← 0.5" }],
        ["Re-test", { en: "against Strava and Apple Watch, then release", ar: "مقارنة بـ Strava و Apple Watch، وبعدين release" }]
      ]
    },
    {
      title: { en: "Listening while running", ar: "السماع وانت بتجري" },
      steps: [
        ["Choose", { en: "reciter + surah range", ar: "القارئ + نطاق السور" }],
        ["Queue", { en: "whole surahs as native tracks", ar: "السور كاملة كتراكات native" }],
        ["Poll", { en: "position every 250 ms (a ref, not state)", ar: "المكان كل 250ms (ref مش state)" }],
        ["Find ayah", { en: "binary search in the timestamp manifest", ar: "binary search في الـ manifest" }],
        ["Count", { en: "unique ayahs heard → khatm progress", ar: "الآيات المسموعة من غير تكرار ← تقدم الختمة" }]
      ]
    },
    {
      title: { en: "My release loop", ar: "دورة الـ release بتاعتي" },
      steps: [
        ["Plan", { en: "feature, behaviour, UX", ar: "الفيتشر، السلوك، الـ UX" }],
        ["Build", { en: "teammate + AI", ar: "زميل + AI" }],
        ["Install", { en: "TestFlight / internal Android build", ar: "TestFlight / build أندرويد داخلي" }],
        ["Test", { en: "real runs, UI, performance, usability", ar: "جري حقيقي، UI، أداء، سهولة" }],
        ["Fix list", { en: "back to the build step", ar: "نرجع لخطوة البناء" }]
      ]
    }
  ],

  patterns: [
    {
      title: { en: "One distance gate for both modes", ar: "بوابة مسافة واحدة للوضعين" },
      body: { en: "Every fix goes through the same pure function — easy to unit-test and to replay recorded walks through.", ar: "كل نقطة بتعدي على نفس الـ function — سهل تعملها unit test وتشغّل عليها مشيات متسجلة." },
      code: "function creditedMetres(prev, fix, cfg) {\n  if (fix.accuracy > cfg.maxAccuracyM) return 0;            // too noisy\n  const d = haversine(prev, fix);\n  const dt = (fix.time - prev.time) / 1000;\n  if (dt <= 0 || d / dt > cfg.maxSpeedMs) return 0;          // spike\n  if (fix.speed != null && fix.speed >= 0 && fix.speed < cfg.minMovingMs) return 0; // standing\n  const floor = Math.max(cfg.minStepM, fix.accuracy * cfg.jitterFactor);\n  return d >= floor ? d : 0;                                  // below floor = jitter\n}"
    },
    {
      title: { en: "Time that can't drift", ar: "وقت مايبعدش" },
      body: { en: "Store timestamps, derive the number. The interval only triggers a re-render.", ar: "خزّن timestamps واحسب الرقم. والـ interval بس علشان الـ re-render." },
      code: "// state: accumulatedMs (finished active parts), activeSince (or null when paused)\nconst elapsedMs = accumulatedMs + (activeSince ? Date.now() - activeSince : 0);\n\nfunction pause() {\n  accumulatedMs += Date.now() - activeSince;\n  activeSince = null;\n}"
    },
    {
      title: { en: "Which ayah is playing?", ar: "أنهي آية شغالة؟" },
      body: { en: "The manifest is sorted by start time, so a binary search finds the ayah in O(log n). Progress is kept in a ref so it doesn't re-render the screen 4 times a second.", ar: "الـ manifest مترتب بوقت البداية، فالـ binary search بيلاقي الآية في O(log n). والـ progress في ref علشان مايعملش re-render للشاشة 4 مرات في الثانية." },
      code: "function ayahAt(positionMs, manifest) {\n  let lo = 0, hi = manifest.length - 1;\n  while (lo < hi) {\n    const mid = (lo + hi + 1) >> 1;\n    if (manifest[mid].startMs <= positionMs) lo = mid; else hi = mid - 1;\n  }\n  return manifest[lo].ayah;\n}"
    },
    {
      title: { en: "Outbox for writes you can't lose", ar: "Outbox للحاجات اللي ماينفعش تضيع" },
      body: { en: "Save locally first, send, then remove. Anything left is retried on the next launch.", ar: "احفظ على الموبايل الأول، ابعت، وبعدين امسح. أي حاجة فضلت بتتبعت تاني أول ما يفتح." },
      code: "async function saveRun(run) {\n  await outbox.put(run.id, run);          // survives app kill\n  try {\n    await uploadRun(run);                 // idempotent: same id = same doc\n    await outbox.delete(run.id);\n  } catch {\n    // stays in the outbox; flushOutbox() runs on launch / reconnect\n  }\n}"
    }
  ],

  hooks: [
    { group: { en: "Note", ar: "ملحوظة" }, items: [
      { name: "App code, not my diffs", what: { en: "These counts are from the whole app (written by the team with AI). Use them to explain how the app works, not as \"hooks I wrote\".", ar: "الأرقام دي من الأبلكيشن كله (اتكتب من الفريق بالـ AI). استخدمها علشان تشرح الأبلكيشن شغال إزاي، مش كـ \"hooks أنا كتبتها\"." } }
    ]},
    { group: { en: "State and refs", ar: "الـ State والـ refs" }, items: [
      { name: "useRef", count: "×316", what: { en: "More refs than state: GPS callbacks, audio progress and timers read the latest value without re-rendering.", ar: "refs أكتر من الـ state: callbacks الـ GPS وprogress الصوت والتايمرز بيقروا آخر قيمة من غير re-render." }, remember: { en: "Fast-changing values that don't change the UI belong in refs.", ar: "القيم اللي بتتغير بسرعة ومش بتغير الـ UI مكانها ref." } },
      { name: "useState", count: "×275", what: { en: "What the screen actually shows.", ar: "اللي الشاشة بتعرضه فعلًا." } },
      { name: "useEffect / useCallback", count: "×213 / ×191", what: { en: "Start/stop watchers and listeners; stable handlers passed to native callbacks.", ar: "تشغيل/إيقاف الـ watchers والـ listeners؛ handlers ثابتة للـ callbacks الـ native." }, remember: { en: "Every listener you add in an effect must be removed in its cleanup.", ar: "أي listener بتضيفه في effect لازم تشيله في الـ cleanup." } }
    ]},
    { group: { en: "Mobile lifecycle and audio", ar: "دورة حياة الموبايل والصوت" }, items: [
      { name: "AppState listeners", count: "×20", what: { en: "React when the app goes to background or comes back: re-check GPS, flush data, resync the player.", ar: "بتتصرف لما الأبلكيشن يروح الخلفية أو يرجع: تتأكد من الـ GPS، تبعت الداتا، تزامن الـ player." } },
      { name: "useTrackPlayerEvents / useActiveTrack / useProgress", count: "×7 / ×5 / ×3", what: { en: "Native player events, current surah track, playback position.", ar: "أحداث الـ player الـ native، تراك السورة الحالي، مكان التشغيل." } },
      { name: "useSharedValue / useAnimatedStyle", count: "×97 / ×79", what: { en: "Reanimated: animations run on the UI thread.", ar: "Reanimated: الأنيميشن بيشتغل على الـ UI thread." } }
    ]},
    { group: { en: "Custom hooks", ar: "Hooks مخصوصة" }, items: [
      { name: "useGpsTracking", what: { en: "Both GPS lanes, the filter config, mode switching.", ar: "طريقين الـ GPS، إعدادات الفلتر، تبديل الوضع." } },
      { name: "useSurahTimestampPlayer", what: { en: "Surah queue + ayah tracking from the manifest.", ar: "queue السور + تتبع الآيات من الـ manifest." } },
      { name: "useRouteTrack / useLowPowerMode / useBackendReachability", what: { en: "Live route, battery-saver warning, offline detection.", ar: "الطريق اللايف، تحذير توفير البطارية، معرفة لو مفيش نت." } },
      { name: "useQuery / useInfiniteQuery", count: "×9 / ×3", what: { en: "Only for the community feed; most data goes straight to Firestore services.", ar: "للـ community feed بس؛ معظم الداتا رايحة لـ Firestore services على طول." } }
    ]}
  ],

  problems: [
    {
      title: { en: "Runs were too short", ar: "الجري كان بيتحسب أقل" },
      problem: { en: "A client ran ~30 km and the app showed ~25 km (−17%). Later a track run showed 3.10 km vs Strava's 6.42 km.", ar: "عميل جري حوالي 30 كم والأبلكيشن عرض حوالي 25 (−17%). وبعدها جرية على تراك طلعت 3.10 كم و Strava 6.42." },
      fix: { en: "Removed the OS distance filter, Highest accuracy at 1 Hz, one software filter for both modes, jitter factor tuned on recorded walks; tested with two phones against Strava and Apple Watch.", ar: "شلنا فلتر المسافة من النظام، أعلى دقة كل ثانية، فلتر software واحد للوضعين، ومعامل الرعشة اتظبط على مشيات متسجلة؛ واتجرب بموبايلين قدام Strava و Apple Watch." },
      result: { en: "Field walks within ~2–6% of Strava on the same phones.", ar: "المشيات الميدانية بقت فرقها حوالي 2–6% عن Strava على نفس الموبايلات." },
      lesson: { en: "Measure, don't guess: replay real recordings through the real code.", ar: "قيس ماتخمنش: شغّل تسجيلات حقيقية على الكود الحقيقي." }
    },
    {
      title: { en: "The timer lost minutes", ar: "العدّاد كان بيضيّع دقايق" },
      problem: { en: "Android suspended JS in the background, so a counting timer showed 67 min for a 96-min session.", ar: "أندرويد كان بيوقف الـ JS في الخلفية، فالعدّاد عرض 67 دقيقة لسيشن 96." },
      fix: { en: "Time derived from timestamps (moving time excludes manual pauses).", ar: "الوقت بيتحسب من timestamps (وقت الحركة من غير الـ pause اليدوي)." },
      result: { en: "Correct time even after long background periods.", ar: "وقت صح حتى بعد فترات طويلة في الخلفية." }
    },
    {
      title: { en: "Gaps between surahs", ar: "فواصل بين السور" },
      problem: { en: "When JS was suspended, the next surah didn't start until the app woke up.", ar: "لما الـ JS يقف، السورة الجاية ماكانتش بتبدأ غير لما الأبلكيشن يصحى." },
      fix: { en: "Queue all surahs up front in the native player; track ayahs from timestamps.", ar: "كل السور تتحط في الـ queue من الأول في الـ player الـ native؛ والآيات تتتبع من الـ timestamps." },
      result: { en: "Gapless playback with the screen off.", ar: "تشغيل من غير فواصل والشاشة مقفولة." }
    },
    {
      title: { en: "GPS blind in tunnels and pockets", ar: "الـ GPS بيعمى في الأنفاق والجيب" },
      problem: { en: "Apple Watch 6.1 km vs app 4.4 km in a field report — the process was dead part of the time.", ar: "Apple Watch سجلت 6.1 كم والأبلكيشن 4.4 في تقرير ميداني — الأبلكيشن كان مقفول جزء من الوقت." },
      fix: { en: "Pedometer fusion: per time window, fill the gap when GPS credited much less than the motion sensor.", ar: "دمج عدّاد الخطوات: في كل فترة، نسد الفرق لو الـ GPS حسب أقل بكتير من حساس الحركة." },
      result: { en: "Distance keeps growing where GPS can't see.", ar: "المسافة بتكمّل تزيد في الأماكن اللي الـ GPS مش شايفها." }
    },
    {
      title: { en: "Users who deny background location", ar: "يوزرز بيرفضوا الموقع في الخلفية" },
      problem: { en: "Without \"Always\", a background-only design records nothing.", ar: "من غير \"Always\"، التصميم اللي معتمد على الخلفية بس مش بيسجل حاجة." },
      fix: { en: "Foreground mode with a persistent banner, an in-app way to enable background, and a mid-session upgrade.", ar: "وضع foreground مع banner ثابت، وطريقة من جوه الأبلكيشن لتفعيل الخلفية، وتحويل في نص السيشن." },
      result: { en: "Every user gets a recorded run.", ar: "كل يوزر بيتسجل له جريته." }
    }
  ],

  star: {
    s: { en: "A Qur'an-and-running app; runners reported that distance came out short.", ar: "أبلكيشن قرآن وجري؛ العدّائين قالوا إن المسافة بتطلع أقل." },
    t: { en: "As the lead, make distance trustworthy and ship to both stores.", ar: "كـ lead، أخلّي المسافة يُعتمد عليها وننزل على الستورين." },
    a: { en: "Found the metres-wide gate and coarse filters, set up two-phone field tests against Strava and Apple Watch, directed the filter changes, and tested every build.", ar: "لقيت الدايرة اللي بالأمتار والفلاتر التقيلة، وعملت تجارب بموبايلين قدام Strava و Apple Watch، ووجّهت تعديلات الفلتر، وجرّبت كل build." },
    r: { en: "Live on Google Play (100+ downloads) and the App Store (Aug 2026); field walks within a few percent of Strava.", ar: "نازل على Google Play (فوق 100 تحميل) و App Store (أغسطس 2026)؛ والمشيات الميدانية فرقها كام في المية عن Strava." }
  },

  qa: [
    { q: "Your name isn't on the commits. What exactly was your role?", a: { en: "I led product and technical direction: I planned features and UX, chose approaches like how to measure distance and how to play audio, and tested every build. A teammate wrote the code with AI from those plans, and the team pushed from one place.", ar: "كنت lead للمنتج والتقنية: خططت الفيتشرز والـ UX، واخترت الطرق زي إزاي نقيس المسافة وإزاي نشغّل الصوت، وجرّبت كل build. زميل كتب الكود بالـ AI من الخطط دي، والفريق كان بيرفع من مكان واحد." } },
    { q: "How do you compute distance from GPS?", a: { en: "Haversine between consecutive accepted fixes. A fix is rejected if accuracy is too poor, the implied speed is impossible, or Doppler says you're standing; small moves below max(8 m, accuracy × 0.5) are treated as jitter.", ar: "Haversine بين كل نقطتين مقبولين ورا بعض. النقطة بتترفض لو الدقة وحشة، أو السرعة مستحيلة، أو الـ Doppler بيقول إنك واقف؛ والحركات الصغيرة تحت max(8 متر، الدقة × 0.5) بتتعامل كرعشة." } },
    { q: "Why not just use the OS distance filter?", a: { en: "It drops points before you see them, so curves get cut and distance comes out short. We take every fix and filter in one place we can test.", ar: "بيرمي نقط قبل ما توصلك، فالمنحنيات بتتقطع والمسافة تطلع أقل. إحنا بناخد كل نقطة ونفلتر في مكان واحد نقدر نختبره." } },
    { q: "How did you test GPS without running every time?", a: { en: "Diagnostics journals recorded real runs; we replayed them offline through the same filter code, and pinned the tuned constants with tests. Then confirmed on two phones in the field.", ar: "سجلات تشخيص بتسجل الجري الحقيقي؛ وكنا بنشغلها offline على نفس كود الفلتر، والأرقام المتظبطة عليها tests. وبعدين نتأكد بموبايلين في الحقيقة." } },
    { q: "How does audio stay in sync with the current ayah?", a: { en: "Whole surahs are native tracks; a 250 ms poll reads the position into a ref and a binary search over the timestamp manifest finds the ayah.", ar: "السور كاملة تراكات native؛ وكل 250ms بنقرا المكان في ref، و binary search على الـ manifest بيلاقي الآية." } },
    { q: "What would you do differently?", a: { en: "A measured ground truth (a 400 m track) for every release, remove the unused server scaffold, and ship the shake-to-feedback tool we prototyped.", ar: "مسافة حقيقية معروفة (تراك 400 متر) لكل release، نشيل السيرفر اللي مش مستخدم، ونكمّل أداة shake-to-feedback اللي عملنا لها prototype." } }
  ],

  terms: ["GPS jitter", "Doppler speed", "haversine", "accuracy gate", "background location task", "foreground service", "sensor fusion", "pedometer", "gapless playback", "timestamp manifest", "binary search", "wall-clock time", "outbox pattern", "idempotent writes", "TestFlight", "field testing", "replay testing"],

  dont: [
    { en: "Don't say <b>\"I coded / built\"</b> ONE14 — say <b>led, directed, drove, tested</b>.", ar: "ماتقولش <b>\"أنا كتبت / بنيت\"</b> ONE14 — قول <b>قدت، وجّهت، دفعت، جرّبت</b>." },
    { en: "Don't say it measures <b>better than Strava</b>: our recorded walks are slightly under Strava. Say \"within a few percent\".", ar: "ماتقولش إنه بيقيس <b>أحسن من Strava</b>: المشيات المتسجلة أقل من Strava شوية. قول \"فرق كام في المية\"." },
    { en: "Shake-to-feedback is on a branch, not merged — don't call it shipped.", ar: "Shake-to-feedback على branch ومش متدمج — ماتقولش إنه نزل." },
    { en: "The Express + Postgres API in the repo isn't used by the app — don't describe it as the backend.", ar: "الـ API بتاع Express + Postgres اللي في الريبو الأبلكيشن مش بيستخدمه — ماتوصفوش إنه الباك إند." },
    { en: "No user numbers beyond the public \"100+\" on Google Play.", ar: "مفيش أرقام يوزرز غير الـ \"100+\" اللي على Google Play." }
  ],

  evidence: [
    "Repo ~/one14-qardio-app (Bitbucket nweave/one14-qardio-app), branch feat/google-maps @ 2026-09-15",
    "Files: artifacts/mobile/hooks/useGpsTracking.ts, utils/gpsFilters.ts, tasks/locationTask.ts, features/pedometerFusion.ts, hooks/useSurahTimestampPlayer.ts, features/profileOutbox.ts, functions/src/strava.ts",
    "Docs: docs/GPS_DISTANCE_ACCURACY_TUNING.md, docs/CLIENT_REPORT_GPS_DISTANCE.md, docs/gps/06-TWIN-DEVICE-2026-09-08.md",
    "Stores: Google Play com.one14.qardio (100+), App Store id6796342246 (released 2026-08-22)",
    "Deep dive: evidence/projects/one14-qardio.md · Role: inventory/user-answers.md"
  ]
});
