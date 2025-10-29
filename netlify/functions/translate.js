//===============================================
//🌍 FUNCIÓN NETLIFY DE TRADUCCIÓN - netlify/functions/translate.js
//===============================================

// Usar LibreTranslate público como servicio principal
// Fallback a MyMemory si falla
const LIBRETRANSLATE_API = 'https://libretranslate.com/translate';
const MYMEMORY_API = 'https://api.mymemory.translated.net/get';

exports.handler = async (event, context) => {
  // Solo permitir POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { text, target, source = 'es' } = JSON.parse(event.body);

    // Validación de entrada
    if (!text || !target) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing text or target language' })
      };
    }

    // Convertir texto a array si es string
    const textsArray = Array.isArray(text) ? text : [text];
    const translations = [];

    // Traducir cada texto
    for (const singleText of textsArray) {
      try {
        // Intentar con LibreTranslate primero
        const libreResponse = await fetch(LIBRETRANSLATE_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            q: singleText,
            source: source,
            target: target,
            format: 'text'
          })
        });

        if (libreResponse.ok) {
          const data = await libreResponse.json();
          translations.push(data.translatedText);
          continue;
        }
      } catch (libreError) {
        console.warn('LibreTranslate falló, usando MyMemory:', libreError);
      }

      // Fallback a MyMemory
      try {
        const myMemoryUrl = `${MYMEMORY_API}?q=${encodeURIComponent(singleText)}&langpair=${source}|${target}`;
        const myMemoryResponse = await fetch(myMemoryUrl);
        
        if (myMemoryResponse.ok) {
          const data = await myMemoryResponse.json();
          translations.push(data.responseData.translatedText);
        } else {
          // Si todo falla, devolver texto original
          translations.push(singleText);
        }
      } catch (myMemoryError) {
        console.error('MyMemory también falló:', myMemoryError);
        translations.push(singleText);
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ translations })
    };

  } catch (error) {
    console.error('Error en traducción:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Translation failed',
        message: error.message 
      })
    };
  }
};
