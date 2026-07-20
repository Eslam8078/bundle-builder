import { useMemo } from 'react'
import { buildReviewLines, calculateTotals, groupReviewLinesByCategory } from '../domain/selectors'
import { useBundleContext } from '../state/useBundleContext'

export function useReviewData() {
  const { state } = useBundleContext()

  return useMemo(() => {
    const lines = buildReviewLines(state)
    return {
      groups: groupReviewLinesByCategory(lines),
      totals: calculateTotals(lines),
      isEmpty: lines.length === 0,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selections])
}
