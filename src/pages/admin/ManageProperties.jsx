//===============================================
//🏘️ GESTOR DE PROPIEDADES - CRUD COMPLETO
//===============================================
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useUserRole } from '../../hooks/useUserRole';
import Modal from '../../components/common/Modal';
import './ManageProperties.css';

export default function ManageProperties() {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const { isOwner } = useUserRole();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, property: null });
  const [searchTerm, setSearchTerm] = useState('');

  //===============================================
  // 📊 CARGAR PROPIEDADES
  //===============================================
  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    try {
      const propertiesQuery = query(
        collection(db, 'properties'),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(propertiesQuery);
      const propertiesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProperties(propertiesData);
    } catch (error) {
      console.error('Error cargando propiedades:', error);
    } finally {
      setLoading(false);
    }
  }

  //===============================================
  // 🗑️ ELIMINAR PROPIEDAD
  //===============================================
  async function handleDelete() {
    if (!deleteModal.property) return;

    try {
      await deleteDoc(doc(db, 'properties', deleteModal.property.id));
      setProperties(prev => prev.filter(p => p.id !== deleteModal.property.id));
      setDeleteModal({ show: false, property: null });
    } catch (error) {
      console.error('Error eliminando propiedad:', error);
      alert('Error al eliminar la propiedad');
    }
  }

  //===============================================
  // 🔍 FILTRAR PROPIEDADES
  //===============================================
  const filteredProperties = properties.filter(property =>
    property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //===============================================
  // 🎨 RENDERIZADO
  //===============================================
  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Cargando propiedades...</p>
      </div>
    );
  }

  return (
    <div className="manage-properties">
      {/* Header */}
      <div className="manage-header">
        <div>
          <h1>🏘️ Gestionar Propiedades</h1>
          <p className="manage-subtitle">
            Total: <strong>{properties.length}</strong> propiedades
          </p>
        </div>
        <button 
          className="btn-add-new"
          onClick={() => navigate('/admin/properties/new')}
        >
          ➕ Añadir Nueva Propiedad
        </button>
      </div>

      {/* Buscador */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Buscar por título o ubicación..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Tabla de Propiedades */}
      {filteredProperties.length === 0 ? (
        <div className="no-properties">
          <p>No hay propiedades registradas</p>
          <button 
            className="btn-add-first"
            onClick={() => navigate('/admin/properties/new')}
          >
            Añadir la primera propiedad
          </button>
        </div>
      ) : (
        <div className="properties-table-container">
          <table className="properties-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Título</th>
                <th>Ubicación</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.map(property => (
                <tr key={property.id}>
                  <td>
                    <img 
                      src={property.images?.[0] || '/placeholder.jpg'} 
                      alt={property.title}
                      className="property-thumbnail"
                    />
                  </td>
                  <td className="property-title">{property.title}</td>
                  <td>{property.location}</td>
                  <td className="property-price">{property.price?.toLocaleString()}€</td>
                  <td>
                    <span className={`status-badge status-${property.status || 'active'}`}>
                      {property.status || 'active'}
                    </span>
                  </td>
                  <td className="property-actions">
                    <button 
                      className="btn-action btn-view"
                      onClick={() => navigate(`/property/${property.id}`)}
                      title="Ver"
                    >
                      👁️
                    </button>
                    <button 
                      className="btn-action btn-edit"
                      onClick={() => navigate(`/admin/properties/edit/${property.id}`)}
                      title="Editar"
                    >
                      ✏️
                    </button>
                    {isOwner && (
                      <button 
                        className="btn-action btn-delete"
                        onClick={() => setDeleteModal({ show: true, property })}
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación */}
      {deleteModal.show && (
        <Modal
          title="🗑️ Confirmar Eliminación"
          onClose={() => setDeleteModal({ show: false, property: null })}
        >
          <div className="delete-modal-content">
            <p>¿Estás seguro de que deseas eliminar la propiedad:</p>
            <strong>{deleteModal.property?.title}</strong>
            <p className="warning-text">⚠️ Esta acción no se puede deshacer</p>
            <div className="modal-actions">
              <button 
                className="btn-cancel"
                onClick={() => setDeleteModal({ show: false, property: null })}
              >
                Cancelar
              </button>
              <button 
                className="btn-confirm-delete"
                onClick={handleDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
