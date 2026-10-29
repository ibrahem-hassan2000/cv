// Companies — where to apply in Cairo / Alexandria, and what to study for each company. Data: market/data/companies.js.
import { useMemo, type ReactNode } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { market, projectById, sectionById, type Company, type StatusLevel } from "../data";
import { T, useLang, useUI } from "../i18n";
import { arrow, Brand, LangSwitch, NavItem, Shell, Tile } from "../ui";

const UI = {
  en: {
    title: "Companies", sub: "Where to apply · what to study", home: "All companies", tracks: "Study tracks", companies: "Companies",
    study: "Study guide", projects: "Project guides",
    intro: "Companies in Cairo and Alexandria (and remote-friendly ones) that hire React / Next.js / React Native developers — with where to look, how fresh the last posting is, and what to study for each one.",
    howto: "How to use it",
    howtoSteps: ["Study the “Core” track first — every company asks it.", "Pick a company, open its page, and study the track it belongs to plus its extra topics.", "Before applying, open the posting link — postings close fast.", "Send me the real job post in chat for a tailored CV."],
    where: "Where to search", salary: "Salary benchmark", checked: "Last checked",
    filters: "Filter", all: "All", alex: "Alexandria / remote", reset: "Clear filters", none: "No company matches these filters.",
    status: { recent: "Posted in 2026", check: "Seen — date unclear", old: "Old or closed", none: "No frontend role found" } as Record<StatusLevel, string>,
    stack: "What they ask", fit: "Why it fits you", gap: "Gap to close", lead: "Projects to lead with", studyFor: "What to study",
    trackStudy: "Topics in this track", extra: "Extra for this company", posting: "Open the posting", inTrack: "Companies in this track",
    core: "Start with the Core track", coreNote: "Every company page assumes you have studied the Core track.", why: "Why",
    city: "Location", mode: "Work mode", sector: "Sector", deep: "Deep dive",
  },
  ar: {
    title: "الشركات", sub: "تقدّم فين · وتذاكر إيه", home: "كل الشركات", tracks: "مسارات المذاكرة", companies: "الشركات",
    study: "دليل المذاكرة", projects: "شرح المشاريع",
    intro: "شركات في القاهرة واسكندرية (واللي بتقبل remote) بتوظّف React و Next.js و React Native. ومع كل شركة: تدوّر فين، وآخر وظيفة كانت إمتى، وتذاكر إيه علشانها.",
    howto: "تستخدمها إزاي",
    howtoSteps: ["ذاكر مسار «الأساس» الأول، لأن كل الشركات بتسأل فيه.", "اختار شركة، وافتح صفحتها، وذاكر المسار بتاعها والـ topics الزيادة اللي فيها.", "قبل ما تقدّم، افتح لينك الوظيفة، لأن الوظايف بتتقفل بسرعة.", "ابعتلي إعلان الوظيفة الحقيقي في الشات، علشان أعملك CV مخصوص ليها."],
    where: "تدوّر فين", salary: "المرتبات", checked: "آخر مراجعة",
    filters: "فلتر", all: "الكل", alex: "اسكندرية أو remote", reset: "امسح الفلاتر", none: "مفيش شركة مطابقة للفلاتر دي.",
    status: { recent: "وظيفة في 2026", check: "ظهرت، والتاريخ مش واضح", old: "قديمة أو اتقفلت", none: "مفيش وظيفة فرونت" } as Record<StatusLevel, string>,
    stack: "بيطلبوا إيه", fit: "ليه مناسبة ليك", gap: "حاجة ناقصة تكمّلها", lead: "ابدأ بالمشاريع دي", studyFor: "تذاكر إيه",
    trackStudy: "topics المسار ده", extra: "زيادة للشركة دي", posting: "افتح الوظيفة", inTrack: "الشركات في المسار ده",
    core: "ابدأ بمسار الأساس", coreNote: "كل صفحة شركة بتفترض إنك ذاكرت مسار الأساس.", why: "ليه",
    city: "المكان", mode: "طريقة الشغل", sector: "المجال", deep: "تعمق",
  },
};
const useU = () => useUI(UI);
const TRACK_COLORS: Record<string, string> = { core: "#2b2b28", fintech: "#0f766e", enterprise: "#1d4ed8", product: "#7c3aed", commerce: "#b45309", mobile: "#be185d" };
const isAlexOrRemote = (c: Company) => /alexandria|remote/i.test(`${c.city} ${c.mode}`);

function StatusBadge({ level }: { level: StatusLevel }) {
  const U = useU();
  return <span className={`co-status ${level}`}>{U.status[level]}</span>;
}

/** A Study Guide topic, linking to its deep dive when it has one. */
function TopicLink({ topic: r }: { topic: string }) {
  const [secId, topicId] = r.split("/");
  const sec = sectionById(secId);
  const topic = sec?.topics?.find((t) => t.id === topicId);
  if (!sec || !topic) return null;
  const to = `/study/t/${sec.id}/${topic.id}${topic.deep ? "/deep" : ""}`;
  return (
    <Link className="co-topic" to={to}>
      <span className="co-topic-sec"><T x={sec.name} /></span>
      <span><T x={topic.title} />{topic.deep && <span className="st-deep-mark">DEEP</span>}</span>
    </Link>
  );
}

