//===============================================
//🏠 HOME - CON TRADUCCIÓN AUTOMÁTICA EFICIENTE
//===============================================

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePageTranslation } from '../hooks/usePageTranslation';

export default function Home() {
  const { t } = useTranslation('common');

  //===============================================
  //📝 CONTENIDO EN ESPAÑOL (IDIOMA BASE)
  //===============================================
  const contentES = {
    hero: {
      title: "Cantabria, tu mejor inversión y destino en España",
      subtitle: "Descubre Cantabria, una tierra única en el norte de España que combina naturaleza, mar, montaña y una calidad de vida incomparable.",
      description: "Ofrecemos inmuebles exclusivos, alojamientos singulares, viajes a medida y experiencias auténticas para que vivas o disfrutes esta región de una manera diferente.",
      goal: "Nuestro objetivo es acercar lo mejor de Cantabria a Europa, especialmente a quienes buscan en España un lugar con encanto, seguridad y oportunidades reales de inversión.",
      closing: "Ya sea que quieras comprar una casa, planear unas vacaciones inolvidables o explorar excursiones llenas de cultura, gastronomía y paisajes, en Cantabria lo encontrarás todo.",
      cta: "Invierte, viaja y vive Cantabria"
    },
    features: [
      {
        title: "Propiedades Exclusivas",
        description: "Villas, apartamentos y casas rurales en las mejores ubicaciones de Cantabria"
      },
      {
        title: "Experiencias Únicas",
        description: "Descubre Cantabria como un local con nuestras experiencias personalizadas"
      },
      {
        title: "Servicios Premium",
        description: "Concierge, chef privado, transporte de lujo y spa para una estancia perfecta"
      }
    ]
  };

  //===============================================
  //🌍 TRADUCCIÓN AUTOMÁTICA
  //===============================================
  const { content, loading } = usePageTranslation(contentES);

  //===============================================
  //🎨 RENDER
  //===============================================
  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">
            {loading ? contentES.hero.title : content.hero.title}
          </h2>
          
          <p className="hero-subtitle">
            {loading ? contentES.hero.subtitle : content.hero.subtitle}
          </p>
          
          <p className="hero-description">
            <strong>
              {loading ? contentES.hero.description : content.hero.description}
            </strong>
          </p>
          
          <p className="hero-goal">
            {loading ? contentES.hero.goal : content.hero.goal}
          </p>
          
          <p className="hero-closing">
            {loading ? contentES.hero.closing : content.hero.closing}
          </p>
          
          <h3 className="hero-cta">
            <strong>
              {loading ? contentES.hero.cta : content.hero.cta}
            </strong>
          </h3>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <div className="features-grid">
          {(loading ? contentES.features : content.features).map((feature, index) => (
            <div key={index} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <Link to="/properties" className="cta-button">
          {t('buttons.see_more')}
        </Link>
      </section>
    </div>
  );
}
