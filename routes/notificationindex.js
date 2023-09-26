const express = require('express');
const router = express.Router();

const controllerNoti = require('../controller/CNoti');

// 알림기능
router.get(
    '/user/myPage/notification/:letterNo',
    controllerNoti.output.showNoti
  );
  router.delete(
    '/user/myPage/notification/:postNo',
    controllerNoti.output.postNoti
  );
  router.delete(
    '/user/myPage/notification/:postNo/likes',
    controllerNoti.output.likesNoti
  );
  router.delete(
    '/user/myPage/notification/:id/delete',
    controllerNoti.input.deleteNoti
  );

  module.exports = router;