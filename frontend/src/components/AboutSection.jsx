import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Users, Droplets, Building2, HeartHandshake, CheckCircle2 } from 'lucide-react';

const AboutSection = ({ profile }) => {
  const { lang, t, b } = useLanguage();

  const biography = b(
    profile?.biography,
    lang === 'te'
      ? 'శ్రీ గండ్ర వెంకట రమణా రెడ్డి గారు తెలంగాణ రాష్ట్రానికి చెందిన అత్యంత ప్రజాదరణ కలిగిన సీనియర్ రాజకీయ నాయకులు, నిబద్ధత గల ప్రజాసేవకులు.'
      : 'Sri Gandra Venkata Ramana Reddy is an esteemed political leader and dedicated public servant from Telangana.'
  );

  const politicalJourney = b(
    profile?.politicalJourney,
    lang === 'te'
      ? 'గ్రామస్థాయి నుంచి ప్రారంభమైన వారి రాజకీయ ప్రస్థానం ప్రజా సమస్యల పరిష్కారంలో నిరంతరం ముందుండి నిలిచింది.'
      : 'Entering public life through direct community organizing, Sri Gandra worked at every tier of grassroots leadership.'
  );

  const namasteImg = profile?.namasteImage || '/images/gandra-ramana-reddy-namaste.png';

  const pillars = [
    {
      icon: <Users size={22} color="var(--accent-navy)" />,
      title: t.about.pillars[0].title,
      desc: t.about.pillars[0].desc,
    },
    {
      icon: <Droplets size={22} color="var(--accent-green)" />,
      title: t.about.pillars[1].title,
      desc: t.about.pillars[1].desc,
    },
    {
      icon: <Building2 size={22} color="var(--accent-saffron)" />,
      title: t.about.pillars[2].title,
      desc: t.about.pillars[2].desc,
    },
    {
      icon: <HeartHandshake size={22} color="var(--accent-gold-dark)" />,
      title: t.about.pillars[3].title,
      desc: t.about.pillars[3].desc,
    },
  ];

  return (
    <section
      id="about"
      className="section-pad"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header centered">
          <div className="editorial-badge green">
            <CheckCircle2 size={14} />
            <span>{t.about.badge}</span>
          </div>
          <h2 className="section-title">{t.about.heading}</h2>
          <div className="telangana-divider">
            <div className="telangana-divider-diamond" />
          </div>
          <p className="section-subtitle">
            {lang === 'te'
              ? 'ప్రజల మన్ననలతో శాసనసభలో భూపాలపల్లి నియోజకవర్గానికి ప్రాతినిధ్యం వహిస్తూ, ప్రజల హక్కుల పరిరక్షణే ధ్యేయంగా సాగిన ప్రస్థానం.'
              : 'Serving with sustained grassroots presence, legislative distinction, and uncompromising dedication to Telangana’s regional development.'}
          </p>
        </div>

        {/* Editorial 2-column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '40px',
            alignItems: 'flex-start',
            marginBottom: '48px',
          }}
          className="about-grid"
        >
          {/* Namaste Portrait Column */}
          <div>
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                padding: '12px',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--border-medium)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <img
                src={namasteImg}
                alt="Sri Gandra Venkata Ramana Reddy greeting the public"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '520px',
                  objectFit: 'cover',
                  objectPosition: 'top',
                  borderRadius: '2px',
                }}
                loading="lazy"
              />
              <div
                style={{
                  padding: '14px 10px 6px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: 'var(--accent-navy)',
                  }}
                >
                  {lang === 'te' ? 'నమస్కారాలతో ప్రజల సేవలో' : 'In Service of the Public'}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {lang === 'te'
                    ? 'ప్రజా శ్రేయస్సు మరియు క్షేత్రస్థాయి అభివృద్ధికి నిరంతర తోడ్పాటు'
                    : 'Unwavering commitment to community development in Bhupalpally'}
                </div>
              </div>
            </div>
          </div>

          {/* Biographical Story Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                padding: '30px',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h3
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: 'var(--accent-navy)',
                  marginBottom: '14px',
                  fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
                }}
              >
                {lang === 'te' ? 'ప్రజా జీవిత నేపథ్యం' : 'Public & Political Profile'}
              </h3>
              <div
                style={{
                  fontSize: '1rem',
                  lineHeight: '1.75',
                  color: 'var(--text-secondary)',
                  whiteSpace: 'pre-line',
                }}
              >
                {biography}
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                padding: '30px',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h3
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: 'var(--accent-navy)',
                  marginBottom: '14px',
                  fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
                }}
              >
                {lang === 'te' ? 'శాసనసభ మరియు నియోజకవర్గ ప్రస్థానం' : 'Legislative & Constituency Service'}
              </h3>
              <div
                style={{
                  fontSize: '1rem',
                  lineHeight: '1.75',
                  color: 'var(--text-secondary)',
                  whiteSpace: 'pre-line',
                }}
              >
                {politicalJourney}
              </div>
            </div>
          </div>
        </div>

        {/* Four Guiding Pillars */}
        <div>
          <div
            style={{
              textAlign: 'center',
              marginBottom: '28px',
            }}
          >
            <h3
              style={{
                fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
                fontSize: '1.65rem',
                fontWeight: 700,
                color: 'var(--accent-navy)',
              }}
            >
              {t.about.pillarsHeading}
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
            }}
          >
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  padding: '24px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                className="pillar-card"
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: 'var(--bg-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {pillar.icon}
                </div>
                <h4
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: 'var(--accent-navy)',
                    lineHeight: 1.3,
                  }}
                >
                  {pillar.title}
                </h4>
                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.55,
                  }}
                >
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .about-grid {
            grid-template-columns: 0.85fr 1.15fr !important;
            gap: 48px !important;
          }
        }
        .pillar-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
