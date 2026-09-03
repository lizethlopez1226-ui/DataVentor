from sqlalchemy import Column, Integer, String, Enum as SQLEnum, TIMESTAMP
from sqlalchemy.sql import func
import enum

from backend.database import Base


class RolEnum(str, enum.Enum):
    aprendiz = "aprendiz"
    instructor = "instructor"
    tecnico = "tecnico"
    administrador = "administrador"


class UsuarioModel(Base):
    __tablename__ = "usuarios"

    id_usuario = Column(
        Integer,
        primary_key=True,
        index=True
    )

    nombre = Column(
        String(100),
        nullable=False
    )

    apellido = Column(
        String(100),
        nullable=False
    )

    tipo_documento = Column(
        String(10),
        nullable=False
    )

    documento = Column(
        String(30),
        unique=True,
        nullable=False
    )

    correo = Column(
        String(150),
        unique=True,
        nullable=False
    )

    contrasena = Column(
        String(255),
        nullable=False
    )

    telefono = Column(
        String(20),
        nullable=True
    )

    rol = Column(
        SQLEnum(RolEnum),
        nullable=False
    )

    fecha_registro = Column(
        TIMESTAMP,
        server_default=func.current_timestamp(),
        nullable=False
    )