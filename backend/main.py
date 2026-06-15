from modelos.instructor import Instructor
from modelos.tecnico import Tecnico
from modelos.admin import Administrador
from reportes.daño_reporte import ReporteDanio           
from conexión.conexion import ConexionBD                         


# Crear usuarios
instructor = Instructor(1, "santiago", "santiago@gmail.com")
tecnico = Tecnico(2, "lizeth", "lizeth@gmail.com")
administrador = Administrador(3, "karol", "karol@gmail.com")


# Polimorfismo
print(instructor.mostrar_tablero())
print(tecnico.mostrar_tablero())
print(administrador.mostrar_tablero())


# Abstracción
reporte = ReporteDanio()
print(reporte.generar_reporte())


# Excepciones
conexion = ConexionBD()
conexion.conectar()