function ProjectChip({ id }: { id: string }) {
  const p = projectById(id);
  if (!p) return null;
  return <Link className="chip co-proj" to={`/projects/${p.id}/interview`}>{p.name}</Link>;
}

function Sidebar({ current, track }: { current?: string; track?: string }) {
  const U = useU();
  return (
    <>
      <Brand mark="CO" markClass="co-brand" title={U.title} sub={U.sub} />
      <LangSwitch />
      <nav className="nav">
        <NavItem to="/companies" tile={<Tile color="#2b2b28">⌂</Tile>} label={U.home} active={!current && !track} />
        <NavItem to="/study" className="st-switch" tile={<Tile color="#7c3aed">⇆</Tile>} label={U.study} />
        <NavItem to="/projects" className="st-switch" tile={<Tile color="#1f6f5c">⇆</Tile>} label={U.projects} />
      </nav>
      <div className="nav-label">{U.tracks}</div>
      <nav className="nav">
        {Object.entries(market.tracks).map(([id, t]) => (
          <NavItem key={id} to={`/companies/track/${id}`} tile={<Tile color={TRACK_COLORS[id]}>{(id === "core" ? "★" : id.charAt(0).toUpperCase())}</Tile>} label={<T x={t.name} />} active={track === id} />
        ))}
      </nav>
      <div className="nav-label">{U.companies}</div>
      <nav className="nav">
        {market.companies.map((c) => (
          <NavItem key={c.id} to={`/companies/${c.id}`} tile={<Tile color={TRACK_COLORS[c.tracks[0]]}>{c.name.charAt(0)}</Tile>} label={c.name} meta={c.city} active={current === c.id} />
        ))}
      </nav>
      <div className="sidebar-foot">{market.companies.length} · {U.checked} {market.checked}</div>
    </>
  );
}

function Page({ title, current, track, children }: { title: string; current?: string; track?: string; children: ReactNode }) {
  const U = useU();
  return (
    <Shell sidebar={<Sidebar current={current} track={track} />} title={title === U.title ? U.title : `${title} — ${U.title}`}>
      <div className="wrap co-wrap">{children}</div>
    </Shell>
  );
}

function CompanyCard({ c }: { c: Company }) {
  return (
    <Link className="p-card co-card" to={`/companies/${c.id}`} style={{ ["--tile" as string]: TRACK_COLORS[c.tracks[0]] }}>
      <div className="row">
        <Tile color={TRACK_COLORS[c.tracks[0]]}>{c.name.charAt(0)}</Tile>
        <div><h3>{c.name}</h3><div className="meta">{c.city}{c.mode !== "—" ? ` · ${c.mode}` : ""}</div></div>
      </div>
      <div className="line"><T x={c.sector} /></div>
      <div className="co-card-foot"><StatusBadge level={c.status.level} /><span className="co-tier">{c.tier}</span></div>
    </Link>
  );
}

export function CompaniesHome() {
  const U = useU();
  const { lang } = useLang();
  const [params, setParams] = useSearchParams();
  const trackF = params.get("track") ?? "";
  const statusF = params.get("status") ?? "";
  const alexF = params.get("alex") === "1";
  const set = (k: string, v: string) => {
    const next = new URLSearchParams(params);
    if (v) next.set(k, v); else next.delete(k);
    setParams(next, { replace: true });
  };
  const list = useMemo(() => market.companies.filter((c) =>
    (!trackF || c.tracks.includes(trackF)) && (!statusF || c.status.level === statusF) && (!alexF || isAlexOrRemote(c))), [trackF, statusF, alexF]);
  const anyFilter = trackF || statusF || alexF;

  return (
    <Page title={U.title}>
      <div className="hero-home"><h1>{U.title}</h1><p>{U.intro}</p></div>

      <h2 className="section-title">{U.howto}</h2>
      <div className="card howto"><ol>{U.howtoSteps.map((x) => <li key={x}>{x}</li>)}</ol></div>

      <h2 className="section-title">{U.filters}</h2>
      <div className="chips st-filter">
        <button type="button" className={"chip" + (trackF ? "" : " on")} onClick={() => set("track", "")}>{U.all}</button>
        {Object.entries(market.tracks).filter(([id]) => id !== "core").map(([id, t]) => (
          <button type="button" key={id} className={"chip" + (trackF === id ? " on" : "")} onClick={() => set("track", trackF === id ? "" : id)}><T x={t.name} /></button>
        ))}
      </div>
      <div className="chips st-filter">
        {(["recent", "check", "old", "none"] as StatusLevel[]).map((l) => (
          <button type="button" key={l} className={"chip" + (statusF === l ? " on" : "")} onClick={() => set("status", statusF === l ? "" : l)}>{U.status[l]}</button>
        ))}
        <button type="button" className={"chip" + (alexF ? " on" : "")} onClick={() => set("alex", alexF ? "" : "1")}>{U.alex}</button>
        {anyFilter && <button type="button" className="chip" onClick={() => setParams(new URLSearchParams(), { replace: true })}>✕ {U.reset}</button>}
      </div>
      {list.length ? <div className="p-cards">{list.map((c) => <CompanyCard key={c.id} c={c} />)}</div> : <p className="muted">{U.none}</p>}

      <h2 className="section-title">{U.where}</h2>
      <div className="co-boards">
        {market.boards.map((b) => (
          <a key={b.url} className="card co-board" href={b.url} target="_blank" rel="noopener noreferrer">
            <b>{b.name} <span aria-hidden="true">↗</span></b><T x={b.note} as="div" />
          </a>
        ))}
      </div>

      <h2 className="section-title">{U.salary}</h2>
      <div className="card"><T x={market.salary.note} as="p" /><a href={market.salary.url} target="_blank" rel="noopener noreferrer">Levels.fyi ↗</a></div>
      <p className="muted co-checked">{U.checked}: <span className="ltr">{market.checked}</span> {arrow(lang)}</p>
    </Page>
  );
}

