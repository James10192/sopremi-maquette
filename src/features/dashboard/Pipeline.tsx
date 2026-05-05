import { ArrowDown } from 'lucide-react'
import { Pill } from '#/components/ui/Pill'

const STEPS = [
  { code: '01', title: 'Demande DOM', body: 'Projet saisi, site et moyens décrits', tone: 'info' as const },
  { code: '02', title: 'Vérification RH', body: 'Personnel affecté, présence confirmée', tone: 'success' as const },
  { code: '03', title: 'Contrôle matériel', body: 'Engins, disponibilité et maintenance', tone: 'warning' as const },
  { code: '04', title: 'Validation DG', body: 'Autorisation finale avant lancement', tone: 'danger' as const },
]

export function Pipeline() {
  return (
    <section className="surface rounded-2xl p-6">
      <div className="mb-5">
        <p className="eyebrow m-0">Flux métier</p>
        <h2 className="font-display m-0 mt-1 text-xl font-semibold tracking-tight text-[var(--text)]">
          Chaîne de décision
        </h2>
        <p className="m-0 mt-1 text-[13px] leading-6 text-[var(--text-muted)]">
          DOM, RH, matériel et DG : un même circuit, validé étape par étape.
        </p>
      </div>
      <ol className="flex flex-col gap-2.5">
        {STEPS.map((s, i) => (
          <li key={s.code}>
            <article className="flex items-start gap-3 rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.025)] p-3.5">
              <span className="font-tech tabular inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--line-strong)] bg-[rgba(255,130,0,0.10)] text-[13px] font-semibold text-[var(--ember-bright)]">
                {s.code}
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="m-0 text-[13.5px] font-semibold text-[var(--text)]">{s.title}</p>
                  <Pill tone={s.tone}>Étape</Pill>
                </div>
                <p className="m-0 mt-0.5 text-[12.5px] leading-6 text-[var(--text-muted)]">{s.body}</p>
              </div>
            </article>
            {i < STEPS.length - 1 && (
              <div className="my-1 flex justify-center">
                <ArrowDown className="h-3.5 w-3.5 text-[var(--text-faint)]" />
              </div>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}
