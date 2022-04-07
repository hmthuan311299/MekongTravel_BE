var express = require('express');
var router = express.Router();
var controller = require('../controllers/statistic.controller');

router.get('/TAByProvince', controller.statisticTAByProvince)
router.get('/province', controller.statisticProvince)
module.exports = router;