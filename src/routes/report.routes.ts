// src/routes/report.routes.ts
import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/authorize.middleware.js';
import { validateDailyCutoffQuery } from '../middlewares/validate-report.js';
import {
  getSpecialtyReport,
  getDailyCutoffReport,
} from '../controllers/report.controller.js';

const router: Router = Router();

router.get(
  '/appointments-by-specialty',
  verifyToken,
  authorize('GERENCIA'),
  (req, res, next) => {
    // #swagger.tags = ['Reportes']
    // #swagger.summary = 'Volumen de citas agrupadas por especialidad (Solo GERENCIA)'
    return getSpecialtyReport(req, res, next);
  }
);

router.get(
  '/daily-cutoff',
  verifyToken,
  authorize('GERENCIA'),
  validateDailyCutoffQuery,
  (req, res, next) => {
    // #swagger.tags = ['Reportes']
    // #swagger.summary = 'Corte operativo diario de citas completadas y canceladas (Solo GERENCIA)'
    /* #swagger.parameters['date'] = {
        in: 'query',
        required: true,
        type: 'string',
        example: '2026-07-16'
    } */
    return getDailyCutoffReport(req, res, next);
  }
);

export default router;
// fin - // src/routes/report.routes.ts