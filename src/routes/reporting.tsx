import { createFileRoute } from '@tanstack/react-router'
import { PageHero } from '#/components/ui/PageHero'
import { BudgetBars } from '#/features/reporting/BudgetBars'
import { ExportPanel } from '#/features/reporting/ExportPanel'
import { FleetUptime } from '#/features/reporting/FleetUptime'
import { MarginRanking } from '#/features/reporting/MarginRanking'

export const Route = createFileRoute('/reporting')({ component: ReportingPage })

function ReportingPage() {
  return (
    <main className="flex flex-col gap-5 pb-6">
      <PageHero
        eyebrow="Reporting"
        title={
          <>
            Lecture
            <br />
            <span className="italic">consolidée du jour.</span>
          </>
        }
        description="Tableaux de bord, exports et indicateurs partagés avec la DG. Cette maquette présente les visualisations attendues pour le produit final."
      />
      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <BudgetBars />
        <MarginRanking />
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <FleetUptime />
        <ExportPanel />
      </div>
    </main>
  )
}
