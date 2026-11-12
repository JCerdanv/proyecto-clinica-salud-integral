// src/middlewares/authorize.middleware.ts
import type { Request, Response, NextFunction } from 'express';

type AuthPayload = {
  role: string;
};

export function authorize(...roles: AuthPayload['role'][]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: 'No tienes permiso para acceder a este recurso' });
      return;
    }
    next();
  };
}
// fin - src/middlewares/authorize.middleware.ts