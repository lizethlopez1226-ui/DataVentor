import { useState } from "react";
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

  const registrarEquipo = (e: React.FormEvent) => {
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
          <h2>Registrar equipo nuevo</h2>
          <p>
            Registra un nuevo equipo para mantener actualizado el inventario
            de DataVentor.
          </p>
        </div>

        <section className="equipo-container">
          <div className="equipo-header">
            <div className="equipo-icon">
              <FaLaptop />
            </div>

            <div>
              <h2>Información del equipo</h2>
              <p>Completa los datos del nuevo equipo.</p>
            </div>
          </div>

          <form className="equipo-form" onSubmit={registrarEquipo}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="tipo">Tipo de equipo</label>

                <select
                  id="tipo"
                  name="tipo"
                  value={formulario.tipo}
                  onChange={manejarCambio}
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="Computador">Computador</option>
                  <option value="Portátil">Portátil</option>
                  <option value="Monitor">Monitor</option>
                  <option value="Teclado">Teclado</option>
                  <option value="Mouse">Mouse</option>
                  <option value="Proyector">Proyector</option>
                  <option value="Impresora">Impresora</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="marca">Marca</label>

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
                <label htmlFor="modelo">Modelo</label>

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
                <label htmlFor="serial">Número de serie</label>

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
                <label htmlFor="codigo">Código del equipo</label>

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
                <label htmlFor="ambiente">Ambiente</label>

                <select
                  id="ambiente"
                  name="ambiente"
                  value={formulario.ambiente}
                  onChange={manejarCambio}
                >
                  <option value="">Selecciona un ambiente</option>
                  <option value="Ambiente 101">Ambiente 101</option>
                  <option value="Ambiente 102">Ambiente 102</option>
                  <option value="Ambiente 103">Ambiente 103</option>
                  <option value="Ambiente 104">Ambiente 104</option>
                  <option value="Ambiente 105">Ambiente 105</option>
                </select>
              </div>
            </div>

            <div className="form-group estado-group">
              <label>Estado inicial</label>

              <div className="estado-options">
                <label className="estado-option">
                  <input
                    type="radio"
                    name="estado"
                    value="Funcionando"
                    checked={formulario.estado === "Funcionando"}
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
                    checked={formulario.estado === "Con falla"}
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

              <button type="submit" className="register-button">
                <FaSave />
                Registrar equipo
              </button>
            </div>
          </form>
        </section>
      </main>

      <footer className="admin-footer">
        <p>© 2026 DataVentor - Sistema de gestión de equipos</p>
      </footer>
    </div>
  );
}

export default RegistrarEquipo;