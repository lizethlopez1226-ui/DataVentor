from modelos.usuario import Usuario

class Instructor(Usuario):

  
    def mostrar_tablero(self):
        return f"Tablero de Instructor: Bienvenido {self.get_nombre()}"