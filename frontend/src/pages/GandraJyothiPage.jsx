import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import { apiService } from '../services/api';
import {
  defaultProfile,
  defaultJyothiActivities,
  defaultJyothiMilestones,
  defaultJyothiGallery,
  defaultJyothiNews,
  defaultJyothiMarathons,
} from '../data/defaultData';
import {
  Heart,
  Trophy,
  Award,
  CheckCircle2,
  X,
  ZoomIn,
  ArrowLeft,
  Calendar,
  MapPin,
  ExternalLink,
  Shield,
  Layers,
  Camera,
  Newspaper,
  GraduationCap,
  Users,
  ChevronRight,
  Star,
  Sparkles,
  Flower2,
  Quote,
} from 'lucide-react';

const GandraJyothiPage = () => {
  const { lang, t, b } = useLanguage();

  const [profileData, setProfileData] = useState(defaultProfile.gandraJyothi);
  const [activities, setActivities] = useState(defaultJyothiActivities);
  const [milestones, setMilestones] = useState(defaultJyothiMilestones);
  const [gallery, setGallery] = useState(defaultJyothiGallery);
  const [news, setNews] = useState(defaultJyothiNews);
  const [marathons] = useState(defaultJyothiMarathons);

  const [activeActivityCat, setActiveActivityCat] = useState('All');
  const [activeGalleryCat, setActiveGalleryCat] = useState('All');
  const [lightboxImg, setLightboxImg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadData = async () => {
      setLoading(true);
      try {
        const [profRes, actRes, mileRes, galRes, newsRes] = await Promise.all([
          apiService.getGandraJyothiProfile().catch(() => null),
          apiService.getGandraJyothiActivities().catch(() => null),
          apiService.getGandraJyothiAchievements().catch(() => null),
          apiService.getGandraJyothiGallery().catch(() => null),
          apiService.getGandraJyothiNews().catch(() => null),
        ]);

        if (profRes?.data) setProfileData(profRes.data);
        if (Array.isArray(actRes?.data) && actRes.data.length > 0) setActivities(actRes.data);
        if (Array.isArray(mileRes?.data) && mileRes.data.length > 0) setMilestones(mileRes.data);
        if (Array.isArray(galRes?.data) && galRes.data.length > 0) setGallery(galRes.data);
        if (Array.isArray(newsRes?.data) && newsRes.data.length > 0) setNews(newsRes.data);
      } catch (err) {
        console.warn('Using verified default data for Smt. Gandra Jyothi');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Keyboard close for lightbox
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

  const name = b(profileData?.name, lang === 'te' ? 'శ్రీమతి గండ్ర జ్యోతి' : 'Smt. Gandra Jyothi');
  const title = b(
    profileData?.title,
    lang === 'te'
      ? 'పూర్వ చైర్‌పర్సన్, వరంగల్ రూరల్ జిల్లా పరిషత్ & ప్రజా నాయకురాలు'
      : 'Former Chairperson, Warangal Rural Zilla Parishad & Public Leader'
  );
  const subtitle = lang === 'te'
    ? 'ఆత్మవిశ్వాసం, భక్తిభావం & సాంస్కృతిక వైభవాల ప్రస్థానం'
    : 'A Journey of Resilience, Spirituality & Cultural Pride';

  const biography = b(
    profileData?.biography,
    `${t.gandraJyothi.p1}\n\n${t.gandraJyothi.p2}`
  );
  const introduction = b(
    profileData?.introduction,
    lang === 'te'
      ? 'గ్రామీణాభివృద్ధి, మహిళా సాధికారత, నిస్వార్థ ప్రజాసేవ మరియు పట్టుదలతో కూడిన నాయకత్వ ప్రస్థానం.'
      : 'A lifetime of dedication to local governance, rural development, women’s economic independence, and athletic perseverance.'
  );
  const communityInvolvement = b(
    profileData?.communityInvolvement || profileData?.publicService,
    lang === 'te'
      ? 'వరంగల్, భూపాలపల్లి గ్రామీణ మండలాల్లో మహిళా స్వయం సహాయక సంఘాల బలోపేతం, రైతు కుటుంబాలకు అండగా నిలవడం మరియు పాఠశాలల్లో మౌలిక వసతుల పర్యవేక్షణ.'
      : 'Extensive grassroots engagement across Warangal and Bhupalpally mandals supporting women self-help federations, farmer families, and educational infrastructure.'
  );

  const portraitPhoto = profileData?.photo || '/images/gandra-jyothi-portrait.png';

  const marathonCities = [
    { en: 'Tokyo', te: 'టోక్యో' },
    { en: 'Boston', te: 'బోస్టన్' },
    { en: 'London', te: 'లండన్' },
    { en: 'Berlin', te: 'బెర్లిన్' },
    { en: 'Chicago', te: 'చికాగో' },
    { en: 'New York City', te: 'న్యూయార్క్' },
  ];

  const activityCategories = [
    { id: 'All', label: t.gandraJyothi.filterAll },
    { id: 'Welfare', label: t.gandraJyothi.filterWelfare },
    { id: 'Community', label: t.gandraJyothi.filterCommunity },
    { id: 'Infrastructure', label: t.gandraJyothi.filterInfrastructure },
  ];

  const filteredActivities = activities.filter((act) => {
    if (activeActivityCat === 'All') return true;
    return act.category === activeActivityCat;
  });

  const galleryCategories = [
    { id: 'All', label: t.gandraJyothi.filterAll },
    { id: 'Marathon Majors', label: lang === 'te' ? 'వరల్డ్ మారథాన్స్' : 'Marathon Majors' },
    { id: 'Faith & Spirituality', label: lang === 'te' ? 'ఆధ్యాత్మికం & భక్తి' : 'Faith & Spirituality' },
    { id: 'Cultural Celebrations', label: lang === 'te' ? 'బతుకమ్మ & సంస్కృతి' : 'Cultural Celebrations' },
    { id: 'Public Leadership', label: lang === 'te' ? 'ప్రజా నాయకత్వం' : 'Public Leadership' },
  ];

  const filteredGallery = gallery.filter((img) => {
    if (activeGalleryCat === 'All') return true;
    return img.category === activeGalleryCat;
  });

  const handleImgError = (e, fallbackPath) => {
    if (fallbackPath && e.target.src !== fallbackPath && !e.target.src.endsWith(fallbackPath)) {
      e.target.src = fallbackPath;
    }
  };

  const verifiedEducation = profileData?.educationalQualifications?.filter((edu) => edu.isVerified && edu.qualification?.en);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      <main style={{ flex: 1, paddingTop: 'calc(var(--navbar-height) + 20px)', paddingBottom: '90px' }}>
        <div className="container" style={{ maxWidth: '1180px' }}>
          
          {/* Breadcrumb Navigation */}
          <div
            style={{
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--accent-navy)',
                fontSize: '0.88rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <ArrowLeft size={16} />
              <span>{t.gandraJyothi.backToHome}</span>
            </Link>

            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                {t.nav.home}
              </Link>{' '}
              /{' '}
              <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>
                {name}
              </span>
            </div>
          </div>

          {/* ============================================================== */}
          {/* 1. PREMIUM EDITORIAL INTRODUCTION HERO                         */}
          {/* ============================================================== */}
          <section
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-sm)',
              padding: '38px',
              boxShadow: 'var(--shadow-md)',
              marginBottom: '44px',
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF8F5 100%)',
            }}
          >
            {/* Elegant Header Accent Bar */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, var(--accent-navy) 0%, var(--accent-gold) 45%, var(--accent-saffron) 100%)',
              }}
            />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '36px',
                alignItems: 'center',
              }}
              className="jyothi-hero-grid"
            >
              {/* Profile Portrait with Six Star Crown Accent */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '330px',
                    borderRadius: 'var(--radius-xs)',
                    padding: '8px',
                    backgroundColor: '#FFFFFF',
                    border: '2px solid var(--accent-gold)',
                    boxShadow: 'var(--shadow-lg)',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                  }}
                  onClick={() =>
                    setLightboxImg({
                      imageUrl: portraitPhoto,
                      title: { en: name, te: name },
                      caption: { en: t.gandraJyothi.photoPortraitCaption, te: t.gandraJyothi.photoPortraitCaption },
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
                      maxHeight: '410px',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      borderRadius: '2px',
                      display: 'block',
                    }}
                    loading="lazy"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      backgroundColor: 'rgba(10, 25, 47, 0.88)',
                      color: 'var(--accent-gold)',
                      borderRadius: '50%',
                      width: '34px',
                      height: '34px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <ZoomIn size={17} />
                  </div>

                  {/* Abbott Six Star Badge Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      backgroundColor: 'rgba(10, 25, 47, 0.92)',
                      border: '1px solid var(--accent-gold)',
                      color: 'var(--accent-gold)',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <Star size={13} fill="var(--accent-gold)" />
                    <span>Six-Star Finisher</span>
                  </div>
                </div>
              </div>

              {/* Editorial Introduction Content */}
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                  <span className="editorial-badge green">
                    <Heart size={14} />
                    <span>{t.gandraJyothi.badge}</span>
                  </span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      backgroundColor: 'rgba(217, 119, 6, 0.12)',
                      border: '1px solid var(--accent-gold)',
                      color: 'var(--accent-saffron)',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                    }}
                  >
                    <Trophy size={13} />
                    <span>6 World Marathon Majors</span>
                  </span>
                </div>

                <h1
                  style={{
                    fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
                    fontSize: '2.6rem',
                    fontWeight: 700,
                    color: 'var(--accent-navy)',
                    lineHeight: 1.18,
                    marginBottom: '8px',
                  }}
                >
                  {name}
                </h1>

                {/* Subtitle required by user */}
                <p
                  style={{
                    fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: 'var(--accent-saffron)',
                    marginBottom: '16px',
                    lineHeight: 1.4,
                    letterSpacing: '0.01em',
                  }}
                >
                  {subtitle}
                </p>

                <p
                  style={{
                    fontSize: '0.98rem',
                    fontWeight: 600,
                    color: 'var(--accent-green)',
                    marginBottom: '18px',
                    lineHeight: 1.45,
                  }}
                >
                  {title}
                </p>

                <div
                  style={{
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.85,
                    marginBottom: '26px',
                    borderLeft: '4px solid var(--accent-gold)',
                    paddingLeft: '18px',
                    backgroundColor: 'rgba(197, 168, 128, 0.08)',
                    padding: '14px 18px',
                    borderRadius: '0 var(--radius-xs) var(--radius-xs) 0',
                    fontStyle: 'italic',
                  }}
                >
                  "{introduction}"
                </div>

                {/* Quick Pillar Jump Navigation Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '12px' }}>
                  <button
                    onClick={() => scrollToSection('marathon-section')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-medium)',
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      color: 'var(--accent-navy)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    className="pillar-jump-btn"
                  >
                    <Trophy size={15} color="var(--accent-saffron)" />
                    <span>{t.gandraJyothi.marathonSectionTitle}</span>
                  </button>

                  <button
                    onClick={() => scrollToSection('spiritual-section')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-medium)',
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      color: 'var(--accent-navy)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    className="pillar-jump-btn"
                  >
                    <Sparkles size={15} color="var(--accent-gold)" />
                    <span>{t.gandraJyothi.spiritualSectionTitle}</span>
                  </button>

                  <button
                    onClick={() => scrollToSection('bathukamma-section')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-medium)',
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      color: 'var(--accent-navy)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    className="pillar-jump-btn"
                  >
                    <Flower2 size={15} color="#c2410c" />
                    <span>{t.gandraJyothi.bathukammaSectionTitle}</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 2. MARATHON JOURNEY — "Beyond Every Finish Line"                 */}
          {/* ============================================================== */}
          <section
            id="marathon-section"
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-medium)',
              borderTop: '4px solid var(--accent-saffron)',
              borderRadius: 'var(--radius-xs)',
              padding: '38px',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '48px',
              scrollMarginTop: 'calc(var(--navbar-height) + 24px)',
            }}
          >
            {/* Section Heading & Subheading */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <span className="editorial-badge gold" style={{ marginBottom: '8px' }}>
                <Trophy size={14} />
                <span>{lang === 'te' ? 'అంతర్జాతీయ క్రీడా ఘనత' : 'Strength Beyond Limits'}</span>
              </span>
              <h2
                style={{
                  fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
                  fontSize: '2.15rem',
                  fontWeight: 700,
                  color: 'var(--accent-navy)',
                  marginBottom: '10px',
                  letterSpacing: '-0.01em',
                }}
              >
                {t.gandraJyothi.marathonSectionTitle}
              </h2>
              <div className="telangana-divider" style={{ margin: '12px auto' }}>
                <div className="telangana-divider-diamond" />
              </div>
            </div>

            {/* Prominent Highlight Banner */}
            <div
              style={{
                backgroundColor: 'rgba(217, 119, 6, 0.08)',
                border: '1px solid var(--accent-gold)',
                borderLeft: '5px solid var(--accent-saffron)',
                borderRadius: 'var(--radius-xs)',
                padding: '18px 24px',
                textAlign: 'center',
                marginBottom: '28px',
              }}
            >
              <div
                style={{
                  fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: 'var(--accent-navy)',
                  letterSpacing: '0.02em',
                }}
              >
                "{t.gandraJyothi.marathonHighlight}"
              </div>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--accent-saffron)',
                  fontWeight: 600,
                  margin: '6px 0 0',
                }}
              >
                {t.gandraJyothi.marathonTokyoAchievement}
              </p>
            </div>

            {/* Inspirational Quote Box */}
            <div
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-xs)',
                padding: '24px 28px',
                marginBottom: '36px',
                display: 'flex',
                gap: '18px',
                alignItems: 'flex-start',
              }}
            >
              <Quote size={28} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px', opacity: 0.8 }} />
              <div>
                <p
                  style={{
                    fontSize: '1.02rem',
                    color: 'var(--text-primary)',
                    lineHeight: 1.8,
                    margin: 0,
                    fontStyle: 'italic',
                    fontWeight: 500,
                  }}
                >
                  "{t.gandraJyothi.marathonIntro}"
                </p>
                <div
                  style={{
                    marginTop: '10px',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    color: 'var(--accent-navy)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  — {name} • Abbott Six Star Marathon Finisher
                </div>
              </div>
            </div>

            {/* Marathon Visual Showcase: 2 Uploaded Photographs */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
                marginBottom: '40px',
              }}
            >
              {/* Photo 1: Tokyo 2025 Finisher Medal & Six Star Medal */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-xs)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                className="jyothi-page-photo-card"
                onClick={() =>
                  setLightboxImg({
                    imageUrl: '/images/gandra-jyothi-tokyo-six-star-marathon.jpg',
                    title: {
                      en: 'Tokyo Marathon 2025 — Six Star Finisher Medal Celebration',
                      te: 'టోక్యో మారథాన్ 2025 — ప్రతిష్టాత్మక సిక్స్-స్టార్ మెడల్ ఘనత',
                    },
                    caption: {
                      en: t.gandraJyothi.tokyoSixStarCaption,
                      te: t.gandraJyothi.tokyoSixStarCaption,
                    },
                  })
                }
              >
                <div style={{ position: 'relative', height: '340px', backgroundColor: '#0f172a', overflow: 'hidden' }}>
                  <img
                    src="/images/gandra-jyothi-tokyo-six-star-marathon.jpg"
                    alt="Smt. Gandra Jyothi holding Tokyo 2025 Finisher Medal and Abbott Six Star Medal"
                    onError={(e) => handleImgError(e, '/images/gandra-jyothi-portrait.png')}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 20%',
                      display: 'block',
                      transition: 'transform 0.3s ease',
                    }}
                    className="jyothi-page-img"
                    loading="lazy"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(10, 25, 47, 0.9)',
                      color: 'var(--accent-gold)',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <Trophy size={13} />
                    <span>Tokyo 2025 • Six Star Grand Milestone</span>
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(10, 25, 47, 0.85)',
                      color: '#FFFFFF',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ZoomIn size={16} />
                  </div>
                </div>
                <div style={{ padding: '16px 20px' }}>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--accent-navy)', margin: '0 0 6px' }}>
                    {lang === 'te' ? 'టోక్యో మారథాన్ 2025 — అబాట్ సిక్స్ స్టార్ ఘనత' : 'Tokyo Marathon 2025 — Abbott Six Star Finisher'}
                  </h4>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                    {t.gandraJyothi.tokyoSixStarCaption}
                  </p>
                </div>
              </div>

              {/* Photo 2: Couple Celebration in Tokyo */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-xs)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                className="jyothi-page-photo-card"
                onClick={() =>
                  setLightboxImg({
                    imageUrl: '/images/gandra-couple-marathon-celebration.jpg',
                    title: {
                      en: 'Sri Gandra & Smt. Gandra Jyothi — Tokyo Celebration',
                      te: 'టోక్యోలో శ్రీ గండ్ర దంపతుల ఆనందోత్సాహాలు',
                    },
                    caption: {
                      en: t.gandraJyothi.coupleMarathonCaption,
                      te: t.gandraJyothi.coupleMarathonCaption,
                    },
                  })
                }
              >
                <div style={{ position: 'relative', height: '340px', backgroundColor: '#0f172a', overflow: 'hidden' }}>
                  <img
                    src="/images/gandra-couple-marathon-celebration.jpg"
                    alt="Sri Gandra Venkata Ramana Reddy and Smt. Gandra Jyothi celebrating in Tokyo"
                    onError={(e) => handleImgError(e, '/images/gandra-jyothi-portrait.png')}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 25%',
                      display: 'block',
                      transition: 'transform 0.3s ease',
                    }}
                    className="jyothi-page-img"
                    loading="lazy"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(10, 25, 47, 0.9)',
                      color: 'var(--accent-gold)',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <Heart size={13} />
                    <span>Shared Pride & Leadership</span>
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(10, 25, 47, 0.85)',
                      color: '#FFFFFF',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ZoomIn size={16} />
                  </div>
                </div>
                <div style={{ padding: '16px 20px' }}>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--accent-navy)', margin: '0 0 6px' }}>
                    {lang === 'te' ? 'టోక్యోలో శ్రీ గండ్ర దంపతుల ఆనందోత్సాహాలు' : 'Shared Pride & Support in Tokyo'}
                  </h4>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                    {t.gandraJyothi.coupleMarathonCaption}
                  </p>
                </div>
              </div>
            </div>

            {/* Marathon Milestone Timeline */}
            <div style={{ marginTop: '36px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '20px',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '10px',
                }}
              >
                <Award size={20} color="var(--accent-saffron)" />
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: 'var(--accent-navy)',
                    margin: 0,
                    fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
                  }}
                >
                  {lang === 'te' ? 'పూర్తి చేసిన మారథాన్ల సమగ్ర కాలక్రమం' : 'Visual Marathon Journey Timeline'}
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {marathons.map((m, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: m.isGrandFinale ? 'rgba(217, 119, 6, 0.05)' : 'var(--bg-primary)',
                      border: m.isGrandFinale ? '2px solid var(--accent-gold)' : '1px solid var(--border-medium)',
                      borderLeft: m.isGrandFinale ? '6px solid var(--accent-saffron)' : '4px solid var(--accent-navy)',
                      borderRadius: 'var(--radius-xs)',
                      padding: '20px 24px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '18px',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: m.isGrandFinale ? 'var(--shadow-sm)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: '1 1 300px' }}>
                      <div
                        style={{
                          backgroundColor: m.isGrandFinale ? 'var(--accent-saffron)' : 'var(--accent-navy)',
                          color: '#FFFFFF',
                          padding: '6px 12px',
                          borderRadius: 'var(--radius-xs)',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          letterSpacing: '0.02em',
                          minWidth: '95px',
                          textAlign: 'center',
                        }}
                      >
                        {m.year}
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '4px' }}>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-navy)', margin: 0 }}>
                            {b(m.title)}
                          </h4>
                          <span
                            style={{
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: '10px',
                              backgroundColor: m.isGrandFinale ? 'rgba(217, 119, 6, 0.15)' : 'rgba(10, 25, 47, 0.08)',
                              color: m.isGrandFinale ? 'var(--accent-saffron)' : 'var(--accent-navy)',
                            }}
                          >
                            {m.badgeText}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                          <MapPin size={13} />
                          <span>{b(m.location)}</span>
                        </div>

                        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                          {b(m.highlight)}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-green)', fontWeight: 600, fontSize: '0.84rem' }}>
                      <CheckCircle2 size={16} />
                      <span>{lang === 'te' ? 'పూర్తయింది' : 'Completed'}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Six World Majors Completed Badges */}
              <div
                style={{
                  marginTop: '28px',
                  backgroundColor: 'var(--bg-secondary)',
                  padding: '18px 22px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-medium)',
                }}
              >
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-navy)', marginBottom: '12px' }}>
                  {t.gandraJyothi.majorsTitle}:
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: '10px',
                  }}
                >
                  {marathonCities.map((city, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--border-medium)',
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-xs)',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: 'var(--accent-navy)',
                        boxShadow: 'var(--shadow-xs)',
                      }}
                    >
                      <Star size={15} color="var(--accent-gold)" fill="var(--accent-gold)" />
                      <span>{lang === 'te' ? city.te : city.en}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 3. SPIRITUALITY & DEVOTION — "Faith, Devotion & Inner Strength"  */}
          {/* ============================================================== */}
          <section
            id="spiritual-section"
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-medium)',
              borderTop: '4px solid var(--accent-gold)',
              borderRadius: 'var(--radius-xs)',
              padding: '38px',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '48px',
              scrollMarginTop: 'calc(var(--navbar-height) + 24px)',
            }}
          >
            {/* Section Header */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <span className="editorial-badge gold" style={{ marginBottom: '8px' }}>
                <Sparkles size={14} />
                <span>{lang === 'te' ? 'ఆధ్యాత్మికం & భక్తి' : 'Spirituality & Devotion'}</span>
              </span>
              <h2
                style={{
                  fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
                  fontSize: '2.15rem',
                  fontWeight: 700,
                  color: 'var(--accent-navy)',
                  marginBottom: '10px',
                  letterSpacing: '-0.01em',
                }}
              >
                {t.gandraJyothi.spiritualSectionTitle}
              </h2>
              <div className="telangana-divider" style={{ margin: '12px auto' }}>
                <div className="telangana-divider-diamond" />
              </div>
            </div>

            {/* Dignified Editorial Copy */}
            <div
              style={{
                backgroundColor: 'rgba(197, 168, 128, 0.09)',
                border: '1px solid var(--accent-gold)',
                borderRadius: 'var(--radius-xs)',
                padding: '24px 28px',
                marginBottom: '36px',
                textAlign: 'center',
                maxWidth: '860px',
                margin: '0 auto 36px',
              }}
            >
              <p
                style={{
                  fontSize: '1.02rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1.85,
                  margin: 0,
                  fontStyle: 'italic',
                }}
              >
                "{t.gandraJyothi.spiritualIntro}"
              </p>
            </div>

            {/* Spiritual Feature Layout */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '32px',
                alignItems: 'center',
              }}
              className="jyothi-spiritual-grid"
            >
              {/* Genuine Temple Photograph Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-xs)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-md)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                className="jyothi-page-photo-card"
                onClick={() =>
                  setLightboxImg({
                    imageUrl: '/images/gandra-jyothi-temple-devotion.jpg',
                    title: {
                      en: 'Sacred Temple Rituals & Kalasham Devotion',
                      te: 'ఆలయ పవిత్ర ఉత్సవాలు — భక్తిశ్రద్ధలతో కలశ పూజ',
                    },
                    caption: {
                      en: t.gandraJyothi.spiritualCaption,
                      te: t.gandraJyothi.spiritualCaption,
                    },
                  })
                }
              >
                <div style={{ position: 'relative', height: '360px', backgroundColor: '#0f172a', overflow: 'hidden' }}>
                  <img
                    src="/images/gandra-jyothi-temple-devotion.jpg"
                    alt="Smt. Gandra Jyothi, Sri Gandra and devotees holding sacred temple kalashams"
                    onError={(e) => handleImgError(e, '/images/gandra-jyothi-portrait.png')}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 30%',
                      display: 'block',
                      transition: 'transform 0.3s ease',
                    }}
                    className="jyothi-page-img"
                    loading="lazy"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(10, 25, 47, 0.9)',
                      color: 'var(--accent-gold)',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <Sparkles size={13} />
                    <span>Sacred Temple Rituals & Prayers</span>
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(10, 25, 47, 0.85)',
                      color: '#FFFFFF',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ZoomIn size={16} />
                  </div>
                </div>
                <div style={{ padding: '16px 20px' }}>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--accent-navy)', margin: '0 0 6px' }}>
                    {lang === 'te' ? 'పవిత్ర కలశ పూజ & ఆధ్యాత్మిక సమారోహం' : 'Sacred Kalasham Worship & Spiritual Gatherings'}
                  </h4>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                    {t.gandraJyothi.spiritualCaption}
                  </p>
                </div>
              </div>

              {/* Spiritual Reflections Pillars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderLeft: '4px solid var(--accent-gold)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '20px 22px',
                  }}
                >
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-navy)', margin: '0 0 6px' }}>
                    {lang === 'te' ? 'ఆత్మపరిశీలన & అంతరంగిక స్థైర్యం' : 'Moments of Reflection & Gratitude'}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {lang === 'te'
                      ? 'ఆధ్యాత్మిక విశ్వాసాలు మరియు ప్రార్థనలు ఆత్మశాంతికి, వ్యక్తిగత విలువల పరిరక్షణకు మార్గదర్శకంగా నిలుస్తాయి.'
                      : 'Faith and prayer offer personal grounding, humility, and peace that inspire perseverance in both public service and personal commitments.'}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderLeft: '4px solid var(--accent-gold)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '20px 22px',
                  }}
                >
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-navy)', margin: '0 0 6px' }}>
                    {lang === 'te' ? 'సంప్రదాయ ఆలయ ఉత్సవాలలో భాగస్వామ్యం' : 'Traditional Temple Gatherings & Devotion'}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {lang === 'te'
                      ? 'కుటుంబ సమేతంగా మరియు స్థానిక భక్తులతో కలిసి ఆలయ పూజలు, పవిత్ర క్రతువులను నిర్వహించడం తెలంగాణ సాంస్కృతిక వారసత్వంలో భాగం.'
                      : 'Participating in traditional temple rituals and community spiritual events alongside family and local devotees, respecting regional traditions.'}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderLeft: '4px solid var(--accent-gold)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '20px 22px',
                  }}
                >
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-navy)', margin: '0 0 6px' }}>
                    {lang === 'te' ? 'సామూహిక ప్రార్థనలు & ఐక్యత' : 'Community Harmony & Spiritual Heritage'}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {lang === 'te'
                      ? 'ఆధ్యాత్మిక కార్యక్రమాలు సమాజంలో ఐక్యత, సోదరభావం మరియు పరస్పర గౌరవాన్ని పెంపొందిస్తాయి.'
                      : 'Shared spiritual observances cultivate fellowship, mutual respect, and social harmony within local communities.'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 4. BATHUKAMMA — "Celebrating Our Cultural Roots"                */}
          {/* ============================================================== */}
          <section
            id="bathukamma-section"
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-medium)',
              borderTop: '4px solid #c2410c',
              borderRadius: 'var(--radius-xs)',
              padding: '38px',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '48px',
              scrollMarginTop: 'calc(var(--navbar-height) + 24px)',
            }}
          >
            {/* Section Header */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(194, 65, 12, 0.1)',
                  color: '#c2410c',
                  border: '1px solid rgba(194, 65, 12, 0.25)',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  marginBottom: '8px',
                }}
              >
                <Flower2 size={14} />
                <span>{lang === 'te' ? 'తెలంగాణ సంస్కృతి & పండుగలు' : 'Bathukamma — Cultural Pride'}</span>
              </span>
              <h2
                style={{
                  fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
                  fontSize: '2.15rem',
                  fontWeight: 700,
                  color: 'var(--accent-navy)',
                  marginBottom: '10px',
                  letterSpacing: '-0.01em',
                }}
              >
                {t.gandraJyothi.bathukammaSectionTitle}
              </h2>
              <div className="telangana-divider" style={{ margin: '12px auto' }}>
                <div className="telangana-divider-diamond" />
              </div>
            </div>

            {/* Bathukamma Introductory Copy */}
            <div
              style={{
                backgroundColor: 'rgba(217, 119, 6, 0.08)',
                border: '1px solid rgba(217, 119, 6, 0.25)',
                borderRadius: 'var(--radius-xs)',
                padding: '24px 28px',
                marginBottom: '36px',
                textAlign: 'center',
                maxWidth: '860px',
                margin: '0 auto 36px',
              }}
            >
              <p
                style={{
                  fontSize: '1.02rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1.85,
                  margin: 0,
                  fontStyle: 'italic',
                }}
              >
                "{t.gandraJyothi.bathukammaIntro}"
              </p>
            </div>

            {/* Bathukamma Layout */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '32px',
                alignItems: 'center',
              }}
              className="jyothi-bathukamma-grid"
            >
              {/* Bathukamma Photo Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-xs)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-md)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                className="jyothi-page-photo-card"
                onClick={() =>
                  setLightboxImg({
                    imageUrl: '/images/gandra-jyothi-bathukamma-celebration.jpg',
                    title: {
                      en: 'Bathukamma — Traditional Floral Celebration with Women',
                      te: 'బతుకమ్మ సంబరాలు — మహిళలతో కలిసి పూల పండుగ వేడుకలు',
                    },
                    caption: {
                      en: t.gandraJyothi.bathukammaCaption,
                      te: t.gandraJyothi.bathukammaCaption,
                    },
                  })
                }
              >
                <div style={{ position: 'relative', height: '380px', backgroundColor: '#0f172a', overflow: 'hidden' }}>
                  <img
                    src="/images/gandra-jyothi-bathukamma-celebration.jpg"
                    alt="Smt. Gandra Jyothi preparing traditional floral Bathukamma with local women"
                    onError={(e) => handleImgError(e, '/images/gandra-jyothi-portrait.png')}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 20%',
                      display: 'block',
                      transition: 'transform 0.3s ease',
                    }}
                    className="jyothi-page-img"
                    loading="lazy"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(194, 65, 12, 0.9)',
                      color: '#FFFFFF',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <Flower2 size={13} />
                    <span>Floral Heritage of Telangana</span>
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(10, 25, 47, 0.85)',
                      color: '#FFFFFF',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ZoomIn size={16} />
                  </div>
                </div>
                <div style={{ padding: '16px 20px' }}>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--accent-navy)', margin: '0 0 6px' }}>
                    {lang === 'te' ? 'మహిళలతో కలిసి బతుకమ్మ పూల పేర్పు' : 'Arranging the Traditional Floral Bathukamma'}
                  </h4>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                    {t.gandraJyothi.bathukammaCaption}
                  </p>
                </div>
              </div>

              {/* Bathukamma Cultural Highlights */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderLeft: '4px solid #c2410c',
                    borderRadius: 'var(--radius-xs)',
                    padding: '20px 22px',
                  }}
                >
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-navy)', margin: '0 0 6px' }}>
                    {lang === 'te' ? 'ప్రజలతో మమేకమైన సంబరాలు' : 'Celebrating with Community Women'}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {lang === 'te'
                      ? 'గ్రామీణ ప్రాంత మహిళలతో కలిసి తీరొక్క పూలను సేకరించి, అందంగా బతుకమ్మను పేరుస్తూ పండుగ ఉత్సాహాన్ని పంచుకోవడం.'
                      : 'Joining local women at the grassroots level to gather seasonal native flowers, thoughtfully arranging concentric layers of vibrant blooms.'}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderLeft: '4px solid #c2410c',
                    borderRadius: 'var(--radius-xs)',
                    padding: '20px 22px',
                  }}
                >
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-navy)', margin: '0 0 6px' }}>
                    {lang === 'te' ? 'తెలంగాణ అస్తిత్వానికి ప్రతీక' : 'Telangana’s Living Cultural Identity'}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {lang === 'te'
                      ? 'బతుకమ్మ ప్రకృతిని, స్త్రీత్వాన్ని మరియు తెలంగాణ సాంస్కృతిక విశిష్టతను ప్రతిబింబించే విశేష పండుగ.'
                      : 'Bathukamma embodies respect for nature, celebrating native biodiversity, medicinal flora, and the revered collective leadership of women.'}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderLeft: '4px solid #c2410c',
                    borderRadius: 'var(--radius-xs)',
                    padding: '20px 22px',
                  }}
                >
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-navy)', margin: '0 0 6px' }}>
                    {lang === 'te' ? 'జానపద పాటలు & సామూహిక వేడుకలు' : 'Folk Melodies & Collective Fellowship'}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {lang === 'te'
                      ? 'తరతరాల జానపద పాటలు పాడుతూ, బతుకమ్మ చుట్టూ చప్పట్లు కొడుతూ ఐక్యతతో సంబరాలు జరుపుకోవడం.'
                      : 'Singing traditional folk rhythms and joining hands in circular unity, reinforcing generational warmth and solidarity across communities.'}
                  </p>
                </div>

                {/* Facebook Video Link — Bathukamma Celebration */}
                <a
                  href="https://www.facebook.com/watch/?v=4548897155375721"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    backgroundColor: '#1877F2',
                    borderRadius: 'var(--radius-xs)',
                    padding: '16px 22px',
                    textDecoration: 'none',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '0.94rem',
                    boxShadow: '0 4px 14px rgba(24, 119, 242, 0.35)',
                    transition: 'all 0.25s ease',
                  }}
                  className="bathukamma-fb-link"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="#FFFFFF"
                    style={{ flexShrink: 0 }}
                  >
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.875v2.257h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                  </svg>
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 600, opacity: 0.88, marginBottom: '2px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      {lang === 'te' ? 'फेस्‌बुक्‌लो चूडंडि' : 'Watch on Facebook'}
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.3 }}>
                      {lang === 'te' ? 'बतुकम्म वेडुकल वीडियो' : 'Bathukamma Celebration Video'}
                    </div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.82, marginTop: '3px' }}>
                      {lang === 'te' ? 'क्लिक् चेసి पूर्ति वीडियो आनंदिंचंडి →' : 'Click to watch the full Bathukamma celebration video →'}
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 5. PUBLIC LIFE & CIVIC SERVICE                                 */}
          {/* ============================================================== */}
          <section style={{ marginBottom: '48px' }}>
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-xs)',
                padding: '36px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '16px',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '12px',
                }}
              >
                <Award size={22} color="var(--accent-navy)" />
                <h2
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: 'var(--accent-navy)',
                    margin: 0,
                    fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
                  }}
                >
                  {lang === 'te' ? 'ప్రజా జీవితం & సేవా ప్రస్థానం' : 'Public Life & Civic Service'}
                </h2>
              </div>

              <div
                style={{
                  fontSize: '1rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.85,
                  whiteSpace: 'pre-line',
                  marginBottom: '26px',
                }}
              >
                {biography}
              </div>

              {/* Key Responsibilities */}
              <div
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderLeft: '4px solid var(--accent-green)',
                  padding: '20px 24px',
                  borderRadius: 'var(--radius-xs)',
                  marginBottom: '22px',
                }}
              >
                <h3
                  style={{
                    fontSize: '0.98rem',
                    fontWeight: 700,
                    color: 'var(--accent-navy)',
                    marginBottom: '12px',
                  }}
                >
                  {t.gandraJyothi.keyResponsibilities}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <CheckCircle2 size={17} color="var(--accent-green)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{t.gandraJyothi.resp1}</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <CheckCircle2 size={17} color="var(--accent-green)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{t.gandraJyothi.resp2}</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <CheckCircle2 size={17} color="var(--accent-green)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{t.gandraJyothi.resp3}</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <CheckCircle2 size={17} color="var(--accent-green)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{t.gandraJyothi.resp4}</span>
                  </li>
                </ul>
              </div>

              {/* Community Involvement */}
              <div>
                <h3
                  style={{
                    fontSize: '0.98rem',
                    fontWeight: 700,
                    color: 'var(--accent-navy)',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Users size={17} color="var(--accent-gold)" />
                  <span>{t.gandraJyothi.communityTitle}</span>
                </h3>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                  {communityInvolvement}
                </p>
              </div>

              {/* Verified Education (if available) */}
              {verifiedEducation && verifiedEducation.length > 0 && (
                <div style={{ marginTop: '22px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                  <h3
                    style={{
                      fontSize: '0.98rem',
                      fontWeight: 700,
                      color: 'var(--accent-navy)',
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <GraduationCap size={17} color="var(--accent-navy)" />
                    <span>{t.gandraJyothi.educationTitle}</span>
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {verifiedEducation.map((edu, idx) => (
                      <li key={idx} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        <strong>{b(edu.qualification)}</strong> — {b(edu.institution)} {edu.yearOfCompletion && `(${edu.yearOfCompletion})`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* ============================================================== */}
          {/* 6. PUBLIC SERVICE & SOCIAL ACTIVITIES                           */}
          {/* ============================================================== */}
          <section style={{ marginBottom: '48px' }}>
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-xs)',
                padding: '36px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <span className="editorial-badge green" style={{ marginBottom: '8px' }}>
                  <Layers size={13} />
                  <span>{lang === 'te' ? 'కార్యక్రమాలు' : 'Activities'}</span>
                </span>
                <h2
                  style={{
                    fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
                    fontSize: '1.9rem',
                    fontWeight: 700,
                    color: 'var(--accent-navy)',
                    marginBottom: '8px',
                  }}
                >
                  {t.gandraJyothi.activitiesHeading}
                </h2>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto' }}>
                  {t.gandraJyothi.activitiesSub}
                </p>
              </div>

              {/* Category Filter Buttons */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '32px',
                }}
              >
                {activityCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveActivityCat(cat.id)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      border: '1px solid var(--border-medium)',
                      backgroundColor: activeActivityCat === cat.id ? 'var(--accent-navy)' : 'var(--bg-secondary)',
                      color: activeActivityCat === cat.id ? '#FFFFFF' : 'var(--text-primary)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Activities Grid */}
              {filteredActivities.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '36px', color: 'var(--text-secondary)' }}>
                  {t.gandraJyothi.noActivities}
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '24px',
                  }}
                >
                  {filteredActivities.map((act) => (
                    <div
                      key={act._id}
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        border: '1px solid var(--border-medium)',
                        borderRadius: 'var(--radius-xs)',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-sm)',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div style={{ position: 'relative', width: '100%', height: '200px', backgroundColor: '#e2e8f0' }}>
                        <img
                          src={act.imageUrl || '/images/gandra-jyothi-portrait.png'}
                          alt={b(act.title)}
                          onError={(e) => handleImgError(e, '/images/gandra-jyothi-portrait.png')}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                          loading="lazy"
                        />
                        <span
                          style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            backgroundColor: 'rgba(10, 25, 47, 0.85)',
                            color: 'var(--accent-gold)',
                            padding: '3px 8px',
                            borderRadius: 'var(--radius-xs)',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                          }}
                        >
                          {act.category}
                        </span>
                      </div>

                      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                            fontSize: '0.78rem',
                            color: 'var(--text-muted)',
                            marginBottom: '10px',
                          }}
                        >
                          {act.date && (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <Calendar size={13} />
                              <span>{new Date(act.date).toLocaleDateString(lang === 'te' ? 'te-IN' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            </span>
                          )}
                          {act.location && (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <MapPin size={13} />
                              <span>{b(act.location)}</span>
                            </span>
                          )}
                        </div>

                        <h3
                          style={{
                            fontSize: '1.05rem',
                            fontWeight: 700,
                            color: 'var(--accent-navy)',
                            marginBottom: '10px',
                            lineHeight: 1.35,
                          }}
                        >
                          {b(act.title)}
                        </h3>

                        <p
                          style={{
                            fontSize: '0.88rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.6,
                            margin: 0,
                            flex: 1,
                          }}
                        >
                          {b(act.description)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* ============================================================== */}
          {/* 7. ACHIEVEMENTS & MILESTONES TIMELINE                            */}
          {/* ============================================================== */}
          <section style={{ marginBottom: '48px' }}>
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-xs)',
                padding: '36px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <span className="editorial-badge gold" style={{ marginBottom: '8px' }}>
                  <Trophy size={13} />
                  <span>{lang === 'te' ? 'మైలురాళ్లు' : 'Milestones'}</span>
                </span>
                <h2
                  style={{
                    fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
                    fontSize: '1.9rem',
                    fontWeight: 700,
                    color: 'var(--accent-navy)',
                    marginBottom: '8px',
                  }}
                >
                  {t.gandraJyothi.achievementsHeading}
                </h2>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto' }}>
                  {t.gandraJyothi.achievementsSub}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {milestones.map((mile, idx) => (
                  <div
                    key={mile._id || idx}
                    style={{
                      display: 'flex',
                      gap: '20px',
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border-medium)',
                      borderLeft: '4px solid var(--accent-gold)',
                      borderRadius: 'var(--radius-xs)',
                      padding: '22px 24px',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <div
                      style={{
                        minWidth: '100px',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: 'var(--accent-saffron)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {mile.year}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <h3
                          style={{
                            fontSize: '1.05rem',
                            fontWeight: 700,
                            color: 'var(--accent-navy)',
                            margin: 0,
                          }}
                        >
                          {b(mile.title)}
                        </h3>
                        {mile.roleOrCategory && (
                          <span
                            style={{
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              color: 'var(--accent-green)',
                              backgroundColor: 'rgba(30, 107, 74, 0.08)',
                              padding: '2px 8px',
                              borderRadius: '10px',
                            }}
                          >
                            {b(mile.roleOrCategory)}
                          </span>
                        )}
                      </div>
                      <p
                        style={{
                          fontSize: '0.9rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {b(mile.description)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 8. AUTHORIZED VISUAL ARCHIVE & PHOTO GALLERY                     */}
          {/* ============================================================== */}
          <section style={{ marginBottom: '48px' }}>
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-xs)',
                padding: '36px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <span className="editorial-badge green" style={{ marginBottom: '8px' }}>
                  <Camera size={13} />
                  <span>{lang === 'te' ? 'గ్యాలరీ' : 'Gallery'}</span>
                </span>
                <h2
                  style={{
                    fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
                    fontSize: '1.9rem',
                    fontWeight: 700,
                    color: 'var(--accent-navy)',
                    marginBottom: '8px',
                  }}
                >
                  {t.gandraJyothi.galleryHeading}
                </h2>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto' }}>
                  {t.gandraJyothi.gallerySub}
                </p>
              </div>

              {/* Gallery Category Filter */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '32px',
                }}
              >
                {galleryCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveGalleryCat(cat.id)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      border: '1px solid var(--border-medium)',
                      backgroundColor: activeGalleryCat === cat.id ? 'var(--accent-navy)' : 'var(--bg-secondary)',
                      color: activeGalleryCat === cat.id ? '#FFFFFF' : 'var(--text-primary)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Gallery Grid */}
              {filteredGallery.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '36px', color: 'var(--text-secondary)' }}>
                  {t.gandraJyothi.noGallery}
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px',
                  }}
                >
                  {filteredGallery.map((item, idx) => (
                    <div
                      key={item._id || idx}
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        border: '1px solid var(--border-medium)',
                        borderRadius: 'var(--radius-xs)',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-sm)',
                        display: 'flex',
                        flexDirection: 'column',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                      }}
                      className="jyothi-page-photo-card"
                      onClick={() => setLightboxImg(item)}
                      title={t.gandraJyothi.clickToEnlarge}
                    >
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          height: '240px',
                          backgroundColor: '#f1f5f9',
                          overflow: 'hidden',
                        }}
                      >
                        <img
                          src={item.imageUrl}
                          alt={b(item.title)}
                          onError={(e) => handleImgError(e, '/images/gandra-jyothi-portrait.png')}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            transition: 'transform 0.3s ease',
                          }}
                          className="jyothi-page-img"
                          loading="lazy"
                        />
                        <div
                          style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            backgroundColor: 'rgba(10, 25, 47, 0.85)',
                            color: 'var(--accent-gold)',
                            padding: '3px 8px',
                            borderRadius: 'var(--radius-xs)',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                          }}
                        >
                          {item.category}
                        </div>
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px',
                            backgroundColor: 'rgba(10, 25, 47, 0.75)',
                            color: '#FFFFFF',
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
                      </div>
                      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <h4 style={{ fontSize: '0.94rem', fontWeight: 700, color: 'var(--accent-navy)', margin: '0 0 6px' }}>
                          {b(item.title)}
                        </h4>
                        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                          {b(item.caption)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* ============================================================== */}
          {/* 9. NEWS & STATEMENTS (SEPARATED)                                */}
          {/* ============================================================== */}
          {news && news.length > 0 && (
            <section style={{ marginBottom: '48px' }}>
              <div
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '36px',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                  <span className="editorial-badge gold" style={{ marginBottom: '8px' }}>
                    <Newspaper size={13} />
                    <span>{lang === 'te' ? 'ప్రకటనలు' : 'Updates'}</span>
                  </span>
                  <h2
                    style={{
                      fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
                      fontSize: '1.9rem',
                      fontWeight: 700,
                      color: 'var(--accent-navy)',
                      marginBottom: '8px',
                    }}
                  >
                    {t.gandraJyothi.newsHeading}
                  </h2>
                  <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto' }}>
                    {t.gandraJyothi.newsSub}
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                  {news.map((item) => (
                    <div
                      key={item._id}
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        border: '1px solid var(--border-medium)',
                        borderRadius: 'var(--radius-xs)',
                        padding: '24px',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                    >
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-saffron)', textTransform: 'uppercase', marginBottom: '8px' }}>
                        {b(item.category) || 'Statement'}
                      </div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-navy)', marginBottom: '10px', lineHeight: 1.35 }}>
                        {b(item.title)}
                      </h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '12px' }}>
                        {b(item.summary)}
                      </p>
                      {item.content && (
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                          {b(item.content)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ============================================================== */}
          {/* 10. CONNECT WITH GANDRA LEADERSHIP                              */}
          {/* ============================================================== */}
          <div
            style={{
              backgroundColor: 'var(--accent-navy)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-sm)',
              padding: '38px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '8px' }}>
              {lang === 'te' ? 'ప్రజా సమస్యలపై సంప్రదించండి' : 'Connect with Gandra Leadership Camp Office'}
            </h3>
            <p style={{ fontSize: '0.94rem', color: 'rgba(255, 255, 255, 0.85)', maxWidth: '620px', margin: '0 auto 20px', lineHeight: 1.6 }}>
              {lang === 'te'
                ? 'భూపాలపల్లి నియోజకవర్గ ప్రజా సంక్షేమం మరియు ప్రాంతీయ అభివృద్ధి కొరకు శ్రీ గండ్ర కార్యాలయాన్ని నేరుగా సంప్రదించవచ్చు.'
                : 'For community welfare representations, public grievances, and developmental suggestions, connect directly with the official camp office.'}
            </p>
            <Link
              to="/#contact"
              className="btn btn-primary"
              style={{ padding: '10px 24px', fontSize: '0.92rem', textDecoration: 'none' }}
            >
              <span>{t.hero.ctaContact}</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </main>

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
              maxWidth: '920px',
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
                padding: '14px 20px',
                borderBottom: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-primary)',
              }}
            >
              <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--accent-navy)' }}>
                {b(lightboxImg.title) || name}
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
                <X size={22} />
              </button>
            </div>
            <div style={{ padding: '16px', backgroundColor: '#0b1329', textAlign: 'center' }}>
              <img
                src={lightboxImg.imageUrl || lightboxImg.photo || lightboxImg.src}
                alt={b(lightboxImg.title) || name}
                style={{
                  maxWidth: '100%',
                  maxHeight: '76vh',
                  objectFit: 'contain',
                  borderRadius: '2px',
                  display: 'inline-block',
                }}
              />
            </div>
            <div style={{ padding: '16px 20px', backgroundColor: '#FFFFFF' }}>
              <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                {b(lightboxImg.caption)}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer profile={defaultProfile} />

      <style>{`
        @media (min-width: 900px) {
          .jyothi-hero-grid {
            grid-template-columns: 350px 1fr !important;
            gap: 44px !important;
          }
          .jyothi-spiritual-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 36px !important;
          }
          .jyothi-bathukamma-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 36px !important;
          }
        }
        .pillar-jump-btn:hover {
          background-color: var(--accent-navy) !important;
          color: #FFFFFF !important;
          border-color: var(--accent-navy) !important;
          transform: translateY(-2px);
        }
        .pillar-jump-btn:hover svg {
          color: var(--accent-gold) !important;
        }
        .jyothi-page-photo-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md) !important;
          border-color: var(--accent-gold) !important;
        }
        .jyothi-page-photo-card:hover .jyothi-page-img {
          transform: scale(1.03);
        }
        .bathukamma-fb-link:hover {
          background-color: #1461d2 !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(24, 119, 242, 0.5) !important;
        }
      `}</style>
    </div>
  );
};

export default GandraJyothiPage;
