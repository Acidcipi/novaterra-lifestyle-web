import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function Experiences() {
  const { t } = useTranslation(['common', 'pages']);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'experiences'));
      const experiencesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setExperiences(experiencesData);
    } catch (error) {
      console.error('Error cargando experiencias:', error);
      // Mostrar mensaje si no hay experiencias
      setExperiences([]);
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
        <h1 className="page-title">{t('common:header.nav.experiences')}</h1>
        <p className="page-description">
          Descubre experiencias únicas en Cantabria
        </p>

        {experiences.length === 0 ? (
          <div className="empty-state">
            <p>Próximamente: Experiencias únicas en Cantabria</p>
          </div>
        ) : (
          <div className="properties-grid">
            {experiences.map(experience => (
              <Link 
                key={experience.id}
                to={`/experiences/${experience.slug || experience.id}`}
                className="property-card"
              >
                <div className="property-card-content">
                  <h3>{experience.title}</h3>
                  <p>{experience.description}</p>
                  <button className="cta-button">
                    {t('common:buttons.view_details')}
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
