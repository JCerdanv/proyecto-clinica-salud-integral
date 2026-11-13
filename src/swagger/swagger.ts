// src/swagger/swagger.ts

import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.2.0',
    title: 'API Clínica Salud Integral',
    description: 'Documentación generada con OpenAPI 3.0',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  // Aplica el candado JWT por defecto a los endpoints en Swagger UI
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const outputFile = './src/swagger/swagger_output.json';
const routes = ['./src/index.ts'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc).then(() => {
  console.log(' Swagger JSON generado correctamente.');
});
// fin - src/swagger/swagger.ts