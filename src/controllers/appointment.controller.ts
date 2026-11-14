// src/controllers/appointment.controller.ts
//import { Request, Response } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../config/prisma';
import * as AppointmentModel from '../models/appointment.model.js';
import * as PatientModel from '../models/patient.model.js';
import * as DoctorModel from '../models/doctor.model.js';

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const data = await AppointmentModel.getAllAppointments();
    return res.json(data);
  } catch (error) {
    console.error('Error en getAppointments:', error);
    return res.status(500).json({ error: '> Error al obtener citas' });
  }
};

export const getAppointmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: '> El ID debe ser un número válido' });
    }

    const appointment = await AppointmentModel.getAppointmentById(id);
    if (!appointment) {
      return res.status(404).json({ error: '> Cita no encontrada' });
    }

    return res.json(appointment);
  } catch (error) {
    next(error);
  }
};

export const createAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { patientId, doctorId, dateTime, diagnosis } = req.body;

    // 1. Verificar que el paciente y el médico existan antes de crear
    const [patient, doctor] = await Promise.all([
      PatientModel.getPatientById(patientId),
      DoctorModel.getDoctorById(doctorId),
    ]);

    if (!patient) {
      return res.status(404).json({ error: '> El paciente indicado no existe' });
    }

    if (!doctor) {
      return res.status(404).json({ error: '> El médico indicado no existe' });
    }

    // 2. Crear la cita (status nace en PROGRAMADA por defecto en Prisma)
    const data = await AppointmentModel.createAppointment({
      patientId,
      doctorId,
      dateTime,
      diagnosis,
    });

    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const getDoctorAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doctorId = Number(req.params.id);
    if (isNaN(doctorId)) {
      return res.status(400).json({ error: '> El ID del médico debe ser un número válido' });
    }

    const doctor = await DoctorModel.getDoctorById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: '> Médico no encontrado' });
    }

    const { from, to } = req.query;
    let fromDate: Date | undefined;
    let toDate: Date | undefined;

    if (typeof from === 'string' && typeof to === 'string' && from.trim() && to.trim()) {
      fromDate = new Date(from);
      toDate = to.includes('T') ? new Date(to) : new Date(`${to}T23:59:59.999Z`);

      if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
        return res.status(400).json({ error: '> Las fechas from y to deben tener un formato válido' });
      }
    }

    const agenda = await AppointmentModel.getDoctorAgenda(doctorId, fromDate, toDate);
    return res.json(agenda);
  } catch (error) {
    next(error);
  }
};


export const updateAppointmentStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: '> El ID de la cita debe ser un número válido' });
    }

    const { status } = req.body;
    const updated = await AppointmentModel.updateAppointmentStatus(id, status);

    return res.json(updated);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ error: '> Cita no encontrada' });
    }
    next(error);
  }
};

// fin - src/controllers/appointment.controller.ts