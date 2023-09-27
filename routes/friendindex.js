const express = require('express');
const router = express.Router();

const controllerFriend = require('../controller/Cfriend');

router.post('/MyLetter/:id/reqFriend', controllerFriend.input.reqFriend);

router.get('/showRequest/:id', controllerFriend.output.showRequest);
router.post('/showRequest/:id/confirm', controllerFriend.output.confirmRequest);
router.delete('/showRequest/:id/reject', controllerFriend.input.rejectRequest);
router.delete('/friend/delete', controllerFriend.input.delFriend);
router.delete('/reqFriend/cancel', controllerFriend.input.reqFriendCancel);


module.exports = router;