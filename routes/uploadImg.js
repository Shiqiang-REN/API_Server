const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const dirPath = path.join(__dirname, '..', 'public/upload')

const storage = multer.diskStorage({
  // destination: 'upload', //string时,服务启动将会自动创建文件夹
  destination: function (req, file, cb) { //函数需手动创建文件夹
    // console.log('destination()', file)
    if (!fs.existsSync(dirPath)) {
      fs.mkdir(dirPath, function (err) {
        if (err) {
          console.log(err)
        } else {
          cb(null, dirPath)
        }
      })
    } else {
      cb(null, dirPath)
    }
  },
  filename: function (req, file, cb) {
    // console.log('filename()', file)
    var ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
})
const upload = multer({storage})
const uploadSingle = upload.single('image')



// 上传图片
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
      console.log(file.filename)
      res.send({
        status: 0,
        data: {
          name: file.filename,
          url: 'http://localhost:5001/upload/' + file.filename
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
          msg: 'Failed to delete file'
        })
      } else {
        res.send({
          status: 0
        })
      }
    })
  })

module.exports = router;
