// Deep dive for the State management section. Same shape as deep-javascript.js (see README "Deep dive").
STUDY.deepen("state", {
  "kinds-of-state": {
    why: {
      en: "“How do you manage state in a large app?” has no single-library answer. Interviewers look for the classification first — which kind of state is this? — because the right tool follows from it.",
      ar: "«بتدير الـ state إزاي في app كبير؟» ملهاش إجابة بمكتبة واحدة. والإنترفيورز بيدوّروا على التصنيف الأول — الـ state ده من أنهي نوع؟ — لأن الأداة الصح بتيجي منه."
    },
    how: [
      {
        title: { en: "Five kinds, five homes", ar: "خمس أنواع، وخمس أماكن" },
        body: {
          en: "<b>Server state</b> (data owned by the backend) → a query cache (TanStack Query, RSC). <b>URL state</b> (filters, tabs, page, selected id) → the URL (search params, nuqs). <b>Form state</b> (values, errors, dirty) → a form library. <b>Local UI state</b> (open, hover, input text) → <code>useState</code> in the component. <b>Shared client state</b> (theme, a cart before checkout, a multi-step wizard) → context or a small store.",
          ar: "<b>Server state</b> (داتا الـ backend هو صاحبها) ← query cache (TanStack Query، RSC). و <b>URL state</b> (فلاتر، tabs، صفحة، id مختار) ← الـ URL (search params، nuqs). و <b>Form state</b> (قيم، errors، dirty) ← مكتبة فورم. و <b>Local UI state</b> (مفتوح، hover، نص input) ← <code>useState</code> في الـ component. و <b>Shared client state</b> (theme، cart قبل الدفع، wizard بكذا خطوة) ← context أو store صغير."
        }
      },
      {
        title: { en: "Server state is a cache, not your state", ar: "الـ server state عبارة عن cache، مش state بتاعك" },
        body: {
          en: "You don't own it: it can change on the server any time, so it needs freshness rules, refetching, deduplication and invalidation. Putting it in Redux or Zustand means rebuilding a cache by hand — usually worse.",
          ar: "إنت مش صاحبها: ممكن تتغير على السيرفر في أي وقت، فمحتاجة قواعد freshness، و refetching، و dedup، و invalidation. وإنك تحطها في Redux أو Zustand معناه إنك بتبني cache بإيدك — وغالبًا أوحش."
        }
      },
      {
        title: { en: "URL state makes the UI shareable", ar: "الـ URL state بيخلي الـ UI ينفع يتشارك" },
        body: {
          en: "Anything a user would expect to survive a refresh, the back button or a shared link — filters, sort, page, the open tab — belongs in the URL. It also becomes the query key input, so the cache follows the URL automatically.",
          ar: "أي حاجة اليوزر متوقع إنها تفضل بعد الـ refresh أو زرار الرجوع أو لينك اتبعت — فلاتر، ترتيب، صفحة، الـ tab المفتوح — مكانها الـ URL. وكمان بتبقى جزء من الـ query key، فالـ cache بيمشي ورا الـ URL أوتوماتيك."
        }
      }
    ],
    breaks: [
      {
        title: { en: "Server data copied into a global store", ar: "داتا السيرفر منسوخة في global store" },
        body: {
          en: "A Redux slice filled in an effect: no refetch on focus, manual loading flags in every slice, stale data after another tab edits it, and hand-written invalidation everywhere.",
          ar: "Redux slice بيتملا في effect: مفيش refetch مع الـ focus، و loading flags بإيدك في كل slice، وداتا قديمة بعد ما tab تانية تعدّلها، و invalidation مكتوب بالإيد في كل حتة."
        },
        fix: { en: "Use a query library (or RTK Query if you're already on Redux) for server state; keep the store for real client state.", ar: "استخدم مكتبة queries (أو RTK Query لو إنت أصلًا على Redux) للـ server state؛ وخلي الـ store للـ client state الحقيقي." }
      },
      {
        title: { en: "Filters in useState", ar: "الفلاتر في useState" },
        body: {
          en: "A refresh, a shared link or the back button loses the filters, and support can't reproduce what the user saw.",
          ar: "الـ refresh أو لينك اتبعت أو زرار الرجوع بيضيّع الفلاتر، والـ support ميقدرش يشوف اللي اليوزر شافه."
        },
        fix: { en: "Keep them in search params with a typed helper (Smart FAQ's <code>useUrlFilters</code>, nuqs in okoRent).", ar: "خليهم في الـ search params مع helper بأنواع واضحة (<code>useUrlFilters</code> في Smart FAQ، و nuqs في okoRent)." }
      },
      {
        title: { en: "Duplicated state that drifts", ar: "state متكرر بيبعد عن بعضه" },
        body: {
          en: "Storing both <code>items</code> and <code>selectedItem</code> (a copy) means editing the item leaves the selection showing old data.",
          ar: "إنك تخزن <code>items</code> و <code>selectedItem</code> (نسخة) معناه إن تعديل العنصر بيسيب الاختيار بيعرض داتا قديمة."
        },
        fix: { en: "Store the minimal state (<code>selectedId</code>) and derive the rest during render.", ar: "خزّن أقل state ممكن (<code>selectedId</code>) واحسب الباقي وقت الـ render." }
      }
    ],
    levels: [
      {
        q: "How do you structure state in a large React app?",
        mid: { en: "Local state with <code>useState</code>, global state with Redux or Zustand, and React Query for API data.", ar: "local state بـ <code>useState</code>، و global state بـ Redux أو Zustand، و React Query لداتا الـ API." },
        senior: {
          en: "I classify before choosing tools. Server state goes to a query cache; URL state to search params; form state to a form library; local UI state stays in components; and only what's left — usually small — needs context or a store. That keeps the global store tiny or absent. Smart FAQ had no global store at all: queries, URL filters, forms and a few <code>useSyncExternalStore</code> stores. okoRent used TanStack Query for server data, nuqs for filters, and Zustand only for small cross-page UI state.",
          ar: "بصنّف قبل ما أختار أدوات. الـ server state بيروح لـ query cache؛ والـ URL state للـ search params؛ والـ form state لمكتبة فورم؛ والـ local UI state بيفضل في الـ components؛ واللي يفضل بس — وغالبًا صغير — هو اللي محتاج context أو store. وده بيخلي الـ global store صغير جدًا أو مش موجود. Smart FAQ مكانش فيه global store خالص: queries، وفلاتر في الـ URL، وفورمز، وكام store بـ <code>useSyncExternalStore</code>. و okoRent استخدم TanStack Query لداتا السيرفر، و nuqs للفلاتر، و Zustand بس للـ UI state الصغير اللي بين الصفحات."
        }
      }
    ],
    drill: [
      {
        q: "Where does the current page number of a table belong?",
        a: { en: "In the URL: it should survive refresh and back, and it's part of the query key.", ar: "في الـ URL: لازم يفضل بعد الـ refresh والرجوع، وهو جزء من الـ query key." },
        follow: [
          {
            q: "And the rows the user has ticked for a bulk action?",
            a: { en: "Local or shared client state — a selection is temporary UI, not something to share by link. Store ids, not row copies, and clear them when the data set changes.", ar: "local أو shared client state — الاختيار UI مؤقت، مش حاجة بتتشارك بلينك. خزّن الـ ids مش نسخ من الـ rows، وامسحهم لما مجموعة الداتا تتغير." }
          }
        ]
      }
    ],
    story: {
      text: { en: "okoRent: TanStack Query for server state, Zustand only for small cross-page UI state, nuqs for filters. Smart FAQ: no global store at all.", ar: "okoRent: TanStack Query للـ server state، و Zustand بس للـ UI state الصغير اللي بين الصفحات، و nuqs للفلاتر. و Smart FAQ: مفيش global store خالص." },
      p: "okorent", tab: "decisions", label: "okoRent"
    },
    sources: [
      { label: "react.dev — Choosing the state structure", url: "https://react.dev/learn/choosing-the-state-structure" },
      { label: "TkDodo — React Query as a state manager", url: "https://tkdodo.eu/blog/react-query-as-a-state-manager" },
      { label: "nuqs — Type-safe search params state", url: "https://nuqs.dev" }
    ]
  },

  "zustand-redux": {
    why: {
      en: "He has used Zustand, Redux Toolkit and context in different projects, so expect “why that one there?”. A good answer compares on concrete axes and shows how each one decides re-renders.",
      ar: "هو استخدم Zustand و Redux Toolkit و context في مشاريع مختلفة، فاستنى «ليه ده هناك؟». والإجابة الكويسة بتقارن على محاور واضحة وبتبيّن كل واحد بيقرر الـ re-renders إزاي."
    },
    how: [
      {
        title: { en: "Zustand: a tiny store you subscribe to with selectors", ar: "Zustand: store صغير بتعمل له subscribe بـ selectors" },
        body: {
          en: "<code>create()</code> returns a hook; components call it with a selector and re-render only when that slice changes (it uses <code>useSyncExternalStore</code>). No provider, little boilerplate, middleware for persist and devtools. Great for small to medium shared client state.",
          ar: "<code>create()</code> بيرجّع hook؛ والـ components بتناديه بـ selector وبتعمل re-render بس لما الجزء ده يتغير (بيستخدم <code>useSyncExternalStore</code>). مفيش provider، و boilerplate قليل، و middleware للـ persist والـ devtools. ممتاز للـ shared client state الصغير لحد المتوسط."
        },
        code: "const useCart = create((set) => ({\n  items: [],\n  add: (p) => set((s) => ({ items: [...s.items, p] })),\n}));\nconst count = useCart((s) => s.items.length);   // re-renders only when the count changes\nconst add = useCart((s) => s.add);",
        run: "browser"
      },
      {
        title: { en: "Redux Toolkit: one store with conventions", ar: "Redux Toolkit: store واحد بقواعد ثابتة" },
        body: {
          en: "Slices with reducers (Immer lets you write “mutating” code safely), actions as plain objects, middleware, time-travel devtools, and RTK Query for server data. The value is predictability and shared conventions in large teams; the cost is more structure for small apps.",
          ar: "Slices فيها reducers (و Immer بيخليك تكتب كود «بيعدّل» بأمان)، وأكشنز كـ objects عادية، و middleware، و devtools فيها time-travel، و RTK Query لداتا السيرفر. والقيمة هي إن كل حاجة متوقعة وفيه قواعد مشتركة في الفرق الكبيرة؛ والتمن structure أكتر للـ apps الصغيرة."
        }
      },
      {
        title: { en: "Context: injection, not subscription", ar: "الـ Context: حقن قيمة، مش subscription" },
        body: {
          en: "Context passes a value; every consumer re-renders when it changes, with no selectors. Right for low-frequency values (auth, theme, locale); wrong for state that changes often and is read widely.",
          ar: "الـ Context بيعدّي قيمة؛ وكل consumer بيعمل re-render لما تتغير، من غير selectors. صح للقيم اللي مش بتتغير كتير (auth، theme، locale)؛ وغلط للـ state اللي بيتغير كتير وبيتقرا في أماكن كتير."
        }
      }
    ],
    breaks: [
      {
        title: { en: "A selector that returns a new object", ar: "selector بيرجّع object جديد" },
        body: {
          en: "The store compares the selected value with <code>Object.is</code>. A selector that builds an object returns a different object every time, so the component re-renders on every store change (and React can warn about an unstable snapshot).",
          ar: "الـ store بيقارن القيمة المختارة بـ <code>Object.is</code>. والـ selector اللي بيعمل object بيرجّع object مختلف كل مرة، فالـ component بيعمل re-render مع كل تغيير في الـ store (و React ممكن يحذّر من snapshot مش ثابت)."
        },
        code: "const state = { user: { name: \"A\" }, count: 1 };\nconst pick = (s) => ({ name: s.user.name });          // new object each call\nconsole.log(Object.is(pick(state), pick(state)), Object.is(state.user.name, state.user.name));",
        out: "false true",
        run: "node",
        fix: { en: "Select primitives separately, or wrap the selector with <code>useShallow</code> (Zustand) / use memoised selectors (Reselect in Redux).", ar: "اختار الـ primitives كل واحدة لوحدها، أو لف الـ selector بـ <code>useShallow</code> (Zustand) / استخدم selectors معمول لها memo (Reselect في Redux)." }
      },
      {
        title: { en: "Selecting the whole store", ar: "اختيار الـ store كله" },
        body: {
          en: "<code>const store = useStore()</code> with no selector subscribes to everything: any change anywhere re-renders the component.",
          ar: "<code>const store = useStore()</code> من غير selector بيعمل subscribe لكل حاجة: أي تغيير في أي حتة بيعمل re-render للـ component."
        },
        fix: { en: "Always select the smallest slice you render.", ar: "دايمًا اختار أصغر جزء إنت بتعرضه." }
      },
      {
        title: { en: "Persisting the wrong things", ar: "حفظ الحاجات الغلط" },
        body: {
          en: "<code>persist</code> middleware writing tokens or personal data to <code>localStorage</code> exposes them to any XSS, and persisting server data serves stale lists after deploys.",
          ar: "الـ <code>persist</code> middleware لما يكتب tokens أو داتا شخصية في <code>localStorage</code> بيعرّضهم لأي XSS، وحفظ داتا السيرفر بيعرض lists قديمة بعد الـ deploys."
        },
        fix: { en: "Persist only harmless preferences, version the persisted shape, and keep tokens in httpOnly cookies.", ar: "احفظ التفضيلات اللي مفيهاش ضرر بس، وحط version للشكل المحفوظ، وخلي الـ tokens في httpOnly cookies." }
      }
    ],
    levels: [
      {
        q: "Zustand vs Redux Toolkit?",
        mid: { en: "Zustand is simpler with less boilerplate; Redux is better for big apps.", ar: "Zustand أبسط و boilerplate أقل؛ و Redux أحسن للـ apps الكبيرة." },
        senior: {
          en: "Both are external stores with selector subscriptions, so re-render behaviour is similar. Zustand: minimal API, no provider, ideal when client state is small — which it usually is once server state lives in a query cache. Redux Toolkit: stronger conventions, middleware, time-travel debugging and RTK Query — valuable for large teams or complex client-side workflows. I've used Zustand in okoRent and Spectra for small shared state, kept AHS's existing Zustand store, and used Redux Toolkit in anyShop and two take-home tasks where it was expected.",
          ar: "الاتنين external stores بـ subscriptions بالـ selectors، فسلوك الـ re-render شبه بعض. Zustand: API صغير، ومن غير provider، ومثالي لما الـ client state يبقى صغير — وده اللي غالبًا بيحصل لما الـ server state يبقى في query cache. و Redux Toolkit: قواعد أقوى، و middleware، و time-travel debugging، و RTK Query — مفيد للفرق الكبيرة أو الـ workflows المعقدة على الـ client. استخدمت Zustand في okoRent و Spectra للـ shared state الصغير، وسبت الـ Zustand store اللي كان موجود في AHS، واستخدمت Redux Toolkit في anyShop وفي اتنين take-home tasks كان متوقع فيهم."
        }
      }
    ],
    drill: [
      {
        q: "How does Zustand decide whether a component re-renders?",
        a: { en: "It runs the component's selector on the new state and compares the result with the previous one using <code>Object.is</code>; equal means no re-render.", ar: "بيشغّل الـ selector بتاع الـ component على الـ state الجديد ويقارن النتيجة باللي قبلها بـ <code>Object.is</code>؛ ولو متساويين مفيش re-render." },
        follow: [
          {
            q: "So what goes wrong with (s) => ({ a: s.a, b: s.b })?",
            a: { en: "A new object every time → never equal → a re-render on every store change. Use <code>useShallow</code>, which compares the object's keys one level deep.", ar: "object جديد كل مرة ← عمره ما هيبقى متساوي ← re-render مع كل تغيير في الـ store. استخدم <code>useShallow</code>، اللي بيقارن الـ keys بتاعة الـ object مستوى واحد." }
          }
        ]
      }
    ],
    story: {
      text: { en: "okoRent and Spectra used Zustand for small shared state; AHS kept its existing Zustand store; anyShop and two 2025 take-home tasks used Redux Toolkit.", ar: "okoRent و Spectra استخدموا Zustand للـ shared state الصغير؛ و AHS حافظ على الـ Zustand store اللي كان موجود؛ و anyShop واتنين take-home tasks في 2025 استخدموا Redux Toolkit." },
      p: "okorent", tab: "decisions", label: "okoRent"
    },
    sources: [
      { label: "Zustand — Introduction", url: "https://zustand.docs.pmnd.rs/getting-started/introduction" },
      { label: "Zustand — Prevent re-renders with useShallow", url: "https://zustand.docs.pmnd.rs/guides/prevent-rerenders-with-use-shallow" },
      { label: "Redux Toolkit — Getting started", url: "https://redux-toolkit.js.org/introduction/getting-started" },
      { label: "Redux — Style guide", url: "https://redux.js.org/style-guide/" }
    ]
  }
});
