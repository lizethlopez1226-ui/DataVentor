from flask import Blueprint, jsonify, request

from backend.conexion import obtener_conexion


ambientes_bp = Blueprint(
    "ambientes",
    __name__
)


@ambientes_bp.route(
    "/api/ambientes",
    methods=["GET"]
)
def obtener_ambientes():

    conexion = None
    cursor = None

    try:

        conexion = obtener_conexion()
        cursor = conexion.cursor()

        cursor.execute(
            """
            SELECT
                a.id_ambiente,
                a.id_sede,
                a.descripcion,
                s.descripcion AS sede
            FROM ambientes a
            INNER JOIN sedes s
                ON a.id_sede = s.id_sede
            ORDER BY a.id_ambiente;
            """
        )

        ambientes = cursor.fetchall()

        resultado = []

        for ambiente in ambientes:

            resultado.append({
                "id_ambiente": ambiente[0],
                "id_sede": ambiente[1],
                "descripcion": ambiente[2],
                "sede": ambiente[3]
            })

        return jsonify(resultado), 200

    except Exception as error:

        print(
            "ERROR AL CONSULTAR AMBIENTES:",
            repr(error),
            flush=True
        )

        return jsonify({
            "mensaje": "No fue posible consultar los ambientes.",
            "error": str(error)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if conexion:
            conexion.close()


@ambientes_bp.route(
    "/api/ambientes",
    methods=["POST"]
)
def crear_ambiente():

    datos = request.get_json()

    if not datos:

        return jsonify({
            "mensaje": "No se recibieron datos."
        }), 400

    descripcion = datos.get("descripcion")

    if not descripcion:
        descripcion = datos.get("nombre")

    id_sede = datos.get("id_sede")

    if not descripcion:

        return jsonify({
            "mensaje": "La descripción del ambiente es obligatoria."
        }), 400

    if not id_sede:

        return jsonify({
            "mensaje": "La sede es obligatoria."
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
                "mensaje": "La sede indicada no existe."
            }), 404

        cursor.execute(
            """
            SELECT COALESCE(MAX(id_ambiente), 0) + 1
            FROM ambientes;
            """
        )

        nuevo_id = cursor.fetchone()[0]

        cursor.execute(
            """
            INSERT INTO ambientes
            (
                id_ambiente,
                id_sede,
                descripcion
            )
            VALUES
            (
                %s,
                %s,
                %s
            )
            RETURNING
                id_ambiente,
                id_sede,
                descripcion;
            """,
            (
                nuevo_id,
                id_sede,
                descripcion
            )
        )

        ambiente = cursor.fetchone()

        conexion.commit()

        return jsonify({
            "mensaje": "Ambiente registrado correctamente.",
            "ambiente": {
                "id_ambiente": ambiente[0],
                "id_sede": ambiente[1],
                "descripcion": ambiente[2]
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