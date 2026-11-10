// src/routes/patient.routes.ts
import { Router } from 'express';

import { getPatients, createPatient } from '../controllers/patient.controller';

const router: Router = Router();
router.get('/', getPatients);
router.post('/', createPatient);  // Nuevo método POST

export default router;
// fin - src/routes/patient.routes.ts
