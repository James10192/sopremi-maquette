type Slice = { label: string; value: number; color: string }

type Props = {
  data: Slice[]
  size?: number
  thickness?: number
  centerLabel?: string
  centerSublabel?: string
}

export function Donut({ data, size = 160, thickness = 22, centerLabel, centerSublabel }: Props) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1
  const r = (size - thickness) / 2
  const c = 2 * Math.PI * r
  let offset = 0

  return (
    <div className="flex items-center gap-5">
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth={thickness}
            fill="none"
          />
          {data.map((slice, i) => {
            const len = (slice.value / total) * c
            const dash = `${len} ${c - len}`
            const startOffset = -offset
            offset += len
            return (
              <circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={r}
                stroke={slice.color}
                strokeWidth={thickness}
                fill="none"
                strokeDasharray={dash}
                strokeDashoffset={startOffset}
                style={{ transition: 'stroke-dasharray 700ms cubic-bezier(0.16, 1, 0.3, 1)' }}
              />
            )
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerLabel && (
            <span className="font-display text-2xl font-semibold tracking-tight text-[var(--text)]">
              {centerLabel}
            </span>
          )}
          {centerSublabel && (
            <span className="mt-0.5 text-[9.5px] font-semibold uppercase tracking-[0.20em] text-[var(--text-muted)]">
              {centerSublabel}
            </span>
          )}
        </div>
      </div>
      <ul className="flex flex-col gap-1.5 text-sm">
        {data.map((slice) => (
          <li key={slice.label} className="flex items-center gap-2 text-[var(--text-soft)]">
            <span className="h-2 w-2 rounded-full" style={{ background: slice.color }} />
            <span className="text-[12.5px]">{slice.label}</span>
            <span className="ml-auto font-tech tabular text-[12.5px] text-[var(--text-muted)]">
              {slice.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
