// src/routes/doctor.routes.ts
import { Router } from 'express';

import { getDoctors, createDoctor } from '../controllers/doctor.controller';

const router: Router = Router();
router.get('/', getDoctors);
router.post('/', createDoctor);    

export default router;
// fin - src/routes/doctor.routes.ts