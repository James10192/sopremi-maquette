import { Fuel, Gauge, Wrench } from 'lucide-react'
import { Lock } from 'lucide-react'
import { Drawer } from '#/components/ui/Drawer'
import { Pill } from '#/components/ui/Pill'
import { CodeTag } from '#/components/ui/CodeTag'
import { Sparkline } from '#/components/ui/Sparkline'
import { useDispatch, useProject, useUserById } from '#/lib/store/hooks'
import { useCan } from '#/lib/store/useCan'
import { useStaff } from '#/lib/store/hooks'
import { useToast } from '#/components/ui/toast/ToastProvider'
import { enginStateLabel, enginStateTone } from '#/lib/labels'
import { formatDate, formatHours, initialsOf } from '#/lib/format'
import type { Engin, EnginState } from '#/lib/types'

const STATES: EnginState[] = ['disponible', 'affecte', 'maintenance', 'panne']

export function EnginDrawer({ engin, onClose }: { engin: Engin | null; onClose: () => void }) {
  const dispatch = useDispatch()
  const toast = useToast()
  const canChangeState = useCan('engin:state-change')
  const project = useProject(engin?.projectId ?? undefined)
  const operator = useStaff().find((s) => s.id === engin?.operatorId)
  const operatorUser = useUserById(operator?.id ?? null)
  void operatorUser // not used directly — placeholder for future expand

  if (!engin) return null

  function changeState(s: EnginState) {
    if (!engin) return
    dispatch({ type: 'engin/state', id: engin.id, state: s })
    toast.push({ kind: 'info', title: 'État modifié', body: `${engin.code} → ${enginStateLabel(s)}` })
  }

  return (
    <Drawer open={Boolean(engin)} onClose={onClose} eyebrow="Fiche engin" title={engin.name} width={520}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2">
          <CodeTag>{engin.code}</CodeTag>
          <Pill tone={enginStateTone(engin.state)}>{enginStateLabel(engin.state)}</Pill>
          <Pill tone="muted">{engin.brand}</Pill>
          <Pill tone="muted">{engin.type}</Pill>
        </div>

        <div className="surface-soft rounded-xl p-4">
          <p className="eyebrow-muted m-0">Charge des 12 dernières heures</p>
          <div className="mt-2 flex items-center justify-between">
            <Sparkline data={engin.recentLoad} width={300} height={56} />
            <span className="font-tech tabular text-[18px] font-semibold text-[var(--text)]">
              {engin.recentLoad[engin.recentLoad.length - 1]} <span className="text-[var(--text-muted)] text-[12px]">%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Vital icon={<Fuel className="h-3.5 w-3.5" />} label="Carburant" value={`${engin.fuelLevel}%`} />
          <Vital icon={<Gauge className="h-3.5 w-3.5" />} label="Uptime" value={`${engin.uptime}%`} />
          <Vital icon={<Wrench className="h-3.5 w-3.5" />} label="Heures jour" value={formatHours(engin.hoursToday)} />
        </div>

        <dl className="grid gap-3 text-[13px] sm:grid-cols-2">
          <Field label="Total heures" value={engin.totalHours.toLocaleString('fr-FR')} mono />
          <Field label="Dernière révision" value={formatDate(engin.lastService)} mono />
          <Field label="Prochaine révision" value={formatDate(engin.nextService)} mono />
          <Field label="Projet" value={project?.code ?? 'Aucun'} mono />
          <Field
            label="Opérateur"
            value={operator ? `${operator.firstName} ${operator.lastName} (${initialsOf(operator.firstName, operator.lastName)})` : '—'}
          />
        </dl>

        <div>
          <p className="label m-0 mb-2">Changer l’état</p>
          {canChangeState ? (
            <div className="grid grid-cols-2 gap-2">
              {STATES.map((s) => (
                <button
                  key={s}
                  onClick={() => changeState(s)}
                  className={`btn ${engin.state === s ? 'btn-primary' : ''}`}
                >
                  {enginStateLabel(s)}
                </button>
              ))}
            </div>
          ) : (
            <p className="m-0 inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.025)] px-3 py-2 text-[12px] text-[var(--text-muted)]">
              <Lock className="h-3.5 w-3.5" />
              Modification réservée à la DG / DOM.
            </p>
          )}
        </div>
      </div>
    </Drawer>
  )
}

function Vital({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.025)] p-3">
      <p className="m-0 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
        {icon} {label}
      </p>
      <p className="font-tech tabular m-0 mt-1 text-[16px] font-semibold text-[var(--text)]">{value}</p>
    </div>
  )
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="m-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">{label}</dt>
      <dd className={`m-0 mt-0.5 ${mono ? 'font-tech tabular' : ''} text-[var(--text)]`}>{value}</dd>
    </div>
  )
}
