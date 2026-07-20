// Static product catalog. Every step, card, badge, price, and variant in
// the UI renders from this file — nothing product-related is hardcoded in
// components.
//
// Product shape:
// {
//   id, step, category, type, name, description, learnMoreUrl,
//   icon, badge,
//   variants: [{ id, label, swatch }] | null   -> omitted = no color selector
//   variantPricing?: { [variantId]: { price, compareAtPrice } }
//   compareAtPrice, price                      -> PER UNIT
//   minQty, locked                             -> e.g. the required Sense Hub
// }
//
// `type: 'plan'` products are mutually exclusive within their step
// (radio-like): selecting one clears the others. See domain/bundleReducer.js.

export const STEPS = [
  { id: 1, title: 'Choose your cameras', icon: 'camera' },
  { id: 2, title: 'Choose your plan', icon: 'shield' },
  { id: 3, title: 'Choose your sensors', icon: 'sensor' },
  { id: 4, title: 'Add extra protection', icon: 'grid' },
]

export const PRODUCTS = [
  // ---------------- Step 1: Cameras ----------------
  {
    id: 'cam-v4',
    step: 1,
    category: 'Cameras',
    type: 'product',
    name: 'Wyze Cam v4',
    description: 'The clearest Wyze Cam ever made.',
    learnMoreUrl: '#',
    icon: 'camera',
    badge: 'Save 22%',
    variants: [
      { id: 'white', label: 'White', swatch: '#f5f5f0' },
      { id: 'grey', label: 'Grey', swatch: '#9a9a9a' },
      { id: 'black', label: 'Black', swatch: '#232323' },
    ],
    compareAtPrice: 35.98,
    price: 27.98,
  },
  {
    id: 'cam-pan-v3',
    step: 1,
    category: 'Cameras',
    type: 'product',
    name: 'Wyze Cam Pan v3',
    description: '360° pan and 180° tilt security camera.',
    learnMoreUrl: '#',
    icon: 'camera-pan',
    badge: 'Save 12%',
    variants: [
      { id: 'white', label: 'White', swatch: '#f5f5f0' },
      { id: 'black', label: 'Black', swatch: '#232323' },
    ],
    compareAtPrice: 28.99,
    price: 23.99,
  },
  {
    id: 'floodlight-v2',
    step: 1,
    category: 'Cameras',
    type: 'product',
    name: 'Wyze Cam Floodlight v2',
    description: '2K floodlight camera with a 160° wide-angle view for your garage.',
    learnMoreUrl: '#',
    icon: 'floodlight',
    badge: 'Save 22%',
    variants: [
      { id: 'white', label: 'White', swatch: '#f5f5f0' },
      { id: 'black', label: 'Black', swatch: '#232323' },
    ],
    compareAtPrice: 89.98,
    price: 69.98,
  },
  {
    id: 'duo-cam-doorbell',
    step: 1,
    category: 'Cameras',
    type: 'product',
    name: 'Wyze Duo Cam Doorbell',
    description: 'Two cameras. Two views. Double the porch protection.',
    learnMoreUrl: '#',
    icon: 'doorbell',
    badge: null,
    variants: null,
    compareAtPrice: null,
    price: 69.98,
  },
  {
    id: 'battery-cam-pro',
    step: 1,
    category: 'Cameras',
    type: 'product',
    name: 'Wyze Battery Cam Pro',
    description: 'Protect anywhere. See everything in 2.5K HDR. No power outlet or electrician needed.',
    learnMoreUrl: '#',
    icon: 'battery-cam',
    badge: null,
    variants: [
      { id: 'white', label: 'White', swatch: '#f5f5f0' },
      { id: 'black', label: 'Black', swatch: '#232323' },
    ],
    compareAtPrice: null,
    price: 89.98,
  },

  // ---------------- Step 2: Plan ----------------
  {
    id: 'plan-basic',
    step: 2,
    category: 'Plan',
    type: 'plan',
    name: 'Cam Basic',
    description: '12-hour event video history for one camera.',
    learnMoreUrl: '#',
    icon: 'shield',
    badge: null,
    variants: null,
    compareAtPrice: 4.99,
    price: 3.99,
    unitLabel: '/mo',
  },
  {
    id: 'plan-unlimited',
    step: 2,
    category: 'Plan',
    type: 'plan',
    name: 'Cam Unlimited',
    description: 'Unlimited event video history for every camera on your account.',
    learnMoreUrl: '#',
    icon: 'shield',
    badge: null,
    variants: null,
    compareAtPrice: 12.99,
    price: 9.99,
    unitLabel: '/mo',
  },
  {
    id: 'plan-protect-plus',
    step: 2,
    category: 'Plan',
    type: 'plan',
    name: 'Cam Protect Plus',
    description: 'Unlimited history plus 24/7 professional monitoring.',
    learnMoreUrl: '#',
    icon: 'shield',
    badge: null,
    variants: null,
    compareAtPrice: 19.99,
    price: 14.99,
    unitLabel: '/mo',
  },

  // ---------------- Step 3: Sensors ----------------
  {
    id: 'sense-motion',
    step: 3,
    category: 'Sensors',
    type: 'product',
    name: 'Wyze Sense Motion Sensor',
    description: 'Detects movement so you never miss a moment.',
    learnMoreUrl: '#',
    icon: 'sensor',
    badge: null,
    variants: null,
    compareAtPrice: null,
    price: 29.99,
  },
  {
    id: 'sense-entry',
    step: 3,
    category: 'Sensors',
    type: 'product',
    name: 'Wyze Sense Entry Sensor',
    description: 'Know the instant a door or window opens.',
    learnMoreUrl: '#',
    icon: 'sensor',
    badge: null,
    variants: null,
    compareAtPrice: null,
    price: 19.99,
  },
  {
    id: 'sense-hub',
    step: 3,
    category: 'Sensors',
    type: 'product',
    name: 'Wyze Sense Hub (Required)',
    description: 'Connects every sensor to your Wyze app.',
    learnMoreUrl: '#',
    icon: 'hub',
    badge: null,
    variants: null,
    compareAtPrice: 29.92,
    price: 0,
    minQty: 1,
    locked: true,
  },

  // ---------------- Step 4: Extra protection ----------------
  {
    id: 'microsd',
    step: 4,
    category: 'Accessories',
    type: 'product',
    name: 'Wyze MicroSD Card',
    description: 'Local storage for continuous recording, no subscription required.',
    learnMoreUrl: '#',
    icon: 'sdcard',
    badge: null,
    variants: [
      { id: '64gb', label: '64GB', swatch: '#c9c2ff' },
      { id: '128gb', label: '128GB', swatch: '#9c8dff' },
      { id: '256gb', label: '256GB', swatch: '#5b32d6' },
    ],
    variantPricing: {
      '64gb': { price: 12.98, compareAtPrice: null },
      '128gb': { price: 16.98, compareAtPrice: null },
      '256gb': { price: 20.98, compareAtPrice: null },
    },
    compareAtPrice: null,
    price: 20.98,
  },
  {
    id: 'protection-plan',
    step: 4,
    category: 'Accessories',
    type: 'product',
    name: '2-Year Protection Plan',
    description: 'Covers accidental damage and hardware failure.',
    learnMoreUrl: '#',
    icon: 'protect',
    badge: null,
    variants: null,
    compareAtPrice: null,
    price: 19.99,
  },
]

