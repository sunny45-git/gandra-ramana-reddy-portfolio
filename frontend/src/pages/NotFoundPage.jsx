import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  const { lang } = useLanguage();

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '500px' }}>
        <div
          style={{
            fontSize: '5rem',
            fontWeight: 800,
            color: 'var(--accent-navy)',
            lineHeight: 1,
            marginBottom: '16px',
            fontFamily: 'var(--font-editorial)',
          }}
        >
          404
        </div>
        <h1
          style={{
            fontSize: '1.6rem',
            fontWeight: 700,
            color: 'var(--accent-navy)',
            marginBottom: '12px',
          }}
        >
          {lang === 'te' ? 'పేజీ కనుగొనబడలేదు' : 'Page Not Found'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '28px', lineHeight: 1.6 }}>
          {lang === 'te'
            ? 'మీరు కోరిన పేజీ అందుబాటులో లేదు లేదా తొలగించబడింది.'
            : 'The page you requested could not be found. Please check the URL or return to the official home portal.'}
        </p>
        <Link to="/" className="btn btn-primary">
          <Home size={16} />
          <span>{lang === 'te' ? 'ప్రధాన పేజీకి తిరిగి వెళ్లండి' : 'Return to Home'}</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
