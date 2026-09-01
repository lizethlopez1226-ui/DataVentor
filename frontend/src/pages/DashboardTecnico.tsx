import "../styles/DashboardTecnico.css";
import { useNavigate } from 'react-router-dom';

function DashboardTecnico() {

  const navigate = useNavigate();

  return (
    <div className="dashboard-tecnico">


      <header className="topbar">
        <div className="logo">DataVentor</div>

        <div className="topbar-user">
          <span>👤</span>
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

       
        <section className="stats">

          <div className="stat-card">
            <div className="stat-icon purple">
              📋
            </div>

            <div>
              <p>Pendientes</p>
              <h2>12</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon blue">
              ⚙️
            </div>

            <div>
              <p>En proceso</p>
              <h2>5</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">
              ✓
            </div>

            <div>
              <p>Resueltos</p>
              <h2>28</h2>
            </div>
          </div>

        </section>

     
        <section className="reports-card">

          <div className="reports-header">
            <div>
              <h2>Reportes pendientes</h2>
              <p>Reportes que requieren atención</p>
            </div>

            <button className="all-reports-btn" 
             onClick={() => navigate('/mis-reportes-tecnico')}>
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

                <tr>
                  <td>#001</td>
                  <td>PC-025</td>
                  <td>302</td>
                  <td>25/08/2026</td>
                  <td>
                    <span className="status pending">
                      Pendiente
                    </span>
                  </td>
                  <td>
                    <button className="view-btn">
                      Ver
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>#002</td>
                  <td>PC-018</td>
                  <td>301</td>
                  <td>25/08/2026</td>
                  <td>
                    <span className="status pending">
                      Pendiente
                    </span>
                  </td>
                  <td>
                    <button className="view-btn">
                      Ver
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>#003</td>
                  <td>PC-010</td>
                  <td>205</td>
                  <td>24/08/2026</td>
                  <td>
                    <span className="status pending">
                      Pendiente
                    </span>
                  </td>
                  <td>
                    <button className="view-btn">
                      Ver
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>#004</td>
                  <td>PC-031</td>
                  <td>204</td>
                  <td>24/08/2026</td>
                  <td>
                    <span className="status pending">
                      Pendiente
                    </span>
                  </td>
                  <td>
                    <button className="view-btn">
                      Ver
                    </button>
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

export default DashboardTecnico;