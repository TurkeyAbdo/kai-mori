'use client';
import { useContext, useState } from 'react';
import LangContext from '@/context/LangContext';
import { content } from '@/data/content';
import useReveal from '@/components/UI/useReveal';
import EmptyState from '@/components/UI/EmptyState';
import JournalModal from './JournalModal';
import styles from './Journal.module.css';

export default function Journal() {
  const { lang } = useContext(LangContext);
  const t = content[lang].journal;
  const sectionRef = useReveal();
  const [selected, setSelected] = useState(null);

  return (
    <section id="journal" className={`${styles.journal} section`} ref={sectionRef}>
      <div className="container">
        <span className="section-label reveal">{t.label}</span>
        <h2 className={`${styles.title} reveal reveal-delay-1`}>{t.title}</h2>

        {!t.items || t.items.length === 0 ? (
          <EmptyState title={t.empty.title} desc={t.empty.desc}
            action={t.empty.action} />
        ) : (
          <div className={styles.grid}>
            {t.items.map((item, i) => (
              <article
                key={item.id}
                className={`${styles.card} neu reveal`}
                style={{ transitionDelay: `${i * 100}ms` }}
                onClick={() => setSelected(item)}
                data-cursor
              >
                <div className={styles.cardTop}>
                  <span className={styles.category}>{item.category}</span>
                  <span className={styles.readTime}>{item.readTime}</span>
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.excerpt}>{item.excerpt}</p>
                <div className={styles.cardBottom}>
                  <span className={styles.date}>{item.date}</span>
                  <span className={styles.readMore}>
                    {lang === 'ar' ? 'اقرأ المزيد' : 'Read more'}
                    <span className={styles.arrow}>{lang === 'ar' ? '←' : '→'}</span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <JournalModal article={selected} lang={lang} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
