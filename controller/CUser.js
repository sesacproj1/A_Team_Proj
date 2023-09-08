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
};

const input = {
  login: (req, res) => {},
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
};

module.exports = { output, input };
