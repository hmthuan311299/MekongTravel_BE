var express = require('express');
var router = express.Router();
var controller = require('../controllers/recommendedPlace.controller');
const multer  = require('multer')
var dirName = "src/public"
const upload  = multer({ dest: dirName + '/tourPicture'})

router.get('/', controller.getAllRecomendedPlace)
router.get('/approvedListByMemberId', controller.getApprovedListByMemberId)
router.get('/unapprovedListByMemberId', controller.getUnapprovedListByMemberId)
router.get('/', controller.getAllRecomendedPlace)
router.get('/:recommendId', controller.getRecomendedPlaceById)
router.post('/add', upload.single('avatar'), controller.addRecommendedPlace)
router.put('/approvedBySupporter/:id', controller.updateStatusRecommended)
router.put('/approvedBySupporterHavePicture/:id', upload.single('avatar'), controller.updateStatusRecommendedHavePicture)
router.delete('/delete/:recommendId', controller.deleteRecomendedPlace)
module.exports = router;