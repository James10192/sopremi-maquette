import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CommandPalette } from '#/features/command/CommandPalette'

export function HeaderSearch() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isMeta = e.metaKey || e.ctrlKey
      if (isMeta && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2.5 rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.025)] px-3 py-1.5 text-[13px] text-[var(--text-muted)] transition hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--text)] md:flex"
        aria-label="Recherche globale"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden lg:inline">Rechercher partout</span>
        <span className="hidden lg:inline-flex items-center gap-1">
          <span className="kbd">⌘</span>
          <span className="kbd">K</span>
        </span>
      </button>
      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </>
  )
}
