// src/routes/auth.routes.ts
import { Router } from 'express';
import { createUser, loginUser } from '../controllers/user.controller.js';
import { validateCreateUser, validateLogin } from '../middlewares/validate-user.js';

const router: Router = Router();

// router.post('/register', validateCreateUser, createUser);
router.post('/register', validateCreateUser, (req, res) => {
  // #swagger.tags = ['Autenticación']
  // #swagger.summary = 'Registrar un nuevo usuario'
  return createUser(req, res);
});  

// router.post('/login', validateLogin, loginUser);
router.post('/login', validateLogin, (req, res) => {
  // #swagger.tags = ['Autenticación']
  // #swagger.summary = 'Iniciar sesión y obtener token JWT'
  return loginUser(req, res);
});

export default router;
// fin - src/routes/auth.routes.ts