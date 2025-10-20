//===============================================
//✨ EXPERIENCIAS PREVIEW - src/pages/ExperiencesPreview.jsx  
//===============================================
import React from 'react';
import { useTranslation } from 'react-i18next';

const ExperiencesPreview = ({ onLoginClick }) => {
  const { t } = useTranslation();

  const previewExperiences = [
    {
      id: 1,
      title: "Tour Gastronómico Premium",
      duration: "4 horas",
      price: "150€",
      image: "🍽️"
    },
    {
      id: 2,
      title: "Ruta Picos de Europa",
      duration: "8 horas",
      price: "280€",
      image: "⛰️"
    },
    {
      id: 3,
      title: "Experiencia Cueva El Soplao",
      duration: "6 horas",
      price: "200€",
      image: "🕳️"
    },
    {
      id: 4,
      title: "Navegación Costa Cantábrica",
      duration: "5 horas",
      price: "320€",
      image: "⛵"
    }
  ];

  return (
    <main className="page-container">
      <section className="content-section active">
        <h1 className="page-title">{t('nav.experiences')} - Vista Previa</h1>
        <p className="page-description">
          Algunas de nuestras experiencias más populares. 
          <strong> Regístrate para acceder al catálogo completo.</strong>
        </p>
        
        <div className="experiences-grid">
          {previewExperiences.map(experience => (
            <div key={experience.id} className="experience-card preview-card">
              <div className="experience-image">
                <div className="placeholder-image">
                  {experience.image}
                  <small>Muestra</small>
                </div>
              </div>
              <div className="experience-info">
                <h3>{experience.title}</h3>
                <p>Duración: {experience.duration}</p>
                <div className="experience-price">{experience.price}</div>
                <button className="experience-button preview-button" onClick={onLoginClick}>
                  Regístrate para reservar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="preview-cta">
          <h3>¿Quieres vivir experiencias únicas?</h3>
          <p>Más de 20 experiencias personalizadas te están esperando</p>
          <button className="cta-button" onClick={onLoginClick}>
            Acceder a Todas las Experiencias
          </button>
        </div>
      </section>
    </main>
  );
};

export default ExperiencesPreview;