import { createFileRoute } from '@tanstack/react-router'
import { PageHero } from '#/components/ui/PageHero'
import { PresenceSummary } from '#/features/personnel/PresenceSummary'
import { StaffTable } from '#/features/personnel/StaffTable'
import { useStaff } from '#/lib/store/hooks'

export const Route = createFileRoute('/ressources/personnel')({ component: PersonnelPage })

function PersonnelPage() {
  const staff = useStaff()

  return (
    <main className="flex flex-col gap-5 pb-6">
      <PageHero
        eyebrow="Ressources / Personnel"
        title={
          <>
            Les équipes,
            <br />
            <span className="italic">au cœur du terrain.</span>
          </>
        }
        description="Annuaire des collaborateurs, pointage du jour, certifications, affectations. Cliquez sur une ligne pour modifier la présence ou consulter la fiche."
        meta={
          <>
            <span className="code-tag">{staff.length} agents</span>
            <span className="code-tag">
              {staff.filter((s) => s.presence === 'present').length} présents
            </span>
            <span className="code-tag">
              {staff.filter((s) => s.presence === 'mission').length} en mission
            </span>
          </>
        }
      />
      <div className="grid gap-5 xl:grid-cols-[1fr_280px]">
        <StaffTable />
        <PresenceSummary />
      </div>
    </main>
  )
}
