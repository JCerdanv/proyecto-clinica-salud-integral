// src/models/appointment.model.ts
import { Prisma } from '@prisma/client';
import prisma from '../config/prisma.js';

export const getAllAppointments = () => {
  return prisma.cita.findMany({
    include: {
      paciente: true,
      medico: { include: { especialidad: true } },
    },
    orderBy: { dateTime: 'asc' },
  });
};

export const getAppointmentById = (id: number) => {
  return prisma.cita.findUnique({
    where: { id },
    include: {
      paciente: true,
      medico: true,
    },
  });
};

export const createAppointment = (data: Prisma.CitaUncheckedCreateInput) => {
  return prisma.cita.create({
    data,
    include: {
      paciente: true,
      medico: true,
    },
  });
};

export const getDoctorAgenda = (doctorId: number, from?: Date, to?: Date) => {
  const where: Prisma.CitaWhereInput = { doctorId };

  if (from && to) {
    where.dateTime = { gte: from, lte: to };
  }

  return prisma.cita.findMany({
    where,
    include: { paciente: true },
    orderBy: { dateTime: 'asc' },
  });
};

export const updateAppointmentStatus = (
    id: number, 
    status: 'COMPLETADA' | 'CANCELADA'
     ) => {
  return prisma.cita.update({
    where: { id },
    data: { status },
  });
};

// fin - src/models/appointment.model.ts 