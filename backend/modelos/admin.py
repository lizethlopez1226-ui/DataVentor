from modelos.usuario import Usuario


class Administrador(Usuario):

    def mostrar_tablero(self):
       return f"Tablero de Administrador: Bienvenido {self.get_nombre()}"