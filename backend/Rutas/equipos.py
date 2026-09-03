from flask import Blueprint, jsonify

from backend.conexion import obtener_conexion
from backend.lector_equipo import obtener_uuid_equipo


equipos_bp = Blueprint("equipos", __name__)


@equipos_bp.route("/api/equipos", methods=["GET"])
def obtener_equipos():

    conexion = None
    cursor = None

    try:
        conexion = obtener_conexion()
        cursor = conexion.cursor()

        cursor.execute("""
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
        """)

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

        return jsonify({
            "mensaje": "No fue posible consultar los equipos.",
            "error": str(error)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if conexion:
            conexion.close()


@equipos_bp.route("/api/equipos/identificador", methods=["GET"])
def obtener_equipo_por_identificador():

    uuid = obtener_uuid_equipo()

    if not uuid:
        return jsonify({
            "mensaje": "No fue posible obtener el identificador del equipo."
        }), 500

    conexion = None
    cursor = None

    try:

        conexion = obtener_conexion()
        cursor = conexion.cursor()

        cursor.execute("""
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
        """, (uuid,))

        equipo = cursor.fetchone()

        if not equipo:
            return jsonify({
                "mensaje": "Este equipo no está registrado en DataVentor.",
                "identificador_sistema": uuid
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

        return jsonify({
            "mensaje": "No fue posible consultar el equipo.",
            "error": str(error)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if conexion:
            conexion.close()