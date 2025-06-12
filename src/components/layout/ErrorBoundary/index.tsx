import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-background flex min-h-screen items-center justify-center">
          <div className="p-8 text-center">
            <h1 className="text-destructive mb-4 text-2xl font-bold">
              Ops! Algo deu errado
            </h1>
            <p className="text-muted-foreground mb-6">
              Desculpe, mas algo inesperado aconteceu. Tente atualizar a página.
            </p>
            <Button onClick={() => window.location.reload()} variant="default">
              Atualizar Página
            </Button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-muted-foreground cursor-pointer text-sm">
                  Detalhes do Erro (Apenas em Desenvolvimento)
                </summary>
                <pre className="bg-muted mt-2 overflow-auto rounded p-4 text-xs">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
