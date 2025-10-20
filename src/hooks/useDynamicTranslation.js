// src/hooks/useDynamicTranslation.js
import { useTranslation } from 'react-i18next';
import { useEffect, useState, useCallback } from 'react';

/**
 * Hook SIMPLIFICADO para traducciones dinámicas
 */
export function useDynamicTranslation(namespace, category = 'services') {
  const { t: baseT, i18n } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Función de traducción que maneja namespace dinámico
  const t = useCallback((key, options = {}) => {
    if (!namespace) {
      return key;
    }

    try {
      const namespacedKey = `${namespace}:${key}`;
      const translation = i18n.t(namespacedKey, { 
        ...options, 
        ns: namespace,
        defaultValue: undefined
      });
      
      if (translation !== namespacedKey) {
        return translation;
      }
      
      return getStaticTranslation(key);
      
    } catch (error) {
      console.warn(`Error traduciendo '${namespace}:${key}':`, error);
      return getStaticTranslation(key) || key;
    }
  }, [namespace, i18n]);

  // Función para obtener traducción estática como fallback
  const getStaticTranslation = useCallback((key) => {
    const staticData = {
      villa_lujo_santander: {
        'property.title': i18n.language === 'en' ? 'Luxury Seafront Villa' : 'Villa de Lujo Frente al Mar',
        'property.subtitle': i18n.language === 'en' ? 'Exclusive property with panoramic views' : 'Exclusiva propiedad con vistas panorámicas',
        'specifications.bedrooms': '5',
        'specifications.bathrooms': '4',
        'specifications.size_built': '450 m²',
        'price.sale': i18n.language === 'en' ? '2,850,000' : '2.850.000',
        'price.currency': '€'
      },
      apartamento_centro_santander: {
        'property.title': i18n.language === 'en' ? 'Modern Apartment Historic Center' : 'Apartamento Moderno Centro Histórico',
        'property.subtitle': i18n.language === 'en' ? 'Urban elegance in the heart of Santander' : 'Elegancia urbana en pleno corazón de Santander',
        'specifications.bedrooms': '3',
        'specifications.bathrooms': '2', 
        'specifications.size_built': '120 m²',
        'price.sale': i18n.language === 'en' ? '485,000' : '485.000',
        'price.currency': '€'
      }
    };

    return staticData[namespace]?.[key];
  }, [namespace, i18n.language]);

  const reload = useCallback(() => {
    setIsLoaded(true);
    setError(null);
  }, []);

  return {
    t,
    isLoaded,
    loading,
    error,
    reload,
    namespace,
    currentLanguage: i18n.language
  };
}

export function useServiceTranslation(namespace) {
  const { t, isLoaded } = useDynamicTranslation(namespace, 'services');
  return isLoaded ? t : (key) => key;
}