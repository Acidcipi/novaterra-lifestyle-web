// PARA src/pages/Experiences.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const Experiences = () => {
  const { t } = useTranslation();

  return (
    <main className="page-container">
      <section className="content-section">
        <h1 className="page-title">{t('nav.experiences')}</h1>
        <p className="page-description">
          Próximamente: Experiencias únicas en Cantabria.
        </p>
      </section>
    </main>
  );
};

export default Experiences;
