import { Fullscreen } from "lucide-react";

import "../styles/dashboardAprendiz.css";

import { useEffect, useState } from "react";


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
import { useNavigate } from "react-router-dom";

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
}

function DashboardAdmin() {


  const [mostrarAmbiente, setMostrarAmbiente] =
    useState(false);

  const [mostrarEquipo, setMostrarEquipo] =
    useState(false);

  const [mostrarUsuario, setMostrarUsuario] =
    useState(false);

  const [equipos, setEquipos] = useState(0);

  const [ambientes, setAmbientes] = useState(0);

  const [usuarios, setUsuarios] = useState(0);

  const [pendientes, setPendientes] = useState(0);

  const [reportes, setReportes] =
    useState<Reporte[]>([]);

  const [cargando, setCargando] =
    useState(true);

  const [nombreAmbiente, setNombreAmbiente] =
    useState("");

  const [idSede, setIdSede] =
    useState("");

  const [idAmbiente, setIdAmbiente] =
    useState("");

  const [serial, setSerial] =
    useState("");

  const [registroUnico, setRegistroUnico] =
    useState("");

  const [tipo, setTipo] =
    useState("");

  const [modelo, setModelo] =
    useState("");

  const [identificadorSistema, setIdentificadorSistema] =
    useState("");

  const [tipoDocumento, setTipoDocumento] =
    useState("");

  const [documento, setDocumento] =
    useState("");

  const [nombre, setNombre] =
    useState("");

  const [apellido, setApellido] =
    useState("");

  const [correo, setCorreo] =
    useState("");

  const [contrasena, setContrasena] =
    useState("");

  const [telefono, setTelefono] =
    useState("");

  const [rol, setRol] =
    useState("");

  const cargarDashboard = async () => {

    try {

      setCargando(true);

      const [
        equiposResponse,
        ambientesResponse,
        usuariosResponse,
        reportesResponse
      ] = await Promise.all([

        fetch(
          `${API_URL}/api/equipos`
        ),

        fetch(
          `${API_URL}/api/ambientes`
        ),

        fetch(
          `${API_URL}/api/usuarios`
        ),

        fetch(
          `${API_URL}/api/reportes`
        )

      ]);

      const equiposData =
        await equiposResponse.json();

      const ambientesData =
        await ambientesResponse.json();

      const usuariosData =
        await usuariosResponse.json();

      const reportesData =
        await reportesResponse.json();

      if (!equiposResponse.ok) {
        throw new Error(
          equiposData.mensaje ||
          "No se pudieron consultar los equipos."
        );
      }

      if (!ambientesResponse.ok) {
        throw new Error(
          ambientesData.mensaje ||
          "No se pudieron consultar los ambientes."
        );
      }

      if (!usuariosResponse.ok) {
        throw new Error(
          usuariosData.mensaje ||
          "No se pudieron consultar los usuarios."
        );
      }

      if (!reportesResponse.ok) {
        throw new Error(
          reportesData.mensaje ||
          "No se pudieron consultar los reportes."
        );
      }

      setEquipos(
        Array.isArray(equiposData)
          ? equiposData.length
          : 0
      );

      setAmbientes(
        Array.isArray(ambientesData)
          ? ambientesData.length
          : 0
      );

      setUsuarios(
        Array.isArray(usuariosData)
          ? usuariosData.length
          : 0
      );

      setReportes(
        Array.isArray(reportesData)
          ? reportesData
          : []
      );

      setPendientes(
        Array.isArray(reportesData)
          ? reportesData.filter(
              (reporte: Reporte) =>
                reporte.estado_reporte ===
                "pendiente"
            ).length
          : 0
      );

    } catch (error) {

      console.error(
        "Error cargando dashboard:",
        error
      );

    } finally {

      setCargando(false);

    }
  };

  useEffect(() => {

    cargarDashboard();

  }, []);

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

      alert(
        "Completa todos los campos."
      );

      return;
    }

    try {

      const response = await fetch(
        `${API_URL}/api/ambientes`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            nombre: nombreAmbiente,
            id_sede: Number(idSede),
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.mensaje ||
          "No fue posible registrar el ambiente."
        );

      }

      alert(
        "Ambiente registrado correctamente."
      );

      setNombreAmbiente("");
      setIdSede("");

      cerrarModales();

      cargarDashboard();

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

      alert(
        "Completa todos los campos obligatorios."
      );

      return;
    }

    try {

      const response = await fetch(
        `${API_URL}/api/equipos`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            id_ambiente:
              Number(idAmbiente),

            serial,

            registro_unico:
              registroUnico,

            tipo,

            modelo,

            identificador_sistema:
              identificadorSistema ||
              null,

          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.mensaje ||
          "No fue posible registrar el equipo."
        );

      }

      alert(
        "Equipo registrado correctamente."
      );

      setIdAmbiente("");
      setSerial("");
      setRegistroUnico("");
      setTipo("");
      setModelo("");
      setIdentificadorSistema("");

      cerrarModales();

      cargarDashboard();

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

      alert(
        "Completa todos los campos obligatorios."
      );

      return;
    }

    try {

      const response = await fetch(
        `${API_URL}/api/registro`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            tipo_documento:
              tipoDocumento,

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

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.mensaje ||
          "No fue posible registrar el usuario."
        );

      }

      alert(
        "Usuario registrado correctamente."
      );

      setTipoDocumento("");
      setDocumento("");
      setNombre("");
      setApellido("");
      setCorreo("");
      setContrasena("");
      setTelefono("");
      setRol("");

      cerrarModales();

      cargarDashboard();

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
            Bienvenido Administrador 👋🏻
          </h2>

          <p>
            Resumen general del sistema
          </p>

        </section>

        <section className="cards">

          <div className="card purple">

            <FaLaptop size={32} />

            <h3>
              {cargando
                ? "..."
                : equipos}
            </h3>

            <span>
              Equipos Totales
            </span>

          </div>

          <div className="card blue">

            <FaBuilding size={32} />

            <h3>
              {cargando
                ? "..."
                : ambientes}
            </h3>

            <span>
              Ambientes
            </span>

          </div>

          <div className="card orange">

            <FaExclamationTriangle
              size={32}
            />

            <h3>
              {cargando
                ? "..."
                : pendientes}
            </h3>

            <span>
              Pendientes
            </span>

          </div>

          <div className="card green">

            <FaUsers size={32} />

            <h3>
              {cargando
                ? "..."
                : usuarios}
            </h3>

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

                {cargando ? (

                  <tr>

                    <td colSpan={4}>
                      Cargando reportes...
                    </td>

                  </tr>

                ) : reportes.length === 0 ? (

                  <tr>

                    <td colSpan={4}>
                      No hay reportes registrados.
                    </td>

                  </tr>

                ) : (

                  reportes
                    .slice(0, 5)
                    .map((reporte) => (

                      <tr
                        key={
                          reporte.id_reporte
                        }
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
                            `Equipo #${reporte.id_equipo}`}
                        </td>

                        <td>

                          {reporte.estado_reporte ===
                            "pendiente" && (

                            <span className="estado pendiente">

                              <FaExclamationTriangle />

                              Pendiente

                            </span>

                          )}

                          {reporte.estado_reporte ===
                            "en_revision" && (

                            <span className="estado proceso">

                              <FaTools />

                              En Proceso

                            </span>

                          )}

                          {reporte.estado_reporte ===
                            "resuelto" && (

                            <span className="estado resuelto">

                              <FaCheckCircle />

                              Resuelto

                            </span>

                          )}

                          {reporte.estado_reporte ===
                            "cerrado" && (

                            <span className="estado resuelto">

                              <FaCheckCircle />

                              Cerrado

                            </span>

                          )}

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

            <form
              onSubmit={registrarAmbiente}
            >

              <label>
                Nombre del ambiente
              </label>

              <input
                type="text"
                value={nombreAmbiente}
                onChange={(e) =>
                  setNombreAmbiente(
                    e.target.value
                  )
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
                  setIdSede(
                    e.target.value
                  )
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

            <form
              onSubmit={registrarEquipo}
            >

              <label>
                ID del ambiente
              </label>

              <input
                type="number"
                value={idAmbiente}
                onChange={(e) =>
                  setIdAmbiente(
                    e.target.value
                  )
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
                  setSerial(
                    e.target.value
                  )
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
                  setRegistroUnico(
                    e.target.value
                  )
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
                  setTipo(
                    e.target.value
                  )
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
                  setModelo(
                    e.target.value
                  )
                }
                placeholder="Ej. Lenovo ThinkCentre"
              />

              <label>
                Identificador del sistema
              </label>

              <input
                type="text"
                value={
                  identificadorSistema
                }
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

            <form
              onSubmit={registrarUsuario}
            >

              <label>
                Tipo de documento
              </label>

              <select
                value={tipoDocumento}
                onChange={(e) =>
                  setTipoDocumento(
                    e.target.value
                  )
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
                  setDocumento(
                    e.target.value
                  )
                }
              />

              <label>
                Nombre
              </label>

              <input
                type="text"
                value={nombre}
                onChange={(e) =>
                  setNombre(
                    e.target.value
                  )
                }
              />

              <label>
                Apellido
              </label>

              <input
                type="text"
                value={apellido}
                onChange={(e) =>
                  setApellido(
                    e.target.value
                  )
                }
              />

              <label>
                Correo
              </label>

              <input
                type="email"
                value={correo}
                onChange={(e) =>
                  setCorreo(
                    e.target.value
                  )
                }
              />

              <label>
                Contraseña
              </label>

              <input
                type="password"
                value={contrasena}
                onChange={(e) =>
                  setContrasena(
                    e.target.value
                  )
                }
              />

              <label>
                Teléfono
              </label>

              <input
                type="text"
                value={telefono}
                onChange={(e) =>
                  setTelefono(
                    e.target.value
                  )
                }
              />

              <label>
                Rol
              </label>

              <select
                value={rol}
                onChange={(e) =>
                  setRol(
                    e.target.value
                  )
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