import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/dashboardAprendiz.css";

import {
  FaHome,
  FaChartBar,
  FaUserShield,
  FaSignOutAlt,
  FaEye,
  FaExclamationTriangle,
  FaTools,
  FaCheckCircle,
} from "react-icons/fa";

const API_URL = "http://127.0.0.1:5001";

interface Reporte {
  id_reporte: number;
  id_usuario: number;
  id_equipo: number;
  descripcion: string;
  prioridad: string;
  estado_reporte: string;
  fecha_reporte?: string;
  nombre?: string;
  apellido?: string;
  serial?: string;
  modelo?: string;
  tipo?: string;
  id_ambiente?: number;
}

function ReportesAdmin() {
  const navigate = useNavigate();

  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [cargando, setCargando] = useState(true);

  const cargarReportes = async () => {
    try {
      setCargando(true);

      const response = await fetch(
        `${API_URL}/api/reportes`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.mensaje ||
            "No se pudieron cargar los reportes."
        );
      }

      setReportes(
        Array.isArray(data) ? data : []
      );

    } catch (error) {
      console.error(
        "Error al cargar reportes:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "No se pudieron cargar los reportes."
      );

    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarReportes();
  }, []);

  const obtenerEstado = (estado: string) => {
    if (estado === "pendiente") {
      return (
        <span className="estado pendiente">
          <FaExclamationTriangle />
          Pendiente
        </span>
      );
    }

    if (estado === "en_revision") {
      return (
        <span className="estado proceso">
          <FaTools />
          En Proceso
        </span>
      );
    }

    if (estado === "resuelto") {
      return (
        <span className="estado resuelto">
          <FaCheckCircle />
          Resuelto
        </span>
      );
    }

    if (estado === "cerrado") {
      return (
        <span className="estado resuelto">
          <FaCheckCircle />
          Cerrado
        </span>
      );
    }

    return (
      <span className="estado">
        {estado}
      </span>
    );
  };

  return (
    <div className="dashboard-admin">

      <header className="topbar">

        <h1>
          Data<span>Ventor</span>
        </h1>

        <nav>

          <a href="/dashboard-admin">
            <FaHome size={18} />
            Inicio
          </a>

          <a href="/reportes-admin">
            <FaChartBar size={18} />
            Reportes
          </a>

          <a href="/login">
            <FaSignOutAlt />
            Cerrar Sesión
          </a>

        </nav>

        <div className="user">

          <FaUserShield />

          Administrador

        </div>

      </header>

      <main className="main-content">

        <section className="Welcome">

          <h2>
            Reportes
          </h2>

          <p>
            Consulta y supervisa los reportes registrados en DataVentor.
          </p>

        </section>

        <section className="reports">

          <h3>
            <FaChartBar />
            Todos los reportes
          </h3>

          <div
            style={{
              overflowX: "auto",
            }}
          >

            <table>

              <thead>

                <tr>

                  <th>ID</th>

                  <th>Usuario</th>

                  <th>Equipo</th>

                  <th>Ambiente</th>

                  <th>Fecha</th>

                  <th>Prioridad</th>

                  <th>Estado</th>

                  <th>Acción</th>

                </tr>

              </thead>

              <tbody>

                {cargando ? (

                  <tr>

                    <td
                      colSpan={8}
                      style={{
                        textAlign: "center",
                      }}
                    >
                      Cargando reportes...
                    </td>

                  </tr>

                ) : reportes.length === 0 ? (

                  <tr>

                    <td
                      colSpan={8}
                      style={{
                        textAlign: "center",
                      }}
                    >
                      No hay reportes registrados.
                    </td>

                  </tr>

                ) : (

                  reportes.map((reporte) => (

                    <tr
                      key={reporte.id_reporte}
                    >

                      <td>
                        #
                        {String(
                          reporte.id_reporte
                        ).padStart(
                          3,
                          "0"
                        )}
                      </td>

                      <td>

                        {reporte.nombre
                          ? `${reporte.nombre} ${
                              reporte.apellido ||
                              ""
                            }`
                          : `Usuario #${reporte.id_usuario}`}

                      </td>

                      <td>

                        {reporte.modelo ||
                          reporte.serial ||
                          reporte.tipo ||
                          `Equipo #${reporte.id_equipo}`}

                      </td>

                      <td>

                        {reporte.id_ambiente ??
                          "Sin ambiente"}

                      </td>

                      <td>

                        {reporte.fecha_reporte
                          ? new Date(
                              reporte.fecha_reporte
                            ).toLocaleDateString(
                              "es-CO"
                            )
                          : "Sin fecha"}

                      </td>

                      <td>

                        {reporte.prioridad}

                      </td>

                      <td>

                        {obtenerEstado(
                          reporte.estado_reporte
                        )}

                      </td>

                      <td>

                        <button
                          className="view-btn"
                          onClick={() =>
                            navigate(
                              `/detalle-reporte/${reporte.id_reporte}`
                            )
                          }
                        >

                          <FaEye />

                          Ver

                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </section>

      </main>

      <footer className="footer">

        © 2026 DataVentor | SENA

      </footer>

    </div>
  );
}

export default ReportesAdmin;