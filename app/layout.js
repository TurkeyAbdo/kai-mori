'use client';
import './globals.css';
import { useState } from 'react';
import CustomCursor from '@/components/Layout/CustomCursor';
import SmoothScroll from '@/components/Layout/SmoothScroll';
import ScrollProgress from '@/components/Layout/ScrollProgress';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import LangContext from '@/context/LangContext';

export default function RootLayout({ children }) {
  const [lang, setLang] = useState('en');

  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <title>Kai Mori | 森 海 — Design Studio</title>
        <meta name="description" content="Luxury product design and creative direction. Tokyo × Dubai." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <LangContext.Provider value={{ lang, setLang }}>
          <SmoothScroll>
            <CustomCursor />
            <ScrollProgress />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </LangContext.Provider>
      </body>
    </html>
  );
}
