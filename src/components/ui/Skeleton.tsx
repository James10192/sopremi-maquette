export function Skeleton({
  className,
  height = 14,
  width,
  rounded = 6,
}: {
  className?: string
  height?: number | string
  width?: number | string
  rounded?: number
}) {
  return (
    <span
      className={`shimmer block ${className ?? ''}`}
      style={{ height, width, borderRadius: rounded }}
      aria-hidden
    />
  )
}
