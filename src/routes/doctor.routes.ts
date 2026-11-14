// src/routes/doctor.routes.ts
import { Router } from 'express';
import { createDoctor, getDoctors, getDoctorById } from '../controllers/doctor.controller.js';
import { getDoctorAppointments } from '../controllers/appointment.controller.js';
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


// router.get('/:id/appointments', authenticate,  authorize('MEDICO'), getDoctorAppointments );

router.get('/:id/appointments', verifyToken, authorize('MEDICO'), (req, res, next) => {
  // #swagger.tags = ['Médicos']
  // #swagger.summary = 'Obtener agenda del médico filtrable por rango de fechas (Solo MEDICO)'
  /* #swagger.parameters['from'] = { in: 'query', type: 'string', example: '2026-11-01' } */
  /* #swagger.parameters['to'] = { in: 'query', type: 'string', example: '2026-11-30' } */
  return getDoctorAppointments(req, res, next);
});

router.post('/', verifyToken, authorize('GERENCIA'), validateCreateDoctor, (req, res) => {
  // #swagger.tags = ['Médicos']
  // #swagger.summary = 'Registrar un nuevo médico (Solo GERENCIA)'
  return createDoctor(req, res);
});



export default router;
// fin - src/routes/doctor.routes.ts