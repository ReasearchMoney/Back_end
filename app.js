var createError = require('http-errors');
var express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');


dotenv.config();
var app = express();

var indexRouter = require('./routes/index');
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const {sequelize}=require('./models')
const passportConfig = require('./passport');
const userRouter=require('./routes/user')

// app.set('views', path.join(__dirname, 'views'));

// app.set('port', process.env.PORT || 3000); //개발할 때는 8001 베포는 다르게 할 예정
app.set('view engine', 'html'); //넌적스 사용 방법이다. 추후 vue나 리액트로 변경하자.
nunjucks.configure('views', {
  express: app,
  watch: true,
});


// app.set('view engine', 'pug');

sequelize.sync({ force: false }) //alter도 있지만 에러가 날 수 있음, force:false는 개발 때만
  .then(() => {
    console.log('데이터베이스 연결')
  })
  .catch((err) => {
    console.error(err);
  });
//서버 실행되면서 실행
passportConfig();


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img',express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET)); //쿠키 설정
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize()); //express세션보다는 아래에 위치해야 함
app.use(passport.session());//deserializeuser가 실행됨->세션쿠키 전송 

app.use('/', indexRouter);
app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)
app.use('/api/user',userRouter)
app.use('/api/page',pageRouter)
app.use((req, res, next) => { //404 처리
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error); //에러 미들웨어로 넘겨줌
});

app.use((err, req, res, next) => { //에러 미들웨어. 무조건 next가 있어야 함
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; //배포할 때는 에러 스택이 안보이게 함. 개발할때만 트레이스 할 수 있도록
  res.status(err.status || 500); //일반 서버 오류 500
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});

module.exports = app;