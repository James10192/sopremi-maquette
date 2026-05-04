export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-16 border-t border-[var(--line)] px-4 pb-12 pt-8 text-[var(--muted)]">
      <div className="page-wrap flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="m-0 text-sm">
          &copy; {year} SOPREMI - maquette de démonstration avec données fictives.
        </p>
        <a
          href="https://sopremi.com/"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-[var(--text)] no-underline transition hover:text-[var(--accent)]"
        >
          Site officiel SOPREMI
        </a>
      </div>
    </footer>
  )
}
