//===============================================
//🏠 GESTIÓN DE PROPIEDADES - COMPLETO
//===============================================
import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import './ManageProperties.css';

export default function ManageProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showNewPropertyForm, setShowNewPropertyForm] = useState(false);
  const [newProperty, setNewProperty] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    type: 'venta',
    status: 'active',
    images: []
  });

  // Cargar propiedades
  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'properties'));
      const propertiesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProperties(propertiesData);
    } catch (error) {
      console.error('Error cargando propiedades:', error);
      alert('Error al cargar propiedades');
    } finally {
      setLoading(false);
    }
  };

  // Eliminar propiedad
  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta propiedad?')) return;

    try {
      await deleteDoc(doc(db, 'properties', id));
      setProperties(properties.filter(p => p.id !== id));
      alert('✅ Propiedad eliminada correctamente');
    } catch (error) {
      console.error('Error eliminando propiedad:', error);
      alert('❌ Error al eliminar propiedad');
    }
  };

  // Editar propiedad
  const handleEdit = (property) => {
    setEditingId(property.id);
    setEditForm(property);
  };

  const handleSaveEdit = async () => {
    try {
      const propertyRef = doc(db, 'properties', editingId);
      await updateDoc(propertyRef, editForm);
      
      setProperties(properties.map(p => 
        p.id === editingId ? { ...p, ...editForm } : p
      ));
      
      setEditingId(null);
      setEditForm({});
      alert('✅ Propiedad actualizada correctamente');
    } catch (error) {
      console.error('Error actualizando propiedad:', error);
      alert('❌ Error al actualizar propiedad');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  // Crear nueva propiedad
  const handleCreateProperty = async (e) => {
    e.preventDefault();
    
    try {
      const docRef = await collection(db, 'properties').add({
        ...newProperty,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      setProperties([...properties, { id: docRef.id, ...newProperty }]);
      setNewProperty({
        title: '',
        description: '',
        price: '',
        location: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        type: 'venta',
        status: 'active',
        images: []
      });
      setShowNewPropertyForm(false);
      alert('✅ Propiedad creada correctamente');
    } catch (error) {
      console.error('Error creando propiedad:', error);
      alert('❌ Error al crear propiedad');
    }
  };

  if (loading) {
    return <div className="loading-spinner">⏳ Cargando propiedades...</div>;
  }

  return (
    <div className="manage-properties">
      <div className="properties-header">
        <h2>🏠 Gestión de Propiedades</h2>
        <button 
          className="btn-new-property"
          onClick={() => setShowNewPropertyForm(!showNewPropertyForm)}
        >
          {showNewPropertyForm ? '❌ Cancelar' : '➕ Nueva Propiedad'}
        </button>
      </div>

      {/* FORMULARIO NUEVA PROPIEDAD */}
      {showNewPropertyForm && (
        <form className="property-form" onSubmit={handleCreateProperty}>
          <h3>➕ Crear Nueva Propiedad</h3>
          
          <div className="form-grid">
            <input
              type="text"
              placeholder="Título"
              value={newProperty.title}
              onChange={(e) => setNewProperty({...newProperty, title: e.target.value})}
              required
            />
            
            <input
              type="text"
              placeholder="Ubicación"
              value={newProperty.location}
              onChange={(e) => setNewProperty({...newProperty, location: e.target.value})}
              required
            />
            
            <input
              type="number"
              placeholder="Precio (€)"
              value={newProperty.price}
              onChange={(e) => setNewProperty({...newProperty, price: e.target.value})}
              required
            />
            
            <input
              type="number"
              placeholder="Habitaciones"
              value={newProperty.bedrooms}
              onChange={(e) => setNewProperty({...newProperty, bedrooms: e.target.value})}
            />
            
            <input
              type="number"
              placeholder="Baños"
              value={newProperty.bathrooms}
              onChange={(e) => setNewProperty({...newProperty, bathrooms: e.target.value})}
            />
            
            <input
              type="number"
              placeholder="Área (m²)"
              value={newProperty.area}
              onChange={(e) => setNewProperty({...newProperty, area: e.target.value})}
            />
            
            <select
              value={newProperty.type}
              onChange={(e) => setNewProperty({...newProperty, type: e.target.value})}
            >
              <option value="venta">Venta</option>
              <option value="alquiler">Alquiler</option>
            </select>
            
            <select
              value={newProperty.status}
              onChange={(e) => setNewProperty({...newProperty, status: e.target.value})}
            >
              <option value="active">Activa</option>
              <option value="sold">Vendida</option>
              <option value="rented">Alquilada</option>
            </select>
          </div>
          
          <textarea
            placeholder="Descripción"
            value={newProperty.description}
            onChange={(e) => setNewProperty({...newProperty, description: e.target.value})}
            rows="4"
            required
          />
          
          <button type="submit" className="btn-save">💾 Crear Propiedad</button>
        </form>
      )}

      {/* LISTA DE PROPIEDADES */}
      <div className="properties-list">
        <p className="properties-count">📊 Total: {properties.length} propiedades</p>
        
        {properties.length === 0 ? (
          <div className="empty-state">
            <p>No hay propiedades creadas</p>
            <button onClick={() => setShowNewPropertyForm(true)}>
              ➕ Crear primera propiedad
            </button>
          </div>
        ) : (
          <div className="properties-grid">
            {properties.map(property => (
              <div key={property.id} className="property-card">
                {editingId === property.id ? (
                  // MODO EDICIÓN
                  <div className="property-edit-form">
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                      placeholder="Título"
                    />
                    
                    <input
                      type="text"
                      value={editForm.location}
                      onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                      placeholder="Ubicación"
                    />
                    
                    <input
                      type="number"
                      value={editForm.price}
                      onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                      placeholder="Precio"
                    />
                    
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                      placeholder="Descripción"
                      rows="3"
                    />
                    
                    <div className="edit-actions">
                      <button onClick={handleSaveEdit} className="btn-save">💾 Guardar</button>
                      <button onClick={handleCancelEdit} className="btn-cancel">❌ Cancelar</button>
                    </div>
                  </div>
                ) : (
                  // MODO VISTA
                  <>
                    <div className="property-info">
                      <h3>{property.title}</h3>
                      <p className="property-location">📍 {property.location}</p>
                      <p className="property-price">💰 {Number(property.price).toLocaleString('es-ES')}€</p>
                      <p className="property-description">{property.description?.substring(0, 100)}...</p>
                      
                      <div className="property-meta">
                        <span>{property.bedrooms || 0} hab</span>
                        <span>{property.bathrooms || 0} baños</span>
                        <span>{property.area || 0} m²</span>
                      </div>
                      
                      <div className="property-status">
                        <span className={`badge badge-${property.status}`}>
                          {property.status === 'active' ? '✅ Activa' : 
                           property.status === 'sold' ? '🏷️ Vendida' : '🔑 Alquilada'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="property-actions">
                      <button onClick={() => handleEdit(property)} className="btn-edit">
                        ✏️ Editar
                      </button>
                      <button onClick={() => handleDelete(property.id)} className="btn-delete">
                        🗑️ Eliminar
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
