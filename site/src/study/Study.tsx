// Study Guide — the React version of study-guide/assets/study.js, same markup and CSS classes.
import { Fragment, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { groupById, isReady, sectionById, sections, type Block, type Group, type OutputQuestion, type QA, type Section, type Topic } from "../data";
import { plain, T, tr, useLang, useUI } from "../i18n";
import { arrow, back, Brand, Code, Html, LangSwitch, List, NavItem, Shell, Tile } from "../ui";

const UI = {
  en: {
    title: "Study Guide", sub: "Ibrahem Hassan · Frontend", home: "Home", quick: "Before the interview", quiz: "Test yourself",
    projects: "Project guides", sections: "Sections", soon: "coming", search: "Search everything…", results: "Results for",
    noResults: "Nothing found. Try another word (English terms work best).",
    homeIntro: "Everything a frontend interview can ask, from HTML to system design — explained with when to use what, why, the traps, and how it shows up in my own projects.",
    howto: "How to use it",
    howtoSteps: ["Read a section from the top; each topic starts with a one-line summary.", "Answer the “Test yourself” questions before opening them.", "Do the output questions on paper first — say why, not only what.", "One hour before an interview: open “Before the interview”."],
    tldr: "In one line", say: "Say it in the interview", inProjects: "In my projects", interview: "Interview questions", follow: "They may dig deeper",
    selfTest: "Test yourself", think: "Think first, then open", answer: "Answer", why: "Why", output: "Output", use: "Use it when", avoid: "Avoid it when",
    pitfalls: "Traps", topics: "topics", questions: "questions", ready: "ready", planned: "planned",
    quickIntro: "The short version of every ready topic: the key points and the sentence to say. Read it the hour before an interview.",
    quizIntro: "Random questions from the ready sections. Answer out loud, then open.", shuffle: "Another set", all: "All sections",
    outputIntro: "Read the code, write the output on paper, explain why — then open.", group: "Group", rules: "Rules you need",
    comingText: "This section is planned. It will be written in the next rounds, in order.", level: { 1: "basic", 2: "medium", 3: "tricky" } as Record<number, string>,
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
    pitfalls: "مطبات", topics: "topic", questions: "سؤال", ready: "جاهز", planned: "متخطط",
    quickIntro: "النسخة المختصرة من كل topic جاهز: أهم النقط والجملة اللي تقولها. اقراها في الساعة اللي قبل الإنترفيو.",
    quizIntro: "أسئلة عشوائية من الأقسام الجاهزة. جاوب بصوت عالي، وبعدين افتح.", shuffle: "أسئلة تانية", all: "كل الأقسام",
    outputIntro: "اقرا الكود، اكتب الناتج على ورقة، واشرح ليه — وبعدين افتح.", group: "مجموعة", rules: "القواعد اللي هتحتاجها",
    comingText: "القسم ده متخطط. هيتكتب في الجولات الجاية بالترتيب.", level: { 1: "سهل", 2: "متوسط", 3: "صعب" } as Record<number, string>,
  },
};
const useU = () => useUI(UI);

const topicPath = (sec: Section, t: Topic) => `/study/t/${sec.id}/${t.id}`;
const groupPath = (g: Group) => `/study/o/${g.id}`;

function SecTile({ sec, big }: { sec: Section; big?: boolean }) {
  return <Tile color={sec.color} big={big} className="st-tile">{sec.icon}</Tile>;
}
function useCount() {
  const U = useU();
  return (sec: Section) => sec.groups
    ? `${sec.groups.reduce((n, g) => n + g.questions.length, 0)} ${U.questions}`
    : `${(sec.topics ?? []).length} ${U.topics}`;
}

// ---------- Layout ----------
type Here = { view: string; sec?: Section; topic?: Topic; group?: Group; q?: string };

function Sidebar({ here }: { here: Here }) {
  const U = useU();
  const count = useCount();
  const navigate = useNavigate();
  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = String(new FormData(e.currentTarget).get("q") ?? "").trim();
    if (q) navigate(`/study/search?q=${encodeURIComponent(q)}`);
  };
  const readyN = sections.filter(isReady).length;
  return (
    <>
      <Brand mark="SG" markClass="st-brand" title={U.title} sub={U.sub} />
      <LangSwitch />
      <form className="st-search" onSubmit={onSearch} key={here.q ?? ""}>
        <input type="search" name="q" placeholder={U.search} defaultValue={here.q ?? ""} aria-label={U.search} />
      </form>
      <nav className="nav">
        <NavItem to="/study" tile={<Tile color="#2b2b28">⌂</Tile>} label={U.home} active={here.view === "home"} />
        <NavItem to="/study/quick" tile={<Tile color="#b45309">⏱</Tile>} label={U.quick} active={here.view === "quick"} />
        <NavItem to="/study/quiz" tile={<Tile color="#7c3aed">?</Tile>} label={U.quiz} active={here.view === "quiz"} />
        <NavItem to="/projects" className="st-switch" tile={<Tile color="#1f6f5c">⇆</Tile>} label={U.projects} />
      </nav>
      <div className="nav-label">{U.sections}</div>
      <nav className="nav st-sections">
        {sections.map((sec) => {
          if (!isReady(sec)) {
            return <NavItem key={sec.id} to={`/study/s/${sec.id}`} className="todo" tile={<SecTile sec={sec} />} label={<T x={sec.name} />} meta={U.soon} />;
          }
          const open = here.sec?.id === sec.id;
          return (
            <Fragment key={sec.id}>
              <NavItem to={`/study/s/${sec.id}`} tile={<SecTile sec={sec} />} label={<T x={sec.name} />} meta={count(sec)} active={open && here.view === "section"} />
              {open && (
                <div className="st-subs">
                  {sec.groups
                    ? sec.groups.map((g) => <Link key={g.id} className={"sub" + (here.group?.id === g.id ? " active" : "")} to={groupPath(g)}><T x={g.title} /></Link>)
                    : (sec.topics ?? []).map((t) => <Link key={t.id} className={"sub" + (here.topic?.id === t.id ? " active" : "")} to={topicPath(sec, t)}><T x={t.title} /></Link>)}
                </div>
              )}
            </Fragment>
          );
        })}
      </nav>
      <div className="sidebar-foot">{readyN} {U.ready} · {sections.length - readyN} {U.planned}</div>
    </>
  );
}

