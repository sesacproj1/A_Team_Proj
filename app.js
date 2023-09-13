const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));
app.use(
  session({
    // secret: process.env.SESSION_KEY, // 세션 데이터를 암호화할 때 사용할 비밀 키 (보안을 위해 변경 필요)
    secret: 'mysecret',
    resave: false, // 세션 데이터를 변경되지 않았더라도 항상 저장할지 여부
    saveUninitialized: true, // 초기화되지 않은 세션을 저장할지 여부
    name: 'mySessions',
    // cookie: {
    //   maxAge: 60 * 1000, // 1m
    //   secure: false,
    // }, // 다른 옵션도 필요에 따라 설정 가능

  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const home = require('./routes');
app.use('/', home);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('*', (req, res) => {
  res.render('404');
});

const { sequelize } = require('./models');

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log('8000 port is running');
    });
  })
  .catch(() => {
    console.log('데이터 베이스 연결 실패');
  });
