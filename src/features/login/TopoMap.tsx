// Stylized topographic map of SOPREMI mining sites — pure SVG, no lib
const SITES = [
  { x: 32, y: 48, label: 'ITY' },
  { x: 22, y: 60, label: 'Zouan' },
  { x: 38, y: 38, label: 'Tongon' },
  { x: 54, y: 56, label: 'Yaouré' },
  { x: 60, y: 42, label: 'Bonikro' },
  { x: 70, y: 64, label: 'Hiré' },
  { x: 26, y: 78, label: 'Tabou' },
]

export function TopoMap() {
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="topo-glow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="rgba(255,130,0,0.18)" />
          <stop offset="60%" stopColor="rgba(255,130,0,0.04)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id="topo-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,130,0,0.7)" />
          <stop offset="100%" stopColor="rgba(29,177,187,0.6)" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="100" height="100" fill="url(#topo-glow)" />

      {/* contour curves */}
      <g fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.18">
        {Array.from({ length: 14 }).map((_, i) => (
          <path
            key={i}
            d={`M -5 ${10 + i * 6} Q ${20 + i * 1.5} ${i * 5} ${50 + i * 1.2} ${10 + i * 6 + 2} T 110 ${10 + i * 6}`}
          />
        ))}
      </g>

      {/* sites — pulsing dots + connecting lines */}
      <g>
        {SITES.map((s, i) => (
          <g key={s.label}>
            <circle cx={s.x} cy={s.y} r="0.9" fill="url(#topo-stroke)" />
            <circle
              cx={s.x}
              cy={s.y}
              r="2.2"
              fill="none"
              stroke="rgba(255,130,0,0.35)"
              strokeWidth="0.18"
              style={{ transformOrigin: `${s.x}px ${s.y}px`, animation: `dot-pulse 2.6s ease-out ${i * 0.4}s infinite` }}
            />
            <text
              x={s.x + 1.6}
              y={s.y + 0.6}
              fill="rgba(255,237,219,0.55)"
              fontSize="1.5"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="0.06em"
            >
              {s.label.toUpperCase()}
            </text>
          </g>
        ))}
        {/* network lines */}
        {SITES.slice(0, -1).map((s, i) => {
          const next = SITES[i + 1]
          return (
            <line
              key={i}
              x1={s.x}
              y1={s.y}
              x2={next.x}
              y2={next.y}
              stroke="url(#topo-stroke)"
              strokeOpacity="0.25"
              strokeWidth="0.16"
              strokeDasharray="0.6 0.6"
            />
          )
        })}
      </g>
    </svg>
  )
}
