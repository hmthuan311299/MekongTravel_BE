var express = require('express');
var router = express.Router();
var controller = require('../controllers/touristAttraction.controller');
const multer  = require('multer')
var dirName = "./src/public"
const upload  = multer({ dest: dirName+ '/tourPicture'})

router.get('/', controller.getAllTouristAttaction)
router.get('/getListTAByProvinceId/:provinceId', controller.getTouristAttactionByProvinceId)
router.get('/getListTAById/:tourId', controller.getTouristAttactionById)
router.post('/addTouristAttraction', upload.single('avatar'), controller.addTouristAttaction)
router.put('/updateTouristAttraction/:tourId', controller.updateTouristAttaction)
router.put('/updateTouristAttactionHavePicture/:tourId',upload.single('avatar'), controller.updateTouristAttactionHavePicture)
router.delete('/deleteTouristAttaction/:tourId', controller.deleteTouristAttaction)
module.exports = router;