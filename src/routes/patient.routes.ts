// src/routes/patient.routes.ts
import { Router } from 'express';
import { createPatient, getPatients, getPatientById } from '../controllers/patient.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/authorize.middleware.js';
import { validatePatient } from '../middlewares/validate-patient.js';

const router: Router = Router();

//router.get('/', verifyToken, getPatients);
router.get('/', verifyToken, (req, res) => {
  // #swagger.tags = ['Pacientes']
  // #swagger.summary = 'Listar todos los pacientes'
  return getPatients(req, res);
});

//router.get('/:id', verifyToken, getPatientById);
router.get('/:id', verifyToken, (req, res) => {
  // #swagger.tags = ['Pacientes']
  // #swagger.summary = 'Obtener expediente completo de un paciente por ID'
  return getPatientById(req, res);
});

//router.post('/', verifyToken, authorize('GERENCIA', 'RECEPCIONISTA'), validatePatient, createPatient);
router.post('/', verifyToken, authorize('GERENCIA', 'RECEPCIONISTA'), validatePatient, (req, res) => {
  // #swagger.tags = ['Pacientes']
  // #swagger.summary = 'Registrar un nuevo paciente (GERENCIA o RECEPCIONISTA)'
  return createPatient(req, res);
});

export default router;
// fin - src/routes/patient.routes.ts