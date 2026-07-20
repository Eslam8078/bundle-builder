/**
 * Resolve the price a customer pays for one unit of a product+variant,
 * honoring per-variant overrides (e.g. the MicroSD card's capacities)
 * when the catalog defines them.
 *
 * @param {object} product - a catalog entry
 * @param {string} variantId
 * @returns {{ price: number, compareAtPrice: number|null }}
 */
export function getUnitPricing(product, variantId) {
  const override = product.variantPricing?.[variantId]
  if (override) {
    return {
      price: override.price ?? product.price,
      compareAtPrice: override.compareAtPrice ?? null,
    }
  }
  return {
    price: product.price,
    compareAtPrice: product.compareAtPrice ?? null,
  }
}

export function hasDiscount(price, compareAtPrice) {
  return compareAtPrice != null && compareAtPrice > price
}
