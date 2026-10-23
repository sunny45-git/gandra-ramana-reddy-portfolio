import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, MapPin, Tag, ChevronRight, X, ExternalLink } from 'lucide-react';

const PublicServiceSection = ({ activities = [] }) => {
  const { lang, t, b } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalItem, setActiveModalItem] = useState(null);

  const categories = [
    { key: 'All', label: t.activities.filterAll },
    { key: 'Grievance', label: t.activities.filterGrievance },
    { key: 'Agriculture', label: t.activities.filterAgriculture },
    { key: 'Infrastructure', label: t.activities.filterInfrastructure },
    { key: 'Welfare', label: t.activities.filterWelfare },
  ];

  const filtered = activities.filter((act) => {
    if (selectedCategory === 'All') return true;
    return act.category === selectedCategory;
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString(lang === 'te' ? 'te-IN' : 'en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section id="activities" className="section-pad" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header centered">
          <div className="editorial-badge saffron">
            <Tag size={14} />
            <span>{t.activities.badge}</span>
          </div>
          <h2 className="section-title">{t.activities.heading}</h2>
          <div className="telangana-divider">
            <div className="telangana-divider-diamond" />
          </div>
          <p className="section-subtitle">{t.activities.subheading}</p>
        </div>

        {/* Filter Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '36px',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              style={{
                padding: '8px 18px',
                fontSize: '0.88rem',
                fontWeight: 600,
                borderRadius: 'var(--radius-xs)',
                backgroundColor: selectedCategory === cat.key ? 'var(--accent-navy)' : 'var(--bg-secondary)',
                color: selectedCategory === cat.key ? '#FFFFFF' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: selectedCategory === cat.key ? 'var(--accent-navy)' : 'var(--border-medium)',
                transition: 'all 0.2s ease',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Activities Grid */}
        {filtered.length === 0 ? (
          <div
            style={{
              padding: '40px',
              textAlign: 'center',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)',
            }}
          >
            {t.activities.noActivities}
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {filtered.map((item) => (
              <div
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
                className="activity-card"
              >
                {/* Photo preview */}
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden', backgroundColor: 'var(--bg-secondary)' }}>
                  <img
                    src={item.imageUrl || '/images/gandra-ramana-reddy-portrait.png'}
                    alt={b(item.title)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                    }}
                    className="activity-img"
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
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-xs)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {item.category}
                  </div>
                </div>

                {/* Content body */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Meta: date & location */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '12px',
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)',
                      marginBottom: '10px',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} color="var(--accent-saffron)" />
                      <span>{formatDate(item.date)}</span>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={13} color="var(--accent-green)" />
                      <span>{b(item.location)}</span>
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.15rem',
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
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.55,
                      marginBottom: '16px',
                      flex: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {b(item.description)}
                  </p>

                  <button
                    onClick={() => setActiveModalItem(item)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: 'var(--accent-navy)',
                      padding: '6px 0',
                      borderTop: '1px solid var(--border-subtle)',
                      width: '100%',
                      justifyContent: 'space-between',
                      marginTop: 'auto',
                    }}
                  >
                    <span>{t.activities.readDetails}</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Activity Documentation Modal */}
      {activeModalItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
            backgroundColor: 'rgba(10, 25, 47, 0.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setActiveModalItem(null)}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              width: '100%',
              maxWidth: '680px',
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
              onClick={() => setActiveModalItem(null)}
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
              }}
            >
              <X size={18} />
            </button>

            <img
              src={activeModalItem.imageUrl || '/images/gandra-ramana-reddy-portrait.png'}
              alt={b(activeModalItem.title)}
              style={{ width: '100%', maxHeight: '340px', objectFit: 'cover' }}
            />

            <div style={{ padding: '28px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <span className="editorial-badge green" style={{ marginBottom: 0 }}>
                  {activeModalItem.category}
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={13} color="var(--accent-saffron)" />
                  {formatDate(activeModalItem.date)}
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={13} color="var(--accent-green)" />
                  {b(activeModalItem.location)}
                </span>
              </div>

              <h2
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--accent-navy)',
                  marginBottom: '16px',
                  lineHeight: 1.3,
                  fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'inherit',
                }}
              >
                {b(activeModalItem.title)}
              </h2>

              <div
                style={{
                  fontSize: '0.98rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.75,
                  whiteSpace: 'pre-line',
                }}
              >
                {b(activeModalItem.description)}
              </div>

              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', textAlign: 'right' }}>
                <button onClick={() => setActiveModalItem(null)} className="btn btn-outline btn-sm">
                  {t.common.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .activity-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
        }
        .activity-card:hover .activity-img {
          transform: scale(1.02);
        }
      `}</style>
    </section>
  );
};

export default PublicServiceSection;
