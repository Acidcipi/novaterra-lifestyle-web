//===============================================
//🏠 DASHBOARD PRINCIPAL - src/components/Dashboard.jsx
//===============================================
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  // Usar namespace 'auth' para dashboard
  const { t } = useTranslation('auth');
  const { t: tCommon } = useTranslation('common');
  const { user } = useAuth();
  
  const [activeSection, setActiveSection] = useState('overview');

  // Datos de ejemplo para el dashboard
  const userStats = {
    savedProperties: 12,
    recentSearches: 8,
    appointments: 3,
    messages: 5
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="dashboard-overview">
            <h2>{t('dashboard.menu.overview')}</h2>
            
            {/* Estadísticas del usuario */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{userStats.savedProperties}</div>
                <div className="stat-label">{t('dashboard.stats.saved_properties')}</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{userStats.recentSearches}</div>
                <div className="stat-label">{t('dashboard.stats.recent_searches')}</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{userStats.appointments}</div>
                <div className="stat-label">{t('dashboard.stats.appointments')}</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{userStats.messages}</div>
                <div className="stat-label">{t('dashboard.stats.messages')}</div>
              </div>
            </div>

            {/* Actividad reciente */}
            <div className="recent-activity">
              <h3>Actividad Reciente</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <span className="activity-icon">👁️</span>
                  <span>Vista villa en Santander - hace 2 horas</span>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">❤️</span>
                  <span>Guardado apartamento centro - ayer</span>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">📅</span>
                  <span>Cita programada para mañana - hace 3 días</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'favorites':
        return (
          <div className="dashboard-favorites">
            <h2>{t('dashboard.menu.favorites')}</h2>
            <div className="favorites-grid">
              <div className="property-card-mini">
                <div className="property-image-mini"></div>
                <div className="property-info-mini">
                  <h4>Villa de Lujo Frente al Mar</h4>
                  <p>Santander - 2.850.000€</p>
                  <button className="view-button">{tCommon('buttons.view_details')}</button>
                </div>
              </div>
              {/* Más propiedades favoritas */}
            </div>
          </div>
        );

      case 'searches':
        return (
          <div className="dashboard-searches">
            <h2>{t('dashboard.menu.searches')}</h2>
            <div className="saved-searches">
              <div className="search-item">
                <h4>Villas en Santander</h4>
                <p>Precio: 500.000€ - 3.000.000€ | 4+ hab.</p>
                <button className="search-button">Ejecutar búsqueda</button>
              </div>
              <div className="search-item">
                <h4>Apartamentos centro</h4>
                <p>Precio: 200.000€ - 600.000€ | 2+ hab.</p>
                <button className="search-button">Ejecutar búsqueda</button>
              </div>
            </div>
          </div>
        );

      case 'appointments':
        return (
          <div className="dashboard-appointments">
            <h2>{t('dashboard.menu.appointments')}</h2>
            <div className="appointments-list">
              <div className="appointment-item">
                <div className="appointment-date">
                  <span className="date">15</span>
                  <span className="month">ENE</span>
                </div>
                <div className="appointment-info">
                  <h4>Visita Villa Santander</h4>
                  <p>10:00 - María González</p>
                  <p>📍 El Sardinero, Santander</p>
                </div>
                <div className="appointment-actions">
                  <button className="btn-secondary">Reagendar</button>
                  <button className="btn-danger">Cancelar</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="dashboard-profile">
            <h2>{t('profile.title')}</h2>
            <div className="profile-sections">
              <div className="profile-section">
                <h3>{t('profile.personal_info')}</h3>
                <div className="form-group">
                  <label>Nombre:</label>
                  <input type="text" value={user?.displayName || ''} readOnly />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input type="email" value={user?.email || ''} readOnly />
                </div>
              </div>
              
              <div className="profile-section">
                <h3>{t('profile.preferences')}</h3>
                <div className="preferences-list">
                  <div className="preference-item">
                    <span>Notificaciones por email</span>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="preference-item">
                    <span>Alertas de nuevas propiedades</span>
                    <input type="checkbox" defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="dashboard-settings">
            <h2>{t('dashboard.menu.settings')}</h2>
            <div className="settings-sections">
              <div className="settings-section">
                <h3>{t('profile.account_settings')}</h3>
                <button className="settings-button">
                  {t('profile.password_change')}
                </button>
                <button className="settings-button">
                  Configurar notificaciones
                </button>
                <button className="settings-button">
                  Exportar datos
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Bienvenida */}
        <div className="dashboard-header">
          <h1>
            {t('dashboard.welcome')}, {user?.displayName || user?.email}
          </h1>
          <p>Gestiona tu experiencia premium en Novaterra Lifestyle</p>
        </div>

        <div className="dashboard-layout">
          {/* Sidebar de navegación */}
          <aside className="dashboard-sidebar">
            <nav className="dashboard-nav">
              <button
                className={`nav-item ${activeSection === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveSection('overview')}
              >
                <span className="nav-icon">📊</span>
                {t('dashboard.menu.overview')}
              </button>
              
              <button
                className={`nav-item ${activeSection === 'favorites' ? 'active' : ''}`}
                onClick={() => setActiveSection('favorites')}
              >
                <span className="nav-icon">❤️</span>
                {t('dashboard.menu.favorites')}
              </button>
              
              <button
                className={`nav-item ${activeSection === 'searches' ? 'active' : ''}`}
                onClick={() => setActiveSection('searches')}
              >
                <span className="nav-icon">🔍</span>
                {t('dashboard.menu.searches')}
              </button>
              
              <button
                className={`nav-item ${activeSection === 'appointments' ? 'active' : ''}`}
                onClick={() => setActiveSection('appointments')}
              >
                <span className="nav-icon">📅</span>
                {t('dashboard.menu.appointments')}
              </button>
              
              <button
                className={`nav-item ${activeSection === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveSection('profile')}
              >
                <span className="nav-icon">👤</span>
                {t('dashboard.menu.profile')}
              </button>
              
              <button
                className={`nav-item ${activeSection === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveSection('settings')}
              >
                <span className="nav-icon">⚙️</span>
                {t('dashboard.menu.settings')}
              </button>
            </nav>
          </aside>

          {/* Contenido principal */}
          <main className="dashboard-content">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}