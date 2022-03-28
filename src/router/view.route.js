var express = require('express');
var router = express.Router();
var controller = require('../controllers/view.controller');

router.post('/countView', controller.countView)
module.exports = router;