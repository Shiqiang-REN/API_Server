const express = require('express');
const RoleModel = require('../models/RoleModel');
const router = express.Router();


router.route('/')
  .get( (req, res) => {
    RoleModel.find()
      .then(roles => {
        res.send({status: 0, data: roles})
      })
      .catch(error => {
        res.send({status: 1, msg: 'Get role list exception, please try again'})
      })
  })

  .post((req, res) => {
    const {roleName} = req.body
    RoleModel.create({name: roleName})
      .then(role => {
        res.send({status: 0, data: role})
      })
      .catch(error => {
        res.send({status: 1, msg: 'Add role exception, please try again'})
      })
  })

  .put( (req, res) => {
    const role = req.body
    role.auth_time = Date.now()
    RoleModel.findOneAndUpdate({_id: role._id}, role)
      .then(oldRole => {
        res.send({status: 0, data: {...oldRole._doc, ...role}})
      })
      .catch(error => {
        res.send({status: 1, msg: 'Update role exception, please try again'})
      })
  })

module.exports = router;