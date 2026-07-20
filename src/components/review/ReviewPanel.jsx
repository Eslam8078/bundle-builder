import { SHIPPING } from '../../data/catalog'
import { REVIEW_GROUP_ORDER } from '../../domain/constants'
import { useReviewData } from '../../hooks/useReviewData'
import { useSaveSystem } from '../../hooks/useSaveSystem'
import { useBundleContext } from '../../state/useBundleContext'
import { useCartActions } from '../../state/useCartActions'
import GuaranteeBadge from './GuaranteeBadge'
import ReviewGroup from './ReviewGroup'
import ShippingRow from './ShippingRow'
import Toast from './Toast'
import TotalsSummary from './TotalsSummary'

export default function ReviewPanel() {
  const { groups, totals, isEmpty } = useReviewData()
  const { justRestored } = useBundleContext()
  const { save, justSaved } = useSaveSystem()
  const { setQuantity } = useCartActions()

  const handleCheckout = () => {
    window.alert('This is a prototype — checkout is not wired up.')
  }

  return (
    <aside className="review-panel" aria-label="Order review">
      {justRestored && <Toast message="Restored your saved system." />}

      <p className="review-panel__eyebrow">Review</p>
      <h2 className="review-panel__title">Your security system</h2>
      <p className="review-panel__subtitle">
        Review your personalized protection system designed to keep what matters most safe.
      </p>

      <div className="review-panel__groups">
        {isEmpty && <p className="review-panel__empty">Add a product to start building your system.</p>}

        {REVIEW_GROUP_ORDER.map((categoryName) => (
          <ReviewGroup
            key={categoryName}
            categoryName={categoryName}
            lines={groups[categoryName] ?? []}
            onChangeLineQuantity={setQuantity}
          />
        ))}
      </div>

      <ShippingRow shipping={SHIPPING} />

      <div className="review-panel__summary">
        <GuaranteeBadge />
        <TotalsSummary totals={totals} />

        <button type="button" className="btn btn--primary review-panel__checkout" onClick={handleCheckout}>
          Checkout
        </button>

        <button type="button" className="review-panel__save" onClick={save}>
          {justSaved ? 'Saved!' : 'Save my system for later'}
        </button>
      </div>
    </aside>
  )
}
