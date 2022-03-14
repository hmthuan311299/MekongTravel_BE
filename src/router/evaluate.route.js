var express = require('express');
var router = express.Router();
var controller = require('../controllers/evaluate.controller')
router.get('/', controller.getEvaluate)
router.post('/add', controller.addEvaluate)
router.put('/update', controller.updateEvaluate)
router.delete('/delete', controller.deleteEvaluate)
router.get('/check', controller.checkEvaluate)
module.exports = router;