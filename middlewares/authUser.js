const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports.verifyToken = (req, res, next)=>{
  let token = req.headers.authorization
  try {
    const decoded = jwt.verify(token, 'PRIVATE_KEY');
    next()
  } catch(err) {
    res.redirect('/login')
  }
}

module.exports.adminIsLoggedIn = (req, res, next) => {
  passport.authenticate('admin-local', (err, user, info) => {
    if (user) {
      req.user = user
      next();
    }else{
      res.send({
        "status": 1,
        "msg": "Username or Password is not correct!"
      })
    }
  })(req, res);
}

module.exports.customerIsLoggedIn = (req, res, next) => {
  passport.authenticate('customer-local', (err, user, info) => {
    if (user) {
      req.user = user
      next();
    }else{
      res.send({
        "status": 1,
        "msg": "Username or Password is not correct!"
      })
    }
  })(req, res);
}




