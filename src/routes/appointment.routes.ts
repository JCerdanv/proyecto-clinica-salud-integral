// src/routes/appointment.routes.ts
import { Router } from 'express';
import { getAppointments, createAppointment, getAppointmentById } from '../controllers/appointment.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/authorize.middleware.js';
import { validateCreateAppointment } from '../middlewares/validate-appointment.js';

const router: Router = Router();

//router.get('/', verifyToken, getAppointments);
router.get('/', verifyToken, (req, res) => {
  // #swagger.tags = ['Citas']
  // #swagger.summary = 'Listar todas las citas'
  return getAppointments(req, res);
});

//router.get('/:id', verifyToken, getAppointmentById);
router.get('/:id', verifyToken, (req, res) => {
  // #swagger.tags = ['Citas']
  // #swagger.summary = 'Obtener una cita por ID'
  return getAppointmentById(req, res);
});

//router.post('/', verifyToken, authorize('GERENCIA', 'RECEPCIONISTA'), validateCreateAppointment, createAppointment);
router.post('/', verifyToken, authorize('GERENCIA', 'RECEPCIONISTA'), validateCreateAppointment, (req, res) => {
  // #swagger.tags = ['Citas']
  // #swagger.summary = 'Agendar una nueva cita (GERENCIA o RECEPCIONISTA)'
  return createAppointment(req, res);
});  

export default router;
// fin - src/routes/appointment.routes.ts