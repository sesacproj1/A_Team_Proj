const express = require('express');
const router = express.Router();

const controller = require('../controller/Cmain');
const controllerFriend = require('../controller/Cfriend');
const controllerUser = require('../controller/CUser');
const controllerNoti = require('../controller/CNoti');
const controllerPost = require('../controller/Cpost.js');
const controllerLetter = require('../controller/CLetter');
// ~~~~~~~~~~~~~~ multer 세부설정 ~~~~~~~~~~~~
// multer 관련 설정
const multer = require('multer');
const path = require('path'); //경로에 관한 내장 모듈
const upload = multer({
  dest: 'img/profile/', // dest: 클라이언트가 업로드한 파일을 저장할 서버측 경로
});
const uploadDetail = multer({
  // storage : 저장할 공간에 대한 정보
  //done(null,xx) 여기서 null은 error를 의미하는 매개변수
  //에러가 없으므로 "null" 이라고 전달하여 콜백 함수를 호출!
  storage: multer.diskStorage({
    destination(req, file, done) {
      //done은 callback 함수
      done(null, 'public/img/profile/'); //파일을 업로드할 경로 설정
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); //파일 "확장자"를 주출(png,txt,...)
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  //   limits : 파일 제한 정보
  limits: { fileSize: 5 * 1024 * 1024 }, //5MB
});

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
router.post(
  '/profileImage',
  uploadDetail.single('fileInput'),
  controllerUser.input.postProfileImage
);

//로그인
// router.get('/login', controllerUser.output.login);
router.post('/login', controllerUser.input.postLogin);
router.get('/logout', controllerUser.output.logout); //로그아웃

//회원 삭제
router.delete('/users/:id', controllerUser.input.deleteUser);

/* 로그인 및 비밀 번호 찾기 관련 */
// router.get('/find', controllerUser.output.findPassword); // 비밀번호 찾기
router.post('/find/password', controllerUser.input.postFindPassword); // 비밀번호 찾기 실행
router.post('/find/id', controllerUser.input.postFindId); // 아이디 찾기 실행
// router.get('/logout', controllerUser.output.logout); //로그아웃

//TODO 마이페이지에서 닉네임 /pw 수정
// router.get('/profile', controllerUser.output.profile);
router.patch('/profile/edit', controllerUser.input.patchProfile);

//view단 부분
router.get('/user/login', controller.output.userLogin);
router.get('/user/register', controller.output.userRegister);
router.get('/user/findUser', controller.output.findUser);
router.get('/notice', controller.output.noticeMain);
router.get('/notice/post', controller.output.noticePost);
router.get('/user/myPage', controller.output.myPage);
router.get('/notice/update/:noticeNo', controller.output.noticeUpdate);

router.get('/letter/friends/:id', controllerLetter.output.friends);

router.get('/letter/friendConfirm', controllerLetter.output.friendConfirm);
// router.get('/letter/myLetter', controllerLetter.output.myLetter);
router.get('/letter/select/:id', controllerLetter.output.icon);

// 편지함 페이지 출력
router.get('/letter/MyLetter/:id', controllerPost.output.showMyLetter);
//기능부분 (api)

router.post('/noticePost', controller.input.noticePost);
router.get('/notice/delete/:noticeNo', controller.input.noticeDelete);
router.patch('/notice/update/:noticeNo', controller.input.noticeUpdate);

// 알림기능
router.get(
  '/user/myPage/notification/:letterNo',
  controllerNoti.output.showNoti
);
router.delete(
  'user/myPage/notification/:letterNo/:postNo',
  controllerNoti.output.postNoti
);
router.delete(
  'user/myPage/notification/:letterNo/:postNo/delete',
  controllerNoti.input.deleteNoti
);

// 편지함 페이지 출력
router.get('/letter/MyLetter/:letterNo', controllerPost.output.showMyLetter);

// 글남기기
// router.get('MyLetter/:letterNo/contentWrite'.controllerPost.output.content);
router.post(
  '/MyLetter/:letterNo/contentWrite/Register',
  controllerPost.input.contentRegister
);

// 편지보기

router.get('/MyLetter/:letterNo/:postNo', controllerPost.output.showPost);

// 편지함 페이지 - 기능 부분
router.delete(
  '/MyLetter/:letterNo/:postNo/delete',
  controllerPost.input.contentDelete
);
router.patch('/MyLetter/:letterNo/:postNo', controllerPost.input.updateLikes);

// 친구기능
// router.get('/friend/:id', controllerFriend.output.showFriend);
router.post('/MyLetter/:letterNo/reqFriend', controllerFriend.input.reqFriend);
router.get('/showRequest/:id', controllerFriend.output.showRequest);
router.post('/showRequest/:id/confirm', controllerFriend.output.confirmRequest);
router.delete('/showRequest/:id/reject', controllerFriend.input.rejectRequest);
router.delete('/friend/:id/delete', controllerFriend.input.delFriend);

module.exports = router;
