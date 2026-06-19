from abc import ABC, abstractmethod

class Reporte(ABC):

    @abstractmethod
    def generar_reporte(self):
        pass