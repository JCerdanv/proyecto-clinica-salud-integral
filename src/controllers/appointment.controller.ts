// src/controllers/appointment.controller.ts
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../config/prisma';

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const data = await prisma.cita.findMany({
      include: {
        paciente: true,
        medico: true
      }
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener citas' });
  }
};

export const createAppointment = async (req: Request, res: Response) => {
  try {
    // req.body ya viene validado y con dateTime convertido a objeto Date por Zod
    const { patientId, doctorId, dateTime, status, diagnosis } = req.body;

    const data = await prisma.cita.create({
      data: {
        patientId,
        doctorId,
        dateTime,
        status,
        diagnosis,
      },
    });

    return res.status(201).json(data);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
      return res.status(400).json({
        error: '> El paciente (patientId) o el médico (doctorId) indicado no existe',
      });
    }
    console.error('Error en createAppointment:', error);
    return res.status(500).json({ error: '> Error al agendar la cita' });
  }
};


export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: '> El ID debe ser un número válido' });
    }

    const appointment = await prisma.cita.findUnique({ where: { id } });

    if (!appointment) {
      return res.status(404).json({ error: '> Cita no encontrada' });
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: '> Error al buscar el Cita' });
  }
};

// fin - src/controllers/appointment.controller.ts