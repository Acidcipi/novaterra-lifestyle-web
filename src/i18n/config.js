//===============================================
//🌍 CONFIGURACIÓN INTERNACIONAL COMPLETA Y FINAL
//===============================================

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importar archivos ESPAÑOLES completos
import esCommon from './locales/es/common.json';
import esAuth from './locales/es/auth.json';
import esProperties from './locales/es/properties.json';
import esPages from './locales/es/pages.json';

// Importar archivos INGLESES completos
import enCommon from './locales/en/common.json';
import enAuth from './locales/en/auth.json';
import enProperties from './locales/en/properties.json';
import enPages from './locales/en/pages.json';

// Importar archivos ALEMANES completos
import deCommon from './locales/de/common.json';

// Importar archivos RUSOS completos
import ruCommon from './locales/ru/common.json';
import ruAuth from './locales/ru/auth.json';
import ruProperties from './locales/ru/properties.json';
import ruPages from './locales/ru/pages.json';

// Importar archivos MACEDONIOS completos
import mkCommon from './locales/mk/common.json';
import mkAuth from './locales/mk/auth.json';
import mkProperties from './locales/mk/properties.json';
import mkPages from './locales/mk/pages.json';

// Importar anuncios específicos
import esVillaLujo from './locales/es/services/villa_lujo_santander.json';
import enVillaLujo from './locales/en/services/villa_lujo_santander.json';
import esApartamentoCentro from './locales/es/services/apartamento_centro_santander.json';
import enApartamentoCentro from './locales/en/services/apartamento_centro_santander.json';

//===============================================
//📦 RECURSOS COMPLETOS TODOS LOS IDIOMAS
//===============================================
const resources = {
  es: {
    common: esCommon,
    auth: esAuth,
    properties: esProperties,
    pages: esPages,
    villa_lujo_santander: esVillaLujo,
    apartamento_centro_santander: esApartamentoCentro
  },
  en: {
    common: enCommon,
    auth: enAuth,
    properties: enProperties,
    pages: enPages,
    villa_lujo_santander: enVillaLujo,
    apartamento_centro_santander: enApartamentoCentro
  },
  de: {
    common: deCommon,
    auth: esAuth,           // Fallback al español hasta traducir
    properties: esProperties,
    pages: esPages,
    villa_lujo_santander: esVillaLujo,
    apartamento_centro_santander: esApartamentoCentro
  },
  ru: {
    common: ruCommon,
    auth: ruAuth,           // COMPLETO
    properties: ruProperties,
    pages: ruPages,
    villa_lujo_santander: esVillaLujo,
    apartamento_centro_santander: esApartamentoCentro
  },
  mk: {
    common: mkCommon,
    auth: mkAuth,           // COMPLETO
    properties: mkProperties,
    pages: mkPages,
    villa_lujo_santander: esVillaLujo,
    apartamento_centro_santander: esApartamentoCentro
  }
};

//===============================================
//⚙️ INICIALIZACIÓN I18N ESTABLE
//===============================================
i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    defaultNS: 'common',
    ns: ['common', 'auth', 'properties', 'pages', 'villa_lujo_santander', 'apartamento_centro_santander'],
    
    lng: localStorage.getItem('novaterra-language') || 'es',
    
    interpolation: {
      escapeValue: false
    },
    
    react: {
      useSuspense: false
    },
    
    debug: false
  });

export const changeLanguageSafely = (newLang) => {
  const supportedLangs = ['es', 'en', 'de', 'ru', 'mk'];
  const validLang = supportedLangs.includes(newLang) ? newLang : 'es';
  localStorage.setItem('novaterra-language', validLang);
  return i18n.changeLanguage(validLang);
};

export default i18n;