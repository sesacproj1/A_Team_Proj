const express = require('express');
const router = express.Router();
const controller = require('../controller/Cmain');
const Fcontroller = require('../controller/addFriend');

router.get('/', controller.output.index);

router.post('/reqFriend/:id', Fcontroller.reqFriend);

router.post('/showRequest/:id', Fcontroller.showRequest);

router.post('/admitRequest/:id', Fcontroller.admitRequest);

module.exports = router;
