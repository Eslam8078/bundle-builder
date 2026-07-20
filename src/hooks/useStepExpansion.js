import { useBundleContext } from '../state/useBundleContext'

export function useStepExpansion(stepId) {
  const { state } = useBundleContext()
  return state.expandedStep === stepId
}