function Page({ here, title, children }: { here: Here; title: string; children: ReactNode }) {
  const U = useU();
  const full = here.view === "home" ? U.title : `${title} — ${U.title}`;
  return (
    <Shell sidebar={<Sidebar here={here} />} sidebarClass="st-sidebar" title={full}>
      <div className="wrap st-wrap" style={here.sec ? { ["--brand" as string]: here.sec.color } : undefined}>{children}</div>
    </Shell>
  );
}

// ---------- Blocks ----------
function BlockView({ b }: { b: Block }) {
  const U = useU();
  const { lang } = useLang();
  const title = b.title ? <h3><T x={b.title} /></h3> : null;
  switch (b.type) {
    case "text": return <div className="card st-text">{title}<T x={b.body} as="div" /></div>;
    case "code": return <div className="card">{title}<Code code={b.code ?? ""} />{b.note && <div className="st-note"><T x={b.note} /></div>}</div>;
    case "list": return <div className="card">{title}<List items={b.items} /></div>;
    case "compare":
      return (
        <div className="card st-compare">{title}
          <div className="st-table-wrap"><table>
            <thead><tr>{(b.cols ?? []).map((c, i) => <th key={i}><T x={c} /></th>)}</tr></thead>
            <tbody>{(b.rows ?? []).map((row, r) => <tr key={r}>{row.map((c, i) => i === 0 ? <th key={i}><T x={c} /></th> : <td key={i}><T x={c} /></td>)}</tr>)}</tbody>
          </table></div>
        </div>
      );
    case "when":
      return (
        <div className="st-when">
          {b.title && <h3 className="st-when-title"><T x={b.title} /></h3>}
          <div className="card st-use"><div className="lbl">{U.use}</div><List items={b.use} /></div>
          <div className="card st-avoid"><div className="lbl">{U.avoid}</div><List items={b.avoid} /></div>
        </div>
      );
    case "pitfalls": return <div className="card st-pitfalls"><h3>{b.title ? <T x={b.title} /> : U.pitfalls}</h3><List items={b.items} /></div>;
    case "projects":
      return (
        <div className="card st-projects"><h3>{U.inProjects}</h3>
          <ul>{(b.items ?? []).map((i, n) => (
            <li key={n}><T x={i.text} />{i.p && <> <Link to={`/projects/${i.p}/${i.tab || "decisions"}`}>{i.label || i.p} {arrow(lang)}</Link></>}</li>
          ))}</ul>
        </div>
      );
    default: return null;
  }
}

