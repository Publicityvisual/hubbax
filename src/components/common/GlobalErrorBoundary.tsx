import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("🚨 GLOBAL CRITICAL ERROR:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-red-500/10">
              <span className="text-3xl">⚠️</span>
            </div>
            <h1 className="text-2xl font-black text-white mb-3 tracking-tight">Error Crítico de Sistema</h1>
            <p className="text-neutral-400 mb-8 text-sm leading-relaxed">
              Hemos detectado un problema inesperado en la arquitectura. El sistema de recuperación está intentando estabilizar la aplicación.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-[#d93025] hover:bg-[#ff4e42] text-white font-bold rounded-2xl transition-all active:scale-95 shadow-lg shadow-[#d93025]/20"
            >
              Reiniciar Hubbax
            </button>
            <div className="mt-6 p-3 bg-black/40 rounded-xl text-left overflow-hidden">
              <p className="text-[10px] font-mono text-neutral-500 truncate">
                Error: {this.state.error?.message || 'Unknown Error'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
