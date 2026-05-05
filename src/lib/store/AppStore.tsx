import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react'
import type { Action } from './actions'
import { reducer } from './reducer'
import { initialState, type AppState } from './state'

const STORAGE_KEY = 'sopremi.state.v1'

const AppCtx = createContext<{ state: AppState; dispatch: Dispatch<Action> } | null>(null)

function loadPersisted(): AppState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AppState
  } catch {
    return null
  }
}

function persist(state: AppState) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // quota / private mode — silently ignored
  }
}

export function AppStoreProvider({ children }: { children: ReactNode }) {
  // Lazy init: read localStorage synchronously on first render so AppShell
  // sees the auth state immediately. Prevents the flicker where AppShell
  // <Navigate to="/login" /> fires before useEffect can hydrate.
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    const persisted = loadPersisted()
    return persisted ?? init
  })

  // Persist on every change
  useEffect(() => {
    persist(state)
  }, [state])

  const value = useMemo(() => ({ state, dispatch }), [state])
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}

export function useApp() {
  const ctx = useContext(AppCtx)
  if (!ctx) throw new Error('useApp must be used within <AppStoreProvider>')
  return ctx
}

export function resetStore() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(STORAGE_KEY)
  window.location.reload()
}
