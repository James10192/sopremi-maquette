import { Link } from '@tanstack/react-router'
import type { ComponentType } from 'react'
import { BarChart3, MapPinned, ShieldCheck, Users } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-xl">
      <nav className="page-wrap flex flex-wrap items-center gap-x-4 gap-y-3 py-3 sm:py-4">
        <Link to="/" className="flex items-center gap-3 no-underline">
          <img
            src="/brand/sopremi-logo.png"
            alt="SOPREMI"
            className="h-9 w-auto sm:h-10"
          />
          <div className="hidden sm:block">
            <p className="m-0 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              Application de pilotage
            </p>
            <p className="m-0 text-sm font-semibold text-[var(--text)]">
              SOPREMI maquette
            </p>
          </div>
        </Link>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <a href="#projets" className="nav-link">
            <BuildingBlock icon={MapPinned} label="Projets" />
          </a>
          <a href="#ressources" className="nav-link">
            <BuildingBlock icon={Users} label="Ressources" />
          </a>
          <a href="#validation" className="nav-link">
            <BuildingBlock icon={ShieldCheck} label="Validation" />
          </a>
          <a href="#reporting" className="nav-link">
            <BuildingBlock icon={BarChart3} label="Reporting" />
          </a>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-lg border border-[rgba(255,130,0,0.34)] bg-[rgba(255,130,0,0.12)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ffd19a]">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
            Démo
          </span>
        </div>
      </nav>
    </header>
  )
}

function BuildingBlock({
  icon: Icon,
  label,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.03)] px-3 py-2 text-sm font-semibold text-[var(--text)] transition hover:bg-[rgba(255,255,255,0.06)]">
      <Icon className="h-4 w-4 text-[var(--accent)]" />
      {label}
    </span>
  )
}
