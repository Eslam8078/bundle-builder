import { formatMoney } from '../../utils/format'

export default function TotalsSummary({ totals }) {
  const hasSavings = totals.savings > 0

  return (
    <div className="review-panel__totals">
      <span className="financing-pill">as low as {formatMoney(totals.financingPerMonth)}/mo</span>

      <div className="review-panel__total-row">
        {hasSavings && <span className="price price--compare price--lg">{formatMoney(totals.compareTotal)}</span>}
        <span className="review-panel__total">{formatMoney(totals.total)}</span>
      </div>

      {hasSavings && (
        <p className="review-panel__savings">
          Congrats! You&rsquo;re saving {formatMoney(totals.savings)} on your security bundle!
        </p>
      )}
    </div>
  )
}
