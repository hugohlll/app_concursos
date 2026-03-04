import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Atualiza o state para que a próxima renderização mostre a UI alternativa.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Aqui você pode registrar o erro em um serviço de relatórios (Ex: Sentry)
    console.error("Erro capturado pelo ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Falha Segura (Fail Closed) - A10:2025
      return (
        <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <h2>Oops! Algo deu errado.</h2>
          <p>O aplicativo encontrou um erro inesperado e foi interrompido por segurança.</p>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', marginTop: '1rem', cursor: 'pointer' }}>
            Recarregar Aplicativo
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
