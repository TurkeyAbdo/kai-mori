'use client';
import { useContext, useState } from 'react';
import LangContext from '@/context/LangContext';
import { content } from '@/data/content';
import useReveal from '@/components/UI/useReveal';
import styles from './Process.module.css';

export default function Process() {
  const { lang } = useContext(LangContext);
  const t = content[lang].process;
  const sectionRef = useReveal();
  const [activeStep, setActiveStep] = useState(null);

  return (
    <section id="process" className={`${styles.process} section`} ref={sectionRef}>
      <div className="container">
        <span className="section-label reveal">{t.label}</span>
        <h2 className={`${styles.title} reveal reveal-delay-1`}>{t.title}</h2>

        <div className={styles.steps}>
          {t.steps.map((step, i) => (
            <div
              key={step.number}
              className={`${styles.step} ${activeStep === i ? styles.stepActive : ''} reveal`}
              style={{ transitionDelay: `${i * 100}ms` }}
              onMouseEnter={() => setActiveStep(i)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className={styles.stepLine}>
                <div className={`${styles.dot} ${activeStep === i ? styles.dotActive : ''}`} />
                {i < t.steps.length - 1 && <div className={styles.connector} />}
              </div>
              <div className={styles.stepContent}>
                <div className={styles.stepNum}>{step.number}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
