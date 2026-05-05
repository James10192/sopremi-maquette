function hashColor(seed: string) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0
  const palette = [
    'from-[#ff8200]/30 to-[#c25c2c]/20 border-[rgba(255,130,0,0.24)]',
    'from-[#1db1bb]/30 to-[#0f7079]/20 border-[rgba(29,177,187,0.24)]',
    'from-[#d4a542]/30 to-[#9a7414]/20 border-[rgba(212,165,66,0.24)]',
    'from-[#4eb185]/30 to-[#2e6f54]/20 border-[rgba(78,177,133,0.24)]',
    'from-[#5fa8d3]/30 to-[#3a6b8a]/20 border-[rgba(95,168,211,0.24)]',
  ]
  return palette[Math.abs(h) % palette.length]
}

export function Avatar({
  initials,
  size = 36,
  seed,
}: {
  initials: string
  size?: number
  seed?: string
}) {
  const cls = hashColor(seed ?? initials)
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border bg-gradient-to-br ${cls} font-tech font-semibold tracking-wide text-[var(--text)]`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}
      aria-hidden
    >
      {initials}
    </span>
  )
}
