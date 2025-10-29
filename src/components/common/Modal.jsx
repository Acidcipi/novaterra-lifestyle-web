//===============================================
//💎 MODAL REUTILIZABLE NEGRO/DORADO
//===============================================
import React, { useEffect } from 'react';
import './Modal.css';

/**
 * Componente Modal profesional
 * @param {Object} props
 * @param {string} props.title - Título del modal
 * @param {React.ReactNode} props.children - Contenido del modal
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {string} props.size - Tamaño: 'small', 'medium', 'large'
 */
export default function Modal({ 
  title, 
  children, 
  onClose, 
  size = 'medium' 
}) {

  //===============================================
  // 🔒 BLOQUEAR SCROLL DEL BODY
  //===============================================
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  //===============================================
  // ⌨️ CERRAR CON TECLA ESC
  //===============================================
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  //===============================================
  // 🎨 RENDERIZADO
  //===============================================
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className={`modal-box modal-${size}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header del Modal */}
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </div>

        {/* Contenido del Modal */}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}
