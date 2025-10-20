// netlify/functions/translate.js
// Traducción gratuita con Apertium (sin node-fetch necesario)

export const handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method Not Allowed" }),
      };
    }

    const { text, target, source = "es" } = JSON.parse(event.body || "{}");
    if (!text || !target) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing text or target" }),
      };
    }

    const apiUrl = "https://apy.projectjj.com/"; // Servidor público Apertium
    const items = Array.isArray(text) ? text : [text];
    const results = [];

    // Usamos fetch nativo de Node 18+, no hace falta node-fetch
    for (const phrase of items) {
      const params = new URLSearchParams({
        q: phrase,
        langpair: `${source}|${target}`,
      });

      const response = await fetch(`${apiUrl}translate?${params.toString()}`);
      if (!response.ok) {
        results.push(phrase); // fallback sin traducir
        continue;
      }

      const data = await response.json();
      results.push(data.responseData?.translatedText || phrase);
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ translations: results }),
    };
  } catch (err) {
    console.error("Apertium translate error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};