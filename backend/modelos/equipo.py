from sqlalchemy import Column, Integer, String, ForeignKey, Enum as SQLEnum
import enum
from database import Base

class EstadoEquipoEnum(str, enum.Enum):
    buen_estado = 'buen_estado'
    mal_estado = 'mal_estado'
    en_revision = 'en_revision'

class EquipoModel(Base):
    __tablename__ = "equipos"

    id_equipo = Column(Integer, primary_key=True, index=True)
    id_ambiente = Column(Integer, ForeignKey("ambientes.id_ambiente"), nullable=False)
    serial = Column(String(100), unique=True, nullable=False)
    registro_unico = Column(String(100), unique=True, nullable=True)
    identificador_sistema = Column(String(255), unique=True, nullable=True)
    tipo = Column(String(50), nullable=False)
    modelo = Column(String(100), nullable=False)
    estado = Column(SQLEnum(EstadoEquipoEnum), default=EstadoEquipoEnum.buen_estado, nullable=False)