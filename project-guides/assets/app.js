// Interview Handbook — renders data/*.js (window.HANDBOOK) into a single-page app.
// Routes: #/ (home) · #/concepts[/id] · #/<project>[/<tab>]. Language: ar | en | both (remembered).
(function () {
  "use strict";
  var H = window.HANDBOOK || { projects: [], concepts: [], todo: [] };
  var KEY = "handbook-lang";
  var lang = readLang();

  var UI = {
    en: {
      title: "Interview Handbook", sub: "Ibrahem Hassan · Frontend", home: "Home", concepts: "Concepts",
      projects: "Projects", todo: "To do on other laptops", overview: "Overview", decisions: "Decisions",
      how: "How it works", hooks: "Hooks", problems: "Problems solved", interview: "Interview",
      pitch: "The project in 30 seconds", built: "What I built", role: "My role", stack: "Tools",
      decisionsIntro: "For every big choice: what I picked, what else existed, why, whether both could live together, and what I would pick today.",
      instead: "instead of", why: "Why", both: "Both together?", better: "Better option today?", say: "Say it in the interview",
      yes: "Yes", no: "No", partly: "Possible, but…", learn: "Learn the concept →",
      flows: "Flows", patterns: "Patterns", sketch: "Simplified sketch of the pattern — not the project's code.",
      problem: "Problem", fix: "Fix", result: "Result", lesson: "Lesson",
      star: "60-second story (STAR)", qa: "Likely questions", terms: "Words to use", dont: "Don't say", evidence: "Evidence",
      next: "Next", homeIntro: "Every project I built, explained so I can learn from it and explain it in an interview: what it is, what I built, why I chose each tool, how it works, the hooks I used, the problems I solved, and how to answer questions about it.",
      howto: "How to study before an interview",
      howtoSteps: ["Pick the 3–4 projects on the CV you are sending.", "Read “My role” and “Don't say” first.", "Go through Decisions — be ready for “why X and not Y?”.", "Say the STAR story out loud, then answer the questions without opening them."],
      conceptsIntro: "The ideas behind the decisions. Each card: what it is, when it matters, and a question you may get.",
      what: "What it is", when: "When it matters", pitfall: "Watch out", usedIn: "Used in",
      readyCount: "ready", menu: "Menu", study: "Study guide", notHere: "The code is on another laptop. Open the repo there and say “continue the project guides”."
    },
    ar: {
      title: "دليل الإنترفيو", sub: "إبراهيم حسن · Frontend", home: "الرئيسية", concepts: "المفاهيم",
      projects: "المشاريع", todo: "لسه — على لاب تاني", overview: "نظرة عامة", decisions: "القرارات التقنية",
      how: "إزاي شغال", hooks: "الـ Hooks", problems: "مشاكل حليتها", interview: "الإنترفيو",
      pitch: "المشروع في 30 ثانية", built: "اللي عملته", role: "دوري", stack: "الأدوات",
      decisionsIntro: "لكل اختيار مهم: اخترت إيه، كان في إيه تاني، ليه، ينفع الاتنين مع بعض ولا لأ، ولو هعمله النهارده هختار إيه.",
      instead: "بدل", why: "ليه", both: "ينفع الاتنين مع بعض؟", better: "في حاجة أحسن النهارده؟", say: "قولها في الإنترفيو",
      yes: "أيوه", no: "لأ", partly: "ينفع، بس…", learn: "افهم المفهوم ←",
      flows: "الـ Flows", patterns: "الـ Patterns", sketch: "شكل مبسط للفكرة — مش كود المشروع.",
      problem: "المشكلة", fix: "الحل", result: "النتيجة", lesson: "الدرس",
      star: "القصة في دقيقة (STAR)", qa: "أسئلة متوقعة", terms: "كلمات تستخدمها", dont: "متقولش", evidence: "الأدلة",
      next: "اللي بعده", homeIntro: "كل مشروع اشتغلت عليه، متشرح علشان أتعلم منه وأعرف أشرحه في الإنترفيو: هو إيه، عملت فيه إيه، اخترت كل أداة ليه، شغال إزاي، الـ hooks اللي استخدمتها، المشاكل اللي حليتها، وأجاوب إزاي.",
      howto: "إزاي تذاكر قبل الإنترفيو",
      howtoSteps: ["اختار الـ 3–4 مشاريع اللي في الـ CV اللي هتبعته.", "اقرا «دوري» و«متقولش» الأول.", "عدّي على «القرارات التقنية» — استعد لسؤال «ليه X مش Y؟».", "قول قصة الـ STAR بصوت عالي، وبعدين جاوب الأسئلة من غير ما تفتحها."],
      conceptsIntro: "الأفكار اللي ورا القرارات. كل كارت: المفهوم إيه، يهم إمتى، وسؤال ممكن يتسأل.",
      what: "هو إيه", when: "يهم إمتى", pitfall: "خلي بالك", usedIn: "اتستخدم في",
      readyCount: "جاهز", menu: "القايمة", study: "دليل المذاكرة", notHere: "الكود على لاب تاني. افتح الـ repo هناك وقول «كمّل الـ project guides»."
    }
  };
  var TABS = ["overview", "decisions", "how", "hooks", "problems", "interview"];

  function readLang() {
    try { var v = localStorage.getItem(KEY); if (v === "ar" || v === "en" || v === "both") return v; } catch (e) {}
    return "ar";
  }
  function saveLang(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function U(k) { return (lang === "ar" ? UI.ar : UI.en)[k]; }
  function T(x) {
    if (x == null) return "";
    if (typeof x === "string") return x;
    if (lang === "both") return '<span class="bi-ar" lang="ar">' + (x.ar || "") + '</span><span class="bi-en" lang="en">' + (x.en || "") + "</span>";
    return x[lang] != null ? x[lang] : x.en;
  }
  function LIST(arr) { return "<ul>" + (arr || []).map(function (i) { return "<li>" + T(i) + "</li>"; }).join("") + "</ul>"; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  // Syntax colours come from assets/highlight.js (shared with the React site).
  function code(s) { return '<pre class="code">' + window.highlightCode(s) + "</pre>"; }
  function byId(id) { for (var i = 0; i < H.projects.length; i++) if (H.projects[i].id === id) return H.projects[i]; return null; }
  function logo(p, big) {
    var cls = "logo-tile" + (big ? " lg" : "");
    if (p.logo) return '<div class="' + cls + '"><img src="' + p.logo + '" alt="' + p.name + ' logo"></div>';
    return '<div class="' + cls + ' mono" style="--tile:' + (p.color || "") + '">' + (p.monogram || p.name.charAt(0)) + "</div>";
  }

  function route() {
    var h = (location.hash || "#/").replace(/^#\/?/, "").split("/");
    if (!h[0]) return { view: "home" };
    if (h[0] === "concepts") return { view: "concepts", anchor: h[1] };
    var p = byId(h[0]);
    if (!p) return { view: "home" };
    return { view: "project", p: p, tab: TABS.indexOf(h[1]) >= 0 ? h[1] : "overview" };
  }

  // ---------- Sidebar ----------
  function sidebar(r) {
    var s = '<a class="brand" href="#/"><div class="brand-mark">IH</div><div><b>' + U("title") + "</b><span>" + U("sub") + "</span></div></a>";
    s += '<div class="lang-switch" role="group" aria-label="Language">' +
      ["ar", "en", "both"].map(function (l) {
        return '<button data-lang="' + l + '" aria-pressed="' + (lang === l) + '">' + (l === "ar" ? "عربي" : l === "en" ? "English" : "Both") + "</button>";
      }).join("") + "</div>";
    s += '<nav class="nav">' +
      '<a href="#/" class="' + (r.view === "home" ? "active" : "") + '"><div class="logo-tile mono" style="--tile:#2b2b28">⌂</div><b>' + U("home") + "</b></a>" +
      '<a href="#/concepts" class="' + (r.view === "concepts" ? "active" : "") + '"><div class="logo-tile mono" style="--tile:#5b4fd6">◆</div><b>' + U("concepts") + "</b></a>" +
      '<a href="../study-guide/index.html" style="border:1px dashed var(--line)"><div class="logo-tile mono" style="--tile:#7c3aed">⇆</div><b>' + U("study") + "</b></a></nav>";
    s += '<div class="nav-label">' + U("projects") + "</div><nav class=\"nav\">" + H.projects.map(function (p) {
      return '<a href="#/' + p.id + '" class="' + (r.p && r.p.id === p.id ? "active" : "") + '">' + logo(p) +
        "<div><b>" + p.name + '</b><span class="meta">' + p.company + " · " + p.years + "</span></div></a>";
    }).join("") + "</nav>";
    if (H.todo && H.todo.length) {
      s += '<div class="nav-label">' + U("todo") + '</div><nav class="nav">' + H.todo.map(function (t) {
        return '<a class="todo" title="' + esc(U("notHere")) + '"><div class="logo-tile mono" style="--tile:#9a978c">' + t.name.charAt(0) +
          "</div><div><b>" + t.name + '</b><span class="meta">' + t.where + "</span></div></a>";
      }).join("") + "</nav>";
    }
    s += '<div class="sidebar-foot">' + H.projects.length + " " + U("readyCount") + " · " + (H.todo || []).length + " " + (lang === "ar" ? "لسه" : "to do") + "</div>";
    return s;
  }

  // ---------- Views ----------
  function home() {
    var s = '<div class="hero-home"><h1>' + U("title") + "</h1><p>" + U("homeIntro") + "</p></div>";
    s += '<h2 class="section-title">' + U("projects") + '</h2><div class="p-cards">' + H.projects.map(function (p) {
      var st = (p.stats || []).slice(0, 2).map(function (x) { return "<span><b class=\"ltr\">" + x[0] + "</b> " + T(x[1]) + "</span>"; }).join(" · ");
      return '<a class="p-card" href="#/' + p.id + '" style="--tile:' + p.color + '"><div class="row">' + logo(p) +
        "<div><h3>" + p.name + '</h3><div class="meta">' + p.company + " · " + p.years + '</div></div></div><div class="line">' + T(p.tagline) +
        '</div><div class="big">' + st + "</div></a>";
    }).join("") + "</div>";
    s += '<h2 class="section-title">' + U("howto") + '</h2><div class="card howto"><ol>' + U("howtoSteps").map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ol></div>";
    s += '<h2 class="section-title">' + U("concepts") + '</h2><a class="card" href="#/concepts" style="display:block;text-decoration:none;color:inherit"><p>' + U("conceptsIntro") +
      '</p><div class="chips">' + H.concepts.map(function (c) { return '<span class="chip">' + c.name + "</span>"; }).join("") + "</div></a>";
    if (H.todo && H.todo.length) {
      s += '<h2 class="section-title">' + U("todo") + '</h2><div class="card"><p class="muted">' + U("notHere") + '</p><div class="chips">' +
        H.todo.map(function (t) { return '<span class="chip">' + t.name + " · " + t.where + "</span>"; }).join("") + "</div></div>";
    }
    return s;
  }

  function header(p) {
    var s = '<div class="p-head">' + logo(p, true) + "<div><h1>" + p.name + '</h1><div class="tagline">' + T(p.tagline) + '</div><div class="facts">' +
      '<span class="fact role">' + T(p.role) + '</span><span class="fact">' + p.company + '</span><span class="fact ltr">' + p.period + "</span>" +
      (p.team ? '<span class="fact">' + T(p.team) + "</span>" : "") + "</div></div></div>";
    s += '<div class="stats">' + (p.stats || []).map(function (x) { return '<div class="stat"><b>' + x[0] + "</b><span>" + T(x[1]) + "</span></div>"; }).join("") + "</div>";
    s += '<nav class="tabs">' + TABS.map(function (t) { return '<a href="#/' + p.id + "/" + t + '" data-tab="' + t + '">' + U(t) + "</a>"; }).join("") + "</nav>";
    return s;
  }

  function overview(p) {
    var s = '<h2 class="section-title">' + U("pitch") + '</h2><div class="card pitch">' + LIST(p.pitch) + "</div>";
    s += '<h2 class="section-title">' + U("built") + '</h2><div class="grid-2">' + (p.built || []).map(function (g) {
      return '<div class="card"><h3>' + T(g.title) + "</h3>" + LIST(g.items) + "</div>";
    }).join("") + "</div>";
    s += '<h2 class="section-title">' + U("role") + '</h2><div class="card">' + LIST(p.myRole) + "</div>";
    s += '<h2 class="section-title">' + U("stack") + '</h2><div class="card">' + (p.stack || []).map(function (r) {
      return '<div class="stack-row"><div class="k">' + T(r[0]) + '</div><div class="chips">' + r[1].map(function (c) { return '<span class="chip">' + c + "</span>"; }).join("") + "</div></div>";
    }).join("") + "</div>";
    return s;
  }

  function decisions(p) {
    var s = '<p class="muted">' + U("decisionsIntro") + "</p>";
    s += (p.decisions || []).map(function (d) {
      var v = d.both && d.both.v;
      var concept = d.concept ? ' · <a class="concept-link" href="#/concepts/' + d.concept + '">' + U("learn") + "</a>" : "";
      return '<div class="card decision"><div class="d-head"><h3>' + T(d.title) + '</h3><div class="vs"><span class="pick">' + d.chose + "</span>" +
        (d.alts && d.alts.length ? '<span class="over">' + U("instead") + "</span>" + d.alts.map(function (a) { return '<span class="alt">' + a + "</span>"; }).join("") : "") +
        '</div></div><div class="d-body">' +
        '<div class="d-cell"><div class="lbl">' + U("why") + "</div>" + T(d.why) + "</div>" +
        '<div class="d-cell"><div class="lbl">' + U("both") + (v ? ' <span class="verdict ' + v + '">' + U(v) + "</span>" : "") + "</div>" + T(d.both) + "</div>" +
        '<div class="d-cell wide"><div class="lbl">' + U("better") + "</div>" + T(d.better) + "</div>" +
        (d.say ? '<div class="d-cell wide say"><div class="lbl">' + U("say") + concept + "</div><q>" + d.say + "</q></div>" : "") +
        "</div></div>";
    }).join("");
    return s;
  }

  function how(p) {
    var s = "";
    if (p.flows && p.flows.length) {
      s += '<h2 class="section-title">' + U("flows") + "</h2>" + p.flows.map(function (f) {
        return '<div class="card"><h3>' + T(f.title) + '</h3>' + (f.note ? '<p class="muted">' + T(f.note) + "</p>" : "") + '<ol class="flow">' + f.steps.map(function (st) {
          return "<li><b>" + st[0] + "</b><span>" + T(st[1]) + "</span></li>";
        }).join("") + "</ol></div>";
      }).join("");
    }
    if (p.patterns && p.patterns.length) {
      s += '<h2 class="section-title">' + U("patterns") + "</h2>" + p.patterns.map(function (pt) {
        return '<div class="card"><h3>' + T(pt.title) + "</h3><div>" + T(pt.body) + "</div>" + (pt.code ? code(pt.code) + '<div class="sketch-note">' + U("sketch") + "</div>" : "") + "</div>";
      }).join("");
    }
    return s;
  }

  function hooks(p) {
    return (p.hooks || []).map(function (g) {
      return '<h2 class="section-title">' + T(g.group) + '</h2><div class="card">' + g.items.map(function (h) {
        return '<div class="hook"><div class="name">' + h.name + (h.count ? '<span class="count">' + h.count + "</span>" : "") + "</div><div>" + T(h.what) +
          (h.remember ? '<div class="remember"><b>' + (lang === "ar" ? "افتكر:" : "Remember:") + "</b> " + T(h.remember) + "</div>" : "") + "</div></div>";
      }).join("") + "</div>";
    }).join("");
  }

  function problems(p) {
    return (p.problems || []).map(function (x) {
      return '<div class="card story"><h3>' + T(x.title) + '</h3><div class="steps3">' +
        '<div><span class="lbl">' + U("problem") + "</span>" + T(x.problem) + "</div>" +
        '<div><span class="lbl">' + U("fix") + "</span>" + T(x.fix) + "</div>" +
        '<div><span class="lbl">' + U("result") + "</span>" + T(x.result) + "</div></div>" +
        (x.lesson ? '<div class="lesson"><b>' + U("lesson") + ":</b> " + T(x.lesson) + "</div>" : "") + "</div>";
    }).join("");
  }

  function interview(p) {
    var s = "";
    if (p.star) {
      s += '<h2 class="section-title">' + U("star") + '</h2><div class="card"><div class="star">' + ["s", "t", "a", "r"].map(function (k) {
        return '<div><span class="letter">' + k.toUpperCase() + "</span>" + T(p.star[k]) + "</div>";
      }).join("") + "</div></div>";
    }
    s += '<h2 class="section-title">' + U("qa") + "</h2>" + (p.qa || []).map(function (q) {
      return '<details class="qa"><summary>' + q.q + "</summary><div>" + T(q.a) + "</div></details>";
    }).join("");
    if (p.terms && p.terms.length) {
      s += '<h2 class="section-title">' + U("terms") + '</h2><div class="card terms"><div class="chips">' + p.terms.map(function (t) { return '<span class="chip">' + t + "</span>"; }).join("") + "</div></div>";
    }
    if (p.dont && p.dont.length) s += '<div class="card dont" style="margin-top:18px"><h3>' + U("dont") + "</h3>" + LIST(p.dont) + "</div>";
    if (p.evidence && p.evidence.length) s += '<h2 class="section-title">' + U("evidence") + '</h2><div class="card muted" style="font-size:14px">' + LIST(p.evidence) + "</div>";
    return s;
  }

  function project(r) {
    var p = r.p;
    var views = { overview: overview, decisions: decisions, how: how, hooks: hooks, problems: problems, interview: interview };
    var i = TABS.indexOf(r.tab);
    var nextTab = TABS[i + 1];
    var s = '<div class="wrap" style="--brand:' + p.color + '">' + header(p) + views[r.tab](p);
    if (nextTab) s += '<p style="margin-top:24px"><a href="#/' + p.id + "/" + nextTab + '" style="font-weight:600;text-decoration:none">' + U("next") + ": " + U(nextTab) + (lang === "ar" ? " ←" : " →") + "</a></p>";
    return s + "</div>";
  }

  function concepts(r) {
    var s = '<div class="wrap"><div class="hero-home"><h1>' + U("concepts") + "</h1><p>" + U("conceptsIntro") + "</p></div>";
    s += H.concepts.map(function (c) {
      var used = H.projects.filter(function (p) { return (p.decisions || []).some(function (d) { return d.concept === c.id; }); })
        .map(function (p) { return '<a href="#/' + p.id + '/decisions">' + p.name + "</a>"; }).join(" · ");
      return '<div class="card concept" id="c-' + c.id + '"><h3>' + c.name + '</h3><div class="tagline">' + T(c.tagline) + "</div>" +
        '<div class="grid-2" style="margin-top:6px"><div><b>' + U("what") + "</b><div>" + T(c.what) + "</div></div><div><b>" + U("when") + "</b><div>" + T(c.when) + "</div></div></div>" +
        (c.pitfall ? '<div class="lesson" style="margin-top:12px"><b>' + U("pitfall") + ":</b> " + T(c.pitfall) + "</div>" : "") +
        (c.q ? '<details class="qa" style="margin-top:12px"><summary>' + c.q + "</summary><div>" + T(c.a) + "</div></details>" : "") +
        (used ? '<div class="used-in">' + U("usedIn") + ": " + used + "</div>" : "") + "</div>";
    }).join("");
    return s + "</div>";
  }

  // ---------- Render ----------
  function render() {
    var r = route();
    var root = document.documentElement;
    root.lang = lang === "en" ? "en" : "ar";
    root.dir = lang === "en" ? "ltr" : "rtl";
    var title = r.view === "project" ? r.p.name : r.view === "concepts" ? U("concepts") : U("title");
    document.title = title + (r.view === "home" ? "" : " — " + U("title"));
    var main = r.view === "home" ? '<div class="wrap">' + home() + "</div>" : r.view === "concepts" ? concepts(r) : project(r);
    document.getElementById("app").innerHTML =
      '<div class="topbar"><button type="button" data-menu>☰ ' + U("menu") + '</button><span class="title">' + title + "</span></div>" +
      '<div class="scrim" data-menu></div><div class="shell"><aside class="sidebar">' + sidebar(r) + "</aside><main>" + main + "</main></div>";
    if (r.view === "project") {
      var a = document.querySelector('.tabs a[data-tab="' + r.tab + '"]');
      if (a) { a.classList.add("active"); }
    }
    document.body.classList.remove("menu-open");
    if (r.view === "concepts" && r.anchor) {
      var el = document.getElementById("c-" + r.anchor);
      if (el) { el.scrollIntoView({ block: "start" }); return; }
    }
    window.scrollTo(0, 0);
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".lang-switch button");
    if (b) { lang = b.getAttribute("data-lang"); saveLang(lang); render(); return; }
    if (e.target.closest && e.target.closest("[data-menu]")) { document.body.classList.toggle("menu-open"); }
  });
  window.addEventListener("hashchange", render);
  render();
})();
