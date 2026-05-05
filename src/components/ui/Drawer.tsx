import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'

type Props = {
  open: boolean
  onClose: () => void
  title?: string
  eyebrow?: string
  width?: number
  children: ReactNode
  footer?: ReactNode
}

export function Drawer({ open, onClose, title, eyebrow, width = 480, children, footer }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div role="dialog" aria-modal="true" aria-label={title}>
      <div className="scrim" onClick={onClose} />
      <aside
        className="drawer-panel fixed right-0 top-0 z-[81] flex h-full flex-col border-l border-[var(--line-strong)] bg-[#0a1219] shadow-[-18px_0_40px_-12px_rgba(0,0,0,0.6)]"
        style={{ width: Math.min(width, typeof window !== 'undefined' ? window.innerWidth - 24 : width) }}
      >
        <header className="flex items-start justify-between gap-4 border-b border-[var(--line)] p-5">
          <div>
            {eyebrow && <p className="eyebrow m-0 mb-1.5">{eyebrow}</p>}
            {title && (
              <h2 className="m-0 font-display text-2xl font-semibold tracking-tight text-[var(--text)]">
                {title}
              </h2>
            )}
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-icon" aria-label="Fermer">
            <X className="h-4 w-4" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
        {footer && <footer className="border-t border-[var(--line)] p-4">{footer}</footer>}
      </aside>
    </div>
  )
}
