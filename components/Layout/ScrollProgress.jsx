'use client';
import { useEffect, useState } from 'react';
import styles from './ScrollProgress.module.css';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? (scrolled / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={styles.track}>
      <div className={styles.bar} style={{ width: `${progress}%` }} />
    </div>
  );
}
