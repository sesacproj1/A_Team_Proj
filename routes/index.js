const express = require('express');
const router = express.Router();

const controller = require('../controller/Cmain');
const controllerFriend = require('../controller/Cfriend');
const controllerUser = require('../controller/CUser');
const controllerNoti = require('../controller/CNoti');
const controllerPost = require('../controller/Cpost.js');
const controllerLetter = require('../controller/CLetter');

router.get('/', controller.output.index);
router.get('/prevPage', controller.output.prevPage);
router.get('/nextPage', controller.output.nextPage);
// ~~~~~~~~~~~~~~ 유저 관련 API ~~~~~~~~~~~~
// 전체회원 확인
router.get('/users', controllerUser.output.getUser);
router.get('/user/register', controllerUser.output.register);
/*회원가입 관련 */
router.post('/isId', controllerUser.input.isId);
router.post('/isNickname', controllerUser.input.isNickname);
router.post('/register/isEmail', controllerUser.input.isEmail);
router.post('/register', controllerUser.input.postRegister);

//로그인
router.get('/login', controllerUser.output.login);
router.post('/login', controllerUser.input.postLogin);

//회원 삭제
router.delete('/users/:id', controllerUser.input.deleteUser);

/* 로그인 및 비밀 번호 찾기 관련 */
// router.get('/find', controllerUser.output.findPassword); // 비밀번호 찾기
router.post('/find/password', controllerUser.input.postFindPassword); // 비밀번호 찾기 실행
router.post('/find/id', controllerUser.input.postFindId); // 아이디 찾기 실행
// router.get('/logout', controllerUser.output.logout); //로그아웃

//TODO 마이페이지에서 닉네임 /pw 수정
router.get('/profile', controllerUser.output.profile);
router.patch('/profile/edit', controllerUser.input.patchProfile);

//view단 부분
router.get('/user/login', controller.output.userLogin);
router.get('/user/register', controller.output.userRegister);
router.get('/user/findUser', controller.output.findUser);
router.get('/notice', controller.output.noticeMain);
router.get('/notice/post', controller.output.noticePost);
router.get('/user/myPage', controller.output.myPage);
router.get('/notice/update/:noticeNo', controller.output.noticeUpdate);
router.get('/notice/update/:noticeNo', controller.output.noticeUpdate);

//기능부분 (api)

router.post('/noticePost', controller.input.noticePost);
router.get('/notice/delete/:noticeNo', controller.input.noticeDelete);
router.patch('/notice/update/:noticeNo', controller.input.noticeUpdate);

// 알림기능
router.get('/notification/:letterNo', controllerNoti.output.showNoti);
router.delete(
  '/notification/:letterNo/:postNo',
  controllerNoti.output.postNoti
);
router.delete(
  '/notification/:letterNo/:postNo/delete',
  controllerNoti.input.deleteNoti
);

// 편지함 페이지 출력
router.get('/MyLetter/:letterNo', controllerPost.output.showMyLetter);

// 글남기기
router.get('MyLetter/:letterNo/contentWrite'.controllerPost.output.content);
router.post(
  '/MyLetter/:letterNo/contentWrite/Register',
  controllerPost.input.contentRegister
);

// 편지보기
router.post('/MyLetter/:letterNo/:postNo', controllerPost.output.showPost);

// 편지함 페이지 - 기능 부분
router.delete(
  '/MyLetter/:letterNo/:postNo/delete',
  controllerPost.input.contentDelete
);
router.patch(
  '/MyLetter/:letterNo/:postNo/likes',
  controllerPost.input.updateLikes
);

// 친구기능
router.get('/friend/:id', controllerFriend.output.showFriend);
router.post('/MyLetter/:letterNo/reqFriend', controllerFriend.input.reqFriend);
router.get('/showRequest/:id', controllerFriend.output.showRequest);
router.post('/showRequest/:id/confirm', controllerFriend.output.confirmRequest);
router.delete('/showRequest/:id/reject', controllerFriend.input.rejectRequest);
router.delete('/friend/:id/delete', controllerFriend.input.delFriend);

module.exports = router;
