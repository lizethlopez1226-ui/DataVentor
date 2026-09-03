from flask import Blueprint, jsonify
from database import SessionLocal
from modelos.equipo import EquipoModel

equipos_bp = Blueprint("equipos_bp", __name__)

@equipos_bp.route("/api/equipos", methods=["GET"])
def listar_equipos():
    db = SessionLocal()
    try:
        equipos = db.query(EquipoModel).all()
        resultado = [
            {
                "id_equipo": eq.id_equipo,
                "id_ambiente": eq.id_ambiente,
                "serial": eq.serial,
                "registro_unico": eq.registro_unico,
                "identificador_sistema": eq.identificador_sistema,
                "tipo": eq.tipo,
                "modelo": eq.modelo,
                "estado": eq.estado.value if hasattr(eq.estado, "value") else eq.estado
            }
            for eq in equipos
        ]
        return jsonify(resultado), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()