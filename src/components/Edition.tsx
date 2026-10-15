import Link from "next/link";
import {
  site, heroes, counters, gap, owns, cases, alsoWorked, industries, adaptive, craft,
  ladder, leadership, writing, contact, ticker, text, type T,
} from "@/content/site";
import { Reveal, Counter, GridCanvas } from "./Client";
import { Bridge, Converge, IndustryMap } from "./Visuals";

export type Variant = "clients" | "peers";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const asset = (p: string) => `${base}${p}`;
const mailto = `mailto:${site.emailUser}@${site.emailDomain}`;

function Header({ variant }: { variant: Variant }) {
  const nav =
    variant === "clients"
      ? [["#work", "Work"], ["#industries", "Industries"], ["#how", "How I work"]]
      : [["#pov", "Point of view"], ["#frameworks", "Frameworks"], ["#work", "Work"]];
  return (
    <header className="site-header">
      <div className="container header-in">
        <Link href="/" className="wordmark" aria-label="Manny Guerrero, home">
          Manny Guerrero
        </Link>
        <nav aria-label="Sections" className="nav">
          {nav.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
          <a href="#contact" className="nav-contact">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

function Ticker() {
  const items = ticker;
  return (
    <div className="ticker" aria-hidden="true">
      <ul className="ticker-track">
        {[...items, ...items].map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

function Actions(_: { variant: Variant }) {
  return (
    <div className="cta-row">
      <a className="btn" href={site.linkedin}>
        Connect on LinkedIn
      </a>
      <a className="btn ghost" href={mailto}>
        Email
      </a>
    </div>
  );
}

function Hero({ variant }: { variant: Variant }) {
  const h = heroes[variant];
  return (
    <section className="hero" aria-labelledby="hero-h">
      <GridCanvas />
      <Ticker />
      <div className="container hero-in">
        <div className="hero-copy">
          <p className="kicker">{site.title}</p>
          <h1 id="hero-h">{h.headline}</h1>
          <p className="lede">{h.sub}</p>
          <Actions variant={variant} />
        </div>
        <figure className="portrait">
          <img src={asset(site.portrait)} alt={site.portraitAlt} width={800} height={800} />
        </figure>
        <ul className="stats" aria-label="Scope at a glance">
          {counters.map((k) => (
            <li key={k.label} className="stat">
              <Counter value={k.value} suffix={k.suffix} />
              <span className="stat-label">{k.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Editorial section: a narrow left rail with the label, content on the right. */
function Sec({ id, rail, title, children }: { id: string; rail: string; title?: string; children: React.ReactNode }) {
  return (
    <section className="sec" id={id} aria-labelledby={title ? `${id}-h` : undefined} aria-label={title ? undefined : rail}>
      <div className="container sec-in">
        <p className="rail">{rail}</p>
        <Reveal className="sec-body">
          {title ? <h2 id={`${id}-h`}>{title}</h2> : null}
          {children}
        </Reveal>
      </div>
    </section>
  );
}

function Gap() {
  return (
    <Sec id="gap" rail="The problem" title={gap.headline}>
      <p className="body-lg">{gap.body}</p>
      <Bridge first={gap.first} second={gap.second} />
    </Sec>
  );
}

function Own() {
  return (
    <Sec id="own" rail="What I own" title="What I'm accountable for">
      <ul className="rows">
        {owns.map((o) => (
          <li key={o.n} className="row">
            <h3>{o.title}</h3>
            <p>{text(o.line)}</p>
          </li>
        ))}
      </ul>
    </Sec>
  );
}

function Work({ variant }: { variant: Variant }) {
  return (
    <Sec id="work" rail="Selected work" title="Case files">
      <ul className="cases">
        {cases.map((k) => (
          <li key={k.id} className="case">
            <div className="case-id">
              <p className="small">{k.industry}</p>
              <h3>{k.title}</h3>
            </div>
            <div className="case-stat">
              {k.stat ? (
                <>
                  <strong>{k.stat.value}</strong>
                  <span>{k.stat.label}</span>
                  {k.stat.value.endsWith("%") ? (
                    <i className="meter" aria-hidden="true">
                      <b style={{ ["--w" as string]: k.stat.value }} />
                    </i>
                  ) : null}
                </>
              ) : null}
            </div>
            <div className="case-body">
              <p>{k.outcome}</p>
              <details>
                <summary>Role and context</summary>
                <dl>
                  <dt>Context</dt>
                  <dd>{k.context}</dd>
                  <dt>My role</dt>
                  <dd>{text(k.role)}</dd>
                  {k.decisions ? (
                    <>
                      <dt>Decisions</dt>
                      <dd>{text(k.decisions)}</dd>
                    </>
                  ) : null}
                  {variant === "peers" && k.differently ? (
                    <>
                      <dt>What I would do differently</dt>
                      <dd>{text(k.differently)}</dd>
                    </>
                  ) : null}
                </dl>
              </details>
            </div>
          </li>
        ))}
      </ul>
      <h3 className="also-h">Also</h3>
      <ul className="also">
        {alsoWorked.map((a) => (
          <li key={a.title}>
            <span className="small">{a.industry}</span>
            <span>{a.title}</span>
          </li>
        ))}
      </ul>
    </Sec>
  );
}

function Industries() {
  return (
    <Sec id="industries" rail="Industries" title="Where the work has happened">
      <IndustryMap items={industries.map((i) => ({ name: i.name, line: i.line ? text(i.line) : undefined }))} />
      <ul className="ind">
        {industries.map((i) => (
          <li key={i.name}>
            <h3>{i.name}</h3>
            {i.line ? <p>{text(i.line)}</p> : null}
          </li>
        ))}
      </ul>
    </Sec>
  );
}

/* Visual 1: the old way, a chain of handoffs that each wait on a person. */
const OLD_STEPS = ["Idea", "Requirements", "Design", "Build", "Test", "Release"];
function LinearStrip() {
  return (
    <figure className="linear" aria-label="A linear chain of six handoffs, each waiting on a person">
      <ol>
        {OLD_STEPS.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      <figcaption>The old way: linear handoffs. Every step waits on a person.</figcaption>
    </figure>
  );
}

/* Visual 2: the closed loop with human gates. */
const LOOP = ["Intent", "Context", "Build", "Verify", "Ship", "Learn"];
function LoopRing() {
  const cx = 260, cy = 260, r = 176, nr = 42;
  const pt = (deg: number, rad = r) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [Math.round((cx + rad * Math.cos(a)) * 10) / 10, Math.round((cy + rad * Math.sin(a)) * 10) / 10];
  };
  const nodes = LOOP.map((label, i) => ({ label, deg: i * 60, p: pt(i * 60) }));
  const arcs = nodes.map((n, i) => {
    const m = nodes[(i + 1) % nodes.length];
    const a1 = pt(n.deg + 19), a2 = pt(m.deg - 19);
    return `M${a1[0]} ${a1[1]} A${r} ${r} 0 0 1 ${a2[0]} ${a2[1]}`;
  });
  const gates = [0, 3];
  return (
    <svg viewBox="0 0 520 520" className="loop" role="img" aria-label="A closed loop of six stages: intent, context, build, verify, ship, learn, with human gates at intent and verify">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(180,195,220,0.10)" strokeDasharray="2 6" />
      {arcs.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#7fa8dc" strokeWidth="1.5" className="loop-arc" style={{ ["--d" as string]: `${i * 0.18}s` }} />
      ))}
      <g className="orbit" style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <circle cx={cx} cy={cy - r} r="4.5" fill="#edf0f5" />
      </g>
      {nodes.map((n, i) => (
        <g key={n.label} className="loop-node" style={{ ["--d" as string]: `${i * 0.12}s` }}>
          <circle cx={n.p[0]} cy={n.p[1]} r={nr} fill="#0a0d12" stroke="#7fa8dc" strokeWidth="1.4" />
          <text x={n.p[0]} y={n.p[1] + 5} textAnchor="middle" className="loop-label">
            {n.label}
          </text>
        </g>
      ))}
      {gates.map((gi) => {
        const g = pt(nodes[gi].deg + 30, r + 52);
        return (
          <g key={gi} className="loop-gate">
            <rect x={g[0] - 5} y={g[1] - 5} width="10" height="10" transform={`rotate(45 ${g[0]} ${g[1]})`} fill="#7fa8dc" />
            <text x={g[0]} y={g[1] + 24} textAnchor="middle" className="loop-gate-t">
              Human gate
            </text>
          </g>
        );
      })}
      <text x={cx} y={cy - 2} textAnchor="middle" className="loop-core">
        Closed loop
      </text>
      <text x={cx} y={cy + 20} textAnchor="middle" className="loop-core-s">
        agents work in parallel, people decide
      </text>
    </svg>
  );
}

function Adaptive({ id = "how" }: { id?: string }) {
  return (
    <Sec id={id} rail={adaptive.eyebrow} title={text(adaptive.headline)}>
      <p className="body-lg narrow-p">{adaptive.body}</p>
      <LinearStrip />
      <div className="how-split">
        <ol className="steps">
          {adaptive.pillars.map((p) => (
            <li key={p.n}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ol>
        <LoopRing />
      </div>
    </Sec>
  );
}

function Craft() {
  return (
    <Sec id="craft" rail={craft.eyebrow} title={craft.headline}>
      <p className="body-lg">{craft.body}</p>
      <Converge caption={craft.caption} />
    </Sec>
  );
}

function Frameworks() {
  return (
    <Sec id="frameworks" rail="Frameworks" title="An AI proficiency ladder">
      <ol className="ladder">
        {ladder.map((l, i) => (
          <li key={l.level} style={{ ["--i" as string]: i }}>
            <span className="small">{l.level}</span>
            <i className="lvl" aria-hidden="true">
              <b style={{ ["--w" as string]: `${(i + 1) * 20}%` }} />
            </i>
            <h3>{l.name}</h3>
            <p>{text(l.line)}</p>
          </li>
        ))}
      </ol>
    </Sec>
  );
}

function Leadership() {
  return (
    <Sec id="leadership" rail={leadership.eyebrow} title={leadership.headline}>
      <ul className="rows">
        {leadership.items.map((it) => (
          <li key={it.title} className="row">
            <h3>{it.title}</h3>
            <p>{text(it.body as T)}</p>
          </li>
        ))}
      </ul>
    </Sec>
  );
}

function Writing() {
  if (writing.length < 3) return null;
  return (
    <Sec id="writing" rail="Writing" title="Selected writing">
      <ul className="writing">
        {writing.map((w) => (
          <li key={w.href}>
            <a href={w.href} rel="noopener noreferrer">
              {w.title}
            </a>
            {w.date ? <span> {w.date}</span> : null}
          </li>
        ))}
      </ul>
    </Sec>
  );
}

function Contact({ variant }: { variant: Variant }) {
  return (
    <section className="sec contact" id="contact" aria-labelledby="ct-h">
      <div className="container sec-in">
        <p className="rail">Contact</p>
        <Reveal className="sec-body">
          <h2 id="ct-h">{contact.headline}</h2>
          {contact[variant] ? <p className="body-lg">{contact[variant]}</p> : null}
          <Actions variant={variant} />
          <p className="addr">
            <a href={mailto}>{site.emailUser}@{site.emailDomain}</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default function Edition({ variant }: { variant: Variant }) {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header variant={variant} />
      <main id="main">
        <Hero variant={variant} />
        {variant === "clients" ? (
          <>
            <Gap />
            <Own />
            <Work variant={variant} />
            <Industries />
            <Adaptive />
            <Craft />
            <Contact variant={variant} />
          </>
        ) : (
          <>
            <Adaptive id="pov" />
            <Craft />
            <Frameworks />
            <Leadership />
            <Work variant={variant} />
            <Writing />
            <Contact variant={variant} />
          </>
        )}
      </main>
    </>
  );
}
