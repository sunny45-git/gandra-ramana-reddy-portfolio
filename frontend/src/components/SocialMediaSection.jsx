import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Share2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  Medal,
} from 'lucide-react';

// Recognizable SVG for X (formerly Twitter)
const XLogoSvg = ({ size = 18, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    style={{ flexShrink: 0 }}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Recognizable SVG for Facebook
const FacebookSvg = ({ size = 18, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    style={{ flexShrink: 0 }}
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

// Recognizable SVG for Instagram
const InstagramSvg = ({ size = 18, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Recognizable SVG for YouTube
const YoutubeSvg = ({ size = 18, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    style={{ flexShrink: 0 }}
    aria-hidden="true"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

// Recognizable SVG for LinkedIn
const LinkedinSvg = ({ size = 18, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    style={{ flexShrink: 0 }}
    aria-hidden="true"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

/**
 * Validates whether a provided string is a genuine individual profile URL,
 * rather than an empty string or generic root domain (e.g. 'https://facebook.com/').
 */
const isGenuineUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) return false;

  try {
    const parsed = new URL(trimmed);
    const pathname = parsed.pathname.replace(/\/+$/, '');
    // If there is no path or only single slash, it's just the homepage of the platform
    if (!pathname || pathname === '') {
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

const SocialMediaSection = ({ profile }) => {
  const { lang, t, b } = useLanguage();

  const handleImgError = (e, fallbackPath) => {
    if (fallbackPath && e.target.src !== fallbackPath && !e.target.src.endsWith(fallbackPath)) {
      e.target.src = fallbackPath;
    }
  };

  // Supported Platforms definition
  const platformConfigs = [
    {
      key: 'facebook',
      name: t.socialMedia.platforms.facebook || 'Facebook',
      icon: (props) => <FacebookSvg {...props} />,
      brandColor: '#1877F2',
      hoverBg: '#1877F2',
      badgeText: 'Follow on Facebook',
    },
    {
      key: 'instagram',
      name: t.socialMedia.platforms.instagram || 'Instagram',
      icon: (props) => <InstagramSvg {...props} />,
      brandColor: '#E1306C',
      hoverBg: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
      badgeText: 'Follow on Instagram',
    },
    {
      key: 'youtube',
      name: t.socialMedia.platforms.youtube || 'YouTube',
      icon: (props) => <YoutubeSvg {...props} />,
      brandColor: '#FF0000',
      hoverBg: '#FF0000',
      badgeText: 'Subscribe on YouTube',
    },
    {
      key: 'twitter',
      name: t.socialMedia.platforms.twitter || 'X (Twitter)',
      icon: (props) => <XLogoSvg {...props} />,
      brandColor: '#0F1419',
      hoverBg: '#000000',
      badgeText: 'Follow on X',
    },
    {
      key: 'linkedin',
      name: t.socialMedia.platforms.linkedin || 'LinkedIn',
      icon: (props) => <LinkedinSvg {...props} />,
      brandColor: '#0A66C2',
      hoverBg: '#0A66C2',
      badgeText: 'Connect on LinkedIn',
    },
  ];

  // 1. Sri Gandra Venkata Ramana Reddy Data
  const gvrName = b(profile?.fullName, t.socialMedia.leaderGvrTitle);
  const gvrDesignation = b(profile?.designation, t.socialMedia.leaderGvrRole);
  const gvrPhoto = profile?.portraitImage || '/images/gandra-ramana-reddy-portrait.png';
  const gvrSocialLinks = profile?.contactInfo?.socialLinks || profile?.socialLinks || {};

  const gvrActivePlatforms = platformConfigs
    .map((cfg) => ({
      ...cfg,
      url: gvrSocialLinks[cfg.key] || '',
    }))
    .filter((item) => isGenuineUrl(item.url));

  // 2. Smt. Gandra Jyothi Data
  const jyothi = profile?.gandraJyothi || {};
  const jyothiName = b(jyothi?.name, t.socialMedia.leaderJyothiTitle);
  const jyothiTitle = b(jyothi?.title, t.socialMedia.leaderJyothiRole);
  const jyothiIntro = b(
    jyothi?.introduction,
    lang === 'te'
      ? 'గ్రామీణాభివృద్ధి, మహిళా సాధికారత, నిస్వార్థ ప్రజాసేవ మరియు పట్టుదలతో కూడిన నాయకత్వ ప్రస్థానం.'
      : 'A lifetime of dedication to local governance, rural development, women’s economic independence, and athletic perseverance.'
  );
  const jyothiPhoto = jyothi?.photo || '/images/gandra-jyothi-portrait.png';
  const jyothiSocialLinks = jyothi?.socialLinks || {};

  const jyothiActivePlatforms = platformConfigs
    .map((cfg) => ({
      ...cfg,
      url: jyothiSocialLinks[cfg.key] || '',
    }))
    .filter((item) => isGenuineUrl(item.url));

  return (
    <section
      id="social-media"
      className="section-pad"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-subtle)',
        position: 'relative',
      }}
    >
      <div className="container" style={{ maxWidth: '1180px' }}>
        {/* Section Header */}
        <div className="section-header centered" style={{ marginBottom: '46px' }}>
          <div className="editorial-badge gold" style={{ marginBottom: '10px' }}>
            <Share2 size={14} />
            <span>{t.socialMedia.badge}</span>
          </div>
          <h2 className="section-title" style={{ fontSize: '2.25rem', marginBottom: '12px' }}>
            {t.socialMedia.heading}
          </h2>
          <div className="telangana-divider" style={{ margin: '12px auto' }}>
            <div className="telangana-divider-diamond" />
          </div>
          <p className="section-subtitle" style={{ maxWidth: '720px', margin: '0 auto' }}>
            {t.socialMedia.subheading}
          </p>
        </div>

        {/* 2 Dedicated Profile Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '32px',
            marginBottom: '40px',
          }}
          className="social-cards-grid"
        >
          {/* ============================================================== */}
          {/* Card 1: Sri Gandra Venkata Ramana Reddy                        */}
          {/* ============================================================== */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-medium)',
              boxShadow: 'var(--shadow-md)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="social-profile-card"
          >
            {/* Top Navy-Gold Accent Bar */}
            <div
              style={{
                height: '5px',
                background: 'linear-gradient(90deg, var(--accent-navy) 0%, var(--accent-gold) 50%, var(--accent-saffron) 100%)',
              }}
            />

            <div style={{ padding: '32px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              {/* Leader Identity Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '22px' }}>
                <div
                  style={{
                    position: 'relative',
                    width: '92px',
                    height: '92px',
                    borderRadius: '50%',
                    padding: '3px',
                    backgroundColor: '#FFFFFF',
                    border: '2px solid var(--accent-gold)',
                    boxShadow: '0 4px 14px rgba(10, 25, 47, 0.12)',
                    flexShrink: 0,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={gvrPhoto}
                    alt={gvrName}
                    onError={(e) => handleImgError(e, '/images/gandra-ramana-reddy-portrait.png')}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      borderRadius: '50%',
                      display: 'block',
                    }}
                    loading="lazy"
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      backgroundColor: 'rgba(10, 25, 47, 0.06)',
                      color: 'var(--accent-navy)',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                    }}
                  >
                    <ShieldCheck size={13} color="var(--accent-navy)" />
                    <span>{lang === 'te' ? 'భూపాలపల్లి ప్రజా నాయకత్వం' : 'Bhupalpally Leadership'}</span>
                  </div>

                  <h3
                    style={{
                      fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
                      fontSize: '1.45rem',
                      fontWeight: 700,
                      color: 'var(--accent-navy)',
                      lineHeight: 1.25,
                      margin: '0 0 6px',
                    }}
                  >
                    {gvrName}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.84rem',
                      color: 'var(--accent-saffron)',
                      fontWeight: 600,
                      lineHeight: 1.4,
                      margin: 0,
                    }}
                  >
                    {gvrDesignation}
                  </p>
                </div>
              </div>

              {/* Dignified Legislative Service Pill */}
              <div
                style={{
                  backgroundColor: 'rgba(197, 168, 128, 0.1)',
                  borderLeft: '3px solid var(--accent-gold)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '12px 16px',
                  marginBottom: '24px',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.55,
                }}
              >
                {lang === 'te'
                  ? 'ప్రభుత్వ చీఫ్ విప్ (2009-2014) & ఎమ్మెల్యే (2018-2023). నియోజకవర్గ ప్రజా సమస్యలు, అభివృద్ధి మరియు సంక్షేమ కార్యక్రమాల సమాచారం కోసం అనుసరించండి.'
                  : 'Former Government Chief Whip & MLA (Bhupalpally). Follow for official press statements, constituency development works, and civic representations.'}
              </div>

              {/* Social Media Links Area */}
              <div style={{ marginTop: 'auto' }}>
                <div
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{t.socialMedia.connectWith}</span>
                  {gvrActivePlatforms.length > 0 && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: 'var(--accent-green)',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        textTransform: 'none',
                      }}
                    >
                      <CheckCircle2 size={13} />
                      <span>{t.socialMedia.verifiedOfficialBadge}</span>
                    </span>
                  )}
                </div>

                {gvrActivePlatforms.length > 0 ? (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                      gap: '10px',
                    }}
                  >
                    {gvrActivePlatforms.map((platform) => {
                      const IconComponent = platform.icon;
                      return (
                        <a
                          key={platform.key}
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit official ${platform.name} profile of ${gvrName} (opens in new tab)`}
                          className="social-channel-btn"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px 14px',
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--border-medium)',
                            borderRadius: 'var(--radius-xs)',
                            color: 'var(--accent-navy)',
                            textDecoration: 'none',
                            fontSize: '0.86rem',
                            fontWeight: 600,
                            transition: 'all 0.22s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = platform.hoverBg;
                            e.currentTarget.style.color = '#FFFFFF';
                            e.currentTarget.style.borderColor = platform.brandColor;
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.15)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                            e.currentTarget.style.color = 'var(--accent-navy)';
                            e.currentTarget.style.borderColor = 'var(--border-medium)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <IconComponent size={18} color="currentColor" />
                          <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {platform.name}
                          </span>
                          <ExternalLink size={13} style={{ opacity: 0.65 }} />
                        </a>
                      );
                    })}
                  </div>
                ) : (
                  /* Dignified Pending Verification State */
                  <div
                    style={{
                      backgroundColor: 'rgba(10, 25, 47, 0.03)',
                      border: '1px dashed var(--accent-gold)',
                      borderRadius: 'var(--radius-xs)',
                      padding: '18px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={16} color="var(--accent-saffron)" />
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-navy)' }}>
                        {t.socialMedia.handlesPendingBadge}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                      {t.socialMedia.handlesPendingNote}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingTop: '4px' }}>
                      {platformConfigs.map((cfg) => {
                        const Icon = cfg.icon;
                        return (
                          <span
                            key={cfg.key}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              border: '1px solid var(--border-medium)',
                              padding: '4px 9px',
                              borderRadius: '12px',
                              fontSize: '0.74rem',
                              fontWeight: 600,
                              color: 'var(--text-muted)',
                            }}
                          >
                            <Icon size={12} color="var(--text-muted)" />
                            <span>{cfg.name}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* Card 2: Smt. Gandra Jyothi                                    */}
          {/* ============================================================== */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-medium)',
              boxShadow: 'var(--shadow-md)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="social-profile-card"
          >
            {/* Top Green-Gold Accent Bar */}
            <div
              style={{
                height: '5px',
                background: 'linear-gradient(90deg, var(--accent-green) 0%, var(--accent-gold) 50%, #c2410c 100%)',
              }}
            />

            <div style={{ padding: '32px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              {/* Leader Identity Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '22px' }}>
                <div
                  style={{
                    position: 'relative',
                    width: '92px',
                    height: '92px',
                    borderRadius: '50%',
                    padding: '3px',
                    backgroundColor: '#FFFFFF',
                    border: '2px solid var(--accent-gold)',
                    boxShadow: '0 4px 14px rgba(30, 107, 74, 0.12)',
                    flexShrink: 0,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={jyothiPhoto}
                    alt={jyothiName}
                    onError={(e) => handleImgError(e, '/images/gandra-jyothi-portrait.png')}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      borderRadius: '50%',
                      display: 'block',
                    }}
                    loading="lazy"
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      backgroundColor: 'rgba(30, 107, 74, 0.08)',
                      color: 'var(--accent-green)',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                    }}
                  >
                    <Medal size={13} color="var(--accent-green)" />
                    <span>{lang === 'te' ? 'సిక్స్ స్టార్ మారథానర్ & ప్రజా సేవ' : 'Six-Star Marathoner & Leader'}</span>
                  </div>

                  <h3
                    style={{
                      fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
                      fontSize: '1.45rem',
                      fontWeight: 700,
                      color: 'var(--accent-navy)',
                      lineHeight: 1.25,
                      margin: '0 0 6px',
                    }}
                  >
                    {jyothiName}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.84rem',
                      color: 'var(--accent-green)',
                      fontWeight: 600,
                      lineHeight: 1.4,
                      margin: 0,
                    }}
                  >
                    {jyothiTitle}
                  </p>
                </div>
              </div>

              {/* Dignified Civic & Sports Pill */}
              <div
                style={{
                  backgroundColor: 'rgba(30, 107, 74, 0.06)',
                  borderLeft: '3px solid var(--accent-green)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '12px 16px',
                  marginBottom: '24px',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.55,
                }}
              >
                {jyothiIntro}
              </div>

              {/* Social Media Links Area */}
              <div style={{ marginTop: 'auto' }}>
                <div
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{t.socialMedia.connectWith}</span>
                  {jyothiActivePlatforms.length > 0 && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: 'var(--accent-green)',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        textTransform: 'none',
                      }}
                    >
                      <CheckCircle2 size={13} />
                      <span>{t.socialMedia.verifiedOfficialBadge}</span>
                    </span>
                  )}
                </div>

                {jyothiActivePlatforms.length > 0 ? (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                      gap: '10px',
                    }}
                  >
                    {jyothiActivePlatforms.map((platform) => {
                      const IconComponent = platform.icon;
                      return (
                        <a
                          key={platform.key}
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit official ${platform.name} profile of ${jyothiName} (opens in new tab)`}
                          className="social-channel-btn"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px 14px',
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--border-medium)',
                            borderRadius: 'var(--radius-xs)',
                            color: 'var(--accent-navy)',
                            textDecoration: 'none',
                            fontSize: '0.86rem',
                            fontWeight: 600,
                            transition: 'all 0.22s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = platform.hoverBg;
                            e.currentTarget.style.color = '#FFFFFF';
                            e.currentTarget.style.borderColor = platform.brandColor;
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.15)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                            e.currentTarget.style.color = 'var(--accent-navy)';
                            e.currentTarget.style.borderColor = 'var(--border-medium)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <IconComponent size={18} color="currentColor" />
                          <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {platform.name}
                          </span>
                          <ExternalLink size={13} style={{ opacity: 0.65 }} />
                        </a>
                      );
                    })}
                  </div>
                ) : (
                  /* Dignified Pending Verification State */
                  <div
                    style={{
                      backgroundColor: 'rgba(30, 107, 74, 0.03)',
                      border: '1px dashed rgba(30, 107, 74, 0.35)',
                      borderRadius: 'var(--radius-xs)',
                      padding: '18px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={16} color="var(--accent-green)" />
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-navy)' }}>
                        {t.socialMedia.handlesPendingBadge}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                      {t.socialMedia.handlesPendingNote}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingTop: '4px' }}>
                      {platformConfigs.map((cfg) => {
                        const Icon = cfg.icon;
                        return (
                          <span
                            key={cfg.key}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              border: '1px solid var(--border-medium)',
                              padding: '4px 9px',
                              borderRadius: '12px',
                              fontSize: '0.74rem',
                              fontWeight: 600,
                              color: 'var(--text-muted)',
                            }}
                          >
                            <Icon size={12} color="var(--text-muted)" />
                            <span>{cfg.name}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Official Transparency Notice */}
        <div
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xs)',
            padding: '16px 22px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          <ShieldCheck size={20} color="var(--accent-gold-dark)" style={{ flexShrink: 0 }} />
          <p
            style={{
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.55,
              margin: 0,
            }}
          >
            {t.socialMedia.citizenNotice}
          </p>
        </div>
      </div>

      <style>{`
        .social-profile-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg) !important;
          border-color: var(--accent-gold) !important;
        }
        @media (max-width: 640px) {
          .social-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default SocialMediaSection;
