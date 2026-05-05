import type { ReactNode } from 'react'

export type TabItem = {
  id: string
  label: string
  count?: number
  icon?: ReactNode
}

type Props = {
  items: TabItem[]
  active: string
  onChange: (id: string) => void
  size?: 'sm' | 'md'
}

export function Tabs({ items, active, onChange, size = 'md' }: Props) {
  const cls = size === 'sm' ? 'px-3 py-1.5 text-[12px]' : 'px-4 py-2 text-[13px]'
  return (
    <div role="tablist" className="surface-flat inline-flex items-center gap-1 rounded-lg p-1">
      {items.map((t) => {
        const isActive = t.id === active
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(t.id)}
            className={`relative inline-flex items-center gap-2 rounded-md font-semibold transition ${cls} ${
              isActive
                ? 'bg-[rgba(255,130,0,0.16)] text-[#ffd19a] shadow-[inset_0_1px_0_rgba(255,200,140,0.16)]'
                : 'text-[var(--text-muted)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--text)]'
            }`}
          >
            {t.icon}
            {t.label}
            {t.count != null && (
              <span
                className={`font-tech tabular text-[10.5px] font-semibold ${
                  isActive ? 'text-[var(--ember-bright)]' : 'text-[var(--text-muted)]'
                }`}
              >
                {t.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
