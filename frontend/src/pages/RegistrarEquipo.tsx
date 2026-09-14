import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaChartBar,
  FaUserShield,
  FaSignOutAlt,
  FaLaptop,
  FaSave,
  FaTimes
} from "react-icons/fa";

import "../styles/registrarEquipo.css";

const API_URL = "http://127.0.0.1:5001";

interface Ambiente {
  id_ambiente: number;
  nombre: string;
}

interface Equipo {
  id_equipo: number;
  id_ambiente: number;
  serial: string;
  registro_unico: string;
  identificador_sistema: string;
  tipo: string;
  modelo: string;
  estado: string;
}

function RegistrarEquipo() {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    tipo: "",
    marca: "",
    modelo: "",
    serial: "",
    codigo: "",
    ambiente: "",
    estado: "Funcionando"
  });

  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
  const [cargando, setCargando] = useState(false);

  // =====================================================
  // CONSULTAR EQUIPOS Y AMBIENTES AL CARGAR LA PÁGINA
  // =====================================================
  useEffect(() => {
    cargarEquipos();
    cargarAmbientes();
  }, []);

  const cargarEquipos = async () => {
    try {
      const respuesta = await fetch(`${API_URL}/api/equipos`);

      if (!respuesta.ok) {
        throw new Error("No se pudieron consultar los equipos");
      }

      const datos = await respuesta.json();

      setEquipos(datos);
    } catch (error) {
      console.error("Error al cargar equipos:", error);
      alert("No fue posible cargar los equipos.");
    }
  };

  const cargarAmbientes = async () => {
    try {
      const respuesta = await fetch(`${API_URL}/api/ambientes`);

      if (!respuesta.ok) {
        throw new Error("No se pudieron consultar los ambientes");
      }

      const datos = await respuesta.json();

      setAmbientes(datos);
    } catch (error) {
      console.error("Error al cargar ambientes:", error);
      alert("No fue posible cargar los ambientes.");
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  // =====================================================
  // REGISTRAR EQUIPO EN LA API
  // =====================================================
  const registrarEquipo = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !formulario.tipo ||
      !formulario.marca ||
      !formulario.modelo ||
      !formulario.serial ||
      !formulario.codigo ||
      !formulario.ambiente
    ) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      setCargando(true);

      const datosEquipo = {
        id_ambiente: Number(formulario.ambiente),
        serial: formulario.serial,
        registro_unico: formulario.codigo,
        tipo: formulario.tipo,
        modelo: formulario.modelo
      };

      const respuesta = await fetch(
        `${API_URL}/api/equipos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(datosEquipo)
        }
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          datos.error || "No se pudo registrar el equipo"
        );
      }

      alert("Equipo registrado correctamente.");

      setFormulario({
        tipo: "",
        marca: "",
        modelo: "",
        serial: "",
        codigo: "",
        ambiente: "",
        estado: "Funcionando"
      });

      // Actualizamos la lista después del registro
      await cargarEquipos();

    } catch (error) {
      console.error("Error al registrar equipo:", error);

      alert(
        error instanceof Error
          ? error.message
          : "No fue posible registrar el equipo."
      );
    } finally {
      setCargando(false);
    }
  };

  const cancelar = () => {
    navigate("/dashboard-admin");
  };

  return (
    <div className="registrar-equipo-page">

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

          <a href="/login" onClick={cerrarSesion}>
            <FaSignOutAlt size={18} />
            Cerrar Sesión
          </a>

        </nav>

        <div className="user">
          <FaUserShield />
          Administrador
        </div>

      </header>

      <main className="registrar-equipo-content">

        <div className="registrar-equipo-title">

          <h2>
            Registrar equipo nuevo
          </h2>

          <p>
            Registra un nuevo equipo para mantener
            actualizado el inventario de DataVentor.
          </p>

        </div>

        {/* =================================================
            FORMULARIO
        ================================================== */}

        <section className="equipo-container">

          <div className="equipo-header">

            <div className="equipo-icon">
              <FaLaptop />
            </div>

            <div>

              <h2>
                Información del equipo
              </h2>

              <p>
                Completa los datos del nuevo equipo.
              </p>

            </div>

          </div>

          <form
            className="equipo-form"
            onSubmit={registrarEquipo}
          >

            <div className="form-row">

              <div className="form-group">

                <label htmlFor="tipo">
                  Tipo de equipo
                </label>

                <select
                  id="tipo"
                  name="tipo"
                  value={formulario.tipo}
                  onChange={manejarCambio}
                >

                  <option value="">
                    Selecciona un tipo
                  </option>

                  <option value="Computador">
                    Computador
                  </option>

                  <option value="Portátil">
                    Portátil
                  </option>

                  <option value="Monitor">
                    Monitor
                  </option>

                  <option value="Teclado">
                    Teclado
                  </option>

                  <option value="Mouse">
                    Mouse
                  </option>

                  <option value="Proyector">
                    Proyector
                  </option>

                  <option value="Impresora">
                    Impresora
                  </option>

                  <option value="Otro">
                    Otro
                  </option>

                </select>

              </div>

              <div className="form-group">

                <label htmlFor="marca">
                  Marca
                </label>

                <input
                  type="text"
                  id="marca"
                  name="marca"
                  value={formulario.marca}
                  onChange={manejarCambio}
                  placeholder="Ej: Lenovo"
                />

              </div>

            </div>

            <div className="form-row">

              <div className="form-group">

                <label htmlFor="modelo">
                  Modelo
                </label>

                <input
                  type="text"
                  id="modelo"
                  name="modelo"
                  value={formulario.modelo}
                  onChange={manejarCambio}
                  placeholder="Ej: ThinkPad E14"
                />

              </div>

              <div className="form-group">

                <label htmlFor="serial">
                  Número de serie
                </label>

                <input
                  type="text"
                  id="serial"
                  name="serial"
                  value={formulario.serial}
                  onChange={manejarCambio}
                  placeholder="Ej: PF12345678"
                />

              </div>

            </div>

            <div className="form-row">

              <div className="form-group">

                <label htmlFor="codigo">
                  Código del equipo
                </label>

                <input
                  type="text"
                  id="codigo"
                  name="codigo"
                  value={formulario.codigo}
                  onChange={manejarCambio}
                  placeholder="Ej: EQ-001"
                />

              </div>

              <div className="form-group">

                <label htmlFor="ambiente">
                  Ambiente
                </label>

                <select
                  id="ambiente"
                  name="ambiente"
                  value={formulario.ambiente}
                  onChange={manejarCambio}
                >

                  <option value="">
                    Selecciona un ambiente
                  </option>

                  {ambientes.map((ambiente) => (
                    <option
                      key={ambiente.id_ambiente}
                      value={ambiente.id_ambiente}
                    >
                      {ambiente.nombre}
                    </option>
                  ))}

                </select>

              </div>

            </div>

            <div className="form-group estado-group">

              <label>
                Estado inicial
              </label>

              <div className="estado-options">

                <label className="estado-option">

                  <input
                    type="radio"
                    name="estado"
                    value="Funcionando"
                    checked={
                      formulario.estado === "Funcionando"
                    }
                    onChange={manejarCambio}
                  />

                  <span className="estado-activo">
                    Funcionando
                  </span>

                </label>

                <label className="estado-option">

                  <input
                    type="radio"
                    name="estado"
                    value="Con falla"
                    checked={
                      formulario.estado === "Con falla"
                    }
                    onChange={manejarCambio}
                  />

                  <span className="estado-falla">
                    Con falla
                  </span>

                </label>

              </div>

            </div>

            <div className="form-actions">

              <button
                type="button"
                className="cancel-button"
                onClick={cancelar}
              >
                <FaTimes />
                Cancelar
              </button>

              <button
                type="submit"
                className="register-button"
                disabled={cargando}
              >

                <FaSave />

                {cargando
                  ? "Registrando..."
                  : "Registrar equipo"}

              </button>

            </div>

          </form>

        </section>

        {/* =================================================
            LISTADO DE EQUIPOS
        ================================================== */}

        <section className="equipo-container lista-equipos">

          <div className="equipo-header">

            <div className="equipo-icon">
              <FaLaptop />
            </div>

            <div>

              <h2>
                Equipos registrados
              </h2>

              <p>
                Lista de equipos consultados desde
                la API de DataVentor.
              </p>

            </div>

          </div>

          {equipos.length === 0 ? (

            <p>
              No hay equipos registrados.
            </p>

          ) : (

            <div style={{ overflowX: "auto" }}>

              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse"
                }}
              >

                <thead>

                  <tr>

                    <th>Serial</th>
                    <th>Registro</th>
                    <th>Tipo</th>
                    <th>Modelo</th>
                    <th>Estado</th>

                  </tr>

                </thead>

                <tbody>

                  {equipos.map((equipo) => (

                    <tr key={equipo.id_equipo}>

                      <td>
                        {equipo.serial}
                      </td>

                      <td>
                        {equipo.registro_unico}
                      </td>

                      <td>
                        {equipo.tipo}
                      </td>

                      <td>
                        {equipo.modelo}
                      </td>

                      <td>
                        {equipo.estado}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>

      <footer className="admin-footer">

        <p>
          © 2026 DataVentor - Sistema de gestión
          de equipos
        </p>

      </footer>

    </div>
  );
}

export default RegistrarEquipo;