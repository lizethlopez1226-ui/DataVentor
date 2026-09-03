import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaIdCard,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import loginImg from "../assets/login.svg";
import "../styles/formularios.css";
import { api } from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [tipoDocumento, setTipoDocumento] = useState("");
  const [documento, setDocumento] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!tipoDocumento || !documento || !contrasena) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setCargando(true);

    try {
      const respuesta = await api.login(
        tipoDocumento,
        documento,
        contrasena
      );

      localStorage.setItem(
        "usuario",
        JSON.stringify(respuesta.usuario)
      );

      const rol = respuesta.usuario.rol.toLowerCase();

      console.log("RESPUESTA LOGIN:", respuesta);
      console.log("ROL RECIBIDO:", respuesta.usuario.rol);


      switch (rol) {
        case "administrador":
          navigate("/dashboard-admin");
          break;

        case "aprendiz":
          navigate("/dashboard-aprendiz");
          break;

        case "tecnico":
          navigate("/dashboard-tecnico");
          break;

        case "instructor":
          navigate("/dashboard-instructor");
          break;

        default:
          setError("El rol del usuario no es válido");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error al iniciar sesión");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-container">

      <header className="auth-header">
        <div className="logo">
          Data<span>Ventor</span>
        </div>
      </header>

      <main className="auth-main">

        <section className="auth-card">

          <h2>Bienvenido</h2>

          <p className="subtitle">
            Inicia sesión para continuar
          </p>

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
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              placeholder="Número de documento"
            />
          </div>

          <div className="input-group password-group">
            <FaLock />

            <input
              type={mostrarContrasena ? "text" : "password"}
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="Contraseña"
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() =>
                setMostrarContrasena(!mostrarContrasena)
              }
            >
              {mostrarContrasena ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <button
            className="auth-btn"
            onClick={handleLogin}
            disabled={cargando}
          >
            {cargando ? "Ingresando..." : "Ingresar"}
          </button>

          <div className="auth-link">
            ¿No tienes cuenta?

            <Link to="/registro">
              {" "}Registrarse
            </Link>
          </div>

        </section>

        <section className="auth-left">

          <img
            src={loginImg}
            alt="Ilustración Login"
          />

          <h2>DataVentor</h2>

          <p>
            Sistema de gestión y mantenimiento de equipos de cómputo.
          </p>

        </section>

      </main>

      <footer className="auth-footer">
        © 2026 DataVentor | SENA
      </footer>

    </div>
  );
}

export default Login;