function QAList({ items }: { items: QA[] }) {
  const U = useU();
  return (
    <>
      {items.map((q, i) => (
        <details className="qa" key={i}>
          <summary><T x={q.q} /></summary>
          <div><T x={q.a} />
            {q.follow?.length ? (
              <div className="st-follow"><div className="lbl">{U.follow}</div>
                {q.follow.map((f, j) => <details className="qa sub" key={j}><summary><T x={f.q} /></summary><div><T x={f.a} /></div></details>)}
              </div>
            ) : null}
          </div>
        </details>
      ))}
    </>
  );
}

function OutputCard({ q, n, src }: { q: OutputQuestion; n: number; src?: ReactNode }) {
  const U = useU();
  return (
    <div className="card st-out">
      <div className="st-out-head">
        {src}
        <span className="st-n">{n}</span>
        {q.level && <span className={`st-level l${q.level}`}>{U.level[q.level]}</span>}
        {(q.tags ?? []).map((t) => <span key={t} className="chip">{t}</span>)}
      </div>
      <Code code={q.code} />
      <details className="st-reveal">
        <summary>{U.think}</summary>
        <div className="st-answer">
          <div className="lbl">{U.output}</div><pre className="st-console">{q.answer}</pre>
          <div className="lbl">{U.why}</div><T x={q.why} as="div" />
        </div>
      </details>
    </div>
  );
}

function Pager<X>({ prev, next, to, label }: { prev?: X; next?: X; to: (x: X) => string; label: (x: X) => ReactNode }) {
  const { lang } = useLang();
  return (
    <div className="st-pager">
      {prev ? <Link to={to(prev)}>{back(lang)} {label(prev)}</Link> : <span />}
      {next ? <Link to={to(next)}>{label(next)} {arrow(lang)}</Link> : null}
    </div>
  );
}

// ---------- Views ----------
export function StudyHome() {
  const U = useU();
  const count = useCount();
  return (
    <Page here={{ view: "home" }} title={U.title}>
      <div className="hero-home"><h1>{U.title}</h1><p>{U.homeIntro}</p></div>
      <h2 className="section-title">{U.howto}</h2>
      <div className="card howto"><ol>{U.howtoSteps.map((x) => <li key={x}>{x}</li>)}</ol></div>
      <h2 className="section-title">{U.sections}</h2>
      <div className="p-cards">
        {sections.map((sec, i) => {
          const r = isReady(sec);
          return (
            <Link key={sec.id} className={"p-card" + (r ? "" : " st-planned")} to={`/study/s/${sec.id}`} style={{ ["--tile" as string]: sec.color }}>
              <div className="row"><SecTile sec={sec} /><div><h3>{i + 1}. <T x={sec.name} /></h3><div className="meta">{r ? count(sec) : U.soon}</div></div></div>
              {r && sec.intro && <div className="line"><T x={sec.intro} /></div>}
            </Link>
          );
        })}
      </div>
    </Page>
  );
}

