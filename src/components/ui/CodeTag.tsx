import type { ReactNode } from 'react'

export function CodeTag({ children }: { children: ReactNode }) {
  return <span className="code-tag font-tech">{children}</span>
}
