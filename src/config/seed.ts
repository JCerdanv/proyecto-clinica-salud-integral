// src/config/seed.ts

import prisma from './prisma.js';

export async function runSeed() {
  console.log(" Vaciando tablas en cascada...");
  // El orden de borrado previene errores de restricción de llave foránea (FK)
  await prisma.cita.deleteMany();
  await prisma.medico.deleteMany();
  await prisma.paciente.deleteMany();
  await prisma.user.deleteMany();
  await prisma.especialidad.deleteMany();

  console.log(" Insertando Especialidades...");
  await prisma.especialidad.createMany({
    data: [
      { id: 1, nombre: "Medicina General", descripcion: "Diagnósticos iniciales, chequeos y derivaciones" },
      { id: 2, nombre: "Ginecología y Obstetricia", descripcion: "Control -salud femenina, planificación familiar y seguimiento de embarazo" },
      { id: 3, nombre: "Cardiología", descripcion: "Enfermedades del corazón y chequeos de hipertensión" },
      { id: 4, nombre: "Pediatría", descripcion: "Atención médica, control de crecimiento y vacunación de niños" },
      { id: 5, nombre: "Dermatología", descripcion: "Afecciones a la piel, acné, alergias y procedimientos estéticos" },
      { id: 6, nombre: "Traumatología y Ortopedia", descripcion: "Lesiones deportivas, dolores articulares y problemas de columna" },
      { id: 7, nombre: "Gastroenterología", descripcion: "Problemas digestivos, gastritis y endoscopías" },
      { id: 8, nombre: "Endocrinología", descripcion: "Manejo de diabetes, problemas a la tiroides y control de peso/obesidad" },
      { id: 9, nombre: "Oftalmología", descripcion: "Medida de la vista, descartes de cataratas y salud ocular" },
      { id: 10, nombre: "Otorrinolaringología", descripcion: "Problemas de oído, nariz, garganta y alergias respiratorias" },
      { id: 11, nombre: "Neurología, Psicología / Psiquiatría", descripcion: "Consultas por estrés, ansiedad y trastornos del sueño" },
      { id: 12, nombre: "Otros", descripcion: "No atendido" },
    ]
  });

  console.log(" Insertando Médicos...");
  await prisma.medico.createMany({
    data: [
      { id: 1, nombre: "Alberto", apellido: "Llontop", cmp: "CMP-001", specialtyId: 1 },
      { id: 2, nombre: "Marco", apellido: "Condor", cmp: "CMP-002", specialtyId: 6 },
      { id: 3, nombre: "Luis", apellido: "Perez", cmp: "CMP-003", specialtyId: 4 },
      { id: 4, nombre: "Alberto", apellido: "Garcia", cmp: "CMP-004", specialtyId: 3 },
      { id: 5, nombre: "Maria", apellido: "Salazar", cmp: "CMP-005", specialtyId: 2 },
      { id: 6, nombre: "Cecilia", apellido: "Serquen", cmp: "CMP-006", specialtyId: 9 },
      { id: 7, nombre: "Wilson", apellido: "Martinez", cmp: "CMP-007", specialtyId: 11 },
      { id: 8, nombre: "Karla", apellido: "Vargas", cmp: "CMP-008", specialtyId: 10 },
    ]
  });

  console.log(" Insertando Pacientes...");
  await prisma.paciente.createMany({
    data: [
      { id: 1, nombre: "Victor", apellido: "Meneses", dni: "16403020", phone_number: "+51 959 275 045", ecorreo: "victor@gmail.com" },
      { id: 2, nombre: "Julia", apellido: "Alberca", dni: "80152360", phone_number: "+51 931 527 317", ecorreo: "julia@hotmail.com", comentario: "ref. Dr. Luis Perez" },
      { id: 3, nombre: "Ernesto", apellido: "Avila", dni: "14184328", phone_number: "+51 960 998 750", ecorreo: "ernesto@yahoo.es" },
      { id: 4, nombre: "Mateo", apellido: "Muñoz", dni: "94236534", phone_number: "+51 940 405 942", ecorreo: "miki@bcp.pe" },
      { id: 5, nombre: "Alicia", apellido: "Salas", dni: "18032848", phone_number: "+51 900 001 212", ecorreo: "maria@usat.edu" },
      { id: 6, nombre: "Daniel", apellido: "Villalobos", dni: "15380285", phone_number: "+51 918 512 373", ecorreo: "daniel@yahoo.com", comentario: "menor de edad" },
    ]
  });

  console.log(" Insertando Citas...");
  await prisma.cita.createMany({
    data: [
      { id: 1, patientId: 1, doctorId: 1, dateTime: new Date("2026-11-09T08:00:00Z"), status: "PROGRAMADA", diagnosis: "cita general de control" },
      { id: 2, patientId: 2, doctorId: 4, dateTime: new Date("2026-11-09T09:00:00Z"), status: "PROGRAMADA", diagnosis: "cita cardiologia evaluacion" },
      { id: 3, patientId: 3, doctorId: 2, dateTime: new Date("2026-11-09T10:00:00Z"), status: "PROGRAMADA", diagnosis: "cita traumatologia rodilla" },
      { id: 4, patientId: 4, doctorId: 4, dateTime: new Date("2026-11-09T11:00:00Z"), status: "PROGRAMADA", diagnosis: "cita cardiologia control" },
      { id: 5, patientId: 6, doctorId: 3, dateTime: new Date("2026-11-09T16:00:00Z"), status: "PROGRAMADA", diagnosis: "cita pediatria niño sano" },
      { id: 6, patientId: 3, doctorId: 2, dateTime: new Date("2031-10-10T09:00:00Z"), status: "CANCELADA", diagnosis: "paciente no asistio" },
      { id: 7, patientId: 2, doctorId: 4, dateTime: new Date("2031-10-10T10:00:00Z"), status: "COMPLETADA", diagnosis: "ok cardiologia sin arritmias" },
      { id: 8, patientId: 2, doctorId: 7, dateTime: new Date("2031-10-10T11:00:00Z"), status: "COMPLETADA", diagnosis: "ok neurologia migraña controlada" },
      { id: 9, patientId: 5, doctorId: 8, dateTime: new Date("2031-10-10T15:00:00Z"), status: "COMPLETADA", diagnosis: "ok otorrino lavado oido exitoso" },
      { id: 10, patientId: 4, doctorId: 4, dateTime: new Date("2031-10-10T16:00:00Z"), status: "PROGRAMADA", diagnosis: "cita cardiologia post-operatorio" },
      { id: 11, patientId: 4, doctorId: 4, dateTime: new Date("2031-11-11T09:00:00Z"), status: "COMPLETADA", diagnosis: "ok cardiologia alta medica" },
      { id: 12, patientId: 6, doctorId: 3, dateTime: new Date("2031-11-11T10:00:00Z"), status: "COMPLETADA", diagnosis: "cita pediatria resfriado comun" },
    ]
  });

  console.log(" Insertando Usuarios del Sistema...");
  await prisma.user.createMany({
    data: [
      { id: 1, name: "jesus", email: "jcerdan@gmail.com", password: "funval", role_id: 4, role: "GERENCIA" },
      { id: 2, name: "manager", email: "gerencia@clinica.pe", password: "manager", role_id: 3, role: "GERENCIA" },
      { id: 3, name: "doctor", email: "doc@clinica.pe", password: "doc123", role_id: 2, role: "MEDICO" },
      { id: 4, name: "nena", email: "recept@clinica.pe", password: "ingresos", role_id: 1, role: "RECEPCIONISTA" },
    ]
  });

  console.log(" ¡Base de datos sembrada con éxito con el nuevo esquema!");
}

// Ejecución automática al llamar el script

runSeed()
  .catch((e) => {
    console.error("> Error ejecutando el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
// fin - src/config/seed.ts