import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { apiService } from '../services/api';
import { MapPin, Phone, Mail, Send, CheckCircle2, AlertCircle, Building, Clock } from 'lucide-react';

const ContactSection = ({ contactInfo }) => {
  const { lang, t, b } = useLanguage();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    mandalOrArea: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: '' }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);

    // Basic validation
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setFeedback({
        type: 'error',
        message: lang === 'te' ? 'దయచేసి అవసరమైన అన్ని వివరాలను పూరించండి' : 'Please fill all required fields',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiService.submitContact(formData);
      setFeedback({
        type: 'success',
        message: res.message || t.contact.successMsg,
      });
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        mandalOrArea: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.response?.data?.message || t.contact.errorMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const publicOffice = b(
    contactInfo?.publicOfficeAddress,
    lang === 'te'
      ? 'క్యాంప్ కార్యాలయం, కలెక్టరేట్ రోడ్ సమీపంలో, భూపాలపల్లి, జయశంకర్ భూపాలపల్లి జిల్లా, తెలంగాణ 506169'
      : 'MLA Camp & Public Service Office, Near Collectorate Road, Bhupalpally, Jayashankar Bhupalpally District, Telangana 506169'
  );

  const campOffice = b(
    contactInfo?.campOfficeAddress,
    lang === 'te'
      ? 'ప్రజా సంబంధాల కార్యాలయం, సుబేదారి, హనుమకొండ, వరంగల్, తెలంగాణ 506001'
      : 'Liaison & Public Interaction Office, Subedari, Hanumakonda, Warangal, Telangana 506001'
  );

  const phone = contactInfo?.officePhone || '+91 8713 222 345';
  const email = contactInfo?.officialEmail || 'office@gandrareddy.in';

  return (
    <section id="contact" className="section-pad" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header centered">
          <div className="editorial-badge saffron">
            <Building size={14} />
            <span>{t.contact.badge}</span>
          </div>
          <h2 className="section-title">{t.contact.heading}</h2>
          <div className="telangana-divider">
            <div className="telangana-divider-diamond" />
          </div>
          <p className="section-subtitle">{t.contact.subheading}</p>
        </div>

        {/* 2-Column Layout: Offices & Details | Form */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '40px',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
          className="contact-grid"
        >
          {/* Offices and Public Hours Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Bhupalpally Office */}
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                padding: '24px',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: 'rgba(11, 37, 69, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MapPin size={18} color="var(--accent-navy)" />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-navy)' }}>
                  {t.contact.publicOfficeTitle}
                </h3>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, paddingLeft: '46px' }}>
                {publicOffice}
              </p>
            </div>

            {/* Hanumakonda Liaison Office */}
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                padding: '24px',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: 'rgba(19, 78, 53, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Building size={18} color="var(--accent-green)" />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-navy)' }}>
                  {t.contact.campOfficeTitle}
                </h3>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, paddingLeft: '46px' }}>
                {campOffice}
              </p>
            </div>

            {/* Email & Phone */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
              }}
            >
              <div
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  padding: '20px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <Mail size={16} color="var(--accent-saffron)" />
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    {t.contact.emailTitle}
                  </span>
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--accent-navy)' }}>
                  {email}
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  padding: '20px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <Phone size={16} color="var(--accent-navy)" />
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    {t.contact.phoneTitle}
                  </span>
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--accent-navy)' }}>
                  {phone}
                </div>
              </div>
            </div>

            {/* Office Public Hours Notice */}
            <div
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderLeft: '4px solid var(--accent-gold-dark)',
                padding: '16px 20px',
                borderRadius: 'var(--radius-xs)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <Clock size={20} color="var(--accent-gold-dark)" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {lang === 'te'
                  ? 'ప్రజా దర్బార్ & సమస్యల స్వీకరణ సమయం: ఉదయం 9:00 నుండి మధ్యాహ్నం 1:00 వరకు (క్యాంప్ కార్యాలయం, భూపాలపల్లి)'
                  : 'Public Grievance Darbar Hours: 9:00 AM – 1:00 PM (Bhupalpally Camp Office)'}
              </div>
            </div>
          </div>

          {/* Citizen Representation Form Column */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              padding: '32px',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--border-medium)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div style={{ marginBottom: '20px' }}>
              <h3
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: 'var(--accent-navy)',
                  marginBottom: '4px',
                  fontFamily: lang === 'te' ? 'var(--font-telugu)' : 'var(--font-editorial)',
                }}
              >
                {t.contact.formHeading}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {t.contact.formSub}
              </p>
            </div>

            {feedback && (
              <div
                style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-xs)',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: feedback.type === 'success' ? 'rgba(19, 78, 53, 0.1)' : 'rgba(217, 93, 30, 0.1)',
                  border: `1px solid ${feedback.type === 'success' ? 'var(--accent-green)' : 'var(--accent-saffron)'}`,
                  color: feedback.type === 'success' ? 'var(--accent-green)' : 'var(--accent-saffron)',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                }}
              >
                {feedback.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                <span>{feedback.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }} className="form-two-col">
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                    {t.contact.nameLabel}
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={t.contact.namePlaceholder}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--border-medium)',
                      backgroundColor: 'var(--bg-primary)',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                    {t.contact.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t.contact.phonePlaceholder}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--border-medium)',
                      backgroundColor: 'var(--bg-primary)',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }} className="form-two-col">
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                    {t.contact.emailLabel}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.contact.emailPlaceholder}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--border-medium)',
                      backgroundColor: 'var(--bg-primary)',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                    {t.contact.mandalLabel}
                  </label>
                  <input
                    type="text"
                    name="mandalOrArea"
                    value={formData.mandalOrArea}
                    onChange={handleChange}
                    placeholder={t.contact.mandalPlaceholder}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--border-medium)',
                      backgroundColor: 'var(--bg-primary)',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                  {t.contact.subjectLabel}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t.contact.subjectPlaceholder}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border-medium)',
                    backgroundColor: 'var(--bg-primary)',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                  {t.contact.messageLabel}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.contact.messagePlaceholder}
                  required
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border-medium)',
                    backgroundColor: 'var(--bg-primary)',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '6px' }}
              >
                <Send size={16} />
                <span>{isSubmitting ? t.contact.submittingBtn : t.contact.submitBtn}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr 1.15fr !important;
            gap: 40px !important;
          }
          .form-two-col {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
