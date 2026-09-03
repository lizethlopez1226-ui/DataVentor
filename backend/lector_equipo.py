import subprocess


def obtener_uuid_equipo():
    try:
        resultado = subprocess.check_output(
            [
                "powershell",
                "-Command",
                "(Get-CimInstance Win32_ComputerSystemProduct).UUID"
            ],
            text=True
        )

        return resultado.strip()

    except Exception as error:
        print("Error obteniendo UUID del equipo:", error)
        return None