// ~~~~~~~~~~~~~~아이디 찾기시 메일관련 코드  ~~~~~~~~~~~~
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
dotenv.config();

// ~~~~~~~~~~~~~~ 유저 관련 controller ~~~~~~~~~~~~
//TODO 유저값 자체를 담는 세션생성

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
    res.render('login', { user: req.session.userInfo.userId });
  },
  findPassword: (req, res) => {
    res.render('findPassword');
  },
  getUser: async (req, res) => {
    try {
      const Users = await User.findAll();
      res.send(Users);
    } catch (err) {
      res.send('Internal Server Error! ');
    }
  },
  register: (req, res) => {
    res.render('user/register');
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
        where: { userId: req.body.userId },
      });
      // Step2. 입력된 비밀번호 암호화하여 기존 데이터와 비교

      // 2-1. 유저 있는경우
      if (user) {
        const result = await comparePassword(req.body.pw, user.password);
        if (result) {
          //비밀번호 일치할 경우
          //    userInfo 키 값으로 세션 생성 (userInfo는 nickname키와 userId 키를 갖는 "객체")
          req.session.userInfo = {
            id: user.id,
            userId: user.userId,
            nickname: user.nickname,
          }; //세션 생성
          // console.log(req.session.userInfo); //{ userId: 'alsdud1240', nickname: '로그인확인용' }
          res.send({ result: true, data: user, message: '로그인 성공!' });
        } else {
          //비밀번호 불일치
          res.send({ result: false, message: '비밀번호를 다시 확인해주세요' });
        }
      } else {
        res.send({ result: false, message: '존재하는 사용자가 없습니다' });
      }
    } catch (err) {
      console.error(err);
      res.send('Internal Server Error');
    }
  },
  isId: async (req, res) => {
    const result = await User.findOne({
      where: { userId: req.body.userId },
    });
    if (result == null) {
      return res.send(true);
    } else {
      return res.send(false);
    }
  },
  isNickname: async (req, res) => {
    const result = await User.findOne({
      where: { nickname: req.body.nickname },
    });
    if (result == null) {
      return res.send(true);
    } else {
      return res.send(false);
    }
  },
  isEmail: async (req, res) => {
    const result = await User.findOne({
      where: { email: req.body.email },
    });
    if (result == null) {
      return res.send(true);
    } else {
      return res.send(false);
    }
  },
  //   회원가입
  postRegister: async (req, res) => {
    //TODO id중복처리
    const {
      userId,
      pw,
      nickname,
      email,
      pwConfirm,
      idResult,
      isPw,
      nicknameResult,
      emailResult,
    } = req.body;
    console.log('req.body는', req.body);
    if (idResult && isPw && nicknameResult && emailResult && pwConfirm) {
      console.log('패스워드 암호화 전 ', pw);
      const secretPw = hashPassword(pw);
      console.log('패스워드 암호화 후 ', secretPw);

      await User.create({
        userId: userId,
        password: secretPw,
        nickname: nickname,
        email: email,
      });
      return res.send({
        result: true,
        message: ` 회원가입 성공! ${nickname}님 반갑습니다.`,
      });
    } else {
      return res.send({
        result: false,
        message: `정상적인 가입에 실패하셨습니다. 다시 입력해주세요`,
      });
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
      //TODO 닉네임 변경안하고 수정누르면 내 닉네임인데 중복뜸 어떡하쥐
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

  //아이디 찾기
  // req.body -> userId, pw(새로 등록할 패스워드),nickname
  // 1. 유저가 이메일 입력해서 이메일이 db에존재한다면 해당 아이디를 이메일 메일로 전송

  postFindId: async (req, res) => {
    //받는값 -> 닉네임, 이메일
    const { email_service, user, pass } = process.env;

    const transporter = nodemailer.createTransport({
      //보내는사람
      service: email_service,
      auth: {
        user: user,
        pass: pass,
      },
    });

    try {
      const result = await User.findOne({
        where: { nickname: req.body.nickname },
      });
      console.log(result);
      if (result) {
        //닉네임일치시 이메일을 받아서 이메일 일치시 이메일로 아이디 전송
        if (result.email === req.body.email) {
          const id = result.userId;
          const mailOptions = {
            from: user,
            to: `${result.email}`,
            subject: `[송편지] ${req.body.nickname}님 아이디찾기`,
            text: `${req.body.nickname}님의 id는 ${id} 입니다. ^_^*`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
            } else {
              console.log('Email Sent : ', info);
            }
          });
          res.send({ message: '이메일로 아이디 전송!' });
        } else {
          res.send({ message: '잘못된 이메일입니다.' });
        }
      } else {
        res.send({ message: '해당 닉네임이 존재하지 않습니다.' });
      }
    } catch (err) {
      console.error(err);
      res.send('Internal Sever Error');
    }
  },

  //비밀번호 찾기
  //req.body -> userId, pw(새로 등록할 패스워드),nickname
  // 1. 유저가 아이디 입력해서 아이디가 db에 있으면
  // 2. 닉네임을 입력하게 해서
  // 3. 비밀번호 새로 등록시키기 (-> 암호화)
  postFindPassword: (req, res) => {
    //result -> userid가 있는지
    User.findOne({
      where: { userId: req.body.id },
    }).then((result) => {
      console.log('비밀번호 찾기 실행: ', result);
      if (!result) {
        return res.send({ message: '존재하지 않는 회원입니다.' });
      }
      if (result.nickname === req.body.nickname) {
        //일치한다면-> 새 비밀번호 받기
        const secretPw = hashPassword(req.body.pw);
        User.update({ password: secretPw }, { where: { userId: req.body.id } });
        return res.send({ message: '비밀번호 변경완료!' });
      } else {
        return res.send({ message: '잘못된 닉네임입니다.' });
      }
    });
  },

  //회원 삭제 -> 확인용

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const isDeleted = await User.destroy({
        where: { id: id },
      });
      console.log(isDeleted); //성공시 1, 실패시 0
      if (isDeleted) {
        res.send(true);
      } else {
        res.send(false);
      }
    } catch (err) {
      console.error(err);
      res.send('Internal Server Error!!!');
    }
  },
};

module.exports = { output, input };
