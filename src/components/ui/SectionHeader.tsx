import type { ReactNode } from 'react'

type Props = {
  eyebrow?: string
  title: string
  description?: string
  trailing?: ReactNode
}

export function SectionHeader({ eyebrow, title, description, trailing }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex max-w-3xl flex-col gap-1.5">
        {eyebrow && <p className="eyebrow m-0">{eyebrow}</p>}
        <h2 className="font-display m-0 text-2xl font-semibold tracking-tight text-[var(--text)] sm:text-[1.95rem]">
          {title}
        </h2>
        {description && (
          <p className="m-0 text-[14px] leading-7 text-[var(--text-muted)]">{description}</p>
        )}
      </div>
      {trailing && <div className="flex flex-wrap items-center gap-2">{trailing}</div>}
    </div>
  )
}
