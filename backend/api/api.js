const express = require('express');
const app = express();

const apiAccount = require('./account/index');
app.use('/account', apiAccount);

const apiLecture = require('./lecture/index');
app.use('/lecture', apiLecture);

module.exports = app;