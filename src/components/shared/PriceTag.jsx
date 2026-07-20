import { hasDiscount } from '../../domain/pricing'
import { formatMoney } from '../../utils/format'

/**
 * @param {number} price
 * @param {number|null} compareAtPrice
 * @param {string|null} unitLabel - e.g. "/mo"
 * @param {'md'|'sm'} size
 */
export default function PriceTag({ price, compareAtPrice, unitLabel = null, size = 'md' }) {
  return (
    <span className="price-tag">
      {hasDiscount(price, compareAtPrice) && (
        <span className={`price price--compare price--${size}`}>{formatMoney(compareAtPrice)}</span>
      )}
      <span className={`price price--active price--${size}`}>
        {price === 0 ? 'FREE' : formatMoney(price)}
        {unitLabel ?? ''}
      </span>
    </span>
  )
}
