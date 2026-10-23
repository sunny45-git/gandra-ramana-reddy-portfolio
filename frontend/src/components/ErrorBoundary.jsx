import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
            backgroundColor: 'var(--bg-primary, #FDFBF7)',
            color: 'var(--accent-navy, #0A192F)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              maxWidth: '520px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-medium, #E8E3D9)',
              borderRadius: 'var(--radius-xs, 4px)',
              padding: '36px',
              boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0,0,0,0.1))',
            }}
          >
            <h2
              style={{
                fontSize: '1.4rem',
                fontWeight: 700,
                color: 'var(--accent-navy, #0A192F)',
                marginBottom: '12px',
              }}
            >
              Something went wrong loading this section
            </h2>
            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--text-secondary, #4A5568)',
                lineHeight: 1.6,
                marginBottom: '24px',
              }}
            >
              An unexpected error occurred while rendering this page. You can return to the home page or try reloading.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <a
                href="/"
                className="btn btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '10px 20px',
                  backgroundColor: 'var(--accent-navy, #0A192F)',
                  color: '#FFFFFF',
                  borderRadius: 'var(--radius-xs, 4px)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                }}
              >
                Return to Home
              </a>
              <button
                type="button"
                onClick={() => window.location.reload()}
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--border-medium, #E8E3D9)',
                  borderRadius: 'var(--radius-xs, 4px)',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  color: 'var(--text-primary, #1A202C)',
                }}
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
