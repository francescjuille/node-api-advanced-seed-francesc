var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('config')
const expressSanitizer = require('express-sanitizer')

var indexRouter = require('./routes/index');

var app = express();
app.use(logger(config.get('logger')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSanitizer())
app.use('/', indexRouter);
const db = require("./models");
db.sequelize.sync();
module.exports = app;
