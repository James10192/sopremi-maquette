import type { ReactNode } from 'react'

type Props = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  trailing?: ReactNode
  meta?: ReactNode
}

export function PageHero({ eyebrow, title, description, trailing, meta }: Props) {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-gradient-to-br from-[rgba(255,130,0,0.06)] via-transparent to-[rgba(29,177,187,0.05)] p-6 sm:p-8">
      <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,130,0,0.18),transparent_60%)] blur-2xl" />
      <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(29,177,187,0.14),transparent_60%)] blur-2xl" />

      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          {eyebrow && <p className="eyebrow m-0 mb-3">{eyebrow}</p>}
          <h1 className="font-display m-0 text-[clamp(1.9rem,3.4vw,2.8rem)] font-semibold leading-[1.04] tracking-tight text-[var(--text)]">
            {title}
          </h1>
          {description && (
            <p className="mt-3 mb-0 max-w-2xl text-[15px] leading-7 text-[var(--text-soft)]">{description}</p>
          )}
          {meta && <div className="mt-4 flex flex-wrap items-center gap-2">{meta}</div>}
        </div>
        {trailing && <div className="flex flex-wrap items-center gap-2">{trailing}</div>}
      </div>
    </header>
  )
}
