var express = require('express');
var router = express.Router();
var controller = require('../controllers/comment.controller')

router.get('/', controller.getComment)
router.post('/addcomment', controller.addComment)
router.put('/update/:id', controller.updateComment)
router.delete('/delete/:id', controller.deleteComment)
module.exports = router;