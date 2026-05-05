type Props = {
  data: number[]
  width?: number
  height?: number
  stroke?: string
  fill?: string
  strokeWidth?: number
  className?: string
  responsive?: boolean
}

export function Sparkline({
  data,
  width = 120,
  height = 36,
  stroke = 'var(--ember-bright)',
  fill = 'rgba(255, 130, 0, 0.18)',
  strokeWidth = 1.5,
  className,
  responsive,
}: Props) {
  if (data.length === 0) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = Math.max(1, max - min)
  const step = data.length > 1 ? width / (data.length - 1) : width

  const points = data.map((v, i) => {
    const x = i * step
    const y = height - ((v - min) / range) * height
    return [x, y] as const
  })

  const linePath = points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(' ')

  const areaPath = `${linePath} L ${(points[points.length - 1]?.[0] ?? 0).toFixed(2)} ${height} L 0 ${height} Z`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={responsive ? '100%' : width}
      height={responsive ? height : height}
      preserveAspectRatio={responsive ? 'none' : undefined}
      className={className}
      aria-hidden
    >
      <path d={areaPath} fill={fill} />
      <path d={linePath} stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}
