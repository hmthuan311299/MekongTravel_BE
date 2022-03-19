var express = require('express');
var router = express.Router();
var controller = require('../controllers/imgTouristAttraction.controller');
const multer  = require('multer')
var dirName = "./src/public"
const upload  = multer({ dest: dirName+ '/imgTourist'})

router.get('/getimage/:tourId', controller.getImageByTourId)
router.post('/addImage', upload.array('photos', 10), controller.addImageTA)
router.delete('/deleteImage/:imageId', controller.deleteImageById)

module.exports = router;