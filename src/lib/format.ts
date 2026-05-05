export function formatXOF(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(2).replace('.', ',')} Mds FCFA`
  }
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1).replace('.', ',')} M FCFA`
  }
  if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(0)} k FCFA`
  }
  return `${amount} FCFA`
}

export function formatPercent(value: number, sign = false): string {
  const fixed = value.toFixed(1).replace('.', ',')
  return sign && value > 0 ? `+${fixed} %` : `${fixed} %`
}

export function formatHours(h: number): string {
  const hours = Math.floor(h)
  const minutes = Math.round((h - hours) * 60)
  return `${hours} h ${minutes.toString().padStart(2, '0')}`
}

const fr = new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
const frTime = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' })

export function formatDate(iso: string): string {
  return fr.format(new Date(iso))
}

export function formatTime(iso: string): string {
  return frTime.format(new Date(iso))
}

export function timeAgo(iso: string, now = new Date()): string {
  const diff = (now.getTime() - new Date(iso).getTime()) / 1000
  if (diff < 60) return "À l'instant"
  if (diff < 3600) return `Il y a ${Math.floor(diff / 60)} min`
  if (diff < 86400) return `Il y a ${Math.floor(diff / 3600)} h`
  if (diff < 86400 * 7) return `Il y a ${Math.floor(diff / 86400)} j`
  return formatDate(iso)
}

export function initialsOf(first: string, last: string): string {
  return `${first[0] ?? ''}${last[0] ?? ''}`.toUpperCase()
}

export function pad(n: number, len = 3): string {
  return n.toString().padStart(len, '0')
}
