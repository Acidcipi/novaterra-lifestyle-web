//===============================================
//🖼️ CONFIGURACIÓN DE IMÁGENES DEL HEADER - src/config/imageConfig.js
//===============================================

// Solo necesitas cambiar los nombres de las imágenes aquí
// Pon tus imágenes en la carpeta public/images/header/
export const HEADER_IMAGES = [
  'cabarceno.jpg',
  'tina-menor.jpg',
  'castro.jpg',
  'saltacaballo.jpg',
  'la-magdalena.jpg'
];

// Ruta base donde están las imágenes
export const IMAGE_BASE_PATH = '/images/header/';

// Configuración del carrusel
export const CAROUSEL_CONFIG = {
  autoPlayInterval: 5000, // 5 segundos
  showIndicators: true,
  showNavigation: true
};

// Imagen por defecto si alguna falla al cargar
export const FALLBACK_IMAGE = 'https://via.placeholder.com/1200x600/1a1a1a/d4af37?text=Novaterra+Cantabria';