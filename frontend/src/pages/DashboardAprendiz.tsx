import "../styles/DashboardAprendiz.css";

import {
  FaHome,
  FaClipboardList,
  FaSignOutAlt,
  FaUserGraduate,
  FaCheckCircle,
  FaClock,
  FaTools
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function DashboardAprendiz() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <div className="dashboard">

      <header className="topbar">

        <h1>
          Data<span>Ventor</span>
        </h1>

        <nav>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/dashboard-aprendiz");
            }}
          >
            <FaHome />
            Inicio
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/mis-reportes");
            }}
          >
            <FaClipboardList />
            Mis Reportes
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              cerrarSesion();
            }}
          >
            <FaSignOutAlt />
            Cerrar Sesión
          </a>

        </nav>

        <div className="user">
          <FaUserGraduate />
          Aprendiz
        </div>

      </header>

      <main className="main-content">

        <section className="welcome">

          <h2>
            Bienvenido, Aprendiz.👋🏻
          </h2>

          <p>
            Bienvenido a tu tablero
          </p>

        </section>

        <section className="cards">

          <div className="card purple">
            <h3>3</h3>
            <span>Equipos Asignados</span>
          </div>

          <div className="card blue">
            <h3>5</h3>
            <span>Reportes Realizados</span>
          </div>

          <div className="card orange">
            <h3>4</h3>
            <span>Pendientes</span>
          </div>

          <div className="card green">
            <h3>1</h3>
            <span>Resueltos</span>
          </div>

        </section>

        <section className="content">

          <div className="quick-actions">

            <h3>
              Acciones Rápidas
            </h3>

            <button
              onClick={() =>
                navigate("/crear-reporte")
              }
            >
              Reportar Daño
            </button>

            <button
              onClick={() =>
                navigate("/mis-reportes")
              }
            >
              Ver Mis Reportes
            </button>

          </div>

          <div className="reports">

            <h3>
              Mis Ultimos Reportes
            </h3>

            <table>

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>#001</td>

                  <td>
                    Pantalla no enciende
                  </td>

                  <td>
                    <span className="estado pendiente">
                      <FaClock />
                      Pendiente
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>#002</td>

                  <td>
                    Teclado no responde
                  </td>

                  <td>
                    <span className="estado resuelto">
                      <FaCheckCircle />
                      Resuelto
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>#003</td>

                  <td>
                    Problema con el mouse
                  </td>

                  <td>
                    <span className="estado en proceso">
                      <FaTools />
                      En proceso
                    </span>
                  </td>
                </tr>

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

export default DashboardAprendiz;