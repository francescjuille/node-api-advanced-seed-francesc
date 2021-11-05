var express = require('express');
var router = express.Router();
var userController = require('./user.controller')
const mw = require('../../middleware')
const userValidator = require("./user.validators");
const { body } = require('express-validator')


//console.log(LoginValidator.validate_login)
router.post('/ping',mw.checkToken, userController.ping);
router.post('/login', userValidator.validate_login(), userController.login);


module.exports = router;
