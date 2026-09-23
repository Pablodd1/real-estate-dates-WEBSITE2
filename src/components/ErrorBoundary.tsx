import { Component, type ErrorInfo, type ReactNode } from 'react';
import { reportErrorBoundary } from '@/lib/monitoring';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Catches React render crashes so visitors see a graceful screen
 * instead of a blank page — and reports the crash to Telegram.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    reportErrorBoundary(
      `React crash: ${error.message.slice(0, 120)}`,
      `${error.stack?.slice(0, 800) || error.message}\ncomponentStack: ${info.componentStack?.slice(0, 600) || 'n/a'}`
    );
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-dark px-6">
          <div className="text-center max-w-md">
            <p className="font-script text-gold text-3xl italic mb-4">Real Estate Dates</p>
            <h1 className="text-white text-xl font-semibold mb-3">Something went wrong</h1>
            <p className="text-white/70 text-sm mb-6">
              The page hit an unexpected error. It has been reported automatically — please reload.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gold text-dark text-sm font-bold rounded-full hover:bg-gold-light transition-colors"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
