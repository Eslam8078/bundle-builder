import Icon from '../shared/Icon'

/**
 * Follows the WAI-ARIA accordion pattern: a heading element wraps the
 * trigger button, and the button owns aria-expanded/aria-controls pointing
 * at the associated panel.
 */
export default function StepHeader({
  stepNumber,
  totalSteps,
  icon,
  title,
  isExpanded,
  selectedCount,
  headerId,
  panelId,
  onToggle,
}) {
  return (
    <h3 className="step__heading">
      <button
        type="button"
        className="step__header"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        id={headerId}
      >
        <span className="step__header-left">
          <span className="step__eyebrow">
            STEP {stepNumber} OF {totalSteps}
          </span>
          <span className="step__title-row">
            <Icon name={icon} size={22} className="step__icon" />
            <span className="step__title">{title}</span>
          </span>
        </span>

        <span className="step__header-right">
          <span className="step__count">{selectedCount} selected</span>
          <span className={`step__chevron ${isExpanded ? 'up' : 'down'}`} aria-hidden="true">
            ▾
          </span>
        </span>
      </button>
    </h3>
  )
}
