import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronRight, Award, Compass, MessageSquare } from 'lucide-react';

const Hero = ({ profile }) => {
  const { lang, t, b } = useLanguage();

  const fullName = b(profile?.fullName, 'Gandra Venkata Ramana Reddy');
  const designation = b(
    profile?.designation,
    lang === 'te'
      ? 'సీనియర్ రాజకీయ నాయకులు & పూర్వ శాసనసభ్యులు'
      : 'Senior Political Leader & Former Member of Legislative Assembly'
  );
  const heroQuote = b(profile?.heroDignifiedMessage, t.hero.quote);
  const portraitUrl = profile?.portraitImage || '/images/gandra-ramana-reddy-portrait.png';

  return (
    <section
      id="home"
      style={{
        paddingTop: 'calc(var(--navbar-height) + 40px)',
        paddingBottom: '60px',
        backgroundColor: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle traditional patterned corner border decoration */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle at top right, rgba(197, 168, 128, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '40px',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Text Content Column */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span className="editorial-badge saffron">
                <Award size={14} />
                <span>{t.hero.officialBadge}</span>
              </span>
            </div>

            <h1
              style={{
                fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
                fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
                fontWeight: 700,
                color: 'var(--accent-navy)',
                lineHeight: lang === 'te' ? 1.3 : 1.1,
                marginBottom: '16px',
                letterSpacing: '-0.02em',
              }}
            >
              {fullName}
            </h1>

            <div
              style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                fontWeight: 600,
                color: 'var(--accent-green)',
                lineHeight: 1.45,
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  width: '28px',
                  height: '2px',
                  backgroundColor: 'var(--accent-saffron)',
                  display: 'inline-block',
                }}
              />
              <span>{designation}</span>
            </div>

            {/* Dignified Public Service Message in warm editorial frame */}
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderLeft: '4px solid var(--accent-navy)',
                borderTop: '1px solid var(--border-subtle)',
                borderRight: '1px solid var(--border-subtle)',
                borderBottom: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-xs)',
                padding: '20px 24px',
                marginBottom: '28px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <p
                style={{
                  fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
                  fontSize: lang === 'te' ? '1.05rem' : '1.25rem',
                  fontStyle: lang === 'te' ? 'normal' : 'italic',
                  color: 'var(--text-primary)',
                  lineHeight: 1.6,
                }}
              >
                {heroQuote}
              </p>
            </div>

            {/* Verified Credentials Pills */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                marginBottom: '32px',
              }}
            >
              <div
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-xs)',
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  {t.hero.constituencyLabel}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--accent-navy)', marginTop: '2px' }}>
                  {lang === 'te' ? 'భూపాలపల్లి నియోజకవర్గం' : 'Bhupalpally Constituency'}
                </div>
              </div>

              <div
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-xs)',
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  {t.hero.formerRoleLabel}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--accent-navy)', marginTop: '2px' }}>
                  {lang === 'te' ? 'పూర్వ ప్రభుత్వ చీఫ్ విప్ (2009-2014)' : 'Govt. Chief Whip (2009-2014)'}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <a href="#about" className="btn btn-primary">
                <span>{t.hero.ctaAbout}</span>
                <ChevronRight size={16} />
              </a>
              <a href="#activities" className="btn btn-outline">
                <Compass size={16} />
                <span>{t.hero.ctaService}</span>
              </a>
              <a href="#contact" className="btn btn-saffron">
                <MessageSquare size={16} />
                <span>{t.hero.ctaContact}</span>
              </a>
            </div>
          </div>

          {/* Portrait Column */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* Elegant framing wrapper */}
            <div
              style={{
                position: 'relative',
                maxWidth: '440px',
                width: '100%',
              }}
            >
              {/* Subtle back decorative frame */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-12px -12px 12px 12px',
                  border: '2px solid var(--accent-gold)',
                  borderRadius: 'var(--radius-sm)',
                  opacity: 0.6,
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />

              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  backgroundColor: '#FFFFFF',
                  padding: '10px',
                  borderRadius: 'var(--radius-xs)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <img
                  src={portraitUrl}
                  alt="Sri Gandra Venkata Ramana Reddy - Official Portrait"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '560px',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    borderRadius: '2px',
                  }}
                  loading="eager"
                />

                {/* Caption Bar */}
                <div
                  style={{
                    marginTop: '10px',
                    padding: '8px 12px',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-xs)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-navy)' }}>
                    {lang === 'te' ? 'శ్రీ గండ్ర వెంకట రమణా రెడ్డి' : 'Sri Gandra Venkata Ramana Reddy'}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--accent-saffron)', fontWeight: 700 }}>
                    {lang === 'te' ? 'అధికారిక చిత్రపటం' : 'Authorized Portrait'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
            gap: 60px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
