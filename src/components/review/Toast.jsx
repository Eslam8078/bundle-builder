export default function Toast({ message }) {
  if (!message) return null
  return (
    <div className="review-panel__toast" role="status">
      {message}
    </div>
  )
}
