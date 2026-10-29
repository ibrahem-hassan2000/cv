// React Native — written 2026-10-29.
STUDY.fill("react-native", {
  intro: { en: "React on phones: the architecture (JSI, Fabric, Hermes), Expo and EAS, navigation, layout differences, fast lists, native capabilities and background work, storage and offline, and shipping to the stores.", ar: "React على الموبايل. الـ architecture (JSI و Fabric و Hermes)، و Expo و EAS، والتنقل، واختلافات الـ layout. والقوايم السريعة، وقدرات الجهاز والشغل في الخلفية. والتخزين والـ offline، والنشر على الـ stores." },
  topics: [
    {
      id: "architecture",
      title: { en: "How React Native works (old bridge vs New Architecture)", ar: "React Native شغال إزاي (الـ bridge القديم ولا الـ New Architecture)" },
      tldr: { en: "Your JS runs in a JS engine (Hermes) and describes native views. The old architecture sent JSON messages over an async bridge. The New Architecture uses JSI (direct C++ calls), Fabric (a new renderer, supports concurrent React) and TurboModules (lazy, typed native modules). The UI is real native views, not a WebView.", ar: "الـ JS بتاعك بيشتغل في JS engine (Hermes) وبيوصف native views. الـ architecture القديمة كانت بتبعت رسايل JSON على bridge async. والـ New Architecture بتستخدم JSI (نداءات C++ مباشرة)، و Fabric (renderer جديد بيدعم concurrent React)، و TurboModules (native modules بـ types وبتتحمل وقت الحاجة). والواجهة views حقيقية مش WebView." },
      blocks: [
        { type: "compare", cols: ["", { en: "Old (bridge)", ar: "القديم (bridge)" }, { en: "New Architecture", ar: "الـ New Architecture" }], rows: [
          [{ en: "JS ↔ native", ar: "JS ↔ native" }, { en: "Async JSON messages", ar: "رسايل JSON async" }, { en: "JSI: direct, can be sync", ar: "JSI: مباشر ويقدر يبقى sync" }],
          [{ en: "Renderer", ar: "الـ Renderer" }, "Paper", "Fabric"],
          [{ en: "Native modules", ar: "الـ Native modules" }, { en: "All loaded at start", ar: "كلهم بيتحملوا في الأول" }, { en: "TurboModules, lazy, codegen types", ar: "TurboModules، lazy، و types بـ codegen" }],
          [{ en: "Engine", ar: "الـ Engine" }, "JSC / Hermes", { en: "Hermes (default)", ar: "Hermes (افتراضي)" }]
        ] }
      ],
      say: "React Native renders real native views; the New Architecture replaced the async bridge with JSI, so JS and native talk directly and Fabric supports concurrent React.",
      interview: [{ q: "Why was the bridge a performance problem?", a: { en: "Every interaction crossed it as serialised JSON asynchronously, so heavy traffic (scroll events, animations, big lists) could jam it and cause dropped frames.", ar: "كل تفاعل كان بيعدي عليه كـ JSON serialized بشكل async، فالضغط الكبير (أحداث scroll، أنيميشن، قوايم كبيرة) ممكن يزحمه ويوقع frames." },
        follow: [{ q: "How do you keep animations at 60 fps?", a: { en: "Run them on the UI thread: Reanimated worklets or the native driver, transform/opacity, and avoid JS-thread work during gestures.", ar: "شغّلها على الـ UI thread: Reanimated worklets أو الـ native driver، و transform و opacity، وابعد عن شغل الـ JS thread وقت الـ gestures." } }] }],
      quiz: [{ q: { en: "Is React Native UI a WebView?", ar: "واجهة React Native عبارة عن WebView؟" }, a: { en: "No — real native views.", ar: "لأ — native views حقيقية." } }],
      quick: [{ en: "Hermes JS → native views; JSI + Fabric + TurboModules replace the async bridge.", ar: "الـ JS بيشتغل على Hermes، وبيرسم native views. و JSI و Fabric و TurboModules خدوا مكان الـ bridge الـ async." }]
    },
    {
      id: "expo",
      title: { en: "Expo, dev builds and EAS", ar: "Expo والـ dev builds و EAS" },
      tldr: { en: "Expo is the recommended way to build RN apps: SDK modules (location, audio, notifications…), Expo Router, config plugins for native settings, dev builds for custom native code, EAS Build (cloud builds) and EAS Update (over-the-air JS updates). Bare RN only when you need full native control.", ar: "Expo هو الطريقة المقترحة لبناء تطبيقات RN. فيه modules جاهزة (موقع، وصوت، وإشعارات…)، و Expo Router. و config plugins لإعدادات الـ native، و dev builds للكود الـ native المخصوص. و EAS Build للـ builds على الـ cloud، و EAS Update لتحديثات الـ JS من غير store." },
      blocks: [
        { type: "list", items: [
          { en: "Expo Go: quick start, only built-in modules. Dev build: your own native modules + Expo tooling.", ar: "Expo Go: بداية سريعة، و modules جاهزة بس. Dev build: native modules بتاعتك ومعاها أدوات Expo." },
          { en: "Config plugins edit Info.plist / AndroidManifest at build time — no manual native folders.", ar: "الـ Config plugins بتعدل Info.plist و AndroidManifest وقت الـ build — من غير فولدرات native يدوي." },
          { en: "EAS Update ships JS/asset fixes instantly; native changes still need a store release.", ar: "الـ EAS Update بيبعت تصليحات الـ JS والـ assets على طول. أما التغييرات الـ native فلسه محتاجة نسخة جديدة على الـ store." }
        ] },
        { type: "projects", items: [
          { text: { en: "ONE14: Expo with custom native modules (GPS watch, pedometer), Firebase, EAS builds, TestFlight and Play releases.", ar: "ONE14: Expo مع native modules مخصوصة (GPS watch، pedometer)، و Firebase، و EAS builds، وإصدارات TestFlight و Play." }, p: "one14", tab: "decisions", label: "ONE14" },
          { text: { en: "Kalima: Expo SDK 57 with home-screen widgets (Android and iOS targets).", ar: "Kalima: Expo SDK 57 مع widgets على الشاشة الرئيسية (Android و iOS)." }, p: "kalima", tab: "decisions", label: "Kalima" }
        ] }
      ],
      say: "I build with Expo and dev builds: SDK modules and config plugins cover most native needs, EAS handles builds and over-the-air JS updates, and custom native modules are still possible.",
      interview: [{ q: "What can and can't an OTA update change?", a: { en: "It can change JS and assets. It can't change native code, permissions or native dependencies — those need a new binary through the stores. Respect store rules on behaviour changes.", ar: "يقدر يغير الـ JS والـ assets. مايقدرش يغير الكود الـ native ولا الصلاحيات ولا الـ native dependencies — دول محتاجين binary جديد على الـ stores. واحترم قواعد الـ stores في تغيير السلوك." } }],
      quiz: [{ q: { en: "Need a custom native module — Expo Go or a dev build?", ar: "محتاج native module مخصوص — Expo Go ولا dev build؟" }, a: { en: "A dev build.", ar: "Dev build." } }],
      quick: [{ en: "Expo SDK + config plugins + dev builds; EAS Build/Update; OTA = JS only.", ar: "Expo SDK، و config plugins، و dev builds. و EAS Build و Update. والـ OTA للـ JS بس." }]
    },
    {
      id: "rn-ui",
      title: { en: "Layout, styling and navigation on mobile", ar: "الـ Layout والـ styling والتنقل على الموبايل" },
      tldr: { en: "Flexbox everywhere (default <code>flexDirection: column</code>), no CSS cascade, styles via StyleSheet or NativeWind (Tailwind for RN). Navigation is a stack of mounted screens (React Navigation / Expo Router), with platform gestures. Handle safe areas, the keyboard and both platforms.", ar: "Flexbox في كل حتة (الافتراضي <code>flexDirection: column</code>)، ومفيش CSS cascade، والـ styles بـ StyleSheet أو NativeWind (Tailwind لـ RN). والتنقل عبارة عن stack من شاشات mounted (React Navigation أو Expo Router)، بـ gestures كل نظام. واتعامل مع الـ safe areas والكيبورد والنظامين." },
      blocks: [
        { type: "compare", cols: ["", "Web", "React Native"], rows: [
          [{ en: "Default flex direction", ar: "اتجاه flex الافتراضي" }, "row", "column"],
          [{ en: "Text", ar: "النص" }, { en: "Anywhere", ar: "في أي حتة" }, { en: "Only inside &lt;Text&gt;", ar: "جوه &lt;Text&gt; بس" }],
          [{ en: "Units", ar: "الوحدات" }, "px, rem, %…", { en: "Density-independent numbers, %", ar: "أرقام مستقلة عن الكثافة، و %" }],
          [{ en: "Scrolling", ar: "الـ Scroll" }, { en: "Automatic", ar: "أوتوماتيك" }, "ScrollView / FlatList"],
          [{ en: "Previous screens", ar: "الشاشات اللي قبل" }, { en: "Unmounted", ar: "بتتشال" }, { en: "Stay mounted in the stack", ar: "بتفضل mounted في الـ stack" }]
        ] },
        { type: "projects", items: [
          { text: { en: "Trackoo/lingo: NativeWind; Kyasco app: Expo Router + Uniwind/Tailwind; Kalima: one motion language, glass widgets.", ar: "Trackoo و lingo: بـ NativeWind. وتطبيق Kyasco: بـ Expo Router و Uniwind/Tailwind. و Kalima: لغة حركة واحدة، و widgets شكلها glass." }, p: "kalima", tab: "overview", label: "Kalima" }
        ] }
      ],
      say: "Mobile layouts are flexbox-first with safe areas and keyboard handling, styles through NativeWind or StyleSheet, and navigation as a stack where screens stay mounted.",
      interview: [{ q: "Why does a screen keep fetching after you navigate away in React Navigation?", a: { en: "Stack screens stay mounted. Tie work to focus (useFocusEffect / useIsFocused) or let React Query pause observers that aren't focused.", ar: "شاشات الـ stack بتفضل mounted. اربط الشغل بالـ focus (useFocusEffect أو useIsFocused) أو سيب React Query يوقف المتابعين اللي مش في focus." } }],
      quiz: [{ q: { en: "Can you put a string directly inside &lt;View&gt;?", ar: "ينفع تحط نص على طول جوه &lt;View&gt;؟" }, a: { en: "No — text must be inside &lt;Text&gt;.", ar: "لأ — النص لازم يبقى جوه &lt;Text&gt;." } }],
      quick: [{ en: "Column flex default; Text only in <Text>; NativeWind/StyleSheet; stack screens stay mounted; safe areas + keyboard.", ar: "الاتجاه الافتراضي column. والنص في <Text> بس. و NativeWind أو StyleSheet. وشاشات الـ stack بتفضل mounted. وخلي بالك من الـ safe areas والكيبورد." }]
    },
    {
      id: "lists",
      title: { en: "Fast lists: FlatList and FlashList", ar: "قوايم سريعة: FlatList و FlashList" },
      tldr: { en: "Never map a long array inside a ScrollView. <code>FlatList</code> virtualises; <code>FlashList</code> recycles views and is usually faster. Give stable <code>keyExtractor</code>s, memoised row components, fixed or estimated item sizes, and avoid inline functions/objects in rows.", ar: "عمرك ما تعمل map لـ array طويل جوه ScrollView. الـ <code>FlatList</code> بيعمل virtualization. والـ <code>FlashList</code> بيعيد استخدام الـ views، وغالبًا أسرع. ادّيه <code>keyExtractor</code> ثابت، و rows عليها memo، ومقاسات ثابتة أو تقريبية. وابعد عن الـ functions والـ objects الـ inline في الصفوف." },
      blocks: [
        { type: "code", code: "<FlashList\n  data={posts}\n  keyExtractor={(p) => p.id}\n  renderItem={renderPost}              // stable function, memo'd <PostRow />\n  estimatedItemSize={320}\n  onEndReached={() => hasNextPage && fetchNextPage()}\n  onEndReachedThreshold={0.5}\n/>" },
        { type: "projects", items: [{ text: { en: "Trackoo: feed and stories lists with TanStack Query data (and a missing FlatList key fixed).", ar: "Trackoo: قوايم الـ feed والـ stories بداتا TanStack Query (واتصلح key ناقص في FlatList)." } }] }
      ],
      say: "Long lists use FlashList or FlatList with stable keys, memoised rows and size estimates, and pagination through useInfiniteQuery.",
      interview: [{ q: "A FlatList stutters while scrolling — what do you check?", a: { en: "Row re-renders (memo, stable renderItem/props), heavy row content (images sizing, shadows), keys, getItemLayout/estimated sizes, and JS-thread work during scroll.", ar: "الـ re-renders في الصفوف (memo، و renderItem و props ثابتة). ومحتوى الصف التقيل (مقاسات الصور والظلال). والـ keys. و getItemLayout أو المقاسات التقريبية. وشغل الـ JS thread وقت الـ scroll." } }],
      quiz: [{ q: { en: "Why not ScrollView + map for 1,000 items?", ar: "ليه مش ScrollView مع map لـ 1000 عنصر؟" }, a: { en: "It renders all 1,000 at once — no virtualisation.", ar: "بيرسم الـ 1000 مرة واحدة — من غير virtualization." } }],
      quick: [{ en: "FlashList/FlatList, stable keys, memo rows, size estimates, onEndReached + useInfiniteQuery.", ar: "FlashList أو FlatList، و keys ثابتة، و memo للصفوف، ومقاسات تقديرية، و onEndReached مع useInfiniteQuery." }]
    },
    {
      id: "native-capabilities",
      title: { en: "Native capabilities: location, audio, background tasks", ar: "قدرات الجهاز: الموقع والصوت والشغل في الخلفية" },
      tldr: { en: "Background work is tightly limited by the OS. Background location needs extra permissions, a foreground service on Android and careful accuracy/battery settings. Background audio needs a media session (lock-screen controls). Ask permissions in context, explain why, and handle denial.", ar: "الشغل في الخلفية النظام بيحده جامد. الموقع في الخلفية محتاج صلاحيات زيادة، و foreground service في Android، وإعدادات دقة وبطارية بحذر. والصوت في الخلفية محتاج media session (أزرار شاشة القفل). واطلب الصلاحيات في وقتها، واشرح ليه، واتعامل مع الرفض." },
      blocks: [
        { type: "code", code: "await Location.requestForegroundPermissionsAsync();\nawait Location.requestBackgroundPermissionsAsync();          // ask only when the user starts a run\nawait Location.startLocationUpdatesAsync(RUN_TASK, {\n  accuracy: Location.Accuracy.BestForNavigation,\n  timeInterval: 1000, distanceInterval: 0,                     // 1 Hz; filter jitter in software\n  foregroundService: { notificationTitle: \"Recording your run\" },\n});\n\nawait TrackPlayer.setupPlayer({ autoHandleInterruptions: true });   // calls, other apps\nawait TrackPlayer.updateOptions({ capabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext] });" },
        { type: "projects", items: [
          { text: { en: "ONE14: found that a coarse OS distance filter dropped real movement (−17% on a 30 km run) and moved to 1 Hz high-accuracy fixes with a tuned software filter; Qur'an audio with lock-screen controls; Strava OAuth.", ar: "ONE14: اكتشف إن فلتر المسافة الخشن في النظام كان بيرمي حركة حقيقية (‎-17% على 30 كم). فنقل لـ 1 Hz بدقة عالية، مع فلتر software مظبوط. وكمان صوت القرآن مع أزرار شاشة القفل، و Strava OAuth." }, p: "one14", tab: "problems", label: "ONE14" },
          { text: { en: "Trackoo: react-native-track-player with a player context and media-session controls; Kalima: fingerprint quick sign-in and expo-speech.", ar: "Trackoo: فيه react-native-track-player مع player context وأزرار media session. و Kalima: فيه دخول سريع بالبصمة و expo-speech." }, p: "kalima", tab: "decisions", label: "Kalima" }
        ] }
      ],
      say: "On ONE14 the distance bug came from an OS-level distance filter discarding real points, so we took 1 Hz high-accuracy fixes and filtered jitter ourselves — a 17% under-count on a 30 km run went away.",
      interview: [{ q: "How do you keep GPS tracking accurate without killing the battery?", a: { en: "Choose accuracy by activity, take frequent fixes only while recording, filter jitter in software (accuracy threshold, minimum movement), fuse with the pedometer when GPS is weak, and stop updates as soon as the session ends.", ar: "اختار الدقة حسب النشاط. وخد قراءات كتير وقت التسجيل بس. وفلتر الرعشة في الـ software (حد للدقة، وأقل حركة). وادمج مع الـ pedometer لما الـ GPS يضعف. ووقّف التحديثات أول ما الـ session تخلص." } }],
      quiz: [{ q: { en: "Android requirement for long background location?", ar: "شرط Android للموقع في الخلفية لمدة طويلة؟" }, a: { en: "A foreground service with a visible notification (plus background permission).", ar: "Foreground service بإشعار ظاهر (ومعاه صلاحية الخلفية)." } }],
      quick: [{ en: "Ask permissions in context; foreground service for background location; media session for audio; filter GPS jitter in software.", ar: "اطلب الصلاحيات في وقتها. و foreground service للموقع في الخلفية. و media session للصوت. وفلتر رعشة الـ GPS في الـ software." }]
    },
    {
      id: "rn-data",
      title: { en: "Storage, offline and push notifications", ar: "التخزين والـ offline والإشعارات" },
      tldr: { en: "AsyncStorage (simple, async), MMKV (fast key-value), SQLite (structured, queries, offline queues), SecureStore/Keychain (secrets). Persist the query cache for instant starts. Push notifications: get a device token (FCM/APNs via Expo), store it server-side, handle taps to deep-link.", ar: "AsyncStorage (بسيط و async)، و MMKV (key-value سريع)، و SQLite (منظم وفيه queries وطوابير offline)، و SecureStore أو Keychain (للأسرار). وخزّن كاش الـ queries علشان التطبيق يفتح على طول. والإشعارات: هات device token (FCM أو APNs عن طريق Expo)، وخزنه على السيرفر، واتعامل مع الضغط عليه بـ deep link." },
      blocks: [
        { type: "compare", cols: [{ en: "Store", ar: "التخزين" }, { en: "Use for", ar: "استخدمه لـ" }], rows: [
          ["SecureStore / Keychain", { en: "Tokens, credentials", ar: "توكنات، بيانات دخول" }],
          ["MMKV", { en: "Settings, small fast reads, cache persistence", ar: "إعدادات، قراية صغيرة سريعة، تخزين الكاش" }],
          ["SQLite", { en: "Lots of records, queries, offline write queues", ar: "ريكوردات كتير، queries، طوابير كتابة offline" }],
          ["AsyncStorage", { en: "Simple values (slower, unencrypted)", ar: "قيم بسيطة (أبطأ ومن غير تشفير)" }]
        ] },
        { type: "projects", items: [{ text: { en: "Kalima: SQLite offline queue with idempotent replay, persisted query cache, credentials in the Keychain behind fingerprint, scheduled reminders. ONE14: Firebase Messaging, persistent outbox.", ar: "Kalima: طابور offline في SQLite بإعادة idempotent، وكاش queries متخزن، وبيانات الدخول في الـ Keychain ورا البصمة، وتذكيرات متجدولة. و ONE14: Firebase Messaging و outbox متخزن." }, p: "kalima", tab: "decisions", label: "Kalima" }] }
      ],
      say: "Secrets go to the Keychain, settings and cache to MMKV, records and offline queues to SQLite — and the query cache is persisted so the app opens with data.",
      interview: [{ q: "Where do you store an auth token on mobile?", a: { en: "SecureStore (Keychain/Keystore) — encrypted by the OS. Never AsyncStorage for secrets.", ar: "SecureStore (Keychain أو Keystore) — متشفر من النظام. وعمرك ما تحط أسرار في AsyncStorage." } }],
      quiz: [{ q: { en: "Store for a 5,000-item offline queue?", ar: "تخزين لطابور offline فيه 5000 عنصر؟" }, a: { en: "SQLite.", ar: "SQLite." } }],
      quick: [{ en: "Keychain for secrets · MMKV fast KV · SQLite records/queues · persist query cache · push tokens server-side.", ar: "Keychain للأسرار · MMKV للـ KV السريع · SQLite للريكوردات والطوابير · خزّن الكاش · توكنات الإشعارات على السيرفر." }]
    },
    {
      id: "release",
      title: { en: "Shipping: builds, signing, stores and crash reporting", ar: "النشر: الـ builds والتوقيع والـ stores وتقارير الأعطال" },
      tldr: { en: "Every store build needs signing (keystore on Android, certificates/profiles on iOS — EAS can manage them), version and build numbers, store listings and privacy forms. Test through internal tracks/TestFlight, monitor crashes (Crashlytics/Sentry), roll out in stages.", ar: "كل build للـ store محتاج توقيع (keystore في Android، و certificates و profiles في iOS — و EAS يقدر يديرهم)، و version و build number، وصفحة الـ store وفورمز الخصوصية. اختبر عن طريق internal tracks و TestFlight، وراقب الأعطال (Crashlytics أو Sentry)، وانشر على مراحل." },
      blocks: [
        { type: "projects", items: [{ text: { en: "ONE14: live on Google Play (100+ downloads) and the App Store (08/2026); Crashlytics; on-device QA through TestFlight and internal Android builds.", ar: "ONE14: موجود على Google Play (أكتر من 100 تنزيل)، وعلى الـ App Store (08/2026). وفيه Crashlytics. والاختبار على الأجهزة كان عن طريق TestFlight، و builds داخلية لـ Android." }, p: "one14", tab: "overview", label: "ONE14" }] }
      ],
      say: "We shipped through TestFlight and internal Android tracks first, monitored crashes with Crashlytics, then released to both stores.",
      interview: [{ q: "A crash appears only in production builds. How do you debug it?", a: { en: "Crash reports with source maps/dSYMs uploaded, reproduce with a release build locally, check things that differ from dev (minification, Hermes bytecode, env vars, missing permissions), and add logging around the failing path.", ar: "ببص في تقارير الأعطال، بعد ما أرفع الـ source maps والـ dSYMs. وبعيد المشكلة بـ release build عندي. وبشوف الحاجات اللي مختلفة عن الـ development: الـ minification، و Hermes bytecode، والـ env vars، والصلاحيات الناقصة. وبزوّد logging حوالين المكان اللي بيقع فيه." } }],
      quiz: [{ q: { en: "iOS beta testing channel?", ar: "قناة الـ beta في iOS؟" }, a: { en: "TestFlight.", ar: "TestFlight." } }],
      quick: [{ en: "Signing + versions + listings; TestFlight/internal tracks; Crashlytics/Sentry with source maps; staged rollout.", ar: "توقيع، و versions، وصفحات الـ store. و TestFlight و internal tracks. و Crashlytics أو Sentry مع source maps. ونشر على مراحل." }]
    }
  ]
});
