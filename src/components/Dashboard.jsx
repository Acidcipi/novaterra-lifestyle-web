//===============================================
//🏠 DASHBOARD PRINCIPAL - src/components/Dashboard.jsx
//===============================================
import React from 'react';

const Dashboard = ({ user }) => {
  const userInfo = {
    name: user?.displayName || 'Usuario',
    email: user?.email || '',
    joinDate: user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString('es-ES') : '',
    emailVerified: user?.emailVerified || false
  };

  return (
    <main className="page-container">
      <section className="content-section active">
        <div className="dashboard-container">
          
          {/* Bienvenida */}
          <div className="dashboard-welcome">
            <h1 className="page-title">¡Bienvenido, {userInfo.name}!</h1>
            <p className="page-description">
              Accede a todas las funcionalidades premium de Novaterra
            </p>
          </div>

          {/* Información del usuario */}
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <div className="card-icon">👤</div>
              <h3>Mi Perfil</h3>
              <div className="user-info">
                <p><strong>Email:</strong> {userInfo.email}</p>
                <p><strong>Miembro desde:</strong> {userInfo.joinDate}</p>
                <p><strong>Estado:</strong> 
                  <span className={`status ${userInfo.emailVerified ? 'verified' : 'pending'}`}>
                    {userInfo.emailVerified ? ' Verificado' : ' Pendiente verificación'}
                  </span>
                </p>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">🏠</div>
              <h3>Mis Propiedades</h3>
              <p>Gestiona tus propiedades favoritas y consultas.</p>
              <button className="card-button">Ver Propiedades</button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">✨</div>
              <h3>Experiencias</h3>
              <p>Reserva experiencias únicas en Cantabria.</p>
              <button className="card-button">Explorar</button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">🛎️</div>
              <h3>Servicios Premium</h3>
              <p>Accede a concierge, chef privado y más.</p>
              <button className="card-button">Ver Servicios</button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">📞</div>
              <h3>Soporte VIP</h3>
              <p>Contacto prioritario con nuestro equipo.</p>
              <button className="card-button">Contactar</button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">⚙️</div>
              <h3>Configuración</h3>
              <p>Personaliza tu experiencia y preferencias.</p>
              <button className="card-button">Configurar</button>
            </div>
          </div>

          {/* Notificaciones */}
          <div className="dashboard-notifications">
            <h3>Últimas Notificaciones</h3>
            <div className="notification-item">
              <span className="notification-icon">🎉</span>
              <div className="notification-content">
                <h4>¡Bienvenido a Novaterra!</h4>
                <p>Tu cuenta ha sido creada exitosamente. Explora todas nuestras funcionalidades.</p>
                <span className="notification-time">Hace unos momentos</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Dashboard;