export function StudySection() {
  const U = useU();
  const { lang } = useLang();
  const sec = sectionById(useParams().sec);
  if (!sec) return <StudyHome />;
  return (
    <Page here={{ view: "section", sec }} title={plain(sec.name, lang)}>
      <div className="p-head"><SecTile sec={sec} big /><div><h1><T x={sec.name} /></h1><div className="tagline">{sec.intro ? <T x={sec.intro} /> : U.comingText}</div></div></div>
      {isReady(sec) && (sec.groups ? (
        <>
          <p className="muted">{U.outputIntro}</p>
          <div className="p-cards">
            {sec.groups.map((g, i) => (
              <Link key={g.id} className="p-card" to={groupPath(g)} style={{ ["--tile" as string]: sec.color }}>
                <h3>{i + 1}. <T x={g.title} /></h3><div className="line"><T x={g.intro} /></div><div className="big">{g.questions.length} {U.questions}</div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="p-cards">
            {(sec.topics ?? []).map((t, i) => (
              <Link key={t.id} className="p-card" to={topicPath(sec, t)} style={{ ["--tile" as string]: sec.color }}>
                <h3>{i + 1}. <T x={t.title} /></h3><div className="line"><T x={t.tldr} /></div>
              </Link>
            ))}
          </div>
          <p style={{ marginTop: 18 }}><Link to={`/study/quiz/${sec.id}`} className="st-btn">{U.quiz}: <T x={sec.name} /> {arrow(lang)}</Link></p>
        </>
      ))}
    </Page>
  );
}

export function StudyTopic() {
  const U = useU();
  const { lang } = useLang();
  const { sec: secId, topic: topicId } = useParams();
  const sec = sectionById(secId);
  const list = sec?.topics ?? [];
  const i = list.findIndex((t) => t.id === topicId);
  if (!sec || i < 0) return <StudyHome />;
  const t = list[i];
  return (
    <Page here={{ view: "topic", sec, topic: t }} title={plain(t.title, lang)}>
      <div className="st-crumb"><Link to={`/study/s/${sec.id}`}><T x={sec.name} /></Link> · {i + 1}/{list.length}</div>
      <h1 className="st-h1"><T x={t.title} /></h1>
      <div className="card pitch st-tldr"><div className="lbl">{U.tldr}</div><T x={t.tldr} /></div>
      {(t.blocks ?? []).map((b, n) => <BlockView key={n} b={b} />)}
      {t.say && <div className="card st-say"><div className="lbl">{U.say}</div><Html as="q" html={t.say} /></div>}
      {t.interview?.length ? <><h2 className="section-title">{U.interview}</h2><QAList items={t.interview} /></> : null}
      {t.quiz?.length ? (
        <>
          <h2 className="section-title">{U.selfTest} <small>{U.think}</small></h2>
          {t.quiz.map((q, n) => (
            <details className="qa st-quiz" key={n}><summary><T x={q.q} /></summary><div><span className="lbl">{U.answer}</span><T x={q.a} /></div></details>
          ))}
        </>
      ) : null}
      <Pager prev={list[i - 1]} next={list[i + 1]} to={(x) => topicPath(sec, x)} label={(x) => <T x={x.title} />} />
    </Page>
  );
}

export function StudyGroup() {
  const U = useU();
  const { lang } = useLang();
  const found = groupById(useParams().group);
  if (!found) return <StudyHome />;
  const { sec, group: g, index } = found;
  const groups = sec.groups!;
  return (
    <Page here={{ view: "group", sec, group: g }} title={plain(g.title, lang)}>
      <div className="st-crumb"><Link to={`/study/s/${sec.id}`}><T x={sec.name} /></Link> · {U.group} {index + 1}/{groups.length}</div>
      <h1 className="st-h1"><T x={g.title} /></h1>
      {g.intro && <div className="card pitch st-tldr"><T x={g.intro} /></div>}
      {g.rules?.length ? <div className="card st-rules"><h3>{U.rules}</h3><List items={g.rules} /></div> : null}
      {g.questions.map((q, i) => <OutputCard key={i} q={q} n={i + 1} />)}
      <Pager prev={groups[index - 1]} next={groups[index + 1]} to={groupPath} label={(x) => <T x={x.title} />} />
    </Page>
  );
}

export function StudyQuick() {
  const U = useU();
  return (
    <Page here={{ view: "quick" }} title={U.quick}>
      <div className="hero-home"><h1>{U.quick}</h1><p>{U.quickIntro}</p></div>
      {sections.filter((s) => s.topics?.length).map((sec) => (
        <div key={sec.id}>
          <h2 className="section-title"><SecTile sec={sec} /><T x={sec.name} /></h2>
          {sec.topics!.map((t) => (
            <div className="card st-quick" key={t.id}>
              <h3><Link to={topicPath(sec, t)}><T x={t.title} /></Link></h3>
              {t.quick?.length ? <List items={t.quick} /> : <p><T x={t.tldr} /></p>}
              {t.say && <Html as="q" className="st-q" html={t.say} />}
            </div>
          ))}
        </div>
      ))}
      {sections.filter((s) => s.groups?.length).map((sec) => (
        <div key={sec.id}>
          <h2 className="section-title"><SecTile sec={sec} /><T x={sec.name} /></h2>
          <div className="card">
            {sec.groups!.map((g) => <div key={g.id}><h3><Link to={groupPath(g)}><T x={g.title} /></Link></h3><List items={g.rules ?? []} /></div>)}
          </div>
        </div>
      ))}
    </Page>
  );
}

type PoolItem = { kind: "q" | "i" | "o"; q: any; sec: Section; t?: Topic; g?: Group };
function shuffle<X>(a: X[]) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export function StudyQuiz() {
  const U = useU();
  const sec = sectionById(useParams().sec);
  const [round, setRound] = useState(0);
  const pick = useMemo(() => {
    const pool: PoolItem[] = [];
    (sec ? [sec] : sections).forEach((s2) => {
      (s2.topics ?? []).forEach((t) => {
        (t.quiz ?? []).forEach((q) => pool.push({ kind: "q", q, sec: s2, t }));
        (t.interview ?? []).forEach((q) => pool.push({ kind: "i", q, sec: s2, t }));
      });
      (s2.groups ?? []).forEach((g) => g.questions.forEach((q) => pool.push({ kind: "o", q, sec: s2, g })));
    });
    return shuffle(pool).slice(0, 12);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sec, round]);
  return (
    <Page here={{ view: "quiz", sec }} title={U.quiz}>
      <div className="hero-home"><h1>{U.quiz}{sec && <>: <T x={sec.name} /></>}</h1><p>{U.quizIntro}</p></div>
      <div className="chips st-filter">
        <Link className={"chip" + (sec ? "" : " on")} to="/study/quiz">{U.all}</Link>
        {sections.filter(isReady).map((x) => <Link key={x.id} className={"chip" + (sec?.id === x.id ? " on" : "")} to={`/study/quiz/${x.id}`}><T x={x.name} /></Link>)}
      </div>
      {pick.map((p, i) => {
        const src = p.t
          ? <Link className="st-src" to={topicPath(p.sec, p.t)}><T x={p.t.title} /></Link>
          : <Link className="st-src" to={groupPath(p.g!)}><T x={p.g!.title} /></Link>;
        if (p.kind === "o") return <OutputCard key={`${round}-${i}`} q={p.q} n={i + 1} src={src} />;
        return (
          <details className="qa st-quiz" key={`${round}-${i}`}>
            <summary><span className="st-n">{i + 1}</span> <T x={p.q.q} /></summary>
            <div>{src}<span className="lbl">{U.answer}</span><T x={p.q.a} /></div>
          </details>
        );
      })}
      <p style={{ marginTop: 16 }}><button type="button" className="st-btn" onClick={() => { setRound((r) => r + 1); window.scrollTo(0, 0); }}>{U.shuffle}</button></p>
    </Page>
  );
}

// ---------- Search ----------
type Hit = { kind: "topic"; sec: Section; t: Topic; text: string } | { kind: "output"; sec: Section; g: Group; q: OutputQuestion; n: number; text: string };
const both = (x: any) => (typeof x === "string" ? x : x ? `${x.en ?? ""} ${x.ar ?? ""}` : "");
const strip = (s: string) => s.replace(/<[^>]+>/g, " ").toLowerCase();
let INDEX: Hit[] | null = null;
function index(): Hit[] {
  if (INDEX) return INDEX;
  INDEX = [];
  for (const sec of sections) {
    for (const t of sec.topics ?? []) {
      const parts: string[] = [both(t.title), both(t.tldr), t.say ?? ""];
      for (const b of t.blocks ?? []) {
        parts.push(both(b.title), both(b.body), b.code ?? "");
        (b.items ?? b.use ?? []).forEach((i: any) => parts.push(both(i?.text ?? i)));
        (b.avoid ?? []).forEach((i) => parts.push(both(i)));
        (b.rows ?? []).forEach((r) => r.forEach((c) => parts.push(both(c))));
      }
      (t.interview ?? []).forEach((q) => parts.push(both(q.q), both(q.a)));
      (t.quiz ?? []).forEach((q) => parts.push(both(q.q), both(q.a)));
      INDEX.push({ kind: "topic", sec, t, text: strip(parts.join(" ")) });
    }
    for (const g of sec.groups ?? []) {
      g.questions.forEach((q, i) => INDEX!.push({ kind: "output", sec, g, q, n: i + 1, text: strip(`${both(g.title)} ${q.code} ${both(q.why)} ${(q.tags ?? []).join(" ")}`) }));
    }
  }
  return INDEX;
}

export function StudySearch() {
  const U = useU();
  const { lang } = useLang();
  const q = useSearchParams()[0].get("q") ?? "";
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const hits = words.length ? index().filter((e) => words.every((w) => e.text.includes(w))) : [];
  return (
    <Page here={{ view: "search", q }} title={U.results}>
      <div className="hero-home"><h1>{U.results}: <span className="ltr">{q}</span></h1></div>
      {!hits.length ? <p className="muted">{U.noResults}</p> : hits.slice(0, 60).map((e, i) => e.kind === "topic" ? (
        <Link key={i} className="card st-hit" to={topicPath(e.sec, e.t)}>
          <span className="meta"><T x={e.sec.name} /></span><b><T x={e.t.title} /></b><span dangerouslySetInnerHTML={{ __html: tr(e.t.tldr, lang) }} />
        </Link>
      ) : (
        <Link key={i} className="card st-hit" to={groupPath(e.g)}>
          <span className="meta"><T x={e.sec.name} /> · <T x={e.g.title} /></span><b>#{e.n}</b><Code code={e.q.code.split("\n").slice(0, 4).join("\n")} />
        </Link>
      ))}
    </Page>
  );
}
