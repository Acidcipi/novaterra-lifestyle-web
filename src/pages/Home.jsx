//===============================================
//🏠 HOME - src/pages/Home.jsx
//===============================================
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AutoTranslate from '../components/AutoTranslate';

export default function Home() {
  const { t } = useTranslation('common');
  const navigate = useNavigate();

  //===============================================
  // ✅ SCROLL AL MAIN-CONTENT (NO AL HEADER)
  //===============================================
  useEffect(() => {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  //===============================================
  // ✅ NAVEGACIÓN CON SCROLL AL MAIN-CONTENT
  //===============================================
  const handleNavigate = (path) => {
    navigate(path);
    // Delay para que cargue la página antes de hacer scroll
    setTimeout(() => {
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content-wide">
          <h1 className="hero-title">
            <AutoTranslate>Bienvenido a Novaterra Lifestyle</AutoTranslate>
          </h1>
          
          <p className="hero-text">
            <AutoTranslate>
              Descubre la esencia del lujo en Cantabria, donde cada propiedad cuenta una historia única de elegancia y sofisticación. En Novaterra Lifestyle, transformamos sueños en realidad mediante propiedades exclusivas que definen el más alto estándar de vida.
            </AutoTranslate>
          </p>

          <p className="hero-text">
            <AutoTranslate>
              Nuestro compromiso va más allá de la venta inmobiliaria: ofrecemos una experiencia integral que combina asesoramiento personalizado, servicios premium y acceso a experiencias únicas en uno de los destinos más privilegiados de España.
            </AutoTranslate>
          </p>

          <p className="hero-text">
            <AutoTranslate>
              Desde villas con vistas panorámicas al mar Cantábrico hasta propiedades señoriales en el corazón de los Picos de Europa, cada inmueble ha sido cuidadosamente seleccionado para satisfacer las expectativas más exigentes.
            </AutoTranslate>
          </p>

          <p className="hero-cta-text">
            <AutoTranslate>Tu nuevo hogar de lujo te espera en Cantabria</AutoTranslate>
          </p>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title-home">
          <AutoTranslate>¿Por qué elegir Novaterra Lifestyle?</AutoTranslate>
        </h2>

        <div className="features-grid">
          {/* ✅ TARJETAS CON SCROLL AL MAIN-CONTENT */}
          <div 
            className="feature-card clickable"
            onClick={() => handleNavigate('/properties')}
          >
            <div className="feature-icon">🏡</div>
            <h3 className="feature-title">
              <AutoTranslate>Propiedades Exclusivas</AutoTranslate>
            </h3>
            <p className="feature-description">
              <AutoTranslate>
                Accede a un portfolio selecto de villas, chalets y apartamentos de lujo en las ubicaciones más privilegiadas de Cantabria. Cada propiedad cumple con los más altos estándares de calidad, diseño y confort.
              </AutoTranslate>
            </p>
            <span className="feature-link">
              <AutoTranslate>Ver propiedades →</AutoTranslate>
            </span>
          </div>

          <div 
            className="feature-card clickable"
            onClick={() => handleNavigate('/services')}
          >
            <div className="feature-icon">⭐</div>
            <h3 className="feature-title">
              <AutoTranslate>Servicios Premium</AutoTranslate>
            </h3>
            <p className="feature-description">
              <AutoTranslate>
                Disfruta de asesoramiento jurídico especializado, gestión integral de tu propiedad, reformas personalizadas y servicios de conserjería disponibles las 24 horas para garantizar tu máxima tranquilidad.
              </AutoTranslate>
            </p>
            <span className="feature-link">
              <AutoTranslate>Descubrir servicios →</AutoTranslate>
            </span>
          </div>

          <div 
            className="feature-card clickable"
            onClick={() => handleNavigate('/experiences')}
          >
            <div className="feature-icon">🌟</div>
            <h3 className="feature-title">
              <AutoTranslate>Experiencias Únicas</AutoTranslate>
            </h3>
            <p className="feature-description">
              <AutoTranslate>
                Vive Cantabria al máximo con experiencias gastronómicas en restaurantes con estrella Michelin, rutas exclusivas por los Picos de Europa y actividades personalizadas que harán de tu estancia algo inolvidable.
              </AutoTranslate>
            </p>
            <span className="feature-link">
              <AutoTranslate>Explorar experiencias →</AutoTranslate>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
