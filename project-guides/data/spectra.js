// Spectra — researched from the code on laptop 3 (repo Profound-Group/Spectra New Project, branch Production), 2026-10-28.
// Counts = hook calls added in his diffs. Code sketches are simplified patterns, not project code.
HANDBOOK.projects.push({
  id: "spectra",
  name: "Spectra",
  logo: "assets/img/spectra-logo.png",
  color: "#17808a",
  company: "Profound Agency",
  years: "2024",
  period: "Jul – Nov 2024",
  role: { en: "Owned the admin & doctor portals", ar: "مسؤول عن بوابة الأدمن والدكتور" },
  team: { en: "2 frontend devs + .NET backend", ar: "2 فرونت إند + باك إند .NET" },
  tagline: { en: "A Saudi healthcare platform connecting people with disabilities and their families to doctors and care.", ar: "منصة صحية سعودية بتوصّل ذوي الإعاقة وأسرهم بالدكاترة والرعاية." },
  stats: [
    ["242", { en: "commits, all on Production", ar: "كوميت، كلهم على Production" }],
    ["~120", { en: "pages (80 admin + 40 doctor)", ar: "صفحة (80 أدمن + 40 دكتور)" }],
    ["8", { en: "master-data resources", ar: "أنواع master data" }],
    ["4 mo", { en: "Jul → Nov 2024", ar: "يوليو ← نوفمبر 2024" }]
  ],

  pitch: [
    { en: "Spectra (spectra.sa) gives families of people with disabilities <b>appointments, prescriptions, medical reports, video sessions and contracts</b> with organizations.", ar: "Spectra (spectra.sa) بيدي أسر ذوي الإعاقة <b>مواعيد، روشتات، تقارير طبية، جلسات فيديو، وعقود</b> مع المؤسسات." },
    { en: "I owned the <b>admin portal</b> (back office) and the <b>doctor portal</b>; a teammate owned the client portal.", ar: "كنت مسؤول عن <b>بوابة الأدمن</b> (الـ back office) و<b>بوابة الدكتور</b>؛ وزميلي كان مسؤول عن بوابة العميل." },
    { en: "I built ~120 pages with one CRUD pattern for 8 master-data types, contract signing, and the doctor's in-session panel.", ar: "عملت حوالي 120 صفحة بـ pattern واحد للـ CRUD لـ 8 أنواع master data، وتوقيع العقود، وبانل الدكتور أثناء الجلسة." }
  ],

  built: [
    { title: { en: "Admin — clients and staff", ar: "الأدمن — العملاء والموظفين" }, items: [
      { en: "Organizations: contracts, employees, prescriptions, patients", ar: "المؤسسات: العقود، الموظفين، الروشتات، المرضى" },
      { en: "Families: patients, prescriptions, medical reports", ar: "الأسر: المرضى، الروشتات، التقارير الطبية" },
      { en: "Staff: add, profile, clients, contracts, team", ar: "الموظفين: إضافة، بروفايل، العملاء، العقود، الفريق" }
    ]},
    { title: { en: "Admin — master data & settings", ar: "الأدمن — الـ master data والإعدادات" }, items: [
      { en: "CRUD: drugs, analyses, complaints, departments, diagnostics, specialties, services, tests", ar: "CRUD: الأدوية، التحاليل، الشكاوى، الأقسام، التشخيصات، التخصصات، الخدمات، الفحوصات" },
      { en: "Website content, subscription packages, user permissions", ar: "محتوى الموقع، باقات الاشتراك، صلاحيات المستخدمين" }
    ]},
    { title: { en: "Doctor portal", ar: "بوابة الدكتور" }, items: [
      { en: "Appointments: upcoming, previous, cancelled, deferred, calendar, working hours", ar: "المواعيد: الجاية، القديمة، الملغية، المؤجلة، التقويم، ساعات العمل" },
      { en: "Patients: details, activities, prescriptions, reports, invitation code", ar: "المرضى: التفاصيل، الأنشطة، الروشتات، التقارير، كود الدعوة" },
      { en: "Contracts, chats, profile, ratings, plans, wallet, settings", ar: "العقود، الشات، البروفايل، التقييمات، الباقات، المحفظة، الإعدادات" }
    ]},
    { title: { en: "Video session & contracts", ar: "جلسة الفيديو والعقود" }, items: [
      { en: "Call screen + doctor panel: complaints, diagnoses, drugs, referrals, notes", ar: "شاشة المكالمة + بانل الدكتور: الشكوى، التشخيص، الأدوية، الإحالات، الملاحظات" },
      { en: "Drawn signatures on contracts (admin, staff, doctor)", ar: "توقيع بالرسم على العقود (أدمن، موظف، دكتور)" }
    ]}
  ],

  myRole: [
    { en: "Owned the admin and doctor portals (user's words). Git agrees: I created ~143 pages — <b>80 admin, 40 doctor</b>.", ar: "كنت مسؤول عن بوابة الأدمن والدكتور (كلامك). والـ git بيأكد: عملت حوالي 143 صفحة — <b>80 أدمن و 40 دكتور</b>." },
    { en: "All 242 of my commits are on <code>Production</code>.", ar: "الـ 242 كوميت بتوعي كلهم على <code>Production</code>." },
    { en: "After I moved to okoRent (Nov 2024), my teammate refactored the layouts and finished flows like contract accept/reject. So: “I built both portals”, not “the final version of every flow”.", ar: "بعد ما اتنقلت لـ okoRent (نوفمبر 2024)، زميلي عمل refactor للـ layouts وكمّل حاجات زي قبول/رفض العقود. فقول: «بنيت البوابتين»، مش «النسخة النهائية من كل flow»." }
  ],

  stack: [
    [{ en: "Core", ar: "الأساس" }, ["Next.js 14 (App Router)", "React 18", "JavaScript (JSX)"]],
    [{ en: "Data", ar: "الداتا" }, ["TanStack Query v5", "axios"]],
    [{ en: "State", ar: "الـ State" }, ["useState", "Zustand (modal store)"]],
    [{ en: "UI", ar: "الواجهة" }, ["Mantine 7 (core, dates, dropzone)", "Tailwind", "Headless UI"]],
    [{ en: "Special", ar: "حاجات خاصة" }, ["react-signature-canvas", "react-sortablejs", "react-phone-input-2"]],
    [{ en: "i18n", ar: "اللغات" }, ["next-intl (Arabic / English)"]]
  ],

  decisions: [
    {
      title: { en: "JavaScript or TypeScript", ar: "JavaScript ولا TypeScript" },
      chose: "JavaScript", alts: ["TypeScript"],
      why: { en: "The frontend was started in JavaScript and the team kept it to move fast.", ar: "الفرونت بدأ JavaScript والفريق كمل عليه علشان السرعة." },
      both: { v: "yes", en: "Next.js allows JS and TS files side by side (<code>allowJs</code>) — the normal way to migrate gradually.", ar: "Next.js بيسمح بملفات JS و TS مع بعض (<code>allowJs</code>) — ودي الطريقة العادية للـ migration بالتدريج." },
      better: { en: "TypeScript. Wrong API shapes and typos in props would be caught before running. I used TypeScript on my next project (okoRent).", ar: "TypeScript. الأخطاء في شكل داتا الـ API والـ props كانت هتتمسك قبل التشغيل. واستخدمت TypeScript في المشروع اللي بعده (okoRent)." },
      say: "Spectra was JavaScript; the bugs we hit with API shapes are exactly why I moved to TypeScript on my next project.",
      concept: "typescript"
    },
    {
      title: { en: "Server data", ar: "داتا السيرفر" },
      chose: "TanStack Query", alts: ["useEffect + useState fetching"],
      why: { en: "From Oct 2024 every master-data resource got a hook set (Get, GetByID, Create, Update, Delete) instead of fetching in effects.", ar: "من أكتوبر 2024 كل resource في الـ master data بقى ليه hooks (Get، GetByID، Create، Update، Delete) بدل الـ fetch جوه effects." },
      both: { v: "partly", en: "Mixing both works during a migration, but data fetched in effects misses the cache and invalidation.", ar: "الخلط بينهم شغال وقت الـ migration، بس الداتا اللي جاية من effects بتفوّت الكاش والـ invalidation." },
      better: { en: "Same tool, with <b>one key convention</b>. Some hooks used the URL as the key while some invalidations used a different key, so lists sometimes didn't refresh.", ar: "نفس الأداة، بس بـ <b>طريقة واحدة للـ keys</b>. بعض الـ hooks كان الـ key بتاعها الـ URL وبعض الـ invalidations بـ key تاني، فالقوايم أحيانًا ماكانتش بتتحدث." },
      say: "The lesson from Spectra was that query keys must follow one convention; on okoRent I used a base key per domain.",
      concept: "query-keys"
    },
    {
      title: { en: "Form state", ar: "حالة الفورمز" },
      chose: "useState + useEffect", alts: ["react-hook-form", "Formik"],
      why: { en: "Forms were controlled inputs in local state (308 <code>useState</code> calls). Edit pages copied the fetched record into state with <code>useEffect</code>.", ar: "الفورمز كانت controlled inputs في state محلي (308 مرة <code>useState</code>). وصفحات التعديل كانت بتنسخ الداتا اللي جت في state بـ <code>useEffect</code>." },
      both: { v: "no", en: "A form library and hand-rolled state for the same form fight each other.", ar: "form library و state يدوي لنفس الفورم هيتخانقوا." },
      better: { en: "react-hook-form with <code>values</code> / <code>reset</code>: fewer re-renders, validation built in, and no second copy of the data.", ar: "react-hook-form بـ <code>values</code> / <code>reset</code>: re-renders أقل، validation جاهز، ومفيش نسخة تانية من الداتا." },
      say: "Copying server data into local state with an effect creates two sources of truth; a form library with reset or values avoids that.",
      concept: "effects"
    },
    {
      title: { en: "Shared modal state", ar: "حالة الـ modal المشتركة" },
      chose: "Zustand store", alts: ["React Context", "prop drilling"],
      why: { en: "Any component needed to open the same modal with an id and type. A tiny store avoids passing props through many levels.", ar: "أي component كان محتاج يفتح نفس الـ modal بـ id و type. store صغير بيوفر تمرير الـ props في مستويات كتير." },
      both: { v: "yes", en: "Zustand for global UI state + local useState for component state is the usual mix.", ar: "Zustand للـ UI state العام + useState للحاجات المحلية ده الخلط العادي." },
      better: { en: "Fine as is.", ar: "كده تمام." },
      say: "A small Zustand store let any page open the shared modal without prop drilling."
    },
    {
      title: { en: "Contract signatures", ar: "توقيع العقود" },
      chose: "react-signature-canvas", alts: ["typed name", "e-sign provider"],
      why: { en: "A drawn signature inside a modal, sent as an image with the contract — simple and fast to ship.", ar: "توقيع بالرسم جوه modal، بيتبعت كصورة مع العقد — بسيط وسريع." },
      both: { v: "no", en: "One signing method per document.", ar: "طريقة توقيع واحدة لكل مستند." },
      better: { en: "Verify identity first (OTP) — which is what I built later at Bites.", ar: "تتأكد من الهوية الأول (OTP) — وده اللي عملته بعدها في Bites." },
      say: "On Spectra signatures were drawn only; on Bites I added OTP verification before signing."
    },
    {
      title: { en: "Drag-to-reorder", ar: "الترتيب بالسحب" },
      chose: "react-sortablejs", alts: ["dnd-kit"],
      why: { en: "Ordering package content in admin with a quick drag-and-drop list.", ar: "ترتيب محتوى الباقات في الأدمن بقايمة سحب وإفلات سريعة." },
      both: { v: "partly", en: "The repo has both react-sortablejs and dnd-kit — two libraries for one job.", ar: "الـ repo فيه react-sortablejs و dnd-kit — مكتبتين لنفس الشغلانة." },
      better: { en: "dnd-kit: React-first, accessible (keyboard support), one library for the whole app.", ar: "dnd-kit: معمول لـ React، accessible (بيشتغل بالكيبورد)، مكتبة واحدة للتطبيق كله." },
      say: "If I did it again I'd standardize on dnd-kit for accessibility and to avoid two drag-and-drop libraries.",
      concept: "one-tool"
    }
  ],

  flows: [
    {
      title: { en: "One CRUD pattern for 8 resources", ar: "pattern واحد للـ CRUD لـ 8 أنواع" },
      steps: [
        ["endpoints.js", { en: "every URL in one file", ar: "كل الـ URLs في ملف واحد" }],
        ["useAPI hooks", { en: "Get / GetByID / Create / Update / Delete", ar: "Get / GetByID / Create / Update / Delete" }],
        ["List page", { en: "shared table + actions menu", ar: "جدول مشترك + actions menu" }],
        ["Details", { en: "same layout for every resource", ar: "نفس الشكل لكل نوع" }],
        ["Add / Edit", { en: "multipart form for files", ar: "فورم multipart للملفات" }]
      ]
    },
    {
      title: { en: "A doctor's video session", ar: "جلسة فيديو للدكتور" },
      steps: [
        ["Appointment", { en: "doctor opens the session", ar: "الدكتور بيفتح الجلسة" }],
        ["Call screen", { en: "patient + doctor view", ar: "عرض المريض والدكتور" }],
        ["Panel", { en: "complaints, diagnoses, drugs", ar: "الشكوى، التشخيص، الأدوية" }],
        ["Referrals", { en: "nominations + notes", ar: "الإحالات + الملاحظات" }],
        ["Records", { en: "saved to the patient's file", ar: "بتتحفظ في ملف المريض" }]
      ]
    }
  ],

  patterns: [
    {
      title: { en: "Hook set per resource", ar: "hooks لكل resource" },
      body: { en: "Every master-data resource exposes the same five hooks, so pages look and behave the same.", ar: "كل resource بيطلّع نفس الـ 5 hooks، فالصفحات شكلها وسلوكها واحد." },
      code: "export const useDrugs = () =>\n  useQuery({ queryKey: drugKeys.list(), queryFn: () => api.get(urls.drugs) });\n\nexport const useDrug = (id) =>\n  useQuery({ queryKey: drugKeys.detail(id), queryFn: () => api.get(urls.drug(id)), enabled: !!id });\n\nexport const useDeleteDrug = () => {\n  const qc = useQueryClient();\n  return useMutation({\n    mutationFn: (id) => api.delete(urls.drug(id)),\n    // same key family as the queries above — the lesson from Spectra\n    onSuccess: () => qc.invalidateQueries({ queryKey: drugKeys.all }),\n  });\n};"
    },
    {
      title: { en: "Before and after: edit forms", ar: "قبل وبعد: فورمز التعديل" },
      body: { en: "What I did on Spectra (copy into state in an effect) and the cleaner version I'd write today.", ar: "اللي عملته في Spectra (نسخ في state جوه effect) والنسخة الأنضف اللي هكتبها النهارده." },
      code: "// Spectra: two copies of the same data\nconst { data, isLoading } = useStaff(id);\nconst [form, setForm] = useState({});\nuseEffect(() => { if (data) setForm(data); }, [isLoading]);\n\n// Today: the form library owns the form, the query owns the data\nconst { data } = useStaff(id);\nconst { register, handleSubmit } = useForm({ values: data });"
    }
  ],

  hooks: [
    { group: { en: "Server data", ar: "داتا السيرفر" }, items: [
      { name: "useQuery", count: "×26", what: { en: "Get and GetByID per resource.", ar: "Get و GetByID لكل resource." } },
      { name: "useMutation", count: "×31", what: { en: "Create / Update / Delete; then invalidate or refetch the list.", ar: "إنشاء / تعديل / حذف؛ وبعدها invalidate أو refetch للقايمة." }, remember: { en: "Invalidate with the <b>same key family</b> the query used.", ar: "اعمل invalidate بـ <b>نفس عيلة الـ key</b> اللي الـ query استخدمها." } },
      { name: "invalidateQueries", count: "×20", what: { en: "Refresh lists after a change.", ar: "تحديث القوايم بعد أي تغيير." } }
    ]},
    { group: { en: "State and effects", ar: "الـ State والـ effects" }, items: [
      { name: "useState", count: "×308", what: { en: "Form fields (controlled inputs) and UI state.", ar: "حقول الفورم (controlled inputs) وحالة الواجهة." } },
      { name: "useEffect", count: "×31", what: { en: "Copy fetched data into edit-form state; redirect after a successful mutation; reset the form after an add.", ar: "نسخ الداتا اللي جت لـ state فورم التعديل؛ redirect بعد نجاح الـ mutation؛ تفضية الفورم بعد الإضافة." }, remember: { en: "Depending on <code>[isLoading]</code> to copy data is fragile; a form library is cleaner.", ar: "الاعتماد على <code>[isLoading]</code> علشان تنسخ الداتا هش؛ الـ form library أنضف." } },
      { name: "useModal (Zustand)", what: { en: "Shared modal: open, id, type, selected count.", ar: "modal مشترك: مفتوح؟، id، type، عدد المختار." } },
      { name: "useRef", count: "×4", what: { en: "The signature canvas — clear it or export the image.", ar: "الـ signature canvas — تمسحه أو تاخده صورة." } },
      { name: "useMemo", count: "×5", what: { en: "Light derived values for tables.", ar: "قيم محسوبة بسيطة للجداول." } }
    ]},
    { group: { en: "Navigation", ar: "التنقل" }, items: [
      { name: "useParams / useSearchParams / useRouter", count: "×31 / ×34 / ×27", what: { en: "Read the id and type from the URL; move between list, details and edit.", ar: "يقرا الـ id والـ type من الـ URL؛ ويتنقل بين القايمة والتفاصيل والتعديل." } },
      { name: "useDisclosure", count: "×8", what: { en: "Mantine: open/close modals.", ar: "Mantine: فتح وقفل الـ modals." } }
    ]}
  ],

  problems: [
    {
      title: { en: "Eight CRUD resources, consistent, in little time", ar: "8 أنواع CRUD، بنفس الشكل، في وقت قصير" },
      problem: { en: "Admin needed full CRUD for 8 master-data types; building each separately would drift.", ar: "الأدمن محتاج CRUD كامل لـ 8 أنواع master data؛ لو كل واحد اتعمل لوحده هيختلفوا." },
      fix: { en: "Central endpoints + one hook set per resource + the same four pages and components.", ar: "endpoints مركزية + hooks لكل resource + نفس الـ 4 صفحات والـ components." },
      result: { en: "“API in main data in 5 sections” landed in one commit (Oct 2024); the rest followed the same way.", ar: "«API في الـ main data في 5 أقسام» اتعمل في كوميت واحد (أكتوبر 2024)؛ والباقي بنفس الطريقة." }
    },
    {
      title: { en: "Lists that didn't refresh after an edit", ar: "قوايم ماكانتش بتتحدث بعد التعديل" },
      problem: { en: "Queries were keyed by URL while some invalidations used a different key (e.g. <code>[\"Drugs\"]</code>).", ar: "الـ queries كان الـ key بتاعها الـ URL، وبعض الـ invalidations بـ key تاني (زي <code>[\"Drugs\"]</code>)." },
      fix: { en: "My teammate aligned the keys after I left; I applied the lesson on okoRent with a base key per domain.", ar: "زميلي ظبط الـ keys بعد ما مشيت؛ وأنا طبقت الدرس في okoRent بـ key أساسي لكل domain." },
      result: { en: "A concrete “what I learned” story for interviews.", ar: "قصة حقيقية لسؤال «اتعلمت إيه»." },
      lesson: { en: "Query keys need one convention, ideally a key factory.", ar: "الـ query keys محتاجة طريقة واحدة، والأحسن key factory." }
    },
    {
      title: { en: "Signing contracts inside the platform", ar: "توقيع العقود جوه المنصة" },
      problem: { en: "Contracts between the platform, organizations and doctors needed in-app signing.", ar: "العقود بين المنصة والمؤسسات والدكاترة كانت محتاجة توقيع جوه المنصة." },
      fix: { en: "react-signature-canvas in a modal for admin, staff and doctor; the signature is sent as an image with the contract.", ar: "react-signature-canvas في modal للأدمن والموظف والدكتور؛ والتوقيع بيتبعت صورة مع العقد." },
      result: { en: "Contracts signed without leaving the platform.", ar: "العقود بتتوقع من غير ما تخرج من المنصة." }
    }
  ],

  star: {
    s: { en: "A Saudi healthcare platform with three user types and a large back office.", ar: "منصة صحية سعودية بـ 3 أنواع مستخدمين و back office كبير." },
    t: { en: "I owned the admin and doctor portals.", ar: "كنت مسؤول عن بوابة الأدمن والدكتور." },
    a: { en: "Set one CRUD pattern (central endpoints, hook sets, identical pages) and built the doctor's screens: appointments, patient records, prescriptions, reports, signed contracts and the video-session panel.", ar: "عملت pattern واحد للـ CRUD (endpoints مركزية، hooks، صفحات بنفس الشكل)، وبنيت شاشات الدكتور: المواعيد، ملفات المرضى، الروشتات، التقارير، العقود بالتوقيع، وبانل جلسة الفيديو." },
    r: { en: "About 120 pages and 242 commits in 4 months, all on production.", ar: "حوالي 120 صفحة و 242 كوميت في 4 شهور، كلهم على production." }
  },

  qa: [
    { q: "How did you split work with the other frontend developer?", a: { en: "By portal: I owned admin and doctor, he owned client. Shared pieces (components, routes, endpoints) we both edited.", ar: "بالبوابة: أنا الأدمن والدكتور، وهو العميل. الحاجات المشتركة (components، routes، endpoints) كنا بنعدل فيها الاتنين." } },
    { q: "How did permissions work?", a: { en: "An admin area lists users and their levels, with editing per user. Enforcement is on the backend; the frontend shows and edits it.", ar: "في جزء في الأدمن بيعرض المستخدمين ومستوياتهم، وتعديل صلاحيات كل واحد. التنفيذ الفعلي على الباك إند؛ والفرونت بيعرض ويعدّل." } },
    { q: "What did you learn on this project?", a: { en: "Keep query keys consistent, prefer TypeScript, and don't copy server data into local state with effects. I applied all three on okoRent.", ar: "خلي الـ query keys بطريقة واحدة، استخدم TypeScript، وماتنسخش داتا السيرفر في state بـ effects. وطبقت التلاتة في okoRent." } }
  ],

  terms: ["back office", "master data", "CRUD", "role-based portals", "query key convention", "single source of truth", "controlled inputs", "gradual TypeScript migration"],

  dont: [
    { en: "The project is <b>JavaScript, not TypeScript</b>.", ar: "المشروع <b>JavaScript مش TypeScript</b>." },
    { en: "SignalR, FullCalendar, dnd-kit and zod are in the repo but not in my code.", ar: "SignalR و FullCalendar و dnd-kit و zod موجودين في المشروع بس مش في الكود بتاعي." },
    { en: "Video session: I built the <b>screens and the doctor panel</b>, not the video streaming.", ar: "جلسة الفيديو: أنا عملت <b>الشاشات وبانل الدكتور</b>، مش الـ video streaming." },
    { en: "Don't claim the client portal. No user numbers.", ar: "ماتقولش إنك عملت بوابة العميل. ومفيش أرقام مستخدمين." }
  ],

  evidence: [
    "Repo Profound-Group/Spectra New Project (laptop 3), frontend Spectra.Web/ClientApp/spectra-client, branch Production",
    "Main data API in 5 sections (2024-10-16) · contracts + signature 34ae6457 · video pages de21b55a / 40b15db7",
    "Deep dive: evidence/projects/spectra.md"
  ]
});
