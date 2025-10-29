//===============================================
//🏘️ PÁGINA PROPIEDADES - src/pages/Properties.jsx
//===============================================
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import AutoTranslate from '../components/AutoTranslate';
import { useAuth } from '../hooks/useAuth';

export default function Properties() {
  const { t } = useTranslation(['common', 'properties']);
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  //===============================================
  // ✅ EJEMPLOS DE PROPIEDADES CON RUTAS LOCALES
  // Coloca las imágenes en: public/images/properties/
  //===============================================
  const exampleProperties = [
    {
      id: 'example-1',
      title: 'Villa de Lujo en El Sardinero',
      location: 'El Sardinero, Santander',
      description: 'Impresionante villa con vistas panorámicas al mar Cantábrico. Diseño arquitectónico exclusivo con acabados de primera calidad. 5 habitaciones en suite, piscina infinity climatizada de 15m, jardín privado de 800m² con zona chill-out, gimnasio equipado, bodega climatizada y acceso directo a la playa. Domótica integral y sistema de seguridad 24h.',
      price: 2850000,
      bedrooms: 5,
      bathrooms: 5,
      surface: 450,
      features: ['Piscina infinity', 'Vistas al mar', 'Gimnasio', 'Bodega', 'Jardín privado', 'Acceso playa'],
      images: ['/images/properties/villa-sardinero.jpg']
    },
    {
      id: 'example-2',
      title: 'Apartamento Premium Centro Santander',
      location: 'Centro Histórico, Santander',
      description: 'Elegante apartamento completamente reformado en edificio señorial del siglo XIX rehabilitado. Distribución impecable con salón de 40m² con techos de 3.5m de altura, cocina abierta de diseño italiano con electrodomésticos Miele, 3 habitaciones con armarios empotrados, 2 baños completos en mármol travertino, terraza de 15m² y garaje doble incluido. Calefacción por aerotermia.',
      price: 450000,
      bedrooms: 3,
      bathrooms: 2,
      surface: 135,
      features: ['Centro histórico', 'Edificio rehabilitado', 'Cocina premium', 'Terraza', 'Garaje doble', 'Aerotermia'],
      images: ['/images/properties/apto-centro.jpg']
    },
    {
      id: 'example-3',
      title: 'Casa Rural Premium Picos de Europa',
      location: 'Potes, Liébana',
      description: 'Encantadora casa de piedra tradicional completamente restaurada respetando su arquitectura original. Vistas espectaculares a los Picos de Europa. 4 habitaciones con baño en suite, salón con chimenea de piedra natural, cocina rústica equipada con electrodomésticos modernos, huerto ecológico de 200m², bodega tradicional con cava, sistema de calefacción por biomasa y paneles solares.',
      price: 380000,
      bedrooms: 4,
      bathrooms: 4,
      surface: 220,
      features: ['Vistas Picos Europa', 'Casa de piedra', 'Huerto ecológico', 'Bodega', 'Biomasa', 'Paneles solares'],
      images: ['/images/properties/casa-potes.jpg']
    },
    {
      id: 'example-4',
      title: 'Chalet Moderno Diseño Suances',
      location: 'Suances, Costa Cantábrica',
      description: 'Impresionante chalet de diseño contemporáneo a solo 500m de la playa de Los Locos. Arquitectura vanguardista con grandes ventanales y espacios diáfanos. 4 habitaciones en suite con vestidores, salón de 60m² con cocina abierta, gimnasio completamente equipado, sala de cine privada con proyector 4K, sistema domótico Loxone, garaje para 3 vehículos y jardín de bajo mantenimiento con zona BBQ.',
      price: 890000,
      bedrooms: 4,
      bathrooms: 4,
      surface: 320,
      features: ['Diseño moderno', 'Cerca playa', 'Gimnasio', 'Sala cine', 'Domótica', 'Garaje 3 coches'],
      images: ['/images/properties/chalet-suances.jpg']
    },
    {
      id: 'example-5',
      title: 'Dúplex Exclusivo Primera Línea',
      location: 'Santander, Paseo Marítimo',
      description: 'Espectacular dúplex en primera línea de playa con vistas panorámicas al Cantábrico. Planta principal con salón-comedor de 50m² con acceso a terraza de 30m², cocina office equipada, suite principal con vestidor y baño completo. Planta superior con 2 habitaciones dobles, baño completo y terraza solárium de 40m² con zona jacuzzi. Materiales de lujo, suelo radiante y 2 plazas de garaje.',
      price: 725000,
      bedrooms: 3,
      bathrooms: 3,
      surface: 185,
      features: ['Primera línea', 'Vistas mar', 'Terraza 70m²', 'Jacuzzi', 'Suelo radiante', '2 garajes'],
      images: ['/images/properties/duplex-playa.jpg']
    },
    {
      id: 'example-6',
      title: 'Mansión Señorial Comillas',
      location: 'Comillas, Patrimonio Histórico',
      description: 'Excepcional mansión del siglo XIX completamente rehabilitada manteniendo todos sus elementos originales. Ubicada en zona residencial premium de Comillas. 6 habitaciones, 5 baños, biblioteca con chimenea, salón principal de 80m² con frescos originales, cocina de diseño integrada, bodega histórica, jardín de 1200m² con árboles centenarios, piscina climatizada y casa de invitados independiente.',
      price: 1650000,
      bedrooms: 6,
      bathrooms: 5,
      surface: 550,
      features: ['Mansión histórica', 'Patrimonio', 'Jardín 1200m²', 'Piscina', 'Casa invitados', 'Frescos originales'],
      images: ['/images/properties/mansion-comillas.jpg']
    }
  ];

  //===============================================
  // ✅ SCROLL AL MAIN-CONTENT AL MONTAR
  //===============================================
  useEffect(() => {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    loadProperties();
  }, []);

  //===============================================
  // ✅ CARGA RÁPIDA - TIMEOUT 1 SEGUNDO
  //===============================================
  const loadProperties = async () => {
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), 1000) // ✅ 1 segundo
    );

    try {
      const dataPromise = getDocs(collection(db, 'properties'));
      const querySnapshot = await Promise.race([dataPromise, timeoutPromise]);
      const propertiesData = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }));

      if (propertiesData.length === 0) {
        setProperties(exampleProperties);
      } else {
        setProperties(propertiesData);
      }
    } catch (error) {
      // ✅ Sin console.warn para evitar spam
      setProperties(exampleProperties);
    } finally {
      setLoading(false);
    }
  };

  //===============================================
  // ✅ CONTACTAR/REGISTRARSE
  //===============================================
  const handleContactClick = (propertyTitle) => {
    if (user) {
      alert(`Redirigiendo a contacto para: ${propertyTitle}`);
    } else {
      // ✅ Envía modo "register" para abrir en registro
      window.dispatchEvent(new CustomEvent('openLoginModal', { 
        detail: { mode: 'register' } 
      }));
    }
  };


  //===============================================
  // PANTALLA DE CARGA
  //===============================================
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p><AutoTranslate>Cargando propiedades...</AutoTranslate></p>
      </div>
    );
  }

  //===============================================
  // RENDERIZADO PRINCIPAL
  //===============================================
  return (
    <div className="page-container">
      {/* HEADER DE PÁGINA */}
      <div className="page-header">
        <h1><AutoTranslate>Propiedades Exclusivas</AutoTranslate></h1>
        <p className="page-subtitle">
          <AutoTranslate>
            Descubre nuestra selección de inmuebles de lujo en las ubicaciones más privilegiadas de Cantabria
          </AutoTranslate>
        </p>
      </div>

      {/* GRID DE PROPIEDADES */}
      {properties.length === 0 ? (
        <div className="empty-state">
          <h2><AutoTranslate>No hay propiedades disponibles</AutoTranslate></h2>
          <p><AutoTranslate>Próximamente tendremos nuevas propiedades para ti</AutoTranslate></p>
        </div>
      ) : (
        <div className="properties-grid">
          {properties.map((property) => (
            <div key={property.id} className="property-card">
              {/* IMAGEN */}
              <div className="property-image-container">
                <img 
                  src={property.images?.[0] || '/images/properties/default.jpg'} 
                  alt={property.title}
                  className="property-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300/2a2a2a/d4af37?text=Propiedad';
                  }}
                />
              </div>
              
              {/* CONTENIDO */}
              <div className="property-content">
                <h3 className="property-title">
                  <AutoTranslate>{property.title}</AutoTranslate>
                </h3>
                
                <p className="property-location">
                  📍 <AutoTranslate>{property.location}</AutoTranslate>
                </p>
                
                <p className="property-description">
                  <AutoTranslate>{property.description}</AutoTranslate>
                </p>

                {/* INFO ADICIONAL */}
                {property.bedrooms && (
                  <div style={{ 
                    display: 'flex', 
                    gap: '15px', 
                    marginTop: '15px', 
                    color: '#b0b0b0',
                    fontSize: '0.95rem' 
                  }}>
                    <span>🛏️ {property.bedrooms} hab.</span>
                    <span>🚿 {property.bathrooms} baños</span>
                    <span>📐 {property.surface}m²</span>
                  </div>
                )}

                {/* FOOTER CON PRECIO Y BOTÓN */}
                <div className="property-footer">
                  <p className="property-price">
                    {new Intl.NumberFormat('es-ES', { 
                      style: 'currency', 
                      currency: 'EUR', 
                      minimumFractionDigits: 0 
                    }).format(property.price)}
                  </p>
                  
                  <button 
                    className="btn-register-prompt"
                    onClick={() => handleContactClick(property.title)}
                  >
                    <AutoTranslate>{user ? 'Contactar' : 'Registrarse'}</AutoTranslate>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
