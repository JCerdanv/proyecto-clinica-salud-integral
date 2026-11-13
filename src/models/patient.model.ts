// src/models/patient.model.ts
import prisma from '../config/prisma.js';
import { Prisma } from '@prisma/client';
// import { Prisma } from '../../generated/prisma/client.js';

export const createPatient = (data: Prisma.PacienteCreateInput) => {
  return prisma.paciente.create({ data });
};

export const getAllPatients = () => {
  return prisma.paciente.findMany({
    orderBy: { id: 'asc' }
  });
};

export const getPatientById = (id: number) => {
  return prisma.paciente.findUnique({
    where: { id },
    include: {
      citas: {
        include: {
          medico: {
            include: {
              especialidad: true
            }
          }
        },
        orderBy: { dateTime: 'desc' }
      }
    }
  });
};

// antes
//export const getPatientById = (id: number) => {
//  return prisma.paciente.findUnique({
//    where: { id }
//  });
//};


// fin - src/models/patient.model.ts