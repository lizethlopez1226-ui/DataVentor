import {
  FaHome,
  FaExclamationTriangle,
  FaClipboardList,
  FaSignOutAlt,
  FaUserTie
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import "../styles/DashboardInstru.css";

function DashboardInstrutor() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <div className="dashboard-instructor">

      <header className="topbar-instructor">

        <h1>Data<span>Ventor</span></h1>

        <nav>
          <a onClick={() => navigate("/dashboard-instructor")}>
            <FaHome size={18} />
            Inicio
          </a>

          <a onClick={() => navigate("/crear-reporte")}>
            <FaExclamationTriangle size={18} />
            Reportar Novedad
          </a>

          <a onClick={() => navigate("/mis-reportes")}>
            <FaClipboardList size={18} />
            Mis Reportes
          </a>

          <a onClick={cerrarSesion}>
            <FaSignOutAlt size={18} />
            Cerrar Sesión
          </a>
        </nav>

        <div className="user-instructor">
          <FaUserTie />
          Instructor
        </div>

      </header>

      <main className="instructor-content">

        <section className="instructor-welcome">
          <h2>Bienvenido, Instructor 👋</h2>

          <p>
            Reporta novedades de los equipos y consulta los reportes que has realizado.
          </p>
        </section>

        <section className="instructor-functions">

          <h3>Funciones principales</h3>

          <div className="instructor-cards">

            <button
              className="instructor-card report-card"
              onClick={() => navigate("/crear-reporte")}
            >
              <div className="instructor-icon report-icon">
                <FaExclamationTriangle />
              </div>

              <div>
                <h4>Reportar novedad</h4>
                <p>
                  Registra una falla o novedad de un equipo.
                </p>
              </div>
            </button>

            <button
              className="instructor-card"
              onClick={() => navigate("/mis-reportes")}
            >
              <div className="instructor-icon">
                <FaClipboardList />
              </div>

              <div>
                <h4>Mis reportes</h4>
                <p>
                  Consulta los reportes que has realizado.
                </p>
              </div>
            </button>

          </div>

        </section>

      </main>

      <footer className="footer-instructor">
        © 2026 DataVentor | SENA
      </footer>

    </div>
  );
}

export default DashboardInstrutor;