import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, CheckCircle2, Milestone as MilestoneIcon } from 'lucide-react';

const MilestonesTimeline = ({ milestones = [] }) => {
  const { lang, t, b } = useLanguage();

  return (
    <section
      id="milestones"
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
            <MilestoneIcon size={14} />
            <span>{t.milestones.badge}</span>
          </div>
          <h2 className="section-title">{t.milestones.heading}</h2>
          <div className="telangana-divider">
            <div className="telangana-divider-diamond" />
          </div>
          <p className="section-subtitle">{t.milestones.subheading}</p>
        </div>

        {/* Timeline Container */}
        <div
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            position: 'relative',
            paddingLeft: '32px',
          }}
          className="timeline-wrap"
        >
          {/* Vertical continuous line */}
          <div
            style={{
              position: 'absolute',
              top: '8px',
              bottom: '8px',
              left: '7px',
              width: '2px',
              backgroundColor: 'var(--accent-gold)',
              opacity: 0.5,
            }}
          />

          {milestones.map((item, idx) => (
            <div
              key={item._id || idx}
              style={{
                position: 'relative',
                marginBottom: '36px',
              }}
            >
              {/* Timeline Pin Node */}
              <div
                style={{
                  position: 'absolute',
                  top: '4px',
                  left: '-32px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-navy)',
                  border: '3px solid #FFFFFF',
                  boxShadow: '0 0 0 2px var(--accent-gold)',
                  zIndex: 2,
                }}
              />

              {/* Milestone Card */}
              <div
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  padding: '24px 28px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px',
                    marginBottom: '10px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: 'var(--accent-saffron)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {item.year}
                  </span>

                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--accent-green)',
                      backgroundColor: 'rgba(19, 78, 53, 0.08)',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-xs)',
                      textTransform: 'uppercase',
                    }}
                  >
                    <CheckCircle2 size={12} />
                    <span>{t.milestones.verifiedBadge}</span>
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: 'var(--accent-navy)',
                    marginBottom: '8px',
                    lineHeight: 1.35,
                    fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'inherit',
                  }}
                >
                  {b(item.title)}
                </h3>

                {item.roleOrCategory && (
                  <div
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: 'var(--accent-gold-dark)',
                      marginBottom: '10px',
                    }}
                  >
                    {b(item.roleOrCategory)}
                  </div>
                )}

                <p
                  style={{
                    fontSize: '0.94rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  {b(item.description)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MilestonesTimeline;
