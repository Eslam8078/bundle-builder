import { productExists, variantExists } from '../data/catalog'
import { STORAGE_KEY } from '../domain/constants'
import { readJSON, writeJSON } from '../utils/localStorageClient'

/**
 * Drops any saved selection/variant that no longer exists in the catalog.
 * Without this, a saved system from a previous version of the app (or a
 * hand-edited localStorage value) could hydrate the reducer with a
 * productId that no longer exists and crash downstream lookups.
 */
function sanitizeSelections(rawSelections) {
  if (!rawSelections || typeof rawSelections !== 'object') return {}

  const clean = {}
  for (const [productId, variantQuantities] of Object.entries(rawSelections)) {
    if (!productExists(productId)) continue

    const cleanVariants = {}
    for (const [variantId, quantity] of Object.entries(variantQuantities ?? {})) {
      const isValidQuantity = Number.isFinite(quantity) && quantity >= 0
      if (variantExists(productId, variantId) && isValidQuantity) {
        cleanVariants[variantId] = quantity
      }
    }
    if (Object.keys(cleanVariants).length > 0) {
      clean[productId] = cleanVariants
    }
  }
  return clean
}

function sanitizeActiveVariants(rawActiveVariants) {
  if (!rawActiveVariants || typeof rawActiveVariants !== 'object') return {}

  const clean = {}
  for (const [productId, variantId] of Object.entries(rawActiveVariants)) {
    if (variantExists(productId, variantId)) {
      clean[productId] = variantId
    }
  }
  return clean
}

/** @returns {{selections: object, activeVariants: object, expandedStep: number|null} | null} */
export function loadSavedBundle() {
  const raw = readJSON(STORAGE_KEY)
  if (!raw) return null

  return {
    selections: sanitizeSelections(raw.selections),
    activeVariants: sanitizeActiveVariants(raw.activeVariants),
    expandedStep: typeof raw.expandedStep === 'number' ? raw.expandedStep : null,
  }
}

export function saveBundle(state) {
  return writeJSON(STORAGE_KEY, {
    selections: state.selections,
    activeVariants: state.activeVariants,
    expandedStep: state.expandedStep,
  })
}
