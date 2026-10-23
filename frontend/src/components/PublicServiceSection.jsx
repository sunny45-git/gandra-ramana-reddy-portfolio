import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, MapPin, Tag, ChevronRight, X, Sparkles, Camera, Landmark } from 'lucide-react';

const PublicServiceSection = ({ activities = [] }) => {
  const { lang, t, b } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const categories = [
    { key: 'All', label: t.activities?.filterAll || 'All Initiatives' },
    { key: 'Heritage', label: t.activities?.filterHeritage || (lang === 'te' ? 'ఆధ్యాత్మికం & సంస్కృతి' : 'Heritage & Spiritual') },
    { key: 'Welfare', label: t.activities?.filterWelfare || (lang === 'te' ? 'సంక్షేమం & సాధికారత' : 'Welfare & Support') },
    { key: 'Infrastructure', label: t.activities?.filterInfrastructure || (lang === 'te' ? 'మౌలిక వసతులు' : 'Infrastructure') },
    { key: 'Agriculture', label: t.activities?.filterAgriculture || (lang === 'te' ? 'రైతు సంక్షేమం' : 'Agriculture') },
    { key: 'Grievance', label: t.activities?.filterGrievance || (lang === 'te' ? 'ప్రజా సమస్యలు' : 'Grievance') },
  ];

  const filtered = activities.filter((act) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Heritage') {
      return act.category === 'Heritage' || act.category === 'Spiritual & Heritage' || act.category === 'Community';
    }
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

  const getCategoryLabel = (category) => {
    if (category === 'Heritage') return lang === 'te' ? 'ఆధ్యాత్మికం & సంస్కృతి' : 'Heritage & Spiritual';
    if (category === 'Welfare') return lang === 'te' ? 'సంక్షేమం & సాధికారత' : 'Welfare & Support';
    if (category === 'Infrastructure') return lang === 'te' ? 'మౌలిక వసతులు' : 'Infrastructure';
    if (category === 'Agriculture') return lang === 'te' ? 'రైతు సంక్షేమం' : 'Agriculture';
    if (category === 'Grievance') return lang === 'te' ? 'ప్రజా సమస్యల వేదిక' : 'Public Grievance';
    return category;
  };

  const openModal = (item) => {
    setActiveModalItem(item);
    setActivePhotoIndex(0);
  };

  const closeModal = () => {
    setActiveModalItem(null);
    setActivePhotoIndex(0);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    if (activeModalItem) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalItem]);

  return (
    <section id="activities" className="section-pad" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header centered">
          <div className="editorial-badge saffron">
            <Tag size={14} />
            <span>{t.activities?.badge}</span>
          </div>
          <h2 className="section-title">{t.activities?.heading}</h2>
          <div className="telangana-divider">
            <div className="telangana-divider-diamond" />
          </div>
          <p className="section-subtitle">{t.activities?.subheading}</p>
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
                cursor: 'pointer',
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
            {t.activities?.noActivities}
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
              gap: '24px',
            }}
          >
            {filtered.map((item) => {
              const photoList =
                item.images && item.images.length > 0
                  ? item.images
                  : [item.imageUrl || '/images/gandra-ramana-reddy-portrait.png'];
              const coverImg = photoList[0];

              return (
                <div
                  key={item._id}
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderTop: item.isFeatured ? '3px solid var(--accent-saffron)' : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-xs)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    position: 'relative',
                  }}
                  className="activity-card"
                >
                  {/* Photo preview */}
                  <div
                    style={{
                      position: 'relative',
                      height: '230px',
                      overflow: 'hidden',
                      backgroundColor: 'var(--bg-secondary)',
                      cursor: 'pointer',
                    }}
                    onClick={() => openModal(item)}
                  >
                    <img
                      src={coverImg}
                      alt={b(item.title)}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.35s ease',
                      }}
                      className="activity-img"
                      loading="lazy"
                    />

                    {/* Category Pill */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: 'rgba(11, 37, 69, 0.92)',
                        backdropFilter: 'blur(4px)',
                        color: '#FFFFFF',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-xs)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {getCategoryLabel(item.category)}
                    </div>

                    {/* Featured Star/Badge */}
                    {item.isFeatured && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: 'linear-gradient(135deg, #D95D1E 0%, #C5A880 100%)',
                          color: '#FFFFFF',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-xs)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          letterSpacing: '0.03em',
                        }}
                      >
                        <Sparkles size={11} />
                        <span>{t.activities?.featuredBadge || 'Featured'}</span>
                      </div>
                    )}

                    {/* Multi-Photo Count Badge */}
                    {photoList.length > 1 && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '10px',
                          backgroundColor: 'rgba(11, 37, 69, 0.85)',
                          backdropFilter: 'blur(4px)',
                          color: '#FFFFFF',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-xs)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <Camera size={12} />
                        <span>
                          {photoList.length} {t.activities?.photosCount || 'Photos'}
                        </span>
                      </div>
                    )}
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
                        marginBottom: '8px',
                        fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'inherit',
                      }}
                    >
                      {b(item.title)}
                    </h3>

                    {/* Attribution Box: Built By or Sponsoring */}
                    {item.builtBy && (
                      <div
                        style={{
                          marginBottom: '10px',
                          padding: '7px 10px',
                          backgroundColor: 'var(--bg-secondary)',
                          borderLeft: '3px solid var(--accent-gold-dark)',
                          borderRadius: 'var(--radius-xs)',
                          fontSize: '0.8rem',
                          color: 'var(--accent-navy)',
                          fontWeight: 600,
                          lineHeight: 1.4,
                        }}
                      >
                        <span
                          style={{
                            color: 'var(--text-muted)',
                            fontWeight: 500,
                            display: 'block',
                            fontSize: '0.7rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            marginBottom: '1px',
                          }}
                        >
                          {t.activities?.builtByLabel || 'Built By'}
                        </span>
                        {b(item.builtBy)}
                      </div>
                    )}

                    {item.sponsor && (
                      <div
                        style={{
                          marginBottom: '10px',
                          padding: '7px 10px',
                          backgroundColor: 'var(--bg-secondary)',
                          borderLeft: '3px solid var(--accent-saffron)',
                          borderRadius: 'var(--radius-xs)',
                          fontSize: '0.8rem',
                          color: 'var(--accent-navy)',
                          fontWeight: 600,
                          lineHeight: 1.4,
                        }}
                      >
                        <span
                          style={{
                            color: 'var(--text-muted)',
                            fontWeight: 500,
                            display: 'block',
                            fontSize: '0.7rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            marginBottom: '1px',
                          }}
                        >
                          {t.activities?.sponsorLabel || 'Initiative By'}
                        </span>
                        {b(item.sponsor)}
                      </div>
                    )}

                    {/* Highlights: Festivals or Tradition */}
                    {item.festivals && (
                      <div
                        style={{
                          fontSize: '0.78rem',
                          color: 'var(--accent-green)',
                          fontWeight: 600,
                          marginBottom: '10px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '6px',
                          lineHeight: 1.4,
                        }}
                      >
                        <Landmark size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{b(item.festivals)}</span>
                      </div>
                    )}

                    {item.tradition && (
                      <div
                        style={{
                          fontSize: '0.78rem',
                          color: 'var(--accent-saffron)',
                          fontWeight: 600,
                          marginBottom: '10px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '6px',
                          lineHeight: 1.4,
                        }}
                      >
                        <Sparkles size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{b(item.tradition)}</span>
                      </div>
                    )}

                    <p
                      style={{
                        fontSize: '0.88rem',
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
                      onClick={() => openModal(item)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: 'var(--accent-navy)',
                        padding: '10px 0 0 0',
                        width: '100%',
                        justifyContent: 'space-between',
                        marginTop: 'auto',
                        background: 'none',
                        border: 'none',
                        borderTop: '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        transition: 'color 0.2s ease',
                      }}
                      className="read-details-btn"
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {t.activities?.readDetails || 'View Documentation'}
                        {photoList.length > 1 && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--accent-saffron)', fontWeight: 600 }}>
                            ({photoList.length} {t.activities?.photosCount || 'Photos'})
                          </span>
                        )}
                      </span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Activity Documentation & Photo Gallery Modal */}
      {activeModalItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
            backgroundColor: 'rgba(10, 25, 47, 0.75)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={closeModal}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              width: '100%',
              maxWidth: '720px',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: 'var(--radius-sm)',
              boxShadow: 'var(--shadow-elevated)',
              position: 'relative',
              border: '1px solid var(--border-medium)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 20,
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                color: '#FFFFFF',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
            >
              <X size={18} />
            </button>

            {/* Modal Image & Gallery Switcher */}
            {(() => {
              const modalPhotos =
                activeModalItem.images && activeModalItem.images.length > 0
                  ? activeModalItem.images
                  : [activeModalItem.imageUrl || '/images/gandra-ramana-reddy-portrait.png'];
              const currentModalImg = modalPhotos[activePhotoIndex] || modalPhotos[0];

              return (
                <div>
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      maxHeight: '380px',
                      overflow: 'hidden',
                      backgroundColor: '#0A192F',
                    }}
                  >
                    <img
                      src={currentModalImg}
                      alt={b(activeModalItem.title)}
                      style={{
                        width: '100%',
                        maxHeight: '380px',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    {modalPhotos.length > 1 && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '12px',
                          right: '12px',
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          backdropFilter: 'blur(4px)',
                          color: '#FFFFFF',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-xs)',
                        }}
                      >
                        {activePhotoIndex + 1} / {modalPhotos.length}
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Row if multiple authentic photos */}
                  {modalPhotos.length > 1 && (
                    <div
                      style={{
                        display: 'flex',
                        gap: '8px',
                        padding: '10px 20px',
                        backgroundColor: 'var(--bg-secondary)',
                        borderBottom: '1px solid var(--border-subtle)',
                        overflowX: 'auto',
                      }}
                    >
                      {modalPhotos.map((thumbSrc, tIdx) => (
                        <button
                          key={tIdx}
                          onClick={() => setActivePhotoIndex(tIdx)}
                          style={{
                            width: '74px',
                            height: '52px',
                            borderRadius: 'var(--radius-xs)',
                            overflow: 'hidden',
                            border:
                              activePhotoIndex === tIdx
                                ? '2px solid var(--accent-saffron)'
                                : '2px solid transparent',
                            cursor: 'pointer',
                            padding: 0,
                            opacity: activePhotoIndex === tIdx ? 1 : 0.65,
                            transition: 'all 0.2s ease',
                            flexShrink: 0,
                            backgroundColor: '#0A192F',
                          }}
                          aria-label={`View photo ${tIdx + 1}`}
                        >
                          <img
                            src={thumbSrc}
                            alt=""
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Modal Body */}
            <div style={{ padding: '28px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '14px',
                  flexWrap: 'wrap',
                }}
              >
                <span className="editorial-badge green" style={{ marginBottom: 0 }}>
                  {getCategoryLabel(activeModalItem.category)}
                </span>
                {activeModalItem.isFeatured && (
                  <span className="editorial-badge saffron" style={{ marginBottom: 0 }}>
                    <Sparkles size={12} />
                    <span>{t.activities?.featuredBadge || 'Featured'}</span>
                  </span>
                )}
                <span
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Calendar size={13} color="var(--accent-saffron)" />
                  {formatDate(activeModalItem.date)}
                </span>
                <span
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
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

              {/* Attribution Callout Box */}
              {activeModalItem.builtBy && (
                <div
                  style={{
                    marginBottom: '18px',
                    padding: '12px 16px',
                    backgroundColor: 'var(--bg-secondary)',
                    borderLeft: '4px solid var(--accent-gold-dark)',
                    borderRadius: 'var(--radius-xs)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--accent-navy)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Landmark size={14} color="var(--accent-gold-dark)" />
                    <span>{t.activities?.builtByLabel || 'Built By'}</span>
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-navy)' }}>
                    {b(activeModalItem.builtBy)}
                  </div>
                </div>
              )}

              {activeModalItem.sponsor && (
                <div
                  style={{
                    marginBottom: '18px',
                    padding: '12px 16px',
                    backgroundColor: 'var(--bg-secondary)',
                    borderLeft: '4px solid var(--accent-saffron)',
                    borderRadius: 'var(--radius-xs)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--accent-navy)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Sparkles size={14} color="var(--accent-saffron)" />
                    <span>{t.activities?.sponsorLabel || 'Initiative By'}</span>
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-navy)' }}>
                    {b(activeModalItem.sponsor)}
                  </div>
                </div>
              )}

              {/* Festivals / Cultural Significance Box */}
              {activeModalItem.festivals && (
                <div
                  style={{
                    marginBottom: '18px',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(19, 78, 53, 0.06)',
                    border: '1px solid rgba(19, 78, 53, 0.18)',
                    borderRadius: 'var(--radius-xs)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--accent-green)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '4px',
                    }}
                  >
                    {t.activities?.festivalsLabel || 'Sacred Festivals & Occasions'}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                    {b(activeModalItem.festivals)}
                  </div>
                </div>
              )}

              {activeModalItem.tradition && (
                <div
                  style={{
                    marginBottom: '18px',
                    padding: '12px 16px',
                    backgroundColor: 'var(--accent-saffron-light)',
                    border: '1px solid rgba(217, 93, 30, 0.2)',
                    borderRadius: 'var(--radius-xs)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--accent-saffron)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '4px',
                    }}
                  >
                    {t.activities?.traditionLabel || 'Cultural Significance'}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                    {b(activeModalItem.tradition)}
                  </div>
                </div>
              )}

              {/* Full Description */}
              <div
                style={{
                  fontSize: '0.96rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.75,
                  whiteSpace: 'pre-line',
                }}
              >
                {b(activeModalItem.description)}
              </div>

              {/* Modal footer */}
              <div
                style={{
                  marginTop: '28px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-subtle)',
                  textAlign: 'right',
                }}
              >
                <button
                  onClick={closeModal}
                  style={{
                    padding: '8px 20px',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-secondary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {t.common?.close || (lang === 'te' ? 'మూసివేయి' : 'Close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .activity-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }
        .activity-card:hover .activity-img {
          transform: scale(1.03);
        }
        .read-details-btn:hover {
          color: var(--accent-saffron) !important;
        }
      `}</style>
    </section>
  );
};

export default PublicServiceSection;
