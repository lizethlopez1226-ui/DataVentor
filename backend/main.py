from flask import Flask
from flask_cors import CORS
from backend.Rutas.equipos import equipos_bp
# Importamos el nuevo blueprint de reportes
from backend.Rutas.reportes_routes import reportes_bp
from backend.Rutas.auth import auth_bp
from backend.Rutas.usuarios import usuarios_bp
from backend.Rutas.ambientes import ambientes_bp

app = Flask(__name__)
CORS(app)

# Registrar Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(equipos_bp)
app.register_blueprint(reportes_bp)
app.register_blueprint(usuarios_bp)
app.register_blueprint(ambientes_bp)

@app.route("/")
def index():
    return {"mensaje": "Backend de DataVentor conectado exitosamente con PostgreSQL"}

if __name__ == "__main__":
    app.run(debug=True, port=5000)