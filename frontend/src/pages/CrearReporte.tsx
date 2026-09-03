import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaChartBar,
  FaLaptop,
  FaBuilding,
  FaExclamationTriangle,
  FaCheckCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import "../styles/CrearReporte.css";
import { api } from "../services/api";

interface EquipoDetectado {
  id_equipo: number;
  id_ambiente: number | null;
  serial: string;
  registro_unico: string;
  identificador_sistema: string;
  tipo: string;
  modelo: string;
  estado: string;
}

function ReportarEquipo() {
  const navigate = useNavigate();

  const [equipoDetectado, setEquipoDetectado] =
    useState<EquipoDetectado | null>(null);

  const [prioridad, setPrioridad] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [cargandoEquipo, setCargandoEquipo] = useState(true);
  const [cargando, setCargando] = useState(false);
  const [errorEquipo, setErrorEquipo] = useState("");

  useEffect(() => {
    const cargarEquipo = async () => {
      try {
        setCargandoEquipo(true);
        setErrorEquipo("");

        const equipo = await api.getIdentificadorEquipo();

        setEquipoDetectado(equipo as EquipoDetectado);
      } catch (error) {
        if (error instanceof Error) {
          setErrorEquipo(error.message);
        } else {
          setErrorEquipo(
            "No fue posible detectar el equipo."
          );
        }
      } finally {
        setCargandoEquipo(false);
      }
    };

    cargarEquipo();
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  const enviarReporte = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!equipoDetectado) {
      alert("No se ha detectado un equipo registrado.");
      return;
    }

    if (!prioridad || !descripcion.trim()) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const usuarioGuardado = localStorage.getItem("usuario");

    if (!usuarioGuardado) {
      alert("No hay una sesión activa.");
      navigate("/login");
      return;
    }

    try {
      const usuario = JSON.parse(usuarioGuardado);

      setCargando(true);

      const respuesta = await api.crearReporte({
        id_equipo: equipoDetectado.id_equipo,
        id_usuario: Number(usuario.id_usuario),
        descripcion: descripcion.trim(),
        prioridad: prioridad as "baja" | "media" | "alta",
      });

      alert(
        `${respuesta.mensaje}\nReporte #${respuesta.id_reporte}`
      );

      setPrioridad("");
      setDescripcion("");

      navigate("/mis-reportes");

    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("No fue posible crear el reporte.");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="report-page">

      <header className="topbar">

        <h1>
          Data<span>Ventor</span>
        </h1>

        <nav>

          <a href="/dashboard-aprendiz">
            <FaHome size={18} />
            Inicio
          </a>

          <a href="/mis-reportes">
            <FaChartBar size={18} />
            Reportes
          </a>

          <a
            href="/login"
            onClick={cerrarSesion}
          >
            <FaSignOutAlt size={18} />
            Cerrar Sesión
          </a>

        </nav>

      </header>

      <main className="report-content">

        <section className="report-title">

          <div>

            <h1>Reportar equipo</h1>

            <p>
              Registra un problema o novedad
              de un equipo.
            </p>

          </div>

        </section>

        <section className="report-container">

          <div className="report-header">

            <div className="report-icon">
              <FaExclamationTriangle />
            </div>

            <div>

              <h2>Nuevo reporte</h2>

              <p>
                Completa la información de la novedad
                del equipo detectado.
              </p>

            </div>

          </div>

          <form
            className="report-form"
            onSubmit={enviarReporte}
          >

            <div className="form-row">

              <div className="form-group">

                <label>
                  <FaBuilding />
                  Ambiente
                </label>

                <div className="input-group">
                  {cargandoEquipo
                    ? "Detectando ambiente..."
                    : equipoDetectado
                    ? `Ambiente ${equipoDetectado.id_ambiente ?? "No asignado"}`
                    : "No disponible"}
                </div>

              </div>

              <div className="form-group">

                <label>
                  <FaLaptop />
                  Equipo detectado
                </label>

                <div className="input-group">

                  {cargandoEquipo && (
                    <span>
                      Detectando equipo...
                    </span>
                  )}

                  {!cargandoEquipo &&
                    equipoDetectado && (
                      <span>
                        {equipoDetectado.serial} -{" "}
                        {equipoDetectado.modelo}
                      </span>
                    )}

                  {!cargandoEquipo &&
                    !equipoDetectado && (
                      <span>
                        Equipo no encontrado
                      </span>
                    )}

                </div>

              </div>

            </div>

            {errorEquipo && (
              <div className="error-message">
                {errorEquipo}
              </div>
            )}

            {equipoDetectado && (
              <div className="form-group">

                <label>
                  <FaLaptop />
                  Información del equipo
                </label>

                <div className="input-group">
                  Serial: {equipoDetectado.serial}
                  {" | "}
                  Registro: {equipoDetectado.registro_unico}
                </div>

              </div>
            )}

            <div className="form-group">

              <label>
                <FaExclamationTriangle />
                Prioridad del reporte
              </label>

              <div className="status-options">

                <label
                  className={`status-option ${
                    prioridad === "baja"
                      ? "selected"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="prioridad"
                    value="baja"
                    checked={prioridad === "baja"}
                    onChange={(e) =>
                      setPrioridad(e.target.value)
                    }
                  />

                  <FaCheckCircle />

                  <span>
                    Baja
                  </span>

                </label>

                <label
                  className={`status-option ${
                    prioridad === "media"
                      ? "selected"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="prioridad"
                    value="media"
                    checked={prioridad === "media"}
                    onChange={(e) =>
                      setPrioridad(e.target.value)
                    }
                  />

                  <FaExclamationTriangle />

                  <span>
                    Media
                  </span>

                </label>

                <label
                  className={`status-option ${
                    prioridad === "alta"
                      ? "selected"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="prioridad"
                    value="alta"
                    checked={prioridad === "alta"}
                    onChange={(e) =>
                      setPrioridad(e.target.value)
                    }
                  />

                  <FaExclamationTriangle />

                  <span>
                    Alta
                  </span>

                </label>

              </div>

            </div>

            <div className="form-group">

              <label htmlFor="descripcion">
                Descripción del problema
              </label>

              <textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) =>
                  setDescripcion(e.target.value)
                }
                placeholder="Describe el problema o novedad del equipo..."
                rows={6}
              />

            </div>

            <div className="form-actions">

              <button
                type="button"
                className="cancel-button"
                onClick={() => navigate(-1)}
                disabled={cargando}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="report-button"
                disabled={
                  cargando ||
                  cargandoEquipo ||
                  !equipoDetectado
                }
              >

                <FaExclamationTriangle />

                {cargando
                  ? "Enviando..."
                  : "Enviar reporte"}

              </button>

            </div>

          </form>

        </section>

      </main>

      <footer className="admin-footer">

        <p>
          © 2026 DataVentor — Sistema de gestión de equipos
        </p>

      </footer>

    </div>
  );
}

export default ReportarEquipo;