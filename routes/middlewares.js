exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent('로그인필요.');
    res.send("<script>alert('로그인필요'); window.location.href ='/login'; </script>");//next가 없기 때문에 여기서 끝남
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent('로그인한 상태입니다.');
    res.send("<script>alert('로그인 상태입니다.'); window.location.href ='/'; </script>"); //next가 없기 때문에 여기서 끝남
  }
};