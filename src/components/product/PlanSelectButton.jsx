export default function PlanSelectButton({ isSelected, onToggle }) {
  return (
    <button
      type="button"
      className={`plan-select-btn ${isSelected ? 'is-selected' : ''}`}
      onClick={() => onToggle(isSelected ? 0 : 1)}
      aria-pressed={isSelected}
    >
      {isSelected ? 'Selected' : 'Select plan'}
    </button>
  )
}
