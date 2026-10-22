import React from 'react'
export default class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false } }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error) { console.error('Application rendering error:', error) }
  render() {
    if (this.state.hasError) return <main className="error-screen"><h1>Something went wrong</h1><p>Sorry, this page could not be displayed. Refresh the browser to try again.</p><button className="button primary" onClick={() => window.location.reload()}>Refresh app</button></main>
    return this.props.children
  }
}
