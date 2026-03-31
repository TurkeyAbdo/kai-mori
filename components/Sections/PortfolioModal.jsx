'use client';
import { useEffect } from 'react';
import styles from './PortfolioModal.module.css';

export default function PortfolioModal({ project, lang, onClose }) {
  useEffect(() => {
    window.__lenis?.stop();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      window.__lenis?.start();
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" onWheel={(e) => e.stopPropagation()}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Close">
          <span /><span />
        </button>

        <div className={styles.modalScroll}>
          <div className={styles.hero}>
            <div className={styles.heroFaux}>
              <span className={styles.heroNum}>0{project.id}</span>
            </div>
            <div className={styles.heroBadge}>{project.category}</div>
          </div>

          <div className={styles.body}>
            <div className={styles.meta}>
              <span className={styles.year}>{project.year}</span>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>

            <h2 className={styles.title}>{project.title}</h2>
            <div className="gold-line" style={{ margin: '1.5rem 0' }} />
            <p className={styles.desc}>{project.desc}</p>

            <div className={styles.details}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>{lang === 'ar' ? 'التخصص' : 'Discipline'}</span>
                <span className={styles.detailValue}>{project.category}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>{lang === 'ar' ? 'السنة' : 'Year'}</span>
                <span className={styles.detailValue}>{project.year}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>{lang === 'ar' ? 'الموقع' : 'Studio'}</span>
                <span className={styles.detailValue}>Kai Mori Studio</span>
              </div>
            </div>

            <div className={styles.imageGrid}>
              {[1, 2, 3].map((n) => (
                <div key={n} className={styles.imagePlaceholder}>
                  <span className={styles.imageFauxText}>
                    {n === 1 ? '概要' : n === 2 ? '詳細' : '完成'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
