// Animation & 3D — written 2026-10-29.
STUDY.fill("motion", {
  intro: { en: "Motion that feels smooth and serves the content: CSS vs JS animation, GSAP and ScrollTrigger, Motion (Framer Motion), smooth scrolling with Lenis, Three.js and React Three Fiber, and keeping it fast and accessible.", ar: "حركة ناعمة وبتخدم المحتوى: CSS ولا JS animation، و GSAP و ScrollTrigger، و Motion (Framer Motion)، والـ smooth scroll بـ Lenis، و Three.js و React Three Fiber، وإزاي تخليها سريعة و accessible." },
  topics: [
    {
      id: "css-vs-js",
      title: { en: "CSS transitions vs JS animation libraries", ar: "CSS transitions ولا مكتبات JS" },
      tldr: { en: "CSS transitions/animations for simple state changes (hover, open/close) — cheap and declarative. JS libraries for sequencing, scroll-driven timelines, physics, gestures and layout animations. Either way, animate <code>transform</code> and <code>opacity</code>.", ar: "CSS transitions و animations للتغييرات البسيطة (hover، فتح وقفل) — رخيصة وتصريحية. ومكتبات JS للتسلسل، و timelines مربوطة بالـ scroll، والفيزيا، والـ gestures، وأنيميشن الـ layout. وفي الحالتين اعمل animation لـ <code>transform</code> و <code>opacity</code>." },
      blocks: [
        { type: "compare", cols: [{ en: "Tool", ar: "الأداة" }, { en: "Best for", ar: "أحسن لـ" }], rows: [
          ["CSS transition / @keyframes", { en: "Hover, toggles, loaders, simple enter/exit", ar: "Hover، toggles، loaders، دخول وخروج بسيط" }],
          ["CSS scroll-driven animations", { en: "Simple scroll progress effects, no JS", ar: "تأثيرات بسيطة مع الـ scroll، من غير JS" }],
          ["GSAP", { en: "Complex timelines, scroll storytelling, SVG, text splitting", ar: "Timelines معقدة، قصص بالـ scroll، SVG، تقسيم النص" }],
          ["Motion (Framer Motion)", { en: "React-native-feeling UI: layout, presence (exit), gestures, springs", ar: "حركة UI في React: layout، و exit، و gestures، و springs" }],
          ["Web Animations API", { en: "Imperative animations without a library", ar: "أنيميشن imperative من غير مكتبة" }]
        ] }
      ],
      say: "CSS handles simple state changes; GSAP handles storytelling timelines and Motion handles React UI transitions — all on transform and opacity.",
      interview: [{ q: "Why animate transform instead of top/left?", a: { en: "top/left trigger layout on every frame; transform/opacity are handled by the compositor on the GPU, so they stay at 60 fps even when the main thread is busy.", ar: "top و left بيعملوا layout مع كل frame؛ أما transform و opacity بيتعاملوا في الـ compositor على الـ GPU، فبيفضلوا 60fps حتى لو الـ main thread مشغول." } }],
      quiz: [{ q: { en: "Animate a modal's exit in React — which library feature?", ar: "أنيميشن خروج modal في React — أنهي ميزة؟" }, a: { en: "Motion's AnimatePresence (exit animations).", ar: "AnimatePresence في Motion (أنيميشن الخروج)." } }],
      quick: [{ en: "CSS for simple; GSAP for timelines/scroll; Motion for React UI; transform + opacity only.", ar: "CSS للبسيط؛ GSAP للـ timelines والـ scroll؛ Motion لـ UI في React؛ transform و opacity بس." }]
    },
    {
      id: "gsap",
      title: { en: "GSAP and ScrollTrigger in React", ar: "GSAP و ScrollTrigger في React" },
      tldr: { en: "Build timelines (<code>gsap.timeline()</code>), tie them to scroll with ScrollTrigger (<code>scrub</code>, <code>pin</code>, <code>start/end</code>), and in React create them inside <code>useGSAP</code> (or a context) so they're scoped and reverted on unmount. Use <code>gsap.matchMedia</code> for responsive and reduced-motion variants.", ar: "اعمل timelines (<code>gsap.timeline()</code>)، واربطها بالـ scroll بـ ScrollTrigger (<code>scrub</code> و <code>pin</code> و <code>start/end</code>)، وفي React اعملها جوه <code>useGSAP</code> (أو context) علشان تبقى محصورة وترجع مع الـ unmount. واستخدم <code>gsap.matchMedia</code> للـ responsive والـ reduced-motion." },
      blocks: [
        { type: "code", code: "useGSAP(() => {\n  const mm = gsap.matchMedia();\n  mm.add(\"(min-width: 768px) and (prefers-reduced-motion: no-preference)\", () => {\n    gsap.timeline({ scrollTrigger: { trigger: \".process\", start: \"top top\", end: \"+=1500\", scrub: true, pin: true } })\n      .from(\".card\", { yPercent: 40, opacity: 0, stagger: 0.2 })\n      .to(\".ring\", { rotate: 180 }, \"<\");\n  });\n}, { scope: containerRef });   // selectors scoped, everything reverted on unmount" },
        { type: "projects", items: [{ text: { en: "Osloop website (scroll-driven process ring, held cards, hero), ARVAmethod (ScrollTrigger, SplitText, Lenis, four design directions), Makka Juice (cinematic scroll), The Code and Zeustra.", ar: "موقع Osloop (حلقة الـ process مع الـ scroll، كروت ثابتة، الـ hero)، و ARVAmethod (ScrollTrigger و SplitText و Lenis وأربع اتجاهات ديزاين)، و Makka Juice (scroll سينمائي)، و The Code و Zeustra." } }] }
      ],
      say: "In React I create GSAP timelines inside useGSAP with a scope, so they clean up on unmount, and matchMedia gives separate desktop, mobile and reduced-motion versions.",
      interview: [{ q: "Why do GSAP animations duplicate or break in React?", a: { en: "Strict Mode mounts twice and re-renders re-run setup; without cleanup you stack timelines and ScrollTriggers. useGSAP/gsap.context reverts everything created inside it.", ar: "الـ Strict Mode بيعمل mount مرتين والـ re-renders بتعيد الإعداد؛ ومن غير cleanup بتتكدس timelines و ScrollTriggers. و useGSAP أو gsap.context بيرجّع كل اللي اتعمل جواه." },
        follow: [{ q: "scrub vs toggleActions?", a: { en: "scrub ties progress directly to scroll position (scrolling back reverses it); toggleActions plays/reverses the animation when crossing start/end points.", ar: "الـ scrub بيربط التقدم بمكان الـ scroll على طول (الـ scroll لورا بيرجعه)؛ و toggleActions بيشغل أو يرجّع الأنيميشن لما تعدي نقط البداية والنهاية." } }] }],
      quiz: [{ q: { en: "Pin a section while its timeline plays?", ar: "تثبت section وهو الـ timeline بتاعه شغال؟" }, a: { en: "ScrollTrigger pin: true (with scrub and an end distance).", ar: "ScrollTrigger pin: true (مع scrub ومسافة نهاية)." } }],
      quick: [{ en: "Timelines + ScrollTrigger (scrub, pin); useGSAP with scope for cleanup; matchMedia for responsive/reduced motion.", ar: "Timelines و ScrollTrigger (scrub و pin)؛ useGSAP بـ scope للـ cleanup؛ matchMedia للـ responsive والـ reduced motion." }]
    },
    {
      id: "framer-lenis",
      title: { en: "Motion (Framer Motion) and Lenis", ar: "Motion (Framer Motion) و Lenis" },
      tldr: { en: "Motion animates React state declaratively: <code>animate</code>, <code>AnimatePresence</code> for exit, <code>layout</code> for shared-layout transitions, springs and gestures. Lenis adds inertia smooth scrolling that keeps native scroll semantics; sync GSAP's ScrollTrigger with Lenis's scroll events.", ar: "Motion بيعمل أنيميشن لـ state بتاع React بشكل تصريحي: <code>animate</code>، و <code>AnimatePresence</code> للخروج، و <code>layout</code> لتحولات الـ layout المشتركة، و springs و gestures. و Lenis بيزود smooth scroll بإحساس القصور الذاتي ومحافظ على سلوك الـ scroll الأصلي؛ وزامن ScrollTrigger بتاع GSAP مع أحداث scroll بتاعة Lenis." },
      blocks: [
        { type: "code", code: "<AnimatePresence>\n  {open && <motion.div key=\"panel\" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} />}\n</AnimatePresence>\n\nconst lenis = new Lenis();\nlenis.on(\"scroll\", ScrollTrigger.update);\ngsap.ticker.add((t) => lenis.raf(t * 1000));\ngsap.ticker.lagSmoothing(0);" },
        { type: "projects", items: [{ text: { en: "ARVAmethod lazy-loads Motion only for the menu; the Osloop site uses Lenis + GSAP + Motion.", ar: "ARVAmethod بيحمل Motion بس للمنيو وقت الحاجة؛ وموقع Osloop بيستخدم Lenis و GSAP و Motion." } }] }
      ],
      say: "I use Motion for React UI transitions like exits and layout changes, Lenis for smooth scroll synced with ScrollTrigger, and I lazy-load them where they're only needed in one place.",
      interview: [{ q: "Does smooth scrolling hurt accessibility?", a: { en: "It can: disable it for prefers-reduced-motion, keep keyboard/anchor scrolling working, and never block native scroll.", ar: "ممكن: اقفله مع prefers-reduced-motion، وخلي الـ scroll بالكيبورد والـ anchors شغال، وعمرك ما توقف الـ scroll الأصلي." } }],
      quiz: [{ q: { en: "Which Motion component enables exit animations?", ar: "أنهي component في Motion بيسمح بأنيميشن الخروج؟" }, a: { en: "AnimatePresence.", ar: "AnimatePresence." } }],
      quick: [{ en: "Motion: animate, AnimatePresence, layout, springs; Lenis synced with ScrollTrigger; off for reduced motion.", ar: "Motion: animate و AnimatePresence و layout و springs؛ Lenis متزامن مع ScrollTrigger؛ مقفول مع reduced motion." }]
    },
    {
      id: "three",
      title: { en: "Three.js and React Three Fiber", ar: "Three.js و React Three Fiber" },
      tldr: { en: "A 3D scene = renderer + scene + camera + meshes (geometry + material) + lights, redrawn every frame. React Three Fiber writes the scene as JSX and runs a render loop (<code>useFrame</code>); drei adds helpers (controls, environment, text, loaders). Load models as compressed GLB.", ar: "المشهد الـ 3D = renderer و scene و camera و meshes (geometry و material) وإضاءة، بيترسم كل frame. و React Three Fiber بيكتب المشهد كـ JSX وبيشغل render loop (<code>useFrame</code>)؛ و drei بيزود helpers (controls، environment، نص، loaders). وحمّل الموديلات كـ GLB مضغوط." },
      blocks: [
        { type: "code", code: "<Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>\n  <Environment preset=\"city\" />\n  <Suspense fallback={null}><Logo /></Suspense>\n  <OrbitControls enableZoom={false} />\n</Canvas>\n\nfunction Logo() {\n  const { scene } = useGLTF(\"/osloop-icon.glb\");\n  const ref = useRef<THREE.Group>(null);\n  useFrame((_, dt) => { ref.current!.rotation.y += dt * 0.3; });   // mutate in the loop, don't setState\n  return <primitive ref={ref} object={scene} />;\n}" },
        { type: "list", title: { en: "Keeping 3D fast", ar: "إزاي الـ 3D يفضل سريع" }, items: [
          { en: "Cap device pixel ratio (<code>dpr={[1, 2]}</code>), compress models (Draco/meshopt) and textures (KTX2).", ar: "حط حد للـ pixel ratio (<code>dpr={[1, 2]}</code>)، واضغط الموديلات (Draco و meshopt) والـ textures (KTX2)." },
          { en: "Mutate objects in <code>useFrame</code> instead of React state; reuse geometries/materials; instancing for many copies.", ar: "عدّل الـ objects في <code>useFrame</code> بدل state بتاع React؛ وأعد استخدام الـ geometries والـ materials؛ و instancing للنسخ الكتير." },
          { en: "Pause rendering when off-screen (<code>frameloop=\"demand\"</code>) and lazy-load the whole canvas.", ar: "وقف الرسم لما يبقى برا الشاشة (<code>frameloop=\"demand\"</code>) واعمل lazy-load للـ canvas كله." }
        ] },
        { type: "projects", items: [{ text: { en: "Osloop: draggable 3D glass ∞ hero, a 3D markets globe, a process ring and a script exporting the 3D brand icon to GLB/OBJ/STL; Orchard and Makka Juice: Three.js/WebGL scenes.", ar: "Osloop: hero بـ ∞ 3D من الـ glass بيتسحب، و globe 3D للأسواق، وحلقة process، و script بيطلع أيقونة البراند 3D بصيغ GLB و OBJ و STL؛ و البستان و Makka Juice: مشاهد Three.js و WebGL." } }] }
      ],
      say: "In React Three Fiber I animate inside useFrame by mutating refs, cap the pixel ratio, compress models and lazy-load the canvas so 3D never blocks the page.",
      interview: [{ q: "Why not setState inside useFrame?", a: { en: "useFrame runs ~60 times a second; setState would re-render React each frame. Mutate the Three.js object through a ref instead.", ar: "useFrame بيشتغل حوالي 60 مرة في الثانية؛ و setState هيعمل re-render لـ React كل frame. عدّل object الـ Three.js عن طريق ref بداله." } }],
      quiz: [{ q: { en: "Preferred 3D model format for the web?", ar: "صيغة الموديل الـ 3D المفضلة للويب؟" }, a: { en: "glTF/GLB (compressed).", ar: "glTF أو GLB (مضغوط)." } }],
      quick: [{ en: "Scene = renderer, camera, meshes, lights; R3F JSX + useFrame (mutate refs); GLB + compression; cap dpr; lazy canvas.", ar: "المشهد = renderer و camera و meshes وإضاءة؛ R3F بـ JSX و useFrame (عدّل refs)؛ GLB مضغوط؛ حد للـ dpr؛ canvas بـ lazy." }]
    },
    {
      id: "motion-ux",
      title: { en: "Motion with purpose", ar: "حركة ليها هدف" },
      tldr: { en: "Animation should explain (where something came from, what changed), not decorate. Keep UI transitions short (150–300 ms), use easing (ease-out for entering), avoid animating on every scroll pixel without reason, and give a reduced-motion version.", ar: "الأنيميشن لازم يوضح (الحاجة جت منين، إيه اللي اتغير)، مش زينة وبس. خلي تحولات الـ UI قصيرة (150–300ms)، واستخدم easing (ease-out للدخول)، ومتعملش أنيميشن مع كل بيكسل scroll من غير سبب، واعمل نسخة reduced-motion." },
      blocks: [
        { type: "projects", items: [{ text: { en: "Kalima: “one motion language” across the app; Osloop: loader options built in a /loaders lab and chosen with the client.", ar: "Kalima: «لغة حركة واحدة» في التطبيق كله؛ و Osloop: اختيارات للـ loader اتعملت في /loaders lab واتختارت مع العميل." }, p: "kalima", tab: "overview", label: "Kalima" }] }
      ],
      say: "Every animation has a job — show cause and effect or guide attention — with short durations, consistent easing and a reduced-motion fallback.",
      interview: [{ q: "How do you present motion options to a client?", a: { en: "Prototype a few directions side by side (a small lab page), on real devices, with the performance cost visible, and let them pick against the brand goals.", ar: "اعمل prototype لكذا اتجاه جنب بعض (صفحة lab صغيرة)، على أجهزة حقيقية، وتكلفة الأداء ظاهرة، وسيبهم يختاروا حسب أهداف البراند." } }],
      quiz: [{ q: { en: "Typical duration for a UI transition?", ar: "المدة المعتادة لتحول UI؟" }, a: { en: "About 150–300 ms.", ar: "حوالي 150–300ms." } }],
      quick: [{ en: "Motion explains; 150–300 ms; ease-out to enter; one motion language; reduced-motion version.", ar: "الحركة بتوضح؛ 150–300ms؛ ease-out للدخول؛ لغة حركة واحدة؛ نسخة reduced-motion." }]
    }
  ]
});
