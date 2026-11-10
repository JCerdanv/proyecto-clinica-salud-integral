// src/controllers/doctor.controller.ts
import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getDoctors = async (req: Request, res: Response) => {
  try {
    const data = await prisma.medico.findMany({
      include: { especialidad: true }
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener médicos' });
  }
};

export const createDoctor = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, cmp, specialtyId } = req.body;
    if (!nombre || !apellido || !cmp || !specialtyId) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const data = await prisma.medico.create({
      data: { nombre, apellido, cmp, specialtyId }
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el médico' });
  }
};
// fin - src/controllers/doctor.controller.ts
