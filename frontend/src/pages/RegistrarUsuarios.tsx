import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaHome,
    FaChartBar,
    FaUserShield,
    FaUserGraduate,
    FaChalkboardTeacher,
    FaTrash
} from "react-icons/fa";
import "../styles/RegistrarUsuario.css";

interface Usuario {
    id: number;
    nombre: string;
    programa?: string;
    estado: string;
}

const aprendices: Usuario[] = [
    {
        id: 1,
        nombre: "Juan Beltrán",
        programa: "ADSO",
        estado: "Activo",
    },
    {
        id: 2,
        nombre: "María López",
        programa: "ADSO",
        estado: "Activo",
    },
    {
        id: 3,
        nombre: "Carlos Rodríguez",
        programa: "ADSO",
        estado: "Inactivo",
    },
];

const instructores: Usuario[] = [
    {
        id: 4,
        nombre: "Carlos Martínez",
        estado: "Activo",
    },
    {
        id: 5,
        nombre: "Laura Gómez",
        estado: "Activo",
    },
    {
        id: 6,
        nombre: "Andrés Pérez",
        estado: "Inactivo",
    },
];

function UsuariosAdmin() {
    const navigate = useNavigate();

    const [tipo, setTipo] = useState<"aprendices" | "instructores">(
        "aprendices"
    );

    const [usuarioSeleccionado, setUsuarioSeleccionado] =
        useState<Usuario | null>(aprendices[0]);

    const usuarios =
        tipo === "aprendices" ? aprendices : instructores;

    const cambiarTipo = (
        nuevoTipo: "aprendices" | "instructores"
    ) => {
        setTipo(nuevoTipo);

        if (nuevoTipo === "aprendices") {
            setUsuarioSeleccionado(aprendices[0]);
        } else {
            setUsuarioSeleccionado(instructores[0]);
        }
    };

    const eliminarUsuario = (id: number) => {
        alert(`Usuario ${id} seleccionado para eliminar.`);
    };

    const cerrarSesion = () => {
        localStorage.removeItem("usuario");
        navigate("/login");
    };

    return (
        <div className="dashboard-admin">

            <header className="topbar">

                <h1>Data<span>Ventor</span></h1>

                <nav>
                    <a href="/dashboard-admin">
                        <FaHome size={18} />
                        Inicio
                    </a>

                    <a href="/detalle-reporte">
                        <FaChartBar size={18} />
                        Reportes
                    </a>

                    <a
                        href="/login"
                        onClick={cerrarSesion}
                    >
                        Cerrar Sesión
                    </a>
                </nav>

                <div className="user">
                    <FaUserShield />
                    Administrador
                </div>

            </header>

            <main className="admin-content">

                <div className="admin-title">
                    <h1>Gestión de usuarios</h1>

                    <p>
                        Administra aprendices e instructores registrados
                        en DataVentor.
                    </p>
                </div>

                <section className="selection-cards">

                    <button
                        type="button"
                        className={`selection-card ${
                            tipo === "aprendices"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            cambiarTipo("aprendices")
                        }
                    >
                        <div className="card-icon">
                            <FaUserGraduate />
                        </div>

                        <div>
                            <h2>Aprendices</h2>

                            <p>
                                Gestionar aprendices registrados
                            </p>
                        </div>
                    </button>

                    <button
                        type="button"
                        className={`selection-card ${
                            tipo === "instructores"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            cambiarTipo("instructores")
                        }
                    >
                        <div className="card-icon">
                            <FaChalkboardTeacher />
                        </div>

                        <div>
                            <h2>Instructores</h2>

                            <p>
                                Gestionar instructores registrados
                            </p>
                        </div>
                    </button>

                </section>

                <section className="users-section">

                    <div className="users-list">

                        <div className="section-header">

                            <h2>
                                {tipo === "aprendices"
                                    ? "Aprendices"
                                    : "Instructores"}
                            </h2>

                            <span>
                                {usuarios.length} usuarios registrados
                            </span>

                        </div>

                        <div className="user-items">

                            {usuarios.map((usuario) => (

                                <div
                                    key={usuario.id}
                                    className={`user-item ${
                                        usuarioSeleccionado?.id ===
                                        usuario.id
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setUsuarioSeleccionado(usuario)
                                    }
                                >

                                    <div className="user-info">

                                        <div className="user-avatar">
                                            {usuario.nombre.charAt(0)}
                                        </div>

                                        <div>
                                            <h3>
                                                {usuario.nombre}
                                            </h3>

                                            {usuario.programa && (
                                                <p>
                                                    {usuario.programa}
                                                </p>
                                            )}
                                        </div>

                                    </div>

                                    <div className="user-status">

                                        <span
                                            className={
                                                usuario.estado === "Activo"
                                                    ? "status-active"
                                                    : "status-inactive"
                                            }
                                        >
                                            {usuario.estado}
                                        </span>

                                    </div>

                                    <button
                                        type="button"
                                        className="delete-button"
                                        title="Eliminar usuario"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            eliminarUsuario(
                                                usuario.id
                                            );
                                        }}
                                    >
                                        <FaTrash />
                                    </button>

                                </div>

                            ))}

                        </div>

                    </div>

                    <aside className="user-detail">

                        <div className="detail-header">
                            <h2>Información</h2>
                        </div>

                        {usuarioSeleccionado ? (

                            <div className="detail-content">

                                <div className="detail-avatar">
                                    {usuarioSeleccionado.nombre.charAt(0)}
                                </div>

                                <h2>
                                    {usuarioSeleccionado.nombre}
                                </h2>

                                <div className="detail-row">

                                    <span>Nombre</span>

                                    <strong>
                                        {usuarioSeleccionado.nombre}
                                    </strong>

                                </div>

                                {usuarioSeleccionado.programa && (

                                    <div className="detail-row">

                                        <span>Programa</span>

                                        <strong>
                                            {usuarioSeleccionado.programa}
                                        </strong>

                                    </div>

                                )}

                                <div className="detail-row">

                                    <span>Estado</span>

                                    <strong
                                        className={
                                            usuarioSeleccionado.estado ===
                                            "Activo"
                                                ? "text-active"
                                                : "text-inactive"
                                        }
                                    >
                                        {usuarioSeleccionado.estado}
                                    </strong>

                                </div>

                            </div>

                        ) : (

                            <div className="empty-detail">
                                <p>
                                    Selecciona un usuario para ver
                                    su información.
                                </p>
                            </div>

                        )}

                    </aside>

                </section>

            </main>

            <footer className="admin-footer">

                <p>
                    © 2026 DataVentor — Panel de Administración
                </p>

            </footer>

        </div>
    );
}

export default UsuariosAdmin;