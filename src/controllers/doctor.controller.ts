// src/controllers/doctor.controller.ts
//import { Prisma } from '@prisma/client';
import { Prisma } from '../../generated/prisma/client.js';
import { Request, Response } from 'express';
// import prisma from '../config/prisma';
import * as DoctorModel from '../models/doctor.model.js';


export const getDoctors = async (req: Request, res: Response) => {
  try {
    const specialty = req.query.specialty as string | undefined;
    const doctors = await DoctorModel.getAllDoctors(specialty);
    return res.json(doctors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '> Error al obtener el directorio de médicos' });
  }
};


export const createDoctor = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, cmp, phone_number, ecorreo, specialtyId } = req.body;
    if (!nombre || !apellido || !cmp  || !phone_number || !ecorreo || !specialtyId) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const data = await DoctorModel.createDoctor({
      nombre,
      apellido,
      cmp,
      phone_number,
      ecorreo,
      especialidad: { connect: { id: Number(specialtyId) } }
    });

    return res.status(201).json(data);
  } catch (error) {
    console.error('> error al crear médico:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.status(400).json({ error: 'Ya existe un médico con ese CMP o ID' });
      }
      if (error.code === 'P2003') {
        return res.status(400).json({ error: 'La especialidad indicada (specialtyId) no existe' });
      }
    }

    return res.status(500).json({ error: '> Error interno al registrar el médico' });
  }
};


export const getDoctorById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: '> El ID debe ser un numero válido' });
    }

    const doctor = await prisma.medico.findUnique({
      where: { id },
      include: { especialidad: true }
    });

    if (!doctor) {
      return res.status(404).json({ error: '> Doctor no encontrado' });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: '> Error al buscar el Doctor' });
  }
};



// fin - src/controllers/doctor.controller.ts
