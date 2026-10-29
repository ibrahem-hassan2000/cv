// JavaScript — written 2026-10-29. Output-style traps live in data/js-output.js.
STUDY.fill("javascript", {
  intro: { en: "The language itself: types and coercion, scope and closures, this, prototypes, the event loop, promises, references and copying, arrays, modules, DOM events and memory.", ar: "اللغة نفسها. الـ types والتحويل بينها، والـ scope والـ closures، والـ this، والـ prototypes. وكمان الـ event loop، والـ promises، والـ references والنسخ، والـ arrays، والـ modules، وأحداث الـ DOM، والميموري." },
  topics: [
    {
      id: "types",
      title: { en: "Types, coercion and equality", ar: "الـ Types والتحويل والمساواة" },
      tldr: { en: "7 primitives (string, number, bigint, boolean, undefined, symbol, null) are copied by value; everything else is an object passed by reference. <code>==</code> converts types first, <code>===</code> doesn't. <code>??</code> only falls back on null/undefined, <code>||</code> on any falsy value.", ar: "فيه 7 primitives بتتنسخ بالقيمة: string و number و bigint و boolean و undefined و symbol و null. وأي حاجة تانية object، وبيتبعت بالـ reference. الـ <code>==</code> بيحوّل الأنواع الأول، و <code>===</code> لأ. والـ <code>??</code> بيرجع للبديل بس مع null و undefined، أما <code>||</code> فبيرجع له مع أي قيمة falsy." },
      blocks: [
        { type: "compare", title: { en: "typeof surprises", ar: "مفاجآت typeof" }, cols: [{ en: "Expression", ar: "التعبير" }, { en: "Result", ar: "الناتج" }, { en: "Why", ar: "ليه" }], rows: [
          ["<code>typeof null</code>", "\"object\"", { en: "A bug from the first JS version, kept for compatibility", ar: "Bug من أول نسخة JS، فضل علشان التوافق" }],
          ["<code>typeof []</code>", "\"object\"", { en: "Arrays are objects — use <code>Array.isArray</code>", ar: "الـ arrays objects — استخدم <code>Array.isArray</code>" }],
          ["<code>typeof function(){}</code>", "\"function\"", { en: "Callable objects get their own tag", ar: "الـ objects اللي بتتنادى ليها tag لوحدها" }],
          ["<code>typeof NaN</code>", "\"number\"", { en: "NaN is a numeric value; check with <code>Number.isNaN</code>", ar: "NaN نوعها number. اتأكد منها بـ <code>Number.isNaN</code>" }]
        ] },
        { type: "list", title: { en: "The 8 falsy values", ar: "الـ 8 قيم falsy" }, items: [
          { en: "<code>false</code>, <code>0</code>, <code>-0</code>, <code>0n</code>, <code>\"\"</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code>. Everything else is truthy — including <code>[]</code>, <code>{}</code> and <code>\"0\"</code>.", ar: "<code>false</code>، <code>0</code>، <code>-0</code>، <code>0n</code>، <code>\"\"</code>، <code>null</code>، <code>undefined</code>، <code>NaN</code>. أي حاجة تانية truthy — حتى <code>[]</code> و <code>{}</code> و <code>\"0\"</code>." }
        ] },
        { type: "code", title: { en: "?? vs || — a real bug", ar: "?? ولا || — bug حقيقي" }, code: "const pageSize = settings.pageSize || 10;   // user chose 0? you get 10 ✗\nconst pageSize = settings.pageSize ?? 10;   // only null/undefined fall back ✓\n\nuser?.address?.city      // undefined instead of a crash\n\n// == rules worth knowing\nnull == undefined  // true  (and equal to nothing else)\n\"\" == 0            // true  (string → number)\n[] == false        // true  ([] → \"\" → 0)\nNaN === NaN        // false — use Number.isNaN / Object.is" },
        { type: "pitfalls", items: [
          { en: "<code>0.1 + 0.2 !== 0.3</code> — floating point. For money, use integer cents or a decimal library.", ar: "<code>0.1 + 0.2 !== 0.3</code> — floating point. للفلوس استخدم قروش (integers) أو مكتبة decimal." },
          { en: "<code>{count && &lt;Badge/&gt;}</code> renders “0” in React when count is 0. Use <code>count &gt; 0 &&</code>.", ar: "<code>{count && &lt;Badge/&gt;}</code> في React بيطبع «0» لما الـ count يبقى صفر. استخدم <code>count &gt; 0 &&</code>." }
        ] },
        { type: "projects", items: [{ text: { en: "Bites invoices and the AHS billing formulas are money: amounts must avoid float drift; AHS also checks for non-finite results.", ar: "فواتير Bites ومعادلات الفواتير في AHS فيها فلوس، فلازم تتجنب أخطاء الـ float. و AHS كمان بيتأكد إن النتيجة مش infinite أو NaN." }, p: "ahs", tab: "decisions", label: "AHS" }] }
      ],
      say: "I use strict equality, ?? for defaults so 0 and empty strings stay valid, and never trust floats for money.",
      interview: [
        { q: "== vs ===?", a: { en: "<code>===</code> compares type and value with no conversion. <code>==</code> applies coercion rules first. I use <code>===</code> everywhere; the one common exception is <code>x == null</code> to catch both null and undefined.", ar: "الـ <code>===</code> بيقارن النوع والقيمة من غير تحويل. والـ <code>==</code> بيطبق قواعد التحويل الأول. أنا بستخدم <code>===</code> في كل حتة. والاستثناء المشهور <code>x == null</code>، علشان يمسك null و undefined مع بعض." },
          follow: [{ q: "How does Object.is differ from ===?", a: { en: "<code>Object.is(NaN, NaN)</code> is true and <code>Object.is(0, -0)</code> is false. React uses Object.is to compare state and deps.", ar: "<code>Object.is(NaN, NaN)</code> بيرجع true و <code>Object.is(0, -0)</code> بيرجع false. و React بيستخدم Object.is يقارن الـ state والـ deps." } }] },
        { q: "Primitive vs reference types?", a: { en: "Primitives are immutable and copied by value. Objects (arrays, functions, dates) are passed as a reference to the same object, so mutating through one variable changes what others see.", ar: "الـ primitives مش بتتغير وبتتنسخ بالقيمة. الـ objects (arrays، functions، dates) بيتبعت reference لنفس الـ object، فلو عدلت من متغير واحد التاني هيشوف التعديل." } }
      ],
      quiz: [
        { q: { en: "<code>Boolean([])</code>?", ar: "<code>Boolean([])</code>؟" }, a: { en: "true — every object is truthy.", ar: "true — أي object truthy." } },
        { q: { en: "<code>0 ?? 5</code> and <code>0 || 5</code>?", ar: "<code>0 ?? 5</code> و <code>0 || 5</code>؟" }, a: { en: "0 and 5.", ar: "0 و 5." } }
      ],
      quick: [
        { en: "typeof null === \"object\"; arrays → Array.isArray; NaN → Number.isNaN.", ar: "typeof null بيرجع \"object\". والـ arrays اعرفها بـ Array.isArray. والـ NaN بـ Number.isNaN." },
        { en: "?? for defaults (keeps 0 and \"\"); === always; x == null catches both.", ar: "استخدم ?? للقيم الافتراضية، لأنه بيحافظ على 0 و \"\". واستخدم === دايمًا. و x == null بيمسك null و undefined مع بعض." }
      ]
    },
    {
      id: "hoisting",
      title: { en: "var, let, const, hoisting and the TDZ", ar: "var و let و const والـ hoisting والـ TDZ" },
      tldr: { en: "Declarations are registered before code runs. <code>var</code> is function-scoped and starts as <code>undefined</code>; <code>let</code>/<code>const</code> are block-scoped and sit in the Temporal Dead Zone until their line runs. Function declarations are fully hoisted.", ar: "التعريفات بتتسجل قبل ما الكود يشتغل. الـ <code>var</code> مداه الـ function، وبيبدأ بـ <code>undefined</code>. والـ <code>let</code> و <code>const</code> مداهم الـ block، وبيفضلوا في الـ Temporal Dead Zone لحد ما سطرهم يشتغل. والـ function declarations بتترفع كاملة." },
      blocks: [
        { type: "compare", cols: ["", "var", "let", "const"], rows: [
          [{ en: "Scope", ar: "المدى" }, "function", "block", "block"],
          [{ en: "Before its line", ar: "قبل سطره" }, "undefined", { en: "ReferenceError (TDZ)", ar: "ReferenceError (TDZ)" }, { en: "ReferenceError (TDZ)", ar: "ReferenceError (TDZ)" }],
          [{ en: "Re-assign", ar: "تغيير القيمة" }, { en: "Yes", ar: "أيوه" }, { en: "Yes", ar: "أيوه" }, { en: "No (but objects inside can change)", ar: "لأ (بس محتوى الـ object يتغير)" }],
          [{ en: "New binding per loop iteration", ar: "binding جديد لكل لفة" }, { en: "No", ar: "لأ" }, { en: "Yes", ar: "أيوه" }, { en: "Yes (for…of)", ar: "أيوه (for…of)" }],
          [{ en: "Creates window property (top level)", ar: "بيعمل property على window" }, { en: "Yes", ar: "أيوه" }, { en: "No", ar: "لأ" }, { en: "No", ar: "لأ" }]
        ] },
        { type: "code", code: "sayHi();              // works: function declarations are hoisted with their body\nfunction sayHi() {}\n\ngreet();              // TypeError: greet is not a function (var greet is undefined)\nvar greet = () => {};\n\nconsole.log(x);       // ReferenceError: Cannot access 'x' before initialization\nlet x = 1;" }
      ],
      say: "let and const are hoisted too, but they stay in the temporal dead zone until their declaration runs, which turns silent undefined bugs into errors.",
      interview: [{ q: "Are let and const hoisted?", a: { en: "Yes — the binding is created at the start of the block, which is why accessing it early throws (TDZ) instead of reading an outer variable. They're just not initialised like var.", ar: "أيوه — الـ binding بيتعمل في أول الـ block، وده سبب إن استخدامه بدري بيعمل error (TDZ) بدل ما يقرا متغير من برا. بس مش بيتعملهم initialise زي الـ var." } }],
      quiz: [{ q: { en: "<code>const arr = []; arr.push(1)</code> — allowed?", ar: "<code>const arr = []; arr.push(1)</code> — مسموح؟" }, a: { en: "Yes. const blocks re-assignment, not mutation.", ar: "أيوه. الـ const بيمنع إعادة التعيين، مش التعديل." } }],
      quick: [{ en: "var → function scope, undefined early; let/const → block scope, TDZ; const ≠ immutable.", ar: "الـ var مداه الـ function، وبيبقى undefined قبل سطره. والـ let/const مداهم الـ block، وعندهم TDZ. والـ const مش معناها immutable." }]
    },
    {
      id: "closures",
      title: { en: "Scope and closures", ar: "الـ Scope والـ Closures" },
      tldr: { en: "A closure is a function that keeps access to the variables of the scope where it was created, even after that scope finished. It powers private state, factories, debounce — and React's stale-closure bugs.", ar: "الـ closure هو function فاكرة متغيرات الـ scope اللي اتعملت فيه، حتى بعد ما الـ scope ده خلص. ده اللي بيعمل الـ private state، والـ factories، والـ debounce — وكمان bugs الـ stale closure في React." },
      blocks: [
        { type: "code", title: { en: "Private state", ar: "State خاص" }, code: "function createCounter() {\n  let count = 0;                      // not reachable from outside\n  return { inc: () => ++count, get: () => count };\n}\nconst c = createCounter();\nc.inc(); c.inc(); c.get();   // 2" },
        { type: "code", title: { en: "Stale closure in React", ar: "Stale closure في React" }, code: "function Timer() {\n  const [count, setCount] = useState(0);\n  useEffect(() => {\n    const id = setInterval(() => setCount(count + 1), 1000); // ✗ `count` is always 0 here\n    return () => clearInterval(id);\n  }, []);\n  // fixes: setCount(c => c + 1)   or   add count to deps   or   keep latest in a ref\n}", note: { en: "The interval callback closed over the <code>count</code> of the first render and never sees new values.", ar: "الـ callback بتاع الـ interval مسك <code>count</code> بتاع أول render ومش بيشوف القيم الجديدة." } },
        { type: "projects", items: [{ text: { en: "Smart FAQ row menu: handlers are read from a ref at click time (“latest ref” pattern) so memoized menus never call a stale handler.", ar: "منيو الصف في Smart FAQ: الـ handlers بتتقري من ref وقت الضغط (latest ref pattern) علشان المنيو اللي عليها memo عمرها ما تنادي handler قديم." }, p: "smartfaq", tab: "how", label: "Smart FAQ" }] }
      ],
      say: "A closure captures variables, not values at a moment — so in React a callback can hold an old render's state; I fix it with functional updates, correct deps or a ref.",
      interview: [
        { q: "What is a closure? Give a real use.", a: { en: "A function plus the variables of its birth scope. Real uses: debounce/throttle keep their timer in a closure, factory functions keep private state, React hooks rely on closures over each render's props and state.", ar: "Function ومعاها متغيرات الـ scope اللي اتولدت فيه. استخدامات حقيقية: الـ debounce و throttle شايلين التايمر في closure، والـ factories شايلة state خاص، والـ hooks في React معتمدة على closures على props و state كل render." },
          follow: [{ q: "How can closures leak memory?", a: { en: "A long-lived callback (listener, interval) keeps everything it closes over alive — e.g. a big array. Remove listeners and clear timers in cleanup.", ar: "callback عايش كتير (listener أو interval) بيخلي كل اللي ماسكه عايش — زي array كبير. شيل الـ listeners وامسح التايمرز في الـ cleanup." } }] }
      ],
      quiz: [{ q: { en: "Fix a stale count inside setInterval without adding deps?", ar: "تصلح count قديم جوه setInterval من غير ما تزود deps؟" }, a: { en: "Functional update: <code>setCount(c =&gt; c + 1)</code>.", ar: "Functional update: <code>setCount(c =&gt; c + 1)</code>." } }],
      quick: [{ en: "Closure = function + its birth scope; stale closures → functional updates, deps, or refs.", ar: "الـ closure هو function ومعاها الـ scope اللي اتولدت فيه. والـ stale closure حله functional update، أو deps، أو ref." }]
    },
    {
      id: "this",
      title: { en: "this, call, apply, bind and arrow functions", ar: "this و call و apply و bind والـ arrow functions" },
      tldr: { en: "<code>this</code> is decided by <b>how a function is called</b>: <code>new</code> → the new object; <code>call/apply/bind</code> → what you pass; <code>obj.fn()</code> → obj; plain call → undefined (strict) or the global object. Arrow functions have no own <code>this</code> — they take it from where they're written.", ar: "الـ <code>this</code> بيتحدد بـ <b>إزاي الـ function اتنادت</b>. مع <code>new</code> بيبقى الـ object الجديد. ومع <code>call/apply/bind</code> بيبقى اللي إنت بعته. ومع <code>obj.fn()</code> بيبقى الـ obj. ومع نداء عادي بيبقى undefined (في الـ strict) أو الـ global. والـ arrow function ملهاش <code>this</code> بتاعها، بتاخده من المكان اللي اتكتبت فيه." },
      blocks: [
        { type: "code", code: "const user = {\n  name: \"Sara\",\n  regular() { return this.name; },\n  arrow: () => this?.name,          // `this` of the module/outer scope, not user\n  later() { setTimeout(() => console.log(this.name), 0); } // arrow keeps user ✓\n};\nuser.regular();            // \"Sara\"\nconst f = user.regular;\nf();                       // undefined (strict) — lost the object\nf.call({ name: \"Omar\" });  // \"Omar\"\nconst bound = user.regular.bind(user); bound(); // \"Sara\"\n\nfn.call(ctx, a, b);  fn.apply(ctx, [a, b]);  const g = fn.bind(ctx, a);" },
        { type: "when", title: { en: "Arrow or regular function?", ar: "Arrow ولا function عادية؟" }, use: [{ en: "Arrow: callbacks that should keep the outer <code>this</code> (timers, array methods, handlers in class components).", ar: "Arrow: الـ callbacks اللي لازم تحافظ على <code>this</code> اللي برا (timers، array methods، handlers في class components)." }], avoid: [{ en: "Arrow as an object method or prototype method that needs <code>this</code>, or as a constructor (can't use <code>new</code>).", ar: "Arrow كـ method في object أو prototype محتاجة <code>this</code>، أو كـ constructor (مينفعش <code>new</code>)." }] }
      ],
      say: "this depends on the call site, not where the function is defined — except for arrow functions, which take this from their surrounding scope.",
      interview: [{ q: "Why did my method lose `this` when passed as a callback?", a: { en: "Passing <code>obj.method</code> detaches it; it's then called as a plain function. Bind it, wrap it in an arrow, or define it as an arrow class field.", ar: "لما تبعت <code>obj.method</code>، إنت بتفصله عن الـ object، فبيتنادى كـ function عادية. اعمله bind، أو لفّه في arrow، أو عرّفه كـ arrow class field." },
        follow: [{ q: "Can you re-bind a bound function?", a: { en: "No — the first bind wins; later bind/call can't change its this.", ar: "لأ. أول bind هو اللي بيكسب، وأي bind أو call بعده مش بيغيّر الـ this." } }] }],
      quiz: [{ q: { en: "call vs apply?", ar: "call ولا apply؟" }, a: { en: "Same thing; call takes arguments one by one, apply takes an array.", ar: "نفس الحاجة. الفرق إن call بياخد الـ arguments واحدة واحدة، و apply بياخدها array." } }],
      quick: [{ en: "new > bind/call/apply > obj.fn() > plain call; arrows inherit this.", ar: "الأولوية: new، وبعدين bind/call/apply، وبعدين obj.fn()، وبعدين النداء العادي. والـ arrow بياخد الـ this من برّه." }]
    },
    {
      id: "prototypes",
      title: { en: "Prototypes and classes", ar: "الـ Prototypes والـ Classes" },
      tldr: { en: "Objects link to a prototype; a missing property is looked up along the prototype chain. <code>class</code> is syntax over constructor functions and prototypes: methods live once on the prototype, fields live on each instance.", ar: "كل object مربوط بـ prototype. ولو الـ property مش موجودة فيه، بيدوّر عليها في سلسلة الـ prototypes. والـ <code>class</code> مجرد طريقة كتابة فوق الـ constructor functions والـ prototypes. الـ methods موجودة مرة واحدة على الـ prototype، والـ fields على كل instance." },
      blocks: [
        { type: "code", code: "class Animal {\n  #secret = 1;               // truly private field\n  constructor(name) { this.name = name; }   // own property\n  speak() { return `${this.name} makes a sound`; } // on Animal.prototype\n  static create(n) { return new Animal(n); }       // on the class itself\n}\nclass Dog extends Animal { speak() { return super.speak() + \" — woof\"; } }\n\nconst d = new Dog(\"Rex\");\nObject.getPrototypeOf(d) === Dog.prototype;            // true\nObject.getPrototypeOf(Dog.prototype) === Animal.prototype; // true\nd.hasOwnProperty(\"speak\");                              // false — it's inherited" }
      ],
      say: "Classes are sugar over prototypes: methods are shared on the prototype and lookups walk the chain.",
      interview: [{ q: "What does `new` do?", a: { en: "Creates an object linked to <code>Fn.prototype</code>, runs Fn with <code>this</code> = that object, and returns it (unless Fn returns its own object).", ar: "بيعمل object مربوط بـ <code>Fn.prototype</code>، ويشغل Fn والـ <code>this</code> = الـ object ده، ويرجعه (إلا لو Fn رجعت object تاني)." } }],
      quiz: [{ q: { en: "Where is a class method stored?", ar: "الـ class method متخزنة فين؟" }, a: { en: "Once, on <code>ClassName.prototype</code> — shared by all instances.", ar: "مرة واحدة على <code>ClassName.prototype</code> — وكل الـ instances بتشاركها." } }],
      quick: [{ en: "Property lookup walks the prototype chain; class = sugar; # = private.", ar: "البحث عن property بيمشي على السلسلة. والـ class طريقة كتابة. والـ # معناها private." }]
    },
    {
      id: "event-loop",
      title: { en: "The event loop: tasks and microtasks", ar: "الـ Event loop: الـ tasks والـ microtasks" },
      tldr: { en: "JS runs one thing at a time on the call stack. When the stack is empty, the loop runs <b>all</b> microtasks (promise callbacks, <code>queueMicrotask</code>, <code>await</code> continuations), then may render, then takes <b>one</b> task (timers, events, messages).", ar: "الـ JS بيشغّل حاجة واحدة في المرة على الـ call stack. لما الـ stack يفضى، الـ loop بيشغّل <b>كل</b> الـ microtasks: الـ promise callbacks، و <code>queueMicrotask</code>، واللي بعد <code>await</code>. وبعدين ممكن يرسم. وبعدين ياخد task <b>واحدة</b>: timer أو event أو message." },
      blocks: [
        { type: "code", code: "console.log(\"1 sync\");\nsetTimeout(() => console.log(\"5 task\"), 0);\nPromise.resolve().then(() => console.log(\"3 microtask\"));\nqueueMicrotask(() => console.log(\"4 microtask\"));\nconsole.log(\"2 sync\");\n// 1 sync, 2 sync, 3 microtask, 4 microtask, 5 task" },
        { type: "list", title: { en: "Order of one loop turn", ar: "ترتيب اللفة الواحدة" }, items: [
          { en: "Run the current script / task until the stack is empty.", ar: "شغّل الـ script أو الـ task الحالية لحد ما الـ stack يفضى." },
          { en: "Drain the microtask queue — new microtasks added now also run before anything else.", ar: "فضّي طابور الـ microtasks — وأي microtask جديدة بتتضاف بتشتغل برضه قبل أي حاجة." },
          { en: "Maybe render (requestAnimationFrame callbacks, style, layout, paint).", ar: "ممكن يرسم (requestAnimationFrame، style، layout، paint)." },
          { en: "Take the next task (setTimeout, click, fetch response event…).", ar: "خد الـ task اللي بعدها (setTimeout، click، رد fetch…)." }
        ] },
        { type: "pitfalls", items: [
          { en: "<code>setTimeout(fn, 0)</code> is not immediate — it waits for all microtasks and is clamped (≥4 ms after nesting).", ar: "<code>setTimeout(fn, 0)</code> مش فوري — بيستنى كل الـ microtasks وفيه حد أدنى (≥4ms لما يتداخل)." },
          { en: "An endless microtask chain blocks rendering forever; a long sync loop freezes the page — split heavy work or use a Web Worker.", ar: "سلسلة microtasks مش بتخلص بتوقف الرسم للأبد. و loop طويل sync بيهنّج الصفحة. قسّم الشغل التقيل، أو استخدم Web Worker." }
        ] },
        { type: "projects", items: [{ text: { en: "Smart FAQ's row menus mount on first open and use <code>requestAnimationFrame</code>-friendly updates; AHS inserts text and restores the cursor in the next frame.", ar: "المنيوهات في Smart FAQ بتتعمل لها mount أول ما تتفتح بس. و AHS بيحط النص، ويرجّع الـ cursor في الـ frame اللي بعده." }, p: "ahs", tab: "how", label: "AHS" }] }
      ],
      say: "After each task the engine drains all microtasks before it renders or picks the next task, so promise callbacks always beat setTimeout.",
      interview: [
        { q: "Explain the event loop.", a: { en: "Single call stack. Async APIs hand callbacks to queues. When the stack is empty: run all microtasks, possibly render, then one macrotask, repeat. That's why promises resolve before timers and why long sync work blocks clicks and paint.", ar: "Call stack واحد. الـ APIs الـ async بتحط الـ callbacks في طوابير. لما الـ stack يفضى: كل الـ microtasks، وبعدين ممكن رسم، وبعدين task واحدة، وهكذا. وده سبب إن الـ promises بتخلص قبل التايمرز، وإن الشغل الـ sync الطويل بيوقف الضغطات والرسم." },
          follow: [{ q: "Where does requestAnimationFrame run?", a: { en: "Right before the browser paints a frame — the right place for visual updates, about 60 times a second, paused in background tabs.", ar: "قبل ما المتصفح يرسم الفريم على طول — المكان الصح لأي تحديث شكلي، حوالي 60 مرة في الثانية، وبيقف في التابات اللي في الخلفية." } },
                   { q: "Is async/await a different mechanism?", a: { en: "No. Code after <code>await</code> is a microtask continuation of a promise.", ar: "لأ. الكود اللي بعد <code>await</code> هو microtask بيكمل الـ promise." } }] }
      ],
      quiz: [{ q: { en: "Promise.then vs setTimeout 0 — which logs first?", ar: "Promise.then ولا setTimeout 0 — مين يطبع الأول؟" }, a: { en: "Promise.then (microtask).", ar: "Promise.then (microtask)." } }],
      quick: [{ en: "sync → all microtasks → render → one task. await = microtask.", ar: "sync ← كل الـ microtasks ← رسم ← task واحدة. await = microtask." }]
    },
    {
      id: "promises",
      title: { en: "Promises, async/await and cancellation", ar: "الـ Promises و async/await والإلغاء" },
      tldr: { en: "A promise is pending → fulfilled or rejected, once. <code>async</code> functions always return a promise; <code>await</code> pauses only that function. Combine with <code>all</code> (fail fast), <code>allSettled</code> (every result), <code>race</code> (first settled), <code>any</code> (first success). Cancel fetches with <code>AbortController</code>.", ar: "الـ promise بيبدأ pending، وبعدين يبقى fulfilled أو rejected، ومرة واحدة بس. والـ <code>async</code> function دايمًا بترجّع promise. و <code>await</code> بيوقف الـ function دي بس. ولو عايز تجمّع كذا promise: <code>all</code> بيقع مع أول فشل، و <code>allSettled</code> بيديك كل النتايج، و <code>race</code> بياخد أول واحد يخلص، و <code>any</code> بياخد أول نجاح. وتلغي الـ fetch بـ <code>AbortController</code>." },
      blocks: [
        { type: "compare", cols: [{ en: "Combinator", ar: "الطريقة" }, { en: "Resolves when", ar: "بتنجح لما" }, { en: "Rejects when", ar: "بتفشل لما" }, { en: "Use for", ar: "استخدمها لـ" }], rows: [
          ["Promise.all", { en: "All fulfil", ar: "كلهم ينجحوا" }, { en: "First rejection", ar: "أول فشل" }, { en: "Data you need together", ar: "داتا محتاجها كلها مع بعض" }],
          ["Promise.allSettled", { en: "All settle", ar: "كلهم يخلصوا" }, { en: "Never", ar: "أبدًا" }, { en: "Batch actions, show each result", ar: "أكشنز جماعية وتعرض نتيجة كل واحدة" }],
          ["Promise.race", { en: "First settles (success)", ar: "أول واحد يخلص (نجاح)" }, { en: "First settles (failure)", ar: "أول واحد يخلص (فشل)" }, { en: "Timeouts", ar: "Timeouts" }],
          ["Promise.any", { en: "First fulfils", ar: "أول نجاح" }, { en: "All reject (AggregateError)", ar: "كلهم يفشلوا (AggregateError)" }, { en: "Fastest mirror / fallback", ar: "أسرع مصدر / بديل" }]
        ] },
        { type: "code", code: "// parallel, not sequential\nconst [user, orders] = await Promise.all([getUser(id), getOrders(id)]);\n\n// cancel an outdated request (search-as-you-type)\nconst controller = new AbortController();\nfetch(url, { signal: controller.signal })\n  .catch((e) => { if (e.name !== \"AbortError\") throw e; });\ncontroller.abort();\n\n// await in a loop runs one after another — use Promise.all when they're independent\nfor (const id of ids) await save(id);           // sequential (sometimes wanted: rate limits)\nawait Promise.all(ids.map(save));              // parallel" },
        { type: "pitfalls", items: [
          { en: "Forgetting <code>return</code> inside <code>.then</code> breaks the chain (next step gets undefined).", ar: "لو نسيت <code>return</code> جوه <code>.then</code> السلسلة بتتقطع (الخطوة اللي بعدها تاخد undefined)." },
          { en: "<code>forEach(async …)</code> doesn't wait — nothing awaits the returned promises.", ar: "<code>forEach(async …)</code> مش بيستنى — محدش بيعمل await للـ promises اللي راجعة." },
          { en: "<code>fetch</code> only rejects on network errors; a 404/500 resolves — check <code>response.ok</code>.", ar: "الـ <code>fetch</code> بيفشل مع أخطاء الشبكة بس. الـ 404 والـ 500 بيعدّوا كأنهم نجحوا، فاتأكد من <code>response.ok</code>." }
        ] },
        { type: "projects", items: [
          { text: { en: "Smart FAQ HTTP client: throws a typed ApiError on !ok, passes the AbortSignal from React Query, and shares one in-flight antiforgery refresh between parallel calls.", ar: "الـ HTTP client في Smart FAQ: بيرمي ApiError ليه type لما يبقى !ok، وبيعدي الـ AbortSignal من React Query، وبيخلي الـ calls اللي بتحصل مع بعض تستنى نفس الـ refresh." }, p: "smartfaq", tab: "how", label: "Smart FAQ" }
        ] }
      ],
      say: "I run independent requests with Promise.all, use allSettled when partial success is fine, and cancel outdated requests with AbortController.",
      interview: [
        { q: "How do you avoid race conditions in search-as-you-type?", a: { en: "Cancel the previous request with AbortController (React Query passes a signal and does this for you), or ignore results whose query no longer matches. Debounce the input too.", ar: "ألغي الـ request اللي قبله بـ AbortController (React Query بيبعت signal وبيعمل كده لوحده)، أو أتجاهل النتيجة لو البحث اتغير. وأعمل debounce للـ input كمان." },
          follow: [{ q: "What happens to an un-caught rejected promise?", a: { en: "An <code>unhandledrejection</code> event fires (and Node may crash). Always catch at the boundary.", ar: "بيحصل event اسمه <code>unhandledrejection</code> (و Node ممكن يقع). امسك الأخطاء دايمًا عند الحدود." } }] },
        { q: "Implement a timeout for a fetch.", a: { en: "<code>fetch(url, { signal: AbortSignal.timeout(5000) })</code>, or race the fetch against a promise that rejects after N ms.", ar: "<code>fetch(url, { signal: AbortSignal.timeout(5000) })</code>، أو race بين الـ fetch و promise بيفشل بعد N ms." } }
      ],
      quiz: [
        { q: { en: "Promise.all with one rejection — what about the others?", ar: "Promise.all وواحد فشل — والباقيين؟" }, a: { en: "all rejects immediately; the others keep running but their results are ignored.", ar: "الـ all بيفشل على طول. والباقيين بيكملوا شغلهم، بس نتايجهم بتتجاهل." } },
        { q: { en: "Does fetch reject on HTTP 500?", ar: "الـ fetch بيفشل مع 500؟" }, a: { en: "No — check response.ok.", ar: "لأ — شيك على response.ok." } }
      ],
      quick: [
        { en: "all = all or nothing · allSettled = every result · race = first settled · any = first success.", ar: "all = كله أو مفيش · allSettled = كل النتايج · race = أول واحد يخلص · any = أول نجاح." },
        { en: "fetch doesn't reject on 4xx/5xx; AbortController cancels; forEach doesn't await.", ar: "الـ fetch مش بيفشل مع 4xx/5xx. والـ AbortController بيلغي. والـ forEach مش بيستنى." }
      ]
    },
    {
      id: "references",
      title: { en: "References, copying and immutability", ar: "الـ References والنسخ والـ Immutability" },
      tldr: { en: "Assigning an object copies the reference, not the object. Spread copies one level (shallow); <code>structuredClone</code> copies deeply. React detects changes by reference, so update state by creating new objects/arrays, never by mutating.", ar: "لما تحط object في متغير، إنت بتنسخ الـ reference مش الـ object. والـ spread بينسخ مستوى واحد (shallow)، و <code>structuredClone</code> بينسخ لآخر مستوى. و React بيعرف التغيير من الـ reference، فلازم تحدّث الـ state بـ objects أو arrays جديدة، مش بإنك تعدّل فيها." },
      blocks: [
        { type: "code", code: "const a = { user: { name: \"Sara\" }, tags: [\"x\"] };\nconst b = { ...a };            // shallow\nb.user.name = \"Omar\";          // a.user.name is \"Omar\" too ✗\n\nconst c = structuredClone(a);  // deep: Dates, Maps, Sets OK; functions/DOM nodes not\n// JSON.parse(JSON.stringify(a)) loses Dates, undefined, Infinity, Map/Set\n\n// React: new references\nsetUser(u => ({ ...u, address: { ...u.address, city: \"Alex\" } }));\nsetItems(list => list.map(i => i.id === id ? { ...i, done: true } : i));" },
        { type: "pitfalls", items: [
          { en: "<code>state.items.push(x); setItems(state.items)</code> — same reference, React may skip the render.", ar: "<code>state.items.push(x); setItems(state.items)</code> — نفس الـ reference، و React ممكن ميعملش render." },
          { en: "Objects/arrays/functions created in render are new every time — they break <code>memo</code> and effect deps.", ar: "الـ objects والـ arrays والـ functions اللي بتتعمل جوه الـ render جديدة كل مرة — بتبوظ الـ <code>memo</code> والـ deps." }
        ] },
        { type: "projects", items: [{ text: { en: "Smart FAQ's memoized row menu compares only the fields it shows — because the actions array is a new reference every render.", ar: "منيو الصف في Smart FAQ بتقارن بس الحاجات اللي ظاهرة — لأن array الأكشنز reference جديد كل render." }, p: "smartfaq", tab: "problems", label: "Smart FAQ" }] }
      ],
      say: "React compares by reference, so I update state immutably and keep references stable where memoization depends on them.",
      interview: [{ q: "Shallow vs deep copy?", a: { en: "Shallow copies the top level; nested objects are still shared. Deep copies everything (structuredClone). In React you usually copy only the path you change.", ar: "الـ shallow بينسخ أول مستوى بس، والـ objects اللي جوه لسه مشتركة. والـ deep بينسخ كله (structuredClone). وفي React غالبًا بتنسخ بس الطريق اللي بتغيّره." } }],
      quiz: [{ q: { en: "Does <code>Object.freeze</code> freeze nested objects?", ar: "<code>Object.freeze</code> بيجمد الـ objects اللي جوه؟" }, a: { en: "No, it's shallow.", ar: "لأ، shallow." } }],
      quick: [{ en: "Spread = shallow; structuredClone = deep; React needs new references.", ar: "الـ spread بيعمل shallow copy، والـ structuredClone بيعمل deep. و React محتاج references جديدة." }]
    },
    {
      id: "arrays",
      title: { en: "Arrays: which methods mutate", ar: "الـ Arrays: أنهي methods بتعدل" },
      tldr: { en: "<code>push, pop, shift, unshift, splice, sort, reverse, fill</code> mutate. <code>map, filter, slice, concat, toSorted, toReversed, toSpliced, with</code> return new arrays — use those in React state.", ar: "<code>push و pop و shift و unshift و splice و sort و reverse و fill</code> بيعدلوا على نفس الـ array. أما <code>map و filter و slice و concat و toSorted و toReversed و toSpliced و with</code> بيرجعوا array جديد — استخدمهم في state بتاع React." },
      blocks: [
        { type: "code", code: "[10, 9, 1].sort();               // [1, 10, 9] — default sort compares strings!\n[10, 9, 1].sort((a, b) => a - b); // [1, 9, 10]\nconst sorted = list.toSorted((a, b) => a.price - b.price); // no mutation (ES2023)\n\nconst total = cart.reduce((sum, i) => sum + i.price * i.qty, 0); // always pass the initial value\nconst byId = Object.fromEntries(users.map(u => [u.id, u]));\nconst groups = Object.groupBy(orders, o => o.status);           // ES2024\n\n[1, 2, 3].includes(NaN) vs indexOf(NaN)  // includes finds NaN, indexOf doesn't\nArray.from({ length: 3 }, (_, i) => i)  // [0, 1, 2]" },
        { type: "compare", cols: [{ en: "Need", ar: "محتاج" }, { en: "Method", ar: "الـ Method" }], rows: [
          [{ en: "Transform each item", ar: "تغير كل عنصر" }, "map"], [{ en: "Keep some", ar: "تحتفظ ببعض" }, "filter"], [{ en: "First match", ar: "أول تطابق" }, "find / findIndex / findLast"],
          [{ en: "Any / all match", ar: "أي واحد / الكل" }, "some / every"], [{ en: "One value from many", ar: "قيمة واحدة من كتير" }, "reduce"], [{ en: "Flatten", ar: "تفرد" }, "flat / flatMap"]
        ] }
      ],
      say: "In state updates I only use non-mutating methods like map, filter and toSorted, and I always give sort a comparator.",
      interview: [{ q: "Why does [10, 9, 1].sort() give [1, 10, 9]?", a: { en: "Without a comparator, sort converts items to strings and compares them lexicographically: \"1\" < \"10\" < \"9\".", ar: "من غير comparator، الـ sort بيحول العناصر لـ strings ويقارنها حرف بحرف: \"1\" < \"10\" < \"9\"." } }],
      quiz: [{ q: { en: "<code>reduce</code> on an empty array without an initial value?", ar: "<code>reduce</code> على array فاضي من غير قيمة بداية؟" }, a: { en: "TypeError. Always pass the initial value.", ar: "TypeError. ابعت قيمة البداية دايمًا." } }],
      quick: [{ en: "sort/reverse/splice mutate → use toSorted/toReversed/toSpliced; sort needs a comparator.", ar: "الـ sort والـ reverse والـ splice بيعدّلوا، فاستخدم toSorted و toReversed و toSpliced. والـ sort محتاج comparator." }]
    },
    {
      id: "modules",
      title: { en: "Modules: ESM vs CommonJS", ar: "الـ Modules: ESM ولا CommonJS" },
      tldr: { en: "ES modules use static <code>import/export</code>, are analysed before running (tree-shaking), export <b>live bindings</b>, are strict and deferred by default. CommonJS (<code>require</code>) loads at runtime and exports a copied value object. <code>import()</code> loads code on demand — the base of code-splitting.", ar: "الـ ES modules بتستخدم <code>import/export</code> ثابتين، بيتحللوا قبل التشغيل (tree-shaking)، وبيصدّروا <b>live bindings</b>، و strict و deferred افتراضيًا. أما CommonJS (<code>require</code>) بيتحمل وقت التشغيل وبيصدّر object فيه قيم منسوخة. و <code>import()</code> بيحمل الكود وقت الحاجة — وده أساس الـ code-splitting." },
      blocks: [
        { type: "code", code: "// counter.js\nexport let count = 0;\nexport function inc() { count++; }\n\n// main.js\nimport { count, inc } from \"./counter.js\";\ninc();\nconsole.log(count);    // 1 — live binding (CommonJS would still show 0)\n\n// code-splitting\nconst { Chart } = await import(\"./chart.js\");     // separate chunk\nconst Editor = React.lazy(() => import(\"./Editor\"));" }
      ],
      say: "ES modules are static, so bundlers can tree-shake them, and dynamic import gives me route- and component-level code splitting.",
      interview: [{ q: "What makes tree-shaking possible?", a: { en: "Static imports/exports: the bundler knows at build time what is used. Side-effect-free packages (<code>\"sideEffects\": false</code>) let it drop unused files safely.", ar: "الـ imports والـ exports الثابتة: الـ bundler بيعرف وقت الـ build إيه المستخدم. والـ packages اللي مفيهاش side effects (<code>\"sideEffects\": false</code>) بتخليه يشيل الملفات اللي مش مستخدمة بأمان." } }],
      quiz: [{ q: { en: "Can you <code>import</code> inside an if-statement?", ar: "ينفع <code>import</code> جوه if؟" }, a: { en: "Not static import — use dynamic <code>import()</code>.", ar: "الـ import الثابت لأ — استخدم <code>import()</code>." } }],
      quick: [{ en: "ESM: static, live bindings, tree-shakable; import() = code-splitting.", ar: "الـ ESM ثابت، وفيه live bindings، وبيسمح بالـ tree-shaking. والـ import() معناه code-splitting." }]
    },
    {
      id: "dom-events",
      title: { en: "DOM events: bubbling, capturing, delegation", ar: "أحداث الـ DOM: bubbling و capturing و delegation" },
      tldr: { en: "An event travels down (capture), hits the target, then bubbles up. Delegation = one listener on a parent that checks <code>event.target</code>. <code>preventDefault</code> stops the browser's default action; <code>stopPropagation</code> stops the travel.", ar: "الـ event بينزل (capture)، وبعدين يوصل للهدف، وبعدين يطلع (bubble). والـ delegation معناها listener واحد على الأب، بيبص على <code>event.target</code>. و <code>preventDefault</code> بيمنع تصرف المتصفح الافتراضي. و <code>stopPropagation</code> بيوقف رحلة الـ event." },
      blocks: [
        { type: "code", code: "list.addEventListener(\"click\", (e) => {\n  const row = e.target.closest(\"[data-id]\");   // works for rows added later\n  if (!row) return;\n  open(row.dataset.id);\n});\n\nel.addEventListener(\"scroll\", onScroll, { passive: true }); // tells the browser you won't preventDefault\nel.addEventListener(\"click\", once, { once: true });\nconst ac = new AbortController();\nwindow.addEventListener(\"resize\", onResize, { signal: ac.signal }); ac.abort(); // removes it" },
        { type: "list", items: [
          { en: "<code>e.target</code> = what was clicked; <code>e.currentTarget</code> = where the listener is.", ar: "الـ <code>e.target</code> هو اللي اتضغط عليه، والـ <code>e.currentTarget</code> هو اللي عليه الـ listener." },
          { en: "React attaches one listener at the root and dispatches its own synthetic events (delegation).", ar: "React بيحط listener واحد على الـ root وبيوزّع synthetic events بتاعته (delegation)." },
          { en: "<code>focus</code>/<code>blur</code> don't bubble; <code>focusin</code>/<code>focusout</code> do.", ar: "الـ <code>focus</code> والـ <code>blur</code> مش بيعملوا bubble، أما <code>focusin</code> و <code>focusout</code> فبيعملوا." }
        ] }
      ],
      say: "I use event delegation for long or dynamic lists — one listener on the parent, closest() to find the row.",
      interview: [{ q: "preventDefault vs stopPropagation?", a: { en: "preventDefault cancels the default action (submitting, following a link). stopPropagation stops the event reaching other elements. They're independent.", ar: "preventDefault بيلغي تصرف المتصفح (submit، فتح لينك). و stopPropagation بيمنع الـ event يوصل لعناصر تانية. ملهمش علاقة ببعض." },
        follow: [{ q: "Why passive listeners?", a: { en: "The browser can scroll immediately without waiting to see if you call preventDefault — smoother scrolling on touch.", ar: "المتصفح يقدر يعمل scroll على طول من غير ما يستنى يشوف هتعمل preventDefault — scroll أنعم على اللمس." } }] }],
      quiz: [{ q: { en: "target vs currentTarget?", ar: "target ولا currentTarget؟" }, a: { en: "target = origin of the event; currentTarget = element whose listener is running.", ar: "الـ target هو مصدر الـ event، والـ currentTarget هو العنصر اللي الـ listener بتاعه شغال." } }],
      quick: [{ en: "capture ↓ target · bubble ↑; delegation with closest(); passive for scroll/touch.", ar: "capture لتحت، وبعدين الهدف، وبعدين bubble لفوق. والـ delegation بـ closest(). و passive للـ scroll واللمس." }]
    },
    {
      id: "memory",
      title: { en: "Memory, garbage collection and leaks", ar: "الميموري والـ Garbage collection والتسريب" },
      tldr: { en: "The engine frees objects nothing can reach. Leaks happen when something long-lived still references them: forgotten listeners, intervals, subscriptions, detached DOM nodes, caches that only grow. <code>WeakMap</code>/<code>WeakRef</code> hold without preventing collection.", ar: "الـ engine بيمسح أي object محدش يقدر يوصله. والتسريب بيحصل لما حاجة عايشة كتير لسه ماسكة فيه: listeners منسية، intervals، subscriptions، عناصر DOM مفصولة، أو cache بيكبر على طول. و <code>WeakMap</code> و <code>WeakRef</code> بيمسكوا من غير ما يمنعوا المسح." },
      blocks: [
        { type: "code", code: "useEffect(() => {\n  const id = setInterval(poll, 5000);\n  window.addEventListener(\"resize\", onResize);\n  const conn = startSignalR();\n  return () => {                 // cleanup = no leaks\n    clearInterval(id);\n    window.removeEventListener(\"resize\", onResize);\n    conn.stop();\n  };\n}, []);\n\nconst meta = new WeakMap();     // key: a DOM node / object; entry disappears with it\nmeta.set(node, { measured: 120 });" },
        { type: "list", title: { en: "Finding a leak", ar: "إزاي تلاقي تسريب" }, items: [
          { en: "DevTools → Memory → take heap snapshots before/after repeating an action; compare.", ar: "افتح DevTools ← Memory. خد heap snapshot قبل ما تكرر أكشن وبعده، وقارن بينهم." },
          { en: "Look for “Detached” DOM nodes and growing listener counts (Performance monitor).", ar: "دوّر على عناصر DOM «Detached» وعدد listeners بيزيد (Performance monitor)." }
        ] },
        { type: "projects", items: [{ text: { en: "okoRent: the SignalR connection opens in an effect and is stopped in its cleanup; a new token reconnects.", ar: "okoRent: اتصال SignalR بيتفتح في effect، وبيتقفل في الـ cleanup. ولما ييجي token جديد بيعمل اتصال جديد." }, p: "okorent", tab: "hooks", label: "okoRent" }] }
      ],
      say: "Every subscription I open in an effect is closed in its cleanup — intervals, listeners, sockets — which is where most frontend leaks come from.",
      interview: [{ q: "Common memory leaks in SPAs?", a: { en: "Listeners and intervals not removed on unmount, open sockets/subscriptions, global caches without limits, references to detached DOM nodes, closures holding big data.", ar: "Listeners و intervals مش بتتشال مع الـ unmount، sockets و subscriptions مفتوحة، cache عام ملوش حد، references لعناصر DOM مفصولة، و closures ماسكة داتا كبيرة." } }],
      quiz: [{ q: { en: "Why WeakMap for per-node data?", ar: "ليه WeakMap لداتا مربوطة بعنصر؟" }, a: { en: "When the node is gone, the entry can be garbage-collected automatically.", ar: "لما العنصر يتشال، الـ entry بيتمسح لوحده." } }],
      quick: [{ en: "Unreachable = collected; every effect subscription needs a cleanup; WeakMap for side data.", ar: "اللي محدش يقدر يوصله بيتمسح. وكل subscription في effect محتاج cleanup. واستخدم WeakMap للداتا الجانبية." }]
    }
  ]
});
