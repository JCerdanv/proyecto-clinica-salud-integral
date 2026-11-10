// src/controllers/patient.controller.ts
import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getPatients = async (req: Request, res: Response) => {
  try {
    const data = await prisma.paciente.findMany();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pacientes' });
  }
};

export const createPatient = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, dni, phone_number, ecorreo, comentario } = req.body;
    if (!nombre || !apellido || !dni || !phone_number || !ecorreo) {
      return res.status(400).json({ error: 'Los campos obligatorios están incompletos' });
    }

    const data = await prisma.paciente.create({
      data: { nombre, apellido, dni, phone_number, ecorreo, comentario }
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el paciente' });
  }
};
// fin - src/controllers/patient.controller.ts
