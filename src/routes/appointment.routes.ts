// src/routes/appointment.routes.ts
import { Router } from 'express';

import { getAppointments, createAppointment } from '../controllers/appointment.controller';

const router: Router = Router();
router.get('/', getAppointments);
router.post('/', createAppointment); // Nuevo método POST

export default router;
// fin - src/routes/appointment.routes.ts