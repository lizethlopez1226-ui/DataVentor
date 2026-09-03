from flask import Blueprint, jsonify, request

from backend.conexion import obtener_conexion

from backend.lector_equipo import obtener_uuid_equipo


equipos_bp = Blueprint(
    "equipos",
    __name__
)


@equipos_bp.route(
    "/api/equipos",
    methods=["GET"]
)
def obtener_equipos():

    conexion = None
    cursor = None

    try:

        conexion = obtener_conexion()
        cursor = conexion.cursor()

        cursor.execute(
            """
            SELECT
                id_equipo,
                id_ambiente,
                serial,
                registro_unico,
                identificador_sistema,
                tipo,
                modelo,
                estado
            FROM equipos
            ORDER BY id_equipo;
            """
        )

        equipos = cursor.fetchall()

        resultado = []

        for equipo in equipos:

            resultado.append({
                "id_equipo": equipo[0],
                "id_ambiente": equipo[1],
                "serial": equipo[2],
                "registro_unico": equipo[3],
                "identificador_sistema": equipo[4],
                "tipo": equipo[5],
                "modelo": equipo[6],
                "estado": equipo[7]
            })

        return jsonify(resultado), 200

    except Exception as error:

        print(
            "ERROR AL CONSULTAR EQUIPOS:",
            repr(error),
            flush=True
        )

        return jsonify({
            "mensaje": "No fue posible consultar los equipos.",
            "error": str(error)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if conexion:
            conexion.close()


@equipos_bp.route(
    "/api/equipos/identificador",
    methods=["GET"]
)
def obtener_equipo_identificador():

    identificador = obtener_uuid_equipo()

    if not identificador:

        return jsonify({
            "mensaje": "No fue posible obtener el identificador del equipo."
        }), 500

    conexion = None
    cursor = None

    try:

        conexion = obtener_conexion()
        cursor = conexion.cursor()

        cursor.execute(
            """
            SELECT
                id_equipo,
                id_ambiente,
                serial,
                registro_unico,
                identificador_sistema,
                tipo,
                modelo,
                estado
            FROM equipos
            WHERE identificador_sistema = %s;
            """,
            (identificador,)
        )

        equipo = cursor.fetchone()

        if not equipo:

            return jsonify({
                "mensaje": "El equipo no está registrado en DataVentor."
            }), 404

        return jsonify({
            "id_equipo": equipo[0],
            "id_ambiente": equipo[1],
            "serial": equipo[2],
            "registro_unico": equipo[3],
            "identificador_sistema": equipo[4],
            "tipo": equipo[5],
            "modelo": equipo[6],
            "estado": equipo[7]
        }), 200

    except Exception as error:

        print(
            "ERROR AL CONSULTAR EQUIPO POR IDENTIFICADOR:",
            repr(error),
            flush=True
        )

        return jsonify({
            "mensaje": "No fue posible consultar el equipo.",
            "error": str(error)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if conexion:
            conexion.close()


@equipos_bp.route(
    "/api/equipos",
    methods=["POST"]
)
def crear_equipo():

    datos = request.get_json()

    if not datos:

        return jsonify({
            "mensaje": "No se recibieron datos."
        }), 400

    id_ambiente = datos.get("id_ambiente")
    serial = datos.get("serial")
    registro_unico = datos.get("registro_unico")
    identificador_sistema = datos.get(
        "identificador_sistema"
    )
    tipo = datos.get("tipo")
    modelo = datos.get("modelo")

    if not id_ambiente:

        return jsonify({
            "mensaje": "El ambiente es obligatorio."
        }), 400

    if not serial:

        return jsonify({
            "mensaje": "El serial es obligatorio."
        }), 400

    if not registro_unico:

        return jsonify({
            "mensaje": "El registro único es obligatorio."
        }), 400

    if not tipo:

        return jsonify({
            "mensaje": "El tipo es obligatorio."
        }), 400

    if not modelo:

        return jsonify({
            "mensaje": "El modelo es obligatorio."
        }), 400

    conexion = None
    cursor = None

    try:

        conexion = obtener_conexion()
        cursor = conexion.cursor()

        cursor.execute(
            """
            SELECT id_ambiente
            FROM ambientes
            WHERE id_ambiente = %s;
            """,
            (id_ambiente,)
        )

        ambiente = cursor.fetchone()

        if not ambiente:

            return jsonify({
                "mensaje": "El ambiente indicado no existe."
            }), 404

        cursor.execute(
            """
            SELECT id_equipo
            FROM equipos
            WHERE serial = %s
               OR registro_unico = %s;
            """,
            (
                serial,
                registro_unico
            )
        )

        equipo_existente = cursor.fetchone()

        if equipo_existente:

            return jsonify({
                "mensaje":
                "El serial o registro único ya está registrado."
            }), 409

        cursor.execute(
            """
            SELECT COALESCE(MAX(id_equipo), 0) + 1
            FROM equipos;
            """
        )

        nuevo_id = cursor.fetchone()[0]

        cursor.execute(
            """
            INSERT INTO equipos
            (
                id_equipo,
                id_ambiente,
                serial,
                registro_unico,
                identificador_sistema,
                tipo,
                modelo,
                estado
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
                'disponible'
            )
            RETURNING
                id_equipo,
                id_ambiente,
                serial,
                registro_unico,
                identificador_sistema,
                tipo,
                modelo,
                estado;
            """,
            (
                nuevo_id,
                id_ambiente,
                serial,
                registro_unico,
                identificador_sistema,
                tipo,
                modelo
            )
        )

        equipo = cursor.fetchone()

        conexion.commit()

        return jsonify({
            "mensaje": "Equipo registrado correctamente.",
            "equipo": {
                "id_equipo": equipo[0],
                "id_ambiente": equipo[1],
                "serial": equipo[2],
                "registro_unico": equipo[3],
                "identificador_sistema": equipo[4],
                "tipo": equipo[5],
                "modelo": equipo[6],
                "estado": equipo[7]
            }
        }), 201

    except Exception as error:

        if conexion:
            conexion.rollback()

        print(
            "ERROR AL CREAR EQUIPO:",
            repr(error),
            flush=True
        )

        return jsonify({
            "mensaje": "No fue posible registrar el equipo.",
            "error": str(error)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if conexion:
            conexion.close()