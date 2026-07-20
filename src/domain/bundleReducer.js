import { PRODUCTS, PRODUCTS_BY_ID, getProductsForStep } from '../data/catalog'
import { DEFAULT_VARIANT_ID, FIRST_STEP_ID, MIN_QUANTITY } from './constants'

export const BundleActionType = Object.freeze({
  SET_QUANTITY: 'SET_QUANTITY',
  SET_ACTIVE_VARIANT: 'SET_ACTIVE_VARIANT',
  TOGGLE_STEP: 'TOGGLE_STEP',
  GO_TO_STEP: 'GO_TO_STEP',
  HYDRATE: 'HYDRATE',
})

// Seeds the app so it loads looking exactly like the source design.
const DEFAULT_SELECTIONS = {
  'cam-v4': { black: 1 },
  'cam-pan-v3': { white: 2 },
  'plan-unlimited': { [DEFAULT_VARIANT_ID]: 1 },
  'sense-motion': { [DEFAULT_VARIANT_ID]: 2 },
  'sense-hub': { [DEFAULT_VARIANT_ID]: 1 },
  microsd: { '256gb': 2 },
}

const DEFAULT_ACTIVE_VARIANTS = {
  'cam-v4': 'black',
  'cam-pan-v3': 'white',
  'floodlight-v2': 'white',
  'battery-cam-pro': 'white',
  microsd: '256gb',
}

export function createInitialBundleState() {
  return {
    selections: DEFAULT_SELECTIONS,
    activeVariants: DEFAULT_ACTIVE_VARIANTS,
    expandedStep: FIRST_STEP_ID,
  }
}

function clampQuantity(product, requestedQuantity) {
  const minimum = product.locked ? product.minQty ?? MIN_QUANTITY : MIN_QUANTITY
  return Math.max(minimum, requestedQuantity)
}

/** Plans are radio-like: selecting one clears every other plan in the same step. */
function deselectSiblingPlans(selections, product) {
  const next = { ...selections }
  for (const candidate of PRODUCTS) {
    const isSiblingPlan =
      candidate.step === product.step && candidate.type === 'plan' && candidate.id !== product.id
    if (isSiblingPlan) {
      next[candidate.id] = {}
    }
  }
  return next
}

function setQuantity(state, { productId, variantId, quantity }) {
  const product = PRODUCTS_BY_ID[productId]
  if (!product) return state // unknown product id: ignore rather than crash

  const clamped = clampQuantity(product, quantity)
  const baseSelections =
    product.type === 'plan' && clamped > 0
      ? deselectSiblingPlans(state.selections, product)
      : state.selections

  return {
    ...state,
    selections: {
      ...baseSelections,
      [productId]: { ...baseSelections[productId], [variantId]: clamped },
    },
  }
}

function setActiveVariant(state, { productId, variantId }) {
  return {
    ...state,
    activeVariants: { ...state.activeVariants, [productId]: variantId },
  }
}

function toggleStep(state, { stepId }) {
  return { ...state, expandedStep: state.expandedStep === stepId ? null : stepId }
}

function goToStep(state, { stepId }) {
  return { ...state, expandedStep: stepId }
}

function hydrate(state, payload) {
  return {
    selections: payload.selections ?? state.selections,
    activeVariants: payload.activeVariants ?? state.activeVariants,
    expandedStep: payload.expandedStep ?? state.expandedStep,
  }
}

export function bundleReducer(state, action) {
  switch (action.type) {
    case BundleActionType.SET_QUANTITY:
      return setQuantity(state, action.payload)
    case BundleActionType.SET_ACTIVE_VARIANT:
      return setActiveVariant(state, action.payload)
    case BundleActionType.TOGGLE_STEP:
      return toggleStep(state, action.payload)
    case BundleActionType.GO_TO_STEP:
      return goToStep(state, action.payload)
    case BundleActionType.HYDRATE:
      return hydrate(state, action.payload)
    default:
      return state
  }
}

// Re-exported so callers that only need "give me this step's products"
// don't have to import the data layer directly.
export { getProductsForStep }
