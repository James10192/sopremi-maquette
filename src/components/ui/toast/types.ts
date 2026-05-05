export type ToastKind = 'info' | 'success' | 'warning' | 'danger'

export type Toast = {
  id: string
  kind: ToastKind
  title: string
  body?: string
  ttl?: number
}
