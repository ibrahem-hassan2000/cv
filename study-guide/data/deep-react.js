// Deep dive for the React fundamentals section. Same shape as deep-javascript.js (see README "Deep dive").
// React examples need a page and React, so they are marked run: "browser"; plain-JS models of React behaviour use run: "node".
STUDY.deepen("react", {
  "mental-model": {
    why: {
      en: "Almost every React performance or “why did this happen?” question comes back to three facts: what triggers a render, what rendering actually is, and what reaches the DOM. Seniors are expected to answer “why does this child re-render?” without guessing.",
      ar: "تقريبًا كل سؤال عن أداء React أو «ليه ده حصل؟» بيرجع لـ 3 حقايق: إيه اللي بيعمل render، والـ render ده بيعمل إيه بالظبط، وإيه اللي بيوصل للـ DOM. والـ Senior متوقع منه يجاوب «ليه الـ child ده عمل re-render؟» من غير تخمين."
    },
    how: [
      {
        title: { en: "Trigger → render → commit", ar: "Trigger ← render ← commit" },
        body: {
          en: "A render is <b>triggered</b> by the first <code>root.render</code> or by a state change — <code>setState</code>, a reducer dispatch, a context value the component reads, an external store it subscribes to. <b>Render</b> means React calls your components and works out what changed. <b>Commit</b> applies only those changes to the DOM, attaches refs and runs layout effects; then the browser paints; then passive effects (<code>useEffect</code>) run.",
          ar: "الـ render بيبدأ (<b>trigger</b>) في حالتين: أول <code>root.render</code>، أو تغيير في الـ state. وتغيير الـ state ممكن يكون <code>setState</code>، أو dispatch لـ reducer، أو قيمة context الـ component بيقراها، أو external store عامل له subscribe. والـ <b>render</b> معناه إن React بينادي الـ components بتاعتك ويحسب إيه اللي اتغير. والـ <b>commit</b> بيطبّق التغييرات دي بس على الـ DOM، ويركّب الـ refs، ويشغّل الـ layout effects. وبعدين المتصفح بيرسم. وبعدين الـ passive effects (<code>useEffect</code>) بتشتغل."
        }
      },
      {
        title: { en: "Props don't trigger renders — parents do", ar: "الـ props مش بتعمل render — الـ parent هو اللي بيعمل" },
        body: {
          en: "When a component renders, React renders <b>all of its children</b> by default, whether their props changed or not. Props only matter when a child is wrapped in <code>memo</code>. The exception: if the parent returns the <b>same element object</b> as last time — for example <code>children</code> created by a component above — React skips it. That's why “move state down” and “pass the heavy part as children” work without any memo.",
          ar: "لما component يعمل render، React بيعمل render لـ <b>كل الـ children</b> بتوعه افتراضيًا، سواء الـ props اتغيرت ولا لأ. والـ props بتفرق بس لما الـ child يكون ملفوف في <code>memo</code>. والاستثناء: لو الـ parent رجّع <b>نفس الـ element object</b> زي المرة اللي فاتت — زي <code>children</code> اتعملت في component فوقه — React بيتخطاه. وعلشان كده «نزّل الـ state لتحت» و «ابعت الجزء التقيل كـ children» بيشتغلوا من غير أي memo."
        },
        code: "function Page() {\n  const [open, setOpen] = useState(false);\n  return <Layout><Menu open={open} onToggle={setOpen} /><HeavyChart /></Layout>;\n} // HeavyChart re-renders on every toggle\n\nfunction Page() {\n  return <MenuShell><HeavyChart /></MenuShell>;  // state lives in MenuShell\n} // HeavyChart's element is created by Page → same object → skipped",
        run: "browser"
      },
      {
        title: { en: "Render must be pure — React may call it more than once", ar: "الـ render لازم يبقى pure — React ممكن يناديه أكتر من مرة" },
        body: {
          en: "Rendering is just calculating the JSX. React may render a component and throw the result away (concurrent features), render it twice in development (Strict Mode), or bail out after calling it once if state ended up equal. So reading props/state and returning JSX is fine; mutating outside objects, fetching, subscribing or writing to refs during render is not.",
          ar: "الـ render مجرد حساب للـ JSX. و React ممكن يعمل render لـ component ويرمي النتيجة (مع الـ concurrent features). أو يعمله مرتين في الـ development (Strict Mode). أو يناديه مرة ويتراجع لو الـ state طلع زي ما هو. يعني إنك تقرا props أو state وترجّع JSX ده تمام. لكن وقت الـ render متعدّلش objects برّه، ومتعملش fetch أو subscribe، ومتكتبش في refs."
        }
      },
      {
        title: { en: "The commit only touches what changed", ar: "الـ commit بيلمس اللي اتغير بس" },
        body: {
          en: "Re-rendering a component is not the same as updating the DOM. If the result is the same, React changes nothing in the DOM. A render is usually cheap; it becomes a problem when a big subtree renders often, or a component does heavy work in its body. Measure with the React Profiler before optimising.",
          ar: "إن component يعمل re-render مش معناه إن الـ DOM اتحدث. لو النتيجة هي هي، React مش بيغيّر حاجة في الـ DOM. والـ render غالبًا رخيص. بيبقى مشكلة لما شجرة كبيرة تعمل render كتير، أو component يعمل شغل تقيل جوه الـ body بتاعه. قيس بالـ React Profiler قبل ما تعمل optimisation."
        }
      }
    ],
    breaks: [
      {
        title: { en: "Defining a component inside another component", ar: "تعريف component جوه component تاني" },
        body: {
          en: "Every render creates a new function, so React sees a <b>new component type</b> at that position, unmounts the old one and mounts a fresh one: state is lost, inputs lose focus, effects restart.",
          ar: "كل render بيعمل function جديدة. فـ React بيشوف <b>نوع component جديد</b> في المكان ده، فيشيل القديم ويركّب واحد جديد. والنتيجة: الـ state بيضيع، والـ inputs بتفقد الـ focus، والـ effects بتبدأ من الأول."
        },
        code: "function Table({ rows }) {\n  function Row({ r }) { return <tr><td><input defaultValue={r.name} /></td></tr>; } // new type every render\n  return rows.map((r) => <Row key={r.id} r={r} />);\n}",
        run: "browser",
        fix: { en: "Define components at the top level of a module and pass data as props.", ar: "عرّف الـ components في أول مستوى في الـ module وابعت الداتا كـ props." }
      },
      {
        title: { en: "Side effects during render", ar: "Side effects وقت الـ render" },
        body: {
          en: "Pushing to a module array, starting a request or subscribing in the component body runs on every render — twice in development — and on renders React throws away.",
          ar: "لو عملت push لـ array في الـ module، أو بدأت request، أو عملت subscribe جوه الـ body بتاع الـ component، ده هيتكرر مع كل render. وهيتكرر مرتين في الـ development، وحتى في الـ renders اللي React بيرميها."
        },
        fix: { en: "Move it to an event handler (if a user action causes it) or an effect (if being on screen causes it).", ar: "انقلها لـ event handler (لو أكشن من اليوزر هو السبب) أو effect (لو ظهوره على الشاشة هو السبب)." }
      },
      {
        title: { en: "memo everywhere instead of structure", ar: "memo في كل حتة بدل ما تظبط الـ structure" },
        body: {
          en: "Wrapping every component in <code>memo</code> adds comparisons to every render and still fails when props are new objects or functions. It also hides the real fix — usually state living too high.",
          ar: "إنك تلف كل component في <code>memo</code> بيزوّد مقارنات في كل render، وبرضه بيفشل لما الـ props تبقى objects أو functions جديدة. وكمان بيخبّي الحل الحقيقي — اللي غالبًا إن الـ state عايش أعلى من اللازم."
        },
        fix: { en: "Profile first; then move state down, pass heavy parts as children, and use <code>memo</code> + stable props only where the Profiler shows a cost. With React Compiler, most manual memo goes away.", ar: "اعمل profile الأول. وبعدين نزّل الـ state لتحت، وابعت الأجزاء التقيلة كـ children. واستخدم <code>memo</code> مع props ثابتة، بس في الأماكن اللي الـ Profiler بيقول إن فيها تمن. ومع React Compiler، أغلب الـ memo اليدوي بيختفي." }
      }
    ],
    levels: [
      {
        q: "What causes a component to re-render?",
        mid: { en: "A change in its state or props.", ar: "تغيير في الـ state أو الـ props بتاعته." },
        senior: {
          en: "A state change in the component or any ancestor, a context value it reads, or an external store it subscribes to. Props don't trigger anything by themselves: a parent rendering re-renders its whole subtree, and <code>memo</code> is what makes props matter. Rendering isn't a DOM update — the commit applies only the differences. So my order of fixes is: move state down, lift content up through <code>children</code>, then <code>memo</code> with stable props where the Profiler shows real cost.",
          ar: "تغيير state في الـ component أو في أي ancestor، أو قيمة context بيقراها، أو external store عامل له subscribe. والـ props لوحدها مش بتعمل حاجة: الـ parent لما يعمل render بيعمل render للشجرة اللي تحته كلها، والـ <code>memo</code> هو اللي بيخلي الـ props تفرق. والـ render مش تحديث للـ DOM — الـ commit بيطبّق الفروق بس. فترتيب الحلول عندي: نزّل الـ state لتحت، وارفع المحتوى عن طريق <code>children</code>، وبعدين <code>memo</code> مع props ثابتة في الأماكن اللي الـ Profiler بيقول إن فيها تمن حقيقي."
        }
      },
      {
        q: "Render phase vs commit phase?",
        mid: { en: "Render calculates the changes; commit updates the DOM.", ar: "الـ render بيحسب التغييرات، والـ commit بيحدّث الـ DOM." },
        senior: {
          en: "Render is pure and, with concurrent features, interruptible: React may pause it, redo it or throw it away, so nothing observable may happen there. Commit is synchronous: DOM mutations, refs attached, <code>useLayoutEffect</code> runs, then the browser paints, and <code>useEffect</code> usually runs after the paint. That split is why measuring the DOM belongs in a layout effect and subscriptions belong in a normal effect.",
          ar: "الـ render لازم يبقى pure، ومع الـ concurrent features ممكن يتقطع: React ممكن يوقفه أو يعيده أو يرميه، فمفيش حاجة ينفع تتشاف تحصل فيه. والـ commit بيحصل مرة واحدة من غير توقف: تعديلات الـ DOM، وتركيب الـ refs، و <code>useLayoutEffect</code> بيشتغل، وبعدين المتصفح بيرسم، و <code>useEffect</code> غالبًا بيشتغل بعد الرسم. والتقسيم ده هو السبب إن قياس الـ DOM مكانه layout effect، والـ subscriptions مكانها effect عادي."
        }
      }
    ],
    drill: [
      {
        q: "Does a child re-render if its props didn't change?",
        a: { en: "Yes, whenever its parent renders — unless the child is memoised (and its props are equal) or the parent returns the same element object.", ar: "أيوه، كل ما الـ parent يعمل render — إلا لو الـ child معمول له memo (والـ props بتاعته زي ما هي) أو الـ parent رجّع نفس الـ element object." },
        follow: [
          {
            q: "Then why not wrap everything in memo?",
            a: { en: "Every memo compares props on every render, and it fails silently when props are new objects or functions — so you pay and get nothing. It's worth it for expensive subtrees with stable props.", ar: "كل memo بيقارن الـ props مع كل render، وبيفشل من غير ما يقول لما الـ props تبقى objects أو functions جديدة — فبتدفع ومش بتاخد حاجة. بيستاهل مع الشجر التقيل اللي الـ props بتاعته ثابتة." },
            follow: [
              {
                q: "What does React Compiler change?",
                a: { en: "It memoises components and values automatically at build time, so hand-written <code>memo</code>/<code>useMemo</code>/<code>useCallback</code> become rare. It relies on your components following the rules — pure render, no mutation of props or state.", ar: "بيعمل memo للـ components والقيم أوتوماتيك وقت الـ build، فالـ <code>memo</code>/<code>useMemo</code>/<code>useCallback</code> اللي بتكتبهم بإيدك بيبقوا نادرين. وهو معتمد إن الـ components بتاعتك ماشية على القواعد — render pure ومفيش تعديل للـ props أو الـ state." }
              }
            ]
          }
        ]
      }
    ],
    sources: [
      { label: "react.dev — Render and commit", url: "https://react.dev/learn/render-and-commit" },
      { label: "react.dev — memo", url: "https://react.dev/reference/react/memo" },
      { label: "Dan Abramov — Before you memo()", url: "https://overreacted.io/before-you-memo/" },
      { label: "react.dev — React Compiler", url: "https://react.dev/learn/react-compiler" }
    ]
  },

  reconciliation: {
    why: {
      en: "Keys sound basic, but the follow-ups test whether you understand that React tracks state <b>by position and key</b>: why a form keeps old values, why a list scrambles inputs, and how to reset a component on purpose.",
      ar: "الـ keys شكلها حاجة بسيطة. بس الأسئلة اللي بعدها بتختبر إنك فاهم إن React بيتابع الـ state <b>بالمكان والـ key</b>. يعني: ليه فورم فاضل بالقيم القديمة؟ وليه list بتلخبط الـ inputs؟ وإزاي تعمل reset لـ component بقصد؟"
    },
    how: [
      {
        title: { en: "Two heuristics make diffing O(n)", ar: "قاعدتين بيخلوا الـ diffing بـ O(n)" },
        body: {
          en: "Comparing two arbitrary trees is O(n³). React assumes: (1) elements of a <b>different type</b> produce different trees — so it unmounts the old subtree and mounts a new one; (2) among siblings, a <b>key</b> says which child is which. Same type at the same position → keep the instance and update its props.",
          ar: "مقارنة أي شجرتين تمنها O(n³). علشان كده React بيفترض حاجتين. الأولى: الـ elements اللي <b>نوعها مختلف</b> بتطلّع شجر مختلف، فبيشيل الشجرة القديمة ويركّب جديدة. التانية: بين الإخوات، الـ <b>key</b> هو اللي بيقول مين هو مين. ولو نفس النوع في نفس المكان، بيحتفظ بالـ instance ويحدّث الـ props بس."
        }
      },
      {
        title: { en: "State belongs to a position in the tree", ar: "الـ state مربوط بمكان في الشجرة" },
        body: {
          en: "React doesn't attach state to your component function — it attaches it to the spot in the UI tree. <code>{isAdmin ? &lt;Form /&gt; : &lt;Form /&gt;}</code> keeps the same state when <code>isAdmin</code> flips, because it's the same type at the same position. Give it a different <code>key</code> and it's a different component.",
          ar: "React مش بيربط الـ state بالـ function بتاعة الـ component — بيربطه بالمكان في شجرة الـ UI. فـ <code>{isAdmin ? &lt;Form /&gt; : &lt;Form /&gt;}</code> بيحتفظ بنفس الـ state لما <code>isAdmin</code> يتقلب، لأنه نفس النوع في نفس المكان. ولو اديته <code>key</code> مختلف يبقى component تاني."
        },
        code: "<ProfileForm key={userId} user={user} />   // switching user resets the form's state",
        run: "browser"
      },
      {
        title: { en: "Keys match children across renders", ar: "الـ keys بتطابق الـ children بين الـ renders" },
        body: {
          en: "With keys, React matches old and new children by key, so it can move, insert and remove items while keeping each item's state and DOM. Without keys (or with index keys) it matches by position, so inserting at the top makes every row “update” to the next row's data while keeping its own state.",
          ar: "مع الـ keys، React بيطابق الـ children القديمة والجديدة بالـ key، فيقدر ينقل ويضيف ويشيل عناصر وكل عنصر محتفظ بالـ state والـ DOM بتوعه. ومن غير keys (أو بالـ index) بيطابق بالمكان، فلو ضفت حاجة في الأول، كل row «بيتحدث» بداتا الـ row اللي بعده وهو محتفظ بالـ state بتاعه هو."
        }
      },
      {
        title: { en: "Moving a component to another parent remounts it", ar: "نقل component لـ parent تاني بيعمله remount" },
        body: {
          en: "Keys only work among siblings. React doesn't search the tree for a moved subtree, so wrapping a component in a new <code>div</code> conditionally, or rendering it in a different branch, destroys and recreates it.",
          ar: "الـ keys بتشتغل بين الإخوات بس. و React مش بيدوّر في الشجرة على subtree اتنقل، فلو لفيت component في <code>div</code> جديد بشرط، أو رسمته في فرع تاني، بيتمسح ويتعمل من جديد."
        },
        code: "{loading ? <div className=\"dim\"><Results /></div> : <Results />}   // Results remounts every toggle\n<div className={loading ? \"dim\" : \"\"}><Results /></div>             // same position → keeps state",
        run: "browser"
      }
    ],
    breaks: [
      {
        title: { en: "Index keys with stateful rows", ar: "الـ index كـ key مع rows فيها state" },
        body: {
          en: "Type into the first row's input, then add an item at the top: the text stays at index 0 and now appears next to the new item. Same with checkboxes, focus and animations.",
          ar: "اكتب في input أول row، وبعدين ضيف عنصر في الأول: النص بيفضل في index 0 ويظهر جنب العنصر الجديد. ونفس الكلام مع الـ checkboxes والـ focus والـ animations."
        },
        code: "items.map((item, i) => <Row key={i} item={item} />)        // breaks on insert/reorder/filter\nitems.map((item) => <Row key={item.id} item={item} />)    // stable identity",
        run: "browser",
        fix: { en: "Use a stable id from the data. If there isn't one, create it when the item is created — not during render.", ar: "استخدم id ثابت من الداتا. ولو مفيش، اعمله وقت ما العنصر يتعمل — مش وقت الـ render." }
      },
      {
        title: { en: "Random keys", ar: "keys عشوائية" },
        body: {
          en: "<code>key={Math.random()}</code> or <code>key={crypto.randomUUID()}</code> in render changes every time, so every item remounts on every render: lost input focus and state, and slow lists.",
          ar: "لو كتبت <code>key={Math.random()}</code> أو <code>key={crypto.randomUUID()}</code> وقت الـ render، الـ key هيتغير كل مرة. فكل عنصر هيتعمل له remount مع كل render. والنتيجة: الـ focus والـ state بيضيعوا، والـ lists بتبقى بطيئة."
        },
        fix: { en: "Keys must be stable across renders and unique among siblings (not globally).", ar: "الـ keys لازم تبقى ثابتة بين الـ renders ومش متكررة بين الإخوات (مش لازم على مستوى الـ app كله)." }
      },
      {
        title: { en: "Copying props into state instead of resetting", ar: "نسخ الـ props في state بدل الـ reset" },
        body: {
          en: "<code>useState(props.user.name)</code> reads the prop only on mount. Selecting another user keeps the old name. Adding an effect to copy it back causes an extra render with stale data first.",
          ar: "<code>useState(props.user.name)</code> بيقرا الـ prop وقت الـ mount بس. فلو اخترت user تاني الاسم القديم بيفضل. ولو ضفت effect ينسخه تاني، بيحصل render زيادة بداتا قديمة الأول."
        },
        fix: { en: "Reset with <code>key={user.id}</code>, or don't copy: derive the value during render.", ar: "اعمل reset بـ <code>key={user.id}</code>، أو متنسخش: احسب القيمة وقت الـ render." }
      }
    ],
    levels: [
      {
        q: "Why do lists need keys?",
        mid: { en: "So React can identify each item. Don't use the index.", ar: "علشان React يعرف كل عنصر. ومتستخدمش الـ index." },
        senior: {
          en: "Keys let React match old and new children. Without stable keys it matches by position, so inserting at the top makes every row update and moves state — typed text, focus, open menus — to the wrong item. An index is fine only for static lists that are never reordered, filtered or inserted into and have no state. Keys are also a tool: <code>key={userId}</code> resets a component on purpose. In Smart FAQ's drag-and-drop taxonomy tree, rows are keyed by node id so dragging keeps the right state.",
          ar: "الـ keys بتخلي React يطابق الـ children القديمة بالجديدة. ومن غير keys ثابتة بيطابق بالمكان، فلو ضفت في الأول كل row بيتحدث والـ state — النص المكتوب، والـ focus، والـ menus المفتوحة — بيروح للعنصر الغلط. والـ index ماشي بس مع lists ثابتة عمرها ما بتترتب أو تتفلتر أو يتضاف فيها، ومفيهاش state. والـ keys كمان أداة: <code>key={userId}</code> بيعمل reset لـ component بقصد. وفي شجرة الـ taxonomy في Smart FAQ اللي فيها drag-and-drop، الـ rows ليها key بالـ node id علشان السحب يحافظ على الـ state الصح."
        }
      },
      {
        q: "How does React's diffing work?",
        mid: { en: "React compares the new virtual DOM with the old one and updates what changed.", ar: "React بيقارن الـ virtual DOM الجديد بالقديم ويحدّث اللي اتغير." },
        senior: {
          en: "It walks both trees once, position by position. Different element type → tear down and rebuild that subtree. Same type → keep the instance, update props, recurse. Children are matched by key. It's O(n) because it never searches for subtrees that moved to another parent — those remount. Fiber splits this work into units, so it can pause and resume under concurrent rendering.",
          ar: "بيلف على الشجرتين مرة واحدة، مكان مكان. نوع element مختلف ← يهد الـ subtree ده ويبنيه من جديد. نفس النوع ← يحتفظ بالـ instance ويحدّث الـ props ويكمل لجوه. والـ children بتتطابق بالـ key. وهو O(n) لأنه عمره ما بيدوّر على subtrees اتنقلت لـ parent تاني — دي بتتعمل لها remount. والـ Fiber بيقسّم الشغل ده لوحدات، فيقدر يوقف ويكمل مع الـ concurrent rendering."
        }
      }
    ],
    drill: [
      {
        q: "When is the index an acceptable key?",
        a: { en: "A static list that is never reordered, filtered or inserted into, whose items have no state.", ar: "list ثابتة عمرها ما بتترتب أو تتفلتر أو يتضاف فيها، والعناصر بتاعتها ملهاش state." },
        follow: [
          {
            q: "What exactly goes wrong otherwise?",
            a: { en: "State is attached by position. After inserting at the top, the instance at index 0 — with its typed text — now renders the new item.", ar: "الـ state مربوط بالمكان. بعد ما تضيف في الأول، الـ instance اللي في index 0 — بالنص اللي اتكتب فيه — بقى بيرسم العنصر الجديد." },
            follow: [
              {
                q: "How do you reset a form when the selected user changes?",
                a: { en: "<code>key={userId}</code> on the form — React treats it as a new component and starts fresh. No effect that copies props into state.", ar: "<code>key={userId}</code> على الفورم — React بيعتبره component جديد ويبدأ من الأول. من غير effect ينسخ الـ props في الـ state." }
              }
            ]
          }
        ]
      }
    ],
    story: {
      text: { en: "Smart FAQ's taxonomy tree (dnd-kit sortable) keys rows by node id so drag and drop keeps the right state; in Trackoo, a missing key in a FlatList was one of his fixes.", ar: "في Smart FAQ، شجرة الـ taxonomy (dnd-kit sortable) بتدي كل row الـ node id بتاعه كـ key. كده الـ drag and drop بيحافظ على الـ state الصح. وفي Trackoo، كان من الحاجات اللي صلحها key ناقص في FlatList." },
      p: "smartfaq", tab: "overview", label: "Smart FAQ"
    },
    sources: [
      { label: "react.dev — Preserving and resetting state", url: "https://react.dev/learn/preserving-and-resetting-state" },
      { label: "react.dev — Rendering lists: keys", url: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key" },
      { label: "React (legacy docs) — Reconciliation", url: "https://legacy.reactjs.org/docs/reconciliation.html" }
    ]
  },

  "state-snapshots": {
    why: {
      en: "“Why is my state not updated right after setState?” is asked to everyone. The senior answer replaces “setState is async” with the real model — a snapshot per render and a queue of updates — and knows what batching changed in React 18.",
      ar: "«ليه الـ state مش بيتحدث على طول بعد setState؟» بيتسأل لكل الناس. وإجابة الـ Senior بتبدّل «الـ setState async» بالموديل الحقيقي — snapshot لكل render وطابور تحديثات — وعارفة الـ batching اتغير إزاي في React 18."
    },
    how: [
      {
        title: { en: "State is a snapshot for this render", ar: "الـ state عبارة عن snapshot للـ render ده" },
        body: {
          en: "<code>const [n, setN] = useState(0)</code> gives you a constant for this render. <code>setN</code> doesn't change <code>n</code>; it queues an update and schedules another render, where <code>useState</code> returns the new value. Code in this render — including handlers and timeouts created here — keeps seeing the old one.",
          ar: "لما تكتب <code>const [n, setN] = useState(0)</code>، إنت بتاخد constant للـ render ده. و <code>setN</code> مش بيغيّر <code>n</code>. هو بيحط تحديث في طابور، ويجدول render تاني، وفيه <code>useState</code> هيرجّع القيمة الجديدة. أما الكود اللي في الـ render ده، حتى الـ handlers والـ timeouts اللي اتعملت فيه، فبيفضل شايف القيمة القديمة."
        },
        code: "const [n, setN] = useState(0);\nfunction onClick() {\n  setN(n + 1); setN(n + 1); setN(n + 1);\n  console.log(n);           // 0 — this render's snapshot\n}                           // next render: n === 1",
        run: "browser"
      },
      {
        title: { en: "The update queue: values replace, updaters chain", ar: "طابور التحديثات: القيم بتستبدل، والـ updaters بتتسلسل" },
        body: {
          en: "On the next render React processes the queue in order: a value replaces the state, an updater function receives the result so far. This model explains every “what will the counter show?” question.",
          ar: "في الـ render اللي بعده React بيمشي على الطابور بالترتيب: القيمة بتستبدل الـ state، والـ updater function بتاخد النتيجة لحد دلوقتي. والموديل ده بيشرح أي سؤال «العداد هيعرض كام؟»."
        },
        code: "// A plain-JS model of how React processes one state's update queue\nfunction processQueue(base, queue) {\n  let s = base;\n  for (const u of queue) s = typeof u === \"function\" ? u(s) : u;\n  return s;\n}\nconsole.log(processQueue(0, [1, 1, 1]));                                   // setN(n + 1) ×3 with n = 0\nconsole.log(processQueue(0, [(n) => n + 1, (n) => n + 1, (n) => n + 1])); // setN(n => n + 1) ×3\nconsole.log(processQueue(0, [5, (n) => n + 1, 42]));",
        out: "1\n3\n42",
        run: "node"
      },
      {
        title: { en: "Automatic batching since React 18", ar: "الـ batching الأوتوماتيك من React 18" },
        body: {
          en: "Updates made in the same event, timeout, promise or native handler are batched into one render. Before React 18, only updates inside React event handlers were batched. <code>flushSync</code> forces an immediate render — rarely needed, e.g. to scroll to an item you just added.",
          ar: "التحديثات اللي بتحصل في نفس الـ event أو الـ timeout أو الـ promise أو الـ native handler بتتجمع في render واحد. وقبل React 18 كانت التحديثات جوه event handlers بتاعة React بس هي اللي بتتجمع. و <code>flushSync</code> بيجبر render فوري — نادرًا ما بتحتاجه، زي إنك تعمل scroll لعنصر لسه ضايفه."
        },
        code: "flushSync(() => setItems((xs) => [...xs, item]));\nlistRef.current.lastElementChild.scrollIntoView();   // the DOM already has the item",
        run: "browser"
      },
      {
        title: { en: "Updaters must be pure", ar: "الـ updaters لازم تبقى pure" },
        body: {
          en: "React may call updater functions twice in development (Strict Mode) and replays them when it re-renders. An updater that pushes into the old array or calls an API behaves differently each time.",
          ar: "React ممكن ينادي الـ updater functions مرتين في الـ development (Strict Mode) وبيعيدها لما يعمل re-render. فالـ updater اللي بيعمل push في الـ array القديم أو بينادي API بيتصرف بشكل مختلف كل مرة."
        }
      }
    ],
    breaks: [
      {
        title: { en: "Using the value right after setting it", ar: "استخدام القيمة على طول بعد ما تحطها" },
        body: {
          en: "<code>setQuery(text); search(query)</code> searches with the previous query.",
          ar: "<code>setQuery(text); search(query)</code> بيدوّر بالـ query اللي قبلها."
        },
        code: "function onChange(e) {\n  const next = e.target.value;   // compute once\n  setQuery(next);\n  search(next);                  // use the local value, not state\n}",
        run: "browser",
        fix: { en: "Compute the next value in a local variable and use it for both the update and the side effect.", ar: "احسب القيمة الجاية في متغير محلي واستخدمه للتحديث وللـ side effect الاتنين." }
      },
      {
        title: { en: "Several awaits in a handler", ar: "كذا await جوه handler" },
        body: {
          en: "After an <code>await</code>, the handler still holds the old render's state. <code>setCount(count + 1)</code> after a request overwrites any increments that happened while waiting.",
          ar: "بعد أي <code>await</code>، الـ handler لسه ماسك state الـ render القديم. فـ <code>setCount(count + 1)</code> بعد request بيمسح أي زيادة حصلت وإنت مستني."
        },
        fix: { en: "Use updater functions for anything that depends on the previous value; for server data, let TanStack Query own it.", ar: "استخدم updater functions لأي حاجة معتمدة على القيمة اللي قبلها. وداتا السيرفر سيبها لـ TanStack Query." }
      }
    ],
    levels: [
      {
        q: "Why doesn't state update immediately after setState?",
        mid: { en: "Because <code>setState</code> is asynchronous and React batches updates.", ar: "لأن <code>setState</code> async و React بيجمّع التحديثات." },
        senior: {
          en: "It isn't really “async” — the variable is a constant for this render. <code>setState</code> queues an update and schedules a render; in the next render <code>useState</code> returns the result of processing the queue in order: values replace, updaters chain. Batching groups updates from the same event — everywhere since React 18. So: updaters when the next value depends on the previous; a local variable when I need the new value now; <code>flushSync</code> only for DOM measurement after an update.",
          ar: "هو مش «async» بالظبط. المتغير ده constant للـ render ده. الـ <code>setState</code> بيحط تحديث في طابور ويجدول render. وفي الـ render اللي بعده، <code>useState</code> بيمشي على الطابور بالترتيب: القيم بتستبدل، والـ updaters بتتسلسل. والـ batching بيجمّع التحديثات اللي جاية من نفس الـ event، وده في كل حتة من React 18. فأنا بستخدم updaters لما القيمة الجاية معتمدة على اللي قبلها. وبستخدم متغير محلي لما أحتاج القيمة الجديدة دلوقتي. و <code>flushSync</code> بس لو هقيس الـ DOM بعد تحديث."
        }
      },
      {
        q: "What is automatic batching?",
        mid: { en: "React groups several state updates into one render.", ar: "React بيجمّع كذا state update في render واحد." },
        senior: {
          en: "Since React 18 with <code>createRoot</code>, updates queued in the same tick — events, timeouts, promises, native listeners — produce one render instead of one per <code>setState</code>. It cuts wasted renders and avoids showing half-updated UI. The trade-off is that you never read the DOM “between” two updates unless you opt out with <code>flushSync</code>.",
          ar: "من React 18 مع <code>createRoot</code>، التحديثات اللي بتتحط في نفس الـ tick — events، أو timeouts، أو promises، أو native listeners — بتعمل render واحد بدل render لكل <code>setState</code>. ده بيقلل الـ renders الضايعة وبيمنع إن UI نصه متحدث يظهر. والتمن إنك عمرك ما هتقرا الـ DOM «بين» تحديثين إلا لو خرجت من ده بـ <code>flushSync</code>."
        }
      }
    ],
    drill: [
      {
        q: "setCount(count + 1) three times in one click — what's the result?",
        a: { en: "+1. All three read the same snapshot and replace the state with the same value.", ar: "+1. التلاتة بيقروا نفس الـ snapshot وبيستبدلوا الـ state بنفس القيمة." },
        follow: [
          {
            q: "And with setCount(c => c + 1) three times?",
            a: { en: "+3. Each updater receives the result of the previous one in the queue.", ar: "+3. كل updater بياخد نتيجة اللي قبله في الطابور." },
            follow: [
              {
                q: "setCount(5) then setCount(c => c + 1)?",
                a: { en: "6. The queue is processed in order: replace with 5, then the updater runs on 5.", ar: "6. الطابور بيتمشي بالترتيب: استبدل بـ 5، وبعدين الـ updater يشتغل على 5." }
              }
            ]
          }
        ]
      }
    ],
    sources: [
      { label: "react.dev — State as a snapshot", url: "https://react.dev/learn/state-as-a-snapshot" },
      { label: "react.dev — Queueing a series of state updates", url: "https://react.dev/learn/queueing-a-series-of-state-updates" },
      { label: "React 18 — Automatic batching", url: "https://react.dev/blog/2022/03/29/react-v18#new-feature-automatic-batching" },
      { label: "react.dev — flushSync", url: "https://react.dev/reference/react-dom/flushSync" }
    ]
  },

  "effects-model": {
    why: {
      en: "Overused effects are the most common React code-review finding. Interviewers check whether you can say what an effect is <b>for</b>, and list the cases where it's the wrong tool.",
      ar: "الـ effects اللي متستخدمة زيادة عن اللزوم أكتر ملاحظة بتطلع في code review لـ React. والإنترفيورز بيشوفوا تقدر تقول الـ effect <b>معمول ليه</b>، وتعدّ الحالات اللي بيبقى فيها الأداة الغلط."
    },
    how: [
      {
        title: { en: "Effects synchronise with something outside React", ar: "الـ effects بتعمل sync مع حاجة برّه React" },
        body: {
          en: "An effect connects the component to an external system while it is on screen: a subscription, a socket, a browser API, a third-party widget, a non-React library. If no external system is involved, you probably don't need an effect.",
          ar: "الـ effect بيوصّل الـ component بنظام برّه طول ما هو ظاهر على الشاشة: subscription، أو socket، أو browser API، أو widget من مكتبة تانية، أو مكتبة مش React. ولو مفيش نظام برّه، غالبًا مش محتاج effect."
        }
      },
      {
        title: { en: "Think start/stop, not mount/unmount", ar: "فكّر في بدأ/وقف، مش mount/unmount" },
        body: {
          en: "Each effect describes how to <b>start</b> syncing and how to <b>stop</b>. When a dependency changes, React stops the old sync (cleanup) and starts a new one. Mount and unmount are just the first start and the last stop.",
          ar: "كل effect بيوصف إزاي <b>يبدأ</b> الـ sync وإزاي <b>يوقفه</b>. ولما dependency تتغير، React بيوقف الـ sync القديم (cleanup) ويبدأ واحد جديد. والـ mount والـ unmount مجرد أول بداية وآخر وقفة."
        },
        code: "useEffect(() => {\n  const conn = createConnection(roomId);\n  conn.connect();                    // start syncing with this room\n  return () => conn.disconnect();    // stop — runs before the next roomId and on unmount\n}, [roomId]);",
        run: "browser"
      },
      {
        title: { en: "Dependencies are declared, not chosen", ar: "الـ dependencies بتتعلن، مش بتختارها" },
        body: {
          en: "Every reactive value the effect reads must be a dependency — the lint rule is right. If an effect re-runs too often, change the <b>code</b>: move the object inside the effect, use an updater instead of reading state, or read the latest value in an effect event (<code>useEffectEvent</code>).",
          ar: "أي قيمة reactive الـ effect بيقراها لازم تبقى dependency — وقاعدة الـ lint معاها حق. ولو الـ effect بيشتغل كتير، غيّر <b>الكود</b>: انقل الـ object جوه الـ effect، أو استخدم updater بدل ما تقرا الـ state، أو اقرا آخر قيمة في effect event (<code>useEffectEvent</code>)."
        }
      },
      {
        title: { en: "Fetching in an effect needs race handling", ar: "الـ fetching في effect محتاج يتعامل مع الـ race" },
        body: {
          en: "If <code>id</code> changes quickly, responses can arrive out of order. Ignore stale results in cleanup, or abort them. Even then you get no cache, no deduplication and no SSR — which is why data libraries or the framework should own fetching.",
          ar: "لو <code>id</code> اتغير بسرعة، الـ responses ممكن توصل بترتيب غلط. اتجاهل النتايج القديمة في الـ cleanup، أو اعمل لها abort. وحتى كده مفيش cache، ولا dedup، ولا SSR — وعلشان كده مكتبات الداتا أو الـ framework هما اللي المفروض يمسكوا الـ fetching."
        },
        code: "useEffect(() => {\n  let ignore = false;\n  fetchUser(id).then((u) => { if (!ignore) setUser(u); });\n  return () => { ignore = true; };\n}, [id]);",
        run: "browser"
      }
    ],
    breaks: [
      {
        title: { en: "Derived data stored through an effect", ar: "داتا محسوبة بتتخزن عن طريق effect" },
        body: {
          en: "<code>useEffect(() =&gt; setFullName(first + \" \" + last), [first, last])</code> renders once with a stale value, then again. It's slower and briefly wrong.",
          ar: "<code>useEffect(() =&gt; setFullName(first + \" \" + last), [first, last])</code> بيعمل render مرة بقيمة قديمة، وبعدين مرة تانية. أبطأ، وغلط لحظة."
        },
        fix: { en: "Compute it during render: <code>const fullName = first + \" \" + last</code>. Wrap expensive calculations in <code>useMemo</code>.", ar: "احسبها وقت الـ render: <code>const fullName = first + \" \" + last</code>. ولو الحساب تقيل لفّه في <code>useMemo</code>." }
      },
      {
        title: { en: "User actions handled in an effect", ar: "أكشنز اليوزر بتتعالج في effect" },
        body: {
          en: "Setting <code>submitted = true</code> and POSTing in an effect that watches it sends the request again when the component remounts (Strict Mode, navigation back, a parent key change).",
          ar: "لو حطيت <code>submitted = true</code> وعملت POST في effect بيراقبها، الـ request هيتبعت تاني لما الـ component يتعمل له remount. والـ remount بيحصل مع الـ Strict Mode، أو الرجوع للصفحة، أو تغيير key في الـ parent."
        },
        fix: { en: "Do it in the event handler. Ask: is this caused by the user doing something (handler) or by the component being displayed (effect)?", ar: "اعمله في الـ event handler. واسأل: ده حصل علشان اليوزر عمل حاجة (handler) ولا علشان الـ component ظاهر (effect)؟" }
      },
      {
        title: { en: "Chains of effects", ar: "effects ورا بعض" },
        body: {
          en: "Effect A sets state that triggers effect B, which sets state for effect C. Each link is an extra render, and the logic is hard to follow.",
          ar: "Effect A بيحط state بيشغّل effect B، اللي بيحط state لـ effect C. كل حلقة render زيادة، والمنطق صعب تمشي وراه."
        },
        fix: { en: "Compute the whole next state in the event handler that started it, or derive it during render.", ar: "احسب الـ state الجاي كله في الـ event handler اللي بدأ الحكاية، أو احسبه وقت الـ render." }
      }
    ],
    levels: [
      {
        q: "When should you use useEffect?",
        mid: { en: "For side effects: fetching data, subscriptions, timers, changing the document title.", ar: "للـ side effects: fetching، و subscriptions، و timers، وتغيير عنوان الصفحة." },
        senior: {
          en: "Only to synchronise with a system outside React while the component is shown: subscriptions, sockets, browser APIs, third-party widgets. Not for derived data (compute in render), not for user actions (handlers), not to reset state (use a key), not for chains of updates. And I don't fetch in raw effects: no cache, no dedup, races to handle — TanStack Query or the framework does it. In Smart FAQ the team guide says exactly that; there were 26 effects in 166 commits, all for focus, timers and syncing refs.",
          ar: "بس علشان أعمل sync مع نظام برّه React، طول ما الـ component ظاهر. زي subscriptions، و sockets، و browser APIs، و widgets من مكتبات تانية. مش للداتا المحسوبة (دي احسبها في الـ render). ولا لأكشنز اليوزر (دي مكانها الـ handlers). ولا علشان أعمل reset للـ state (استخدم key). ولا لسلاسل التحديثات. ومش بعمل fetch في effects عادية: مفيش cache، ولا dedup، وفيه races لازم تتعالج. ده شغل TanStack Query أو الـ framework. وفي Smart FAQ، الـ guide بتاع الفريق بيقول كده بالظبط. كان فيه 26 effect في 166 commit، كلهم للـ focus والـ timers ومزامنة الـ refs."
        }
      },
      {
        q: "Event handler or effect — how do you decide?",
        mid: { en: "Handlers for clicks, effects for things that happen after render.", ar: "الـ handlers للضغطات، والـ effects للحاجات اللي بتحصل بعد الـ render." },
        senior: {
          en: "By the cause. If a specific interaction caused it — submit, buy, send — it goes in the handler, so it runs exactly once per action. If being on screen causes it — staying connected to the selected room, syncing a map widget, logging that a page was viewed — it's an effect that starts and stops with the component. That rule also explains why POSTs in effects run twice in development.",
          ar: "بالسبب. لو تفاعل معين هو السبب — submit، شراء، إرسال — يبقى مكانه الـ handler، فيشتغل مرة واحدة بالظبط لكل أكشن. ولو الظهور على الشاشة هو السبب — إنك تفضل متوصل بالـ room المختارة، أو تعمل sync لـ map widget، أو تسجّل إن الصفحة اتشافت — يبقى effect بيبدأ ويقف مع الـ component. والقاعدة دي كمان بتشرح ليه الـ POST في الـ effects بيشتغل مرتين في الـ development."
        }
      }
    ],
    drill: [
      {
        q: "Why does my effect run twice in development?",
        a: { en: "Strict Mode mounts, unmounts and mounts again to check that your cleanup undoes your setup.", ar: "الـ Strict Mode بيعمل mount وبعدين unmount وبعدين mount تاني علشان يتأكد إن الـ cleanup بيلغي اللي الـ setup عمله." },
        follow: [
          {
            q: "How should you fix it?",
            a: { en: "Not by removing Strict Mode. Make setup → cleanup → setup behave like one setup: disconnect what you connect, ignore or abort stale fetches. For truly once-per-app work (initialising a library), use a module-level guard outside components.", ar: "مش إنك تشيل الـ Strict Mode. خلي setup ← cleanup ← setup يتصرفوا زي setup واحد: افصل اللي وصلته، واتجاهل أو اعمل abort للـ fetches القديمة. وللشغل اللي بيحصل مرة واحدة للـ app كله فعلًا (تشغيل مكتبة)، استخدم guard في الـ module برّه الـ components." },
            follow: [
              {
                q: "And an analytics event that fires twice?",
                a: { en: "Only in development; in production it fires once per mount. If the event means “the user did X”, move it to the handler; if it means “the page was shown”, the effect is right.", ar: "ده في الـ development بس، وفي الـ production بيطلع مرة لكل mount. ولو الـ event معناه «اليوزر عمل X»، انقله للـ handler. ولو معناه «الصفحة ظهرت»، يبقى الـ effect صح." }
              }
            ]
          }
        ]
      }
    ],
    story: {
      text: { en: "Smart FAQ's team guide says effects are “not for fetching — that's React Query's job”: 26 effects in 166 commits, used for focus, timers and ref syncing.", ar: "الـ guide بتاع الفريق في Smart FAQ بيقول إن الـ effects «مش للـ fetching، دي شغلانة React Query». وكان فيه 26 effect في 166 commit، مستخدمين للـ focus والـ timers ومزامنة الـ refs." },
      p: "smartfaq", tab: "hooks", label: "Smart FAQ"
    },
    sources: [
      { label: "react.dev — You might not need an effect", url: "https://react.dev/learn/you-might-not-need-an-effect" },
      { label: "react.dev — Lifecycle of reactive effects", url: "https://react.dev/learn/lifecycle-of-reactive-effects" },
      { label: "react.dev — Synchronizing with effects", url: "https://react.dev/learn/synchronizing-with-effects" }
    ]
  },

  "strict-mode": {
    why: {
      en: "Strict Mode questions are really about purity and cleanup: if you know why React double-renders and re-runs effects in development, you know what makes components safe under concurrent rendering.",
      ar: "أسئلة الـ Strict Mode في الحقيقة عن الـ purity والـ cleanup. لو عارف ليه React بيعمل render مرتين ويعيد الـ effects في الـ development، يبقى عارف إيه اللي بيخلي الـ components آمنة مع الـ concurrent rendering."
    },
    how: [
      {
        title: { en: "What Strict Mode does — in development only", ar: "الـ Strict Mode بيعمل إيه — في الـ development بس" },
        body: {
          en: "It calls component bodies, state initialisers, updaters and <code>useMemo</code> callbacks twice to expose impure rendering; mounts, unmounts and remounts every component once to test effect cleanup; and warns about deprecated APIs. Nothing of this happens in production. (React 19 reuses the memoised result on the second render.)",
          ar: "بيعمل 3 حاجات. بينادي الـ body بتاع الـ components، والـ state initialisers، والـ updaters، والـ callbacks بتاعة <code>useMemo</code> مرتين، علشان يكشف أي render مش pure. وبيعمل mount وبعدين unmount وبعدين mount تاني لكل component مرة، علشان يختبر الـ cleanup بتاع الـ effects. وبيحذّر من الـ APIs القديمة. ومفيش حاجة من دول بتحصل في الـ production. (و React 19 بيستخدم النتيجة المعمول لها memo في الـ render التاني.)"
        }
      },
      {
        title: { en: "Order: render top-down, effects bottom-up", ar: "الترتيب: الـ render من فوق لتحت، والـ effects من تحت لفوق" },
        body: {
          en: "Parents render before children. In the commit, children's layout effects and effects run before their parents', so when a parent's effect runs, everything below it is already in the DOM with refs attached. Cleanups run before the next setup of the same effect.",
          ar: "الـ parents بتعمل render قبل الـ children. لكن في الـ commit، الـ effects بتاعة الـ children (layout وعادية) بتشتغل قبل بتوع الـ parents. يعني لما الـ effect بتاع الـ parent يشتغل، كل اللي تحته بيكون في الـ DOM والـ refs متركبة. والـ cleanup بيشتغل قبل الـ setup الجاي لنفس الـ effect."
        },
        code: "function Child() { useEffect(() => console.log(\"child effect\")); console.log(\"child render\"); return null; }\nfunction Parent() { useEffect(() => console.log(\"parent effect\")); console.log(\"parent render\"); return <Child />; }\n// parent render, child render, child effect, parent effect",
        run: "browser"
      },
      {
        title: { en: "Why the double mount matters beyond development", ar: "ليه الـ mount المزدوج مهم بعد الـ development" },
        body: {
          en: "React increasingly unmounts and restores components while keeping state: Fast Refresh, <code>&lt;Activity&gt;</code> (hidden UI that keeps state but stops effects), and back-navigation in frameworks. Effects that clean up correctly survive all of these; Strict Mode tests that early.",
          ar: "React بقى بيشيل الـ components ويرجّعها وهو محافظ على الـ state في حالات أكتر. زي الـ Fast Refresh، و <code>&lt;Activity&gt;</code> (UI مستخبي بيحافظ على الـ state بس بيوقف الـ effects)، والرجوع لصفحة في الـ frameworks. والـ effects اللي بتعمل cleanup صح بتعدّي من كل ده. والـ Strict Mode بيختبر ده بدري."
        }
      }
    ],
    breaks: [
      {
        title: { en: "Mutation during render shows up doubled", ar: "التعديل وقت الـ render بيظهر مضاعف" },
        body: {
          en: "Pushing to an array created outside the component, or incrementing a module counter in the body, happens twice in development. That's the bug Strict Mode is pointing at, not a Strict Mode bug.",
          ar: "إنك تعمل push لـ array معمول برّه الـ component، أو تزوّد counter في الـ module جوه الـ body، بيحصل مرتين في الـ development. وده الـ bug اللي الـ Strict Mode بيشاور عليه، مش bug في الـ Strict Mode."
        },
        fix: { en: "Create new objects in render; keep counters and logs in effects or handlers.", ar: "اعمل objects جديدة في الـ render. وخلي الـ counters والـ logs في effects أو handlers." }
      },
      {
        title: { en: "Turning Strict Mode off to “fix” duplicates", ar: "قفل الـ Strict Mode علشان «تصلّح» التكرار" },
        body: {
          en: "Duplicate subscriptions or double requests in development mean a missing cleanup. Removing Strict Mode hides it until Fast Refresh, a remount or <code>&lt;Activity&gt;</code> brings it back in production.",
          ar: "الـ subscriptions المتكررة أو الـ requests المزدوجة في الـ development معناها إن فيه cleanup ناقص. وشيل الـ Strict Mode بيخبّيه لحد ما Fast Refresh أو remount أو <code>&lt;Activity&gt;</code> يرجّعوه في الـ production."
        },
        fix: { en: "Keep Strict Mode on; add the cleanup (unsubscribe, abort, ignore flag).", ar: "خلي الـ Strict Mode شغال، وضيف الـ cleanup (unsubscribe أو abort أو ignore flag)." }
      }
    ],
    levels: [
      {
        q: "Why does React render my component twice?",
        mid: { en: "Because of Strict Mode in development; it doesn't happen in production.", ar: "بسبب الـ Strict Mode في الـ development، ومش بيحصل في الـ production." },
        senior: {
          en: "Strict Mode calls render-phase code twice to surface impurity — React's model assumes render can run any number of times, especially with concurrent rendering. It also mounts, unmounts and remounts once to prove that effect cleanup mirrors setup. If something breaks, the component has a bug that would appear later in production through remounts, Fast Refresh or <code>&lt;Activity&gt;</code>. I fix the component, never the flag.",
          ar: "الـ Strict Mode بينادي كود الـ render مرتين علشان يطلّع أي حاجة مش pure — موديل React بيفترض إن الـ render ممكن يشتغل أي عدد مرات، خصوصًا مع الـ concurrent rendering. وكمان بيعمل mount وبعدين unmount وبعدين mount مرة علشان يثبت إن الـ cleanup بيعكس الـ setup. ولو حاجة باظت، يبقى الـ component فيه bug هيظهر بعدين في الـ production مع الـ remounts أو Fast Refresh أو <code>&lt;Activity&gt;</code>. فبصلّح الـ component، عمري ما بقفل الـ flag."
        }
      }
    ],
    drill: [
      {
        q: "In what order do parent and child effects run?",
        a: { en: "Child first, then parent — bottom-up — after both rendered top-down.", ar: "الـ child الأول، وبعدين الـ parent — من تحت لفوق — بعد ما الاتنين عملوا render من فوق لتحت." },
        follow: [
          {
            q: "Why bottom-up?",
            a: { en: "So when a parent's effect runs, its children's DOM and refs are ready — a parent can measure or focus something inside a child.", ar: "علشان لما الـ effect بتاع الـ parent يشتغل، الـ DOM والـ refs بتاعة الـ children تكون جاهزة — فالـ parent يقدر يقيس أو يعمل focus لحاجة جوه child." },
            follow: [
              {
                q: "When are refs attached, relative to effects?",
                a: { en: "During the commit, before layout effects run — so both <code>useLayoutEffect</code> and <code>useEffect</code> can read <code>ref.current</code>.", ar: "وقت الـ commit، قبل ما الـ layout effects تشتغل — فـ <code>useLayoutEffect</code> و <code>useEffect</code> الاتنين يقدروا يقروا <code>ref.current</code>." }
              }
            ]
          }
        ]
      }
    ],
    sources: [
      { label: "react.dev — StrictMode", url: "https://react.dev/reference/react/StrictMode" },
      { label: "react.dev — React 19 (Strict Mode changes)", url: "https://react.dev/blog/2024/12/05/react-19" },
      { label: "react.dev — Activity", url: "https://react.dev/reference/react/Activity" }
    ]
  },

  concurrent: {
    why: {
      en: "“What's concurrent React?” separates people who read the release notes from people who understand the consequences: pure render, tearing, transitions, Suspense placement and streaming SSR.",
      ar: "سؤال «يعني إيه concurrent React؟» بيفرّق بين اللي قرا الـ release notes، واللي فاهم اللي بيترتب عليه. يعني: render pure، والـ tearing، والـ transitions، ومكان الـ Suspense، والـ streaming SSR."
    },
    how: [
      {
        title: { en: "Rendering became interruptible", ar: "الـ render بقى ينفع يتقطع" },
        body: {
          en: "With concurrent features, React renders in small slices and yields to the browser between them (about every 5 ms), so input and paint aren't blocked. If an urgent update arrives — typing — it can pause or throw away the non-urgent render and come back to it. Nothing is concurrent unless you use a feature that asks for it: transitions, deferred values, Suspense.",
          ar: "مع الـ concurrent features، React بيعمل render على حتت صغيرة وبيسيب المتصفح يشتغل بينهم (تقريبًا كل 5ms)، فالـ input والرسم مش بيتوقفوا. ولو جه تحديث مستعجل — كتابة — يقدر يوقف أو يرمي الـ render اللي مش مستعجل ويرجعله بعدين. ومفيش حاجة concurrent إلا لو استخدمت feature بتطلبها: transitions، أو deferred values، أو Suspense."
        }
      },
      {
        title: { en: "Updates have priorities", ar: "التحديثات ليها أولويات" },
        body: {
          en: "Discrete input (click, key press) is handled synchronously; updates inside <code>startTransition</code> are low priority and interruptible. That's how a search box stays responsive while a big result list renders in the background.",
          ar: "الـ input المنفصل (ضغطة أو زرار كيبورد) بيتعالج على طول. أما التحديثات اللي جوه <code>startTransition</code> فأولويتها قليلة، وينفع تتقطع. وكده الـ search box بيفضل سريع، والـ list الكبيرة بتاعة النتايج بتترسم في الخلفية."
        },
        code: "const [text, setText] = useState(\"\");\nconst [query, setQuery] = useState(\"\");\nfunction onChange(e) {\n  setText(e.target.value);                         // urgent: the input\n  startTransition(() => setQuery(e.target.value)); // can wait: the results\n}",
        run: "browser"
      },
      {
        title: { en: "Suspense: declarative loading boundaries", ar: "الـ Suspense: حدود loading بشكل declarative" },
        body: {
          en: "A component that isn't ready <b>suspends</b> (via <code>React.lazy</code>, <code>use(promise)</code> or a Suspense-enabled data source); the nearest <code>&lt;Suspense&gt;</code> shows its fallback. During a transition React keeps the already-visible content instead of flashing the fallback. On the server, each boundary can stream its HTML when ready and hydrate on its own, starting with the part the user interacts with.",
          ar: "الـ component اللي مش جاهز بيعمل <b>suspend</b>، عن طريق <code>React.lazy</code> أو <code>use(promise)</code> أو مصدر داتا بيدعم Suspense. وأقرب <code>&lt;Suspense&gt;</code> بيعرض الـ fallback بتاعه. ووقت الـ transition، React بيسيب المحتوى اللي ظاهر بدل ما يعرض الـ fallback فجأة. وعلى السيرفر، كل boundary يقدر يبعت الـ HTML بتاعه أول ما يجهز (streaming)، ويعمل hydrate لوحده. وبيبدأ بالجزء اللي اليوزر بيتفاعل معاه."
        }
      },
      {
        title: { en: "React 19: Actions build on transitions", ar: "React 19: الـ Actions مبنية على الـ transitions" },
        body: {
          en: "An async function passed to <code>startTransition</code> is an Action: React tracks its pending state, errors and optimistic updates. <code>useActionState</code>, <code>useFormStatus</code>, <code>useOptimistic</code> and <code>&lt;form action={fn}&gt;</code> are built on that, alongside <code>use</code>, ref as a prop and Server Components.",
          ar: "الـ async function اللي بتتبعت لـ <code>startTransition</code> اسمها Action: React بيتابع الـ pending state والـ errors والـ optimistic updates بتاعتها. و <code>useActionState</code> و <code>useFormStatus</code> و <code>useOptimistic</code> و <code>&lt;form action={fn}&gt;</code> مبنيين على كده، ومعاهم <code>use</code>، والـ ref كـ prop، والـ Server Components."
        }
      }
    ],
    breaks: [
      {
        title: { en: "Tearing with external stores", ar: "الـ Tearing مع الـ external stores" },
        body: {
          en: "If a component reads a mutable store directly during a render that gets interrupted, the store may change in between, and different parts of the same screen show different values.",
          ar: "لو component بيقرا store بيتغير مباشرة وقت render اتقطع، الـ store ممكن يتغير في النص، فأجزاء مختلفة من نفس الشاشة تعرض قيم مختلفة."
        },
        fix: { en: "Read external stores through <code>useSyncExternalStore</code> (Zustand, Redux and TanStack Query already do).", ar: "اقرا الـ external stores عن طريق <code>useSyncExternalStore</code> (و Zustand و Redux و TanStack Query بيعملوا كده أصلًا)." }
      },
      {
        title: { en: "Fallbacks replacing content on navigation", ar: "الـ fallbacks بتشيل المحتوى وقت التنقل" },
        body: {
          en: "Changing a route or tab with a plain state update makes the page suspend and the whole section collapse into a spinner.",
          ar: "لو غيّرت route أو tab بـ state update عادي، الصفحة بتعمل suspend والجزء كله بيبقى spinner."
        },
        fix: { en: "Make navigation a transition (routers do this); place Suspense boundaries where a loading state makes sense, not around the whole app.", ar: "خلي التنقل transition، والـ routers أصلًا بتعمل كده. وحط حدود الـ Suspense في الأماكن اللي الـ loading فيها منطقي، مش حوالين الـ app كله." }
      },
      {
        title: { en: "Expecting a transition to make slow code fast", ar: "إنك تستنى الـ transition يخلي الكود البطيء سريع" },
        body: {
          en: "A transition keeps the UI responsive while slow work happens; it doesn't make that work cheaper, and a controlled input's own state can't be a transition.",
          ar: "الـ transition بيخلي الـ UI سريع الاستجابة والشغل البطيء شغال في الخلفية. بس مش بيخلي الشغل ده أرخص. والـ state بتاع controlled input نفسه مينفعش يبقى transition."
        },
        fix: { en: "Still reduce the work: virtualise long lists, memoise expensive children, move CPU-heavy work off the main thread.", ar: "برضه قلّل الشغل: اعمل virtualization للـ lists الطويلة، و memo للـ children التقيلة، وانقل الحسابات التقيلة برّه الـ main thread." }
      }
    ],
    levels: [
      {
        q: "What does concurrent React mean?",
        mid: { en: "React can interrupt rendering to handle more important updates.", ar: "React يقدر يقطع الـ render علشان يتعامل مع تحديثات أهم." },
        senior: {
          en: "Rendering became interruptible: React renders in slices, yields to the browser, lets urgent updates interrupt transitions, and may throw work away. It's opt-in through transitions, deferred values and Suspense. The consequences I design for: render must be pure because it may run without committing; external stores need <code>useSyncExternalStore</code> to avoid tearing; Suspense boundaries define loading states; and on the server they become streaming and selective-hydration units.",
          ar: "الـ render بقى ينفع يتقطع. React بيعمل render على حتت، ويسيب المتصفح يشتغل بينهم، ويخلي التحديثات المستعجلة تقطع الـ transitions، وممكن يرمي شغل. وده مش بيحصل غير لو استخدمت الـ transitions أو الـ deferred values أو الـ Suspense. وفيه 4 حاجات بصمم على أساسها. الـ render لازم يبقى pure، لأنه ممكن يشتغل من غير commit. والـ external stores محتاجة <code>useSyncExternalStore</code> علشان متحصلش tearing. وحدود الـ Suspense هي اللي بتحدد حالات الـ loading. وعلى السيرفر، الحدود دي بتبقى وحدات للـ streaming والـ selective hydration."
        }
      },
      {
        q: "How does Suspense work?",
        mid: { en: "It shows a fallback while a component is loading.", ar: "بيعرض fallback والـ component بيحمّل." },
        senior: {
          en: "A component that isn't ready suspends — through <code>React.lazy</code>, <code>use(promise)</code> or a framework's data layer — and React shows the nearest boundary's fallback. Inside a transition it keeps showing what's already on screen instead. I place boundaries by design: things that should appear together share one boundary, independent sections get their own. In SSR the same boundaries stream HTML and hydrate independently.",
          ar: "الـ component اللي مش جاهز بيعمل suspend — عن طريق <code>React.lazy</code> أو <code>use(promise)</code> أو طبقة الداتا بتاعة الـ framework — و React بيعرض الـ fallback بتاع أقرب boundary. وجوه الـ transition بيفضل يعرض اللي ظاهر بدل كده. وبحط الحدود بتصميم: الحاجات اللي المفروض تظهر مع بعض ليها boundary واحد، والأجزاء المستقلة كل واحد ليه boundary. وفي الـ SSR نفس الحدود دي بتعمل streaming للـ HTML وبتعمل hydrate لوحدها."
        }
      }
    ],
    drill: [
      {
        q: "If rendering can be interrupted, can my component render without committing?",
        a: { en: "Yes — React may render it, then discard the result.", ar: "أيوه — React ممكن يعمله render وبعدين يرمي النتيجة." },
        follow: [
          {
            q: "So what must never happen during render?",
            a: { en: "Anything observable outside the component: requests, subscriptions, mutations of shared objects, writing refs that other code reads.", ar: "أي حاجة تتشاف برّه الـ component: requests، و subscriptions، وتعديل objects مشتركة، وكتابة refs كود تاني بيقراها." },
            follow: [
              {
                q: "How does useSyncExternalStore prevent tearing?",
                a: { en: "It reads a snapshot during render and checks it again before committing; if the store changed mid-render, React re-renders synchronously so the whole tree uses one consistent value.", ar: "بيقرا snapshot وقت الـ render، ويتأكد منه تاني قبل الـ commit. ولو الـ store اتغير في نص الـ render، React بيعمل re-render على طول، علشان الشجرة كلها تستخدم قيمة واحدة." }
              }
            ]
          }
        ]
      }
    ],
    sources: [
      { label: "React 18 — What is concurrent React?", url: "https://react.dev/blog/2022/03/29/react-v18#what-is-concurrent-react" },
      { label: "react.dev — Suspense", url: "https://react.dev/reference/react/Suspense" },
      { label: "react.dev — useTransition", url: "https://react.dev/reference/react/useTransition" },
      { label: "react.dev — React 19", url: "https://react.dev/blog/2024/12/05/react-19" }
    ]
  }
});
