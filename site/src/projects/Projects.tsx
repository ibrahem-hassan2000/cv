// Interview Handbook — the React version of project-guides/assets/app.js, same markup and CSS classes.
import { useEffect, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { concepts, projectById, projects, type Project } from "../data";
import { T, useLang, useUI } from "../i18n";
import { arrow, Brand, Chips, Code, Html, LangSwitch, List, NavItem, Shell, Tile } from "../ui";

const UI = {
  en: {
    title: "Interview Handbook", sub: "Ibrahem Hassan · Frontend", home: "Home", concepts: "Concepts",
    projects: "Projects", todo: "To do on other laptops", overview: "Overview", decisions: "Decisions",
    how: "How it works", hooks: "Hooks", problems: "Problems solved", interview: "Interview",
    pitch: "The project in 30 seconds", built: "What I built", role: "My role", stack: "Tools",
    decisionsIntro: "For every big choice: what I picked, what else existed, why, whether both could live together, and what I would pick today.",
    instead: "instead of", why: "Why", both: "Both together?", better: "Better option today?", say: "Say it in the interview",
    yes: "Yes", no: "No", partly: "Possible, but…", learn: "Learn the concept →",
    flows: "Flows", patterns: "Patterns", sketch: "Simplified sketch of the pattern — not the project's code.",
    problem: "Problem", fix: "Fix", result: "Result", lesson: "Lesson", remember: "Remember:",
    star: "60-second story (STAR)", qa: "Likely questions", terms: "Words to use", dont: "Don't say", evidence: "Evidence",
    next: "Next", homeIntro: "Every project I built, explained so I can learn from it and explain it in an interview: what it is, what I built, why I chose each tool, how it works, the hooks I used, the problems I solved, and how to answer questions about it.",
    howto: "How to study before an interview",
    howtoSteps: ["Pick the 3–4 projects on the CV you are sending.", "Read “My role” and “Don't say” first.", "Go through Decisions — be ready for “why X and not Y?”.", "Say the STAR story out loud, then answer the questions without opening them."],
    conceptsIntro: "The ideas behind the decisions. Each card: what it is, when it matters, and a question you may get.",
    what: "What it is", when: "When it matters", pitfall: "Watch out", usedIn: "Used in",
    readyCount: "ready", toDo: "to do", study: "Study guide", notHere: "The code is on another laptop. Open the repo there and say “continue the project guides”.",
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
    problem: "المشكلة", fix: "الحل", result: "النتيجة", lesson: "الدرس", remember: "افتكر:",
    star: "القصة في دقيقة (STAR)", qa: "أسئلة متوقعة", terms: "كلمات تستخدمها", dont: "متقولش", evidence: "الأدلة",
    next: "اللي بعده", homeIntro: "كل مشروع اشتغلت عليه، متشرح علشان أتعلم منه وأعرف أشرحه في الإنترفيو: هو إيه، عملت فيه إيه، اخترت كل أداة ليه، شغال إزاي، الـ hooks اللي استخدمتها، المشاكل اللي حليتها، وأجاوب إزاي.",
    howto: "إزاي تذاكر قبل الإنترفيو",
    howtoSteps: ["اختار الـ 3–4 مشاريع اللي في الـ CV اللي هتبعته.", "اقرا «دوري» و«متقولش» الأول.", "عدّي على «القرارات التقنية» — استعد لسؤال «ليه X مش Y؟».", "قول قصة الـ STAR بصوت عالي، وبعدين جاوب الأسئلة من غير ما تفتحها."],
    conceptsIntro: "الأفكار اللي ورا القرارات. كل كارت: المفهوم إيه، يهم إمتى، وسؤال ممكن يتسأل.",
    what: "هو إيه", when: "يهم إمتى", pitfall: "خلي بالك", usedIn: "اتستخدم في",
    readyCount: "جاهز", toDo: "لسه", study: "دليل المذاكرة", notHere: "الكود على لاب تاني. افتح الـ repo هناك وقول «كمّل الـ project guides».",
  },
};
const useU = () => useUI(UI);
const TABS = ["overview", "decisions", "how", "hooks", "problems", "interview"] as const;
type Tab = (typeof TABS)[number];
const todo = window.HANDBOOK.todo ?? [];

function Logo({ p, big }: { p: Project; big?: boolean }) {
  if (p.logo) return <div className={"logo-tile" + (big ? " lg" : "")}><img src={p.logo} alt={`${p.name} logo`} /></div>;
  return <Tile color={p.color} big={big}>{p.monogram || p.name.charAt(0)}</Tile>;
}

// ---------- Layout ----------
function Sidebar({ view, current }: { view: string; current?: string }) {
  const U = useU();
  return (
    <>
      <Brand mark="IH" title={U.title} sub={U.sub} />
      <LangSwitch />
      <nav className="nav">
        <NavItem to="/projects" tile={<Tile color="#2b2b28">⌂</Tile>} label={U.home} active={view === "home"} />
        <NavItem to="/projects/concepts" tile={<Tile color="#5b4fd6">◆</Tile>} label={U.concepts} active={view === "concepts"} />
        <NavItem to="/study" className="st-switch" tile={<Tile color="#7c3aed">⇆</Tile>} label={U.study} />
      </nav>
      <div className="nav-label">{U.projects}</div>
      <nav className="nav">
        {projects.map((p) => (
          <NavItem key={p.id} to={`/projects/${p.id}`} tile={<Logo p={p} />} label={p.name} meta={`${p.company} · ${p.years}`} active={current === p.id} />
        ))}
      </nav>
      {todo.length > 0 && (
        <>
          <div className="nav-label">{U.todo}</div>
          <nav className="nav">
            {todo.map((t) => (
              <a key={t.name} className="todo" title={U.notHere}><Tile color="#9a978c">{t.name.charAt(0)}</Tile><div><b>{t.name}</b><span className="meta">{t.where}</span></div></a>
            ))}
          </nav>
        </>
      )}
      <div className="sidebar-foot">{projects.length} {U.readyCount} · {todo.length} {U.toDo}</div>
    </>
  );
}

function Page({ view, current, title, children }: { view: string; current?: string; title: string; children: ReactNode }) {
  const U = useU();
  return (
    <Shell sidebar={<Sidebar view={view} current={current} />} title={view === "home" ? U.title : `${title} — ${U.title}`}>
      {children}
    </Shell>
  );
}

// ---------- Views ----------
export function ProjectsHome() {
  const U = useU();
  return (
    <Page view="home" title={U.title}>
      <div className="wrap">
        <div className="hero-home"><h1>{U.title}</h1><p>{U.homeIntro}</p></div>
        <h2 className="section-title">{U.projects}</h2>
        <div className="p-cards">
          {projects.map((p) => (
            <Link key={p.id} className="p-card" to={`/projects/${p.id}`} style={{ ["--tile" as string]: p.color }}>
              <div className="row"><Logo p={p} /><div><h3>{p.name}</h3><div className="meta">{p.company} · {p.years}</div></div></div>
              <div className="line"><T x={p.tagline} /></div>
              <div className="big">
                {(p.stats ?? []).slice(0, 2).map((x: any, i: number) => <span key={i}>{i > 0 && " · "}<span><b className="ltr">{x[0]}</b> <T x={x[1]} /></span></span>)}
              </div>
            </Link>
          ))}
        </div>
        <h2 className="section-title">{U.howto}</h2>
        <div className="card howto"><ol>{U.howtoSteps.map((x) => <li key={x}>{x}</li>)}</ol></div>
        <h2 className="section-title">{U.concepts}</h2>
        <Link className="card" to="/projects/concepts" style={{ display: "block", textDecoration: "none", color: "inherit" }}>
          <p>{U.conceptsIntro}</p>
          <Chips items={concepts.map((c) => c.name)} />
        </Link>
        {todo.length > 0 && (
          <>
            <h2 className="section-title">{U.todo}</h2>
            <div className="card"><p className="muted">{U.notHere}</p><Chips items={todo.map((t) => `${t.name} · ${t.where}`)} /></div>
          </>
        )}
      </div>
    </Page>
  );
}

function Header({ p, tab }: { p: Project; tab: Tab }) {
  const U = useU();
  return (
    <>
      <div className="p-head">
        <Logo p={p} big />
        <div>
          <h1>{p.name}</h1>
          <div className="tagline"><T x={p.tagline} /></div>
          <div className="facts">
            <span className="fact role"><T x={p.role} /></span>
            <span className="fact">{p.company}</span>
            <span className="fact ltr">{p.period}</span>
            {p.team && <span className="fact"><T x={p.team} /></span>}
          </div>
        </div>
      </div>
      <div className="stats">{(p.stats ?? []).map((x: any, i: number) => <div className="stat" key={i}><Html as="b" html={String(x[0])} /><T x={x[1]} /></div>)}</div>
      <nav className="tabs">
        {TABS.map((t) => <Link key={t} to={`/projects/${p.id}/${t}`} className={t === tab ? "active" : ""} aria-current={t === tab ? "page" : undefined}>{U[t]}</Link>)}
      </nav>
    </>
  );
}

function Overview({ p }: { p: Project }) {
  const U = useU();
  return (
    <>
      <h2 className="section-title">{U.pitch}</h2><div className="card pitch"><List items={p.pitch} /></div>
      <h2 className="section-title">{U.built}</h2>
      <div className="grid-2">{(p.built ?? []).map((g: any, i: number) => <div className="card" key={i}><h3><T x={g.title} /></h3><List items={g.items} /></div>)}</div>
      <h2 className="section-title">{U.role}</h2><div className="card"><List items={p.myRole} /></div>
      <h2 className="section-title">{U.stack}</h2>
      <div className="card">
        {(p.stack ?? []).map((r: any, i: number) => (
          <div className="stack-row" key={i}><div className="k"><T x={r[0]} /></div><Chips items={r[1].map((c: string) => <Html html={c} />)} /></div>
        ))}
      </div>
    </>
  );
}

function Decisions({ p }: { p: Project }) {
  const U = useU();
  return (
    <>
      <p className="muted">{U.decisionsIntro}</p>
      {(p.decisions ?? []).map((d: any, i: number) => {
        const v = d.both?.v as "yes" | "no" | "partly" | undefined;
        return (
          <div className="card decision" key={i}>
            <div className="d-head">
              <h3><T x={d.title} /></h3>
              <div className="vs">
                <Html className="pick" html={d.chose} />
                {d.alts?.length ? <><span className="over">{U.instead}</span>{d.alts.map((a: string, j: number) => <Html key={j} className="alt" html={a} />)}</> : null}
              </div>
            </div>
            <div className="d-body">
              <div className="d-cell"><div className="lbl">{U.why}</div><T x={d.why} /></div>
              <div className="d-cell"><div className="lbl">{U.both}{v && <> <span className={`verdict ${v}`}>{U[v]}</span></>}</div><T x={d.both} /></div>
              <div className="d-cell wide"><div className="lbl">{U.better}</div><T x={d.better} /></div>
              {d.say && (
                <div className="d-cell wide say">
                  <div className="lbl">{U.say}{d.concept && <> · <Link className="concept-link" to={`/projects/concepts/${d.concept}`}>{U.learn}</Link></>}</div>
                  <Html as="q" html={d.say} />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

function How({ p }: { p: Project }) {
  const U = useU();
  return (
    <>
      {p.flows?.length ? <h2 className="section-title">{U.flows}</h2> : null}
      {(p.flows ?? []).map((f: any, i: number) => (
        <div className="card" key={i}>
          <h3><T x={f.title} /></h3>
          {f.note && <p className="muted"><T x={f.note} /></p>}
          <ol className="flow">{f.steps.map((st: any, j: number) => <li key={j}><Html as="b" html={st[0]} /><T x={st[1]} /></li>)}</ol>
        </div>
      ))}
      {p.patterns?.length ? <h2 className="section-title">{U.patterns}</h2> : null}
      {(p.patterns ?? []).map((pt: any, i: number) => (
        <div className="card" key={i}>
          <h3><T x={pt.title} /></h3>
          <T x={pt.body} as="div" />
          {pt.code && <><Code code={pt.code} /><div className="sketch-note">{U.sketch}</div></>}
        </div>
      ))}
    </>
  );
}

function Hooks({ p }: { p: Project }) {
  const U = useU();
  return (
    <>
      {(p.hooks ?? []).map((g: any, i: number) => (
        <div key={i}>
          <h2 className="section-title"><T x={g.group} /></h2>
          <div className="card">
            {g.items.map((h: any, j: number) => (
              <div className="hook" key={j}>
                <div className="name"><Html html={h.name} />{h.count && <span className="count">{h.count}</span>}</div>
                <div><T x={h.what} />{h.remember && <div className="remember"><b>{U.remember}</b> <T x={h.remember} /></div>}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

function Problems({ p }: { p: Project }) {
  const U = useU();
  return (
    <>
      {(p.problems ?? []).map((x: any, i: number) => (
        <div className="card story" key={i}>
          <h3><T x={x.title} /></h3>
          <div className="steps3">
            <div><span className="lbl">{U.problem}</span><T x={x.problem} /></div>
            <div><span className="lbl">{U.fix}</span><T x={x.fix} /></div>
            <div><span className="lbl">{U.result}</span><T x={x.result} /></div>
          </div>
          {x.lesson && <div className="lesson"><b>{U.lesson}:</b> <T x={x.lesson} /></div>}
        </div>
      ))}
    </>
  );
}

function Interview({ p }: { p: Project }) {
  const U = useU();
  return (
    <>
      {p.star && (
        <>
          <h2 className="section-title">{U.star}</h2>
          <div className="card"><div className="star">{(["s", "t", "a", "r"] as const).map((k) => <div key={k}><span className="letter">{k.toUpperCase()}</span><T x={p.star[k]} /></div>)}</div></div>
        </>
      )}
      <h2 className="section-title">{U.qa}</h2>
      {(p.qa ?? []).map((q: any, i: number) => <details className="qa" key={i}><summary><Html html={q.q} /></summary><T x={q.a} as="div" /></details>)}
      {p.terms?.length ? (
        <><h2 className="section-title">{U.terms}</h2><div className="card terms"><Chips items={p.terms.map((t: string) => <Html html={t} />)} /></div></>
      ) : null}
      {p.dont?.length ? <div className="card dont" style={{ marginTop: 18 }}><h3>{U.dont}</h3><List items={p.dont} /></div> : null}
      {p.evidence?.length ? (
        <><h2 className="section-title">{U.evidence}</h2><div className="card muted" style={{ fontSize: 14 }}><List items={p.evidence} /></div></>
      ) : null}
    </>
  );
}

const VIEWS: Record<Tab, (props: { p: Project }) => JSX.Element> = { overview: Overview, decisions: Decisions, how: How, hooks: Hooks, problems: Problems, interview: Interview };

export function ProjectPage() {
  const U = useU();
  const { lang } = useLang();
  const { id, tab: tabParam } = useParams();
  const p = projectById(id);
  if (!p) return <ProjectsHome />;
  const tab: Tab = (TABS as readonly string[]).includes(tabParam ?? "") ? (tabParam as Tab) : "overview";
  const View = VIEWS[tab];
  const nextTab = TABS[TABS.indexOf(tab) + 1];
  return (
    <Page view="project" current={p.id} title={p.name}>
      <div className="wrap" style={{ ["--brand" as string]: p.color }}>
        <Header p={p} tab={tab} />
        <View p={p} />
        {nextTab && (
          <p style={{ marginTop: 24 }}>
            <Link to={`/projects/${p.id}/${nextTab}`} style={{ fontWeight: 600, textDecoration: "none" }}>{U.next}: {U[nextTab]} {arrow(lang)}</Link>
          </p>
        )}
      </div>
    </Page>
  );
}

export function ConceptsPage() {
  const U = useU();
  const { id } = useParams();
  useEffect(() => {
    // Wait for Shell's scroll-to-top, then jump to the requested card.
    if (id) requestAnimationFrame(() => document.getElementById(`c-${id}`)?.scrollIntoView({ block: "start" }));
  }, [id]);
  return (
    <Page view="concepts" title={U.concepts}>
      <div className="wrap">
        <div className="hero-home"><h1>{U.concepts}</h1><p>{U.conceptsIntro}</p></div>
        {concepts.map((c) => {
          const used = projects.filter((p) => (p.decisions ?? []).some((d: any) => d.concept === c.id));
          return (
            <div className="card concept" id={`c-${c.id}`} key={c.id}>
              <h3>{c.name}</h3>
              <div className="tagline"><T x={c.tagline} /></div>
              <div className="grid-2" style={{ marginTop: 6 }}>
                <div><b>{U.what}</b><T x={c.what} as="div" /></div>
                <div><b>{U.when}</b><T x={c.when} as="div" /></div>
              </div>
              {c.pitfall && <div className="lesson" style={{ marginTop: 12 }}><b>{U.pitfall}:</b> <T x={c.pitfall} /></div>}
              {c.q && <details className="qa" style={{ marginTop: 12 }}><summary><Html html={c.q} /></summary><T x={c.a} as="div" /></details>}
              {used.length > 0 && (
                <div className="used-in">{U.usedIn}: {used.map((p, i) => <span key={p.id}>{i > 0 && " · "}<Link to={`/projects/${p.id}/decisions`}>{p.name}</Link></span>)}</div>
              )}
            </div>
          );
        })}
      </div>
    </Page>
  );
}
