const express = require('express');
const jwt = require('jsonwebtoken');
const CustomerModel = require('../models/CustomerModel');
const router = express.Router();

router.post('/login',  (req, res) => {
  const user = req.user
  const token = jwt.sign({id: user.id}, 'PRIVATE_KEY', { expiresIn: '7 days' });
  res.send({
    status: 0,
    data: {user,token}
  })
})

router.route('/')
  .post(async (req, res) => {
    const {email, password, displayName} = req.body
    try{
      let customer = await CustomerModel.findOne({email})
      if(customer) res.send({status: 1, msg: 'The user already exists'})
      else {
        const user = new CustomerModel({username:email, displayName});
        const registeredUser = await CustomerModel.register(user, password);
        res.send({status: 0, data: registeredUser})
      }
    }catch (e) {
      res.send({status: 1, msg: 'Add user exception, please try again'})
    }
  })


module.exports = router;