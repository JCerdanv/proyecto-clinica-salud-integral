// src/routes/user.routes.ts
import { Router } from 'express';

import { getUsers, createUser } from '../controllers/user.controller';

const router: Router = Router();
router.get('/', getUsers);
router.post('/', createUser); // Nuevo método POST

export default router;
// fin - src/routes/user.routes.ts