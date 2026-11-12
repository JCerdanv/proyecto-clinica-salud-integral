// src/routes/user.routes.ts
//import { Router } from 'express';

import { Router, Request, Response } from 'express';
import { getUsers, getUsersById, createUser, loginUser } from '../controllers/user.controller';

const router: Router = Router();
router.get('/', getUsers);
router.get('/:id', getUsersById);
router.post('/', createUser); // Nuevo método POST

router.get('/:id', (req, res) => {
  // #swagger.tags = ['Especialidades']
  // #swagger.summary = 'Lista una especialidad'
   return getUsersById(req, res);
});


// router.post('/login', async (req: Request, res: Response) => {
router.post('/login', (req, res) => {    
  // #swagger.tags = ['Usuarios']
  // #swagger.summary = 'Iniciar sesión y obtener token JWT'
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["email", "password"],
            properties: {
              email: { type: "string", example: "admin@clinica.com" },
              password: { type: "string", example: "123456" }
            }
          }
        }
      }
    }
  */
  /* #swagger.responses[200] = {
      description: 'Login exitoso',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              token: { type: "string", example: "eyJhbGciOiJIUzI1NiIs..." }
            }
          }
        }
      }
    }
  */
  // #swagger.responses[401] = { description: 'Credenciales inválidas' }
  
  return loginUser(req, res);
  /*
  // ... lógica de tu controlador  
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(401).json({ message: '> Usuario incorrecto' });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
       res.status(401).json({ message: '> Credenciales inválidas' });
       return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: '> Error al iniciar sesión' });
  }
  });
*/
});

export default router;
// fin - src/routes/user.routes.ts