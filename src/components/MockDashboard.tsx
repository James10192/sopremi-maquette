import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  CircleGauge,
  FileText,
  HardHat,
  MonitorPlay,
  ShieldCheck,
  Truck,
  Users,
  Wrench,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

type Tone = 'success' | 'warning' | 'danger' | 'info' | 'muted'

type ToneProps = {
  tone: Tone
  label: string
}

const kpis = [
  {
    label: 'Projets actifs',
    value: '14',
    detail: '6 en supervision directe',
    icon: Building2,
    tone: 'info' as const,
  },
  {
    label: 'Flotte disponible',
    value: '18 / 20',
    detail: '2 engins en maintenance',
    icon: Truck,
    tone: 'success' as const,
  },
  {
    label: 'Présence du personnel',
    value: '94 %',
    detail: 'Pointage du jour clôturé à 08:15',
    icon: Users,
    tone: 'success' as const,
  },
  {
    label: 'Validations DG',
    value: '4',
    detail: 'Demandes en attente de décision',
    icon: ShieldCheck,
    tone: 'warning' as const,
  },
]

const pipeline = [
  {
    step: 'Demande DOM',
    state: 'Projet saisi, site et moyens décrits',
    tone: 'info' as const,
  },
  {
    step: 'Vérification RH',
    state: 'Personnel affecté, présence confirmée',
    tone: 'success' as const,
  },
  {
    step: 'Contrôle matériel',
    state: 'Engins, disponibilité et maintenance',
    tone: 'warning' as const,
  },
  {
    step: 'Validation DG',
    state: 'Autorisation finale avant lancement',
    tone: 'danger' as const,
  },
]

const projects = [
  {
    name: 'Extension fosse Nord',
    site: 'Mine d’ITY',
    type: 'Location d’engins + chauffeurs',
    progress: 72,
    status: 'En supervision',
    statusTone: 'success' as const,
    rentability: '+18,4 %',
    risk: 'Faible',
    riskTone: 'success' as const,
    owner: 'DOM principal',
  },
  {
    name: 'Terrassement bloc C',
    site: 'Zouan-Hounien',
    type: 'Mise à disposition opérateurs',
    progress: 49,
    status: 'À renforcer',
    statusTone: 'warning' as const,
    rentability: '+11,2 %',
    risk: 'Moyen',
    riskTone: 'warning' as const,
    owner: 'Chef de projet',
  },
  {
    name: 'Maintenance chargeuse 950H',
    site: 'Atelier central',
    type: 'Intervention planifiée',
    progress: 28,
    status: 'Sous contrôle',
    statusTone: 'info' as const,
    rentability: '+7,9 %',
    risk: 'Sous surveillance',
    riskTone: 'info' as const,
    owner: 'Direction technique',
  },
]

const equipment = [
  {
    name: 'Bulldozer D9R',
    state: 'Disponible',
    stateTone: 'success' as const,
    uptime: '96 %',
    note: '8 h 15 min d’exploitation',
  },
  {
    name: 'Pelle hydraulique',
    state: 'En maintenance',
    stateTone: 'warning' as const,
    uptime: '68 %',
    note: 'Révision préventive planifiée',
  },
  {
    name: 'Camion benne',
    state: 'Affecté',
    stateTone: 'info' as const,
    uptime: '89 %',
    note: 'Service chantier Sud',
  },
]

const staff = [
  {
    name: 'Kouadio S.',
    role: 'Conducteur D9R',
    presence: 'Présent',
    presenceTone: 'success' as const,
    project: 'Extension fosse Nord',
  },
  {
    name: 'Ahoua M.',
    role: 'Opérateur pelle',
    presence: 'Absence justifiée',
    presenceTone: 'warning' as const,
    project: 'Terrain en attente',
  },
  {
    name: 'Bamba A.',
    role: 'Superviseur chantier',
    presence: 'Présent',
    presenceTone: 'success' as const,
    project: 'Terrassement bloc C',
  },
]

