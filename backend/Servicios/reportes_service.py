from psycopg.rows import dict_row
from backend.conexion import obtener_conexion


class ReportesService:

    @staticmethod
    def obtener_todos_reportes():
        with obtener_conexion() as conn:
            with conn.cursor(row_factory=dict_row) as cur:
                query = """
                    SELECT
                        r.id_reporte,
                        r.id_equipo,
                        r.id_usuario,
                        r.descripcion,
                        r.prioridad,
                        r.estado_reporte,
                        r.fecha_reporte,
                        r.fecha_cierre,
                        r.fecha_actualizacion,
                        e.serial,
                        e.registro_unico,
                        e.tipo,
                        e.modelo,
                        e.id_ambiente,
                        u.nombre,
                        u.apellido,
                        u.correo
                    FROM reportes r
                    INNER JOIN equipos e
                        ON e.id_equipo = r.id_equipo
                    INNER JOIN usuarios u
                        ON u.id_usuario = r.id_usuario
                    ORDER BY r.fecha_reporte DESC;
                """

                cur.execute(query)

                return cur.fetchall()

    @staticmethod
    def obtener_reporte_por_id(id_reporte):
        with obtener_conexion() as conn:
            with conn.cursor(row_factory=dict_row) as cur:
                query = """
                    SELECT
                        r.id_reporte,
                        r.id_equipo,
                        r.id_usuario,
                        r.descripcion,
                        r.prioridad,
                        r.estado_reporte,
                        r.fecha_reporte,
                        r.fecha_cierre,
                        r.fecha_actualizacion,
                        e.serial,
                        e.registro_unico,
                        e.tipo,
                        e.modelo,
                        e.id_ambiente,
                        u.nombre,
                        u.apellido,
                        u.correo
                    FROM reportes r
                    INNER JOIN equipos e
                        ON e.id_equipo = r.id_equipo
                    INNER JOIN usuarios u
                        ON u.id_usuario = r.id_usuario
                    WHERE r.id_reporte = %s;
                """

                cur.execute(
                    query,
                    (id_reporte,)
                )

                return cur.fetchone()

    @staticmethod
    def crear_reporte(
        id_equipo,
        id_usuario,
        descripcion,
        prioridad
    ):
        with obtener_conexion() as conn:
            with conn.cursor() as cur:
                query = """
                    INSERT INTO reportes
                    (
                        id_equipo,
                        id_usuario,
                        descripcion,
                        prioridad,
                        estado_reporte,
                        fecha_reporte
                    )
                    VALUES
                    (
                        %s,
                        %s,
                        %s,
                        %s,
                        'pendiente',
                        CURRENT_TIMESTAMP
                    )
                    RETURNING id_reporte;
                """

                cur.execute(
                    query,
                    (
                        id_equipo,
                        id_usuario,
                        descripcion,
                        prioridad
                    )
                )

                nuevo_id = cur.fetchone()[0]

                conn.commit()

                return nuevo_id

    @staticmethod
    def actualizar_estado(
        id_reporte,
        nuevo_estado,
        id_usuario
    ):
        with obtener_conexion() as conn:
            with conn.cursor() as cur:
                query = """
                    UPDATE reportes
                    SET
                        estado_reporte = %s,
                        id_usuario_ultima_actualizacion = %s,
                        fecha_actualizacion = CURRENT_TIMESTAMP
                    WHERE id_reporte = %s;
                """

                cur.execute(
                    query,
                    (
                        nuevo_estado,
                        id_usuario,
                        id_reporte
                    )
                )

                filas_afectadas = cur.rowcount

                conn.commit()

                return filas_afectadas > 0

    @staticmethod
    def obtener_historial_reporte(id_reporte):
        with obtener_conexion() as conn:
            with conn.cursor(row_factory=dict_row) as cur:
                query = """
                    SELECT
                        h.id_historial,
                        h.id_reporte,
                        h.id_usuario,
                        h.estado,
                        h.fecha,
                        h.observaciones,
                        u.nombre,
                        u.apellido,
                        u.correo
                    FROM historial_estados h
                    INNER JOIN usuarios u
                        ON u.id_usuario = h.id_usuario
                    WHERE h.id_reporte = %s
                    ORDER BY h.fecha ASC;
                """

                cur.execute(
                    query,
                    (id_reporte,)
                )

                return cur.fetchall()