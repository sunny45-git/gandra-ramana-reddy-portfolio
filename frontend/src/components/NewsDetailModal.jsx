import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Calendar, Share2, Check, User } from 'lucide-react';

const NewsDetailModal = ({ article, onClose }) => {
  const { lang, t, b } = useLanguage();
  const [copied, setCopied] = React.useState(false);

  if (!article) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString(lang === 'te' ? 'te-IN' : 'en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: b(article.title),
        text: b(article.summary),
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        backgroundColor: 'rgba(10, 25, 47, 0.75)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          width: '100%',
          maxWidth: '760px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 'var(--radius-sm)',
          boxShadow: 'var(--shadow-elevated)',
          position: 'relative',
          border: '1px solid var(--border-medium)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: '#FFFFFF',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <X size={18} />
        </button>

        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt={b(article.title)}
            style={{ width: '100%', maxHeight: '340px', objectFit: 'cover' }}
          />
        )}

        <div style={{ padding: '32px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
              flexWrap: 'wrap',
            }}
          >
            <span className="editorial-badge saffron" style={{ marginBottom: 0 }}>
              {b(article.category)}
            </span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={13} color="var(--accent-saffron)" />
              {formatDate(article.publishedAt)}
            </span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <User size={13} color="var(--accent-navy)" />
              {article.author}
            </span>
          </div>

          <h1
            style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: 'var(--accent-navy)',
              lineHeight: 1.3,
              marginBottom: '18px',
              fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
            }}
          >
            {b(article.title)}
          </h1>

          <div
            style={{
              fontSize: '1.05rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '24px',
              padding: '16px 20px',
              backgroundColor: 'var(--bg-secondary)',
              borderLeft: '3px solid var(--accent-saffron)',
              borderRadius: 'var(--radius-xs)',
            }}
          >
            {b(article.summary)}
          </div>

          <div
            style={{
              fontSize: '1rem',
              color: 'var(--text-primary)',
              lineHeight: 1.8,
              whiteSpace: 'pre-line',
            }}
          >
            {b(article.content)}
          </div>

          <div
            style={{
              marginTop: '32px',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <button
              onClick={handleShare}
              className="btn btn-outline btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              {copied ? <Check size={14} color="green" /> : <Share2 size={14} />}
              <span>{copied ? 'Link Copied' : t.news.share}</span>
            </button>

            <button onClick={onClose} className="btn btn-primary btn-sm">
              {t.common.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailModal;
