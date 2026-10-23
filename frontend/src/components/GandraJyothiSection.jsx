import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  Heart,
  Trophy,
  Award,
  CheckCircle2,
  X,
  ZoomIn,
  ArrowRight,
  Star,
  Sparkles,
  Flower2,
} from 'lucide-react';

const GandraJyothiSection = ({ gandraJyothi }) => {
  const { lang, t, b } = useLanguage();
  const [lightboxImg, setLightboxImg] = useState(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxImg(null);
      }
    };
    if (lightboxImg) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImg]);

  // If explicitly hidden by admin toggle, hide
  if (gandraJyothi && gandraJyothi.isPublished === false) {
    return null;
  }

  // Verified Fallback details
  const name = b(gandraJyothi?.name, lang === 'te' ? 'శ్రీమతి గండ్ర జ్యోతి' : 'Smt. Gandra Jyothi');
  const title = b(
    gandraJyothi?.title,
    lang === 'te'
      ? 'పూర్వ చైర్‌పర్సన్, వరంగల్ రూరల్ జిల్లా పరిషత్ & ప్రజా నాయకురాలు'
      : 'Former Chairperson, Warangal Rural Zilla Parishad & Public Leader'
  );
  const subtitle = lang === 'te'
    ? 'ఆత్మవిశ్వాసం, భక్తిభావం & సాంస్కృతిక వైభవాల ప్రస్థానం'
    : 'A Journey of Resilience, Spirituality & Cultural Pride';

  const biography = b(
    gandraJyothi?.biography,
    `${t.gandraJyothi.p1}\n\n${t.gandraJyothi.p2}`
  );

  // Authentic uploaded photographs
  const portraitPhoto = gandraJyothi?.photo || '/images/gandra-jyothi-portrait.png';

  const approvedPhotos = [
    {
      src: '/images/gandra-jyothi-tokyo-six-star-marathon.jpg',
      alt: lang === 'te' ? 'టోక్యో మారథాన్ 2025 — అబాట్ సిక్స్ స్టార్ ఘనత' : 'Smt. Gandra Jyothi holding Tokyo 2025 and Abbott Six Star Medals',
      caption: t.gandraJyothi.tokyoSixStarCaption,
      tag: lang === 'te' ? 'వరల్డ్ మారథాన్ మేజర్స్' : 'Marathon Majors',
      title: lang === 'te' ? 'టోక్యో మారథాన్ 2025 — సిక్స్ స్టార్ మెడల్' : 'Tokyo Marathon 2025 — Abbott Six Star Finisher',
    },
    {
      src: '/images/gandra-couple-marathon-celebration.jpg',
      alt: lang === 'te' ? 'టోక్యోలో శ్రీ గండ్ర దంపతుల ఆనందోత్సాహాలు' : 'Sri Gandra and Smt. Gandra Jyothi in Tokyo',
      caption: t.gandraJyothi.coupleMarathonCaption,
      tag: lang === 'te' ? 'ఆదర్శ నాయకత్వం' : 'Shared Celebration',
      title: lang === 'te' ? 'శ్రీ గండ్ర దంపతుల ఆనందోత్సాహాలు' : 'Sri Gandra & Smt. Gandra Jyothi in Tokyo',
    },
    {
      src: '/images/gandra-jyothi-bathukamma-celebration.jpg',
      alt: lang === 'te' ? 'మహిళలతో కలిసి బతుకమ్మ సంబరాలు' : 'Bathukamma Floral Celebration with Local Women',
      caption: t.gandraJyothi.bathukammaCaption,
      tag: lang === 'te' ? 'తెలంగాణ సంస్కృతి' : 'Cultural Roots',
      title: lang === 'te' ? 'బతుకమ్మ పూల సంబరాలు' : 'Bathukamma — Cultural Pride',
    },
    {
      src: '/images/gandra-jyothi-temple-devotion.jpg',
      alt: lang === 'te' ? 'ఆలయ ఉత్సవాలలో పవిత్ర కలశ పూజ' : 'Sacred Temple Rituals and Prayers',
      caption: t.gandraJyothi.spiritualCaption,
      tag: lang === 'te' ? 'ఆధ్యాత్మికం & భక్తి' : 'Faith & Devotion',
      title: lang === 'te' ? 'పవిత్ర ఆలయ పూజలు' : 'Faith & Inner Strength',
    },
  ];

  const marathonCities = [
    { en: 'Tokyo', te: 'టోక్యో' },
    { en: 'Boston', te: 'బోస్టన్' },
    { en: 'London', te: 'లండన్' },
    { en: 'Berlin', te: 'బెర్లిన్' },
    { en: 'Chicago', te: 'చికాగో' },
    { en: 'New York City', te: 'న్యూయార్క్' },
  ];

  const handleImgError = (e, fallbackPath) => {
    if (fallbackPath && e.target.src !== fallbackPath && !e.target.src.endsWith(fallbackPath)) {
      e.target.src = fallbackPath;
    }
  };

  return (
    <section
      id="gandra-jyothi"
      style={{
        paddingTop: '76px',
        paddingBottom: '88px',
        backgroundColor: 'var(--bg-primary)',
        position: 'relative',
        borderTop: '1px solid var(--border-subtle)',
        scrollMarginTop: 'calc(var(--navbar-height) + 24px)',
      }}
    >
      <div className="container" style={{ maxWidth: '1140px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '38px' }}>
          <span className="editorial-badge green">
            <Heart size={14} />
            <span>{t.gandraJyothi.badge}</span>
          </span>

          <h2
            style={{
              fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
              fontSize: '2.25rem',
              fontWeight: 700,
              color: 'var(--accent-navy)',
              lineHeight: 1.25,
              marginTop: '10px',
              marginBottom: '6px',
            }}
          >
            {t.gandraJyothi.heading}
          </h2>

          {/* Subtitle required by user */}
          <p
            style={{
              fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
              fontSize: '1.18rem',
              fontWeight: 600,
              color: 'var(--accent-saffron)',
              margin: '0 auto 12px',
              letterSpacing: '0.01em',
            }}
          >
            {subtitle}
          </p>

          <div className="telangana-divider" style={{ margin: '12px auto' }}>
            <div className="telangana-divider-diamond" />
          </div>

          <p
            style={{
              fontSize: '0.94rem',
              color: 'var(--text-secondary)',
              maxWidth: '680px',
              margin: '0 auto',
            }}
          >
            {title}
          </p>
        </div>

        {/* Primary Narrative & Portrait Grid */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-xs)',
            padding: '28px',
            boxShadow: 'var(--shadow-sm)',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '32px',
            alignItems: 'start',
            marginBottom: '40px',
          }}
          className="jyothi-main-grid"
        >
          {/* Portrait Column with Six Star Badge */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: '100%',
                maxWidth: '300px',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                border: '2px solid var(--accent-gold)',
                padding: '6px',
                backgroundColor: '#FFFFFF',
                boxShadow: 'var(--shadow-md)',
                position: 'relative',
                cursor: 'pointer',
              }}
              onClick={() =>
                setLightboxImg({
                  src: portraitPhoto,
                  alt: name,
                  caption: t.gandraJyothi.photoPortraitCaption,
                  title: name,
                })
              }
              title={t.gandraJyothi.clickToEnlarge}
            >
              <img
                src={portraitPhoto}
                alt={name}
                onError={(e) => handleImgError(e, '/images/gandra-jyothi-portrait.png')}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '380px',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  borderRadius: '2px',
                  display: 'block',
                  transition: 'transform 0.3s ease',
                }}
                className="jyothi-zoom-hover"
                loading="lazy"
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(10, 25, 47, 0.85)',
                  color: 'var(--accent-gold)',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ZoomIn size={15} />
              </div>

              {/* Six Star Finisher Tag */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: 'rgba(10, 25, 47, 0.92)',
                  color: 'var(--accent-gold)',
                  padding: '3px 8px',
                  borderRadius: '10px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Star size={11} fill="var(--accent-gold)" />
                <span>Six-Star Finisher</span>
              </div>
            </div>

            <div style={{ marginTop: '16px', textAlign: 'center', maxWidth: '300px' }}>
              <div
                style={{
                  fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--accent-navy)',
                }}
              >
                {name}
              </div>
              <div
                style={{
                  fontSize: '0.82rem',
                  color: 'var(--accent-green)',
                  fontWeight: 600,
                  marginTop: '4px',
                  lineHeight: 1.4,
                }}
              >
                {title}
              </div>
            </div>
          </div>

          {/* Biography & Key Accomplishments Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {/* Respectful Editorial Text */}
            <div
              style={{
                fontSize: '0.98rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.82,
                whiteSpace: 'pre-line',
              }}
            >
              {biography}
            </div>

            {/* Three Pillars Summary Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '12px',
              }}
            >
              {/* Pillar 1: Marathon */}
              <div
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-medium)',
                  borderLeft: '3px solid var(--accent-saffron)',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-xs)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', fontWeight: 700, color: 'var(--accent-navy)', marginBottom: '4px' }}>
                  <Trophy size={15} color="var(--accent-saffron)" />
                  <span>{t.gandraJyothi.marathonSectionTitle}</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                  {lang === 'te' ? '6 వరల్డ్ మారథాన్ మేజర్స్ (టోక్యో 2025తో సిక్స్-స్టార్ పూర్తి)' : 'Six World Marathon Majors completed at Tokyo on March 2, 2025.'}
                </p>
              </div>

              {/* Pillar 2: Faith & Devotion */}
              <div
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-medium)',
                  borderLeft: '3px solid var(--accent-gold)',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-xs)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', fontWeight: 700, color: 'var(--accent-navy)', marginBottom: '4px' }}>
                  <Sparkles size={15} color="var(--accent-gold)" />
                  <span>{t.gandraJyothi.spiritualSectionTitle}</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                  {lang === 'te' ? 'పవిత్ర ఆలయ ఉత్సవాలు, కలశ పూజలు & అంతరంగిక స్థైర్యం' : 'Temple rituals, moments of gratitude, and spiritual reflection.'}
                </p>
              </div>

              {/* Pillar 3: Bathukamma */}
              <div
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-medium)',
                  borderLeft: '3px solid #c2410c',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-xs)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', fontWeight: 700, color: 'var(--accent-navy)', marginBottom: '4px' }}>
                  <Flower2 size={15} color="#c2410c" />
                  <span>{t.gandraJyothi.bathukammaSectionTitle}</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                  {lang === 'te' ? 'మహిళలతో కలిసి బతుకమ్మ పూల పేర్పు & సాంస్కృతిక వారసత్వం' : 'Telangana floral festival celebrated alongside community women.'}
                </p>
              </div>
            </div>

            {/* Key Verified Responsibilities */}
            <div
              style={{
                backgroundColor: 'var(--bg-secondary)',
                padding: '16px 20px',
                borderRadius: 'var(--radius-xs)',
                borderLeft: '3px solid var(--accent-green)',
              }}
            >
              <div
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: 'var(--accent-navy)',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Award size={16} color="var(--accent-green)" />
                <span>{t.gandraJyothi.keyResponsibilities}</span>
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="var(--accent-green)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>{t.gandraJyothi.resp1}</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="var(--accent-green)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>{t.gandraJyothi.resp2}</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="var(--accent-green)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>{t.gandraJyothi.resp3}</span>
                </li>
              </ul>
            </div>

            {/* Link to Dedicated Page */}
            <div>
              <Link
                to="/gandra-jyothi"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn btn-outline"
                style={{
                  fontSize: '0.88rem',
                  padding: '10px 20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--accent-navy)',
                  color: '#FFFFFF',
                  borderColor: 'var(--accent-navy)',
                  textDecoration: 'none',
                }}
              >
                <span>{t.gandraJyothi.viewDedicatedPage}</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        {/* Photographic Archive Gallery with 4 Authentic Photos */}
        <div style={{ marginTop: '32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 700,
                color: 'var(--accent-saffron)',
                display: 'block',
                marginBottom: '4px',
              }}
            >
              {t.gandraJyothi.photoArchiveTitle}
            </span>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
              {t.gandraJyothi.photoArchiveSubtitle}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '22px',
            }}
            className="jyothi-gallery-grid"
          >
            {approvedPhotos.map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-xs)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer',
                }}
                className="jyothi-photo-card"
                onClick={() => setLightboxImg(item)}
                title={t.gandraJyothi.clickToEnlarge}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '240px',
                    backgroundColor: '#0f172a',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    onError={(e) => handleImgError(e, '/images/gandra-jyothi-portrait.png')}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: idx === 0 ? 'center 20%' : idx === 1 ? 'center 25%' : 'center center',
                      display: 'block',
                      transition: 'transform 0.3s ease',
                    }}
                    className="jyothi-card-img"
                    loading="lazy"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      backgroundColor: 'rgba(10, 25, 47, 0.88)',
                      color: 'var(--accent-gold)',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {item.tag}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      backgroundColor: 'rgba(10, 25, 47, 0.75)',
                      color: '#FFFFFF',
                      borderRadius: '50%',
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ZoomIn size={14} />
                  </div>
                </div>
                <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--accent-navy)', margin: '0 0 6px' }}>
                    {item.title}
                  </h4>
                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(10, 25, 47, 0.94)',
            backdropFilter: 'blur(6px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setLightboxImg(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '880px',
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xs)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-elevated)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 18px',
                borderBottom: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-primary)',
              }}
            >
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-navy)' }}>
                {lightboxImg.title || t.gandraJyothi.heading}
              </span>
              <button
                onClick={() => setLightboxImg(null)}
                aria-label="Close"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#0b1329', textAlign: 'center' }}>
              <img
                src={lightboxImg.src}
                alt={lightboxImg.alt}
                style={{
                  maxWidth: '100%',
                  maxHeight: '76vh',
                  objectFit: 'contain',
                  borderRadius: '2px',
                  display: 'inline-block',
                }}
              />
            </div>
            <div style={{ padding: '14px 18px', backgroundColor: '#FFFFFF' }}>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                {lightboxImg.caption}
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 860px) {
          .jyothi-main-grid {
            grid-template-columns: 300px 1fr !important;
            gap: 36px !important;
            padding: 36px !important;
          }
        }
        .jyothi-photo-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md) !important;
          border-color: var(--accent-gold) !important;
        }
        .jyothi-photo-card:hover .jyothi-card-img {
          transform: scale(1.03);
        }
        .jyothi-zoom-hover:hover {
          transform: scale(1.02);
        }
      `}</style>
    </section>
  );
};

export default GandraJyothiSection;
