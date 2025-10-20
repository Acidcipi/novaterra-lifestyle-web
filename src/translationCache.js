// src/services/translationCache.js
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '../config/firebase'; // estos documentos solo pueden usarse en ejecución de código

const db = getFirestore(app);

export async function getCachedPropertyTranslation(propertyId, targetLang) {
  const ref = doc(db, 'propertyTranslations', `${propertyId}_${targetLang}`);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export async function setCachedPropertyTranslation(propertyId, targetLang, translated) {
  const ref = doc(db, 'propertyTranslations', `${propertyId}_${targetLang}`);
  await setDoc(ref, { ...translated, _lang: targetLang, _updatedAt: serverTimestamp() });
}