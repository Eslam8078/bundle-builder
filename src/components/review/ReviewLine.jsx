import { memo } from 'react'
import Icon from '../shared/Icon'
import PriceTag from '../shared/PriceTag'
import QuantityStepper from '../shared/QuantityStepper'

function ReviewLine({ line, onChangeQuantity }) {
  const itemLabel = [line.name, line.variantLabel].filter(Boolean).join(', ')

  return (
    <div className="review-line">
      <div className="review-line__thumb">
        <Icon name={line.icon} size={22} />
      </div>
      <div className="review-line__name">
        {line.name}
        {line.variantLabel && <span className="review-line__variant"> · {line.variantLabel}</span>}
      </div>
      <QuantityStepper
        size="sm"
        quantity={line.quantity}
        min={line.minQuantity}
        locked={line.locked}
        itemLabel={itemLabel}
        onChange={onChangeQuantity}
      />
      <PriceTag
        price={line.lineTotal}
        compareAtPrice={line.lineCompareAtTotal}
        unitLabel={line.unitLabel}
        size="sm"
      />
    </div>
  )
}

export default memo(ReviewLine)
