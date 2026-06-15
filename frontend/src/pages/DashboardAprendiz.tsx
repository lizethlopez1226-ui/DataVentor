import "../styles/DashboardAprendiz.css";
import {
  FaHome,
  FaClipboardList,
  FaLaptop,
  FaUser,
  FaSignOutAlt,
  FaUserGraduate
} from "react-icons/fa";
import {
  FaCheckCircle,
  FaClock,
  FaTools
} from "react-icons/fa";


function DashboardAprendiz() {
  return (
    <div className="dashboard">
          
            <header className="topbar">
            <h1>Dataventor</h1>

      <nav>
              <a href="#"><FaHome />Incio</a>
              <a href="#"><FaClipboardList />Mis Reportes</a>
              <a href="#"><FaLaptop />Mis Equipos</a>
              <a href="#"><FaUser />Mi Perfil</a>
              <a href="#"><FaSignOutAlt />Cerrar Sesión</a>
          </nav>
          
<div className="user">
    <FaUserGraduate/>
   Aprendiz
  </div>
</header> 

<main className="main-content">

    <section className="welcome">
    <h2>Bienvenido, Aprendiz.👋🏻</h2>
    <p>Bienvenido a tu tablero</p>
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
        <h3>Acciones Rápidas</h3>

        <button>Reportar Daño</button>
        <button>Ver Mis Reportes</button>
        <button>Ver Mis Equipos</button>
        <button>Mi Perfil</button>
    </div>

    <div className="reports">
        <h3>Mis Ultimos Reportes</h3>

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
                    <td>Pantalla no enciende</td>
                    <td>
                        <span className="estado pendiente">
                            <FaClock /> Pendiente
                        </span>
                    </td>
                </tr>

                <tr>
                    <td>#002</td>
                    <td>Teclado no responde</td>
                    <td>
                        <span className="estado resuelto">
                            <FaCheckCircle /> Resuelto
                        </span>
                    </td>
                </tr>

                <tr>
                    <td>#003</td>
                    <td>Problema con el mouse</td>
                    <td>
                        <span className="estado en proceso">
                            <FaTools /> en proceso
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

</main>

 <footer className="footer">
    © 2026 DataVentor |  SENA
  </footer>
</div>

  );
}

export default DashboardAprendiz;