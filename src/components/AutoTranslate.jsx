//===============================================
//🔄 COMPONENTE AUTO-TRANSLATE CON MYMEMORY API
//===============================================

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Caché de traducciones en localStorage
const CACHE_KEY = 'translation_cache_v3';
const CACHE_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 días

function getCache() {
  try {
    const cache = localStorage.getItem(CACHE_KEY);
    return cache ? JSON.parse(cache) : {};
  } catch {
    return {};
  }
}

function setCache(cache) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.warn('Error guardando caché:', e);
  }
}

/**
 * Traduce texto usando MyMemory API (GRATIS)
 */
async function translateText(text, targetLang) {
  // Si el texto está vacío, devolver vacío
  if (!text || text.trim() === '') return text;
  
  // Caché
  const cache = getCache();
  const cacheKey = `${text}_${targetLang}`;
  
  if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < CACHE_EXPIRY) {
    return cache[cacheKey].text;
  }

  try {
    // Mapeo de códigos de idioma
    const langMap = {
      'en': 'en',
      'de': 'de',
      'ru': 'ru',
      'mk': 'mk'
    };

    const targetCode = langMap[targetLang] || targetLang;
    
    // MyMemory API - completamente GRATIS
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=es|${targetCode}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.responseData && data.responseData.translatedText) {
      const translated = data.responseData.translatedText;
      
      // Guardar en caché
      cache[cacheKey] = {
        text: translated,
        timestamp: Date.now()
      };
      setCache(cache);
      
      return translated;
    }
  } catch (error) {
    console.error('Error traduciendo:', error);
  }
  
  return text; // Fallback al texto original
}

/**
 * Componente que traduce automáticamente su contenido
 */
export default function AutoTranslate({ children, as: Component = 'span' }) {
  const { i18n } = useTranslation();
  const [translated, setTranslated] = useState(children);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Si es español o no hay contenido, no traducir
    if (i18n.language === 'es' || !children || typeof children !== 'string') {
      setTranslated(children);
      return;
    }

    setIsLoading(true);
    translateText(children, i18n.language)
      .then(setTranslated)
      .finally(() => setIsLoading(false));
  }, [children, i18n.language]);

  return <Component>{isLoading ? children : translated}</Component>;
}
