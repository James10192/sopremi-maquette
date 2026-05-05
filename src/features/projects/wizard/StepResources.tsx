import { Truck, Users } from 'lucide-react'
import { CodeTag } from '#/components/ui/CodeTag'
import { Pill } from '#/components/ui/Pill'
import { Avatar } from '#/components/ui/Avatar'
import { useEngins, useStaff } from '#/lib/store/hooks'
import { enginStateLabel, enginStateTone, presenceLabel, presenceTone } from '#/lib/labels'
import { initialsOf } from '#/lib/format'
import type { Draft } from './types'

export function StepResources({
  draft,
  onChange,
}: {
  draft: Draft
  onChange: (patch: Partial<Draft>) => void
}) {
  const engins = useEngins()
  const staff = useStaff()

  function toggleEngin(id: string) {
    const has = draft.enginIds.includes(id)
    onChange({ enginIds: has ? draft.enginIds.filter((x) => x !== id) : [...draft.enginIds, id] })
  }
  function toggleStaff(id: string) {
    const has = draft.staffIds.includes(id)
    onChange({ staffIds: has ? draft.staffIds.filter((x) => x !== id) : [...draft.staffIds, id] })
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section>
        <header className="mb-2 flex items-center justify-between">
          <p className="label m-0 inline-flex items-center gap-2"><Truck className="h-3.5 w-3.5" /> Engins</p>
          <span className="font-tech text-[11px] text-[var(--text-muted)]">
            {draft.enginIds.length} sélectionnés
          </span>
        </header>
        <ul className="flex max-h-[360px] flex-col gap-1.5 overflow-y-auto pr-1">
          {engins.map((e) => {
            const active = draft.enginIds.includes(e.id)
            return (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => toggleEngin(e.id)}
                  className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                    active
                      ? 'border-[rgba(255,130,0,0.36)] bg-[rgba(255,130,0,0.10)]'
                      : 'border-[var(--line)] bg-[rgba(255,255,255,0.025)] hover:bg-[rgba(255,255,255,0.05)]'
                  }`}
                >
                  <span className="font-tech inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[var(--line)] bg-[rgba(255,130,0,0.06)] text-[10px] text-[var(--ember-bright)]">
                    {e.code.split('-').slice(0, 2).join('')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <CodeTag>{e.code}</CodeTag>
                      <Pill tone={enginStateTone(e.state)}>{enginStateLabel(e.state)}</Pill>
                    </div>
                    <p className="m-0 mt-1 truncate text-[13px] font-semibold text-[var(--text)]">{e.name}</p>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section>
        <header className="mb-2 flex items-center justify-between">
          <p className="label m-0 inline-flex items-center gap-2"><Users className="h-3.5 w-3.5" /> Personnel</p>
          <span className="font-tech text-[11px] text-[var(--text-muted)]">
            {draft.staffIds.length} sélectionnés
          </span>
        </header>
        <ul className="flex max-h-[360px] flex-col gap-1.5 overflow-y-auto pr-1">
          {staff.map((s) => {
            const active = draft.staffIds.includes(s.id)
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => toggleStaff(s.id)}
                  className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                    active
                      ? 'border-[rgba(255,130,0,0.36)] bg-[rgba(255,130,0,0.10)]'
                      : 'border-[var(--line)] bg-[rgba(255,255,255,0.025)] hover:bg-[rgba(255,255,255,0.05)]'
                  }`}
                >
                  <Avatar initials={initialsOf(s.firstName, s.lastName)} seed={s.id} size={36} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <CodeTag>{s.matricule}</CodeTag>
                      <Pill tone={presenceTone(s.presence)}>{presenceLabel(s.presence)}</Pill>
                    </div>
                    <p className="m-0 mt-1 truncate text-[13px] font-semibold text-[var(--text)]">
                      {s.firstName} {s.lastName}
                    </p>
                    <p className="m-0 truncate text-[11.5px] text-[var(--text-muted)]">{s.role}</p>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
