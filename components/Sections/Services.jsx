'use client';
import { useContext, useState } from 'react';
import LangContext from '@/context/LangContext';
import { content } from '@/data/content';
import useReveal from '@/components/UI/useReveal';
import styles from './Services.module.css';

export default function Services() {
  const { lang } = useContext(LangContext);
  const t = content[lang].services;
  const sectionRef = useReveal();
  const [active, setActive] = useState(null);

  return (
    <section id="services" className={`${styles.services} section`} ref={sectionRef}>
      <div className="container">
        <span className="section-label reveal">{t.label}</span>
        <div className={styles.header}>
          <h2 className={`${styles.title} reveal reveal-delay-1`}>{t.title}</h2>
          <p className={`${styles.subtitle} reveal reveal-delay-2`}>{t.subtitle}</p>
        </div>

        {/* Bento Grid */}
        <div className={styles.bento}>
          {t.items.map((item, i) => (
            <div
              key={item.id}
              className={`${styles.card} ${styles[`card_${item.id}`]} ${active === item.id ? styles.cardActive : ''} neu reveal`}
              style={{ transitionDelay: `${i * 80}ms` }}
              onMouseEnter={() => setActive(item.id)}
              onMouseLeave={() => setActive(null)}
              data-cursor
            >
              <div className={styles.cardInner}>
                <span className={styles.cardIcon}>{item.icon}</span>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.desc}</p>
                </div>
                <div className={styles.cardAccent} />
              </div>
              <div className={styles.cardOverlay} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
