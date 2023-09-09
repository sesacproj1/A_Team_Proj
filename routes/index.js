const express = require('express');
const router = express.Router();
const controller = require('../controller/Cmain');
const controllerUser = require('../controller/CUser');
const controllerPost = require('../controller/Cpost.js');

router.get('/', controller.output.index);
// ~~~~~~~~~~~~~~ 유저 관련 API ~~~~~~~~~~~~
// 전체회원 확인
router.get('/users', controllerUser.output.getUser);
router.get('/register', controllerUser.output.register);
//회원가입
router.post('/register', controllerUser.input.postRegister);

//로그인
router.get('/login', controllerUser.output.login);
router.post('/login', controllerUser.input.postLogin);

//TODO 마이페이지에서 닉네임 /pw 수정
router.get('/profile', controllerUser.output.profile);
router.patch('/profile/edit', controllerUser.input.patchProfile);
//view단 부분
router.get('/', controller.output.index); //메인 루트페이지 뷰
router.get('/user/login', controller.output.userLogin);
router.get('/user/register', controller.output.userRegister);

//관리자 페이지 - 기능부분(공지사항)
router.post('/noticePost', controller.input.noticePost);
router.delete('/noticeDelete/:noticeNo', controller.input.noticeDelete);
router.patch('/noticeUpdate/:noticeNo', controller.input.noticeUpdate);

// 편지함 페이지 출력
router.get('/MyLetter/:letterNo', controllerPost.output.showMyLetter);

// 편지함 페이지 - 기능 부분
router.post('/MyLetter/:letterNo/:postNo', controllerPost.output.showPost);
router.post(
  '/MyLetter/:letterNo/:postNo/Register',
  controllerPost.input.contentRegister
);
router.delete(
  '/MyLetter/:letterNo/:postNo/delete',
  controllerPost.input.contentDelete
);
router.patch(
  '/MyLetter/:letterNo/:postNo/likes',
  controllerPost.input.contentLikes
);

module.exports = router;
