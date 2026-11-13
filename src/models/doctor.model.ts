// src/models/doctor.model.ts
import prisma from '../config/prisma.js';
import { Prisma } from '@prisma/client'; // coincidir con tu generator en schema.prisma
// import { Prisma } from '../../generated/prisma/client.js';

export const getAllDoctors = (specialtyName?: string) => {
  const where: Prisma.MedicoWhereInput = {};

  if (specialtyName) {
    where.especialidad = {
      nombre: {
        equals: specialtyName,
        mode: 'insensitive'
      }
    };
  }

  return prisma.medico.findMany({
    where,
    include: {
      especialidad: true
    },
    orderBy: { id: 'asc' }
  });
};


/*
export const getAllDoctors = (specialtyName?: string) => {
  return prisma.medico.findMany({
    where: specialtyName
      ? {
          especialidad: {
            nombre: {
              equals: specialtyName,
              mode: 'insensitive'
            }
          }
        }
      : undefined,
    include: {
      especialidad: true
    }
  });
};
*/

export const getDoctorById = (id: number) => {
  return prisma.medico.findUnique({
    where: { id }
  });
};

export const createDoctor = (data: Prisma.MedicoCreateInput) => {
  return prisma.medico.create({ data });
};

// fin - src/models/doctor.model.ts

