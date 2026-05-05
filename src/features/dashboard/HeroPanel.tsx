import { ArrowUpRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useCurrentUser, usePendingValidations, useUnreadCount } from '#/lib/store/hooks'
import { roleLabel } from '#/lib/labels'
import { ProgressRing } from '#/components/ui/ProgressRing'
import { presetFor } from './rolePresets'
import { roleHookLine } from './roleHook'

export function HeroPanel() {
  const user = useCurrentUser()
  const pending = usePendingValidations().length
  const unread = useUnreadCount()
  const greeting = pickGreeting(new Date())
  const preset = user ? presetFor(user.role) : null

  return (
    <section className="surface-ember relative overflow-hidden rounded-2xl p-6 sm:p-8">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,130,0,0.25),transparent_60%)] blur-2xl" aria-hidden />
      <div className="relative grid gap-6 lg:grid-cols-[1.4fr_auto] lg:items-center">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="code-tag">[ COCKPIT · {user ? roleLabel(user.role).toUpperCase() : 'INVITÉ'} ]</span>
            <span className="pill text-[var(--ember-bright)]">
              <span className="dot dot-pulse text-[var(--ember)]" /> Données mock
            </span>
          </div>
          <h1 className="font-display m-0 text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.02] tracking-tight text-[var(--text)]">
            {greeting}, <span className="italic text-[var(--ember-bright)]">{user?.name.split(' ')[0]}</span>.
            <br />
            <span className="text-[var(--text-soft)]">{user ? roleHookLine(user.role) : 'SOPREMI Forge.'}</span>
          </h1>
          <p className="m-0 max-w-2xl text-[14.5px] leading-7 text-[var(--text-soft)]">
            {user?.role === 'dg' && (
              <>
                <span className="font-semibold text-[var(--warning-soft)]">{pending} demandes</span> attendent un
                arbitrage. Le rapport quotidien est consolidé à 08:15.
              </>
            )}
            {user?.role === 'dom' && (
              <>
                Engins, équipes, sites — tout le tableau opérationnel converge ici. {pending > 0 && (
                  <>Vous avez <span className="font-semibold text-[var(--warning-soft)]">{pending} demandes</span> ouvertes.</>
                )}
              </>
            )}
            {user?.role === 'pm' && (
              <>
                Pilotez vos chantiers, ouvrez de nouvelles demandes et suivez les arbitrages DG.{unread > 0 && (
                  <> <span className="font-semibold">{unread} notifications</span> non lues.</>
                )}
              </>
            )}
            {user?.role === 'rh' && (
              <>
                Pointage du jour, présences, certifications. Vous gardez le suivi des effectifs et signalez les anomalies.
              </>
            )}
          </p>
          <div className="flex flex-wrap gap-2">
            {preset && (
              <Link to={preset.primaryCta.to} className="btn btn-primary">
                {preset.primaryCta.label}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}
            {preset?.secondaryCta && (
              <Link to={preset.secondaryCta.to} className="btn">
                {preset.secondaryCta.label}
              </Link>
            )}
          </div>
        </div>

        <div className="relative flex flex-col items-center gap-3 lg:items-end">
          <ProgressRing value={84} label="84%" sublabel="Charge utile" size={132} thickness={10} />
          <p className="text-center text-[11px] uppercase tracking-[0.20em] text-[var(--text-muted)] lg:text-right">
            Productivité consolidée
            <br />
            <span className="font-tech text-[var(--text-faint)]">/ engins · équipes · ops</span>
          </p>
        </div>
      </div>
    </section>
  )
}

function pickGreeting(d: Date) {
  const h = d.getHours()
  if (h < 5) return 'Bonne nuit'
  if (h < 12) return 'Bonjour'
  if (h < 18) return 'Bon après-midi'
  return 'Bonsoir'
}
