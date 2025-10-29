//===============================================
//📊 DASHBOARD ADMINISTRADOR PROFESIONAL
//===============================================
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import { useUserRole } from '../../hooks/useUserRole';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const { t } = useTranslation(['common', 'auth']);
  const { user } = useAuth();
  const { role, isAdmin, isOwner } = useUserRole();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalProperties: 0,
    totalServices: 0,
    totalExperiences: 0,
    totalBookings: 0,
    totalUsers: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  //===============================================
  // 📊 CARGAR ESTADÍSTICAS
  //===============================================
  useEffect(() => {
    async function loadStats() {
      try {
        // Contar propiedades
        const propertiesSnap = await getDocs(collection(db, 'properties'));
        const servicesSnap = await getDocs(collection(db, 'services'));
        const experiencesSnap = await getDocs(collection(db, 'experiences'));
        const bookingsSnap = await getDocs(collection(db, 'bookings'));
        
        let usersCount = 0;
        if (isOwner) {
          const usersSnap = await getDocs(collection(db, 'users'));
          usersCount = usersSnap.size;
        }

        setStats({
          totalProperties: propertiesSnap.size,
          totalServices: servicesSnap.size,
          totalExperiences: experiencesSnap.size,
          totalBookings: bookingsSnap.size,
          totalUsers: usersCount
        });

        // Cargar últimas actividades (últimas 5 reservas)
        const recentBookingsQuery = query(
          collection(db, 'bookings'),
          orderBy('createdAt', 'desc'),
          limit(5)
        );
        const recentSnap = await getDocs(recentBookingsQuery);
        const activities = recentSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRecentActivities(activities);

      } catch (error) {
        console.error('Error cargando estadísticas:', error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, [isOwner]);

  //===============================================
  // 🎨 RENDERIZADO
  //===============================================
  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Cargando dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header del Dashboard */}
      <div className="dashboard-header">
        <div>
          <h1>🏠 Panel de Administración</h1>
          <p className="dashboard-subtitle">
            Bienvenido, <strong>{user?.displayName || user?.email}</strong> 
            <span className="role-badge">{role === 'owner' ? '👑 Owner' : '👨‍💼 Admin'}</span>
          </p>
        </div>
      </div>

      {/* Estadísticas Principales */}
      <div className="stats-grid">
        <div className="stat-card" onClick={() => navigate('/admin/properties')}>
          <div className="stat-icon">🏘️</div>
          <div className="stat-content">
            <h3>{stats.totalProperties}</h3>
            <p>Propiedades</p>
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate('/admin/services')}>
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>{stats.totalServices}</h3>
            <p>Servicios</p>
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate('/admin/experiences')}>
          <div className="stat-icon">🌟</div>
          <div className="stat-content">
            <h3>{stats.totalExperiences}</h3>
            <p>Experiencias</p>
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate('/admin/bookings')}>
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>{stats.totalBookings}</h3>
            <p>Reservas</p>
          </div>
        </div>

        {isOwner && (
          <div className="stat-card" onClick={() => navigate('/owner/users')}>
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>{stats.totalUsers}</h3>
              <p>Usuarios</p>
            </div>
          </div>
        )}
      </div>

      {/* Accesos Rápidos */}
      <div className="quick-actions">
        <h2>⚡ Accesos Rápidos</h2>
        <div className="actions-grid">
          <button 
            className="action-btn add-property"
            onClick={() => navigate('/admin/properties/new')}
          >
            <span className="action-icon">➕</span>
            <span>Añadir Propiedad</span>
          </button>

          <button 
            className="action-btn add-service"
            onClick={() => navigate('/admin/services/new')}
          >
            <span className="action-icon">➕</span>
            <span>Añadir Servicio</span>
          </button>

          <button 
            className="action-btn add-experience"
            onClick={() => navigate('/admin/experiences/new')}
          >
            <span className="action-icon">➕</span>
            <span>Añadir Experiencia</span>
          </button>

          <button 
            className="action-btn view-bookings"
            onClick={() => navigate('/admin/bookings')}
          >
            <span className="action-icon">📊</span>
            <span>Ver Reservas</span>
          </button>
        </div>
      </div>

      {/* Últimas Actividades */}
      <div className="recent-activities">
        <h2>📈 Últimas Reservas</h2>
        {recentActivities.length === 0 ? (
          <p className="no-activities">No hay reservas recientes</p>
        ) : (
          <div className="activities-list">
            {recentActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">📅</div>
                <div className="activity-content">
                  <p className="activity-title">
                    Reserva de {activity.guestInfo?.name || 'Usuario'}
                  </p>
                  <p className="activity-details">
                    Propiedad: {activity.propertyId} • 
                    Estado: {activity.paymentStatus} • 
                    {activity.totalPrice}€
                  </p>
                </div>
                <div className={`activity-status status-${activity.paymentStatus}`}>
                  {activity.paymentStatus}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
