var express = require('express');
var router = express.Router();
var controller = require('../controllers/statistic.controller');

router.get('/statisticTAByProvince', controller.statisticTAByProvince)
module.exports = router;