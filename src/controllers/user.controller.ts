// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const data = await prisma.user.findMany({
      select: {
        id: true,       name: true,
        email: true,    role: true
      }
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role_id, role } = req.body;
    if (!name || !email || !password || !role_id || !role) {
      return res.status(400).json({ error: 'Todos los campos de usuario son obligatorios' });
    }

    const data = await prisma.user.create({
      data: { name, email, password, role_id, role },
      select: { id: true, name: true, email: true, role: true } // Oculta password en la respuesta
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};
// fin - src/controllers/user.controller.ts