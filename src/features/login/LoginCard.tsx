import { useNavigate } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useApp } from '#/lib/store/AppStore'
import { useToast } from '#/components/ui/toast/ToastProvider'
import { RolePicker } from './RolePicker'

export function LoginCard() {
  const { state, dispatch } = useApp()
  const navigate = useNavigate()
  const toast = useToast()
  const [selectedId, setSelectedId] = useState<string | null>(state.users[0]?.id ?? null)
  const [pin, setPin] = useState('•••••')
  const [busy, setBusy] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedId) return
    setBusy(true)
    setTimeout(() => {
      dispatch({ type: 'auth/login', userId: selectedId })
      const u = state.users.find((u) => u.id === selectedId)
      toast.push({
        kind: 'success',
        title: `Bienvenue, ${u?.name.split(' ')[0] ?? ''}`,
        body: 'Connexion établie. Cockpit synchronisé.',
      })
      navigate({ to: '/' })
    }, 480)
  }

  return (
    <form onSubmit={submit} className="surface relative z-10 flex w-full flex-col gap-6 rounded-2xl p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="code-tag">[ AUTH · 02 ]</span>
        <span className="pill">Maquette · accès libre</span>
      </div>
      <div>
        <p className="eyebrow m-0">Connexion sécurisée</p>
        <h1 className="font-display mt-2 mb-1.5 text-[2rem] font-semibold leading-[1.05] tracking-tight text-[var(--text)]">
          Identifiez-vous au cockpit.
        </h1>
        <p className="m-0 text-[13.5px] leading-6 text-[var(--text-muted)]">
          Choisissez un profil de démonstration. Aucun mot de passe réel — la maquette accepte n'importe quelle saisie.
        </p>
      </div>

      <div>
        <p className="label m-0 mb-2">Profil de démonstration</p>
        <RolePicker users={state.users} selectedId={selectedId} onSelect={setSelectedId} />
      </div>

      <label className="block">
        <span className="label">Code d’accès</span>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          maxLength={6}
          className="field field-mono mt-2 tracking-[0.5em]"
          aria-label="Code d'accès"
        />
        <span className="mt-2 inline-flex items-center gap-2 text-[11px] text-[var(--text-faint)]">
          <span className="dot text-[var(--ember)]" /> Mock — toute valeur est acceptée
        </span>
      </label>

      <button type="submit" className="btn btn-primary w-full justify-center" disabled={!selectedId || busy}>
        {busy ? 'Authentification…' : 'Entrer dans le cockpit'}
        <ArrowRight className={`h-4 w-4 ${busy ? 'spin' : ''}`} />
      </button>
    </form>
  )
}
