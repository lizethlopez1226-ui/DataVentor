
function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        DV
      </div>

      <nav>

        <a href="#">
          Dashboard
        </a>

        <a href="#">
          Usuarios
        </a>

        <a href="#">
          Equipos
        </a>

        <a href="#">
          Ambientes
        </a>

        <a href="#">
          Reportes
        </a>

        <a href="#">
          Configuración
        </a>

      </nav>

      <button className="logout-btn">
        Cerrar Sesión
      </button>

    </aside>
  );
}

export default Sidebar;