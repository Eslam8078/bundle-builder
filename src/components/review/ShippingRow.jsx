import Icon from '../shared/Icon'
import PriceTag from '../shared/PriceTag'

export default function ShippingRow({ shipping }) {
  return (
    <div className="review-panel__shipping">
      <span className="review-panel__shipping-icon">
        <Icon name="truck" size={20} />
      </span>
      <span className="review-panel__shipping-label">{shipping.label}</span>
      <PriceTag price={shipping.price} compareAtPrice={shipping.compareAtPrice} size="sm" />
    </div>
  )
}
