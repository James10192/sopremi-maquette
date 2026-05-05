import { Briefcase, HardHat, ShieldCheck, Users } from 'lucide-react'
import type { Role, User } from '#/lib/types'
import { Avatar } from '#/components/ui/Avatar'

const ICON: Record<Role, typeof ShieldCheck> = {
  dg: ShieldCheck,
  rh: Users,
  pm: Briefcase,
  dom: HardHat,
}

export function RolePicker({
  users,
  selectedId,
  onSelect,
}: {
  users: User[]
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {users.map((u) => {
        const Icon = ICON[u.role]
        const active = u.id === selectedId
        return (
          <button
            key={u.id}
            type="button"
            onClick={() => onSelect(u.id)}
            className={`group relative flex items-center gap-3 rounded-xl border p-3.5 text-left transition ${
              active
                ? 'border-[rgba(255,130,0,0.42)] bg-[rgba(255,130,0,0.10)] shadow-[inset_0_1px_0_rgba(255,200,140,0.18)]'
                : 'border-[var(--line)] bg-[rgba(255,255,255,0.025)] hover:border-[rgba(255,130,0,0.28)] hover:bg-[rgba(255,130,0,0.05)]'
            }`}
          >
            <Avatar initials={u.initials} seed={u.id} size={40} />
            <div className="min-w-0 flex-1">
              <p className="m-0 truncate text-[13.5px] font-semibold text-[var(--text)]">{u.name}</p>
              <p className="m-0 truncate text-[11px] text-[var(--text-muted)]">{u.title}</p>
            </div>
            <Icon
              className={`h-4 w-4 transition ${
                active ? 'text-[var(--ember-bright)]' : 'text-[var(--text-faint)] group-hover:text-[var(--text-muted)]'
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}
