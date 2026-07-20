/**
 * @param {number} quantity
 * @param {(next: number) => void} onChange
 * @param {number} min
 * @param {boolean} locked - true for items like the required hub, whose
 *   quantity can be raised but never dropped below `min`
 * @param {string} itemLabel - human-readable name announced by
 *   screen readers, e.g. "Wyze Cam v4, White"
 * @param {'md'|'sm'} size
 */
export default function QuantityStepper({
  quantity,
  onChange,
  min = 0,
  locked = false,
  itemLabel = 'item',
  size = 'md',
}) {
  const atMinimum = quantity <= min

  return (
    <div className={`stepper stepper--${size}`}>
      <button
        type="button"
        className="stepper__btn"
        aria-label={`Decrease quantity of ${itemLabel}`}
        disabled={atMinimum || locked}
        onClick={() => onChange(Math.max(min, quantity - 1))}
      >
        &minus;
      </button>
      <span className="stepper__value" aria-live="polite" aria-atomic="true">
        <span className="sr-only">{itemLabel} quantity: </span>
        {quantity}
      </span>
      <button
        type="button"
        className="stepper__btn"
        aria-label={`Increase quantity of ${itemLabel}`}
        disabled={locked}
        onClick={() => onChange(quantity + 1)}
      >
        +
      </button>
    </div>
  )
}
