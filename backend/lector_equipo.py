import subprocess


def ejecutar_powershell(comando):
    try:
        resultado = subprocess.check_output(
            [
                "powershell",
                "-NoProfile",
                "-Command",
                comando
            ],
            text=True,
            stderr=subprocess.DEVNULL
        )

        return resultado.strip()

    except Exception as error:
        print("Error ejecutando PowerShell:", error)
        return None


def obtener_informacion_equipo():
    """
    Detecta la información del computador donde
    se está ejecutando el backend de DataVentor.
    """

    fabricante = ejecutar_powershell(
        "(Get-CimInstance Win32_ComputerSystem).Manufacturer"
    )

    modelo = ejecutar_powershell(
        "(Get-CimInstance Win32_ComputerSystem).Model"
    )

    serial = ejecutar_powershell(
        "(Get-CimInstance Win32_BIOS).SerialNumber"
    )

    uuid = ejecutar_powershell(
        "(Get-CimInstance Win32_ComputerSystemProduct).UUID"
    )

    return {
        "fabricante": fabricante,
        "modelo": modelo,
        "serial": serial,
        "uuid": uuid
    }


def obtener_uuid_equipo():
    """
    Obtiene únicamente el UUID del computador.
    """
    informacion = obtener_informacion_equipo()
    return informacion["uuid"]