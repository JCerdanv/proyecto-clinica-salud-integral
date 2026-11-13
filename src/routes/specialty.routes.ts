// src/routes/specialty.routes.ts

import { Router } from 'express';
import { getSpecialties, createSpecialty, getSpecialtyById } from '../controllers/specialty.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/authorize.middleware';
import { validateCreateSpecialty } from '../middlewares/validate-specialty.js';

const router: Router = Router();

router.get('/', verifyToken, (req, res) => {
  // #swagger.tags = ['Especialidades']
  // #swagger.summary = 'Listar todas las especialidades'
  // #swagger.security = [{ "bearerAuth": [] }]
  return getSpecialties(req, res);
});

router.get('/:id', verifyToken, (req, res) => {
  // #swagger.tags = ['Especialidades']
  // #swagger.summary = 'Obtener una especialidad por ID'
  // #swagger.security = [{ "bearerAuth": [] }]
  return getSpecialtyById(req, res);
});


router.post('/', verifyToken, authorize('GERENCIA'), validateCreateSpecialty, (req, res) => {
  // #swagger.tags = ['Especialidades']
  // #swagger.summary = 'Crear nueva especialidad (Solo GERENCIA)'
  // #swagger.security = [{ "bearerAuth": [] }]
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["nombre"],
            properties: {
              nombre: { type: "string", example: "Cardiología" },
              descripcion: { type: "string", example: "Atención cardiovascular" }
            }
          }
        }
      }
    }
  */
  // #swagger.responses[201] = { description: 'Especialidad creada' }
  // #swagger.responses[401] = { description: 'Token no proporcionado o inválido' }
  // #swagger.responses[403] = { description: 'No tienes permisos para esta acción' }

  return createSpecialty(req, res);
});

export default router;
// fin - src/routes/specialty.routes.ts