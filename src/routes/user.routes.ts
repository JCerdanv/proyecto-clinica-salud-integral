// src/routes/user.routes.ts

import { Router } from 'express';
import { getUsers, getUsersById, createUser, loginUser } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/authorize.middleware.js';
import { validateCreateUser, validateLogin } from '../middlewares/validate-user.js';

const router: Router = Router();

// Única ruta pública del módulo
//router.post('/login', validateLogin, loginUser);
router.post('/login', validateLogin, (req, res) => {
  // #swagger.tags = ['Usuarios']
  // #swagger.summary = 'Iniciar sesión y obtener token JWT'
  return loginUser(req, res);
});


// Rutas administrativas (Solo GERENCIA)
//router.get('/', verifyToken, authorize('GERENCIA'), getUsers);
router.get('/', verifyToken, authorize('GERENCIA'), (req, res) => {
  // #swagger.tags = ['Usuarios']
  // #swagger.summary = 'Listar todos los usuarios (Solo GERENCIA)'
  return getUsers(req, res);
});  


//router.get('/:id', verifyToken, authorize('GERENCIA'), getUsersById);
router.get('/:id', verifyToken, authorize('GERENCIA'), (req, res) => {
  // #swagger.tags = ['Usuarios']
  // #swagger.summary = 'Obtener un usuario por ID (Solo GERENCIA)'
  return getUsersById(req, res);
});


//router.post('/', verifyToken, authorize('GERENCIA'), validateCreateUser, createUser);
router.post('/', verifyToken, authorize('GERENCIA'), validateCreateUser, (req, res) => {
  // #swagger.tags = ['Usuarios']
  // #swagger.summary = 'Crear un nuevo usuario (Solo GERENCIA)'
  return createUser(req, res);
});

export default router;
// fin - src/routes/user.routes.ts