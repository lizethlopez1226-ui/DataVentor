from modelos.usuario import Usuario 

class Tecnico(Usuario):

    def mostrar_tablero(self):
        return f"Tablero de Tecnico: Bienvenido {self.get_nombre()}"