// src/controllers/patient.controller.ts
import { Request, Response } from 'express';
import * as PatientModel from '../models/patient.model.js';
// import prisma from '../config/prisma';

export const createPatient = async (req: Request, res: Response) => {
  try {
    const newPatient = await PatientModel.createPatient(req.body);
    return res.status(201).json(newPatient);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: '> Ya existe un paciente registrado con ese DNI' });
    }
    return res.status(500).json({ error: '> Error al registrar el paciente' });
  }
};


export const getPatients = async (req: Request, res: Response) => {
  try {
    const patients = await PatientModel.getAllPatients();
    return res.json(patients);
  } catch (error) {
    return res.status(500).json({ error: '> Error al obtener la lista de pacientes' });
  }
};

export const getPatientById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: '> El ID debe ser un número válido' });
    }

    const patient = await PatientModel.getPatientById(id);

    if (!patient) {
      return res.status(404).json({ error: '> Paciente no encontrado' });
    }

    return res.json(patient);
  } catch (error) {
    return res.status(500).json({ error: '> Error al buscar el paciente' });
  }
};



// fin - src/controllers/patient.controller.ts