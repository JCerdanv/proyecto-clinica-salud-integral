// src/routes/patient.routes.ts
import { Router } from 'express';
import { createPatient, getPatients, getPatientById } from '../controllers/patient.controller.js';
import { validatePatient } from '../middlewares/validate-patient.js';

const router: Router = Router();

router.post('/', validatePatient, createPatient);
router.get('/', getPatients);
router.get('/:id', getPatientById);

export default router;
// fin - src/routes/patient.routes.ts
