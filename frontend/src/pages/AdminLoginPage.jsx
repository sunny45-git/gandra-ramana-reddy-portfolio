import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Lock, Mail, ArrowLeft, AlertCircle, Eye, EyeOff } from 'lucide-react';

const AdminLoginPage = () => {
  const { login } = useAuth();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@gandrareddy.in');
  const [password, setPassword] = useState('Admin@12345');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await login(email.trim(), password.trim());
      navigate('/admin');
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message ||
          (lang === 'te'
            ? 'ఈమెయిల్ లేదా పాస్‌వర్డ్ సరిగ్గా లేవు'
            : 'Invalid credentials. Please verify your email and password.')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-sm)',
          boxShadow: 'var(--shadow-lg)',
          padding: '36px',
        }}
      >
        {/* Back Link */}
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            marginBottom: '24px',
          }}
        >
          <ArrowLeft size={16} />
          <span>{t.admin.backToSite}</span>
        </Link>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-navy)',
              border: '2px solid var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              margin: '0 auto 16px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <Shield size={26} color="var(--accent-gold)" />
          </div>
          <h1
            style={{
              fontSize: '1.45rem',
              fontWeight: 700,
              color: 'var(--accent-navy)',
              lineHeight: 1.3,
              marginBottom: '6px',
              fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
            }}
          >
            {t.admin.loginHeading}
          </h1>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            {t.admin.loginSub}
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(217, 93, 30, 0.1)',
              border: '1px solid var(--accent-saffron)',
              borderRadius: 'var(--radius-xs)',
              color: 'var(--accent-saffron)',
              fontSize: '0.86rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px',
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '6px',
              }}
            >
              {t.admin.emailLabel}
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={lang === 'te' ? 'admin@gandrareddy.in లేదా admin' : 'admin@gandrareddy.in or admin'}
                required
                style={{
                  width: '100%',
                  padding: '11px 14px 11px 40px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-medium)',
                  backgroundColor: 'var(--bg-primary)',
                  outline: 'none',
                  fontSize: '0.92rem',
                }}
              />
              <Mail
                size={16}
                color="var(--text-muted)"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '6px',
              }}
            >
              {t.admin.passwordLabel}
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '11px 40px 11px 40px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-medium)',
                  backgroundColor: 'var(--bg-primary)',
                  outline: 'none',
                  fontSize: '0.92rem',
                }}
              />
              <Lock
                size={16}
                color="var(--text-muted)"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  padding: '4px',
                }}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '6px', padding: '12px' }}
          >
            <Shield size={16} />
            <span>{isSubmitting ? t.admin.loggingIn : t.admin.loginButton}</span>
          </button>
        </form>

        {/* Development default hint */}
        <div
          style={{
            marginTop: '24px',
            padding: '12px 14px',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-xs)',
            fontSize: '0.78rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
          }}
        >
          <strong style={{ color: 'var(--accent-navy)' }}>
            {lang === 'te' ? 'అడ్మిన్ లాగిన్ వివరాలు:' : 'Default Admin Credentials:'}
          </strong>
          <br />
          {lang === 'te' ? 'యూజర్‌నేమ్ / ఈమెయిల్: ' : 'Username / Email: '}
          <code style={{ color: 'var(--accent-saffron)' }}>admin@gandrareddy.in</code>
          {' '}{lang === 'te' ? 'లేదా' : 'or'}{' '}
          <code style={{ color: 'var(--accent-saffron)' }}>admin</code>
          <br />
          {lang === 'te' ? 'పాస్‌వర్డ్: ' : 'Password: '}
          <code style={{ color: 'var(--accent-saffron)' }}>Admin@12345</code>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
