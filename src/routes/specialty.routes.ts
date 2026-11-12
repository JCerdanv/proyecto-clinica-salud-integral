// src/routes/specialty.routes.ts

import { Router } from 'express';
import { getSpecialties, createSpecialty, getSpecialtyById } from '../controllers/specialty.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/authorize.middleware';

const router: Router = Router();


router.get('/', (req, res) => {
  // #swagger.tags = ['Especialidades']
  // #swagger.summary = 'Listar todas las especialidades'
  return getSpecialties(req, res);
});

router.get('/:id', (req, res) => {
  // #swagger.tags = ['Especialidades']
  // #swagger.summary = 'Lista una especialidad'
   return getSpecialtyById(req, res);
});


router.post('/', verifyToken, authorize('GERENCIA'), (req, res) => {
  // #swagger.tags = ['Especialidades']
  // #swagger.summary = 'Crear nueva especialidad (Solo GERENCIA)'
  // #swagger.security = [{ "bearerAuth": [] }]
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["name"],
            properties: {
              name: { type: "string", example: "Cardiología" },
              description: { type: "string", example: "Atención cardiovascular" }
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