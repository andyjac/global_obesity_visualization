var express = require('express');
var router = express.Router();

router.use('/stats', require('./stats'));

router.use(require('../middlewares/handle_error'));

module.exports = router;
