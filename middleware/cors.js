// Configuración de CORS
export const corsOptions = {
  origin: ['http://localhost:5173', 'https://tudominio.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type', 'X-Requested-With'],
  credentials: true,
};
