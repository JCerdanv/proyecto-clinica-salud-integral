// index.ts

import express from 'express';
import type { Application, Request, Response } from "express";
import prisma from './config/prisma'

import dotenv from 'dotenv'
import cors from 'cors'
// import { output, z } from "zod";
//import swaggerUi from "swagger-ui-express"; // Importar Swagger UI
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "node:fs";
const swaggerFile = JSON.parse(readFileSync(new URL("./swagger/swagger_output.json", import.meta.url), "utf-8"));

dotenv.config();

// import { swaggerSpec } from "./config/swagger.js"; // Importar configuración


// 1. Define un esquema
//const UserSchema = z.object({
//  name: z.string(),
//  edad: z.number().positive(),
//});

// 2. Valida datos
// const resultado = UserSchema.parse({ name: "Ana", edad: 25 });


import specialtyRoutes from './routes/specialty.routes';
import doctorRoutes from './routes/doctor.routes';
import patientRoutes from './routes/patient.routes';
import appointmentRoutes from './routes/appointment.routes';
import userRoutes from './routes/user.routes';

async function runSeed(): Promise<void> {
  console.log('error relacionado con la configuración de la Seed.');
}

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(cors());

//const app = express() JSON debe ir ANTES de cualquier ruta
app.use(express.json());

// Ruta básica
app.get('/', (req: Request, res: Response) => {
  res.json({ message: '¡Servidor Express con TypeScript funcionando!' });
});

app.get("/api", (req, res) => {
  res.json({ message: "CORS-enabled endpoint" });
});

// Rutas de la API (Ahora sí recibirán el req.body correctamente mapeado)

app.get('/data', async (req: Request, res: Response) => {
// Endpoint para iniciar o reiniciar los datos de la clínica
// app.get('/data', async (req, res) => {
  try {
    console.log("... Solicitud recibida: Reiniciando base de datos...")
    
    // Invocamos la función modularizada
    await runSeed()

    res.status(200).json({
      success: true,
      message: "... Base de datos restablecida e inicializada con los datos de prueba exitosamente."
    })
  } catch (error) {
    console.error(">> Error ejecutando el seed desde HTTP:", error)
    
    res.status(500).json({
      success: false,
      error: ">> Error interno al intentar reiniciar los datos del servidor.",
      details: error instanceof Error ? error.message : String(error)
    })
  }
})


// Vinculación de rutas estructuradas
app.use('/api/specialties', specialtyRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`\n Server Clínica Salud Integral en http://localhost:${PORT}`);
  console.log(`  Endpoints disponibles de manera estructurada:`);
  console.log(`   - Especialidades: http://localhost:${PORT}/api/specialties`);
  console.log(`   - Médicos:        http://localhost:${PORT}/api/doctors`);
  console.log(`   - Pacientes:      http://localhost:${PORT}/api/patients`);
  console.log(`   - Citas:          http://localhost:${PORT}/api/appointments`);
  console.log(`   - Usuarios:       http://localhost:${PORT}/api/users`);
  console.log(`  Swagger:           http://localhost:${PORT}/api/docs`)
});


//fin - index.ts