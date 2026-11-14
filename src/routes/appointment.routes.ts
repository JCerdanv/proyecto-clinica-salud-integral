// src/routes/appointment.routes.ts

import { Router } from 'express';
import {
  getAppointments,
  createAppointment,
  getAppointmentById,
  updateAppointmentStatus,
} from '../controllers/appointment.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/authorize.middleware.js';
import {
  validateAppointment,
  validateAppointmentStatus,
} from '../middlewares/validate-appointment.js';

const router: Router = Router();

//router.get('/', verifyToken, (req, res) => {
router.get('/', verifyToken, (req, res ) => {
  // #swagger.tags = ['Citas']
  // #swagger.summary = 'Listar todas las citas'
//  return getAppointments(req, res);
    return getAppointments(req, res);
});

//router.get('/:id', verifyToken, (req, res) => {
router.get('/:id', verifyToken, (req, res, next) => {
  // #swagger.tags = ['Citas']
  // #swagger.summary = 'Obtener una cita por ID'
//  return getAppointmentById(req, res);
  return getAppointmentById(req, res, next);
});

router.post(
  '/',
  verifyToken,
  authorize('RECEPCIONISTA', 'GERENCIA'),
  validateAppointment,
  (req, res, next) => {  
//  (req, res) => {
    // #swagger.tags = ['Citas']
    // #swagger.summary = 'Agendar una nueva cita (RECEPCIONISTA o GERENCIA)'
    /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["patientId", "doctorId", "dateTime"],
              properties: {
                patientId: { type: "integer", example: 1 },
                doctorId: { type: "integer", example: 2 },
                dateTime: { type: "string", example: "2026-12-15T10:30:00Z" },
                diagnosis: { type: "string", example: "Consulta preventiva" }
              }
            }
          }
        }
      }
    */
    return createAppointment(req, res, next);
//    return createAppointment(req, res);
  }
);

router.patch(
  '/:id/status',
  verifyToken,
  authorize('MEDICO'),
  validateAppointmentStatus,
  (req, res, next) => {  
//  (req, res) => {
    // #swagger.tags = ['Citas']
    // #swagger.summary = 'Actualizar estado de una cita (Solo MEDICO)'
    /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["status"],
              properties: {
                status: { type: "string", example: "COMPLETADA" }
              }
            }
          }
        }
      }
    */
    return updateAppointmentStatus(req, res, next);   
//    return updateAppointmentStatus(req, res);
  }
);
export default router;
// fin - src/routes/appointment.routes.ts