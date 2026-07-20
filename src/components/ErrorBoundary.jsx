import { Component } from 'react'

export class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Bundle builder crashed:', error, info)
  }

  handleReload = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return (
      <div className="error-boundary" role="alert">
        <h2>Something went wrong.</h2>
        <p>The bundle builder hit an unexpected error. Your saved system (if any) is still on your device.</p>
        <button type="button" className="btn btn--primary" onClick={this.handleReload}>
          Try again
        </button>
      </div>
    )
  }
}
