import type { ErrorInfo } from 'react'
import React from 'react'

export interface ErrorBoundaryWithFallbackProps {
  children: React.ReactNode
  fallback: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

class ErrorBoundaryWithFallback extends React.Component<ErrorBoundaryWithFallbackProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryWithFallbackProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error('Uncaught error:', error, errorInfo)
    this.setState({ errorInfo })
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <>{this.props.fallback}</>
    }

    return <>{this.props.children}</>
  }
}

export default ErrorBoundaryWithFallback
