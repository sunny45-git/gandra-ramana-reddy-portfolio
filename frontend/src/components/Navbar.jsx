import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Globe, Shield, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle hash scrolling when landing or changing hash
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const scrollToEl = () => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      };
      scrollToEl();
      const timer = setTimeout(scrollToEl, 250);
      return () => clearTimeout(timer);
    }
  }, [location.hash, location.pathname]);

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

  const handleNavClick = (e, link) => {
    setMobileMenuOpen(false);
    if (link.isRoute) {
      e.preventDefault();
      navigate(link.href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const href = link.href;
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      if (location.pathname !== '/') {
        e.preventDefault();
        navigate(href);
        return;
      }
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: 'var(--navbar-height)',
          backgroundColor: isScrolled ? 'rgba(253, 251, 247, 0.96)' : 'var(--bg-primary)',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Brand Logo & Name */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-navy)',
                border: '2px solid var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
                boxShadow: 'var(--shadow-sm)',
                flexShrink: 0,
              }}
            >
              GVR
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
                  fontSize: lang === 'te' ? '1.15rem' : '1.25rem',
                  fontWeight: 700,
                  color: 'var(--accent-navy)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                }}
              >
                {lang === 'te' ? 'గండ్ర వెంకట రమణా రెడ్డి' : 'Gandra Venkata Ramana Reddy'}
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--accent-saffron)',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                {lang === 'te' ? 'పూర్వ శాసనసభ్యులు | భూపాలపల్లి' : 'Former MLA | Bhupalpally'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '18px',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const isActive = link.isRoute
                ? location.pathname === link.href
                : location.pathname === '/' &&
                  (location.hash === link.href.replace('/', '') || (!location.hash && link.href === '/#home'));

              if (link.isRoute) {
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: isActive ? 700 : 600,
                      color: isActive ? 'var(--accent-saffron)' : 'var(--text-primary)',
                      position: 'relative',
                      padding: '6px 0',
                      borderBottom: isActive ? '2px solid var(--accent-saffron)' : '2px solid transparent',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                    className="nav-link"
                  >
                    {link.label}
                  </Link>
                );
              }

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: isActive ? 700 : 600,
                    color: isActive ? 'var(--accent-saffron)' : 'var(--text-primary)',
                    position: 'relative',
                    padding: '6px 0',
                    borderBottom: isActive ? '2px solid var(--accent-saffron)' : '2px solid transparent',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  className="nav-link"
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Controls: Language Switcher + Admin + Mobile Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Bilingual Switcher */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-sm)',
                padding: '3px',
              }}
              title="Change Language / భాషను మార్చుకోండి"
            >
              <button
                onClick={() => setLang('te')}
                style={{
                  padding: '4px 10px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: lang === 'te' ? 'var(--accent-navy)' : 'transparent',
                  color: lang === 'te' ? '#FFFFFF' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-telugu)',
                }}
              >
                తెలుగు
              </button>
              <button
                onClick={() => setLang('en')}
                style={{
                  padding: '4px 10px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: lang === 'en' ? 'var(--accent-navy)' : 'transparent',
                  color: lang === 'en' ? '#FFFFFF' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease',
                }}
              >
                English
              </button>
            </div>

            {/* Admin Portal Button */}
            <Link
              to="/admin"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--accent-navy)',
                border: '1px solid var(--accent-navy)',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: 'transparent',
                transition: 'all 0.2s ease',
              }}
              className="desktop-admin-btn"
            >
              <Shield size={14} />
              <span>{t.nav.adminLogin}</span>
            </Link>

            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--border-medium)',
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--accent-navy)',
              }}
              className="mobile-toggle-btn"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 'var(--navbar-height)',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(10, 25, 47, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 999,
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '85%',
              maxWidth: '340px',
              height: '100%',
              backgroundColor: 'var(--bg-primary)',
              boxShadow: 'var(--shadow-elevated)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                paddingBottom: '16px',
                marginBottom: '16px',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-navy)' }}>
                {lang === 'te' ? 'మెనూ' : 'NAVIGATION'}
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{ color: 'var(--text-secondary)', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              {navLinks.map((link) => {
                const isActive = link.isRoute
                  ? location.pathname === link.href
                  : location.pathname === '/' &&
                    (location.hash === link.href.replace('/', '') || (!location.hash && link.href === '/#home'));

                const linkStyle = {
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-xs)',
                  color: isActive ? 'var(--accent-saffron)' : 'var(--text-primary)',
                  backgroundColor: isActive ? 'rgba(217, 93, 30, 0.08)' : 'transparent',
                  fontSize: '1rem',
                  fontWeight: isActive ? 700 : 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(232, 227, 217, 0.4)',
                  textDecoration: 'none',
                };

                if (link.isRoute) {
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      style={linkStyle}
                    >
                      <span>{link.label}</span>
                      <ChevronRight size={16} color={isActive ? 'var(--accent-saffron)' : 'var(--accent-gold)'} />
                    </Link>
                  );
                }

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    style={linkStyle}
                  >
                    <span>{link.label}</span>
                    <ChevronRight size={16} color={isActive ? 'var(--accent-saffron)' : 'var(--accent-gold)'} />
                  </a>
                );
              })}
            </div>

            <div
              style={{
                marginTop: '20px',
                paddingTop: '20px',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-outline"
                style={{ width: '100%', fontSize: '0.9rem' }}
              >
                <Shield size={16} />
                <span>{t.nav.adminLogin}</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Inline styles for media queries */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-admin-btn {
            display: inline-flex !important;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
        }
        .nav-link:hover {
          color: var(--accent-saffron) !important;
        }
      `}</style>
    </>
  );
};

export default Navbar;
