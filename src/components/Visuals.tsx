"use client";

import { useEffect, useState } from "react";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* 1. The gap between a pilot and production. Conceptual only, no data. */
export function Bridge({ first, second }: { first?: string; second?: string }) {
  const path = "M90 100 L380 100 C 450 8, 610 8, 670 100";
  return (
    <figure className="viz">
      <svg viewBox="0 0 760 190" role="img" aria-label="A path from strategy to proof of value to production, with a marked gap between proof of value and production that a moving dot crosses">
        <path d="M136 100 L336 100" stroke="rgba(180,195,220,0.28)" strokeWidth="1.5" fill="none" />
        <path d="M426 100 L624 100" stroke="rgba(180,195,220,0.28)" strokeWidth="1.5" strokeDasharray="4 6" fill="none" />
        <path d={path} className="viz-path" fill="none" stroke="#7fa8dc" strokeWidth="1.6" />
        <circle r="5" className="viz-dot" style={{ offsetPath: `path("${path}")` } as React.CSSProperties} fill="#edf0f5" />
        {[["Strategy", 90], ["Proof of value", 380], ["Production", 670]].map(([t, x]) => (
          <g key={t as string}>
            <circle cx={x as number} cy="100" r="46" fill="#0a0d12" stroke="#7fa8dc" strokeWidth="1.4" />
            {(t as string).includes(" ") ? (
              <text x={x as number} y="100" textAnchor="middle" className="viz-t">
                <tspan x={x as number}>{(t as string).split(" ").slice(0, 2).join(" ")}</tspan>
                <tspan x={x as number} dy="18">{(t as string).split(" ").slice(2).join(" ")}</tspan>
              </text>
            ) : (
              <text x={x as number} y="105" textAnchor="middle" className="viz-t">
                {t}
              </text>
            )}
          </g>
        ))}
        <text x="525" y="150" textAnchor="middle" className="viz-s">
          where it stalls
        </text>
      </svg>
      {first || second ? (
        <div className="viz-cap">
          <p>{first}</p>
          <p>{second}</p>
        </div>
      ) : null}
    </figure>
  );
}

/* 2. Role convergence: product manager, designer and engineer into product builder. */
export function Converge() {
  const roles = [["Product manager", 52], ["Designer", 130], ["Engineer", 208]] as const;
  return (
    <figure className="viz">
      <svg viewBox="0 0 760 260" role="img" aria-label="Three roles, product manager, designer and engineer, converging into one product builder role">
        {roles.map(([t, y], i) => {
          const d = `M178 ${y} C 360 ${y}, 400 130, 540 130`;
          return (
            <g key={t}>
              <path d={d} fill="none" stroke="#7fa8dc" strokeWidth="1.4" className="viz-path" style={{ ["--d" as string]: `${i * 0.2}s` }} />
              <circle r="4" fill="#edf0f5" className="viz-dot flow" style={{ offsetPath: `path("${d}")`, animationDelay: `${i * 1.1}s` } as React.CSSProperties} />
              <rect x="20" y={y - 22} width="158" height="44" rx="6" fill="#0a0d12" stroke="rgba(180,195,220,0.28)" />
              <text x="99" y={y + 5} textAnchor="middle" className="viz-t">
                {t}
              </text>
            </g>
          );
        })}
        <rect x="540" y="96" width="200" height="68" rx="6" fill="#0a0d12" stroke="#7fa8dc" strokeWidth="1.4" />
        <text x="640" y="127" textAnchor="middle" className="viz-t">
          Product builder
        </text>
        <text x="640" y="148" textAnchor="middle" className="viz-s">
          judgment, context, intent
        </text>
      </svg>
    </figure>
  );
}

/* 3. Interactive industry map. Hover, focus or wait. */
type Ind = { name: string; line?: string };
export function IndustryMap({ items }: { items: Ind[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || reduced()) return;
    const id = setInterval(() => setActive((a) => (a + 1) % items.length), 2600);
    return () => clearInterval(id);
  }, [paused, items.length]);

  const cx = 320, cy = 320, ring = 205, lab = 238;
  const pos = (i: number, rad: number) => {
    const a = (i / items.length) * Math.PI * 2 - Math.PI / 2;
    return { x: Math.round((cx + rad * Math.cos(a)) * 10) / 10, y: Math.round((cy + rad * Math.sin(a)) * 10) / 10, c: Math.cos(a) };
  };
  // Inner end of each spoke sits on an ellipse that clears the center text block,
  // which is wider than it is tall. Side nodes start further out than top and bottom ones.
  const spokeStart = (i: number) => {
    const a = (i / items.length) * Math.PI * 2 - Math.PI / 2;
    const ex = 160, ey = 120;
    return (ex * ey) / Math.hypot(ey * Math.cos(a), ex * Math.sin(a));
  };
  const cur = items[active];
  return (
    <div className="imap" onMouseLeave={() => setPaused(false)}>
      <svg viewBox="-70 0 780 640" role="group" aria-label="Industry map. Select an industry to read more.">
        <circle cx={cx} cy={cy} r={ring} fill="none" stroke="rgba(180,195,220,0.12)" strokeDasharray="2 6" />
        <circle cx={cx} cy={cy} r="120" fill="none" stroke="rgba(180,195,220,0.08)" />
        {items.map((it, i) => {
          const p = pos(i, ring), l = pos(i, lab), s = pos(i, spokeStart(i));
          const on = i === active;
          return (
            <g
              key={it.name}
              className={`imap-node${on ? " on" : ""}`}
              role="button"
              tabIndex={0}
              aria-label={it.name}
              aria-pressed={on}
              onMouseEnter={() => { setActive(i); setPaused(true); }}
              onFocus={() => { setActive(i); setPaused(true); }}
              onBlur={() => setPaused(false)}
              onClick={() => { setActive(i); setPaused(true); }}
            >
              <line x1={s.x} y1={s.y} x2={p.x} y2={p.y} className="imap-spoke" />
              <circle cx={p.x} cy={p.y} r="18" fill="transparent" />
              <circle cx={p.x} cy={p.y} r={on ? 8 : 5} className="imap-dot" />
              <text x={l.x} y={l.y + 5} textAnchor={Math.abs(l.c) < 0.2 ? "middle" : l.c > 0 ? "start" : "end"} className="imap-label">
                {it.name}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="imap-center" aria-live="polite">
        <strong>{cur.name}</strong>
        {cur.line ? <span>{cur.line}</span> : null}
      </div>
    </div>
  );
}
