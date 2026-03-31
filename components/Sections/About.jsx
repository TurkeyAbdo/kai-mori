'use client';
import { useContext, useEffect, useRef } from 'react';
import LangContext from '@/context/LangContext';
import { content } from '@/data/content';
import useReveal from '@/components/UI/useReveal';
import styles from './About.module.css';

function Counter({ value }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const numMatch = value.match(/[\d.]+/);
    if (!numMatch) { el.textContent = value; return; }

    const num = parseFloat(numMatch[0]);
    const prefix = value.replace(numMatch[0], '').replace(/\d/g, '');
    const suffix = value.includes('+') ? '+' : '';
    let start = 0;
    const duration = 1800;
    const startTime = performance.now();

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * num);
        el.textContent = `${current}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{value}</span>;
}

export default function About() {
  const { lang } = useContext(LangContext);
  const t = content[lang].about;
  const sectionRef = useReveal();

  return (
    <section id="about" className={`${styles.about} section`} ref={sectionRef}>
      <div className="container">
        <span className="section-label reveal">{t.label}</span>

        <div className={styles.grid}>
          {/* Left: Image placeholder with neumorphism */}
          <div className={`${styles.imageCol} reveal reveal-delay-1`}>
            <div className={styles.imagePlaceholder}>
              <div className={styles.imageInner}>
                <div className={styles.imageFaux}>
                  <span className={styles.imageJP}>森 海</span>
                  <span className={styles.imageEn}>Kai Mori</span>
                  <span className={styles.imageSub}>Designer</span>
                </div>
              </div>
              <div className={styles.imageAccent} />
            </div>
          </div>

          {/* Right: Content */}
          <div className={styles.contentCol}>
            <h2 className={`${styles.title} reveal reveal-delay-2`}>{t.title}</h2>
            <div className="gold-line reveal reveal-delay-3" />
            {t.body.map((p, i) => (
              <p key={i} className={`${styles.body} reveal`}
                style={{ transitionDelay: `${(i + 4) * 100}ms` }}>{p}</p>
            ))}
            <p className={`${styles.signature} reveal reveal-delay-5`}>{t.signature}</p>

            {/* Stats */}
            <div className={styles.stats}>
              {t.stats.map((s, i) => (
                <div key={i} className={`${styles.stat} neu-sm reveal`}
                  style={{ transitionDelay: `${(i + 6) * 80}ms` }}>
                  <span className={styles.statValue}><Counter value={s.value} /></span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
