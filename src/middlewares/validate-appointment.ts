// src/middlewares/validate-appointment.ts
import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';


export const appointmentSchema = z.object({
  patientId: z.number().int().positive('El ID del paciente debe ser positivo'),
  doctorId: z.number().int().positive('El ID del médico debe ser positivo'),
  dateTime: z.coerce.date().refine((date) => date > new Date(), {
    message: 'No puedes agendar una cita en una fecha que ya pasó',
  }),
  diagnosis: z.string().optional(),
});

export const appointmentStatusSchema = z.object({
  status: z.enum(['COMPLETADA', 'CANCELADA'], {
    message: 'El estado debe ser COMPLETADA o CANCELADA',
  }),
});

export const validateAppointment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = appointmentSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: 'Datos de cita inválidos',
      errors: result.error.flatten().fieldErrors,
    });
  }
  req.body = result.data;
  next();
};

export const validateAppointmentStatus = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = appointmentStatusSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: 'Estado inválido',
      errors: result.error.flatten().fieldErrors,
    });
  }
  req.body = result.data;
  next();
};

// fin - src/middlewares/validate-appointment.ts