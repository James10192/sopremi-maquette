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
        <div className="flex h-full items-stretch gap-2">
          {data.map((bar, i) => {
            const h = Math.max(2, (bar.value / max) * 100)
            return (
              <div key={i} className="relative flex h-full flex-1">
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-t-md"
                  style={{
                    background: bar.color ?? barColor,
                    height: `${h}%`,
                    boxShadow: '0 -4px 12px rgba(255,130,0,0.18)',
                    animation: 'rise-in 600ms cubic-bezier(0.16, 1, 0.3, 1) both',
                    animationDelay: `${i * 40}ms`,
                  }}
                />
                {showValues && (
                  <span
                    className="font-tech tabular pointer-events-none absolute left-0 right-0 -translate-y-1.5 text-center text-[10.5px] text-[var(--text-muted)]"
                    style={{ bottom: `${h}%` }}
                  >
                    {bar.value}
                  </span>
                )}
              </div>
            )
          })}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[var(--line)]" />
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
