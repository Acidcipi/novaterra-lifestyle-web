// src/components/PropertyDetail.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDynamicTranslation } from '../hooks/useDynamicTranslation';

/**
 * Componente para mostrar detalles de una propiedad específica
 */
export default function PropertyDetail({ propertyId, category = 'services', isPreview = false }) {
  // Traducciones base (siempre disponibles)
  const { t: tCommon } = useTranslation('common');
  const { t: tProperties } = useTranslation('properties');
  
  // Traducciones dinámicas para la propiedad específica
  const { 
    t: tProperty, 
    isLoaded, 
    loading, 
    error,
    reload 
  } = useDynamicTranslation(propertyId, category);

  const [activeTab, setActiveTab] = useState('description');
  const [showContactForm, setShowContactForm] = useState(false);

  // Mostrar loading mientras carga las traducciones
  if (loading) {
    return (
      <div className="property-detail-loading">
        <div className="loading-spinner"></div>
        <p>{tCommon('status.loading')}</p>
      </div>
    );
  }

  // Mostrar error si no se pudieron cargar las traducciones
  if (error) {
    return (
      <div className="property-detail-error">
        <h3>{tCommon('status.error')}</h3>
        <p>{error}</p>
        <button onClick={reload} className="retry-button">
          Reintentar
        </button>
      </div>
    );
  }

  // Mostrar contenido solo cuando las traducciones están cargadas
  if (!isLoaded) {
    return (
      <div className="property-detail-placeholder">
        <p>Preparando información de la propiedad...</p>
      </div>
    );
  }

  return (
    <div className={`property-detail ${isPreview ? 'preview-mode' : ''}`}>
      {/* Banner de preview si aplica */}
      {isPreview && (
        <div className="preview-banner">
          <p>🔒 {tCommon('preview_label')} - Regístrate para ver información completa</p>
          <button className="register-cta">Registrarse Gratis</button>
        </div>
      )}
      
      {/* Header de la propiedad */}
      <div className="property-header">
        <div className="property-title-section">
          <h1 className="property-title">{tProperty('property.title')}</h1>
          <p className="property-subtitle">{tProperty('property.subtitle')}</p>
          <div className="property-location">
            📍 {tProperty('location.area')}, {tProperty('location.city')}
          </div>
        </div>
        
        <div className="property-price-section">
          <div className="price-main">
            {tProperty('price.sale')} {tProperty('price.currency')}
          </div>
          <div className="price-per-m2">
            {tProperty('price.price_per_m2')} {tProperty('price.currency')}/m²
          </div>
        </div>
      </div>

      {/* Especificaciones rápidas */}
      <div className="property-specs">
        <div className="spec-item">
          <span className="spec-value">{tProperty('specifications.bedrooms')}</span>
          <span className="spec-label">{tProperties('card.bedrooms')}</span>
        </div>
        <div className="spec-item">
          <span className="spec-value">{tProperty('specifications.bathrooms')}</span>
          <span className="spec-label">{tProperties('card.bathrooms')}</span>
        </div>
        <div className="spec-item">
          <span className="spec-value">{tProperty('specifications.size_built')}</span>
          <span className="spec-label">{tProperties('card.size')}</span>
        </div>
      </div>

      {/* Información legal y referencia */}
      <div className="property-footer">
        <div className="legal-info">
          <span>Ref: {tProperty('legal.reference')}</span>
          <span>Certificado energético: {tProperty('legal.energy_rating')}</span>
          <span>Actualizado: {tProperty('legal.last_update')}</span>
        </div>
      </div>
    </div>
  );
}