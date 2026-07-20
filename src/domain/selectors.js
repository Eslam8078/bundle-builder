import { PRODUCTS, getProductsForStep } from '../data/catalog'
import { getUnitPricing } from './pricing'
import { DEFAULT_VARIANT_ID, FINANCING_MONTHS_DIVISOR, MIN_QUANTITY, REVIEW_GROUP_ORDER } from './constants'

export function getActiveVariantId(state, productId) {
  return state.activeVariants[productId] ?? DEFAULT_VARIANT_ID
}

export function getQuantity(state, productId, variantId) {
  return state.selections[productId]?.[variantId] ?? MIN_QUANTITY
}

export function getProductTotalQuantity(state, productId) {
  const variantQuantities = state.selections[productId]
  if (!variantQuantities) return MIN_QUANTITY
  return Object.values(variantQuantities).reduce((sum, qty) => sum + qty, MIN_QUANTITY)
}

/** Number of distinct products in a step that have at least one unit selected. */
export function getStepSelectedCount(state, stepId) {
  return getProductsForStep(stepId).filter((product) => getProductTotalQuantity(state, product.id) > 0)
    .length
}

/**
 * One line per product+variant combination with quantity > 0 — the shape
 * the review panel renders directly.
 */
export function buildReviewLines(state) {
  const lines = []

  for (const product of PRODUCTS) {
    const variantQuantities = state.selections[product.id]
    if (!variantQuantities) continue

    for (const [variantId, quantity] of Object.entries(variantQuantities)) {
      if (quantity <= 0) continue

      const { price, compareAtPrice } = getUnitPricing(product, variantId)
      const variantLabel = product.variants?.find((v) => v.id === variantId)?.label ?? null

      lines.push({
        key: `${product.id}:${variantId}`,
        productId: product.id,
        variantId,
        category: product.category,
        name: product.name,
        variantLabel,
        icon: product.icon,
        quantity,
        unitPrice: price,
        unitCompareAtPrice: compareAtPrice,
        lineTotal: price * quantity,
        lineCompareAtTotal: (compareAtPrice ?? price) * quantity,
        unitLabel: product.unitLabel ?? null,
        locked: Boolean(product.locked),
        minQuantity: product.minQty ?? MIN_QUANTITY,
      })
    }
  }

  return lines
}

export function groupReviewLinesByCategory(lines) {
  const groups = Object.fromEntries(REVIEW_GROUP_ORDER.map((category) => [category, []]))
  for (const line of lines) {
    // Defensive fallback: a product with a category outside
    // REVIEW_GROUP_ORDER would otherwise silently vanish from the panel.
    ;(groups[line.category] ??= []).push(line)
  }
  return groups
}

/**
 * Shipping is intentionally excluded — it's rendered as its own
 * already-free line and isn't folded into the headline total.
 */
export function calculateTotals(lines) {
  const total = lines.reduce((sum, line) => sum + line.lineTotal, MIN_QUANTITY)
  const compareTotal = lines.reduce((sum, line) => sum + line.lineCompareAtTotal, MIN_QUANTITY)
  const savings = Math.max(MIN_QUANTITY, compareTotal - total)
  const financingPerMonth = total / FINANCING_MONTHS_DIVISOR

  return { total, compareTotal, savings, financingPerMonth }
}
