//===============================================
//🏠 PÁGINA PROPIEDADES - src/pages/Properties.jsx  
//===============================================
import React from 'react';
import { useTranslation } from 'react-i18next';

const Properties = () => {
  const { t } = useTranslation();

  // Datos de ejemplo de propiedades
  const properties = [
    {
      id: 1,
      title: "Villa Marina Deluxe",
      location: "Santander, Cantabria",
      price: "450.000€",
      description: "Espectacular villa con vistas al mar Cantábrico"
    },
    {
      id: 2,
      title: "Casa Rural Los Picos",
      location: "Potes, Cantabria", 
      price: "320.000€",
      description: "Acogedora casa rural en el corazón de los Picos de Europa"
    },
    {
      id: 3,
      title: "Apartamento Centro Histórico",
      location: "Santillana del Mar, Cantabria",
      price: "280.000€", 
      description: "Apartamento reformado en el casco histórico medieval"
    },
    {
      id: 4,
      title: "Chalet Playa Berria",
      location: "Santoña, Cantabria",
      price: "520.000€",
      description: "Chalet de lujo a 50m de la playa de Berria"
    }
  ];

  return (
    <main className="page-container">
      <section className="content-section active">
        <h1 className="page-title">{t('nav.properties')}</h1>
        <p className="page-description">
          Descubre propiedades únicas en los lugares más privilegiados de Cantabria. 
          Desde villas con vistas al mar hasta casas rurales en los Picos de Europa.
        </p>
        
        {/* Grid de propiedades */}
        <div className="properties-grid">
          {properties.map(property => (
            <div key={property.id} className="property-card">
              <div className="property-image">
                <div className="placeholder-image">
                  🏠<br />
                  <small>Imagen disponible pronto</small>
                </div>
              </div>
              <div className="property-info">
                <h3>{property.title}</h3>
                <p className="property-location">📍 {property.location}</p>
                <p className="property-description">{property.description}</p>
                <div className="property-price">{property.price}</div>
                <button className="property-button">Ver Detalles</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Properties;