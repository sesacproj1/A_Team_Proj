// ~~~~~~~~~~~~~~ 유저 관련 controller ~~~~~~~~~~~~
//User 모델 모듈 불러오기
//bcrypt 패키지 불러오기
const { User } = require('../models');
const bcrypt = require('bcrypt');
// 비밀번호 암호화 함수
const saltRounds = 11;
// TODO: 비밀번호를 해싱하는 함수 정의 (bcryptPassword)
function hashPassword(password) {
  return bcrypt.hashSync(password, saltRounds);
}

// TODO:비밀번호와 원본 비번을를 비교하는 함수 (compareFunc)
function comparePassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

const output = {
  login: (req, res) => {
    res.render('login');
  },
  getUser: async (req, res) => {
    try {
      const Users = await User.findAll();
      res.send(Users);
    } catch (err) {
      res.send('Internal Server Error!');
    }
  },
  register: (req, res) => {
    res.render('register');
  },
  profile: (req, res) => {
    res.render('profile');
  },
};

const input = {
  //로그인
  postLogin: async (req, res) => {
    try {
      // Step1. 아이디를 찾아서 사용자 존재 유무 체크
      const user = await User.findOne({
        where: { userId: req.body.id },
      });
      // Step2. 입력된 비밀번호 암호화하여 기존 데이터와 비교

      // 2-1. 유저 있는경우
      if (user) {
        const result = await comparePassword(req.body.pw, user.password);
        if (result) {
          //비밀번호 일치할 경우
          //    userInfo 키 값으로 세션 생성 (userInfo는 nickname키와 userId 키를 갖는 "객체")
          req.session.userInfo = {
            userId: user.userId,
            nickname: user.nickname,
          }; //세션 생성
          res.send({ result: true, data: user, message: '로그인 성공!' });
        } else {
          //비밀번호 불일치
          res.send({ result: false, message: '비밀번호가 틀렸습니다.' });
        }
      } else {
        res.send({ result: false, message: '존재하는 사용자가 없습니다' });
      }
    } catch (err) {
      console.error(err);
      res.send('Internal Server Error');
    }
  },
  //   회원가입
  postRegister: async (req, res) => {
    //TODO id중복처리
    const { nickname, userId, pw } = req.body;
    console.log('패스워드 암호화 전 ', pw);
    const secretPw = hashPassword(pw);
    console.log('패스워드 암호화 후 ', secretPw);
    const isId = await User.findOne({
      where: { userId: req.body.userId },
    });
    const isNickname = await User.findOne({
      where: { nickname: req.body.nickname },
    });
    // result1 -> 중복 id
    // result2 -> 중복 닉네임
    if (isId || isNickname) {
      if (isId) {
        //isId === true -> 중복 id
        res.send({ result1: true, message: '이미 존재하는 id 입니다.' });
      } else {
        // 이미 존재하는 닉네임 를 생성하려 했을때
        res.send({ result2: true, message: '이미 존재하는 닉네임입니다.' });
      }
    } else {
      const make = await User.create({
        userId: userId,
        password: secretPw,
        nickname: nickname,
      });
      res.send({ result: true });
    }
  },
  //마이페이지에서 수정하기
  patchProfile: async (req, res) => {
    try {
      console.log('req.body는 >>>>>>', req.body);
      const secretPw = hashPassword(req.body.pw);
      const isNickname = await User.findOne({
        where: { nickname: req.body.nickname },
      });
      //닉네임 변경안하고 수정누르면 내 닉네임인데 중복뜸 어떡하쥐
      console.log('isNickname >>>>', isNickname);
      if (isNickname) {
        res.send({ result: false, message: '이미 존재하는 닉네임입니다.' });
      } else {
        await User.update(
          { nickname: req.body.nickname, password: secretPw },
          { where: { userId: req.body.id } }
        );
        res.send({ result: true, message: '마이페이지 수정완료' });
      }
    } catch (err) {
      console.error(err);
      res.send('Internal Sever Error');
    }
  },
};

module.exports = { output, input };
