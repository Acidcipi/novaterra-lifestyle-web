//===============================================
//🏠 PÁGINA HOME CORREGIDA - src/pages/Home.jsx
//===============================================
import React from 'react';

const Home = () => {
  return (
    <main className="page-container">
      <section className="content-section active">
        {/* El header ya muestra el carrusel y hero cuando estamos en home */}
        
        <div className="home-content">
          <h2 className="section-title">Cantabria, tu mejor inversión y destino en España</h2>
          
          <p className="home-paragraph">
            Descubre Cantabria, una tierra única en el norte de España que combina naturaleza, mar, montaña y una calidad de vida incomparable. Ofrecemos <strong>inmuebles exclusivos, alojamientos singulares, viajes a medida y experiencias auténticas</strong> para que vivas o disfrutes esta región de una manera diferente.
          </p>
          
          <p className="home-paragraph">
            Nuestro objetivo es acercar <strong>lo mejor de Cantabria a Europa</strong>, especialmente a quienes buscan en España un lugar con encanto, seguridad y oportunidades reales de inversión.
          </p>
          
          <p className="home-paragraph">
            Ya sea que quieras comprar una casa, planear unas vacaciones inolvidables o explorar excursiones llenas de cultura, gastronomía y paisajes, en Cantabria lo encontrarás todo.
          </p>
          
          <div className="home-cta">
            <h3><strong>Invierte, viaja y vive Cantabria</strong></h3>
          </div>

          {/* Sección de características destacadas */}
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏖️</div>
              <h3>Propiedades Exclusivas</h3>
              <p>Villas, apartamentos y casas rurales en las mejores ubicaciones de Cantabria</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Experiencias Únicas</h3>
              <p>Descubre Cantabria como un local con nuestras experiencias personalizadas</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🛎️</div>
              <h3>Servicios Premium</h3>
              <p>Concierge, chef privado, transporte de lujo y spa para una estancia perfecta</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;