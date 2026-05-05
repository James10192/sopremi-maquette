export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-12 border-t border-[var(--line)] pb-10 pt-6 text-[var(--text-muted)]">
      <div className="page-wide flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="m-0 text-[12px]">
          <span className="font-tech text-[var(--text-faint)]">SOPREMI / Forge ·</span>{' '}
          © {year} — maquette interactive avec données de démonstration.
        </p>
        <div className="flex items-center gap-3 text-[12px]">
          <a
            href="https://sopremi.com/"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--text-soft)] no-underline transition hover:text-[var(--ember-bright)]"
          >
            sopremi.com →
          </a>
        </div>
      </div>
    </footer>
  )
}
