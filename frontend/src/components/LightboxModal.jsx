import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const LightboxModal = ({ images, activeIndex, onClose, onPrev, onNext }) => {
  const { lang, b } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (activeIndex === null || !images || images.length === 0) return null;

  const currentImage = images[activeIndex];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1200,
        backgroundColor: 'rgba(5, 15, 30, 0.95)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      {/* Top Bar with counter & close */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '24px',
          right: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#FFFFFF',
          zIndex: 10,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--accent-gold)' }}>
          {activeIndex + 1} / {images.length}
        </div>
        <button
          onClick={onClose}
          aria-label="Close Lightbox"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <X size={22} />
        </button>
      </div>

      {/* Prev / Next Buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous Image"
        style={{
          position: 'absolute',
          left: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next Image"
        style={{
          position: 'absolute',
          right: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        <ChevronRight size={28} />
      </button>

      {/* Main Image Container */}
      <div
        style={{
          maxWidth: '90vw',
          maxHeight: '75vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.imageUrl}
          alt={b(currentImage.title)}
          style={{
            maxWidth: '100%',
            maxHeight: '75vh',
            objectFit: 'contain',
            borderRadius: 'var(--radius-xs)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
          }}
        />
      </div>

      {/* Caption & Title */}
      <div
        style={{
          maxWidth: '720px',
          textAlign: 'center',
          color: '#FFFFFF',
          padding: '0 20px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            marginBottom: '6px',
            fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'inherit',
          }}
        >
          {b(currentImage.title)}
        </h3>
        {currentImage.caption && (
          <p style={{ fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.5 }}>
            {b(currentImage.caption)}
          </p>
        )}
      </div>
    </div>
  );
};

export default LightboxModal;
