const express = require('express');
const router = express.Router();
const controller = require('../controller/Cmain');

router.get('/', controller.output.index);

module.exports = router;
