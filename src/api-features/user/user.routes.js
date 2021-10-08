var express = require('express');
var router = express.Router();
var userController = require('./user.controller')
const mw = require('../../middleware')

router.post('/ping',mw.checkToken, controller.ping);
router.post('/login', controller.login);


module.exports = router;