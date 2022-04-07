var express = require('express');
var router = express.Router();
var controller = require('../controllers/imgRecommended');
const multer  = require('multer')
var dirName = "./src/public"
const upload  = multer({ dest: dirName+ '/imagesTourist'})

router.get('/:recommendId', controller.getImageByRecommendId)
router.post('/add', upload.array('photos', 10), controller.addImageRecommended)
router.delete('/delete/:id', controller.deleteById)

module.exports = router;