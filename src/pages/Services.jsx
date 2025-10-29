//===============================================
//⭐ PÁGINA SERVICIOS - src/pages/Services.jsx
//===============================================
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import AutoTranslate from '../components/AutoTranslate';
import { useAuth } from '../hooks/useAuth';

export default function Services() {
  const { t } = useTranslation(['common', 'pages']);
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ FALSE por defecto

  const exampleServices = [
    {
      id: 'example-1',
      title: 'Concierge Premium 24/7',
      description: 'Asistencia personalizada las 24 horas: reservas en restaurantes exclusivos, entradas a eventos, gestión de servicios del hogar y atención a cualquier necesidad.',
      price: 500,
      image: '/images/services/concierge.jpg'
    },
    {
      id: 'example-2',
      title: 'Chef Privado Gourmet',
      description: 'Chef profesional a domicilio para cenas íntimas o eventos. Menús personalizados con productos locales de máxima calidad y maridaje de vinos cántabros.',
      price: 350,
      image: '/images/services/chef.jpg'
    },
    {
      id: 'example-3',
      title: 'Transporte de Lujo',
      description: 'Flota de vehículos premium con conductor profesional. Traslados aeropuerto, rutas turísticas personalizadas y servicios corporativos.',
      price: 200,
      image: '/images/services/transporte.jpg'
    },
    {
      id: 'example-4',
      title: 'Wellness & Spa Personalizado',
      description: 'Tratamientos de spa a domicilio: masajes terapéuticos, tratamientos faciales, yoga privado y sesiones de mindfulness con profesionales certificados.',
      price: 180,
      image: '/images/services/spa.jpg'
    },
    {
      id: 'example-5',
      title: 'Asesoría Jurídica Inmobiliaria',
      description: 'Abogados especializados en derecho inmobiliario: gestión de compraventa, hipotecas, herencias y documentación legal completa.',
      price: 300,
      image: '/images/services/asesoria.jpg'
    },
    {
      id: 'example-6',
      title: 'Gestión Integral de Propiedades',
      description: 'Administración completa de tu propiedad: mantenimiento, limpieza, jardinería, reparaciones y gestión de alquileres vacacionales.',
      price: 450,
      image: '/images/services/gestion.jpg'
    }
  ];

  useEffect(() => {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // ✅ Carga instantánea - ejemplos primero
    setServices(exampleServices);
    
    // ✅ Intenta cargar Firestore en segundo plano (opcional)
    loadServicesFromFirestore();
  }, []);

  const loadServicesFromFirestore = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'services'));
      const servicesData = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
      
      if (servicesData.length > 0) {
        setServices(servicesData);
      }
    } catch (error) {
      // Silencioso - ya tenemos ejemplos
    }
  };

  const handleContactClick = (serviceTitle) => {
    if (user) {
      alert(`Redirigiendo a contacto para: ${serviceTitle}`);
    } else {
      // ✅ Envía modo "register" para abrir en registro
      window.dispatchEvent(new CustomEvent('openLoginModal', { 
        detail: { mode: 'register' } 
      }));
    }
  };


  return (
    <div className="page-container">
      <div className="page-header">
        <h1><AutoTranslate>Servicios Premium</AutoTranslate></h1>
        <p className="page-subtitle">
          <AutoTranslate>
            Servicios exclusivos diseñados para tu máximo confort y tranquilidad
          </AutoTranslate>
        </p>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-image-container">
              <img 
                src={service.image || '/images/services/default.jpg'} 
                alt={service.title}
                className="service-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300/2a2a2a/d4af37?text=Servicio';
                }}
              />
            </div>
            
            <div className="service-content">
              <h3 className="service-title">
                <AutoTranslate>{service.title}</AutoTranslate>
              </h3>
              
              <p className="service-description">
                <AutoTranslate>{service.description}</AutoTranslate>
              </p>

              <div className="service-footer">
                <p className="service-price">
                  Desde {service.price}€
                </p>
                
                <button 
                  className="btn-register-prompt"
                  onClick={() => handleContactClick(service.title)}
                >
                  <AutoTranslate>{user ? 'Contactar' : 'Registrarse'}</AutoTranslate>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
