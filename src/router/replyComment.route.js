var express = require('express');
var router = express.Router();
var controller = require('../controllers/replyComment.controller')

router.get('/', controller.getReplyComment)
router.post('/add', controller.addReplyComment)
router.put('/update/:id', controller.getReplyComment)
router.delete('/delete/:id', controller.deleteReplyComment)
module.exports = router;