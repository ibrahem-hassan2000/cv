// Landing page: three doors, the Study Guide, the Project Guides and Companies.
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { isReady, market, projects, sections } from "./data";
import { useLang, useUI } from "./i18n";
import { arrow, LangSwitch } from "./ui";

const UI = {
  en: {
    title: "Interview Kit — Ibrahem Hassan", sub: "Frontend · React · Next.js · React Native",
    study: "Study Guide", studyText: "Everything a frontend interview can ask, from HTML to system design, with “what does this print?” questions, live coding, working with AI, and behavioral answers.",
    projects: "Project Guides", projectsText: "Every project I worked on: what I built, why I chose each tool, how it works, the problems I solved, and how I answer questions about it.",
    companies: "Companies", companiesText: "Companies in Cairo and Alexandria that hire React / Next.js / React Native developers: where to search, how fresh the last posting is, and what to study for each one.", companiesN: "companies",
    open: "Open", sections: "sections", topics: "topics", questions: "questions", projectsN: "projects",
    foot: "Switch the language (عربي / English / Both) here or inside each guide.",
  },
  ar: {
    title: "عُدّة الإنترفيو — إبراهيم حسن", sub: "Frontend · React · Next.js · React Native",
    study: "دليل المذاكرة", studyText: "كل اللي ممكن يتسأل في إنترفيو Frontend، من HTML لحد الـ system design، ومعاه أسئلة «هيطبع إيه؟»، و live coding، والشغل مع الـ AI، والـ behavioral.",
    projects: "شرح المشاريع", projectsText: "كل مشروع اشتغلت عليه: عملت فيه إيه، وليه اخترت كل أداة، وشغال إزاي، والمشاكل اللي حليتها، وتجاوب إزاي في الإنترفيو.",
    companies: "الشركات", companiesText: "شركات في القاهرة واسكندرية بتوظّف React و Next.js و React Native. تدوّر فين، وآخر وظيفة كانت إمتى، وتذاكر إيه علشان كل شركة.", companiesN: "companies",
    open: "افتح", sections: "sections", topics: "topics", questions: "questions", projectsN: "projects",
    foot: "اللغة (عربي / English / Both) بتتغير من هنا أو من جوه كل دليل.",
  },
};

const topicN = sections.reduce((n, s) => n + (s.topics?.length ?? 0), 0);
const questionN = sections.reduce((n, s) =>
  n + (s.topics ?? []).reduce((m, t) => m + (t.interview?.length ?? 0) + (t.quiz?.length ?? 0), 0)
    + (s.groups ?? []).reduce((m, g) => m + g.questions.length, 0), 0);

export function Hub() {
  const U = useUI(UI);
  const { lang } = useLang();
  useEffect(() => { document.title = U.title; window.scrollTo(0, 0); }, [U.title]);
  return (
    <div className="hub">
      <div className="hub-wrap">
        <header>
          <div className="mark">IH</div>
          <div><h1>{U.title}</h1><p>{U.sub}</p></div>
          <LangSwitch />
        </header>
        <div className="doors">
          <Link className="door study" to="/study">
            <div className="icon">SG</div>
            <h2>{U.study}</h2>
            <p>{U.studyText}</p>
            <div className="facts"><span>{sections.filter(isReady).length} {U.sections}</span><span>{topicN} {U.topics}</span><span>{questionN} {U.questions}</span></div>
            <span className="go">{U.open} {arrow(lang)}</span>
          </Link>
          <Link className="door projects" to="/projects">
            <div className="icon">PG</div>
            <h2>{U.projects}</h2>
            <p>{U.projectsText}</p>
            <div className="facts"><span>{projects.length} {U.projectsN}</span><span>Decisions</span><span>STAR</span></div>
            <span className="go">{U.open} {arrow(lang)}</span>
          </Link>
          <Link className="door companies" to="/companies">
            <div className="icon">CO</div>
            <h2>{U.companies}</h2>
            <p>{U.companiesText}</p>
            <div className="facts"><span>{market.companies.length} {U.companiesN}</span><span>Cairo · Alexandria</span></div>
            <span className="go">{U.open} {arrow(lang)}</span>
          </Link>
        </div>
        <footer>{U.foot}</footer>
      </div>
    </div>
  );
}
