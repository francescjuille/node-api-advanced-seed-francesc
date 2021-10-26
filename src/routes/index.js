var express = require('express');
var router = express.Router();
var userRouter = require('../api-features/user/user.routes');

router.use('/user', userRouter);

module.exports = router;
