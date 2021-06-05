'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config')

const app = express();
mongoose.connect(config.connectionString);

const indexRoute = require('./routes/index');
const userRoute = require('./routes/user');
const propertyRoute = require('./routes/property');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})
app.use('/', indexRoute);
app.use('/users', userRoute);
app.use('/properties', propertyRoute);

module.exports = app;