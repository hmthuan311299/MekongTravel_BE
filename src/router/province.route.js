var express = require('express');
var router = express.Router();
var controller = require('../controllers/province.controller');

router.get('/', controller.getProvince)
router.post('/addProvince', controller.addProvince)
router.put('/updateProvince/:provinceId', controller.updateProvince)
router.delete('/deleteProvince/:provinceId', controller.deleteProvince)
module.exports = router;
