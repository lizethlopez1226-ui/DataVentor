from modelos.usuario import Usuario


class Administrador(Usuario):

    def mostrar_tablero(self):
        return "Tablero de administrador"