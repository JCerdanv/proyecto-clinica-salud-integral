// src/middlewares/validate-user.ts
import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ message: '> El correo es obligatorio' })
    .trim()
    .toLowerCase()
    .email('> El correo no tiene un formato válido'),
  password: z
    .string({ message: '> La contraseña es obligatoria' })
    .min(1, '> La contraseña no puede estar vacía'),
});

export const createUserSchema = z.object({
  name: z
    .string({ message: '> El nombre es obligatorio' })
    .trim()
    .min(2, '> El nombre debe tener al menos 2 caracteres'),
  email: z
    .string({ message: '> El correo es obligatorio' })
    .trim()
    .toLowerCase()
    .email('> El correo no tiene un formato válido'),
  password: z
    .string({ message: '> La contraseña es obligatoria' })
    .min(6, '> La contraseña debe tener al menos 6 caracteres'),
  role_id: z
    .number({ message: '> El role_id debe ser un número entero' })
    .int('> El role_id debe ser un entero')
    .positive('> El role_id debe ser positivo'),
  role: z.enum(['RECEPCIONISTA', 'MEDICO', 'GERENCIA'], {
    message: '> El rol debe ser RECEPCIONISTA, MEDICO o GERENCIA',
  }),
});

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const result = loginSchema.safeParse(req.body ?? {});

  if (!result.success) {
    res.status(400).json({
      error: '> Datos de inicio de sesión inválidos',
      detalles: result.error.flatten().fieldErrors,
    });
    return;
  }

  req.body = result.data;
  next();
};

export const validateCreateUser = (req: Request, res: Response, next: NextFunction): void => {
  const result = createUserSchema.safeParse(req.body ?? {});

  if (!result.success) {
    res.status(400).json({
      error: '> Datos de usuario inválidos',
      detalles: result.error.flatten().fieldErrors,
    });
    return;
  }

  req.body = result.data;
  next();
};

// fin - src/middlewares/validate-user.ts