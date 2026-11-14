// src/controllers/report.controller.ts
import type { Request, Response, NextFunction } from 'express';
import * as ReportModel from '../models/report.model.js';

export const getSpecialtyReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const report = await ReportModel.getAppointmentsBySpecialty();
    return res.status(200).json(report);
  } catch (error) {
    next(error);
  }
};

export const getDailyCutoffReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const date = req.query.date as string;
    const summary = await ReportModel.getDailyCutoff(date);

    return res.status(200).json({
      date,
      summary,
    });
  } catch (error) {
    next(error);
  }
};

// fin - src/controllers/report.controller.ts