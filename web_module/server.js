
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express');
var passport = require('./config/passport');
var sequelize = require('./config/sequelize');

var app = express();
var passport = passport();
app.listen(3000);
module.exports = app;

console.log('Server running at http://localhost:3000/');