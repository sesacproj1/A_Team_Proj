const express = require('express');
const router = express.Router();
const controller = require('../controller/Cmain');

//공지사항

router.get('/notice', controller.output.noticeMain);
router.get('/notice/post', controller.output.noticePost);
router.post('/noticePost', controller.input.noticePost);
router.get('/notice/update/:noticeNo', controller.output.noticeUpdate);
router.get('/notice/delete/:noticeNo', controller.input.noticeDelete);
router.patch('/notice/update/:noticeNo', controller.input.noticeUpdate);

module.exports = router;