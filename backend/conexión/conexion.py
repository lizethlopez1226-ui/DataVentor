class ConexionBD:

    def conectar(self):

        try:
            print("Conexión establecida con la base de datos")

        except Exception as error:
            print("Ocurrió un error:", error)

        finally:
            print("Proceso de conexión finalizado")