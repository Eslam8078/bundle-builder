# Bundle Builder

A React prototype of a multi-step security-system bundle builder with a live
review panel, built from a provided Figma / screenshots.

## Run it

Requires Node 18+.

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `https://github.com/Eslam8078/bundle-builder`).

Production build:

```bash
npm run build
npm run preview
```

## Architecture

The app is layered so that UI, business rules, and state management don't
bleed into each other:

```
src/
  data/catalog.js        # DATA — the static product catalog + O(1) lookup maps
  domain/                # BUSINESS LOGIC — plain JS, no React imports at all
    constants.js          #   named constants (no magic numbers/strings)
    pricing.js             #   per-unit price resolution
    bundleReducer.js       #   selection rules (quantities, plan exclusivity, locking)
    selectors.js            #   derive review lines / totals / counts from state
  state/                  # REACT STATE WIRING
    BundleContext.jsx       #   useReducer + Context provider, hydrates from storage
    useBundleContext.js      #   context consumer hook (fails fast if misused)
    useCartActions.js        #   stable dispatch-wrapping functions
    bundlePersistence.js     #   save/load, validated against the catalog
  hooks/                  # component-facing selector hooks (useMemo'd)
  components/             # presentational components, one concern each
    shared/    - Icon, PriceTag, QuantityStepper (used everywhere)
    product/   - ProductCard, VariantSelector, PlanSelectButton
    accordion/ - Accordion, Step, StepHeader
    review/    - ReviewPanel, ReviewGroup, ReviewLine, ShippingRow,
                 GuaranteeBadge, TotalsSummary, Toast
    layout/    - PageHeader
    ErrorBoundary.jsx
  utils/                  # generic, bundle-agnostic helpers (format, localStorage)
  styles/                 # CSS split by concern, imported from index.css
```

Every product, price, badge, and variant renders from `data/catalog.js` —
nothing product-specific is hardcoded in a component.

## Notable decisions

- **Plans are mutually exclusive** within their step (selecting one clears
  the others) — enforced once, in `domain/bundleReducer.js`, not scattered
  across components.
- **Pricing** was back-derived from the source screenshots. The seeded
  default selection reproduces the design's numbers exactly: $238.81
  compare-at → $187.89 total, saving $50.92, at "$19.19/mo" financing
  (`total / 9.79`, a cosmetic placeholder — there's no real financing
  provider wired in).
- **No product photography** is available, so each product gets a small
  hand-drawn inline SVG icon (`components/shared/Icon.jsx`) instead of a
  photo — keeps the app dependency-free.
- **Steps 2 and 4** aren't fully specified in the source screenshots (only
  step 1 and the review panel are shown in full), so their extra content
  (additional plan tiers, an entry sensor, a protection plan) is my own
  invention, kept in the same on-brand style.
- Step 1's "Next" button intentionally reads **"Next: Choose your
  sensors"**, matching the source screenshot verbatim even though it skips
  over "Choose your plan" — I couldn't tell if that was an intentional flow
  choice or a copy slip in the original design, so I preserved it exactly.
- **Save my system for later** writes to `localStorage` and silently
  restores on the next visit, showing a brief "Restored your saved system"
  toast. Saved data is validated against the current catalog on load, so a
  stale save referencing a removed product can't crash the app.

## What I'd do with more time

- Real product photography instead of placeholder icons.
- A small backend instead of `localStorage`, so a saved system could
  restore on a different device.
- Unit tests for `domain/bundleReducer.js` and `domain/selectors.js` — both
  are pure functions with no React dependency, so they're straightforward
  to test in isolation (this was the main design goal of separating them
  out).
- Roving-tabindex keyboard navigation for the variant-chip radiogroups
  (currently each chip is in the tab order individually, which is
  accessible but not the full ARIA radiogroup keyboard pattern).
- TypeScript, for compile-time guarantees on the catalog/state shapes that
  are currently only checked at runtime (see `state/bundlePersistence.js`
  and `data/catalog.js#getProductOrThrow`).
