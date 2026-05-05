import { Download, FileSpreadsheet, FileText } from 'lucide-react'
import { useToast } from '#/components/ui/toast/ToastProvider'

const EXPORTS = [
  { id: 'rapport-jour', label: 'Rapport journalier', icon: FileText, format: 'PDF' },
  { id: 'consolide', label: 'Consolidé sites & marges', icon: FileSpreadsheet, format: 'XLSX' },
  { id: 'rh', label: 'Pointage du jour', icon: FileText, format: 'PDF' },
  { id: 'flotte', label: 'État de la flotte', icon: FileSpreadsheet, format: 'XLSX' },
]

export function ExportPanel() {
  const toast = useToast()
  return (
    <section className="surface flex flex-col gap-3 rounded-2xl p-5">
      <header>
        <p className="eyebrow m-0">Exports</p>
        <h3 className="font-display m-0 mt-1 text-xl font-semibold tracking-tight text-[var(--text)]">
          Tableaux à transmettre
        </h3>
      </header>
      <ul className="flex flex-col gap-2">
        {EXPORTS.map((e) => (
          <li
            key={e.id}
            className="flex items-center gap-3 rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-3"
          >
            <span className="rounded-md border border-[var(--line)] bg-[rgba(255,130,0,0.06)] p-2 text-[var(--ember-bright)]">
              <e.icon className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="m-0 text-[13px] font-semibold text-[var(--text)]">{e.label}</p>
              <p className="font-tech m-0 text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {e.format}
              </p>
            </div>
            <button
              className="btn btn-sm"
              onClick={() =>
                toast.push({
                  kind: 'info',
                  title: 'Export simulé',
                  body: `${e.label} (${e.format}) — généré dans la maquette.`,
                })
              }
            >
              <Download className="h-3.5 w-3.5" />
              Exporter
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
