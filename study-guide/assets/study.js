// Study Guide — renders data/*.js (window.STUDY) into a single-page app.
// Routes: #/ · #/s/<section> · #/t/<section>/<topic> · #/o/<group> (output questions) · #/quick · #/quiz[/<section>] · #/search/<q>
// Language: ar | en | both — shared with the Interview Handbook (same localStorage key).
(function () {
  "use strict";
  var S = window.STUDY || { sections: [] };
  var KEY = "handbook-lang";
  var lang = readLang();

  var UI = {
    en: {
      title: "Study Guide", sub: "Ibrahem Hassan · Frontend", home: "Home", quick: "Before the interview", quiz: "Test yourself",
      projects: "Project guides", sections: "Sections", soon: "coming", search: "Search everything…", results: "Results for",
      noResults: "Nothing found. Try another word (English terms work best).",
      homeIntro: "Everything a frontend interview can ask, from HTML to system design — explained with when to use what, why, the traps, and how it shows up in my own projects.",
      howto: "How to use it",
      howtoSteps: ["Read a section from the top; each topic starts with a one-line summary.", "Answer the “Test yourself” questions before opening them.", "Do the output questions on paper first — say why, not only what.", "One hour before an interview: open “Before the interview”."],
      tldr: "In one line", say: "Say it in the interview", inProjects: "In my projects", interview: "Interview questions", follow: "They may dig deeper",
      selfTest: "Test yourself", think: "Think first, then open", answer: "Answer", why: "Why", output: "Output", use: "Use it when", avoid: "Avoid it when",
      pitfalls: "Traps", topics: "topics", questions: "questions", ready: "ready", planned: "planned", next: "Next", prev: "Previous",
      quickIntro: "The short version of every ready topic: the key points and the sentence to say. Read it the hour before an interview.",
      quizIntro: "Random questions from the ready sections. Answer out loud, then open.", shuffle: "Another set", all: "All sections",
      outputIntro: "Read the code, write the output on paper, explain why — then open.", group: "Group", openSection: "Open the section",
      comingText: "This section is planned. It will be written in the next rounds, in order.", level: { 1: "basic", 2: "medium", 3: "tricky" }, menu: "Menu"
    },
    ar: {
      title: "دليل المذاكرة", sub: "إبراهيم حسن · Frontend", home: "الرئيسية", quick: "قبل الإنترفيو", quiz: "اختبر نفسك",
      projects: "شرح المشاريع", sections: "الأقسام", soon: "قريبًا", search: "دوّر في كل حاجة…", results: "نتايج",
      noResults: "مفيش نتايج. جرّب كلمة تانية (المصطلحات الإنجليزي أحسن).",
      homeIntro: "كل اللي ممكن يتسأل في إنترفيو Frontend، من HTML لحد الـ system design — متشرح بإمتى تستخدم إيه، وليه، والمطبات، وظهر إزاي في مشاريعي.",
      howto: "تذاكر إزاي",
      howtoSteps: ["اقرا القسم من أوله؛ كل topic بيبدأ بملخص في سطر.", "جاوب أسئلة «اختبر نفسك» قبل ما تفتحها.", "أسئلة «هيطبع إيه؟» حلها على ورقة الأول — وقول ليه، مش بس إيه.", "قبل الإنترفيو بساعة: افتح «قبل الإنترفيو»."],
      tldr: "في سطر", say: "قولها في الإنترفيو", inProjects: "في مشاريعي", interview: "أسئلة الإنترفيو", follow: "ممكن يحفر أكتر",
      selfTest: "اختبر نفسك", think: "فكّر الأول، وبعدين افتح", answer: "الإجابة", why: "ليه", output: "الناتج", use: "استخدمه لما", avoid: "ابعد عنه لما",
      pitfalls: "مطبات", topics: "topic", questions: "سؤال", ready: "جاهز", planned: "متخطط", next: "اللي بعده", prev: "اللي قبله",
      quickIntro: "النسخة المختصرة من كل topic جاهز: أهم النقط والجملة اللي تقولها. اقراها في الساعة اللي قبل الإنترفيو.",
      quizIntro: "أسئلة عشوائية من الأقسام الجاهزة. جاوب بصوت عالي، وبعدين افتح.", shuffle: "أسئلة تانية", all: "كل الأقسام",
      outputIntro: "اقرا الكود، اكتب الناتج على ورقة، واشرح ليه — وبعدين افتح.", group: "مجموعة", openSection: "افتح القسم",
      comingText: "القسم ده متخطط. هيتكتب في الجولات الجاية بالترتيب.", level: { 1: "سهل", 2: "متوسط", 3: "صعب" }, menu: "القايمة"
    }
  };

  function readLang() {
    try { var v = localStorage.getItem(KEY); if (v === "ar" || v === "en" || v === "both") return v; } catch (e) {}
    return "ar";
  }
  function saveLang(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function U(k) { return (lang === "ar" ? UI.ar : UI.en)[k]; }
  function T(x) {
    if (x == null) return "";
    if (typeof x === "string") return x;
    if (lang === "both") return '<span class="bi-ar">' + (x.ar || "") + '</span><span class="bi-en">' + (x.en || "") + "</span>";
    return x[lang] != null ? x[lang] : x.en;
  }
  function plain(x) { return typeof x === "string" ? x : x ? (x.en || "") + " " + (x.ar || "") : ""; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function code(s) { return '<pre class="code">' + esc(s).replace(/(\/\/.*)$/gm, '<span class="c">$1</span>') + "</pre>"; }
  function LIST(arr) { return "<ul>" + (arr || []).map(function (i) { return "<li>" + T(i) + "</li>"; }).join("") + "</ul>"; }
  function arrow() { return lang === "ar" ? "←" : "→"; }

  function ready(sec) { return !!((sec.topics && sec.topics.length) || (sec.groups && sec.groups.length)); }
  function secById(id) { for (var i = 0; i < S.sections.length; i++) if (S.sections[i].id === id) return S.sections[i]; return null; }
  function topicById(sec, id) { var t = sec && sec.topics || []; for (var i = 0; i < t.length; i++) if (t[i].id === id) return t[i]; return null; }
  function groupById(id) {
    for (var i = 0; i < S.sections.length; i++) {
      var g = S.sections[i].groups || [];
      for (var j = 0; j < g.length; j++) if (g[j].id === id) return { sec: S.sections[i], g: g[j], i: j };
    }
    return null;
  }
  function tile(sec, big) { return '<div class="logo-tile mono st-tile' + (big ? ' lg' : '') + '" style="--tile:' + sec.color + '">' + sec.icon + "</div>"; }
  function count(sec) {
    if (sec.groups) return sec.groups.reduce(function (n, g) { return n + g.questions.length; }, 0) + " " + U("questions");
    return (sec.topics || []).length + " " + U("topics");
  }

  // ---------- Search index ----------
  var INDEX = [];
  function strip(s) { return String(s).replace(/<[^>]+>/g, " ").toLowerCase(); }
  function buildIndex() {
    S.sections.forEach(function (sec) {
      (sec.topics || []).forEach(function (t) {
        var parts = [plain(t.title), plain(t.tldr), t.say || ""];
        (t.blocks || []).forEach(function (b) {
          parts.push(plain(b.title), plain(b.body), b.code || "");
          (b.items || b.use || []).forEach(function (i) { parts.push(plain(i)); });
          (b.avoid || []).forEach(function (i) { parts.push(plain(i)); });
          (b.rows || []).forEach(function (r) { r.forEach(function (c) { parts.push(plain(c)); }); });
        });
        (t.interview || []).forEach(function (q) { parts.push(q.q, plain(q.a)); });
        (t.quiz || []).forEach(function (q) { parts.push(plain(q.q), plain(q.a)); });
        INDEX.push({ kind: "topic", sec: sec, t: t, text: strip(parts.join(" ")) });
      });
      (sec.groups || []).forEach(function (g) {
        g.questions.forEach(function (q, i) {
          INDEX.push({ kind: "output", sec: sec, g: g, q: q, n: i + 1, text: strip(plain(g.title) + " " + q.code + " " + plain(q.why) + " " + (q.tags || []).join(" ")) });
        });
      });
    });
  }

  // ---------- Routing ----------
  function route() {
    var h = (location.hash || "#/").replace(/^#\/?/, "").split("/");
    if (!h[0]) return { view: "home" };
    if (h[0] === "quick") return { view: "quick" };
    if (h[0] === "quiz") return { view: "quiz", sec: secById(h[1]) };
    if (h[0] === "search") return { view: "search", q: decodeURIComponent(h.slice(1).join("/")) };
    if (h[0] === "s" && secById(h[1])) return { view: "section", sec: secById(h[1]) };
    if (h[0] === "t") { var sec = secById(h[1]), t = topicById(sec, h[2]); if (t) return { view: "topic", sec: sec, t: t }; }
    if (h[0] === "o") { var g = groupById(h[1]); if (g) return { view: "group", sec: g.sec, g: g.g, gi: g.i }; }
    return { view: "home" };
  }

  // ---------- Sidebar ----------
  function sidebar(r) {
    var s = '<a class="brand" href="#/"><div class="brand-mark st-brand">SG</div><div><b>' + U("title") + "</b><span>" + U("sub") + "</span></div></a>";
    s += '<div class="lang-switch" role="group" aria-label="Language">' + ["ar", "en", "both"].map(function (l) {
      return '<button data-lang="' + l + '" aria-pressed="' + (lang === l) + '">' + (l === "ar" ? "عربي" : l === "en" ? "English" : "Both") + "</button>";
    }).join("") + "</div>";
    s += '<form class="st-search" data-search><input type="search" name="q" placeholder="' + U("search") + '" value="' + (r.view === "search" ? esc(r.q) : "") + '" aria-label="' + U("search") + '"></form>';
    s += '<nav class="nav">' +
      navItem("#/", "⌂", "#2b2b28", U("home"), r.view === "home") +
      navItem("#/quick", "⏱", "#b45309", U("quick"), r.view === "quick") +
      navItem("#/quiz", "?", "#7c3aed", U("quiz"), r.view === "quiz") +
      '<a href="../project-guides/index.html" class="st-switch"><div class="logo-tile mono" style="--tile:#1f6f5c">⇆</div><b>' + U("projects") + "</b></a></nav>";
    s += '<div class="nav-label">' + U("sections") + '</div><nav class="nav st-sections">' + S.sections.map(function (sec) {
      var active = r.sec && r.sec.id === sec.id;
      if (!ready(sec)) {
        return '<a class="todo" href="#/s/' + sec.id + '">' + tile(sec) + "<div><b>" + T(sec.name) + '</b><span class="meta">' + U("soon") + "</span></div></a>";
      }
      var item = '<a href="#/s/' + sec.id + '" class="' + (active && r.view === "section" ? "active" : "") + '">' + tile(sec) +
        "<div><b>" + T(sec.name) + '</b><span class="meta">' + count(sec) + "</span></div></a>";
      if (active) {
        var subs = sec.groups ? sec.groups.map(function (g) {
          return '<a class="sub' + (r.g && r.g.id === g.id ? " active" : "") + '" href="#/o/' + g.id + '">' + T(g.title) + "</a>";
        }) : (sec.topics || []).map(function (t) {
          return '<a class="sub' + (r.t && r.t.id === t.id ? " active" : "") + '" href="#/t/' + sec.id + "/" + t.id + '">' + T(t.title) + "</a>";
        });
        item += '<div class="st-subs">' + subs.join("") + "</div>";
      }
      return item;
    }).join("") + "</nav>";
    var readyN = S.sections.filter(ready).length;
    s += '<div class="sidebar-foot">' + readyN + " " + U("ready") + " · " + (S.sections.length - readyN) + " " + U("planned") + "</div>";
    return s;
  }
  function navItem(href, icon, color, label, active) {
    return '<a href="' + href + '" class="' + (active ? "active" : "") + '"><div class="logo-tile mono" style="--tile:' + color + '">' + icon + "</div><b>" + label + "</b></a>";
  }

  // ---------- Blocks ----------
  function block(b) {
    switch (b.type) {
      case "text": return '<div class="card st-text">' + (b.title ? "<h3>" + T(b.title) + "</h3>" : "") + T(b.body) + "</div>";
      case "code": return '<div class="card">' + (b.title ? "<h3>" + T(b.title) + "</h3>" : "") + code(b.code) + (b.note ? '<div class="st-note">' + T(b.note) + "</div>" : "") + "</div>";
      case "list": return '<div class="card">' + (b.title ? "<h3>" + T(b.title) + "</h3>" : "") + LIST(b.items) + "</div>";
      case "compare":
        return '<div class="card st-compare">' + (b.title ? "<h3>" + T(b.title) + "</h3>" : "") + '<div class="st-table-wrap"><table><thead><tr>' +
          b.cols.map(function (c) { return "<th>" + T(c) + "</th>"; }).join("") + "</tr></thead><tbody>" +
          b.rows.map(function (row) { return "<tr>" + row.map(function (c, i) { return (i === 0 ? "<th>" : "<td>") + T(c) + (i === 0 ? "</th>" : "</td>"); }).join("") + "</tr>"; }).join("") +
          "</tbody></table></div></div>";
      case "when":
        return '<div class="st-when">' + (b.title ? '<h3 class="st-when-title">' + T(b.title) + "</h3>" : "") +
          '<div class="card st-use"><div class="lbl">' + U("use") + "</div>" + LIST(b.use) + "</div>" +
          '<div class="card st-avoid"><div class="lbl">' + U("avoid") + "</div>" + LIST(b.avoid) + "</div></div>";
      case "pitfalls": return '<div class="card st-pitfalls"><h3>' + (b.title ? T(b.title) : U("pitfalls")) + "</h3>" + LIST(b.items) + "</div>";
      case "projects":
        return '<div class="card st-projects"><h3>' + U("inProjects") + "</h3><ul>" + b.items.map(function (i) {
          return "<li>" + T(i.text) + (i.p ? ' <a href="../project-guides/index.html#/' + i.p + "/" + (i.tab || "decisions") + '">' + (i.label || i.p) + " " + arrow() + "</a>" : "") + "</li>";
        }).join("") + "</ul></div>";
      default: return "";
    }
  }

  function qaList(items) {
    return items.map(function (q) {
      return '<details class="qa"><summary>' + q.q + "</summary><div>" + T(q.a) +
        (q.follow && q.follow.length ? '<div class="st-follow"><div class="lbl">' + U("follow") + "</div>" + q.follow.map(function (f) {
          return '<details class="qa sub"><summary>' + f.q + "</summary><div>" + T(f.a) + "</div></details>";
        }).join("") + "</div>" : "") + "</div></details>";
    }).join("");
  }
  function quizList(items) {
    return items.map(function (q) {
      return '<details class="qa st-quiz"><summary>' + T(q.q) + '</summary><div><span class="lbl">' + U("answer") + "</span>" + T(q.a) + "</div></details>";
    }).join("");
  }
  function outputCard(q, n) {
    return '<div class="card st-out"><div class="st-out-head"><span class="st-n">' + n + "</span>" +
      (q.level ? '<span class="st-level l' + q.level + '">' + U("level")[q.level] + "</span>" : "") +
      (q.tags || []).map(function (t) { return '<span class="chip">' + t + "</span>"; }).join("") + "</div>" + code(q.code) +
      '<details class="st-reveal"><summary>' + U("think") + '</summary><div class="st-answer"><div class="lbl">' + U("output") + '</div><pre class="st-console">' + esc(q.answer) +
      '</pre><div class="lbl">' + U("why") + "</div><div>" + T(q.why) + "</div></div></details></div>";
  }

  // ---------- Views ----------
  function home() {
    var s = '<div class="hero-home"><h1>' + U("title") + "</h1><p>" + U("homeIntro") + "</p></div>";
    s += '<h2 class="section-title">' + U("howto") + '</h2><div class="card howto"><ol>' + U("howtoSteps").map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ol></div>";
    s += '<h2 class="section-title">' + U("sections") + '</h2><div class="p-cards">' + S.sections.map(function (sec, i) {
      var r = ready(sec);
      return '<a class="p-card' + (r ? "" : " st-planned") + '" href="#/s/' + sec.id + '" style="--tile:' + sec.color + '"><div class="row">' + tile(sec) +
        "<div><h3>" + (i + 1) + ". " + T(sec.name) + '</h3><div class="meta">' + (r ? count(sec) : U("soon")) + "</div></div></div>" +
        (r && sec.intro ? '<div class="line">' + T(sec.intro) + "</div>" : "") + "</a>";
    }).join("") + "</div>";
    return s;
  }

  function sectionView(sec) {
    var s = '<div class="p-head">' + tile(sec, true) + "<div><h1>" + T(sec.name) + '</h1><div class="tagline">' + (sec.intro ? T(sec.intro) : U("comingText")) + "</div></div></div>";
    if (!ready(sec)) return s;
    if (sec.groups) {
      s += '<p class="muted">' + U("outputIntro") + "</p>";
      s += '<div class="p-cards">' + sec.groups.map(function (g, i) {
        return '<a class="p-card" href="#/o/' + g.id + '" style="--tile:' + sec.color + '"><h3>' + (i + 1) + ". " + T(g.title) + '</h3><div class="line">' + T(g.intro) + '</div><div class="big">' + g.questions.length + " " + U("questions") + "</div></a>";
      }).join("") + "</div>";
      return s;
    }
    s += '<div class="p-cards">' + sec.topics.map(function (t, i) {
      return '<a class="p-card" href="#/t/' + sec.id + "/" + t.id + '" style="--tile:' + sec.color + '"><h3>' + (i + 1) + ". " + T(t.title) + '</h3><div class="line">' + T(t.tldr) + "</div></a>";
    }).join("") + "</div>";
    s += '<p style="margin-top:18px"><a href="#/quiz/' + sec.id + '" class="st-btn">' + U("quiz") + ": " + T(sec.name) + " " + arrow() + "</a></p>";
    return s;
  }

  function topicView(sec, t) {
    var i = sec.topics.indexOf(t), prev = sec.topics[i - 1], next = sec.topics[i + 1];
    var s = '<div class="st-crumb"><a href="#/s/' + sec.id + '">' + T(sec.name) + "</a> · " + (i + 1) + "/" + sec.topics.length + "</div>";
    s += '<h1 class="st-h1">' + T(t.title) + "</h1>";
    s += '<div class="card pitch st-tldr"><div class="lbl">' + U("tldr") + "</div>" + T(t.tldr) + "</div>";
    s += (t.blocks || []).map(block).join("");
    if (t.say) s += '<div class="card st-say"><div class="lbl">' + U("say") + "</div><q>" + t.say + "</q></div>";
    if (t.interview && t.interview.length) s += '<h2 class="section-title">' + U("interview") + "</h2>" + qaList(t.interview);
    if (t.quiz && t.quiz.length) s += '<h2 class="section-title">' + U("selfTest") + ' <small>' + U("think") + "</small></h2>" + quizList(t.quiz);
    s += '<div class="st-pager">' + (prev ? '<a href="#/t/' + sec.id + "/" + prev.id + '">' + (lang === "ar" ? "→ " : "← ") + T(prev.title) + "</a>" : "<span></span>") +
      (next ? '<a href="#/t/' + sec.id + "/" + next.id + '">' + T(next.title) + " " + arrow() + "</a>" : "") + "</div>";
    return s;
  }

  function groupView(sec, g, gi) {
    var next = sec.groups[gi + 1], prev = sec.groups[gi - 1];
    var s = '<div class="st-crumb"><a href="#/s/' + sec.id + '">' + T(sec.name) + "</a> · " + U("group") + " " + (gi + 1) + "/" + sec.groups.length + "</div>";
    s += '<h1 class="st-h1">' + T(g.title) + "</h1>";
    if (g.intro) s += '<div class="card pitch st-tldr">' + T(g.intro) + "</div>";
    if (g.rules && g.rules.length) s += '<div class="card st-rules"><h3>' + (lang === "ar" ? "القواعد اللي هتحتاجها" : "Rules you need") + "</h3>" + LIST(g.rules) + "</div>";
    s += g.questions.map(function (q, i) { return outputCard(q, i + 1); }).join("");
    s += '<div class="st-pager">' + (prev ? '<a href="#/o/' + prev.id + '">' + (lang === "ar" ? "→ " : "← ") + T(prev.title) + "</a>" : "<span></span>") +
      (next ? '<a href="#/o/' + next.id + '">' + T(next.title) + " " + arrow() + "</a>" : "") + "</div>";
    return s;
  }

  function quickView() {
    var s = '<div class="hero-home"><h1>' + U("quick") + "</h1><p>" + U("quickIntro") + "</p></div>";
    S.sections.filter(function (sec) { return sec.topics && sec.topics.length; }).forEach(function (sec) {
      s += '<h2 class="section-title">' + tile(sec) + T(sec.name) + "</h2>";
      s += sec.topics.map(function (t) {
        return '<div class="card st-quick"><h3><a href="#/t/' + sec.id + "/" + t.id + '">' + T(t.title) + "</a></h3>" +
          (t.quick && t.quick.length ? LIST(t.quick) : "<p>" + T(t.tldr) + "</p>") + (t.say ? '<q class="st-q">' + t.say + "</q>" : "") + "</div>";
      }).join("");
    });
    S.sections.filter(function (sec) { return sec.groups && sec.groups.length; }).forEach(function (sec) {
      s += '<h2 class="section-title">' + tile(sec) + T(sec.name) + '</h2><div class="card">' + sec.groups.map(function (g) {
        return '<h3><a href="#/o/' + g.id + '">' + T(g.title) + "</a></h3>" + LIST(g.rules || []);
      }).join("") + "</div>";
    });
    return s;
  }

  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function quizView(sec) {
    var pool = [];
    (sec ? [sec] : S.sections).forEach(function (s2) {
      (s2.topics || []).forEach(function (t) {
        (t.quiz || []).forEach(function (q) { pool.push({ kind: "q", q: q, sec: s2, t: t }); });
        (t.interview || []).forEach(function (q) { pool.push({ kind: "i", q: q, sec: s2, t: t }); });
      });
      (s2.groups || []).forEach(function (g) { g.questions.forEach(function (q) { pool.push({ kind: "o", q: q, sec: s2, g: g }); }); });
    });
    var pick = shuffle(pool).slice(0, 12);
    var s = '<div class="hero-home"><h1>' + U("quiz") + (sec ? ": " + T(sec.name) : "") + "</h1><p>" + U("quizIntro") + "</p></div>";
    s += '<div class="chips st-filter"><a class="chip' + (sec ? "" : " on") + '" href="#/quiz">' + U("all") + "</a>" + S.sections.filter(ready).map(function (x) {
      return '<a class="chip' + (sec && sec.id === x.id ? " on" : "") + '" href="#/quiz/' + x.id + '">' + T(x.name) + "</a>";
    }).join("") + "</div>";
    s += pick.map(function (p, i) {
      var src = p.t ? '<a class="st-src" href="#/t/' + p.sec.id + "/" + p.t.id + '">' + T(p.t.title) + "</a>" : '<a class="st-src" href="#/o/' + p.g.id + '">' + T(p.g.title) + "</a>";
      if (p.kind === "o") return outputCard(p.q, i + 1).replace('<div class="st-out-head">', '<div class="st-out-head">' + src);
      var q = p.kind === "q" ? T(p.q.q) : p.q.q;
      return '<details class="qa st-quiz"><summary><span class="st-n">' + (i + 1) + "</span> " + q + "</summary><div>" + src + '<span class="lbl">' + U("answer") + "</span>" + T(p.q.a) + "</div></details>";
    }).join("");
    s += '<p style="margin-top:16px"><button type="button" class="st-btn" data-reshuffle>' + U("shuffle") + "</button></p>";
    return s;
  }

  function searchView(q) {
    var words = q.toLowerCase().split(/\s+/).filter(Boolean);
    var hits = words.length ? INDEX.filter(function (e) { return words.every(function (w) { return e.text.indexOf(w) >= 0; }); }) : [];
    var s = '<div class="hero-home"><h1>' + U("results") + ": <span class=\"ltr\">" + esc(q) + "</span></h1></div>";
    if (!hits.length) return s + '<p class="muted">' + U("noResults") + "</p>";
    return s + hits.slice(0, 60).map(function (e) {
      if (e.kind === "topic") return '<a class="card st-hit" href="#/t/' + e.sec.id + "/" + e.t.id + '"><span class="meta">' + T(e.sec.name) + "</span><b>" + T(e.t.title) + "</b><span>" + T(e.t.tldr) + "</span></a>";
      return '<a class="card st-hit" href="#/o/' + e.g.id + '"><span class="meta">' + T(e.sec.name) + " · " + T(e.g.title) + "</span><b>#" + e.n + "</b>" + code(e.q.code.split("\n").slice(0, 4).join("\n")) + "</a>";
    }).join("");
  }

  // ---------- Render ----------
  function render() {
    var r = route();
    var root = document.documentElement;
    root.lang = lang === "ar" ? "ar" : "en";
    root.dir = lang === "ar" ? "rtl" : "ltr";
    var main, title;
    switch (r.view) {
      case "section": main = sectionView(r.sec); title = T(r.sec.name); break;
      case "topic": main = topicView(r.sec, r.t); title = T(r.t.title); break;
      case "group": main = groupView(r.sec, r.g, r.gi); title = T(r.g.title); break;
      case "quick": main = quickView(); title = U("quick"); break;
      case "quiz": main = quizView(r.sec); title = U("quiz"); break;
      case "search": main = searchView(r.q); title = U("results"); break;
      default: main = home(); title = U("title");
    }
    var tmp = document.createElement("div"); tmp.innerHTML = title;
    document.title = (tmp.textContent || "") + (r.view === "home" ? "" : " — " + U("title"));
    document.getElementById("app").innerHTML =
      '<div class="topbar"><button type="button" data-menu>☰ ' + U("menu") + '</button><span class="title">' + title + "</span></div>" +
      '<div class="scrim" data-menu></div><div class="shell"><aside class="sidebar st-sidebar">' + sidebar(r) + '</aside><main><div class="wrap st-wrap"' +
      (r.sec ? ' style="--brand:' + r.sec.color + '"' : "") + ">" + main + "</div></main></div>";
    document.body.classList.remove("menu-open");
    window.scrollTo(0, 0);
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".lang-switch button");
    if (b) { lang = b.getAttribute("data-lang"); saveLang(lang); render(); return; }
    if (e.target.closest && e.target.closest("[data-reshuffle]")) { render(); return; }
    if (e.target.closest && e.target.closest("[data-menu]")) { document.body.classList.toggle("menu-open"); }
  });
  document.addEventListener("submit", function (e) {
    if (!e.target.matches("[data-search]")) return;
    e.preventDefault();
    var q = e.target.q.value.trim();
    if (q) location.hash = "#/search/" + encodeURIComponent(q);
  });
  window.addEventListener("hashchange", render);
  buildIndex();
  render();
})();
