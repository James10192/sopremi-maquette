import { createFileRoute } from '@tanstack/react-router'
import { PageHero } from '#/components/ui/PageHero'
import { ValidationList } from '#/features/validation/ValidationList'
import { useValidations } from '#/lib/store/hooks'

export const Route = createFileRoute('/validation')({ component: ValidationPage })

function ValidationPage() {
  const validations = useValidations()
  const pending = validations.filter((v) => v.state === 'attente').length
  const critical = validations.filter((v) => v.priority === 'critique' && v.state === 'attente').length

  return (
    <main className="flex flex-col gap-5 pb-6">
      <PageHero
        eyebrow="Validation DG"
        title={
          <>
            Arbitrer
            <br />
            <span className="italic text-[var(--ember-bright)]">les décisions sensibles.</span>
          </>
        }
        description="La file de validation centralise toutes les actions à fort impact : nouveaux projets, rallonges budgétaires, transferts de site, recrutements, sorties de panne."
        meta={
          <>
            <span className="code-tag">{pending} en attente</span>
            {critical > 0 && (
              <span className="code-tag !border-[rgba(227,85,105,0.36)] !bg-[rgba(227,85,105,0.10)] !text-[var(--danger-soft)]">
                {critical} critique{critical > 1 ? 's' : ''}
              </span>
            )}
          </>
        }
      />
      <ValidationList />
    </main>
  )
}
