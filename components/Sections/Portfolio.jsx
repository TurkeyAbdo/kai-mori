'use client';
import { useContext, useState } from 'react';
import LangContext from '@/context/LangContext';
import { content } from '@/data/content';
import useReveal from '@/components/UI/useReveal';
import EmptyState from '@/components/UI/EmptyState';
import styles from './Portfolio.module.css';

export default function Portfolio() {
  const { lang } = useContext(LangContext);
  const t = content[lang].portfolio;
  const sectionRef = useReveal();
  const [hovered, setHovered] = useState(null);

  return (
    <section id="portfolio" className={`${styles.portfolio} section`} ref={sectionRef}>
      <div className="container">
        <span className="section-label reveal">{t.label}</span>
        <div className={styles.header}>
          <h2 className={`${styles.title} reveal reveal-delay-1`}>{t.title}</h2>
          <p className={`${styles.subtitle} reveal reveal-delay-2`}>{t.subtitle}</p>
        </div>

        {t.items.length === 0 ? (
          <EmptyState title={t.empty.title} desc={t.empty.desc} />
        ) : (
          <div className={styles.grid}>
            {t.items.map((item, i) => (
              <div
                key={item.id}
                className={`${styles.card} ${hovered === item.id ? styles.cardHovered : ''} ${hovered !== null && hovered !== item.id ? styles.cardDimmed : ''} reveal`}
                style={{ transitionDelay: `${i * 100}ms` }}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Placeholder image */}
                <div className={styles.cardImage}>
                  <div className={styles.cardImageFaux}>
                    <span className={styles.cardNum}>0{item.id}</span>
                  </div>
                  <div className={styles.cardImageOverlay}>
                    <span className={styles.viewLabel}>{lang === 'ar' ? 'عرض' : 'View'}</span>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardCategory}>{item.category}</span>
                    <span className={styles.cardYear}>{item.year}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.desc}</p>
                  <div className={styles.tags}>
                    {item.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
