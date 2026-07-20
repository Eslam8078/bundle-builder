// Central home for values that used to be inline magic numbers/strings.

export const DEFAULT_VARIANT_ID = 'default'

export const MIN_QUANTITY = 0

export const FIRST_STEP_ID = 1

// Review-panel category display order. A product's `category` field must
// be one of these, or it silently won't render — see
// domain/selectors.js#groupReviewLinesByCategory for the fallback.
export const REVIEW_GROUP_ORDER = ['Cameras', 'Sensors', 'Accessories', 'Plan']

// Financing estimate divisor, reverse-engineered from the source design
// (a $187.89 total displaying as "$19.19/mo"). There's no real financing
// provider wired in — this is a cosmetic placeholder, flagged here instead
// of buried as a bare number in a calculation.
export const FINANCING_MONTHS_DIVISOR = 9.79

// How long transient toasts stay visible.
export const TOAST_DURATION_MS = {
  SAVED: 2500,
  RESTORED: 4000,
}

// Step-specific "Next: <label>" copy. Step 1 intentionally reads "Choose
// your sensors" (skipping "Choose your plan") to match the source design's
// screenshot verbatim — see README for the note on why that was kept as-is.
export const NEXT_STEP_LABELS = {
  1: 'Choose your sensors',
  2: 'Choose your sensors',
  3: 'Add extra protection',
}

export const STORAGE_KEY = 'wyze-bundle-builder:saved-system'
