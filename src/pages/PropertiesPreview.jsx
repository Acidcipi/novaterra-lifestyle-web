//===============================================
//🏠 PROPIEDADES PREVIEW - src/pages/PropertiesPreview.jsx
//===============================================
import React from 'react';
import { useTranslation } from 'react-i18next';

const PropertiesPreview = ({ onLoginClick }) => {
  const { t } = useTranslation();

  // Solo 4 propiedades como muestra
  const previewProperties = [
    {
      id: 1,
      title: "Villa Marina Premium",
      location: "Santander",
      price: "450.000€",
      image: "🏖️"
    },
    {
      id: 2,
      title: "Casa Rural Los Picos",
      location: "Potes",
      price: "320.000€",
      image: "🏔️"
    },
    {
      id: 3,
      title: "Apartamento Centro",
      location: "Santillana del Mar",
      price: "280.000€",
      image: "🏛️"
    },
    {
      id: 4,
      title: "Chalet Playa Exclusive",
      location: "Santoña",
      price: "520.000€",
      image: "🌊"
    }
  ];

  return (
    <main className="page-container">
      <section className="content-section active">
        <h1 className="page-title">{t('nav.properties')} - Vista Previa</h1>
        <p className="page-description">
          Descubre una selección de nuestras mejores propiedades. 
          <strong> Regístrate para ver todas las opciones disponibles.</strong>
        </p>
        
        <div className="properties-grid">
          {previewProperties.map(property => (
            <div key={property.id} className="property-card preview-card">
              <div className="property-image">
                <div className="placeholder-image">
                  {property.image}
                  <small>Vista previa</small>
                </div>
              </div>
              <div className="property-info">
                <h3>{property.title}</h3>
                <p className="property-location">📍 {property.location}</p>
                <div className="property-price">{property.price}</div>
                <button className="property-button preview-button" onClick={onLoginClick}>
                  Regístrate para ver detalles
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="preview-cta">
          <h3>¿Quieres ver todas nuestras propiedades?</h3>
          <p>Tenemos más de 50 propiedades exclusivas esperándote</p>
          <button className="cta-button" onClick={onLoginClick}>
            Registrarse Gratis
          </button>
        </div>
      </section>
    </main>
  );
};

export default PropertiesPreview;
