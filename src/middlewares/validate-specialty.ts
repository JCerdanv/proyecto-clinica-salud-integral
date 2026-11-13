// src/middlewares/validate-specialty.ts
import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const createSpecialtySchema = z.object({
  nombre: z
    .string({ message: '> El nombre de la especialidad es obligatorio' })
    .trim()
    .min(3, '> El nombre debe tener al menos 3 caracteres'),
  descripcion: z
    .string()
    .trim()
    .optional(),
});

export const validateCreateSpecialty = (req: Request, res: Response, next: NextFunction): void => {
  const result = createSpecialtySchema.safeParse(req.body ?? {});

  if (!result.success) {
    res.status(400).json({
      error: '> Datos de especialidad inválidos',
      detalles: result.error.flatten().fieldErrors,
    });
    return;
  }

  req.body = result.data;
  next();
};

// fin - src/middlewares/validate-specialty.ts
