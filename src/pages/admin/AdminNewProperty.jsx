// src/pages/admin/AdminNewProperty.jsx
// estos documentos solo pueden usarse en ejecución de código
import React, { useState } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '../../config/firebase';
const db = getFirestore(app);

export default function AdminNewProperty() {
  const [form, setForm] = useState({ title: '', description: '', price: '', location: '' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    try {
      await addDoc(collection(db, 'properties'), {
        ...form,
        createdAt: serverTimestamp(),
        lang: 'es'
      });
      setMsg('Guardado');
      setForm({ title: '', description: '', price: '', location: '' });
    } catch (e) {
      console.error(e);
      setMsg('Error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="page-container">
      <section className="content-section">
        <h1>Nueva Propiedad</h1>
        <form onSubmit={onSubmit} className="form">
          <label>Título<input name="title" value={form.title} onChange={onChange} required /></label>
          <label>Descripción<textarea name="description" value={form.description} onChange={onChange} required /></label>
          <label>Ubicación<input name="location" value={form.location} onChange={onChange} required /></label>
          <label>Precio<input name="price" value={form.price} onChange={onChange} required /></label>
          <button type="submit" disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</button>
        </form>
        {msg && <p>{msg}</p>}
      </section>
    </main>
  );
}