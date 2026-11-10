// src/controllers/appointment.controller.ts
import { Request, Response } from 'express';
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
    const { patientId, doctorId, dateTime, status, diagnosis } = req.body;
    if (!patientId || !doctorId || !dateTime || !status || !diagnosis) {
      return res.status(400).json({ error: 'Todos los campos de la cita son obligatorios' });
    }

    const data = await prisma.cita.create({
      data: {
        patientId,
        doctorId,
        dateTime: new Date(dateTime),
        status,
        diagnosis
      }
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al agendar la cita' });
  }
};
// fin - src/controllers/appointment.controller.ts