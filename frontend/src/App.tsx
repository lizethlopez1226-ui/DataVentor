import React, { useState } from 'react';
import { 
  Home, 
  PlusCircle, 
  Monitor, 
  Building2, 
  Users, 
  FileText, 
  LogOut, 
  User, 
  Send, 
  X,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Wrench
} from 'lucide-react';

export default function App() {
  const [seccion, setSeccion] = useState<'inicio' | 'crearReporte' | 'misReportes'>('misReportes');

  // Estados del formulario
  const [ambiente, setAmbiente] = useState('');
  const [equipo, setEquipo] = useState('');
  const [tipoReporte, setTipoReporte] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [prioridad, setPrioridad] = useState('Normal');

  // Datos simulados de reportes
  const [listaReportes] = useState([
    { id: '#001', fecha: '2026-08-28', ambiente: 'Ambiente 101 - Sistemas', equipo: 'HP 250', tipo: 'Falla de Hardware', estado: 'Pendiente', prioridad: 'Alta' },
    { id: '#002', fecha: '2026-08-29', ambiente: 'Ambiente 102 - Redes', equipo: 'Dell Optiplex', tipo: 'Falla de Software', estado: 'En Proceso', prioridad: 'Normal' },
    { id: '#003', fecha: '2026-08-30', ambiente: 'Ambiente 101 - Sistemas', equipo: 'Lenovo ThinkCentre', tipo: 'Falla de Hardware', estado: 'Resuelto', prioridad: 'Urgente' }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Reporte enviado correctamente');
    setSeccion('misReportes');
  };

  return (
    <div style={styles.appContainer}>
      
      {/* BARRA SUPERIOR (NAVBAR) */}
      <header style={styles.navbar}>
        <div style={styles.brand}>DataVentor</div>

        <nav style={styles.navMenu}>
          <button 
            onClick={() => setSeccion('inicio')} 
            style={{ ...styles.navItem, fontWeight: seccion === 'inicio' ? 'bold' : 'normal' }}
          >
            <Home size={16} /> Inicio
          </button>

          <button 
            onClick={() => setSeccion('crearReporte')} 
            style={{ ...styles.navItem, fontWeight: seccion === 'crearReporte' ? 'bold' : 'normal' }}
          >
            <PlusCircle size={16} /> Crear Reporte
          </button>

          <button 
            onClick={() => setSeccion('misReportes')} 
            style={{ ...styles.navItem, fontWeight: seccion === 'misReportes' ? 'bold' : 'normal' }}
          >
            <FileText size={16} /> Mis Reportes
          </button>

          <button style={styles.navItem}><Monitor size={16} /> Equipos</button>
          <button style={styles.navItem}><Building2 size={16} /> Ambiente</button>
          <button style={styles.navItem}><Users size={16} /> Usuarios</button>
          <button style={styles.navItem}><LogOut size={16} /> Cerrar Sesión</button>
        </nav>

        <div style={styles.userBadge}>
          <User size={16} /> Aprendiz
        </div>
      </header>

      {/* ÁREA DE CONTENIDO */}
      <main style={styles.mainContent}>
        
        {/* VISTA 1: TABLA "MIS REPORTES" */}
        {seccion === 'misReportes' && (
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 style={styles.pageTitle}>Mis Reportes 📋</h2>
                <p style={styles.pageSubtitle}>Listado de incidencias y su estado actual en DataVentor</p>
              </div>
              <button 
                onClick={() => setSeccion('crearReporte')} 
                style={styles.btnPrimary}
              >
                <PlusCircle size={16} /> Nuevo Reporte
              </button>
            </div>

            <div style={styles.tableCard}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeader}>
                    <th style={{ padding: '12px' }}>ID</th>
                    <th style={{ padding: '12px' }}>Fecha</th>
                    <th style={{ padding: '12px' }}>Ambiente</th>
                    <th style={{ padding: '12px' }}>Equipo</th>
                    <th style={{ padding: '12px' }}>Tipo</th>
                    <th style={{ padding: '12px' }}>Prioridad</th>
                    <th style={{ padding: '12px' }}>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {listaReportes.map((rep) => (
                    <tr key={rep.id} style={styles.tableRow}>
                      <td style={{ padding: '14px 12px', fontWeight: 'bold' }}>{rep.id}</td>
                      <td style={{ padding: '14px 12px', color: '#64748b' }}>{rep.fecha}</td>
                      <td style={{ padding: '14px 12px' }}>{rep.ambiente}</td>
                      <td style={{ padding: '14px 12px' }}>{rep.equipo}</td>
                      <td style={{ padding: '14px 12px' }}>{rep.tipo}</td>
                      <td style={{ padding: '14px 12px' }}>
                        <span style={getBadgePrioridad(rep.prioridad)}>{rep.prioridad}</span>
                      </td>
                      <td style={{ padding: '14px 12px' }}>
                        <span style={getBadgeEstado(rep.estado)}>
                          {rep.estado === 'Pendiente' && <Clock size={12} />}
                          {rep.estado === 'En Proceso' && <Wrench size={12} />}
                          {rep.estado === 'Resuelto' && <CheckCircle2 size={12} />}
                          {rep.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VISTA 2: CREAR REPORTE */}
        {seccion === 'crearReporte' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={styles.pageTitle}>1. Crear reporte 👋</h2>
            <p style={styles.pageSubtitle}>Diligencia la información para registrar la incidencia en DataVentor</p>

            <div style={styles.formCard}>
              <form onSubmit={handleSubmit} style={styles.formLayout}>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Ambiente</label>
                  <select 
                    value={ambiente} 
                    onChange={(e) => setAmbiente(e.target.value)} 
                    style={styles.selectInput}
                    required
                  >
                    <option value="">Seleccionar</option>
                    <option value="101">Ambiente 101 - Sistemas</option>
                    <option value="102">Ambiente 102 - Redes</option>
                  </select>
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Equipo</label>
                  <select 
                    value={equipo} 
                    onChange={(e) => setEquipo(e.target.value)} 
                    style={styles.selectInput}
                    required
                  >
                    <option value="">Seleccionar</option>
                    <option value="hp">HP 250</option>
                    <option value="dell">Dell Optiplex</option>
                    <option value="lenovo">Lenovo ThinkCentre</option>
                  </select>
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Tipo de reporte</label>
                  <select 
                    value={tipoReporte} 
                    onChange={(e) => setTipoReporte(e.target.value)} 
                    style={styles.selectInput}
                    required
                  >
                    <option value="">Seleccionar</option>
                    <option value="hardware">Falla de Hardware</option>
                    <option value="software">Falla de Software</option>
                  </select>
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Descripción</label>
                  <textarea 
                    value={descripcion} 
                    onChange={(e) => setDescripcion(e.target.value)} 
                    rows={4}
                    placeholder="Describe el problema o detalle del informe..."
                    style={styles.textareaInput}
                    required
                  />
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Prioridad</label>
                  <select 
                    value={prioridad} 
                    onChange={(e) => setPrioridad(e.target.value)} 
                    style={styles.selectInput}
                  >
                    <option value="Normal">Normal</option>
                    <option value="Alta">Alta</option>
                    <option value="Urgente">Urgente</option>
                  </select>
                </div>

                <div style={styles.buttonRow}>
                  <button type="button" style={styles.btnSecondary} onClick={() => setSeccion('misReportes')}>
                    <X size={16} /> Cancelar
                  </button>
                  <button type="submit" style={styles.btnPrimary}>
                    <Send size={16} /> Enviar reporte
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* VISTA 3: INICIO */}
        {seccion === 'inicio' && (
          <div>
            <h2 style={styles.pageTitle}>Bienvenido Aprendiz 👋</h2>
            <p style={styles.pageSubtitle}>Resumen general del sistema</p>

            <div style={styles.cardsGrid}>
              <div style={{ ...styles.statCard, borderBottom: '4px solid #8b5cf6' }}>
                <Monitor size={22} color="#000" />
                <h3 style={styles.statNumber}>248</h3>
                <span style={styles.statLabel}>Equipos Totales</span>
              </div>

              <div style={{ ...styles.statCard, borderBottom: '4px solid #000' }}>
                <Building2 size={22} color="#000" />
                <h3 style={styles.statNumber}>15</h3>
                <span style={styles.statLabel}>Ambientes</span>
              </div>

              <div style={{ ...styles.statCard, borderBottom: '4px solid #eab308' }}>
                <AlertTriangle size={22} color="#000" />
                <h3 style={styles.statNumber}>23</h3>
                <span style={styles.statLabel}>Pendientes</span>
              </div>

              <div style={{ ...styles.statCard, borderBottom: '4px solid #22c55e' }}>
                <Users size={22} color="#000" />
                <h3 style={styles.statNumber}>36</h3>
                <span style={styles.statLabel}>Usuarios</span>
              </div>
            </div>

            <div style={styles.dashboardBody}>
              <div style={styles.actionCard}>
                <h4 style={styles.cardSectionTitle}>Acciones Rápidas</h4>
                <div style={styles.actionButtons}>
                  <button style={styles.btnGradientAction} onClick={() => setSeccion('crearReporte')}>➕ Crear Reporte</button>
                  <button style={styles.btnGradientAction} onClick={() => setSeccion('misReportes')}>📑 Ver Mis Reportes</button>
                </div>
              </div>

              <div style={styles.tableCard}>
                <h4 style={styles.cardSectionTitle}>⚙️ Últimos Reportes</h4>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.tableHeader}>
                      <th style={{ padding: '10px' }}>ID</th>
                      <th style={{ padding: '10px' }}>Usuario</th>
                      <th style={{ padding: '10px' }}>Equipo</th>
                      <th style={{ padding: '10px' }}>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={styles.tableRow}>
                      <td style={{ padding: '12px 10px' }}>#001</td>
                      <td>Juan acosta</td>
                      <td>HP 250</td>
                      <td><b>⚠️ Pendiente</b></td>
                    </tr>
                    <tr style={styles.tableRow}>
                      <td style={{ padding: '12px 10px' }}>#002</td>
                      <td>Santiago Martinezs</td>
                      <td>Dell Optiplex</td>
                      <td><b>🛠️ En Proceso</b></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* PIE DE PÁGINA */}
      <footer style={styles.footer}>
        © 2026 DataVentor | SENA
      </footer>

    </div>
  );
}

// FUNCIONES PARA BADGES DE ESTADO Y PRIORIDAD
const getBadgeEstado = (estado: string): React.CSSProperties => {
  let bg = '#fef3c7';
  let color = '#d97706';
  if (estado === 'En Proceso') { bg = '#e0f2fe'; color = '#0284c7'; }
  if (estado === 'Resuelto') { bg = '#dcfce7'; color = '#15803d'; }
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    backgroundColor: bg,
    color: color,
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold'
  };
};

const getBadgePrioridad = (prioridad: string): React.CSSProperties => {
  let color = '#475569';
  if (prioridad === 'Alta') color = '#eab308';
  if (prioridad === 'Urgente') color = '#ef4444';
  return {
    color: color,
    fontWeight: 'bold',
    fontSize: '12px'
  };
};

const styles: { [key: string]: React.CSSProperties } = {
  appContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#eef2f6',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
  },
  navbar: {
    background: 'linear-gradient(90deg, #6b21a8 0%, #3b82f6 100%)',
    color: 'white',
    padding: '12px 30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  brand: {
    fontSize: '22px',
    fontWeight: 'bold'
  },
  navMenu: {
    display: 'flex',
    gap: '20px'
  },
  navItem: {
    background: 'none',
    border: 'none',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  userBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: '6px 14px',
    borderRadius: '16px',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  mainContent: {
    flex: 1,
    padding: '30px 40px'
  },
  pageTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#000000',
    margin: 0
  },
  pageSubtitle: {
    fontSize: '12px',
    color: '#64748b',
    marginTop: '2px',
    marginBottom: '20px'
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginBottom: '24px'
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
  },
  statNumber: {
    fontSize: '26px',
    fontWeight: 'bold',
    margin: '8px 0 2px 0',
    color: '#000000'
  },
  statLabel: {
    fontSize: '12px',
    color: '#64748b'
  },
  dashboardBody: {
    display: 'grid',
    gridTemplateColumns: '260px 1fr',
    gap: '20px'
  },
  actionCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
  },
  cardSectionTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    margin: '0 0 16px 0',
    color: '#000000'
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  btnGradientAction: {
    background: 'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)',
    color: 'white',
    border: 'none',
    padding: '10px 14px',
    borderRadius: '10px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    textAlign: 'left'
  },
  tableCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '13px'
  },
  tableHeader: {
    backgroundColor: '#fae8ff',
    textAlign: 'left',
    color: '#000000'
  },
  tableRow: {
    borderBottom: '1px solid #f1f5f9'
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '28px 32px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  formLayout: {
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
    fontSize: '13px',
    fontWeight: '600',
    color: '#1e293b'
  },
  selectInput: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    fontSize: '13px',
    outline: 'none'
  },
  textareaInput: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    fontSize: '13px',
    outline: 'none',
    resize: 'vertical'
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '10px'
  },
  btnSecondary: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '9px 18px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    color: '#475569',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13px'
  },
  btnPrimary: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '9px 20px',
    border: 'none',
    background: 'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)',
    color: '#ffffff',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500'
  },
  footer: {
    background: 'linear-gradient(90deg, #6b21a8 0%, #3b82f6 100%)',
    color: 'white',
    textAlign: 'center',
    padding: '12px',
    fontSize: '12px'
  }
};