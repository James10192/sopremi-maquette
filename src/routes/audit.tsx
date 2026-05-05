import { createFileRoute } from '@tanstack/react-router'
import { PageHero } from '#/components/ui/PageHero'
import { AuditList } from '#/features/audit/AuditList'
import { useAuditTrail } from '#/features/audit/useAuditTrail'

export const Route = createFileRoute('/audit')({ component: AuditPage })

function AuditPage() {
  const all = useAuditTrail()
  const approved = all.filter((e) => e.action === 'approuve').length
  const refused = all.filter((e) => e.action === 'refuse').length

  return (
    <main className="flex flex-col gap-5 pb-6">
      <PageHero
        eyebrow="Audit · Historique"
        title={
          <>
            Toutes les décisions,
            <br />
            <span className="italic">en un seul fil.</span>
          </>
        }
        description="Toute action sensible est consignée ici : approbations DG, refus avec motif, créations de projet, changements de statut. Le journal est immuable et exportable."
        meta={
          <>
            <span className="code-tag">{all.length} entrées</span>
            <span className="code-tag !border-[rgba(78,177,133,0.30)] !text-[var(--success-soft)]">
              {approved} approuvées
            </span>
            <span className="code-tag !border-[rgba(227,85,105,0.30)] !text-[var(--danger-soft)]">
              {refused} refusées
            </span>
          </>
        }
      />
      <AuditList />
    </main>
  )
}
