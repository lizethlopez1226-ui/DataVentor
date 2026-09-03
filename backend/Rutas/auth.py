from flask import Blueprint, jsonify, request
from backend.database import SessionLocal
from backend.modelos.usuario import UsuarioModel, RolEnum

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/api/registro", methods=["POST"])
def registrar_usuario():
    datos = request.get_json()

    if not datos:
        return jsonify({"mensaje": "No se recibieron datos"}), 400

    campos_requeridos = [
        "tipo_documento",
        "documento",
        "nombre",
        "apellido",
        "correo",
        "contrasena",
        "rol"
    ]

    for campo in campos_requeridos:
        if not datos.get(campo):
            return jsonify({
                "mensaje": f"El campo {campo} es obligatorio"
            }), 400

    if datos["rol"] not in [rol.value for rol in RolEnum]:
        return jsonify({
            "mensaje": "El rol seleccionado no es válido"
        }), 400

    db = SessionLocal()

    try:
        usuario_existente = db.query(UsuarioModel).filter(
            (UsuarioModel.documento == datos["documento"]) |
            (UsuarioModel.correo == datos["correo"])
        ).first()

        if usuario_existente:
            return jsonify({
                "mensaje": "El documento o correo ya está registrado"
            }), 409

        ultimo_id = db.query(UsuarioModel.id_usuario).order_by(
            UsuarioModel.id_usuario.desc()
        ).first()

        nuevo_id = (ultimo_id[0] + 1) if ultimo_id else 1

        nuevo_usuario = UsuarioModel(
            id_usuario=nuevo_id,
            tipo_documento=datos["tipo_documento"],
            documento=datos["documento"],
            nombre=datos["nombre"],
            apellido=datos["apellido"],
            correo=datos["correo"],
            contrasena=datos["contrasena"],
            telefono=datos.get("telefono"),
            rol=RolEnum(datos["rol"])
        )

        db.add(nuevo_usuario)
        db.commit()

        return jsonify({
            "mensaje": "Usuario registrado correctamente",
            "usuario": {
                "id_usuario": nuevo_usuario.id_usuario,
                "nombre": nuevo_usuario.nombre,
                "apellido": nuevo_usuario.apellido,
                "tipo_documento": nuevo_usuario.tipo_documento,
                "documento": nuevo_usuario.documento,
                "correo": nuevo_usuario.correo,
                "rol": nuevo_usuario.rol.value
            }
        }), 201

    except Exception as error:
        db.rollback()

        return jsonify({
            "mensaje": "Error al registrar el usuario",
            "error": str(error)
        }), 500

    finally:
        db.close()


@auth_bp.route("/api/login", methods=["POST"])
def iniciar_sesion():
    datos = request.get_json()

    if not datos:
        return jsonify({"mensaje": "No se recibieron datos"}), 400

    tipo_documento = datos.get("tipo_documento")
    documento = datos.get("documento")
    contrasena = datos.get("contrasena")

    if not tipo_documento or not documento or not contrasena:
        return jsonify({
            "mensaje": "Tipo de documento, documento y contraseña son obligatorios"
        }), 400

    db = SessionLocal()

    try:
        usuario = db.query(UsuarioModel).filter(
            UsuarioModel.tipo_documento == tipo_documento,
            UsuarioModel.documento == documento
        ).first()

        if not usuario:
            return jsonify({
                "mensaje": "Documento o contraseña incorrectos"
            }), 401

        if usuario.contrasena != contrasena:
            return jsonify({
                "mensaje": "Documento o contraseña incorrectos"
            }), 401

        return jsonify({
            "mensaje": "Inicio de sesión exitoso",
            "usuario": {
                "id_usuario": usuario.id_usuario,
                "nombre": usuario.nombre,
                "apellido": usuario.apellido,
                "tipo_documento": usuario.tipo_documento,
                "documento": usuario.documento,
                "correo": usuario.correo,
                "telefono": usuario.telefono,
                "rol": usuario.rol.value
            }
        }), 200

    except Exception as error:
        return jsonify({
            "mensaje": "Error al iniciar sesión",
            "error": str(error)
        }), 500

    finally:
        db.close()