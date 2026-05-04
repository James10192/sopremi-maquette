import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <main className="page-wrap py-8">
      <section className="panel-card rounded-lg border p-6 sm:p-8">
        <p className="section-eyebrow m-0">Prototype</p>
        <h1 className="display-title mt-3 text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl">
          La maquette SOPREMI
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--muted)] sm:text-lg">
          Cette page explique la logique de la démo: aucune donnée réelle, pas de
          backend connecté, juste une vitrine claire pour montrer le futur
          produit à l’entreprise.
        </p>
      </section>
    </main>
  )
}
