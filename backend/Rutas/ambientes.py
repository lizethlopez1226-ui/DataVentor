from flask import Blueprint, jsonify, request

from backend.conexion import obtener_conexion


ambientes_bp = Blueprint(
    "ambientes",
    __name__
)


@ambientes_bp.route(
    "/api/ambientes",
    methods=["POST"]
)
def crear_ambiente():

    datos = request.get_json()

    if not datos:
        return jsonify({
            "mensaje": "No se recibieron datos"
        }), 400

    nombre = datos.get("nombre")
    id_sede = datos.get("id_sede")

    if not nombre:
        return jsonify({
            "mensaje": "El nombre del ambiente es obligatorio"
        }), 400

    if not id_sede:
        return jsonify({
            "mensaje": "La sede es obligatoria"
        }), 400

    conexion = None
    cursor = None

    try:

        conexion = obtener_conexion()
        cursor = conexion.cursor()

        cursor.execute(
            """
            SELECT id_sede
            FROM sedes
            WHERE id_sede = %s;
            """,
            (id_sede,)
        )

        sede = cursor.fetchone()

        if not sede:
            return jsonify({
                "mensaje": "La sede indicada no existe"
            }), 404

        cursor.execute(
            """
            INSERT INTO ambientes
            (
                id_sede,
                nombre
            )
            VALUES
            (
                %s,
                %s
            )
            RETURNING
                id_ambiente,
                id_sede,
                nombre;
            """,
            (
                id_sede,
                nombre
            )
        )

        ambiente = cursor.fetchone()

        conexion.commit()

        return jsonify({
            "mensaje": "Ambiente registrado correctamente",
            "ambiente": {
                "id_ambiente": ambiente[0],
                "id_sede": ambiente[1],
                "nombre": ambiente[2]
            }
        }), 201

    except Exception as error:

        if conexion:
            conexion.rollback()

        print(
            "ERROR AL CREAR AMBIENTE:",
            repr(error),
            flush=True
        )

        return jsonify({
            "mensaje": "No fue posible registrar el ambiente.",
            "error": str(error)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if conexion:
            conexion.close()