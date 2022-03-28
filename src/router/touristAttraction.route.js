var express = require('express');
var router = express.Router();
var controller = require('../controllers/touristAttraction.controller');
const multer  = require('multer')
var dirName = "src/public"
const upload  = multer({ dest: dirName+ '/avatarTourist'})

router.get('/', controller.getAllTouristAttaction)
router.get('/search', controller.getTouristAttactionBySearch)
router.get('/getListTAByProvinceId/:provinceId', controller.getTouristAttactionByProvinceId)
router.get('/getById/:tourId', controller.getTouristAttactionById)
router.post('/add', upload.single('avatar'), controller.addTouristAttaction)
router.post('/approval1', upload.single('avatar'), controller.addTouristAttaction)
router.post('/approval2', controller.approvalTA)
router.put('/updateTouristAttraction/:tourId', controller.updateTouristAttaction)
router.put('/updateTouristAttactionHavePicture/:tourId',upload.single('avatar'), controller.updateTouristAttactionHavePicture)
router.delete('/delete/:tourId', controller.deleteTouristAttaction)
module.exports = router;