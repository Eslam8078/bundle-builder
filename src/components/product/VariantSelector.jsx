/**
 * @param {Array<{id: string, label: string, swatch: string}>} variants
 * @param {string} activeVariantId
 * @param {(variantId: string) => void} onSelect
 * @param {string} groupLabel - accessible name for the radiogroup, e.g. "Wyze Cam v4 color"
 */
export default function VariantSelector({ variants, activeVariantId, onSelect, groupLabel }) {
  if (!variants || variants.length === 0) return null

  return (
    <div className="variant-row" role="radiogroup" aria-label={groupLabel}>
      {variants.map((variant) => {
        const isActive = activeVariantId === variant.id
        return (
          <button
            type="button"
            key={variant.id}
            className={`variant-chip ${isActive ? 'is-active' : ''}`}
            onClick={() => onSelect(variant.id)}
            role="radio"
            aria-checked={isActive}
          >
            <span className="variant-chip__swatch" style={{ backgroundColor: variant.swatch }} />
            <span className="variant-chip__label">{variant.label}</span>
          </button>
        )
      })}
    </div>
  )
}
