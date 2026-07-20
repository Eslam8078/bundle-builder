import { createContext, useEffect, useMemo, useReducer } from 'react'
import { BundleActionType, bundleReducer, createInitialBundleState } from '../domain/bundleReducer'
import { TOAST_DURATION_MS } from '../domain/constants'
import { useTimedFlag } from '../hooks/useTimedFlag'
import { loadSavedBundle } from './bundlePersistence'

export const BundleContext = createContext(null)

export function BundleProvider({ children }) {
  const [state, dispatch] = useReducer(bundleReducer, undefined, createInitialBundleState)
  const [justRestored, announceRestored] = useTimedFlag(TOAST_DURATION_MS.RESTORED)

  // Hydrate from localStorage once, on mount. Intentionally not a lazy
  // useReducer initializer: reading localStorage is a side effect, and
  // keeping it in an effect keeps createInitialBundleState() a pure
  // function that's safe to call from tests without a DOM.
  useEffect(() => {
    const saved = loadSavedBundle()
    if (!saved) return
    dispatch({ type: BundleActionType.HYDRATE, payload: saved })
    announceRestored()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount only
  }, [])

  const value = useMemo(() => ({ state, dispatch, justRestored }), [state, justRestored])

  return <BundleContext.Provider value={value}>{children}</BundleContext.Provider>
}
