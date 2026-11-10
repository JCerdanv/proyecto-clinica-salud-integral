// index.ts

import express from 'express';
import type { Application, Request, Response } from "express";
import prisma from './config/prisma'

import dotenv from 'dotenv'
import cors from 'cors'
//import userRouter from "./routes/userRoute";
//import postRouter from "./routes/postRoute";

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
const PORT = process.env.PORT || 3000;

// Habilitar CORS para todas las rutas
//const corsOptions = {
//  origin: "http://localhost:3000", // Permitir solo este origen
//  methods: ["GET", "POST"],        // Métodos permitidos
//  credentials: true                // Permitir envío de cookies o cabeceras de autenticación
//};
// app.use(cors(corsOptions));

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
    console.log(" Solicitud recibida: Reiniciando base de datos...")
    
    // Invocamos la función modularizada
    await runSeed()

    res.status(200).json({
      success: true,
      message: "Base de datos restablecida e inicializada con los datos de prueba exitosamente."
    })
  } catch (error) {
    console.error("> Error ejecutando el seed desde HTTP:", error)
    
    res.status(500).json({
      success: false,
      error: "> Error interno al intentar reiniciar los datos del servidor.",
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
});


//fin - index.ts