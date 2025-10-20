// src/utils/aiTranslate.js
export async function translateTexts(texts, target, source = 'es') {
  const res = await fetch('/.netlify/functions/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: texts, target, source })
  });
  if (!res.ok) throw new Error('Translate API error');
  const data = await res.json();
  return data.translations; // array alineado con texts
}