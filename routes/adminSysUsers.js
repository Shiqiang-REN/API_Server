const express = require('express');
const router = express.Router();
const passport = require('passport');
const {verifyToken, isLoggedIn} = require('../middlewares/authUser');

router.post('/login',  (req, res) => {
  res.send('success')
})


module.exports = router;