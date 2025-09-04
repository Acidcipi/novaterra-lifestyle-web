//===============================================
//🌍 CONFIGURACIÓN INTERNACIONAL PROFESIONAL
//===============================================
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar traducciones desde archivos separados
import esTranslations from './locales/es.json';
import enTranslations from './locales/en.json';
import ruTranslations from './locales/ru.json';
import roTranslations from './locales/ro.json';
import plTranslations from './locales/pl.json';
import ukTranslations from './locales/uk.json';
import mkTranslations from './locales/mk.json';
import deTranslations from './locales/de.json';
import frTranslations from './locales/fr.json';
import itTranslations from './locales/it.json';
import ptTranslations from './locales/pt.json';
import nlTranslations from './locales/nl.json';

//===============================================
//🔒 CONFIGURACIÓN DE SEGURIDAD
//===============================================
export const SUPPORTED_LANGUAGES = [
  'es', 'en', 'ru', 'ro', 'pl', 'uk',
  'mk', 'de', 'fr', 'it', 'pt', 'nl'
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
      ru: { translation: ruTranslations },
      ro: { translation: roTranslations },
      pl: { translation: plTranslations },
      uk: { translation: ukTranslations },
      mk: { translation: mkTranslations },
      de: { translation: deTranslations },
      fr: { translation: frTranslations },
      it: { translation: itTranslations },
      pt: { translation: ptTranslations },
      nl: { translation: nlTranslations }
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