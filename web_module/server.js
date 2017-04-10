
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express');
var passport = require('./config/passport');
var sequelize = require('./config/sequelize');
var kue = require('kue');
var ui = require('kue-ui');

ui.setup({
    apiURL: '/api', // IMPORTANT: specify the api url
    baseURL: '/kue', // IMPORTANT: specify the base url
    updateInterval: 500000 // Optional: Fetches new data every 5000 ms
});

var app = express();
var passport = passport();
app.listen(3000);
module.exports = app;

// Mount kue JSON api
app.use('/api', kue.app);
// Mount UI
app.use('/kue', ui.app);

console.log('Server running at http://localhost:3000/');