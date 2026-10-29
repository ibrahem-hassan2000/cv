// The content lives in ../study-guide/data and ../project-guides/data (one source of truth for both the
// old static dashboards and this app). Those files fill window.STUDY / window.HANDBOOK, so they are
// imported for their side effects, in order: registry first, sections after; handbook first, concepts last.
import "../../study-guide/data/registry.js";
import "../../study-guide/data/html.js";
import "../../study-guide/data/css.js";
import "../../study-guide/data/javascript.js";
import "../../study-guide/data/js-output.js";
import "../../study-guide/data/typescript.js";
import "../../study-guide/data/browser.js";
import "../../study-guide/data/network.js";
import "../../study-guide/data/security.js";
import "../../study-guide/data/react.js";
import "../../study-guide/data/hooks.js";
import "../../study-guide/data/react-patterns.js";
import "../../study-guide/data/state.js";
import "../../study-guide/data/forms.js";
import "../../study-guide/data/routing.js";
import "../../study-guide/data/nextjs.js";
import "../../study-guide/data/styling.js";
import "../../study-guide/data/a11y.js";
import "../../study-guide/data/performance.js";
import "../../study-guide/data/testing.js";
import "../../study-guide/data/react-native.js";
import "../../study-guide/data/tooling.js";
import "../../study-guide/data/i18n.js";
import "../../study-guide/data/motion.js";
import "../../study-guide/data/live-coding.js";
import "../../study-guide/data/system-design.js";
import "../../study-guide/data/ai.js";
import "../../study-guide/data/behavioral.js";
import "../../study-guide/data/deep-javascript.js";

import "../../project-guides/data/handbook.js";
import "../../project-guides/data/smartfaq.js";
import "../../project-guides/data/ahs.js";
import "../../project-guides/data/one14.js";
import "../../project-guides/data/okorent.js";
import "../../project-guides/data/bites.js";
import "../../project-guides/data/spectra.js";
import "../../project-guides/data/kalima.js";
import "../../project-guides/data/aquadic.js";
import "../../project-guides/data/freelance.js";
import "../../project-guides/data/concepts.js";

import ahsLogo from "../../project-guides/assets/img/ahs-logo.svg";
import bitesLogo from "../../project-guides/assets/img/bites-logo.png";
import kalimaLogo from "../../project-guides/assets/img/kalima-logo.png";
import okorentLogo from "../../project-guides/assets/img/okorent-logo.png";
import one14Logo from "../../project-guides/assets/img/one14-logo.png";
import smartfaqLogo from "../../project-guides/assets/img/smartfaq-logo.webp";
import spectraLogo from "../../project-guides/assets/img/spectra-logo.png";

/** Text in both languages, or a plain string (code names, English-only lines). May contain inline HTML. */
export type Bi = string | { en?: string; ar?: string };

export interface Block {
  type: "text" | "code" | "list" | "compare" | "when" | "pitfalls" | "projects";
  title?: Bi; body?: Bi; code?: string; note?: Bi; items?: any[]; cols?: Bi[]; rows?: Bi[][]; use?: Bi[]; avoid?: Bi[];
}
export interface QA { q: Bi; a: Bi; follow?: QA[] }
export interface Example { title: Bi; body: Bi; code?: string; out?: string; run?: "node" | "browser"; fix?: Bi }
/** Deep-dive layer (study-guide/data/deep-<section>.js). */
export interface Deep {
  why: Bi; how?: Example[]; breaks?: Example[]; levels?: { q: string; mid: Bi; senior: Bi }[]; drill?: QA[];
  story?: { text: Bi; p?: string; tab?: string; label?: string }; sources?: { label: string; url: string }[];
}
export interface Topic { id: string; title: Bi; tldr: Bi; blocks?: Block[]; say?: string; interview?: QA[]; quiz?: QA[]; quick?: Bi[]; deep?: Deep }
export interface OutputQuestion { level?: 1 | 2 | 3; tags?: string[]; code: string; answer: string; why: Bi }
export interface Group { id: string; title: Bi; intro?: Bi; rules?: Bi[]; questions: OutputQuestion[] }
export interface Section { id: string; icon: string; color: string; name: Bi; intro?: Bi; topics?: Topic[]; groups?: Group[] }
export interface Project { id: string; name: string; logo?: string; monogram?: string; color: string; company: string; years: string; period: string; [k: string]: any }
export interface Concept { id: string; name: string; tagline: Bi; what: Bi; when: Bi; pitfall?: Bi; q?: string; a?: Bi }

declare global {
  interface Window {
    STUDY: { sections: Section[] };
    HANDBOOK: { projects: Project[]; concepts: Concept[]; todo: { name: string; where: string }[] };
  }
}

// Logos referenced as "assets/img/x" in the data are mapped to bundled URLs.
const LOGOS: Record<string, string> = {
  "assets/img/ahs-logo.svg": ahsLogo, "assets/img/bites-logo.png": bitesLogo, "assets/img/kalima-logo.png": kalimaLogo,
  "assets/img/okorent-logo.png": okorentLogo, "assets/img/one14-logo.png": one14Logo,
  "assets/img/smartfaq-logo.webp": smartfaqLogo, "assets/img/spectra-logo.png": spectraLogo,
};

export const sections: Section[] = window.STUDY.sections;
export const projects: Project[] = window.HANDBOOK.projects.map((p) => ({ ...p, logo: p.logo ? LOGOS[p.logo] ?? p.logo : undefined }));
export const concepts: Concept[] = window.HANDBOOK.concepts;

export const isReady = (s: Section) => !!(s.topics?.length || s.groups?.length);
export const sectionById = (id?: string) => sections.find((s) => s.id === id);
export const projectById = (id?: string) => projects.find((p) => p.id === id);
export function groupById(id?: string) {
  for (const sec of sections) {
    const i = (sec.groups ?? []).findIndex((g) => g.id === id);
    if (i >= 0) return { sec, group: sec.groups![i], index: i };
  }
  return undefined;
}
