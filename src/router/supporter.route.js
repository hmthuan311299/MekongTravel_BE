var express = require('express');
var router = express.Router();
var controller = require('../controllers/supporter.controller')

router.get('/', controller.getSupporter)
router.get('/:suppId', controller.getSupporterById)
router.post('/login', controller.loginSupporter)
router.post('/sign-up', controller.addSupporter)
router.put('/:suppId/update', controller.updateSupporter)
router.put('/:suppId/changePass', controller.changePassSupporter)
router.delete('/:suppId/delete', controller.deleteSupporter)
module.exports = router;