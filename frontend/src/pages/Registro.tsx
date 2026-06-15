import "../styles/formularios.css";
import {
  FaUser,
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
import { Link } from "react-router-dom";

function Registro() {

  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  return (
    <div className="auth-container">

     <header className="auth-header">
    <div className="logo">
        <span>DataVentor</span>
    </div>
</header>


      <main className="registro-main">

        <section className="auth-card">

          <h2>Crear cuenta</h2>

          <div className="input-group">
            <FaUser />
            <input
              type="text"
              placeholder="Nombre completo"
            />
          </div>

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
              type={showPass ? "text" : "password"}
              placeholder="Contraseña"
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
            <select>
              <option>Selecciona tu rol</option>
              <option>Aprendiz</option>
              <option>Técnico</option>
              <option>Administrador</option>
              <option>Instructor</option>
            </select>
          </div>

          <button className="auth-btn">
            Registrarse
          </button>

          <div className="auth-link">
            ¿Ya tienes cuenta?
            <Link to="/"> Iniciar sesión</Link>
          </div>

        </section>

        <section className="roles-card">

  <h3>Selecciona tu rol</h3>

  <div className="roles">

    <div className="rol-item">
      <FaUserGraduate className="rol-icon aprendiz" />
      <div>
        <strong>Aprendiz</strong>
        <p>Crear reportes y consultar equipos.</p>
      </div>
    </div>

    <div className="rol-item">
      <FaChalkboardTeacher className="rol-icon instructor" />
      <div>
        <strong>Instructor</strong>
        <p>Consultar equipos de su ambiente y realizar solicitudes de mantenimiento.</p>
      </div>
    </div>

    <div className="rol-item">
      <FaTools className="rol-icon tecnico" />
      <div>
        <strong>Técnico</strong>
        <p>Mantenimiento y soporte.</p>
      </div>
    </div>

    <div className="rol-item">
      <FaUserShield className="rol-icon admin" />
      <div>
        <strong>Administrador</strong>
        <p>Gestión completa del sistema.</p>
      </div>
    </div>

  </div>
       
         <img src={loginImg} alt="Ilustración Registro"/>
         <a href="https://storyset.com/online">Online illustrations by Storyset</a>

        </section>

      </main>

      <footer className="auth-footer">
        © 2026 DataVentor | SENA
      </footer>

    </div>
  );
}

export default Registro;