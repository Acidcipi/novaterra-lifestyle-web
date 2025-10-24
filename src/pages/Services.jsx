import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function Services() {
  const { t, i18n } = useTranslation(['common', 'pages']);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      // Cargar servicios desde Firebase
      const querySnapshot = await getDocs(collection(db, 'services'));
      const servicesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setServices(servicesData);
    } catch (error) {
      console.error('Error cargando servicios:', error);
      // Si no hay servicios en Firebase, mostrar los ejemplos estáticos
      setServices([
        {
          id: 'villa_lujo_santander',
          slug: 'villa-lujo-santander',
          type: 'service'
        },
        {
          id: 'apartamento_centro_santander',
          slug: 'apartamento-centro-santander',
          type: 'service'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="content-section">
          <p>{t('common:status.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="content-section">
        <h1 className="page-title">{t('common:header.nav.services')}</h1>
        <p className="page-description">
          Descubre nuestros servicios premium en Cantabria
        </p>

        <div className="properties-grid">
          {services.map(service => (
            <Link 
              key={service.id}
              to={`/services/${service.slug || service.id}`}
              className="property-card"
            >
              <div className="property-card-content">
                <h3>{t(`${service.id}:property.title`, service.title || 'Servicio')}</h3>
                <p>{t(`${service.id}:property.subtitle`, service.subtitle || '')}</p>
                <button className="cta-button">
                  {t('common:buttons.view_details')}
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
