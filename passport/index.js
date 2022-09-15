const passport = require('passport');
const local = require('./localStrategy');

const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);//세션에 유저의 아이디만 저장 ->메모리가 한정되어있기 때문
  });

  passport.deserializeUser((id, done) => {
 //req.user 여기서 생성됨
User.findOne({
      where: { id },
      
    })
   
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();

};