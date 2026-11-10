// src/routes/specialty.routes.ts
import { Router } from 'express';

import { getSpecialties, createSpecialty } from '../controllers/specialty.controller';

const router: Router = Router();
router.get('/', getSpecialties);
router.post('/', createSpecialty); 

export default router;
// fin - src/routes/specialty.routes.ts