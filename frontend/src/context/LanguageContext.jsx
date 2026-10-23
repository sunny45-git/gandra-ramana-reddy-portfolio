import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../translations/en';
import { te } from '../translations/te';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Default to Telugu for authentic regional relevance, or load saved preference
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('gandra_lang') || 'te';
  });

  useEffect(() => {
    localStorage.setItem('gandra_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = (selectedLang) => {
    if (selectedLang) {
      setLang(selectedLang);
    } else {
      setLang((prev) => (prev === 'te' ? 'en' : 'te'));
    }
  };

  const t = lang === 'te' ? te : en;

  // Helper function to resolve bilingual fields: obj = { en: "...", te: "..." }
  const b = (fieldObj, fallback = '') => {
    const resolve = (val) => {
      if (!val) return '';
      if (typeof val === 'string') return val;
      if (typeof val === 'object') {
        return val[lang] || val.en || val.te || '';
      }
      return String(val);
    };

    if (!fieldObj) {
      return resolve(fallback);
    }
    const resolved = resolve(fieldObj);
    return resolved || resolve(fallback);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, b }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
