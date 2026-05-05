import { Check, ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export type SelectOption<V extends string = string> = {
  value: V
  label: string
  hint?: string
}

type Props<V extends string> = {
  value: V | ''
  onChange: (v: V) => void
  options: SelectOption<V>[]
  placeholder?: string
  className?: string
  disabled?: boolean
  ariaLabel?: string
}

export function Select<V extends string = string>({
  value,
  onChange,
  options,
  placeholder = '—',
  className,
  disabled,
  ariaLabel,
}: Props<V>) {
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState<number>(-1)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onClick(e: MouseEvent) {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHighlight((h) => Math.min(options.length - 1, h + 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlight((h) => Math.max(0, h - 1))
      } else if (e.key === 'Enter' && highlight >= 0) {
        e.preventDefault()
        onChange(options[highlight].value)
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, highlight, options, onChange])

  const selected = options.find((o) => o.value === value)

  return (
    <div ref={root} className={`relative ${className ?? ''}`}>
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => {
          if (disabled) return
          setOpen((v) => !v)
          setHighlight(options.findIndex((o) => o.value === value))
        }}
        className={`field flex items-center justify-between gap-3 text-left ${open ? 'ring-1 ring-[rgba(255,130,0,0.4)]' : ''} ${
          disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
        }`}
      >
        <span className={`truncate ${selected ? 'text-[var(--text)]' : 'text-[var(--text-faint)]'}`}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform ${open ? 'rotate-180 text-[var(--ember-bright)]' : ''}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="surface scale-in absolute left-0 right-0 top-full z-30 mt-1.5 overflow-hidden rounded-xl p-1.5"
        >
          <ul className="max-h-64 overflow-y-auto">
            {options.map((o, i) => {
              const isSelected = o.value === value
              const isHighlighted = i === highlight
              return (
                <li key={o.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setHighlight(i)}
                    onClick={() => {
                      onChange(o.value)
                      setOpen(false)
                    }}
                    className={`flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-[13.5px] transition ${
                      isSelected
                        ? 'bg-[rgba(255,130,0,0.16)] text-[#ffd19a] shadow-[inset_0_1px_0_rgba(255,200,140,0.16)]'
                        : isHighlighted
                        ? 'bg-[rgba(255,255,255,0.05)] text-[var(--text)]'
                        : 'text-[var(--text-soft)]'
                    }`}
                  >
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate">{o.label}</span>
                      {o.hint && (
                        <span className="font-tech mt-0.5 text-[10.5px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                          {o.hint}
                        </span>
                      )}
                    </span>
                    {isSelected && <Check className="h-3.5 w-3.5 shrink-0 text-[var(--ember-bright)]" />}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
