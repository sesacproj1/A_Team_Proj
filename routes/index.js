const express = require('express');
const router = express.Router();
const controller = require('../controller/Cmain');
const controllerFriend = require('../controller/Cfriend');

router.get('/', controller.output.index);

router.post('/reqFriend/:id', controllerFriend.input.reqFriend);

router.post('/showRequest/:id', controllerFriend.output.showRequest);

router.post('/admitRequest/:id', controllerFriend.output.admitRequest);

module.exports = router;
