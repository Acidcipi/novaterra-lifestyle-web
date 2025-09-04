//===============================================
//🌍 CONFIGURACIÓN INTERNACIONAL PROFESIONAL
//===============================================

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importar idiomas específicos
import esTranslations from './locales/es.json';
import enTranslations from './locales/en.json'; 
import deTranslations from './locales/de.json';
import ruTranslations from './locales/ru.json';
import mkTranslations from './locales/mk.json';

//===============================================
//🔒 IDIOMAS SOPORTADOS - 5 ESPECÍFICOS
//===============================================
export const SUPPORTED_LANGUAGES = [
  'es', 'en', 'de', 'ru', 'mk'
];

const validateLanguage = (lang) => {
  return SUPPORTED_LANGUAGES.includes(lang) ? lang : 'es';
};

//===============================================
//🛠️ DETECTOR PERSONALIZADO
//===============================================
const customDetector = {
  name: 'novaterraDetector',
  lookup: () => {
    const storedLang = localStorage.getItem('novaterra-language');
    if (storedLang && SUPPORTED_LANGUAGES.includes(storedLang)) {
      return storedLang;
    }
    
    const browserLang = navigator.language.split('-')[0];
    if (SUPPORTED_LANGUAGES.includes(browserLang)) {
      return browserLang;
    }
    
    return 'es';
  },
  cacheUserLanguage: (lng) => {
    if (SUPPORTED_LANGUAGES.includes(lng)) {
      localStorage.setItem('novaterra-language', lng);
    }
  }
};

//===============================================
//⚙️ INICIALIZACIÓN I18N
//===============================================
i18n
  .use({
    type: 'languageDetector',
    detect: customDetector.lookup,
    init: () => {},
    cacheUserLanguage: customDetector.cacheUserLanguage
  })
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: esTranslations },
      en: { translation: enTranslations },
      de: { translation: deTranslations },
      ru: { translation: ruTranslations },
      mk: { translation: mkTranslations }
    },
    
    fallbackLng: 'es',
    lng: validateLanguage(customDetector.lookup()),
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: true
    },
    
    react: {
      useSuspense: true
    }
  });

export const changeLanguageSafely = (newLang) => {
  const validLang = validateLanguage(newLang);
  return i18n.changeLanguage(validLang);
};

export default i18n;