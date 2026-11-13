// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthPayload {
  id: number;
  email: string;
  role: 'RECEPCIONISTA' | 'MEDICO' | 'GERENCIA';
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}


export function verifyToken(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ message: '> Token no proporcionado' });
    return;
  }

  const token = header.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: '> Token malformado' });
    return;
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET as string) as AuthPayload;
    next();
  } catch {
    res.status(401).json({ message: '> Token inválido o expirado' });
  }
}
// fin - src/middlewares/auth.middleware.ts

