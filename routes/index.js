const express = require('express');
const router = express.Router();
const controller = require('../controller/Cmain');

//view단 부분
router.get('/', controller.output.index); //메인 루트페이지 뷰
router.get('/user/login', controller.output.userLogin);
router.get('/user/register', controller.output.userRegister);

//기능부분
router.post('/noticePost', controller.input.noticePost);
router.delete('/noticeDelete/:noticeNo', controller.input.noticeDelete);
router.patch('/noticeUpdate/:noticeNo', controller.input.noticeUpdate);
module.exports = router;
