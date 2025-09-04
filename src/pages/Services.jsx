// PARA src/pages/Services.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();

  return (
    <main className="page-container">
      <section className="content-section">
        <h1 className="page-title">{t('nav.services')}</h1>
        <p className="page-description">
          Próximamente: Servicios premium personalizados.
        </p>
      </section>
    </main>
  );
};

export default Services;
