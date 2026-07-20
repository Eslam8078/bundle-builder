import { useMemo } from 'react'
import { getProductsForStep } from '../data/catalog'
import { getActiveVariantId, getProductTotalQuantity, getQuantity } from '../domain/selectors'
import { useBundleContext } from '../state/useBundleContext'

/**
 * @param {number} stepId
 * @returns {Array<{ product: object, activeVariantId: string, quantity: number, totalQuantity: number }>}
 */
export function useProductsForStep(stepId) {
  const { state } = useBundleContext()

  return useMemo(() => {
    return getProductsForStep(stepId).map((product) => {
      const activeVariantId = getActiveVariantId(state, product.id)
      return {
        product,
        activeVariantId,
        quantity: getQuantity(state, product.id, activeVariantId),
        totalQuantity: getProductTotalQuantity(state, product.id),
      }
    })
    // Only recompute when the data this step actually depends on changes —
    // NOT on every context update (e.g. expandedStep toggling elsewhere).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepId, state.selections, state.activeVariants])
}
