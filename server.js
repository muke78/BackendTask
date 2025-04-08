import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import http from 'http';

import { corsOptions } from './middleware/cors.js';
import { router } from './router/index.js';
import { setupSwagger } from './config/swaggerConfig.js';

const app = express();

// Configuracion de Swagger
setupSwagger(app);
// Middleware globales
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(helmet());
// app.use(securityHeadersMiddleware);
app.use(router);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});

// Crear y arrancar el servidor
const server = http.createServer(app);
server.listen(3000, () => {
  console.log('El servidor está escuchando en el puerto 3000');
});
