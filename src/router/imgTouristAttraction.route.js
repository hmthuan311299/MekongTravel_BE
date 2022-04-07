var express = require('express');
var router = express.Router();
var controller = require('../controllers/imgTouristAttraction.controller');
const multer  = require('multer')
var dirName = "./src/public"
const upload  = multer({ dest: dirName+ '/imagesTourist'})

router.get('/getimage/:tourId', controller.getImageByTourId)
router.post('/add', upload.array('photos', 10), controller.addImageTA)
router.post('/approval', controller.approval)
router.delete('/delete/:imageId', controller.deleteImageById)

module.exports = router;