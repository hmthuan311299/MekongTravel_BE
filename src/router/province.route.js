var express = require('express');
var router = express.Router();
var controller = require('../controllers/province.controller');
const multer  = require('multer')
var dirName = "./src/public"
const upload  = multer({ dest: dirName+ '/avatarProvince'})

router.get('/', controller.getProvince)
router.get('/:provinceId', controller.getProvinceById)
router.post('/addProvince', upload.single('avatar'), controller.addProvince)
router.put('/updateProvince/:provinceId', controller.updateProvince)
router.put('/updateProvinceHavePicture/:provinceId',upload.single('avatar'), controller.updateProvinceHavePicture)
router.delete('/deleteProvince/:provinceId', controller.deleteProvince)
module.exports = router;
