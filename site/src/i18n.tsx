import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Bi } from "./data";

export type Lang = "ar" | "en" | "both";
const KEY = "handbook-lang"; // shared with the static dashboards

function readLang(): Lang {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "ar" || v === "en" || v === "both") return v;
  } catch { /* storage blocked */ }
  return "ar";
}

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "ar", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readLang);
  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "ar";   // "both" is laid out RTL, Arabic first
    document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(KEY, l); } catch { /* storage blocked */ }
  };
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

/** Resolve bilingual content to an HTML string for the current language. */
export function tr(x: Bi | undefined, lang: Lang): string {
  if (x == null) return "";
  if (typeof x === "string") return x;
  if (lang === "both") return `<span class="bi-ar" lang="ar">${x.ar ?? ""}</span><span class="bi-en" lang="en">${x.en ?? ""}</span>`;
  return (lang === "ar" ? x.ar : x.en) ?? x.en ?? "";
}

/** Plain text of bilingual content (for titles, search, aria). */
export function plain(x: Bi | undefined, lang: Lang = "en"): string {
  const html = typeof x === "string" ? x : x ? (lang === "ar" ? x.ar : x.en) ?? x.en ?? "" : "";
  return html.replace(/<[^>]+>/g, "");
}

/** Renders our own trusted content, which may contain inline markup like <b> and <code>. */
export function T({ x, as: Tag = "span", className }: { x: Bi | undefined; as?: "span" | "div" | "p" | "h1" | "h2" | "h3" | "b" | "q"; className?: string }) {
  const { lang } = useLang();
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: tr(x, lang) }} />;
}

/** Pick a UI string by language. */
export function useUI<T extends Record<string, unknown>>(dict: { en: T; ar: T }) {
  const { lang } = useLang();
  return lang === "ar" ? dict.ar : dict.en;
}
