const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports.verifyToken = (req, res, next)=>{
  let token = req.headers.authorization
  try {
    const decoded = jwt.verify(token, 'PRIVATE_KEY');
    next()
  } catch(err) {
    // err
  }
}

module.exports.isLoggedIn = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log(user)
    if (user) {
      next();
    }else{
      //err
    }
  })(req, res);
}




