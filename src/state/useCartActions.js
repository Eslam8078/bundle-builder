import { useCallback, useMemo } from 'react'
import { BundleActionType } from '../domain/bundleReducer'
import { useBundleContext } from './useBundleContext'

/**
 * Returns action-dispatch functions that never change identity across
 * renders (dispatch from useReducer is itself stable, and these wrappers
 * only close over it). Components further down the tree can therefore
 * receive these as props and be wrapped in React.memo without the
 * memoization being silently defeated by a freshly-created callback every
 * render — a common pitfall when list items each get an inline arrow
 * function from their parent's `.map()`.
 */
export function useCartActions() {
  const { dispatch } = useBundleContext()

  const setQuantity = useCallback(
    (productId, variantId, quantity) => {
      dispatch({ type: BundleActionType.SET_QUANTITY, payload: { productId, variantId, quantity } })
    },
    [dispatch]
  )

  const setActiveVariant = useCallback(
    (productId, variantId) => {
      dispatch({ type: BundleActionType.SET_ACTIVE_VARIANT, payload: { productId, variantId } })
    },
    [dispatch]
  )

  const toggleStep = useCallback(
    (stepId) => {
      dispatch({ type: BundleActionType.TOGGLE_STEP, payload: { stepId } })
    },
    [dispatch]
  )

  const goToStep = useCallback(
    (stepId) => {
      dispatch({ type: BundleActionType.GO_TO_STEP, payload: { stepId } })
    },
    [dispatch]
  )

  return useMemo(
    () => ({ setQuantity, setActiveVariant, toggleStep, goToStep }),
    [setQuantity, setActiveVariant, toggleStep, goToStep]
  )
}
