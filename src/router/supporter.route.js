var express = require('express');
var router = express.Router();
var controller = require('../controllers/supporter.controller')

router.get('/', controller.getSupporter)
router.get('/:suppId', controller.getSupporterById)
router.post('/login', controller.loginSupporter)
router.post('/sign-up', controller.addSupporter)
router.put('/update/:suppId/', controller.updateSupporter)
router.put('/updateByAdmin/:suppId/', controller.updateSupporterByAdmin)
router.put('/changePassword', controller.changePassSupporter)
router.delete('/delete/:suppId', controller.deleteSupporter)
module.exports = router;