// netlify/functions/translate.js
import fetch from 'node-fetch';

export const handler = async (event) => {
  try {
    const { text, target, source = 'es' } = JSON.parse(event.body || '{}');
    if (!text || !target) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing text or target' }) };
    }

    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: Array.isArray(text) ? text : [text],
        target,
        source
      })
    });
    const data = await res.json();
    if (!res.ok) {
      return { statusCode: res.status, body: JSON.stringify(data) };
    }

    const translations = (data.data?.translations || []).map(t => t.translatedText);
    return {
      statusCode: 200,
      body: JSON.stringify({ translations })
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};