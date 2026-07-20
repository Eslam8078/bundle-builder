import { memo } from 'react'
import { getUnitPricing } from '../../domain/pricing'
import Icon from '../shared/Icon'
import PriceTag from '../shared/PriceTag'
import QuantityStepper from '../shared/QuantityStepper'
import PlanSelectButton from './PlanSelectButton'
import VariantSelector from './VariantSelector'

/**
 * @param {object} product - catalog entry
 * @param {string} activeVariantId - currently selected color/size chip
 * @param {number} quantity - quantity for the active variant only
 * @param {number} totalQuantity - quantity summed across all variants,
 *   used to decide the card's "selected" (highlighted) state
 * @param {{setQuantity: Function, setActiveVariant: Function}} actions
 */
function ProductCard({ product, activeVariantId, quantity, totalQuantity, actions }) {
  const { price, compareAtPrice } = getUnitPricing(product, activeVariantId)
  const isSelected = totalQuantity > 0
  const isPlan = product.type === 'plan'

  const handleQuantityChange = (nextQuantity) => {
    actions.setQuantity(product.id, activeVariantId, nextQuantity)
  }

  const itemLabel = [product.name, product.variants ? activeVariantId : null].filter(Boolean).join(', ')

  return (
    <article className={`product-card ${isSelected ? 'is-selected' : ''}`} aria-labelledby={`${product.id}-title`}>
      {product.badge && <span className="product-card__badge">{product.badge}</span>}

      <div className="product-card__media">
        <Icon name={product.icon} size={40} />
      </div>

      <div className="product-card__body">
        <h4 className="product-card__title" id={`${product.id}-title`}>
          {product.name}
        </h4>
        <p className="product-card__desc">
          {product.description}{' '}
          {product.learnMoreUrl && (
            <button
              type="button"
              className="product-card__link"
              onClick={() => window.alert('Product details coming soon.')}
            >
              Learn More
            </button>
          )}
        </p>

        {product.variants && (
          <VariantSelector
            variants={product.variants}
            activeVariantId={activeVariantId}
            onSelect={(variantId) => actions.setActiveVariant(product.id, variantId)}
            groupLabel={`${product.name} color`}
          />
        )}

        <div className="product-card__footer">
          {isPlan ? (
            <PlanSelectButton isSelected={isSelected} onToggle={handleQuantityChange} />
          ) : (
            <QuantityStepper
              quantity={quantity}
              min={product.locked ? product.minQty ?? 0 : 0}
              locked={product.locked}
              itemLabel={itemLabel}
              onChange={handleQuantityChange}
            />
          )}

          <PriceTag price={price} compareAtPrice={compareAtPrice} unitLabel={product.unitLabel} />
        </div>
      </div>
    </article>
  )
}

export default memo(ProductCard)
