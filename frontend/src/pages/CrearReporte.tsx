import React, { useState } from 'react';
import { Send, X } from 'lucide-react';

export default function CrearReporte() {
  const [ambiente, setAmbiente] = useState('');
  const [equipo, setEquipo] = useState('');
  const [tipoReporte, setTipoReporte] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [prioridad, setPrioridad] = useState('Normal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const datosReporte = { ambiente, equipo, tipoReporte, descripcion, prioridad };
    console.log('Reporte enviado:', datosReporte);
    alert('Reporte enviado con éxito');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>1. Crear reporte</h2>
      <hr style={styles.divider} />

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Ambiente */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Ambiente</label>
          <select 
            value={ambiente} 
            onChange={(e) => setAmbiente(e.target.value)} 
            style={styles.select}
            required
          >
            <option value="">Seleccionar</option>
            <option value="ambiente_1">Ambiente 101 - Sistemas</option>
            <option value="ambiente_2">Ambiente 102 - Redes</option>
            <option value="ambiente_3">Laboratorio de Datos</option>
          </select>
        </div>

        {/* Equipo */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Equipo</label>
          <select 
            value={equipo} 
            onChange={(e) => setEquipo(e.target.value)} 
            style={styles.select}
            required
          >
            <option value="">Seleccionar</option>
            <option value="pc_01">PC-01</option>
            <option value="pc_02">PC-02</option>
            <option value="servidor">Servidor Principal</option>
          </select>
        </div>

        {/* Tipo de reporte */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Tipo de reporte</label>
          <select 
            value={tipoReporte} 
            onChange={(e) => setTipoReporte(e.target.value)} 
            style={styles.select}
            required
          >
            <option value="">Seleccionar</option>
            <option value="falla_hardware">Falla de Hardware</option>
            <option value="falla_software">Falla de Software</option>
            <option value="mantenimiento">Mantenimiento Preventivo</option>
          </select>
        </div>

        {/* Descripción */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Descripción</label>
          <textarea 
            value={descripcion} 
            onChange={(e) => setDescripcion(e.target.value)} 
            rows={4} 
            style={styles.textarea}
            placeholder="Describe el problema o detalle del reporte..."
            required
          />
        </div>

        {/* Prioridad */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Prioridad</label>
          <select 
            value={prioridad} 
            onChange={(e) => setPrioridad(e.target.value)} 
            style={styles.select}
          >
            <option value="Baja">Baja</option>
            <option value="Normal">Normal</option>
            <option value="Alta">Alta</option>
            <option value="Urgente">Urgente</option>
          </select>
        </div>

        {/* Botones */}
        <div style={styles.buttonGroup}>
          <button type="button" style={styles.cancelBtn} onClick={() => alert('Operación cancelada')}>
            <X size={16} /> Cancelar
          </button>
          <button type="submit" style={styles.submitBtn}>
            <Send size={16} /> Enviar reporte
          </button>
        </div>
      </form>
    </div>
  );
}

// Estilos rápidos en objeto JS para facilitar su uso directo
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '500px',
    margin: '20px auto',
    padding: '24px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    fontFamily: 'system-ui, sans-serif'
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '20px',
    color: '#1e293b'
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #e2e8f0',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#475569'
  },
  select: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#f8fafc',
    fontSize: '14px',
    outline: 'none'
  },
  textarea: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#f8fafc',
    fontSize: '14px',
    resize: 'vertical',
    outline: 'none'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '12px'
  },
  cancelBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 16px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    color: '#475569',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500'
  },
  submitBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 16px',
    border: 'none',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500'
  }
}; 