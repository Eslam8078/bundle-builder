import { useCallback } from 'react'
import { TOAST_DURATION_MS } from '../domain/constants'
import { saveBundle } from '../state/bundlePersistence'
import { useBundleContext } from '../state/useBundleContext'
import { useTimedFlag } from './useTimedFlag'

export function useSaveSystem() {
  const { state } = useBundleContext()
  const [justSaved, announceSaved] = useTimedFlag(TOAST_DURATION_MS.SAVED)

  const save = useCallback(() => {
    saveBundle(state)
    announceSaved()
  }, [state, announceSaved])

  return { save, justSaved }
}
