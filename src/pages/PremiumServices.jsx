//===============================================
//⭐ PÁGINA SERVICIOS PREMIUM - src/pages/PremiumServices.jsx
//===============================================
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const PremiumServices = () => {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState(null);

  // Servicios premium disponibles
  const premiumServices = [
    {
      id: 'concierge',
      title: 'Concierge Personal',
      icon: '🎩',
      shortDescription: 'Asistente personal 24/7 para todas tus necesidades',
      fullDescription: `
        Nuestro servicio de concierge personal está disponible las 24 horas para atender 
        todas tus necesidades durante tu estancia en Cantabria. Desde reservas en restaurantes 
        exclusivos hasta la organización de eventos privados.
        
        ✨ Servicios incluidos:
        • Reservas en restaurantes de alta gama
        • Organización de eventos privados
        • Compras personalizadas
        • Gestión de agenda y citas
        • Servicios de traducción
        • Asesoramiento turístico personalizado
      `,
      price: 'Desde 150€/día'
    },
    {
      id: 'chef',
      title: 'Chef Privado',
      icon: '👨‍🍳',
      shortDescription: 'Gastronomía de autor en la comodidad de tu alojamiento',
      fullDescription: `
        Disfruta de la mejor gastronomía cántabra y española con nuestro servicio de chef privado. 
        Menús personalizados elaborados con productos locales de máxima calidad.
        
        🍽️ Servicios incluidos:
        • Menús degustación personalizados
        • Cocina con productos locales de temporada
        • Experiencias gastronómicas temáticas
        • Clases de cocina interactivas
        • Servicio completo de mesa
        • Maridajes con vinos de la región
      `,
      price: 'Desde 300€/experiencia'
    },
    {
      id: 'transporte',
      title: 'Transporte Premium',
      icon: '🚗',
      shortDescription: 'Traslados de lujo y tours privados con conductor',
      fullDescription: `
        Viaja con total comodidad y estilo con nuestro servicio de transporte premium. 
        Vehículos de gama alta con conductores profesionales que conocen a la perfección Cantabria.
        
        🚙 Servicios incluidos:
        • Traslados aeropuerto-alojamiento
        • Tours privados por Cantabria
        • Vehículos de lujo Mercedes y BMW
        • Conductores-guía especializados
        • Rutas personalizadas
        • Servicio 24/7 disponible
      `,
      price: 'Desde 80€/hora'
    },
    {
      id: 'spa',
      title: 'Spa & Wellness',
      icon: '🧘‍♀️',
      shortDescription: 'Relajación y bienestar en entornos únicos',
      fullDescription: `
        Desconecta y renueva tu energía con nuestros servicios de spa y wellness en ubicaciones 
        exclusivas. Desde tratamientos en tu alojamiento hasta acceso a spas de lujo.
        
        💆‍♀️ Servicios incluidos:
        • Masajes relajantes y terapéuticos
        • Tratamientos faciales premium
        • Sesiones de yoga y meditación
        • Acceso a spas termales exclusivos
        • Terapias holísticas
        • Productos de cosmética natural local
      `,
      price: 'Desde 120€/sesión'
    }
  ];

  const handleServiceClick = (service) => {
    setSelectedService(selectedService?.id === service.id ? null : service);
  };

  return (
    <main className="page-container">
      <section className="content-section active">
        <h1 className="page-title">Servicios Premium</h1>
        <p className="page-description">
          Experimenta el lujo y la exclusividad con nuestros servicios premium personalizados. 
          Cada detalle cuidado para hacer de tu estancia una experiencia inolvidable.
        </p>

        {/* Grid de servicios premium */}
        <div className="premium-services-grid">
          {premiumServices.map(service => (
            <div key={service.id} className="premium-service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p className="service-short-description">{service.shortDescription}</p>
              <div className="service-price">{service.price}</div>
              <button 
                className="service-details-btn"
                onClick={() => handleServiceClick(service)}
              >
                {selectedService?.id === service.id ? 'Ocultar Detalles' : 'Ver Detalles'}
              </button>
            </div>
          ))}
        </div>

        {/* Panel de detalles del servicio seleccionado */}
        {selectedService && (
          <div className="service-details-panel">
            <div className="service-details-content">
              <div className="service-details-header">
                <span className="service-large-icon">{selectedService.icon}</span>
                <h2>{selectedService.title}</h2>
                <button 
                  className="close-details-btn"
                  onClick={() => setSelectedService(null)}
                >
                  ✕
                </button>
              </div>
              
              <div className="service-full-description">
                {selectedService.fullDescription.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              
              <div className="service-booking-section">
                <div className="service-price-highlight">
                  {selectedService.price}
                </div>
                <button className="book-service-btn">
                  Reservar {selectedService.title}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default PremiumServices;