import { Check } from 'lucide-react'

type Props = {
  steps: { id: string; title: string; eyebrow: string }[]
  currentIndex: number
  onJump?: (i: number) => void
}

export function Stepper({ steps, currentIndex, onJump }: Props) {
  return (
    <ol className="flex items-stretch gap-2 overflow-x-auto no-scrollbar pb-1">
      {steps.map((s, i) => {
        const done = i < currentIndex
        const active = i === currentIndex
        return (
          <li key={s.id} className="min-w-[180px] flex-1">
            <button
              type="button"
              onClick={onJump && i <= currentIndex ? () => onJump(i) : undefined}
              disabled={!onJump || i > currentIndex}
              className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                active
                  ? 'border-[rgba(255,130,0,0.42)] bg-[rgba(255,130,0,0.10)]'
                  : done
                  ? 'border-[var(--line)] bg-[rgba(78,177,133,0.06)]'
                  : 'border-[var(--line)] bg-[rgba(255,255,255,0.025)]'
              } ${!onJump || i > currentIndex ? 'cursor-default' : 'cursor-pointer hover:bg-[rgba(255,255,255,0.05)]'}`}
            >
              <span
                className={`font-tech inline-flex h-7 w-7 items-center justify-center rounded-md border text-[12px] font-semibold ${
                  active
                    ? 'border-[rgba(255,130,0,0.5)] bg-[rgba(255,130,0,0.18)] text-[#ffe2bf]'
                    : done
                    ? 'border-[rgba(78,177,133,0.4)] bg-[rgba(78,177,133,0.18)] text-[var(--success-soft)]'
                    : 'border-[var(--line-strong)] bg-[rgba(255,255,255,0.03)] text-[var(--text-muted)]'
                }`}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : (i + 1).toString().padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <p className="m-0 text-[10px] font-semibold uppercase tracking-[0.20em] text-[var(--text-muted)]">
                  {s.eyebrow}
                </p>
                <p
                  className={`m-0 truncate text-[13px] font-semibold ${
                    active ? 'text-[var(--text)]' : done ? 'text-[var(--text-soft)]' : 'text-[var(--text-muted)]'
                  }`}
                >
                  {s.title}
                </p>
              </div>
            </button>
          </li>
        )
      })}
    </ol>
  )
}
