import express from 'express';

// MYSQl
import { api } from './taskRouter.js';
const router = express.Router();
router.use('/api/task', api);

export { router };

// POSTGRESQL

// const taskRouterPG = require('./taskRouterPG');
// const routerPG = express.Router();
// routerPG.use('/api/task', taskRouterPG);

// module.exports = routerPG;
