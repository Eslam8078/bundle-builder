import { STEPS } from '../../data/catalog'
import Step from './Step'

export default function Accordion() {
  return (
    <div className="accordion" aria-label="Bundle builder steps">
      {STEPS.map((step, index) => (
        <Step
          key={step.id}
          step={step}
          stepNumber={index + 1}
          totalSteps={STEPS.length}
          isLast={index === STEPS.length - 1}
        />
      ))}
    </div>
  )
}
