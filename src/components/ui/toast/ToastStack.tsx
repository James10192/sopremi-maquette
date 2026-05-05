import { CheckCircle2, Info, OctagonAlert, TriangleAlert, X } from 'lucide-react'
import type { Toast, ToastKind } from './types'

const ICON: Record<ToastKind, typeof Info> = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  danger: OctagonAlert,
}

const STYLE: Record<ToastKind, string> = {
  info: 'border-[rgba(95,168,211,0.34)] text-[var(--info-soft)]',
  success: 'border-[rgba(78,177,133,0.36)] text-[var(--success-soft)]',
  warning: 'border-[rgba(240,164,64,0.36)] text-[var(--warning-soft)]',
  danger: 'border-[rgba(227,85,105,0.36)] text-[var(--danger-soft)]',
}

export function ToastStack({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: string) => void }) {
  if (toasts.length === 0) return null
  return (
    <div className="toast-stack">
      {toasts.map((t) => {
        const Icon = ICON[t.kind]
        return (
          <div
            key={t.id}
            role="status"
            className={`toast-enter surface flex items-start gap-3 rounded-xl border p-3.5 ${STYLE[t.kind]}`}
          >
            <Icon className="mt-0.5 h-4 w-4" />
            <div className="min-w-0 flex-1">
              <p className="m-0 text-[13px] font-semibold text-[var(--text)]">{t.title}</p>
              {t.body && <p className="m-0 mt-0.5 text-[12px] leading-5 text-[var(--text-muted)]">{t.body}</p>}
            </div>
            <button
              onClick={() => onDismiss(t.id)}
              aria-label="Fermer"
              className="text-[var(--text-faint)] transition hover:text-[var(--text)]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
