// src/controllers/specialty.controller.ts
import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getSpecialties = async (req: Request, res: Response) => {
  try {
    const data = await prisma.especialidad.findMany({
      include: {
        _count: { select: { medicos: true } }
      }
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener especialidades' });
  }
};

export const createSpecialty = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion } = req.body;
    if (!nombre || !descripcion) {
      return res.status(400).json({ error: 'El nombre y la descripción son obligatorios' });
    }

    const data = await prisma.especialidad.create({
      data: { nombre, descripcion }
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la especialidad' });
  }
};
// fin - src/controllers/specialty.controller.ts
