'use client';
import { useContext, useState } from 'react';
import LangContext from '@/context/LangContext';
import { content } from '@/data/content';
import useReveal from '@/components/UI/useReveal';
import EmptyState from '@/components/UI/EmptyState';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  const { lang } = useContext(LangContext);
  const t = content[lang].testimonials;
  const sectionRef = useReveal();
  const [active, setActive] = useState(0);

  if (!t.items || t.items.length === 0) {
    return (
      <section id="testimonials" className={`${styles.testimonials} section`} ref={sectionRef}>
        <div className="container">
          <span className="section-label">{t.label}</span>
          <EmptyState title={t.empty.title} desc={t.empty.desc} />
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className={`${styles.testimonials} section`} ref={sectionRef}>
      <div className="container">
        <span className="section-label reveal">{t.label}</span>
        <h2 className={`${styles.title} reveal reveal-delay-1`}>{t.title}</h2>

        <div className={styles.layout}>
          <div className={styles.quoteArea}>
            {t.items.map((item, i) => (
              <div
                key={i}
                className={`${styles.quote} ${active === i ? styles.quoteActive : ''}`}
              >
                <span className={styles.openQuote}>&ldquo;</span>
                <p className={styles.quoteText}>{item.quote}</p>
                <div className={styles.quoteAuthor}>
                  <span className={styles.authorName}>{item.author}</span>
                  <span className={styles.authorRole}>{item.role}</span>
                  <span className={styles.authorLoc}>{item.location}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.dots}>
            {t.items.map((item, i) => (
              <button
                key={i}
                className={`${styles.dotBtn} ${active === i ? styles.dotActive : ''} neu-sm`}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
              >
                <span className={styles.dotName}>{item.author}</span>
                <span className={styles.dotLoc}>{item.location}</span>
                <div className={styles.dotBar} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
