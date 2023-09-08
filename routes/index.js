const express = require('express');
const router = express.Router();
const controller = require('../controller/Cmain');
const controllerUser = require('../controller/CUser');

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

module.exports = router;
