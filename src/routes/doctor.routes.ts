// src/routes/doctor.routes.ts
import { Router } from 'express';
import { createDoctor, getDoctors, getDoctorById } from '../controllers/doctor.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/authorize.middleware.js';
import { validateCreateDoctor } from '../middlewares/validate-doctor.js';

const router: Router = Router();

router.get('/', verifyToken, (req, res) => {
  // #swagger.tags = ['Médicos']
  // #swagger.summary = 'Listar todos los médicos'
  return getDoctors(req, res);
});

router.get('/:id', verifyToken, (req, res) => {
  // #swagger.tags = ['Médicos']
  // #swagger.summary = 'Obtener un médico por ID'
  return getDoctorById(req, res);
});

router.post('/', verifyToken, authorize('GERENCIA'), validateCreateDoctor, (req, res) => {
  // #swagger.tags = ['Médicos']
  // #swagger.summary = 'Registrar un nuevo médico (Solo GERENCIA)'
  return createDoctor(req, res);
});

export default router;
// fin - src/routes/doctor.routes.ts