import { useState, useEffect } from "react";
import {
  FileText,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Plus,
} from "lucide-react";

import { useNavigate, Link } from "react-router-dom";

import {
  FaClipboardList,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";

import "../styles/misReportes.css";

import { api } from "../services/api";

interface Reporte {
  id_reporte: number;
  id_equipo: number;
  id_usuario: number;
  descripcion: string;
  prioridad: "baja" | "media" | "alta";
  estado_reporte:
    | "pendiente"
    | "en_revision"
    | "resuelto"
    | "cerrado";
  fecha_reporte: string;
  fecha_cierre: string | null;
  fecha_actualizacion: string | null;
  serial: string;
  registro_unico: string;
  tipo: string;
  modelo: string;
  id_ambiente: number;
}

function MisReportes() {
  const navigate = useNavigate();

  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] =
    useState("Todos");

  const usuarioGuardado =
    localStorage.getItem("usuario");

  const usuario = usuarioGuardado
    ? JSON.parse(usuarioGuardado)
    : null;

  const idUsuario = usuario?.id_usuario;

  const rol = usuario?.rol?.toLowerCase();

  const rutaInicio =
    rol === "instructor"
      ? "/dashboard-instructor"
      : "/dashboard-aprendiz";

  useEffect(() => {
    const cargarReportes = async () => {
      if (!idUsuario) {
        setError(
          "No se encontró el usuario actual."
        );
        setCargando(false);
        return;
      }

      try {
        const datos =
          await api.getReportes(idUsuario);

        setReportes(datos as Reporte[]);
      } catch (err) {
        const mensaje =
          err instanceof Error
            ? err.message
            : "No fue posible cargar los reportes.";

        setError(mensaje);
      } finally {
        setCargando(false);
      }
    };

    cargarReportes();
  }, [idUsuario]);

  const traducirEstado = (
    estado: Reporte["estado_reporte"]
  ) => {
    switch (estado) {
      case "pendiente":
        return "Pendiente";

      case "en_revision":
        return "En proceso";

      case "resuelto":
        return "Resuelto";

      case "cerrado":
        return "Cerrado";

      default:
        return estado;
    }
  };

  const traducirPrioridad = (
    prioridad: Reporte["prioridad"]
  ) => {
    switch (prioridad) {
      case "baja":
        return "Baja";

      case "media":
        return "Normal";

      case "alta":
        return "Alta";

      default:
        return prioridad;
    }
  };

  const obtenerIconoEstado = (
    estado: Reporte["estado_reporte"]
  ) => {
    if (
      estado === "resuelto" ||
      estado === "cerrado"
    ) {
      return <CheckCircle size={16} />;
    }

    if (estado === "en_revision") {
      return <Clock size={16} />;
    }

    return <AlertCircle size={16} />;
  };

  const formatearFecha = (
    fecha: string | null
  ) => {
    if (!fecha) {
      return "No registrada";
    }

    return new Date(fecha).toLocaleString(
      "es-CO",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };

  const reportesFiltrados =
    reportes.filter((reporte) => {
      const texto =
        busqueda.toLowerCase();

      const coincideBusqueda =
        reporte.serial
          ?.toLowerCase()
          .includes(texto) ||

        reporte.registro_unico
          ?.toLowerCase()
          .includes(texto) ||

        reporte.tipo
          ?.toLowerCase()
          .includes(texto) ||

        reporte.modelo
          ?.toLowerCase()
          .includes(texto) ||

        reporte.descripcion
          ?.toLowerCase()
          .includes(texto);

      const coincideEstado =
        filtroEstado === "Todos" ||
        reporte.estado_reporte ===
          filtroEstado;

      return (
        coincideBusqueda &&
        coincideEstado
      );
    });

  const totalReportes =
    reportes.length;

  const pendientes =
    reportes.filter(
      (reporte) =>
        reporte.estado_reporte ===
        "pendiente"
    ).length;

  const enRevision =
    reportes.filter(
      (reporte) =>
        reporte.estado_reporte ===
        "en_revision"
    ).length;

  const resueltos =
    reportes.filter(
      (reporte) =>
        reporte.estado_reporte ===
          "resuelto" ||
        reporte.estado_reporte ===
          "cerrado"
    ).length;

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <div>

      <header className="topbar">

        <div>
          Data<span>Ventor</span>
        </div>

        <nav>

          <Link to={rutaInicio}>
            <FaHome />
            Inicio
          </Link>

          <Link to="/crear-reporte">
            <FaClipboardList />
            Crear Reporte
          </Link>

          <Link to="/login">
            <FaSignOutAlt />
            Cerrar Sesión
          </Link>

        </nav>

      </header>

      <main>

        <div>

          <h2>
            Mis reportes
          </h2>

          <p>
            Consulta los reportes que has
            registrado y revisa su estado.
          </p>

        </div>


        {cargando && (
          <p>
            Cargando reportes...
          </p>
        )}


        {error && (
          <div>

            <p>
              Error al cargar reportes:{" "}
              {error}
            </p>

          </div>
        )}


        {!cargando && !error && (
          <>

            <div className="summary-grid">

              <div>

                <span>
                  Total de reportes
                </span>

                <strong>
                  {totalReportes}
                </strong>

              </div>

              <div>

                <span>
                  Pendientes
                </span>

                <strong>
                  {pendientes}
                </strong>

              </div>

              <div>

                <span>
                  En proceso
                </span>

                <strong>
                  {enRevision}
                </strong>

              </div>

              <div>

                <span>
                  Resueltos
                </span>

                <strong>
                  {resueltos}
                </strong>

              </div>

            </div>


            <section className="filters-section">

              <div>

                <div>

                  <Search size={19} />

                  <input
                    type="text"
                    placeholder="Buscar reporte..."
                    value={busqueda}
                    onChange={(e) =>
                      setBusqueda(
                        e.target.value
                      )
                    }
                  />

                </div>

                <select
                  value={filtroEstado}
                  onChange={(e) =>
                    setFiltroEstado(
                      e.target.value
                    )
                  }
                >

                  <option value="Todos">
                    Todos los estados
                  </option>

                  <option value="pendiente">
                    Pendiente
                  </option>

                  <option value="en_revision">
                    En proceso
                  </option>

                  <option value="resuelto">
                    Resuelto
                  </option>

                  <option value="cerrado">
                    Cerrado
                  </option>

                </select>

              </div>

            </section>


            <div className="reports-list">

              {reportesFiltrados.map(
                (reporte) => (

                  <article
                    key={
                      reporte.id_reporte
                    }
                    className="report-card"
                  >

                    <div className="report-header">

                      <div>

                        <span>
                          REPORTE #
                          {reporte.id_reporte}
                        </span>

                        <h3>
                          {reporte.tipo}
                        </h3>

                        <span>
                          Registrado el{" "}
                          {formatearFecha(
                            reporte.fecha_reporte
                          )}
                        </span>

                      </div>

                      <div
                        className={`status-badge ${
                          reporte.estado_reporte.replace(
                            "_",
                            "-"
                          )
                        }`}
                      >

                        {obtenerIconoEstado(
                          reporte.estado_reporte
                        )}

                        {traducirEstado(
                          reporte.estado_reporte
                        )}

                      </div>

                    </div>


                    <div className="report-details">

                      <div>

                        <span>
                          Equipo
                        </span>

                        <strong>
                          {reporte.serial}
                        </strong>

                      </div>

                      <div>

                        <span>
                          Registro único
                        </span>

                        <strong>
                          {reporte.registro_unico}
                        </strong>

                      </div>

                      <div>

                        <span>
                          Modelo
                        </span>

                        <strong>
                          {reporte.modelo}
                        </strong>

                      </div>

                      <div>

                        <span>
                          Prioridad
                        </span>

                        <strong
                          className={`priority-${reporte.prioridad}`}
                        >
                          {traducirPrioridad(
                            reporte.prioridad
                          )}
                        </strong>

                      </div>

                    </div>


                    <div className="report-description">

                      <span>
                        Descripción
                      </span>

                      <p>
                        {reporte.descripcion}
                      </p>

                    </div>


                    <div className="report-actions">

                      <button
                        onClick={() =>
                          navigate(
                            `/detalle-reporte/${reporte.id_reporte}`
                          )
                        }
                      >

                        <Eye size={17} />

                        Ver detalle

                      </button>

                    </div>

                  </article>

                )
              )}

            </div>


            {reportesFiltrados.length ===
              0 && (

              <div className="empty-state">

                <FileText size={45} />

                <h3>
                  No hay reportes
                </h3>

                <p>
                  No encontramos reportes
                  que coincidan con tu
                  búsqueda.
                </p>

              </div>

            )}

          </>
        )}

      </main>


      <footer className="auth-footer">
        © 2026 DataVentor | SENA
      </footer>

    </div>
  );
}

export default MisReportes;