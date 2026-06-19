class Usuario:

    def __init__(self, id_usuario, nombre, correo):
        self.__id_usuario = id_usuario
        self.__nombre = nombre
        self.__correo = correo

    
    def get_nombre(self):
        return self.__nombre

    def get_correo(self):
        return self.__correo

    
    def set_nombre(self, nombre):
        self.__nombre = nombre

    def set_correo(self, correo):
        self.__correo = correo

 
    def mostrar_tablero(self):
        print(f"Bienvenido al tablero de {self.__nombre}")