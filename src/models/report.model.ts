// src/models/report.model.ts
import prisma from '../config/prisma.js';

export interface SpecialtyReportRow {
  specialty: string;
  total_appointments: number;
}

export const getAppointmentsBySpecialty = () => {
  return prisma.$queryRaw<SpecialtyReportRow[]>`
    SELECT e.nombre AS specialty, COUNT(c.id)::int AS total_appointments
    FROM citas c
    INNER JOIN medicos m ON m.id = c.doctor_id
    INNER JOIN especialidades e ON e.id = m.specialty_id
    GROUP BY e.nombre
    ORDER BY total_appointments DESC
  `;
};

export const getDailyCutoff = (date: string) => {
  const startOfDay = new Date(`${date}T00:00:00.000Z`);
  const endOfDay = new Date(`${date}T23:59:59.999Z`);

  return prisma.cita.groupBy({
    by: ['status'],
    where: {
      dateTime: {
        gte: startOfDay,
        lte: endOfDay,
      },
      status: {
        in: ['COMPLETADA', 'CANCELADA'],
      },
    },
    _count: {
      status: true,
    },
  });
};

// fin - src/models/report.model.ts
