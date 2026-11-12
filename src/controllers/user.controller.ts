// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';

const SALT_ROUNDS = 10;

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
    res.status(500).json({ error: '> Error al obtener usuarios' });
  }
};


export const getUsersById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: '> El ID debe ser un número válido' });
    }

    const usuario = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role_id: true,
        role: true,
      },
    });

    if (!usuario) {
      return res.status(404).json({ error: '> Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: '> Error al buscar Usuario' });
  }
};


export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role_id, role } = req.body;
    if (!name || !email || !password || !role_id || !role) {
      return res.status(400).json({ error: '> Todos los campos de usuario son obligatorios' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const data = await prisma.user.create({
      data: { name, email, password: hashedPassword, role_id, role },
      select: { id: true, name: true, email: true, role: true } // Oculta password en la respuesta
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: '> Error al registrar el usuario' });
    }
  };


export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: '> Credenciales inválidas' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: '> Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: '> Error al iniciar sesión' });
  }
};

// fin - src/controllers/user.controller.ts