import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Newspaper, Calendar, ChevronRight, Share2 } from 'lucide-react';
import NewsDetailModal from './NewsDetailModal';

const NewsSection = ({ news = [] }) => {
  const { lang, t, b } = useLanguage();
  const [activeArticle, setActiveArticle] = useState(null);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString(lang === 'te' ? 'te-IN' : 'en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section
      id="news"
      className="section-pad"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header centered">
          <div className="editorial-badge saffron">
            <Newspaper size={14} />
            <span>{t.news.badge}</span>
          </div>
          <h2 className="section-title">{t.news.heading}</h2>
          <div className="telangana-divider">
            <div className="telangana-divider-diamond" />
          </div>
          <p className="section-subtitle">{t.news.subheading}</p>
        </div>

        {/* News Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '28px',
            maxWidth: '1040px',
            margin: '0 auto',
          }}
        >
          {news.map((item) => (
            <article
              key={item._id}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
              className="news-card"
            >
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden', backgroundColor: 'var(--bg-secondary)' }}>
                <img
                  src={item.imageUrl || '/images/gandra-ramana-reddy-portrait.png'}
                  alt={b(item.title)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(11, 37, 69, 0.9)',
                    color: '#FFFFFF',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-xs)',
                  }}
                >
                  {b(item.category)}
                </div>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    marginBottom: '10px',
                  }}
                >
                  <Calendar size={13} color="var(--accent-saffron)" />
                  <span>{formatDate(item.publishedAt)}</span>
                </div>

                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: 'var(--accent-navy)',
                    lineHeight: 1.35,
                    marginBottom: '10px',
                    fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'inherit',
                  }}
                >
                  {b(item.title)}
                </h3>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.55,
                    marginBottom: '20px',
                    flex: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {b(item.summary)}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--border-subtle)',
                    marginTop: 'auto',
                  }}
                >
                  <button
                    onClick={() => setActiveArticle(item)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      color: 'var(--accent-navy)',
                    }}
                  >
                    <span>{t.news.readMore}</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeArticle && (
        <NewsDetailModal article={activeArticle} onClose={() => setActiveArticle(null)} />
      )}

      <style>{`
        .news-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
        }
      `}</style>
    </section>
  );
};

export default NewsSection;
