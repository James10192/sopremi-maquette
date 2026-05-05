import { TopoMap } from './TopoMap'

const STATS = [
  { label: 'Sites couverts', value: '14' },
  { label: 'Engins suivis', value: '20' },
  { label: 'Effectifs sur site', value: '186' },
  { label: 'Marge consolidée', value: '+13,9 %' },
]

export function LoginAside() {
  return (
    <aside className="relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-[var(--line)] bg-gradient-to-br from-[rgba(255,130,0,0.10)] via-[rgba(20,28,38,0.6)] to-[rgba(29,177,187,0.10)] p-7 lg:p-9">
      <TopoMap />
      <div className="relative z-10 flex flex-1 flex-col gap-6">
        <div>
          <p className="eyebrow m-0">SOPREMI / Forge</p>
          <h2 className="font-display mt-2 text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-[var(--text)]">
            Le cockpit
            <br />
            <span className="italic text-[var(--ember-bright)] flame-flicker">de l'exploitation</span>
            <br />
            minière.
          </h2>
          <p className="mt-3 max-w-md text-[14px] leading-7 text-[var(--text-soft)]">
            Pilotez les chantiers, les engins et la présence en temps réel. Validez les décisions sensibles depuis la
            DG, suivez la rentabilité jour par jour, déclenchez les rapports en un geste.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-[var(--line)] bg-[rgba(8,12,18,0.55)] p-3.5 backdrop-blur-md"
            >
              <p className="m-0 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                {s.label}
              </p>
              <p className="font-display tabular m-0 mt-1.5 text-2xl font-semibold text-[var(--text)]">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between text-[11px] text-[var(--text-muted)]">
          <span className="inline-flex items-center gap-2">
            <span className="dot dot-pulse text-[var(--success)]" />
            14 sites en ligne
          </span>
          <span className="font-tech">v1.0.0 · maquette</span>
        </div>
      </div>
    </aside>
  )
}
