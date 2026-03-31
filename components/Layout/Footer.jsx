'use client';
import { useContext } from 'react';
import LangContext from '@/context/LangContext';
import { content } from '@/data/content';
import styles from './Footer.module.css';

export default function Footer() {
  const { lang } = useContext(LangContext);
  const t = content[lang].footer;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.jp}>森 海</span>
            <p className={styles.tagline}>{t.tagline}</p>
          </div>
          <div className={styles.social}>
            {t.social.map((s) => (
              <a key={s} href="#" className={styles.socialLink}>{s}</a>
            ))}
          </div>
        </div>
        <div className={styles.bottom}>
          <p className={styles.copy}>{t.copyright}</p>
          <div className={styles.mark}>
            <span>Designed with intention</span>
            <span className={styles.dot}>·</span>
            <span>Tokyo × Dubai</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
