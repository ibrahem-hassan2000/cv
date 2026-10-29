// Forms & validation — written 2026-10-29.
STUDY.fill("forms", {
  intro: { en: "Forms that are fast, correct and kind: react-hook-form's model, schema validation with Zod, server errors, complex forms (arrays, wizards, dependent fields), file uploads and the UX details.", ar: "فورمز سريعة وصح ولطيفة. طريقة react-hook-form، و validation بـ Zod، وأخطاء السيرفر. والفورمز المعقدة: arrays، و wizards، و fields معتمدة على بعض. ورفع الملفات، وتفاصيل التجربة." },
  topics: [
    {
      id: "rhf-model",
      title: { en: "Why react-hook-form", ar: "ليه react-hook-form" },
      tldr: { en: "RHF registers inputs as uncontrolled (refs), so typing doesn't re-render the form; it tracks dirty/touched/errors, validates with a resolver, and only re-renders what subscribes. Formik/controlled forms re-render on every keystroke.", ar: "الـ RHF بيسجّل الـ inputs كـ uncontrolled (refs)، فالكتابة مش بتعمل re-render للفورم. وبيتابع الـ dirty والـ touched والأخطاء، ويعمل validation بـ resolver. وبيعمل re-render بس للي متابع حاجة معينة. أما Formik والفورمز الـ controlled فبتعمل re-render مع كل حرف." },
      blocks: [
        { type: "code", code: "const { register, handleSubmit, formState: { errors, isSubmitting, isDirty } } =\n  useForm<SignIn>({ resolver: zodResolver(SignInSchema), mode: \"onTouched\" });\n\n<form onSubmit={handleSubmit(onSubmit)} noValidate>\n  <label htmlFor=\"email\">Email</label>\n  <input id=\"email\" type=\"email\" autoComplete=\"email\" {...register(\"email\")}\n         aria-invalid={!!errors.email} aria-describedby=\"email-error\" />\n  {errors.email && <p id=\"email-error\" role=\"alert\">{errors.email.message}</p>}\n  <button disabled={isSubmitting}>Sign in</button>\n</form>" },
        { type: "compare", title: { en: "Validation mode", ar: "وقت الـ validation" }, cols: ["mode", { en: "Validates", ar: "بيعمل validation" }, { en: "Feels", ar: "الإحساس" }], rows: [
          ["onSubmit", { en: "Only on submit (then on change)", ar: "مع الـ submit بس (وبعدين مع التغيير)" }, { en: "Calm", ar: "هادي" }],
          ["onTouched", { en: "After leaving a field, then live", ar: "بعد ما تسيب الـ field، وبعدين لايف" }, { en: "Best default", ar: "أحسن افتراضي" }],
          ["onChange", { en: "Every keystroke", ar: "مع كل حرف" }, { en: "Noisy, slower", ar: "مزعج وأبطأ" }]
        ] }
      ],
      say: "react-hook-form keeps inputs uncontrolled, validates with a schema resolver, and errors are wired with aria-invalid and aria-describedby.",
      interview: [{ q: "react-hook-form vs Formik?", a: { en: "Both handle state and validation. RHF is uncontrolled-first — far fewer re-renders and a smaller bundle; Formik is controlled and re-renders on each change. RHF is the common choice today.", ar: "الاتنين بيتعاملوا مع الـ state والـ validation. الـ RHF بيبدأ uncontrolled، فالـ re-renders أقل بكتير والـ bundle أصغر. أما Formik فـ controlled، وبيعمل re-render مع كل تغيير. والـ RHF هو الاختيار الشائع النهارده." } }],
      quiz: [{ q: { en: "Which RHF mode is a good default?", ar: "أنهي mode في RHF افتراضي كويس؟" }, a: { en: "onTouched.", ar: "onTouched." } }],
      quick: [{ en: "Uncontrolled + resolver + onTouched; aria-invalid/aria-describedby on errors.", ar: "uncontrolled و resolver و onTouched. ومع الأخطاء: aria-invalid و aria-describedby." }]
    },
    {
      id: "schemas",
      title: { en: "Schema validation with Zod (vs Yup)", ar: "Validation بـ Zod (ولا Yup)" },
      tldr: { en: "A schema is one source of truth: it validates at runtime and gives the TypeScript type (<code>z.infer</code>). Reuse it on the client and, in a TS backend, on the server. Yup is similar but with weaker type inference.", ar: "الـ schema مصدر حقيقة واحد: بيعمل validation وقت التشغيل وبيدي الـ TypeScript type (<code>z.infer</code>). استخدمه في الـ client، ولو الباك إند TS على السيرفر كمان. و Yup شبهه بس الـ type inference أضعف." },
      blocks: [
        { type: "code", code: "const Invoice = z.object({\n  customer: z.string().min(1, \"required\"),\n  dueDate: z.coerce.date().min(new Date(), \"must be in the future\"),\n  lines: z.array(z.object({ item: z.string().min(1), qty: z.number().int().positive(), price: z.number().nonnegative() })).min(1),\n  discount: z.number().min(0).max(100).optional(),\n}).refine((v) => !v.discount || v.lines.length > 1, { path: [\"discount\"], message: \"discount needs 2+ lines\" });\n\ntype Invoice = z.infer<typeof Invoice>;\nconst parsed = Invoice.safeParse(data);           // { success, data } | { success: false, error }" },
        { type: "projects", items: [
          { text: { en: "Smart FAQ and Bites: Zod; okoRent: yup — both with react-hook-form.", ar: "Smart FAQ و Bites: بـ Zod. و okoRent: بـ yup. والاتنين مع react-hook-form." }, p: "okorent", tab: "decisions", label: "okoRent" }
        ] }
      ],
      say: "One Zod schema gives me the runtime validation and the TypeScript type, so the form and its type never disagree.",
      interview: [{ q: "Cross-field validation (end date after start date)?", a: { en: "<code>.refine</code>/<code>.superRefine</code> on the object, with <code>path</code> pointing at the field that should show the error.", ar: "<code>.refine</code> أو <code>.superRefine</code> على الـ object، و <code>path</code> بيشاور على الـ field اللي المفروض يظهر عليه الخطأ." } }],
      quiz: [{ q: { en: "parse vs safeParse?", ar: "parse ولا safeParse؟" }, a: { en: "parse throws on invalid data; safeParse returns a result object.", ar: "الـ parse بيرمي error مع الداتا الغلط. أما safeParse فبيرجّع object فيه النتيجة." } }],
      quick: [{ en: "Schema = validation + type (z.infer); refine for cross-field; safeParse at boundaries.", ar: "الـ schema بتديك validation و type مع بعض (z.infer). و refine للعلاقة بين الـ fields. و safeParse أول ما الداتا تدخل." }]
    },
    {
      id: "server-errors",
      title: { en: "Server errors and submission states", ar: "أخطاء السيرفر وحالات الـ submit" },
      tldr: { en: "The client checks shape; the server checks truth (email taken, insufficient stock). Map 422 field errors back onto fields, show a form-level message for the rest, disable the button while submitting, and keep the user's input on failure.", ar: "الـ client بيتأكد من الشكل، والسيرفر بيتأكد من الحقيقة (زي إن الإيميل مستخدم، أو المخزون مش كفاية). رجّع أخطاء الـ 422 على الـ fields بتاعتها، واعرض رسالة عامة للباقي. واقفل الزرار وقت الـ submit. ولو حصل فشل، حافظ على اللي اليوزر كتبه." },
      blocks: [
        { type: "code", code: "const save = useMutation({\n  mutationFn: api.invoices.create,\n  onError: (e: ApiError) => {\n    if (e.fieldErrors) {\n      for (const [field, codes] of Object.entries(e.fieldErrors)) form.setError(field as any, { message: t(codes[0]) });\n      form.setFocus(Object.keys(e.fieldErrors)[0] as any);          // move focus to the first error\n    } else form.setError(\"root\", { message: t(e.code) });\n  },\n});" },
        { type: "projects", items: [{ text: { en: "Smart FAQ's lib/form-errors maps the API's error catalogue to field messages (with tests).", ar: "lib/form-errors في Smart FAQ بيحول كتالوج أخطاء الـ API لرسايل على الـ fields (ومعاه tests)." }, p: "smartfaq", tab: "hooks", label: "Smart FAQ" }] }
      ],
      say: "Server validation errors come back as field codes that I map onto the same fields, with focus moved to the first error and the user's input kept.",
      interview: [{ q: "What happens to a form when the network fails mid-submit?", a: { en: "Keep all input, re-enable the button, show a clear retryable message (not a field error), and make the request idempotent if the user may resubmit.", ar: "حافظ على كل اللي اتكتب، وافتح الزرار تاني، واعرض رسالة واضحة تقدر تعيد منها (مش خطأ field)، وخلي الـ request idempotent لو المستخدم ممكن يبعت تاني." } }],
      quiz: [{ q: { en: "Where do non-field server errors go in RHF?", ar: "أخطاء السيرفر اللي مش لـ field معين بتروح فين في RHF؟" }, a: { en: "setError(\"root\", …) — a form-level error.", ar: "setError(\"root\", …) — خطأ على مستوى الفورم." } }],
      quick: [{ en: "Client = shape, server = truth; 422 → setError per field; root error for the rest; focus first error; keep input.", ar: "الـ client للشكل، والسيرفر للحقيقة. والـ 422 بيتحول لـ setError لكل field، و root للباقي. واعمل focus لأول خطأ، وحافظ على المدخلات." }]
    },
    {
      id: "complex-forms",
      title: { en: "Complex forms: arrays, wizards, dependent fields", ar: "فورمز معقدة: arrays و wizards و fields معتمدة" },
      tldr: { en: "Dynamic lists → <code>useFieldArray</code> (key = <code>field.id</code>). Multi-step wizards → one form across steps, validate per step with <code>trigger([fields])</code>. Dependent fields → <code>useWatch</code> in a small component. Live totals → derive from watched values.", ar: "قوايم بتتغير ← <code>useFieldArray</code> (الـ key = <code>field.id</code>). Wizards بخطوات ← فورم واحد على كل الخطوات، و validation لكل خطوة بـ <code>trigger([fields])</code>. Fields معتمدة على بعض ← <code>useWatch</code> في component صغير. المجاميع اللايف ← اشتقها من القيم المتراقبة." },
      blocks: [
        { type: "code", code: "async function next() {\n  const ok = await form.trigger(STEP_FIELDS[step]);    // validate only this step\n  if (ok) setStep((s) => s + 1);\n}\n\nfunction ShippingFields() {\n  const method = useWatch({ name: \"shipping.method\" });   // only this component re-renders\n  return method === \"pickup\" ? <BranchSelect /> : <AddressFields />;\n}" },
        { type: "projects", items: [
          { text: { en: "Bites: invoice builder (lines, payments, attachments) and contract creation; AHS: formula form with live validation; Spectra: contracts and patient records.", ar: "Bites: الـ invoice builder (سطور، ومدفوعات، ومرفقات)، وإنشاء العقود. و AHS: فورم المعادلات بـ validation لايف. و Spectra: العقود وسجلات المرضى." }, p: "bites", tab: "decisions", label: "Bites" }
        ] }
      ],
      say: "A wizard is one form validated step by step with trigger, and dependent fields watch just the values they need in small components.",
      interview: [{ q: "How do you keep a 50-field form fast?", a: { en: "Uncontrolled inputs, isolate subscriptions with useWatch/Controller in small components, avoid watching the whole form, and split long forms into sections or steps.", ar: "Inputs uncontrolled، واعزل الاشتراكات بـ useWatch و Controller في components صغيرة، ومتراقبش الفورم كله، وقسّم الفورمز الطويلة لأجزاء أو خطوات." } }],
      quiz: [{ q: { en: "Key for useFieldArray rows?", ar: "الـ key لصفوف useFieldArray؟" }, a: { en: "field.id (not the index).", ar: "field.id (مش الـ index)." } }],
      quick: [{ en: "useFieldArray (field.id) · wizard = one form + trigger per step · useWatch in small components.", ar: "useFieldArray (field.id) · wizard = فورم واحد و trigger لكل خطوة · useWatch في components صغيرة." }]
    },
    {
      id: "form-ux",
      title: { en: "Form UX: uploads, unsaved changes, accessibility", ar: "تجربة الفورم: الرفع والتغييرات غير المحفوظة والـ accessibility" },
      tldr: { en: "Show progress and validate type/size before uploading (and again on the server); warn before leaving with unsaved changes; label every field, announce errors, never rely on colour alone; don't disable the submit button without saying why.", ar: "اعرض التقدم، واتأكد من النوع والحجم قبل الرفع، وتاني على السيرفر. وحذّر قبل الخروج لو فيه تغييرات متحفظتش. وحط label لكل field، وأعلن الأخطاء، ومتعتمدش على اللون بس. ومتقفلش زرار الـ submit من غير ما تقول ليه." },
      blocks: [
        { type: "code", code: "// upload with progress (fetch has no upload progress → XMLHttpRequest or a presigned URL + XHR)\nconst xhr = new XMLHttpRequest();\nxhr.upload.onprogress = (e) => setProgress(Math.round((e.loaded / e.total) * 100));\nxhr.open(\"PUT\", presignedUrl); xhr.send(file);\n\n// unsaved changes\nconst blocker = useBlocker(({ currentLocation, nextLocation }) => form.formState.isDirty && currentLocation.pathname !== nextLocation.pathname);" },
        { type: "projects", items: [
          { text: { en: "Smart FAQ: leave-without-saving guard (one provider collects all dirty forms), save-status line and toasts; ElevateMate: application form with file upload.", ar: "Smart FAQ: تحذير قبل الخروج من غير حفظ (provider واحد بيجمع كل الفورمز اللي اتعدلت)، وسطر لحالة الحفظ، و toasts. و ElevateMate: فورم تقديم فيه رفع ملف." }, p: "smartfaq", tab: "hooks", label: "Smart FAQ" },
          { text: { en: "Bites: OTP-verified e-signatures on contracts and invoices.", ar: "Bites: توقيع إلكتروني متأكد بـ OTP على العقود والفواتير." }, p: "bites", tab: "decisions", label: "Bites" }
        ] }
      ],
      say: "Long forms warn before you lose work, uploads show progress and are validated on both sides, and errors are announced, not just coloured red.",
      interview: [{ q: "Why not just disable Submit until the form is valid?", a: { en: "Users can't tell what's wrong, and screen readers may skip disabled buttons. Let them submit, then show and focus the errors.", ar: "المستخدم مش هيعرف إيه الغلط، وقارئ الشاشة ممكن يتجاهل الزراير المقفولة. سيبه يبعت، وبعدين اعرض الأخطاء واعمل focus عليها." } }],
      quiz: [{ q: { en: "Does fetch report upload progress?", ar: "الـ fetch بيقول تقدم الرفع؟" }, a: { en: "Not in a widely supported way — use XHR's upload.onprogress.", ar: "مش بشكل مدعوم في كل حتة — استخدم upload.onprogress في XHR." } }],
      quick: [{ en: "Validate files twice; progress via XHR; unsaved-changes guard; announce + focus errors; don't hide why submit is disabled.", ar: "اتأكد من الملفات مرتين. والتقدم بـ XHR. وتحذير للتغييرات اللي متحفظتش. وأعلن الأخطاء واعمل focus. ومتخبيش الزرار مقفول ليه." }]
    }
  ]
});
