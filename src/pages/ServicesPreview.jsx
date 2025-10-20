//===============================================
//🛎️ SERVICIOS PREVIEW - src/pages/ServicesPreview.jsx
//===============================================
import React from 'react';
import { useTranslation } from 'react-i18next';

const ServicesPreview = ({ onLoginClick }) => {
  const { t } = useTranslation();

  const previewServices = [
    {
      id: 1,
      title: "Concierge Personal",
      description: "Asistente 24/7 para todas tus necesidades",
      price: "Desde 150€/día",
      image: "🎩"
    },
    {
      id: 2,
      title: "Chef Privado",
      description: "Gastronomía de autor en tu alojamiento",
      price: "Desde 300€/experiencia",
      image: "👨‍🍳"
    },
    {
      id: 3,
      title: "Transporte Premium",
      description: "Traslados de lujo con conductor",
      price: "Desde 80€/hora",
      image: "🚗"
    },
    {
      id: 4,
      title: "Spa & Wellness",
      description: "Relajación en entornos únicos",
      price: "Desde 120€/sesión",
      image: "🧘‍♀️"
    }
  ];

  return (
    <main className="page-container">
      <section className="content-section active">
        <h1 className="page-title">{t('nav.services')} - Vista Previa</h1>
        <p className="page-description">
          Nuestros servicios premium más solicitados. 
          <strong> Regístrate para descubrir todos los servicios disponibles.</strong>
        </p>
        
        <div className="services-grid">
          {previewServices.map(service => (
            <div key={service.id} className="service-card preview-card">
              <div className="service-icon">{service.image}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-price">{service.price}</div>
              <button className="service-button preview-button" onClick={onLoginClick}>
                Regístrate para solicitar
              </button>
            </div>
          ))}
        </div>

        <div className="preview-cta">
          <h3>¿Quieres servicios premium completos?</h3>
          <p>Accede a más de 15 servicios exclusivos para miembros</p>
          <button className="cta-button" onClick={onLoginClick}>
            Convertirse en Miembro
          </button>
        </div>
      </section>
    </main>
  );
};

export default ServicesPreview;