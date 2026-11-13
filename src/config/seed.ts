// src/config/seed.ts
import bcrypt from 'bcrypt';
// import { runSeed }
import prisma from './prisma.js';

// deleteMany() no reinicia los contadores autoincrementales de PostgreSQL

export async function runSeed() {
  console.log(" Vaciando tablas en cascada...");
  // El orden de borrado previene errores de restricción de llave foránea (FK)
  // await prisma.cita.deleteMany();
  // await prisma.medico.deleteMany();
  // await prisma.paciente.deleteMany();
  // await prisma.user.deleteMany();
  // await prisma.especialidad.deleteMany();

  await prisma.$executeRawUnsafe(
  `TRUNCATE TABLE citas, medicos, pacientes, users, especialidades RESTART IDENTITY CASCADE;`
  );

  console.log(" Insertando Especialidades...");
  await prisma.especialidad.createMany({
    data: [
      { nombre: "Medicina General", descripcion: "Diagnósticos iniciales, chequeos y derivaciones" },
      { nombre: "Ginecología y Obstetricia", descripcion: "Control -salud femenina, planificación familiar y seguimiento de embarazo" },
      { nombre: "Cardiología", descripcion: "Enfermedades del corazón y chequeos de hipertensión" },
      { nombre: "Pediatría", descripcion: "Atención médica, control de crecimiento y vacunación de niños" },
      { nombre: "Dermatología", descripcion: "Afecciones a la piel, acné, alergias y procedimientos estéticos" },
      { nombre: "Traumatología y Ortopedia", descripcion: "Lesiones deportivas, dolores articulares y problemas de columna" },
      { nombre: "Gastroenterología", descripcion: "Problemas digestivos, gastritis y endoscopías" },
      { nombre: "Endocrinología", descripcion: "Manejo de diabetes, problemas a la tiroides y control de peso/obesidad" },
      { nombre: "Oftalmología", descripcion: "Medida de la vista, descartes de cataratas y salud ocular" },
      { nombre: "Otorrinolaringología", descripcion: "Problemas de oído, nariz, garganta y alergias respiratorias" },
      { nombre: "Neurología, Psicología / Psiquiatría", descripcion: "Consultas por estrés, ansiedad y trastornos del sueño" },
      { nombre: "Otros", descripcion: "No atendido" },
    ]
  });

  console.log(" Insertando Médicos...");
  await prisma.medico.createMany({
    data: [
      { nombre: "Alberto", apellido: "Llontop", cmp: "CMP-001", phone_number: "+51 998 275 045", ecorreo: "alberto@salud.pe", specialtyId: 1 },
      { nombre: "Marco",   apellido: "Condor",  cmp: "CMP-002", phone_number: "+51 921 527 317", ecorreo: "marco@salud.pe",   specialtyId: 6 },
      { nombre: "Luis",    apellido: "Perez",   cmp: "CMP-003", phone_number: "+51 930 998 750", ecorreo: "luis@salud.pe",    specialtyId: 4 },
      { nombre: "Alberto", apellido: "Garcia",  cmp: "CMP-004", phone_number: "+51 914 405 942", ecorreo: "agarcia@salud.pe", specialtyId: 3 },
      { nombre: "Maria",   apellido: "Salazar", cmp: "CMP-005", phone_number: "+51 900 601 521", ecorreo: "maria@salud.pe",   specialtyId: 2 },
      { nombre: "Cecilia", apellido: "Serquen", cmp: "CMP-006", phone_number: "+51 985 125 732", ecorreo: "cecilia@salud.pe", specialtyId: 9 },
      { nombre: "Wilson",  apellido: "Martinez",cmp: "CMP-007", phone_number: "+51 948 237 512", ecorreo: "wilson@salud.pe",  specialtyId: 11 },
      { nombre: "Karla",   apellido: "Vargas",  cmp: "CMP-008", phone_number: "+51 900 000 000", ecorreo: "karla@salud.pe",   specialtyId: 10 },
    ]
  });

  console.log(" Insertando Pacientes...");
  await prisma.paciente.createMany({
    data: [
      { nombre: "Victor", apellido: "Meneses", dni: "16403020", phone_number: "+51 959 275 045", ecorreo: "victor@gmail.com", fechaNacimiento: new Date("1986-12-09"), comentario: "traslado" },
      { nombre: "Julia",  apellido: "Alberca", dni: "80152360", phone_number: "+51 931 527 317", ecorreo: "julia@hotmail.com", fechaNacimiento: new Date("2000-01-10"), comentario: "ref. Dr. Luis Perez" },
      { nombre: "Ernesto",apellido: "Avila",   dni: "14184328", phone_number: "+51 960 998 750", ecorreo: "ernesto@yahoo.es", fechaNacimiento: new Date("1991-08-16"), comentario: "socio" },
      { nombre: "Mateo",  apellido: "Muñoz",   dni: "94236534", phone_number: "+51 940 405 942", ecorreo: "miki@bcp.pe", fechaNacimiento: new Date("1985-03-28"), comentario: "familiar" },
      { nombre: "Alicia", apellido: "Salas",   dni: "18032848", phone_number: "+51 900 001 212", ecorreo: "maria@usat.edu", fechaNacimiento: new Date("1980-11-02"), comentario: "bajos recursosr" },
      { nombre: "Daniel", apellido: "Villalobos", dni: "15380285", phone_number: "+51 918 512 373", ecorreo: "daniel@yahoo.com", fechaNacimiento: new Date("1985-03-28"), comentario: "menor de edad" },
    ]
  });

  console.log(" Insertando Citas...");
  await prisma.cita.createMany({
    data: [
      { patientId: 1, doctorId: 1, dateTime: new Date("2026-11-09T08:00:00Z"), status: "PROGRAMADA", diagnosis: "cita general de control" },
      { patientId: 2, doctorId: 4, dateTime: new Date("2026-11-09T09:00:00Z"), status: "PROGRAMADA", diagnosis: "cita cardiologia evaluacion" },
      { patientId: 3, doctorId: 2, dateTime: new Date("2026-11-09T10:00:00Z"), status: "PROGRAMADA", diagnosis: "cita traumatologia rodilla" },
      { patientId: 4, doctorId: 4, dateTime: new Date("2026-11-09T11:00:00Z"), status: "PROGRAMADA", diagnosis: "cita cardiologia control" },
      { patientId: 6, doctorId: 3, dateTime: new Date("2026-11-09T16:00:00Z"), status: "PROGRAMADA", diagnosis: "cita pediatria niño sano" },
      { patientId: 3, doctorId: 2, dateTime: new Date("2031-10-10T09:00:00Z"), status: "CANCELADA",  diagnosis: "paciente no asistio" },
      { patientId: 2, doctorId: 4, dateTime: new Date("2031-10-10T10:00:00Z"), status: "COMPLETADA", diagnosis: "ok cardiologia sin arritmias" },
      { patientId: 2, doctorId: 7, dateTime: new Date("2031-10-10T11:00:00Z"), status: "COMPLETADA", diagnosis: "ok neurologia migraña controlada" },
      { patientId: 5, doctorId: 8, dateTime: new Date("2031-10-10T15:00:00Z"), status: "COMPLETADA", diagnosis: "ok otorrino lavado oido exitoso" },
      { patientId: 4, doctorId: 4, dateTime: new Date("2031-10-10T16:00:00Z"), status: "PROGRAMADA", diagnosis: "cita cardiologia post-operatorio" },
      { patientId: 4, doctorId: 4, dateTime: new Date("2031-11-11T09:00:00Z"), status: "COMPLETADA", diagnosis: "ok cardiologia alta medica" },
      { patientId: 6, doctorId: 3, dateTime: new Date("2031-11-11T10:00:00Z"), status: "COMPLETADA", diagnosis: "cita pediatria resfriado comun" },
    ]
  });

//   console.log("Insertando Usuarios encriptados del Sistema...");
//     const [passJesus, passManager, passDoctor, passNena] = await Promise.all([
//     bcrypt.hash("funval", 10),
//     bcrypt.hash("manager", 10),
//     bcrypt.hash("doc123", 10),
//     bcrypt.hash("ingresos", 10),
//    ]);

//    await prisma.user.createMany({
//      data: [
//        { name: "jesus", email: "jcerdan@gmail.com", password: passJesus, role_id: 4, role: "GERENCIA" },
//        { name: "manager", email: "gerencia@clinica.pe", password: passManager, role_id: 3, role: "GERENCIA" },
//        { name: "doctor", email: "doc@clinica.pe", password: passDoctor, role_id: 2, role: "MEDICO" },
//        { name: "nena", email: "recept@clinica.pe", password: passNena, role_id: 1, role: "RECEPCIONISTA" },
//      ],
//    });

  console.log(" Insertando Usuarios encriptado del Sistema...");
  await prisma.user.createMany({
     data: [
     { name: "jesus", email: "jcerdan@gmail.com", password: await bcrypt.hash("funval", 10), role_id: 4, role: "GERENCIA" },
     { name: "manager", email: "gerencia@clinica.pe", password: await bcrypt.hash("manager", 10), role_id: 3, role: "GERENCIA" },
     { name: "doctor", email: "doc@clinica.pe", password: await bcrypt.hash("doc123", 10), role_id: 2, role: "MEDICO" },
     { name: "nena", email: "recept@clinica.pe", password: await bcrypt.hash("ingresos", 10), role_id: 1, role: "RECEPCIONISTA" },
  ]
});
  console.log(" ¡Base de datos sembrada con éxito con el nuevo esquema!");
}

// Ejecución automática al llamar el script
if (process.argv[1]?.includes('seed')) {
  runSeed()
    .catch((e) => {
      console.error("> Error ejecutando el seed:", e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

// fin - src/config/seed.ts