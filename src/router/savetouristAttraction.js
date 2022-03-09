var express = require('express');
var router = express.Router();
var controller = require('../controllers/saveTouristAttraction.controller')
router.get('/', controller.getSaveTA)
router.post('/add', controller.addSaveTA)
router.delete('/delete', controller.deleteSaveTA)
module.exports = router;