const approvals = [
  {
    title: 'Nouveau projet - forage pilote',
    owner: 'DOM Ouest',
    when: 'Il y a 8 min',
    tone: 'warning' as const,
  },
  {
    title: 'Ajout opérateur senior',
    owner: 'DRH',
    when: 'Il y a 22 min',
    tone: 'info' as const,
  },
  {
    title: 'Changement de site projet',
    owner: 'Chef de projet',
    when: 'Il y a 41 min',
    tone: 'danger' as const,
  },
]

const alerts = [
  {
    icon: Bell,
    title: 'Rapport quotidien envoyé à la DG',
    text: 'Synthèse des performances, points de présence et travaux à valider.',
  },
  {
    icon: AlertTriangle,
    title: '2 engins à surveiller',
    text: 'Consommation anormale détectée sur la chargeuse et le camion benne.',
  },
  {
    icon: FileText,
    title: 'Export de rentabilité prêt',
    text: 'Tableau consolidé par site, projet et type d’affectation.',
  },
]

function toneClasses(tone: Tone) {
  switch (tone) {
    case 'success':
      return 'border-[rgba(46,145,102,0.38)] bg-[rgba(46,145,102,0.14)] text-[#7ee2b4]'
    case 'warning':
      return 'border-[rgba(255,130,0,0.38)] bg-[rgba(255,130,0,0.14)] text-[#ffbd6b]'
    case 'danger':
      return 'border-[rgba(221,4,43,0.34)] bg-[rgba(221,4,43,0.12)] text-[#ff8b99]'
    case 'info':
      return 'border-[rgba(28,177,187,0.34)] bg-[rgba(28,177,187,0.12)] text-[#85e5ea]'
    default:
      return 'border-[var(--line)] bg-[rgba(255,255,255,0.04)] text-[var(--muted)]'
  }
}

function TonePill({ tone, label }: ToneProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${toneClasses(
        tone,
      )}`}
    >
      {label}
    </span>
  )
}

function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string
  title: string
  text: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="section-eyebrow m-0">{eyebrow}</p>
      <h2 className="m-0 text-2xl font-semibold tracking-tight text-[var(--text)] sm:text-[2rem]">
        {title}
      </h2>
      <p className="m-0 max-w-3xl text-sm leading-6 text-[var(--muted)] sm:text-[15px]">
        {text}
      </p>
    </div>
  )
}

function StatCard({
  label,
  value,
  detail,
  icon: Icon,
  tone,
}: {
  label: string
  value: string
  detail: string
  icon: LucideIcon
  tone: Tone
}) {
  return (
    <article className="panel-card rounded-lg border p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="m-0 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            {label}
          </p>
          <p className="m-0 text-3xl font-semibold tracking-tight text-[var(--text)]">
            {value}
          </p>
        </div>
        <span className={`rounded-lg border p-2 ${toneClasses(tone)}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-4 mb-0 text-sm leading-6 text-[var(--muted)]">
        {detail}
      </p>
    </article>
  )
}

function Row({
  left,
  middle,
  right,
}: {
  left: string
  middle: string
  right: ReactNode
}) {
  return (
    <div className="grid gap-3 border-b border-[var(--line)] py-4 last:border-b-0 md:grid-cols-[1.4fr_1fr_auto] md:items-center">
      <div>
        <p className="m-0 text-sm font-semibold text-[var(--text)]">{left}</p>
        <p className="m-0 mt-1 text-xs text-[var(--muted)]">{middle}</p>
      </div>
      <div className="text-sm text-[var(--muted)]">{right}</div>
    </div>
  )
}

