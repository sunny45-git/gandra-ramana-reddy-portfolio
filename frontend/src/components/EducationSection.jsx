import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GraduationCap, Building2, BookOpen, Calendar, ShieldCheck, Clock, Award } from 'lucide-react';

const EducationSection = ({ profile }) => {
  const { lang, t, b } = useLanguage();

  const educationList = profile?.educationalQualifications || [];
  const verificationStatus = profile?.educationVerificationStatus || {};

  // Sort by order or index
  const sortedEducation = [...educationList].sort((a, b) => (a.order || 0) - (b.order || 0));

  const hasVerifiedEntries = sortedEducation.length > 0 && sortedEducation.some((item) => item.isVerified !== false);

  const neutralNotice = b(
    verificationStatus.noticeMessage,
    lang === 'te'
      ? 'విద్యార్హతల వివరాలు ధృవీకరించిన తర్వాత నవీకరించబడతాయి'
      : 'Educational details will be updated after verification'
  );

  return (
    <section
      id="education"
      style={{
        paddingTop: '56px',
        paddingBottom: '56px',
        backgroundColor: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative',
      }}
    >
      <div className="container" style={{ maxWidth: '1040px' }}>
        {/* Section Header */}
        <div className="section-header centered" style={{ marginBottom: '36px' }}>
          <div className="editorial-badge green">
            <GraduationCap size={15} />
            <span>{t.education.badge}</span>
          </div>
          <h2 className="section-title">{t.education.heading}</h2>
          <div className="telangana-divider">
            <div className="telangana-divider-diamond" />
          </div>
          <p className="section-subtitle">{t.education.subheading}</p>
        </div>

        {/* Content Area: If verified qualifications exist, display them; else show the neutral verification notice */}
        {hasVerifiedEntries ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {sortedEducation
              .filter((item) => item.isVerified !== false)
              .map((item, idx) => {
                const qual = b(item.qualification);
                const inst = b(item.institution);
                const field = b(item.fieldOfStudy);
                const year = item.yearOfCompletion;
                const notes = b(item.notes);

                return (
                  <div
                    key={item._id || idx}
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-xs)',
                      padding: '24px',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                      position: 'relative',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                    className="education-card"
                  >
                    {/* Top Tag & Verified Badge */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '8px',
                      }}
                    >
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: 'var(--radius-xs)',
                          backgroundColor: 'rgba(11, 37, 69, 0.06)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--accent-navy)',
                        }}
                      >
                        <GraduationCap size={22} />
                      </div>

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
                        <ShieldCheck size={13} />
                        <span>{t.education.verifiedRecord}</span>
                      </span>
                    </div>

                    {/* Qualification Title */}
                    {qual && (
                      <h3
                        style={{
                          fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: 'var(--accent-navy)',
                          lineHeight: 1.3,
                        }}
                      >
                        {qual}
                      </h3>
                    )}

                    {/* Metadata details (only displaying non-empty fields) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
                      {inst && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--text-secondary)' }}>
                          <Building2 size={16} color="var(--accent-gold-dark)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>
                            <strong style={{ color: 'var(--accent-navy)' }}>{t.education.institution}: </strong>
                            {inst}
                          </span>
                        </div>
                      )}

                      {field && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--text-secondary)' }}>
                          <BookOpen size={16} color="var(--accent-saffron)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>
                            <strong style={{ color: 'var(--accent-navy)' }}>{t.education.fieldOfStudy}: </strong>
                            {field}
                          </span>
                        </div>
                      )}

                      {year && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                          <Calendar size={16} color="var(--accent-green)" style={{ flexShrink: 0 }} />
                          <span>
                            <strong style={{ color: 'var(--accent-navy)' }}>{t.education.yearOfCompletion}: </strong>
                            {year}
                          </span>
                        </div>
                      )}

                      {notes && (
                        <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.5 }}>
                          {notes}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          /* Neutral Dignified Verification Card */
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-medium)',
              borderLeft: '4px solid var(--accent-gold-dark)',
              borderRadius: 'var(--radius-xs)',
              padding: '32px 28px',
              maxWidth: '720px',
              margin: '0 auto',
              boxShadow: 'var(--shadow-sm)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(197, 168, 128, 0.15)',
                color: 'var(--accent-gold-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <Clock size={24} />
            </div>

            <h3
              style={{
                fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--accent-navy)',
                marginBottom: '10px',
              }}
            >
              {neutralNotice}
            </h3>

            <p
              style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                maxWidth: '560px',
                margin: '0 auto',
              }}
            >
              {lang === 'te'
                ? 'పారదర్శక ప్రజా జీవన విలువల ప్రకారం, ఎన్నికల కమిషన్ మరియు అధికారిక రికార్డుల ద్వారా ధృవీకరించిన సమాచారాన్ని మాత్రమే ఈ అధికారిక వెబ్‌సైట్‌లో ప్రదర్శించబడుతుంది.'
                : 'In adherence to high standards of public transparency and official record integrity, educational credentials are confirmed through verified records before publication.'}
            </p>
          </div>
        )}
      </div>

      <style>{`
        .education-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
      `}</style>
    </section>
  );
};

export default EducationSection;