export const SHIPPING = {
  label: 'Fast Shipping',
  compareAtPrice: 5.99,
  price: 0,
}

// ---------------------------------------------------------------------------
// Precomputed lookup structures.
//
// The original implementation called `PRODUCTS.filter(p => p.step === id)`
// and rebuilt `Object.fromEntries(...)` -style lookups inside render-path
// functions. PRODUCTS is static, so that work can happen exactly once at
// module load instead of on every selector call.
// ---------------------------------------------------------------------------

export const PRODUCTS_BY_ID = Object.freeze(
  Object.fromEntries(PRODUCTS.map((product) => [product.id, product]))
)

export const PRODUCT_IDS_BY_STEP = Object.freeze(
  STEPS.reduce((byStep, step) => {
    byStep[step.id] = PRODUCTS.filter((p) => p.step === step.id).map((p) => p.id)
    return byStep
  }, {})
)

/**
 * @param {string} productId
 * @returns {object} the product
 * @throws if the id isn't in the catalog — fails fast instead of letting
 *   `undefined.someProperty` crash somewhere unrelated later.
 */
export function getProductOrThrow(productId) {
  const product = PRODUCTS_BY_ID[productId]
  if (!product) {
    throw new Error(`Unknown product id: "${productId}"`)
  }
  return product
}

export function getProductsForStep(stepId) {
  return (PRODUCT_IDS_BY_STEP[stepId] ?? []).map((id) => PRODUCTS_BY_ID[id])
}

export function productExists(productId) {
  return Boolean(PRODUCTS_BY_ID[productId])
}

export function variantExists(productId, variantId) {
  const product = PRODUCTS_BY_ID[productId]
  if (!product) return false
  if (!product.variants) return variantId === 'default'
  return product.variants.some((v) => v.id === variantId)
}
