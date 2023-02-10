const express = require('express');
const CategoryModel = require('../models/CategoryModel');
const router = express.Router();

router.route('/')

  .get( (req, res) => {
    CategoryModel.find({})
      .then(categories => {
        res.send({status: 0, data: categories})
        console.log(123)
      })
      .catch(error => {
        res.send({status: 1, msg: 'Get category list exception, please try again'})
      })
  })

  .post( (req, res) => {
    const {categoryName} = req.body
    CategoryModel.findOne({name: categoryName})
      .then(category => {
        if (category) {
          res.send({status: 1, msg: 'This category already exists'})
        } else {
          CategoryModel.create({name: categoryName})
            .then(category => {
              res.send({status: 0, data: category})
            })
            .catch(error => {
              res.send({status: 1, msg: 'Add classification exception, please try again'})
            })
        }
      })
  })

  .put( (req, res) => {
    const {categoryId, categoryName} = req.body
    CategoryModel.findOneAndUpdate({_id: categoryId}, {name: categoryName})
      .then(oldCategory => {
        res.send({status: 0})
      })
      .catch(error => {
        res.send({status: 1, msg: 'Error updating category name, please try again'})
      })
  })

  .delete( (req, res) => {
    const {categoryId} = req.body
    CategoryModel.deleteOne({_id: categoryId})
      .then((doc) => {
        res.send({status: 0})
      })
      .catch(error => {
        res.send({status: 1, msg: 'Error delete category name, please try again'})
      })
  })

module.exports = router;
