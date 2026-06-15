from modelos.usuario import Usuario 

class Tecnico(Usuario):

    def mostrar_tablero(self):
        return "tablero de tecnico"