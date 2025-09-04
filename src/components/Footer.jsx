//===============================================
//🦶 FOOTER REORGANIZADO - src/components/Footer.jsx
//===============================================
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Grid principal del footer - 3 columnas equilibradas */}
        <div className="footer-grid">
          {/* COLUMNA 1: Información de la empresa */}
          <div className="footer-column">
            <h4>Novaterra</h4>
            <p>
              Tu puerta de entrada a Cantabria. Ofrecemos propiedades exclusivas, 
              experiencias únicas y servicios premium para que descubras lo mejor 
              del norte de España.
            </p>
            <p>
              <strong>📍 Ubicación:</strong><br />
              Santander, Cantabria<br />
              España
            </p>
          </div>

          {/* COLUMNA 2: Enlaces útiles en 2 columnas organizadas */}
          <div className="footer-column">
            <h4>Enlaces Útiles</h4>
            <div className="footer-links-grid">
              <div className="footer-links-column">
                <Link to="/" className="footer-link">Inicio</Link>
                <Link to="/propiedades" className="footer-link">Propiedades</Link>
                <Link to="/experiencias" className="footer-link">Experiencias</Link>
                <Link to="/servicios" className="footer-link">Servicios</Link>
              </div>
              <div className="footer-links-column">
                <a href="#privacy" className="footer-link" onClick={(e) => e.preventDefault()}>
                  Política de Privacidad
                </a>
                <a href="#terms" className="footer-link" onClick={(e) => e.preventDefault()}>
                  Términos y Condiciones
                </a>
                <a href="#help" className="footer-link" onClick={(e) => e.preventDefault()}>
                  Ayuda
                </a>
                <a href="#sitemap" className="footer-link" onClick={(e) => e.preventDefault()}>
                  Mapa del Sitio
                </a>
              </div>
            </div>
          </div>

          {/* COLUMNA 3: Contacto y redes sociales */}
          <div className="footer-column">
            <h4>Contacto</h4>
            <p>
              <strong>📧 Email:</strong><br />
              info@novaterra.es
            </p>
            <p>
              <strong>📱 Teléfono:</strong><br />
              +34 942 123 456
            </p>
            <p>
              <strong>🕒 Horario:</strong><br />
              Lun-Vie: 9:00 - 18:00<br />
              Sáb: 10:00 - 14:00
            </p>
            
            {/* Redes sociales */}
            <div className="social-links">
              <h5 style={{color: '#d4af37', fontSize: '1rem', marginTop: '1rem', marginBottom: '0.5rem'}}>
                Síguenos
              </h5>
              <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                <a href="#facebook" onClick={(e) => e.preventDefault()}>Facebook</a>
                <a href="#instagram" onClick={(e) => e.preventDefault()}>Instagram</a>
                <a href="#linkedin" onClick={(e) => e.preventDefault()}>LinkedIn</a>
                <a href="#youtube" onClick={(e) => e.preventDefault()}>YouTube</a>
              </div>
            </div>
          </div>
        </div>

        {/* Línea inferior del footer */}
        <div className="footer-bottom">
          <p>
            © 2025 Novaterra. Todos los derechos reservados. | 
            Diseñado con ❤️ para Cantabria
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;