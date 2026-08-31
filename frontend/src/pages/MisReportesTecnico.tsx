import React, { useState } from "react";
import "./MisReportesTecnico.css";

interface Reporte {
  id: string;
  equipo: string;
  ambiente: string;
  fecha: string;
  estado: "Pendiente" | "En proceso" | "Resuelto";
  descripcion: string;
}

const MisReportesTecnico: React.FC = () => {
  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const reportes: Reporte[] = [
    {
      id: "#001",
      equipo: "PC-025",
      ambiente: "Ambiente 302",
      fecha: "25/08/2026",
      estado: "Pendiente",
      descripcion: "Mouse no responde",
    },
    {
      id: "#002",
      equipo: "PC-018",
      ambiente: "Ambiente 301",
      fecha: "24/08/2026",
      estado: "En proceso",
      descripcion: "Problema con teclado",
    },
    {
      id: "#003",
      equipo: "PC-010",
      ambiente: "Ambiente 205",
      fecha: "20/08/2026",
      estado: "Resuelto",
      descripcion: "Equipo no encendía",
    },
    {
      id: "#004",
      equipo: "PORT-032",
      ambiente: "Ambiente 104",
      fecha: "18/08/2026",
      estado: "Resuelto",
      descripcion: "Problema con conexión a internet",
    },
    {
      id: "#005",
      equipo: "PC-041",
      ambiente: "Ambiente 210",
      fecha: "17/08/2026",
      estado: "Pendiente",
      descripcion: "Pantalla presenta parpadeos",
    },
  ];

  const reportesFiltrados = reportes.filter((reporte) => {
    const coincideFiltro =
      filtro === "Todos" || reporte.estado === filtro;

    const textoBusqueda =
      `${reporte.id} ${reporte.equipo} ${reporte.ambiente} ${reporte.descripcion}`
        .toLowerCase();

    const coincideBusqueda = textoBusqueda.includes(
      busqueda.toLowerCase()
    );

    return coincideFiltro && coincideBusqueda;
  });

  const contarEstado = (estado: string) => {
    return reportes.filter((reporte) => reporte.estado === estado).length;
  };

  return (
    <div className="mis-reportes-page">

      {/* ENCABEZADO */}
      <header className="reportes-header">
        <div className="header-left">
          <button
            className="btn-regresar"
            onClick={() => window.history.back()}
          >
            ←
          </button>

          <div>
            <span className="header-small">GESTIÓN TÉCNICA</span>
            <h1>Mis reportes</h1>
          </div>
        </div>

        <div className="usuario-tecnico">
          <div className="avatar-tecnico">T</div>

          <div>
            <strong>Técnico</strong>
            <span>Panel técnico</span>
          </div>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="reportes-container">

        {/* PRESENTACIÓN */}
        <section className="intro-reportes">
          <div>
            <span className="section-label">SEGUIMIENTO</span>
            <h2>Mis reportes</h2>
            <p>
              Consulta y realiza seguimiento al estado de los reportes
              registrados.
            </p>
          </div>

          <div className="total-reportes">
            <span>Total</span>
            <strong>{reportes.length}</strong>
            <small>reportes registrados</small>
          </div>
        </section>

        {/* RESUMEN */}
        <section className="resumen-reportes">

          <div className="resumen-item">
            <div className="resumen-icon pendiente-icon">
              !
            </div>

            <div>
              <span>Pendientes</span>
              <strong>{contarEstado("Pendiente")}</strong>
            </div>
          </div>

          <div className="resumen-item">
            <div className="resumen-icon proceso-icon">
              ↻
            </div>

            <div>
              <span>En proceso</span>
              <strong>{contarEstado("En proceso")}</strong>
            </div>
          </div>

          <div className="resumen-item">
            <div className="resumen-icon resuelto-icon">
              ✓
            </div>

            <div>
              <span>Resueltos</span>
              <strong>{contarEstado("Resuelto")}</strong>
            </div>
          </div>

        </section>

        {/* BUSCADOR */}
        <section className="herramientas-reportes">

          <div className="buscador">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Buscar por equipo, ID, ambiente o descripción..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="filtros">
            {["Todos", "Pendiente", "En proceso", "Resuelto"].map(
              (estado) => (
                <button
                  key={estado}
                  className={`filtro-btn ${
                    filtro === estado ? "activo" : ""
                  }`}
                  onClick={() => setFiltro(estado)}
                >
                  {estado}
                </button>
              )
            )}
          </div>

        </section>

        {/* LISTA */}
        <section className="lista-reportes">

          <div className="lista-header">
            <div>
              <span className="section-label">REGISTROS</span>
              <h3>Reportes registrados</h3>
            </div>

            <span className="cantidad-resultados">
              {reportesFiltrados.length} resultados
            </span>
          </div>

          {reportesFiltrados.length > 0 ? (
            <div className="reportes-lista">

              {reportesFiltrados.map((reporte) => (

                <article
                  className="reporte-card"
                  key={reporte.id}
                >

                  <div className="reporte-identificador">
                    <span>ID</span>
                    <strong>{reporte.id}</strong>
                  </div>

                  <div className="reporte-info-principal">

                    <div className="equipo-linea">
                      <h4>{reporte.equipo}</h4>

                      <span
                        className={`estado ${
                          reporte.estado === "Pendiente"
                            ? "estado-pendiente"
                            : reporte.estado === "En proceso"
                            ? "estado-proceso"
                            : "estado-resuelto"
                        }`}
                      >
                        <span className="estado-punto"></span>
                        {reporte.estado}
                      </span>
                    </div>

                    <div className="datos-reporte">

                      <span>
                        📍 {reporte.ambiente}
                      </span>

                      <span>
                        📅 {reporte.fecha}
                      </span>

                    </div>

                    <p>{reporte.descripcion}</p>

                  </div>

                  <button className="btn-detalle">
                    Ver detalle
                    <span>→</span>
                  </button>

                </article>

              ))}

            </div>
          ) : (

            <div className="sin-resultados">
              <div className="sin-resultados-icon">
                🔎
              </div>

              <h3>No encontramos reportes</h3>

              <p>
                Intenta cambiar los filtros o realizar otra búsqueda.
              </p>
            </div>

          )}

        </section>

      </main>

    </div>
  );
};

export default MisReportesTecnico;