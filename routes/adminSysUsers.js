const express = require('express');
const router = express.Router();
const passport = require('passport');
const {verifyToken, isLoggedIn} = require('../middlewares/authUser');
const jwt = require('jsonwebtoken');
const RoleModel = require('../models/RoleModel');
const UserModel = require('../models/UserModel');

router.post('/login',  (req, res) => {
  const user = req.user
  const token = jwt.sign({id: user.id}, 'PRIVATE_KEY', { expiresIn: '7 days' });
  if(user.role_id){
    RoleModel.findOne({_id: user.role_id})
      .then(role => {
        user._doc.role = role
        res.send({
          status: 0,
          data: {user,token}
        })
      })
      .catch( error =>{
        console.log(error)
      })
  } else {
    user.role = {menus: []}
    res.send({
      status: 0,
      data: { user,token}
    })
  }
})


router.route('/')
  .get((req, res) => {
    UserModel.find({username: {'$ne': 'admin'}})
      .then(users => {
        RoleModel.find().then(roles => {
          res.send({status: 0, data: {users, roles}})
        })
      })
      .catch(error => {
        res.send({status: 1, msg: 'Error getting user list, please try again'})
      })
  })

  .post((req, res) => {
    const {username, password} = req.body
    UserModel.findOne({username})
      .then(user => {
        if (user) {
          res.send({status: 1, msg: 'The user already exists'})
          return new Promise(() => {
          })
        } else {
          return UserModel.create({...req.body, password: md5(password || 'atguigu')})
        }
      })
      .then(user => {
        res.send({status: 0, data: user})
      })
      .catch(error => {
        res.send({status: 1, msg: 'Add user exception, please try again'})
      })
  })

  .put( (req, res) => {
    const user = req.body
    UserModel.findOneAndUpdate({_id: user._id}, user)
      .then(oldUser => {
        const data = Object.assign(oldUser, user)
        // 返回
        res.send({status: 0, data})
      })
      .catch(error => {
        console.error('更新用户异常', error)
        res.send({status: 1, msg: '更新用户异常, 请重新尝试'})
      })
  })

  .delete((req, res) => {
    const {userId} = req.body
    UserModel.deleteOne({_id: userId})
      .then((doc) => {
        res.send({status: 0})
      })
  })


module.exports = router;