import { createFileRoute } from '@tanstack/react-router'
import { ActiveProjects } from '#/features/dashboard/ActiveProjects'
import { ActivityFeed } from '#/features/dashboard/ActivityFeed'
import { CriticalRibbon } from '#/features/dashboard/CriticalRibbon'
import { FleetSnapshot } from '#/features/dashboard/FleetSnapshot'
import { HeroPanel } from '#/features/dashboard/HeroPanel'
import { KpiRow } from '#/features/dashboard/KpiRow'
import { Pipeline } from '#/features/dashboard/Pipeline'
import { ValidationPulse } from '#/features/dashboard/ValidationPulse'
import { PresenceSummary } from '#/features/personnel/PresenceSummary'
import { useCurrentUser } from '#/lib/store/hooks'
import { presetFor } from '#/features/dashboard/rolePresets'

export const Route = createFileRoute('/')({ component: Dashboard })

function Dashboard() {
  const user = useCurrentUser()
  if (!user) return null
  const preset = presetFor(user.role)

  return (
    <main className="flex flex-col gap-5 pb-6">
      <HeroPanel />
      <CriticalRibbon />
      <KpiRow />

      {(preset.showActiveProjects || preset.showFleetSnapshot) && (
        <div className={`grid gap-5 ${preset.showActiveProjects && preset.showFleetSnapshot ? 'xl:grid-cols-[1.55fr_1fr]' : ''}`}>
          {preset.showActiveProjects && <ActiveProjects />}
          {preset.showFleetSnapshot && <FleetSnapshot />}
          {preset.showPresenceSummary && !preset.showFleetSnapshot && <PresenceSummary />}
        </div>
      )}

      {(preset.showValidationPulse || preset.showActivityFeed || preset.showPipeline) && (
        <div className={`grid gap-5 ${
          [preset.showValidationPulse, preset.showActivityFeed, preset.showPipeline].filter(Boolean).length === 3
            ? 'xl:grid-cols-3'
            : 'xl:grid-cols-2'
        }`}>
          {preset.showValidationPulse && <ValidationPulse />}
          {preset.showActivityFeed && <ActivityFeed />}
          {preset.showPipeline && <Pipeline />}
        </div>
      )}
    </main>
  )
}
