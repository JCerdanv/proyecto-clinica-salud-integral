// src/controllers/specialty.controller.ts
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../config/prisma';

// GET /api/specialties (sin parámetros) retorna todas las especialidades
// GET /api/specialties?nombre=Cardiología (o ?nombre=cardio): Filtra y retorna únicamente las coincidencias

export const getSpecialties = async (req: Request, res: Response) => {
  try {
    const nombre = typeof req.query.nombre === 'string' ? req.query.nombre.trim() : undefined;

    const data = await prisma.especialidad.findMany({
      where: nombre
        ? {
            nombre: {
              contains: nombre,
              mode: 'insensitive', // Busca sin importar mayúsculas o minúsculas
            },
          }
        : undefined,
      include: {
        _count: { select: { medicos: true } },
      },
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener especialidades' });
  }
};


export const createSpecialty = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion } = req.body;

    const data = await prisma.especialidad.create({
      data: { nombre, descripcion },
    });

    return res.status(201).json(data);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return res.status(400).json({ error: '> Ya existe una especialidad con ese nombre' });
    }
    console.error('Error en createSpecialty:', error);
    return res.status(500).json({ error: '> Error al crear la especialidad' });
  }
};

export const getSpecialtyById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'El ID debe ser un número válido' });
    }

    const specialty = await prisma.especialidad.findUnique({ where: { id } });

    if (!specialty) {
      return res.status(404).json({ error: '> Especialidad no encontrada' });
    }

    res.json(specialty);
  } catch (error) {
    res.status(500).json({ error: '> Error al buscar el especialidad' });
  }
};


// fin - src/controllers/specialty.controller.ts
