// Bites — researched from the code on laptop 3 (repo bites-development/Bites-Mart-Nextjs), 2026-10-28.
// Counts = hook calls added in his diffs. Code sketches are simplified patterns, not project code.
HANDBOOK.projects.push({
  id: "bites",
  name: "Bites",
  logo: "assets/img/bites-logo.png",
  color: "#8a6a2f",
  company: "Bites",
  years: "2025–26",
  period: "Sep 2025 – Apr 2026 · part-time",
  role: { en: "Frontend Developer · invoices owner", ar: "Frontend Developer · صاحب الفواتير" },
  team: { en: "14-person team, #2 by commits", ar: "فريق 14 شخص، التاني في الكوميتات" },
  tagline: { en: "An all-in-one business platform: finance, sales, contracts with e-signatures, and vertical modules.", ar: "منصة بيزنس متكاملة: مالية، مبيعات، عقود بتوقيع إلكتروني، وموديولات متخصصة." },
  stats: [
    ["192", { en: "commits (190 on production)", ar: "كوميت (190 على production)" }],
    ["#2", { en: "of 14 contributors", ar: "من 14 في الفريق" }],
    ["78", { en: "pages created", ar: "صفحة عملتها" }],
    ["7 mo", { en: "part-time, remote", ar: "part-time من البيت" }]
  ],

  pitch: [
    { en: "Bites is an <b>ERP-style platform</b>: invoices, bills, expenses, double-entry accounting, sales CRM, contracts, payments and modules like a cinema system.", ar: "Bites منصة <b>زي الـ ERP</b>: فواتير، bills، مصروفات، محاسبة قيد مزدوج، CRM للمبيعات، عقود، مدفوعات، وموديولات زي نظام السينما." },
    { en: "I was the <b>main author of invoices</b> — builder, payments, attachments, email tracking — and built <b>OTP-verified e-signatures</b> for contracts and invoices.", ar: "كنت <b>الـ main author للفواتير</b> — الـ builder، الدفع، المرفقات، تتبع الإيميل — وعملت <b>توقيع إلكتروني بـ OTP</b> للعقود والفواتير." },
    { en: "Part-time in a 14-person team: 192 commits, 190 shipped to production, second-most on the team.", ar: "part-time في فريق 14 شخص: 192 كوميت، 190 منهم وصلوا production، تاني أكتر واحد في الفريق." }
  ],

  built: [
    { title: { en: "Invoices (main author)", ar: "الفواتير (الـ main author)" }, items: [
      { en: "Create, show/edit, builder, list with filters and pagination", ar: "إنشاء، عرض/تعديل، builder، قايمة بفلاتر و pagination" },
      { en: "Payment dialog, attachments, email tracking, templates", ar: "dialog الدفع، المرفقات، تتبع الإيميل، القوالب" },
      { en: "Percentage discounts, project vs product invoices", ar: "خصم بالنسبة، فاتورة project أو product" }
    ]},
    { title: { en: "E-signatures and contracts", ar: "التوقيع والعقود" }, items: [
      { en: "OTP-verified signing for contracts and invoices", ar: "توقيع بعد تأكيد OTP للعقود والفواتير" },
      { en: "Contract-creation workflow (18 of 24 commits)", ar: "workflow إنشاء العقد (18 من 24 كوميت)" },
      { en: "QR code linking to the public document", ar: "QR بيفتح الصفحة العامة للمستند" }
    ]},
    { title: { en: "Accounting", ar: "المحاسبة" }, items: [
      { en: "Double-entry journal and reports (debit, credit, difference)", ar: "القيود اليومية وتقاريرها (مدين، دائن، الفرق)" },
      { en: "Receivables / payables, expenses, bills, debit notes", ar: "المديونيات والدائنين، المصروفات، الـ bills، الـ debit notes" }
    ]},
    { title: { en: "Theater OS (co-built) and sales (contributor)", ar: "Theater OS (مشاركة) والمبيعات (مساهم)" }, items: [
      { en: "Admin: movies, food, seating templates, ticket types", ar: "أدمن: الأفلام، الأكل، قوالب الكراسي، أنواع التذاكر" },
      { en: "Public booking: seats, food, checkout, ticket QR", ar: "حجز للجمهور: كراسي، أكل، checkout، QR للتذكرة" },
      { en: "Sales CRM: orders, quotes, accounts, opportunities", ar: "CRM: أوردرات، عروض أسعار، حسابات، فرص بيع" }
    ]}
  ],

  myRole: [
    { en: "Invoices: <b>main author</b> (43 of ~74 commits in the invoice area).", ar: "الفواتير: <b>الـ main author</b> (43 من حوالي 74 كوميت في الجزء ده)." },
    { en: "E-signatures and contracts: built. Accounting screens: built.", ar: "التوقيع والعقود: أنا. شاشات المحاسبة: أنا." },
    { en: "Theater OS: <b>co-built</b> with a teammate. Sales CRM: <b>contributor</b> (another teammate is the main author).", ar: "Theater OS: <b>مشاركة</b> مع زميل. Sales CRM: <b>مساهم</b> (زميل تاني هو الـ main author)." },
    { en: "Smaller: public support-ticket page, film-projects dialog in the video editor.", ar: "حاجات أصغر: صفحة الـ support ticket العامة، و dialog مشاريع الأفلام في الـ video editor." }
  ],

  stack: [
    [{ en: "Core", ar: "الأساس" }, ["Next.js 14 (App Router)", "React 18", "TypeScript"]],
    [{ en: "Data", ar: "الداتا" }, ["TanStack Query", "axios (API modules)"]],
    [{ en: "Forms", ar: "الفورمز" }, ["react-hook-form", "zod", "useFieldArray", "useWatch"]],
    [{ en: "UI", ar: "الواجهة" }, ["MUI 6", "Tailwind", "lucide-react", "react-hot-toast"]],
    [{ en: "Other", ar: "تاني" }, ["qrcode.react", "dayjs", "use-debounce"]]
  ],

  decisions: [
    {
      title: { en: "Forms for money", ar: "فورمز الفلوس" },
      chose: "react-hook-form + zod", alts: ["Formik + yup", "useState per field"],
      why: { en: "An invoice has dozens of fields and dynamic rows. react-hook-form keeps inputs <b>uncontrolled</b>, so typing in one field doesn't re-render the whole form. zod gives one schema for validation <b>and</b> the TypeScript type (<code>z.infer</code>) — 67 forms use <code>zodResolver</code>.", ar: "الفاتورة فيها عشرات الحقول وصفوف بتتزود. react-hook-form بيخلي الـ inputs <b>uncontrolled</b>، فالكتابة في حقل مش بتعمل re-render للفورم كله. و zod بيديني schema واحدة للـ validation <b>وكمان</b> الـ TypeScript type (<code>z.infer</code>) — 67 فورم بيستخدموا <code>zodResolver</code>." },
      both: { v: "no", en: "Formik and react-hook-form solve the same job; zod and yup too. Pick one of each.", ar: "Formik و react-hook-form بيعملوا نفس الشغلانة؛ و zod و yup كمان. اختار واحد من كل نوع." },
      better: { en: "This is still the standard pair. With a TypeScript backend you could share the same zod schemas on both sides.", ar: "ده لسه الـ standard. ولو الباك إند TypeScript ممكن تشارك نفس الـ zod schemas بين الاتنين." },
      say: "React Hook Form keeps big financial forms fast because inputs are uncontrolled, and zod gives me validation and types from one schema.",
      concept: "forms"
    },
    {
      title: { en: "Dynamic invoice rows", ar: "صفوف الفاتورة المتغيرة" },
      chose: "useFieldArray", alts: ["array in useState", "manual field names"],
      why: { en: "Rows are added, removed and reordered. <code>useFieldArray</code> gives each row a stable <code>field.id</code> (safe React keys), plus <code>append</code> / <code>remove</code> and per-row validation.", ar: "الصفوف بتتزود وتتشال وتترتب. <code>useFieldArray</code> بيدي كل صف <code>field.id</code> ثابت (keys آمنة لـ React)، ومعاه <code>append</code> / <code>remove</code> و validation لكل صف." },
      both: { v: "no", en: "Keeping rows in useState as well would create two sources of truth.", ar: "لو خليت الصفوف كمان في useState يبقى عندك مصدرين للحقيقة." },
      better: { en: "Same. Never use the array index as the key — that's the bug useFieldArray prevents.", ar: "نفس الحاجة. وماتستخدمش الـ index كـ key — ده بالظبط الـ bug اللي useFieldArray بيمنعه." },
      say: "Invoice lines are a field array, so each row has a stable id and its own validation.",
      concept: "forms"
    },
    {
      title: { en: "Live totals", ar: "الإجمالي اللايف" },
      chose: "useWatch (derived)", alts: ["watch() at the top", "totals in useState + useEffect", "compute on submit only"],
      why: { en: "The total is <b>derived</b> from the rows, so I compute it, I don't store it. <code>useWatch</code> subscribes inside the totals component, so only that part re-renders while you type.", ar: "الإجمالي <b>بيتحسب</b> من الصفوف، فأنا بحسبه مش بخزنه. <code>useWatch</code> بيشترك جوه component الإجمالي بس، فهو اللي بيعمل re-render وانت بتكتب." },
      both: { v: "yes", en: "Show derived totals in the UI <b>and</b> let the server recompute on save — never trust totals sent from the client.", ar: "اعرض الإجمالي المحسوب في الـ UI <b>و</b> خلي السيرفر يحسبه تاني وقت الحفظ — ماتثقش في إجمالي جاي من المتصفح." },
      better: { en: "Same approach. For money, round once at the end and use integer cents (or a decimal library) to avoid float errors.", ar: "نفس الطريقة. ومع الفلوس، اعمل التقريب مرة واحدة في الآخر واستخدم قروش كأرقام صحيحة (أو مكتبة decimal) علشان أخطاء الـ float." },
      say: "Totals are derived with useWatch, never stored, and the backend recomputes them — the client total is only for display.",
      concept: "derived-state"
    },
    {
      title: { en: "Proving who signed", ar: "إثبات مين اللي وقّع" },
      chose: "OTP + drawn signature", alts: ["drawn signature only", "typed name", "e-sign provider (DocuSign)"],
      why: { en: "A drawing alone doesn't prove the signer owns the email or phone. An OTP first ties the signature to a verified contact — built into the platform with no per-signature cost.", ar: "الرسمة لوحدها ماتثبتش إن اللي وقّع صاحب الإيميل أو الموبايل. الـ OTP الأول بيربط التوقيع بـ contact متأكد منه — جوه المنصة ومن غير تكلفة لكل توقيع." },
      both: { v: "partly", en: "A provider like DocuSign already verifies identity, so adding your own OTP on top is redundant.", ar: "مزوّد زي DocuSign بيتأكد من الهوية أصلًا، فـ OTP بتاعك فوقه يبقى زيادة." },
      better: { en: "For legally binding contracts in some markets, a provider with an audit trail and a hash of the signed document is stronger.", ar: "للعقود الملزمة قانونيًا في بعض الأسواق، مزوّد فيه audit trail و hash للمستند الموقّع أقوى." },
      say: "Before drawing a signature, the signer verifies a one-time code sent to their email or phone, so every signature is tied to a verified contact."
    },
    {
      title: { en: "Server data", ar: "داتا السيرفر" },
      chose: "TanStack Query", alts: ["SWR", "RTK Query"],
      why: { en: "Team standard. I key queries by entity — <code>[\"invoice\", id]</code>, <code>[\"credit-notes-list\", invoiceId]</code> — so after a payment I refresh only that invoice and its related lists (157 invalidations).", ar: "ده الـ standard في الفريق. بعمل الـ keys بالـ entity — <code>[\"invoice\", id]</code>، <code>[\"credit-notes-list\", invoiceId]</code> — فبعد أي دفع بحدّث الفاتورة دي وقوايمها بس (157 invalidation)." },
      both: { v: "no", en: "Two data-fetching caches for the same API means two sources of truth.", ar: "كاشين لنفس الـ API = مصدرين للحقيقة." },
      better: { en: "Same tool, plus a central query-key factory instead of repeated string arrays.", ar: "نفس الأداة، بس مع query-key factory مركزي بدل arrays متكررة." },
      say: "After a payment or credit note I invalidate that invoice and its related lists, not the whole cache.",
      concept: "query-keys"
    },
    {
      title: { en: "Search debounce", ar: "الـ debounce في البحث" },
      chose: "use-debounce", alts: ["react-use", "lodash.debounce", "useDeferredValue"],
      why: { en: "Server search shouldn't fire on every key press; waiting 600 ms sends one request when the user stops typing.", ar: "البحث على السيرفر مايصحش يبعت مع كل حرف؛ استنى 600ms وابعت request واحد لما يبطل كتابة." },
      both: { v: "partly", en: "My code imported <code>useDebounce</code> from both <b>use-debounce</b> and <b>react-use</b>. It works, but it's two libraries for one job.", ar: "الكود بتاعي استورد <code>useDebounce</code> من <b>use-debounce</b> ومن <b>react-use</b>. شغال، بس مكتبتين لنفس الشغلانة." },
      better: { en: "Keep one. <code>useDeferredValue</code> helps heavy <b>client-side</b> filtering but does not reduce server requests — debounce still needed for API search.", ar: "خلي واحدة. <code>useDeferredValue</code> بيفيد في الفلترة التقيلة <b>على المتصفح</b> بس مش بيقلل الـ requests — الـ debounce لسه لازم لبحث الـ API." },
      say: "Debounce reduces requests; useDeferredValue only defers rendering — they solve different problems.",
      concept: "one-tool"
    },
    {
      title: { en: "QR codes", ar: "الـ QR codes" },
      chose: "qrcode.react (QRCodeSVG)", alts: ["QRCodeCanvas", "server-generated image"],
      why: { en: "SVG stays sharp at any size and when printed. The QR links to the public contract page (blurred until saved) or to a ticket page with a token.", ar: "الـ SVG بيفضل حاد بأي مقاس وفي الطباعة. الـ QR بيفتح صفحة العقد العامة (متغبشة لحد ما يتحفظ) أو صفحة التذكرة بـ token." },
      both: { v: "no", en: "No need for two QR renderers.", ar: "مفيش داعي لطريقتين." },
      better: { en: "Fine as is.", ar: "كده تمام." },
      say: "QR codes are SVG so they print sharply, and they encode a link with a token, not the data itself."
    },
    {
      title: { en: "UI kit", ar: "مكتبة الواجهة" },
      chose: "MUI 6 + Tailwind", alts: ["Mantine", "shadcn/ui"],
      why: { en: "Project standard; MUI has solid dialogs, inputs and tables for data-heavy screens.", ar: "ده الـ standard في المشروع؛ MUI فيه dialogs و inputs وجداول قوية للشاشات المليانة داتا." },
      both: { v: "yes", en: "MUI + Tailwind work together, but agree on one way to style (sx vs classes) to avoid specificity fights.", ar: "MUI و Tailwind بيشتغلوا مع بعض، بس اتفقوا على طريقة واحدة للستايل (sx أو classes) علشان مايحصلش تعارض." },
      better: { en: "For a new product, shadcn/ui + Tailwind gives more control; MUI is fine for a large team that already uses it.", ar: "لمنتج جديد، shadcn/ui مع Tailwind بيدي تحكم أكتر؛ و MUI كويس لفريق كبير متعود عليه." },
      say: "We stayed with MUI because the whole team and the existing modules used it."
    }
  ],

  flows: [
    {
      title: { en: "Signing a contract or invoice", ar: "توقيع عقد أو فاتورة" },
      steps: [
        ["Choose contact", { en: "email or phone", ar: "إيميل أو موبايل" }],
        ["requestOtp", { en: "server sends a 6-digit code", ar: "السيرفر بيبعت كود 6 أرقام" }],
        ["verifyOtp", { en: "wrong code → error, stay on step", ar: "كود غلط ← رسالة خطأ، وتفضل في نفس الخطوة" }],
        ["Terms", { en: "accept before signing", ar: "يوافق قبل التوقيع" }],
        ["Draw", { en: "signature as a PNG data URL", ar: "التوقيع كصورة PNG" }],
        ["sign", { en: "saved with signer data", ar: "بيتحفظ مع بيانات الموقّع" }]
      ]
    },
    {
      title: { en: "Invoice total, live", ar: "إجمالي الفاتورة لايف" },
      steps: [
        ["useFieldArray", { en: "rows: qty, price, discount", ar: "الصفوف: الكمية، السعر، الخصم" }],
        ["useWatch", { en: "watches items, tax, invoice type", ar: "بيراقب الصفوف والضريبة ونوع الفاتورة" }],
        ["Derive", { en: "subtotal → discount → tax → total", ar: "subtotal ← خصم ← ضريبة ← إجمالي" }],
        ["zod", { en: "blocks invalid values on submit", ar: "بيمنع القيم الغلط وقت الحفظ" }],
        ["Mutation", { en: "save, then invalidate the invoice", ar: "حفظ، وبعدين invalidate للفاتورة" }]
      ]
    },
    {
      title: { en: "Theater OS booking", ar: "حجز في Theater OS" },
      steps: [
        ["Show", { en: "movie or event + time", ar: "فيلم أو إيفنت + ميعاد" }],
        ["Seat map", { en: "from the hall template; booked seats disabled", ar: "من قالب القاعة؛ الكراسي المحجوزة مقفولة" }],
        ["Select", { en: "selected seats kept in state", ar: "الكراسي المختارة في state" }],
        ["Food", { en: "added to the same order", ar: "بيتضاف لنفس الأوردر" }],
        ["Checkout", { en: "tickets + food total", ar: "إجمالي التذاكر + الأكل" }],
        ["Ticket", { en: "QR → public ticket page with a token", ar: "QR ← صفحة التذكرة بـ token" }]
      ]
    }
  ],

  patterns: [
    {
      title: { en: "Field array + derived totals", ar: "Field array + إجمالي محسوب" },
      body: { en: "Rows live in the form; the totals component subscribes with <code>useWatch</code> and computes — nothing is stored twice.", ar: "الصفوف جوه الفورم؛ و component الإجمالي بيشترك بـ <code>useWatch</code> ويحسب — مفيش حاجة متخزنة مرتين." },
      code: "const form = useForm<Invoice>({ resolver: zodResolver(invoiceSchema) });\nconst { fields, append, remove } = useFieldArray({ control: form.control, name: \"items\" });\n\nfunction Totals({ control }) {\n  const items = useWatch({ control, name: \"items\" }) ?? [];\n  const taxRate = useWatch({ control, name: \"taxRate\" }) ?? 0;\n  const subtotal = items.reduce(\n    (sum, i) => sum + i.qty * i.price * (1 - (i.discount ?? 0) / 100), 0);\n  const total = subtotal * (1 + taxRate / 100);\n  return <Summary subtotal={subtotal} total={total} />; // only this re-renders\n}"
    },
    {
      title: { en: "A multi-step dialog", ar: "dialog بخطوات" },
      body: { en: "Each step waits for the API; an error keeps you on the same step with the server's message. My version used several boolean flags; one <code>step</code> value is cleaner.", ar: "كل خطوة بتستنى الـ API؛ والخطأ بيخليك في نفس الخطوة برسالة السيرفر. النسخة بتاعتي كانت بكذا boolean؛ قيمة <code>step</code> واحدة أنضف." },
      code: "type Step = \"contact\" | \"otp\" | \"terms\" | \"sign\";\nconst [step, setStep] = useState<Step>(\"contact\");\nconst [error, setError] = useState<string | null>(null);\n\nasync function verify(code: string) {\n  try {\n    await signatureApi.verifyOtp({ contractId, contact, otp: code });\n    setStep(\"terms\");\n  } catch (e) {\n    setError(e.response?.data?.message ?? \"Verification failed\"); // stay here\n  }\n}"
    },
    {
      title: { en: "Reset the form when a dialog opens", ar: "reset للفورم لما الـ dialog يفتح" },
      body: { en: "Edit dialogs reuse one form: on open, <code>reset</code> with the record (edit) or the defaults (create).", ar: "dialogs التعديل بتستخدم فورم واحد: لما يفتح، <code>reset</code> بالبيانات (تعديل) أو بالـ defaults (إنشاء)." },
      code: "useEffect(() => {\n  if (!open) return;\n  reset(editing ? toFormValues(editing) : defaultValues);\n}, [open, editing, reset]);\n\n// newer option: useForm({ values: editing ? toFormValues(editing) : undefined })"
    }
  ],

  hooks: [
    { group: { en: "Forms", ar: "الفورمز" }, items: [
      { name: "useForm + zodResolver", count: "×67", what: { en: "Every financial form has a zod schema.", ar: "كل فورم مالي ليه zod schema." }, remember: { en: "One schema = validation + TypeScript type.", ar: "schema واحدة = validation + TypeScript type." } },
      { name: "useFieldArray", count: "×13", what: { en: "Item rows in invoices, bills, quotes; also contacts, accounts, options.", ar: "صفوف الـ items في الفواتير والـ bills والعروض؛ وكمان contacts و accounts و options." }, remember: { en: "Use <code>field.id</code> as the key, never the index.", ar: "استخدم <code>field.id</code> كـ key، مش الـ index." } },
      { name: "useWatch", count: "×10", what: { en: "Watches items, tax and invoice type to compute totals and switch fields.", ar: "بيراقب الصفوف والضريبة ونوع الفاتورة علشان يحسب ويغير الحقول." }, remember: { en: "Re-renders only the component that calls it.", ar: "بيعمل re-render للـ component اللي ناداه بس." } },
      { name: "reset", what: { en: "Inside <code>useEffect</code> when a dialog opens or in edit mode.", ar: "جوه <code>useEffect</code> لما الـ dialog يفتح أو في وضع التعديل." } }
    ]},
    { group: { en: "Server data", ar: "داتا السيرفر" }, items: [
      { name: "useQuery", count: "×293", what: { en: "Lists, details, reports; keys include id and filters.", ar: "القوايم، التفاصيل، التقارير؛ الـ keys فيها الـ id والفلاتر." } },
      { name: "useMutation", count: "×96", what: { en: "Create/update invoice, pay, sign, credit note.", ar: "إنشاء/تعديل فاتورة، دفع، توقيع، credit note." } },
      { name: "invalidateQueries", count: "×157", what: { en: "Entity keys: <code>[\"invoice\", id]</code>, <code>[\"contract\", id]</code>.", ar: "keys بالـ entity: <code>[\"invoice\", id]</code>، <code>[\"contract\", id]</code>." } }
    ]},
    { group: { en: "UI and effects", ar: "الواجهة والـ effects" }, items: [
      { name: "useState", count: "×647", what: { en: "Dialog flags, OTP steps, selected seats.", ar: "حالة الـ dialogs، خطوات الـ OTP، الكراسي المختارة." } },
      { name: "useEffect", count: "×175", what: { en: "Reset forms on open; scroll a list to the end after a refetch; click-outside.", ar: "reset للفورم لما يفتح؛ ينزل القايمة لآخرها بعد refetch؛ click-outside." }, remember: { en: "Effects are for syncing with something outside React — not for computing values.", ar: "الـ effects للمزامنة مع حاجة برا React — مش لحساب قيم." } },
      { name: "useRef", count: "×15", what: { en: "List element for scrolling; previous refetch flag; click-outside container.", ar: "عنصر القايمة للـ scroll؛ قيمة الـ refetch اللي قبلها؛ حاوية الـ click-outside." } },
      { name: "useMemo / useCallback", count: "×34 / ×14", what: { en: "Report values and stable row handlers.", ar: "قيم التقارير و handlers ثابتة للصفوف." } },
      { name: "useDebounce", count: "×5", what: { en: "Search waits 600 ms.", ar: "البحث بيستنى 600ms." } },
      { name: "useSearchParams / useRouter", count: "×33 / ×83", what: { en: "Filters and pagination in the URL; navigation after save.", ar: "الفلاتر والـ pagination في الـ URL؛ التنقل بعد الحفظ." } }
    ]}
  ],

  problems: [
    {
      title: { en: "Invoice totals must always be right", ar: "إجمالي الفاتورة لازم يبقى صح دايمًا" },
      problem: { en: "Rows change, percentage discounts, tax, and two invoice types. A total kept in its own state drifts from the rows.", ar: "الصفوف بتتغير، وفي خصم بالنسبة وضريبة ونوعين فاتورة. لو الإجمالي متخزن لوحده بيبعد عن الصفوف." },
      fix: { en: "useFieldArray for rows; useWatch derives subtotal → discount → tax → total; zod blocks invalid values.", ar: "useFieldArray للصفوف؛ useWatch بيحسب subtotal ← خصم ← ضريبة ← إجمالي؛ و zod بيمنع القيم الغلط." },
      result: { en: "One source of truth (the rows); the total is never stale.", ar: "مصدر واحد للحقيقة (الصفوف)؛ والإجمالي عمره ما يبقى قديم." }
    },
    {
      title: { en: "A signature that proves who signed", ar: "توقيع يثبت مين اللي وقّع" },
      problem: { en: "A drawn signature alone doesn't prove the signer owns the email or phone.", ar: "الرسمة لوحدها ماتثبتش إن اللي وقّع صاحب الإيميل أو الموبايل." },
      fix: { en: "OTP first: contact → 6-digit code → verify → terms → draw → save. One component for contracts and invoices.", ar: "OTP الأول: contact ← كود 6 أرقام ← verify ← شروط ← رسم ← حفظ. component واحد للعقود والفواتير." },
      result: { en: "Every signature tied to a verified contact (Mar 2026).", ar: "كل توقيع مربوط بـ contact متأكد منه (مارس 2026)." },
      lesson: { en: "Model a wizard as one <code>step</code> value instead of several booleans.", ar: "الـ wizard يبقى قيمة <code>step</code> واحدة بدل كذا boolean." }
    },
    {
      title: { en: "Theater OS seat booking", ar: "حجز الكراسي في Theater OS" },
      problem: { en: "Visitors pick seats from a hall template, can't pick booked seats, and add food to the same order.", ar: "الزائر بيختار كراسي من قالب القاعة، ومينفعش يختار كرسي محجوز، ويضيف أكل لنفس الأوردر." },
      fix: { en: "Seat templates from admin; <code>booked_seats</code> disabled; selection in state; total = tickets + food; ticket QR with a token.", ar: "قوالب الكراسي من الأدمن؛ <code>booked_seats</code> مقفولة؛ الاختيار في state؛ الإجمالي = تذاكر + أكل؛ و QR للتذكرة بـ token." },
      result: { en: "A full booking flow, co-built with a teammate.", ar: "flow حجز كامل، اتعمل بالمشاركة مع زميل." },
      lesson: { en: "Prices were hard-coded in the first prototype; real prices must come from the API.", ar: "الأسعار كانت مكتوبة في الكود في أول نسخة؛ الأسعار الحقيقية لازم تيجي من الـ API." }
    },
    {
      title: { en: "Shipping in a busy 14-person repo", ar: "الشغل في repo مزحوم بـ 14 شخص" },
      problem: { en: "Thousands of commits and hundreds of branches, everyone on a different module.", ar: "آلاف الكوميتات ومئات الـ branches، وكل واحد على موديول." },
      fix: { en: "A branch per feature (<code>feature/invoice</code>, <code>feature/sales</code>), merging <code>production</code> in often, and the shared API modules.", ar: "branch لكل feature (<code>feature/invoice</code>، <code>feature/sales</code>)، و merge من <code>production</code> باستمرار، و API modules مشتركة." },
      result: { en: "190 of 192 commits reached production.", ar: "190 من 192 كوميت وصلوا production." }
    }
  ],

  star: {
    s: { en: "A large ERP-style platform with a 14-person team.", ar: "منصة كبيرة زي الـ ERP بفريق 14 شخص." },
    t: { en: "Part-time, I owned invoices, e-signatures and accounting screens.", ar: "part-time، كنت مسؤول عن الفواتير والتوقيع وشاشات المحاسبة." },
    a: { en: "Built the invoice builder with field arrays and live derived totals, OTP-verified signing for contracts and invoices, journal reports, and co-built Theater OS.", ar: "بنيت الـ invoice builder بـ field arrays وإجمالي محسوب لايف، وتوقيع بـ OTP للعقود والفواتير، وتقارير القيود، وشاركت في Theater OS." },
    r: { en: "192 commits in 7 part-time months, 190 on production, second-most on the team.", ar: "192 كوميت في 7 شهور part-time، 190 على production، تاني أكتر واحد في الفريق." }
  },

  qa: [
    { q: "Why useWatch and not watch() or useState for totals?", a: { en: "The total is derived from the rows. useWatch subscribes inside the totals component, so only it re-renders; watch() at the top re-renders the whole form, and useState would need syncing (a bug source).", ar: "الإجمالي محسوب من الصفوف. useWatch بيشترك جوه component الإجمالي فهو بس اللي بيتعمله re-render؛ watch() فوق بيعمل re-render للفورم كله، و useState محتاج مزامنة (مصدر bugs)." } },
    { q: "Do you trust the total computed in the browser?", a: { en: "No. It is for display; the backend recomputes on save. Anything about money is validated on the server.", ar: "لأ. ده للعرض بس؛ والباك إند بيحسبه تاني وقت الحفظ. أي حاجة فيها فلوس بتتأكد على السيرفر." } },
    { q: "Walk me through the OTP signing flow.", a: { en: "requestOtp with the contract and contact → user enters 6 digits → verifyOtp → terms → draw → sign with the PNG and signer data. A failed step shows the API message and keeps the dialog open.", ar: "requestOtp بالعقد والـ contact ← المستخدم يدخل 6 أرقام ← verifyOtp ← الشروط ← الرسم ← sign بالصورة وبيانات الموقّع. لو خطوة فشلت بتظهر رسالة الـ API والـ dialog يفضل مفتوح." } },
    { q: "How did you avoid stale data after a payment?", a: { en: "Invalidate that invoice and its related lists (credit notes, the list) — not the whole cache.", ar: "invalidate للفاتورة دي وقوايمها المرتبطة (credit notes، القايمة) — مش الكاش كله." } },
    { q: "What would you improve?", a: { en: "A query-key factory; a single step state for wizards; one debounce library; prices always from the API; react-hook-form's <code>values</code> instead of reset in an effect.", ar: "query-key factory؛ قيمة step واحدة للـ wizards؛ مكتبة debounce واحدة؛ الأسعار دايمًا من الـ API؛ و <code>values</code> في react-hook-form بدل reset في effect." } }
  ],

  terms: ["field array", "derived state", "uncontrolled inputs", "schema validation", "single source of truth", "server-side recalculation", "OTP verification", "entity query keys", "debounce", "feature branches"],

  dont: [
    { en: "<b>Zustand</b> is in the project but not in my code.", ar: "<b>Zustand</b> موجود في المشروع بس مش في الكود بتاعي." },
    { en: "Sales CRM: <b>contributor</b>, not main author. Theater OS: <b>co-built</b>.", ar: "Sales CRM: <b>مساهم</b> مش main author. Theater OS: <b>مشاركة</b>." },
    { en: "LiveKit video calls: shared work — don't claim them.", ar: "مكالمات LiveKit: شغل مشترك — ماتقولش إنك عملتها." },
    { en: "No customer or revenue numbers.", ar: "مفيش أرقام عملاء أو أرباح." }
  ],

  evidence: [
    "Repo bites-development/Bites-Mart-Nextjs (laptop 2 ~/Documents/projects, laptop 3 Desktop)",
    "Files: app/(test)/invoice/**, app/(test)/invoice/create/components/sign-circle.tsx, lib/api/dash/modules/contract/signature-flow.ts, app/(test)/theateros/**",
    "Deep dive: evidence/projects/bites-mart.md"
  ]
});
