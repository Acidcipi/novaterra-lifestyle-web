//===============================================
//🌍 HOOK EFICIENTE PARA TRADUCCIÓN AUTOMÁTICA DE PÁGINAS
//===============================================

import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export function usePageTranslation(contentES) {
  const { i18n } = useTranslation();
  const [content, setContent] = useState(contentES);
  const [loading, setLoading] = useState(false);
  const currentLang = i18n.language;

  //===============================================
  //📦 CACHÉ EN LOCALSTORAGE
  //===============================================
  const getCacheKey = useCallback((lang) => {
    const contentHash = JSON.stringify(contentES).length;
    return `translation_${lang}_${contentHash}`;
  }, [contentES]);

  const getCachedTranslation = useCallback((lang) => {
    try {
      const cached = localStorage.getItem(getCacheKey(lang));
      if (cached) {
        const { content: cachedContent, timestamp } = JSON.parse(cached);
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
  //📝 EXTRAER TODOS LOS TEXTOS
  //===============================================
  const extractTexts = useCallback((obj, texts = []) => {
    if (typeof obj === 'string') {
      texts.push(obj);
    } else if (Array.isArray(obj)) {
      obj.forEach(item => extractTexts(item, texts));
    } else if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        extractTexts(obj[key], texts);
      }
    }
    return texts;
  }, []);

  //===============================================
  //🔄 APLICAR TRADUCCIONES
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
  //⚡ EFECTO PRINCIPAL
  //===============================================
  useEffect(() => {
    if (currentLang === 'es') {
      setContent(contentES);
      setLoading(false);
      return;
    }

    const cached = getCachedTranslation(currentLang);
    if (cached) {
      setContent(cached);
      setLoading(false);
      return;
    }

    const translateContent = async () => {
      setLoading(true);

      try {
        const allTexts = extractTexts(contentES);

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
        const translatedContent = applyTranslations(contentES, data.translations);

        setCachedTranslation(currentLang, translatedContent);
        setContent(translatedContent);

      } catch (error) {
        console.error('Translation error:', error);
        setContent(contentES);
      } finally {
        setLoading(false);
      }
    };

    translateContent();
  }, [currentLang, contentES, getCachedTranslation, setCachedTranslation, extractTexts, applyTranslations]);

  return { content, loading, language: currentLang };
}
