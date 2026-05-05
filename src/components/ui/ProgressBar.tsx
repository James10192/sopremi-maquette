export function ProgressBar({
  value,
  className,
  gradient = true,
}: {
  value: number
  className?: string
  gradient?: boolean
}) {
  return (
    <div className={`h-1.5 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)] ${className ?? ''}`}>
      <div
        className={`h-full rounded-full ${gradient ? 'gradient-bar' : 'bg-[var(--ember)]'}`}
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          transition: 'width 720ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </div>
  )
}
