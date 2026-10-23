import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronUp, Shield, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = ({ profile }) => {
  const { lang, setLang, t, b } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { href: '/#home', label: t.nav.home },
    { href: '/#about', label: t.nav.about },
    { href: '/#education', label: t.nav.education },
    { href: '/#activities', label: t.nav.publicService },
    { href: '/#milestones', label: t.nav.milestones },
    { href: '/#gallery', label: t.nav.gallery },
    { href: '/#news', label: t.nav.news },
    { href: '/gandra-jyothi', label: t.nav.gandraJyothi, isRoute: true },
    { href: '/#social-media', label: t.nav.socialMedia },
    { href: '/#contact', label: t.nav.contact },
  ];

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-navy-dark)',
        color: 'var(--text-light)',
        paddingTop: '64px',
        paddingBottom: '32px',
        borderTop: '3px solid var(--accent-gold)',
      }}
    >
      <div className="container">
        {/* Top 3-Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Column 1: Leader Profile & Philosophy */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-navy)',
                  border: '2px solid var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                }}
              >
                GVR
              </div>
              <div>
                <div
                  style={{
                    fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                  }}
                >
                  {lang === 'te' ? 'గండ్ర వెంకట రమణా రెడ్డి' : 'Gandra Venkata Ramana Reddy'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {lang === 'te' ? 'పూర్వ శాసనసభ్యులు | భూపాలపల్లి' : 'Former MLA | Bhupalpally'}
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-light-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
              {t.footer.disclaimer}
            </p>

            {/* Language Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)' }}>{t.nav.language}:</span>
              <button
                onClick={() => setLang('te')}
                style={{
                  padding: '3px 8px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: lang === 'te' ? 'var(--accent-gold)' : 'transparent',
                  color: lang === 'te' ? 'var(--bg-navy-dark)' : 'var(--text-light-muted)',
                  border: '1px solid var(--accent-gold)',
                }}
              >
                తెలుగు
              </button>
              <button
                onClick={() => setLang('en')}
                style={{
                  padding: '3px 8px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: lang === 'en' ? 'var(--accent-gold)' : 'transparent',
                  color: lang === 'en' ? 'var(--bg-navy-dark)' : 'var(--text-light-muted)',
                  border: '1px solid var(--accent-gold)',
                }}
              >
                English
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4
              style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'var(--accent-gold)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '18px',
              }}
            >
              {t.footer.quickLinks}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {navLinks.map((link) => {
                if (link.isRoute) {
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      style={{
                        fontSize: '0.88rem',
                        color: 'var(--text-light-muted)',
                        transition: 'color 0.2s ease',
                        textDecoration: 'none',
                      }}
                      className="footer-link"
                    >
                      {link.label}
                    </Link>
                  );
                }
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-light-muted)',
                      transition: 'color 0.2s ease',
                    }}
                    className="footer-link"
                  >
                    {link.label}
                  </a>
                );
              })}
              <Link
                to="/admin"
                style={{
                  fontSize: '0.88rem',
                  color: 'var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '6px',
                }}
              >
                <Shield size={14} />
                <span>{t.nav.adminLogin}</span>
              </Link>
            </div>
          </div>

          {/* Column 3: Constituency Contacts */}
          <div>
            <h4
              style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'var(--accent-gold)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '18px',
              }}
            >
              {t.footer.constituencyOffices}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.86rem', color: 'var(--text-light-muted)' }}>
              <div>
                <strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '2px' }}>
                  {lang === 'te' ? 'భూపాలపల్లి క్యాంప్ కార్యాలయం:' : 'Bhupalpally Camp Office:'}
                </strong>
                <span>Near Collectorate Road, Bhupalpally District, Telangana 506169</span>
              </div>

              <div>
                <strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '2px' }}>
                  {lang === 'te' ? 'హనుమకొండ నివాస కార్యాలయం:' : 'Hanumakonda Residence:'}
                </strong>
                <span>Subedari, Hanumakonda, Warangal, Telangana 506001</span>
              </div>

              <div>
                <strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '2px' }}>
                  {lang === 'te' ? 'అధికారిక ఈమెయిల్:' : 'Official Inquiries:'}
                </strong>
                <span>office@gandrareddy.in | +91 8713 222 345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to top */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ fontSize: '0.8rem', color: 'var(--text-light-muted)' }}>
            {t.footer.copyright}
          </div>

          <button
            onClick={scrollToTop}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--accent-gold)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid rgba(197, 168, 128, 0.3)',
            }}
          >
            <span>{t.footer.backToTop}</span>
            <ChevronUp size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .footer-link:hover {
          color: var(--accent-gold) !important;
          padding-left: 4px;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
