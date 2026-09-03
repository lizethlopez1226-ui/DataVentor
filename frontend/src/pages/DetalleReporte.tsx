import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/detalleReporte.css";

import {
  FaHome,
  FaSignOutAlt,
  FaUserGraduate,
  FaClock,
  FaCheckCircle,
  FaTools,
} from "react-icons/fa";

import { api } from "../services/api";
import type { Reporte } from "../services/api";

interface Historial {
  id_historial: number;
  id_reporte: number;
  id_usuario: number;
  estado: "pendiente" | "en_revision" | "resuelto" | "cerrado";
  fecha: string;
  observaciones?: string | null;
  nombre?: string;
  apellido?: string;
  correo?: string;
}

function DetalleReporte() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [reporte, setReporte] = useState<Reporte | null>(null);
  const [historial, setHistorial] = useState<Historial[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const usuarioGuardado = localStorage.getItem("usuario");
  const usuario = usuarioGuardado
    ? JSON.parse(usuarioGuardado)
    : null;

  const rol = usuario?.rol?.toLowerCase();

  const rutaInicio =
    rol === "administrador"
      ? "/dashboard-admin"
      : rol === "tecnico"
      ? "/dashboard-tecnico"
      : rol === "instructor"
      ? "/dashboard-instructor"
      : "/dashboard-aprendiz";

  useEffect(() => {
    const cargarDatos = async () => {
      if (!id) {
        setError("No se encontró el reporte.");
        setCargando(false);
        return;
      }

      try {
        const idReporte = Number(id);

        const [datosReporte, datosHistorial] =
          await Promise.all([
            api.getReporteById(idReporte),
            api.getHistorialReporte(idReporte),
          ]);

        setReporte(datosReporte);
        setHistorial(datosHistorial);
      } catch (err) {
        const mensaje =
          err instanceof Error
            ? err.message
            : "No fue posible cargar el reporte.";

        setError(mensaje);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [id]);

  const traducirEstado = (
    estado?: Reporte["estado_reporte"]
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
        return "Sin estado";
    }
  };

  const traducirPrioridad = (
    prioridad?: Reporte["prioridad"]
  ) => {
    switch (prioridad) {
      case "baja":
        return "Baja";

      case "media":
        return "Normal";

      case "alta":
        return "Alta";

      default:
        return "Sin prioridad";
    }
  };

  const obtenerIconoEstado = (
    estado?: Reporte["estado_reporte"]
  ) => {
    if (
      estado === "resuelto" ||
      estado === "cerrado"
    ) {
      return <FaCheckCircle />;
    }

    if (estado === "en_revision") {
      return <FaTools />;
    }

    return <FaClock />;
  };

  const formatearFecha = (
    fecha?: string | null
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

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  if (cargando) {
    return (
      <div className="detalle-reporte">
        <header className="topbar">
          <h1>
            Data<span>Ventor</span>
          </h1>
        </header>

        <main className="contenido-detalle">
          <div className="titulo-detalle">
            <h2>Detalle del reporte</h2>
            <p>
              Cargando información del reporte...
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !reporte) {
    return (
      <div className="detalle-reporte">
        <header className="topbar">
          <h1>
            Data<span>Ventor</span>
          </h1>

          <nav>
            <button
              onClick={() =>
                navigate(rutaInicio)
              }
            >
              <FaHome size={18} />
              Inicio
            </button>

            <button onClick={cerrarSesion}>
              <FaSignOutAlt size={18} />
              Cerrar Sesión
            </button>
          </nav>
        </header>

        <main className="contenido-detalle">
          <div className="titulo-detalle">
            <h2>Detalle del reporte</h2>

            <p>
              {error ||
                "No se encontró el reporte."}
            </p>

            <button
              onClick={() => navigate(-1)}
            >
              Volver
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="detalle-reporte">
      <header className="topbar">
        <h1>
          Data<span>Ventor</span>
        </h1>

        <nav>
          <button
            onClick={() =>
              navigate(rutaInicio)
            }
          >
            <FaHome size={18} />
            Inicio
          </button>

          <button onClick={cerrarSesion}>
            <FaSignOutAlt size={18} />
            Cerrar Sesión
          </button>
        </nav>

        <div className="user">
          <FaUserGraduate size={18} />

          <span>
            {rol === "administrador"
              ? "Administrador"
              : rol === "tecnico"
              ? "Técnico"
              : rol === "instructor"
              ? "Instructor"
              : "Aprendiz"}
          </span>
        </div>
      </header>

      <main className="contenido-detalle">

        <div className="titulo-detalle">
          <h2>Detalle del reporte</h2>

          <p>
            Información y estado del reporte realizado.
          </p>
        </div>

        <section className="tarjeta-detalle">

          {/* ENCABEZADO */}
          <div className="encabezado-reporte">
            <h3>
              Reporte #{reporte.id_reporte}
            </h3>

            <span
              className={`estado-${reporte.estado_reporte}`}
            >
              {obtenerIconoEstado(
                reporte.estado_reporte
              )}

              {traducirEstado(
                reporte.estado_reporte
              )}
            </span>
          </div>

          {/* INFORMACIÓN */}
          <div className="informacion-reporte">

            <div>
              <strong>Equipo:</strong>

              <span>
                {reporte.serial ||
                  "No registrado"}
              </span>
            </div>

            <div>
              <strong>Registro único:</strong>

              <span>
                {reporte.registro_unico ||
                  "No registrado"}
              </span>
            </div>

            <div>
              <strong>Modelo:</strong>

              <span>
                {reporte.modelo ||
                  "No registrado"}
              </span>
            </div>

            <div>
              <strong>Ambiente:</strong>

              <span>
                {reporte.id_ambiente ??
                  "No registrado"}
              </span>
            </div>

            <div>
              <strong>Reportado:</strong>

              <span>
                {formatearFecha(
                  reporte.fecha_reporte
                )}
              </span>
            </div>

            <div>
              <strong>Actualizado:</strong>

              <span>
                {formatearFecha(
                  reporte.fecha_actualizacion
                )}
              </span>
            </div>

            <div>
              <strong>Usuario:</strong>

              <span>
                {reporte.nombre || ""}
                {" "}
                {reporte.apellido || ""}
              </span>
            </div>

            <div>
              <strong>Prioridad:</strong>

              <span>
                {traducirPrioridad(
                  reporte.prioridad
                )}
              </span>
            </div>

          </div>

          {/* DESCRIPCIÓN */}
          <div className="descripcion-detalle">
            <h4>Descripción</h4>

            <p>
              {reporte.descripcion}
            </p>
          </div>

          {/* ESTADO ACTUAL */}
          <div className="estado-actual">
            <h4>Estado actual</h4>

            <div className="estado-box">
              {obtenerIconoEstado(
                reporte.estado_reporte
              )}

              <strong>
                {traducirEstado(
                  reporte.estado_reporte
                )}
              </strong>
            </div>
          </div>

          {/* HISTORIAL REAL */}
          <div className="historial">
            <h4>
              Historial del reporte
            </h4>

            {historial.length === 0 ? (
              <p>
                No hay movimientos registrados
                para este reporte.
              </p>
            ) : (
              <div className="linea-historial">

                {historial.map((evento) => (
                  <div
                    className="evento"
                    key={evento.id_historial}
                  >
                    <div>
                      {obtenerIconoEstado(
                        evento.estado
                      )}

                      <strong>
                        {traducirEstado(
                          evento.estado
                        )}
                      </strong>
                    </div>

                    <span>
                      {formatearFecha(
                        evento.fecha
                      )}
                    </span>

                    <span>
                      Realizado por:{" "}
                      {evento.nombre ||
                        "Usuario"}{" "}
                      {evento.apellido || ""}
                    </span>

                    {evento.observaciones && (
                      <span>
                        Observación:{" "}
                        {evento.observaciones}
                      </span>
                    )}
                  </div>
                ))}

              </div>
            )}
          </div>

          {/* FECHAS */}
          <div className="historial">
            <h4>
              Información de fechas
            </h4>

            <div className="linea-historial">

              <div className="evento">
                <strong>
                  Creado
                </strong>

                <span>
                  {formatearFecha(
                    reporte.fecha_reporte
                  )}
                </span>
              </div>

              <div className="evento">
                <strong>
                  Última actualización
                </strong>

                <span>
                  {formatearFecha(
                    reporte.fecha_actualizacion
                  )}
                </span>
              </div>

              <div className="evento">
                <strong>
                  Cierre
                </strong>

                <span>
                  {formatearFecha(
                    reporte.fecha_cierre
                  )}
                </span>
              </div>

            </div>
          </div>

          {/* BOTÓN */}
          <div className="acciones-detalle">
            <button
              onClick={() => navigate(-1)}
            >
              Volver
            </button>
          </div>

        </section>
      </main>
    </div>
  );
}

export default DetalleReporte;