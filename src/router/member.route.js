var express = require('express');
var router = express.Router();
var controller = require('../controllers/member.controller')

router.get('/', controller.getMember)
router.get('/:memberId', controller.getMemberById)
router.post('/login', controller.loginMember)
router.post('/sign-up', controller.addMember)
module.exports = router;