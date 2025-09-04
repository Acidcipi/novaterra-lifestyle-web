// PARA src/pages/Contact.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <main className="page-container">
      <section className="content-section">
        <h1 className="page-title">{t('nav.contact')}</h1>
        <p className="page-description">
          Contacto: info@novaterra-lifestyle.com
        </p>
      </section>
    </main>
  );
};

export default Contact;