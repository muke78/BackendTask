const express = require('express');
const taskRouter = require('./taskRouter');

const router = express.Router();

router.use('/api/task', taskRouter);

module.exports = router;
