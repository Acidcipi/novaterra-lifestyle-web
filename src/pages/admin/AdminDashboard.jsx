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

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">Cargando dashboard...</div>
      </div>
    );
  }

  //===============================================
  // 🎨 RENDERIZADO
  //===============================================
  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>🎯 Panel de Administración</h1>
        <p>Bienvenido, <strong>{user?.displayName || user?.email}</strong></p>
        <span className="role-badge">{role === 'owner' ? '👑 Owner' : '👨‍💼 Admin'}</span>
      </div>

      {/* ESTADÍSTICAS */}
      <div className="stats-grid">
        <div className="stat-card" onClick={() => navigate('/admin/properties')}>
          <div className="stat-icon">🏘️</div>
          <div className="stat-info">
            <h3>{stats.totalProperties}</h3>
            <p>Propiedades</p>
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate('/admin/services')}>
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <h3>{stats.totalServices}</h3>
            <p>Servicios</p>
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate('/admin/experiences')}>
          <div className="stat-icon">🌟</div>
          <div className="stat-info">
            <h3>{stats.totalExperiences}</h3>
            <p>Experiencias</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>{stats.totalBookings}</h3>
            <p>Reservas</p>
          </div>
        </div>

        {isOwner && (
          <div className="stat-card" onClick={() => navigate('/admin/users')}>
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>{stats.totalUsers}</h3>
              <p>Usuarios</p>
            </div>
          </div>
        )}
      </div>

      {/* ACTIVIDAD RECIENTE */}
      <div className="recent-activity">
        <h3>📊 Actividad Reciente</h3>
        {recentActivities.length === 0 ? (
          <p className="empty-state">No hay reservas recientes</p>
        ) : (
          <ul>
            {recentActivities.map((activity) => (
              <li key={activity.id}>
                <span className="activity-text">
                  Reserva de {activity.guestInfo?.name || 'Usuario'} • 
                  Propiedad: {activity.propertyId} • 
                  Estado: {activity.paymentStatus} • 
                  {activity.totalPrice}€
                </span>
                <span className="activity-date">
                  {new Date(activity.createdAt?.toDate()).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ACCIONES RÁPIDAS */}
      <div className="quick-actions">
        <button onClick={() => navigate('/admin/properties')} className="action-btn">
          📝 Gestionar Propiedades
        </button>
        <button onClick={() => navigate('/admin/users')} className="action-btn">
          👥 Gestionar Usuarios
        </button>
        <button onClick={() => navigate('/admin/settings')} className="action-btn">
          ⚙️ Configuración
        </button>
      </div>
    </div>
  );
}
