const TICKS = (() => {
  const out = []
  for (let a = 0; a < 72; a++) {
    const t = (a * 5 * Math.PI) / 180
    out.push({
      x1: 60 + Math.sin(t) * 50,
      y1: 60 - Math.cos(t) * 50,
      x2: 60 + Math.sin(t) * 54,
      y2: 60 - Math.cos(t) * 54,
    })
  }
  return out
})()

export default function Stamp() {
  return (
    <div className="stamp" aria-hidden="true">
      <svg viewBox="0 0 120 120" role="img" aria-label="Stempel monogram JARLE LAUCH">
        <circle cx="60" cy="60" r="56" className="st-outer" />
        <circle cx="60" cy="60" r="46" className="st-inner" />
        {TICKS.map((t, i) => (
          <line
            key={i}
            className="tk"
            x1={t.x1.toFixed(2)}
            y1={t.y1.toFixed(2)}
            x2={t.x2.toFixed(2)}
            y2={t.y2.toFixed(2)}
          />
        ))}
        <text x="60" y="53" textAnchor="middle" className="st-sig">
          Σ
        </text>
        <line x1="38" y1="66" x2="82" y2="66" className="st-hair" />
        <text x="60" y="85" textAnchor="middle" className="st-mono">
          J·LAUCH
        </text>
      </svg>
    </div>
  )
}