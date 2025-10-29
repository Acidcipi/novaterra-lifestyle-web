//===============================================
//👤 DASHBOARD USUARIO - CON DATOS REALES
//===============================================
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../config/firebase';
import './Dashboard.css';

export default function Dashboard() {
  const { t } = useTranslation('auth');
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');
  const [userStats, setUserStats] = useState({
    savedProperties: 0,
    recentSearches: 0,
    appointments: 0,
    messages: 0
  });
  const [favorites, setFavorites] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Cargar favoritos
      const favoritesQuery = query(
        collection(db, 'favorites'),
        where('userId', '==', user.uid)
      );
      const favoritesSnap = await getDocs(favoritesQuery);
      const favoritesData = favoritesSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFavorites(favoritesData);

      // Cargar actividad reciente
      const activityQuery = query(
        collection(db, 'userActivity'),
        where('userId', '==', user.uid),
        limit(10)
      );
            const activitySnap = await getDocs(activityQuery);
      const activityData = activitySnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRecentActivity(activityData);

      // Actualizar estadísticas
      setUserStats({
        savedProperties: favoritesData.length,
        recentSearches: activityData.filter(a => a.type === 'search').length,
        appointments: 0, // Implementar si tienes citas
        messages: 0 // Implementar si tienes mensajes
      });
    } catch (error) {
      console.error('Error cargando datos del usuario:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="dashboard-overview">
            <h2>📊 Resumen</h2>
            
            {loading ? (
              <div className="loading-spinner">Cargando...</div>
            ) : (
              <>
                <div className="stats-cards">
                  <div className="stat-card">
                    <div className="stat-icon">❤️</div>
                    <div className="stat-content">
                      <h3>{userStats.savedProperties}</h3>
                      <p>Propiedades Guardadas</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">🔍</div>
                    <div className="stat-content">
                      <h3>{userStats.recentSearches}</h3>
                      <p>Búsquedas Recientes</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">📅</div>
                    <div className="stat-content">
                      <h3>{userStats.appointments}</h3>
                      <p>Citas Programadas</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">💬</div>
                    <div className="stat-content">
                      <h3>{userStats.messages}</h3>
                      <p>Mensajes</p>
                    </div>
                  </div>
                </div>

                <div className="dashboard-section">
                  <h3>🏠 Propiedades Guardadas</h3>
                  {favorites.length > 0 ? (
                    <div className="favorites-grid">
                      {favorites.map(fav => (
                        <div key={fav.id} className="favorite-card">
                          <h4>{fav.propertyTitle || 'Propiedad'}</h4>
                          <p>{fav.propertyLocation}</p>
                          <span className="price">{fav.propertyPrice}€</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="empty-message">No tienes propiedades guardadas</p>
                  )}
                </div>

                <div className="dashboard-section">
                  <h3>📌 Actividad Reciente</h3>
                  {recentActivity.length > 0 ? (
                    <ul className="activity-list">
                      {recentActivity.map(activity => (
                        <li key={activity.id}>
                          <span className="activity-date">
                            {activity.timestamp?.toDate().toLocaleDateString()}
                          </span>
                          <span className="activity-text">{activity.description}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="empty-message">No hay actividad reciente</p>
                  )}
                </div>
              </>
            )}
          </div>
        );

      case 'favorites':
        return (
          <div className="dashboard-favorites">
            <h2>❤️ Mis Favoritos</h2>
            {favorites.length > 0 ? (
              <div className="favorites-grid-full">
                {favorites.map(fav => (
                  <div key={fav.id} className="favorite-card-large">
                    <h3>{fav.propertyTitle}</h3>
                    <p className="location">📍 {fav.propertyLocation}</p>
                    <p className="price">💰 {fav.propertyPrice}€</p>
                    <button className="btn-view">Ver Detalles</button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-message">No tienes favoritos guardados</p>
            )}
          </div>
        );

      case 'searches':
        return (
          <div className="dashboard-searches">
            <h2>🔍 Mis Búsquedas</h2>
            <p>Función en desarrollo...</p>
          </div>
        );

      case 'appointments':
        return (
          <div className="dashboard-appointments">
            <h2>📅 Mis Citas</h2>
            <p>Función en desarrollo...</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <h1>Espacio Personal</h1>
        <p>Bienvenido, {user?.email}</p>
      </div>

      <div className="dashboard-tabs">
        <button
          className={activeSection === 'overview' ? 'active' : ''}
          onClick={() => setActiveSection('overview')}
        >
          📊 Resumen
        </button>
        <button
          className={activeSection === 'favorites' ? 'active' : ''}
          onClick={() => setActiveSection('favorites')}
        >
          ❤️ Favoritos
        </button>
        <button
          className={activeSection === 'searches' ? 'active' : ''}
          onClick={() => setActiveSection('searches')}
        >
          🔍 Búsquedas
        </button>
        <button
          className={activeSection === 'appointments' ? 'active' : ''}
          onClick={() => setActiveSection('appointments')}
        >
          📅 Citas
        </button>
      </div>

      <div className="dashboard-content">
        {renderContent()}
      </div>
    </div>
  );
}
