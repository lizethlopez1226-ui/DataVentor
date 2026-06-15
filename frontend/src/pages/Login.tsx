import "../styles/formularios.css";
import { FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash 
} from "react-icons/fa";

import { useState } from "react";
import { Link } from "react-router-dom";
import loginImg from "../assets/login.svg";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-container">

      <header className="auth-header">
        <div className="logo">
          <span>DataVentor</span>
        </div>
      </header>

      <main className="auth-main">

        <section className="auth-card">

          <h2>Bienvenido</h2>
          <p className="subtitle">
            Inicia sesión para continuar
          </p>

          <div className="input-group">
            <FaEnvelope />
            <input
              type="email"
              placeholder="Correo institucional"
            />
          </div>

          <div className="input-group password-group">

            <FaLock />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          <button className="auth-btn">
            Ingresar
          </button>

          <div className="auth-link">
            ¿No tienes cuenta?
            <Link to="/registro"> Registrarse</Link>
          </div>

        </section>

        <section className="auth-left">

              <img src={loginImg} alt="Ilustración Login" />
                <a href="https://storyset.com/people"></a>

          <h2>DataVentor</h2>

          <p>
            Sistema de gestión y mantenimiento
            de equipos de cómputo.
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