import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Layers, Lock, Sparkles } from 'lucide-react'

export const Route = createFileRoute('/about')({ component: About })

function About() {
  return (
    <main className="page-wide flex flex-col gap-6 py-8">
      <section className="surface-ember relative overflow-hidden rounded-2xl p-8 lg:p-12">
        <p className="eyebrow m-0">À propos</p>
        <h1 className="font-display m-0 mt-3 text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.02] tracking-tight text-[var(--text)]">
          SOPREMI Forge —
          <br />
          <span className="italic text-[var(--ember-bright)]">vitrine du futur cockpit.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[var(--text-soft)]">
          Cette application est une maquette interactive. Toutes les données sont mock. L'objectif est de montrer la
          direction produit, le langage visuel et la mécanique d'usage. Aucune connexion à une base de production.
        </p>
        <div className="mt-5 flex gap-2">
          <Link to="/login" className="btn btn-primary">
            Tester maintenant <ArrowRight className="h-4 w-4" />
          </Link>
          <a href="https://sopremi.com/" target="_blank" rel="noreferrer" className="btn">
            Visiter sopremi.com
          </a>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Card icon={Sparkles} title="Mock vivant">
          Création de projets, validation DG, affectation d'engins, pointage : tout est exécuté côté client et
          persiste dans le navigateur le temps de la démo.
        </Card>
        <Card icon={Layers} title="Architecture proche du final">
          Routing TanStack, store Context + reducer, primitives UI cohérentes. Le passage à un backend Convex se fera
          sans refondre l'interface.
        </Card>
        <Card icon={Lock} title="Aucune donnée réelle">
          Authentification fictive, identités fictives, chiffres fictifs. La maquette accepte n'importe quelle saisie.
        </Card>
      </section>
    </main>
  )
}

function Card({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Sparkles
  title: string
  children: React.ReactNode
}) {
  return (
    <article className="surface rounded-2xl p-5">
      <span className="inline-flex rounded-lg border border-[var(--line)] bg-[rgba(255,130,0,0.08)] p-2 text-[var(--ember-bright)]">
        <Icon className="h-4 w-4" />
      </span>
      <h3 className="font-display m-0 mt-3 text-lg font-semibold tracking-tight text-[var(--text)]">{title}</h3>
      <p className="m-0 mt-1.5 text-[13px] leading-7 text-[var(--text-muted)]">{children}</p>
    </article>
  )
}
