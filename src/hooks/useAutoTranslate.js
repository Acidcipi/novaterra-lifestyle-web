//===============================================
//🌍 HOOK EFICIENTE PARA TRADUCCIÓN AUTOMÁTICA DE PÁGINAS
//===============================================

import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Hook optimizado que traduce TODO el contenido de una vez
 * Guarda en localStorage para evitar re-traducciones
 */
export function usePageTranslation(contentES) {
  const { i18n } = useTranslation();
  const [content, setContent] = useState(contentES);
  const [loading, setLoading] = useState(false);
  const currentLang = i18n.language;

  //===============================================
  //📦 CACH/E EN LOCALSTORAGE
  //===============================================
  const getCacheKey = useCallback((lang) => {
    const contentHash = JSON.stringify(contentES).length; // Simple hash
    return `translation_${lang}_${contentHash}`;
  }, [contentES]);

  const getCachedTranslation = useCallback((lang) => {
    try {
      const cached = localStorage.getItem(getCacheKey(lang));
      if (cached) {
        const { content: cachedContent, timestamp } = JSON.parse(cached);
        // Cache válido por 7 días
        if (Date.now() - timestamp < 7 * 24 * 60 * 60 * 1000) {
          return cachedContent;
        }
      }
    } catch (e) {
      console.error('Cache read error:', e);
    }
    return null;
  }, [getCacheKey]);

  const setCachedTranslation = useCallback((lang, translatedContent) => {
    try {
      localStorage.setItem(
        getCacheKey(lang),
        JSON.stringify({
          content: translatedContent,
          timestamp: Date.now()
        })
      );
    } catch (e) {
      console.error('Cache write error:', e);
    }
  }, [getCacheKey]);

  //===============================================
  //🔄 FUNCIÓN RECURSIVA PARA TRADUCIR OBJETOS
  //===============================================
  const translateObject = useCallback(async (obj, lang) => {
    if (typeof obj === 'string') {
      return obj; // Se traduce después en batch
    }

    if (Array.isArray(obj)) {
      return obj; // Se traduce después en batch
    }

    if (typeof obj === 'object' && obj !== null) {
      const result = {};
      for (const key in obj) {
        result[key] = await translateObject(obj[key], lang);
      }
      return result;
    }

    return obj;
  }, []);

  //===============================================
  //📝 EXTRAER TODOS LOS TEXTOS PARA TRADUCIR
  //===============================================
  const extractTexts = useCallback((obj, texts = [], paths = []) => {
    if (typeof obj === 'string') {
      texts.push(obj);
      paths.push(null);
    } else if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        extractTexts(item, texts, paths);
      });
    } else if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        extractTexts(obj[key], texts, paths);
      }
    }
    return texts;
  }, []);

  //===============================================
  //🔄 APLICAR TRADUCCIONES AL OBJETO
  //===============================================
  const applyTranslations = useCallback((obj, translations, index = { value: 0 }) => {
    if (typeof obj === 'string') {
      return translations[index.value++] || obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(item => applyTranslations(item, translations, index));
    }

    if (typeof obj === 'object' && obj !== null) {
      const result = {};
      for (const key in obj) {
        result[key] = applyTranslations(obj[key], translations, index);
      }
      return result;
    }

    return obj;
  }, []);

  //===============================================
  //⚡ EFECTO PRINCIPAL DE TRADUCCIÓN
  //===============================================
  useEffect(() => {
    // Si es español, usar contenido original
    if (currentLang === 'es') {
      setContent(contentES);
      setLoading(false);
      return;
    }

    // Buscar en caché
    const cached = getCachedTranslation(currentLang);
    if (cached) {
      setContent(cached);
      setLoading(false);
      return;
    }

    // Traducir
    const translateContent = async () => {
      setLoading(true);

      try {
        // Extraer todos los textos
        const allTexts = extractTexts(contentES);

        // Traducir todo de una vez
        const response = await fetch('/.netlify/functions/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: allTexts,
            target: currentLang,
            source: 'es'
          })
        });

        if (!response.ok) {
          throw new Error('Translation failed');
        }

        const data = await response.json();
        
        // Aplicar traducciones al objeto original
        const translatedContent = applyTranslations(contentES, data.translations);

        // Guardar en caché
        setCachedTranslation(currentLang, translatedContent);

        // Actualizar estado
        setContent(translatedContent);

      } catch (error) {
        console.error('Translation error:', error);
        setContent(contentES); // Fallback al español
      } finally {
        setLoading(false);
      }
    };

    translateContent();
  }, [currentLang, contentES, getCachedTranslation, setCachedTranslation, extractTexts, applyTranslations]);

  return { content, loading, language: currentLang };
}
