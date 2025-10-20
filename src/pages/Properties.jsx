//===============================================
// 🏠 PÁGINA PROPIEDADES - src/pages/Properties.jsx
//===============================================
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Utilidad de cliente para llamar a la función serverless de traducción
// Asegúrate de tener netlify/functions/translate.js creado y GOOGLE_TRANSLATE_API_KEY en Netlify
async function translateTexts(texts, target, source = 'es') {
  const res = await fetch('/.netlify/functions/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: texts, target, source })
  });
  if (!res.ok) {
    const err = await res.text().catch(() => '');
    throw new Error(`Translate API error: ${res.status} ${err}`);
  }
  const data = await res.json();
  return data.translations; // array alineado con texts
}

/**
 * Hook local para traducir una lista de propiedades:
 * - Respeta primero traducciones manuales si existen: property.translations?.[lang]
 * - Si no hay manual, intenta traducir con IA y cachear en memoria (por simplicidad local).
 * - Para producción, ideal cache en Firestore (opcional).
 */
function useAutoTranslateList(properties, lang = 'es') {
  const [translatedList, setTranslatedList] = useState(properties);
  const [loadingIds, setLoadingIds] = useState(new Set());
  const [errorIds, setErrorIds] = useState(new Set());

  // Memoria cache simple por sesión (objeto global en módulo)
  // Si prefieres, puedes usar localStorage o Firestore para cache persistente
  const cache = useMemo(() => (useAutoTranslateList._cache ||= {}), []);
  // clave cache helper
  const cacheKey = (id, l) => `${id}__${l}`;

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!properties || !Array.isArray(properties)) return;
      if (lang === 'es') {
        // idioma base, no traducimos
        setTranslatedList(properties);
        return;
      }

      // Creamos una copia que iremos rellenando
      const out = properties.map((p) => ({ ...p }));

      const newLoading = new Set(loadingIds);
      const newErrors = new Set();

      const translateJobs = out.map(async (p, idx) => {
        const id = p.id || p.slug || p.code || `row_${idx}`;

        // 1) Si hay traducción manual para este idioma, úsala
        const manual = p.translations?.[lang];
        const hasManual =
          manual &&
          Object.values(manual).some((v) => v && String(v).trim() !== '');

        if (hasManual) {
          out[idx] = {
            ...p,
            title: manual.title ?? p.title,
            description: manual.description ?? p.description,
            location: manual.location ?? p.location,
            // Si tuvieras más campos (features, etc.), añádelos aquí
            _autoTranslated: false
          };
          return;
        }

        // 2) Cache en memoria
        const key = cacheKey(id, lang);
        if (cache[key]) {
          out[idx] = { ...cache[key] };
          return;
        }

        // 3) Traducir con IA
        try {
          newLoading.add(id);
          const batch = [
            p.title || '',
            p.description || '',
            p.location || ''
          ];
          const result = await translateTexts(batch, lang, 'es');

          const [tTitle, tDesc, tLoc] = result;

          const translated = {
            ...p,
            title: tTitle,
            description: tDesc,
            location: tLoc,
            _autoTranslated: true
          };
          cache[key] = translated;
          out[idx] = translated;
        } catch (e) {
          console.error('Translate failed for', id, e);
          newErrors.add(id);
          // Fallback: dejamos ES
          out[idx] = { ...p, _autoTranslated: false };
        } finally {
          newLoading.delete(id);
        }
      });

      await Promise.all(translateJobs);
      if (!cancelled) {
        setTranslatedList(out);
        setLoadingIds(newLoading);
        setErrorIds(newErrors);
      }
    }
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties, lang]);

  return { list: translatedList, loadingIds, errorIds };
}

const Properties = () => {
  const { t, i18n } = useTranslation();

  // Datos de ejemplo de propiedades (ES como fuente de verdad)
  // Si tienes dos con traducción manual, puedes embutirlas así:
  const properties = [
    {
      id: 1,
      title: "Villa Marina Deluxe",
      location: "Santander, Cantabria",
      price: "450.000€",
      description: "Espectacular villa con vistas al mar Cantábrico",
      // Ejemplo de traducción manual ya existente
      translations: {
        en: {
          title: "Marina Deluxe Villa",
          description: "Spectacular villa overlooking the Cantabrian Sea",
          location: "Santander, Cantabria"
        }
        // si tienes de, ru, mk también, puedes agregarlos aquí
      }
    },
    {
      id: 2,
      title: "Casa Rural Los Picos",
      location: "Potes, Cantabria",
      price: "320.000€",
      description: "Acogedora casa rural en el corazón de los Picos de Europa"
    },
    {
      id: 3,
      title: "Apartamento Centro Histórico",
      location: "Santillana del Mar, Cantabria",
      price: "280.000€",
      description: "Apartamento reformado en el casco histórico medieval",
      // Segundo anuncio con traducción manual de prueba
      translations: {
        en: {
          title: "Historic Center Apartment",
          description: "Renovated apartment in the medieval historic center",
          location: "Santillana del Mar, Cantabria"
        }
      }
    },
    {
      id: 4,
      title: "Chalet Playa Berria",
      location: "Santoña, Cantabria",
      price: "520.000€",
      description: "Chalet de lujo a 50m de la playa de Berria"
    }
  ];

  // Traducimos dinámicamente respetando manual primero
  const { list: propertiesTranslated } = useAutoTranslateList(properties, i18n.language);

  return (
    <main className="page-container">
      <section className="content-section active">
        <h1 className="page-title">{t('nav.properties')}</h1>
        <p className="page-description">
          {/* Esta frase es UI estática -> usa i18n si ya la tienes en pages/properties */}
          {t('pages.properties.intro', 'Descubre propiedades únicas en los lugares más privilegiados de Cantabria. Desde villas con vistas al mar hasta casas rurales en los Picos de Europa.')}
        </p>

        {/* Grid de propiedades */}
        <div className="properties-grid">
          {propertiesTranslated.map(property => (
            <div key={property.id} className="property-card">
              <div className="property-image">
                <div className="placeholder-image" aria-label={t('properties.imageAlt', 'Imagen de la propiedad')}>
                  🏠<br />
                  <small>{t('properties.imageSoon', 'Imagen disponible pronto')}</small>
                </div>
              </div>
              <div className="property-info">
                <h3>{property.title}</h3>
                <p className="property-location">📍 {property.location}</p>
                <p className="property-description">{property.description}</p>

                {/* Badge si fue traducido por IA */}
                {property._autoTranslated && i18n.language !== 'es' && (
                  <div className="property-badge" title={t('common.autoTranslated', 'Traducido automáticamente')}>
                    {t('common.autoTranslated', 'Traducido automáticamente')}
                  </div>
                )}

                <div className="property-price">{property.price}</div>
                <button className="property-button">
                  {t('properties.viewDetails', 'Ver Detalles')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Properties;