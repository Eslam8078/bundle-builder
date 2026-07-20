import { NEXT_STEP_LABELS } from '../../domain/constants'
import { useProductsForStep } from '../../hooks/useProductsForStep'
import { useStepExpansion } from '../../hooks/useStepExpansion'
import { useCartActions } from '../../state/useCartActions'
import ProductCard from '../product/ProductCard'
import StepHeader from './StepHeader'

export default function Step({ step, stepNumber, totalSteps, isLast }) {
  const isExpanded = useStepExpansion(step.id)
  const productSelections = useProductsForStep(step.id)
  const actions = useCartActions()

  const selectedCount = productSelections.filter((entry) => entry.totalQuantity > 0).length
  const headerId = `step-${step.id}-header`
  const panelId = `step-${step.id}-panel`

  return (
    <section className={`step ${isExpanded ? 'is-expanded' : ''}`}>
      <StepHeader
        stepNumber={stepNumber}
        totalSteps={totalSteps}
        icon={step.icon}
        title={step.title}
        isExpanded={isExpanded}
        selectedCount={selectedCount}
        headerId={headerId}
        panelId={panelId}
        onToggle={() => actions.toggleStep(step.id)}
      />

      {isExpanded && (
        <div className="step__body" id={panelId} role="region" aria-labelledby={headerId}>
          <div className="product-grid">
            {productSelections.map(({ product, activeVariantId, quantity, totalQuantity }) => (
              <ProductCard
                key={product.id}
                product={product}
                activeVariantId={activeVariantId}
                quantity={quantity}
                totalQuantity={totalQuantity}
                actions={actions}
              />
            ))}
          </div>

          {!isLast && (
            <button type="button" className="btn btn--outline step__next" onClick={() => actions.goToStep(step.id + 1)}>
              Next: {NEXT_STEP_LABELS[step.id] ?? 'Continue'}
            </button>
          )}
        </div>
      )}
    </section>
  )
}
