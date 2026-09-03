import "../styles/formularios.css";

import {
  FaUser,
  FaIdCard,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserGraduate,
  FaTools,
  FaUserShield,
  FaChalkboardTeacher
} from "react-icons/fa";

import loginImg from "../assets/registro.svg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";

function Registro() {
  const navigate = useNavigate();

  const [tipoDocumento, setTipoDocumento] = useState("");
  const [documento, setDocumento] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [rol, setRol] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const handleRegistro = async () => {
    setError("");

    if (
      !tipoDocumento ||
      !documento ||
      !nombre ||
      !apellido ||
      !correo ||
      !contrasena ||
      !confirmarContrasena ||
      !rol
    ) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (contrasena !== confirmarContrasena) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setCargando(true);

    try {
      await api.registrar({
        tipo_documento: tipoDocumento,
        documento,
        nombre,
        apellido,
        correo,
        contrasena,
        rol
      });

      alert("Usuario registrado correctamente");

      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error al registrar el usuario");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-container">

      <header className="auth-header">
        <div className="logo">
          <h1>
            Data<span>Ventor</span>
          </h1>
        </div>
      </header>

      <main className="registro-main">

        <section className="auth-card">

          <h2>Crear cuenta</h2>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="input-group">
            <FaIdCard />

            <select
              value={tipoDocumento}
              onChange={(e) => setTipoDocumento(e.target.value)}
            >
              <option value="" disabled>
                Tipo de documento
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
          </div>

          <div className="input-group">
            <FaIdCard />

            <input
              type="text"
              placeholder="Número de documento"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
            />
          </div>

          <div className="input-group">
            <FaUser />

            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="input-group">
            <FaUser />

            <input
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>

          <div className="input-group">
            <FaEnvelope />

            <input
              type="email"
              placeholder="Correo institucional"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div className="input-group password-group">
            <FaLock />

            <input
              type={showPass ? "text" : "password"}
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="input-group password-group">
            <FaLock />

            <input
              type={showPass2 ? "text" : "password"}
              placeholder="Confirmar contraseña"
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPass2(!showPass2)}
            >
              {showPass2 ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="input-group">

            <select
              value={rol}
              onChange={(e) => setRol(e.target.value)}
            >
              <option value="" disabled>
                Selecciona tu rol
              </option>

              <option value="aprendiz">
                Aprendiz
              </option>

              <option value="tecnico">
                Técnico
              </option>

              <option value="administrador">
                Administrador
              </option>

              <option value="instructor">
                Instructor
              </option>
            </select>

          </div>

          <button
            className="auth-btn"
            onClick={handleRegistro}
            disabled={cargando}
          >
            {cargando ? "Registrando..." : "Registrarse"}
          </button>

          <div className="auth-link">
            ¿Ya tienes cuenta?

            <Link to="/login">
              {" "}Iniciar sesión
            </Link>
          </div>

        </section>

        <section className="roles-card">

          <h3>Selecciona tu rol</h3>

          <div className="roles">

            <div className="rol-item">
              <FaUserGraduate className="rol-icon aprendiz" />

              <div>
                <strong>Aprendiz</strong>

                <p>
                  Crear reportes y consultar equipos.
                </p>
              </div>
            </div>

            <div className="rol-item">
              <FaChalkboardTeacher className="rol-icon instructor" />

              <div>
                <strong>Instructor</strong>

                <p>
                  Consultar equipos de su ambiente y realizar solicitudes de mantenimiento.
                </p>
              </div>
            </div>

            <div className="rol-item">
              <FaTools className="rol-icon tecnico" />

              <div>
                <strong>Técnico</strong>

                <p>
                  Mantenimiento y soporte.
                </p>
              </div>
            </div>

            <div className="rol-item">
              <FaUserShield className="rol-icon admin" />

              <div>
                <strong>Administrador</strong>

                <p>
                  Gestión completa del sistema.
                </p>
              </div>
            </div>

          </div>

          <img
            src={loginImg}
            alt="Ilustración Registro"
          />

          <a
            href="https://storyset.com/online"
            target="_blank"
            rel="noreferrer"
          >
            Online illustrations by Storyset
          </a>

        </section>

      </main>

      <footer className="auth-footer">
        © 2026 DataVentor | SENA
      </footer>

    </div>
  );
}

export default Registro;