'use client';
import { useRef, useEffect } from 'react';
import styles from './MagneticButton.module.css';

export default function MagneticButton({ children, className = '', onClick, href, variant = 'outline' }) {
  const btnRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const btn = btnRef.current;
    if (!btn) return;

    const onMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.35;
      const dy = (e.clientY - cy) * 0.35;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const onMouseLeave = () => {
      btn.style.transform = 'translate(0,0)';
    };

    btn.addEventListener('mousemove', onMouseMove);
    btn.addEventListener('mouseleave', onMouseLeave);
    return () => {
      btn.removeEventListener('mousemove', onMouseMove);
      btn.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  const cls = `${styles.btn} ${styles[variant]} ${className}`;

  if (href) {
    return <a ref={btnRef} href={href} className={cls}>{children}</a>;
  }
  return (
    <button ref={btnRef} className={cls} onClick={onClick}>
      {children}
    </button>
  );
}
