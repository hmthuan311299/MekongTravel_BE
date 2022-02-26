var express = require('express');
var router = express.Router();
var controller = require('../controllers/member.controller')
const multer  = require('multer')
var dirName = "./src/public"
const upload  = multer({ dest: dirName+ '/avatarMember' })
router.get('/', controller.getMember)
router.get('/:memberId', controller.getMemberById)
router.post('/login', controller.loginMember)
router.post('/sign-up', controller.addMember)
router.put('/:memberId/uploadAvatar',upload.single('avatarMember'), controller.uploadAvatar)
router.put('/:memberId/update', controller.updateMember)
router.put('/:memberId/changePass', controller.changePassMember)
router.delete('/:memberId/delete', controller.deleteMember)

module.exports = router;