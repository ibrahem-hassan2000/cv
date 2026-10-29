import { useEffect, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { T, useLang, type Lang } from "./i18n";
import type { Bi } from "./data";

import "../../project-guides/assets/highlight.js";   // defines window.highlightCode (shared with the static guides)

declare global { interface Window { highlightCode: (code: string) => string } }

/** Code sample with syntax colours; the input is escaped by highlightCode before it becomes HTML. */
export function Code({ code }: { code: string }) {
  return <pre className="code" dangerouslySetInnerHTML={{ __html: window.highlightCode(code) }} />;
}

export function List({ items }: { items?: Bi[] }) {
  return <ul>{(items ?? []).map((x, i) => <li key={i}><T x={x} /></li>)}</ul>;
}

/** Inline HTML from our own data (e.g. a question that contains <code>). */
export function Html({ html, as: Tag = "span", className }: { html: string; as?: "span" | "div" | "q" | "b" | "h3"; className?: string }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function Chips({ items }: { items: ReactNode[] }) {
  return <div className="chips">{items.map((x, i) => <span key={i} className="chip">{x}</span>)}</div>;
}

export const arrow = (lang: Lang) => (lang === "ar" ? "←" : "→");
export const back = (lang: Lang) => (lang === "ar" ? "→" : "←");

export function LangSwitch() {
  const { lang, setLang } = useLang();
  const labels: Record<Lang, string> = { ar: "عربي", en: "English", both: "Both" };
  return (
    <div className="lang-switch" role="group" aria-label="Language">
      {(["ar", "en", "both"] as Lang[]).map((l) => (
        <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>{labels[l]}</button>
      ))}
    </div>
  );
}

export function Tile({ color, children, big, className = "" }: { color: string; children: ReactNode; big?: boolean; className?: string }) {
  return <div className={`logo-tile mono ${className}${big ? " lg" : ""}`} style={{ ["--tile" as string]: color }}>{children}</div>;
}

/** Sidebar link whose "active" state is decided by the caller (routes share prefixes). */
export function NavItem({ to, tile, label, meta, active, className = "" }: { to: string; tile: ReactNode; label: ReactNode; meta?: ReactNode; active?: boolean; className?: string }) {
  return (
    <Link to={to} className={(active ? "active " : "") + className} aria-current={active ? "page" : undefined}>
      {tile}
      {meta != null ? <div><b>{label}</b><span className="meta">{meta}</span></div> : <b>{label}</b>}
    </Link>
  );
}

/** Sidebar + main layout shared by both guides, with the mobile menu drawer. */
export function Shell({ sidebar, title, sidebarClass = "", children }: { sidebar: ReactNode; title: string; sidebarClass?: string; children: ReactNode }) {
  const { pathname, search } = useLocation();
  const { lang } = useLang();
  useEffect(() => {
    document.body.classList.remove("menu-open");
    window.scrollTo(0, 0);
  }, [pathname, search]);
  useEffect(() => { document.title = title; }, [title]);
  const toggle = () => document.body.classList.toggle("menu-open");
  return (
    <>
      <div className="topbar">
        <button type="button" onClick={toggle}>☰ {lang === "ar" ? "القايمة" : "Menu"}</button>
        <span className="title">{title}</span>
      </div>
      <div className="scrim" onClick={toggle} />
      <div className="shell">
        <aside className={"sidebar " + sidebarClass}>{sidebar}</aside>
        <main>{children}</main>
      </div>
    </>
  );
}

export function Brand({ mark, markClass = "", title, sub }: { mark: string; markClass?: string; title: string; sub: string }) {
  return (
    <Link className="brand" to="/">
      <div className={"brand-mark " + markClass}>{mark}</div>
      <div><b>{title}</b><span>{sub}</span></div>
    </Link>
  );
}
