const express = require('express');
const ProductModel = require('../models/ProductModel');
const {pageFilter} = require('../utils');
const router = express.Router();

router.route('/')
  .get( (req, res) => {
    const {pageNum, pageSize} = req.query
    ProductModel.find({})
      .then(products => {
        res.send({status: 0, data: pageFilter(products.reverse(), pageNum, pageSize)})
      })
      .catch(error => {
        res.send({status: 1, msg: 'Get the product list is abnormal, please try again'})
      })
  })

  .post((req, res) => {
    const product = req.body
    console.log('product', product)
    ProductModel.findOne({name: product.name})
      .then(p => {
        if (p) {
          res.send({
            status: 1,
            msg: 'The product with this name already exists'
          })
        } else {
          ProductModel.create(product)
            .then(product => {
              res.send({
                status: 0,
                data: product
              })
            })
            .catch(error => {
              res.send({
                status: 1,
                msg: 'Add product exception, please try again'
              })
            })
        }
      })
  })

  .put( (req, res) => {
    const product = req.body
    console.log(product)
    ProductModel.findOneAndUpdate({_id: product._id}, product)
      .then(oldProduct => {
        res.send({status: 0})
      })
      .catch(error => {
        console.error('更新商品异常', error)
        res.send({status: 1, msg: '更新商品名称异常, 请重新尝试'})
      })
  })

router.route('/status/:productId').put( (req, res) => {
  const {status} = req.body
  const {productId} = req.params
  console.log(req.params)
  ProductModel.findOneAndUpdate({_id: productId}, {status})
    .then(oldProduct => {
      res.send({status: 0})
    })
    .catch(error => {
      res.send({status: 1, msg: 'The update product status is abnormal, please try again'})
    })
})

router.get('/search', (req, res) => {
  const {pageNum, pageSize, searchName, productName, productDesc} = req.query
  console.log(productName)
  let condition = {}
  if (productName) {
    condition = {name: new RegExp(`^.*${productName}.*$`)}
  } else if (productDesc) {
    condition = {desc: new RegExp(`^.*${productDesc}.*$`)}
  }
  ProductModel.find(condition)
    .then(products => {
      res.send({status: 0, data: pageFilter(products, pageNum, pageSize)})
    })
    .catch(error => {
      res.send({status: 1, msg: 'The search product list is abnormal, please try again'})
    })
})

router.get('/:productId', (req, res) => {
  const {productId} = req.params
  ProductModel.findOne({ _id: productId })
    .then(product => {
      res.send({
        status: 0,
        data: product
      })
    })
    .catch(error => {
      res.send({
        status: 1,
        msg: 'Get product exception'
      })
    })
})



module.exports = router;