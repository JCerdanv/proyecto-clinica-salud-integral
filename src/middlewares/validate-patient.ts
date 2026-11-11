// src/middlewares/validate-patient.ts

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const patientSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  apellido: z.string().min(1, 'El apellido es obligatorio'),
  dni: z.string().min(8, 'El DNI debe tener al menos 8 caracteres'),
  phone_number: z.string().min(6, 'El teléfono es obligatorio'),
  ecorreo: z.string().email('El correo no tiene un formato válido'),
  fechaNacimiento: z.coerce
    .date({ message: 'La fecha de nacimiento debe ser una fecha válida' })
    .max(new Date(), 'La fecha de nacimiento no puede ser futura'),
  comentario: z.string().optional()
});

export const validatePatient = (req: Request, res: Response, next: NextFunction) => {
  const result = patientSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: 'Datos de paciente inválidos',
      detalles: result.error.flatten().fieldErrors
    });
  }

  // Reemplazamos req.body con los datos ya validados y transformados (ej. fecha convertida a Date)
  req.body = result.data;
  next();
};

// fin - src/middlewares/validate-patient.ts