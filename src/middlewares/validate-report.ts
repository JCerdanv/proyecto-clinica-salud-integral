// src/middlewares/validate-report.ts
import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const dailyCutoffQuerySchema = z.object({
  date: z
    .string({ message: '> El parámetro query "date" es obligatorio' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, '> La fecha debe tener el formato YYYY-MM-DD'),
});

export const validateDailyCutoffQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = dailyCutoffQuerySchema.safeParse(req.query);

  if (!result.success) {
    return res.status(400).json({
      error: '> Parámetros de consulta inválidos',
      detalles: result.error.flatten().fieldErrors,
    });
  }

  next();
};
// fin - src/middlewares/validate-report.ts