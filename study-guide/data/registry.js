// Study Guide registry. Every section is listed here in study order (planned ones too, so the map is visible).
// A section's data file fills it with STUDY.fill("<id>", { intro, topics }) — or, for the output section, { groups }.
// Topic shape: see README.md. Text is { en, ar } (simple Egyptian Arabic, technical terms in English).
window.STUDY = {
  sections: [
    { id: "html", icon: "</>", color: "#c2410c", name: { en: "HTML", ar: "HTML" } },
    { id: "css", icon: "#", color: "#1d4ed8", name: { en: "CSS", ar: "CSS" } },
    { id: "javascript", icon: "JS", color: "#a16207", name: { en: "JavaScript", ar: "JavaScript" } },
    { id: "js-output", icon: "?", color: "#7c2d12", name: { en: "JS output questions", ar: "أسئلة «هيطبع إيه؟»" } },
    { id: "typescript", icon: "TS", color: "#2563eb", name: { en: "TypeScript", ar: "TypeScript" } },
    { id: "browser", icon: "▣", color: "#0f766e", name: { en: "Browser & Web APIs", ar: "المتصفح و Web APIs" } },
    { id: "network", icon: "⇄", color: "#0369a1", name: { en: "Networking & HTTP", ar: "الشبكة و HTTP" } },
    { id: "security", icon: "⛨", color: "#b91c1c", name: { en: "Web security", ar: "الأمان" } },
    { id: "react", icon: "⚛", color: "#0891b2", name: { en: "React fundamentals", ar: "أساسيات React" } },
    { id: "hooks", icon: "ƒ", color: "#0e7490", name: { en: "Hooks (all of them)", ar: "الـ Hooks (كلها)" } },
    { id: "react-patterns", icon: "◇", color: "#155e75", name: { en: "React patterns", ar: "React patterns" } },
    { id: "state", icon: "◎", color: "#6d28d9", name: { en: "State & data fetching", ar: "الـ State وجلب الداتا" } },
    { id: "forms", icon: "▤", color: "#7e22ce", name: { en: "Forms & validation", ar: "الفورمز والـ validation" } },
    { id: "routing", icon: "↳", color: "#9333ea", name: { en: "Routing", ar: "الـ Routing" } },
    { id: "nextjs", icon: "N", color: "#111827", name: { en: "Next.js", ar: "Next.js" } },
    { id: "styling", icon: "✦", color: "#db2777", name: { en: "Styling & design systems", ar: "الـ Styling والـ Design systems" } },
    { id: "a11y", icon: "♿", color: "#15803d", name: { en: "Accessibility", ar: "Accessibility" } },
    { id: "performance", icon: "⚡", color: "#ca8a04", name: { en: "Performance & Core Web Vitals", ar: "الأداء و Core Web Vitals" } },
    { id: "testing", icon: "✓", color: "#16a34a", name: { en: "Testing", ar: "الـ Testing" } },
    { id: "react-native", icon: "📱", color: "#0284c7", name: { en: "React Native", ar: "React Native" } },
    { id: "tooling", icon: "⚙", color: "#475569", name: { en: "Tooling, Git & CI/CD", ar: "الأدوات و Git و CI/CD" } },
    { id: "i18n", icon: "ع", color: "#0d9488", name: { en: "i18n & RTL", ar: "اللغات و RTL" } },
    { id: "motion", icon: "◐", color: "#e11d48", name: { en: "Animation & 3D", ar: "الأنيميشن و 3D" } },
    { id: "live-coding", icon: "⌨", color: "#4d7c0f", name: { en: "Live coding patterns", ar: "Live coding" } },
    { id: "system-design", icon: "⧉", color: "#334155", name: { en: "Frontend system design", ar: "Frontend system design" } },
    { id: "ai", icon: "✧", color: "#7c3aed", name: { en: "Working with AI", ar: "الشغل مع الـ AI" } },
    { id: "behavioral", icon: "☺", color: "#b45309", name: { en: "Behavioral & interview strategy", ar: "الـ Behavioral واستراتيجية الإنترفيو" } }
  ],
  fill: function (id, data) {
    for (var i = 0; i < this.sections.length; i++) {
      if (this.sections[i].id === id) { for (var k in data) this.sections[i][k] = data[k]; return; }
    }
  },
  // Deep-dive layer, kept in data/deep-<section>.js and loaded after the section: STUDY.deepen("<section>", { "<topic>": { ... } }).
  // Shape: see README.md ("Deep dive").
  deepen: function (id, byTopic) {
    for (var i = 0; i < this.sections.length; i++) {
      if (this.sections[i].id !== id) continue;
      var topics = this.sections[i].topics || [];
      for (var j = 0; j < topics.length; j++) if (byTopic[topics[j].id]) topics[j].deep = byTopic[topics[j].id];
    }
  }
};
