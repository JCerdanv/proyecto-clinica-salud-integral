Normalización de especialidades y entidades clave del negocio de la clínica:

# Requerimientos - Clínica "Salud Integral"

1. Diseño y Normalización

 ¿La Especialidad debe ser un texto en el Médico o una tabla propia?
**Debe ser una tabla propia (`Especialidad`).** Si se deja como texto, corremos el riesgo de sufrir inconsistencias por errores de escritura (ej. "Cardiologia" vs "Cardiólogia"). Además, si la gerencia necesita listar todas las especialidades disponibles en la clínica —incluso aquellas que son nuevas y aún no tienen médicos contratados asignados—, una tabla independiente lo permite mediante una consulta directa o un `LEFT JOIN`. Esto cumple estrictamente con las reglas de normalización de bases de datos.

---

## 2. Entidades y Atributos

### Tabla: `specialties` (especialidades)

| Atributo | Tipo de Dato | Notas |
| :--- | :--- | :--- |
| `id` | Int | [PK], Autoincremental, Obligatorio |
| `nombre` | String | Único, Obligatorio |
| `descripcion` | String | Opcional  |

### Tabla: `doctors` (medicos)

| Atributo | Tipo de Dato | Notas |
| :--- | :--- | :--- |
| `id` | Int | [PK], Autoincremental, Obligatorio |
| `nombre` | String | Obligatorio |
| `apellido` | String | Obligatorio |
| `cmp` | String | Código Médico Prerrogativa (Colegiatura), Único, Obligatorio |
| `especialidadId`| Int | [FK], Obligatorio |

### Tabla: `patients` (pacientes)

| Atributo | Tipo de Dato | Notas |
| :--- | :--- | :--- |
| `id` | Int | [PK], Autoincremental, Obligatorio |
| `nombre` | String | Obligatorio |
| `apellido` | String | Obligatorio |
| `dni` | String | Documento de Identidad, Único, Obligatorio |
| `telefono` | String | Opcional |

### Tabla: `appointments` (citas)

| Atributo | Tipo de Dato | Notas |
| :--- | :--- | :--- |
| `id` | Int | [PK], Autoincremental, Obligatorio |
| `fechaHora` | DateTime | Obligatorio |
| `estado` | Enum | Valores: PROGRAMADA, COMPLETADA, CANCELADA. Obligatorio |
| `motivo` | String | Opcional (Módulo Recepción) |
| `diagnostico` | String | Opcional (Módulo Consultorio - se llena al completar) |
| `pacienteId` | Int | [FK], Obligatorio |
| `medicoId` | Int | [FK], Obligatorio |

## 3. Relaciones (seed.ts)

* **Un Médico pertenece a una única Especialidad** (a través de `specialtyId`), pero **una Especialidad puede tener asignados a muchos Médicos**. (Relación 1:N entre `especialidades` y `medicos`).

* **Un Paciente puede agendar muchas Citas**, pero **una Cita pertenece a un único Paciente** (a través de `patientId`). (Relación 1:N entre `pacientes` y `citas`).

* **Un Médico puede atender muchas Citas**, pero **una Cita está asignada a un único Médico** (a través de `doctorId`). (Relación 1:N entre `medicos` y `citas`).