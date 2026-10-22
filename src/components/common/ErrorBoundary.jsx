// src/components/common/ErrorBoundary.jsx
import React, { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Button from './Button';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled rendering error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-luxury border border-rose-100 p-8 text-center">
            <div className="w-14 h-14 mx-auto mb-4 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold font-display text-brand-900 mb-2">
              Culinary Reservation Error
            </h2>
            <p className="text-sm text-brand-600 mb-6">
              An unexpected error occurred while rendering this reservation view. Our system has safely intercepted the error.
            </p>
            <div className="bg-brand-50 rounded-xl p-3 text-left mb-6 overflow-x-auto text-xs font-mono text-rose-700 border border-brand-200">
              {this.state.error?.message || 'Unknown Application Error'}
            </div>
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                size="md"
                icon={RefreshCw}
                onClick={() => window.location.reload()}
              >
                Reload
              </Button>
              <Button
                variant="primary"
                size="md"
                icon={Home}
                onClick={this.handleReset}
              >
                Return Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
