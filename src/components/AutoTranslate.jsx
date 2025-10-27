import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Caché de traducciones en localStorage
const CACHE_KEY = 'translation_cache';
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 días

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
    console.error('Error guardando caché:', e);
  }
}

async function translateText(text, targetLang) {
  // Caché
  const cache = getCache();
  const cacheKey = `${text}_${targetLang}`;
  
  if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < CACHE_EXPIRY) {
    return cache[cacheKey].text;
  }

  try {
    // Usar API de traducción gratuita de MyMemory
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=es|${targetLang}`;
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

export function AutoTranslate({ children, as: Component = 'span' }) {
  const { i18n } = useTranslation();
  const [translated, setTranslated] = useState(children);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (i18n.language === 'es' || !children) {
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
