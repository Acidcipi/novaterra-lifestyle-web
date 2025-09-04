//===============================================
//🦶 FOOTER COMPLETAMENTE TRADUCIDO - src/components/Footer.jsx
//===============================================
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* COLUMNA 1: Información de la empresa */}
          <div className="footer-column">
            <h4>{t('footer.company')}</h4>
            <p>{t('footer.description')}</p>
            <p>
              <strong>📍 {t('footer.location')}:</strong><br />
              {t('footer.locationText')}
            </p>
          </div>

          {/* COLUMNA 2: Enlaces útiles traducidos */}
          <div className="footer-column">
            <h4>{t('footer.links')}</h4>
            <div className="footer-links-grid">
              <div className="footer-links-column">
                <Link to="/" className="footer-link">{t('nav.home')}</Link>
                <Link to="/propiedades" className="footer-link">{t('nav.properties')}</Link>
                <Link to="/experiencias" className="footer-link">{t('nav.experiences')}</Link>
                <Link to="/servicios" className="footer-link">{t('nav.services')}</Link>
              </div>
              <div className="footer-links-column">
                <a href="#privacy" className="footer-link" onClick={(e) => e.preventDefault()}>
                  {t('footer.privacy')}
                </a>
                <a href="#terms" className="footer-link" onClick={(e) => e.preventDefault()}>
                  {t('footer.terms')}
                </a>
                <a href="#help" className="footer-link" onClick={(e) => e.preventDefault()}>
                  {t('footer.help')}
                </a>
                <a href="#sitemap" className="footer-link" onClick={(e) => e.preventDefault()}>
                  {t('footer.sitemap')}
                </a>
              </div>
            </div>
          </div>

          {/* COLUMNA 3: Contacto traducido */}
          <div className="footer-column">
            <h4>{t('footer.contactTitle')}</h4>
            <p>
              <strong>📧 {t('footer.email')}:</strong><br />
              info@novaterra.es
            </p>
            <p>
              <strong>📱 {t('footer.phone')}:</strong><br />
              +34 942 123 456
            </p>
            <p>
              <strong>🕒 {t('footer.schedule')}:</strong><br />
              {t('footer.scheduleText')}
            </p>
            
            {/* Redes sociales */}
            <div className="social-links">
              <h5 style={{color: '#d4af37', fontSize: '1rem', marginTop: '1rem', marginBottom: '0.5rem'}}>
                {t('footer.followUs')}
              </h5>
              <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                <a href="#facebook" onClick={(e) => e.preventDefault()}>{t('footer.facebook')}</a>
                <a href="#instagram" onClick={(e) => e.preventDefault()}>{t('footer.instagram')}</a>
                <a href="#linkedin" onClick={(e) => e.preventDefault()}>{t('footer.linkedin')}</a>
                <a href="#youtube" onClick={(e) => e.preventDefault()}>{t('footer.youtube')}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Línea inferior del footer */}
        <div className="footer-bottom">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;