export function TrackPage() {
  const U = useU();
  const { lang } = useLang();
  const { id = "" } = useParams();
  const t = market.tracks[id];
  if (!t) return <CompaniesHome />;
  const companies = market.companies.filter((c) => c.tracks.includes(id));
  const title = typeof t.name === "string" ? t.name : (lang === "ar" ? t.name.ar : t.name.en) ?? "";
  return (
    <Page title={title} track={id}>
      <div className="p-head"><Tile color={TRACK_COLORS[id]} big>{id === "core" ? "★" : id.charAt(0).toUpperCase()}</Tile><div><h1><T x={t.name} /></h1><div className="tagline"><T x={t.why} /></div></div></div>
      {id !== "core" && <div className="card co-core"><b>{U.core}.</b> {U.coreNote} <Link to="/companies/track/core">{U.core} {arrow(lang)}</Link></div>}
      <h2 className="section-title">{U.trackStudy}</h2>
      <div className="co-topics">{t.study.map((r) => <TopicLink key={r} topic={r} />)}</div>
      {t.lead?.length ? <><h2 className="section-title">{U.lead}</h2><div className="chips">{t.lead.map((p) => <ProjectChip key={p} id={p} />)}</div></> : null}
      {companies.length > 0 && <><h2 className="section-title">{U.inTrack}</h2><div className="p-cards">{companies.map((c) => <CompanyCard key={c.id} c={c} />)}</div></>}
    </Page>
  );
}

export function CompanyPage() {
  const U = useU();
  const { lang } = useLang();
  const c = market.companies.find((x) => x.id === useParams().id);
  if (!c) return <CompaniesHome />;
  const lead = [...new Set(c.tracks.flatMap((t) => market.tracks[t]?.lead ?? []))];
  return (
    <Page title={c.name} current={c.id}>
      <div className="p-head">
        <Tile color={TRACK_COLORS[c.tracks[0]]} big>{c.name.charAt(0)}</Tile>
        <div>
          <h1>{c.name}</h1>
          <div className="tagline"><T x={c.sector} /></div>
          <div className="facts">
            <span className="fact">{c.city}</span>
            {c.mode !== "—" && <span className="fact">{c.mode}</span>}
            {c.tracks.map((t) => <Link key={t} className="fact" to={`/companies/track/${t}`}><T x={market.tracks[t].name} /></Link>)}
          </div>
        </div>
      </div>

      <div className="card co-statuscard">
        <StatusBadge level={c.status.level} />
        <T x={c.status.note} as="p" />
        {c.status.url && <a href={c.status.url} target="_blank" rel="noopener noreferrer">{U.posting} ↗</a>}
      </div>

      {c.stack.length > 0 && <><h2 className="section-title">{U.stack}</h2><div className="chips">{c.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div></>}

      <h2 className="section-title">{U.fit}</h2>
      <div className="card"><T x={c.fit} /></div>
      {c.gap && <div className="card st-pitfalls"><h3>{U.gap}</h3><T x={c.gap} /></div>}

      {lead.length > 0 && <><h2 className="section-title">{U.lead}</h2><div className="chips">{lead.map((p) => <ProjectChip key={p} id={p} />)}</div></>}

      <h2 className="section-title">{U.studyFor}</h2>
      <div className="card co-core"><b>{U.core}.</b> {U.coreNote} <Link to="/companies/track/core">{U.core} {arrow(lang)}</Link></div>
      {c.study?.length ? <><h3 className="co-sub">{U.extra}</h3><div className="co-topics">{c.study.map((r) => <TopicLink key={r} topic={r} />)}</div></> : null}
      {c.tracks.map((t) => (
        <div key={t}>
          <h3 className="co-sub"><T x={market.tracks[t].name} /></h3>
          <div className="co-topics">{market.tracks[t].study.filter((r) => !c.study?.includes(r)).map((r) => <TopicLink key={r} topic={r} />)}</div>
        </div>
      ))}
    </Page>
  );
}
