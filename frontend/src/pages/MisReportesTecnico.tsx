import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MisReportesTecnico.css";
import { api } from "../services/api";

interface Reporte {
  id_original: number;
  id: string;
  equipo: string;
  ambiente: string;
  fecha: string;
  estado: "Pendiente" | "En proceso" | "Resuelto";
  descripcion: string;
}

const mapearEstado = (
  estado: string
): Reporte["estado"] => {
  if (estado === "pendiente") {
    return "Pendiente";
  }

  if (
    estado === "en_revision" ||
    estado === "En proceso"
  ) {
    return "En proceso";
  }

  return "Resuelto";
};

const desmapearEstado = (
  estado: Reporte["estado"]
): "pendiente" | "en_revision" | "resuelto" => {
  if (estado === "Pendiente") {
    return "pendiente";
  }

  if (estado === "En proceso") {
    return "en_revision";
  }

  return "resuelto";
};

const MisReportesTecnico: React.FC = () => {
  const navigate = useNavigate();

  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actualizandoId, setActualizandoId] =
    useState<number | null>(null);

  useEffect(() => {
    const obtenerReportes = async () => {
      try {
        setCargando(true);
        setError(null);

        const datos = await api.getReportes();

        const reportesFormateados: Reporte[] =
          datos.map((r: any) => ({
            id_original: r.id_reporte,

            id: `#${String(
              r.id_reporte
            ).padStart(3, "0")}`,

            equipo:
              r.modelo ??
              r.serial ??
              r.tipo ??
              r.equipo ??
              "Equipo",

            ambiente:
              r.id_ambiente ??
              r.ambiente ??
              "Sin ambiente",

            fecha: r.fecha_reporte
              ? new Date(
                  r.fecha_reporte
                ).toLocaleDateString("es-CO")
              : "Sin fecha",

            estado: mapearEstado(
              r.estado_reporte ??
                r.estado ??
                "pendiente"
            ),

            descripcion:
              r.descripcion ??
              "Sin descripción"
          }));

        setReportes(reportesFormateados);

      } catch (err) {
        console.error(
          "Error al cargar reportes:",
          err
        );

        setError(
          "No se pudieron cargar los reportes. Verifica que el backend esté corriendo."
        );
      } finally {
        setCargando(false);
      }
    };

    obtenerReportes();
  }, []);

  const cambiarEstadoReporte = async (
    idOriginal: number,
    nuevoEstado: Reporte["estado"]
  ) => {
    setActualizandoId(idOriginal);

    const estadoBD =
      desmapearEstado(nuevoEstado);

    try {
      const usuarioGuardado =
        localStorage.getItem("usuario");

      if (!usuarioGuardado) {
        alert(
          "No se encontró el usuario actual."
        );
        return;
      }

      const usuario =
        JSON.parse(usuarioGuardado);

      if (!usuario.id_usuario) {
        alert(
          "No se encontró el identificador del técnico."
        );
        return;
      }

      await api.actualizarEstadoReporte(
        idOriginal,
        {
          estado: estadoBD,
          id_usuario:
            usuario.id_usuario
        }
      );

      setReportes((prev) =>
        prev.map((reporte) =>
          reporte.id_original === idOriginal
            ? {
                ...reporte,
                estado: nuevoEstado
              }
            : reporte
        )
      );

    } catch (err) {
      console.error(
        "Error cambiando el estado:",
        err
      );

      alert(
        err instanceof Error
          ? err.message
          : "No se pudo actualizar el estado."
      );
    } finally {
      setActualizandoId(null);
    }
  };

  const reportesFiltrados =
    reportes.filter((reporte) => {
      const coincideFiltro =
        filtro === "Todos" ||
        reporte.estado === filtro;

      const textoBusqueda =
        `${reporte.id} ${reporte.equipo} ${reporte.ambiente} ${reporte.descripcion}`
          .toLowerCase();

      const coincideBusqueda =
        textoBusqueda.includes(
          busqueda.toLowerCase()
        );

      return (
        coincideFiltro &&
        coincideBusqueda
      );
    });

  const contarEstado = (
    estado: string
  ) => {
    return reportes.filter(
      (reporte) =>
        reporte.estado === estado
    ).length;
  };

  return (
    <div className="mis-reportes-page">

      <header className="reportes-header">

        <div className="header-left">

          <button
            className="btn-regresar"
            onClick={() => navigate(-1)}
          >
            ←
          </button>

          <div>
            <span className="header-small">
              GESTIÓN TÉCNICA
            </span>

            <h1>Mis reportes</h1>
          </div>

        </div>

        <div className="usuario-tecnico">

          <div className="avatar-tecnico">
            T
          </div>

          <div>
            <strong>Técnico</strong>
            <span>Panel técnico</span>
          </div>

        </div>

      </header>

      <main className="reportes-container">

        <section className="intro-reportes">

          <div>

            <span className="section-label">
              SEGUIMIENTO
            </span>

            <h2>Mis reportes</h2>

            <p>
              Consulta y realiza seguimiento al
              estado de los reportes registrados.
            </p>

          </div>

          <div className="total-reportes">

            <span>Total</span>

            <strong>
              {reportes.length}
            </strong>

            <small>
              reportes registrados
            </small>

          </div>

        </section>

        <section className="resumen-reportes">

          <div className="resumen-item">

            <div className="resumen-icon pendiente-icon">
              !
            </div>

            <div>
              <span>Pendientes</span>

              <strong>
                {contarEstado("Pendiente")}
              </strong>
            </div>

          </div>

          <div className="resumen-item">

            <div className="resumen-icon proceso-icon">
              ↻
            </div>

            <div>
              <span>En proceso</span>

              <strong>
                {contarEstado("En proceso")}
              </strong>
            </div>

          </div>

          <div className="resumen-item">

            <div className="resumen-icon resuelto-icon">
              ✓
            </div>

            <div>
              <span>Resueltos</span>

              <strong>
                {contarEstado("Resuelto")}
              </strong>
            </div>

          </div>

        </section>

        <section className="herramientas-reportes">

          <div className="buscador">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Buscar por equipo, ID, ambiente o descripción..."
              value={busqueda}
              onChange={(e) =>
                setBusqueda(
                  e.target.value
                )
              }
            />

          </div>

          <div className="filtros">

            {[
              "Todos",
              "Pendiente",
              "En proceso",
              "Resuelto"
            ].map((estado) => (

              <button
                key={estado}
                className={`filtro-btn ${
                  filtro === estado
                    ? "activo"
                    : ""
                }`}
                onClick={() =>
                  setFiltro(estado)
                }
              >
                {estado}
              </button>

            ))}

          </div>

        </section>

        <section className="lista-reportes">

          <div className="lista-header">

            <div>

              <span className="section-label">
                REGISTROS
              </span>

              <h3>
                Reportes registrados
              </h3>

            </div>

            <span className="cantidad-resultados">
              {reportesFiltrados.length} resultados
            </span>

          </div>

          {cargando ? (

            <div className="sin-resultados">

              <p>
                Cargando reportes...
              </p>

            </div>

          ) : error ? (

            <div className="sin-resultados">

              <p>
                {error}
              </p>

            </div>

          ) : reportesFiltrados.length > 0 ? (

            <div className="reportes-lista">

              {reportesFiltrados.map(
                (reporte) => (

                  <article
                    className="reporte-card"
                    key={
                      reporte.id_original
                    }
                  >

                    <div className="reporte-identificador">

                      <span>ID</span>

                      <strong>
                        {reporte.id}
                      </strong>

                    </div>

                    <div className="reporte-info-principal">

                      <div className="equipo-linea">

                        <h4>
                          {reporte.equipo}
                        </h4>

                        <div className="selector-estado-container">

                          <select
                            className={`estado-select ${
                              reporte.estado ===
                              "Pendiente"
                                ? "estado-pendiente"
                                : reporte.estado ===
                                  "En proceso"
                                ? "estado-proceso"
                                : "estado-resuelto"
                            }`}
                            value={
                              reporte.estado
                            }
                            disabled={
                              actualizandoId ===
                              reporte.id_original
                            }
                            onChange={(e) =>
                              cambiarEstadoReporte(
                                reporte.id_original,
                                e.target
                                  .value as Reporte["estado"]
                              )
                            }
                          >

                            <option value="Pendiente">
                              Pendiente
                            </option>

                            <option value="En proceso">
                              En proceso
                            </option>

                            <option value="Resuelto">
                              Resuelto
                            </option>

                          </select>

                        </div>

                      </div>

                      <div className="datos-reporte">

                        <span>
                          📍{" "}
                          {reporte.ambiente}
                        </span>

                        <span>
                          📅{" "}
                          {reporte.fecha}
                        </span>

                      </div>

                      <p>
                        {reporte.descripcion}
                      </p>

                    </div>

                    <button
                      className="btn-detalle"
                      onClick={() =>
                        navigate(
                          `/detalle-reporte/${reporte.id_original}`
                        )
                      }
                    >
                      Ver detalle
                      <span>→</span>
                    </button>

                  </article>

                )
              )}

            </div>

          ) : (

            <div className="sin-resultados">

              <div className="sin-resultados-icon">
                🔎
              </div>

              <h3>
                No encontramos reportes
              </h3>

              <p>
                Intenta cambiar los filtros o
                realizar otra búsqueda.
              </p>

            </div>

          )}

        </section>

      </main>

      <footer className="footer">
        © 2026 DataVentor | SENA
      </footer>

    </div>
  );
}

export default MisReportesTecnico;