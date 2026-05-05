import { Award, Briefcase, Building2, HardHat, ShieldCheck, Truck, Users, Wrench } from 'lucide-react'
import { KpiCard } from '#/components/ui/KpiCard'
import {
  useCurrentUser,
  useEngins,
  usePendingValidations,
  useProjects,
  useStaff,
} from '#/lib/store/hooks'
import { formatPercent, formatXOF } from '#/lib/format'

export function KpiRow() {
  const user = useCurrentUser()
  const projects = useProjects()
  const engins = useEngins()
  const staff = useStaff()
  const pending = usePendingValidations().length

  const activeProjects = projects.filter((p) => p.status === 'actif' || p.status === 'attente_dg').length
  const fleetAvail = engins.filter((e) => e.state !== 'maintenance' && e.state !== 'panne').length
  const presentNow = staff.filter((s) => s.presence === 'present' || s.presence === 'mission').length
  const presenceRatio = Math.round((presentNow / Math.max(1, staff.length)) * 100)

  if (!user) return null

  const cards = (() => {
    switch (user.role) {
      case 'dg': {
        const totalBudget = projects
          .filter((p) => p.status !== 'cloture')
          .reduce((s, p) => s + p.budget, 0)
        const avgMargin =
          projects.reduce((s, p) => s + p.rentability, 0) / Math.max(1, projects.length)
        return [
          { label: 'Validations', value: pending.toString(), detail: 'Demandes ouvertes', icon: ShieldCheck, tone: 'warning' as const, trend: [3, 4, 5, 4, 3, 4, 5, 5, 4, pending] },
          { label: 'Budget actif', value: formatXOF(totalBudget), detail: 'Cumul des projets non clôturés', icon: Briefcase, tone: 'gold' as const, trend: [60, 62, 64, 66, 68, 72, 74, 76, 78, 80] },
          { label: 'Marge moyenne', value: formatPercent(avgMargin, true), detail: 'Rentabilité consolidée', icon: Award, tone: 'success' as const, trend: [10, 11, 12, 11, 13, 14, 13, 14, 13, Math.round(avgMargin)] },
          { label: 'Projets actifs', value: activeProjects.toString(), detail: 'Hors clôturés', icon: Building2, tone: 'ember' as const, trend: [10, 11, 11, 12, 12, 13, 13, 14, 14, activeProjects] },
        ]
      }
      case 'dom':
        return [
          { label: 'Flotte disponible', value: `${fleetAvail} / ${engins.length}`, detail: '2 engins en maintenance, 1 en panne', icon: Truck, tone: 'success' as const, trend: [18, 18, 17, 18, 18, 17, 18, 19, fleetAvail] },
          { label: 'Projets actifs', value: activeProjects.toString(), detail: 'En supervision directe', icon: Building2, tone: 'ember' as const, trend: [10, 11, 12, 12, 13, 14, 14, 14, activeProjects] },
          { label: 'Présence terrain', value: `${presenceRatio} %`, detail: 'Synchronisé pointage 08:15', icon: HardHat, tone: 'sea' as const, trend: [88, 90, 92, 91, 93, 94, 95, presenceRatio] },
          { label: 'Validations soumises', value: pending.toString(), detail: 'Vos demandes en attente', icon: ShieldCheck, tone: 'warning' as const, trend: [2, 3, 4, 3, 4, 5, pending] },
        ]
      case 'pm': {
        const myProjects = projects.filter((p) => p.owner === user.name)
        const myActive = myProjects.filter((p) => p.status === 'actif').length
        const myAttente = myProjects.filter((p) => p.status === 'attente_dg').length
        const myAvgProgress = Math.round(
          myProjects.reduce((s, p) => s + p.progress, 0) / Math.max(1, myProjects.length),
        )
        const myMargin =
          myProjects.reduce((s, p) => s + p.rentability, 0) / Math.max(1, myProjects.length)
        return [
          { label: 'Mes projets actifs', value: myActive.toString(), detail: 'Sous votre supervision', icon: Building2, tone: 'ember' as const, trend: [1, 2, 2, 3, 3, 3, myActive] },
          { label: 'En attente DG', value: myAttente.toString(), detail: 'Arbitrages que vous suivez', icon: ShieldCheck, tone: 'warning' as const, trend: [0, 1, 1, 2, 1, 1, myAttente] },
          { label: 'Avancement moyen', value: `${myAvgProgress} %`, detail: 'Tous vos chantiers confondus', icon: Wrench, tone: 'sea' as const, trend: [20, 30, 40, 45, 50, 55, myAvgProgress] },
          { label: 'Marge moyenne', value: formatPercent(myMargin, true), detail: 'Sur vos projets', icon: Award, tone: 'success' as const, trend: [12, 13, 14, 14, 15, 16, Math.round(myMargin)] },
        ]
      }
      case 'rh': {
        const presentToday = staff.filter((s) => s.presence === 'present').length
        const onLeave = staff.filter((s) => s.presence === 'conge').length
        const sick = staff.filter((s) => s.presence === 'maladie').length
        return [
          { label: 'Effectifs', value: staff.length.toString(), detail: 'Total enregistré', icon: Users, tone: 'sea' as const, trend: [10, 11, 11, 12, 12, 12, staff.length] },
          { label: 'Présents', value: presentToday.toString(), detail: `${presenceRatio} % du total`, icon: HardHat, tone: 'success' as const, trend: [9, 10, 11, 11, 12, 11, presentToday] },
          { label: 'Absences justifiées', value: staff.filter((s) => s.presence === 'absent_justifie').length.toString(), detail: `${onLeave} en congé · ${sick} en maladie`, icon: ShieldCheck, tone: 'warning' as const, trend: [1, 2, 1, 2, 3, 2, 1] },
          { label: 'Validations RH', value: pending.toString(), detail: 'Demandes ouvertes', icon: Briefcase, tone: 'ember' as const, trend: [2, 3, 4, 3, 4, 5, pending] },
        ]
      }
    }
  })()

  return (
    <div className="stagger-fast grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c) => (
        <KpiCard key={c.label} {...c} />
      ))}
    </div>
  )
}
