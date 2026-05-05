import { Link } from '@tanstack/react-router'
import { ArrowUpRight, CheckCircle2, FileText, GitBranch, Sparkles, X } from 'lucide-react'
import { actionLabel, type AuditEntry } from './useAuditTrail'
import { formatTime, timeAgo, formatDate } from '#/lib/format'

const ICON: Record<AuditEntry['action'], typeof CheckCircle2> = {
  approuve: CheckCircle2,
  refuse: X,
  cree: Sparkles,
  statut: GitBranch,
  autre: FileText,
}

const TONE: Record<AuditEntry['action'], string> = {
  approuve: 'border-[rgba(78,177,133,0.30)] bg-[rgba(78,177,133,0.10)] text-[var(--success-soft)]',
  refuse: 'border-[rgba(227,85,105,0.30)] bg-[rgba(227,85,105,0.10)] text-[var(--danger-soft)]',
  cree: 'border-[rgba(255,130,0,0.30)] bg-[rgba(255,130,0,0.10)] text-[var(--ember-bright)]',
  statut: 'border-[rgba(95,168,211,0.30)] bg-[rgba(95,168,211,0.10)] text-[var(--info-soft)]',
  autre: 'border-[var(--line)] bg-[rgba(255,255,255,0.025)] text-[var(--text-muted)]',
}

export function AuditEntryRow({ entry }: { entry: AuditEntry }) {
  const Icon = ICON[entry.action]
  const Wrapper: any = entry.link ? Link : 'div'
  const wrapperProps = entry.link ? { to: entry.link } : {}

  return (
    <Wrapper
      {...wrapperProps}
      className="group flex items-start gap-3 rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-3 no-underline transition hover:bg-[rgba(255,255,255,0.04)]"
    >
      <span className={`shrink-0 rounded-md border p-2 ${TONE[entry.action]}`}>
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {actionLabel(entry.action)}
          </span>
          {entry.actorName && (
            <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--text-faint)]">
              · {entry.actorName}
            </span>
          )}
        </div>
        <p className="m-0 mt-0.5 text-[13px] font-semibold text-[var(--text)]">{entry.title}</p>
        <p className="m-0 mt-1 line-clamp-2 text-[12px] leading-5 text-[var(--text-muted)]">{entry.body}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-0.5 text-right">
        <span className="font-tech tabular text-[11px] uppercase tracking-[0.16em] text-[var(--text-soft)]">
          {formatTime(entry.at)}
        </span>
        <span className="font-tech text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
          {timeAgo(entry.at)} · {formatDate(entry.at)}
        </span>
        {entry.link && (
          <ArrowUpRight className="mt-1 h-3.5 w-3.5 text-[var(--text-faint)] transition group-hover:text-[var(--ember-bright)]" />
        )}
      </div>
    </Wrapper>
  )
}
