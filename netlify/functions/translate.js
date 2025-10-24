// netlify/functions/translate.js
import fetch from 'node-fetch';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { text, target, source = 'es' } = JSON.parse(event.body);
    
    if (!text || !target) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing text or target language' })
      };
    }

    // Array de textos para traducir
    const textsToTranslate = Array.isArray(text) ? text : [text];
    
    // Usar LibreTranslate (API gratuita) o Google Translate API
    const translations = await Promise.all(
      textsToTranslate.map(async (t) => {
        // Opción 1: LibreTranslate (GRATIS - recomendado para empezar)
        const response = await fetch('https://libretranslate.de/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            q: t,
            source: source,
            target: target,
            format: 'text'
          })
        });

        if (!response.ok) {
          throw new Error(`Translation API error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.translatedText;
      })
    );

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ translations })
    };

  } catch (error) {
    console.error('Translation error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
