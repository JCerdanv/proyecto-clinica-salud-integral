// src/middlewares/validate-appointment.ts
import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const createAppointmentSchema = z.object({
  patientId: z.coerce
    .number({ message: '> El ID del paciente debe ser un número' })
    .int('> El ID del paciente debe ser un entero')
    .positive('> El ID del paciente debe ser positivo'),
  doctorId: z.coerce
    .number({ message: '> El ID del médico debe ser un número' })
    .int('> El ID del médico debe ser un entero')
    .positive('> El ID del médico debe ser positivo'),
  dateTime: z.coerce.date({
    message: '> La fecha y hora de la cita deben tener un formato válido (ISO 8601)',
  }),
  status: z
    .enum(['PROGRAMADA', 'COMPLETADA', 'CANCELADA'], {
      message: '> El estado debe ser PROGRAMADA, COMPLETADA o CANCELADA',
    })
    .default('PROGRAMADA'),
  diagnosis: z
    .string({ message: '> El diagnóstico o motivo es obligatorio' })
    .trim()
    .min(1, '> El diagnóstico no puede estar vacío'),
});

export const validateCreateAppointment = (req: Request, res: Response, next: NextFunction): void => {
  const result = createAppointmentSchema.safeParse(req.body ?? {});

  if (!result.success) {
    res.status(400).json({
      error: '> Datos de la cita inválidos',
      detalles: result.error.flatten().fieldErrors,
    });
    return;
  }

  req.body = result.data;
  next();
};

// fin - src/middlewares/validate-appointment.ts