import { useEffect, useMemo, useState } from 'react';
import { translateTexts } from '../utils/aiTranslate';
import { getCachedPropertyTranslation, setCachedPropertyTranslation } from '../services/translationCache';

// Util: mezcla respetando campos manuales si existen
function mergeWithManualTranslations(property, lang, fields) {
  const manual = property?.translations?.[lang] || {};
  return {
    title: manual.title ?? fields.title,
    description: manual.description ?? fields.description,
    features: Array.isArray(manual.features) ? manual.features : fields.features,
    location: manual.location ?? fields.location,
    neighborhood: manual.neighborhood ?? fields.neighborhood,
    // Si viene manual, no es auto traducido
    _autoTranslated: false
  };
}

export function useAutoTranslateProperty(property, targetLang = 'es') {
  const [result, setResult] = useState(property);
  const [status, setStatus] = useState('idle'); // idle | loading | ready | error

  const base = useMemo(() => {
    if (!property) return null;
    return {
      id: property.id || property.slug || property.code || 'unknown',
      title: property.title || '',
      description: property.description || '',
      features: Array.isArray(property.features) ? property.features : [],
      location: property.location || '',
      neighborhood: property.neighborhood || ''
    };
  }, [property]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!property || !base) return;
      if (targetLang === 'es') {
        setResult(property);
        setStatus('ready');
        return;
      }

      // 1) Si hay traducción manual para este idioma, úsala y no llames IA
      const manualMerged = mergeWithManualTranslations(property, targetLang, base);
      const hasAnyManual =
        property?.translations?.[targetLang] &&
        Object.values(property.translations[targetLang]).some(v => v && String(v).trim() !== '');

      if (hasAnyManual) {
        const out = { ...property, ...manualMerged, _autoTranslated: false };
        if (!cancelled) {
          setResult(out);
          setStatus('ready');
        }
        return;
      }

      setStatus('loading');

      // 2) Cache en Firestore
      try {
        const cached = await getCachedPropertyTranslation(base.id, targetLang);
        if (cached) {
          if (!cancelled) {
            setResult(cached);
            setStatus('ready');
          }
          return;
        }
      } catch (e) {
        // Si falla cache, seguimos con IA
        console.warn('Cache read failed', e);
      }

      // 3) Traducir con IA
      try {
        const batch = [
          base.title,
          base.description,
          ...(base.features || []),
          base.location,
          base.neighborhood
        ];
        const out = await translateTexts(batch, targetLang, 'es');

        const [tTitle, tDesc, ...rest] = out;
        const tFeatures = rest.slice(0, base.features.length);
        const tLocation = rest[base.features.length] || '';
        const tNeighborhood = rest[base.features.length + 1] || '';

        const translated = {
          ...property,
          title: tTitle,
          description: tDesc,
          features: tFeatures,
          location: tLocation,
          neighborhood: tNeighborhood,
          _autoTranslated: true
        };

        // 4) Guardar en cache
        try {
          await setCachedPropertyTranslation(base.id, targetLang, translated);
        } catch (e) {
          console.warn('Cache write failed', e);
        }

        if (!cancelled) {
          setResult(translated);
          setStatus('ready');
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setResult(property); // fallback ES
          setStatus('error');
        }
      }
    }
    run();
    return () => { cancelled = true; };
  }, [property, base, targetLang]);

  return { data: result, status };
}