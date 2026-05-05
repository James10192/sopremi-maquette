import { useNavigate } from '@tanstack/react-router'
import { Search, Truck, Users, Compass, FileText } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useCommandResults, type CommandResult } from './useCommandResults'

const ICON: Record<CommandResult['kind'], typeof Search> = {
  project: Compass,
  engin: Truck,
  staff: Users,
  page: FileText,
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const results = useCommandResults(query)

  useEffect(() => {
    if (!open) return
    setHighlight(0)
    setQuery('')
    setTimeout(() => inputRef.current?.focus(), 30)
  }, [open])

  useEffect(() => {
    setHighlight(0)
  }, [query])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHighlight((h) => Math.min(results.length - 1, h + 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlight((h) => Math.max(0, h - 1))
      } else if (e.key === 'Enter' && results[highlight]) {
        e.preventDefault()
        navigate({ to: results[highlight].to })
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, results, highlight, navigate, onClose])

  if (!open) return null

  return (
    <div role="dialog" aria-modal="true" aria-label="Recherche globale">
      <div className="scrim" onClick={onClose} />
      <div className="fixed inset-x-0 top-[12vh] z-[81] flex justify-center px-4">
        <div className="surface modal-panel flex w-full max-w-[640px] flex-col overflow-hidden rounded-2xl">
          <div className="flex items-center gap-3 border-b border-[var(--line)] px-4 py-3">
            <Search className="h-4 w-4 text-[var(--text-muted)]" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Chercher un projet, un engin, un agent, une page…"
              className="w-full bg-transparent text-[14px] text-[var(--text)] outline-none placeholder:text-[var(--text-faint)]"
            />
            <span className="kbd">Esc</span>
          </div>

          <ul className="max-h-[60vh] overflow-y-auto p-1.5">
            {results.length === 0 && (
              <li className="px-4 py-8 text-center text-[12.5px] text-[var(--text-muted)]">
                Aucun résultat pour « {query} ».
              </li>
            )}
            {results.map((r, i) => {
              const Icon = ICON[r.kind]
              const active = i === highlight
              return (
                <li key={`${r.kind}-${r.to}-${r.tag}-${i}`}>
                  <button
                    type="button"
                    onMouseEnter={() => setHighlight(i)}
                    onClick={() => {
                      navigate({ to: r.to })
                      onClose()
                    }}
                    className={`group flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition ${
                      active ? 'bg-[rgba(255,130,0,0.10)] text-[var(--text)]' : 'text-[var(--text-soft)] hover:bg-[rgba(255,255,255,0.04)]'
                    }`}
                  >
                    <span className={`rounded-md border border-[var(--line)] p-1.5 ${active ? 'text-[var(--ember-bright)]' : 'text-[var(--text-muted)]'}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="m-0 truncate text-[13.5px] font-semibold">{r.label}</p>
                      <p className="m-0 truncate text-[11.5px] text-[var(--text-muted)]">{r.sub}</p>
                    </div>
                    <span className="font-tech text-[10.5px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                      {r.tag}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          <footer className="flex items-center justify-between gap-3 border-t border-[var(--line)] bg-[rgba(255,255,255,0.02)] px-4 py-2.5 text-[11px] text-[var(--text-muted)]">
            <span className="inline-flex items-center gap-2">
              <span className="kbd">↑</span><span className="kbd">↓</span> naviguer
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="kbd">⏎</span> ouvrir
            </span>
            <span className="font-tech">{results.length} résultats</span>
          </footer>
        </div>
      </div>
    </div>
  )
}
