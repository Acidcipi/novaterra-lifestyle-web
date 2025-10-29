//===============================================
//⚙️ CONFIGURACIÓN USUARIO - src/components/UserSettings.jsx
//===============================================
import React from 'react';
import { useAuth } from '../hooks/useAuth';

export default function UserSettings() {
  const { user } = useAuth();
  
  return (
    <div className="settings-container">
      <div className="settings-content">
        <h1>⚙️ Configuración de la Cuenta</h1>
        
        <div className="settings-section">
          <h3>📧 Email</h3>
          <p>{user?.email}</p>
        </div>

        <div className="settings-section">
          <h3>🔐 Cambiar Contraseña</h3>
          <button className="settings-btn">Cambiar contraseña</button>
        </div>

        <div className="settings-section">
          <h3>🔔 Notificaciones</h3>
          <label>
            <input type="checkbox" /> Recibir emails de nuevas propiedades
          </label>
        </div>
      </div>
    </div>
  );
}
