import { ArrowUpRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useCurrentUser, usePendingValidations, useUnreadCount } from '#/lib/store/hooks'
import { HeroDateline } from './HeroDateline'
import { TickerStrip } from './TickerStrip'
import { presetFor } from './rolePresets'
import { roleHookLine } from './roleHook'

function pickGreeting(d: Date) {
  const h = d.getHours()
  if (h < 5) return 'Bonne nuit'
  if (h < 12) return 'Bonjour'
  if (h < 18) return 'Bon après-midi'
  return 'Bonsoir'
}

export function HeroPanel() {
  const user = useCurrentUser()
  const pending = usePendingValidations().length
  const unread = useUnreadCount()
  const greeting = pickGreeting(new Date())
  const preset = user ? presetFor(user.role) : null

  return (
    <section className="surface-soft overflow-hidden rounded-xl">
      <div className="flex flex-col gap-7 px-6 pt-6 pb-7 sm:px-8 sm:pt-7 sm:pb-8">
        <HeroDateline />

        <div className="grid items-end gap-6 lg:grid-cols-[1.5fr_auto]">
          <div className="space-y-4">
            <h1 className="font-display m-0 text-[clamp(2.1rem,3.6vw,3.4rem)] font-semibold leading-[0.98] tracking-[-0.018em] text-[var(--text)]">
              <span className="text-[var(--text-muted)]">{greeting},</span>
              <br />
              <span className="italic text-[var(--ember-bright)]">{user?.name ?? '—'}</span>.
              <br />
              <span className="text-[var(--text-soft)]">{user ? roleHookLine(user.role) : ''}</span>
            </h1>

            <p className="m-0 max-w-2xl border-l border-[var(--line-strong)] pl-4 text-[14.5px] leading-7 text-[var(--text-soft)]">
              {user?.role === 'dg' && (
                <>
                  <span className="font-semibold text-[var(--warning-soft)]">{pending} demandes</span> attendent un
                  arbitrage. Le rapport quotidien est consolidé à 08:15.
                </>
              )}
              {user?.role === 'dom' && (
                <>
                  Engins, équipes, sites — tout le tableau opérationnel converge ici.{' '}
                  {pending > 0 && (
                    <>
                      Vous avez <span className="font-semibold text-[var(--warning-soft)]">{pending} demandes</span>{' '}
                      ouvertes côté DG.
                    </>
                  )}
                </>
              )}
              {user?.role === 'pm' && (
                <>
                  Pilotez vos chantiers, ouvrez de nouvelles demandes, suivez les arbitrages DG.
                  {unread > 0 && (
                    <>
                      {' '}
                      <span className="font-semibold">{unread} notifications</span> non lues.
                    </>
                  )}
                </>
              )}
              {user?.role === 'rh' && (
                <>
                  Pointage du jour, présences, certifications. Le suivi des effectifs et le signalement des anomalies
                  passent ici.
                </>
              )}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
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

          <aside className="hidden flex-col gap-2 border-l border-[var(--line)] pl-6 lg:flex">
            <span className="font-tech text-[10.5px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
              Productivité
            </span>
            <span className="font-tech tabular text-[3.6rem] font-semibold leading-none text-[var(--text)]">
              84
              <span className="ml-0.5 text-[1.6rem] text-[var(--text-muted)]">%</span>
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              charge utile <span className="text-[var(--text-faint)]">/ engins · équipes · ops</span>
            </span>
          </aside>
        </div>
      </div>

      <TickerStrip />
    </section>
  )
}
