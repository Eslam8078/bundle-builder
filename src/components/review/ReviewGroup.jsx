import ReviewLine from './ReviewLine'

export default function ReviewGroup({ categoryName, lines, onChangeLineQuantity }) {
  if (lines.length === 0) return null

  return (
    <div className="review-group">
      <h3 className="review-group__label">{categoryName}</h3>
      {lines.map((line) => (
        <ReviewLine
          key={line.key}
          line={line}
          onChangeQuantity={(next) => onChangeLineQuantity(line.productId, line.variantId, next)}
        />
      ))}
    </div>
  )
}
