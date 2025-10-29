//===============================================
//🌍 UTILIDAD DE TRADUCCIÓN CON FUNCIÓN NETLIFY
//===============================================

/**
 * Traduce textos usando la función Netlify serverless
 * @param {string|string[]} texts - Texto o array de textos a traducir
 * @param {string} target - Idioma destino (en, de, ru, mk)
 * @param {string} source - Idioma origen (default: 'es')
 * @returns {Promise<string[]>} Array de traducciones
 */
export async function translateTexts(texts, target, source = 'es') {
  // Si el idioma destino es español, no traducir
  if (target === 'es' || target === source) {
    return Array.isArray(texts) ? texts : [texts];
  }

  try {
    const res = await fetch('/.netlify/functions/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        text: texts, 
        target, 
        source 
      })
    });

    if (!res.ok) {
      console.error('Error en API de traducción:', res.status);
      // Devolver textos originales si falla
      return Array.isArray(texts) ? texts : [texts];
    }

    const data = await res.json();
    return data.translations;

  } catch (error) {
    console.error('Error llamando a función de traducción:', error);
    // Devolver textos originales si falla la llamada
    return Array.isArray(texts) ? texts : [texts];
  }
}
