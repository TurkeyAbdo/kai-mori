'use client';
import { useEffect, useRef } from 'react';

export default function useReveal(threshold = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    // Observe the element and all reveal children
    const revealEls = el.querySelectorAll('.reveal');
    revealEls.forEach((r) => observer.observe(r));
    if (el.classList.contains('reveal')) observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
