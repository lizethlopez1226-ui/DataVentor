import { Fullscreen } from "lucide-react";
import "../styles/dashboardAprendiz.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

function DashboardAdmin() {
  const navigate = useNavigate();

  const [mostrarAmbiente, setMostrarAmbiente] = useState(false);
  const [mostrarEquipo, setMostrarEquipo] = useState(false);
  const [mostrarUsuario, setMostrarUsuario] = useState(false);

  const [nombreAmbiente, setNombreAmbiente] = useState("");
  const [idSede, setIdSede] = useState("");

  const [idAmbiente, setIdAmbiente] = useState("");
  const [serial, setSerial] = useState("");
  const [registroUnico, setRegistroUnico] = useState("");
  const [tipo, setTipo] = useState("");
  const [modelo, setModelo] = useState("");
  const [identificadorSistema, setIdentificadorSistema] = useState("");

  const [tipoDocumento, setTipoDocumento] = useState("");
  const [documento, setDocumento] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [telefono, setTelefono] = useState("");
  const [rol, setRol] = useState("");

  const cerrarModales = () => {
    setMostrarAmbiente(false);
    setMostrarEquipo(false);
    setMostrarUsuario(false);
  };

  const registrarAmbiente = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!nombreAmbiente || !idSede) {
      alert("Completa todos los campos.");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/ambientes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: nombreAmbiente,
            id_sede: Number(idSede),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.mensaje ||
            "No fue posible registrar el ambiente."
        );
      }

      alert("Ambiente registrado correctamente.");

      setNombreAmbiente("");
      setIdSede("");
      cerrarModales();

    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Error al registrar el ambiente."
      );
    }
  };

  const registrarEquipo = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !idAmbiente ||
      !serial ||
      !registroUnico ||
      !tipo ||
      !modelo
    ) {
      alert("Completa todos los campos obligatorios.");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/equipos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_ambiente: Number(idAmbiente),
            serial,
            registro_unico: registroUnico,
            tipo,
            modelo,
            identificador_sistema:
              identificadorSistema || null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.mensaje ||
            "No fue posible registrar el equipo."
        );
      }

      alert("Equipo registrado correctamente.");

      setIdAmbiente("");
      setSerial("");
      setRegistroUnico("");
      setTipo("");
      setModelo("");
      setIdentificadorSistema("");

      cerrarModales();

    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Error al registrar el equipo."
      );
    }
  };

  const registrarUsuario = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !tipoDocumento ||
      !documento ||
      !nombre ||
      !apellido ||
      !correo ||
      !contrasena ||
      !rol
    ) {
      alert("Completa todos los campos obligatorios.");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/registro",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tipo_documento: tipoDocumento,
            documento,
            nombre,
            apellido,
            correo,
            contrasena,
            telefono,
            rol,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.mensaje ||
            "No fue posible registrar el usuario."
        );
      }

      alert("Usuario registrado correctamente.");

      setTipoDocumento("");
      setDocumento("");
      setNombre("");
      setApellido("");
      setCorreo("");
      setContrasena("");
      setTelefono("");
      setRol("");

      cerrarModales();

    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Error al registrar el usuario."
      );
    }
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

          <a href="/detalle-reporte">
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
            Bienvenido Administrador 👋🏻
          </h2>

          <p>
            Resumen general del sistema
          </p>

        </section>

        <section className="cards">

          <div className="card purple">

            <FaLaptop size={32} />

            <h3>248</h3>

            <span>
              Equipos Totales
            </span>

          </div>

          <div className="card blue">

            <FaBuilding size={32} />

            <h3>15</h3>

            <span>
              Ambientes
            </span>

          </div>

          <div className="card orange">

            <FaExclamationTriangle size={32} />

            <h3>23</h3>

            <span>
              Pendientes
            </span>

          </div>

          <div className="card green">

            <FaUsers size={32} />

            <h3>36</h3>

            <span>
              Usuarios
            </span>

          </div>

        </section>

        <section className="content">

          <div className="quick-actions">

            <h3>
              Acciones Rápidas
            </h3>

            <button
              onClick={() => {
                cerrarModales();
                setMostrarAmbiente(true);
              }}
            >
              <FaBuilding size={18} />
              Registrar Ambiente
            </button>

            <button
              onClick={() => {
                cerrarModales();
                setMostrarEquipo(true);
              }}
            >
              <FaLaptop size={18} />
              Registrar Equipo
            </button>

            <button
              onClick={() => {
                cerrarModales();
                setMostrarUsuario(true);
              }}
            >
              <FaUserPlus size={18} />
              Registrar Usuarios
            </button>

          </div>

          <div className="reports">

            <h3>

              <Fullscreen size={20} />

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

                  <td>Juan Acosta</td>

                  <td>HP 250</td>

                  <td>

                    <span className="estado pendiente">

                      <FaExclamationTriangle />

                      Pendiente

                    </span>

                  </td>

                </tr>

                <tr>

                  <td>#002</td>

                  <td>Santiago Martinez</td>

                  <td>Dell Optiplex</td>

                  <td>

                    <span className="estado proceso">

                      <FaTools />

                      En Proceso

                    </span>

                  </td>

                </tr>

                <tr>

                  <td>#003</td>

                  <td>Juan Beltran</td>

                  <td>Lenovo ThinkCentre</td>

                  <td>

                    <span className="estado resuelto">

                      <FaCheckCircle />

                      Resuelto

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

      {mostrarAmbiente && (

        <div className="modal-overlay">

          <div className="modal">

            <button
              className="modal-close"
              onClick={cerrarModales}
            >
              <FaTimes />
            </button>

            <h2>
              <FaBuilding />
              Registrar Ambiente
            </h2>

            <form onSubmit={registrarAmbiente}>

              <label>
                Nombre del ambiente
              </label>

              <input
                type="text"
                value={nombreAmbiente}
                onChange={(e) =>
                  setNombreAmbiente(e.target.value)
                }
                placeholder="Ej. Ambiente 101"
              />

              <label>
                ID de sede
              </label>

              <input
                type="number"
                value={idSede}
                onChange={(e) =>
                  setIdSede(e.target.value)
                }
                placeholder="Ej. 1"
              />

              <button type="submit">
                <FaBuilding />
                Registrar Ambiente
              </button>

            </form>

          </div>

        </div>

      )}

      {mostrarEquipo && (

        <div className="modal-overlay">

          <div className="modal">

            <button
              className="modal-close"
              onClick={cerrarModales}
            >
              <FaTimes />
            </button>

            <h2>
              <FaLaptop />
              Registrar Equipo
            </h2>

            <form onSubmit={registrarEquipo}>

              <label>
                ID del ambiente
              </label>

              <input
                type="number"
                value={idAmbiente}
                onChange={(e) =>
                  setIdAmbiente(e.target.value)
                }
                placeholder="Ej. 1"
              />

              <label>
                Serial
              </label>

              <input
                type="text"
                value={serial}
                onChange={(e) =>
                  setSerial(e.target.value)
                }
                placeholder="Ej. EQ-001"
              />

              <label>
                Registro único
              </label>

              <input
                type="text"
                value={registroUnico}
                onChange={(e) =>
                  setRegistroUnico(e.target.value)
                }
                placeholder="Ej. REG-001"
              />

              <label>
                Tipo
              </label>

              <input
                type="text"
                value={tipo}
                onChange={(e) =>
                  setTipo(e.target.value)
                }
                placeholder="Ej. Torre PC"
              />

              <label>
                Modelo
              </label>

              <input
                type="text"
                value={modelo}
                onChange={(e) =>
                  setModelo(e.target.value)
                }
                placeholder="Ej. Lenovo ThinkCentre"
              />

              <label>
                Identificador del sistema
              </label>

              <input
                type="text"
                value={identificadorSistema}
                onChange={(e) =>
                  setIdentificadorSistema(
                    e.target.value
                  )
                }
                placeholder="UUID"
              />

              <button type="submit">
                <FaLaptop />
                Registrar Equipo
              </button>

            </form>

          </div>

        </div>

      )}

      {mostrarUsuario && (

        <div className="modal-overlay">

          <div className="modal">

            <button
              className="modal-close"
              onClick={cerrarModales}
            >
              <FaTimes />
            </button>

            <h2>
              <FaUserPlus />
              Registrar Usuario
            </h2>

            <form onSubmit={registrarUsuario}>

              <label>
                Tipo de documento
              </label>

              <select
                value={tipoDocumento}
                onChange={(e) =>
                  setTipoDocumento(e.target.value)
                }
              >
                <option value="">
                  Seleccionar
                </option>

                <option value="CC">
                  CC - Cédula de ciudadanía
                </option>

                <option value="TI">
                  TI - Tarjeta de identidad
                </option>

                <option value="CE">
                  CE - Cédula de extranjería
                </option>

                <option value="PPT">
                  PPT - Permiso por Protección Temporal
                </option>

              </select>

              <label>
                Documento
              </label>

              <input
                type="text"
                value={documento}
                onChange={(e) =>
                  setDocumento(e.target.value)
                }
              />

              <label>
                Nombre
              </label>

              <input
                type="text"
                value={nombre}
                onChange={(e) =>
                  setNombre(e.target.value)
                }
              />

              <label>
                Apellido
              </label>

              <input
                type="text"
                value={apellido}
                onChange={(e) =>
                  setApellido(e.target.value)
                }
              />

              <label>
                Correo
              </label>

              <input
                type="email"
                value={correo}
                onChange={(e) =>
                  setCorreo(e.target.value)
                }
              />

              <label>
                Contraseña
              </label>

              <input
                type="password"
                value={contrasena}
                onChange={(e) =>
                  setContrasena(e.target.value)
                }
              />

              <label>
                Teléfono
              </label>

              <input
                type="text"
                value={telefono}
                onChange={(e) =>
                  setTelefono(e.target.value)
                }
              />

              <label>
                Rol
              </label>

              <select
                value={rol}
                onChange={(e) =>
                  setRol(e.target.value)
                }
              >

                <option value="">
                  Seleccionar rol
                </option>

                <option value="aprendiz">
                  Aprendiz
                </option>

                <option value="instructor">
                  Instructor
                </option>

                <option value="tecnico">
                  Técnico
                </option>

                <option value="administrador">
                  Administrador
                </option>

              </select>

              <button type="submit">
                <FaUserPlus />
                Registrar Usuario
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default DashboardAdmin;