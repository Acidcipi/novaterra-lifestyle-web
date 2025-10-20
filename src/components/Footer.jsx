//===============================================
//💎 FOOTER PREMIUM CANTABRIA - src/components/Footer.jsx
//===============================================
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  //===============================================
  //🌐 CONFIGURACIÓN DE TRADUCCIONES
  //===============================================
  const { t } = useTranslation('common');

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* --------GRID PRINCIPAL CON 3 COLUMNAS-------- */}
        <div className="footer-grid">
          
          {/* --------COLUMNA 1: INFORMACIÓN DE LA EMPRESA-------- */}
          <div className="footer-column">
            <h4>{t('footer.company.name')}</h4>
            <p>{t('footer.company.tagline')}</p>
            <p>{t('footer.company.description')}</p>
            <div style={{ marginTop: '1rem' }}>
              <p style={{ fontSize: '0.85rem', color: '#d4af37' }}>
                🏆 API Cantabria Certified
              </p>
              <p style={{ fontSize: '0.85rem', color: '#d4af37' }}>
                ⭐ Premium Partner
              </p>
            </div>
          </div>

          {/* --------COLUMNA 2: ENLACES RÁPIDOS-------- */}
          <div className="footer-column">
            <h4>Enlaces Rápidos</h4>
            <div className="footer-links-grid">
              <div className="footer-links-column">
                <Link to="/propiedades-preview" className="footer-link">
                  {t('header.nav.properties')}
                </Link>
                <Link to="/servicios-preview" className="footer-link">
                  {t('header.nav.services')}
                </Link>
                <Link to="/experiencias-preview" className="footer-link">
                  Experiencias
                </Link>
                <Link to="/contacto" className="footer-link">
                  {t('header.nav.contact')}
                </Link>
              </div>
              <div className="footer-links-column">
                <Link to="/privacy" className="footer-link">
                  {t('footer.links.privacy')}
                </Link>
                <Link to="/terms" className="footer-link">
                  {t('footer.links.terms')}
                </Link>
                <Link to="/cookies" className="footer-link">
                  {t('footer.links.cookies')}
                </Link>
                <Link to="/legal" className="footer-link">
                  Aviso Legal
                </Link>
              </div>
            </div>
          </div>

          {/* --------COLUMNA 3: INFORMACIÓN DE CONTACTO-------- */}
          <div className="footer-column">
            <h4>{t('footer.contact.title')}</h4>
            <p>📞 {t('footer.contact.phone')}: +34 942 123 456</p>
            <p>✉️ {t('footer.contact.email')}: info@novaterra-lifestyle.com</p>
            <p>📍 {t('footer.contact.address')}: Castro Urdiales, Cantabria</p>
            <p>🕒 Lunes a Viernes: 9:00 - 19:00h</p>
            
            {/* --------REDES SOCIALES-------- */}
            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                {t('footer.social.title')}
              </h4>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a 
                  href="https://facebook.com/novaterra" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-link"
                  aria-label={t('footer.social.facebook')}
                >
                  📘 Facebook
                </a>
                <a 
                  href="https://instagram.com/novaterra" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-link"
                  aria-label={t('footer.social.instagram')}
                >
                  📷 Instagram
                </a>
                <a 
                  href="https://linkedin.com/company/novaterra" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-link"
                  aria-label={t('footer.social.linkedin')}
                >
                  💼 LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --------LÍNEA DE DERECHOS-------- */}
      <div className="footer-bottom">
        <p>{t('footer.rights')}</p>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginTop: '0.5rem', 
          fontSize: '0.85rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <span>🌟 Especialistas en Costa Cantábrica desde 2020</span>
          <span>📍 Oficinas en Castro Urdiales, Laredo y Santander</span>
          <span>🏆 Más de 500 propiedades vendidas</span>
        </div>
      </div>
    </footer>
  );
}