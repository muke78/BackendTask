const express = require('express');
const http = require('http');
const securityHeadersMiddleware = require('./middleware/securityHeaders');
const corsMiddleware = require('./middleware/cors');
const routes = require('./router/index');
const { setupSwagger } = require('./config/swaggerConfig');

const app = express();

// Configuracion de Swagger
setupSwagger(app);

app.use(corsMiddleware);
app.use(securityHeadersMiddleware);
app.use(routes);

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
