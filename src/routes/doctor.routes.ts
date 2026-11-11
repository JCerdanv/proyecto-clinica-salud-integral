// src/routes/doctor.routes.ts
import { Router } from 'express';
import { createDoctor, getDoctors, getDoctorById } from '../controllers/doctor.controller';

const router: Router = Router();

router.post('/', createDoctor);    
router.get('/', getDoctors);
router.get('/:id', getDoctorById);

export default router;
// fin - src/routes/doctor.routes.ts