const express = require('express');

// MYSQl

const taskRouter = require('./taskRouter');
const router = express.Router();
router.use('/api/task', taskRouter);

module.exports = router;





// POSTGRESQL

// const taskRouterPG = require('./taskRouterPG');
// const routerPG = express.Router();
// routerPG.use('/api/task', taskRouterPG);

// module.exports = routerPG;
