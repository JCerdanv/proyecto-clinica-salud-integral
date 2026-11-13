// src/middlewares/validate-doctor.ts
import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const createDoctorSchema = z.object({
  nombre: z
    .string({ message: '> El nombre es obligatorio' })
    .trim()
    .min(2, '> El nombre debe tener al menos 2 caracteres'),
  apellido: z
    .string({ message: '> El apellido es obligatorio' })
    .trim()
    .min(2, '> El apellido debe tener al menos 2 caracteres'),
  cmp: z
    .string({ message: '> El CMP es obligatorio' })
    .trim()
    .min(3, '> El CMP debe tener al menos 3 caracteres'),
  phone_number: z
    .string({ message: '> El teléfono es obligatorio' })
    .trim()
    .min(6, '> El teléfono debe tener al menos 6 caracteres'),
  ecorreo: z
    .string({ message: '> El correo es obligatorio' })
    .trim()
    .toLowerCase()
    .email('> El correo no tiene un formato válido'),
  specialtyId: z.coerce
    .number({ message: '> El ID de especialidad debe ser un número' })
    .int('> El ID de especialidad debe ser un entero')
    .positive('> El ID de especialidad debe ser positivo'),
});

export const validateCreateDoctor = (req: Request, res: Response, next: NextFunction): void => {
  const result = createDoctorSchema.safeParse(req.body ?? {});

  if (!result.success) {
    res.status(400).json({
      error: '> Datos de médico inválidos',
      detalles: result.error.flatten().fieldErrors,
    });
    return;
  }

  req.body = result.data;
  next();
};

// fin - src/middlewares/validate-doctor.ts