var express = require('express');
var router = express.Router();
var controller = require('../controllers/member.controller')
//upload file
var appRoot = require('app-root-path');
const multer  = require('multer')
var dirName = "./src/public"
const upload  = multer({ dest: dirName+ '/avatarMember' })

router.get('/', controller.getMember)
router.get('/blocked', controller.getBlockedMember)
router.get('/setBlocked/:memberId', controller.setBlockedMember)
router.get('/setOpen/:memberId', controller.setOpenMember)
router.get('/:memberId', controller.getMemberById)
router.post('/login', controller.loginMember)
router.post('/sign-up', controller.addMember)
router.put('/update/:memberId', controller.updateMember)
router.put('/changePassword', controller.changePassMember)
router.delete('/delete/:memberId', controller.deleteMember)
router.put('/updateHavePicture/:memberId', upload.single('avatar'), controller.updateMemberHaveAvatar)
module.exports = router;