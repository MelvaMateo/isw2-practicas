# Requerimientos — Agenda Cita Médica

## Descripción del proyecto

Aplicación para agendar y gestionar citas médicas, permitiendo administrar
pacientes, doctores y el estado de cada cita (activa, atendida o cancelada).

## Requerimientos funcionales

| ID | Requerimiento |
|----|----------------|
| RF-01 | El sistema debe permitir agendar una cita indicando paciente, doctor, fecha, hora y motivo (opcional). Los campos paciente, doctor, fecha y hora son obligatorios. |
| RF-02 | El sistema debe listar las citas ordenadas por fecha y hora. |
| RF-03 | El sistema debe permitir buscar/filtrar citas por nombre de paciente. |
| RF-04 | El sistema debe permitir reprogramar (editar fecha/hora) una cita activa. |
| RF-05 | El sistema debe permitir cancelar una cita, conservándola en el historial con estado "cancelada" en vez de eliminarla. |
| RF-06 | El sistema debe permitir marcar una cita como "atendida" una vez completada la consulta. |
| RF-07 | El sistema no debe permitir agendar dos citas activas para el mismo doctor en la misma fecha y hora (evitar doble reserva). |
| RF-08 | El sistema debe permitir registrar pacientes (nombre y teléfono) y reutilizarlos al agendar citas. |
| RF-09 | El sistema debe permitir registrar doctores (nombre y especialidad) y reutilizarlos al agendar citas. |
| RF-10 | El sistema debe mostrar un resumen con: citas de hoy, citas próximas (siguientes 7 días), citas canceladas y total de pacientes registrados. |

## Requerimientos no funcionales

| ID | Requerimiento |
|----|----------------|
| RNF-01 | La aplicación debe funcionar como PWA (Progressive Web App), instalable y usable sin conexión a internet una vez cargada. |
| RNF-02 | Los datos deben persistir localmente en el dispositivo (localStorage) sin depender de un servidor externo, para efectos de este prototipo. |
| RNF-03 | La interfaz debe ser responsiva y utilizable desde un dispositivo móvil. |
| RNF-04 | La aplicación debe cargar como un único archivo HTML autónomo (CSS y JS embebidos), facilitando su distribución y despliegue. |
| RNF-05 | El idioma de la interfaz debe ser español. |

## Fuera de alcance (por ahora)

- Autenticación de usuarios (login de pacientes/doctores/administradores).
- Notificaciones o recordatorios automáticos de citas.
- Sincronización en la nube o backend remoto (se evaluará en una siguiente fase).
