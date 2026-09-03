from flask import Blueprint, jsonify, request
from backend.conexion import obtener_conexion

usuarios_bp = Blueprint("usuarios", __name__)


@usuarios_bp.route("/api/registro", methods=["POST"])
def crear_usuario():
    datos = request.get_json()

    if not datos:
        return jsonify({
            "mensaje": "No se recibieron datos"
        }), 400

    tipo_documento = datos.get("tipo_documento")
    documento = datos.get("documento")
    nombre = datos.get("nombre")
    apellido = datos.get("apellido")
    correo = datos.get("correo")
    contrasena = datos.get("contrasena")
    telefono = datos.get("telefono")
    rol = datos.get("rol")

    if not tipo_documento:
        return jsonify({
            "mensaje": "El tipo de documento es obligatorio"
        }), 400

    if not documento:
        return jsonify({
            "mensaje": "El documento es obligatorio"
        }), 400

    if not nombre:
        return jsonify({
            "mensaje": "El nombre es obligatorio"
        }), 400

    if not apellido:
        return jsonify({
            "mensaje": "El apellido es obligatorio"
        }), 400

    if not correo:
        return jsonify({
            "mensaje": "El correo es obligatorio"
        }), 400

    if not contrasena:
        return jsonify({
            "mensaje": "La contraseña es obligatoria"
        }), 400

    if not rol:
        return jsonify({
            "mensaje": "El rol es obligatorio"
        }), 400

    conexion = None
    cursor = None

    try:
        conexion = obtener_conexion()
        cursor = conexion.cursor()

        cursor.execute(
            """
            SELECT id_usuario
            FROM usuarios
            WHERE documento = %s OR correo = %s;
            """,
            (documento, correo)
        )

        usuario_existente = cursor.fetchone()

        if usuario_existente:
            return jsonify({
                "mensaje": "El documento o correo ya está registrado."
            }), 409

        cursor.execute(
            """
            SELECT COALESCE(MAX(id_usuario), 0) + 1
            FROM usuarios;
            """
        )

        nuevo_id = cursor.fetchone()[0]

        cursor.execute(
            """
            INSERT INTO usuarios
            (
                id_usuario,
                nombre,
                apellido,
                tipo_documento,
                documento,
                correo,
                contrasena,
                telefono,
                rol
            )
            VALUES
            (
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s
            )
            RETURNING
                id_usuario,
                nombre,
                apellido,
                tipo_documento,
                documento,
                correo,
                telefono,
                rol;
            """,
            (
                nuevo_id,
                nombre,
                apellido,
                tipo_documento,
                documento,
                correo,
                contrasena,
                telefono,
                rol
            )
        )

        nuevo_usuario = cursor.fetchone()

        conexion.commit()

        return jsonify({
            "mensaje": "Usuario registrado correctamente",
            "usuario": {
                "id_usuario": nuevo_usuario[0],
                "nombre": nuevo_usuario[1],
                "apellido": nuevo_usuario[2],
                "tipo_documento": nuevo_usuario[3],
                "documento": nuevo_usuario[4],
                "correo": nuevo_usuario[5],
                "telefono": nuevo_usuario[6],
                "rol": nuevo_usuario[7]
            }
        }), 201

    except Exception as error:
        if conexion:
            conexion.rollback()

        print(
            "ERROR AL CREAR USUARIO:",
            repr(error),
            flush=True
        )

        return jsonify({
            "mensaje": "No fue posible registrar el usuario.",
            "error": str(error)
        }), 500

    finally:
        if cursor:
            cursor.close()

        if conexion:
            conexion.close()

@usuarios_bp.route(
    "/api/usuarios",
    methods=["GET"]
)
def obtener_usuarios():

    conexion = None
    cursor = None

    try:

        conexion = obtener_conexion()
        cursor = conexion.cursor()

        cursor.execute(
            """
            SELECT
                id_usuario,
                nombre,
                apellido,
                tipo_documento,
                documento,
                correo,
                telefono,
                rol,
                fecha_registro
            FROM usuarios
            ORDER BY id_usuario;
            """
        )

        usuarios = cursor.fetchall()

        resultado = []

        for usuario in usuarios:

            resultado.append({
                "id_usuario": usuario[0],
                "nombre": usuario[1],
                "apellido": usuario[2],
                "tipo_documento": usuario[3],
                "documento": usuario[4],
                "correo": usuario[5],
                "telefono": usuario[6],
                "rol": usuario[7],
                "fecha_registro": usuario[8]
            })

        return jsonify(resultado), 200

    except Exception as error:

        print(
            "ERROR AL CONSULTAR USUARIOS:",
            repr(error),
            flush=True
        )

        return jsonify({
            "mensaje": "No fue posible consultar los usuarios.",
            "error": str(error)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if conexion:
            conexion.close()