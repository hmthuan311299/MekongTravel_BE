var express = require('express');
var router = express.Router();
var controller = require('../controllers/touristAttraction.controller');
const multer  = require('multer')
var dirName = "src/public"
const upload  = multer({ dest: __dirname})

router.get('/', controller.getAllTouristAttaction)
router.get('/search', controller.getTouristAttactionBySearch)
router.get('/getListTAByProvinceId/:provinceId', controller.getTouristAttactionByProvinceId)
router.get('/getById/:tourId', controller.getTouristAttactionById)
router.post('/addTouristAttraction', upload.single('avatar'), controller.addTouristAttaction)
router.put('/updateTouristAttraction/:tourId', controller.updateTouristAttaction)
router.put('/updateTouristAttactionHavePicture/:tourId',upload.single('avatar'), controller.updateTouristAttactionHavePicture)
router.delete('/deleteTouristAttaction/:tourId', controller.deleteTouristAttaction)
module.exports = router;