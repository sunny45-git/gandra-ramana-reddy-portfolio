import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Camera, ZoomIn } from 'lucide-react';
import LightboxModal from './LightboxModal';

const PhotoGallery = ({ gallery = [] }) => {
  const { lang, t, b } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = [
    { key: 'All', label: t.gallery.filterAll },
    { key: 'Public Engagements', label: t.gallery.filterPublic },
    { key: 'State Affairs', label: t.gallery.filterState },
    { key: 'Family & Leadership', label: t.gallery.filterFamily },
  ];

  const filtered = gallery.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="gallery" className="section-pad" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header centered">
          <div className="editorial-badge green">
            <Camera size={14} />
            <span>{t.gallery.badge}</span>
          </div>
          <h2 className="section-title">{t.gallery.heading}</h2>
          <div className="telangana-divider">
            <div className="telangana-divider-diamond" />
          </div>
          <p className="section-subtitle">{t.gallery.subheading}</p>
        </div>

        {/* Category Tabs */}
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

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {filtered.map((item, idx) => (
            <div
              key={item._id || idx}
              onClick={() => openLightbox(idx)}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                position: 'relative',
              }}
              className="gallery-item-card"
            >
              <div
                style={{
                  position: 'relative',
                  height: '260px',
                  backgroundColor: 'var(--bg-secondary)',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={item.imageUrl}
                  alt={b(item.title)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.35s ease',
                  }}
                  className="gallery-img"
                  loading="lazy"
                />

                {/* Hover overlay hint */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(11, 37, 69, 0.45)',
                    opacity: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'opacity 0.25s ease',
                    color: '#FFFFFF',
                  }}
                  className="gallery-hover-overlay"
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}
                  >
                    <ZoomIn size={16} />
                    <span>{t.gallery.clickToEnlarge}</span>
                  </div>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(11, 37, 69, 0.85)',
                    color: '#FFFFFF',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-xs)',
                  }}
                >
                  {item.category}
                </div>
              </div>

              {/* Caption */}
              <div style={{ padding: '16px' }}>
                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--accent-navy)',
                    lineHeight: 1.35,
                    marginBottom: '4px',
                    fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'inherit',
                  }}
                >
                  {b(item.title)}
                </h3>
                {item.caption && (
                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.45,
                    }}
                  >
                    {b(item.caption)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Component */}
      <LightboxModal
        images={filtered}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <style>{`
        .gallery-item-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
        }
        .gallery-item-card:hover .gallery-img {
          transform: scale(1.03);
        }
        .gallery-item-card:hover .gallery-hover-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
};

export default PhotoGallery;
