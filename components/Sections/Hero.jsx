'use client';
import { useContext, useEffect, useRef, useState } from 'react';
import LangContext from '@/context/LangContext';
import { content } from '@/data/content';
import MagneticButton from '@/components/UI/MagneticButton';
import styles from './Hero.module.css';

export default function Hero() {
  const { lang } = useContext(LangContext);
  const t = content[lang].hero;
  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,169,110,${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > W) p.dx *= -1;
        if (p.y < 0 || p.y > H) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero} id="home">
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Ink brush decorative lines */}
      <div className={styles.inkLines} aria-hidden="true">
        <div className={styles.inkLine1} />
        <div className={styles.inkLine2} />
        <div className={styles.inkCircle} />
      </div>

      <div className={`${styles.content} ${loaded ? styles.loaded : ''}`}>
        <div className={styles.greeting}>
          <span className={styles.greetingLine} />
          <span>{t.greeting}</span>
        </div>

        <h1 className={styles.name}>
          <span className={styles.nameJP}>{t.nameJP}</span>
          <span className={styles.nameLatin}>{t.name}</span>
        </h1>

        <div className={styles.tagline}>
          <p className={styles.taglineText}>{t.tagline}</p>
          <p className={styles.taglineAccent}>{t.taglineAccent}</p>
        </div>

        <p className={styles.sub}>{t.sub}</p>

        <div className={styles.ctas}>
          <MagneticButton variant="solid" onClick={scrollToAbout}>
            {t.cta}
            <span className={styles.ctaArrow}>↓</span>
          </MagneticButton>
          <MagneticButton variant="outline" onClick={scrollToContact}>
            {t.ctaSecondary}
          </MagneticButton>
        </div>
      </div>

      <div className={styles.scrollHint} onClick={scrollToAbout}>
        <div className={styles.scrollLine} />
        <span>{t.scroll}</span>
      </div>

      <div className={styles.cornerJP} aria-hidden="true">
        <span>デザイン</span>
        <span>スタジオ</span>
      </div>
    </section>
  );
}
