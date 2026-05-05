import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

type Props = {
  icon: LucideIcon
  title: string
  description?: string
  action?: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export function EmptyState({ icon: Icon, title, description, action, size = 'md' }: Props) {
  const pad = size === 'sm' ? 'p-6' : size === 'lg' ? 'p-12' : 'p-9'
  return (
    <div className={`surface-soft flex flex-col items-center gap-3 rounded-xl text-center ${pad}`}>
      <span className="rounded-full border border-[var(--line)] bg-[rgba(255,130,0,0.08)] p-3 text-[var(--ember-bright)]">
        <Icon className="h-5 w-5" />
      </span>
      <div className="max-w-sm">
        <p className="m-0 font-display text-lg font-semibold text-[var(--text)]">{title}</p>
        {description && (
          <p className="m-0 mt-1 text-[13px] leading-6 text-[var(--text-muted)]">{description}</p>
        )}
      </div>
      {action}
    </div>
  )
}
