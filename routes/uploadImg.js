const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')

const fs = require('fs')
const dirPath = path.join(__dirname, '..', 'public/upload')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dirPath)
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({ storage })
const uploadSingle = upload.single('image')


router.route('/')
  .post((req, res) => {
    uploadSingle(req, res, function (err) {
      if (err) {
        return res.send({
          status: 1,
          msg: 'Failed to upload file'
        })
      }
      const file = req.file;
      res.send({
        status: 0,
        data: {
          name: file.filename,
          url: 'http://localhost:5001/uploads/' + file.filename
        }
      })
    })
  })

  .delete( (req, res) => {
    const {name} = req.body
    fs.unlink(path.join(dirPath, name), (err) => {
      if (err) {
        console.log(err)
        res.send({
          status: 1,
          msg: 'Failed to delete file!'
        })
      } else {
        res.send({
          status: 0
        })
      }
    })
  })

module.exports = router;
