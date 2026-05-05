import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { ToastStack } from './ToastStack'
import type { Toast } from './types'

type Ctx = {
  push: (t: Omit<Toast, 'id'>) => void
  dismiss: (id: string) => void
}

const ToastCtx = createContext<Ctx | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const push = useCallback(
    (t: Omit<Toast, 'id'>) => {
      const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
      const toast: Toast = { id, ttl: 4200, ...t }
      setToasts((prev) => [...prev, toast])
      if (toast.ttl) setTimeout(() => dismiss(id), toast.ttl)
    },
    [dismiss],
  )

  return (
    <ToastCtx.Provider value={{ push, dismiss }}>
      {children}
      <ToastStack toasts={toasts} onDismiss={dismiss} />
    </ToastCtx.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastCtx)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}
