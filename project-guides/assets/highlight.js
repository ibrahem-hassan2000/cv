// Small syntax highlighter shared by the Interview Handbook, the Study Guide and the React site (one copy only).
// highlightCode(text) returns escaped HTML with <span class="k|f|s|n|c"> around keywords, hooks/functions,
// strings, numbers/literals and comments. It works line by line: strings and // comments are found in one
// left-to-right pass, so "https://…" inside a string is not taken for a comment.
(function () {
  "use strict";
  var KEYWORDS = "const|let|var|function|return|import|export|from|default|if|else|for|while|do|of|in|switch|case|break|continue|" +
    "class|extends|super|this|new|delete|typeof|instanceof|void|throw|try|catch|finally|async|await|yield|static|" +
    "interface|type|enum|implements|readonly|as|satisfies";
  // A keyword after a dot (Array.from) or before a colon (type: "add") is a property name, not a keyword.
  var KEYWORD_RE = new RegExp("(?<![.\\w$])\\b(" + KEYWORDS + ")\\b(?!\\s*:(?!:))", "g");
  var HOOK_RE = /\b(use[A-Z]\w*|Promise|fetch|setTimeout|setInterval|queueMicrotask|requestAnimationFrame|structuredClone)\b/g;
  var LITERAL_RE = /\b(true|false|null|undefined|NaN|Infinity|\d[\d_]*(?:\.\d+)?n?)\b/g;
  var TOKEN_RE = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\/\/.*$)/g;

  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  // Plain code (no strings or comments): wrap words. Each pass only adds <span> tags whose text can't match the next pass.
  function words(s) {
    return esc(s)
      .replace(KEYWORD_RE, '<span class="k">$1</span>')
      .replace(HOOK_RE, '<span class="f">$1</span>')
      .replace(LITERAL_RE, '<span class="n">$1</span>');
  }

  function line(text) {
    var out = "", last = 0, m;
    TOKEN_RE.lastIndex = 0;
    while ((m = TOKEN_RE.exec(text)) !== null) {
      out += words(text.slice(last, m.index));
      out += m[1] ? '<span class="s">' + esc(m[1]) + "</span>" : '<span class="c">' + esc(m[2]) + "</span>";
      last = TOKEN_RE.lastIndex;
      if (m[2]) break; // a comment runs to the end of the line
    }
    return out + words(text.slice(last));
  }

  window.highlightCode = function (raw) { return String(raw).split("\n").map(line).join("\n"); };
})();
