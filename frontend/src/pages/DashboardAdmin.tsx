import { Fullscreen } from "lucide-react";
import "../styles/dashboardAprendiz.css";
import {
    FaHome,
  FaLaptop,
  FaBuilding,
  FaUsers,
  FaChartBar,
  FaUserShield,
  FaUserPlus,
  FaTools,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSignOutAlt
} from "react-icons/fa";

function DashboardAdmin() {
  return (
    <div className="dashboard-admin">

      <header className="topbar">
        <h1>DataVentor</h1>

        <nav>
          <a href="#"><FaHome size={18} />Inicio</a>
          <a href="#"><FaLaptop size={18} />Equipos</a>
          <a href="#"><FaBuilding size={18} />Ambiente</a>
          <a href="#"><FaUsers size={18} />Usuarios</a>
          <a href="#"><FaChartBar size={18} /> Reportes</a>
          <a href="#"><FaSignOutAlt />Cerrar Sesión</a>
        </nav>

        <div className="user">
          <FaUserShield/>
          Administrador
        </div>
      </header>

      <main className="main-content">

        <section className="Welcome">
         
          <h2>Bienvenido Adminstrador👋🏻</h2>
          <p>Resumen general del sistema</p>
        
        </section>

        <section className="cards">

          <div className="card purple">
            <FaLaptop size={32} />
              <h3>248</h3>
                <span>Equipos Totales</span>
            </div>

          <div className="card blue">
            <FaBuilding size={32} />
                <h3>15</h3>
                <span>Ambientes</span>
            </div>

        <div className="card orange">
          <FaExclamationTriangle size={32} />
              <h3>23</h3>
              <span>Pendientes</span>
        </div>

      <div className="card green">
          <FaUsers size={32} />
            <h3>36</h3>
              <span>Usuarios</span>
      </div>
        </section>

      <section className="content">

        <div className="quick-actions">
          <h3>Acciones Rapidas</h3>
          <button>
            <FaUserPlus size={18} />
            Crear Usuario
          </button>

        <button>
          <FaBuilding size={18} />
            Registrar Ambiente
          </button>

        <button>
        <FaLaptop size={18} />
          Registrar Equipo
        </button>

      <button>
        <FaChartBar size={18} />
      Ver Reportes
    </button>
        </div>


          <div className="reports">

            <h3>
            <Fullscreen size={20}/>
            Últimos Reportes
            </h3>

            <table>

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Equipo</th>
                  <th>Estado</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>#001</td>
                  <td>Juan acosta</td>
                  <td>HP 250</td>
                  <td>
                    <span className="estado pendiente">
                      <FaExclamationTriangle />Pendiente
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>#002</td>
                  <td>Santiago Martinezs</td>
                  <td>Dell Optiplex</td>
                  <td>
                    <span className="estado proceso">
                      <FaTools /> En Proceso
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>#003</td>
                  <td>Juan Beltran</td>
                  <td>Lenovo ThinkCentre</td>
                  <td>
                    <span className="estado resuelto">
                       <FaCheckCircle />Resuelto
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

export default DashboardAdmin;
 