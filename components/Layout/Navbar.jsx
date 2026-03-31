'use client';
import { useEffect, useState, useContext } from 'react';
import LangContext from '@/context/LangContext';
import { content } from '@/data/content';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { lang, setLang } = useContext(LangContext);
  const t = content[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { key: 'about', href: '#about' },
    { key: 'services', href: '#services' },
    { key: 'process', href: '#process' },
    { key: 'portfolio', href: '#portfolio' },
    { key: 'journal', href: '#journal' },
    { key: 'contact', href: '#contact' },
  ];

  const handleNavClick = (href) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <a href="#" className={styles.logo} onClick={() => setMenuOpen(false)}>
            <span className={styles.logoJP}>森 海</span>
            <span className={styles.logoDivider}>|</span>
            <span className={styles.logoEN}>Kai Mori</span>
          </a>

          <ul className={styles.links}>
            {navLinks.map(({ key, href }) => (
              <li key={key}>
                <a href={href} className={styles.link}
                  onClick={(e) => { e.preventDefault(); handleNavClick(href); }}>
                  {t[key]}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.right}>
            <button
              className={styles.langBtn}
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              aria-label="Toggle language"
            >
              {lang === 'en' ? 'ع' : 'EN'}
            </button>
            <button
              className={`${styles.burger} ${menuOpen ? styles.open : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
        <ul className={styles.mobileLinks}>
          {navLinks.map(({ key, href }, i) => (
            <li key={key} style={{ transitionDelay: `${i * 60}ms` }}
              className={menuOpen ? styles.mobileVisible : ''}>
              <a href={href} onClick={(e) => { e.preventDefault(); handleNavClick(href); }}>
                <span className={styles.mobileNum}>0{i + 1}</span>
                {t[key]}
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.mobileLang}>
          <button onClick={() => { setLang(lang === 'en' ? 'ar' : 'en'); setMenuOpen(false); }}>
            {lang === 'en' ? 'عربي' : 'English'}
          </button>
        </div>
      </div>
    </>
  );
}
