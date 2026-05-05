type Bar = { label: string; value: number; color?: string }

type Props = {
  data: Bar[]
  height?: number
  barColor?: string
  showValues?: boolean
  className?: string
}

export function BarChart({ data, height = 180, barColor = 'var(--ember)', showValues, className }: Props) {
  const max = Math.max(1, ...data.map((d) => d.value))
  return (
    <div className={className}>
      <div className="relative" style={{ height }}>
        <div className="absolute inset-0 flex items-end gap-2">
          {data.map((bar, i) => {
            const h = (bar.value / max) * 100
            return (
              <div key={i} className="flex flex-1 flex-col items-center justify-end gap-2">
                {showValues && (
                  <span className="font-tech tabular text-[10.5px] text-[var(--text-muted)]">{bar.value}</span>
                )}
                <div
                  className="w-full rounded-t-md"
                  style={{
                    background: bar.color ?? barColor,
                    height: `${h}%`,
                    boxShadow: '0 -4px 12px rgba(255,130,0,0.18)',
                    animation: 'rise-in 600ms cubic-bezier(0.16, 1, 0.3, 1) both',
                    animationDelay: `${i * 40}ms`,
                  }}
                />
              </div>
            )
          })}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-[var(--line)]" />
      </div>
      <div className="mt-2 flex gap-2">
        {data.map((b) => (
          <div
            key={b.label}
            className="flex-1 text-center font-tech text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]"
          >
            {b.label}
          </div>
        ))}
      </div>
    </div>
  )
}
