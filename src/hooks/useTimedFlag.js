import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * A boolean that flips true on demand and automatically flips back to
 * false after `durationMs`. Used for the "Saved!" / "Restored your saved
 * system" toasts, but has no bundle-specific knowledge — reusable for any
 * transient confirmation message.
 *
 * @param {number} durationMs
 * @param {boolean} initialValue
 * @returns {[boolean, () => void]} [isActive, trigger]
 */
export function useTimedFlag(durationMs, initialValue = false) {
  const [isActive, setIsActive] = useState(initialValue)
  const timeoutRef = useRef(null)

  const trigger = useCallback(() => {
    setIsActive(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setIsActive(false), durationMs)
  }, [durationMs])

  useEffect(() => {
    if (initialValue) {
      timeoutRef.current = setTimeout(() => setIsActive(false), durationMs)
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount only
  }, [])

  return [isActive, trigger]
}
