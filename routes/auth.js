const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => { //로그인 안한 사람만 접근 가능
  const { email, nickname, password } = req.body; //기존에 이메일로 가입한 사람이 있나 체크
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect('/join?error=exist');
    }
    const hash = await bcrypt.hash(password, 12); //해시화 해서 저장
    await User.create({
      email,
      nickname,
      password: hash,
    });
    return res.redirect('/complete');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});
router.get('/login', function (req, res, next) {
  console.log('login respond')
  
    // console.log(req.user.dataValues)
  if (req.isAuthenticated() && req.user) {
    // console.log(req)
    console.log(req.user.id)
    // console.log(req..content)
        return res.json({
          user: req.user.dataValues,
          
         
        });
        
    }
  
    // console.log(req.isAuthenticated())
    return res.json({ user: null });
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      console.log(info.message)
      //alert(info.message)
      const message = info.message
      //  res.status(401).send(info.message)
      // return res.redirect(`/?loginError=${info.message}`);
      res.send(`<script>alert('${message}'); window.location.href ='/'; </script>`);//next가 없기 때문에 여기서 끝남
  
      return 
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      console.log('success')
      return res.redirect('/');
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

router.get('/logout', isLoggedIn, (req, res) => {
  console.log('logout')
  // req.logout();
  res.redirect('/');
  req.session.destroy(); //세션쿠키를 지움
  // req.useStore().reset()
  
});

// router.get('/kakao', passport.authenticate('kakao'));

// router.get('/kakao/callback', passport.authenticate('kakao', {
//   failureRedirect: '/',
// }), (req, res) => {
//   res.redirect('/');
// });


module.exports = router;