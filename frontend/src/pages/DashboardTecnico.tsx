import { useEffect, useState } from "react";
import "../styles/DashboardTecnico.css";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

import {
  FaTools,
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaEye,
  FaUserCog
} from "react-icons/fa";

function DashboardTecnico() {
  const navigate = useNavigate();

  const [reportes, setReportes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  const cargarReportes = async () => {
    try {
      const data = await api.getReportes();
      setReportes(data);
    } catch (error) {
      console.error("Error al cargar reportes:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarReportes();
  }, []);

  const atenderReporte = async (idReporte: number) => {
    try {
      const usuarioGuardado = localStorage.getItem("usuario");

      if (!usuarioGuardado) {
        alert("No se encontró el usuario actual.");
        return;
      }

      const usuario = JSON.parse(usuarioGuardado);

      if (!usuario.id_usuario) {
        alert("No se encontró el identificador del técnico.");
        return;
      }

      await api.actualizarEstadoReporte(idReporte, {
        estado: "en_revision",
        id_usuario: usuario.id_usuario
      });

      alert("Reporte tomado correctamente.");

      cargarReportes();

    } catch (error) {
      console.error("Error al actualizar reporte:", error);

      alert(
        error instanceof Error
          ? error.message
          : "No se pudo actualizar el estado del reporte."
      );
    }
  };

  const reportesPendientes = reportes.filter(
    (r) => r.estado_reporte === "pendiente"
  );

  const reportesEnProceso = reportes.filter(
    (r) => r.estado_reporte === "en_revision"
  );

  const reportesResueltos = reportes.filter(
    (r) => r.estado_reporte === "resuelto"
  );

  return (
    <div className="dashboard-tecnico">

      <header className="topbar">

        <h1>
          Data<span>Ventor</span>
        </h1>

        <div className="topbar-user">
          <FaUserCog />
          <span>Técnico</span>
        </div>

      </header>

      <main className="dashboard-content">

        <div className="welcome">

          <h1>Bienvenido, Técnico</h1>

          <p>
            Gestiona y atiende los reportes de novedades de los equipos.
          </p>

        </div>

        <div
          className="stats-container"
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "1.5rem"
          }}
        >

          <div className="stat-card">

            <div className="stat-icon purple">
              <FaClipboardList />
            </div>

            <div>
              <p>Pendientes</p>

              <h2>
                {reportesPendientes.length}
              </h2>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon blue">
              <FaClock />
            </div>

            <div>
              <p>En proceso</p>

              <h2>
                {reportesEnProceso.length}
              </h2>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon green">
              <FaCheckCircle />
            </div>

            <div>
              <p>Resueltos</p>

              <h2>
                {reportesResueltos.length}
              </h2>
            </div>

          </div>

        </div>

        <section className="reports-card">

          <div className="reports-header">

            <div>

              <h2>Reportes pendientes</h2>

              <p>
                Reportes que requieren atención inmediata
              </p>

            </div>

            <button
              className="all-reports-btn"
              onClick={() =>
                navigate("/mis-reportes-tecnico")
              }
            >
              <FaClipboardList />
              Ver todos
            </button>

          </div>

          <div className="table-container">

            <table>

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Equipo</th>
                  <th>Ambiente</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>

              </thead>

              <tbody>

                {cargando ? (

                  <tr>

                    <td
                      colSpan={6}
                      style={{
                        textAlign: "center",
                        padding: "1rem"
                      }}
                    >
                      Cargando reportes pendientes...
                    </td>

                  </tr>

                ) : reportesPendientes.length > 0 ? (

                  reportesPendientes.map((reporte) => (

                    <tr key={reporte.id_reporte}>

                      <td>
                        #{String(reporte.id_reporte).padStart(3, "0")}
                      </td>

                      <td>
                        {reporte.modelo ??
                          reporte.serial ??
                          reporte.tipo ??
                          "Equipo"}
                      </td>

                      <td>
                        {reporte.id_ambiente ??
                          "Sin ambiente"}
                      </td>

                      <td>
                        {reporte.fecha_reporte
                          ? new Date(
                              reporte.fecha_reporte
                            ).toLocaleDateString("es-CO")
                          : "Sin fecha"}
                      </td>

                      <td>

                        <span className="status pending">
                          <FaClock />
                          Pendiente
                        </span>

                      </td>

                      <td
                        style={{
                          display: "flex",
                          gap: "0.5rem"
                        }}
                      >

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

                        <button
                          className="action-btn"
                          style={{
                            backgroundColor: "#2563eb",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            padding: "4px 8px",
                            cursor: "pointer"
                          }}
                          onClick={() =>
                            atenderReporte(
                              reporte.id_reporte
                            )
                          }
                        >
                          <FaTools />
                          Atender
                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan={6}
                      style={{
                        textAlign: "center",
                        padding: "1rem"
                      }}
                    >
                      No hay reportes pendientes en este momento.
                    </td>

                  </tr>

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

export default DashboardTecnico;