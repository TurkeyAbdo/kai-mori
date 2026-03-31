'use client';
import { useContext, useState } from 'react';
import LangContext from '@/context/LangContext';
import { content } from '@/data/content';
import useReveal from '@/components/UI/useReveal';
import MagneticButton from '@/components/UI/MagneticButton';
import styles from './Contact.module.css';

export default function Contact() {
  const { lang } = useContext(LangContext);
  const t = content[lang].contact;
  const sectionRef = useReveal();
  const [form, setForm] = useState({ name: '', email: '', project: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', project: '' });
    }, 1500);
  };

  const isEmpty = !form.name && !form.email && !form.project;

  return (
    <section id="contact" className={`${styles.contact} section`} ref={sectionRef}>
      <div className="container">
        <span className="section-label reveal">{t.label}</span>

        <div className={styles.grid}>
          <div className={styles.left}>
            <h2 className={`${styles.title} reveal reveal-delay-1`}>{t.title}</h2>
            <div className="gold-line reveal reveal-delay-2" />
            <p className={`${styles.subtitle} reveal reveal-delay-3`}>{t.subtitle}</p>

            <div className={`${styles.info} reveal reveal-delay-4`}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Email</span>
                <a href={`mailto:${t.info.email}`} className={styles.infoValue}>{t.info.email}</a>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>{lang === 'ar' ? 'وقت الرد' : 'Response'}</span>
                <span className={styles.infoValue}>{t.info.response}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>{lang === 'ar' ? 'الاستوديوهات' : 'Studios'}</span>
                <div className={styles.studios}>
                  {t.info.studios.map((s) => (
                    <span key={s} className={`${styles.studio} neu-sm`}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.right} reveal reveal-delay-3`}>
            {status === 'success' ? (
              <div className={`${styles.successState} neu`}>
                <div className={styles.successIcon}>
                  <svg viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="18" stroke="var(--kin)" strokeWidth="1" />
                    <path d="M12 20 L18 26 L28 14" stroke="var(--kin)" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className={styles.successMsg}>{t.form.success}</p>
              </div>
            ) : (
              <form className={`${styles.form} neu`} onSubmit={handleSubmit}>
                <div className={styles.field}>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t.form.name}
                    className={styles.input}
                    required
                  />
                  <div className={styles.fieldLine} />
                </div>
                <div className={styles.field}>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t.form.email}
                    className={styles.input}
                    required
                  />
                  <div className={styles.fieldLine} />
                </div>
                <div className={styles.field}>
                  <textarea
                    name="project"
                    value={form.project}
                    onChange={handleChange}
                    placeholder={t.form.project}
                    className={`${styles.input} ${styles.textarea}`}
                    rows={5}
                    required
                  />
                  <div className={styles.fieldLine} />
                </div>

                <div className={styles.formFooter}>
                  {isEmpty && (
                    <p className={styles.emptyHint}>
                      {lang === 'ar' ? 'ابدأ بكتابة رسالتك...' : 'Start by telling me about your vision...'}
                    </p>
                  )}
                  <MagneticButton
                    variant="solid"
                    className={styles.submitBtn}
                  >
                    {status === 'sending' ? t.form.sending : t.form.send}
                    {status !== 'sending' && (
                      <span>{lang === 'ar' ? '↑' : '↗'}</span>
                    )}
                  </MagneticButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
