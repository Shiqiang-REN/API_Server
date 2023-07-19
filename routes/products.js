const express = require('express');
const ProductModel = require('../models/ProductModel');
const {pageFilter} = require('../utils');
const CategoryModel = require('../models/CategoryModel');
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
    ProductModel.findOneAndUpdate({_id: product._id}, product)
      .then(oldProduct => {
        res.send({status: 0})
      })
      .catch(error => {
        console.error('更新商品异常', error)
        res.send({status: 1, msg: '更新商品名称异常, 请重新尝试'})
      })
  })

  .delete( (req, res) => {
    const {productId} = req.body
    ProductModel.deleteOne({_id: productId})
      .then((doc) => {
        res.send({status: 0})
      })
      .catch(error => {
        res.send({status: 1, msg: 'Error delete product, please try again'})
      })
  })

router.put( '/status/:productId',(req, res) => {
  const {status} = req.body
  const {productId} = req.params
  ProductModel.findOneAndUpdate({_id: productId}, {status})
    .then(oldProduct => {
      res.send({status: 0})
    })
    .catch(error => {
      res.send({status: 1, msg: 'The update product status is abnormal, please try again'})
    })
})

router.get('/search', (req, res) => {
  const {pageNum, pageSize, productCategoryId, productName, productDesc} = req.query
  let condition = {}
  if (productName) {
    condition = {name: new RegExp(`^.*${productName}.*$`)}
  } else if (productDesc) {
    condition = {desc: new RegExp(`^.*${productDesc}.*$`)}
  }else if (productCategoryId){
    condition = {categoryId: productCategoryId}
  }
  ProductModel.find(condition)
    .then(products => {
      //const items = pageFilter(products, pageNum, pageSize)
      products.list = products.list.filter(product => product.status !== 2)
      res.send({status: 0, data: products})
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
