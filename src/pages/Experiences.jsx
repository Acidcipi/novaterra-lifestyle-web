//===============================================
//🌟 PÁGINA EXPERIENCIAS - src/pages/Experiences.jsx
//===============================================
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import AutoTranslate from '../components/AutoTranslate';
import { useAuth } from '../hooks/useAuth';

export default function Experiences() {
  const { t } = useTranslation(['common', 'pages']);
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ FALSE por defecto
  const experienceType = searchParams.get('type');

  const exampleExperiences = {
    basic: [
      {
        id: 'basic-1',
        title: 'Ruta Gastronómica Santander',
        description: 'Tour guiado por los mejores pinchos y tapas de Santander. Incluye 5 paradas en bares tradicionales con degustación de vinos DO Liébana.',
        duration: '3 horas',
        type: 'basic',
        image: '/images/experiences/gastronomia-basica.jpg'
      },
      {
        id: 'basic-2',
        title: 'Senderismo Picos de Europa',
        description: 'Ruta de senderismo nivel medio por los Picos de Europa con guía especializado. Paisajes espectaculares y avistamiento de fauna local.',
        duration: 'Día completo',
        type: 'basic',
        image: '/images/experiences/senderismo.jpg'
      },
      {
        id: 'basic-3',
        title: 'Visita Cueva El Soplao',
        description: 'Recorrido guiado por una de las cuevas más espectaculares de Europa. Formaciones geológicas únicas y sistema de iluminación LED.',
        duration: '2.5 horas',
        type: 'basic',
        image: '/images/experiences/cueva-soplao.jpg'
      }
    ],
    vip: [
      {
        id: 'vip-1',
        title: 'Experiencia Gastronómica Estrella Michelin',
        description: 'Cena privada en restaurante con estrella Michelin con chef ejecutivo. Menú degustación exclusivo y maridaje de vinos premium.',
        duration: '4 horas',
        type: 'vip',
        image: '/images/experiences/michelin.jpg'
      },
      {
        id: 'vip-2',
        title: 'Vuelo Privado Picos de Europa',
        description: 'Sobrevuelo en helicóptero privado por los Picos de Europa con aterrizaje en refugio de montaña para almuerzo exclusivo.',
        duration: '5 horas',
        type: 'vip',
        image: '/images/experiences/helicoptero.jpg'
      },
      {
        id: 'vip-3',
        title: 'Yate Privado Costa Cantábrica',
        description: 'Día completo en yate de lujo por la costa cantábrica. Incluye patrón, comida gourmet, champagne y actividades acuáticas.',
        duration: '8 horas',
        type: 'vip',
        image: '/images/experiences/yate.jpg'
      }
    ]
  };

  useEffect(() => {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // ✅ Carga instantánea según tipo
    if (experienceType === 'basic') {
      setExperiences(exampleExperiences.basic);
    } else if (experienceType === 'vip') {
      setExperiences(exampleExperiences.vip);
    } else {
      setExperiences([...exampleExperiences.basic, ...exampleExperiences.vip]);
    }
    
    // ✅ Intenta cargar Firestore en segundo plano
    loadExperiencesFromFirestore();
  }, [experienceType]);

  const loadExperiencesFromFirestore = async () => {
    try {
      let q = collection(db, 'experiences');
      if (experienceType) {
        q = query(q, where('type', '==', experienceType));
      }

      const querySnapshot = await getDocs(q);
      const experiencesData = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }));

      if (experiencesData.length > 0) {
        setExperiences(experiencesData);
      }
    } catch (error) {
      // Silencioso
    }
  };

  const handleContactClick = (experienceTitle) => {
    if (user) {
      alert(`Redirigiendo a contacto para: ${experienceTitle}`);
    } else {
      // ✅ Envía modo "register" para abrir en registro
      window.dispatchEvent(new CustomEvent('openLoginModal', { 
        detail: { mode: 'register' } 
      }));
    }
  };

  const getTitle = () => {
    if (experienceType === 'basic') {
      return 'Experiencias Básicas';
    } else if (experienceType === 'vip') {
      return 'Experiencias VIP';
    }
    return 'Experiencias en Cantabria';
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1><AutoTranslate>{getTitle()}</AutoTranslate></h1>
        <p className="page-subtitle">
          <AutoTranslate>
            {experienceType === 'basic' 
              ? 'Descubre Cantabria con nuestras experiencias accesibles y auténticas'
              : experienceType === 'vip'
              ? 'Vive Cantabria con el máximo lujo y exclusividad'
              : 'Selecciona entre nuestras experiencias básicas o VIP'}
          </AutoTranslate>
        </p>
      </div>

      <div className="experiences-grid">
        {experiences.map((experience) => (
          <div key={experience.id} className="experience-card">
            <div className="experience-image-container">
              <img 
                src={experience.image || '/images/experiences/default.jpg'} 
                alt={experience.title}
                className="experience-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300/2a2a2a/d4af37?text=Experiencia';
                }}
              />
              <span className={`experience-badge ${experience.type}`}>
                {experience.type === 'vip' ? '⭐ VIP' : '✓ Básica'}
              </span>
            </div>
            
            <div className="experience-content">
              <h3 className="experience-title">
                <AutoTranslate>{experience.title}</AutoTranslate>
              </h3>
              
              <p className="experience-description">
                <AutoTranslate>{experience.description}</AutoTranslate>
              </p>

              {experience.duration && (
                <p className="experience-duration">
                  ⏱️ Duración: <AutoTranslate>{experience.duration}</AutoTranslate>
                </p>
              )}

              <div className="experience-footer">
                <button 
                  className="btn-register-prompt"
                  onClick={() => handleContactClick(experience.title)}
                >
                  <AutoTranslate>{user ? 'Reservar' : 'Registrarse'}</AutoTranslate>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
