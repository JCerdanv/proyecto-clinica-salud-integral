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

export const getPatientById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'El ID debe ser un número válido' });
    }

    const patient = await prisma.paciente.findUnique({ where: { id } });

    if (!patient) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el paciente' });
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
