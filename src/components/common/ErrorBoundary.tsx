import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  name?: string;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo, callback: () => void) {
    console.error(`🚨 Hubbax Error Boundary [${this.props.name || 'Unknown'}]:`, error, errorInfo);
    callback();
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs text-center my-2">
          ❌ Error cargando sección {this.props.name || 'de contenido'}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
