import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AutoTranslate } from '../components/AutoTranslate';

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">
            <AutoTranslate>Cantabria, tu mejor inversión y destino en España</AutoTranslate>
          </h2>
          
          <p className="hero-subtitle">
            <AutoTranslate>
              Descubre Cantabria, una tierra única en el norte de España que combina naturaleza, mar, montaña y una calidad de vida incomparable.
            </AutoTranslate>
          </p>
          
          <p className="hero-description">
            <strong>
              <AutoTranslate>
                Ofrecemos inmuebles exclusivos, alojamientos singulares, viajes a medida y experiencias auténticas para que vivas o disfrutes esta región de una manera diferente.
              </AutoTranslate>
            </strong>
          </p>
          
          <p className="hero-goal">
            <AutoTranslate>
              Nuestro objetivo es acercar lo mejor de Cantabria a Europa, especialmente a quienes buscan en España un lugar con encanto, seguridad y oportunidades reales de inversión.
            </AutoTranslate>
          </p>
          
          <p className="hero-closing">
            <AutoTranslate>
              Ya sea que quieras comprar una casa, planear unas vacaciones inolvidables o explorar excursiones llenas de cultura, gastronomía y paisajes, en Cantabria lo encontrarás todo.
            </AutoTranslate>
          </p>
          
          <h3 className="hero-cta">
            <strong>
              <AutoTranslate>Invierte, viaja y vive Cantabria</AutoTranslate>
            </strong>
          </h3>
        </div>
      </section>

      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <h3><AutoTranslate>Propiedades Exclusivas</AutoTranslate></h3>
            <p><AutoTranslate>Villas, apartamentos y casas rurales en las mejores ubicaciones de Cantabria</AutoTranslate></p>
          </div>
          <div className="feature-card">
            <h3><AutoTranslate>Experiencias Únicas</AutoTranslate></h3>
            <p><AutoTranslate>Descubre Cantabria como un local con nuestras experiencias personalizadas</AutoTranslate></p>
          </div>
          <div className="feature-card">
            <h3><AutoTranslate>Servicios Premium</AutoTranslate></h3>
            <p><AutoTranslate>Concierge, chef privado, transporte de lujo y spa para una estancia perfecta</AutoTranslate></p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <Link to="/properties" className="cta-button">
          {t('buttons.see_more')}
        </Link>
      </section>
    </div>
  );
}
