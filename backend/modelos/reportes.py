from sqlalchemy import Column, Integer, Text, ForeignKey, Enum as SQLEnum, TIMESTAMP
from sqlalchemy.sql import func
import enum
from database import Base

class PrioridadEnum(str, enum.Enum):
    baja = 'baja'
    media = 'media'
    alta = 'alta'

class EstadoReporteEnum(str, enum.Enum):
    pendiente = 'pendiente'
    en_revision = 'en_revision'
    resuelto = 'resuelto'
    cerrado = 'cerrado'

class ReporteModel(Base):
    __tablename__ = "reportes"

    id_reporte = Column(Integer, primary_key=True, index=True)
    id_equipo = Column(Integer, ForeignKey("equipos.id_equipo"), nullable=False)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"), nullable=False)
    id_usuario_ultima_actualizacion = Column(Integer, ForeignKey("usuarios.id_usuario"), nullable=True)
    descripcion = Column(Text, nullable=False)
    prioridad = Column(SQLEnum(PrioridadEnum), default=PrioridadEnum.media, nullable=False)
    estado_reporte = Column(SQLEnum(EstadoReporteEnum), default=EstadoReporteEnum.pendiente, nullable=False)
    fecha_reporte = Column(TIMESTAMP, server_default=func.current_timestamp(), nullable=False)
    fecha_cierre = Column(TIMESTAMP, nullable=True)
    fecha_actualizacion = Column(TIMESTAMP, server_default=func.current_timestamp(), onupdate=func.current_timestamp(), nullable=False)