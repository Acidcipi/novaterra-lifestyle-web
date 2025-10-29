//===============================================
//👑 SCRIPT PARA CREAR USUARIO OWNER INICIAL
//===============================================
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Crear manualmente el primer usuario owner
 * SOLO ejecutar UNA VEZ desde la consola del navegador
 */
export async function createInitialOwner(uid) {
  try {
    await setDoc(doc(db, 'users', uid), {
      uid: uid,
      email: 'owner@novaterra.com',
      displayName: 'Owner Novaterra',
      role: 'owner',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log('✅ Usuario owner creado correctamente');
  } catch (error) {
    console.error('❌ Error creando owner:', error);
  }
}

// Uso:
// 1. Registra un usuario manualmente en Firebase Console
// 2. Copia su UID
// 3. En la consola del navegador ejecuta:
//    import { createInitialOwner } from './utils/initAdmin'
//    createInitialOwner('UID_AQUI')
