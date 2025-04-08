import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

process.loadEnvFile();

// Emular __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDefinition = {
  openapi: '3.1.0',
  info: {
    title: 'API para la creacion de tareas',
    version: '1.0.0',
    description: 'Documentación para la API de tareas',
  },
  servers: [
    {
      url: `${process.env.ENDPOINT_SWAGGER}`,
      description: 'Servidor de desarrollo',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../router/*.js')],
};

const swaggerDocument = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      customCssUrl:
        'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-material.css',
    })
  );
};

export { swaggerDocument, setupSwagger };
