import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Portfolio ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-200 flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full p-8 rounded-3xl bg-[#141414] border border-white/10 shadow-2xl text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Smooth Recovery Active
              </h2>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                A temporary rendering exception was safely intercepted. Your saved data and customized settings are secure.
              </p>
            </div>
            <button
              onClick={this.handleReload}
              className="w-full py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reload Portfolio Safely</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
