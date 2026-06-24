##  Estructura del repositorio


📦 DataVentor
┣ 📂 backend
┣ 📂 base de datos
┣ 📂 documentos
┣ 📂 Interfaz
┣ 📄 .gitignore
┣ 📄 README.md
┣ 📄 package-lock.json
┗ 📄 package.json

 DataVentor: Sistema de Gestión de Ambientes y Equipos

*DataVentor* es un sistema de software desarrollado con el objetivo de mejorar la gestión de los equipos y ambientes dentro del SENA. Este proyecto surge como solución a un problema común en la institución: la falta de control centralizado del inventario tecnológico, lo que puede generar pérdidas de equipos, mala asignación de recursos o retrasos en el mantenimiento.

La idea principal de DataVentor es reunir toda esta información en una sola plataforma, permitiendo llevar un control más organizado, claro y en tiempo real. Además, se busca que en un futuro el sistema pueda crecer y adaptarse a nuevas necesidades, ayudando a prevenir fallos y facilitando el seguimiento completo de cada equipo.

---

## Características Principales

El sistema fue desarrollado a partir de historias de usuario, organizando sus funciones en varios módulos importantes:

* *Gestión de Usuarios y Roles:*
  Permite el inicio y cierre de sesión, además de asignar diferentes roles como administrador, técnico o instructor, según el tipo de usuario.

* *Control de Inventario (Equipos):*
  Registro de los equipos con información como serial, marca, modelo, estado y fecha de ingreso.

* *Administración de Ambientes:*
  Organización de los espacios físicos donde se encuentran los equipos, incluyendo su ubicación y capacidad.

* *Módulo de Reportes:*
  Permite reportar fallas o novedades en los equipos, asignando prioridades para su atención.

* *Sistema de Notificaciones:*
  Genera alertas cuando ocurre algún cambio importante o se crea un nuevo reporte.

* *Historial de Cambios:*
  Guarda un registro de los cambios de estado de los equipos, lo que permite hacer seguimiento y auditoría.

---
```
## Modelo de Datos

El sistema está basado en un modelo entidad-relación que incluye las siguientes entidades principales:

* *Usuario / Rol:* Controla los permisos dentro del sistema.
* *Equipo:* Es la entidad principal donde se almacena la información del hardware.
* *Ambiente:* Representa los espacios donde están ubicados los equipos.
* *Reporte / Categoría:* Organiza los reportes de fallas.
* *HistorialEstado:* Guarda los cambios que ha tenido cada equipo.

---

## Tecnologías Utilizadas

* *Base de datos:* OneCompiler's MySQL
* *Backend:* python
* *Frontend:* HTML5, CSS3 , JavaScript, React

---

## Integrantes del Proyecto

Este proyecto fue desarrollado por aprendices de ADSO del SENA:

* Lizeth Valeria López Contreras
* Karol Daniela Rivera Silva
* Juan Esteban Beltran Reyes
* Juan Sebastián Acosta García
* Santiago Sierra Mateus
