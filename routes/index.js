const express = require('express');
const router = express.Router();
const controller = require('../controller/Cmain');

//view단 부분
router.get('/', controller.output.index); //메인 루트페이지 뷰
router.get('/notice', controller.output.noticeDetail); // 공지사항 전체 글 리스트 불러오는 페이지
router.get('/noticePost', controller.output.noticePost); // 공지사항 글쓰는 페이지 뷰
router.get('/noticeDetail/:noticeNo', controller.output.noticeOne); // 공지사항 상세 페이지 뷰
router.get('/noticeUpdate/:noticeNo', controller.output.noticeUpdate); //공지사항 업데이트 페이지 뷰
//기능부분
router.post('/noticePost', controller.input.noticePost);
router.delete('/noticeDelete', controller.input.noticeDelete);
router.patch('/noticeUpdate', controller.input.noticeUpdate);
module.exports = router;
