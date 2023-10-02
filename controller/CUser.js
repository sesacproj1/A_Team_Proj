// ~~~~~~~~~~~~~~아이디 찾기시 메일관련 코드  ~~~~~~~~~~~~
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// ~~~~~~~~~~~~~~ 유저 관련 controller ~~~~~~~~~~~~

const { User, Profile } = require('../models');
const bcrypt = require('bcrypt');
// 비밀번호 암호화 함수
const saltRounds = 11;
// 비밀번호를 해싱하는 함수 정의 (bcryptPassword)
function hashPassword(password) {
  return bcrypt.hashSync(password, saltRounds);
}

// 비밀번호와 원본 비번을를 비교하는 함수 (compareFunc)
function comparePassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

const output = {
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
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return;
      }
      res.redirect('/');
    });
  },
};

const input = {
  //프로필이미지
  postProfileImage: (req, res) => {
    if (req.session.profile.profileName === 'null') {
      //userprofile에 정보가 없을때
      Profile.update(
        {
          profileLocation: '/img/profile/' + req.file.filename,
          profileName: req.file.filename,
        },
        { where: { id: req.session.userInfo.id } }
      );
    } else {
      Profile.update(
        {
          profileLocation: '/img/profile/' + req.file.filename,
          profileName: req.file.filename,
        },
        { where: { id: req.session.userInfo.id } }
      );
    }
    res.send(req.file);
  },
  //로그인
  postLogin: async (req, res) => {
    try {
      const user = await User.findOne({
        where: { userId: req.body.userId },
      });

      // 2-1. 유저 있는경우
      if (user) {
        const result = await comparePassword(req.body.pw, user.password);
        if (result) {
          //비밀번호 일치할 경우
          req.session.userInfo = user;
          res.send({
            result: true,
            data: user,
            isLogin: true,
            message: '로그인 성공!',
          });
        } else {
          //비밀번호 불일치
          res.send({
            result: false,
            isLogin: false,
            message: '비밀번호를 다시 확인해주세요',
          });
        }
      } else {
        res.send({
          result: false,
          isLogin: false,
          message: '존재하는 사용자가 없습니다',
        });
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
      // 중복없음!
      return res.send({ result: true });
    } else {
      //중복있음!!
      return res.send({ result: false, user: result });
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
    if (idResult && isPw && nicknameResult && emailResult && pwConfirm) {
      const secretPw = hashPassword(pw);

      const user = await User.create({
        userId: userId,
        password: secretPw,
        nickname: nickname,
        email: email,
      });
      await Profile.create({
        id: user.id,
        profileLocation: 'null',
        profileName: 'null',
        userId: userId,
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
      const secretPw = hashPassword(req.body.pw);
      if (req.body.nickname !== req.body.originNickname) {
        const isNickname = await User.findOne({
          where: { nickname: req.body.nickname },
        });
        if (isNickname) {
          res.send({ result: false, message: '이미 존재하는 닉네임입니다.' });
        } else {
          await User.update(
            { nickname: req.body.nickname, password: secretPw },
            { where: { userId: req.body.id } }
          );
          res.send({
            result: true,
            message: '마이페이지 수정완료',
            id: req.session.userInfo.id,
          });
        }
      } else {
        //원래닉네임이랑 같다면
        await User.update(
          { password: secretPw },
          { where: { userId: req.body.id } }
        );
        res.send({
          result: true,
          message: '마이페이지 수정완료',
          id: req.session.userInfo.id,
        });
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
    //받는값 -> 이메일
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
        where: { email: req.body.email },
      });
      if (result) {
        //닉네임일치시 이메일을 받아서 이메일 일치시 이메일로 아이디 전송
        const id = result.userId;
        const mailOptions = {
          from: user,
          to: `${result.email}`,
          subject: `[송편지] ${result.nickname}님 아이디찾기`,
          text: `${result.nickname}님의 id는 ${id} 입니다. ^_^*`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
          } else {
            console.log('Email Sent : ', info);
          }
        });

        res.send({
          result: true,
          message: '이메일로 아이디를 전송해드렸습니다.',
        });
      } else {
        res.send({
          result: false,
          message: '해당 이메일을 가진 회원이 존재하지 않습니다.',
        });
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
      where: { userId: req.body.userId },
    }).then((result) => {
      if (!result) {
        return res.send({ message: '존재하지 않는 회원입니다.' });
      } else {
        const secretPw = hashPassword(req.body.password);
        User.update(
          { password: secretPw },
          { where: { userId: req.body.userId } }
        );
        return res.send({ message: '비밀번호 변경완료!' });
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
