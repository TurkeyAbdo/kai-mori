'use client';
import { useEffect } from 'react';
import styles from './JournalModal.module.css';

export default function JournalModal({ article, lang, onClose }) {
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Close">
          <span />
          <span />
        </button>

        <div className={styles.modalScroll}>
          <div className={styles.hero}>
            <div className={styles.heroFaux}>
              <span className={styles.heroJP}>随筆</span>
            </div>
          </div>

          <div className={styles.body}>
            <div className={styles.meta}>
              <span className={styles.category}>{article.category}</span>
              <span className={styles.divider}>·</span>
              <span className={styles.date}>{article.date}</span>
              <span className={styles.divider}>·</span>
              <span className={styles.readTime}>{article.readTime}</span>
            </div>
            <h2 className={styles.title}>{article.title}</h2>
            <div className="gold-line" style={{ margin: '1.5rem 0' }} />
            <div className={styles.content}>
              {article.body.map((para, i) => (
                <p key={i} className={styles.para}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
