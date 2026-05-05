type Props = {
  value: number // 0-100
  size?: number
  thickness?: number
  trackColor?: string
  fromColor?: string
  toColor?: string
  label?: string
  sublabel?: string
}

export function ProgressRing({
  value,
  size = 96,
  thickness = 8,
  trackColor = 'rgba(255,255,255,0.06)',
  fromColor = 'var(--ember)',
  toColor = 'var(--gold)',
  label,
  sublabel,
}: Props) {
  const r = (size - thickness) / 2
  const c = 2 * Math.PI * r
  const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c
  const id = `pr-${fromColor.replace(/[^a-z]/gi, '')}-${toColor.replace(/[^a-z]/gi, '')}`

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={fromColor} />
            <stop offset="100%" stopColor={toColor} />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={trackColor} strokeWidth={thickness} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={`url(#${id})`}
          strokeWidth={thickness}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 700ms cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label != null && (
          <span className="font-tech tabular text-lg font-semibold text-[var(--text)]">{label}</span>
        )}
        {sublabel && (
          <span className="mt-0.5 text-[9.5px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  )
}
