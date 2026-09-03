from flask import Blueprint, jsonify, request

from backend.Servicios.reportes_service import ReportesService


reportes_bp = Blueprint(
    "reportes",
    __name__,
    url_prefix="/api/reportes"
)


@reportes_bp.route("", methods=["GET"])
def listar_reportes():

    try:
        id_usuario = request.args.get(
            "usuario",
            type=int
        )

        reportes = ReportesService.obtener_todos_reportes(
            id_usuario
        )

        return jsonify(reportes), 200

    except Exception as e:

        print(
            "Error al listar reportes:",
            repr(e)
        )

        return jsonify({
            "mensaje": "Error interno al consultar reportes",
            "error": str(e)
        }), 500


@reportes_bp.route("", methods=["POST"])
def guardar_reporte():

    data = request.get_json() or {}

    id_equipo = data.get("id_equipo")
    id_usuario = data.get("id_usuario")
    descripcion = data.get("descripcion")
    prioridad = data.get("prioridad")

    if not id_equipo:
        return jsonify({
            "mensaje": "El equipo es obligatorio"
        }), 400

    if not id_usuario:
        return jsonify({
            "mensaje": "El usuario es obligatorio"
        }), 400

    if not descripcion:
        return jsonify({
            "mensaje": "La descripción es obligatoria"
        }), 400

    if prioridad not in [
        "baja",
        "media",
        "alta"
    ]:
        return jsonify({
            "mensaje": "La prioridad no es válida"
        }), 400

    try:

        nuevo_id = ReportesService.crear_reporte(
            id_equipo,
            id_usuario,
            descripcion,
            prioridad
        )

        return jsonify({
            "mensaje": "Reporte creado exitosamente",
            "id_reporte": nuevo_id
        }), 201

    except Exception as e:

        print(
            "Error al crear reporte:",
            repr(e)
        )

        return jsonify({
            "mensaje": "Error interno al guardar el reporte",
            "error": str(e)
        }), 500


@reportes_bp.route(
    "/<int:id_reporte>",
    methods=["GET"]
)
def obtener_reporte(id_reporte):

    try:

        reporte = ReportesService.obtener_reporte_por_id(
            id_reporte
        )

        if not reporte:
            return jsonify({
                "mensaje": "Reporte no encontrado"
            }), 404

        return jsonify(reporte), 200

    except Exception as e:

        print(
            "Error al consultar reporte:",
            repr(e)
        )

        return jsonify({
            "mensaje": "Error interno al consultar el reporte",
            "error": str(e)
        }), 500


@reportes_bp.route(
    "/<int:id_reporte>/estado",
    methods=["PUT"]
)
def cambiar_estado(id_reporte):

    data = request.get_json() or {}

    nuevo_estado = data.get("estado")
    id_usuario = data.get("id_usuario")

    estados_validos = [
        "pendiente",
        "en_revision",
        "resuelto",
        "cerrado"
    ]

    if nuevo_estado not in estados_validos:
        return jsonify({
            "mensaje": "Estado no válido"
        }), 400

    if not id_usuario:
        return jsonify({
            "mensaje": "El usuario que realiza el cambio es obligatorio"
        }), 400

    try:

        exito = ReportesService.actualizar_estado(
            id_reporte,
            nuevo_estado,
            id_usuario
        )

        if not exito:
            return jsonify({
                "mensaje": "Reporte no encontrado"
            }), 404

        return jsonify({
            "mensaje": "Estado del reporte actualizado correctamente"
        }), 200

    except Exception as e:

        print(
            "Error al actualizar estado:",
            repr(e)
        )

        return jsonify({
            "mensaje": "Error interno al actualizar estado",
            "error": str(e)
        }), 500


@reportes_bp.route(
    "/<int:id_reporte>/historial",
    methods=["GET"]
)
def obtener_historial(id_reporte):

    try:

        historial = ReportesService.obtener_historial_reporte(
            id_reporte
        )

        return jsonify(historial), 200

    except Exception as e:

        print(
            "Error al consultar historial:",
            repr(e)
        )

        return jsonify({
            "mensaje": "Error interno al consultar el historial",
            "error": str(e)
        }), 