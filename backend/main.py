from modelos.instructor import Instructor
from modelos.tecnico import Tecnico
from modelos.admin import Administrador
from reportes.daño_reporte import ReporteDanio           
                     

try:

    instructor = Instructor(1, "santiago", "santiago@gmail.com")
    tecnico = Tecnico(2, "lizeth", "lizeth@gmail.com")
    administrador = Administrador(3, "karol", "karol@gmail.com")

    print(instructor.mostrar_tablero())
    print(tecnico.mostrar_tablero())
    print(administrador.mostrar_tablero())

    reporte = ReporteDanio()
    print(reporte.generar_reporte())


except Exception as error:
    print(" Error:", error)