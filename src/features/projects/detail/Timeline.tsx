import { Pill } from '#/components/ui/Pill'
import { formatTime, timeAgo } from '#/lib/format'
import type { TimelineEvent } from '#/lib/types'

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <section className="surface flex flex-col gap-3 rounded-2xl p-5">
      <header>
        <p className="eyebrow m-0">Journal du projet</p>
        <h3 className="font-display m-0 mt-1 text-lg font-semibold tracking-tight text-[var(--text)]">
          Chronologie
        </h3>
      </header>
      <ol className="relative flex flex-col gap-3 pl-6">
        <span
          className="pointer-events-none absolute bottom-2 left-2.5 top-2 w-px bg-gradient-to-b from-[var(--ember)]/40 via-[var(--line-strong)] to-transparent"
          aria-hidden
        />
        {events.map((e) => (
          <li key={e.id} className="relative">
            <span
              className="absolute -left-[18px] top-2 inline-flex h-3 w-3 items-center justify-center rounded-full border border-[rgba(255,130,0,0.4)] bg-[#0a1219]"
              aria-hidden
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--ember-bright)]" />
            </span>
            <div className="rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.025)] p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="m-0 text-[12.5px] font-semibold text-[var(--text)]">{e.title}</p>
                <Pill tone={e.tone}>{formatTime(e.at)}</Pill>
              </div>
              {e.body && <p className="m-0 mt-1 text-[12px] leading-5 text-[var(--text-muted)]">{e.body}</p>}
              <p className="font-tech m-0 mt-1 text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                {timeAgo(e.at)}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
