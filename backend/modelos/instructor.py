from modelos.usuario import Usuario    

class Instructor(Usuario):

    def mostrar_tablero(self):
        return "tablero de instructor"