import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/registrarAmbiente.css";

function RegistrarAmbiente() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("Activo");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert("Ambiente registrado correctamente");

    setNombre("");
    setCodigo("");
    setCapacidad("");
    setUbicacion("");
    setDescripcion("");
    setEstado("Activo");
  };

  return (
    <div className="registrar-ambiente">

      <header className="header-ambiente">
        <h1>Data<span>Ventor</span></h1>

        <button onClick={() => navigate("/dashboard-admin")}>
          Volver
        </button>
      </header>

      <main className="contenedor-ambiente">

        <div className="titulo-ambiente">
          <h2>Registrar ambiente</h2>
          <p>
            Registra un nuevo ambiente en el sistema.
          </p>
        </div>

        <form
          className="formulario-ambiente"
          onSubmit={handleSubmit}
        >

          <div className="campo">
            <label htmlFor="nombre">
              Nombre del ambiente
            </label>

            <input
              id="nombre"
              type="text"
              placeholder="Ej: Ambiente de Sistemas"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>


          <div className="campo">
            <label htmlFor="codigo">
              Código del ambiente
            </label>

            <input
              id="codigo"
              type="text"
              placeholder="Ej: 302"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
            />
          </div>


          <div className="campo">
            <label htmlFor="capacidad">
              Capacidad
            </label>

            <input
              id="capacidad"
              type="number"
              placeholder="Ej: 30"
              value={capacidad}
              onChange={(e) => setCapacidad(e.target.value)}
              required
            />
          </div>


          <div className="campo">
            <label htmlFor="ubicacion">
              Ubicación
            </label>

            <input
              id="ubicacion"
              type="text"
              placeholder="Ej: Bloque A - Segundo piso"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              required
            />
          </div>


          <div className="campo">
            <label htmlFor="descripcion">
              Descripción
            </label>

            <textarea
              id="descripcion"
              placeholder="Escribe una descripción del ambiente..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={4}
            />
          </div>


          <div className="campo">
            <label htmlFor="estado">
              Estado
            </label>

            <select
              id="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>


          <div className="acciones-ambiente">

            <button
              type="button"
              className="btn-cancelar"
              onClick={() => navigate("/dashboard-admin")}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="btn-registrar"
            >
              Registrar ambiente
            </button>

          </div>

        </form>

      </main>

       <footer className="footer">
        © 2026 DataVentor | SENA
      </footer>
      
    </div>
  );
}

export default RegistrarAmbiente;