export function MockDashboard() {
  return (
    <main className="page-wrap pb-16 pt-6 sm:pb-20 sm:pt-8">
      <section className="panel-card overflow-hidden rounded-lg border">
        <div className="grid lg:grid-cols-[1.25fr_0.95fr]">
          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <TonePill tone="info" label="Maquette web" />
              <TonePill tone="success" label="SOPREMI" />
              <TonePill tone="muted" label="TanStack Start" />
            </div>

            <div className="mt-6 flex flex-col gap-5">
              <div className="max-w-3xl">
                <p className="section-eyebrow m-0">Centre de pilotage</p>
                <h1 className="display-title mt-3 text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.98] font-semibold tracking-tight text-[var(--text)]">
                  Un cockpit pour suivre les projets, les engins et la présence en
                  temps réel.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
                  Cette version montre l’apparence de l’application que SOPREMI
                  pourrait livrer à l’entreprise: validation DG, supervision des
                  chantiers, affectation des chauffeurs, pointage et calcul de
                  rentabilité, avec des données de démonstration.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#projets"
                  className="inline-flex items-center gap-2 rounded-lg border border-[rgba(255,130,0,0.36)] bg-[rgba(255,130,0,0.14)] px-4 py-2.5 text-sm font-semibold text-[#ffd19a] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(255,130,0,0.2)]"
                >
                  Voir les projets
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#validation"
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.04)] px-4 py-2.5 text-sm font-semibold text-[var(--text)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.07)]"
                >
                  Ouvrir la validation
                </a>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {kpis.map((item) => (
                <StatCard key={item.label} {...item} />
              ))}
            </div>
          </div>

          <aside className="border-t border-[var(--line)] bg-[rgba(255,255,255,0.03)] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-eyebrow m-0">Statut live</p>
                <h2 className="mt-2 mb-0 text-xl font-semibold tracking-tight text-[var(--text)]">
                  Direction générale
                </h2>
              </div>
              <TonePill tone="success" label="En ligne" />
            </div>

            <div className="mt-6 grid gap-3">
              <div className="rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.04)] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="rounded-lg border border-[rgba(255,130,0,0.34)] bg-[rgba(255,130,0,0.12)] p-2 text-[#ffbd6b]">
                      <MonitorPlay className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="m-0 text-sm font-semibold text-[var(--text)]">
                        Rapport du jour prêt
                      </p>
                      <p className="m-0 text-xs text-[var(--muted)]">
                        Mise à jour envoyée à 08:15
                      </p>
                    </div>
                  </div>
                  <TonePill tone="success" label="Validé" />
                </div>
              </div>

              <div className="rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.04)] p-4">
                <div className="flex items-center gap-3">
                  <span className="rounded-lg border border-[rgba(28,177,187,0.34)] bg-[rgba(28,177,187,0.12)] p-2 text-[#85e5ea]">
                    <CircleGauge className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="m-0 text-sm font-semibold text-[var(--text)]">
                      Taux de productivité moyen
                    </p>
                    <p className="m-0 text-xs text-[var(--muted)]">
                      Engins, équipes et opérations
                    </p>
                  </div>
                </div>
                <div className="mt-4 h-2 rounded-full bg-[rgba(255,255,255,0.08)]">
                  <div className="h-2 w-[84%] rounded-full bg-[linear-gradient(90deg,var(--teal),var(--orange))]" />
                </div>
                <p className="mt-3 mb-0 text-sm font-semibold text-[var(--text)]">
                  84 % de charge utile
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.03)] p-4">
                <p className="m-0 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  Rentabilité
                </p>
                <p className="mt-2 mb-0 text-2xl font-semibold text-[var(--text)]">
                  +13,9 %
                </p>
                <p className="mt-1 mb-0 text-sm text-[var(--muted)]">
                  Calculée à partir des coûts, charges et production déclarée.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.03)] p-4">
                <p className="m-0 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  Alertes
                </p>
                <p className="mt-2 mb-0 text-2xl font-semibold text-[var(--text)]">
                  2
                </p>
                <p className="mt-1 mb-0 text-sm text-[var(--muted)]">
                  Un engin à contrôler et une absence à régulariser.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="projets" className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="panel-card rounded-lg border p-6 sm:p-8">
          <SectionHeader
            eyebrow="Projets"
            title="Lecture rapide des opérations"
            text="Chaque carte résume l’état d’un chantier: site, type d’affectation, progression, rentabilité et niveau de risque."
          />

          <div className="mt-6 space-y-4">
            {projects.map((project) => (
              <article
                key={project.name}
                className="rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.03)] p-4"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-3">
                    <div>
                      <p className="m-0 text-base font-semibold text-[var(--text)]">
                        {project.name}
                      </p>
                      <p className="m-0 mt-1 text-sm text-[var(--muted)]">
                        {project.site} - {project.type}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <TonePill tone={project.statusTone} label={project.status} />
                      <TonePill tone={project.riskTone} label={`Risque ${project.risk}`} />
                      <TonePill tone="muted" label={project.owner} />
                    </div>
                  </div>

                  <div className="w-full max-w-sm">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[var(--muted)]">Progression</span>
                      <span className="font-semibold text-[var(--text)]">
                        {project.progress} %
                      </span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-[rgba(255,255,255,0.08)]">
                      <div
                        className="h-2 rounded-full bg-[linear-gradient(90deg,var(--orange),var(--teal))]"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-3">
                        <p className="m-0 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                          Rentabilité
                        </p>
                        <p className="mt-1 mb-0 font-semibold text-[var(--text)]">
                          {project.rentability}
                        </p>
                      </div>
                      <div className="rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-3">
                        <p className="m-0 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                          Site
                        </p>
                        <p className="mt-1 mb-0 font-semibold text-[var(--text)]">
                          Opération active
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <section
            id="validation"
            className="panel-card rounded-lg border p-6 sm:p-8"
          >
            <SectionHeader
              eyebrow="Validation DG"
              title="Demandes à approuver"
              text="Avant toute modification sensible, la direction générale voit la demande et tranche dans la file de validation."
            />

            <div className="mt-6 space-y-3">
              {approvals.map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.03)] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="m-0 text-sm font-semibold text-[var(--text)]">
                        {item.title}
                      </p>
                      <p className="m-0 mt-1 text-xs text-[var(--muted)]">
                        {item.owner} - {item.when}
                      </p>
                    </div>
                    <TonePill tone={item.tone} label="En attente" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="ressources" className="panel-card rounded-lg border p-6 sm:p-8">
            <SectionHeader
              eyebrow="Personnel et matériel"
              title="Affectations du jour"
              text="Le mockup met en avant la présence, la disponibilité et le lien entre machine et opérateur."
            />

            <div className="mt-6 space-y-4">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  Équipements
                </p>
                <div className="space-y-3">
                  {equipment.map((item) => (
                    <div
                      key={item.name}
                      className="rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.03)] p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="m-0 text-sm font-semibold text-[var(--text)]">
                            {item.name}
                          </p>
                          <p className="m-0 mt-1 text-xs text-[var(--muted)]">
                            {item.note}
                          </p>
                        </div>
                        <TonePill tone={item.stateTone} label={item.state} />
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="m-0 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                            Disponibilité
                          </p>
                          <p className="mt-1 mb-0 font-semibold text-[var(--text)]">
                            {item.uptime}
                          </p>
                        </div>
                        <div>
                          <p className="m-0 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                            Statut
                          </p>
                          <p className="mt-1 mb-0 font-semibold text-[var(--text)]">
                            Opération terrain
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  Personnel
                </p>
                <div className="space-y-3">
                  {staff.map((item) => (
                    <div
                      key={item.name}
                      className="rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.03)] p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="m-0 text-sm font-semibold text-[var(--text)]">
                            {item.name}
                          </p>
                          <p className="m-0 mt-1 text-xs text-[var(--muted)]">
                            {item.role} - {item.project}
                          </p>
                        </div>
                        <TonePill tone={item.presenceTone} label={item.presence} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section id="reporting" className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="panel-card rounded-lg border p-6 sm:p-8">
          <SectionHeader
            eyebrow="Reporting"
            title="Lecture consolidée du jour"
            text="Cette zone sert à montrer ce que la DG reçoit: activité, rentabilité, production et écarts à corriger."
          />

          <div className="mt-6 rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.03)] p-4">
            <Row
              left="08:15 - Pointage ouvert"
              middle="Présences synchronisées depuis le terrain"
              right={<TonePill tone="success" label="Conforme" />}
            />
            <Row
              left="09:20 - Projet validé"
              middle="Extension fosse Nord autorisé par la DG"
              right={<TonePill tone="info" label="Publié" />}
            />
            <Row
              left="10:05 - Maintenance engin"
              middle="Chargeuse retirée du planning pour contrôle"
              right={<TonePill tone="warning" label="À suivre" />}
            />
            <Row
              left="11:30 - Alerte production"
              middle="Rendement sous la cible sur le bloc C"
              right={<TonePill tone="danger" label="Surveiller" />}
            />
          </div>
        </section>

        <section className="panel-card rounded-lg border p-6 sm:p-8">
          <SectionHeader
            eyebrow="Fonctions"
            title="Ce que montre la maquette"
            text="La démonstration illustre déjà les modules clés attendus pour SOPREMI, sans connexion à Convex ni données réelles."
          />

          <div className="mt-6 space-y-3">
            {[
              {
                icon: ShieldCheck,
                title: 'Comptes et accès',
                text: 'Rôles séparés pour la DG, la RH, les chefs de projet et les opérateurs.',
              },
              {
                icon: Wrench,
                title: 'Équipements et maintenance',
                text: 'Statut, disponibilité, panne, reprise et affectation par chantier.',
              },
              {
                icon: HardHat,
                title: 'Personnel et pointage',
                text: 'Présence, absence justifiée, affectation à une machine ou un projet.',
              },
              {
                icon: BarChart3,
                title: 'Rentabilité et rapports',
                text: 'Calculs de marge, synthèse quotidienne et export des tableaux de bord.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.03)] p-4"
              >
                <div className="flex items-start gap-3">
                  <span className="rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.04)] p-2 text-[#ffd19a]">
                    <item.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="m-0 text-sm font-semibold text-[var(--text)]">
                      {item.title}
                    </p>
                    <p className="m-0 mt-1 text-sm leading-6 text-[var(--muted)]">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <section className="panel-card rounded-lg border p-6 sm:p-8">
          <SectionHeader
            eyebrow="Flux métier"
            title="Chaîne de décision"
            text="Cette vue aide à expliquer comment le DOM, la RH et la DG travaillent dans le produit final."
          />

          <div className="mt-6 space-y-3">
            {pipeline.map((item, index) => (
              <div
                key={item.step}
                className="flex items-start gap-4 rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.03)] p-4"
              >
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.04)] text-sm font-semibold text-[var(--text)]">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="m-0 text-sm font-semibold text-[var(--text)]">
                      {item.step}
                    </p>
                    <TonePill tone={item.tone} label="Étape" />
                  </div>
                  <p className="m-0 mt-1 text-sm leading-6 text-[var(--muted)]">
                    {item.state}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel-card rounded-lg border p-6 sm:p-8">
          <SectionHeader
            eyebrow="Notifications"
            title="Journal de supervision"
            text="Une file d’événements montre comment la maquette peut intégrer le realtime plus tard sans changer son langage visuel."
          />

          <div className="mt-6 space-y-3">
            {alerts.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.03)] p-4"
              >
                <div className="flex items-start gap-3">
                  <span className="rounded-lg border border-[rgba(255,130,0,0.32)] bg-[rgba(255,130,0,0.12)] p-2 text-[#ffbd6b]">
                    <item.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="m-0 text-sm font-semibold text-[var(--text)]">
                      {item.title}
                    </p>
                    <p className="m-0 mt-1 text-sm leading-6 text-[var(--muted)]">
                      {item.text}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}
